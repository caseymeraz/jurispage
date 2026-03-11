import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import type { ServiceData } from "@/data/services";
import { getServiceBySlug } from "@/data/services";
import { getPracticeAreaBySlug } from "@/data/practiceAreas";
import { getIntersectionsForService } from "@/data/intersections";
import CTASection from "@/components/CTASection";
import PortfolioShowcase from "@/components/PortfolioShowcase";
import FAQAccordion from "@/components/FAQAccordion";
import SchemaOrg from "@/components/SchemaOrg";
import CaseStudyPreview from "@/components/CaseStudyPreview";
import HeroForm from "@/components/HeroForm";
import AiSearchReportForm from "@/components/AiSearchReportForm";
import { caseStudies } from "@/data/caseStudies";

interface ServicePageProps {
  service: ServiceData;
}

export function generateServiceMetadata(service: ServiceData): Metadata {
  return {
    title: service.title,
    description: service.description,
    alternates: { canonical: `https://jurispage.com/${service.slug}/` },
    openGraph: {
      title: service.title,
      description: service.description,
      url: `https://jurispage.com/${service.slug}/`,
    },
  };
}

export default function ServicePage({ service }: ServicePageProps) {
  const allFaqs = [
    ...service.faqs,
    ...(service.extendedFaqs ?? []),
  ];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://jurispage.com/${service.slug}/`,
    name: service.heading,
    description: service.description,
    provider: { "@type": "Organization", name: "JurisPage", url: "https://jurispage.com" },
    url: `https://jurispage.com/${service.slug}/`,
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
      { "@type": "ListItem", position: 3, name: service.heading, item: `https://jurispage.com/${service.slug}/` },
    ],
  };

  const howToSchema = service.process && service.process.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `How ${service.primaryKeyword} works at JurisPage`,
    "description": service.intro,
    "step": service.process.map((item, i) => ({
      "@type": "HowToStep",
      "position": i + 1,
      "name": item.step,
      "text": item.detail,
    })),
  } : null;

  const schemas = [serviceSchema, breadcrumbSchema, ...(faqSchema ? [faqSchema] : []), ...(howToSchema ? [howToSchema] : [])];

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
                <Link href="/law-firm-seo/" className="hover:text-gray-900 no-underline">Services</Link> /{" "}
                <span className="text-gray-700">{service.heading}</span>
              </nav>
              <span className="inline-block text-xs font-heading font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{ background: "#EE6C1322", color: "#EE6C13" }}>
                {service.primaryKeyword}
              </span>
              <h1 className="font-heading font-extrabold text-gray-900 text-4xl md:text-5xl leading-tight mb-4">{service.heading}</h1>
              <p className="text-gray-600 text-xl leading-relaxed mb-6">{service.tagline}</p>
              <p className="text-sm text-gray-500">Your competitors are stealing your cases online. We fix that.</p>
            </div>
            {service.slug === "law-firm-seo" ? (
              <div className="bg-gray-50 rounded-2xl p-6">
                <Suspense fallback={<div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 text-center text-gray-500">Loading form...</div>}>
                  <AiSearchReportForm />
                </Suspense>
              </div>
            ) : (
              <HeroForm
                ctaLabel="Outrank Your Competitors"
                subtext="No contracts. No commitment. We'll respond within one business day."
                defaultPracticeArea=""
              />
            )}
          </div>
        </div>
      </section>

      {/* Stats bar */}
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

      {/* Intro */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <p className="text-gray-700 text-lg leading-relaxed">{service.intro}</p>
        </div>
      </section>

      {/* Why This Service Matters */}
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

      {/* Portfolio Showcase */}
      {service.portfolio && service.portfolio.length > 0 && (
        <PortfolioShowcase items={service.portfolio} />
      )}

      {/* Features */}
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

      {/* How It Works */}
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
                    className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-heading font-extrabold text-white text-sm"
                    style={{ background: "#EE6C13" }}
                  >
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-heading font-bold text-white text-lg mb-2">{item.step}</h3>
                    <p className="text-gray-400 leading-relaxed">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Why JurisPage */}
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

      {/* Signs Your Firm Needs This */}
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

      {service.relatedServices && service.relatedServices.length > 0 && (
        <section className="py-16 px-6 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading font-extrabold text-gray-900 text-2xl mb-6">
              Related Law Firm Marketing Services
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {service.relatedServices!.map((slug) => {
                const relService = getServiceBySlug(slug);
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

      {service.relatedPracticeAreas && service.relatedPracticeAreas.length > 0 && (
        <section className="py-16 px-6 bg-[#FEF3EC]">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading font-extrabold text-gray-900 text-2xl mb-6">
              {service.primaryKeyword} for These Practice Areas
            </h2>
            <div className="flex flex-wrap gap-3">
              {service.relatedPracticeAreas!.map((slug) => {
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

      {service.relatedCaseStudies && service.relatedCaseStudies.length > 0 && (
        <CaseStudyPreview
          caseStudies={caseStudies.filter((cs) => service.relatedCaseStudies!.includes(cs.slug))}
          heading="Real Results from Law Firms Like Yours"
        />
      )}

      {/* This Service by Practice Area */}
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

      {allFaqs.length > 0 && <FAQAccordion faqs={allFaqs} heading={`${service.primaryKeyword} Questions Answered`} />}

      {service.slug === "law-firm-seo" ? (
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-heading font-extrabold text-3xl text-gray-900 mb-3">
                Is AI Search Recommending Your Law Firm?
              </h2>
              <p className="text-gray-600 text-lg max-w-xl mx-auto">
                Find out instantly — enter your firm details and see which firms AI is citing in your market.
              </p>
            </div>
            <Suspense fallback={<div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 text-center text-gray-500">Loading form...</div>}>
              <AiSearchReportForm />
            </Suspense>
          </div>
        </section>
      ) : (
        <CTASection
          heading="Book Your Strategy Session"
          subtext="No long-term contracts. Transparent pricing. 113+ law firms served."
          primaryLabel="Book Your Strategy Session"
          primaryHref="/contact/"
          secondaryLabel="See Pricing"
          secondaryHref="/services/pricing/"
        />
      )}
    </>
  );
}
