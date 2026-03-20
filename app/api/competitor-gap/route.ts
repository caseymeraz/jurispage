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
    const body = await req.json();
    const { email, targetUrl, city, practiceArea, turnstileToken, hutk, pageUri, pageName } = body;

    if (!email || !targetUrl || !city || !practiceArea) {
      return NextResponse.json(
        { error: "Email, target URL, city, and practice area are required" },
        { status: 400 }
      );
    }

    if (!turnstileToken || !(await verifyTurnstile(turnstileToken))) {
      return NextResponse.json(
        { error: "Spam verification failed" },
        { status: 403 }
      );
    }

    const targetDomain = normalizeDomain(targetUrl);
    const searchQuery = buildSearchQuery(practiceArea, city);

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
      serpItems = await getLiveSerpFull(searchQuery);
      rawResponse = serpItems;
      parsed = parseSerpForCompetitorGap(serpItems, targetDomain);
    } catch (err) {
      console.error("[CompetitorGap] DataForSEO call failed:", err);
      // Continue — save lead with empty results
    }

    // Create Lead
    const lead = await prisma.lead.create({
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

    // Create CompetitorScanReport
    const report = await prisma.competitorScanReport.create({
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
    );

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

    return NextResponse.json({ reportId: report.id });
  } catch (error) {
    console.error("Competitor gap error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
