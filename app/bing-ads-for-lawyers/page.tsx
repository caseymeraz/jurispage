import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getServiceBySlug } from "@/data/services";
import FAQAccordion from "@/components/FAQAccordion";
import SchemaOrg from "@/components/SchemaOrg";
import CTASection from "@/components/CTASection";
import BingBidEstimator from "@/components/BingBidEstimator";
import CaseStudyPreview from "@/components/CaseStudyPreview";
import { caseStudies } from "@/data/caseStudies";

const service = getServiceBySlug("bing-ads-for-lawyers")!;
const O = "#EE6C13";
const D = "#1a1a2e";
const G = "#27ae60";
const B = "#0f4c81";

export const metadata: Metadata = {
  title: "Bing Ads for Lawyers: Capture High-Asset Cases at 40% Lower Cost",
  description: "Microsoft Advertising for law firms. 30-50% lower CPCs than Google, LinkedIn audience targeting, and Copilot AI integration. No upfront fee. You own your account.",
  alternates: { canonical: "https://jurispage.com/bing-ads-for-lawyers/" },
};

export default function BingAdsPage() {
  const allFaqs = [
    { question: "Is Bing Ads worth it for law firms?", preview: "Yes. CPCs are 30-50% lower than Google, and Bing users skew older and wealthier. Most competitors aren't even there.", answer: service.faqs[0]?.answer ?? "" },
    { question: "How much traffic does Bing have for legal searches?", preview: "27-33% of US desktop search. About 20-30% of the legal search volume you see on Google, with far fewer competing advertisers.", answer: service.extendedFaqs?.[0]?.answer ?? "" },
    { question: "What types of law firms benefit most from Bing Ads?", preview: "Estate planning, business litigation, high-asset divorce, and employment law. Practice areas where older, wealthier clients are the target.", answer: service.extendedFaqs?.[1]?.answer ?? "" },
    { question: "Can I import my Google Ads campaigns into Microsoft Ads?", preview: "Yes. We use Google Import as a foundation, then make Bing-specific adjustments for match types, negatives, and audience layers.", answer: service.extendedFaqs?.[2]?.answer ?? "" },
    { question: "How does LinkedIn targeting work on Microsoft Ads?", preview: "You can layer job title, industry, seniority, and company size on top of keyword targeting. No other search platform offers this.", answer: service.extendedFaqs?.[3]?.answer ?? "" },
    { question: "How does Microsoft Copilot affect Bing advertising?", preview: "Copilot serves ads alongside AI responses. Legal questions to Copilot now show sponsored results from Microsoft Ads campaigns.", answer: service.extendedFaqs?.[4]?.answer ?? "" },
    ...service.faqs.slice(1),
  ];

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://jurispage.com/bing-ads-for-lawyers/",
      name: "Bing Ads for Lawyers",
      description: "Microsoft Advertising management for law firms. LinkedIn targeting, Copilot integration, 30-50% lower CPCs.",
      provider: { "@type": "Organization", name: "JurisPage", url: "https://jurispage.com" },
      url: "https://jurispage.com/bing-ads-for-lawyers/",
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
  ];

  return (
    <>
      <SchemaOrg schema={schemas} />

      {/* 1. HERO */}
      <section className="bg-white py-20 px-6 border-b border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <nav className="text-sm text-gray-500 mb-5">
            <Link href="/" className="hover:text-gray-900 no-underline">Home</Link> /{" "}
            <span className="text-gray-700">Bing Ads for Lawyers</span>
          </nav>
          <div className="flex flex-wrap gap-3 justify-center mb-6">
            <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: O + "15", color: O }}>30-50% Lower CPCs</span>
            <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: B + "15", color: B }}>LinkedIn Audience Targeting</span>
            <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: G + "15", color: G }}>34% Higher Household Income</span>
          </div>
          <h1 className="font-heading font-extrabold text-gray-900 text-4xl md:text-5xl leading-tight mb-6">
            Bing Ads for Lawyers: Smaller Than Google. Still Too Valuable to <span style={{ color: O }}>Sleep</span> On.
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            Bing has fewer searches than Google. That is true. But the searches it does have skew older, wealthier, and more likely to need an estate planning attorney, business litigator, or high-asset divorce lawyer. And almost nobody is advertising to them.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            Not enough law firms take advantage of this. The volume is smaller, but the CPCs are 30-50% lower, the competition is nearly zero, and you get LinkedIn audience targeting that Google cannot offer. It is not a replacement for Google. It is the extra 15-25% of cases most firms leave on the table.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact/" className="px-8 py-4 rounded-full text-white font-bold text-sm no-underline transition-opacity hover:opacity-90" style={{ background: O }}>Get Your Free Bing Opportunity Report</Link>
            <Link href="/services/pricing/" className="px-8 py-4 rounded-full font-bold text-sm no-underline border-2 transition-all hover:bg-gray-50" style={{ borderColor: D, color: D }}>See Transparent Pricing</Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 px-6" style={{ background: O }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "30-50%", label: "Lower CPCs than Google for equivalent legal keywords" },
              { value: "35%", label: "Of US desktop searches happen on Bing-powered properties" },
              { value: "34%", label: "Higher average household income for Bing users" },
              { value: "Few", label: "Law firm competitors running Bing campaigns in most markets" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-heading font-extrabold text-white text-3xl md:text-4xl leading-none mb-1">{stat.value}</div>
                <div className="text-orange-100 text-sm leading-snug">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. THE HIDDEN PROFIT */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-3 text-center">Why the Highest-Value Cases Are Hidden on Bing</h2>
          <p className="text-gray-500 text-center mb-10 max-w-2xl mx-auto">It's not the "second best" search engine. It's the one where your ideal clients search and your competitors don't advertise.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "The External Problem", title: "You're overpaying on Google", body: "You're paying $100-200 per click on Google while the same client searches Bing. The same keyword costs $20-60 there. Same intent. Same conversion rate. 40% less money.", color: "#c0392b" },
              { label: "The Internal Problem", title: "You don't have time for another platform", body: "You're already managing Google Ads, SEO, and your firm. The last thing you want is another dashboard to check. We manage both platforms under one strategy and one report.", color: "#e67e22" },
              { label: "The Philosophical Problem", title: "Good lawyers shouldn't be outspent", body: "A great attorney shouldn't lose cases just because a bigger firm has a bigger Google budget. Bing levels the playing field. Fewer competitors. Lower costs. Same quality clients.", color: O },
            ].map((card) => (
              <div key={card.title} className="bg-white rounded-xl border border-gray-200 p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1" style={{ background: card.color }} />
                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: card.color }}>{card.label}</span>
                <h3 className="font-heading font-bold text-gray-900 text-lg mt-2 mb-3">{card.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BING SERP SCREENSHOT */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 text-center">What a Bing search for "Personal Injury Lawyer" looks like</p>
          <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <Image
              src="/images/bing-serp-personal-injury-lawyer-search-result.webp"
              alt="Bing search engine results page showing a personal injury lawyer search with knowledge panel, practice area filters, and sponsored law firm listings - demonstrating the advertising opportunity on Microsoft Bing for law firms"
              width={2072}
              height={828}
              className="w-full h-auto"
              quality={90}
            />
          </div>
          <p className="text-xs text-gray-400 text-center mt-3">Bing displays knowledge panels, practice area filters, and sponsored results. Most law firms have zero presence here.</p>
        </div>
      </section>

      {/* 3. BID ESTIMATOR */}
      <section className="py-16 px-6 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <span className="inline-block text-xs font-heading font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{ background: O + "15", color: O }}>Interactive Tool</span>
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-3">See How Much You Could Save on Bing</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Select your practice area and budget. See the CPC difference instantly.</p>
        </div>
        <BingBidEstimator />
      </section>

      {/* 4. LINKEDIN TARGETING */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-3 text-center">The Only Ad Platform That Knows Their Job Title</h2>
          <p className="text-gray-500 text-center mb-10 max-w-2xl mx-auto">Microsoft Advertising connects to LinkedIn profile data. You can target by job function, industry, seniority, and company size on top of keyword intent. Google cannot do this.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { area: "Employment Law", target: "HR Managers at 500+ employee companies", why: "The people who make the call to hire outside employment counsel" },
              { area: "Business Litigation", target: "C-Suite Executives in local industries", why: "Decision-makers with authority to retain counsel for disputes" },
              { area: "Workers' Comp", target: "Construction and Manufacturing employees", why: "Industries with the highest workplace injury rates" },
              { area: "Estate Planning", target: "Professionals 50+, high-income zip codes", why: "The demographic most likely to need trust and estate services" },
              { area: "Immigration", target: "HR/Talent Acquisition at hiring companies", why: "Employers sponsoring visas need immigration counsel" },
              { area: "IP / Tech Law", target: "Engineering and Product leaders at tech companies", why: "Patent, trademark, and trade secret decisions start here" },
            ].map((item) => (
              <div key={item.area} className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: B }}>{item.area}</div>
                <h3 className="font-heading font-bold text-gray-900 text-sm mb-1">Target: {item.target}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{item.why}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 mt-8 text-center">
            <p className="text-gray-700 text-sm font-bold">"We don't just find people searching for lawyers. We find the right people searching for lawyers."</p>
          </div>
        </div>
      </section>

      {/* 5. 3-STEP PLAN */}
      <section className="py-16 px-6" style={{ background: D }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading font-extrabold text-white text-3xl mb-3">How We Build Your Bing Campaign</h2>
          <p className="text-gray-400 mb-12">We start with what's already working on Google, then optimize for Bing's unique advantages.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: "1", title: "We Audit Your Google Data", desc: "Your top-performing keywords, ad copy, and negative keyword lists become the foundation. Campaigns built from proven Google data reach stable performance faster than starting from scratch." },
              { num: "2", title: "We Build Bing-Specific Campaigns", desc: "Tighter match types (Bing's broad match is more aggressive than Google's), LinkedIn audience layers, Copilot AI integration, and Bing-specific negative keyword lists. Not a copy-paste." },
              { num: "3", title: "You Get More Cases at Lower Cost", desc: "Unified reporting across both platforms. Most clients adding Bing to an existing Google program see 15-25% additional lead volume at a cost per lead 30-45% lower than their Google average." },
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

      {/* 6. INTAKE-FIRST REPORTING */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-3 text-center">We Track Signed Cases, Not Just Clicks</h2>
          <p className="text-gray-500 text-center mb-10 max-w-2xl mx-auto">More clicks does not equal more money. We measure what matters to your bottom line.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-red-200 bg-red-50/50 p-6">
              <div className="text-xs font-bold uppercase tracking-widest text-red-500 mb-4">What most agencies show you</div>
              <div className="space-y-3">
                {["Impressions: 45,000", "Clicks: 312", "Click-Through Rate: 0.7%", "Cost Per Click: $87"].map((line) => (
                  <div key={line} className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="text-red-400">&#x2717;</span> {line}
                  </div>
                ))}
              </div>
              <p className="text-xs text-red-500 mt-4 font-bold">None of this tells you how many cases you signed.</p>
            </div>

            <div className="rounded-xl border-2 p-6" style={{ borderColor: O, background: O + "06" }}>
              <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: O }}>What JurisPage shows you</div>
              <div className="space-y-3">
                {["Qualified Consultations: 18", "Signed Cases: 6", "Cost Per Signed Case: $1,450", "Revenue Generated: $72,000"].map((line) => (
                  <div key={line} className="flex items-center gap-2 text-sm text-gray-700">
                    <span style={{ color: G }}>&#x2713;</span> <strong>{line}</strong>
                  </div>
                ))}
              </div>
              <p className="text-xs mt-4 font-bold" style={{ color: O }}>This is what determines whether your investment is working.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. OWNERSHIP GUARANTEE */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-3 text-center">You Own Your Account. You Own Your Data.</h2>
          <p className="text-gray-500 text-center mb-10">Many agencies "own" the ad accounts, effectively holding your campaign history hostage. Not us.</p>
          <div className="rounded-xl border border-gray-200 overflow-hidden bg-white">
            <div className="grid grid-cols-3 text-xs font-bold uppercase tracking-widest">
              <div className="px-5 py-3 bg-gray-50 text-gray-500">Feature</div>
              <div className="px-5 py-3 text-center text-white" style={{ background: O }}>JurisPage</div>
              <div className="px-5 py-3 bg-gray-100 text-center text-gray-500">Other Agencies</div>
            </div>
            {[
              { feature: "You own the ad account", us: true, them: false },
              { feature: "Flat management fee", us: true, them: false },
              { feature: "Published pricing", us: true, them: false },
              { feature: "No % of ad spend markup", us: true, them: false },
              { feature: "Take your data if you leave", us: true, them: false },
              { feature: "Month-to-month contracts", us: true, them: false },
              { feature: "Bing + Google under one strategy", us: true, them: false },
            ].map((row, i) => (
              <div key={row.feature} className={`grid grid-cols-3 text-sm ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                <div className="px-5 py-3 text-gray-700 font-medium">{row.feature}</div>
                <div className="px-5 py-3 text-center"><span className="text-lg" style={{ color: G }}>&#x2713;</span></div>
                <div className="px-5 py-3 text-center"><span className="text-lg text-red-400">&#x2717;</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. COPILOT */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-4">Bing Isn't Just Search Anymore. It's Copilot.</h2>
          <p className="text-gray-600 text-sm leading-relaxed max-w-2xl mx-auto mb-6">
            Microsoft Copilot is now integrated with Bing Search and Edge. When someone asks Copilot "do I need a lawyer after a car accident in Texas," Microsoft Ads appear alongside the AI response.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed max-w-2xl mx-auto mb-6">
            This is the bridge between traditional paid search and AI search. We configure landing pages for Copilot-stage informational queries, set up separate ad groups for AI-assisted traffic, and track Copilot-attributed conversions separately so you can see exactly what that channel contributes.
          </p>
          <div className="inline-block rounded-xl px-6 py-4" style={{ background: B + "10", border: `1px solid ${B}30` }}>
            <p className="text-sm font-bold" style={{ color: B }}>Bing Places optimization included with every campaign. Your local AI visibility starts on day one.</p>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      {service.relatedCaseStudies && service.relatedCaseStudies.length > 0 && (
        <CaseStudyPreview caseStudies={caseStudies.filter((cs) => service.relatedCaseStudies!.includes(cs.slug))} heading="Results from Law Firms Using Microsoft Advertising" />
      )}

      {/* 9. PRICING */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-3 text-center">Pricing That Makes the Math Easy</h2>
          <p className="text-gray-500 text-center mb-10">Most clients generate 15-25% additional leads at 30-45% lower cost per lead by adding Bing to their existing Google campaigns.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl bg-white border border-gray-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100">
                <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: O }}>Bing Ads Add-On</div>
                <div className="font-heading font-extrabold text-gray-900 text-2xl">Included in Juris Digital</div>
                <div className="text-xs text-gray-500 mt-1">$5,000 to $50,000+/mo (total marketing investment)</div>
              </div>
              <div className="px-6 py-5 space-y-3 text-sm">
                {["Microsoft Ads campaign setup", "LinkedIn audience targeting", "Copilot AI integration", "Cross-platform reporting", "Bing Places optimization (free bonus)", "Typical ad spend: $500-2,000/mo", "No upfront setup fee."].map((f) => (
                  <div key={f} className="flex items-start gap-2"><span style={{ color: G }}>&#x2713;</span> {f}</div>
                ))}
              </div>
              <div className="px-6 pb-6">
                <Link href="/contact/" className="block text-center px-6 py-3 rounded-full text-white font-bold text-sm no-underline" style={{ background: O }}>Get Your Free Bing Opportunity Report</Link>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden" style={{ background: D }}>
              <div className="px-6 py-5 border-b border-gray-700">
                <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: O }}>Already Running Google Ads?</div>
                <div className="font-heading font-extrabold text-white text-xl">Add Bing for Maximum Coverage</div>
                <div className="text-xs text-gray-400 mt-1">We manage both platforms under one strategy</div>
              </div>
              <div className="px-6 py-5 space-y-3 text-sm text-gray-300">
                {["Import your top Google keywords to Bing", "Bing-specific match type and bid adjustments", "LinkedIn audience layers added to all campaigns", "Single unified report across both platforms", "Budget allocation optimized quarterly by ROI", "15-25% more leads from day one"].map((f) => (
                  <div key={f} className="flex items-start gap-2"><span style={{ color: O }}>&#x2713;</span> {f}</div>
                ))}
              </div>
              <div className="px-6 pb-6">
                <Link href="/google-ads-for-law-firms/" className="block text-center px-6 py-3 rounded-full font-bold text-xs no-underline border-2 border-white text-white hover:bg-white hover:text-gray-900 transition-colors">See Google Ads + Bing Together</Link>
              </div>
            </div>
          </div>
          <p className="text-center text-xs text-gray-400 mt-6">
            <Link href="/services/pricing/" className="no-underline hover:underline" style={{ color: O }}>See full pricing breakdown</Link> | You own your account | Cancel anytime
          </p>
        </div>
      </section>

      {/* Related */}
      <section className="py-12 px-6 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Works best with</p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Google Ads for Law Firms", href: "/google-ads-for-law-firms/" },
              { label: "Law Firm SEO", href: "/law-firm-seo/" },
              { label: "Law Firm Websites", href: "/law-firm-websites/" },
              { label: "Local SEO for Law Firms", href: "/local-seo-for-law-firms/" },
            ].map((link) => (
              <Link key={link.label} href={link.href} className="px-4 py-2 rounded-full border text-sm font-medium no-underline transition-all hover:bg-[#EE6C13] hover:text-white hover:border-[#EE6C13]" style={{ borderColor: O, color: O }}>{link.label}</Link>
            ))}
          </div>
        </div>
      </section>

      <FAQAccordion faqs={allFaqs} heading="Bing Ads for Lawyers: Questions Answered" />

      <CTASection
        heading="Not Enough Firms Take Advantage of Bing. Yours Should."
        subtext="We will tell you exactly how many people in your city searched for your practice area on Bing last month. Free. No obligation."
        primaryLabel="Get Your Free Bing Opportunity Report"
        primaryHref="/contact/"
        secondaryLabel="See Transparent Pricing"
        secondaryHref="/services/pricing/"
      />
    </>
  );
}
