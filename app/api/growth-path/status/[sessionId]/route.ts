import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId } = await params;

    const session = await prisma.growthPathSession.findUnique({
      where: { id: sessionId },
      include: { scans: true },
    });

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    const completedScans = session.scans.filter(
      (s) => s.status === "complete" || s.status === "failed"
    ).length;
    const totalScans = session.scans.length;

    // Build partial results from completed scans
    const partialResults: Record<string, unknown> = {};
    for (const scan of session.scans) {
      if (scan.status === "complete" && scan.result) {
        const result = scan.result as Record<string, unknown>;
        if (scan.scanType === "keyword_volume") {
          partialResults.keywordDemand = result.totalVolume;
        }
        if (scan.scanType === "competitor_density") {
          partialResults.competitorCount = result.firmCount;
        }
        if (scan.scanType === "maps_competition") {
          partialResults.mapsCompetitorCount = result.totalFound;
        }
        if (scan.scanType === "serp_analysis") {
          const serpData = result as unknown as { firmPresent?: boolean }[];
          if (Array.isArray(serpData)) {
            partialResults.serpPresent = serpData.some(
              (s) => s.firmPresent
            );
          }
        }
      }
    }

    // If scanning and pending scans exist, fire-and-forget to advance work
    if (
      session.status === "scanning" &&
      completedScans < totalScans
    ) {
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000");

      fetch(`${baseUrl}/api/growth-path/scan/${sessionId}`, {
        method: "POST",
      }).catch(() => {});
    }

    return NextResponse.json({
      status: session.status,
      completedScans,
      totalScans,
      accessToken:
        session.status === "report_ready" || session.status === "reviewed"
          ? session.accessToken
          : undefined,
      partialResults,
    });
  } catch (error) {
    console.error("Growth path status error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
