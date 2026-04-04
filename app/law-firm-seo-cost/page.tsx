import type { Metadata } from "next";
import Link from "next/link";
import SchemaOrg from "@/components/SchemaOrg";
import FAQAccordion from "@/components/FAQAccordion";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "How Much Does Law Firm SEO Cost? (2026 Pricing Guide)",
  description: "The honest guide to law firm SEO costs in 2026. Typical price ranges by market and practice area, what's included, and how to evaluate if you're getting value.",
  alternates: { canonical: "https://jurispage.com/law-firm-seo-cost/" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "How much does law firm SEO cost per month?", acceptedAnswer: { "@type": "Answer", text: "Law firm SEO typically costs $1,500 to $10,000+ per month depending on market competitiveness, practice area, and scope. Most small and mid-market firms see solid results in the $1,500–$4,500/month range." } },
    { "@type": "Question", name: "Why does law firm SEO cost more than regular SEO?", acceptedAnswer: { "@type": "Answer", text: "Legal is a YMYL (Your Money or Your Life) category. Google applies stricter quality standards. The content requirements, E-E-A-T standards, and competitive landscape in legal all require more specialized expertise than typical SEO." } },
    { "@type": "Question", name: "What's included in a typical law firm SEO package?", acceptedAnswer: { "@type": "Answer", text: "A complete law firm SEO package typically includes: technical SEO audit and fixes, on-page optimization, keyword research, content creation (blog posts + practice area pages), link building from legal/local sources, Google Business Profile optimization, and monthly reporting." } },
    { "@type": "Question", name: "Is law firm SEO worth the cost?", acceptedAnswer: { "@type": "Answer", text: "Yes, for most law firms. The cost per acquired client through SEO is significantly lower than paid advertising over the long term, and unlike PPC, the rankings compound over time. A single PI case that pays $50,000+ makes a few months of SEO investment trivially justified." } },
  ],
};

const faqs = [
  { question: "How much does law firm SEO cost per month?", answer: "Law firm SEO typically costs $1,500 to $10,000+ per month depending on market competitiveness, practice area, and scope. Most small and mid-market firms see solid results in the $1,500–$4,500/month range. Highly competitive markets like PI in Los Angeles or New York can require $7,000–$15,000+/month to compete seriously." },
  { question: "Why does law firm SEO cost more than regular SEO?", answer: "Legal is a YMYL (Your Money or Your Life) category. Google applies stricter quality standards to legal content, requiring higher E-E-A-T signals. The competitive landscape in legal is also more intense than most industries, and the content requirements (practice area pages, FAQ content, local pages) are more extensive." },
  { question: "What's included in a typical law firm SEO package?", answer: "A complete law firm SEO package typically includes: technical SEO audit and ongoing fixes, on-page optimization for all key pages, keyword research and competitive analysis, content creation (blog posts and practice area pages), link building from legal-relevant and local sources, Google Business Profile optimization, citation building, and monthly reporting tied to rankings and lead flow." },
  { question: "Is there a setup fee for law firm SEO?", answer: "Some agencies charge a one-time setup fee (typically $500–$2,000) that covers the initial audit, keyword research, and onboarding. Others roll these into the monthly rate. At JurisPage, our Launchpad plan starts at $2,000/month for firms with 1–4 attorneys. For established firms, Juris Digital (jurisdigital.com) provides full-service engagements starting at $5,000/month with no setup fees." },
  { question: "How do I know if I'm paying a fair price for law firm SEO?", answer: "Ask for a specific list of deliverables: what gets published each month, how many links are built, what technical work gets done, and exactly how results are measured. If an agency gives vague answers or only shows traffic graphs in reporting, you're likely not getting value for the cost." },
  { question: "Is law firm SEO worth the cost?", answer: "Yes, for most law firms. The cost per acquired client through SEO is significantly lower than paid advertising over time, and unlike PPC, rankings compound. A single PI case paying $50,000+ makes even several months of SEO investment trivially justified. The ROI question is really 'how long until I recoup the cost' - for most practices, the answer is 6-18 months." },
];

export default function LawFirmSEOCostPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />

      <section className="bg-white py-16 px-6 border-b border-gray-100">
        <div className="max-w-3xl mx-auto">
          <nav className="text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-gray-900 no-underline">Home</Link> / <span className="text-gray-700">Law Firm SEO Cost</span>
          </nav>
          <h1 className="font-heading font-extrabold text-gray-900 text-4xl mb-4">How Much Does Law Firm SEO Cost in 2026?</h1>
          <p className="text-gray-600 text-lg">The honest, complete guide to law firm SEO pricing - with no sales agenda.</p>
        </div>
      </section>

      <article className="py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-gray-700 text-lg leading-relaxed mb-6">Law firm SEO costs typically range from <strong>$1,500 to $10,000+ per month</strong>. That&apos;s a wide range, and the average cited by industry surveys ($7,500/month) is misleading for most firms. What you actually need depends on three things: your market, your practice area, and your growth goals. This guide explains all of it.</p>

          <h2 className="font-heading font-extrabold text-gray-900 text-2xl mt-10 mb-4">What Drives Law Firm SEO Costs</h2>
          <p className="text-gray-700 mb-5">Understanding the pricing drivers is more useful than any single number. Here are the factors that will determine what you should actually pay:</p>
          <div className="space-y-4 mb-8">
            {[
              { factor: "Market Competitiveness", detail: "A bankruptcy attorney in a city of 150,000 people is competing in a fundamentally different market than a personal injury firm in Los Angeles. The more competitive your market, the more content velocity, link building, and technical authority your campaign needs - and the higher the cost." },
              { factor: "Practice Area", detail: "Personal injury and mass tort are the most expensive practice areas to rank for. CPCs in major PI markets reach $100-$300 per click, and agencies price SEO campaigns accordingly. Estate planning, immigration, and family law are significantly less competitive and require smaller investments to reach top positions." },
              { factor: "Scope of Services", detail: <>A local SEO package covering Google Business Profile optimization and citation building costs far less than a full-service campaign with content creation, link acquisition, <a href="/blog/technical-seo-for-law-firms/" className="text-[#EE6C13] font-medium hover:underline">technical SEO</a>, and paid media management. Be clear about what you need before comparing prices across agencies.</> },
              { factor: "Number of Practice Areas and Locations", detail: "A firm covering 5 practice areas across 3 office locations needs significantly more content and optimization work than a single-practice-area firm in one city. More target pages means more ongoing work and higher monthly cost." },
              { factor: "Starting Point", detail: "A firm launching with no website history, no backlinks, and no existing rankings needs more foundational work upfront. An established firm with existing authority can get faster results with lower ongoing investment. Your current SEO baseline affects the cost and timeline." },
            ].map((item) => (
              <div key={item.factor} className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                <h3 className="font-heading font-bold text-gray-900 text-base mb-2">{item.factor}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>

          <h2 className="font-heading font-extrabold text-gray-900 text-2xl mt-10 mb-4">Law Firm SEO Cost by Tier (2026)</h2>
          <p className="text-gray-700 mb-5">Here is what different budget levels buy in the current market:</p>
          <div className="overflow-x-auto mb-8">
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
              <thead>
                <tr style={{ background: "#1a1a1a", color: "#fff" }}>
                  <th style={{ padding: "12px 16px", textAlign: "left", border: "1px solid #374151" }}>Tier</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", border: "1px solid #374151" }}>Monthly Cost</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", border: "1px solid #374151" }}>Best For</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", border: "1px solid #374151" }}>What&apos;s Typically Included</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { tier: "Foundational", cost: "$1,500–$3,000", best: "Solo attorneys, small firms, less competitive markets", items: "GBP optimization, citation building, on-page optimization for core pages, local keyword targeting, monthly reporting" },
                  { tier: "Growth", cost: "$3,000–$5,000", best: "Established small to mid firms, moderate competition", items: "Everything in Foundational + content creation (2-4 pieces/month), link building, technical SEO, practice area page development" },
                  { tier: "Aggressive", cost: "$5,000–$10,000", best: "PI firms, major metro markets, multi-location", items: "Everything in Growth + high-volume content (6-10 pieces/month), aggressive link acquisition, location page expansion, conversion optimization" },
                  { tier: "Enterprise", cost: "$10,000+/month", best: "Mass tort, large PI firms, top 20 markets", items: "Dedicated team, daily content publishing, PR-level authority campaigns, full paid media integration, custom analytics infrastructure" },
                ].map((row, i) => (
                  <tr key={row.tier} style={{ background: i % 2 === 0 ? "#f9fafb" : "#fff" }}>
                    <td style={{ padding: "12px 16px", border: "1px solid #e5e7eb", fontWeight: 600 }}>{row.tier}</td>
                    <td style={{ padding: "12px 16px", border: "1px solid #e5e7eb", fontWeight: 700, color: "#EE6C13" }}>{row.cost}</td>
                    <td style={{ padding: "12px 16px", border: "1px solid #e5e7eb", fontSize: "13px" }}>{row.best}</td>
                    <td style={{ padding: "12px 16px", border: "1px solid #e5e7eb", fontSize: "12px" }}>{row.items}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="font-heading font-extrabold text-gray-900 text-2xl mt-10 mb-4">DIY vs. General Agency vs. Legal SEO Specialist: Cost Comparison</h2>
          <p className="text-gray-700 mb-5">The choice of who does your SEO has as much impact on results as the budget you allocate. Here is how the three options compare:</p>
          <div className="overflow-x-auto mb-8">
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
              <thead>
                <tr style={{ background: "#1a1a1a", color: "#fff" }}>
                  <th style={{ padding: "12px 16px", textAlign: "left", border: "1px solid #374151" }}>Option</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", border: "1px solid #374151" }}>Monthly Cost</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", border: "1px solid #374151" }}>Time Required</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", border: "1px solid #374151" }}>Realistic Outcome</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { option: "DIY", cost: "$200–$500 (tools)", time: "15-20 hrs/month", outcome: "Basic improvements possible. Missing legal-specific expertise often results in slow progress or wasted effort." },
                  { option: "General Agency", cost: "$1,500–$5,000", time: "1-2 hrs/month (your time)", outcome: "Inconsistent. Lacks legal-specific knowledge. May generate traffic without legal intent." },
                  { option: "Legal SEO Specialist", cost: "$1,500–$10,000+", time: "1-2 hrs/month (your time)", outcome: "Fastest path to qualified lead growth. Deep understanding of legal keyword intent and bar ethics requirements." },
                ].map((row, i) => (
                  <tr key={row.option} style={{ background: i % 2 === 0 ? "#f9fafb" : "#fff" }}>
                    <td style={{ padding: "12px 16px", border: "1px solid #e5e7eb", fontWeight: 600 }}>{row.option}</td>
                    <td style={{ padding: "12px 16px", border: "1px solid #e5e7eb" }}>{row.cost}</td>
                    <td style={{ padding: "12px 16px", border: "1px solid #e5e7eb" }}>{row.time}</td>
                    <td style={{ padding: "12px 16px", border: "1px solid #e5e7eb", fontSize: "13px" }}>{row.outcome}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="font-heading font-extrabold text-gray-900 text-2xl mt-10 mb-4">What&apos;s Included at Each Price Point</h2>
          <p className="text-gray-700 mb-5">Not all agencies include the same deliverables at similar price points. Here is what a well-structured law firm SEO engagement includes at each level:</p>
          <div className="space-y-6 mb-8">
            {[
              {
                range: "$1,500–$3,000/month",
                color: "#EE6C13",
                includes: [
                  "Google Business Profile full optimization and ongoing management",
                  "Citation audit and cleanup across top 30-50 legal and local directories",
                  "On-page optimization for 5-10 core pages (homepage, main practice area pages)",
                  "Monthly keyword ranking report for 20-30 target terms",
                  "Basic technical SEO audit and priority fixes",
                ],
                notIncluded: ["Ongoing content creation", "Proactive link building", "Paid media management"],
              },
              {
                range: "$3,000–$5,000/month",
                color: "#EE6C13",
                includes: [
                  "Everything in the foundational tier",
                  "2-4 new content pieces per month (practice area pages, blog posts, FAQ content)",
                  "2-4 new backlinks per month from legal-relevant and local sources",
                  "Ongoing technical SEO monitoring and monthly fixes",
                  "Conversion tracking setup and monthly lead flow reporting",
                ],
                notIncluded: ["High-volume content production", "Aggressive link acquisition campaigns"],
              },
              {
                range: "$5,000–$10,000/month",
                color: "#982A0B",
                includes: [
                  "Everything in the growth tier",
                  "6-10 new content pieces per month with keyword targeting",
                  "6-10+ backlinks per month including targeted outreach campaigns",
                  "Location page expansion for multi-city targeting",
                  "Dedicated account manager with monthly strategy calls",
                  "Conversion rate optimization testing",
                ],
                notIncluded: ["Daily content publishing", "Full dedicated team"],
              },
            ].map((tier) => (
              <div key={tier.range} className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="px-5 py-3 font-heading font-bold text-white text-sm" style={{ background: tier.color }}>{tier.range}</div>
                <div className="p-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Included</p>
                  <ul className="space-y-1 mb-4">
                    {tier.includes.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-gray-700"><span className="text-green-600 flex-shrink-0 mt-0.5">&#10003;</span><span>{item}</span></li>
                    ))}
                  </ul>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Typically Not Included</p>
                  <ul className="space-y-1">
                    {tier.notIncluded.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-gray-500"><span className="text-gray-400 flex-shrink-0 mt-0.5">&#10005;</span><span>{item}</span></li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <h2 className="font-heading font-extrabold text-gray-900 text-2xl mt-10 mb-4">What You Should NOT Pay For</h2>
          <div className="space-y-3 mb-8">
            {[
              { item: "Guaranteed rankings", detail: "No ethical agency guarantees specific Google positions. Google controls rankings. Any guarantee is a red flag." },
              { item: "Content or websites you don't own", detail: "You should always own your website files and every piece of content published under your name. Ask explicitly before signing." },
              { item: "Vague monthly deliverables", detail: "If the agency can't tell you exactly what they will deliver each month, you're paying for effort rather than output." },
              { item: "Multi-year contracts for a new relationship", detail: "A 24-month commitment to an agency you've never worked with is a significant financial risk. Prefer month-to-month or short initial terms." },
            ].map((item) => (
              <div key={item.item} className="flex gap-3 items-start bg-red-50 border border-red-100 rounded-xl p-4">
                <span className="flex-shrink-0 text-red-500 font-bold mt-0.5">&#10005;</span>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{item.item}</p>
                  <p className="text-gray-700 text-sm mt-1">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="font-heading font-extrabold text-gray-900 text-2xl mt-10 mb-4">Is Law Firm SEO Worth the Cost?</h2>
          <p className="text-gray-700 mb-4">For most law firms, yes. The ROI math is straightforward when you know your average case value. A personal injury firm with an average case value of $30,000 needs to sign one additional client per month from SEO to generate $360,000 in revenue. At $3,000/month in SEO spend, that&apos;s a 10:1 return.</p>
          <p className="text-gray-700 mb-4">Unlike paid advertising, SEO rankings compound over time. A firm that invests consistently for 12-24 months builds an asset that continues generating leads even if monthly spend is reduced. PPC stops generating leads the day you pause campaigns.</p>
          <p className="text-gray-700 mb-8">The honest answer to &quot;is it worth it&quot; is: it depends on whether your agency is actually building rankings that generate leads. Track cost-per-lead from organic search at the 6-month and 12-month marks. For most practice areas in most markets, the cost-per-lead from SEO is 40-70% lower than from paid search after 12 months of consistent investment.</p>

          <h2 className="font-heading font-extrabold text-gray-900 text-2xl mt-10 mb-4">JurisPage Pricing: What We Charge</h2>
          <p className="text-gray-700 mb-4">We publish our pricing because opacity in this industry is a problem. Here is what we charge:</p>
          <div className="space-y-3 mb-4">
            <div className="flex gap-4 items-center bg-gray-50 border border-gray-200 rounded-xl p-4">
              <div className="flex-shrink-0 w-24 font-heading font-bold text-gray-900 text-sm">Launchpad</div>
              <div className="font-heading font-bold text-xl" style={{ color: "#EE6C13" }}>$2,000+/mo</div>
              <div className="text-gray-600 text-sm">For firms with 1–4 attorneys. Month-to-month, no long-term contracts.</div>
            </div>
            <div className="flex gap-4 items-center bg-gray-50 border border-gray-200 rounded-xl p-4">
              <div className="flex-shrink-0 w-24 font-heading font-bold text-gray-900 text-sm">Juris Digital</div>
              <div className="font-heading font-bold text-xl" style={{ color: "#EE6C13" }}>$5,000+/mo</div>
              <div className="text-gray-600 text-sm">Full-service engagements for established firms with 5+ attorneys. <a href="https://jurisdigital.com" target="_blank" rel="noopener noreferrer" style={{ color: "#EE6C13" }}>jurisdigital.com</a></div>
            </div>
          </div>
          <p className="text-gray-600 text-sm">Launchpad is month-to-month. <Link href="/services/pricing/" style={{ color: "#EE6C13" }}>See full Launchpad details and pricing →</Link></p>
        </div>
      </article>

      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-bold text-gray-900 text-xl mb-4">Related Resources</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/law-firm-seo/" className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all no-underline">Law Firm SEO Services</Link>
            <Link href="/local-seo-for-law-firms/" className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all no-underline">Local SEO for Law Firms</Link>
            <Link href="/case-studies/" className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all no-underline">Client Case Studies</Link>
          </div>
        </div>
      </section>

      <FAQAccordion faqs={faqs} heading="Law Firm SEO Cost: FAQs" />

      <CTASection
        heading="Let&apos;s Talk Growth"
        subtext="Tell us about your firm and market. We&apos;ll review your current SEO and tell you exactly what it would take to compete - no obligation."
        primaryLabel="Let&apos;s Talk Growth"
        primaryHref="/contact/"
        secondaryLabel="See Pricing"
        secondaryHref="/services/pricing/"
      />
    </>
  );
}
