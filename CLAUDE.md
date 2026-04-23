# JurisPage — Working Notes

> Loaded automatically by Claude Code in every session. Keep it short. Anything that needs to be true across sessions lives here.

## The offer, right now

**JurisPage sells exactly one product to end clients: Launchpad.**

Launchpad is the Juris Digital Launchpad package (jurisdigital.com/services/launchpad/) resold under the JurisPage brand. JurisPage and Juris Digital are the same company after the 2026 acquisition. JurisPage is the small-firm front door; Juris Digital is the established-firm tier.

That means:

- Any pricing page, calculator, service card, or FAQ on jurispage.com that describes what a client can buy from JurisPage should describe **Launchpad** (brand design + StoryBrand website + GBP + Yelp + Apple Maps + citations + weekly social + tracking, starting at $2,000/mo over a 24-month engagement, full setup in 45 days, no upfront fee).
- Firms whose budget or stage exceeds Launchpad get handed off to **Juris Digital** ($5,000 to $50,000+/mo). We do not sell a separate "JurisPage Pro" tier. If you see that name anywhere, it's stale and should be renamed to "Juris Digital."
- Individual service pages (`/law-firm-seo/`, `/google-ads-for-law-firms/`, `/local-seo-for-law-firms/`, `/law-firm-content-writing/`, `/law-firm-email-marketing/`, `/law-firm-websites/`, `/generative-engine-optimization-legal-marketing/`, `/ai-chatbot-for-law-firm-website/`, `/bing-ads-for-lawyers/`) exist for SEO and lead-gen, but every pricing tile on them should route to Launchpad or Juris Digital — not a standalone service SKU.

## Source of truth

Canonical offer spec: [`docs/launchpad-source-of-truth.md`](./docs/launchpad-source-of-truth.md). Pulled from jurisdigital.com on 2026-04-23. Treat this as authoritative for every deliverable, price point, timeline, and positioning decision.

When editing any copy that mentions what JurisPage sells, verify against that doc before writing. If the doc and the page disagree, the doc wins unless the user explicitly changes the product.

The companion audit report at [`docs/offer-audit-report.md`](./docs/offer-audit-report.md) is a **historical snapshot** from 2026-04-23, written *before* the alignment pass (commit db6bf92). It documents what was misaligned at that point and what was fixed. Do not treat it as a current-state description.

## Eight locked product decisions (2026-04-23)

All eight resolved to "match the Juris Digital source." Do not reintroduce the old positioning without the user explicitly changing the product.

1. **Contract:** 24-month engagement (not month-to-month). Framed as "no upfront fee, costs spread across the 24 months."
2. **Brand Design:** included in the $2,000 base (logo, typography, photography, graphics, social assets, brand guidelines). Not a $999 add-on.
3. **Upper tier name:** Juris Digital (not "JurisPage Pro").
4. **Upper tier price:** $5,000 to $50,000+/mo (not $5K–$20K or $5K–$15K).
5. **Website timeline:** 45 days for full setup (website + GBP + Yelp + Apple Maps + citations + social + tracking). Not 30 days.
6. **Differentiator framing:** advertise automation + generative AI + 15+ years of legal SEO expertise as the price-justification.
7. **Target buyer copy:** "small or startup law firms with little to no online presence" (not "1–4 attorneys" as a hard gate). The LaunchpadCalculator still forks 5+ attorneys to Juris Digital because the budget math exceeds Launchpad's $2K–$4K range, but copy shouldn't exclude larger firms categorically.
8. **StoryBrand-driven design:** included on every Launchpad site. Not a premium-tier upsell.

## Dev/ops notes

- **Hosting:** Vercel (auto-deploys from `main`). Commit and push every edit — that's how changes go live.
- **Stack:** Next.js 16, TypeScript, Tailwind.
- **Build command:** `npm run build` — run this before commits if touching anything non-trivial.
- **Prisma schema:** `LaunchpadQuote` still has an `addonLogo` field. It's always written as `false` now (logo is bundled into base). Safe to leave the column for data-history purposes; do not resurrect a logo add-on in the UI.
- **`/api/quote` email and `LaunchpadCalculator`:** these are the two files that actually commit pricing to prospects. Any change to deliverables, timeline, or terms must update both.

## Copy rules

- **No em dashes.** Use commas, periods, or parens.
- **No AI-sounding filler** ("seamless," "robust," "leverage," "unlock," "in today's fast-paced world"). Prefer concrete claims.
- **Don't invent new tier names.** JurisPage sells Launchpad. Juris Digital is the handoff for larger firms. That's the whole hierarchy.
