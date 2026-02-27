import type { Metadata } from "next";
import Link from "next/link";
import SchemaOrg from "@/components/SchemaOrg";
import FAQAccordion from "@/components/FAQAccordion";
import LaunchpadCalculator from "@/components/LaunchpadCalculator";

export const metadata: Metadata = {
  title: "Launchpad: Affordable Law Firm Marketing for Small Firms | JurisPage",
  description: "Get an instant quote for JurisPage Launchpad: the fastest, most affordable way to build your law firm's online presence. Website, SEO, GBP, and more. Starting at $2,000/month.",
  alternates: { canonical: "https://jurispage.com/services/pricing/" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "How is Launchpad priced?", acceptedAnswer: { "@type": "Answer", text: "Launchpad is priced based on your firm size and market. It starts at $2,000/month for firms with 1–2 attorneys. Larger firms and more competitive markets (major metros, personal injury) are priced accordingly. Use our quote calculator to get your exact number in under a minute." } },
    { "@type": "Question", name: "Are there long-term contracts?", acceptedAnswer: { "@type": "Answer", text: "No. Launchpad is month-to-month. Give us 30 days notice and you're done. We don't lock you in. The results should speak for themselves." } },
    { "@type": "Question", name: "How quickly can my campaign launch?", acceptedAnswer: { "@type": "Answer", text: "Full setup is completed within the first 45 days. That includes your website, Google Business Profile, local SEO foundation, social profiles, and all initial content production." } },
    { "@type": "Question", name: "Will I own my website and content?", acceptedAnswer: { "@type": "Answer", text: "Always. Your domain, your website, your content. All yours. If you ever leave JurisPage, everything transfers cleanly. We don't hold websites hostage." } },
    { "@type": "Question", name: "What's the difference between Launchpad and your other plans?", acceptedAnswer: { "@type": "Answer", text: "Launchpad is built for small and startup law firms that need to establish their online presence quickly and cost-effectively. Our Grow and Dominate plans are designed for established firms with larger budgets that want to actively compete for more competitive keywords and markets." } },
    { "@type": "Question", name: "How does the 90-day guarantee work?", acceptedAnswer: { "@type": "Answer", text: "If you don't see measurable progress in your rankings, traffic, or leads within 90 days, we work for free for the following month. No fine print. No arguing. We either deliver or we earn it back." } },
    { "@type": "Question", name: "How much involvement is required from me?", acceptedAnswer: { "@type": "Answer", text: "Very little. We handle everything: strategy, content, technical setup, and ongoing management. We'll need a few hours from you upfront to gather firm info, review your website, and align on messaging. After that, we run the campaign and send you monthly reports." } },
    { "@type": "Question", name: "Can I add services later?", acceptedAnswer: { "@type": "Answer", text: "Yes. Many Launchpad clients add Google Ads management, content writing, or GEO optimization once their foundation is established. You can upgrade or add services at any time." } },
  ],
};

const includedSetup = [
  {
    icon: "🌐",
    title: "Professional Website",
    desc: "A fast, mobile-optimized website built for conversion. Clear messaging, strong calls to action, and designed to rank. Live within 45 days.",
  },
  {
    icon: "📍",
    title: "Google Business Profile",
    desc: "Full GBP setup and optimization so you appear in local map results when clients search for attorneys near them.",
  },
  {
    icon: "🔍",
    title: "Keyword Research & SEO Content",
    desc: "We identify the exact keywords your future clients are searching, then create all the content needed to rank for them.",
  },
  {
    icon: "📋",
    title: "Local Citation Building",
    desc: "Your firm listed and verified on Yelp, Apple Maps, Bing, Avvo, and 30+ other directories that build local authority.",
  },
  {
    icon: "📱",
    title: "Social Media Setup",
    desc: "Core social profiles created and optimized so your firm presents a professional, consistent presence across every channel.",
  },
  {
    icon: "📊",
    title: "Performance Tracking",
    desc: "GA4, Search Console, and call tracking configured from day one so you know exactly what's working and what it's producing.",
  },
];

const monthlyServices = [
  "SEO content updates to improve and expand keyword rankings",
  "Google Business Profile management and posting",
  "Weekly social media content",
  "Monthly performance reports with rankings, traffic, and lead data",
];

const faqs = [
  { question: "How is Launchpad priced?", answer: "Launchpad is priced based on your firm size and market. It starts at $2,000/month for firms with 1–2 attorneys. Larger firms and more competitive markets (major metros, personal injury) are priced accordingly. Use our quote calculator to see your exact number in under a minute." },
  { question: "Are there long-term contracts?", answer: "No. Launchpad is month-to-month. Give us 30 days notice and you're done. We've never believed in locking clients in. The results should do that for us." },
  { question: "How quickly can my campaign launch?", answer: "Full setup is completed within the first 45 days. That includes your website, Google Business Profile, local SEO foundation, social profiles, and all initial content production." },
  { question: "Will I own my website and content?", answer: "Always. Your domain, your website, your content. All yours. If you ever leave JurisPage, everything transfers cleanly. We don't hold websites hostage the way some larger agencies do." },
  { question: "What's the difference between Launchpad and your other plans?", answer: "Launchpad is built for small and startup law firms that need to establish their online presence quickly and cost-effectively. Our Grow and Dominate plans are designed for established firms with larger budgets who want to actively compete for more competitive keywords and larger markets." },
  { question: "How does the 90-day guarantee work?", answer: "If you don't see measurable progress in your rankings, traffic, or leads within 90 days, we work for free for the following month. No fine print. No arguing over definitions. We either deliver or we earn it back." },
  { question: "How much involvement is required from me?", answer: "Very little. We handle strategy, content, technical setup, and ongoing management. We'll need a few hours from you upfront to gather firm info and align on messaging. After that, we run the campaign and you get monthly reports." },
  { question: "Can I add services later?", answer: "Yes. Many Launchpad clients add Google Ads management, content writing, or GEO optimization once their foundation is established. You can upgrade or add services at any time with 30 days notice." },
];

export default function PricingPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />

      {/* ── Hero ── */}
      <section className="bg-white py-20 px-6 border-b border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <span
            className="inline-block text-xs font-heading font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5 text-white"
            style={{ background: "#EE6C13" }}
          >
            Launchpad: For Small Law Firms
          </span>
          <h1 className="font-heading font-extrabold text-gray-900 text-5xl leading-tight mb-6">
            Build Your Firm&apos;s Online Foundation.<br />
            Get an Instant Quote.
          </h1>
          <p className="text-gray-600 text-xl leading-relaxed mb-8 max-w-2xl mx-auto">
            No sales call needed. No waiting. Tell us about your firm and get a
            transparent, itemized quote in under a minute.
          </p>
          <div className="flex flex-wrap gap-6 justify-center text-sm text-gray-500">
            {["Month-to-month contracts", "Full setup in 45 days", "90-day results guarantee", "You own everything"].map((item) => (
              <div key={item} className="flex items-center gap-1.5">
                <span className="font-bold" style={{ color: "#EE6C13" }}>✓</span>
                {item}
              </div>
            ))}
          </div>
          <div className="mt-10">
            <a
              href="#get-quote"
              className="inline-block font-heading font-bold text-white text-base px-8 py-4 rounded-[40px] no-underline transition-opacity hover:opacity-90"
              style={{ background: "#EE6C13" }}
            >
              Get My Instant Quote
            </a>
          </div>
        </div>
      </section>

      {/* ── The Problem ── */}
      <section className="bg-gray-50 py-20 px-6 border-b border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span
                className="inline-block text-xs font-heading font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 text-white"
                style={{ background: "#EE6C13" }}
              >
                The Problem
              </span>
              <h2 className="font-heading font-extrabold text-gray-900 text-3xl md:text-4xl mb-5 leading-tight">
                Small Firms Get Underserved. Or Overcharged.
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                Most digital marketing agencies are built for big firms with big budgets. If you&apos;re a solo attorney or a small firm, you either get ignored or sold an expensive package that was designed for someone else.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Launchpad fixes that. It&apos;s a complete digital marketing foundation: website, SEO, local presence, and ongoing management. Built specifically for small law firms that need results without the enterprise price tag.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { problem: "Paid $5,000+/mo for minimal results", fix: "Transparent pricing scaled to your firm size" },
                { problem: "Locked into 12-month contracts", fix: "Month-to-month: stay because it's working, not because you have to" },
                { problem: "Lost website if you switched agencies", fix: "You own your site, content, and data. Always." },
                { problem: "Waited months just to find out the price", fix: "Instant, transparent quote in under 60 seconds" },
              ].map((item) => (
                <div key={item.problem} className="bg-white rounded-xl p-4 border border-gray-200 flex gap-4 items-start">
                  <div className="flex-shrink-0 text-base">❌</div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 line-through mb-0.5">{item.problem}</p>
                    <p className="text-sm font-semibold text-gray-900">✓ {item.fix}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── What's Included ── */}
      <section className="bg-white py-20 px-6 border-b border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span
              className="inline-block text-xs font-heading font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 text-white"
              style={{ background: "#EE6C13" }}
            >
              Everything You Need
            </span>
            <h2 className="font-heading font-extrabold text-gray-900 text-4xl mb-4">
              What&apos;s Included in Launchpad
            </h2>
            <p className="text-gray-600 text-lg max-w-xl mx-auto">
              Full setup within 45 days, then ongoing monthly management to keep
              your presence growing.
            </p>
          </div>

          {/* Setup items */}
          <div className="mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 text-center">
              One-Time Setup (Completed in 45 Days)
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {includedSetup.map((item) => (
                <div key={item.title} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                  <div className="text-2xl mb-3">{item.icon}</div>
                  <h3 className="font-heading font-bold text-gray-900 text-base mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly services */}
          <div className="rounded-2xl p-8" style={{ background: "#1a1a1a" }}>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">
              Ongoing Monthly Services
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {monthlyServices.map((item) => (
                <div key={item} className="flex gap-3 items-start">
                  <span className="flex-shrink-0 font-bold mt-0.5" style={{ color: "#EE6C13" }}>✓</span>
                  <span className="text-gray-300 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Quote Calculator ── */}
      <section id="get-quote" className="py-20 px-6 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <span
              className="inline-block text-xs font-heading font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 text-white"
              style={{ background: "#EE6C13" }}
            >
              Instant Quote
            </span>
            <h2 className="font-heading font-extrabold text-gray-900 text-4xl mb-4">
              Get Your Instant Quote
            </h2>
            <p className="text-gray-600 text-lg">
              Answer a few quick questions about your firm, enter your contact
              info, and we&apos;ll reveal your itemized quote immediately.
            </p>
          </div>
          <LaunchpadCalculator />
          <p className="text-center text-xs text-gray-400 mt-5">
            113+ law firms trust JurisPage. Month-to-month. No commitment required.
          </p>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="bg-white py-20 px-6 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-heading font-extrabold text-gray-900 text-4xl mb-4">
              From Signup to First Lead in 45 Days
            </h2>
            <p className="text-gray-600 text-lg max-w-xl mx-auto">
              We move fast. Most firms see their full foundation live within six
              weeks of signing on.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Campaign Setup",
                desc: "We build your website, optimize your Google Business Profile, research your keywords, produce your content, build local citations, and configure tracking. All within the first 45 days.",
                detail: "Website · GBP · Keywords · Content · Citations · Social profiles · Tracking",
              },
              {
                step: "02",
                title: "Monthly Growth",
                desc: "After launch, we shift into ongoing mode: refreshing content, managing your GBP, posting to social, and reporting on every metric that matters.",
                detail: "Content updates · GBP management · Social posts · Monthly reports",
              },
              {
                step: "03",
                title: "Measurable Results",
                desc: "You get a clear monthly report showing exactly what moved: rankings, traffic, leads, and calls. No vanity metrics. Just the numbers that map to cases.",
                detail: "Rankings · Traffic · Leads · Calls · ROI tracking",
              },
            ].map((item) => (
              <div key={item.step} className="relative pl-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-heading font-extrabold text-sm text-white mb-5"
                  style={{ background: "#EE6C13" }}
                >
                  {item.step}
                </div>
                <h3 className="font-heading font-bold text-gray-900 text-xl mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">{item.desc}</p>
                <p className="text-xs text-gray-400">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 90-Day Guarantee ── */}
      <section className="py-20 px-6" style={{ background: "#1a1a1a" }}>
        <div className="max-w-3xl mx-auto text-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white"
            style={{ background: "linear-gradient(135deg, #EE6C13, #982A0B)" }}
          >
            ★
          </div>
          <h2 className="font-heading font-extrabold text-white text-3xl mb-5">
            The 90-Day Guarantee
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-4">
            Most agencies ask you to be patient for 6 to 12 months before
            holding them accountable. We don&apos;t. If you aren&apos;t seeing
            measurable movement in your rankings, traffic, or leads within 90
            days, we work the following month for free.
          </p>
          <p className="text-gray-400">No fine print. No arguing over definitions. We either perform or we earn it back.</p>
        </div>
      </section>

      <FAQAccordion faqs={faqs} heading="Questions About Launchpad" />

      {/* ── Bottom CTA ── */}
      <section
        className="py-14 px-6 text-center"
        style={{ background: "linear-gradient(135deg, #EE6C13, #982A0B)" }}
      >
        <div className="max-w-3xl mx-auto">
          <p className="font-heading font-extrabold text-white text-2xl mb-3">
            Ready to stop guessing and start growing?
          </p>
          <p className="text-orange-100 mb-7">
            Get your instant quote above, or talk to a specialist today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#get-quote"
              className="inline-block bg-white font-heading font-bold py-4 px-8 rounded-[40px] no-underline"
              style={{ color: "#982A0B" }}
            >
              Get My Instant Quote
            </a>
            <a
              href="tel:+18887677447"
              className="inline-block border-2 border-white text-white font-heading font-bold py-4 px-8 rounded-[40px] no-underline"
            >
              (888) 767-7447
            </a>
          </div>
          <p className="text-orange-200 text-sm mt-5">
            Month-to-month · 45-day setup · 90-day results guarantee ·{" "}
            <Link href="/contact/" className="underline text-white">
              Or book a strategy call
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
