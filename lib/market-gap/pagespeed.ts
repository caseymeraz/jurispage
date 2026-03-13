/**
 * PageSpeed scan for market gap reports.
 * Reuses the same pattern as lib/growth-path/scans.ts:runPageSpeedScan
 */

export interface PageSpeedResult {
  mobile: { score: number; fcp: number; lcp: number; cls: number; tbt: number };
  desktop: { score: number; fcp: number; lcp: number; cls: number; tbt: number };
}

export async function runMarketGapPageSpeed(url: string): Promise<PageSpeedResult> {
  const apiKey = process.env.GOOGLE_PAGESPEED_API_KEY;
  const baseUrl = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";

  // Normalize URL
  const normalizedUrl = url.startsWith("http") ? url : `https://${url}`;

  async function fetchStrategy(strategy: "mobile" | "desktop") {
    const params = new URLSearchParams({
      url: normalizedUrl,
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
