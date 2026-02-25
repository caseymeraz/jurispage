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
  { question: "Is there a setup fee for law firm SEO?", answer: "Some agencies charge a one-time setup fee (typically $500–$2,000) that covers the initial audit, keyword research, and onboarding. Others roll these into the monthly rate. At JurisPage, our Launchpad plan has a $497 one-time setup fee; Grow and Dominate have no setup fees." },
  { question: "How do I know if I'm paying a fair price for law firm SEO?", answer: "Ask for a specific list of deliverables: what gets published each month, how many links are built, what technical work gets done, and exactly how results are measured. If an agency gives vague answers or only shows traffic graphs in reporting, you're likely not getting value for the cost." },
  { question: "Is law firm SEO worth the cost?", answer: "Yes, for most law firms. The cost per acquired client through SEO is significantly lower than paid advertising over time, and unlike PPC, rankings compound. A single PI case paying $50,000+ makes even several months of SEO investment trivially justified. The ROI question is really 'how long until I recoup the cost' — for most practices, the answer is 6-18 months." },
];

export default function LawFirmSEOCostPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />

      <section className="bg-gray-900 py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <nav className="text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-white no-underline">Home</Link> / <span className="text-gray-300">Law Firm SEO Cost</span>
          </nav>
          <h1 className="font-heading font-extrabold text-white text-4xl mb-4">How Much Does Law Firm SEO Cost in 2026?</h1>
          <p className="text-gray-300 text-lg">The honest, complete guide to law firm SEO pricing — with no sales agenda.</p>
        </div>
      </section>

      <article className="py-12 px-6">
        <div className="max-w-3xl mx-auto prose prose-lg prose-gray max-w-none">
          <p>Law firm SEO costs typically range from <strong>$1,500 to $10,000+ per month</strong>. That&apos;s a wide range — and understanding why it varies is more useful than a single number.</p>

          <h2>What Drives Law Firm SEO Costs</h2>
          <p>Three main factors determine what you&apos;ll pay:</p>
          <ol>
            <li><strong>Market competitiveness</strong> — A solo bankruptcy attorney in a mid-size city needs significantly less investment than a PI firm competing in Manhattan.</li>
            <li><strong>Practice area</strong> — Personal injury and mass tort SEO require more aggressive link building and content velocity than estate planning or immigration.</li>
            <li><strong>Scope of work</strong> — A basic local SEO package costs less than a full-service engagement including content creation, technical SEO, link building, and GBP management.</li>
          </ol>

          <h2>Law Firm SEO Cost Ranges by Tier (2026)</h2>
          <div className="overflow-x-auto my-6">
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "15px" }}>
              <thead>
                <tr style={{ background: "#111827", color: "#fff" }}>
                  <th style={{ padding: "12px 16px", textAlign: "left", border: "1px solid #374151" }}>Tier</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", border: "1px solid #374151" }}>Monthly Cost</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", border: "1px solid #374151" }}>Best For</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", border: "1px solid #374151" }}>Typical Deliverables</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { tier: "Foundational", cost: "$1,500–$3,000", best: "Solo attorneys, small firms, less competitive markets", items: "GBP optimization, citations, basic on-page, local keyword targeting" },
                  { tier: "Growth", cost: "$3,000–$5,000", best: "Established small/mid firms in moderate competition", items: "Full SEO campaign, content creation, link building, monthly reporting" },
                  { tier: "Aggressive", cost: "$5,000–$10,000+", best: "PI firms, major metro markets, multi-location firms", items: "High-volume content, aggressive link building, competitive keyword domination" },
                  { tier: "Enterprise", cost: "$10,000+/month", best: "Mass tort, large PI firms in top markets", items: "Dedicated team, daily publishing, authority campaigns, PR-level coverage" },
                ].map((row, i) => (
                  <tr key={row.tier} style={{ background: i % 2 === 0 ? "#f9fafb" : "#fff" }}>
                    <td style={{ padding: "12px 16px", border: "1px solid #e5e7eb", fontWeight: 600 }}>{row.tier}</td>
                    <td style={{ padding: "12px 16px", border: "1px solid #e5e7eb", fontWeight: 700 }}>{row.cost}</td>
                    <td style={{ padding: "12px 16px", border: "1px solid #e5e7eb" }}>{row.best}</td>
                    <td style={{ padding: "12px 16px", border: "1px solid #e5e7eb", fontSize: "13px" }}>{row.items}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>What&apos;s Included in Law Firm SEO</h2>
          <p>A complete law firm SEO engagement should include:</p>
          <ul>
            <li><strong>Technical SEO</strong> — Site speed, Core Web Vitals, indexation, structured data</li>
            <li><strong>On-page optimization</strong> — Title tags, meta descriptions, heading structure, internal linking</li>
            <li><strong>Content creation</strong> — Practice area pages, blog posts, FAQ content, location pages</li>
            <li><strong>Link building</strong> — Backlinks from legal directories, local organizations, and relevant publications</li>
            <li><strong>Google Business Profile management</strong> — Optimization, review management, post publishing</li>
            <li><strong>Monthly reporting</strong> — Specific to rankings, traffic, and lead flow — not just vanity metrics</li>
          </ul>

          <h2>What You Should NOT Pay For</h2>
          <ul>
            <li><strong>Guaranteed rankings</strong> — No ethical agency makes this promise. It&apos;s a red flag.</li>
            <li><strong>Your own website being held hostage</strong> — You should always own your website and content.</li>
            <li><strong>Vague &quot;optimization&quot; with no specific deliverables</strong> — Ask exactly what&apos;s done each month.</li>
            <li><strong>Multi-year contracts for a new relationship</strong> — A 24-month commitment to an agency you&apos;ve never worked with is a significant financial risk.</li>
          </ul>

          <h2>JurisPage Pricing: What We Charge</h2>
          <p>We publish our pricing because we think opacity in this industry is a problem. Here&apos;s what we charge:</p>
          <ul>
            <li><strong>Launchpad</strong> — $1,497/month + $497 one-time setup fee</li>
            <li><strong>Grow</strong> — $2,497/month, no setup fee</li>
            <li><strong>Dominate</strong> — $4,497/month, no setup fee</li>
          </ul>
          <p>All plans are month-to-month. <Link href="/services/pricing/" style={{ color: "#14EEEE" }}>See full plan details →</Link></p>
        </div>
      </article>

      <FAQAccordion faqs={faqs} heading="Law Firm SEO Cost: FAQs" />

      <CTASection
        heading="Get a Free Law Firm SEO Audit"
        subtext="Tell us about your firm and market. We'll review your current SEO and tell you exactly what it would take to compete — no obligation."
        primaryLabel="Get My Free Audit"
        primaryHref="/contact/"
        secondaryLabel="See Pricing"
        secondaryHref="/services/pricing/"
      />
    </>
  );
}
