import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { submitToHubSpot } from "@/lib/hubspot";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await req.json();
    const {
      fullName,
      email,
      phone,
      firmName,
      attorneys,
      practiceAreas,
      markets,
      budget,
      growthGoal,
      notes,
    } = body;

    if (!fullName || !email || !firmName || !attorneys) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const practiceAreasDisplay = Array.isArray(practiceAreas) ? practiceAreas.join(", ") : practiceAreas;

    // Save to DB
    try {
      await prisma.formSubmission.create({
        data: {
          type: "growth-assessment",
          name: fullName,
          email,
          phone,
          firmName,
          data: { attorneys, practiceAreas, markets, budget, growthGoal, notes },
        },
      });
    } catch (dbError) {
      console.error("FormSubmission save error:", dbError);
    }

    // ── Internal notification ──────────────────────────────────────────
    const internalHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <div style="background: #1a1a1a; padding: 20px 28px;">
          <h2 style="color: #EE6C13; margin: 0; font-size: 20px;">Juris Digital Growth Assessment</h2>
          <p style="color: #fbbf24; margin: 8px 0 0; font-size: 14px; font-weight: bold;">⚠ JURIS DIGITAL ENTERPRISE LEAD</p>
        </div>
        <div style="padding: 24px 28px; background: #f9fafb;">
          <table style="border-collapse: collapse; width: 100%;">
            <tr><td style="padding: 8px 12px; border: 1px solid #e5e7eb; font-weight: bold; background: #fff;">Name</td><td style="padding: 8px 12px; border: 1px solid #e5e7eb; background: #fff;">${fullName}</td></tr>
            <tr><td style="padding: 8px 12px; border: 1px solid #e5e7eb; font-weight: bold; background: #f9fafb;">Firm</td><td style="padding: 8px 12px; border: 1px solid #e5e7eb; background: #f9fafb;">${firmName}</td></tr>
            <tr><td style="padding: 8px 12px; border: 1px solid #e5e7eb; font-weight: bold; background: #fff;">Email</td><td style="padding: 8px 12px; border: 1px solid #e5e7eb; background: #fff;">${email}</td></tr>
            <tr><td style="padding: 8px 12px; border: 1px solid #e5e7eb; font-weight: bold; background: #f9fafb;">Phone</td><td style="padding: 8px 12px; border: 1px solid #e5e7eb; background: #f9fafb;">${phone}</td></tr>
            <tr><td style="padding: 8px 12px; border: 1px solid #e5e7eb; font-weight: bold; background: #fff;">Attorneys</td><td style="padding: 8px 12px; border: 1px solid #e5e7eb; background: #fff;">${attorneys}</td></tr>
            <tr><td style="padding: 8px 12px; border: 1px solid #e5e7eb; font-weight: bold; background: #f9fafb;">Practice Areas</td><td style="padding: 8px 12px; border: 1px solid #e5e7eb; background: #f9fafb;">${practiceAreasDisplay}</td></tr>
            <tr><td style="padding: 8px 12px; border: 1px solid #e5e7eb; font-weight: bold; background: #fff;">Markets</td><td style="padding: 8px 12px; border: 1px solid #e5e7eb; background: #fff;">${markets}</td></tr>
            <tr><td style="padding: 8px 12px; border: 1px solid #e5e7eb; font-weight: bold; background: #f9fafb;">Budget</td><td style="padding: 8px 12px; border: 1px solid #e5e7eb; background: #f9fafb;">${budget}</td></tr>
            <tr><td style="padding: 8px 12px; border: 1px solid #e5e7eb; font-weight: bold; background: #fff;">Growth Goal</td><td style="padding: 8px 12px; border: 1px solid #e5e7eb; background: #fff;">${growthGoal}</td></tr>
            ${notes ? `<tr><td style="padding: 8px 12px; border: 1px solid #e5e7eb; font-weight: bold; background: #f9fafb;">Notes</td><td style="padding: 8px 12px; border: 1px solid #e5e7eb; background: #f9fafb;">${notes}</td></tr>` : ""}
          </table>
          <p style="margin-top: 16px; color: #6b7280; font-size: 13px;">Reply to this email to contact the prospect directly.</p>
        </div>
      </div>
    `;

    await resend.emails.send({
      from: "JurisPage Leads <leads@jurispage.com>",
      to: ["cmeraz@jurisdigital.com", "ahatcher@jurisdigital.com", "jmeans@jurisdigital.com"],
      subject: `Juris Digital Growth Assessment: ${fullName} - ${attorneys} Attorneys | ${practiceAreasDisplay}`,
      html: internalHtml,
      replyTo: email,
    });

    // ── Prospect email ─────────────────────────────────────────────────
    const prospectHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1a1a1a; padding: 24px 32px;">
          <h1 style="color: #EE6C13; font-size: 22px; margin: 0;">Your Growth Strategy Session Application</h1>
        </div>
        <div style="padding: 32px; background: #ffffff;">
          <p style="color: #374151;">Hi ${fullName},</p>
          <p style="color: #555; line-height: 1.7;">Thank you for applying for a Growth Strategy Session. We take every application seriously and want to make sure we can deliver meaningful results for your firm before we move forward.</p>
          <div style="background: #f9fafb; border-radius: 12px; padding: 20px 24px; margin: 24px 0; border: 1px solid #e5e7eb;">
            <p style="font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; color: #9ca3af; margin: 0 0 12px;">What Happens Next</p>
            <ol style="color: #555; font-size: 14px; margin: 0; padding-left: 18px; line-height: 2.2;">
              <li>A senior strategist will review your application and research your market</li>
              <li>We'll reach out within <strong>one business day</strong> to schedule your session</li>
              <li>You'll receive a 45-minute Growth Strategy Session tailored to your firm</li>
              <li>You decide if it's the right fit, no pressure, no obligation</li>
            </ol>
          </div>
          <div style="background: #f9fafb; border-radius: 12px; padding: 20px 24px; margin: 24px 0; border: 1px solid #e5e7eb;">
            <p style="font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; color: #9ca3af; margin: 0 0 12px;">What Juris Digital Delivers</p>
            <ul style="color: #555; font-size: 14px; margin: 0; padding-left: 18px; line-height: 2;">
              <li>Full-service SEO, GEO, and content strategy</li>
              <li>Google Ads and LSA management</li>
              <li>Custom website design and development</li>
              <li>Dedicated strategist embedded with your team</li>
              <li>Market exclusivity: limited partnerships per market</li>
              <li>Advanced intake consulting and optimization</li>
            </ul>
          </div>
          <div style="margin: 28px 0;">
            <a href="https://jurisdigital.com" style="display: inline-block; background: #EE6C13; color: white; font-weight: bold; padding: 14px 28px; border-radius: 100px; text-decoration: none; font-size: 15px;">Explore Juris Digital →</a>
          </div>
          <p style="color: #6b7280; font-size: 14px;">Questions? Call us at <a href="tel:+18555936935" style="color: #EE6C13;">(855) 593-6935</a></p>
          <p style="color: #555; font-size: 14px; margin-top: 24px;">- The JurisPage + Juris Digital Team</p>
        </div>
        <div style="background: #f5f5f5; padding: 16px 32px; text-align: center;">
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">JurisPage + Juris Digital · Law Firm Marketing</p>
        </div>
      </div>
    `;

    await resend.emails.send({
      from: "Juris Digital <hello@jurispage.com>",
      to: [email],
      subject: "Your Growth Strategy Session Application",
      html: prospectHtml,
    });

    // HubSpot submission (awaited so it completes before serverless function exits)
    const formGuid = process.env.HUBSPOT_FORM_GUID;
    console.log("[GrowthAssessment] HUBSPOT_FORM_GUID:", formGuid ? "set" : "MISSING");
    if (formGuid) {
      const [first, ...rest] = (fullName || "").trim().split(" ");
      const last = rest.join(" ");
      try {
        await submitToHubSpot(
          formGuid,
          [
            { name: "firstname", value: first },
            { name: "lastname", value: last },
            { name: "email", value: email },
            { name: "phone", value: phone || "" },
            { name: "company", value: firmName || "" },
            { name: "number_of_attorneys", value: attorneys || "" },
            { name: "practice_area", value: practiceAreasDisplay },
            { name: "target_market", value: markets || "" },
            { name: "monthly_budget", value: budget || "" },
            { name: "growth_goal", value: growthGoal || "" },
            { name: "message", value: notes || "" },
            { name: "form_source", value: "growth-assessment" },
          ],
          { hutk: body.hutk, pageUri: body.pageUri, pageName: body.pageName }
        );
        console.log("[GrowthAssessment] HubSpot submission succeeded");
      } catch (err) {
        console.error("[GrowthAssessment] HubSpot submission failed:", err);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Growth assessment API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
