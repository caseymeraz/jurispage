// Server-side analytics: only import in server components / API routes
import { prisma } from "@/lib/db";

type MarketGapEventName =
  | "homepage_market_gap_click"
  | "market_gap_step_1_complete"
  | "market_gap_place_selected"
  | "market_gap_step_2_complete"
  | "market_gap_step_3_complete"
  | "market_gap_report_started"
  | "market_gap_teaser_viewed"
  | "market_gap_report_ready"
  | "market_gap_report_viewed"
  | "market_gap_primary_cta_clicked"
  | "instant_quote_clicked"
  | "secret_shop_clicked";

export async function trackEvent(
  reportId: string,
  event: MarketGapEventName,
  metadata?: Record<string, unknown>
) {
  try {
    await prisma.marketGapEvent.create({
      data: { reportId, event, metadata: metadata ? JSON.parse(JSON.stringify(metadata)) : undefined },
    });
  } catch {
    console.error(`Failed to track event: ${event}`);
  }
}
