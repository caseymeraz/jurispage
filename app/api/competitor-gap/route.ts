import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/db";
import { submitToHubSpot } from "@/lib/hubspot";
import { notifySlack } from "@/lib/slack";
import { verifyTurnstile } from "@/lib/turnstile";
import { getLiveSerpFull, parseSerpForCompetitorGap } from "@/lib/dataforseo";

function normalizeDomain(input: string): string {
  let d = input.toLowerCase().trim();
  d = d.replace(/^https?:\/\//, "");
  d = d.replace(/^www\./, "");
  d = d.replace(/\/+$/, "");
  return d;
}

function buildSearchQuery(practiceArea: string, city: string): string {
  // "Business / Corporate" → "Business Lawyer Chicago"
  const cleanedArea = practiceArea.split("/")[0].trim();
  return `${cleanedArea} Lawyer ${city.trim()}`;
}

export async function POST(req: NextRequest) {
  try {
    console.log("[CompetitorGap] === START REQUEST ===");

    const body = await req.json();
    const { email, targetUrl, city, practiceArea, turnstileToken, hutk, pageUri, pageName } = body;
    console.log("[CompetitorGap] Parsed body:", { email, targetUrl, city, practiceArea, hasTurnstileToken: !!turnstileToken, hutk: !!hutk });

    if (!email || !targetUrl || !city || !practiceArea) {
      console.log("[CompetitorGap] Missing required fields");
      return NextResponse.json(
        { error: "Email, target URL, city, and practice area are required" },
        { status: 400 }
      );
    }

    console.log("[CompetitorGap] Verifying Turnstile token...");
    if (!turnstileToken || !(await verifyTurnstile(turnstileToken))) {
      console.log("[CompetitorGap] Turnstile verification failed. Token present:", !!turnstileToken);
      return NextResponse.json(
        { error: "Spam verification failed. Please refresh and try again." },
        { status: 403 }
      );
    }
    console.log("[CompetitorGap] Turnstile verified OK");

    const targetDomain = normalizeDomain(targetUrl);
    const searchQuery = buildSearchQuery(practiceArea, city);
    console.log("[CompetitorGap] targetDomain:", targetDomain, "searchQuery:", searchQuery);

    // Call DataForSEO SERP API
    let serpItems: Awaited<ReturnType<typeof getLiveSerpFull>> = [];
    let rawResponse: unknown = null;
    let parsed = {
      localPackItems: [] as Array<{ name: string; domain: string; position: number }>,
      organicItems: [] as Array<{ domain: string; title: string; url: string; position: number }>,
      targetRank: null as number | null,
      targetInLocalPack: false,
    };

    try {
      console.log("[CompetitorGap] Calling DataForSEO getLiveSerpFull...");
      serpItems = await getLiveSerpFull(searchQuery);
      rawResponse = serpItems;
      console.log("[CompetitorGap] DataForSEO returned", serpItems.length, "items");
      parsed = parseSerpForCompetitorGap(serpItems, targetDomain);
      console.log("[CompetitorGap] Parsed SERP:", {
        localPackCount: parsed.localPackItems.length,
        organicCount: parsed.organicItems.length,
        targetRank: parsed.targetRank,
        targetInLocalPack: parsed.targetInLocalPack,
      });
    } catch (err) {
      console.error("[CompetitorGap] DataForSEO call failed:", err instanceof Error ? err.message : err);
      console.error("[CompetitorGap] DataForSEO stack:", err instanceof Error ? err.stack : "N/A");
      // Continue — save lead with empty results
    }

    // Create Lead
    console.log("[CompetitorGap] Creating lead in DB...");
    let lead;
    try {
      lead = await prisma.lead.create({
        data: {
          email,
          website: targetUrl,
          normalizedDomain: targetDomain,
          practiceArea,
          city,
          utmSource: body.utmSource || null,
          utmMedium: body.utmMedium || null,
          utmCampaign: body.utmCampaign || null,
          utmTerm: body.utmTerm || null,
          utmContent: body.utmContent || null,
          referrer: body.referrer || null,
        },
      });
      console.log("[CompetitorGap] Lead created:", lead.id);
    } catch (dbErr) {
      console.error("[CompetitorGap] FAILED to create Lead:", dbErr instanceof Error ? dbErr.message : dbErr);
      console.error("[CompetitorGap] Lead creation stack:", dbErr instanceof Error ? dbErr.stack : "N/A");
      return NextResponse.json(
        { error: `Failed to save lead: ${dbErr instanceof Error ? dbErr.message : String(dbErr)}` },
        { status: 500 }
      );
    }

    // Create CompetitorScanReport
    console.log("[CompetitorGap] Creating CompetitorScanReport in DB...");
    let report;
    try {
      report = await prisma.competitorScanReport.create({
        data: {
          leadId: lead.id,
          targetUrl,
          targetDomain,
          city,
          practiceArea,
          searchQuery,
          localPackItems: parsed.localPackItems,
          organicItems: parsed.organicItems,
          targetRank: parsed.targetRank,
          targetInLocalPack: parsed.targetInLocalPack,
          rawResponse: rawResponse as object ?? undefined,
        },
      });
      console.log("[CompetitorGap] Report created:", report.id);
    } catch (dbErr) {
      const errMsg = dbErr instanceof Error ? dbErr.message : String(dbErr);
      console.error("[CompetitorGap] FAILED to create CompetitorScanReport:", errMsg);
      console.error("[CompetitorGap] Report creation stack:", dbErr instanceof Error ? dbErr.stack : "N/A");
      console.error("[CompetitorGap] Report creation data:", JSON.stringify({
        leadId: lead.id,
        targetUrl,
        targetDomain,
        city,
        practiceArea,
        searchQuery,
        localPackCount: parsed.localPackItems.length,
        organicCount: parsed.organicItems.length,
        targetRank: parsed.targetRank,
        targetInLocalPack: parsed.targetInLocalPack,
        rawResponseType: typeof rawResponse,
        rawResponseNull: rawResponse === null,
      }));
      return NextResponse.json(
        { error: `Failed to generate report: ${errMsg}` },
        { status: 500 }
      );
    }

    // Fire-and-forget: Slack, HubSpot, email
    const resend = new Resend(process.env.RESEND_API_KEY);

    const topCompetitor = parsed.organicItems[0]?.domain || "N/A";

    // Slack
    notifySlack(
      "Competitor Gap Scan Completed",
      {
        Email: email,
        Domain: targetDomain,
        City: city,
        "Practice Area": practiceArea,
        "Search Query": searchQuery,
        "Target Rank": parsed.targetRank ? `#${parsed.targetRank}` : "Not in Top 100",
        "In Local Pack": parsed.targetInLocalPack ? "Yes" : "No",
        "Top Competitor": topCompetitor,
        "Report URL": `${process.env.NEXT_PUBLIC_SITE_URL || "https://jurispage.com"}/competitor-report/${report.id}`,
      },
      "lead-magnets"
    ).catch((err: unknown) => console.error("[CompetitorGap] Slack notification failed:", err));

    // HubSpot
    const formGuid = process.env.HUBSPOT_FORM_GUID;
    if (formGuid) {
      submitToHubSpot(
        formGuid,
        [
          { name: "email", value: email },
          { name: "form_source", value: "competitor-gap-scan" },
          { name: "website", value: targetUrl },
        ],
        { hutk, pageUri, pageName }
      ).catch((err: unknown) => console.error("[CompetitorGap] HubSpot failed:", err));
    }

    // Team email
    const emailHtml = `
      <h2>COMPETITOR GAP SCAN COMPLETED</h2>
      <p style="color: #EE6C13; font-weight: bold;">New lead from Law Firm SEO page</p>
      <table style="border-collapse: collapse; width: 100%;">
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email</td><td style="padding: 8px; border: 1px solid #ddd;">${email}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Domain</td><td style="padding: 8px; border: 1px solid #ddd;">${targetDomain}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">City</td><td style="padding: 8px; border: 1px solid #ddd;">${city}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Practice Area</td><td style="padding: 8px; border: 1px solid #ddd;">${practiceArea}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Target Rank</td><td style="padding: 8px; border: 1px solid #ddd;">${parsed.targetRank ? `#${parsed.targetRank}` : "Not in Top 100"}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">In Local Pack</td><td style="padding: 8px; border: 1px solid #ddd;">${parsed.targetInLocalPack ? "Yes" : "No"}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Report</td><td style="padding: 8px; border: 1px solid #ddd;"><a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://jurispage.com"}/competitor-report/${report.id}">View Report</a></td></tr>
      </table>
    `;

    resend.emails.send({
      from: "JurisPage Leads <leads@jurispage.com>",
      to: [
        "cmeraz@jurisdigital.com",
        "ahatcher@jurisdigital.com",
        "jmeans@jurisdigital.com",
      ],
      subject: `COMPETITOR GAP SCAN: ${email} — ${targetDomain}`,
      html: emailHtml,
      replyTo: email,
    }).catch((err: unknown) => console.error("[CompetitorGap] Email send failed:", err));

    console.log("[CompetitorGap] === SUCCESS === reportId:", report.id);
    return NextResponse.json({ reportId: report.id });
  } catch (error) {
    console.error("[CompetitorGap] === UNHANDLED ERROR ===");
    console.error("[CompetitorGap] Error type:", typeof error);
    console.error("[CompetitorGap] Error message:", error instanceof Error ? error.message : String(error));
    console.error("[CompetitorGap] Error stack:", error instanceof Error ? error.stack : "N/A");
    console.error("[CompetitorGap] Full error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
