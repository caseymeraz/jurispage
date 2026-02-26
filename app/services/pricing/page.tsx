import type { Metadata } from "next";
import Link from "next/link";
import SchemaOrg from "@/components/SchemaOrg";
import FAQAccordion from "@/components/FAQAccordion";

export const metadata: Metadata = {
  title: "Law Firm Marketing Pricing - Transparent, No Surprises | JurisPage",
  description: "See exactly what law firm SEO costs at JurisPage. Three clear plans starting at $1,497/month. No long-term contracts, no hidden fees, no guessing games.",
  alternates: { canonical: "https://jurispage.com/services/pricing/" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "What's included in each plan?", acceptedAnswer: { "@type": "Answer", text: "Launchpad ($1,497/month) covers everything a new firm needs to get online: a WordPress website live in 30 days, Google Business Profile setup, local SEO foundation, citation building, and branded email. Grow ($2,497/month) adds a full SEO campaign plus your choice of Google Ads management or a website redesign, monthly reporting, and ongoing GBP optimization. Dominate ($4,497/month) is full-service: SEO + Google Ads + content writing + GEO optimization, with bi-weekly strategy calls and a dedicated account team." } },
    { "@type": "Question", name: "Are there long-term contracts?", acceptedAnswer: { "@type": "Answer", text: "No. Every plan is month-to-month. You stay because the results are there, not because you signed a 12-month agreement." } },
    { "@type": "Question", name: "How long until I see results?", acceptedAnswer: { "@type": "Answer", text: "Most clients see measurable movement in rankings and traffic within 60 to 90 days. If you're not seeing results within 90 days, we work for free for the following month. No questions asked." } },
    { "@type": "Question", name: "What if I want to cancel?", acceptedAnswer: { "@type": "Answer", text: "Give us 30 days notice and you're done. We don't hold your website hostage, and we don't make cancellation difficult. Your domain, your content, your data - all yours." } },
    { "@type": "Question", name: "Do you work with all practice areas?", acceptedAnswer: { "@type": "Answer", text: "Yes. We work with personal injury, criminal defense, family law, immigration, estate planning, employment law, and more. If you practice it, we've likely marketed it." } },
    { "@type": "Question", name: "What's the difference between JurisPage and large agencies like Scorpion?", acceptedAnswer: { "@type": "Answer", text: "Scorpion owns your website. If you leave, it disappears. JurisPage builds assets you own. We also don't hide our pricing behind a sales process." } },
    { "@type": "Question", name: "Can I upgrade or downgrade my plan?", acceptedAnswer: { "@type": "Answer", text: "Yes. You can move between plans at any time with 30 days notice. Firms often start on Launchpad and move to Grow once they're established - we make that transition straightforward." } },
    { "@type": "Question", name: "Is there a setup fee?", acceptedAnswer: { "@type": "Answer", text: "Launchpad has a one-time $497 setup fee that covers website build and configuration. Grow and Dominate have no setup fees." } },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Law Firm Marketing by JurisPage",
  provider: { "@type": "Organization", name: "JurisPage", url: "https://jurispage.com" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Law Firm Marketing Plans",
    itemListElement: [
      { "@type": "Offer", name: "Launchpad", description: "Website, local SEO foundation, and Google Business Profile setup for new law firms.", priceSpecification: { "@type": "PriceSpecification", price: "1497", priceCurrency: "USD" } },
      { "@type": "Offer", name: "Grow", description: "SEO campaign plus Google Ads or website redesign for established firms.", priceSpecification: { "@type": "PriceSpecification", price: "2497", priceCurrency: "USD" } },
      { "@type": "Offer", name: "Dominate", description: "Full-service SEO, Google Ads, content writing, and GEO optimization.", priceSpecification: { "@type": "PriceSpecification", price: "4497", priceCurrency: "USD" } },
    ],
  },
};

const faqs = [
  { question: "What's included in each plan?", answer: "Launchpad covers everything a new firm needs to get online: WordPress website live in 30 days, Google Business Profile setup, local SEO foundation, citation building, and branded email. Grow adds a full SEO campaign plus your choice of Google Ads management or a website redesign, monthly reporting, and ongoing GBP optimization. Dominate is full-service: SEO, Google Ads, content writing, and GEO optimization (AI search visibility), with bi-weekly strategy calls and a dedicated account team." },
  { question: "Are there long-term contracts?", answer: "No. Every plan is month-to-month. You stay because the results are there, not because you signed a 12-month agreement. We've never believed in locking people in. If we're doing our job, you won't want to leave." },
  { question: "How long until I see results?", answer: "Most clients see measurable movement in rankings and traffic within 60 to 90 days. New websites and newer firms can take a bit longer to build authority. That's why we back it with a 90-day guarantee: if you're not seeing results, we work for free for the following month." },
  { question: "What if I want to cancel?", answer: "Give us 30 days notice and you're done. We don't hold your website hostage, and we don't make the process difficult. Your domain, your content, your data - all yours, always. We'll hand everything over cleanly." },
  { question: "Do you work with all practice areas?", answer: "Yes. We work with personal injury, criminal defense, family law, immigration, estate planning, employment law, business law, and more. Legal marketing has specific rules and sensitivities that general marketers miss - we've been doing this long enough to know the difference." },
  { question: "What's the difference between JurisPage and large agencies like Scorpion?", answer: "A few things. Scorpion owns your website - if you leave, it disappears. JurisPage builds assets you own. Large agencies also don't publish their pricing; you have to sit through a sales process before you learn what anything costs. We think that's a waste of your time." },
  { question: "Can I upgrade or downgrade my plan?", answer: "Yes. You can move between plans at any time with 30 days notice. Firms often start on Launchpad to get their foundation right, then move to Grow once they're established and ready to compete harder." },
  { question: "Is there a setup fee?", answer: "Launchpad has a one-time $497 setup fee. That covers the website build, DNS configuration, email setup, and getting all your accounts properly configured. Grow and Dominate have no setup fees at all." },
];

const plans = [
  {
    name: "Launchpad",
    forLabel: "For New & Startup Firms",
    price: "$1,497",
    sub: "+ one-time $497 website setup fee",
    desc: "Everything you need to open your doors online, fast.",
    features: [
      "WordPress website (live in 30 days)",
      "Google Business Profile setup & optimization",
      "Local SEO foundation",
      "Basic citation building (directories)",
      "Branded email setup",
    ],
    highlight: null,
    featured: false,
    badge: null,
  },
  {
    name: "Grow",
    forLabel: "For Established Firms",
    price: "$2,497",
    sub: "No setup fee",
    desc: "Steady case growth through SEO, paid ads, or a new website.",
    features: [
      "Full SEO campaign (on-page, technical, links)",
      "Your choice: Google Ads management OR website redesign",
      "Monthly performance reporting",
      "Ongoing GBP optimization",
    ],
    highlight: "Add-ons available: Email marketing · AI Chatbot · LSA management",
    featured: true,
    badge: "Most Popular",
  },
  {
    name: "Dominate",
    forLabel: "For Market Leaders",
    price: "$4,497",
    sub: "No setup fee",
    desc: "For firms ready to own their market and keep it.",
    features: [
      "Everything in Grow",
      "Google Ads management (included, not add-on)",
      "Monthly content writing (blog + practice pages)",
      "GEO optimization (AI search visibility)",
      "Bi-weekly strategy calls",
      "Dedicated account team + premium support",
    ],
    highlight: null,
    featured: false,
    badge: null,
  },
];

export default function PricingPage() {
  return (
    <>
      <SchemaOrg schema={[faqSchema, serviceSchema]} />

      {/* Hero */}
      <section className="py-20 px-6 text-center bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block text-xs font-heading font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5" style={{ background: "#EE6C13", color: "#ffffff" }}>Transparent Pricing</span>
          <h1 className="font-heading font-extrabold text-gray-900 text-5xl leading-tight mb-6">
            Law Firm Marketing Pricing.<br />No Smoke. No Mirrors.
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-4 max-w-2xl mx-auto">
            We publish our pricing because we&apos;re not afraid of scrutiny. Most law firm marketing agencies make you sit through a sales call before they&apos;ll tell you what anything costs. We think that&apos;s backwards.
          </p>
          <p className="text-gray-600 text-lg">Three plans. Month-to-month. Results in 90 days or we work for free.</p>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-6 px-6 border-b border-gray-100 bg-gray-50">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { val: "Month-to-Month", sub: "No long-term contracts" },
            { val: "90-Day Guarantee", sub: "Results or we work free" },
            { val: "You Own Everything", sub: "Your site, your data, always" },
            { val: "No Hidden Fees", sub: "Price shown is price paid" },
          ].map((item) => (
            <div key={item.val}>
              <div className="font-heading font-extrabold text-xl" style={{ color: "#EE6C13" }}>{item.val}</div>
              <div className="text-gray-500 text-xs mt-1">{item.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-heading font-extrabold text-gray-900 text-4xl mb-4">Choose Your Plan</h2>
            <p className="text-gray-600 text-lg max-w-xl mx-auto">All plans are month-to-month. Upgrade, downgrade, or cancel anytime with 30 days notice.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl overflow-hidden ${plan.featured ? "shadow-2xl" : "shadow-sm border border-gray-200"}`}
                style={plan.featured ? { border: "2px solid #EE6C13", background: "#1a1a1a" } : { background: "#fff" }}
              >
                {plan.badge && (
                  <div className="py-2.5 text-center text-xs font-extrabold uppercase tracking-widest" style={{ background: "linear-gradient(135deg, #EE6C13, #982A0B)", color: "#ffffff" }}>
                    {plan.badge}
                  </div>
                )}
                <div className="p-8">
                  <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${plan.featured ? "text-gray-400" : "text-gray-500"}`}>{plan.forLabel}</p>
                  <h3 className={`font-heading font-extrabold text-2xl mb-1 ${plan.featured ? "text-white" : "text-gray-900"}`}>{plan.name}</h3>
                  <p className={`text-sm mb-5 ${plan.featured ? "text-gray-400" : "text-gray-500"}`}>{plan.desc}</p>
                  <div className="mb-1">
                    <span className={`font-heading font-extrabold text-5xl ${plan.featured ? "text-white" : "text-gray-900"}`}>{plan.price}</span>
                    <span className={`text-base ml-1 ${plan.featured ? "text-gray-400" : "text-gray-500"}`}>/month</span>
                  </div>
                  <p className={`text-xs mb-7 ${plan.featured ? "text-gray-500" : "text-gray-400"}`}>{plan.sub}</p>
                  <Link
                    href="/contact/"
                    className="block text-center font-heading font-bold py-3.5 px-6 rounded-lg text-sm no-underline"
                    style={plan.featured ? { background: "linear-gradient(135deg, #EE6C13, #982A0B)", color: "#1a1a1a" } : { background: "#1a1a1a", color: "#fff" }}
                  >
                    Get Started
                  </Link>
                </div>
                <div className="px-8 pb-8 pt-0" style={plan.featured ? { background: "#1f2937" } : { background: "#f9fafb", borderTop: "1px solid #e5e7eb" }}>
                  <p className={`text-xs font-bold uppercase tracking-widest mt-6 mb-4 ${plan.featured ? "text-gray-500" : "text-gray-400"}`}>What&apos;s Included</p>
                  <ul className="space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className={`flex gap-3 items-start text-sm ${plan.featured ? "text-gray-300" : "text-gray-700"}`}>
                        <span className="flex-shrink-0 font-bold mt-0.5" style={{ color: "#EE6C13" }}>✓</span>
                        <span dangerouslySetInnerHTML={{ __html: f.replace(" OR ", " <em>or</em> ") }} />
                      </li>
                    ))}
                  </ul>
                  {plan.highlight && (
                    <div className="mt-4 p-3 rounded-lg text-xs" style={{ background: plan.featured ? "#1a1a1a" : "#f0fdf4", color: plan.featured ? "#EE6C13" : "#166534", border: `1px solid ${plan.featured ? "#EE6C1333" : "#bbf7d0"}` }}>
                      <strong>{plan.featured ? "Available Add-Ons" : ""}</strong>{plan.featured ? " · " : ""}{plan.highlight}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl text-center mb-3">Plan Comparison</h2>
          <p className="text-gray-500 text-center mb-10">See exactly what&apos;s included in each plan side by side.</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse font-heading text-sm">
              <thead>
                <tr style={{ background: "#1a1a1a" }}>
                  <th className="text-left p-4 text-white font-semibold">Feature</th>
                  <th className="text-center p-4 text-white font-semibold">Launchpad<br /><span className="text-xs font-normal text-gray-400">$1,497/mo</span></th>
                  <th className="text-center p-4 font-bold" style={{ background: "#1f2937", color: "#EE6C13" }}>Grow<br /><span className="text-xs font-normal text-gray-400">$2,497/mo</span></th>
                  <th className="text-center p-4 text-white font-semibold">Dominate<br /><span className="text-xs font-normal text-gray-400">$4,497/mo</span></th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["WordPress Website", "✓", "Add-on", "✓"],
                  ["Google Business Profile", "✓", "✓", "✓"],
                  ["Local SEO Foundation", "✓", "✓", "✓"],
                  ["Full SEO Campaign", "—", "✓", "✓"],
                  ["Google Ads Management", "—", "Choose this or redesign", "✓"],
                  ["Content Writing", "—", "—", "✓"],
                  ["GEO / AI Search Optimization", "—", "—", "✓"],
                  ["Monthly Reporting", "—", "✓", "✓"],
                  ["Strategy Calls", "—", "Monthly", "Bi-weekly"],
                  ["Dedicated Account Team", "—", "—", "✓"],
                  ["Long-term Contract Required", "No", "No", "No"],
                ].map(([feature, l, g, d], i) => (
                  <tr key={feature} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="p-4 text-gray-700 font-medium border-b border-gray-100">{feature}</td>
                    {[l, g, d].map((val, j) => (
                      <td key={j} className={`text-center p-4 border-b border-gray-100 ${val === "✓" ? "text-green-600 font-bold text-lg" : val === "—" ? "text-gray-300 text-xl" : "text-gray-600 text-xs"}`}>{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Competitor Comparison */}
      <section className="py-20 px-6" style={{ background: "#1a1a1a" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-extrabold text-white text-3xl text-center mb-3">JurisPage vs. The Big Agencies</h2>
          <p className="text-gray-400 text-center mb-10">This isn&apos;t a knock on anyone. It&apos;s a factual look at how we&apos;re different.</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th className="text-left p-4 text-gray-400 font-semibold text-xs uppercase tracking-widest border-b border-gray-700"> </th>
                  <th className="text-center p-4 font-bold border-b border-gray-700" style={{ color: "#EE6C13" }}>JurisPage</th>
                  <th className="text-center p-4 text-gray-400 font-semibold border-b border-gray-700">Large Agencies<br /><span className="text-xs font-normal">(e.g., Scorpion, Martindale)</span></th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Pricing published publicly", { v: "Yes", color: "#EE6C13" }, { v: "No - requires sales call", color: "#ef4444" }],
                  ["You own your website", { v: "Always", color: "#EE6C13" }, { v: "Often no - site disappears if you leave", color: "#ef4444" }],
                  ["Long-term contract", { v: "No", color: "#EE6C13" }, { v: "Typically 12-month minimum", color: "#ef4444" }],
                  ["Dedicated point of contact", { v: "Yes, from day one", color: "#EE6C13" }, { v: "After onboarding, often rotates", color: "#fbbf24" }],
                  ["Specializes in law firms only", { v: "Yes", color: "#EE6C13" }, { v: "Varies", color: "#fbbf24" }],
                ].map(([feature, jp, la], i) => (
                  <tr key={feature as string} style={{ background: i % 2 === 0 ? "#1f2937" : "#1a1a1a" }}>
                    <td className="p-4 text-gray-300 border-b border-gray-800">{feature as string}</td>
                    <td className="text-center p-4 font-bold border-b border-gray-800" style={{ color: (jp as { v: string; color: string }).color }}>{(jp as { v: string; color: string }).v}</td>
                    <td className="text-center p-4 border-b border-gray-800" style={{ color: (la as { v: string; color: string }).color }}>{(la as { v: string; color: string }).v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 90-Day Guarantee */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-5">The 90-Day Guarantee</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-4">Most law firm SEO agencies ask you to wait 6 to 12 months before judging results. We don&apos;t. If you&apos;re not seeing measurable movement in your rankings, traffic, or leads within 90 days, we work for free for the following month.</p>
          <p className="text-gray-500">No fine print. No arguing over definitions. We either perform or we earn it back.</p>
        </div>
      </section>

      <FAQAccordion faqs={faqs} heading="Pricing Questions, Answered" />

      {/* Bottom CTA */}
      <section className="py-12 px-6 text-center" style={{ background: "linear-gradient(135deg, #EE6C13, #982A0B)" }}>
        <div className="max-w-3xl mx-auto">
          <p className="font-heading font-extrabold text-white text-xl mb-4">No long-term contracts. No hidden fees. No surprises.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact/" className="inline-block bg-white font-heading font-bold py-4 px-8 rounded-[40px] no-underline" style={{ color: "#982A0B" }}>Let&apos;s Talk Growth</Link>
            <a href="tel:+18887677447" className="inline-block border-2 border-white text-white font-heading font-bold py-4 px-8 rounded-[40px] no-underline">(888) 767-7447</a>
          </div>
        </div>
      </section>
    </>
  );
}
