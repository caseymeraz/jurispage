import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/data/services";
import CTASection from "@/components/CTASection";
import SchemaOrg from "@/components/SchemaOrg";

export const metadata: Metadata = {
  title: "Law Firm Marketing Services | JurisPage",
  description: "SEO, Google Ads, web design, content writing, and more. Explore JurisPage's full suite of digital marketing services built exclusively for law firms.",
  alternates: { canonical: "https://jurispage.com/services/" },
};

export default function ServicesPage() {
  const listSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "JurisPage Law Firm Marketing Services",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.primaryKeyword,
      url: `https://jurispage.com/${s.slug}/`,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://jurispage.com/" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://jurispage.com/services/" },
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
            <span className="text-gray-700">Services</span>
          </nav>
          <span className="inline-block text-xs font-heading font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{ background: "#EE6C1322", color: "#EE6C13" }}>
            What We Do
          </span>
          <h1 className="font-heading font-extrabold text-gray-900 text-4xl md:text-5xl leading-tight mb-4">
            Law Firm Marketing Services
          </h1>
          <p className="text-gray-600 text-xl leading-relaxed">
            Every service built for one industry. No generalist guesswork, no long-term contracts, no vanity metrics. Just transparent marketing that drives cases.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-6 bg-[#FEF3EC]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/${service.slug}/`}
                className="block bg-white rounded-2xl p-6 shadow-sm hover:shadow-md border border-gray-100 hover:border-[#EE6C13]/30 transition-all no-underline group"
              >
                <h2 className="font-heading font-bold text-gray-900 text-lg mb-2 group-hover:text-[#EE6C13] transition-colors">
                  {service.primaryKeyword}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.tagline}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
