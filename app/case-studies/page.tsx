import type { Metadata } from "next";
import { caseStudies } from "@/data/caseStudies";
import CaseStudyCard from "@/components/CaseStudyCard";
import CTASection from "@/components/CTASection";
import SchemaOrg from "@/components/SchemaOrg";

export const metadata: Metadata = {
  title: "Law Firm Marketing Success Stories | Case Studies",
  description: "See how JurisPage helped law firms achieve +1,851% more traffic, +200 monthly leads, and 10x business growth. Real results from real law firm marketing campaigns.",
  alternates: { canonical: "https://jurispage.com/case-studies/" },
};

export default function CaseStudiesPage() {
  const listSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "JurisPage Law Firm Marketing Case Studies",
    itemListElement: caseStudies.map((cs, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: cs.client,
      url: `https://jurispage.com/case-studies/${cs.slug}/`,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://jurispage.com/" },
      { "@type": "ListItem", position: 2, name: "Success Stories", item: "https://jurispage.com/case-studies/" },
    ],
  };

  return (
    <>
      <SchemaOrg schema={[listSchema, breadcrumbSchema]} />

      {/* Hero */}
      <section className="bg-white py-20 px-6 border-b border-gray-100">
        <div className="max-w-3xl mx-auto">
          <nav className="text-sm text-gray-500 mb-6">
            <a href="/" className="hover:text-gray-900 no-underline">Home</a> /{" "}
            <span className="text-gray-700">Success Stories</span>
          </nav>
          <span className="inline-block text-xs font-heading font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{ background: "#EE6C1322", color: "#EE6C13" }}>
            Real Client Results
          </span>
          <h1 className="font-heading font-extrabold text-gray-900 text-4xl md:text-5xl leading-tight mb-4">
            Law Firm Marketing Success Stories
          </h1>
          <p className="text-gray-600 text-xl leading-relaxed">
            We don&apos;t promise clicks. We deliver cases. Here&apos;s what happens when law firms partner with JurisPage for transparent, ethical digital marketing.
          </p>
        </div>
      </section>

      {/* Case Study Grid */}
      <section className="py-16 px-6 bg-[#FEF3EC]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((cs) => (
              <CaseStudyCard key={cs.slug} caseStudy={cs} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="py-12 px-6 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-gray-500 font-medium mb-6 uppercase tracking-widest">Trusted by 113+ law firms across the US</p>
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-400 text-sm font-medium">
            <span>Google Partner</span>
            <span className="text-gray-200">|</span>
            <span>Moz Recommended</span>
            <span className="text-gray-200">|</span>
            <span>Lawyerist Vetted</span>
            <span className="text-gray-200">|</span>
            <span>4.9★ Average Rating</span>
          </div>
        </div>
      </section>

      <CTASection
        heading="Start Getting Better Cases"
        subtext="Stop wasting money on marketing that doesn&apos;t convert. Join 113+ law firms who chose transparency over hype."
        primaryLabel="Start Getting Better Cases"
        primaryHref="/contact/"
        secondaryLabel="See Pricing"
        secondaryHref="/services/pricing/"
      />
    </>
  );
}
