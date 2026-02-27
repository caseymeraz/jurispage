import type { Metadata } from "next";
import Link from "next/link";
import SchemaOrg from "@/components/SchemaOrg";
import FAQAccordion from "@/components/FAQAccordion";
import LaunchpadCalculator from "@/components/LaunchpadCalculator";
import YouTubeFacade from "@/components/YouTubeFacade";
import ReviewRibbon from "@/components/ReviewRibbon";

export const metadata: Metadata = {
  title: "Launchpad: Law Firm Marketing Foundation Starting at $2,000/mo | JurisPage",
  description: "Get an instant quote for JurisPage Launchpad: website, SEO, GBP, and ongoing management built for small law firms. Transparent pricing, no contracts. See your exact number now.",
  alternates: { canonical: "https://jurispage.com/launchpad/" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "How is Launchpad priced?", acceptedAnswer: { "@type": "Answer", text: "Launchpad is priced based on your firm size and market. It starts at $2,000/month for firms with 1–2 attorneys. Use the quote calculator on this page to see your exact number in under a minute." } },
    { "@type": "Question", name: "Are there long-term contracts?", acceptedAnswer: { "@type": "Answer", text: "No. Launchpad is month-to-month. Give us 30 days notice and you're done." } },
    { "@type": "Question", name: "How quickly can my campaign launch?", acceptedAnswer: { "@type": "Answer", text: "Full setup is completed within the first 45 days: website, GBP, local SEO, social profiles, and all initial content." } },
    { "@type": "Question", name: "Will I own my website and content?", acceptedAnswer: { "@type": "Answer", text: "Always. Your domain, your website, your content. All yours. If you ever leave JurisPage, everything transfers cleanly." } },
    { "@type": "Question", name: "How does the 90-day guarantee work?", acceptedAnswer: { "@type": "Answer", text: "If you don't see measurable progress in your rankings, traffic, or leads within 90 days, we work for free for the following month." } },
  ],
};

const wallOfProof = [
  {
    role: "The Scaler",
    videoId: "T_7--aGpB54",
    author: "Michael Oykhman",
    firm: "Oykhman Criminal Defence",
    quote: "My business has grown 10-fold.",
  },
  {
    role: "The Closer",
    videoId: "l5xHsqhkgI8",
    author: "Cory Wilson",
    firm: "Wilson Criminal Defence",
    quote: "I'm closing more high-value clients than ever.",
  },
  {
    role: "The Believer",
    videoId: "B9zSA5lzvwc",
    author: "Williams",
    firm: "",
    quote: "Finally, an agency that understands the legal niche.",
  },
];

const includedSetup = [
  { icon: "🌐", title: "Professional Website", href: "/law-firm-websites/", desc: "Fast, mobile-optimized, built to rank and convert. Live within 45 days." },
  { icon: "📍", title: "Google Business Profile", href: "/local-seo-for-law-firms/", desc: "Full GBP setup so you appear in local map results when clients search nearby." },
  { icon: "🔍", title: "Keyword Research & SEO Content", href: "/law-firm-content-writing/", desc: "We find exactly what your future clients search and create the content to rank for it." },
  { icon: "📋", title: "Local Citation Building", href: "/local-seo-for-law-firms/", desc: "Your firm listed and verified on Yelp, Apple Maps, Bing, Avvo, and 30+ other directories." },
  { icon: "📱", title: "Social Media Setup", href: null, desc: "Core profiles created and optimized for a professional, consistent presence everywhere." },
  { icon: "📊", title: "Performance Tracking", href: "/law-firm-seo/", desc: "GA4, Search Console, and call tracking configured from day one." },
];

const monthlyServices = [
  "SEO content updates to improve and expand keyword rankings",
  "Google Business Profile management and posting",
  "Weekly social media content",
  "Monthly performance reports with rankings, traffic, and lead data",
];

const faqs = [
  { question: "How is Launchpad priced?", answer: "It starts at $2,000/month for firms with 1–2 attorneys. Pricing scales based on firm size and market competitiveness. Use the quote calculator on this page to get your exact number instantly." },
  { question: "Are there long-term contracts?", answer: "No. Launchpad is month-to-month. Give us 30 days notice and you're done. We've never believed in locking clients in. The results should do that." },
  { question: "How quickly can my campaign launch?", answer: "Full setup is completed within the first 45 days: website, GBP, local SEO foundation, social profiles, and all initial content production." },
  { question: "Will I own my website and content?", answer: "Always. Your domain, your website, your content. All yours. If you ever leave JurisPage, everything transfers cleanly. We don't hold websites hostage." },
  { question: "How does the 90-day guarantee work?", answer: "If you don't see measurable progress in your rankings, traffic, or leads within 90 days, we work free the following month. No fine print. No arguing. We either deliver or we earn it back." },
  { question: "Can I add services later?", answer: "Yes. Many Launchpad clients add Google Ads, content writing, or GEO optimization once their foundation is established. Upgrade anytime with 30 days notice." },
];

export default function LaunchpadPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />

      {/* ── Hero — Calculator Above the Fold ── */}
      <section className="bg-white py-16 px-6 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

            {/* Left: headline + trust */}
            <div className="lg:pt-4">
              <span
                className="inline-block text-xs font-heading font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5 text-white"
                style={{ background: "#EE6C13" }}
              >
                Launchpad: For Small Law Firms
              </span>
              <h1 className="font-heading font-extrabold text-gray-900 text-4xl md:text-5xl leading-tight mb-5">
                Your Law Firm&apos;s Digital Foundation.<br />
                <span style={{ color: "#EE6C13" }}>Instant, Transparent Pricing.</span>
              </h1>
              <p className="text-gray-600 text-xl leading-relaxed mb-8">
                Website, SEO, Google Business Profile, and ongoing management. Built specifically for small firms. Answer a few questions and reveal your exact quote in under a minute.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  "Month-to-month. No long-term contracts.",
                  "Full setup completed within 45 days",
                  "90-day results guarantee. Or we work free.",
                  "You own your website, content, and data",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0"
                      style={{ background: "#EE6C13" }}
                    >
                      ✓
                    </span>
                    <span className="text-gray-700 text-base">{item}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="rounded-xl p-4 bg-gray-50 border border-gray-100 text-center min-w-[100px]">
                  <p className="font-heading font-extrabold text-2xl" style={{ color: "#EE6C13" }}>113+</p>
                  <p className="text-xs text-gray-500 mt-0.5">Law Firms Served</p>
                </div>
                <div className="rounded-xl p-4 bg-gray-50 border border-gray-100 text-center min-w-[100px]">
                  <p className="font-heading font-extrabold text-2xl" style={{ color: "#EE6C13" }}>15+</p>
                  <p className="text-xs text-gray-500 mt-0.5">Years in Legal Marketing</p>
                </div>
                <div className="rounded-xl p-4 bg-gray-50 border border-gray-100 text-center min-w-[100px]">
                  <p className="font-heading font-extrabold text-2xl" style={{ color: "#EE6C13" }}>45</p>
                  <p className="text-xs text-gray-500 mt-0.5">Day Setup</p>
                </div>
              </div>
            </div>

            {/* Right: calculator */}
            <div id="get-quote">
              <LaunchpadCalculator />
              <p className="text-center text-xs text-gray-400 mt-4">
                No commitment required. No spam. Just your quote.
              </p>
            </div>

          </div>
        </div>
      </section>

      <ReviewRibbon />

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
                Most digital marketing agencies are built for big firms with big budgets. If you&apos;re a{" "}
                <Link href="/solo-attorney-marketing/" className="font-medium underline" style={{ color: "#EE6C13" }}>solo attorney</Link>{" "}
                or a{" "}
                <Link href="/small-law-firm-marketing/" className="font-medium underline" style={{ color: "#EE6C13" }}>small law firm</Link>,
                you either get ignored or sold an expensive package designed for someone else.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Launchpad fixes that. It&apos;s a complete digital marketing foundation:{" "}
                <Link href="/law-firm-websites/" className="font-medium underline" style={{ color: "#EE6C13" }}>website</Link>,{" "}
                <Link href="/law-firm-seo/" className="font-medium underline" style={{ color: "#EE6C13" }}>SEO</Link>,{" "}
                <Link href="/local-seo-for-law-firms/" className="font-medium underline" style={{ color: "#EE6C13" }}>local presence</Link>,
                and ongoing management. Built specifically for small law firms that need results without the enterprise price tag.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { problem: "Paid $5,000+/mo for minimal results", fix: "Transparent pricing scaled to your firm size" },
                { problem: "Locked into 12-month contracts", fix: "Month-to-month: stay because it's working, not because you have to" },
                { problem: "Lost the website when you switched agencies", fix: "You own your site, content, and data. Always." },
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
              Full setup within 45 days, then ongoing monthly management to keep your presence growing.
            </p>
          </div>

          <div className="mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 text-center">
              One-Time Setup (Completed in 45 Days)
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {includedSetup.map((item) => (
                <div key={item.title} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                  <div className="text-2xl mb-3">{item.icon}</div>
                  <h3 className="font-heading font-bold text-gray-900 text-base mb-2">
                    {item.href ? (
                      <Link href={item.href} className="no-underline hover:underline" style={{ color: "#1a1a1a" }}>
                        {item.title}
                      </Link>
                    ) : item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

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

      {/* ── Mid-page quote CTA ── */}
      <section className="bg-gray-50 py-16 px-6 border-b border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-4">
            Ready to See Your Quote?
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Answer a few questions about your firm and we&apos;ll show you an exact, itemized breakdown. No sales call required.
          </p>
          <a
            href="#get-quote"
            className="inline-block font-heading font-bold text-white text-base px-8 py-4 rounded-[40px] no-underline transition-opacity hover:opacity-90"
            style={{ background: "#EE6C13" }}
          >
            Get My Instant Quote ↑
          </a>
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
              We move fast. Most firms see their full foundation live within six weeks of signing on.
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

      {/* ── Wall of Proof ── */}
      <section className="py-20 px-6" style={{ background: "#1a1a1a" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span
              className="inline-block text-xs font-heading font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 text-white"
              style={{ background: "#EE6C13" }}
            >
              Real Attorneys. Real Results.
            </span>
            <h2 className="font-heading font-extrabold text-white text-4xl mb-3">
              Don&apos;t Take Our Word for It
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Hear directly from the law firm owners who&apos;ve grown their practices with JurisPage.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {wallOfProof.map((item) => (
              <div key={item.videoId} className="flex flex-col gap-4">
                <div className="bg-gray-800 rounded-xl px-3 py-1.5 self-start">
                  <span
                    className="text-xs font-heading font-bold uppercase tracking-widest"
                    style={{ color: "#EE6C13" }}
                  >
                    {item.role}
                  </span>
                </div>
                <YouTubeFacade
                  videoId={item.videoId}
                  title={`${item.author} testimonial - JurisPage`}
                />
                <div>
                  <p className="text-white font-heading font-bold text-lg leading-snug">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    - {item.author}{item.firm ? `, ${item.firm}` : ""}
                  </p>
                </div>
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
            Most agencies ask you to be patient for 6 to 12 months before holding them accountable. We don&apos;t. If you aren&apos;t seeing measurable movement in your rankings, traffic, or leads within 90 days, we work the following month for free.
          </p>
          <p className="text-gray-400 mb-8">No fine print. No arguing over definitions. We either perform or we earn it back.</p>
          <a
            href="#get-quote"
            className="inline-block font-heading font-bold py-4 px-8 rounded-[40px] no-underline border-2 border-white text-white transition-opacity hover:opacity-80"
          >
            Get My Instant Quote ↑
          </a>
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
              Get My Instant Quote ↑
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
