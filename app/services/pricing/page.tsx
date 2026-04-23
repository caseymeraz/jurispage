import type { Metadata } from "next";
import Link from "next/link";
import SchemaOrg from "@/components/SchemaOrg";
import FAQAccordion from "@/components/FAQAccordion";
import LaunchpadCalculator from "@/components/LaunchpadCalculator";

export const metadata: Metadata = {
  title: "Pricing: Law Firm Marketing Plans for Every Stage",
  description: "Transparent pricing for every stage of growth. JurisPage Launchpad starts at $2,000/month for small or startup firms with no upfront fee. Juris Digital runs $5,000 to $50,000+/month for established firms.",
  alternates: { canonical: "https://jurispage.com/services/pricing/" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "How is JurisPage Launchpad priced?", acceptedAnswer: { "@type": "Answer", text: "Launchpad starts at $2,000/month over a 24-month engagement, with a typical range of $2,000 to $4,000/month depending on firm size and market. There is no upfront setup fee: costs are spread across the 24 months so small and startup firms can afford the work without a large day-one check. Use our pricing calculator to get your exact number in under a minute." } },
    { "@type": "Question", name: "How long is the engagement?", acceptedAnswer: { "@type": "Answer", text: "Launchpad is a 24-month engagement. We front-load the work (brand design, StoryBrand website, GBP, Yelp, Apple Maps, citations, social profiles, tracking) so your full marketing foundation is live in 45 days. We do not front-load the billing." } },
    { "@type": "Question", name: "How can you offer this price and produce results quickly?", acceptedAnswer: { "@type": "Answer", text: "Two reasons. First, we do not front-load costs. We spread them across your engagement instead of charging a large upfront fee. Second, we have fully embraced automation and generative AI. By pairing that technology with 12 years of legal SEO expertise, we deliver highly effective marketing faster and cheaper than a bespoke service." } },
    { "@type": "Question", name: "How much involvement will be required from me?", acceptedAnswer: { "@type": "Answer", text: "Roughly a 30-minute kickoff call plus a few hours spread across the first 45 days to sign off on design elements and content topics, and help verify your Google Business Profile and other local listings." } },
    { "@type": "Question", name: "How quickly can my campaign launch?", acceptedAnswer: { "@type": "Answer", text: "Full setup is completed within the first 45 days. That includes brand design, StoryBrand website, Google Business Profile, Yelp, Apple Maps, citations, social profiles with weekly posting, and performance tracking." } },
    { "@type": "Question", name: "What's the difference between JurisPage and Juris Digital?", acceptedAnswer: { "@type": "Answer", text: "JurisPage Launchpad is built for small or startup law firms with little to no online presence, with a typical budget of $2,000 to $4,000/month. Juris Digital is our full-service brand for established firms investing $5,000 to $50,000+/month in SEO, Google Ads, content strategy, and market domination. Same parent company, same expertise, different scale." } },
    { "@type": "Question", name: "How much does Juris Digital cost?", acceptedAnswer: { "@type": "Answer", text: "Juris Digital partnerships are fully bespoke and typically run $5,000 to $50,000+/month. Investment is based on your firm size, practice areas, markets, and growth goals. Apply for a Growth Strategy Session to receive a custom proposal." } },
    { "@type": "Question", name: "Do I need to be a certain size for Juris Digital?", acceptedAnswer: { "@type": "Answer", text: "Juris Digital is typically best suited for established firms with a monthly marketing budget of at least $5,000. If you're a small or startup firm with little to no online presence, JurisPage Launchpad is designed specifically for you." } },
    { "@type": "Question", name: "How does the 90-day guarantee work?", acceptedAnswer: { "@type": "Answer", text: "If you don't see measurable progress in your rankings, traffic, or leads within 90 days, we work for free for the following month. No fine print. No arguing. We either deliver or we earn it back." } },
    { "@type": "Question", name: "Will I own my website and content?", acceptedAnswer: { "@type": "Answer", text: "Yes, always. All IP we create for you is owned by you. Your domain, your website, your content. If you ever leave, everything transfers cleanly." } },
  ],
};

const faqs = [
  { question: "How is JurisPage Launchpad priced?", answer: "Launchpad starts at $2,000/month over a 24-month engagement, with a typical range of $2,000 to $4,000/month depending on firm size and market. There is no upfront setup fee: costs are spread across the 24 months. Use our pricing calculator to get your exact number in under a minute." },
  { question: "How long is the engagement?", answer: "Launchpad is a 24-month engagement. We front-load the work (brand design, StoryBrand website, GBP, Yelp, Apple Maps, citations, social profiles, tracking) so your full marketing foundation is live in 45 days. We do not front-load the billing. Costs are spread evenly across the engagement instead of charged up front." },
  { question: "How can you offer this price and produce results quickly?", answer: "Two reasons. First, we do not front-load costs. We spread them across your engagement instead of charging a large upfront fee. Second, we have fully embraced automation and generative AI. By pairing that technology with 12 years of legal SEO expertise, we deliver highly effective marketing faster and cheaper than a bespoke service." },
  { question: "How much customization can I expect?", answer: "Launchpad is not a bespoke service. That is how we keep the price competitive. Your website ships with custom imagery, colors, marketing copy, and content on top of a proven StoryBrand-driven design layout. Customization is limited to keep this service affordable for small and startup firms." },
  { question: "How much involvement will be required from me?", answer: "Roughly a 30-minute kickoff call plus a few hours spread across the first 45 days to sign off on design elements and content topics, and help verify your Google Business Profile and other local listings." },
  { question: "How quickly can my campaign launch?", answer: "Full setup is completed within the first 45 days. That includes brand design, StoryBrand website, Google Business Profile, Yelp, Apple Maps, citations, social profiles with weekly posting, and performance tracking." },
  { question: "What's the difference between JurisPage and Juris Digital?", answer: "JurisPage Launchpad is built for small or startup law firms with little to no online presence, with a typical budget of $2,000 to $4,000/month. Juris Digital is our full-service brand for established firms investing $5,000 to $50,000+/month in SEO, Google Ads, content strategy, and market domination. Same parent company, same expertise, different scale." },
  { question: "How much does Juris Digital cost?", answer: "Juris Digital partnerships are fully bespoke and typically run $5,000 to $50,000+/month. Investment is based on your firm size, practice areas, markets, and growth goals. Apply for a Growth Strategy Session to receive a custom proposal." },
  { question: "Do I need to be a certain size for Juris Digital?", answer: "Juris Digital is typically best suited for established firms with a monthly marketing budget of at least $5,000. If you're a small or startup firm with little to no online presence, JurisPage Launchpad is designed specifically for you." },
  { question: "How does the 90-day guarantee work?", answer: "If you don't see measurable progress in your rankings, traffic, or leads within 90 days, we work for free for the following month. No fine print. No arguing. We either deliver or we earn it back." },
  { question: "Will I own my website and content?", answer: "Yes, always. All IP we create for you is owned by you. Your domain, your website, your content. If you ever leave, everything transfers cleanly." },
];

export default function PricingPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />

      {/* ── A. Hero - Fork in the Road ── */}
      <section className="bg-white py-20 px-6 border-b border-gray-100">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="font-heading font-extrabold text-gray-900 text-5xl leading-tight mb-4">
            The Right Plan for Your Stage of Growth
          </h1>
          <p className="text-gray-600 text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
            Whether you&apos;re launching your first practice or scaling a regional powerhouse, we have a plan built for you.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* JurisPage Card */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 text-left flex flex-col">
              <span
                className="inline-block text-xs font-heading font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5 text-white self-start"
                style={{ background: "#EE6C13" }}
              >
                JurisPage
              </span>
              <h2 className="font-heading font-extrabold text-gray-900 text-2xl mb-3">
                The Fast Track to Consistent Cases.
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                For small or startup law firms with little to no online presence. Brand design, StoryBrand website, SEO, GBP, Yelp, Apple Maps, and weekly social posting. Transparent pricing, no upfront fee.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 mb-8 flex-1">
                {["Instant transparent pricing", "Full setup in 45 days", "No upfront setup fee (costs spread over 24 months)", "90-day results guarantee"].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="flex-shrink-0 font-bold" style={{ color: "#EE6C13" }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#jurispage"
                className="inline-block font-heading font-bold text-white text-sm px-6 py-3.5 rounded-[40px] no-underline transition-opacity hover:opacity-90 text-center"
                style={{ background: "#EE6C13" }}
              >
                See JurisPage Pricing
              </a>
              <p className="text-xs text-gray-400 mt-3 text-center">Starting at $2,000/month</p>
            </div>

            {/* Juris Digital Card */}
            <div className="rounded-2xl p-8 text-left flex flex-col" style={{ background: "#1a1a1a" }}>
              <span
                className="inline-block text-xs font-heading font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5 self-start"
                style={{ background: "#333", color: "#fff" }}
              >
                <a href="https://jurisdigital.com" target="_blank" rel="noopener noreferrer" className="text-white no-underline">Juris Digital</a>
              </span>
              <h2 className="font-heading font-extrabold text-white text-2xl mb-3">
                Market Dominance &amp; Bespoke Scale.
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                For established firms ready to invest $5,000 to $50,000+/month in full-service SEO, Google Ads, content strategy, and true market leadership.
              </p>
              <ul className="space-y-2 text-sm text-gray-400 mb-8 flex-1">
                {["Dedicated strategist for your firm", "Omnichannel: SEO, GEO, LSA, Ads, content", "Limited partnerships per market", "Advanced intake consulting"].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="flex-shrink-0 font-bold" style={{ color: "#EE6C13" }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#juris-digital"
                className="inline-block font-heading font-bold text-white text-sm px-6 py-3.5 rounded-[40px] no-underline transition-opacity hover:opacity-90 text-center border-2 border-gray-600 hover:border-gray-400"
              >
                Explore Juris Digital
              </a>
              <p className="text-xs text-gray-500 mt-3 text-center">$5,000 to $50,000+/month</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── B. JurisPage Section ── */}
      <section id="jurispage" className="scroll-mt-20 bg-gray-50 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span
              className="inline-block text-xs font-heading font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5 text-white"
              style={{ background: "#EE6C13" }}
            >
              JurisPage
            </span>
            <h2 className="font-heading font-extrabold text-gray-900 text-4xl mb-4">
              No Hidden Fees. No Upfront Setup Fee. Just Results.
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
              Tell us about your firm and get transparent, itemized pricing in under a minute. No sales call needed.
            </p>
            <div className="flex flex-wrap gap-6 justify-center text-sm text-gray-500 mb-10">
              {["No upfront fee", "45-day setup", "90-day guarantee", "You own everything"].map((item) => (
                <div key={item} className="flex items-center gap-1.5">
                  <span className="font-bold" style={{ color: "#EE6C13" }}>✓</span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <LaunchpadCalculator />
          </div>

          {/* Condensed 90-Day Guarantee */}
          <div className="max-w-2xl mx-auto mt-10 rounded-xl p-6 text-center" style={{ background: "#1a1a1a" }}>
            <p className="text-white font-heading font-bold text-lg mb-2">
              <span className="mr-2" style={{ color: "#EE6C13" }}>★</span>
              90-Day Results Guarantee
            </p>
            <p className="text-gray-400 text-sm">
              If you don&apos;t see measurable movement in rankings, traffic, or leads within 90 days, we work the following month for free. No fine print.
            </p>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            Want the full Launchpad breakdown?{" "}
            <Link href="/launchpad/" className="font-semibold no-underline" style={{ color: "#EE6C13" }}>
              See the Launchpad page →
            </Link>
          </p>
        </div>
      </section>

      {/* ── C. Juris Digital Section ── */}
      <section id="juris-digital" className="scroll-mt-20 bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span
              className="inline-block text-xs font-heading font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5 text-white"
              style={{ background: "#1a1a1a" }}
            >
              <a href="https://jurisdigital.com" target="_blank" rel="noopener noreferrer" className="text-white no-underline">Juris Digital</a>
            </span>
            <h2 className="font-heading font-extrabold text-gray-900 text-4xl mb-4">
              Custom Strategies for Firms Ready to Take the Lion&apos;s Share.
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Your firm has outgrown cookie-cutter marketing. You need a growth partner that understands your market, your competition, and your ambition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              {
                icon: "🎯",
                title: "Strategic Leadership",
                desc: "A dedicated strategist who integrates with your team, understands your goals, and drives every campaign decision with data.",
              },
              {
                icon: "🌐",
                title: "Omnichannel Market Capture",
                desc: "GEO, LSA, organic SEO, Google Ads, and content moats, coordinated across every channel where your future clients are searching.",
              },
              {
                icon: "🛡️",
                title: "Market Exclusivity",
                desc: "Limited partnerships per market to ensure your investment isn't competing against another client we manage. Your market is yours.",
              },
              {
                icon: "📊",
                title: "Advanced Intake Consulting",
                desc: "We don't just send leads. We help optimize your intake process so more leads convert into signed cases and revenue.",
              },
            ].map((card) => (
              <div key={card.title} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <div className="text-2xl mb-3">{card.icon}</div>
                <h3 className="font-heading font-bold text-gray-900 text-lg mb-2">{card.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>

          {/* Investment box */}
          <div className="rounded-2xl p-8 text-center" style={{ background: "#1a1a1a" }}>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-3">Investment</p>
            <p className="text-white font-heading font-extrabold text-2xl mb-3">
              Our partnerships are fully bespoke.
            </p>
            <p className="text-gray-400 text-base mb-6 max-w-lg mx-auto">
              Investment typically runs $5,000 to $50,000+/month and is tailored to your firm size, practice areas, competitive landscape, and growth goals.
            </p>
            <Link
              href="/growth-assessment/"
              className="inline-block font-heading font-bold text-white text-base px-8 py-4 rounded-[40px] no-underline transition-opacity hover:opacity-90"
              style={{ background: "#EE6C13" }}
            >
              Apply for a Growth Strategy Session →
            </Link>
            <p className="text-gray-500 text-sm mt-4">Limited partnership slots available in each market.</p>
          </div>
        </div>
      </section>

      {/* ── D. Shared Footer - The Juris Digital Family Advantage ── */}
      <section className="py-16 px-6" style={{ background: "#1a1a1a" }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading font-extrabold text-white text-3xl text-center mb-12">
            The Juris Digital Family Advantage
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "One Unified Team",
                desc: "JurisPage and Juris Digital share leadership, data, and methodology. Your growth is powered by the same team that's driven results for 113+ law firms.",
              },
              {
                title: "113+ Law Firms Trust Us",
                desc: "From solo practitioners launching their first website to multi-state firms dominating regional markets. We've done it all.",
              },
              {
                title: "Only Law Firms. Always.",
                desc: "No dentists. No plumbers. No restaurants. We work exclusively with law firms, which means every strategy, template, and insight is built for your industry.",
              },
            ].map((card) => (
              <div key={card.title} className="text-center">
                <h3 className="font-heading font-bold text-white text-lg mb-3">{card.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── E. FAQs ── */}
      <FAQAccordion faqs={faqs} heading="Frequently Asked Questions" />

      {/* ── F. Bottom CTA ── */}
      <section
        className="py-14 px-6 text-center"
        style={{ background: "linear-gradient(135deg, #EE6C13, #982A0B)" }}
      >
        <div className="max-w-3xl mx-auto">
          <p className="font-heading font-extrabold text-white text-2xl mb-3">
            Not Sure Which Path Is Right?
          </p>
          <p className="text-orange-100 mb-7">
            Use our instant calculator for small or startup firms, or apply for a custom growth strategy session for established firms.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#jurispage"
              className="inline-block bg-white font-heading font-bold py-4 px-8 rounded-[40px] no-underline"
              style={{ color: "#982A0B" }}
            >
              Get Instant Pricing
            </a>
            <Link
              href="/growth-assessment/"
              className="inline-block border-2 border-white text-white font-heading font-bold py-4 px-8 rounded-[40px] no-underline"
            >
              Apply for Growth Strategy
            </Link>
          </div>
          <p className="text-orange-200 text-sm mt-5">
            <a href="tel:+18555936935" className="text-white underline">(855) 593-6935</a>
            {" · "}
            <Link href="/contact/" className="underline text-white">
              Or book a strategy call
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
