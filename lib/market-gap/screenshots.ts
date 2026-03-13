import { put } from "@vercel/blob";
import { getSerpScreenshot } from "@/lib/dataforseo";

export interface SerpScreenshotResult {
  keyword: string;
  desktopUrl: string;
  mobileUrl?: string;
}

/**
 * Capture SERP screenshots for a keyword+city combo, persist to Vercel Blob.
 * DataForSEO screenshot URLs expire, so we re-upload them for permanence.
 */
export async function captureSerpScreenshots(
  practiceArea: string,
  city: string,
  locationCode: number = 2840
): Promise<SerpScreenshotResult[]> {
  const keywordWithCity = `${practiceArea.toLowerCase()} lawyer ${city.toLowerCase()}`;
  const keywordWithout = `${practiceArea.toLowerCase()} lawyer`;

  const results: SerpScreenshotResult[] = [];

  // Run both keyword variants in parallel, each with desktop screenshot
  const [withCityResult, withoutCityResult] = await Promise.all([
    getSerpScreenshot(keywordWithCity, locationCode, "en", "desktop").catch(() => ({
      screenshotUrl: null,
    })),
    getSerpScreenshot(keywordWithout, locationCode, "en", "desktop").catch(() => ({
      screenshotUrl: null,
    })),
  ]);

  // Persist screenshots to Vercel Blob (DataForSEO URLs expire)
  if (withCityResult.screenshotUrl) {
    const blobUrl = await persistToBlob(
      withCityResult.screenshotUrl,
      `market-gap/serp/${Date.now()}-with-city.png`
    );
    if (blobUrl) {
      results.push({ keyword: keywordWithCity, desktopUrl: blobUrl });
    }
  }

  if (withoutCityResult.screenshotUrl) {
    const blobUrl = await persistToBlob(
      withoutCityResult.screenshotUrl,
      `market-gap/serp/${Date.now()}-without-city.png`
    );
    if (blobUrl) {
      results.push({ keyword: keywordWithout, desktopUrl: blobUrl });
    }
  }

  return results;
}

/**
 * Download an image URL and re-upload to Vercel Blob for persistence.
 */
async function persistToBlob(
  sourceUrl: string,
  blobPath: string
): Promise<string | null> {
  try {
    const response = await fetch(sourceUrl);
    if (!response.ok) return null;

    const buffer = Buffer.from(await response.arrayBuffer());
    const blob = await put(blobPath, buffer, {
      access: "public",
      contentType: "image/png",
    });
    return blob.url;
  } catch (err) {
    console.error("Failed to persist SERP screenshot to Blob:", err);
    return null;
  }
}
