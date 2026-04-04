import type { Metadata } from "next";
import SchemaOrg from "@/components/SchemaOrg";
import GrowthReportForm from "@/components/GrowthReportForm";

export const metadata: Metadata = {
  title: "Get Your Custom Growth Report | JurisPage",
  description:
    "Answer a few questions about your law firm. We'll research your market and send you a personalized growth plan within 24 hours. Free. No obligation.",
  alternates: { canonical: "https://jurispage.com/growth-report/" },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Law Firm Growth Report",
  url: "https://jurispage.com/growth-report/",
  description:
    "Get a personalized growth report for your law firm. We analyze your market, competitors, and opportunities.",
  publisher: {
    "@type": "Organization",
    name: "JurisPage",
    url: "https://jurispage.com",
  },
};

export default function GrowthReportPage() {
  return (
    <>
      <SchemaOrg schema={schema} />

      {/* Hero */}
      <section className="bg-white pt-16 pb-8 px-6 border-b border-gray-100">
        <div className="max-w-2xl mx-auto text-center">
          <span
            className="inline-block text-xs font-heading font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 text-white"
            style={{ background: "#EE6C13" }}
          >
            Free. Personalized. No Obligation.
          </span>
          <h1 className="font-heading font-extrabold text-gray-900 text-4xl md:text-5xl leading-tight mb-5">
            Get Your Custom Growth Report
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            Answer a few questions about your firm. We&apos;ll research your
            market, analyze your competitors, and send you a personalized growth
            plan within 24 hours.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  stroke="#EE6C13"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Takes 5 minutes
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  stroke="#EE6C13"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Built by legal marketing specialists
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  stroke="#EE6C13"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              113+ law firms served
            </span>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="bg-gray-50 py-14 px-6">
        <GrowthReportForm />
      </section>
    </>
  );
}
