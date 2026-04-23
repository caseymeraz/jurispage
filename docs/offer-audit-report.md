# JurisPage <-> Launchpad Offer Audit
> Generated: 2026-04-23
> Source of truth: docs/launchpad-source-of-truth.md
> Scope: Offer alignment only (deliverables, commitment, timeline, messaging, positioning). The $2,000/mo pricing floor was audited separately and has already passed.

---

## Executive Summary

- **Total targets audited:** 79
  - Pages (app/**/page.tsx, customer-facing only): 42
  - Components (carrying customer copy): 25
  - Data files (data/*.ts): 5
  - MDX content (blog/news): 5
  - Email templates (api/quote, api/contact): 2

- **Rough verdict distribution:**
  - ALIGNED: 9
  - PARTIAL: 48
  - MISALIGNED: 22

- **Top 5 site-wide issues (in priority order):**
  1. **Contract terms are site-wide contradictory with the source of truth.** Every single customer touchpoint claims "month-to-month, no contracts, cancel with 30 days notice." The Juris Digital source page sells Launchpad on a hard **24-month** commitment.
  2. **Website launch timeline is "30 days" almost everywhere on jurispage.com, but "45 days" on the source page.** Both values appear in close proximity inside `app/launchpad/page.tsx` and create internal inconsistency even within a single page.
  3. **Logo / Brand Design is sold as a $999 add-on** in `LaunchpadCalculator`, the `/api/quote` email, and the launchpad page copy. The source of truth treats Logo + Typography + Photography + Graphics + Social Assets + Brand Guidelines as a Step-1 deliverable already included in the base price.
  4. **Weekly social media posting and the full Local Ecosystem (Yelp, Apple Maps, Bing, Avvo, 30+ directories) are named inconsistently.** Only `app/launchpad/page.tsx` and `app/services/pricing/page.tsx` mention weekly posts. They do not appear on any practice-area, service, or metro page.
  5. **Automation + generative AI + 12-year legal SEO expertise is absent from jurispage.com** — the core differentiator Juris Digital uses to justify the price is not part of JurisPage's positioning.

Other material misalignments: upper tier is pinned at $5K–$20K (source says $5K–$50K+), target buyer language is "1–4 attorneys" rather than "small or startup law firms with little to no online presence," client time commitment (30-minute kickoff + a few hours over 45 days) is nowhere on jurispage.com, and the sister tier is referred to as "Juris Digital," "JurisPage Pro," and "JurisPage Pro partnerships" across three different files — inconsistent brand hierarchy.

---

## Site-Wide Issues (recurring across multiple files)

### Issue 1: Month-to-month / "no contracts" language is universal, but the source says 24 months

- **What the source says:** "Commitment: 24 months" (Section 2). "Starting at: $2,000/mo for 24 months" (Section 5).
- **What jurispage.com says:** Every single surface says "month-to-month" and/or "no contracts." Promised exit terms are consistent ("30 days notice") across the site but contradict the SoT entirely.
- **Files affected (every file:line reference):**
  - `app/page.tsx:15, 195, 279, 489` (metadata + hero subtext + "What makes us different" card + final CTA)
  - `app/homepage-b/page.tsx:14, 183, 250, 370`
  - `app/launchpad/page.tsx:11, 20, 70, 105, 183, 471`
  - `app/services/pricing/page.tsx:18, 30, 67, 70, 138` (8 separate occurrences across cards, FAQ schema, FAQ copy)
  - `app/scorpion-legal-marketing-alternative/page.tsx:9, 14, 17, 63, 85` (this page *positions* Scorpion's 12-24 month contracts as the bad thing to avoid)
  - `app/bing-ads-for-lawyers/page.tsx:20, 260, 307`
  - `app/best-law-firm-seo-companies/page.tsx:25, 47, 58, 75, 77, 78, 337, 364`
  - `app/law-firm-content-writing/page.tsx:7, 424, 534, 601, 610`
  - `app/law-firm-websites/page.tsx:22, 26, 326, 401`
  - `app/law-firm-email-marketing/page.tsx:15, 375`
  - `app/local-seo-for-law-firms/page.tsx:279, 310, 387`
  - `app/generative-engine-optimization-legal-marketing/page.tsx:344, 412`
  - `app/google-ads-for-law-firms/page.tsx:111`
  - `app/ai-chatbot-for-law-firm-website/page.tsx:424`
  - `app/law-firm-seo-cost/page.tsx:196, 219, 227`
  - `app/about-us/page.tsx:32-33, 226`
  - `app/contact/page.tsx` (via `ThreeStepProcess` and `ContactForm`)
  - `app/see-my-market-gap/page.tsx:74`
  - `app/growth-path/page.tsx:74`
  - `app/jurispage-now-backed-by-juris-digital/page.tsx:46, 62`
  - `components/MetroPage.tsx:15, 18, 122, 123, 142, 199` (templates apply this across every metro page — massive multiplier)
  - `components/ThemVsUs.tsx:30`
  - `components/HeroForm.tsx:31` (default subtext)
  - `components/LaunchpadCalculator.tsx:228-229` (on the pricing-summary success screen)
  - `components/ServicePage.tsx:142, 269` (every service page that uses this template)
  - `components/PracticeAreaPage.tsx:407, 559`
  - `components/PracticeAreaServicePage.tsx:154, 425`
  - `components/ThreeStepProcess.tsx:140`
  - `components/WebsiteGrader.tsx:164`
  - `components/Footer.tsx:22`
  - `data/practiceAreas.ts:128, 161`
  - `app/api/quote/route.ts:163` ("Month-to-month. Cancel anytime with 30 days notice.") — sent in every prospect receipt email
  - `app/layout.tsx:70` (global metadata description)

- **Severity:** Critical. This is the single largest and most pervasive misalignment on the site. Every lead receives contradictory commitment language from jurispage.com vs. what Juris Digital says in-sales.

- **Recommended fix:** This is a product decision, not a copy decision. See Action Plan item #1. Either:
  - **Option A (harmonize to source):** Change every "month-to-month" / "no contracts" reference to "24-month engagement" (or "12-month initial commitment" if the human operator wants a middle ground) and move positioning away from "no contracts" as the differentiator. Risk: loses a significant differentiator used heavily on scorpion alternative, best-seo-companies, and homepage.
  - **Option B (harmonize to jurispage.com):** Change the Juris Digital source page to sell Launchpad on a month-to-month basis. Risk: conflicts with the premise on the source page that the low price is possible *because* costs are spread over 24 months ("we don't front-load costs. Instead, we spread those costs out over the course of your engagement").

### Issue 2: Website launch timeline is "30 days" vs. "45 days" — including internal contradictions on a single page

- **What the source says:** "Full setup: 45 days" (Section 4). "Step 1 — Campaign Setup (First 45 Days)" (Section 3).
- **What jurispage.com says:** "30 days from kickoff to launch" is the standard claim, used on every metro page, `law-firm-websites`, `services/pricing`, homepage service cards, and MDX blog. The launchpad page itself says 45 days in body copy but its *homepage service card* and the *`law-firm-websites` pricing tile* say 30 days.
- **Files affected:**
  - `components/MetroPage.tsx:108` (applies to every metro page) — "Our standard timeline is 30 days from kickoff to launch with our Launchpad package."
  - `app/law-firm-websites/page.tsx:34, 225, 401` — "30 days for Launchpad. 45-60 days for custom redesigns.", "From kickoff to live website", "Live in 30 days"
  - `data/services.ts:266, 270, 276, 318, 322` — repeatedly "30 days," plus whyMatters at line 467 also says "live in 30 days"
  - `data/services.ts:467, 486, 490, 506, 532, 539, 544, 548` — the Launchpad service entry uses "30 days" throughout
  - `app/page.tsx:110, 113` — "Live in 30 days" twice in service cards
  - `app/services/pricing/page.tsx:19, 31, 70, 138` — "Full setup in 45 days" on this page (good)
  - `app/launchpad/page.tsx:21, 53, 54, 71, 106, 214, 220, 279, 282, 471` — consistent 45 days here (good) — but the homepage service card linking *to* this page still says "30 days"
  - `app/law-firm-content-writing/page.tsx` — linked to Launchpad positioning but never names a timeline
  - Blog/MDX: no explicit mention of Launchpad timeline, but the `juris-digital-acquires-jurispage.mdx` news item does not clarify either.

- **Severity:** Major. The page dedicated to the product says 45 days. Every other page pointing *to* that page says 30 days. A prospect clicks "Live in 30 days" on the homepage, lands on `/launchpad/`, and reads "Live within 45 days." Credibility damage.

- **Recommended fix:** Replace every "30 days / live in 30 days" website-launch claim with "45 days / live within 45 days." The Launchpad page is correct; the other pages and `data/services.ts` are wrong. Note: if the internal engineering promise is genuinely 30 days and the 45-day SoT includes the full setup (GBP, citations, social, tracking) *in addition to* the website, that needs to be reflected in copy as "Website live in 30 days. Full marketing foundation live in 45 days." But today both the source and the site conflate these.

### Issue 3: Logo / Brand Design is a paid add-on on JurisPage; it is a Step-1 deliverable on the source page

- **What the source says (Section 3, Step 1):** "Brand Design" is listed as the *first* deliverable block. It includes **Logo, Typography, Photography, Graphics, Social Media Assets, Brand Guidelines**. No indication it is a paid add-on; it is bundled into the $2,000/mo foundation.
- **What jurispage.com says:**
  - `components/LaunchpadCalculator.tsx:11, 67, 374-376` — "Custom Logo & Brand Design… +$999 one-time."
  - `app/api/quote/route.ts:76, 156` — every quote email tells the prospect a logo is "+$999 one-time."
  - `app/launchpad/page.tsx:52-59` — "What's Included" setup list includes website, GBP, keywords, social *setup*, and tracking. Logo/typography/photography/brand guidelines are **not listed as included**.
  - `app/services/pricing/page.tsx` — does not list brand design as included.
  - `components/MetroPage.tsx` — does not mention brand design.
  - No file on the site says Brand Design (logo, typography, photography, graphics, brand guidelines) is included in the base Launchpad price.
- **Severity:** Critical. Prospects buying JurisPage Launchpad get a different deliverable set than prospects buying the identical product from Juris Digital.
- **Recommended fix:** Human-operator product decision. Either:
  - **A)** Remove the $999 logo add-on from LaunchpadCalculator and add "Brand Design (logo, typography, photography, graphics, brand guidelines, social assets)" to the included-setup list on `/launchpad/` and `/services/pricing/`. Also remove the "+$999 logo" line from `app/api/quote/route.ts`.
  - **B)** Update the source page to explicitly say "Brand Design (logo, typography, photography, social assets, brand guidelines) is an optional add-on." This is the less likely intent based on the spec's tone.

### Issue 4: Monthly deliverables missing from most of the site — weekly social posting, Yelp/Apple Maps

- **What the source says (Section 3, Step 2):** Monthly Services include: content refreshes, GBP management, **weekly social media posting**, performance tracking/reporting. Step-1 Local Ecosystem explicitly names **Yelp, Apple Maps**.
- **What jurispage.com says:**
  - **Weekly social posting** is mentioned in **only 2 places**: `app/launchpad/page.tsx:64` ("Weekly social media content") and `app/launchpad/page.tsx:297` ("Social posts"). It is missing from `/services/pricing/`, from every service page (including `local-seo-for-law-firms`), from metro pages, from practice-area pages, and from the quote email.
  - **Yelp/Apple Maps** appear only in `app/launchpad/page.tsx:56` ("Your firm listed and verified on Yelp, Apple Maps, Bing, Avvo, and 30+ other directories"). Not on the pricing page, not on local-seo-for-law-firms, not on metro pages.
  - `data/services.ts:79` mentions "weekly Posts" inside GBP copy but never says social media.
- **Severity:** Major. Social media management is one of the main retention hooks for small firms; not listing it weakens the offer perception, and firms comparing JurisPage to Juris Digital will see JurisPage as the lesser product.
- **Recommended fix:** Add "Weekly social media posting (LinkedIn, Facebook, Instagram)" to the deliverables on `services/pricing`, on every service page that lists Launchpad inclusions, in the `app/api/quote/route.ts` prospect email, and in `data/services.ts` Launchpad entry. Add "Yelp, Apple Maps" explicitly (instead of the generic "30+ directories") to local-seo-for-law-firms and MetroPage local-seo FAQ.

### Issue 5: Automation + generative AI + 12 years of legal SEO expertise is absent from jurispage.com

- **What the source says (Section 5 & 6 FAQ):** "We have fully embraced automation and generative AI." "By strategically leveraging this technology — backed by our 12 years of legal SEO expertise — we're able to deliver highly effective marketing faster and cheaper." This is the core justification for why the $2,000/mo price is possible.
- **What jurispage.com says:** Searched every file. No page says "automation," "generative AI," or "12 years of legal SEO expertise" as a Launchpad differentiator. `app/page.tsx` says "15+ Years in Legal Marketing" in a stat badge but that stat is about JurisPage itself, not Juris Digital. `content/blog/ai-content-without-seo-strategy.mdx` is actually *skeptical* of AI content ("mass-produced without quality controls"), which arguably contradicts the source page's proud use of generative AI.
- **Severity:** Major (messaging/positioning).
- **Recommended fix:** Add a "How we keep the price this low" section on `/launchpad/` and `/services/pricing/` that lifts the SoT FAQ answer verbatim: "We have fully embraced automation and generative AI, backed by 15+ years of legal SEO expertise." Reconcile `ai-content-without-seo-strategy.mdx` — the right framing is "AI + legal expertise" not "AI alone."

### Issue 6: Upper-tier range delta ($5K–$20K+ vs. $5K–$50K+)

- **What the source says:** "Established Law Firm Marketing" at **$5,000–$50,000+/mo**.
- **What jurispage.com says:** Every mention uses **$5,000–$20,000+/mo**.
- **Files affected:**
  - `app/services/pricing/page.tsx:20, 32`
  - `app/launchpad/page.tsx:24, 75`
  - `app/best-law-firm-seo-companies/page.tsx:93`
  - `components/LaunchpadCalculator.tsx:147`
  - `app/api/quote/route.ts:117` (prospect email for 5+ attorney leads)
  - `app/about-us/page.tsx:229` says "$5,000 – $15,000+/mo" — even lower than the $20K upper bound
- **Severity:** Minor (positioning — lower ceilings may actually be appropriate for the JurisPage funnel) but flag for explicit operator decision.
- **Recommended fix:** Operator decision. If JurisPage intentionally caps upper-tier visibility at $20K for positioning, document that. Otherwise change to $5,000–$50,000+/mo to match source. The about-us $15K cap should be normalized either way.

### Issue 7: Target buyer language — "1–4 attorneys" vs. "small or startup law firms with little to no online presence"

- **What the source says (Section 1):** Target buyer is "Small or startup law firms" with "Little to no online presence," budget $2,000–$4,000/month, "practice-agnostic."
- **What jurispage.com says:** Launchpad is consistently described as "for firms with 1–4 attorneys" or "solo attorneys and small firms (1–4 attorneys)." That is a different framing — attorney count, not lifecycle stage or online-presence maturity.
- **Files affected:**
  - `app/launchpad/page.tsx:24, 69, 75, 94, 436`
  - `app/services/pricing/page.tsx:20, 22, 32, 34, 67, 284`
  - `app/law-firm-websites/page.tsx:400`
  - `app/best-law-firm-seo-companies/page.tsx:364`
  - `app/law-firm-seo-cost/page.tsx:219`
  - `data/services.ts:476` (says "1-3 attorneys" — a *third* variant)
  - `components/LaunchpadCalculator.tsx:282-290` (selector maxes at 4, forks to custom at 5+)
- **Severity:** Major. The source page positions Launchpad to a much broader buyer (any small/startup firm regardless of attorney count if budget is $2K-$4K). By capping at 4 attorneys, jurispage.com may be turning away a 6-attorney firm with a tiny $2.5K marketing budget that Juris Digital would happily sell Launchpad to.
- **Recommended fix:** Add "small or startup law firms with little to no online presence" as the primary target language alongside the 1–4 attorney metric. The calculator could still bucket 5+ attorneys into a different path, but copy should not exclude them categorically.

### Issue 8: 45-day client time commitment is never quantified on jurispage.com

- **What the source says (Section 4 + FAQ):** "30-minute kickoff call + 'roughly a few hours' across the first 45 days (signing off on designs, content topics, GBP verification)."
- **What jurispage.com says:** Nowhere. This empathy-driven commitment — critical for solo attorneys weighing whether they have time for this — is not mentioned on `/launchpad/`, `/services/pricing/`, or anywhere else. The closest is `law-firm-content-writing` saying "about 30 minutes per month" for content review.
- **Severity:** Major (conversion-relevant).
- **Recommended fix:** Add an FAQ on `/launchpad/` and `/services/pricing/` with the exact SoT language: "How much involvement will be required from me? A 30-minute kickoff call plus roughly a few hours spread across the first 45 days."

### Issue 9: Ownership promise is present but not prominent

- **What the source says:** "You will own your website and content" (Section 3) + "All IP we create for you is owned by you" (Section 3, verbatim) + a dedicated FAQ ("Will I own my website and content? Yes, always. All IP we create for you is owned by you.")
- **What jurispage.com says:** Language is present in `app/launchpad/page.tsx:108, 184`, `app/services/pricing/page.tsx:24, 36, 138`, `app/scorpion-legal-marketing-alternative/page.tsx:84`, `app/best-law-firm-seo-companies/page.tsx:47, 336`, and the `/api/quote` email. But no page uses the exact SoT phrasing "All IP we create for you is owned by you," which is legally sharper than the softer "You own everything." `components/WebsiteGrader.tsx:70` asks users whether they own their site, but the answer copy is diagnostic, not a JurisPage promise.
- **Severity:** Minor (present, just less prominent).
- **Recommended fix:** Lift "All IP we create for you is owned by you" verbatim into the launchpad page's FAQ and the pricing page FAQ.

### Issue 10: "StoryBranded" / StoryBrand phrasing is inconsistently applied

- **What the source says (Section 3):** "Modern, clean, StoryBranded website."
- **What jurispage.com says:** "StoryBrand" appears as a framework name in developer comments and in `app/law-firm-websites/page.tsx:423-424` (where it's positioned as a *$5K–$100K custom-build* feature, *not* as a Launchpad inclusion). This inverts the source: the source says every Launchpad site is StoryBranded; jurispage.com says StoryBrand is a premium tier upgrade.
- **Severity:** Major.
- **Recommended fix:** Either (a) add "StoryBrand-driven design" to the Launchpad inclusions copy on `/launchpad/` and drop it as a premium differentiator on `/law-firm-websites/`, or (b) change the SoT to reflect jurispage.com's tiered framing.

### Issue 11: Sister brand name is inconsistent ("Juris Digital" vs "JurisPage Pro")

- **What the source says:** "Established Law Firm Marketing" at jurisdigital.com. The brand is "Juris Digital" (the sister).
- **What jurispage.com says:**
  - `app/law-firm-websites/page.tsx:436-444` and `data/services.ts` multiple places call the upper tier **"JurisPage Pro"** ($5,000+/mo) — a brand name that appears nowhere else.
  - `data/services.ts:33, 34, 322` also uses "JurisPage Pro."
  - Everywhere else on the site it is called **"Juris Digital."**
- **Severity:** Major (brand confusion).
- **Recommended fix:** Pick one. Given the acquisition news (`content/blog/juris-digital-acquires-jurispage.mdx`) positions Juris Digital as the parent, "Juris Digital" is the right name. Rename every "JurisPage Pro" occurrence to "Juris Digital" in `data/services.ts` and `app/law-firm-websites/page.tsx`.

### Issue 12: CTA copy — the source says "GET AN INSTANT QUOTE" (repeated ~4x); jurispage.com drifts

- **What the source says (Section 8):** Primary CTA is "GET AN INSTANT QUOTE" repeated ~4x. Secondary: "Let's Talk."
- **What jurispage.com says:** Primary CTAs across the site include "Get My Growth Plan," "Get My Instant Pricing," "Get a Custom Quote," "Stop Losing Cases," "Apply for Growth Strategy," "Get Your Free [City] Market Audit," "Book a Free Strategy Call," "See Pricing."
- **Severity:** Minor.
- **Recommended fix:** Launchpad page is already close ("Get My Instant Pricing"). Rename primary CTAs on service pages to "Get an Instant Quote" or keep the status quo with explicit reasoning — this is more of a CRO question than an offer misalignment.

---

## Page-by-Page Findings

Because patterns repeat heavily, per-page notes below call out only what's *specific* to that page and not already covered by the site-wide issues above. Pages whose only deltas are site-wide issues are marked PARTIAL with a pointer to the relevant numbered issue.

### /app/page.tsx (Homepage) — PARTIAL
- **Purpose:** Primary top-of-funnel. StoryBrand framework homepage.
- **Findings:**
  1. [Critical] Line 195, 279, 489: Site-wide issue #1 (contracts).
  2. [Major] Lines 110, 113: "Live in 30 days with the Launchpad package" — site-wide issue #2.
  3. [Major] Lines 107-114: Services grid lists Launchpad without *any* mention of brand design, weekly social posting, or Yelp/Apple Maps — site-wide issues #3, #4.
  4. [Major] No mention of automation + AI framing — site-wide issue #5.
  5. [Minor] Primary CTA is "Get My Growth Plan" (to `/growth-report/`), not "Get an Instant Quote" to `/launchpad/`. Flow diverts the Launchpad buyer.
  6. [Minor] Pain points section (lines 31-56) is solid; leverages empathetic tone. ALIGNED with source voice.
- **Overall:** Messaging-forward hero, but the specific Launchpad offer is misrepresented in the service card.

### /app/launchpad/page.tsx — PARTIAL (most aligned of all pages)
- **Purpose:** The Launchpad product page. This is the most important page on the site for this audit.
- **Findings:**
  1. [Critical] Lines 20, 70, 105, 183, 471: month-to-month — site-wide issue #1.
  2. [Critical] Lines 52-59 included-setup list omits Brand Design entirely — site-wide issue #3. No logo, typography, photography, graphics, or brand guidelines shown as included.
  3. [Major] Line 24, 75: "investing $5,000–$20,000+/month" for Juris Digital — site-wide issue #6.
  4. [Major] Line 69: "1–2 attorneys" price anchor — site-wide issue #7 (conflicts with source "small or startup").
  5. [Major] No automation/AI/12-year framing anywhere — site-wide issue #5.
  6. [Major] No client-time-commitment FAQ — site-wide issue #8.
  7. [Minor] Line 22: "Your domain, your website, your content. All yours." is good but softer than SoT verbatim "All IP we create for you is owned by you."
  8. [Minor] Line 107: "90-day results guarantee. Or we work free." — SoT explicitly says *no guarantee*. Adding one is not *misaligned* per se (JurisPage is adding value beyond the offer), but mark as a delta for operator awareness.
  9. [Minor] "15+ Years in Legal Marketing" (line 128) vs source's "12 years of legal SEO expertise" — probably acceptable rounding, but worth confirming which is canonical.
  10. [ALIGNED] The 45-day setup language is used correctly throughout (lines 53, 54, 71, 106, 214, 220, 279, 282, 471).
  11. [ALIGNED] Lists Yelp, Apple Maps, Bing, Avvo in citation building (line 56).
  12. [ALIGNED] Mentions weekly social posting (line 64).
- **Overall:** Closest to the SoT of any page, but still inherits every site-wide issue.

### /app/services/pricing/page.tsx — PARTIAL
- **Purpose:** The two-tier pricing comparison and FAQ hub.
- **Findings:**
  1. [Critical] Lines 18, 30, 67, 70, 138: month-to-month — site-wide issue #1.
  2. [Major] Lines 20, 32: "$5,000–$20,000+/month" — site-wide issue #6.
  3. [Major] Line 67: "solo attorneys and emerging firms (1–4 attorneys)" — site-wide issue #7.
  4. [Major] Lines 29-37: FAQ block does not include the "automation + AI" answer from the SoT — site-wide issue #5.
  5. [Major] Lines 29-37: FAQ block does not address client time commitment — site-wide issue #8.
  6. [Major] No brand design / logo included in the Launchpad feature list — site-wide issue #3.
  7. [Major] Weekly social posting is not called out — site-wide issue #4.
  8. [ALIGNED] Correctly uses 45-day setup.
- **Overall:** Good structure, missing half the SoT's story.

### /app/about-us/page.tsx — PARTIAL
- **Findings:**
  1. [Critical] Lines 32-33, 226: Month-to-month is positioned as a *core identity value* — site-wide issue #1 compounds here because changing contract terms would require rewriting the brand narrative.
  2. [Minor] Line 229: "$5,000 – $15,000+/mo" — site-wide issue #6 (with an even lower ceiling).
  3. [Minor] Line 293: "solo practitioners launching their first marketing campaign to established regional firms" — this actually aligns *better* with the SoT buyer definition than the launchpad page's "1–4 attorneys." Consider migrating this phrasing upstream.
- **Overall:** Emotionally strong; contract narrative is the primary risk.

### /app/law-firm-websites/page.tsx — MISALIGNED
- **Findings:**
  1. [Critical] Lines 22, 26, 326, 401: month-to-month — site-wide issue #1.
  2. [Critical] Lines 22, 26, 401: "Live in 30 days" as the advertised Launchpad timeline — site-wide issue #2 (and this page is the most prominent source of the 30-day misalignment).
  3. [Critical] Line 400: Launchpad positioned as "1-4 attorneys" — site-wide issue #7.
  4. [Major] Lines 423-424: **"StoryBrand messaging framework"** is listed as a feature of the *$5,000–$100,000* custom-build tier — site-wide issue #10. Inverts the SoT.
  5. [Major] Lines 438-444: Upper tier is called "JurisPage Pro," not "Juris Digital" — site-wide issue #11.
  6. [Major] Line 401 pricing tile does not mention brand design, weekly social, GBP management, or content production — only website-specific features.
- **Overall:** A website-service page that conflicts with the Launchpad product description on several core dimensions.

### /app/law-firm-seo-cost/page.tsx — PARTIAL
- **Findings:**
  1. [Critical] Line 196: actively tells prospects to be wary of "24-month commitment" — which is the exact SoT commitment. This page would actively undermine a Juris Digital sales rep selling 24-month Launchpad.
  2. [Critical] Lines 219, 227: month-to-month — site-wide issue #1.
- **Overall:** This page is arguably the worst misalignment on the site because it doesn't just say "we're different" — it *specifically names the SoT commitment as a red flag*.

### /app/best-law-firm-seo-companies/page.tsx — MISALIGNED
- **Findings:**
  1. [Critical] Lines 25, 47, 58, 75, 77, 78, 337, 364: heavy use of month-to-month as a differentiator against competitors. Line 47 actively counsels readers to "Look for month-to-month flexibility or at most a 6-month initial commitment." Line 337 calls out "Multi-year contracts for a new relationship" as a red flag. Site-wide issue #1 compounded.
  2. [Major] Line 93: "$5,000–$20,000+/month" — site-wide issue #6.
  3. [ALIGNED] Good use of testimonial/case-study style. Tone is aligned.
- **Overall:** Rewriting this page to match a 24-month SoT would be structurally disruptive.

### /app/scorpion-legal-marketing-alternative/page.tsx — MISALIGNED
- **Findings:**
  1. [Critical] Lines 9, 14, 17, 63, 85: the entire value prop of this page is "JurisPage is month-to-month; Scorpion is 12-24 months." If the SoT's 24-month commitment is adopted, this page must be fundamentally rewritten.
- **Overall:** Page is built on a premise that directly conflicts with the SoT.

### /app/bing-ads-for-lawyers/page.tsx — PARTIAL
- **Findings:**
  1. [Critical] Lines 20, 260, 307: month-to-month — site-wide issue #1.
  2. [Minor] Not a Launchpad page per se. Remaining copy is on-brand.

### /app/google-ads-for-law-firms/page.tsx — PARTIAL
- **Findings:**
  1. [Major] Line 111: "No contracts. No commitment" — site-wide issue #1.
  2. [Major] No mention of automation/AI/expertise framing.

### /app/local-seo-for-law-firms/page.tsx — PARTIAL
- **Findings:**
  1. [Critical] Lines 279, 310, 387: month-to-month — site-wide issue #1.
  2. [Major] Line 310: feature list includes GBP, citations, NAP, local content — but not "Yelp" or "Apple Maps" explicitly — site-wide issue #4.

### /app/law-firm-content-writing/page.tsx — PARTIAL
- **Findings:**
  1. [Critical] Lines 7, 424, 534, 601, 610: month-to-month — site-wide issue #1.
  2. [ALIGNED] Lines 342, 452 ("30 minutes per month for review and approval") — rare acknowledgment of client time commitment, although scoped to content only, not to Launchpad overall (site-wide issue #8).

### /app/law-firm-email-marketing/page.tsx — PARTIAL
- **Findings:**
  1. [Critical] Lines 15, 375: month-to-month — site-wide issue #1.
  2. Not a Launchpad page.

### /app/ai-chatbot-for-law-firm-website/page.tsx — PARTIAL
- **Findings:**
  1. [Critical] Line 424: "No contracts" — site-wide issue #1.
  2. [Minor] Sold as a $299/mo add-on, consistent with the calculator.

### /app/generative-engine-optimization-legal-marketing/page.tsx — PARTIAL
- **Findings:**
  1. [Critical] Lines 344, 412: month-to-month — site-wide issue #1.
  2. [Minor] Page talks about GEO / generative AI in the context of *search visibility*, not as a JurisPage production tool — site-wide issue #5 unresolved.

### /app/jurispage-now-backed-by-juris-digital/page.tsx — PARTIAL
- **Findings:**
  1. [Critical] Lines 46, 62: "Month-to-month contracts" explicitly reassured as a *promise that will not change* post-acquisition — site-wide issue #1 with added contractual commitment weight.
  2. [ALIGNED] Acquisition messaging is consistent with the blog + news posts.
- **Overall:** Contract promise here is a specific commitment to existing clients and will be hard to walk back.

### /app/calculate-roi-law-firm-ppc-campaign/page.tsx, /app/growth-report/page.tsx, /app/growth-assessment/page.tsx, /app/growth-path/page.tsx, /app/market-gap/loading, /app/see-my-market-gap/page.tsx — MOSTLY ALIGNED
- These are tools/calculators and lead-gen funnels. They don't make direct offer claims about Launchpad deliverables, so they're outside the core audit scope. Pointer: `app/see-my-market-gap/page.tsx:74` and `app/growth-path/page.tsx:74` repeat "no contract" — site-wide issue #1.

### /app/contact/page.tsx — ALIGNED
- Renders the shared ContactForm. Inherits one instance of site-wide issue #1 via `ThreeStepProcess.tsx:140` but no other deltas.

### /app/case-studies/page.tsx and /app/case-studies/[slug]/page.tsx — ALIGNED
- Different testimonials than the SoT's named list (Jason McConnell, Brooke Alexander, Joshua Massingill, Naomi Ellis, Jay Rooth; Cyrus Pacific, Wood Edwards, Vantage Group, Massingill, Moses & Rooth). JurisPage uses Michael Oykhman, Cory Wilson, Williams. Different is fine per the audit instructions. Note: overlap is zero, which is interesting — no shared social proof between the source page and the customer-facing site.

### /app/blog/page.tsx, /app/blog/[slug]/page.tsx — ALIGNED (index pages)

### /app/news/[slug]/page.tsx — ALIGNED (index)

### /app/[slug]/page.tsx and /app/[slug]/[serviceSlug]/page.tsx — PARTIAL
- These render `PracticeAreaPage` / `PracticeAreaServicePage` / `MetroPage`. All site-wide issues inherited via components.

### /app/practice-areas/page.tsx — ALIGNED (index page)

### /app/ai-search-report/page.tsx, /app/competitor-report/[reportId]/page.tsx, /app/free-market-report/page.tsx — ALIGNED (report tools)

### /app/secret-shop/page.tsx — ALIGNED (tool page)

### /app/thank-you-for-reaching-out/page.tsx — ALIGNED (confirmation page)

### /app/homepage-b/page.tsx — PARTIAL (A/B variant)
- Same site-wide issue #1 pattern as `app/page.tsx`.

---

## Data Files

### /data/services.ts — MISALIGNED (high-impact)
- **Purpose:** Drives `[slug]/page.tsx` service detail pages. Changes here cascade across the site.
- **Findings:**
  1. [Critical] Lines 266, 270, 276, 318, 322, 467, 482, 486, 490, 506, 532, 539, 544, 548 — every reference to Launchpad website timeline is "30 days," not 45. Site-wide issue #2.
  2. [Major] Lines 33, 34, 322: Upper tier is "JurisPage Pro" — site-wide issue #11.
  3. [Major] Line 476: "small practices (1-3 attorneys)" — a *third* target-buyer framing that conflicts with both "1-4 attorneys" (elsewhere on site) and "small or startup" (source). Site-wide issue #7.
  4. [Major] Lines 461-548: The Launchpad service entry enumerates deliverables: website, GBP, citations, email setup. It does **not** mention brand design, weekly social posting, social media setup, content writing volume, or performance tracking. Site-wide issues #3, #4.
  5. [Major] Line 540: "upgrading to Juris Digital" mentions SEO + Google Ads + custom web design + dedicated strategist — this is fine, but the upper-tier pricing numbers are inconsistent with `services/pricing/page.tsx`.
  6. [Minor] Line 79: "weekly Posts" mentioned inside GBP detail — good, but buried.
- **Overall:** A core data file that drives many pages and carries multiple misalignments.

### /data/practiceAreas.ts — PARTIAL
- **Findings:**
  1. [Critical] Lines 128, 161: "Month-to-month" and "No contracts" in comparison tables and subtext — site-wide issue #1.
  2. [Minor] Line 569: mentions "weekly posts" for GBP — SoT-aligned.
  3. [Minor] "Same-day response automation" pattern mentioned for employment law (line 422) — uses "automation" well in a niche context.

### /data/intersections.ts — ALIGNED
- Long-form content focused on practice-area × service intersections. Does not make direct Launchpad offer claims.

### /data/metros.ts — ALIGNED (pure data)

### /data/caseStudies.ts — ALIGNED (different testimonials than SoT, but per instructions that's fine)

---

## Components

Components with customer copy — findings focused on what those components *introduce* to pages that embed them.

### components/LaunchpadCalculator.tsx — MISALIGNED
- **Findings:**
  1. [Critical] Line 11: `LOGO_ONETIME = 999` — site-wide issue #3. Logo should be included.
  2. [Critical] Lines 67, 374-377: "Custom Logo & Brand Design — +$999 one-time" — site-wide issue #3.
  3. [Critical] Lines 228-229: "Month-to-month · No long-term contract" on the success screen — site-wide issue #1.
  4. [Major] Line 147: "$5K–$20K+/month" — site-wide issue #6.
  5. [Major] Line 286-290: maxes at 5+ attorneys, which bakes in the "1–4 attorneys" target-buyer definition — site-wide issue #7.
  6. [Minor] Add-on framing for the chatbot ($299/mo) is consistent with the source's "customization is limited" principle.

### components/MetroPage.tsx — MISALIGNED (high multiplier)
- **Findings:**
  1. [Critical] Every metro page promises "30 days from kickoff to launch with our Launchpad package" (line 108) — site-wide issue #2. Given there are dozens of metros, this is the single most-replicated timeline misalignment on the site.
  2. [Critical] Line 15, 18, 122, 123, 142, 199: month-to-month — site-wide issue #1.
  3. [Major] No metro page mentions brand design, weekly social posting, Yelp/Apple Maps, automation/AI, or client time commitment.

### components/ThemVsUs.tsx — MISALIGNED
- **Findings:**
  1. [Critical] Line 30: the core comparison row literally sells "Month-to-month. No long-term contracts" as the differentiator — site-wide issue #1.

### components/ThreeStepProcess.tsx — PARTIAL
- Line 140: "No contracts. No commitment." — site-wide issue #1.

### components/Footer.tsx — PARTIAL
- Line 22: footer tagline asserts "month-to-month contracts" — site-wide issue #1 sitewide multiplier.

### components/HeroForm.tsx, ContactForm.tsx, GrowthPathForm.tsx, GrowthReportForm.tsx, GrowthAssessmentForm.tsx, MarketGapForm.tsx, AiSearchReportForm.tsx, CompetitorGapForm.tsx, WebsiteGrader.tsx, SecretShopAudit.tsx — MOSTLY ALIGNED
- Lead-capture forms. `HeroForm.tsx:31` default subtext "No contracts. No commitment." — site-wide issue #1. Otherwise unremarkable.

### components/ServicePage.tsx, PracticeAreaPage.tsx, PracticeAreaServicePage.tsx — MISALIGNED
- Templates that generate many service/PA pages. Each hard-codes `"No contracts. No commitment."` subtexts and a "Month-to-Month" cards — site-wide issue #1 at a huge multiplier.

### components/CTASection.tsx, StartHereStrip.tsx, StickyCTA.tsx, StickyMobileCTA.tsx, JumpLinks.tsx — ALIGNED
- Structural CTAs — pass props from parent pages, no hard-coded offer claims.

### components/CaseStudyCard.tsx, CaseStudyPreview.tsx, CaseStudyShowcase.tsx — ALIGNED

### components/CountUpStats.tsx, ReviewRibbon.tsx, HeroSearchAnimation.tsx, LocalPackExplainer.tsx, LocalSeoScorecard.tsx — ALIGNED

### components/CompetitorReport.tsx, MarketGapReport.tsx, MarketGapPreview.tsx, MarketGapTeaser.tsx, GrowthPathReport.tsx — ALIGNED
- Report-rendering components.

### components/BingBidEstimator.tsx, PpcRoiCalculator.tsx, CaseCalculator.tsx, AiVisibilitySimulator.tsx — ALIGNED
- Calculators.

### components/FAQAccordion.tsx, PageSpeedCard.tsx, PortfolioShowcase.tsx, PracticeToggle.tsx, RedPenVideo.tsx, TeaserContactForm.tsx, YouTubeFacade.tsx — ALIGNED
- Structural / UI only.

---

## Content (MDX)

### /content/blog/ai-content-without-seo-strategy.mdx — PARTIAL
- **Findings:**
  1. [Major] Overall stance is skeptical of AI-as-strategy and calls out "mass-produced without quality controls" as bad. The SoT *embraces* generative AI as a core differentiator ("we have fully embraced automation and generative AI"). Tension with site-wide issue #5.
  2. [Minor] Line 221 does acknowledge Juris Digital uses AI tools — partial alignment.
- **Recommendation:** Tighten the framing to "AI + legal SEO expertise is powerful; AI alone is dangerous." Matches the SoT's nuanced position.

### /content/blog/juris-digital-acquires-jurispage.mdx — ALIGNED
- Brand-narrative content. No offer-level claims. Good.

### /content/blog/law-firm-seo-guide-2026.mdx — ALIGNED
- Evergreen educational content.

### /content/blog/technical-seo-for-law-firms.mdx — ALIGNED
- Educational, no offer claims.

### /content/news/jurispage-acquired-by-juris-digital-2026.mdx — ALIGNED
- Announces the Launchpad package, targets "small and mid-market law firms." Close to SoT buyer definition.

---

## Email Templates

### /app/api/quote/route.ts — MISALIGNED
- **Purpose:** Sends internal notification + prospect receipt after a Launchpad calculator submission.
- **Findings:**
  1. [Critical] Lines 76, 156: Every prospect email lists "Logo Design: Yes (+$999 one-time)" or "No" — site-wide issue #3. The email itself treats logo as an add-on.
  2. [Critical] Line 163: "Month-to-month. Cancel anytime with 30 days notice." — site-wide issue #1 embedded into every single lead's receipt.
  3. [Major] Line 117: "$5,000 to $20,000+/month" for Juris Digital — site-wide issue #6.
  4. [Major] Lines 167-175: "What's included in Launchpad" list mentions website, GBP, keyword research/SEO, citations, *social profile setup* (not weekly posting), monthly reporting. Missing: brand design, weekly social posting, client time commitment, automation/AI framing.
  5. [Major] No 45-day vs. 30-day inconsistency (says "live within 45 days" line 169 — ALIGNED on timeline).
  6. [Minor] The email tone is aligned with source (warm, confident).
- **Overall:** High-impact file because every lead sees it. Fix alongside the calculator.

### /app/api/contact/route.ts — ALIGNED
- Routes contact-form submissions. No offer claims in the email body itself (internal notification is neutral; there's no prospect receipt with offer terms). No action needed unless a prospect receipt is added later.

---

## Prioritized Action Plan

### 1. Critical fixes (direct contradictions — fix these first)

**1a. Resolve the contract-length question (product-level, not copy-level).**
This is the biggest decision. Either:
- Harmonize to SoT (24 months): rewrite 38+ files, kill or fundamentally rewrite `scorpion-legal-marketing-alternative`, `best-law-firm-seo-companies`, `law-firm-seo-cost`, and the homepage's "Month-to-Month" differentiator card. Huge positioning reset.
- Harmonize to JurisPage (month-to-month): update the source page at jurisdigital.com. Also update the "we can keep the price this low because we spread costs over 24 months" rationale on the source, since that reasoning falls apart.

**1b. Resolve the logo / brand design question.**
Either pull the `$999` add-on out of `LaunchpadCalculator.tsx`, `app/api/quote/route.ts`, and update the included-setup list on `/launchpad/` — OR update the source page to say brand design is an add-on. Recommended: include in base to match SoT, because the SoT price is already justified by spread-out costs.

**1c. Resolve the 30-day vs. 45-day website timeline.**
Clarify whether "website live in 30 days" and "full campaign setup in 45 days" are two different milestones (website at day 30, GBP + citations + social + tracking at day 45) — if so, say that clearly everywhere. Otherwise normalize to 45 days.

**1d. Rewrite `app/law-firm-seo-cost/page.tsx` line 196** — it currently flags 24-month commitments as a red flag. If JurisPage adopts a 24-month SoT commitment, this line actively undermines the sale.

### 2. Major additions (missing source-defined deliverables)

**2a. Add weekly social media posting** to the deliverables list on `/services/pricing/`, every service page's Launchpad feature list, `components/MetroPage.tsx` FAQ, `app/api/quote/route.ts` prospect email, and the `data/services.ts` Launchpad entry. Currently only on `/launchpad/`.

**2b. Add Brand Design block** (logo, typography, photography, graphics, brand guidelines, social assets) as a Step-1 deliverable block on `/launchpad/` and in the `/api/quote` email — assuming the operator picks "include" in 1b.

**2c. Explicitly name Yelp and Apple Maps** in local-seo-for-law-firms, every local-SEO-related metro FAQ, and the quote email. Do not leave these as generic "30+ directories."

**2d. Add the automation + AI + 12-year legal SEO expertise differentiator** to `/launchpad/` and `/services/pricing/`. Lift the SoT FAQ verbatim.

**2e. Add client time commitment FAQ** ("30-minute kickoff + a few hours across 45 days") to `/launchpad/` and `/services/pricing/`.

### 3. Positioning / messaging tightening

**3a. Add StoryBrand language** as a Launchpad inclusion (not a premium-tier upgrade). Fix `app/law-firm-websites/page.tsx:423-424`.

**3b. Consolidate sister-brand naming** to "Juris Digital" everywhere. Rename "JurisPage Pro" in `data/services.ts` and `app/law-firm-websites/page.tsx`.

**3c. Normalize target buyer language** — use "small or startup law firms, little to no online presence" as the primary framing, with "1–4 attorneys" as secondary context, not the lead. Update `/launchpad/`, `/services/pricing/`, `LaunchpadCalculator`, and `data/services.ts:476`.

**3d. Lift "All IP we create for you is owned by you"** verbatim into `/launchpad/` FAQ and `/services/pricing/` FAQ.

**3e. Decide on upper-tier range.** $5K–$20K+ (current), $5K–$50K+ (SoT), or the $5K–$15K stragglers in `about-us`. Pick one. Normalize everywhere (about-us:229, launchpad:24,75, services/pricing:20,32, best-law-firm-seo-companies:93, LaunchpadCalculator:147, api/quote:117).

### 4. Minor / tone

**4a. Reconcile the 90-day guarantee** — SoT has no guarantee; JurisPage does. Probably safe to keep as a JurisPage-specific overlay, but document the delta.

**4b. CTA language.** "Get an Instant Quote" is the SoT CTA. JurisPage uses a mix. Acceptable but inconsistent.

**4c. Reconcile `content/blog/ai-content-without-seo-strategy.mdx`** — soften the anti-AI framing to match the SoT's "AI + expertise" framing.

### 5. Product-level decisions the human operator must make

1. **Is Launchpad 24 months (source) or month-to-month (site)?** Every other decision cascades from this one. Given the homepage, About Us, acquisition page, Scorpion-alternative page, and law-firm-seo-cost page all *sell* month-to-month as the differentiator, changing the site is a major rewrite. Changing the source is a single-page rewrite.

2. **Is Logo/Brand Design included in the $2,000/mo base or a $999 add-on?** The SoT says included; the calculator says add-on. Pricing math on both sides assumes the opposite.

3. **Is the upper tier priced at $5K–$50K+ (source), $5K–$20K+ (JurisPage default), or $5K–$15K+ (about-us page)?**

4. **Is the upper tier called "Juris Digital" or "JurisPage Pro"?**

5. **Is the website live in 30 days or 45 days?** Or is "30-day website + 15 more days for GBP/citations/social = 45 days total setup" the real answer? If so, site copy needs to say that.

6. **Does JurisPage advertise automation + generative AI as a differentiator** (matching the SoT's core price-justification), or does it stay silent because it runs against the "humans with legal expertise" positioning some pages already lean into?

7. **Is the target buyer "1–4 attorneys" (the calculator's gate) or "small/startup firms with little to no online presence" (the SoT)?** These are not the same — a 6-attorney firm with zero online presence fits the SoT but is currently forked into a Juris Digital handoff by the calculator.

8. **Does StoryBrand-driven design ship with every Launchpad site (SoT) or is it a premium-tier upgrade (law-firm-websites page)?**

Once these eight product decisions are made, the copy fixes are straightforward find-and-replace work plus small additions to `/launchpad/` and `/services/pricing/`. Without those decisions, a copy pass alone will create new internal contradictions.

---

*End of report.*
