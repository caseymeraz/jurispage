import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { submitToHubSpot } from "@/lib/hubspot";
import { notifySlack } from "@/lib/slack";
import { prisma } from "@/lib/db";
import { verifyTurnstile } from "@/lib/turnstile";

export async function POST(req: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await req.json();
    const { firstName, lastName, email, phone, website, practiceArea, budget, growthGoal, casesWanted, referral, message } = body;

    if (!firstName || !email || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!body.turnstileToken || !(await verifyTurnstile(body.turnstileToken))) {
      return NextResponse.json({ error: "Spam verification failed" }, { status: 403 });
    }

    // Save to DB
    try {
      await prisma.formSubmission.create({
        data: {
          type: "contact",
          name: `${firstName} ${lastName || ""}`.trim(),
          email,
          phone,
          data: { firstName, lastName, website, practiceArea, budget, growthGoal, casesWanted, referral, message },
        },
      });
    } catch (dbError) {
      console.error("FormSubmission save error:", dbError);
    }

    const isPremium = budget === "$5,000+/month";

    const emailHtml = `
      <h2>New Lead from JurisPage.com</h2>
      ${isPremium ? '<p style="color: red; font-weight: bold;">⭐ PREMIUM LEAD - Budget $5,000+/month</p>' : ""}
      <table style="border-collapse: collapse; width: 100%;">
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Name</td><td style="padding: 8px; border: 1px solid #ddd;">${firstName} ${lastName}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email</td><td style="padding: 8px; border: 1px solid #ddd;">${email}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Phone</td><td style="padding: 8px; border: 1px solid #ddd;">${phone}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Practice Area</td><td style="padding: 8px; border: 1px solid #ddd;">${practiceArea || "N/A"}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Website</td><td style="padding: 8px; border: 1px solid #ddd;">${website || "N/A"}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Budget</td><td style="padding: 8px; border: 1px solid #ddd;">${budget}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Growth Goal</td><td style="padding: 8px; border: 1px solid #ddd;">${growthGoal || "N/A"}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Cases Wanted</td><td style="padding: 8px; border: 1px solid #ddd;">${casesWanted || "N/A"}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Referral Source</td><td style="padding: 8px; border: 1px solid #ddd;">${referral || "N/A"}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Goals</td><td style="padding: 8px; border: 1px solid #ddd;">${message || "N/A"}</td></tr>
      </table>
    `;

    await resend.emails.send({
      from: "JurisPage Leads <leads@jurispage.com>",
      to: ["cmeraz@jurisdigital.com", "ahatcher@jurisdigital.com", "jmeans@jurisdigital.com"],
      subject: `${isPremium ? "⭐ PREMIUM LEAD" : "New Lead"}: ${firstName} ${lastName} - ${practiceArea || "Law Firm"}`,
      html: emailHtml,
      replyTo: email,
    });

    // Slack notification
    notifySlack(isPremium ? "⭐ Premium Contact Form Lead" : "New Contact Form Lead", {
      "Law Firm": website || "N/A",
      "First Name": firstName || "N/A",
      "Last Name": lastName || "N/A",
      "Email": email,
      "Phone Number": phone || "N/A",
      "Website": website || "N/A",
      "Primary Practice Area": practiceArea || "N/A",
      "Monthly Budget": budget || "N/A",
      "Growth Goal": growthGoal || "N/A",
      "How many cases wanted?": casesWanted || "N/A",
      "Referral Source": referral || "N/A",
      "Message": message || "N/A",
      "Form Source": "contact-page",
      "Page URL": body.pageUri || "N/A",
    }, "new-leads");

    // HubSpot submission (awaited so it completes before serverless function exits)
    const formGuid = process.env.HUBSPOT_FORM_GUID;
    console.log("[Contact] HUBSPOT_FORM_GUID:", formGuid ? "set" : "MISSING");
    if (formGuid) {
      try {
        await submitToHubSpot(
          formGuid,
          [
            { name: "firstname", value: firstName },
            { name: "lastname", value: lastName },
            { name: "email", value: email },
            { name: "phone", value: phone || "" },
            { name: "practice_area", value: practiceArea || "" },
            { name: "monthly_budget", value: budget || "" },
            { name: "website", value: website || "" },
            { name: "growth_goal", value: growthGoal || "" },
            { name: "how_many_cases_do_you_want_to_generate_from_marketing_per_month", value: casesWanted || "" },
            { name: "how_did_you_hear_about_us_", value: referral || "" },
            { name: "message", value: message || "" },
            { name: "form_source", value: "contact-page" },
          ],
          { hutk: body.hutk, pageUri: body.pageUri, pageName: body.pageName }
        );
        console.log("[Contact] HubSpot submission succeeded");
      } catch (err) {
        console.error("[Contact] HubSpot submission failed:", err);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
