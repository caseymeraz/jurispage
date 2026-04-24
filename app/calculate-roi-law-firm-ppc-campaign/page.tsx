import type { Metadata } from "next";
import PpcRoiCalculator from "@/components/PpcRoiCalculator";
import CTASection from "@/components/CTASection";
import SchemaOrg from "@/components/SchemaOrg";

export const metadata: Metadata = {
  title: "PPC ROI Calculator for Law Firms | JurisPage",
  description:
    "Estimate your return on investment from a law firm PPC campaign. Enter your practice area, budget, and average case value to see projected leads, cases, and revenue.",
  alternates: {
    canonical: "https://jurispage.com/calculate-roi-law-firm-ppc-campaign/",
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": "https://jurispage.com/calculate-roi-law-firm-ppc-campaign/",
  name: "Law Firm PPC ROI Calculator",
  url: "https://jurispage.com/calculate-roi-law-firm-ppc-campaign/",
  description:
    "Interactive calculator that estimates ROI from a law firm pay-per-click advertising campaign.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function PpcRoiCalculatorPage() {
  return (
    <>
      <SchemaOrg schema={pageSchema} />

      <section
        className="py-16 px-6 text-center"
        style={{ background: "#1a1a1a" }}
      >
        <div className="max-w-2xl mx-auto">
          <span
            className="inline-block text-xs font-heading font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5 text-white border border-gray-700"
          >
            Free Tool
          </span>
          <h1 className="font-heading font-extrabold text-white text-4xl mb-4">
            Law Firm PPC ROI Calculator
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            See what a pay-per-click campaign could return for your firm.
            Adjust your practice area, monthly budget, and average case value
            to get a realistic projection based on industry benchmarks.
          </p>
        </div>
      </section>

      <section
        className="py-16 px-6"
        style={{ background: "#111111" }}
      >
        <PpcRoiCalculator />
      </section>

      <CTASection
        heading="Ready to Launch a High-ROI PPC Campaign?"
        subtext="Our team builds and manages Google Ads campaigns exclusively for law firms. Let's talk about your goals."
        primaryLabel="Book Your Strategy Session"
        primaryHref="/growth-assessment/"
      />
    </>
  );
}
