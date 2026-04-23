import type { Metadata } from "next";
import Link from "next/link";
import { getServiceBySlug } from "@/data/services";
import { getPracticeAreaBySlug } from "@/data/practiceAreas";
import { getIntersectionsForService } from "@/data/intersections";
import CTASection from "@/components/CTASection";
import PortfolioShowcase from "@/components/PortfolioShowcase";
import ReviewRibbon from "@/components/ReviewRibbon";
import FAQAccordion from "@/components/FAQAccordion";
import SchemaOrg from "@/components/SchemaOrg";
import CaseStudyPreview from "@/components/CaseStudyPreview";
import HeroForm from "@/components/HeroForm";
import WebsiteGrader from "@/components/WebsiteGrader";
import { caseStudies } from "@/data/caseStudies";

const service = getServiceBySlug("law-firm-websites")!;
const O = "#EE6C13";
const D = "#1a1a2e";

export const metadata: Metadata = {
  title: "Law Firm Website Design That Wins Cases, Not Just Compliments",
  description: "Custom StoryBrand-driven law firm websites that rank in Google, convert visitors into consultations, and make your phone ring. Live in 45 days. No upfront fee. You own everything.",
  alternates: { canonical: "https://jurispage.com/law-firm-websites/" },
  openGraph: {
    title: "Law Firm Website Design That Wins Cases, Not Just Compliments",
    description: "Custom StoryBrand-driven law firm websites that rank in Google, convert visitors into consultations, and make your phone ring. Live in 45 days. No upfront fee. You own everything.",
    url: "https://jurispage.com/law-firm-websites/",
  },
};

export default function LawFirmWebsitesPage() {
  const allFaqs = [
    { question: "How much does a custom law firm website cost?", preview: "Launchpad starts at $2,000/mo with no upfront fee. Includes brand design, StoryBrand website, content, SEO, and GBP setup.", answer: "JurisPage Launchpad starts at $2,000 per month over a 24-month engagement with no upfront setup fee. It includes brand design, a custom StoryBrand-driven WordPress website, practice area content, Google Business Profile setup, Yelp, Apple Maps, weekly social posting, and ongoing SEO. For established firms ready to invest $5,000 to $50,000+/month, Juris Digital partnerships deliver a fully bespoke design and content strategy. All Launchpad pricing is published on our website. No discovery calls required." },
    { question: "How long does it take to design and launch a law firm website?", preview: "45 days for the full Launchpad foundation. 45-60 days for custom redesigns.", answer: "Launchpad websites go live inside the 45-day full setup window alongside brand design, GBP, Yelp, Apple Maps, citations, social profiles, weekly posting, and tracking. That includes discovery, wireframes, design, content writing, development, and launch. Custom redesigns for established firms working with Juris Digital typically take 45 to 60 days depending on content readiness and revision cycles. We build attorney review time into the timeline so publication dates don't slip." },
    { question: "Do I own the website once it's built?", preview: "Yes. 100%. Your domain, your WordPress site, your content. Take it anywhere.", answer: "Always. Your domain, your WordPress installation, your content. All 100% yours. Unlike agencies that host on proprietary platforms (Scorpion, FindLaw, Martindale), you can take your website to any hosting provider or any developer at any time. We don't hold websites hostage. If you leave, everything transfers cleanly." },
    { question: "Why WordPress instead of a proprietary platform?", preview: "Full ownership, massive developer ecosystem, and SEO control you can't get elsewhere.", answer: "WordPress powers over 40% of the web and gives you three things proprietary platforms can't: full ownership (you control the code, hosting, and content), a massive developer ecosystem (any developer can work on your site if you ever change agencies), and complete SEO control (custom schema, server-side caching, Core Web Vitals optimization). Proprietary platforms lock you into their ecosystem and limit what you can do with your own site." },
    { question: "What makes a law firm website different from a regular business website?", preview: "YMYL classification, bar advertising rules, and E-E-A-T requirements that most designers have never heard of.", answer: "Three things. First, Google classifies legal content as YMYL (Your Money or Your Life) and applies stricter quality standards. Your content needs verifiable attorney credentials and real legal expertise, not marketing copy. Second, bar advertising rules vary by state and restrict what you can say about case results, qualifications, and testimonials. Violations trigger disciplinary action. Third, E-E-A-T signals (Experience, Expertise, Authoritativeness, Trustworthiness) must be woven into every page. Attorney bio pages, case result formatting, and practice area depth all factor into how Google evaluates your site." },
    { question: "Will my new website be optimized for mobile?", preview: "Yes. We design mobile-first because 76% of legal searches happen on phones.", answer: "Every page is wireframed on a mobile viewport first, because that is where 76% of your potential clients will see it. Google uses mobile-first indexing, meaning it evaluates your mobile site to determine rankings for everyone, including desktop users. We target Largest Contentful Paint under 2.5 seconds on mobile, which is Google's threshold for a 'good' Core Web Vitals score." },
    { question: "Can you redesign my existing law firm website?", preview: "Yes. We audit your current site, preserve your SEO equity, and rebuild for conversion.", answer: "Yes. We start with a technical audit of your existing site to identify what's working (pages with rankings and backlinks that need to be preserved) and what's not (thin content, slow load times, poor mobile experience). We map 301 redirects for every old URL so you don't lose the SEO equity you've built. The redesign process typically takes 45 to 60 days and includes new content for every practice area page." },
    ...service.faqs,
    ...(service.extendedFaqs ?? []),
  ];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://jurispage.com/law-firm-websites/",
    name: "Law Firm Website Design",
    description: "Custom law firm websites that rank in Google, convert visitors into consultations, and make your phone ring.",
    provider: { "@type": "Organization", name: "JurisPage", url: "https://jurispage.com" },
    url: "https://jurispage.com/law-firm-websites/",
    areaServed: { "@type": "Country", name: "United States" },
  };

  const faqSchema = allFaqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  } : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://jurispage.com/" },
      { "@type": "ListItem", position: 2, name: "Law Firm Website Design", item: "https://jurispage.com/law-firm-websites/" },
    ],
  };

  const schemas = [serviceSchema, breadcrumbSchema, ...(faqSchema ? [faqSchema] : [])];

  return (
    <>
      <SchemaOrg schema={schemas} />

      {/* ═══════════════════════════════════════════════════════
          1. HERO - StoryBrand: Character + Problem
      ═══════════════════════════════════════════════════════ */}
      <section className="bg-white py-20 px-6 border-b border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <nav className="text-sm text-gray-500 mb-5">
            <Link href="/" className="hover:text-gray-900 no-underline">Home</Link> /{" "}
            <span className="text-gray-700">Law Firm Website Design</span>
          </nav>

          <div className="flex flex-wrap gap-3 justify-center mb-6">
            <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: O + "15", color: O }}>Zero Long-Term Contracts</span>
            <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: "#27ae6015", color: "#27ae60" }}>Transparent Pricing</span>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-gray-100 text-gray-600">100% Legal Focus</span>
          </div>

          <h1 className="font-heading font-extrabold text-gray-900 text-4xl md:text-5xl leading-tight mb-6">
            Great Lawyers Shouldn't Lose Cases to Firms With Better <span style={{ color: O }}>Websites</span>
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            You went to law school to practice law, not to decipher search algorithms. But right now, potential clients are Googling your firm, seeing an outdated website, and quietly hiring your competitor instead.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            We build law firm websites that make that stop happening.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#website-grader" className="px-8 py-4 rounded-full text-white font-bold text-sm no-underline transition-opacity hover:opacity-90" style={{ background: O }}>
              Grade Your Website in 60 Seconds
            </a>
            <Link href="/services/pricing/" className="px-8 py-4 rounded-full font-bold text-sm no-underline border-2 transition-all hover:bg-gray-50" style={{ borderColor: D, color: D }}>
              See Transparent Pricing
            </Link>
          </div>
          <p className="text-xs text-gray-400 mt-4">No email required. Instant results.</p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          2. THE INVISIBLE LEAK - HTML Funnel
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-3 text-center">The Invisible Leak in Your Practice</h2>
          <p className="text-gray-500 text-center mb-10 max-w-2xl mx-auto">Your website is losing you cases right now. Here is exactly where they go.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Leaky funnel */}
            <div className="rounded-xl border border-red-200 bg-white overflow-hidden">
              <div className="bg-red-500 text-white text-center py-2 text-xs font-bold uppercase tracking-widest">Your Current Website</div>
              <div className="p-5 space-y-0">
                {/* Step 1 - wide */}
                <div className="bg-gray-100 rounded-lg px-4 py-3 text-center">
                  <div className="font-heading font-extrabold text-gray-900 text-lg">100</div>
                  <div className="text-gray-500 text-xs">people search for a lawyer in your city</div>
                </div>
                <div className="flex justify-center py-1"><div className="w-0.5 h-4 bg-gray-300" /></div>
                {/* Step 2 */}
                <div className="bg-gray-100 rounded-lg px-4 py-3 text-center mx-4">
                  <div className="font-heading font-extrabold text-gray-900 text-lg">42</div>
                  <div className="text-gray-500 text-xs">click your Google listing</div>
                </div>
                <div className="flex justify-center py-1"><div className="w-0.5 h-4 bg-gray-300" /></div>
                {/* Leak */}
                <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-center mx-2">
                  <div className="font-heading font-extrabold text-red-500 text-lg">31 leave</div>
                  <div className="text-red-400 text-xs">Slow load. No phone number. Outdated design. No trust signals.</div>
                </div>
                <div className="flex justify-center py-1"><div className="w-0.5 h-4 bg-red-300" /></div>
                {/* Bottom */}
                <div className="bg-red-100 rounded-lg px-4 py-4 text-center mx-10">
                  <div className="font-heading font-extrabold text-red-600 text-2xl">11 call</div>
                  <div className="text-red-400 text-xs font-bold">2% conversion rate</div>
                </div>
              </div>
              <div className="bg-red-50 px-5 py-3 text-center">
                <p className="text-red-600 text-xs font-bold">You lost 31 potential clients. You never knew they visited.</p>
              </div>
            </div>

            {/* Fixed funnel */}
            <div className="rounded-xl border-2 overflow-hidden" style={{ borderColor: O }}>
              <div className="text-white text-center py-2 text-xs font-bold uppercase tracking-widest" style={{ background: O }}>With JurisPage</div>
              <div className="p-5 space-y-0" style={{ background: O + "06" }}>
                {/* Step 1 - wide */}
                <div className="bg-white rounded-lg px-4 py-3 text-center border border-gray-100">
                  <div className="font-heading font-extrabold text-gray-900 text-lg">100</div>
                  <div className="text-gray-500 text-xs">people search for a lawyer in your city</div>
                </div>
                <div className="flex justify-center py-1"><div className="w-0.5 h-4" style={{ background: O + "40" }} /></div>
                {/* Step 2 */}
                <div className="bg-white rounded-lg px-4 py-3 text-center mx-4 border border-gray-100">
                  <div className="font-heading font-extrabold text-gray-900 text-lg">42</div>
                  <div className="text-gray-500 text-xs">click your Google listing</div>
                </div>
                <div className="flex justify-center py-1"><div className="w-0.5 h-4" style={{ background: O + "40" }} /></div>
                {/* Retained */}
                <div className="rounded-lg px-4 py-3 text-center mx-2 border" style={{ background: "#27ae6010", borderColor: "#27ae6030" }}>
                  <div className="font-heading font-extrabold text-lg" style={{ color: "#27ae60" }}>35 stay</div>
                  <div className="text-xs" style={{ color: "#27ae60" }}>Fast load. Clear CTA. Attorney photos. Trust signals above the fold.</div>
                </div>
                <div className="flex justify-center py-1"><div className="w-0.5 h-4" style={{ background: O + "40" }} /></div>
                {/* Bottom */}
                <div className="rounded-lg px-4 py-4 text-center mx-6" style={{ background: O + "15" }}>
                  <div className="font-heading font-extrabold text-2xl" style={{ color: O }}>35 call</div>
                  <div className="text-xs font-bold" style={{ color: O }}>6-8% conversion rate</div>
                </div>
              </div>
              <div className="px-5 py-3 text-center" style={{ background: O + "10" }}>
                <p className="text-xs font-bold" style={{ color: O }}>3x more consultations. Same traffic. Better website.</p>
              </div>
            </div>
          </div>

          {/* Problem cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
            {[
              { title: "The referral you never knew you lost", body: "A colleague refers a client. They Google your firm. Your site looks outdated. They call the next name on the list.", color: "#c0392b" },
              { title: "The agency that locked you in", body: "12-month contract, no results, and you can't take your website with you when you leave.", color: "#e67e22" },
              { title: "The better lawyer who loses on Google", body: "You have 20 years of experience. The firm ranking above you has 3. Their website just converts better.", color: O },
            ].map((card) => (
              <div key={card.title} className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="w-8 h-1 rounded mb-3" style={{ background: card.color }} />
                <h3 className="font-heading font-bold text-gray-900 text-sm mb-2">{card.title}</h3>
                <p className="text-gray-600 text-xs leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      {service.portfolio && service.portfolio.length > 0 && (
        <PortfolioShowcase items={service.portfolio} />
      )}

      <ReviewRibbon />

      {/* ═══════════════════════════════════════════════════════
          3. STATS BAR
      ═══════════════════════════════════════════════════════ */}
      <section className="py-10 px-6" style={{ background: O }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "45 days", label: "From kickoff to full marketing foundation live" },
              { value: "100%", label: "You own your domain, site, and all IP we create" },
              { value: "3x", label: "Average increase in contact form submissions" },
              { value: "113+", label: "Law firms we've built websites for" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-heading font-extrabold text-white text-3xl md:text-4xl leading-none mb-1">{stat.value}</div>
                <div className="text-orange-100 text-sm leading-snug">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          4. THE 3-STEP PLAN (StoryBrand: Plan)
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-3">How It Works: 3 Steps to a Website That Wins Cases</h2>
          <p className="text-gray-500 mb-12 max-w-2xl mx-auto">We handle the technical complexity. You approve the strategy and review the content. That's it.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                num: "1",
                title: "Get a Market-Gap Analysis",
                desc: "We audit your current site, your competitors, and the search landscape in your market. You see exactly where you're losing cases online.",
                cta: "Free. No commitment required.",
              },
              {
                num: "2",
                title: "We Build Your Conversion Engine",
                desc: "Custom StoryBrand-driven WordPress site designed mobile-first with attorney-reviewed content, E-E-A-T signals, and bar-compliant messaging. Live inside the 45-day Launchpad setup window.",
                cta: "You review. We build.",
              },
              {
                num: "3",
                title: "Dominate Your Market",
                desc: "Your site launches with SEO architecture, Google Search Console, and conversion tracking. Every page is built to rank and built to convert visitors into consultations.",
                cta: "Cases start coming in.",
              },
            ].map((step) => (
              <div key={step.num} className="text-left rounded-xl border border-gray-200 p-6 hover:border-orange-200 hover:shadow-sm transition-all">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full font-heading font-extrabold text-white text-lg mb-4" style={{ background: O }}>
                  {step.num}
                </span>
                <h3 className="font-heading font-bold text-gray-900 text-lg mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">{step.desc}</p>
                <span className="text-xs font-bold" style={{ color: O }}>{step.cta}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          5. WHAT MAKES A TOP-TIER LAW FIRM WEBSITE
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-3 text-center">What Makes a Top-Tier Law Firm Website Design?</h2>
          <p className="text-gray-500 text-center mb-10 max-w-2xl mx-auto">Not graphics. Not animations. These are the elements that make phones ring.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: "Click-to-Call Above the Fold", desc: "A visible phone number on every page. Mobile visitors in immediate need call when they see it. Buried contact pages lose them." },
              { title: "Practice Area Architecture", desc: "Dedicated pages for every case type you handle. Not a single page listing everything. Each page targets specific searches and converts specific clients." },
              { title: "Attorney Bios with E-E-A-T", desc: "Bar admissions, case experience, court admissions, speaking credits. Google's quality raters look for these signals on YMYL legal content." },
              { title: "Mobile-First Design", desc: "76% of legal searches happen on phones. We design for mobile first, then scale up. Google indexes your mobile site to determine everyone's rankings." },
              { title: "Sub-2.5 Second Load Times", desc: "Google's threshold for a 'good' Core Web Vitals score. Slower sites rank lower and lose 57% of visitors who won't wait more than 3 seconds." },
              { title: "Bar-Compliant Content", desc: "Case result formatting, testimonial disclaimers, and advertising disclosures that comply with your state's bar rules. Not an afterthought. Built in from day one." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="font-heading font-bold text-gray-900 text-base mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          6. WHY CHOOSE A SPECIALIZED AGENCY (Us vs Industry)
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-3 text-center">Why Choose a Specialized Law Firm Web Design Agency?</h2>
          <p className="text-gray-500 text-center mb-10">A fast scan of what you get vs. what generalist agencies deliver.</p>

          <div className="rounded-xl border border-gray-200 overflow-hidden bg-white">
            <div className="grid grid-cols-3 text-xs font-bold uppercase tracking-widest">
              <div className="px-5 py-3 bg-gray-50 text-gray-500">Feature</div>
              <div className="px-5 py-3 text-center text-white" style={{ background: O }}>JurisPage</div>
              <div className="px-5 py-3 bg-gray-100 text-center text-gray-500">Generic Agencies</div>
            </div>
            {[
              "100% law firm focus",
              "YMYL and E-E-A-T expertise",
              "Bar advertising compliance built in",
              "You own the WordPress site",
              "No upfront setup fee (costs spread across 24 months)",
              "Published pricing on website",
              "Attorney-reviewed content",
              "Practice area page architecture",
              "Schema markup (Attorney, FAQ, LawFirm)",
              "45-day full launch (website, GBP, Yelp, Apple Maps, social, tracking)",
            ].map((feature, i) => (
              <div key={feature} className={`grid grid-cols-3 text-sm ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                <div className="px-5 py-3 text-gray-700 font-medium">{feature}</div>
                <div className="px-5 py-3 text-center"><span className="text-lg" style={{ color: "#27ae60" }}>&#x2713;</span></div>
                <div className="px-5 py-3 text-center"><span className="text-lg text-red-400">&#x2717;</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          7. SUCCESS vs FAILURE (StoryBrand)
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 px-6" style={{ background: D }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading font-extrabold text-white text-3xl mb-10 text-center">Two Paths Forward</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Failure */}
            <div className="rounded-xl border border-gray-700 bg-gray-800 p-6">
              <div className="text-red-400 text-xs font-bold uppercase tracking-widest mb-4">If you do nothing</div>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex gap-2"><span className="text-red-400 flex-shrink-0">&#x2717;</span> Referrals Google your firm, see an outdated site, and call someone else</li>
                <li className="flex gap-2"><span className="text-red-400 flex-shrink-0">&#x2717;</span> Competitors publish strategic content every month while your site sits unchanged</li>
                <li className="flex gap-2"><span className="text-red-400 flex-shrink-0">&#x2717;</span> You keep paying for ads to a website that converts at 2% instead of 6%</li>
                <li className="flex gap-2"><span className="text-red-400 flex-shrink-0">&#x2717;</span> Every month the authority gap grows wider and more expensive to close</li>
              </ul>
            </div>

            {/* Success */}
            <div className="rounded-xl p-6" style={{ background: O + "15", border: `1px solid ${O}44` }}>
              <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: O }}>With JurisPage</div>
              <ul className="space-y-3 text-sm text-gray-200">
                <li className="flex gap-2"><span style={{ color: O }} className="flex-shrink-0">&#x2713;</span> Your site proves your legal expertise before the client picks up the phone</li>
                <li className="flex gap-2"><span style={{ color: O }} className="flex-shrink-0">&#x2713;</span> Organic traffic compounds month over month without additional ad spend</li>
                <li className="flex gap-2"><span style={{ color: O }} className="flex-shrink-0">&#x2713;</span> Every practice area page targets the exact searches your ideal clients type</li>
                <li className="flex gap-2"><span style={{ color: O }} className="flex-shrink-0">&#x2713;</span> Premium clients sign because your website convinced them before the consultation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      {service.relatedCaseStudies && service.relatedCaseStudies.length > 0 && (
        <CaseStudyPreview
          caseStudies={caseStudies.filter((cs) => service.relatedCaseStudies!.includes(cs.slug))}
          heading="Real Results from Law Firms Like Yours"
        />
      )}

      {/* ═══════════════════════════════════════════════════════
          8. PRICING
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-3 text-center">Transparent Pricing. On the Website. Like We Promised.</h2>
          <p className="text-gray-500 text-center mb-10">No discovery calls required to see what you'll pay.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Launchpad */}
            <div className="rounded-xl bg-white border border-gray-200 overflow-hidden flex flex-col">
              <div className="px-5 py-4 border-b border-gray-100">
                <div className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: O }}>Launchpad</div>
                <div className="font-heading font-extrabold text-gray-900 text-xl">$2,000<span className="text-sm font-normal text-gray-400">/mo</span></div>
                <div className="text-xs text-gray-500 mt-1">Everything included. 24-month engagement, no upfront fee.</div>
              </div>
              <div className="px-5 py-4 space-y-2.5 text-sm flex-1">
                <p className="text-gray-600 text-xs leading-relaxed mb-3">Best for small or startup law firms with little to no online presence that need a professional foundation fast.</p>
                {["Brand design (logo, typography, photography, graphics, brand guidelines)", "StoryBrand-driven WordPress website", "Practice area pages with SEO content", "Google Business Profile setup", "Yelp, Apple Maps, Bing, Avvo, and 30+ directories", "Weekly social media posting", "Attorney-reviewed content", "Full setup live in 45 days", "No upfront fee. Costs spread over 24 months."].map((f) => (
                  <div key={f} className="flex items-start gap-2 text-xs"><span style={{ color: "#27ae60" }}>&#x2713;</span> {f}</div>
                ))}
              </div>
              <div className="px-5 pb-5">
                <Link href="/launchpad/" className="block text-center px-5 py-2.5 rounded-full text-white font-bold text-xs no-underline" style={{ background: O }}>
                  See Launchpad Pricing
                </Link>
              </div>
            </div>

            {/* Custom One-Time Build */}
            <div className="rounded-xl overflow-hidden flex flex-col relative border-2" style={{ borderColor: O }}>
              <div className="absolute top-0 left-0 right-0 text-center py-1 text-[10px] font-bold uppercase tracking-widest text-white" style={{ background: O }}>
                Most Popular
              </div>
              <div className="px-5 py-4 border-b border-gray-100 mt-6">
                <div className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: O }}>Custom Website Build</div>
                <div className="font-heading font-extrabold text-gray-900 text-xl">$5,000 - $100,000</div>
                <div className="text-xs text-gray-500 mt-1">One-time build. You own everything.</div>
              </div>
              <div className="px-5 py-4 space-y-2.5 text-sm flex-1">
                <p className="text-gray-600 text-xs leading-relaxed mb-3">For firms that want a fully bespoke website build or a highly interactive experience tailored to their brand (beyond the StoryBrand layout already included with Launchpad).</p>
                {["Fully custom design and UX", "Custom messaging framework", "Interactive elements and tools", "Attorney bios with full E-E-A-T", "Bar-compliant content throughout", "SEO architecture from day one", "Price depends on size and complexity"].map((f) => (
                  <div key={f} className="flex items-start gap-2 text-xs"><span style={{ color: "#27ae60" }}>&#x2713;</span> {f}</div>
                ))}
              </div>
              <div className="px-5 pb-5">
                <Link href="/contact/" className="block text-center px-5 py-2.5 rounded-full text-white font-bold text-xs no-underline" style={{ background: O }}>
                  Get a Custom Quote
                </Link>
              </div>
            </div>

            {/* Juris Digital Ongoing */}
            <div className="rounded-xl overflow-hidden flex flex-col" style={{ background: D }}>
              <div className="px-5 py-4 border-b border-gray-700">
                <div className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: O }}>Juris Digital</div>
                <div className="font-heading font-extrabold text-white text-xl">$5,000 to $50,000+<span className="text-sm font-normal text-gray-400">/mo</span></div>
                <div className="text-xs text-gray-400 mt-1">Full-service marketing with website.</div>
              </div>
              <div className="px-5 py-4 space-y-2.5 text-sm text-gray-300 flex-1">
                <p className="text-gray-400 text-xs leading-relaxed mb-3">For established firms ready to invest $5,000 to $50,000+/month in a custom website plus ongoing SEO, ads, and content strategy.</p>
                {["Everything in Launchpad, plus:", "Fully bespoke website design", "Full content strategy with topic mapping", "Google Ads management", "Link building and authority development", "Dedicated account strategist"].map((f) => (
                  <div key={f} className="flex items-start gap-2 text-xs"><span style={{ color: O }}>&#x2713;</span> {f}</div>
                ))}
              </div>
              <div className="px-5 pb-5">
                <Link href="/growth-assessment/" className="block text-center px-5 py-2.5 rounded-full font-bold text-xs no-underline border-2 border-white text-white hover:bg-white hover:text-gray-900 transition-colors">
                  Apply for a Strategy Session
                </Link>
              </div>
            </div>
          </div>
          <p className="text-center text-xs text-gray-400 mt-6">
            <Link href="/services/pricing/" className="no-underline hover:underline" style={{ color: O }}>See full pricing breakdown</Link> | 90-day results guarantee | You own everything we build
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
              <h2 className="font-heading font-extrabold text-gray-900 text-2xl mb-2">
                Law Firm Website Design by Practice Area
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                Specialized guides combining website design with specific legal practice areas.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {guides.map((guide) => {
                  const pa = getPracticeAreaBySlug(guide.practiceAreaSlug);
                  return (
                    <Link
                      key={guide.practiceAreaSlug}
                      href={`/${guide.practiceAreaSlug}/${guide.serviceSlug}/`}
                      className="group flex flex-col gap-1 rounded-xl border border-gray-200 bg-white p-5 no-underline hover:border-[#EE6C13] hover:bg-[#EE6C1308] transition-colors"
                    >
                      <span className="font-heading font-bold text-gray-900 text-base group-hover:text-[#EE6C13] transition-colors">
                        {guide.heading}
                      </span>
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
      {service.relatedPracticeAreas && service.relatedPracticeAreas.length > 0 && (
        <section className="py-12 px-6 bg-gray-50 border-t border-gray-100">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Website design for these practice areas</p>
            <div className="flex flex-wrap gap-3">
              {service.relatedPracticeAreas.map((slug) => {
                const pa = getPracticeAreaBySlug(slug);
                if (!pa) return null;
                return (
                  <Link key={slug} href={`/${slug}/`} className="px-4 py-2 rounded-[40px] border text-sm font-medium no-underline transition-all hover:bg-[#EE6C13] hover:text-white hover:border-[#EE6C13]" style={{ borderColor: O, color: O }}>
                    {pa.primaryKeyword}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════
          WEBSITE GRADER - Interactive Scorecard
      ═══════════════════════════════════════════════════════ */}
      <section id="website-grader" className="py-16 px-6 bg-white scroll-mt-16 border-t border-gray-100">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <span className="inline-block text-xs font-heading font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{ background: O + "15", color: O }}>
            Free Interactive Tool
          </span>
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-3">Grade Your Law Firm Website in 60 Seconds</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Answer 7 quick questions about your current site. Get an instant letter grade and a prioritized list of what to fix.</p>
        </div>
        <WebsiteGrader />
      </section>

      {/* FAQ */}
      <FAQAccordion faqs={allFaqs} heading="Law Firm Website Design Questions Answered" />

      {/* CTA */}
      <CTASection
        heading="Ready to Build a Website That Wins Cases?"
        subtext="Custom StoryBrand-driven law firm website with full marketing foundation in 45 days. 100% ownership. No upfront setup fee. 113+ law firms served."
        primaryLabel="Book a Free Website Review"
        primaryHref="/contact/"
        secondaryLabel="See Transparent Pricing"
        secondaryHref="/services/pricing/"
      />
    </>
  );
}
