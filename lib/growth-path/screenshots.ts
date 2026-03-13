// Puppeteer-based website screenshot capture for Growth Path
// Uses @sparticuz/chromium for Vercel serverless compatibility

import { put } from "@vercel/blob";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export interface Screenshot {
  url: string;
  type: "homepage_desktop" | "homepage_mobile" | "practice_area_desktop";
  width: number;
  caption: string;
}

export async function captureWebsiteScreenshots(
  url: string
): Promise<Screenshot[]> {
  const screenshots: Screenshot[] = [];
  let browser;

  try {
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: null,
      executablePath: await chromium.executablePath(),
      headless: true,
    });

    const page = await browser.newPage();

    // Normalize URL
    const normalizedUrl = url.startsWith("http") ? url : `https://${url}`;

    // ── Homepage Desktop (1440px) ──
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(normalizedUrl, { waitUntil: "networkidle0", timeout: 30000 });
    await new Promise((r) => setTimeout(r, 2000));

    const desktopBuffer = await page.screenshot({ fullPage: false }) as Buffer;
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
    await page.setViewport({ width: 390, height: 844 });
    await new Promise((r) => setTimeout(r, 1000));

    const mobileBuffer = await page.screenshot({ fullPage: false }) as Buffer;
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
    await page.setViewport({ width: 1440, height: 900 });

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
          waitUntil: "networkidle0",
          timeout: 20000,
        });
        await new Promise((r) => setTimeout(r, 2000));

        const practiceBuffer = await page.screenshot({ fullPage: false }) as Buffer;
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
  } catch (err) {
    console.error("Website screenshot capture failed:", err);
  } finally {
    if (browser) await browser.close();
  }

  return screenshots;
}
