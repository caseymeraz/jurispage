import type { Metadata } from "next";
import Link from "next/link";
import type { PracticeAreaData } from "@/data/practiceAreas";
import { getPracticeAreaBySlug } from "@/data/practiceAreas";
import { getServiceBySlug } from "@/data/services";
import { getIntersectionsForPracticeArea } from "@/data/intersections";
import CTASection from "@/components/CTASection";
import FAQAccordion from "@/components/FAQAccordion";
import SchemaOrg from "@/components/SchemaOrg";
import CaseStudyPreview from "@/components/CaseStudyPreview";
import HeroForm from "@/components/HeroForm";
import PpcRoiCalculator from "@/components/PpcRoiCalculator";
import { caseStudies } from "@/data/caseStudies";

// Cross-practice-area related content map
const RELATED_PRACTICE_AREAS: Record<string, string[]> = {
  "personal-injury-lawyer-marketing": ["criminal-defense-lawyer-marketing", "workers-comp-lawyer-marketing", "medical-malpractice-lawyer-marketing", "mass-tort-law-firm-marketing"],
  "criminal-defense-lawyer-marketing": ["dui-lawyer-marketing", "personal-injury-lawyer-marketing", "immigration-lawyer-marketing"],
  "family-law-firm-marketing": ["divorce-lawyer-marketing", "estate-planning-lawyer-marketing", "immigration-lawyer-marketing"],
  "immigration-lawyer-marketing": ["family-law-firm-marketing", "criminal-defense-lawyer-marketing", "employment-lawyer-marketing"],
  "bankruptcy-lawyer-marketing": ["real-estate-lawyer-marketing", "employment-lawyer-marketing", "small-law-firm-marketing"],
  "estate-planning-lawyer-marketing": ["family-law-firm-marketing", "real-estate-lawyer-marketing", "divorce-lawyer-marketing"],
  "employment-lawyer-marketing": ["workers-comp-lawyer-marketing", "bankruptcy-lawyer-marketing", "immigration-lawyer-marketing"],
  "real-estate-lawyer-marketing": ["estate-planning-lawyer-marketing", "bankruptcy-lawyer-marketing", "small-law-firm-marketing"],
  "solo-attorney-marketing": ["small-law-firm-marketing", "startup-law-firm-marketing"],
  "small-law-firm-marketing": ["solo-attorney-marketing", "startup-law-firm-marketing"],
  "divorce-lawyer-marketing": ["family-law-firm-marketing", "estate-planning-lawyer-marketing", "immigration-lawyer-marketing"],
  "dui-lawyer-marketing": ["criminal-defense-lawyer-marketing", "personal-injury-lawyer-marketing"],
  "workers-comp-lawyer-marketing": ["personal-injury-lawyer-marketing", "employment-lawyer-marketing", "social-security-disability-lawyer-marketing"],
  "social-security-disability-lawyer-marketing": ["workers-comp-lawyer-marketing", "bankruptcy-lawyer-marketing", "employment-lawyer-marketing"],
  "medical-malpractice-lawyer-marketing": ["personal-injury-lawyer-marketing", "mass-tort-law-firm-marketing"],
  "mass-tort-law-firm-marketing": ["personal-injury-lawyer-marketing", "medical-malpractice-lawyer-marketing"],
  "startup-law-firm-marketing": ["solo-attorney-marketing", "small-law-firm-marketing"],
};

interface PracticeAreaPageProps {
  practiceArea: PracticeAreaData;
}

export function generatePracticeAreaMetadata(pa: PracticeAreaData): Metadata {
  return {
    title: pa.title,
    description: pa.description,
    alternates: { canonical: `https://jurispage.com/${pa.slug}/` },
    openGraph: {
      title: pa.title,
      description: pa.description,
      url: `https://jurispage.com/${pa.slug}/`,
    },
  };
}

export default function PracticeAreaPage({ practiceArea: pa }: PracticeAreaPageProps) {
  const allFaqs = [
    ...pa.faqs,
    ...(pa.extendedFaqs ?? []),
  ];

  const displayKw = pa.displayKeyword ?? pa.primaryKeyword;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://jurispage.com/${pa.slug}/`,
    name: pa.heading,
    description: pa.description,
    provider: { "@type": "Organization", name: "JurisPage", url: "https://jurispage.com" },
    url: `https://jurispage.com/${pa.slug}/`,
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
      { "@type": "ListItem", position: 2, name: pa.heading, item: `https://jurispage.com/${pa.slug}/` },
    ],
  };

  const schemas = [serviceSchema, breadcrumbSchema, ...(faqSchema ? [faqSchema] : [])];

  return (
    <>
      <SchemaOrg schema={schemas} />

      {/* Hero */}
      <section className="bg-white py-16 px-6 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="pt-2">
              <nav className="text-sm text-gray-500 mb-5">
                <Link href="/" className="hover:text-gray-900 no-underline">Home</Link> /{" "}
                <span className="text-gray-700">{displayKw}</span>
              </nav>
              <span className="inline-block text-xs font-heading font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{ background: "#EE6C1322", color: "#EE6C13" }}>
                {pa.primaryKeyword}
              </span>
              <h1 className="font-heading font-extrabold text-gray-900 text-4xl md:text-5xl leading-tight mb-6">{pa.heading}</h1>
              <p className="text-gray-500 text-sm">Speak directly with a legal marketing expert today.</p>
            </div>
            <HeroForm
              ctaLabel="Book Your Strategy Session"
              subtext="No contracts. No commitment. We'll respond within one business day."
              defaultPracticeArea={pa.primaryKeyword.split(" ")[0]}
            />
          </div>
        </div>
      </section>

      {/* Stats bar */}
      {pa.stats && pa.stats.length > 0 && (
        <section className="py-10 px-6 bg-[#EE6C13]">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {pa.stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-heading font-extrabold text-white text-3xl md:text-4xl leading-none mb-1">{stat.value}</div>
                  <div className="text-orange-100 text-sm leading-snug">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Intro */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <p className="text-gray-700 text-lg leading-relaxed">{pa.intro}</p>
          {pa.introBullets && pa.introBullets.length > 0 && (
            <ul className="mt-6 space-y-3">
              {pa.introBullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-2 h-2 rounded-full mt-2" style={{ background: "#EE6C13" }} />
                  <span className="text-gray-700 text-base leading-relaxed">{bullet}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Why Different */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-6">
            {pa.sectionHeadings?.whyDifferent ?? `Why ${displayKw} is Different`}
          </h2>
          {pa.whyDifferent.includes("\n") ? (
            pa.whyDifferent.split("\n").filter(Boolean).map((paragraph, i) => (
              <p key={i} className="text-gray-700 text-base leading-relaxed mb-4 last:mb-0">{paragraph}</p>
            ))
          ) : (
            <p className="text-gray-700 text-base leading-relaxed">{pa.whyDifferent}</p>
          )}
        </div>
      </section>

      {/* Mistakes */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-8">
            {pa.sectionHeadings?.mistakes ?? `The 3 Biggest Marketing Mistakes in ${displayKw}`}
          </h2>
          {pa.mistakeCards ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pa.mistakeCards.map((card, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="h-1 bg-red-500" />
                  <div className="p-5">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-red-100 text-red-600 font-bold text-xs mb-3">{i + 1}</span>
                    <h3 className="font-heading font-bold text-gray-900 text-base mb-2">{card.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{card.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {pa.mistakes.map((mistake, i) => (
                <div key={i} className="flex gap-4 bg-red-50 border border-red-100 rounded-xl p-5">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-sm">{i + 1}</span>
                  <p className="text-gray-700 leading-relaxed">{mistake}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-6 bg-[#1a1a1a]">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-extrabold text-white text-3xl mb-8">
            {pa.sectionHeadings?.services ?? `Services That Work for ${displayKw}`}
          </h2>
          <div className="flex flex-wrap gap-3">
            {(pa.relatedServices ?? []).map((slug) => {
              const svc = getServiceBySlug(slug);
              if (!svc) return null;
              return (
                <Link
                  key={slug}
                  href={`/${slug}/`}
                  className="px-4 py-2 rounded-full text-sm font-semibold text-white no-underline transition-opacity hover:opacity-80"
                  style={{ background: "#EE6C13" }}
                >
                  {svc.primaryKeyword}
                </Link>
              );
            })}
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { color: "#EE6C13", title: "Month-to-Month", body: "No long-term contracts. Cancel anytime with 30 days notice." },
              { color: "#982A0B", title: "Published Pricing", body: "See exactly what you pay. No sales calls required." },
              { color: "#EE6C13", title: "90-Day Guarantee", body: "Results within 90 days or we work for free the next month." },
            ].map((item) => (
              <div key={item.title} className="bg-gray-800 rounded-xl p-5">
                <div className="w-6 h-1 rounded mb-3" style={{ background: item.color }}></div>
                <h3 className="font-heading font-bold text-white text-sm mb-1">{item.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Market This Practice Area */}
      {pa.process && pa.process.length > 0 && (
        <section className="py-16 px-6 bg-[#1a1a1a]">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading font-extrabold text-white text-3xl mb-10">
              {pa.sectionHeadings?.process ?? `How We Market ${pa.primaryKeyword.split(" ").slice(0, 2).join(" ")} Firms`}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pa.process.map((item, index) => (
                <div key={item.step} className="bg-gray-800 rounded-xl p-6">
                  <span
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full font-heading font-extrabold text-white text-sm mb-4"
                    style={{ background: "#EE6C13" }}
                  >
                    {index + 1}
                  </span>
                  <h3 className="font-heading font-bold text-white text-lg mb-2">{item.step}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ROI Calculator */}
      {pa.showCalculator && (
        <section className="py-16 px-6 bg-[#111]">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading font-extrabold text-white text-3xl mb-2 text-center">
              See What Your PI Marketing Budget Could Generate
            </h2>
            <p className="text-gray-400 text-center mb-8">Adjust the inputs below to estimate your return on ad spend.</p>
            <PpcRoiCalculator />
          </div>
        </section>
      )}

      {pa.relatedCaseStudies && pa.relatedCaseStudies.length > 0 && (
        <CaseStudyPreview
          caseStudies={caseStudies.filter((cs) => pa.relatedCaseStudies!.includes(cs.slug))}
          heading="Real Results from Law Firms Like Yours"
        />
      )}

      {pa.relatedServices && pa.relatedServices.length > 0 && (
        <section className="py-16 px-6 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading font-extrabold text-gray-900 text-2xl mb-6">
              Services We Use to Grow {displayKw.split(" ").slice(0, 2).join(" ")} Practices
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {pa.relatedServices.map((slug) => {
                const svc = getServiceBySlug(slug);
                if (!svc) return null;
                return (
                  <Link key={slug} href={`/${slug}/`} className="block p-4 rounded-xl border border-gray-200 hover:border-orange-300 hover:shadow-sm transition-all no-underline">
                    <div className="font-heading font-bold text-gray-900 text-sm mb-1">{svc.heading}</div>
                    <div className="text-xs font-semibold" style={{ color: "#EE6C13" }}>Learn more →</div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Cross-practice-area internal links */}
      {RELATED_PRACTICE_AREAS[pa.slug] && (
        <section className="py-12 px-6 bg-gray-50 border-t border-gray-100">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
              Attorneys also research
            </p>
            <div className="flex flex-wrap gap-3">
              {RELATED_PRACTICE_AREAS[pa.slug].map((slug) => {
                const related = getPracticeAreaBySlug(slug);
                if (!related) return null;
                return (
                  <Link
                    key={slug}
                    href={`/${slug}/`}
                    className="text-sm font-medium no-underline px-4 py-2 rounded-[40px] border-2 transition-all hover:bg-[#EE6C13] hover:text-white hover:border-[#EE6C13]"
                    style={{ borderColor: "#EE6C13", color: "#EE6C13" }}
                  >
                    {related.primaryKeyword}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Specialized Service Guides for this practice area */}
      {(() => {
        const guides = getIntersectionsForPracticeArea(pa.slug);
        if (guides.length === 0) return null;
        return (
          <section className="py-16 px-6 bg-white border-t border-gray-100">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-heading font-extrabold text-gray-900 text-2xl mb-2">
                Specialized Marketing Guides for {pa.heading.replace(" Marketing", " Attorneys")}
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                In-depth strategies combining {pa.primaryKeyword} with specific marketing services.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {guides.map((guide) => {
                  const svc = getServiceBySlug(guide.serviceSlug);
                  return (
                    <Link
                      key={guide.serviceSlug}
                      href={`/${guide.practiceAreaSlug}/${guide.serviceSlug}/`}
                      className="group flex flex-col gap-1 rounded-xl border border-gray-200 bg-gray-50 p-5 no-underline hover:border-[#EE6C13] hover:bg-[#EE6C1308] transition-colors"
                    >
                      <span className="font-heading font-bold text-gray-900 text-base group-hover:text-[#EE6C13] transition-colors">
                        {guide.heading}
                      </span>
                      {svc && (
                        <span className="text-gray-500 text-sm">{svc.tagline}</span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })()}

      {allFaqs.length > 0 && <FAQAccordion faqs={allFaqs} heading="Frequently Asked Questions" />}

      <CTASection
        heading="Book Your Strategy Session"
        subtext={`No long-term contracts. Transparent pricing. We've helped 113+ law firms grow - including ${displayKw.toLowerCase()} practices.`}
        primaryLabel="Book Your Strategy Session"
        primaryHref="/contact/"
        secondaryLabel="See Pricing"
        secondaryHref="/services/pricing/"
      />
    </>
  );
}
