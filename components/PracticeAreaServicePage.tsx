import type { Metadata } from "next";
import Link from "next/link";
import type { IntersectionData } from "@/data/intersections";
import type { PracticeAreaData } from "@/data/practiceAreas";
import type { ServiceData } from "@/data/services";
import { getServiceBySlug } from "@/data/services";
import { getIntersectionsForPracticeArea, getIntersectionsForService } from "@/data/intersections";
import CTASection from "@/components/CTASection";
import FAQAccordion from "@/components/FAQAccordion";
import SchemaOrg from "@/components/SchemaOrg";
import HeroForm from "@/components/HeroForm";

interface PracticeAreaServicePageProps {
  intersection: IntersectionData;
  practiceArea: PracticeAreaData;
  service: ServiceData;
}

export function generateIntersectionMetadata(
  intersection: IntersectionData
): Metadata {
  return {
    title: intersection.metaTitle,
    description: intersection.metaDescription,
    alternates: {
      canonical: `https://jurispage.com/${intersection.practiceAreaSlug}/${intersection.serviceSlug}/`,
    },
    openGraph: {
      title: intersection.metaTitle,
      description: intersection.metaDescription,
      url: `https://jurispage.com/${intersection.practiceAreaSlug}/${intersection.serviceSlug}/`,
    },
  };
}

export default function PracticeAreaServicePage({
  intersection,
  practiceArea: pa,
  service,
}: PracticeAreaServicePageProps) {
  const pageUrl = `https://jurispage.com/${intersection.practiceAreaSlug}/${intersection.serviceSlug}/`;

  // Schema markup
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": pageUrl,
    name: intersection.heading,
    description: intersection.metaDescription,
    provider: {
      "@type": "Organization",
      name: "JurisPage",
      url: "https://jurispage.com",
    },
    url: pageUrl,
    areaServed: { "@type": "Country", name: "United States" },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: intersection.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://jurispage.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: pa.heading,
        item: `https://jurispage.com/${pa.slug}/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: intersection.heading,
        item: pageUrl,
      },
    ],
  };

  // Related intersections for this practice area (sibling pages)
  const siblingServices = getIntersectionsForPracticeArea(
    intersection.practiceAreaSlug
  ).filter((i) => i.serviceSlug !== intersection.serviceSlug);

  // Related intersections for this service (other practice areas)
  const siblingPracticeAreas = getIntersectionsForService(
    intersection.serviceSlug
  ).filter((i) => i.practiceAreaSlug !== intersection.practiceAreaSlug);

  // Stats from the parent service or practice area, whichever has them
  const stats = service.stats ?? pa.stats ?? [];

  return (
    <>
      <SchemaOrg schema={[serviceSchema, faqSchema, breadcrumbSchema]} />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-white py-16 px-6 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="pt-2">
              {/* Breadcrumb */}
              <nav className="text-sm text-gray-500 mb-5">
                <Link href="/" className="hover:text-gray-900 no-underline">
                  Home
                </Link>{" "}
                /{" "}
                <Link
                  href={`/${pa.slug}/`}
                  className="hover:text-gray-900 no-underline"
                >
                  {pa.heading}
                </Link>{" "}
                /{" "}
                <span className="text-gray-700">{service.heading}</span>
              </nav>

              {/* Label pill */}
              <span
                className="inline-block text-xs font-heading font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
                style={{ background: "#EE6C1322", color: "#EE6C13" }}
              >
                {pa.primaryKeyword} · {service.tagline}
              </span>

              <h1 className="font-heading font-extrabold text-gray-900 text-4xl md:text-5xl leading-tight mb-5">
                {intersection.heading}
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {intersection.metaDescription}
              </p>
              <p className="text-gray-500 text-sm">
                Speak directly with a legal marketing expert today.
              </p>
            </div>

            <HeroForm
              ctaLabel="Book Your Strategy Session"
              subtext="No contracts. No commitment. We'll respond within one business day."
              defaultPracticeArea={pa.primaryKeyword.split(" ")[0]}
            />
          </div>
        </div>
      </section>

      {/* ── Stats bar ────────────────────────────────────────────────────── */}
      {stats.length > 0 && (
        <section className="py-10 px-6 bg-[#EE6C13]">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-heading font-extrabold text-white text-3xl md:text-4xl leading-none mb-1">
                    {stat.value}
                  </div>
                  <div className="text-orange-100 text-sm leading-snug">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Why This Matters ─────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl md:text-4xl mb-6">
            Why {service.heading} Matters for{" "}
            {pa.heading.replace(" Marketing", " Firms")}
          </h2>
          {intersection.whyMatters.split("\n\n").map((para, i) => (
            <p key={i} className="text-gray-600 text-lg leading-relaxed mb-5">
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* ── How Clients Search ───────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-gray-50 border-y border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-4">
            How {pa.heading.replace(" Marketing", " Clients")} Find Attorneys
            Online
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            {pa.intro}
          </p>

          {/* Service intro */}
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <h3 className="font-heading font-bold text-gray-900 text-xl mb-3">
              What {service.heading} Does for Your Firm
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">{service.intro}</p>
            <Link
              href={`/${service.slug}/`}
              className="text-sm font-semibold no-underline hover:underline"
              style={{ color: "#EE6C13" }}
            >
              View our full {service.heading} overview →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Tactics ──────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl md:text-4xl mb-3">
            Our Approach to {service.heading} for{" "}
            {pa.heading.replace(" Marketing", " Attorneys")}
          </h2>
          <p className="text-gray-500 text-lg mb-10">
            Tactics built specifically for this practice area, not recycled from
            a generic law firm playbook.
          </p>

          <div className="space-y-8">
            {intersection.tactics.map((tactic, i) => (
              <div
                key={i}
                className="flex gap-6 p-6 rounded-xl border border-gray-100 bg-gray-50"
              >
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-heading font-extrabold text-white text-sm"
                  style={{ background: "#EE6C13" }}
                >
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-heading font-bold text-gray-900 text-lg mb-2">
                    {tactic.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{tactic.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process (from service) ───────────────────────────────────────── */}
      {service.process && service.process.length > 0 && (
        <section className="py-20 px-6 bg-[#1a1a1a]">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading font-extrabold text-white text-3xl md:text-4xl mb-10">
              Our {service.heading} Process
            </h2>
            <div className="space-y-6">
              {service.process.map((item, i) => (
                <div key={i} className="flex gap-5">
                  <div
                    className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-heading font-extrabold text-sm mt-0.5"
                    style={{ background: "#EE6C13", color: "#fff" }}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <div className="font-heading font-bold text-white text-base mb-1">
                      {item.step}
                    </div>
                    <div className="text-gray-400 text-sm leading-relaxed">
                      {item.detail}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Common Mistakes ───────────────────────────────────────────────── */}
      {pa.mistakes && pa.mistakes.length > 0 && (
        <section className="py-20 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading font-extrabold text-gray-900 text-3xl md:text-4xl mb-4">
              Common{" "}
              {pa.heading.replace("Marketing", "").replace("Lawyer", "Law Firm").trim()}{" "}
              Marketing Mistakes We Fix
            </h2>
            <p className="text-gray-500 text-lg mb-8">
              Before firms come to JurisPage, these are the mistakes we see
              most often.
            </p>
            <ul className="space-y-4">
              {pa.mistakes.map((mistake, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="text-[#EE6C13] font-bold text-lg mt-0.5 flex-shrink-0">
                    ✕
                  </span>
                  <span className="text-gray-700 leading-relaxed">{mistake}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── Why JurisPage ─────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-gray-50 border-y border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl md:text-4xl mb-6">
            Why {pa.heading.replace("Marketing", "").trim()} Attorneys Choose
            JurisPage
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            {pa.whyDifferent}
          </p>

          {/* Service features */}
          {service.features && service.features.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.features.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-white rounded-lg border border-gray-200 p-4"
                >
                  <span
                    className="font-bold flex-shrink-0 mt-0.5"
                    style={{ color: "#EE6C13" }}
                  >
                    ✓
                  </span>
                  <span className="text-gray-700 text-sm leading-relaxed">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Other Services for This Practice Area ─────────────────────────── */}
      {siblingServices.length > 0 && (
        <section className="py-16 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading font-extrabold text-gray-900 text-2xl mb-2">
              More {pa.heading} Strategies
            </h2>
            <p className="text-gray-500 mb-6">
              Explore the full range of marketing services built for{" "}
              {pa.heading.replace(" Marketing", " firms").toLowerCase()}.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {siblingServices.map((sib) => {
                const svc = getServiceBySlug(sib.serviceSlug);
                return (
                  <Link
                    key={sib.serviceSlug}
                    href={`/${sib.practiceAreaSlug}/${sib.serviceSlug}/`}
                    className="group flex flex-col gap-1 rounded-xl border border-gray-200 bg-gray-50 p-5 no-underline hover:border-[#EE6C13] hover:bg-[#EE6C1308] transition-colors"
                  >
                    <span className="font-heading font-bold text-gray-900 text-base group-hover:text-[#EE6C13] transition-colors">
                      {sib.heading}
                    </span>
                    {svc && (
                      <span className="text-gray-500 text-sm line-clamp-2">
                        {svc.tagline}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Same Service, Other Practice Areas ───────────────────────────── */}
      {siblingPracticeAreas.length > 0 && (
        <section className="py-16 px-6 bg-gray-50 border-t border-gray-100">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading font-extrabold text-gray-900 text-2xl mb-2">
              {service.heading} for Other Practice Areas
            </h2>
            <p className="text-gray-500 mb-6">
              See how JurisPage applies {service.heading.toLowerCase()} across
              different legal practice areas.
            </p>
            <div className="flex flex-wrap gap-3">
              {siblingPracticeAreas.map((sib) => (
                <Link
                  key={sib.practiceAreaSlug}
                  href={`/${sib.practiceAreaSlug}/${sib.serviceSlug}/`}
                  className="px-4 py-2 rounded-full border border-gray-200 bg-white text-gray-700 text-sm font-medium no-underline hover:border-[#EE6C13] hover:text-[#EE6C13] transition-colors"
                >
                  {sib.heading}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <FAQAccordion
        faqs={intersection.faqs}
        heading={`${intersection.heading}: Frequently Asked Questions`}
      />

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <CTASection
        heading={`Ready to Grow Your ${pa.heading.replace(" Marketing", "")} Practice?`}
        subtext={`Get a custom ${service.heading.toLowerCase()} strategy built for your firm. No contracts, no fluff — just results.`}
        primaryLabel="Book a Free Strategy Session"
        primaryHref="/get-started/"
        secondaryLabel={`See All ${pa.heading} Services`}
        secondaryHref={`/${pa.slug}/`}
      />
    </>
  );
}
