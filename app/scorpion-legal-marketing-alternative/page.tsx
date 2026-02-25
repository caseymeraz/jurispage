import type { Metadata } from "next";
import Link from "next/link";
import SchemaOrg from "@/components/SchemaOrg";
import FAQAccordion from "@/components/FAQAccordion";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Scorpion Legal Marketing Alternative — JurisPage",
  description: "Looking for a Scorpion alternative for your law firm? JurisPage offers transparent pricing, month-to-month contracts, and you own your website. See how we compare.",
  alternates: { canonical: "https://jurispage.com/scorpion-legal-marketing-alternative/" },
};

const faqs = [
  { question: "What's the main difference between JurisPage and Scorpion?", answer: "The biggest difference is website ownership and contract flexibility. With Scorpion, they host your website on their platform — if you leave, your site disappears. With JurisPage, you own everything: your domain, your WordPress site, your content. We also publish our pricing online (Scorpion doesn't), and we operate month-to-month while Scorpion typically requires 12-24 month contracts." },
  { question: "Is JurisPage cheaper than Scorpion?", answer: "Our published pricing starts at $1,497/month. Scorpion doesn't publish pricing, but based on industry estimates, their services typically start around $3,500-$5,000/month or more. The cost comparison depends on your specific service needs — contact us for a side-by-side analysis for your firm." },
  { question: "Can I switch from Scorpion to JurisPage without losing my website?", answer: "If your current Scorpion website is hosted on their platform (which is typical), you cannot transfer that website to another host. However, we can build you a new WordPress website that you own — typically live within 30 days on our Launchpad plan. You'll own everything going forward." },
  { question: "Do you require long-term contracts?", answer: "No. Every JurisPage plan is month-to-month. You stay because the results are there. Cancel anytime with 30 days notice." },
];

export default function ScorpionAlternativePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <SchemaOrg schema={schema} />

      <section className="bg-gray-900 py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <nav className="text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-white no-underline">Home</Link> / <span className="text-gray-300">Scorpion Legal Marketing Alternative</span>
          </nav>
          <h1 className="font-heading font-extrabold text-white text-4xl mb-4">Looking for a Scorpion Legal Marketing Alternative?</h1>
          <p className="text-gray-300 text-lg">Here&apos;s how JurisPage compares — honestly.</p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-gray-700 text-base leading-relaxed mb-8">Scorpion is one of the largest legal marketing agencies in the country. They serve thousands of law firms and have invested heavily in technology and platform development. For some firms, they&apos;re a reasonable choice. For many others — particularly smaller firms with tighter budgets and a need for ownership and flexibility — they&apos;re a frustrating fit.</p>

          <h2 className="font-heading font-extrabold text-gray-900 text-2xl mb-6">The Core Differences</h2>
          <div className="overflow-x-auto mb-10">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr style={{ background: "#1a1a1a" }}>
                  <th className="p-4 text-left text-white font-semibold"> </th>
                  <th className="p-4 text-center font-bold" style={{ color: "#EE6C13" }}>JurisPage</th>
                  <th className="p-4 text-center text-gray-300 font-semibold">Scorpion</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Pricing transparency", "Published online", "Requires sales call"],
                  ["Website ownership", "You own it, always", "Scorpion hosts — disappears if you leave"],
                  ["Contract terms", "Month-to-month", "Typically 12-24 months"],
                  ["Legal-only focus", "100% legal", "Multiple industries"],
                  ["Starting price", "$1,497/month (published)", "~$3,500–$5,000+/month (estimated)"],
                  ["Dedicated point of contact", "From day one", "Often rotates post-onboarding"],
                ].map(([feature, jp, sc], i) => (
                  <tr key={feature} style={{ background: i % 2 === 0 ? "#f9fafb" : "#fff" }}>
                    <td className="p-4 border-b border-gray-100 font-medium text-gray-800">{feature}</td>
                    <td className="p-4 border-b border-gray-100 text-center font-semibold text-green-700">{jp}</td>
                    <td className="p-4 border-b border-gray-100 text-center text-gray-500">{sc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="font-heading font-extrabold text-gray-900 text-2xl mb-4">When Scorpion Makes Sense</h2>
          <p className="text-gray-700 leading-relaxed mb-8">We&apos;re going to be honest here. If you&apos;re a large firm with a $10,000+/month budget and you want a single vendor to handle everything — website, ads, SEO, reporting — and you&apos;re comfortable with their platform model, Scorpion can be a reasonable choice. Their technology platform is real, their team is large, and they have years of legal industry experience.</p>

          <h2 className="font-heading font-extrabold text-gray-900 text-2xl mb-4">When JurisPage Makes More Sense</h2>
          <ul className="space-y-3 mb-8">
            {[
              "You want to own your website and all assets — permanently",
              "You need month-to-month flexibility with no long-term commitment",
              "You want to see pricing before getting on a sales call",
              "Your budget is $1,500–$5,000/month and you want specialized legal SEO, not a generalist platform",
              "You've been at Scorpion and felt like a small account inside a large agency",
            ].map((item) => (
              <li key={item} className="flex gap-3 items-start text-gray-700"><span style={{ color: "#EE6C13" }} className="flex-shrink-0 mt-0.5">✓</span><span>{item}</span></li>
            ))}
          </ul>
        </div>
      </section>

      <FAQAccordion faqs={faqs} heading="Common Questions About Switching" />

      <CTASection
        heading="Ready to See How JurisPage Compares for Your Firm?"
        subtext="Tell us what you're currently paying and what you're getting. We'll give you an honest comparison — no sales games."
        primaryLabel="Get a Free Comparison Consult"
        primaryHref="/contact/"
        secondaryLabel="See Pricing"
        secondaryHref="/services/pricing/"
      />
    </>
  );
}
