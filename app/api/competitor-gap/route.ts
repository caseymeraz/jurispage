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
    const { email, hutk, pageUri, pageName } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    if (!body.turnstileToken || !(await verifyTurnstile(body.turnstileToken))) {
      return NextResponse.json(
        { error: "Spam verification failed" },
        { status: 403 }
      );
    }

    // Save to DB
    try {
      await prisma.formSubmission.create({
        data: {
          type: "competitor-gap",
          name: "",
          email,
          data: {
            utmSource: body.utmSource,
            utmMedium: body.utmMedium,
            utmCampaign: body.utmCampaign,
            utmTerm: body.utmTerm,
            utmContent: body.utmContent,
            referrer: body.referrer,
          },
        },
      });
    } catch (dbError) {
      console.error("FormSubmission save error:", dbError);
    }

    // Slack notification
    notifySlack("Competitor Gap Scan Request", {
      Email: email,
      Source: "Law Firm SEO page",
      "Page URL": pageUri || "N/A",
    });

    // Email notification to team
    const emailHtml = `
      <h2>COMPETITOR GAP SCAN REQUEST</h2>
      <p style="color: #EE6C13; font-weight: bold;">New lead from Law Firm SEO page</p>
      <table style="border-collapse: collapse; width: 100%;">
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email</td><td style="padding: 8px; border: 1px solid #ddd;">${email}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Source Page</td><td style="padding: 8px; border: 1px solid #ddd;">${pageUri || "N/A"}</td></tr>
      </table>
    `;

    await resend.emails.send({
      from: "JurisPage Leads <leads@jurispage.com>",
      to: [
        "cmeraz@jurisdigital.com",
        "ahatcher@jurisdigital.com",
        "jmeans@jurisdigital.com",
      ],
      subject: `COMPETITOR GAP SCAN: ${email}`,
      html: emailHtml,
      replyTo: email,
    });

    // HubSpot submission
    const formGuid = process.env.HUBSPOT_FORM_GUID;
    if (formGuid) {
      try {
        await submitToHubSpot(
          formGuid,
          [
            { name: "email", value: email },
            { name: "form_source", value: "competitor-gap-scan" },
          ],
          { hutk, pageUri, pageName }
        );
        console.log("[CompetitorGap] HubSpot submission succeeded");
      } catch (err) {
        console.error("[CompetitorGap] HubSpot submission failed:", err);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Competitor gap form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
