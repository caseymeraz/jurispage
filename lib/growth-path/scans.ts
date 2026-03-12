// Individual scan runner functions for Growth Path

import {
  getSearchVolume,
  getOrganicSerp,
  getMapsResults,
  getAiModeSerp,
} from "@/lib/dataforseo";
import { getBusinessListingsDensity, getSerpScreenshot } from "@/lib/dataforseo";
import type { SerpAnalysisResult } from "./types";

// ─── Keyword Volume Scan ──────────────────────────────────────

export async function runKeywordVolumeScan(
  keywords: string[],
  city: string,
  state: string
): Promise<{
  keywords: { keyword: string; volume: number; localVolume: number }[];
  totalVolume: number;
  totalLocalVolume: number;
}> {
  const locationName = `${city},${state},United States`;

  const [national, local] = await Promise.all([
    getSearchVolume(keywords),
    getSearchVolume(keywords, 2840, "en", locationName),
  ]);

  const localMap = new Map<string, number>();
  for (const kv of local) {
    localMap.set(kv.keyword.toLowerCase(), kv.searchVolume);
  }

  const results = national.map((kv) => ({
    keyword: kv.keyword,
    volume: kv.searchVolume,
    localVolume: localMap.get(kv.keyword.toLowerCase()) ?? 0,
  }));

  return {
    keywords: results,
    totalVolume: results.reduce((sum, k) => sum + k.volume, 0),
    totalLocalVolume: results.reduce((sum, k) => sum + k.localVolume, 0),
  };
}

// ─── SERP Analysis Scan ───────────────────────────────────────

export async function runSerpAnalysisScan(
  keywords: string[],
  locationCode: number,
  firmDomain?: string | null
): Promise<SerpAnalysisResult[]> {
  const results: SerpAnalysisResult[] = [];

  for (const keyword of keywords) {
    try {
      const [organicResults, aiOverview] = await Promise.all([
        getOrganicSerp(keyword, locationCode),
        getAiModeSerp(keyword, locationCode).catch(() => ({ references: [] })),
      ]);

      const normalized = firmDomain?.toLowerCase().replace(/^www\./, "");
      let firmPresent = false;
      let firmPosition: number | null = null;

      if (normalized) {
        const match = organicResults.find((r) =>
          r.domain.toLowerCase().replace(/^www\./, "").includes(normalized)
        );
        if (match) {
          firmPresent = true;
          firmPosition = match.position;
        }
      }

      results.push({
        keyword,
        hasAds: false, // DataForSEO organic endpoint doesn't include ads directly
        hasMaps: false, // Detected separately via maps scan
        hasAiOverview: aiOverview.references.length > 0,
        firmPresent,
        firmPosition,
        topResults: organicResults.slice(0, 10).map((r) => ({
          position: r.position,
          domain: r.domain,
          title: r.title,
        })),
      });
    } catch (err) {
      console.error(`SERP analysis failed for "${keyword}":`, err);
      results.push({
        keyword,
        hasAds: false,
        hasMaps: false,
        hasAiOverview: false,
        firmPresent: false,
        firmPosition: null,
        topResults: [],
      });
    }
  }

  return results;
}

// ─── Maps Competition Scan ────────────────────────────────────

export async function runMapsCompetitionScan(
  query: string,
  lat: number,
  lng: number
): Promise<{
  competitors: {
    name: string;
    rating: number | null;
    reviewCount: number | null;
    position: number;
    domain: string | null;
  }[];
  totalFound: number;
}> {
  const results = await getMapsResults(query, lat, lng);

  return {
    competitors: results.competitors.map((c) => ({
      name: c.title,
      rating: c.rating ?? null,
      reviewCount: c.reviewCount ?? null,
      position: c.position,
      domain: c.domain ?? null,
    })),
    totalFound: results.competitors.length,
  };
}

// ─── Competitor Density Scan ──────────────────────────────────

export async function runCompetitorDensityScan(
  practiceArea: string,
  city: string,
  lat: number,
  lng: number
): Promise<{
  firmCount: number;
  category: string;
}> {
  try {
    const result = await getBusinessListingsDensity(
      practiceArea,
      city,
      lat,
      lng
    );
    return result;
  } catch (err) {
    console.error("Competitor density scan failed:", err);
    return { firmCount: 0, category: practiceArea };
  }
}

// ─── PageSpeed Scan ───────────────────────────────────────────

export async function runPageSpeedScan(
  url: string
): Promise<{
  mobile: { score: number; fcp: number; lcp: number; cls: number; tbt: number };
  desktop: { score: number; fcp: number; lcp: number; cls: number; tbt: number };
}> {
  const apiKey = process.env.GOOGLE_PAGESPEED_API_KEY;
  const baseUrl = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";

  async function fetchStrategy(strategy: "mobile" | "desktop") {
    const params = new URLSearchParams({
      url,
      strategy,
      category: "performance",
      ...(apiKey ? { key: apiKey } : {}),
    });

    const res = await fetch(`${baseUrl}?${params}`);
    if (!res.ok) throw new Error(`PageSpeed API error: ${res.status}`);
    const data = await res.json();

    const audits = data.lighthouseResult?.audits || {};
    const categories = data.lighthouseResult?.categories || {};

    return {
      score: Math.round((categories.performance?.score ?? 0) * 100),
      fcp: audits["first-contentful-paint"]?.numericValue ?? 0,
      lcp: audits["largest-contentful-paint"]?.numericValue ?? 0,
      cls: audits["cumulative-layout-shift"]?.numericValue ?? 0,
      tbt: audits["total-blocking-time"]?.numericValue ?? 0,
    };
  }

  const [mobile, desktop] = await Promise.all([
    fetchStrategy("mobile"),
    fetchStrategy("desktop"),
  ]);

  return { mobile, desktop };
}

// ─── SERP Screenshot Scan ─────────────────────────────────────

export async function runSerpScreenshotScan(
  keyword: string,
  locationCode: number
): Promise<{
  screenshotUrl: string | null;
  keyword: string;
}> {
  try {
    const result = await getSerpScreenshot(keyword, locationCode);
    return { screenshotUrl: result.screenshotUrl, keyword };
  } catch (err) {
    console.error("SERP screenshot scan failed:", err);
    return { screenshotUrl: null, keyword };
  }
}

// ─── Website Screenshot Scan (delegated to screenshots.ts) ───

export { captureWebsiteScreenshots } from "./screenshots";

// ─── Vision Analysis Scan (delegated to vision.ts) ───────────

export { analyzeScreenshots } from "./vision";
