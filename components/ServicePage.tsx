import type { Metadata } from "next";
import Link from "next/link";
import type { ServiceData } from "@/data/services";
import CTASection from "@/components/CTASection";
import FAQAccordion from "@/components/FAQAccordion";
import SchemaOrg from "@/components/SchemaOrg";

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

  const faqSchema = service.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
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

  const schemas = [serviceSchema, breadcrumbSchema, ...(faqSchema ? [faqSchema] : [])];

  return (
    <>
      <SchemaOrg schema={schemas} />

      {/* Hero */}
      <section className="bg-[#1a1a1a] py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <nav className="text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-white no-underline">Home</Link> /{" "}
            <Link href="/law-firm-seo/" className="hover:text-white no-underline">Services</Link> /{" "}
            <span className="text-gray-300">{service.heading}</span>
          </nav>
          <span className="inline-block text-xs font-heading font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{ background: "#EE6C1322", color: "#EE6C13" }}>
            {service.primaryKeyword}
          </span>
          <h1 className="font-heading font-extrabold text-white text-4xl md:text-5xl leading-tight mb-4">{service.heading}</h1>
          <p className="text-gray-300 text-xl leading-relaxed mb-8">{service.tagline}</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact/" className="inline-block font-heading font-bold text-white text-sm px-7 py-3.5 rounded-[40px] no-underline transition-colors hover:opacity-90" style={{ background: "#EE6C13" }}>
              Get a Free Marketing Plan
            </Link>
            <Link href="/services/pricing/" className="inline-block font-heading font-bold text-white text-sm px-7 py-3.5 rounded-[40px] border border-gray-600 no-underline hover:border-gray-400 transition-colors">
              See Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <p className="text-gray-700 text-lg leading-relaxed">{service.intro}</p>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6 bg-[#FEF3EC]">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-8">What&apos;s Included</h2>
          <ul className="space-y-4">
            {service.features.map((feature) => (
              <li key={feature} className="flex gap-3 items-start bg-white p-5 rounded-xl border border-orange-100 shadow-sm">
                <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 text-white" style={{ background: "#EE6C13" }}>✓</span>
                <span className="text-gray-700 leading-relaxed">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why JurisPage */}
      <section className="py-16 px-6 bg-[#1a1a1a]">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-extrabold text-white text-3xl mb-8">Why JurisPage for {service.primaryKeyword}?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { color: "#EE6C13", title: "100% Legal Focus", body: "We work exclusively with law firms. Every tactic is built for the legal market specifically." },
              { color: "#982A0B", title: "Transparent Pricing", body: "Our pricing is on the website. No discovery calls required to learn what anything costs." },
              { color: "#EE6C13", title: "Month-to-Month", body: "No long-term contracts. We earn your business every single month." },
            ].map((item) => (
              <div key={item.title} className="bg-gray-800 rounded-xl p-6">
                <div className="w-8 h-1 rounded mb-4" style={{ background: item.color }}></div>
                <h3 className="font-heading font-bold text-white text-base mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {service.faqs.length > 0 && <FAQAccordion faqs={service.faqs} heading={`${service.primaryKeyword} Questions Answered`} />}

      <CTASection
        heading={`Ready to Get Started with ${service.primaryKeyword}?`}
        subtext="No long-term contracts. Transparent pricing. 113+ law firms served."
        primaryLabel="Get a Free Marketing Plan"
        primaryHref="/contact/"
        secondaryLabel="See Pricing"
        secondaryHref="/services/pricing/"
      />
    </>
  );
}
