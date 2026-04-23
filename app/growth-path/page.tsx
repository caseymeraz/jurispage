import type { Metadata } from "next";
import { Suspense } from "react";
import SchemaOrg from "@/components/SchemaOrg";
import GrowthPathForm from "@/components/GrowthPathForm";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Growth Path | Free Law Firm Growth Diagnosis | JurisPage",
  description:
    "See what your market looks like, where your firm may be losing ground, and what to fix first. Free, personalized, built for law firms only.",
  alternates: { canonical: "https://jurispage.com/growth-path/" },
};

const whatYouGet = [
  {
    title: "Your market demand",
    description:
      "How many people search for a lawyer like you in your city every month, and what that means for your firm.",
  },
  {
    title: "Who already shows up",
    description:
      "The firms dominating Google search and Maps in your market, with ratings, reviews, and positions.",
  },
  {
    title: "What your website communicates",
    description:
      "An honest review of what potential clients see when they find your site, and what might be turning them away.",
  },
  {
    title: "Where cases may be leaking",
    description:
      "Specific issues in your online presence or intake process that could be costing you signed cases.",
  },
  {
    title: "Your recommended path",
    description:
      "A clear, prioritized plan for what to do first, second, and third, based on your specific situation.",
  },
];

const differentiators = [
  {
    title: "Real data, not guesses",
    description:
      "We pull live search volume, map pack rankings, and competitor metrics. No hand-waving.",
  },
  {
    title: "Diagnosis first",
    description:
      "We figure out what you actually need before recommending anything. No packages, no upsells.",
  },
  {
    title: "Plain English",
    description:
      "No jargon, no acronyms. Every finding tells you what we found, why it matters, and what to do next.",
  },
];

const faqs = [
  {
    question: "What is this exactly?",
    answer:
      "A free, personalized diagnosis of your firm's online presence, market opportunity, and recommended next steps. We analyze real search data, review your website, and check your competitive landscape to give you a clear picture of where you stand.",
  },
  {
    question: "How long does it take?",
    answer:
      "The form takes about 2 minutes. Your report is usually ready within 60-90 seconds after that. It includes market data, website screenshots, and a recommended growth path.",
  },
  {
    question: "Is this really free?",
    answer:
      "Yes, completely free with no obligation. We built this because we believe law firms deserve to see real data before making marketing decisions. No credit card, no upfront fee.",
  },
  {
    question: "What data sources do you use?",
    answer:
      "We use Google search volume data, Google Maps rankings, Google Business Profile data, website performance metrics, and AI-powered website analysis. Everything is pulled from live sources.",
  },
  {
    question: "What happens after I get my report?",
    answer:
      "You'll have a clear picture of where your firm stands and a recommended path forward. If you want help acting on the findings, you can book a call. If you want a team-reviewed version with additional proof, you can request that too. No pressure either way.",
  },
];

export default function GrowthPathPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Free Law Firm Growth Path Diagnosis",
    description:
      "Personalized growth diagnosis showing market opportunity, website review, and recommended next steps for law firms.",
    provider: {
      "@type": "Organization",
      name: "JurisPage",
      url: "https://jurispage.com",
    },
    serviceType: "Growth Diagnosis",
    areaServed: { "@type": "Country", name: "United States" },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free growth path diagnosis for law firms",
    },
  };

  return (
    <>
      <SchemaOrg schema={schema} />

      {/* Hero */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span
            className="inline-block font-heading text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6"
            style={{ background: "#FEF3EC", color: "#EE6C13" }}
          >
            FREE GROWTH PATH DIAGNOSIS
          </span>

          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-gray-900 mb-6 leading-tight">
            See what your market looks like, where your firm may be losing ground, and what to fix first
          </h1>

          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto mb-6">
            Answer a few questions about your firm. We&apos;ll scan your market,
            review your website, and build a personalized growth path, all in
            under two minutes.
          </p>

          <p className="text-sm text-gray-500 font-medium mb-8">
            <span style={{ color: "#22c55e" }}>&#10003;</span> Free{" "}
            <span className="mx-2 text-gray-300">|</span>
            <span style={{ color: "#22c55e" }}>&#10003;</span> Personalized{" "}
            <span className="mx-2 text-gray-300">|</span>
            <span style={{ color: "#22c55e" }}>&#10003;</span> Built for law
            firms only
          </p>

          <a
            href="#form"
            className="inline-block font-heading font-bold text-sm text-white px-8 py-3.5 rounded-[40px] no-underline transition-colors"
            style={{ background: "#EE6C13" }}
          >
            Start My Growth Path
          </a>
        </div>
      </section>

      {/* Form */}
      <section id="form" className="bg-gray-50 py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <Suspense
            fallback={
              <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 text-center text-gray-500">
                Loading form...
              </div>
            }
          >
            <GrowthPathForm />
          </Suspense>
        </div>
      </section>

      {/* What You'll Get */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-gray-900 mb-3">
              What You&apos;ll Get
            </h2>
            <p className="text-gray-600 text-lg max-w-xl mx-auto">
              A complete picture of your market and a clear plan to grow.
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

      {/* Why This Is Different */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-gray-900 mb-3">
              Diagnosis first, not a sales pitch
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

      {/* FAQ */}
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

      {/* Final CTA */}
      <CTASection
        heading="See Where Your Firm Stands"
        subtext="Free growth path diagnosis. Personalized for your practice area and city."
        primaryLabel="Start My Growth Path"
        primaryHref="#form"
      />
    </>
  );
}
