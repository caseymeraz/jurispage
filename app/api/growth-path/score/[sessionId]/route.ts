import { NextRequest, NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { computeAllScores } from "@/lib/growth-path/scoring";

export const maxDuration = 300;
import { buildRecommendation } from "@/lib/growth-path/recommendation-engine";
import { generateNarrative } from "@/lib/growth-path/narrative";
import {
  notifyHighValueLead,
  notifyInternalTeam,
  sendReportReadyEmail,
} from "@/lib/growth-path/notifications";
import type { IntakeAnswers, FlowType, VisionAnalysis } from "@/lib/growth-path/types";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId } = await params;

    const session = await prisma.growthPathSession.findUnique({
      where: { id: sessionId },
      include: { scans: true, lead: true },
    });

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    // Build scan results map
    const scanResults: Record<string, unknown> = {};
    for (const scan of session.scans) {
      if (scan.status === "complete" && scan.result) {
        scanResults[scan.scanType] = scan.result;
      }
    }

    const intakeAnswers = session.intakeAnswers as IntakeAnswers | null;
    const isNewFirm = session.flowType === "new_firm";

    // Compute all 7 scores
    const scores = computeAllScores(intakeAnswers, scanResults, isNewFirm);

    // Transition to scoring
    await prisma.growthPathSession.update({
      where: { id: sessionId },
      data: { status: "scoring" },
    });

    // Save scores
    await prisma.growthPathScore.upsert({
      where: { sessionId },
      create: {
        sessionId,
        urgency: scores.urgency,
        foundation: scores.foundation,
        visibilityGap: scores.visibilityGap,
        websiteClarity: scores.websiteClarity,
        leadQuality: scores.leadQuality,
        legacyFit: scores.legacyFit,
        committeeScore: scores.committeeScore,
        rawInputs: { scanResults: Object.keys(scanResults), intakeAnswers } as unknown as Prisma.InputJsonValue,
      },
      update: {
        urgency: scores.urgency,
        foundation: scores.foundation,
        visibilityGap: scores.visibilityGap,
        websiteClarity: scores.websiteClarity,
        leadQuality: scores.leadQuality,
        legacyFit: scores.legacyFit,
        committeeScore: scores.committeeScore,
        rawInputs: { scanResults: Object.keys(scanResults), intakeAnswers } as unknown as Prisma.InputJsonValue,
      },
    });

    // Build recommendation
    const recommendation = buildRecommendation(
      scores,
      intakeAnswers,
      session.flowType as FlowType
    );

    // Generate narrative
    const keywordData = scanResults.keyword_volume as { totalVolume?: number } | undefined;
    const mapsData = scanResults.maps_competition as { totalFound?: number } | undefined;
    const competitorData = scanResults.competitor_density as { firmCount?: number } | undefined;
    const visionData = scanResults.vision_analysis as VisionAnalysis | undefined;

    let narrative;
    try {
      narrative = await generateNarrative({
        firmName: session.lead.firmName || "Your firm",
        city: session.city || "",
        state: session.state || "",
        practiceArea: session.practiceArea || "Personal Injury",
        isNewFirm,
        scores,
        primaryPath: recommendation.primaryPath,
        secondaryPath: recommendation.secondaryPath,
        keywordDemand: keywordData?.totalVolume ?? 0,
        competitorCount: competitorData?.firmCount ?? 0,
        mapsCompetitorCount: mapsData?.totalFound ?? 0,
        visionFindings: visionData?.top_findings?.map((f) => f.title) ?? [],
      });
    } catch (err) {
      console.error("Narrative generation failed:", err);
      narrative = {
        situationSummary: "",
        marketSummary: "",
        whyThisPath: recommendation.explanationShort,
        whatShouldWait: "",
      };
    }

    // Save recommendation
    await prisma.growthPathRecommendation.upsert({
      where: { sessionId },
      create: {
        sessionId,
        primaryPath: recommendation.primaryPath,
        secondaryPath: recommendation.secondaryPath,
        notYetPath: recommendation.notYetPath,
        brandRoute: recommendation.brandRoute,
        explanationShort: narrative.whyThisPath || recommendation.explanationShort,
        explanationLong: narrative.situationSummary || recommendation.explanationLong,
        days1to30: recommendation.days1to30 as unknown as Prisma.InputJsonValue,
        days31to60: recommendation.days31to60 as unknown as Prisma.InputJsonValue,
        days61to90: recommendation.days61to90 as unknown as Prisma.InputJsonValue,
        internalScores: scores as unknown as Prisma.InputJsonValue,
      },
      update: {
        primaryPath: recommendation.primaryPath,
        secondaryPath: recommendation.secondaryPath,
        notYetPath: recommendation.notYetPath,
        brandRoute: recommendation.brandRoute,
        explanationShort: narrative.whyThisPath || recommendation.explanationShort,
        explanationLong: narrative.situationSummary || recommendation.explanationLong,
        days1to30: recommendation.days1to30 as unknown as Prisma.InputJsonValue,
        days31to60: recommendation.days31to60 as unknown as Prisma.InputJsonValue,
        days61to90: recommendation.days61to90 as unknown as Prisma.InputJsonValue,
        internalScores: scores as unknown as Prisma.InputJsonValue,
      },
    });

    // Transition to report_ready
    await prisma.growthPathSession.update({
      where: { id: sessionId },
      data: { status: "report_ready" },
    });

    // Log event
    await prisma.growthPathEvent.create({
      data: {
        sessionId,
        event: "report_ready",
        metadata: {
          primaryPath: recommendation.primaryPath,
          brandRoute: recommendation.brandRoute,
          scores,
        } as unknown as Prisma.InputJsonValue,
      },
    });

    // Notify internal team
    notifyInternalTeam(session, session.lead, recommendation.primaryPath);

    // Send report ready email
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL
      || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://jurispage.com");
    sendReportReadyEmail(
      session.lead,
      `${baseUrl}/growth-path/report/${session.accessToken}`
    ).catch((err) => console.error("Report email failed:", err));

    // High-value lead alert
    const attorneyCount = intakeAnswers && "attorneyCount" in intakeAnswers
      ? (intakeAnswers as { attorneyCount?: string }).attorneyCount || "0"
      : "0";
    const attorneyNum = parseInt(attorneyCount);

    if (scores.legacyFit >= 70 || (scores.urgency >= 80 && attorneyNum >= 6)) {
      notifyHighValueLead(session, session.lead, scores, attorneyCount);
    }

    return NextResponse.json({ success: true, primaryPath: recommendation.primaryPath });
  } catch (error) {
    console.error("Growth path scoring error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
