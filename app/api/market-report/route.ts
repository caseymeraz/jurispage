import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/db";
import { submitToHubSpot } from "@/lib/hubspot";
import { notifySlack } from "@/lib/slack";
import { verifyTurnstile } from "@/lib/turnstile";

export async function POST(req: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await req.json();
    const { firmName, firstName, lastName, email, phone, practiceArea, targetMarket } = body;

    if (!firmName || !firstName || !email || !phone || !practiceArea || !targetMarket) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!body.turnstileToken || !(await verifyTurnstile(body.turnstileToken))) {
      return NextResponse.json({ error: "Spam verification failed" }, { status: 403 });
    }

    // Save to DB
    try {
      await prisma.formSubmission.create({
        data: {
          type: "market-report",
          name: `${firstName} ${lastName}`,
          email,
          phone,
          firmName,
          data: { practiceArea, targetMarket },
        },
      });
    } catch (dbError) {
      console.error("FormSubmission save error:", dbError);
    }

    // Slack notification
    notifySlack("Free Market Report Request", {
      Firm: firmName,
      Contact: `${firstName} ${lastName}`,
      Email: email,
      "Practice Area": practiceArea,
      "Target Market": targetMarket,
      "Page URL": body.pageUri || "N/A",
    });

    const emailHtml = `
      <h2>FREE MARKET REPORT REQUEST</h2>
      <p style="color: #EE6C13; font-weight: bold;">Deliver within 24 hours</p>
      <table style="border-collapse: collapse; width: 100%;">
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Firm Name</td><td style="padding: 8px; border: 1px solid #ddd;">${firmName}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Contact Name</td><td style="padding: 8px; border: 1px solid #ddd;">${firstName} ${lastName}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email</td><td style="padding: 8px; border: 1px solid #ddd;">${email}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Phone</td><td style="padding: 8px; border: 1px solid #ddd;">${phone}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Practice Area</td><td style="padding: 8px; border: 1px solid #ddd;">${practiceArea}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Target Market</td><td style="padding: 8px; border: 1px solid #ddd;">${targetMarket}</td></tr>
      </table>
    `;

    await resend.emails.send({
      from: "JurisPage Leads <leads@jurispage.com>",
      to: ["cmeraz@jurisdigital.com", "ahatcher@jurisdigital.com", "jmeans@jurisdigital.com"],
      subject: `FREE MARKET REPORT REQUEST: ${firmName} - ${practiceArea} in ${targetMarket}`,
      html: emailHtml,
      replyTo: email,
    });

    // HubSpot submission
    const formGuid = process.env.HUBSPOT_FORM_GUID;
    if (formGuid) {
      try {
        await submitToHubSpot(formGuid, [
          { name: "firstname", value: firstName },
          { name: "lastname", value: lastName },
          { name: "email", value: email },
          { name: "phone", value: phone || "" },
          { name: "company", value: firmName },
          { name: "practice_area", value: practiceArea },
          { name: "target_market", value: targetMarket },
          { name: "form_source", value: "free-market-report" },
        ]);
        console.log("[MarketReport] HubSpot submission succeeded");
      } catch (err) {
        console.error("[MarketReport] HubSpot submission failed:", err);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Market report form error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
