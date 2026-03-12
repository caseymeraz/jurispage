// Playwright-based website screenshot capture for Growth Path
// Runs as Vercel fluid compute function (longer timeout)

import { put } from "@vercel/blob";

export interface Screenshot {
  url: string;
  type: "homepage_desktop" | "homepage_mobile" | "practice_area_desktop";
  width: number;
  caption: string;
}

export async function captureWebsiteScreenshots(
  url: string
): Promise<Screenshot[]> {
  // Dynamic import of playwright-core for Vercel serverless
  const { chromium } = await import("playwright-core");

  const screenshots: Screenshot[] = [];
  let browser;

  try {
    // Check if chromium binary is available (may not be on Vercel serverless)
    browser = await chromium.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    }).catch((launchErr) => {
      console.error("Playwright chromium launch failed (likely not available in this environment):", launchErr);
      return null;
    });

    if (!browser) {
      console.warn("Playwright browser unavailable - returning empty screenshots");
      return screenshots;
    }

    const context = await browser.newContext();
    const page = await context.newPage();

    // Normalize URL
    const normalizedUrl = url.startsWith("http") ? url : `https://${url}`;

    // ── Homepage Desktop (1440px) ──
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(normalizedUrl, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(2000);

    const desktopBuffer = await page.screenshot({ fullPage: false });
    const desktopBlob = await put(
      `growth-path/screenshots/${Date.now()}-desktop.png`,
      desktopBuffer,
      { access: "public", contentType: "image/png" }
    );
    screenshots.push({
      url: desktopBlob.url,
      type: "homepage_desktop",
      width: 1440,
      caption: "Homepage - Desktop view",
    });

    // ── Homepage Mobile (390px) ──
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(1000);

    const mobileBuffer = await page.screenshot({ fullPage: false });
    const mobileBlob = await put(
      `growth-path/screenshots/${Date.now()}-mobile.png`,
      mobileBuffer,
      { access: "public", contentType: "image/png" }
    );
    screenshots.push({
      url: mobileBlob.url,
      type: "homepage_mobile",
      width: 390,
      caption: "Homepage - Mobile view",
    });

    // ── Discover practice area page ──
    await page.setViewportSize({ width: 1440, height: 900 });

    // Look for common practice area link patterns
    const practiceLinks = await page.$$eval(
      'a[href*="personal-injury"], a[href*="practice-area"], a[href*="car-accident"], a[href*="injury"], a[href*="areas-of-practice"]',
      (links) =>
        links
          .map((a) => ({
            href: (a as HTMLAnchorElement).href,
            text: a.textContent?.trim() || "",
          }))
          .filter((l) => l.href && l.text)
          .slice(0, 1)
    );

    if (practiceLinks.length > 0) {
      try {
        await page.goto(practiceLinks[0].href, {
          waitUntil: "networkidle",
          timeout: 20000,
        });
        await page.waitForTimeout(2000);

        const practiceBuffer = await page.screenshot({ fullPage: false });
        const practiceBlob = await put(
          `growth-path/screenshots/${Date.now()}-practice.png`,
          practiceBuffer,
          { access: "public", contentType: "image/png" }
        );
        screenshots.push({
          url: practiceBlob.url,
          type: "practice_area_desktop",
          width: 1440,
          caption: `Practice area page - ${practiceLinks[0].text}`,
        });
      } catch {
        // Practice area page navigation failed; skip it
      }
    }

    await context.close();
  } catch (err) {
    console.error("Website screenshot capture failed:", err);
  } finally {
    if (browser) await browser.close();
  }

  return screenshots;
}
