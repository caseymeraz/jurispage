import type { Metadata } from "next";
import SchemaOrg from "@/components/SchemaOrg";
import HeroForm from "@/components/HeroForm";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Free Law Firm Competitive Market Report | JurisPage",
  description: "See exactly who is dominating Google in your practice area and market - and what it will take to beat them. Free competitive analysis delivered within 24 hours.",
  alternates: { canonical: "https://jurispage.com/free-market-report/" },
  openGraph: {
    title: "Free Law Firm Competitive Market Report | JurisPage",
    description: "Find out exactly who is winning your market and how to beat them. Free competitive analysis delivered within 24 hours.",
    url: "https://jurispage.com/free-market-report/",
  },
};

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://jurispage.com/free-market-report/",
    name: "Free Law Firm Competitive Market Report",
    description: "A personalized one-pager showing your firm's total addressable market, who is dominating Google in your practice area, and a specific plan to take the top spot.",
    provider: { "@type": "Organization", name: "JurisPage", url: "https://jurispage.com" },
    url: "https://jurispage.com/free-market-report/",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free competitive market analysis for law firms",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is included in the free market report?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Your free market report includes: your total addressable market (how many people search for your practice area in your city each month), the top 3 competitors currently dominating Google for your keywords, and a gap analysis showing exactly what they are doing that you are not yet doing.",
        },
      },
      {
        "@type": "Question",
        name: "How long does it take to receive the report?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We deliver all competitive market reports within 24 hours of receiving your request.",
        },
      },
      {
        "@type": "Question",
        name: "Is there any obligation after receiving the report?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. The report is completely free with no obligation. If it helps you understand your market better and you want to work together, great. If not, you still have a useful analysis of your competitive landscape.",
        },
      },
    ],
  },
];

const valueProps = [
  {
    icon: "📊",
    title: "Your Total Addressable Market",
    body: "How many people search for your practice area in your city each month. This is the opportunity sitting in front of you right now - whether you are capturing it or giving it to your competitors.",
  },
  {
    icon: "🏆",
    title: "Who Is Currently Winning",
    body: "The top 3 competitors dominating your keywords right now. We will show you exactly which firms are appearing at the top of Google for the searches your potential clients are doing today.",
  },
  {
    icon: "📋",
    title: "Your Gap Analysis",
    body: "Exactly what the top-ranked firms are doing that you are not yet doing. This is where the opportunity is. We will give you a specific, actionable list - not vague advice.",
  },
];

export default function FreeMarketReportPage() {
  return (
    <>
      <SchemaOrg schema={schema} />

      {/* Hero */}
      <section className="bg-white py-16 px-6 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="pt-4">
              <span className="inline-block text-xs font-heading font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 text-white" style={{ background: "#EE6C13" }}>
                Free Competitive Analysis
              </span>
              <h1 className="font-heading font-extrabold text-gray-900 text-4xl md:text-5xl leading-tight mb-6">
                Find Out Exactly Who Is Winning Your Market - And How to Beat Them
              </h1>
              <p className="text-gray-600 text-xl leading-relaxed mb-8">
                We will send you a personalized one-pager showing your firm&apos;s total addressable market, who is currently dominating Google in your practice area, and a specific plan to take the top spot. Delivered within 24 hours. Free.
              </p>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span className="font-semibold" style={{ color: "#EE6C13" }}>✓</span> No obligation
                <span className="font-semibold" style={{ color: "#EE6C13" }}>✓</span> Delivered in 24 hours
                <span className="font-semibold" style={{ color: "#EE6C13" }}>✓</span> No sales pressure
              </div>
            </div>
            <HeroForm
              ctaLabel="See Where My Firm Stands"
              subtext="Free. Delivered within 24 hours."
              formType="competitive"
            />
          </div>
        </div>
      </section>

      {/* What You'll Get */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-heading font-extrabold text-gray-900 text-4xl mb-4">What Your Free Market Report Includes</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Three sections that give you a clear picture of your competitive position - and what to do about it.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valueProps.map((vp) => (
              <div key={vp.title} className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm">
                <div className="text-4xl mb-4">{vp.icon}</div>
                <h3 className="font-heading font-bold text-gray-900 text-xl mb-3">{vp.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{vp.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why This Matters */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-6">Why Attorneys Request This Report</h2>
          <div className="space-y-6 text-gray-700 text-base leading-relaxed">
            <p>
              Most law firm owners know their competition is doing well online. They see the same firms showing up in Google searches. What they do not know is exactly why - and what it would take to change that.
            </p>
            <p>
              The free market report answers both questions in plain language. No jargon. No 45-minute sales call. Just the data on your market and a clear explanation of what the top-ranked firms are doing differently.
            </p>
            <p>
              If you decide you want help acting on that information, we are here. If you just want the report to understand your situation better, that is completely fine too. We would rather earn your trust than pressure you into something.
            </p>
          </div>

          <div className="mt-10 bg-gray-50 rounded-xl p-6 border border-gray-100">
            <h3 className="font-heading font-bold text-gray-900 text-lg mb-3">Questions? Call us directly.</h3>
            <a href="tel:+18555936935" className="font-heading font-extrabold text-2xl no-underline" style={{ color: "#EE6C13" }}>
              (855) 593-6935
            </a>
            <p className="text-gray-500 text-sm mt-2">Mon-Fri, 9am-5pm MT</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-2xl mb-8">Common Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: "What does the report actually look like?",
                a: "It is a one-page PDF with three sections: your market search volume data, a breakdown of the top 3 competitors and what makes them rank, and a specific list of actions that would close the gap between you and them.",
              },
              {
                q: "Who creates the report?",
                a: "Our team creates it manually. This is not an automated tool output - a real person looks at your market, pulls competitive data, and writes the analysis specific to your practice area and city.",
              },
              {
                q: "What if I am in a small market with low search volume?",
                a: "That is still valuable information. Understanding your market size helps you calibrate how much to invest in marketing and which channels make the most sense. We will tell you the truth even if the answer is 'this market is smaller than you thought.'",
              },
              {
                q: "Is there any catch?",
                a: "No. We offer this because we want to prove we know legal marketing before asking for your business. You will receive the report within 24 hours, completely free, with no follow-up pressure.",
              },
            ].map((item) => (
              <div key={item.q} className="bg-white rounded-xl p-6 border border-gray-100">
                <h3 className="font-heading font-bold text-gray-900 text-base mb-2">{item.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        heading="See Where You Stand"
        subtext="Free competitive analysis, delivered within 24 hours. No obligation."
        primaryLabel="Get My Free Market Report"
        primaryHref="#"
        secondaryLabel="See Pricing"
        secondaryHref="/services/pricing/"
      />
    </>
  );
}
