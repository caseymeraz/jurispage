import type { Metadata } from "next";
import Link from "next/link";
import { getServiceBySlug } from "@/data/services";
import { getServiceBySlug as getRelService } from "@/data/services";
import { getPracticeAreaBySlug } from "@/data/practiceAreas";
import { getIntersectionsForService } from "@/data/intersections";
import CTASection from "@/components/CTASection";
import ReviewRibbon from "@/components/ReviewRibbon";
import FAQAccordion from "@/components/FAQAccordion";
import SchemaOrg from "@/components/SchemaOrg";
import CaseStudyPreview from "@/components/CaseStudyPreview";
import HeroForm from "@/components/HeroForm";
import StickyCTA from "@/components/StickyCTA";
import { caseStudies } from "@/data/caseStudies";

const service = getServiceBySlug("local-seo-for-law-firms")!;

export const metadata: Metadata = {
  title: service.title,
  description: service.description,
  alternates: { canonical: "https://jurispage.com/local-seo-for-law-firms/" },
  openGraph: {
    title: service.title,
    description: service.description,
    url: "https://jurispage.com/local-seo-for-law-firms/",
  },
};

// Icon SVG paths for each How It Works step
const stepIcons: string[] = [
  // 1 — GBP Audit: Map pin
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" fill="#EE6C13"/></svg>',
  // 2 — Citation Building: Clipboard/list
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" stroke="#EE6C13" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1" stroke="#EE6C13" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="8" y1="11" x2="16" y2="11" stroke="#EE6C13" stroke-width="2" stroke-linecap="round"/><line x1="8" y1="15" x2="14" y2="15" stroke="#EE6C13" stroke-width="2" stroke-linecap="round"/></svg>',
  // 3 — Review Generation: Star
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#EE6C13"/></svg>',
  // 4 — Keyword Research: Magnifying glass
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="7" stroke="#EE6C13" stroke-width="2"/><path d="M21 21l-4.35-4.35" stroke="#EE6C13" stroke-width="2" stroke-linecap="round"/></svg>',
  // 5 — Local Link Building: Chain link
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="#EE6C13" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="#EE6C13" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  // 6 — Rank Tracking: Bar chart
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="12" width="4" height="9" rx="1" fill="#EE6C13"/><rect x="10" y="7" width="4" height="14" rx="1" fill="#EE6C13"/><rect x="17" y="3" width="4" height="18" rx="1" fill="#EE6C13"/></svg>',
];

export default function LocalSeoForLawFirmsPage() {
  const allFaqs = [...service.faqs, ...(service.extendedFaqs ?? [])];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://jurispage.com/local-seo-for-law-firms/",
    name: service.heading,
    description: service.description,
    provider: { "@type": "Organization", name: "JurisPage", url: "https://jurispage.com" },
    url: "https://jurispage.com/local-seo-for-law-firms/",
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
      { "@type": "ListItem", position: 2, name: "Services", item: "https://jurispage.com/law-firm-seo/" },
      { "@type": "ListItem", position: 3, name: service.heading, item: "https://jurispage.com/local-seo-for-law-firms/" },
    ],
  };

  const howToSchema = service.process && service.process.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How ${service.primaryKeyword} works at JurisPage`,
    description: service.intro,
    step: service.process.map((item, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: item.step,
      text: item.detail,
    })),
  } : null;

  const schemas = [
    serviceSchema,
    breadcrumbSchema,
    ...(faqSchema ? [faqSchema] : []),
    ...(howToSchema ? [howToSchema] : []),
  ];

  return (
    <>
      <SchemaOrg schema={schemas} />

      {/* 1. Hero */}
      <section className="bg-white py-16 px-6 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="pt-2">
              <nav className="text-sm text-gray-500 mb-5">
                <Link href="/" className="hover:text-gray-900 no-underline">Home</Link> /{" "}
                <Link href="/law-firm-seo/" className="hover:text-gray-900 no-underline">Services</Link> /{" "}
                <span className="text-gray-700">{service.heading}</span>
              </nav>
              <span className="inline-block text-xs font-heading font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{ background: "#EE6C1322", color: "#EE6C13" }}>
                {service.primaryKeyword}
              </span>
              <h1 className="font-heading font-extrabold text-gray-900 text-4xl md:text-5xl leading-tight mb-4">{service.heading}</h1>
              <p className="text-gray-600 text-xl leading-relaxed mb-5">{service.tagline}</p>
              {/* Trust badge row */}
              <div className="flex flex-wrap gap-4 mb-6">
                {["Month-to-Month", "No Long-Term Contracts", "Transparent Pricing"].map((badge) => (
                  <div key={badge} className="flex items-center gap-1.5">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <circle cx="8" cy="8" r="8" fill="#EE6C13"/>
                      <path d="M5 8l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-sm font-semibold text-gray-700">{badge}</span>
                  </div>
                ))}
              </div>
            </div>
            <HeroForm
              ctaLabel="Get My Free Local SEO Audit"
              subtext="No contracts. No commitment. We'll respond within one business day."
              defaultPracticeArea=""
            />
          </div>
        </div>
      </section>

      {/* 2. Pain-Points Callout */}
      {service.signs && service.signs.length >= 3 && (
        <section className="py-12 px-6 bg-[#FEF3EC]">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-heading font-bold uppercase tracking-widest text-[#982A0B] mb-5">Is this your firm?</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {service.signs.slice(0, 3).map((sign) => (
                <div key={sign} className="bg-white rounded-xl p-5 border border-orange-100 shadow-sm flex gap-3 items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white mt-0.5" style={{ background: "#982A0B" }}>!</span>
                  <span className="text-gray-700 text-sm leading-relaxed">{sign}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. Stats bar */}
      {service.stats && service.stats.length > 0 && (
        <section className="py-10 px-6 bg-[#EE6C13]">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {service.stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-heading font-extrabold text-white text-3xl md:text-4xl leading-none mb-1">{stat.value}</div>
                  <div className="text-orange-100 text-sm leading-snug">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Review Ribbon — moved above intro for social proof above the fold content */}
      <ReviewRibbon />

      {/* 5. Intro */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <p className="text-gray-700 text-lg leading-relaxed">{service.intro}</p>
        </div>
      </section>

      {/* 6. Why It Matters */}
      {service.whyMatters && (
        <section className="py-16 px-6 bg-[#FEF3EC]">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-6">
              Why {service.primaryKeyword} Matters
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">{service.whyMatters}</p>
          </div>
        </section>
      )}

      {/* 7. Features — What's Included */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-8">What&apos;s Included</h2>
          <ul className="space-y-4">
            {service.features.map((feature) => (
              <li key={feature} className="flex gap-3 items-start bg-[#FEF3EC] p-5 rounded-xl border border-orange-100 shadow-sm">
                <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 text-white" style={{ background: "#EE6C13" }}>&#10003;</span>
                <span className="text-gray-700 leading-relaxed">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 8. How It Works — with icon badges */}
      {service.process && service.process.length > 0 && (
        <section className="py-16 px-6 bg-[#1a1a1a]">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading font-extrabold text-white text-3xl mb-10">
              How {service.primaryKeyword} Works at JurisPage
            </h2>
            <ol className="space-y-8">
              {service.process.map((item, index) => (
                <li key={item.step} className="flex gap-5 items-start">
                  <span
                    className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center border"
                    style={{ background: "#EE6C1322", borderColor: "#EE6C13" }}
                    dangerouslySetInnerHTML={{ __html: stepIcons[index] ?? "" }}
                  />
                  <div>
                    <h3 className="font-heading font-bold text-white text-lg mb-2">{index + 1}. {item.step}</h3>
                    <p className="text-gray-400 leading-relaxed">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* 9. Why JurisPage */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-8">Why JurisPage for {service.primaryKeyword}?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { color: "#EE6C13", title: "100% Legal Focus", body: "We work exclusively with law firms. Every tactic is built for the legal market specifically." },
              { color: "#982A0B", title: "Transparent Pricing", body: "Our pricing is on the website. No discovery calls required to learn what anything costs." },
              { color: "#EE6C13", title: "Month-to-Month", body: "No long-term contracts. We earn your business every single month." },
            ].map((item) => (
              <div key={item.title} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <div className="w-8 h-1 rounded mb-4" style={{ background: item.color }}></div>
                <h3 className="font-heading font-bold text-gray-900 text-base mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Signs Your Firm Needs This — full 6-item list */}
      {service.signs && service.signs.length > 0 && (
        <section className="py-16 px-6 bg-[#FEF3EC]">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-8">
              Signs Your Firm Needs {service.primaryKeyword}
            </h2>
            <ul className="space-y-4">
              {service.signs.map((sign) => (
                <li key={sign} className="flex gap-3 items-start bg-white p-5 rounded-xl border border-orange-100 shadow-sm">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 text-white" style={{ background: "#982A0B" }}>!</span>
                  <span className="text-gray-700 leading-relaxed">{sign}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* 11. Related Services */}
      {service.relatedServices && service.relatedServices.length > 0 && (
        <section className="py-16 px-6 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading font-extrabold text-gray-900 text-2xl mb-6">
              Related Law Firm Marketing Services
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {service.relatedServices.map((slug) => {
                const relService = getRelService(slug);
                if (!relService) return null;
                return (
                  <Link
                    key={slug}
                    href={`/${slug}/`}
                    className="block p-4 rounded-xl border border-gray-200 hover:border-orange-300 hover:shadow-sm transition-all no-underline"
                  >
                    <div className="font-heading font-bold text-gray-900 text-sm mb-1">{relService.heading}</div>
                    <div className="text-xs font-semibold" style={{ color: "#EE6C13" }}>Learn more →</div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 12. Related Practice Areas */}
      {service.relatedPracticeAreas && service.relatedPracticeAreas.length > 0 && (
        <section className="py-16 px-6 bg-[#FEF3EC]">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading font-extrabold text-gray-900 text-2xl mb-6">
              {service.primaryKeyword} for These Practice Areas
            </h2>
            <div className="flex flex-wrap gap-3">
              {service.relatedPracticeAreas.map((slug) => {
                const pa = getPracticeAreaBySlug(slug);
                if (!pa) return null;
                return (
                  <Link
                    key={slug}
                    href={`/${slug}/`}
                    className="px-4 py-2 rounded-[40px] border text-sm font-medium no-underline transition-all hover:bg-[#EE6C13] hover:text-white hover:border-[#EE6C13]"
                    style={{ borderColor: "#EE6C13", color: "#EE6C13" }}
                  >
                    {pa.primaryKeyword}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 13. Intersection guides */}
      {(() => {
        const guides = getIntersectionsForService(service.slug);
        if (guides.length === 0) return null;
        return (
          <section className="py-16 px-6 bg-gray-50 border-t border-gray-100">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-heading font-extrabold text-gray-900 text-2xl mb-2">
                {service.heading} by Practice Area
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                Specialized guides combining {service.primaryKeyword.toLowerCase()} with specific legal practice areas.
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
                      {pa && (
                        <span className="text-gray-500 text-sm">{pa.primaryKeyword}</span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })()}

      {/* 14. Case Studies */}
      {service.relatedCaseStudies && service.relatedCaseStudies.length > 0 && (
        <CaseStudyPreview
          caseStudies={caseStudies.filter((cs) => service.relatedCaseStudies!.includes(cs.slug))}
          heading="Real Results from Law Firms Like Yours"
        />
      )}

      {/* 15. FAQ Accordion */}
      {allFaqs.length > 0 && <FAQAccordion faqs={allFaqs} heading={`${service.primaryKeyword} Questions Answered`} />}

      {/* 16. CTA Section */}
      <CTASection
        heading="Ready to Own Your City's Map Pack?"
        subtext="We've helped 113+ law firms dominate local search. Month-to-month. No long-term contracts. Transparent pricing."
        primaryLabel="Get My Free Local SEO Strategy"
        primaryHref="/contact/"
        secondaryLabel="See Pricing"
        secondaryHref="/services/pricing/"
      />

      {/* 17. Sticky CTA */}
      <StickyCTA />
    </>
  );
}
