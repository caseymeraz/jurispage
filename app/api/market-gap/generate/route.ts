import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { generateTeaserKeywords, getMapsQuery, generateAiSearchQueries } from "@/lib/market-gap/keywords";
import { getSearchVolume, getMapsResults } from "@/lib/dataforseo";
import { assembleTeaserData } from "@/lib/market-gap/teaser";
import { checkAiSearchVisibility } from "@/lib/market-gap/ai-search";
import { getStateFullName } from "@/lib/us-states";

// Normalize domain: strip protocol, www, trailing slash
function normalizeDomain(url: string | undefined): string | null {
  if (!url) return null;
  return url
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/+$/, "")
    .toLowerCase();
}

interface GenerateRequestBody {
  email: string;
  firmName?: string;
  googlePlaceId?: string;
  website?: string;
  phone?: string;
  formattedAddress?: string;
  lat?: number;
  lng?: number;
  city?: string;
  state?: string;
  country?: string;
  practiceArea?: string;
  secondaryPracticeArea?: string;
  targetCity?: string;
  targetState?: string;
  isNewFirm?: boolean;
  caseValue?: string;
  leadVolume?: string;
  responseTime?: string;
  afterHours?: boolean;
  crmService?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  referrer?: string;
  clickId?: string;
  gclid?: string;
  step?: 1 | 2 | 3;
  leadId?: string;
}

export async function POST(req: NextRequest) {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      { error: "Service temporarily unavailable. Please try again later." },
      { status: 503 }
    );
  }

  try {
    const body: GenerateRequestBody = await req.json();
    const { step = 3 } = body;

    if (!body.email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // -------------------------------------------------------
    // Step 1: Create or update lead with email + firm info
    // -------------------------------------------------------
    if (step === 1) {
      const normalizedDomain = normalizeDomain(body.website);

      const lead = body.leadId
        ? await prisma.lead.update({
            where: { id: body.leadId },
            data: {
              email: body.email,
              firmName: body.firmName,
              googlePlaceId: body.googlePlaceId,
              normalizedDomain: normalizedDomain,
              website: body.website,
              phone: body.phone,
              lat: body.lat,
              lng: body.lng,
              city: body.city,
              state: body.state,
              country: body.country || "US",
              isNewFirm: body.isNewFirm ?? false,
              utmSource: body.utmSource,
              utmMedium: body.utmMedium,
              utmCampaign: body.utmCampaign,
              utmTerm: body.utmTerm,
              utmContent: body.utmContent,
              referrer: body.referrer,
              clickId: body.clickId,
              gclid: body.gclid,
            },
          })
        : await prisma.lead.create({
            data: {
              email: body.email,
              firmName: body.firmName,
              googlePlaceId: body.googlePlaceId,
              normalizedDomain: normalizedDomain,
              website: body.website,
              phone: body.phone,
              lat: body.lat,
              lng: body.lng,
              city: body.city,
              state: body.state,
              country: body.country || "US",
              isNewFirm: body.isNewFirm ?? false,
              utmSource: body.utmSource,
              utmMedium: body.utmMedium,
              utmCampaign: body.utmCampaign,
              utmTerm: body.utmTerm,
              utmContent: body.utmContent,
              referrer: body.referrer,
              clickId: body.clickId,
              gclid: body.gclid,
            },
          });

      return NextResponse.json({ leadId: lead.id });
    }

    // -------------------------------------------------------
    // Step 2: Update lead with practice area + target market
    // -------------------------------------------------------
    if (step === 2) {
      if (!body.leadId) {
        return NextResponse.json(
          { error: "leadId is required for step 2" },
          { status: 400 }
        );
      }

      await prisma.lead.update({
        where: { id: body.leadId },
        data: {
          practiceArea: body.practiceArea,
          secondaryPracticeArea: body.secondaryPracticeArea,
          city: body.targetCity || body.city,
          state: body.targetState || body.state,
        },
      });

      return NextResponse.json({ leadId: body.leadId });
    }

    // -------------------------------------------------------
    // Step 3 / Full submit: Update lead, create report, run teaser generation
    // -------------------------------------------------------
    if (!body.leadId) {
      return NextResponse.json(
        { error: "leadId is required for step 3" },
        { status: 400 }
      );
    }

    // Update lead with intake answers
    const lead = await prisma.lead.update({
      where: { id: body.leadId },
      data: {
        practiceArea: body.practiceArea,
        secondaryPracticeArea: body.secondaryPracticeArea,
        city: body.targetCity || body.city,
        state: body.targetState || body.state,
        intakeAnswers: {
          caseValue: body.caseValue,
          leadVolume: body.leadVolume,
          responseTime: body.responseTime,
          afterHours: body.afterHours,
          crmService: body.crmService,
        },
      },
    });

    const practiceArea = body.practiceArea || lead.practiceArea;
    const reportCity = body.targetCity || body.city || lead.city;
    const reportState = body.targetState || body.state || lead.state;

    if (!practiceArea || !reportCity || !reportState) {
      return NextResponse.json(
        { error: "Practice area, city, and state are required" },
        { status: 400 }
      );
    }

    // Create report record with status "pending"
    const report = await prisma.marketGapReport.create({
      data: {
        leadId: lead.id,
        status: "pending",
        practiceArea,
        city: reportCity,
        state: reportState,
        country: body.country || lead.country || "US",
        lat: body.lat ?? lead.lat,
        lng: body.lng ?? lead.lng,
      },
    });

    // Log creation event
    await prisma.marketGapEvent.create({
      data: {
        reportId: report.id,
        event: "report_created",
        metadata: {
          email: lead.email,
          firmName: lead.firmName,
          practiceArea,
          city: reportCity,
          state: reportState,
        } as unknown as Prisma.InputJsonValue,
      },
    });

    // -------------------------------------------------------
    // Run teaser generation inline (keyword volume + maps)
    // -------------------------------------------------------
    try {
      // Generate keywords, maps query, and AI search queries
      const teaserKeywords = generateTeaserKeywords(
        practiceArea,
        reportCity,
        reportState
      );
      const mapsQuery = getMapsQuery(practiceArea, reportCity);
      const aiQueries = generateAiSearchQueries(practiceArea, reportCity, reportState);

      // Build location name for local volume
      const stateFullName = getStateFullName(reportState);
      const locationName = `${reportCity},${stateFullName},United States`;

      // Default coordinates for maps (use lead's if available)
      const latitude = body.lat ?? lead.lat ?? 39.8283;
      const longitude = body.lng ?? lead.lng ?? -98.5795;

      // Firm domain for AI search matching
      const firmDomain = lead.normalizedDomain || null;

      // Run DataForSEO calls in parallel
      const [localKeywordVolumes, nationalKeywordVolumes, mapsResults, aiSearchResults] = await Promise.all([
        getSearchVolume(teaserKeywords, 2840, "en", locationName),
        getSearchVolume(teaserKeywords),
        getMapsResults(mapsQuery, latitude, longitude),
        checkAiSearchVisibility(aiQueries, firmDomain),
      ]);

      // Assemble teaser data
      const teaserData = assembleTeaserData(
        nationalKeywordVolumes,
        localKeywordVolumes,
        mapsResults.competitors,
        lead.firmName,
        lead.googlePlaceId,
        aiSearchResults
      );

      // Save keyword records with both local and national volumes
      if (nationalKeywordVolumes.length > 0) {
        const localVolumeMap = new Map<string, number>();
        for (const kv of localKeywordVolumes) {
          localVolumeMap.set(kv.keyword.toLowerCase(), kv.searchVolume);
        }

        await prisma.marketGapKeyword.createMany({
          data: nationalKeywordVolumes.map((kv) => ({
            reportId: report.id,
            keyword: kv.keyword,
            searchVolume: kv.searchVolume,
            localSearchVolume: localVolumeMap.get(kv.keyword.toLowerCase()) ?? 0,
            trend: kv.monthlySearches ? JSON.parse(JSON.stringify(kv.monthlySearches)) : undefined,
          })),
        });
      }

      // Save competitor records
      if (mapsResults.competitors.length > 0) {
        await prisma.marketGapCompetitor.createMany({
          data: mapsResults.competitors.map((c) => ({
            reportId: report.id,
            name: c.title,
            placeId: c.placeId,
            domain: c.domain,
            rating: c.rating,
            reviewCount: c.reviewCount,
            mapPackPosition: c.position,
            cid: c.cid,
            checkUrl: c.checkUrl,
          })),
        });
      }

      // Update report with teaser data
      await prisma.marketGapReport.update({
        where: { id: report.id },
        data: {
          status: "teaser_ready",
          totalSearchVolume: teaserData.totalSearchVolume,
          localSearchVolume: teaserData.localTotalSearchVolume,
          mapPackCompetitors: teaserData.topCompetitors as unknown as Prisma.InputJsonValue,
          firmInMapPack: teaserData.firmInMapPack,
          firmRating: teaserData.firmRating,
          firmReviewCount: teaserData.firmReviewCount,
          biggestGap: teaserData.biggestGap,
          keywordData: teaserData.keywordHighlights as unknown as Prisma.InputJsonValue,
          aiSearchData: teaserData.aiSearchResults as unknown as Prisma.InputJsonValue,
        },
      });

      // Log teaser completion
      await prisma.marketGapEvent.create({
        data: {
          reportId: report.id,
          event: "teaser_generated",
          metadata: {
            totalSearchVolume: teaserData.totalSearchVolume,
            competitorCount: mapsResults.competitors.length,
            keywordCount: nationalKeywordVolumes.length,
            firmInMapPack: teaserData.firmInMapPack,
          } as unknown as Prisma.InputJsonValue,
        },
      });
    } catch (teaserError) {
      console.error("Teaser generation error:", teaserError);

      // Log failure but don't block the response
      await prisma.marketGapEvent.create({
        data: {
          reportId: report.id,
          event: "teaser_generation_failed",
          metadata: {
            error:
              teaserError instanceof Error
                ? teaserError.message
                : "Unknown error",
          } as unknown as Prisma.InputJsonValue,
        },
      });

      // Report remains in "pending" status; can be retried later
    }

    // -------------------------------------------------------
    // Send internal notification email
    // -------------------------------------------------------
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);

      const notificationHtml = `
        <h2>New Market Gap Report Request</h2>
        <table style="border-collapse: collapse; width: 100%; font-family: sans-serif;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${lead.email}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Firm</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${lead.firmName || "N/A"}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Practice Area</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${practiceArea}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Target Market</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${reportCity}, ${reportState}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Website</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${lead.website || "N/A"}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Phone</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${lead.phone || "N/A"}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Report ID</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${report.id}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">UTM Source</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${lead.utmSource || "N/A"}</td>
          </tr>
        </table>
      `;

      await resend.emails.send({
        from: "JurisPage Leads <leads@jurispage.com>",
        to: ["cmeraz@jurisdigital.com"],
        subject: `Market Gap Report: ${lead.firmName || lead.email} - ${practiceArea} in ${reportCity}, ${reportState}`,
        html: notificationHtml,
        replyTo: lead.email,
      });
    } catch (emailError) {
      // Log but don't fail the request over email notification
      console.error("Notification email error:", emailError);
    }

    // Fetch the updated report to get the accessToken and current status
    const updatedReport = await prisma.marketGapReport.findUnique({
      where: { id: report.id },
      select: { id: true, accessToken: true, status: true },
    });

    return NextResponse.json({
      reportId: report.id,
      leadId: lead.id,
      accessToken: updatedReport?.accessToken,
      status: updatedReport?.status || "pending",
    });
  } catch (error) {
    console.error("Market gap generate error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
