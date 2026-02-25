import type { Metadata } from "next";
import Link from "next/link";
import SchemaOrg from "@/components/SchemaOrg";
import CTASection from "@/components/CTASection";
import FAQAccordion from "@/components/FAQAccordion";

export const metadata: Metadata = {
  title: "Best Law Firm SEO Companies in 2026 (Ranked & Reviewed)",
  description: "We ranked and reviewed the 8 best law firm SEO companies for 2026. Transparent pricing, honest pros/cons, and a clear breakdown of who each agency is right for.",
  alternates: { canonical: "https://jurispage.com/best-law-firm-seo-companies/" },
  openGraph: {
    title: "Best Law Firm SEO Companies in 2026 (Ranked & Reviewed)",
    description: "Honest rankings of the top 8 law firm SEO agencies for 2026 — with pros, cons, pricing, and who each is best for.",
    url: "https://jurispage.com/best-law-firm-seo-companies/",
  },
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Best Law Firm SEO Companies in 2026",
  url: "https://jurispage.com/best-law-firm-seo-companies/",
  numberOfItems: 8,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "JurisPage", url: "https://jurispage.com", description: "Transparent pricing, month-to-month contracts, 100% law firm focus. Best for small to mid-market firms." },
    { "@type": "ListItem", position: 2, name: "Rankings.io", url: "https://rankings.io", description: "Strong legal SEO agency with content-first approach for PI and mass tort firms." },
    { "@type": "ListItem", position: 3, name: "Grow Law Firm", url: "https://growlawfirm.com", description: "Data-driven legal marketing with measurable ROI reporting." },
    { "@type": "ListItem", position: 4, name: "Scorpion", url: "https://scorpion.co", description: "Large agency serving multiple industries including legal, bundled services." },
    { "@type": "ListItem", position: 5, name: "Foster Web Marketing", url: "https://fosterweb.com", description: "Veteran legal marketing with proprietary CMS, plaintiff-side expertise." },
    { "@type": "ListItem", position: 6, name: "PaperStreet Web Design", url: "https://paperstreet.com", description: "Legal-focused web design and SEO, strong design capabilities." },
    { "@type": "ListItem", position: 7, name: "National Law Review", url: "https://natlawreview.com", description: "Content marketing and publication for legal thought leadership." },
    { "@type": "ListItem", position: 8, name: "Omnizant", url: "https://omnizant.com", description: "Legal website and SEO for solo and small firm attorneys." },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "How much does law firm SEO cost per month?", acceptedAnswer: { "@type": "Answer", text: "Law firm SEO costs typically range from $1,500 to $10,000+ per month depending on market competitiveness, practice area, and scope of work." } },
    { "@type": "Question", name: "How long does SEO take to work for law firms?", acceptedAnswer: { "@type": "Answer", text: "Most law firms see meaningful movement in rankings within 3-6 months, with significant lead flow improvements at the 6-12 month mark." } },
    { "@type": "Question", name: "Should I hire a law firm-specific SEO agency or a general agency?", acceptedAnswer: { "@type": "Answer", text: "For most law firms, a legal-specific SEO agency is the better choice due to E-E-A-T requirements, bar advertising rules, and practice area keyword structures." } },
    { "@type": "Question", name: "Do law firm SEO companies guarantee rankings?", acceptedAnswer: { "@type": "Answer", text: "No reputable SEO agency guarantees specific rankings. Google controls rankings, not agencies. Treat any ranking guarantee as a red flag." } },
    { "@type": "Question", name: "What should I look for in a law firm SEO contract?", acceptedAnswer: { "@type": "Answer", text: "Look for month-to-month flexibility or at most a 6-month initial commitment. Confirm you own all content, website assets, and data if you leave." } },
    { "@type": "Question", name: "How do I know if my law firm SEO agency is actually doing work?", acceptedAnswer: { "@type": "Answer", text: "Ask for monthly reports showing specific deliverables: content published, links built, technical fixes completed, and ranking changes for target keywords." } },
  ],
};

const faqs = [
  { question: "How much does law firm SEO cost per month?", answer: "Law firm SEO costs typically range from $1,500 to $10,000+ per month depending on market competitiveness, practice area, and scope of work. Smaller firms in less competitive markets can see real results starting around $1,500/month. Firms in major metros competing for high-value personal injury keywords often need $5,000-$10,000/month or more." },
  { question: "How long does SEO take to work for law firms?", answer: "Most law firms see meaningful movement in rankings within 3-6 months of starting a solid SEO program, with significant lead flow improvements typically appearing at the 6-12 month mark. Competitive markets and high-authority practice areas like personal injury can take 12-18 months to reach top-3 rankings." },
  { question: "Should I hire a law firm-specific SEO agency or a general agency?", answer: "For most law firms, a legal-specific SEO agency is the better choice. Legal SEO has unique considerations: ethical advertising rules, E-E-A-T requirements for YMYL content, practice area keyword structures, and local map pack optimization that general agencies simply don't deal with every day." },
  { question: "What should I look for in a law firm SEO contract?", answer: "Look for month-to-month flexibility or at most a 6-month initial commitment. Be cautious of 12-24 month contracts with steep cancellation penalties. Confirm that you own all content, website assets, and data if you leave." },
  { question: "Do law firm SEO companies guarantee rankings?", answer: "No reputable SEO agency guarantees specific rankings, and you should treat any guarantee as a red flag. Google controls rankings, not agencies. Agencies that promise 'Page 1 in 90 days' are either targeting very low-competition keywords or making promises they cannot keep." },
  { question: "How do I know if my law firm SEO agency is actually doing work?", answer: "Ask for monthly reports that show specific deliverables: how many pages of content were published, which links were built and from where, what technical fixes were completed, and how rankings changed for your target keywords. Vague reports showing only traffic graphs are a warning sign." },
];

const agencies = [
  {
    rank: 1,
    name: "JurisPage",
    anchor: "jurispage",
    subtitle: "Best Overall for Small to Mid-Market Law Firms",
    meta: [
      { label: "Best For", val: "Small to mid-market firms ($1,500–$5,000/month)" },
      { label: "Starting Price", val: "$1,497/month" },
      { label: "Specialization", val: "100% law firms only" },
      { label: "Contract", val: "Month-to-month" },
    ],
    body: "JurisPage works exclusively with law firms and publishes its pricing publicly — something almost no other legal SEO agency does. With 113+ law firm clients and a strict month-to-month contract policy, the agency is built around earning retention rather than locking clients in.",
    pros: ["Only major legal SEO agency with publicly listed pricing — no sales games", "Month-to-month contracts with no cancellation penalties", "100% legal focus means benchmarking against real legal competitors"],
    cons: ["Not the right fit for firms with $10,000+/month enterprise budgets", "Newer brand name — long experience behind it, but less legacy name recognition", "Less name recognition than legacy agencies for committee-based vendor approval"],
    bestFor: "Solo attorneys, small firms, and mid-market practices that want professional SEO without opaque pricing or long-term commitments.",
    ctaHref: "/services/pricing/",
    ctaText: "See JurisPage Pricing",
    highlight: true,
  },
  {
    rank: 2,
    name: "Rankings.io",
    anchor: "rankings-io",
    subtitle: "Best for High-Budget Personal Injury Firms",
    meta: [
      { label: "Best For", val: "PI firms with aggressive growth goals" },
      { label: "Starting Price", val: "~$5,000/month (estimated)" },
      { label: "Specialization", val: "100% law firms" },
      { label: "Contract", val: "6-12 month typical" },
    ],
    body: "Rankings.io has built a strong reputation in personal injury SEO with a content-heavy, authority-building approach. They've published case studies showing significant ranking improvements for PI firms in competitive markets.",
    pros: ["Established reputation with verifiable PI case studies", "Content-first methodology that builds long-term organic authority", "Deep focus on PI and mass tort means they understand high-value case acquisition"],
    cons: ["Pricing starts higher — likely not the right fit under $4,000-$5,000/month", "Strong PI focus means other practice areas may not get the same depth", "Longer contract commitments are typical — ask about termination terms"],
    bestFor: "Personal injury firms in mid-to-large markets with $5,000+/month budgets wanting a proven PI-specific track record.",
    ctaHref: null,
    ctaText: null,
    highlight: false,
  },
  {
    rank: 3,
    name: "Grow Law Firm",
    anchor: "grow-law-firm",
    subtitle: "Best for Data-Driven Firms That Want Measurable ROI",
    meta: [
      { label: "Best For", val: "Analytics-focused law firms" },
      { label: "Starting Price", val: "~$3,000/month (estimated)" },
      { label: "Specialization", val: "100% law firms" },
      { label: "Contract", val: "Varies — confirm before signing" },
    ],
    body: "Grow Law Firm leads with analytics and measurable marketing ROI. Their pitch is built around connecting SEO activity to actual client acquisition metrics, not just ranking reports.",
    pros: ["Strong focus on connecting SEO metrics to client acquisition — not vanity metrics", "Legal-only focus with team that speaks attorney language", "Solid reputation for communication and responsiveness"],
    cons: ["Mid-range pricing puts them out of reach for solo attorneys and very small firms", "Contract terms are not publicly disclosed — understand exit provisions before committing", "Less name recognition than legacy agencies"],
    bestFor: "Growth-stage law firms with $3,000-$6,000/month budgets who prioritize measurable ROI.",
    ctaHref: null,
    ctaText: null,
    highlight: false,
  },
  {
    rank: 4,
    name: "Scorpion",
    anchor: "scorpion",
    subtitle: "Best for Firms That Want a One-Stop Marketing Vendor",
    meta: [
      { label: "Best For", val: "Firms wanting bundled website + paid + SEO" },
      { label: "Starting Price", val: "~$3,500/month (estimated)" },
      { label: "Specialization", val: "Multiple industries including legal" },
      { label: "Contract", val: "12-24 month typical" },
    ],
    body: "Scorpion is a large marketing technology company serving home services, healthcare, and legal, among other verticals. Their platform bundles website hosting, paid advertising, and SEO under one roof. Reviews are genuinely mixed — some firms report solid results, others report frustration with account turnover and difficulty exiting long-term contracts.",
    pros: ["Comprehensive bundled service — website, SEO, PPC, and reporting in one platform", "Substantial technology investment with a real reporting dashboard", "Large enough to have vertical-specific resources"],
    cons: ["Not a legal-only agency — limits depth of practice-area expertise", "Long contract terms (often 12-24 months) — read the contract carefully", "Website assets may not be fully portable if you leave"],
    bestFor: "Established firms that want a single vendor relationship and are comfortable with longer commitments in exchange for platform convenience.",
    ctaHref: "/scorpion-legal-marketing-alternative/",
    ctaText: "See Scorpion Alternative",
    highlight: false,
  },
  {
    rank: 5,
    name: "Foster Web Marketing",
    anchor: "foster-web-marketing",
    subtitle: "Best for Plaintiff-Side Firms That Want a Proven Veteran",
    meta: [
      { label: "Best For", val: "Established plaintiff-side firms" },
      { label: "Starting Price", val: "~$3,000/month (estimated)" },
      { label: "Specialization", val: "Legal only" },
      { label: "Contract", val: "12 month typical" },
    ],
    body: "Foster Web Marketing has been in the legal marketing space for a long time and has built a loyal following, particularly among plaintiff-side personal injury and workers' compensation firms. They run their own proprietary CMS platform (DSS).",
    pros: ["Long track record in legal marketing with recognizable name", "Proprietary CMS with content tools designed for law firm marketing workflows", "Deep PI and plaintiff-side expertise with case studies going back many years"],
    cons: ["Proprietary CMS creates platform dependency — migration away from Foster can be complicated", "Annual contract commitments are standard — confirm what happens to content if you leave", "Some reviews note responsiveness can be slower than boutique agencies"],
    bestFor: "Established plaintiff firms with PI or workers' comp focus comfortable with longer commitments and a proprietary platform.",
    ctaHref: null,
    ctaText: null,
    highlight: false,
  },
  {
    rank: 6,
    name: "PaperStreet Web Design",
    anchor: "paperstreet",
    subtitle: "Best for Firms That Prioritize Website Design",
    meta: [
      { label: "Best For", val: "Firms wanting premium design + SEO" },
      { label: "Starting Price", val: "~$2,500/month (estimated)" },
      { label: "Specialization", val: "Legal focus" },
      { label: "Contract", val: "Varies by service" },
    ],
    body: "PaperStreet has been building law firm websites since 2001 and has a legitimate reputation for high-quality design work. Their SEO services have grown alongside their design work, though design remains their primary strength.",
    pros: ["Long-standing reputation in legal web design with a large portfolio", "Strong design capabilities for brand-conscious firms", "Wide range of service tiers"],
    cons: ["Design-first roots mean SEO is a secondary discipline for many on their team", "Large client volume can make it hard to assess attention your account will receive", "Limited public information on SEO-specific case studies"],
    bestFor: "Firms that need a new website with strong branding as their primary goal, with ongoing SEO bundled into the relationship.",
    ctaHref: null,
    ctaText: null,
    highlight: false,
  },
  {
    rank: 7,
    name: "National Law Review",
    anchor: "national-law-review",
    subtitle: "Best for Content Marketing and Thought Leadership",
    meta: [
      { label: "Best For", val: "Business law firms seeking industry exposure" },
      { label: "Starting Price", val: "Varies by publishing package" },
      { label: "Specialization", val: "Legal content and publication" },
      { label: "Contract", val: "Subscription/package-based" },
    ],
    body: "National Law Review is a legal news and analysis publication that also offers content marketing services to law firms. Their model is different — they help attorneys publish articles on their platform to build visibility and thought leadership, rather than traditional SEO campaigns.",
    pros: ["Established publication with real authority in the legal industry", "Good fit for corporate, business, and transactional law firms reaching in-house counsel", "Content publishing is a legitimate SEO strategy component when combined with on-site work"],
    cons: ["Not a full-service SEO agency — does not replace technical SEO, on-site optimization, or link building", "Better as a supplement to an existing SEO program, not a standalone solution", "Consumer-facing practices (PI, criminal defense, family law) are not the core use case"],
    bestFor: "Business law, employment, IP, and regulatory firms building thought leadership and reaching corporate clients.",
    ctaHref: null,
    ctaText: null,
    highlight: false,
  },
  {
    rank: 8,
    name: "Omnizant",
    anchor: "omnizant",
    subtitle: "Best for Solo Attorneys and Very Small Firms",
    meta: [
      { label: "Best For", val: "Solo attorneys and very small firms" },
      { label: "Starting Price", val: "~$1,500/month (estimated)" },
      { label: "Specialization", val: "Legal focus" },
      { label: "Contract", val: "Varies — confirm before signing" },
    ],
    body: "Omnizant focuses on website design and SEO for attorneys, with a particular reputation for clean, professional designs and local SEO fundamentals. They've carved out a niche serving solo practitioners and small firms who want a polished online presence.",
    pros: ["Accessible pricing for solo and small firm attorneys", "Clean design with a professional legal aesthetic", "Focused on local SEO fundamentals — the right starting point for most small attorneys"],
    cons: ["Limited public case study data on competitive ranking outcomes", "May not have capacity for highly competitive markets or aggressive growth goals", "Less suited for mid-to-large firms seeking a growth-stage partner"],
    bestFor: "Solo attorneys and small firms (1-5 attorneys) in less competitive markets needing professional web presence and foundational SEO.",
    ctaHref: null,
    ctaText: null,
    highlight: false,
  },
];

export default function BestLawFirmSEOPage() {
  return (
    <>
      <SchemaOrg schema={[itemListSchema, faqSchema]} />

      <section className="bg-gray-900 py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <nav className="text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-white no-underline">Home</Link> / <span className="text-gray-300">Best Law Firm SEO Companies</span>
          </nav>
          <h1 className="font-heading font-extrabold text-white text-4xl mb-4">Best Law Firm SEO Companies in 2026 (Ranked &amp; Reviewed)</h1>
          <p className="text-gray-300 text-lg">Updated February 2026.</p>
        </div>
      </section>

      <article className="py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-gray-700 text-base leading-relaxed mb-4">If you&apos;re searching for the best law firm SEO company, you already know the market is crowded with agencies claiming to specialize in legal. Most of them don&apos;t.</p>

          <div className="bg-amber-50 border-l-4 border-amber-400 p-5 rounded mb-8">
            <strong className="text-gray-900">Transparency notice:</strong>
            <span className="text-gray-700"> JurisPage is ranked #1 on this list. We wrote this article. That&apos;s an obvious conflict of interest, and we&apos;re disclosing it upfront. We&apos;ve done our best to give honest assessments of every company — including their real weaknesses.</span>
          </div>

          <h2 className="font-heading font-extrabold text-gray-900 text-2xl mt-10 mb-4">How We Evaluated Each Company</h2>
          <ul className="space-y-2 text-gray-700 mb-8">
            {["Transparency — Do they publish pricing? Are reports actionable?", "Law firm specialization — Legal-only vs. serving every industry", "Contract terms — Month-to-month vs. long-term lock-in", "Practice area depth — Do they understand specific areas, not just 'legal' generically?", "Track record — Published case studies, verifiable results", "Communication quality — Responsive, proactive, or hard to reach?", "Technology stack — Analytics, tracking, reporting infrastructure"].map((item) => (
              <li key={item} className="flex gap-2 items-start"><span className="text-gray-400 mt-1">•</span><span>{item}</span></li>
            ))}
          </ul>

          <h2 className="font-heading font-extrabold text-gray-900 text-2xl mb-6">Quick Comparison</h2>
          <div className="overflow-x-auto mb-10">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr style={{ background: "#222222", color: "#fff" }}>
                  {["Company", "Starting Price", "Legal-Only?", "Contract", "Best For"].map((h) => (
                    <th key={h} className="p-3 text-left border border-gray-600 text-sm">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "JurisPage ⭐", price: "$1,497/mo", legal: "Yes", contract: "Month-to-month", best: "Small to mid-market", highlight: true },
                  { name: "Rankings.io", price: "~$5,000/mo", legal: "Yes", contract: "6-12 month", best: "PI firms", highlight: false },
                  { name: "Grow Law Firm", price: "~$3,000/mo", legal: "Yes", contract: "Varies", best: "Data-focused firms", highlight: false },
                  { name: "Scorpion", price: "~$3,500/mo", legal: "No", contract: "12-24 month", best: "Bundled service seekers", highlight: false },
                  { name: "Foster Web Marketing", price: "~$3,000/mo", legal: "Yes", contract: "12 month", best: "Plaintiff-side firms", highlight: false },
                  { name: "PaperStreet", price: "~$2,500/mo", legal: "Yes", contract: "Varies", best: "Design-forward firms", highlight: false },
                  { name: "National Law Review", price: "Varies", legal: "Yes", contract: "Varies", best: "Content & thought leadership", highlight: false },
                  { name: "Omnizant", price: "~$1,500/mo", legal: "Yes", contract: "Varies", best: "Solo and very small firms", highlight: false },
                ].map((row, i) => (
                  <tr key={row.name} style={{ background: row.highlight ? "#f0fff4" : i % 2 === 0 ? "#f9f9f9" : "#fff" }}>
                    <td className="p-3 border border-gray-200 font-semibold">{row.name}</td>
                    <td className="p-3 border border-gray-200">{row.price}</td>
                    <td className="p-3 border border-gray-200">{row.legal}</td>
                    <td className="p-3 border border-gray-200">{row.contract}</td>
                    <td className="p-3 border border-gray-200">{row.best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="font-heading font-extrabold text-gray-900 text-2xl mb-8">Detailed Reviews</h2>

          {agencies.map((agency) => (
            <div key={agency.rank} id={agency.anchor} className={`mb-12 ${agency.rank > 1 ? "pt-8 border-t border-gray-200" : ""}`}>
              <h3 className="font-heading font-extrabold text-gray-900 text-xl mb-4">
                {agency.rank}. {agency.name} — {agency.subtitle}
              </h3>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-4 grid grid-cols-2 gap-4">
                {agency.meta.map((m) => (
                  <div key={m.label}>
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-500">{m.label}</span>
                    <div className="font-semibold text-gray-900 text-sm mt-0.5">{m.val}</div>
                  </div>
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">{agency.body}</p>
              <p className="font-semibold text-gray-900 mb-2">Pros:</p>
              <ul className="space-y-1 mb-4">
                {agency.pros.map((p) => <li key={p} className="text-gray-700 flex gap-2"><span className="text-green-600 mt-0.5">✓</span><span>{p}</span></li>)}
              </ul>
              <p className="font-semibold text-gray-900 mb-2">Cons:</p>
              <ul className="space-y-1 mb-4">
                {agency.cons.map((c) => <li key={c} className="text-gray-700 flex gap-2"><span className="text-red-400 mt-0.5">✗</span><span>{c}</span></li>)}
              </ul>
              <p className="text-gray-600 text-sm"><strong>Best for:</strong> {agency.bestFor}</p>
              {agency.ctaHref && (
                <div className="mt-4">
                  <Link href={agency.ctaHref} className="inline-block font-bold text-sm px-6 py-3 rounded-lg no-underline" style={{ background: "linear-gradient(135deg, #6FFF2C, #14EEEE)", color: "#222222" }}>
                    {agency.ctaText}
                  </Link>
                </div>
              )}
            </div>
          ))}

          <h2 className="font-heading font-extrabold text-gray-900 text-2xl mt-10 mb-6">How to Choose the Right Law Firm SEO Company</h2>
          {[
            { title: "Step 1: Know Your Budget", body: "$1,500–$3,000/month: Foundational SEO for solo and small firms. $3,000–$6,000/month: Growth-stage SEO with content velocity and link building. $6,000+/month: Aggressive growth or highly competitive markets like PI in major metros." },
            { title: "Step 2: Understand Your Market Competition", body: "A family law attorney in a mid-size city has a completely different competitive landscape than a PI firm trying to rank in Los Angeles. Before engaging any agency, ask them to pull a keyword difficulty analysis and competitor authority audit for your specific market." },
            { title: "Step 3: Prioritize Legal Specialization", body: "General marketing agencies that 'also do legal' are almost never the right choice. Legal SEO has specific considerations: bar advertising ethics rules, E-E-A-T requirements for YMYL content, and local map pack optimization for legal." },
            { title: "Step 4: Watch for Red Flags", body: "Guaranteed rankings. You don't own your website. Black-box reporting with no specific deliverables. Aggressive multi-year contracts at the first meeting. These are all warning signs to take seriously." },
          ].map((section) => (
            <div key={section.title} className="mb-6">
              <h3 className="font-heading font-bold text-gray-900 text-lg mb-2">{section.title}</h3>
              <p className="text-gray-700 leading-relaxed">{section.body}</p>
            </div>
          ))}
        </div>
      </article>

      <FAQAccordion faqs={faqs} heading="Frequently Asked Questions" />

      <CTASection
        heading="Ready to See What JurisPage Can Do for Your Firm?"
        subtext="No long-term contracts. No hidden pricing. Just straightforward SEO built exclusively for law firms."
        primaryLabel="See Transparent Pricing"
        primaryHref="/services/pricing/"
        secondaryLabel="Get a Free Strategy Call"
        secondaryHref="/contact/"
      />
    </>
  );
}
