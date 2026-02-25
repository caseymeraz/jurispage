import type { Metadata } from "next";
import Link from "next/link";
import SchemaOrg from "@/components/SchemaOrg";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "About JurisPage | Law Firm Marketing Agency Built on Ethics",
  description: "JurisPage is a law firm marketing agency with 15+ years of legal SEO experience, 113+ clients served, and a mission to make enterprise-quality digital marketing accessible to small law firms.",
  alternates: { canonical: "https://jurispage.com/about-us/" },
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://jurispage.com/about-us/",
  name: "About JurisPage",
  url: "https://jurispage.com/about-us/",
  description: "JurisPage is a law firm marketing agency acquired by Ethical SEO Consulting LLC in February 2026, with a mission to provide transparent, ethical marketing for small and mid-market law firms.",
};

const differences = [
  {
    color: "#14EEEE",
    title: "We Publish Our Pricing",
    body: "Most agencies won't tell you what anything costs until you've been on three calls and signed an NDA. We think that's a bad start to any business relationship. Our pricing is on our website — no sales games, no mystery packages.",
  },
  {
    color: "#6FFF2C",
    title: "100% Law Firm Focus",
    body: "We don't do e-commerce SEO. We don't run campaigns for restaurants or HVAC companies. Every single thing we do is built for law firms — the compliance considerations, the YMYL standards, the local map pack tactics that actually move the needle.",
  },
  {
    color: "#14EEEE",
    title: "Month-to-Month Contracts",
    body: "We don't lock you into 12-month agreements and collect a check whether you're happy or not. We operate month-to-month because we believe we should earn your business every single month.",
  },
  {
    color: "#6FFF2C",
    title: "Ethical SEO — No Shortcuts",
    body: "No black hat link schemes, no keyword stuffing, no fake reviews, no tricks. Ethical SEO takes longer to ramp, but it builds rankings that last and won't get you penalized when Google updates.",
  },
  {
    color: "#14EEEE",
    title: "Built for Small Firms",
    body: "The attorney running a three-person PI firm deserves the same caliber of digital marketing as the 50-attorney firm down the street. We built JurisPage specifically for small and mid-size firms that are underserved by the market.",
  },
];

const practiceAreasList = [
  "Personal Injury", "Criminal Defense", "Family Law & Divorce", "Immigration Law",
  "Estate Planning & Probate", "Business Law", "Employment Law", "Bankruptcy",
  "Medical Malpractice", "Workers' Compensation", "Social Security Disability", "Real Estate Law",
];

export default function AboutPage() {
  return (
    <>
      <SchemaOrg schema={aboutSchema} />

      {/* Hero */}
      <section className="bg-gray-50 py-20 px-6 text-center border-b-4" style={{ borderBottomColor: "#14EEEE" }}>
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading font-extrabold text-gray-900 text-5xl mb-6 leading-tight">
            Law Firm Marketing Built on Ethics, Not Empty Promises
          </h1>
          <p className="text-gray-600 text-xl leading-relaxed">
            We're a specialized law firm marketing agency with one mission: make enterprise-quality digital marketing accessible to the small and mid-size law firms that need it most.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-6 max-w-3xl mx-auto">
        <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-6 pb-3 inline-block border-b-4" style={{ borderBottomColor: "#14EEEE" }}>Our Story</h2>
        <div className="space-y-4 text-gray-700 text-base leading-relaxed">
          <p>JurisPage has been around for years, but in February 2026 we entered a new chapter. Ethical SEO Consulting LLC acquired JurisPage and brought in a leadership team with over 15 years of hands-on experience in legal digital marketing.</p>
          <p>We've grown and evolved significantly over time — and today we're building something we're genuinely proud of: a focused, ethical, results-driven agency for law firms that are serious about growth but not interested in paying big-agency prices for big-agency indifference.</p>
          <p>Our broader organization has served 113+ law firms across the country. That experience shapes everything we do at JurisPage — from how we price our services to how we talk with clients every week.</p>
          <p>We're not going to pretend we're the biggest agency in legal marketing. We're going to prove we're the best fit for small law firms that want real results and a partner they can actually trust.</p>
        </div>
      </section>

      {/* Meet Casey */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-6 pb-3 inline-block border-b-4" style={{ borderBottomColor: "#6FFF2C" }}>Meet Casey Meraz, CEO</h2>
          <div className="space-y-4 text-gray-700 text-base leading-relaxed">
            <p>Casey Meraz has spent 15 years doing one thing: helping law firms get found online and turn that traffic into clients.</p>
            <p>He's personally managed SEO campaigns for 100+ law firms — from solo practitioners to multi-location regional firms. He's built one of the most-read blogs on legal marketing online, and has contributed to industry publications on the topics of local SEO, ethical link building, and content strategy for attorneys.</p>
            <p>Casey is based in Ireland and works with law firms across the United States remotely — a setup that works because this work has always been about strategy and results, not office visits.</p>
            <p>His philosophy is simple: <strong>"Do the right thing for the client, be completely transparent about what's working and what isn't, and never take a shortcut that could put their business at risk."</strong></p>
            <p>That's not a tagline. It's how he's operated for 15 years, and it's the standard every JurisPage team member is held to.</p>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-16 px-6 max-w-3xl mx-auto">
        <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-10 pb-3 inline-block border-b-4" style={{ borderBottomColor: "#14EEEE" }}>What Makes JurisPage Different</h2>
        <div className="space-y-4">
          {differences.map((d) => (
            <div key={d.title} className="bg-white rounded-lg p-6 border-l-4 shadow-sm" style={{ borderLeftColor: d.color }}>
              <h3 className="font-heading font-bold text-gray-900 text-lg mb-2">{d.title}</h3>
              <p className="text-gray-600 leading-relaxed">{d.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-10 pb-3 inline-block border-b-4" style={{ borderBottomColor: "#6FFF2C" }}>Why JurisPage vs Your Other Options</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm shadow-sm">
              <thead>
                <tr>
                  <th className="p-4 text-left bg-gray-900 text-white font-semibold rounded-tl-lg w-1/4"> </th>
                  <th className="p-4 text-center font-extrabold text-gray-900 text-base rounded-none" style={{ background: "linear-gradient(135deg, #6FFF2C, #14EEEE)" }}>JurisPage</th>
                  <th className="p-4 text-center bg-gray-700 text-white font-semibold">Large Agencies</th>
                  <th className="p-4 text-center bg-gray-700 text-white font-semibold rounded-tr-lg">Freelancers</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {[
                  ["Pricing transparency", "Published online", "Requires sales call", "Varies widely"],
                  ["Contract terms", "Month-to-month", "12-month lock-in", "Month-to-month"],
                  ["Law firm focus", "100% legal only", "General or 'legal team'", "Rarely specialized"],
                  ["Proven results", "113+ law firms served", "Varies by team", "Hard to verify"],
                  ["Starting price", "From $1,497/mo", "$5,000 – $15,000+/mo", "Low cost, high risk"],
                ].map(([feature, juris, large, free], i) => (
                  <tr key={feature} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="p-4 font-semibold text-gray-800">{feature}</td>
                    <td className="p-4 text-center font-bold text-gray-900">{juris}</td>
                    <td className="p-4 text-center text-gray-500">{large}</td>
                    <td className="p-4 text-center text-gray-500">{free}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-6 pb-3 inline-block border-b-4" style={{ borderBottomColor: "#6FFF2C" }}>Who We Serve</h2>
          <p className="text-gray-700 leading-relaxed mb-4">JurisPage works with law firms across the United States — from solo practitioners launching their first marketing campaign to established regional firms looking to take their online presence to the next level.</p>
          <p className="text-gray-700 leading-relaxed mb-6">We work across nearly every practice area, including:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
            {practiceAreasList.map((area) => (
              <div key={area} className="bg-white px-4 py-3 border-l-4 text-sm font-medium text-gray-700 shadow-sm" style={{ borderLeftColor: "#14EEEE" }}>
                {area}
              </div>
            ))}
          </div>
          <p className="text-gray-700 leading-relaxed">We're built for firms with 1 to 25 attorneys who are ready to grow. If that's you, we'd like to talk.</p>
        </div>
      </section>

      <CTASection
        heading="Ready to Grow Your Firm?"
        subtext="No long-term contracts. No mystery pricing. No runaround. Just a straightforward conversation about what digital marketing can do for your law firm."
        primaryLabel="Get a Free Strategy Call"
        primaryHref="/contact/"
      />
    </>
  );
}
