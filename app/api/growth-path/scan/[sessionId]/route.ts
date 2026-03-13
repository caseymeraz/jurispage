import { NextRequest, NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { generatePIKeywords, getPIMapsQuery, getPISerpKeywords } from "@/lib/growth-path/keywords";
import {
  runKeywordVolumeScan,
  runSerpAnalysisScan,
  runMapsCompetitionScan,
  runCompetitorDensityScan,
  runPageSpeedScan,
  runSerpScreenshotScan,
  captureWebsiteScreenshots,
  analyzeScreenshots,
} from "@/lib/growth-path/scans";
import { geocodeCityState } from "@/lib/dataforseo";
import type { ScanType } from "@/lib/growth-path/types";

export const maxDuration = 300;

// Scan waves: grouped by dependency
const WAVE_1: ScanType[] = [
  "keyword_volume",
  "serp_analysis",
  "serp_screenshot",
  "maps_competition",
  "competitor_density",
  "pagespeed",
];
const WAVE_2: ScanType[] = ["website_screenshot"];
const WAVE_3: ScanType[] = ["vision_analysis"];

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId } = await params;

    const session = await prisma.growthPathSession.findUnique({
      where: { id: sessionId },
      include: { scans: true, assets: true },
    });

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    const city = session.city || "";
    const state = session.state || "";
    // Geocode when session has no coordinates instead of defaulting to Kansas
    const hasCoords = session.lat !== null && session.lng !== null;
    const fallbackCoords = hasCoords ? null : await geocodeCityState(city, state);
    const lat = session.lat ?? fallbackCoords?.lat ?? 39.8283;
    const lng = session.lng ?? fallbackCoords?.lng ?? -98.5795;

    // Save geocoded coords back to session so we don't re-geocode on subsequent requests
    if (!hasCoords && fallbackCoords) {
      await prisma.growthPathSession.update({
        where: { id: sessionId },
        data: { lat: fallbackCoords.lat, lng: fallbackCoords.lng },
      });
    }
    const practiceArea = session.practiceArea || "Personal Injury";
    const firmDomain = session.firmDomain;
    const websiteUrl = session.website;
    const currentSessionId = session.id;
    const currentSessionStatus = session.status;

    // Find pending scans grouped by wave
    const scanMap = new Map(session.scans.map((s) => [s.scanType, s]));

    async function runScan(scanType: ScanType) {
      const scan = scanMap.get(scanType);
      if (!scan || scan.status === "complete" || scan.status === "running") return;

      // Mark running
      await prisma.growthPathScan.update({
        where: { id: scan.id },
        data: { status: "running", startedAt: new Date() },
      });

      try {
        let result: unknown;

        switch (scanType) {
          case "keyword_volume": {
            const keywords = generatePIKeywords(city);
            result = await runKeywordVolumeScan(keywords, city, state);
            break;
          }
          case "serp_analysis": {
            const serpKeywords = getPISerpKeywords(city);
            result = await runSerpAnalysisScan(serpKeywords, 2840, firmDomain);
            break;
          }
          case "serp_screenshot": {
            const keywordWithCity = getPIMapsQuery(city);
            const keywordWithout = "personal injury lawyer";
            result = await runSerpScreenshotScan(
              [keywordWithCity, keywordWithout],
              2840
            );
            break;
          }
          case "maps_competition": {
            const mapsQuery = getPIMapsQuery(city);
            result = await runMapsCompetitionScan(mapsQuery, lat, lng);
            break;
          }
          case "competitor_density": {
            result = await runCompetitorDensityScan(practiceArea, city, lat, lng);
            break;
          }
          case "pagespeed": {
            if (!websiteUrl) throw new Error("No website URL");
            result = await runPageSpeedScan(websiteUrl);
            break;
          }
          case "website_screenshot": {
            if (!websiteUrl) throw new Error("No website URL");
            const screenshots = await captureWebsiteScreenshots(websiteUrl);
            if (screenshots.length === 0) {
              throw new Error("Screenshot capture returned no images");
            }
            // Save assets
            for (let i = 0; i < screenshots.length; i++) {
              await prisma.growthPathAsset.create({
                data: {
                  sessionId: currentSessionId,
                  assetType: screenshots[i].type,
                  url: screenshots[i].url,
                  caption: screenshots[i].caption,
                  sortOrder: i,
                },
              });
            }
            result = screenshots;
            break;
          }
          case "vision_analysis": {
            // Get screenshot assets from the session
            const assets = await prisma.growthPathAsset.findMany({
              where: { sessionId: currentSessionId },
            });
            if (assets.length === 0) throw new Error("No screenshots available");
            result = await analyzeScreenshots(
              assets.map((a) => ({ url: a.url, type: a.assetType }))
            );
            break;
          }
        }

        await prisma.growthPathScan.update({
          where: { id: scan.id },
          data: {
            status: "complete",
            result: result as unknown as Prisma.InputJsonValue,
            completedAt: new Date(),
          },
        });
      } catch (err) {
        console.error(`Scan ${scanType} failed:`, err);
        await prisma.growthPathScan.update({
          where: { id: scan.id },
          data: {
            status: "failed",
            error: err instanceof Error ? err.message : "Unknown error",
            completedAt: new Date(),
          },
        });
      }
    }

    // Run wave 1 scans in parallel (up to 4)
    const wave1Pending = WAVE_1.filter((t) => {
      const scan = scanMap.get(t);
      return scan && scan.status === "pending";
    });

    if (wave1Pending.length > 0) {
      await Promise.all(wave1Pending.slice(0, 4).map(runScan));
    }

    // Check if wave 1 is complete before wave 2
    const updatedScans = await prisma.growthPathScan.findMany({
      where: { sessionId },
    });
    const updatedMap = new Map(updatedScans.map((s) => [s.scanType, s]));

    const wave1Done = WAVE_1.every((t) => {
      const scan = updatedMap.get(t);
      return !scan || scan.status === "complete" || scan.status === "failed";
    });

    if (wave1Done) {
      const wave2Pending = WAVE_2.filter((t) => {
        const scan = updatedMap.get(t);
        return scan && scan.status === "pending";
      });
      if (wave2Pending.length > 0) {
        await Promise.all(wave2Pending.map(runScan));
      }

      // Refresh scan status after wave 2
      const wave2Scans = await prisma.growthPathScan.findMany({
        where: { sessionId },
      });
      const wave2Map = new Map(wave2Scans.map((s) => [s.scanType, s]));

      const wave2Done = WAVE_2.every((t) => {
        const scan = wave2Map.get(t);
        return !scan || scan.status === "complete" || scan.status === "failed";
      });

      if (wave2Done) {
        const wave3Pending = WAVE_3.filter((t) => {
          const scan = wave2Map.get(t);
          return scan && scan.status === "pending";
        });
        if (wave3Pending.length > 0) {
          await Promise.all(wave3Pending.map(runScan));
        }
      }
    }

    // Check if all scans are done
    const finalScans = await prisma.growthPathScan.findMany({
      where: { sessionId },
    });
    const completedCount = finalScans.filter(
      (s) => s.status === "complete" || s.status === "failed"
    ).length;
    const totalCount = finalScans.length;
    const allDone = completedCount === totalCount;

    // Auto-trigger scoring if all scans complete
    if (allDone && currentSessionStatus === "scanning") {
      // Fire scoring endpoint
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL
        || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://jurispage.com");

      fetch(`${baseUrl}/api/growth-path/score/${sessionId}`, {
        method: "POST",
      }).catch((err) => console.error("Auto-score trigger failed:", err));
    }

    return NextResponse.json({
      completedCount,
      totalCount,
      pendingScans: finalScans
        .filter((s) => s.status === "pending" || s.status === "running")
        .map((s) => s.scanType),
    });
  } catch (error) {
    console.error("Growth path scan error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
