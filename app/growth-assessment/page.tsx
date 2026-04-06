import type { Metadata } from "next";
import GrowthAssessmentForm from "@/components/GrowthAssessmentForm";
import SchemaOrg from "@/components/SchemaOrg";

export const metadata: Metadata = {
  title: "Growth Strategy Session for Established Law Firms",
  description: "Apply for a complimentary Growth Strategy Session. Built for law firms with 5+ attorneys and $5K+ monthly marketing budgets ready to dominate their market.",
  alternates: { canonical: "https://jurispage.com/growth-assessment/" },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://jurispage.com/growth-assessment/",
  name: "Growth Strategy Session for Established Law Firms",
  url: "https://jurispage.com/growth-assessment/",
  description: "Apply for a complimentary Growth Strategy Session with Juris Digital.",
};

export default function GrowthAssessmentPage() {
  return (
    <>
      <SchemaOrg schema={pageSchema} />

      <section className="bg-white py-16 px-6 text-center border-b border-gray-100">
        <div className="max-w-2xl mx-auto">
          <span
            className="inline-block text-xs font-heading font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5 text-white"
            style={{ background: "#1a1a1a" }}
          >
            <a href="https://jurisdigital.com" target="_blank" rel="noopener noreferrer" className="text-white no-underline">Juris Digital</a>
          </span>
          <h1 className="font-heading font-extrabold text-gray-900 text-4xl mb-4">
            Apply for a Growth Strategy Session
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            For established law firms ready to invest in market leadership. Tell us about your firm and a senior strategist will build a custom growth roadmap before your first call.
          </p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-heading font-extrabold text-gray-900 text-2xl mb-6">What to Expect</h2>
            <div className="space-y-5">
              {[
                { step: "1", title: "Submit your application", body: "Takes 3 minutes. We review every application personally." },
                { step: "2", title: "We research your market", body: "Before we ever get on a call, we analyze your competitive landscape, rankings, and opportunities." },
                { step: "3", title: "45-minute strategy session", body: "A senior strategist walks you through what we found, what we'd do differently, and how we'd structure a partnership." },
                { step: "4", title: "You decide", body: "No pressure, no hard close. If it's a fit, great. If not, you walk away with actionable insights." },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-heading font-bold text-sm text-white"
                    style={{ background: "#1a1a1a" }}
                  >
                    {item.step}
                  </div>
                  <div>
                    <div className="font-heading font-semibold text-gray-900 text-base">{item.title}</div>
                    <div className="text-gray-600 text-sm mt-1">{item.body}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-xl p-6 border border-gray-200" style={{ background: "#f9fafb" }}>
              <h3 className="font-heading font-bold text-gray-900 mb-3">Who is this for?</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                {[
                  "Law firms with 5+ attorneys",
                  "Monthly marketing budget of $5,000+",
                  "Goals around market leadership, case volume, or geographic expansion",
                  "Firms tired of cookie-cutter agencies that don't deliver",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="flex-shrink-0 font-bold mt-0.5" style={{ color: "#EE6C13" }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="font-heading font-bold text-gray-900 mb-4">Prefer to call?</h3>
              <a href="tel:+18555936935" className="font-heading font-extrabold text-2xl no-underline" style={{ color: "#EE6C13" }}>
                (855) 593-6935
              </a>
              <p className="text-gray-500 text-sm mt-2">Available Mon–Fri, 9am–5pm MT</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
            <h2 className="font-heading font-bold text-gray-900 text-xl mb-2">Tell Us About Your Firm</h2>
            <p className="text-gray-500 text-sm mb-6">We&apos;ll respond within one business day.</p>
            <GrowthAssessmentForm />
          </div>
        </div>
      </section>
    </>
  );
}
