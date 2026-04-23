import type { Metadata } from "next";
import Link from "next/link";
import { getServiceBySlug } from "@/data/services";
import { getPracticeAreaBySlug } from "@/data/practiceAreas";
import { getIntersectionsForService } from "@/data/intersections";
import FAQAccordion from "@/components/FAQAccordion";
import SchemaOrg from "@/components/SchemaOrg";
import CTASection from "@/components/CTASection";
import LocalSeoScorecard from "@/components/LocalSeoScorecard";
import ReviewRibbon from "@/components/ReviewRibbon";
import CaseStudyPreview from "@/components/CaseStudyPreview";
import { caseStudies } from "@/data/caseStudies";

const service = getServiceBySlug("local-seo-for-law-firms")!;
const O = "#EE6C13";
const D = "#1a1a2e";
const G = "#27ae60";
const B = "#0f4c81";
const R = "#c0392b";

export const metadata: Metadata = {
  title: "Local SEO for Law Firms: Dominate the Map Pack in 2026",
  description: "Get your law firm into the Google map pack and AI Local Pack. GBP optimization, review generation, citation building, and proximity strategies. 44% of local clicks go to the map pack.",
  alternates: { canonical: "https://jurispage.com/local-seo-for-law-firms/" },
};

export default function LocalSeoPage() {
  const allFaqs = [
    { question: "What is local SEO for law firms?", preview: "The tactics that get your firm into Google's map pack for 'lawyer near me' and '[practice area] attorney [city]' searches.", answer: "Local SEO is the set of optimization tactics that help your law firm appear in Google's map pack, the 3-pack of results with map pins shown for searches like 'personal injury lawyer near me' or 'divorce attorney [city].' It includes Google Business Profile optimization, citation building across legal directories, review generation and management, localized content pages, and local link building. In 2026, local SEO also includes optimizing for AI Local Packs, which are replacing the traditional 3-pack on an increasing number of mobile searches." },
    { question: "How important is the Google map pack for law firms?", preview: "The map pack captures 44% of all clicks for local searches. If you are not in it, you are losing nearly half your potential cases.", answer: "The map pack sits above every organic result on the page. Studies show it captures 44% of all clicks for local-intent queries. For high-value practice areas like personal injury, criminal defense, and family law, most clients search with local intent. A firm in the top 3 of the map pack for 'car accident lawyer [city]' is the first thing a potential client sees. That positioning drives call volume that paid search struggles to match." },
    { question: "How do Google reviews affect local SEO rankings?", preview: "Review quantity, recency, and velocity are all ranking signals. A significant boost occurs at exactly 10 reviews.", answer: "Reviews are a direct ranking factor for the map pack. Three dimensions matter: total review count (more is better, with a measurable ranking boost at the 10-review threshold), review recency (reviews from the past 30-90 days carry more weight than older ones), and review velocity (how many new reviews you get per month matters more than total count once you pass 50). Star rating also matters. Firms with 4.5-star averages and 50+ reviews consistently outrank competitors with higher domain authority but fewer reviews. We build a systematic review generation workflow into every local SEO engagement." },
    { question: "What is an AI Local Pack and how does it affect my firm?", preview: "Google is replacing the traditional 3-pack with AI-generated summaries on mobile. Fewer firms get shown. Visibility is narrowing.", answer: "AI Local Packs are Google's newer local search format where AI generates a summary of local businesses instead of showing the traditional 3 map pins with call buttons. Research shows AI Local Packs surface 32% fewer unique businesses than traditional packs. Google is also testing the removal of direct call buttons in favor of AI summaries. This means the window for local visibility is narrowing. Firms that are not already optimized for the map pack will find it even harder to break in as AI packs become the default. Optimizing for AI Local Packs requires strong entity presence, consistent structured data, and content that LLMs can extract and attribute." },
    { question: "How long does local SEO take to show results?", preview: "GBP ranking movement in 30-45 days. Consistent map pack visibility in 3-6 months.", answer: "Google Business Profile optimization alone produces measurable increases in views and direction requests within 30-45 days. Citation cleanup and review generation take 60-90 days to fully impact rankings. Consistent top-3 map pack positioning for competitive practice area terms typically takes 3-6 months of sustained work. The timeline varies by market. A family law firm in a mid-size city moves faster than a personal injury firm in a top-10 metro. We set 90-day benchmarks for every engagement." },
    { question: "Do business hours affect my Google map pack ranking?", preview: "Yes. If your GBP says 'Closed,' you drop in rankings during those hours. 24/7 intake gives you an edge.", answer: "Business hours are a real-time ranking factor in 2026. If your Google Business Profile shows 'Closed,' your firm will rank lower during those hours compared to competitors who show as 'Open.' For law firms, the implication is clear: firms with 24/7 intake services or extended hours listings have a ranking advantage during evenings and weekends, which is exactly when many legal emergencies happen. We recommend listing accurate extended hours and connecting after-hours calls to an answering service or intake system." },
    { question: "Should my law firm use stock photos on Google Business Profile?", preview: "No. Firms using real team photos see 42% more direction requests than firms with stock imagery.", answer: "Stock photos hurt both trust and ranking. Research shows that firms using unique team photos and real office images see 42% more direction requests on their Google Business Profile than firms using generic stock photos of gavels, scales of justice, or handshakes. Google's systems can detect stock imagery, and users instinctively distrust it. We recommend professional headshots, office exterior and interior photos, team photos, and community involvement images. Upload at minimum 25 photos to your GBP." },
    ...service.faqs,
    ...(service.extendedFaqs ?? []),
  ];

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://jurispage.com/local-seo-for-law-firms/",
      name: "Local SEO for Law Firms",
      description: "Local SEO services for law firms. Google Business Profile optimization, citation building, review generation, and map pack strategies.",
      provider: { "@type": "Organization", name: "JurisPage", url: "https://jurispage.com" },
      url: "https://jurispage.com/local-seo-for-law-firms/",
      areaServed: { "@type": "Country", name: "United States" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: allFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://jurispage.com/" },
        { "@type": "ListItem", position: 2, name: "Local SEO for Law Firms", item: "https://jurispage.com/local-seo-for-law-firms/" },
      ],
    },
  ];

  return (
    <>
      <SchemaOrg schema={schemas} />

      {/* 1. HERO */}
      <section className="bg-white py-20 px-6 border-b border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <nav className="text-sm text-gray-500 mb-5">
            <Link href="/" className="hover:text-gray-900 no-underline">Home</Link> /{" "}
            <span className="text-gray-700">Local SEO for Law Firms</span>
          </nav>
          <div className="flex flex-wrap gap-3 justify-center mb-6">
            <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: O + "15", color: O }}>44% of Clicks Go to the Map Pack</span>
            <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: G + "15", color: G }}>40-60% Lower Cost Per Case vs Ads</span>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-gray-100 text-gray-600">2026 AI Local Pack Ready</span>
          </div>
          <h1 className="font-heading font-extrabold text-gray-900 text-4xl md:text-5xl leading-tight mb-6">
            When Someone Searches "Lawyer Near Me," Is Your Firm the One They <span style={{ color: O }}>See</span>?
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-4">The Google map pack sits above every organic result, above paid ads, and directly below the search bar. 44% of all clicks for local legal searches go to those three map pins.</p>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">If your firm is not in that pack, you are losing nearly half of the available cases before anyone even visits your website.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#scorecard" className="px-8 py-4 rounded-full text-white font-bold text-sm no-underline transition-opacity hover:opacity-90" style={{ background: O }}>Grade Your Local SEO in 60 Seconds</a>
            <Link href="/services/pricing/" className="px-8 py-4 rounded-full font-bold text-sm no-underline border-2 transition-all hover:bg-gray-50" style={{ borderColor: D, color: D }}>See Transparent Pricing</Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 px-6" style={{ background: O }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "44%", label: "Of local search clicks go to the map pack" },
              { value: "76%", label: "Of legal searches happen on mobile devices" },
              { value: "10", label: "Reviews trigger a measurable ranking boost" },
              { value: "32%", label: "Fewer firms shown in AI Local Packs vs traditional" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-heading font-extrabold text-white text-3xl md:text-4xl leading-none mb-1">{stat.value}</div>
                <div className="text-orange-100 text-sm leading-snug">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. AI LOCAL PACK THREAT */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-3 text-center">Is Your Firm Invisible in the AI Local Pack?</h2>
          <p className="text-gray-500 text-center mb-10 max-w-2xl mx-auto">Google is quietly replacing the traditional 3-pack with AI-generated summaries on mobile. The window for local visibility is narrowing.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Traditional */}
            <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
              <div className="bg-gray-100 text-center py-2 text-xs font-bold uppercase tracking-widest text-gray-500">Traditional 3-Pack</div>
              <div className="p-5 space-y-3">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="flex items-center gap-3 rounded-lg border border-gray-100 p-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">{n}</div>
                    <div className="flex-1"><div className="h-2.5 bg-gray-300 rounded w-3/4 mb-1.5" /><div className="h-2 bg-gray-200 rounded w-1/2" /></div>
                    <div className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: G + "15", color: G }}>Call</div>
                  </div>
                ))}
                <div className="text-center pt-2"><span className="text-xs text-gray-500">3 firms shown with direct call buttons</span></div>
              </div>
            </div>
            {/* AI Pack */}
            <div className="rounded-xl border-2 overflow-hidden" style={{ borderColor: R + "44" }}>
              <div className="text-center py-2 text-xs font-bold uppercase tracking-widest text-white" style={{ background: R }}>AI Local Pack (2026)</div>
              <div className="p-5">
                <div className="rounded-lg bg-blue-50 border border-blue-100 p-4 mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#4285f4" strokeWidth="1.5"/><path d="M5 8h6M8 5v6" stroke="#4285f4" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    <span className="text-xs font-bold text-blue-600">AI-generated summary</span>
                  </div>
                  <div className="space-y-1.5"><div className="h-2 bg-blue-200 rounded w-full" /><div className="h-2 bg-blue-200 rounded w-5/6" /><div className="h-2 bg-blue-200 rounded w-4/5" /></div>
                </div>
                {[1, 2].map((n) => (
                  <div key={n} className="flex items-center gap-3 rounded-lg border border-gray-100 p-3 mb-2 opacity-60">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-400">{n}</div>
                    <div className="flex-1"><div className="h-2.5 bg-gray-200 rounded w-3/4 mb-1.5" /><div className="h-2 bg-gray-100 rounded w-1/2" /></div>
                    <span className="text-[9px] text-red-400 font-bold">No call button</span>
                  </div>
                ))}
                <div className="text-center pt-2"><span className="text-xs font-bold" style={{ color: R }}>32% fewer firms shown. Call buttons removed.</span></div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <p className="text-gray-700 text-sm leading-relaxed max-w-2xl mx-auto">
              <strong>What this means:</strong> The traditional map pack showed 3 firms with call buttons. AI Local Packs show fewer firms, often without direct call buttons, behind an AI summary. Firms not already optimized will find it harder to break in. We optimize for both the traditional pack and AI visibility.
            </p>
          </div>
        </div>
      </section>

      {/* 3. RANKING FACTORS DECODED */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-3 text-center">2026 Local Ranking Factors (Decoded for Attorneys)</h2>
          <p className="text-gray-500 text-center mb-10 max-w-2xl mx-auto">The specific signals Google uses to decide which firms appear in the map pack.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: "The 'Magic 10' Review Threshold", body: "A significant ranking boost occurs at exactly 10 Google reviews. After that, review velocity (how many per month) matters more than total count.", tag: "Reviews", color: G },
              { title: "Real-Time Business Hours", body: "Google uses your business hours as a real-time ranking factor. If your GBP says 'Closed,' you drop in rankings during those hours. 24/7 intake gives you an edge.", tag: "GBP", color: O },
              { title: "Stock Photo Penalty", body: "Firms using real team photos see 42% more direction requests than those with stock imagery. Google detects stock photos. Users distrust them.", tag: "Photos", color: B },
              { title: "Proximity Still Dominates", body: "Physical distance between the searcher and your office is the #1 local ranking factor in 2026. You cannot outrank proximity, but you can maximize every other signal.", tag: "Location", color: D },
              { title: "Category Precision", body: "Google added niche categories like 'Probate Attorney' and 'Estate Litigation Attorney' in 2025. Using the exact right category is a ranking signal.", tag: "GBP", color: O },
              { title: "NAP Consistency", body: "Your Name, Address, and Phone number must match exactly across 70+ directories. Even minor variations (Suite 100 vs Ste 100) suppress rankings.", tag: "Citations", color: R },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-gray-200 p-5">
                <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mb-3 inline-block" style={{ background: item.color + "15", color: item.color }}>{item.tag}</span>
                <h3 className="font-heading font-bold text-gray-900 text-base mb-2">{item.title}</h3>
                <p className="text-gray-600 text-xs leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ACRONYM DECODER */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-3 text-center">The Acronyms That Matter (In Plain English)</h2>
          <p className="text-gray-500 text-center mb-10">You did not go to law school to learn marketing jargon. Here is what each term means and why it affects your cases.</p>
          <div className="space-y-4">
            {[
              { acronym: "GBP", full: "Google Business Profile", desc: "Your digital storefront. In 2025, Google added niche categories like 'Probate Attorney' and 'Estate Litigation Attorney.' Using the exact right categories is a ranking signal.", risk: "Wrong category = invisible for niche searches", reward: "Exact category = shown to the right clients" },
              { acronym: "NAP", full: "Name, Address, Phone Number", desc: "Your firm's identity footprint across 70+ online directories. Consistency tells Google you are a real, verified business.", risk: "Inconsistencies = suppressed rankings", reward: "Clean NAP = trust signal across the web" },
              { acronym: "LSA", full: "Local Services Ads", desc: "The 'Google Screened' ads at the very top. As AI Local Packs shrink organic visibility, LSAs are becoming your visibility insurance.", risk: "No LSA = losing the top slot entirely", reward: "LSA + map pack = maximum visibility" },
              { acronym: "CTR", full: "Click-Through Rate", desc: "The percentage of people who see your listing and click. Optimizing for 'Personal Injury Lawyer Near You' instead of 'Near Me' reads better to humans and boosts organic CTR.", risk: "Low CTR = Google demotes your listing", reward: "High CTR = ranking reinforcement loop" },
              { acronym: "E-E-A-T", full: "Experience, Expertise, Authoritativeness, Trustworthiness", desc: "Google's quality standard for YMYL content. Legal content without visible attorney credentials and real case experience will not rank.", risk: "No E-E-A-T = content suppressed", reward: "Strong E-E-A-T = preferred by Google + AI" },
            ].map((item) => (
              <div key={item.acronym} className="rounded-xl border border-gray-200 bg-white p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-heading font-extrabold text-lg" style={{ color: O }}>{item.acronym}</span>
                  <span className="text-gray-400 text-sm">{item.full}</span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">{item.desc}</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-red-50 px-3 py-2">
                    <span className="text-[10px] font-bold uppercase text-red-500">Risk</span>
                    <p className="text-red-600 text-xs mt-0.5">{item.risk}</p>
                  </div>
                  <div className="rounded-lg px-3 py-2" style={{ background: G + "10" }}>
                    <span className="text-[10px] font-bold uppercase" style={{ color: G }}>Reward</span>
                    <p className="text-xs mt-0.5" style={{ color: G }}>{item.reward}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 3-STEP PLAN */}
      <section className="py-16 px-6" style={{ background: D }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading font-extrabold text-white text-3xl mb-3">How We Get Your Firm Into the Map Pack</h2>
          <p className="text-gray-400 mb-12">We handle the technical work. You handle the cases.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: "1", title: "Audit and Optimize Your GBP", desc: "Category selection, business hours, services, photos, Q&A, description. Most profiles we inherit score below 60% completion. We bring every profile to 100%. Measurable view increases within 30-45 days." },
              { num: "2", title: "Build Your Local Authority", desc: "Citations across 70+ directories with exact NAP matching. Links from your local bar association, chamber of commerce, and legal directories. Review generation integrated into your intake process." },
              { num: "3", title: "Create Location-Specific Content", desc: "Dedicated pages for every city and practice area combination. Each page targets specific local searches with jurisdiction-specific detail that generic content cannot match." },
            ].map((step) => (
              <div key={step.num} className="bg-gray-800 rounded-xl p-6 text-left">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full font-heading font-extrabold text-white text-sm mb-4" style={{ background: O }}>{step.num}</span>
                <h3 className="font-heading font-bold text-white text-lg mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ReviewRibbon />

      {/* 6. SCORECARD */}
      <section id="scorecard" className="py-16 px-6 bg-gray-50 scroll-mt-16 border-t border-gray-100">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <span className="inline-block text-xs font-heading font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{ background: O + "15", color: O }}>Free Interactive Tool</span>
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-3">Grade Your Local SEO in 60 Seconds</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Answer a few quick questions about your Google Business Profile, reviews, and citations. Get an instant score with specific recommendations.</p>
        </div>
        <LocalSeoScorecard />
      </section>

      {/* 7. US vs INDUSTRY */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-3 text-center">Why Choose a Specialized Local SEO Agency for Law Firms?</h2>
          <p className="text-gray-500 text-center mb-10">Most agencies treat local SEO as a checklist. We treat it as a competitive strategy.</p>
          <div className="rounded-xl border border-gray-200 overflow-hidden bg-white">
            <div className="grid grid-cols-3 text-xs font-bold uppercase tracking-widest">
              <div className="px-5 py-3 bg-gray-50 text-gray-500">Feature</div>
              <div className="px-5 py-3 text-center text-white" style={{ background: O }}>JurisPage</div>
              <div className="px-5 py-3 bg-gray-100 text-center text-gray-500">Generic Agencies</div>
            </div>
            {[
              "100% law firm focus",
              "AI Local Pack optimization",
              "Niche GBP category expertise (2025 updates)",
              "State bar advertising compliance",
              "24/7 business hours strategy",
              "Local bar association link building",
              "Review generation integrated with intake",
              "Citation audit across 70+ directories",
              "Month-to-month contracts",
              "Published pricing on website",
            ].map((feature, i) => (
              <div key={feature} className={`grid grid-cols-3 text-sm ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                <div className="px-5 py-3 text-gray-700 font-medium">{feature}</div>
                <div className="px-5 py-3 text-center"><span className="text-lg" style={{ color: G }}>&#x2713;</span></div>
                <div className="px-5 py-3 text-center"><span className="text-lg text-red-400">&#x2717;</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      {service.relatedCaseStudies && service.relatedCaseStudies.length > 0 && (
        <CaseStudyPreview caseStudies={caseStudies.filter((cs) => service.relatedCaseStudies!.includes(cs.slug))} heading="Real Local SEO Results from Law Firms Like Yours" />
      )}

      {/* 8. PRICING */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-3 text-center">Transparent Pricing. On the Website.</h2>
          <p className="text-gray-500 text-center mb-10">Local SEO produces a cost per case 40-60% lower than Google Ads once rankings stabilize.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl bg-white border border-gray-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100">
                <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: O }}>Included in Launchpad</div>
                <div className="font-heading font-extrabold text-gray-900 text-2xl">Starting at $2,000<span className="text-base font-normal text-gray-400">/mo</span></div>
                <div className="text-xs text-gray-500 mt-1">Local SEO included with website, content, and GBP</div>
              </div>
              <div className="px-6 py-5 space-y-3 text-sm">
                {["Google Business Profile optimization", "Citation building (Yelp, Apple Maps, Bing, Avvo, and 70+ directories)", "Review generation workflow", "NAP consistency audit", "Local content pages", "No upfront setup fee. Costs spread across the 24-month Launchpad engagement."].map((f) => (
                  <div key={f} className="flex items-start gap-2"><span style={{ color: G }}>&#x2713;</span> {f}</div>
                ))}
              </div>
              <div className="px-6 pb-6">
                <Link href="/launchpad/" className="block text-center px-6 py-3 rounded-full text-white font-bold text-sm no-underline" style={{ background: O }}>See Launchpad Pricing</Link>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden" style={{ background: D }}>
              <div className="px-6 py-5 border-b border-gray-700">
                <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: O }}>Juris Digital</div>
                <div className="font-heading font-extrabold text-white text-2xl">$5,000 to $50,000+<span className="text-base font-normal text-gray-400">/mo</span></div>
                <div className="text-xs text-gray-400 mt-1">Advanced local SEO with full marketing suite</div>
              </div>
              <div className="px-6 py-5 space-y-3 text-sm text-gray-300">
                {["Everything in Launchpad, plus:", "Multi-location GBP management", "AI Local Pack optimization", "Local Services Ads management", "Local link building campaigns", "Dedicated strategist"].map((f) => (
                  <div key={f} className="flex items-start gap-2"><span style={{ color: O }}>&#x2713;</span> {f}</div>
                ))}
              </div>
              <div className="px-6 pb-6">
                <Link href="/growth-assessment/" className="block text-center px-6 py-3 rounded-full font-bold text-xs no-underline border-2 border-white text-white hover:bg-white hover:text-gray-900 transition-colors">Apply for a Strategy Session</Link>
              </div>
            </div>
          </div>
          <p className="text-center text-xs text-gray-400 mt-6">
            <Link href="/services/pricing/" className="no-underline hover:underline" style={{ color: O }}>See full pricing breakdown</Link> | 90-day results guarantee | You own everything
          </p>
        </div>
      </section>

      {/* Practice Area Intersections */}
      {(() => {
        const guides = getIntersectionsForService(service.slug);
        if (guides.length === 0) return null;
        return (
          <section className="py-16 px-6 bg-white border-t border-gray-100">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-heading font-extrabold text-gray-900 text-2xl mb-2">Local SEO by Practice Area</h2>
              <p className="text-gray-500 text-sm mb-6">Specialized local SEO guides for specific legal practice areas.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {guides.map((guide) => {
                  const pa = getPracticeAreaBySlug(guide.practiceAreaSlug);
                  return (
                    <Link key={guide.practiceAreaSlug} href={`/${guide.practiceAreaSlug}/${guide.serviceSlug}/`} className="group flex flex-col gap-1 rounded-xl border border-gray-200 bg-white p-5 no-underline hover:border-[#EE6C13] transition-colors">
                      <span className="font-heading font-bold text-gray-900 text-base group-hover:text-[#EE6C13] transition-colors">{guide.heading}</span>
                      {pa && <span className="text-gray-500 text-sm">{pa.primaryKeyword}</span>}
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })()}

      {/* Related Services */}
      <section className="py-12 px-6 bg-gray-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Works best with</p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Law Firm SEO", href: "/law-firm-seo/" },
              { label: "Law Firm Content Writing", href: "/law-firm-content-writing/" },
              { label: "Google Ads for Law Firms", href: "/google-ads-for-law-firms/" },
              { label: "Law Firm Websites", href: "/law-firm-websites/" },
              { label: "GEO for Law Firms", href: "/generative-engine-optimization-legal-marketing/" },
            ].map((link) => (
              <Link key={link.label} href={link.href} className="px-4 py-2 rounded-full border text-sm font-medium no-underline transition-all hover:bg-[#EE6C13] hover:text-white hover:border-[#EE6C13]" style={{ borderColor: O, color: O }}>{link.label}</Link>
            ))}
          </div>
        </div>
      </section>

      <FAQAccordion faqs={allFaqs} heading="Local SEO for Law Firms: Questions Answered" />

      <CTASection
        heading="Ready to Own the Map Pack in Your Market?"
        subtext="Local SEO that produces a cost per case 40-60% lower than Google Ads. No upfront fee."
        primaryLabel="Grade Your Local SEO Free"
        primaryHref="#scorecard"
        secondaryLabel="See Transparent Pricing"
        secondaryHref="/services/pricing/"
      />
    </>
  );
}
