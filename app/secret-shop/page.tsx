import type { Metadata } from "next";
import Link from "next/link";
import CTASection from "@/components/CTASection";
import SchemaOrg from "@/components/SchemaOrg";
import SecretShopAudit from "@/components/SecretShopAudit";

export const metadata: Metadata = {
  title: "Law Firm Intake Audit: The Secret Shop | JurisPage",
  description:
    "Find out how much revenue your law firm is losing from slow intake. The Secret Shop calculator shows the real cost of being second to respond.",
  alternates: { canonical: "https://jurispage.com/secret-shop/" },
  openGraph: {
    title: "Law Firm Intake Audit: The Secret Shop | JurisPage",
    description:
      "Find out how much revenue your law firm is losing from slow intake. The Secret Shop calculator shows the real cost of being second to respond.",
    url: "https://jurispage.com/secret-shop/",
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://jurispage.com/secret-shop/",
  name: "Law Firm Intake Audit: The Secret Shop",
  url: "https://jurispage.com/secret-shop/",
  description:
    "Interactive calculator showing how much revenue law firms lose from slow intake response times.",
  provider: {
    "@type": "Organization",
    name: "JurisPage",
    url: "https://jurispage.com",
  },
};

const features = [
  {
    title: "Intake-Optimized Websites",
    description:
      "Every JurisPage website is built with lead capture front and center: click-to-call, sticky CTAs, and forms that convert mobile visitors at every hour of the day.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0H3" />
      </svg>
    ),
  },
  {
    title: "Lead Capture Integration",
    description:
      "We connect your website to your intake system so no lead falls through the cracks. Real-time SMS alerts, CRM sync, and after-hours call routing built in.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
      </svg>
    ),
  },
  {
    title: "Speed-to-Lead Tracking",
    description:
      "Know exactly how fast your team responds to every lead: by channel, by time of day, by day of week. You can't fix what you can't see.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
];

export default function SecretShopPage() {
  return (
    <>
      <SchemaOrg schema={pageSchema} />

      {/* ── Hero ── */}
      <section className="bg-[#1a1a1a] py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span
            className="inline-block text-xs font-heading font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5 text-white"
            style={{ background: "#EE6C13" }}
          >
            Interactive Intake Audit
          </span>
          <h1 className="font-heading font-extrabold text-white text-4xl md:text-5xl leading-tight mb-6">
            The Secret Shop
          </h1>
          <p className="text-gray-300 text-xl leading-relaxed mb-4">
            78% of clients hire the first attorney who responds. The average law firm takes 2–3
            hours to call back. This calculator shows what that gap is costing you. In real
            dollars, in real time.
          </p>
          <p className="text-gray-500 text-sm">No sales pitch. Just math.</p>
        </div>
      </section>

      {/* ── Widget ── */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <SecretShopAudit />
        </div>
      </section>

      {/* ── What JurisPage Does About It ── */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span
              className="inline-block text-xs font-heading font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 text-white"
              style={{ background: "#EE6C13" }}
            >
              The Fix
            </span>
            <h2 className="font-heading font-extrabold text-gray-900 text-3xl md:text-4xl mb-4">
              What JurisPage Does About It
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              More traffic means nothing if your intake process can&apos;t convert it. Here&apos;s
              how we solve the speed-to-lead problem end to end.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-white flex-shrink-0"
                  style={{ background: "#EE6C13" }}
                >
                  {f.icon}
                </div>
                <h3 className="font-heading font-bold text-gray-900 text-lg mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/law-firm-websites/"
              className="inline-block font-heading font-bold text-white text-sm px-7 py-3.5 rounded-[40px] no-underline hover:opacity-90 transition-opacity"
              style={{ background: "#EE6C13" }}
            >
              See How Our Websites Work →
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        heading="Book Your Intake Audit"
        subtext="We'll review your current intake process and show you exactly where leads are being lost."
        primaryLabel="Book Your Intake Audit"
        primaryHref="/contact/"
        secondaryLabel="See Pricing"
        secondaryHref="/services/pricing/"
      />
    </>
  );
}
