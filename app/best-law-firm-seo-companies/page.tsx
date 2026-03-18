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
    description: "Honest rankings of the top 8 law firm SEO agencies for 2026 - with pros, cons, pricing, and who each is best for.",
    url: "https://jurispage.com/best-law-firm-seo-companies/",
  },
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Best Law Firm SEO Companies in 2026",
  url: "https://jurispage.com/best-law-firm-seo-companies/",
  numberOfItems: 11,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "JurisPage", url: "https://jurispage.com", description: "Transparent pricing, month-to-month contracts, 100% law firm focus. Best for small to mid-market firms." },
    { "@type": "ListItem", position: 2, name: "Juris Digital", url: "https://jurisdigital.com", description: "Full-service legal marketing for firms serious about market domination. Sister company to JurisPage under the same ownership." },
    { "@type": "ListItem", position: 3, name: "Rankings.io", url: "https://rankings.io", description: "Strong legal SEO agency with content-first approach for PI and mass tort firms." },
    { "@type": "ListItem", position: 4, name: "Grow Law Firm", url: "https://growlawfirm.com", description: "Data-driven legal marketing with measurable ROI reporting." },
    { "@type": "ListItem", position: 5, name: "Attorney Sync", url: "https://attorneysync.com", description: "Technical-first legal SEO agency with deep expertise in content strategy and search authority." },
    { "@type": "ListItem", position: 6, name: "Mockingbird Marketing", url: "https://mockingbirdmarketing.com", description: "Transparent, candid legal digital marketing led by Conrad Saam." },
    { "@type": "ListItem", position: 7, name: "Scorpion", url: "https://scorpion.co", description: "Large agency serving multiple industries including legal, bundled services." },
    { "@type": "ListItem", position: 8, name: "Foster Web Marketing", url: "https://fosterweb.com", description: "Veteran legal marketing with proprietary CMS, plaintiff-side expertise." },
    { "@type": "ListItem", position: 9, name: "PaperStreet Web Design", url: "https://paperstreet.com", description: "Legal-focused web design and SEO, strong design capabilities." },
    { "@type": "ListItem", position: 10, name: "National Law Review", url: "https://natlawreview.com", description: "Content marketing and publication for legal thought leadership." },
    { "@type": "ListItem", position: 11, name: "Omnizant", url: "https://omnizant.com", description: "Legal website and SEO for solo and small firm attorneys." },
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
    { "@type": "Question", name: "What's the difference between a legal SEO agency and a general SEO agency?", acceptedAnswer: { "@type": "Answer", text: "Legal SEO has specific requirements: bar advertising ethics rules, E-E-A-T requirements for YMYL legal content, practice area keyword structures, and local map pack strategies specific to legal. Agencies that also do HVAC and dental have split focus and generic strategies." } },
    { "@type": "Question", name: "How do I evaluate whether a law firm SEO agency's case studies are real?", acceptedAnswer: { "@type": "Answer", text: "Look for case studies that name the client, state the specific market and practice area, show actual keyword rankings or traffic numbers, and include before-and-after comparisons. Ask if you can speak directly with current or former clients in your practice area." } },
  ],
};

const faqs = [
  { question: "How much does law firm SEO cost per month?", answer: "Law firm SEO costs typically range from $1,500 to $10,000+ per month depending on market competitiveness, practice area, and scope of work. Smaller firms in less competitive markets can see real results starting around $1,500/month. Firms in major metros competing for high-value personal injury keywords often need $5,000-$10,000/month or more." },
  { question: "How long does SEO take to work for law firms?", answer: "Most law firms see meaningful movement in rankings within 3-6 months of starting a solid SEO program, with significant lead flow improvements typically appearing at the 6-12 month mark. Competitive markets and high-authority practice areas like personal injury can take 12-18 months to reach top-3 rankings." },
  { question: "Should I hire a law firm-specific SEO agency or a general agency?", answer: "For most law firms, a legal-specific SEO agency is the better choice. Legal SEO has unique considerations: ethical advertising rules, E-E-A-T requirements for YMYL content, practice area keyword structures, and local map pack optimization that general agencies simply don't deal with every day." },
  { question: "What should I look for in a law firm SEO contract?", answer: "Look for month-to-month flexibility or at most a 6-month initial commitment. Be cautious of 12-24 month contracts with steep cancellation penalties. Confirm that you own all content, website assets, and data if you leave." },
  { question: "Do law firm SEO companies guarantee rankings?", answer: "No reputable SEO agency guarantees specific rankings, and you should treat any guarantee as a red flag. Google controls rankings, not agencies. Agencies that promise 'Page 1 in 90 days' are either targeting very low-competition keywords or making promises they cannot keep." },
  { question: "How do I know if my law firm SEO agency is actually doing work?", answer: "Ask for monthly reports that show specific deliverables: how many pages of content were published, which links were built and from where, what technical fixes were completed, and how rankings changed for your target keywords. Vague reports showing only traffic graphs are a warning sign." },
  { question: "What's the difference between a legal SEO agency and a general SEO agency?", answer: "Legal SEO has specific requirements that general agencies often miss: state bar advertising rules that vary by jurisdiction, E-E-A-T requirements for YMYL (Your Money or Your Life) legal content, practice area keyword structures that differ completely from other industries, and local map pack optimization strategies that are specific to legal. An agency that also does HVAC, dental, and e-commerce has split attention and generic strategies. The best outcomes for law firms consistently come from agencies that work exclusively in legal." },
  { question: "How do I evaluate whether a law firm SEO agency's case studies are real?", answer: "Look for case studies that name the client (or at least describe them specifically), state the specific market and practice area, show actual keyword rankings or traffic numbers, and include a before-and-after comparison. Generic testimonials without numbers or specifics are easy to fabricate. Published case studies with named clients and measurable outcomes are the gold standard. Ask the agency if you can speak directly with any of their current or former clients in your practice area." },
];

const agencies = [
  {
    rank: 1,
    name: "JurisPage",
    anchor: "jurispage",
    subtitle: "Best Overall for Small to Mid-Market Law Firms",
    meta: [
      { label: "Best For", val: "Small to mid-market firms ($2,000–$5,000/month)" },
      { label: "Starting Price", val: "Starting at $2,000/month" },
      { label: "Specialization", val: "100% law firms only" },
      { label: "Contract", val: "Month-to-month" },
    ],
    body: "JurisPage works exclusively with law firms and publishes its pricing publicly - something almost no other legal SEO agency does. With 113+ law firm clients and a strict month-to-month contract policy, the agency is built around earning retention rather than locking clients in.",
    pros: ["Only major legal SEO agency with publicly listed pricing - no sales games", "Month-to-month contracts with no cancellation penalties", "100% legal focus means benchmarking against real legal competitors"],
    cons: ["Not the right fit for firms with $10,000+/month enterprise budgets", "Newer brand name - long experience behind it, but less legacy name recognition", "Less name recognition than legacy agencies for committee-based vendor approval"],
    bestFor: "Solo attorneys, small firms, and mid-market practices that want professional SEO without opaque pricing or long-term commitments.",
    ctaHref: "/services/pricing/",
    ctaText: "See JurisPage Pricing",
    highlight: true,
    ownershipNote: null,
  },
  {
    rank: 2,
    name: "Juris Digital",
    anchor: "juris-digital",
    subtitle: "Best for Established Firms That Want to Dominate Their Market",
    meta: [
      { label: "Best For", val: "Established and growth-stage firms ($5,000–$20,000+/month)" },
      { label: "Starting Price", val: "Custom pricing (typically $5,000+/month)" },
      { label: "Specialization", val: "100% law firms" },
      { label: "Contract", val: "Flexible, ask about terms" },
    ],
    body: "Juris Digital is a full-service legal marketing agency with deep roots in the industry and a track record spanning over a decade. Where JurisPage is purpose-built for small firms, Juris Digital is the right partner for established practices that want market-wide dominance. Serious firepower in SEO, content, paid media, and brand strategy - all under one roof.",
    pros: ["Battle-tested track record across hundreds of law firms and highly competitive markets", "Full-service capability: SEO, paid media, content, GEO, and brand strategy in one team", "Deep expertise in practice areas that require aggressive authority-building over time"],
    cons: ["Higher investment threshold. Not the right fit for solo attorneys or firms early in their growth.", "Custom pricing means you'll need a strategy call to understand the specific scope and cost", "Breadth of services means you should clarify which team members own your account"],
    bestFor: "Established law firms ready to invest seriously in market domination, brand legacy, and long-term search authority.",
    ctaHref: null,
    ctaText: null,
    highlight: false,
    ownershipNote: "Disclosure: Juris Digital and JurisPage are owned by the same parent company. We're including it here because it genuinely serves a different client profile. Weigh that context.",
  },
  {
    rank: 3,
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
    cons: ["Pricing starts higher - likely not the right fit under $4,000-$5,000/month", "Strong PI focus means other practice areas may not get the same depth", "Longer contract commitments are typical - ask about termination terms"],
    bestFor: "Personal injury firms in mid-to-large markets with $5,000+/month budgets wanting a proven PI-specific track record.",
    ctaHref: null,
    ctaText: null,
    highlight: false,
  },
  {
    rank: 4,
    name: "Grow Law Firm",
    anchor: "grow-law-firm",
    subtitle: "Best for Data-Driven Firms That Want Measurable ROI",
    meta: [
      { label: "Best For", val: "Analytics-focused law firms" },
      { label: "Starting Price", val: "~$3,000/month (estimated)" },
      { label: "Specialization", val: "100% law firms" },
      { label: "Contract", val: "Varies - confirm before signing" },
    ],
    body: "Grow Law Firm leads with analytics and measurable marketing ROI. Their pitch is built around connecting SEO activity to actual client acquisition metrics, not just ranking reports.",
    pros: ["Strong focus on connecting SEO metrics to client acquisition - not vanity metrics", "Legal-only focus with team that speaks attorney language", "Solid reputation for communication and responsiveness"],
    cons: ["Mid-range pricing puts them out of reach for solo attorneys and very small firms", "Contract terms are not publicly disclosed - understand exit provisions before committing", "Less name recognition than legacy agencies"],
    bestFor: "Growth-stage law firms with $3,000-$6,000/month budgets who prioritize measurable ROI.",
    ctaHref: null,
    ctaText: null,
    highlight: false,
    ownershipNote: null,
  },
  {
    rank: 5,
    name: "Attorney Sync",
    anchor: "attorney-sync",
    subtitle: "Best for Firms That Want Technical Depth and Content Authority",
    meta: [
      { label: "Best For", val: "Firms serious about long-term organic authority" },
      { label: "Starting Price", val: "~$3,000/month (estimated)" },
      { label: "Specialization", val: "100% law firms" },
      { label: "Contract", val: "Confirm before signing" },
    ],
    body: "Attorney Sync has earned a respected reputation in the legal SEO community for doing the work seriously. Technical SEO rigor combined with a content strategy built for long-term authority, not shortcuts. Their team genuinely understands how Google evaluates legal content.",
    pros: ["Technical SEO depth that goes beyond surface-level optimization", "Respected within the legal marketing community. Practitioners know the name.", "Content strategy focused on genuine authority-building, not volume for its own sake"],
    cons: ["Not the most high-profile brand for firms making committee-based vendor decisions", "Less public case study data than some larger agencies", "Best suited to firms with patience for an organic strategy. Not a quick-win play."],
    bestFor: "Firms that want a technically rigorous SEO partner with deep content strategy expertise and a long-term outlook.",
    ctaHref: null,
    ctaText: null,
    highlight: false,
    ownershipNote: null,
  },
  {
    rank: 6,
    name: "Mockingbird Marketing",
    anchor: "mockingbird",
    subtitle: "Best for Firms That Value Transparency and Straight Talk",
    meta: [
      { label: "Best For", val: "Firms that want candid, no-nonsense partners" },
      { label: "Starting Price", val: "~$2,500/month (estimated)" },
      { label: "Specialization", val: "Legal focus" },
      { label: "Contract", val: "Varies, confirm before signing" },
    ],
    body: "Mockingbird Marketing, led by Conrad Saam, has built a distinct reputation by being unusually candid about how legal marketing actually works. Saam calls out bad agency behavior publicly and publishes real thinking on legal SEO. Refreshing in a space full of polished pitch decks. The agency practices what it preaches.",
    pros: ["Leadership that openly discusses legal marketing realities. No hype.", "Honest about what SEO can and can't do, which leads to better client relationships", "Strong local SEO fundamentals and a track record across multiple practice areas"],
    cons: ["Smaller team means capacity may be more limited than larger agencies", "The candid style isn't for everyone. Some firms prefer a more traditional agency relationship.", "Less suited for firms wanting an enterprise-scale, full-service operation"],
    bestFor: "Firms that want a straight-talking agency partner who will tell them the truth about their market, their timeline, and their results.",
    ctaHref: null,
    ctaText: null,
    highlight: false,
    ownershipNote: null,
  },
  {
    rank: 7,
    name: "Scorpion",
    anchor: "scorpion",
    subtitle: "Best for Firms That Want a One-Stop Marketing Vendor",
    meta: [
      { label: "Best For", val: "Firms wanting bundled website + paid + SEO" },
      { label: "Starting Price", val: "~$3,500/month (estimated)" },
      { label: "Specialization", val: "Multiple industries including legal" },
      { label: "Contract", val: "12-24 month typical" },
    ],
    body: "Scorpion is a large marketing technology company serving home services, healthcare, and legal, among other verticals. Their platform bundles website hosting, paid advertising, and SEO under one roof. Reviews are genuinely mixed - some firms report solid results, others report frustration with account turnover and difficulty exiting long-term contracts.",
    pros: ["Comprehensive bundled service - website, SEO, PPC, and reporting in one platform", "Substantial technology investment with a real reporting dashboard", "Large enough to have vertical-specific resources"],
    cons: ["Not a legal-only agency - limits depth of practice-area expertise", "Long contract terms (often 12-24 months) - read the contract carefully", "Website assets may not be fully portable if you leave"],
    bestFor: "Established firms that want a single vendor relationship and are comfortable with longer commitments in exchange for platform convenience.",
    ctaHref: "/scorpion-legal-marketing-alternative/",
    ctaText: "See Scorpion Alternative",
    highlight: false,
    ownershipNote: null,
  },
  {
    rank: 8,
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
    cons: ["Proprietary CMS creates platform dependency - migration away from Foster can be complicated", "Annual contract commitments are standard - confirm what happens to content if you leave", "Some reviews note responsiveness can be slower than boutique agencies"],
    bestFor: "Established plaintiff firms with PI or workers' comp focus comfortable with longer commitments and a proprietary platform.",
    ctaHref: null,
    ctaText: null,
    highlight: false,
    ownershipNote: null,
  },
  {
    rank: 9,
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
    ownershipNote: null,
  },
  {
    rank: 10,
    name: "National Law Review",
    anchor: "national-law-review",
    subtitle: "Best for Content Marketing and Thought Leadership",
    meta: [
      { label: "Best For", val: "Business law firms seeking industry exposure" },
      { label: "Starting Price", val: "Varies by publishing package" },
      { label: "Specialization", val: "Legal content and publication" },
      { label: "Contract", val: "Subscription/package-based" },
    ],
    body: "National Law Review is a legal news and analysis publication that also offers content marketing services to law firms. Their model is different - they help attorneys publish articles on their platform to build visibility and thought leadership, rather than traditional SEO campaigns.",
    pros: ["Established publication with real authority in the legal industry", "Good fit for corporate, business, and transactional law firms reaching in-house counsel", "Content publishing is a legitimate SEO strategy component when combined with on-site work"],
    cons: ["Not a full-service SEO agency - does not replace technical SEO, on-site optimization, or link building", "Better as a supplement to an existing SEO program, not a standalone solution", "Consumer-facing practices (PI, criminal defense, family law) are not the core use case"],
    bestFor: "Business law, employment, IP, and regulatory firms building thought leadership and reaching corporate clients.",
    ctaHref: null,
    ctaText: null,
    highlight: false,
    ownershipNote: null,
  },
  {
    rank: 11,
    name: "Omnizant",
    anchor: "omnizant",
    subtitle: "Best for Solo Attorneys and Very Small Firms",
    meta: [
      { label: "Best For", val: "Solo attorneys and very small firms" },
      { label: "Starting Price", val: "~$1,500/month (estimated)" },
      { label: "Specialization", val: "Legal focus" },
      { label: "Contract", val: "Varies - confirm before signing" },
    ],
    body: "Omnizant focuses on website design and SEO for attorneys, with a particular reputation for clean, professional designs and local SEO fundamentals. They've carved out a niche serving solo practitioners and small firms who want a polished online presence.",
    pros: ["Accessible pricing for solo and small firm attorneys", "Clean design with a professional legal aesthetic", "Focused on local SEO fundamentals - the right starting point for most small attorneys"],
    cons: ["Limited public case study data on competitive ranking outcomes", "May not have capacity for highly competitive markets or aggressive growth goals", "Less suited for mid-to-large firms seeking a growth-stage partner"],
    bestFor: "Solo attorneys and small firms (1-5 attorneys) in less competitive markets needing professional web presence and foundational SEO.",
    ctaHref: null,
    ctaText: null,
    highlight: false,
    ownershipNote: null,
  },
];

export default function BestLawFirmSEOPage() {
  return (
    <>
      <SchemaOrg schema={[itemListSchema, faqSchema]} />

      <section className="bg-white py-16 px-6 border-b border-gray-100">
        <div className="max-w-3xl mx-auto">
          <nav className="text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-gray-900 no-underline">Home</Link> / <span className="text-gray-700">Best Law Firm SEO Companies</span>
          </nav>
          <h1 className="font-heading font-extrabold text-gray-900 text-4xl mb-4">Best Law Firm SEO Companies in 2026 (Ranked &amp; Reviewed)</h1>
          <p className="text-gray-600 text-lg">Updated February 2026.</p>
        </div>
      </section>

      <article className="py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-gray-700 text-base leading-relaxed mb-4">If you&apos;re searching for the best law firm SEO company, you already know the market is crowded with agencies claiming to specialize in legal. Most of them don&apos;t.</p>

          <div className="bg-amber-50 border-l-4 border-amber-400 p-5 rounded mb-8">
            <strong className="text-gray-900">Transparency notice:</strong>
            <span className="text-gray-700"> JurisPage is ranked #1 on this list and Juris Digital is ranked #2. We wrote this article and we own both companies. They operate under the same parent. That&apos;s an obvious conflict of interest, and we&apos;re disclosing it upfront. We&apos;ve done our best to give honest assessments of every company on this list, including their real weaknesses.</span>
          </div>

          <h2 className="font-heading font-extrabold text-gray-900 text-2xl mt-10 mb-4">What to Look For in a Law Firm SEO Company</h2>
          <p className="text-gray-700 mb-6">Most attorneys evaluate law firm SEO agencies the wrong way. They look at agency size, brand name recognition, or a sales pitch deck. What actually predicts results is different. Here is what to evaluate before signing anything.</p>
          <div className="space-y-5 mb-10">
            {[
              { title: "Published Pricing", body: "If an agency requires a sales call before revealing what anything costs, that's by design. Opaque pricing creates leverage in negotiations and makes it hard to compare. Every agency on this list that refuses to publish pricing is doing so for a reason." },
              { title: "Legal-Only Specialization", body: "Legal SEO has unique requirements: bar advertising ethics rules vary by state, Google applies YMYL (Your Money or Your Life) content standards to legal pages, and practice area keyword structures are completely different from e-commerce or home services. Agencies that also do HVAC and dental have split attention and generic strategies." },
              { title: "Contract Terms and Asset Ownership", body: "Before signing, confirm: Who owns the website? Who owns the content? What happens to your rankings data if you leave? Some agencies build your site on proprietary platforms you cannot take with you. Others write content that technically belongs to them. Ask explicitly." },
              { title: "Verifiable Track Record", body: "Ask for case studies with actual results: which keywords, what market, over what time period, and what the client was willing to say publicly. Generic testimonials without specifics tell you nothing. Published case studies with named clients and real numbers tell you a great deal." },
              { title: "Practice Area Depth", body: "There is a big difference between an agency that has run campaigns for 50 personal injury firms and one that has run campaigns for 3. Ask specifically: how many clients do you have in my practice area? What are the most competitive markets you've gotten results in for firms like mine?" },
              { title: "Reporting Quality", body: "Ask to see a sample monthly report before signing. A good report shows specific deliverables completed that month (pages published, links built, technical fixes), ranking changes for tracked keywords, and lead flow tied to SEO activity. A bad report shows a traffic graph and a few vanity metrics." },
              { title: "Communication Structure", body: "Who is your actual point of contact? Is it an account manager reading from a script, or the person doing the work? What's the escalation path if results stall? How often do you meet? These questions reveal whether you'll be treated like a real partner or a monthly invoice." },
            ].map((item) => (
              <div key={item.title} className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                <h3 className="font-heading font-bold text-gray-900 text-base mb-2">{item.title}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

          <h2 className="font-heading font-extrabold text-gray-900 text-2xl mt-10 mb-4">Red Flags: What to Avoid When Hiring a Law Firm SEO Agency</h2>
          <p className="text-gray-700 mb-6">These are not theoretical concerns. Each of these is a pattern that repeats across the legal marketing industry and costs law firms real money.</p>
          <div className="space-y-4 mb-10">
            {[
              { flag: "Guaranteed rankings", detail: "No agency controls Google's algorithm. Any agency guaranteeing specific rankings is either targeting meaningless keywords or making a promise they have no ability to keep. This should be a hard stop in your evaluation." },
              { flag: "You don't own your website", detail: "Some agencies build your site on proprietary platforms. When you leave, you lose everything - the site, the content, the domain configuration. Always confirm in writing that you own your website files and can take them with you at any time." },
              { flag: "Multi-year contracts for a new relationship", detail: "A 12- or 24-month contract with an agency you've never worked with is a significant financial risk. Reputable agencies with real results don't need long contracts to retain clients. Shorter initial commitments (month-to-month or 6 months maximum) are a better arrangement." },
              { flag: "Vague monthly reports", detail: "If your monthly report shows a traffic graph and the phrase 'we continued optimizing your site,' you have a problem. You should know exactly what was delivered each month: which pages went live, which links were built and from where, and which technical issues were resolved." },
              { flag: "Promises about how fast SEO will work", detail: "Real legal SEO takes time. Agencies promising significant ranking improvements within 30 days are either targeting low-competition terms that won't generate business or misleading you. Expect 3-6 months before meaningful ranking movement and 6-12 months for lead flow improvement in most markets." },
              { flag: "Pricing that requires a sales call", detail: "If the agency can't put a number on their website, ask yourself why. The answer is almost always that pricing is negotiated based on what they think you'll pay, not what services actually cost. Published pricing is a transparency signal." },
            ].map((item, i) => (
              <div key={item.flag} className="flex gap-4 bg-red-50 border border-red-100 rounded-xl p-5">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-sm">{i + 1}</span>
                <div>
                  <p className="font-bold text-gray-900 text-sm mb-1">{item.flag}</p>
                  <p className="text-gray-700 text-sm leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

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
                  { name: "JurisPage ⭐", price: "From $2,000/mo", legal: "Yes", contract: "Month-to-month", best: "Small to mid-market", highlight: true },
                  { name: "Juris Digital ⚠️ (sister co.)", price: "$5,000+/mo", legal: "Yes", contract: "Flexible", best: "Enterprise & market dominators", highlight: false },
                  { name: "Rankings.io", price: "~$5,000/mo", legal: "Yes", contract: "6-12 month", best: "PI firms", highlight: false },
                  { name: "Grow Law Firm", price: "~$3,000/mo", legal: "Yes", contract: "Varies", best: "Data-focused firms", highlight: false },
                  { name: "Attorney Sync", price: "~$3,000/mo", legal: "Yes", contract: "Varies", best: "Technical SEO depth", highlight: false },
                  { name: "Mockingbird Marketing", price: "~$2,500/mo", legal: "Yes", contract: "Varies", best: "Transparent partnerships", highlight: false },
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
                {agency.rank}. {agency.name} - {agency.subtitle}
              </h3>
              {agency.ownershipNote && (
                <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded mb-4 text-sm text-gray-700">
                  <strong className="text-gray-900">⚠️ Ownership disclosure:</strong> {agency.ownershipNote}
                </div>
              )}
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
                  <Link href={agency.ctaHref} className="inline-block font-bold text-sm px-6 py-3 rounded-lg no-underline" style={{ background: "linear-gradient(135deg, #EE6C13, #982A0B)", color: "#222222" }}>
                    {agency.ctaText}
                  </Link>
                </div>
              )}
            </div>
          ))}

          {/* SEO Consultants Section */}
          <div className="pt-8 border-t-2 border-gray-900 mt-4">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="font-heading font-extrabold text-gray-900 text-2xl">
                Legal SEO Consultants I Trust
              </h2>
            </div>
            <p className="text-gray-500 text-sm mb-1">
              <em>A personal list by <strong>Casey Meraz</strong>, CEO of Juris Digital &amp; JurisPage</em>
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Beyond full-service agencies, there are individual consultants in the legal SEO world who operate at a high level. These are people whose thinking I respect and whose work I&apos;ve seen produce real results. If you&apos;re looking for an independent expert rather than an agency, this short list is a starting point.
            </p>
            <div className="space-y-6">
              {/* Josh Brown */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-heading font-extrabold text-white text-lg flex-shrink-0"
                    style={{ background: "#EE6C13" }}
                  >
                    JB
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-gray-900 text-lg">Josh Brown</h3>
                    <p className="text-xs text-gray-500 mb-3">Legal SEO Consultant &amp; Strategist</p>
                    <p className="text-gray-700 text-sm leading-relaxed mb-3">
                      Josh Brown is one of the sharper independent voices in legal search. He brings a practitioner&apos;s perspective to SEO strategy, grounded in how search actually works rather than how agencies prefer to sell it.
                    </p>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      If you&apos;re a law firm owner who wants an independent expert to audit your current situation, map your competitive landscape, or help you evaluate an agency&apos;s work, Josh is worth talking to.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-gray-500 text-xs mt-4 italic">
              This section reflects Casey Meraz&apos;s personal recommendations only. No compensation was exchanged for inclusion.
            </p>
          </div>

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

      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-bold text-gray-900 text-xl mb-4">Related Resources</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/law-firm-seo/" className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all no-underline">Law Firm SEO Services</Link>
            <Link href="/law-firm-seo-cost/" className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all no-underline">Law Firm SEO Cost Guide</Link>
            <Link href="/case-studies/" className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all no-underline">Client Case Studies</Link>
            <Link href="/generative-engine-optimization-legal-marketing/" className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all no-underline">GEO for Law Firms</Link>
          </div>
        </div>
      </section>

      <FAQAccordion faqs={faqs} heading="Frequently Asked Questions" />

      <CTASection
        heading="Ready to See What JurisPage Can Do for Your Firm?"
        subtext="No long-term contracts. No hidden pricing. Just straightforward SEO built exclusively for law firms."
        primaryLabel="See Transparent Pricing"
        primaryHref="/services/pricing/"
        secondaryLabel="Book Your Strategy Session"
        secondaryHref="/contact/"
      />
    </>
  );
}
