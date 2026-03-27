import type { Metadata } from "next";
import { Suspense } from "react";
import SchemaOrg from "@/components/SchemaOrg";
import MarketGapForm from "@/components/MarketGapForm";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "See My Market Gap | Free Law Firm Market Analysis",
  description:
    "Get a personalized market-gap analysis for your practice area and city. See how many potential clients are searching, who's winning, and how to close the gap.",
  alternates: { canonical: "https://jurispage.com/see-my-market-gap/" },
};

const whatYouGet = [
  {
    title: "Your total addressable market",
    description:
      "Monthly search volume for your practice area and city: how many people are actively looking for a lawyer like you.",
  },
  {
    title: "Who's currently winning",
    description:
      "Top firms dominating Google and Maps in your market, with ratings, review counts, and positions.",
  },
  {
    title: "Your visibility score",
    description:
      "How visible your firm is compared to competitors across organic search, Maps, and directories.",
  },
  {
    title: "Your biggest gaps",
    description:
      "Specific weaknesses competitors are exploiting, the exact places where you're losing potential clients.",
  },
  {
    title: "Your action plan",
    description:
      "What to fix first, second, and third to start winning, prioritized by impact and effort.",
  },
];

const differentiators = [
  {
    title: "Real data, not guesses",
    description:
      "We pull live search volume, map pack rankings, and competitor metrics. No hand-waving, no estimates.",
  },
  {
    title: "No generic templates",
    description:
      "Every report is built for your specific practice area and city. Two firms never get the same analysis.",
  },
  {
    title: "Proof before the pitch",
    description:
      "See the full picture before we ever ask for your business. If the data doesn't speak for itself, we haven't earned the conversation.",
  },
];

const faqs = [
  {
    question: "What exactly is a market gap analysis?",
    answer:
      "A market gap analysis identifies the difference between the demand for legal services in your area and your firm's current visibility. We measure how many people search for a lawyer like you each month, who's capturing those searches today, and where your firm falls short, so you know exactly what to fix.",
  },
  {
    question: "How long does it take?",
    answer:
      "You'll see an instant teaser snapshot in about 60 seconds after submitting the form. Your full report (with detailed competitor analysis, keyword data, and a prioritized action plan) will be delivered to your inbox within 24 hours.",
  },
  {
    question: "Is this really free?",
    answer:
      "Yes, completely free with no obligation. We built this tool because we believe law firms deserve to see real data before making any marketing decisions. There's no credit card, no contract, and no sales call required.",
  },
  {
    question: "What data sources do you use?",
    answer:
      "We use Google search volume data, Google Maps rankings, Google Business Profile review data, organic SERP analysis, and domain authority metrics. Everything is pulled from live sources, not cached databases or estimates.",
  },
  {
    question: "What happens after I get my report?",
    answer:
      "You'll have a clear picture of where your firm stands and what to do about it. If you want help acting on the findings, we're here, but there's absolutely no pressure. Many firms use the report to guide their own marketing efforts, and that's perfectly fine with us.",
  },
];

export default function SeeMyMarketGapPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Free Law Firm Market Gap Analysis",
    description:
      "Personalized market-gap analysis showing search volume, competitor rankings, and actionable insights for law firms.",
    provider: {
      "@type": "Organization",
      name: "JurisPage",
      url: "https://jurispage.com",
    },
    serviceType: "Market Analysis",
    areaServed: { "@type": "Country", name: "United States" },
    isRelatedTo: {
      "@type": "Service",
      name: "Law Firm SEO",
      url: "https://jurispage.com/services/pricing/",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free market gap analysis for law firms",
    },
  };

  return (
    <>
      <SchemaOrg schema={schema} />

      {/* ───────── Hero ───────── */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span
            className="inline-block font-heading text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6"
            style={{ background: "#FEF3EC", color: "#EE6C13" }}
          >
            FREE LAW FIRM MARKET GAP ANALYSIS
          </span>

          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-gray-900 mb-6 leading-tight">
            See exactly where your firm is losing your market
          </h1>

          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto mb-6">
            Get a personalized market-gap analysis for your practice area and
            city. In under 60 seconds, you&apos;ll see exactly how many
            potential clients are searching for a lawyer like you, who&apos;s
            winning those searches today, and the specific gaps you can close to
            take your share.
          </p>

          <p className="text-sm text-gray-500 font-medium">
            <span style={{ color: "#22c55e" }}>&#10003;</span> Free{" "}
            <span className="mx-2 text-gray-300">|</span>
            <span style={{ color: "#22c55e" }}>&#10003;</span> Personalized{" "}
            <span className="mx-2 text-gray-300">|</span>
            <span style={{ color: "#22c55e" }}>&#10003;</span> Built for law
            firms only
          </p>
        </div>
      </section>

      {/* ───────── Multi-step Form ───────── */}
      <section id="form" className="bg-gray-50 py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <Suspense fallback={<div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 text-center text-gray-500">Loading form...</div>}>
            <MarketGapForm />
          </Suspense>
        </div>
      </section>

      {/* ───────── What You'll Get ───────── */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-gray-900 mb-3">
              What You&apos;ll Get
            </h2>
            <p className="text-gray-600 text-lg max-w-xl mx-auto">
              A complete picture of your market, not a vague overview.
            </p>
          </div>

          <div className="space-y-6">
            {whatYouGet.map((item, i) => (
              <div
                key={item.title}
                className="flex items-start gap-5 bg-white rounded-xl border border-gray-100 p-6"
              >
                <span
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold"
                  style={{ background: "#EE6C13" }}
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-heading font-bold text-gray-900 text-lg mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Why This Is Different ───────── */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-gray-900 mb-3">
              This is not another sales pitch disguised as a free audit
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {differentiators.map((item) => (
              <div key={item.title} className="text-center">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: "#FEF3EC" }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#EE6C13"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-gray-900 text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── FAQ ───────── */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-extrabold text-3xl text-gray-900 mb-10 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="bg-white rounded-xl border border-gray-100 p-6"
              >
                <h3 className="font-heading font-bold text-gray-900 text-base mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Final CTA ───────── */}
      <CTASection
        heading="See Where Your Firm Stands"
        subtext="Free market gap analysis. Personalized for your practice area and city."
        primaryLabel="See My Market Gap"
        primaryHref="#form"
      />
    </>
  );
}
