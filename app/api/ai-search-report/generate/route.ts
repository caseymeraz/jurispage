import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/db";
import { generateAiSearchQueries } from "@/lib/market-gap/keywords";
import { checkAiSearchVisibility } from "@/lib/market-gap/ai-search";
import { notifySlack } from "@/lib/slack";
import { verifyTurnstile } from "@/lib/turnstile";

function normalizeDomain(url: string | undefined): string | null {
  if (!url) return null;
  return url
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/+$/, "")
    .toLowerCase();
}

interface RequestBody {
  contactName: string;
  email: string;
  firmName: string;
  website: string;
  practiceArea: string;
  city: string;
  state: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  referrer?: string;
  pageUri?: string;
  turnstileToken?: string;
}

export async function POST(req: NextRequest) {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      { error: "Service temporarily unavailable. Please try again later." },
      { status: 503 }
    );
  }

  try {
    const body: RequestBody = await req.json();

    // Validate required fields
    const { contactName, email, firmName, website, practiceArea, city, state } = body;
    if (!contactName || !email || !firmName || !website || !practiceArea || !city || !state) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    if (!body.turnstileToken || !(await verifyTurnstile(body.turnstileToken))) {
      return NextResponse.json({ error: "Spam verification failed" }, { status: 403 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Rate limit: 1 report per email per 24 hours
    let recentReport;
    try {
      recentReport = await prisma.aiSearchReport.findFirst({
        where: {
          lead: { email: normalizedEmail },
          createdAt: { gte: new Date(Date.now() - 86400000) },
        },
      });
    } catch (dbError) {
      console.error("DB error checking recent reports (ai_search_reports table may not exist):", dbError);
      return NextResponse.json(
        { error: "Service configuration error. Please contact support." },
        { status: 503 }
      );
    }

    if (recentReport) {
      return NextResponse.json(
        { error: "You've already run a report today. Check back in 24 hours." },
        { status: 429 }
      );
    }

    // Upsert lead by email
    const normalizedDomain = normalizeDomain(website);

    let lead;
    try {
      lead = await prisma.lead.findFirst({
        where: { email: normalizedEmail },
      });

      if (lead) {
        lead = await prisma.lead.update({
          where: { id: lead.id },
          data: {
            firmName,
            normalizedDomain: normalizedDomain,
            website,
            practiceArea,
            city,
            state,
            utmSource: body.utmSource,
            utmMedium: body.utmMedium,
            utmCampaign: body.utmCampaign,
            utmTerm: body.utmTerm,
            utmContent: body.utmContent,
            referrer: body.referrer,
          },
        });
      } else {
        lead = await prisma.lead.create({
          data: {
            email: normalizedEmail,
            firmName,
            normalizedDomain: normalizedDomain,
            website,
            practiceArea,
            city,
            state,
            utmSource: body.utmSource,
            utmMedium: body.utmMedium,
            utmCampaign: body.utmCampaign,
            utmTerm: body.utmTerm,
            utmContent: body.utmContent,
            referrer: body.referrer,
          },
        });
      }
    } catch (leadError) {
      console.error("DB error upserting lead (leads table may not exist):", leadError);
      return NextResponse.json(
        { error: "Service configuration error. Please contact support." },
        { status: 503 }
      );
    }

    // Generate queries and run AI search
    const queries = generateAiSearchQueries(practiceArea, city, state);
    let aiResults;
    try {
      aiResults = await checkAiSearchVisibility(queries, normalizedDomain);
    } catch (aiError) {
      console.error("DataForSEO AI search error:", aiError);
      return NextResponse.json(
        { error: "AI search analysis temporarily unavailable. Please try again later." },
        { status: 502 }
      );
    }

    const queriesRun = aiResults.length;
    const queriesFound = aiResults.filter((r) => r.found).length;

    // Save report
    let report;
    try {
      report = await prisma.aiSearchReport.create({
        data: {
          leadId: lead.id,
          practiceArea,
          city,
          state,
          firmDomain: normalizedDomain,
          results: aiResults as unknown as import("@prisma/client").Prisma.InputJsonValue,
          queriesRun,
          queriesFound,
        },
      });
    } catch (saveError) {
      console.error("DB error saving AI search report:", saveError);
      return NextResponse.json(
        { error: "Failed to save report. Please try again later." },
        { status: 503 }
      );
    }

    // Send internal notification
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: "JurisPage Leads <leads@jurispage.com>",
        to: ["cmeraz@jurisdigital.com"],
        subject: `AI Search Report: ${firmName} - ${practiceArea} in ${city}, ${state}`,
        html: `
          <h2>New AI Search Report</h2>
          <table style="border-collapse: collapse; width: 100%; font-family: sans-serif;">
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Contact</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${contactName}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${normalizedEmail}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Firm</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${firmName}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Website</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${website}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Practice Area</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${practiceArea}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Target Market</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${city}, ${state}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Found in AI</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${queriesFound} of ${queriesRun} queries</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Report ID</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${report.id}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">UTM Source</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${body.utmSource || "N/A"}</td>
            </tr>
          </table>
        `,
        replyTo: normalizedEmail,
      });
    } catch (emailError) {
      console.error("Notification email error:", emailError);
    }

    // Slack notification
    notifySlack("New AI Search Report", {
      Firm: firmName,
      Email: normalizedEmail,
      "Practice Area": practiceArea,
      Market: `${city}, ${state}`,
      Domain: normalizedDomain || "N/A",
      "Page URL": body.pageUri || "N/A",
    });

    return NextResponse.json({
      reportId: report.id,
      practiceArea,
      city,
      state,
      firmDomain: normalizedDomain,
      queriesRun,
      queriesFound,
      results: aiResults,
    });
  } catch (error) {
    console.error("AI search report error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
