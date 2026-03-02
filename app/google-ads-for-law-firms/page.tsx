import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getServiceBySlug } from "@/data/services";
import { caseStudies } from "@/data/caseStudies";
import HeroForm from "@/components/HeroForm";
import FAQAccordion from "@/components/FAQAccordion";
import CTASection from "@/components/CTASection";
import SchemaOrg from "@/components/SchemaOrg";
import CaseStudyPreview from "@/components/CaseStudyPreview";
import PpcRoiCalculator from "@/components/PpcRoiCalculator";

const service = getServiceBySlug("google-ads-for-law-firms")!;

export function generateMetadata(): Metadata {
  return {
    title: service.title,
    description: service.description,
    alternates: { canonical: "https://jurispage.com/google-ads-for-law-firms/" },
    openGraph: {
      title: service.title,
      description: service.description,
      url: "https://jurispage.com/google-ads-for-law-firms/",
    },
  };
}

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://jurispage.com/google-ads-for-law-firms/",
  name: service.heading,
  description: service.description,
  provider: { "@type": "Organization", name: "JurisPage", url: "https://jurispage.com" },
  url: "https://jurispage.com/google-ads-for-law-firms/",
  areaServed: { "@type": "Country", name: "United States" },
};

const filteredFaqs = [
  ...(service.faqs ?? []).filter((f) => !f.question.toLowerCase().includes("how much does")),
  ...(service.extendedFaqs ?? []),
  {
    question: "How do I get pricing for Google Ads management?",
    answer: "Call us at (888) 767-7447 or fill out the form above. We'll review your account, goals, and market before giving you a number that makes sense for your firm.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: filteredFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

const relatedCaseStudies = caseStudies.filter((cs) =>
  ["immigration-desk", "the-sands-law-group"].includes(cs.slug)
);

const adTypeCards = [
  {
    badge: "Local Services Ads",
    image: "/images/local-services-ads.png",
    title: "Local Services Ads (LSAs)",
    body: "Google's pay-per-lead format. Show up above all paid and organic results with the Google Screened badge. Only available for select practice areas, but when you qualify, these deliver some of the most cost-efficient leads in legal PPC.",
  },
  {
    badge: "Google Local Pack",
    image: "/images/local-pack-with-ads.png",
    title: "Google Local Pack (Maps + Ads)",
    body: "Captures high-intent \"near me\" searches. Combines your Google Business Profile with a paid boost to dominate the map pack. Attorneys who appear here see the highest call-to-click conversion rates of any placement.",
  },
  {
    badge: "Search Text Ads",
    image: "/images/mid-page-organic-search.png",
    title: "Search Text Ads",
    body: "Traditional keyword-triggered ads. Still the most flexible format for targeting specific case types across any geography. Full control over keywords, copy, landing pages, and bids — and the foundation of every legal PPC strategy we build.",
  },
];

export default function GoogleAdsForLawFirmsPage() {
  return (
    <>
      <SchemaOrg schema={[serviceSchema, faqSchema]} />

      {/* ── 1. Hero ── */}
      <section id="contact" className="bg-white py-16 px-6 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="pt-2">
              <nav className="text-sm text-gray-500 mb-5">
                <Link href="/" className="hover:text-gray-900 no-underline">Home</Link> /{" "}
                <span className="text-gray-700">Google Ads for Law Firms</span>
              </nav>
              <span
                className="inline-block text-xs font-heading font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
                style={{ background: "#EE6C1322", color: "#EE6C13" }}
              >
                Google Ads for Lawyers
              </span>
              <h1 className="font-heading font-extrabold text-gray-900 text-4xl md:text-5xl leading-tight mb-4">
                Google Ads for Law Firms That Actually Convert
              </h1>
              <p className="text-gray-600 text-xl leading-relaxed mb-6">Pay for clients, not just clicks.</p>
              <p className="text-sm text-gray-500">Your competitors are stealing your cases online. We fix that.</p>
            </div>
            <HeroForm
              ctaLabel="Get a Free Account Audit"
              subtext="No contracts. No commitment. We'll respond within one business day."
              defaultPracticeArea=""
            />
          </div>
        </div>
      </section>

      {/* ── 2. Stats Bar ── */}
      <section className="py-10 px-6 bg-[#EE6C13]">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {(service.stats ?? []).map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-heading font-extrabold text-white text-3xl md:text-4xl leading-none mb-1">
                  {stat.value}
                </div>
                <div className="text-orange-100 text-sm leading-snug">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Jump Links Nav ── */}
      <nav className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-3 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {[
              { href: "#ad-types",     label: "Ad Types" },
              { href: "#attribution",  label: "Attribution" },
              { href: "#advanced-ads", label: "Advanced Ads" },
              { href: "#calculator",   label: "ROI Calculator" },
              { href: "#testimonials", label: "Testimonials" },
              { href: "#faq",          label: "FAQ" },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="flex-shrink-0 text-xs font-heading font-bold px-4 py-2 rounded-[40px] no-underline transition-colors hover:text-white"
                style={{ background: "#EE6C1318", color: "#EE6C13" }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ── 4. Ad Types ── */}
      <section id="ad-types" className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl md:text-4xl mb-3">
            Where Your Ads Can Appear on Google
          </h2>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            Most law firms only run basic text ads. We manage all four ad placements — and know when each one is right for your practice.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {adTypeCards.map((card) => (
              <div key={card.badge} className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="px-5 pt-5 pb-2">
                  <span
                    className="inline-block text-xs font-heading font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3"
                    style={{ background: "#EE6C1318", color: "#EE6C13" }}
                  >
                    {card.badge}
                  </span>
                </div>
                <div className="relative w-full" style={{ aspectRatio: "900 / 500" }}>
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-top"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-heading font-bold text-gray-900 text-base mb-2">{card.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{card.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Attribution Highlight ── */}
      <section id="attribution" className="py-16 px-6 bg-[#1a1a1a]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading font-extrabold text-white text-3xl md:text-4xl mb-3">
            We Track Every Dollar from Click to Signed Case
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            Most agencies report clicks and impressions. We report signed cases.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              {
                icon: "📞",
                title: "CallRail Call Tracking",
                body: "Every inbound call from your ads is tracked, recorded, and tied back to the exact keyword and campaign that generated it. You see which ads produce real consultations.",
              },
              {
                icon: "🛡",
                title: "Click Fraud Protection",
                body: "Legal PPC attracts bot traffic and competitor clicks. We run active click fraud protection software to block invalid clicks before they drain your budget.",
              },
              {
                icon: "📊",
                title: "End-to-End Attribution",
                body: "By combining CallRail data with Google Ads conversion data, we can show you cost per lead, cost per consultation, and — with your intake data — cost per signed case.",
              },
            ].map(({ icon, title, body }) => (
              <div key={title} className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="text-3xl mb-4">{icon}</div>
                <h3 className="font-heading font-bold text-white text-base mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a
              href="#contact"
              className="inline-block font-heading font-bold text-sm px-8 py-4 rounded-[40px] text-white no-underline transition-opacity hover:opacity-90"
              style={{ background: "#EE6C13" }}
            >
              Get Your Free Account Audit
            </a>
          </div>
        </div>
      </section>

      {/* ── 6. What's Included ── */}
      <section className="py-16 px-6 bg-[#FEF3EC]">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-8">What&apos;s Included</h2>
          <ul className="space-y-4">
            {service.features.map((feature) => (
              <li key={feature} className="flex gap-3 items-start bg-white p-5 rounded-xl border border-orange-100 shadow-sm">
                <span
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 text-white"
                  style={{ background: "#EE6C13" }}
                >
                  &#10003;
                </span>
                <span className="text-gray-700 leading-relaxed">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 7. How It Works ── */}
      {service.process && service.process.length > 0 && (
        <section className="py-16 px-6 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-10">
              How Google Ads for Law Firms Works at JurisPage
            </h2>
            <ol className="space-y-8">
              {service.process.map((item, index) => (
                <li key={item.step} className="flex gap-5 items-start">
                  <span
                    className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-heading font-extrabold text-white text-sm"
                    style={{ background: "#EE6C13" }}
                  >
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-heading font-bold text-gray-900 text-lg mb-2">{item.step}</h3>
                    <p className="text-gray-500 leading-relaxed">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* ── 8. Advanced Ad Types ── */}
      <section id="advanced-ads" className="py-16 px-6 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl md:text-4xl mb-3">
            Beyond Basic Search: Advanced Ad Types for Law Firms
          </h2>
          <p className="text-gray-600 text-lg mb-12 max-w-2xl">
            Most agencies stop at search text ads. Here are the additional placements we manage for firms that want to dominate their market.
          </p>

          {/* LSAs */}
          <div id="lsa" className="mb-12 scroll-mt-20">
            <div className="flex items-center gap-3 mb-4">
              <span
                className="inline-block text-xs font-heading font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                style={{ background: "#EE6C1318", color: "#EE6C13" }}
              >
                Local Services Ads
              </span>
            </div>
            <h3 className="font-heading font-bold text-gray-900 text-2xl mb-3">
              Local Services Ads (LSAs)
            </h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              LSAs appear above everything else on the search results page — above traditional ads, above the map pack, above organic results. They display the Google Screened badge and charge per lead rather than per click, making them one of the most cost-efficient formats available for qualifying practice areas.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Setup requires Google background checks and license verification for each attorney. We handle the setup process and ongoing dispute management to ensure you only pay for qualified leads.
            </p>
            <div className="overflow-x-auto rounded-xl border border-gray-100">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left px-5 py-3 font-heading font-semibold text-gray-700">Feature</th>
                    <th className="text-left px-5 py-3 font-heading font-semibold" style={{ color: "#EE6C13" }}>Local Services Ads</th>
                    <th className="text-left px-5 py-3 font-heading font-semibold text-gray-700">Google Search Ads</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["Billing model", "Pay per lead", "Pay per click"],
                    ["Google Screened badge", "Yes", "No"],
                    ["Custom ad copy", "Limited", "Full control"],
                    ["Landing page", "Not required", "Required"],
                    ["Geographic targeting", "Limited", "Full control"],
                  ].map(([feature, lsa, gsa]) => (
                    <tr key={feature} className="bg-white">
                      <td className="px-5 py-3 text-gray-600">{feature}</td>
                      <td className="px-5 py-3 font-medium text-gray-900">{lsa}</td>
                      <td className="px-5 py-3 text-gray-600">{gsa}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Retargeting */}
          <div id="retargeting" className="mb-12 scroll-mt-20">
            <div className="flex items-center gap-3 mb-4">
              <span
                className="inline-block text-xs font-heading font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                style={{ background: "#EE6C1318", color: "#EE6C13" }}
              >
                Retargeting
              </span>
            </div>
            <h3 className="font-heading font-bold text-gray-900 text-2xl mb-3">
              Retargeting &amp; Display
            </h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              97% of visitors who land on your site leave without contacting you. Retargeting puts your firm back in front of those prospects as they browse other websites, keeping you top-of-mind while they continue their research.
            </p>
            <p className="text-gray-600 leading-relaxed">
              This works especially well for practice areas with longer decision cycles — personal injury (waiting on a police report), family law (considering options before filing), and mass tort (still deciding whether to pursue a claim). The cost per impression is a fraction of search clicks, making retargeting one of the highest-ROI additions to an existing search campaign.
            </p>
          </div>

          {/* YouTube */}
          <div id="video" className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-4">
              <span
                className="inline-block text-xs font-heading font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                style={{ background: "#EE6C1318", color: "#EE6C13" }}
              >
                YouTube &amp; Video
              </span>
            </div>
            <h3 className="font-heading font-bold text-gray-900 text-2xl mb-3">
              YouTube &amp; Video Ads
            </h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Video ads build brand awareness before someone needs a lawyer — so when they do need one, your name comes to mind first. Skippable in-stream ads on YouTube let you target by demographics, search intent, and even competitor searches.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Best ROI for practice areas where brand trust matters most: personal injury (clients are choosing someone to trust with their recovery), criminal defense (clients want a recognizable name in a scary situation), and DUI defense (urgent and emotional decisions). Video production coordination available through our network.
            </p>
          </div>
        </div>
      </section>

      {/* ── 9. ROI Calculator ── */}
      <section id="calculator" className="py-16 px-6 bg-[#1a1a1a] scroll-mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading font-extrabold text-white text-3xl md:text-4xl mb-3">
            Estimate Your Return on Ad Spend
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            Based on industry benchmarks across 113+ law firm campaigns.
          </p>
          <PpcRoiCalculator />
          <p className="text-gray-500 text-xs mt-6">
            Estimates based on industry averages. Actual results depend on market, landing pages, and intake process.
          </p>
        </div>
      </section>

      {/* ── 10. Testimonials ── */}
      <section id="testimonials" className="py-16 px-6 bg-[#FEF3EC] scroll-mt-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-8 text-center">
            What Attorneys Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Anu Gupta */}
            <div className="bg-white rounded-2xl p-6 border border-orange-100 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                  <Image
                    src="/images/case-study-anu-gupta.jpg"
                    alt="Anu Gupta, Immigration Desk"
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <p className="font-heading font-bold text-gray-900 text-sm">Anu Gupta</p>
                  <p className="text-gray-500 text-xs">Attorney, Immigration Desk</p>
                  <p className="text-xs font-medium mt-0.5" style={{ color: "#EE6C13" }}>Immigration Law</p>
                </div>
              </div>
              <blockquote className="text-gray-700 text-base italic leading-relaxed">
                &ldquo;I&apos;m Closing More Clients Than Ever&rdquo;
              </blockquote>
              <p className="text-gray-500 text-sm mt-3 leading-relaxed">
                Immigration Desk went from inconsistent digital leads to over 100 monthly sales-qualified leads through Google Ads — people with real immigration needs who are ready to hire.
              </p>
            </div>

            {/* Jarret Janis */}
            <div className="bg-white rounded-2xl p-6 border border-orange-100 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 bg-[#1a1a1a]"
                >
                  <Image
                    src="/images/client-sands-law-logo.svg"
                    alt="The Sands Law Group"
                    width={48}
                    height={32}
                    className="h-8 w-auto object-contain"
                  />
                </div>
                <div>
                  <p className="font-heading font-bold text-gray-900 text-sm">Jarret Janis</p>
                  <p className="text-gray-500 text-xs">Attorney, The Sands Law Group</p>
                  <p className="text-xs font-medium mt-0.5" style={{ color: "#EE6C13" }}>Family Law · Los Angeles</p>
                </div>
              </div>
              <blockquote className="text-gray-700 text-base italic leading-relaxed">
                &ldquo;A Vital Part of Our Firm&apos;s Growth&rdquo;
              </blockquote>
              <p className="text-gray-500 text-sm mt-3 leading-relaxed">
                The Sands Law Group now generates 200+ monthly sales-qualified leads from Google Ads with a 60% improvement in ROI — on top of doubling organic traffic.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 11. Signs Your Firm Needs This ── */}
      {service.signs && service.signs.length > 0 && (
        <section className="py-16 px-6 bg-[#FEF3EC]">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-8">
              Signs Your Firm&apos;s Google Ads Aren&apos;t Working
            </h2>
            <ul className="space-y-4">
              {service.signs.map((sign) => (
                <li key={sign} className="flex gap-3 items-start bg-white p-5 rounded-xl border border-orange-100 shadow-sm">
                  <span
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 text-white"
                    style={{ background: "#982A0B" }}
                  >
                    !
                  </span>
                  <span className="text-gray-700 leading-relaxed">{sign}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── 12. Case Studies ── */}
      <CaseStudyPreview
        caseStudies={relatedCaseStudies}
        heading="Real Results from Law Firms Like Yours"
      />

      {/* ── 13. FAQ ── */}
      <div id="faq" className="scroll-mt-16">
        <FAQAccordion faqs={filteredFaqs} heading="Google Ads for Lawyers — Questions Answered" />
      </div>

      {/* ── 14. CTA ── */}
      <CTASection
        heading="Ready to Stop Wasting Ad Spend?"
        subtext="No long-term contracts. Transparent management. Results tracked to signed cases."
        primaryLabel="Get a Free Account Audit"
        primaryHref="/contact/"
        secondaryLabel="See Our Results"
        secondaryHref="/case-studies/"
      />
    </>
  );
}
