import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { submitToHubSpot } from "@/lib/hubspot";
import { notifySlack } from "@/lib/slack";
import { prisma } from "@/lib/db";
import { verifyTurnstile } from "@/lib/turnstile";

/** Determine persona from answers */
function detectPersona(body: Record<string, unknown>): string {
  const goal = body.primaryGoal as string;
  const vision = (body.twoYearVision as string[]) || [];
  const noWebsite = body.noWebsite as boolean;

  if (goal === "I'm starting from scratch and need everything" || noWebsite) return "Starting From Zero";
  if (goal === "Replace my current agency (it's not working)") return "Being Ripped Off";
  if (goal === "Better quality / higher-value cases") return "Want Better Cases";
  if (vision.includes("New office location(s) opened") || vision.includes("1-2 new attorneys hired") || vision.includes("Moved to a CEO/management role (less day-to-day lawyering)")) return "Ready to Scale";
  return "Need More Cases";
}

export async function POST(req: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await req.json();

    const {
      fullName, email, phone, firmName, website, noWebsite,
      city, state, attorneys, practiceAreas,
      casesPerMonth, caseSources, avgCaseValue, hasAgency, hasGoogleAds,
      primaryGoal, targetCases, twoYearVision, budget,
      biggestFrustration, notes,
    } = body;

    if (!fullName || !email || !firmName || !city || !state || !attorneys) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!body.turnstileToken || !(await verifyTurnstile(body.turnstileToken))) {
      return NextResponse.json({ error: "Spam verification failed" }, { status: 403 });
    }

    const persona = detectPersona(body);
    const practiceAreasDisplay = Array.isArray(practiceAreas) ? practiceAreas.join(", ") : practiceAreas;
    const caseSourcesDisplay = Array.isArray(caseSources) ? caseSources.join(", ") : caseSources;
    const visionDisplay = Array.isArray(twoYearVision) ? twoYearVision.join(", ") : twoYearVision;

    // ── Save to DB ──
    try {
      await prisma.formSubmission.create({
        data: {
          type: "growth-report",
          name: fullName,
          email,
          phone,
          firmName,
          data: {
            website: noWebsite ? "No website" : website,
            city, state, attorneys, practiceAreas,
            casesPerMonth, caseSources, avgCaseValue, hasAgency, hasGoogleAds,
            primaryGoal, targetCases, twoYearVision, budget,
            biggestFrustration, notes, persona,
          },
        },
      });
    } catch (dbError) {
      console.error("FormSubmission save error:", dbError);
    }

    // ── Internal email ──
    const internalHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 640px;">
        <div style="background: #1a1a1a; padding: 20px 28px;">
          <h2 style="color: #EE6C13; margin: 0; font-size: 20px;">Growth Report Request</h2>
          <p style="color: #fbbf24; margin: 8px 0 0; font-size: 14px; font-weight: bold;">Persona: ${persona}</p>
        </div>
        <div style="padding: 24px 28px; background: #f9fafb;">
          <table style="border-collapse: collapse; width: 100%; font-size: 14px;">
            <tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:bold;background:#fff;width:160px;">Name</td><td style="padding:8px 12px;border:1px solid #e5e7eb;background:#fff;">${fullName}</td></tr>
            <tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:bold;background:#f9fafb;">Firm</td><td style="padding:8px 12px;border:1px solid #e5e7eb;background:#f9fafb;">${firmName}</td></tr>
            <tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:bold;background:#fff;">Email</td><td style="padding:8px 12px;border:1px solid #e5e7eb;background:#fff;">${email}</td></tr>
            <tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:bold;background:#f9fafb;">Phone</td><td style="padding:8px 12px;border:1px solid #e5e7eb;background:#f9fafb;">${phone || "N/A"}</td></tr>
            <tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:bold;background:#fff;">Website</td><td style="padding:8px 12px;border:1px solid #e5e7eb;background:#fff;">${noWebsite ? "No website" : website || "N/A"}</td></tr>
            <tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:bold;background:#f9fafb;">Market</td><td style="padding:8px 12px;border:1px solid #e5e7eb;background:#f9fafb;">${city}, ${state}</td></tr>
            <tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:bold;background:#fff;">Attorneys</td><td style="padding:8px 12px;border:1px solid #e5e7eb;background:#fff;">${attorneys}</td></tr>
            <tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:bold;background:#f9fafb;">Practice Areas</td><td style="padding:8px 12px;border:1px solid #e5e7eb;background:#f9fafb;">${practiceAreasDisplay}</td></tr>
            <tr><td colspan="2" style="padding:12px;background:#EE6C13;color:white;font-weight:bold;">Current State</td></tr>
            <tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:bold;background:#fff;">Cases/Month</td><td style="padding:8px 12px;border:1px solid #e5e7eb;background:#fff;">${casesPerMonth}</td></tr>
            <tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:bold;background:#f9fafb;">Case Sources</td><td style="padding:8px 12px;border:1px solid #e5e7eb;background:#f9fafb;">${caseSourcesDisplay}</td></tr>
            <tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:bold;background:#fff;">Avg Case Value</td><td style="padding:8px 12px;border:1px solid #e5e7eb;background:#fff;">${avgCaseValue}</td></tr>
            <tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:bold;background:#f9fafb;">Has Agency</td><td style="padding:8px 12px;border:1px solid #e5e7eb;background:#f9fafb;">${hasAgency || "N/A"}</td></tr>
            <tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:bold;background:#fff;">Google Ads</td><td style="padding:8px 12px;border:1px solid #e5e7eb;background:#fff;">${hasGoogleAds || "N/A"}</td></tr>
            <tr><td colspan="2" style="padding:12px;background:#EE6C13;color:white;font-weight:bold;">Goals</td></tr>
            <tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:bold;background:#fff;">#1 Goal</td><td style="padding:8px 12px;border:1px solid #e5e7eb;background:#fff;">${primaryGoal}</td></tr>
            <tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:bold;background:#f9fafb;">Target Cases/Mo</td><td style="padding:8px 12px;border:1px solid #e5e7eb;background:#f9fafb;">${targetCases || "N/A"}</td></tr>
            <tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:bold;background:#fff;">2-Year Vision</td><td style="padding:8px 12px;border:1px solid #e5e7eb;background:#fff;">${visionDisplay || "N/A"}</td></tr>
            <tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:bold;background:#f9fafb;">Budget</td><td style="padding:8px 12px;border:1px solid #e5e7eb;background:#f9fafb;">${budget}</td></tr>
            <tr><td colspan="2" style="padding:12px;background:#EE6C13;color:white;font-weight:bold;">Pain Points</td></tr>
            <tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:bold;background:#fff;">Frustration</td><td style="padding:8px 12px;border:1px solid #e5e7eb;background:#fff;">${biggestFrustration}</td></tr>
            ${notes ? `<tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:bold;background:#f9fafb;">Notes</td><td style="padding:8px 12px;border:1px solid #e5e7eb;background:#f9fafb;">${notes}</td></tr>` : ""}
          </table>
        </div>
      </div>
    `;

    await resend.emails.send({
      from: "JurisPage Leads <leads@jurispage.com>",
      to: ["cmeraz@jurisdigital.com", "ahatcher@jurisdigital.com", "jmeans@jurisdigital.com"],
      subject: `Growth Report: ${fullName} — ${practiceAreasDisplay} in ${city}, ${state} [${persona}]`,
      html: internalHtml,
      replyTo: email,
    });

    // ── Slack ──
    notifySlack("Growth Report Request", {
      Name: fullName,
      Firm: firmName,
      Email: email,
      Phone: phone || "N/A",
      Market: `${city}, ${state}`,
      Attorneys: attorneys,
      "Practice Areas": practiceAreasDisplay,
      "Cases/Month": casesPerMonth,
      "#1 Goal": primaryGoal,
      Budget: budget,
      Persona: persona,
    }, "new-leads");

    // ── Prospect confirmation email ──
    const prospectHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1a1a1a; padding: 24px 32px;">
          <h1 style="color: #EE6C13; font-size: 22px; margin: 0;">Your Growth Report Is Being Built</h1>
        </div>
        <div style="padding: 32px; background: #ffffff;">
          <p style="color: #374151;">Hi ${fullName.split(" ")[0]},</p>
          <p style="color: #555; line-height: 1.7;">Thank you for requesting a Growth Report for <strong>${firmName}</strong>. A senior strategist is already reviewing your answers and researching the <strong>${practiceAreasDisplay.toLowerCase()}</strong> market in <strong>${city}, ${state}</strong>.</p>
          <div style="background: #FEF3EC; border-radius: 12px; padding: 20px 24px; margin: 24px 0; border-left: 4px solid #EE6C13;">
            <p style="font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; color: #9ca3af; margin: 0 0 12px;">What happens next</p>
            <ol style="color: #555; font-size: 14px; margin: 0; padding-left: 18px; line-height: 2.2;">
              <li>We research your market, competitors, and keyword opportunities</li>
              <li>Your personalized Growth Report lands in your inbox within <strong>24 hours</strong></li>
              <li>We schedule a brief call to walk through the findings and recommendations</li>
            </ol>
          </div>
          <p style="color: #555; line-height: 1.7;">Your report will include a competitive analysis, visibility score, keyword opportunities, and a clear recommendation tailored to your firm's goals and budget.</p>
          <p style="color: #6b7280; font-size: 14px; margin-top: 24px;">Questions in the meantime? Call us at <a href="tel:+18555936935" style="color: #EE6C13;">(855) 593-6935</a></p>
          <p style="color: #555; font-size: 14px; margin-top: 16px;">The JurisPage Team</p>
        </div>
        <div style="background: #f5f5f5; padding: 16px 32px; text-align: center;">
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">JurisPage · Law Firm Marketing</p>
        </div>
      </div>
    `;

    await resend.emails.send({
      from: "JurisPage <hello@jurispage.com>",
      to: [email],
      subject: `Your Growth Report for ${firmName} Is Being Built`,
      html: prospectHtml,
    });

    // ── HubSpot ──
    const formGuid = process.env.HUBSPOT_FORM_GUID;
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
            { name: "website", value: noWebsite ? "" : website || "" },
            { name: "number_of_attorneys", value: attorneys || "" },
            { name: "practice_area", value: practiceAreasDisplay },
            { name: "target_market", value: `${city}, ${state}` },
            { name: "monthly_budget", value: budget || "" },
            { name: "growth_goal", value: primaryGoal || "" },
            { name: "message", value: `[${persona}] Cases/mo: ${casesPerMonth} | Target: ${targetCases || "N/A"} | Frustration: ${biggestFrustration}${notes ? ` | Notes: ${notes}` : ""}` },
            { name: "form_source", value: "growth-report" },
          ],
          { hutk: body.hutk, pageUri: body.pageUri, pageName: body.pageName }
        );
      } catch (err) {
        console.error("[GrowthReport] HubSpot submission failed:", err);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Growth report API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
