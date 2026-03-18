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

const metroMetaDescriptions: Record<MetroService, (city: string, state: string) => string> = {
  "law-firm-seo": (city, state) => `Rank higher on Google and sign more cases with law firm SEO in ${city}, ${state}. Month-to-month contracts, transparent pricing, 113+ firms served. Get a free ${city} market audit.`,
  "google-ads-lawyers": (city, state) => `Stop wasting ad spend. Google Ads management for ${city}, ${state} law firms that turns clicks into signed cases. No long-term contracts. Get a free campaign audit.`,
  "law-firm-website-design": (city, state) => `Convert more visitors into clients with a law firm website built for ${city}, ${state} attorneys. Fast, mobile-first, conversion-optimized. Live in 30 days.`,
  "law-firm-marketing": (city, state) => `Full-service law firm marketing in ${city}, ${state}. SEO, Google Ads, local search, and AI visibility. Month-to-month. See where your firm is losing market share.`,
};

export function generateMetroMetadata(metro: MetroData, service: MetroService): Metadata {
  const serviceLabel = metroServiceLabels[service];
  const title = `${serviceLabel} in ${metro.city}, ${metro.stateAbbr} | JurisPage`;
  const description = metroMetaDescriptions[service](metro.city, metro.state);
  const slug = `${service}-${metro.slug}`;
  return {
    title,
    description,
    alternates: { canonical: `https://jurispage.com/${slug}/` },
    openGraph: { title, description, url: `https://jurispage.com/${slug}/` },
  };
}

const serviceDescriptions: Record<MetroService, (city: string) => string> = {
  "law-firm-seo": (city) => `Ranking on Google in ${city} is competitive, but with the right technical foundation and content strategy, your firm can reach the top positions for searches that drive qualified case inquiries. JurisPage works with attorneys across practice areas to build lasting organic visibility in the ${city} market.`,
  "google-ads-lawyers": (city) => `Paid search can generate case inquiries within 24-48 hours of launch. But without the right keyword targeting, negative keyword lists, and landing page strategy, most ${city} law firm campaigns waste 40-60% of their budget. We fix that.`,
  "law-firm-website-design": (city) => `Your website is often the first impression a potential client has of your firm. In a competitive market like ${city}, it needs to do more than look professional. We design fast, credible, mobile-first law firm websites that convert visitors into consultation requests and position your firm as the obvious choice.`,
  "law-firm-marketing": (city) => `Growing a law practice in ${city} requires a coordinated strategy spanning SEO, paid ads, local search, and increasingly, AI search visibility. JurisPage builds integrated campaigns that generate consistent case flow for ${city} attorneys across all major search channels.`,
};

const metroHeadings: Record<MetroService, (city: string, stateAbbr: string) => string> = {
  "law-firm-seo": (city, st) => `Rank Higher and Sign More Cases with SEO in ${city}, ${st}`,
  "google-ads-lawyers": (city, st) => `Google Ads That Generate Cases for ${city}, ${st} Law Firms`,
  "law-firm-website-design": (city, st) => `Law Firm Websites Built to Convert in ${city}, ${st}`,
  "law-firm-marketing": (city, st) => `Grow Your ${city}, ${st} Law Firm with Integrated Marketing`,
};

export default function MetroPage({ metro, service }: MetroPageProps) {
  const serviceLabel = metroServiceLabels[service];
  const slug = `${service}-${metro.slug}`;
  const heading = metroHeadings[service](metro.city, metro.stateAbbr);
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
        { "@type": "Question", name: `What does ${serviceLabel.toLowerCase()} cost for ${metro.city} law firms?`, acceptedAnswer: { "@type": "Answer", text: `Our pricing starts at $2,000/month. The right plan depends on your practice area, competitive landscape, and growth goals. We're happy to recommend the right fit after a free consultation.` } },
      ],
    },
  ];

  const serviceFaqs: Record<MetroService, { question: string; answer: string }[]> = {
    "law-firm-seo": [
      { question: `How long does law firm SEO take to show results in ${metro.city}?`, answer: `Typically 60-90 days for measurable ranking movement, and 6-12 months for consistent lead flow. Highly competitive practice areas in ${metro.city} may take 12-18 months. We set 90-day checkpoints with specific benchmarks and adjust the strategy if targets aren't being met.` },
      { question: `What SEO strategy works best for ${metro.city} law firms?`, answer: `It depends on your practice area and competitive landscape. ${metro.legalMarketNote} We combine technical SEO, local map pack optimization, content targeting ${metro.city}-specific legal queries, and authority building from trusted legal sources. Every strategy is customized after we audit your current position.` },
    ],
    "google-ads-lawyers": [
      { question: `How much should a ${metro.city} law firm spend on Google Ads?`, answer: `Budget depends on your practice area and the competitive landscape. ${metro.legalMarketNote} Most firms we work with in markets like ${metro.city} invest $3,000-$10,000/month in ad spend plus our management fee. We'll recommend a budget based on your specific goals during a free consultation.` },
      { question: `How quickly can Google Ads generate cases in ${metro.city}?`, answer: `Paid search can generate qualified case inquiries within 24-48 hours of launch. However, it typically takes 2-4 weeks of data and optimization to reach peak campaign efficiency. We structure campaigns by practice area with dedicated landing pages and extensive negative keyword lists to minimize wasted spend from day one.` },
    ],
    "law-firm-website-design": [
      { question: `How long does it take to build a law firm website for a ${metro.city} practice?`, answer: `Our standard timeline is 30 days from kickoff to launch with our Launchpad package. Custom builds for larger firms take 6-8 weeks. Every site is mobile-first, fast-loading, and built to convert visitors into consultation requests from day one.` },
      { question: `Will my new website help me rank in ${metro.city}?`, answer: `Yes. Every website we build includes on-page SEO foundations: optimized title tags, proper heading structure, schema markup, fast load times, and mobile responsiveness. These are the technical signals Google needs to consider ranking your site. For ongoing ranking improvements, we recommend pairing your new site with our SEO services.` },
    ],
    "law-firm-marketing": [
      { question: `What marketing channels work best for ${metro.city} law firms?`, answer: `The best mix depends on your practice area and goals. ${metro.legalMarketNote} Most ${metro.city} firms see the best results from a combination of SEO for long-term organic visibility, Google Ads for immediate case flow, and local SEO for map pack presence. We'll recommend the right channel mix after auditing your current position.` },
      { question: `How do you measure marketing ROI for ${metro.city} law firms?`, answer: `We track three numbers: qualified leads generated, cost per lead, and cases signed. Every monthly report connects specific channels (organic, paid, local) to intake volume so you know exactly where your cases are coming from and where additional investment generates the most return.` },
    ],
  };

  const faqs = [
    { question: `Do you work with law firms in ${metro.city}?`, answer: `Yes. JurisPage provides ${serviceLabel.toLowerCase()} services to law firms across ${metro.city} and the surrounding ${metro.state} area on a fully remote basis. We work with firms nationwide and have experience in markets like ${metro.city}.` },
    { question: `How competitive is the legal market in ${metro.city}?`, answer: metro.legalMarketNote + " JurisPage analyzes your specific competitive landscape before recommending a strategy." },
    ...serviceFaqs[service],
    { question: `What does ${serviceLabel.toLowerCase()} cost for ${metro.city} law firms?`, answer: `Our pricing starts at $2,000/month. We'll give you a straight answer on cost during your first conversation. No runaround, no mystery packages. We'll recommend the right plan after a free consultation.` },
    { question: "Do you require long-term contracts?", answer: "No. Every plan is month-to-month. You stay because the results are there, not because you're locked in. Cancel anytime with 30 days notice." },
    { question: "What makes JurisPage different from other legal marketing agencies?", answer: "Three things: we work exclusively with law firms (100% legal focus), we publish our pricing online (no mystery sales calls), and every plan is month-to-month (no lock-in contracts). We've served 113+ law firms and measure success by cases signed, not vanity metrics." },
  ];

  return (
    <>
      <SchemaOrg schema={schema} />

      {/* Hero */}
      <section className="bg-white py-16 px-6 border-b border-gray-100">
        <div className="max-w-3xl mx-auto">
          <nav className="text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-gray-900 no-underline">Home</Link> /{" "}
            <span className="text-gray-700">{heading}</span>
          </nav>
          <span className="inline-block text-xs font-heading font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{ background: "#EE6C1322", color: "#EE6C13" }}>
            {metro.city}, {metro.stateAbbr}
          </span>
          <h1 className="font-heading font-extrabold text-gray-900 text-4xl md:text-5xl leading-tight mb-6">{heading}</h1>
          <p className="text-gray-600 text-xl leading-relaxed mb-8">
            {metro.legalMarketNote} JurisPage helps {metro.city} law firms cut through the competition with ethical, transparent digital marketing. Month-to-month contracts. Pricing published online.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact/" className="inline-block font-heading font-bold text-white text-sm px-7 py-3.5 rounded-[40px] no-underline transition-colors hover:opacity-90" style={{ background: "#EE6C13" }}>
              Get Your Free {metro.city} Market Audit
            </Link>
            <Link href="/services/pricing/" className="inline-block font-heading font-bold text-gray-700 text-sm px-7 py-3.5 rounded-lg border border-gray-300 no-underline hover:border-gray-500 transition-colors">
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
        heading={`Ready to Grow Your ${metro.city} Practice?`}
        subtext={`We only work with one firm per practice area per market. Tell us about your ${metro.city} firm and we'll show you where the opportunities are.`}
        primaryLabel="Book Your Free Strategy Call"
        primaryHref="/contact/"
        secondaryLabel="See Pricing"
        secondaryHref="/services/pricing/"
      />
    </>
  );
}

// Suppress unused import warning - metros is imported for potential future use
export { metros };
