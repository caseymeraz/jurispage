// Client-side analytics helper: fires to window.dataLayer (GA4) or window.posthog
// Safe to import in client components

export function trackClientEvent(
  event: string,
  properties?: Record<string, unknown>
) {
  if (typeof window === "undefined") return;

  // GA4 via dataLayer
  const w = window as unknown as { dataLayer?: Array<Record<string, unknown>> };
  if (w.dataLayer) {
    w.dataLayer.push({ event, ...properties });
  }

  // PostHog
  const ph = window as unknown as {
    posthog?: { capture: (event: string, props?: Record<string, unknown>) => void };
  };
  if (ph.posthog) {
    ph.posthog.capture(event, properties);
  }
}
