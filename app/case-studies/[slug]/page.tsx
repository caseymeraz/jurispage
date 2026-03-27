import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { caseStudies } from "@/data/caseStudies";
import CTASection from "@/components/CTASection";
import SchemaOrg from "@/components/SchemaOrg";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) return {};
  return {
    title: `${cs.client} Case Study: ${cs.heroStat}`,
    description: `How JurisPage helped ${cs.client} achieve ${cs.heroStat} through ${cs.type === "seo" ? "law firm SEO" : cs.type === "ppc" ? "Google Ads for lawyers" : "SEO and Google Ads"}.`,
    alternates: { canonical: `https://jurispage.com/case-studies/${cs.slug}/` },
  };
}

const serviceLabels: Record<string, string> = {
  "law-firm-seo": "Law Firm SEO",
  "google-ads-for-law-firms": "Google Ads for Law Firms",
  "local-seo-for-law-firms": "Local SEO for Law Firms",
  "law-firm-content-writing": "Law Firm Content Writing",
};

const practiceAreaLabels: Record<string, string> = {
  "criminal-defense-lawyer-marketing": "Criminal Defense Lawyer Marketing",
  "family-law-firm-marketing": "Family Law Firm Marketing",
  "divorce-lawyer-marketing": "Divorce Lawyer Marketing",
  "immigration-lawyer-marketing": "Immigration Lawyer Marketing",
};

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) notFound();

  const otherCaseStudies = caseStudies.filter((c) => c.slug !== slug);
  const isImage = cs.imageFile.endsWith(".jpg") || cs.imageFile.endsWith(".png");

  const reviewSchema = cs.testimonial ? {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "Organization",
      name: "JurisPage",
      url: "https://jurispage.com",
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: "5",
      bestRating: "5",
    },
    author: {
      "@type": "Person",
      name: cs.testimonial.author,
    },
    reviewBody: cs.testimonial.quote,
  } : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://jurispage.com/" },
      { "@type": "ListItem", position: 2, name: "Success Stories", item: "https://jurispage.com/case-studies/" },
      { "@type": "ListItem", position: 3, name: cs.client, item: `https://jurispage.com/case-studies/${cs.slug}/` },
    ],
  };

  const schemas = [breadcrumbSchema, ...(reviewSchema ? [reviewSchema] : [])];

  return (
    <>
      <SchemaOrg schema={schemas} />

      {/* Hero */}
      <section className="bg-white py-20 px-6 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-gray-900 no-underline">Home</Link> /{" "}
            <Link href="/case-studies/" className="hover:text-gray-900 no-underline">Success Stories</Link> /{" "}
            <span className="text-gray-700">{cs.client}</span>
          </nav>
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              <span className="inline-block text-xs font-heading font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{ background: "#EE6C1322", color: "#EE6C13" }}>
                {cs.practiceArea} · {cs.location}
              </span>
              <h1 className="font-heading font-extrabold text-gray-900 text-4xl md:text-5xl leading-tight mb-4">
                {cs.client}
              </h1>
              <p className="font-heading font-extrabold text-4xl md:text-5xl" style={{ color: "#EE6C13" }}>
                {cs.heroStat}
              </p>
            </div>
            {isImage && (
              <div className="w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-100 flex items-center justify-center">
                <Image src={cs.imageFile} alt={cs.client} width={128} height={128} className="object-cover" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-10 px-6" style={{ background: "linear-gradient(135deg, #EE6C13, #982A0B)" }}>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {cs.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-heading font-extrabold text-2xl text-white mb-1">{stat.value}</p>
              <p className="text-orange-100 text-xs uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Challenge / Solution / Results */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h2 className="font-heading font-extrabold text-gray-900 text-xl mb-4 pb-2 border-b-2" style={{ borderColor: "#EE6C13" }}>The Challenge</h2>
              <p className="text-gray-700 text-sm leading-relaxed">{cs.challenge}</p>
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-gray-900 text-xl mb-4 pb-2 border-b-2" style={{ borderColor: "#EE6C13" }}>Our Solution</h2>
              <p className="text-gray-700 text-sm leading-relaxed">{cs.solution}</p>
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-gray-900 text-xl mb-4 pb-2 border-b-2" style={{ borderColor: "#EE6C13" }}>The Results</h2>
              <p className="text-gray-700 text-sm leading-relaxed">{cs.results}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      {cs.testimonial && (
        <section className="py-16 px-6 bg-[#FEF3EC]">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-12 h-1 mx-auto mb-6 rounded" style={{ background: "#EE6C13" }} />
            <blockquote className="font-heading font-bold text-2xl md:text-3xl text-gray-900 leading-snug mb-6">
              &ldquo;{cs.testimonial.quote}&rdquo;
            </blockquote>
            <p className="text-gray-600 font-medium">{cs.testimonial.author}</p>
            <p className="text-gray-500 text-sm">{cs.testimonial.title}</p>
            {!isImage && (
              <div className="mt-6">
                <Image src={cs.imageFile} alt={cs.client} width={160} height={50} className="h-10 w-auto mx-auto opacity-60" />
              </div>
            )}
          </div>
        </section>
      )}

      {/* Related Services */}
      {cs.relatedServices.length > 0 && (
        <section className="py-16 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading font-extrabold text-gray-900 text-2xl mb-6">Services Used in This Campaign</h2>
            <div className="flex flex-wrap gap-3">
              {cs.relatedServices.map((slug) => (
                <Link
                  key={slug}
                  href={`/${slug}/`}
                  className="px-5 py-2.5 rounded-[40px] text-sm font-semibold text-white no-underline transition-colors"
                  style={{ background: "#EE6C13" }}
                >
                  {serviceLabels[slug] || slug}
                </Link>
              ))}
              {cs.relatedPracticeAreas.map((slug) => (
                <Link
                  key={slug}
                  href={`/${slug}/`}
                  className="px-5 py-2.5 rounded-[40px] text-sm font-semibold border no-underline transition-colors"
                  style={{ borderColor: "#EE6C13", color: "#EE6C13" }}
                >
                  {practiceAreaLabels[slug] || slug}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Read Another Case Study */}
      {otherCaseStudies.length > 0 && (
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading font-extrabold text-gray-900 text-2xl mb-6">Read Another Success Story</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherCaseStudies.slice(0, 2).map((other) => (
                <Link
                  key={other.slug}
                  href={`/case-studies/${other.slug}/`}
                  className="p-6 bg-white rounded-2xl border border-gray-200 no-underline hover:border-orange-200 hover:shadow-md transition-all block"
                >
                  <p className="text-xs text-gray-500 mb-2">{other.practiceArea} · {other.location}</p>
                  <p className="font-heading font-extrabold text-xl mb-1" style={{ color: "#EE6C13" }}>{other.heroStat}</p>
                  <p className="font-heading font-semibold text-gray-800">{other.client}</p>
                  <p className="text-sm mt-3 font-medium" style={{ color: "#EE6C13" }}>Read Case Study →</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection
        heading="Start Getting Better Cases"
        subtext="Stop wasting money on marketing that doesn&apos;t convert. Join 113+ law firms who chose JurisPage."
        primaryLabel="Start Getting Better Cases"
        primaryHref="/contact/"
        secondaryLabel="See Pricing"
        secondaryHref="/services/pricing/"
      />
    </>
  );
}
