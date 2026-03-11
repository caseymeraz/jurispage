import type { Metadata } from "next";
import { Suspense } from "react";
import AiSearchReportForm from "@/components/AiSearchReportForm";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title:
    "Is AI Search Recommending Your Law Firm? Free AI Visibility Check | JurisPage",
  description:
    "Find out if Google AI Overviews and AI-powered search engines are citing your law firm. Enter your info, pick a practice area, and see which firms AI is recommending — instantly and free.",
  alternates: { canonical: "https://jurispage.com/ai-search-report/" },
};

const steps = [
  {
    title: "Enter your firm info",
    description:
      "Tell us your name, firm, website, and the practice area and city you want to check.",
  },
  {
    title: "We query AI search",
    description:
      "We run real queries through Google's AI Overview to see which firms get cited for your market.",
  },
  {
    title: "See your results instantly",
    description:
      "Find out if AI is recommending your firm — and who's getting cited instead.",
  },
];

export default function AiSearchReportPage() {
  return (
    <>
      {/* ───────── Hero ───────── */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span
            className="inline-block font-heading text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6"
            style={{ background: "#FEF3EC", color: "#EE6C13" }}
          >
            FREE AI SEARCH VISIBILITY CHECK
          </span>

          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-gray-900 mb-6 leading-tight">
            Is AI Search Recommending Your Law Firm?
          </h1>

          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto mb-6">
            Google&apos;s AI Overviews are changing how potential clients find
            lawyers. Find out if AI is citing your firm — or sending clients to
            your competitors.
          </p>

          <p className="text-sm text-gray-500 font-medium">
            <span style={{ color: "#22c55e" }}>&#10003;</span> Free{" "}
            <span className="mx-2 text-gray-300">|</span>
            <span style={{ color: "#22c55e" }}>&#10003;</span> Instant results{" "}
            <span className="mx-2 text-gray-300">|</span>
            <span style={{ color: "#22c55e" }}>&#10003;</span> No obligation
          </p>
        </div>
      </section>

      {/* ───────── Form ───────── */}
      <section id="form" className="bg-gray-50 py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <Suspense
            fallback={
              <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 text-center text-gray-500">
                Loading form...
              </div>
            }
          >
            <AiSearchReportForm />
          </Suspense>
        </div>
      </section>

      {/* ───────── How It Works ───────── */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-gray-900 mb-3">
              How It Works
            </h2>
            <p className="text-gray-600 text-lg max-w-xl mx-auto">
              Three steps. Under 60 seconds. Real data.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={step.title} className="text-center">
                <span
                  className="inline-flex w-12 h-12 rounded-full items-center justify-center text-white text-lg font-bold mb-4"
                  style={{ background: "#EE6C13" }}
                >
                  {i + 1}
                </span>
                <h3 className="font-heading font-bold text-gray-900 text-lg mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Final CTA ───────── */}
      <CTASection
        heading="Find Out If AI Is Working For or Against You"
        subtext="Free AI search visibility check. Instant results for your practice area and city."
        primaryLabel="Check My AI Visibility"
        primaryHref="#form"
      />
    </>
  );
}
