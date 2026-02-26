import type { Metadata } from "next";
import Link from "next/link";
import type { MetroData, MetroService } from "@/data/metros";
import { metroServiceLabels, metros } from "@/data/metros";
import CTASection from "@/components/CTASection";
import FAQAccordion from "@/components/FAQAccordion";
import SchemaOrg from "@/components/SchemaOrg";

interface MetroPageProps {
  metro: MetroData;
  service: MetroService;
}

export function generateMetroMetadata(metro: MetroData, service: MetroService): Metadata {
  const serviceLabel = metroServiceLabels[service];
  const title = `${serviceLabel} in ${metro.city}, ${metro.stateAbbr} | JurisPage`;
  const description = `${serviceLabel} for law firms in ${metro.city}, ${metro.state}. JurisPage helps ${metro.city} attorneys rank higher, get more qualified cases, and grow their practice online.`;
  const slug = `${service}-${metro.slug}`;
  return {
    title,
    description,
    alternates: { canonical: `https://jurispage.com/${slug}/` },
    openGraph: { title, description, url: `https://jurispage.com/${slug}/` },
  };
}

const serviceDescriptions: Record<MetroService, (city: string) => string> = {
  "law-firm-seo": (city) => `Law firm SEO in ${city} is a competitive space - but with the right strategy, you can reach top positions for the local searches that drive qualified case inquiries. JurisPage works with ${city} attorneys across practice areas to build lasting organic visibility.`,
  "google-ads-lawyers": (city) => `Google Ads for lawyers in ${city} can generate case inquiries within 24-48 hours of launch. But without the right keyword targeting, negative keyword lists, and landing page strategy, most campaigns waste 40-60% of their budget. We fix that.`,
  "law-firm-website-design": (city) => `A law firm website in ${city} needs to do more than look professional - it needs to convert visitors into consultation requests. We design fast, credible, mobile-first websites that position your firm as the obvious choice for potential clients.`,
  "law-firm-marketing": (city) => `Law firm marketing in ${city} requires a strategy that covers SEO, paid ads, local search, and increasingly, AI search visibility. JurisPage builds integrated campaigns that generate consistent case flow across all major search channels.`,
};

export default function MetroPage({ metro, service }: MetroPageProps) {
  const serviceLabel = metroServiceLabels[service];
  const slug = `${service}-${metro.slug}`;
  const heading = `${serviceLabel} in ${metro.city}, ${metro.stateAbbr}`;
  const description = serviceDescriptions[service](metro.city);

  const nearbySlugs = metro.nearbyCities.slice(0, 3).map((city) => ({
    label: city,
    href: `/${service}-${city.toLowerCase().replace(/[\s.]/g, "-")}/`,
  }));

  const relatedServices = (["law-firm-seo", "google-ads-lawyers", "law-firm-website-design", "law-firm-marketing"] as MetroService[])
    .filter((s) => s !== service)
    .map((s) => ({ label: metroServiceLabels[s], href: `/${s}-${metro.slug}/` }));

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `https://jurispage.com/${slug}/`,
      name: heading,
      description,
      provider: { "@type": "Organization", name: "JurisPage", url: "https://jurispage.com" },
      url: `https://jurispage.com/${slug}/`,
      areaServed: { "@type": "City", name: metro.city, containedInPlace: { "@type": "State", name: metro.state } },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://jurispage.com/" },
        { "@type": "ListItem", position: 2, name: metro.city, item: `https://jurispage.com/${slug}/` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: `Do you work with law firms in ${metro.city}?`, acceptedAnswer: { "@type": "Answer", text: `Yes. JurisPage provides ${serviceLabel.toLowerCase()} services to law firms across ${metro.city} and ${metro.state} on a fully remote basis. We work with firms nationwide and have helped law firms in markets just like ${metro.city}'s grow their case volume through ethical, transparent digital marketing.` } },
        { "@type": "Question", name: `How competitive is the legal market in ${metro.city}?`, acceptedAnswer: { "@type": "Answer", text: `${metro.legalMarketNote} JurisPage analyzes competitor authority and keyword difficulty for your specific market before recommending a strategy.` } },
        { "@type": "Question", name: `What does ${serviceLabel.toLowerCase()} cost for ${metro.city} law firms?`, acceptedAnswer: { "@type": "Answer", text: `Our pricing starts at $1,497/month with transparent tiers published on our website. The right plan depends on your practice area, competitive landscape, and growth goals. We're happy to recommend the right fit after a free consultation.` } },
      ],
    },
  ];

  const faqs = [
    { question: `Do you work with law firms in ${metro.city}?`, answer: `Yes. JurisPage provides ${serviceLabel.toLowerCase()} services to law firms across ${metro.city} and the surrounding ${metro.state} area on a fully remote basis. We work with firms nationwide and have experience in markets like ${metro.city}.` },
    { question: `How competitive is the legal market in ${metro.city}?`, answer: metro.legalMarketNote + " JurisPage analyzes your specific competitive landscape before recommending a strategy." },
    { question: `What does ${serviceLabel.toLowerCase()} cost for ${metro.city} law firms?`, answer: `Our pricing starts at $1,497/month. Transparent tiers are published on our pricing page - no discovery call required to learn what anything costs. We'll recommend the right plan after a free consultation.` },
    { question: "Do you require long-term contracts?", answer: "No. Every plan is month-to-month. You stay because the results are there, not because you're locked in. Cancel anytime with 30 days notice." },
  ];

  return (
    <>
      <SchemaOrg schema={schema} />

      {/* Hero */}
      <section className="bg-[#1a1a1a] py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <nav className="text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-white no-underline">Home</Link> /{" "}
            <span className="text-gray-300">{heading}</span>
          </nav>
          <span className="inline-block text-xs font-heading font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{ background: "#EE6C1322", color: "#EE6C13" }}>
            {metro.city}, {metro.stateAbbr}
          </span>
          <h1 className="font-heading font-extrabold text-white text-4xl md:text-5xl leading-tight mb-6">{heading}</h1>
          <p className="text-gray-300 text-xl leading-relaxed mb-8">
            JurisPage helps {metro.city} law firms get more qualified case inquiries through ethical, transparent digital marketing. Month-to-month contracts. Pricing published online.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact/" className="inline-block font-heading font-bold text-white text-sm px-7 py-3.5 rounded-[40px] no-underline transition-colors" style={{ background: "#EE6C13" }}>
              Free {metro.city} Marketing Audit
            </Link>
            <Link href="/services/pricing/" className="inline-block font-heading font-bold text-white text-sm px-7 py-3.5 rounded-lg border border-gray-600 no-underline hover:border-gray-400 transition-colors">
              See Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Market Context */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-4">The {metro.city} Legal Market</h2>
          <p className="text-gray-700 text-base leading-relaxed mb-6">{metro.legalMarketNote}</p>
          <p className="text-gray-700 text-base leading-relaxed">{description}</p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-8">How JurisPage Works for {metro.city} Law Firms</h2>
          <div className="space-y-6">
            {[
              { step: "1", title: "We audit your current presence", body: "Before recommending a strategy, we analyze your website, Google Business Profile, current rankings, and competitive landscape in the " + metro.city + " market." },
              { step: "2", title: "We build a plan for your market", body: "Based on your practice area, budget, and competitive context in " + metro.city + ", we recommend the plan tier and tactics most likely to drive results for you specifically." },
              { step: "3", title: "We execute with full transparency", body: "Monthly reporting shows exactly what was done, what changed, and what we're doing next. You own every asset we build." },
              { step: "4", title: "You stay because the results are there", body: "Month-to-month contracts. If we're not delivering, you can leave with 30 days notice. We earn your business every month." },
            ].map((item) => (
              <div key={item.step} className="flex gap-5">
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-heading font-extrabold text-white" style={{ background: "linear-gradient(135deg, #EE6C13, #982A0B)" }}>
                  {item.step}
                </div>
                <div className="pt-1.5">
                  <h3 className="font-heading font-bold text-gray-900 text-base mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-16 px-6 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading font-extrabold text-gray-900 text-2xl mb-6">Other Services for {metro.city} Law Firms</h2>
            <div className="flex flex-wrap gap-3">
              {relatedServices.map((s) => (
                <Link key={s.href} href={s.href} className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all no-underline">
                  {s.label} in {metro.city}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Nearby Cities */}
      {nearbySlugs.length > 0 && (
        <section className="py-12 px-6 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading font-bold text-gray-700 text-lg mb-4">Also Serving Nearby Areas</h2>
            <div className="flex flex-wrap gap-2">
              {nearbySlugs.map((city) => (
                <Link key={city.href} href={city.href} className="px-3 py-1.5 bg-gray-200 rounded text-sm text-gray-600 hover:bg-[#1a1a1a] hover:text-white transition-colors no-underline">
                  {serviceLabel} in {city.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <FAQAccordion faqs={faqs} heading={`${serviceLabel} in ${metro.city} - FAQ`} />

      <CTASection
        heading={`Free ${metro.city} Law Firm ${service === "law-firm-seo" ? "SEO" : service === "google-ads-lawyers" ? "Ads" : "Marketing"} Audit`}
        subtext={`Tell us about your ${metro.city} law firm and your goals. We'll review your current online presence and come back with a clear plan.`}
        primaryLabel={`Get My Free ${metro.city} Audit`}
        primaryHref="/contact/"
        secondaryLabel="See Pricing"
        secondaryHref="/services/pricing/"
      />
    </>
  );
}

// Suppress unused import warning - metros is imported for potential future use
export { metros };
