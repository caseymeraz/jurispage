import type { Metadata } from "next";
import Link from "next/link";
import type { PracticeAreaData } from "@/data/practiceAreas";
import CTASection from "@/components/CTASection";
import FAQAccordion from "@/components/FAQAccordion";
import SchemaOrg from "@/components/SchemaOrg";

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

  const faqSchema = pa.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pa.faqs.map((faq) => ({
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
      { "@type": "ListItem", position: 2, name: "Practice Areas", item: "https://jurispage.com/personal-injury-lawyer-marketing/" },
      { "@type": "ListItem", position: 3, name: pa.heading, item: `https://jurispage.com/${pa.slug}/` },
    ],
  };

  const schemas = [serviceSchema, breadcrumbSchema, ...(faqSchema ? [faqSchema] : [])];

  return (
    <>
      <SchemaOrg schema={schemas} />

      {/* Hero */}
      <section className="bg-gray-900 py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <nav className="text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-white no-underline">Home</Link> /{" "}
            <span className="text-gray-300">Practice Areas</span>
          </nav>
          <span className="inline-block text-xs font-heading font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{ background: "#6FFF2C22", color: "#6FFF2C" }}>
            {pa.primaryKeyword}
          </span>
          <h1 className="font-heading font-extrabold text-white text-4xl md:text-5xl leading-tight mb-6">{pa.heading}</h1>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact/" className="inline-block font-heading font-bold text-gray-900 text-sm px-7 py-3.5 rounded-lg no-underline" style={{ background: "linear-gradient(135deg, #6FFF2C, #14EEEE)" }}>
              Get a Free {pa.primaryKeyword.split(" ")[0]} Marketing Plan
            </Link>
            <Link href="/services/pricing/" className="inline-block font-heading font-bold text-white text-sm px-7 py-3.5 rounded-lg border border-gray-600 no-underline hover:border-gray-400 transition-colors">
              See Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <p className="text-gray-700 text-lg leading-relaxed">{pa.intro}</p>
        </div>
      </section>

      {/* Why Different */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-6">Why {pa.primaryKeyword} is Different</h2>
          <p className="text-gray-700 text-base leading-relaxed">{pa.whyDifferent}</p>
        </div>
      </section>

      {/* Mistakes */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-8">The 3 Biggest Marketing Mistakes in {pa.primaryKeyword}</h2>
          <div className="space-y-4">
            {pa.mistakes.map((mistake, i) => (
              <div key={i} className="flex gap-4 bg-red-50 border border-red-100 rounded-xl p-5">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-sm">{i + 1}</span>
                <p className="text-gray-700 leading-relaxed">{mistake}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-6 bg-gray-900">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-extrabold text-white text-3xl mb-8">Services That Work for {pa.primaryKeyword}</h2>
          <div className="flex flex-wrap gap-3">
            {pa.services.map((service) => (
              <span key={service} className="px-4 py-2 rounded-full text-sm font-semibold text-gray-900" style={{ background: "#14EEEE" }}>
                {service}
              </span>
            ))}
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { color: "#14EEEE", title: "Month-to-Month", body: "No long-term contracts. Cancel anytime with 30 days notice." },
              { color: "#6FFF2C", title: "Published Pricing", body: "See exactly what you pay. No sales calls required." },
              { color: "#14EEEE", title: "90-Day Guarantee", body: "Results within 90 days or we work for free the next month." },
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

      {pa.faqs.length > 0 && <FAQAccordion faqs={pa.faqs} heading="Frequently Asked Questions" />}

      <CTASection
        heading={`Get a Free ${pa.primaryKeyword.split(" ")[0]} Marketing Plan`}
        subtext={`No long-term contracts. Transparent pricing. We've helped 113+ law firms grow — including ${pa.primaryKeyword.toLowerCase()} practices.`}
        primaryLabel={`Get My Free ${pa.primaryKeyword.split(" ")[0]} Plan`}
        primaryHref="/contact/"
        secondaryLabel="See Pricing"
        secondaryHref="/services/pricing/"
      />
    </>
  );
}
