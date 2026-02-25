export interface PracticeAreaData {
  slug: string;
  title: string;
  heading: string;
  primaryKeyword: string;
  description: string;
  intro: string;
  whyDifferent: string;
  mistakes: string[];
  services: string[];
  faqs: { question: string; answer: string }[];
}

export const practiceAreas: PracticeAreaData[] = [
  {
    slug: "personal-injury-lawyer-marketing",
    title: "Personal Injury Lawyer Marketing | JurisPage",
    heading: "Personal Injury Lawyer Marketing That Fills Your Pipeline",
    primaryKeyword: "personal injury lawyer marketing",
    description: "JurisPage provides marketing services for personal injury law firms — SEO, Google Ads, and GBP optimization designed to generate qualified case inquiries.",
    intro: "Personal injury is the most competitive practice area in legal marketing. The firms winning in your market aren't just doing SEO — they're running integrated campaigns that cover organic, paid, local, and increasingly, AI search. We build those campaigns.",
    whyDifferent: "PI marketing requires a different approach than most other practice areas. Case values are high, competition is intense, and clients are often in emotional distress. Your marketing needs to build trust instantly while targeting specific accident and injury types in your geographic market.",
    mistakes: [
      "Targeting overly broad keywords like 'personal injury lawyer' instead of specific injury types and locations",
      "Ignoring the map pack — most PI searches have local intent",
      "Sending paid traffic to a homepage instead of a dedicated, conversion-optimized landing page",
    ],
    services: ["Law Firm SEO", "Google Ads Management", "Local SEO & Map Pack", "Law Firm Website Design", "GEO Optimization"],
    faqs: [
      { question: "How competitive is PI lawyer SEO?", answer: "Personal injury is one of the most competitive verticals in all of search marketing. CPCs can reach $100-$300 per click in major markets. Organic SEO takes longer to establish but produces significantly lower cost-per-lead once rankings are established." },
      { question: "What's the best marketing channel for PI law firms?", answer: "The combination of Google Local Service Ads (for immediate visibility), Google Ads (for targeted volume), and SEO (for long-term compounding results) outperforms any single channel. The right mix depends on your market and budget." },
    ],
  },
  {
    slug: "criminal-defense-lawyer-marketing",
    title: "Criminal Defense Lawyer Marketing | JurisPage",
    heading: "Criminal Defense Attorney Marketing: Get Found When Clients Need You Most",
    primaryKeyword: "criminal defense lawyer marketing",
    description: "Marketing services for criminal defense law firms. SEO, Google Ads, and local optimization built for the urgency of criminal defense case acquisition.",
    intro: "Criminal defense clients search at odd hours, in emotional states, and often from their phone while still at the police station. Your marketing needs to be there for those moments — fast-loading, credible, and easy to contact.",
    whyDifferent: "Criminal defense marketing is time-sensitive in a way few other practice areas are. When someone is arrested or charges are filed, the search for an attorney happens immediately. Your visibility in those moments is everything.",
    mistakes: [
      "Not appearing in the map pack for crime-specific searches ('DUI lawyer near me', 'drug charge attorney [city]')",
      "Website load times over 3 seconds — in crisis, clients bounce fast",
      "Missing dedicated pages for specific charges (DUI, drug possession, assault, etc.)",
    ],
    services: ["Law Firm SEO", "Google Ads Management", "Local SEO", "Law Firm Website Design"],
    faqs: [
      { question: "Should criminal defense firms run Google Ads?", answer: "Yes — criminal defense is one of the best practice areas for PPC because intent is high and timing matters. A client who just got a DUI charge and searches for an attorney needs immediate results. Paid ads put you at the top instantly." },
      { question: "What keywords work best for criminal defense SEO?", answer: "Practice-area specific terms (DUI lawyer, drug charge attorney, assault lawyer) combined with your city name consistently outperform generic 'criminal defense lawyer' terms in both SEO and PPC." },
    ],
  },
  {
    slug: "family-law-firm-marketing",
    title: "Family Law Firm Marketing | JurisPage",
    heading: "Family Law Firm Marketing: More Consultations From Clients Ready to Hire",
    primaryKeyword: "family law firm marketing",
    description: "Family law marketing services that generate consultation requests from clients searching for divorce, custody, and family law attorneys.",
    intro: "Family law clients are often in the most stressful periods of their lives. They search extensively before calling — reading reviews, comparing attorneys, and researching costs. Your digital presence needs to build trust across every touchpoint of that research journey.",
    whyDifferent: "Family law has unusually high search volume for educational content (divorce process, custody rights, child support calculations). A content strategy that answers these questions builds authority and captures clients at multiple stages of the decision process.",
    mistakes: [
      "Treating all family law as one — divorce, custody, adoption, and domestic violence have very different keyword profiles",
      "Not investing in review generation — family law clients research heavily before choosing an attorney",
      "Ignoring the FAQ opportunity — family law generates massive question-based search volume",
    ],
    services: ["Law Firm SEO", "Content Writing", "Local SEO", "Law Firm Website Design"],
    faqs: [
      { question: "Does content marketing work for family law firms?", answer: "Extremely well. Family law generates enormous search volume for educational queries ('how long does a divorce take', 'how is child custody determined'). Ranking for these queries builds authority and captures prospects early in their research." },
    ],
  },
  {
    slug: "immigration-lawyer-marketing",
    title: "Immigration Lawyer Marketing | JurisPage",
    heading: "Immigration Lawyer Marketing: Reach Clients Across Visa Types and Languages",
    primaryKeyword: "immigration lawyer marketing",
    description: "Marketing services for immigration law firms — multilingual SEO, content strategy, and local optimization for visa, green card, and deportation defense practices.",
    intro: "Immigration law serves a uniquely diverse client base. Searches happen in multiple languages. Trust is built differently across cultures. And the stakes — for your clients — couldn't be higher. Your marketing strategy needs to reflect all of that.",
    whyDifferent: "Immigration clients often search in their native language first. A Spanish-language SEO strategy, for example, can open an entirely untapped traffic channel in markets with large Hispanic populations.",
    mistakes: [
      "English-only content in markets with large non-English speaking populations",
      "Generic 'immigration lawyer' targeting without breaking down by visa type (H-1B, family visas, asylum, etc.)",
      "Not optimizing Google Business Profile for the specific communities you serve",
    ],
    services: ["Law Firm SEO", "Content Writing", "Local SEO", "Law Firm Website Design"],
    faqs: [
      { question: "Should immigration law firms have multilingual websites?", answer: "In most markets, yes. Spanish-language search volume alone can represent 20-40% of your total addressable audience. We build multilingual SEO strategies that target both English and Spanish searchers for immigration services." },
    ],
  },
  {
    slug: "bankruptcy-lawyer-marketing",
    title: "Bankruptcy Lawyer Marketing | JurisPage",
    heading: "Bankruptcy Lawyer Marketing: Reach Clients When They Need Help Most",
    primaryKeyword: "bankruptcy lawyer marketing",
    description: "Marketing services for bankruptcy attorneys — SEO, Google Ads, and content strategy that generates Chapter 7 and Chapter 13 case inquiries.",
    intro: "Bankruptcy clients are often in financial distress and searching urgently for options. Your marketing needs to appear for the right queries, build immediate trust, and make it effortless to take the first step toward a consultation.",
    whyDifferent: "Bankruptcy marketing requires empathy in your messaging and clarity in your content. Clients are embarrassed and scared — your marketing should reassure them, not intimidate them.",
    mistakes: [
      "Missing separate pages for Chapter 7 vs. Chapter 13 — these have very different keyword profiles",
      "Not addressing cost concerns upfront — 'how much does bankruptcy cost' is a top search in this space",
      "Generic legal website design that doesn't communicate accessibility and approachability",
    ],
    services: ["Law Firm SEO", "Content Writing", "Google Ads Management", "Local SEO"],
    faqs: [
      { question: "Is bankruptcy law competitive for SEO?", answer: "Less competitive than PI, which makes it an opportunity. Most markets have room for a well-optimized bankruptcy firm to reach top-3 positions with 6-12 months of consistent SEO work." },
    ],
  },
  {
    slug: "estate-planning-lawyer-marketing",
    title: "Estate Planning Lawyer Marketing | JurisPage",
    heading: "Estate Planning Attorney Marketing: Build a Steady Stream of Referrals and Organic Leads",
    primaryKeyword: "estate planning attorney marketing",
    description: "Marketing services for estate planning law firms — content strategy, referral development, and SEO that generates will, trust, and estate planning inquiries.",
    intro: "Estate planning clients are often researching, not ready to call — they need to understand why they need a will or trust before they'll schedule a consultation. Content-driven SEO is the highest-ROI marketing channel for most estate planning practices.",
    whyDifferent: "Estate planning marketing is a long-game — clients think about this for months before acting. A content strategy that educates and nurtures is more valuable than aggressive paid advertising for most estate planning firms.",
    mistakes: [
      "Missing educational content (what is a living trust, do I need a will, power of attorney explained)",
      "Not targeting specific life events that trigger estate planning needs (new child, home purchase, retirement)",
      "Ignoring local SEO — people prefer an estate planning attorney in their community",
    ],
    services: ["Law Firm SEO", "Content Writing", "Local SEO", "Law Firm Email Marketing"],
    faqs: [
      { question: "Do estate planning attorneys need Google Ads?", answer: "Google Ads can work, but typically at a lower volume than SEO for estate planning. Content SEO that captures educational queries has a better long-term ROI for most estate planning practices." },
    ],
  },
  {
    slug: "employment-lawyer-marketing",
    title: "Employment Lawyer Marketing | JurisPage",
    heading: "Employment Lawyer Marketing: Reach Clients Facing Workplace Legal Issues",
    primaryKeyword: "employment lawyer marketing",
    description: "Marketing services for employment law firms — SEO and content strategy for discrimination, wrongful termination, and wage claim practices.",
    intro: "Employment law clients are searching in a moment of frustration and uncertainty — they've just experienced something at work and don't know if they have a case. Your marketing should appear in that moment and guide them toward a consultation.",
    whyDifferent: "Employment law covers a wide range of sub-specialties. The marketing strategy for a discrimination firm looks different from one focused on non-competes or wage claims. We build targeted strategies that speak to your specific client type.",
    mistakes: [
      "Too-generic messaging ('employment lawyer') instead of issue-specific content (wrongful termination, EEOC complaints, etc.)",
      "Not capturing educational search volume ('can I sue my employer for', 'is my non-compete enforceable')",
      "Missing a clear intake process — employment clients often have tight deadlines for filing",
    ],
    services: ["Law Firm SEO", "Content Writing", "Google Ads Management", "Local SEO"],
    faqs: [
      { question: "What are the most valuable keywords for employment lawyers?", answer: "Keywords tied to specific violations consistently outperform generic terms: 'wrongful termination lawyer [city]', 'sexual harassment attorney', 'FMLA violation attorney'. These reflect real search intent and convert better." },
    ],
  },
  {
    slug: "real-estate-lawyer-marketing",
    title: "Real Estate Lawyer Marketing | JurisPage",
    heading: "Real Estate Attorney Marketing: Get More Closings and Dispute Cases",
    primaryKeyword: "real estate attorney marketing",
    description: "Marketing services for real estate law firms — SEO, content strategy, and local optimization for residential and commercial real estate attorneys.",
    intro: "Real estate attorneys serve two very different audiences: consumers buying or selling property, and businesses navigating commercial transactions. Your marketing strategy needs to speak to both — or focus on one with laser precision.",
    whyDifferent: "Real estate law has strong seasonal patterns tied to housing market activity. A well-planned content and SEO strategy can position your firm as the go-to resource when activity peaks.",
    mistakes: [
      "Not targeting specific transaction types (residential vs. commercial, closings vs. disputes)",
      "Missing local SEO — real estate law is hyper-local by nature",
      "Ignoring referral relationships with realtors and mortgage brokers — digital marketing should support, not replace, these",
    ],
    services: ["Law Firm SEO", "Content Writing", "Local SEO"],
    faqs: [
      { question: "Should real estate attorneys invest in SEO or paid ads?", answer: "SEO has better ROI for most real estate attorneys because the search volume is steady and competition is lower than PI or criminal defense. Local SEO is particularly high-value given the geographic nature of real estate law." },
    ],
  },
  {
    slug: "solo-attorney-marketing",
    title: "Solo Attorney Marketing | JurisPage",
    heading: "Solo Attorney Marketing: Compete on Equal Ground With Larger Firms",
    primaryKeyword: "solo attorney marketing",
    description: "JurisPage provides marketing services for solo attorneys — cost-effective SEO, website design, and Google Ads that compete with larger firms on a solo budget.",
    intro: "Being a solo practitioner doesn't mean accepting less. The right digital marketing strategy can put a solo attorney on page one of Google next to a 20-attorney firm. The difference is focus, expertise, and a strategy built for your specific market and practice area.",
    whyDifferent: "Solo attorneys have advantages that larger firms don't — a defined personality, a clear specialty, and the ability to move fast. Your marketing should highlight those advantages, not apologize for your size.",
    mistakes: [
      "Competing on keywords that require a major firm's authority — solo attorneys should target specific niches and locations",
      "Underinvesting in your website — clients judge credibility by your digital presence before ever speaking to you",
      "Ignoring reviews — for solos, a strong review profile is a genuine competitive advantage",
    ],
    services: ["Launchpad Package", "Law Firm SEO", "Local SEO", "Law Firm Website Design"],
    faqs: [
      { question: "Can solo attorneys realistically compete for Google rankings?", answer: "Yes — with the right strategy. Competing for hyper-specific, local, practice-area terms is very achievable for solo attorneys with consistent SEO work. The Launchpad plan is specifically designed for attorneys in this position." },
    ],
  },
  {
    slug: "small-law-firm-marketing",
    title: "Small Law Firm Marketing | JurisPage",
    heading: "Small Law Firm Marketing: Get More Cases Without the Big Agency Price Tag",
    primaryKeyword: "small law firm marketing",
    description: "Marketing services built specifically for small law firms (2-15 attorneys) that want professional digital marketing without enterprise-level pricing.",
    intro: "Small law firms represent the majority of legal practices in the United States — and the majority of small firms are systematically underserved by the marketing industry. They get junior account managers, template strategies, and pricing built for firms with 10x their budget.",
    whyDifferent: "JurisPage was built specifically for small firms. Our pricing, our process, and our approach are all designed around the reality that a 5-attorney firm needs the same quality of strategic thinking as a 50-attorney firm — just not at 10x the cost.",
    mistakes: [
      "Paying premium prices for template work at large agencies that treat small firms as afterthoughts",
      "Doing nothing because 'good marketing costs too much' — the right plan at the right price changes that",
      "Trying to compete for every keyword instead of owning a specific niche and geography",
    ],
    services: ["Law Firm SEO", "Google Ads Management", "Local SEO", "Law Firm Website Design", "Launchpad Package"],
    faqs: [
      { question: "What's a realistic marketing budget for a small law firm?", answer: "Most small firms see meaningful results starting at $1,500-$3,000/month for SEO and local optimization. Our Launchpad plan at $1,497/month is specifically designed to be accessible at that level." },
    ],
  },
  {
    slug: "divorce-lawyer-marketing",
    title: "Divorce Lawyer Marketing | JurisPage",
    heading: "Divorce Lawyer Marketing: Get More Consultations From People Ready to Hire",
    primaryKeyword: "divorce attorney marketing",
    description: "Marketing services for divorce attorneys — SEO, content, and local optimization that generates consultation requests from clients ready to move forward.",
    intro: "Divorce clients often research for weeks before calling. They're reading about the process, estimating costs, and building confidence in an attorney before reaching out. A content-driven SEO strategy positions your firm at every stage of that research journey.",
    whyDifferent: "Divorce marketing requires balancing urgency (some clients need to move fast) with empathy (all clients are going through something difficult). Your marketing tone, content, and intake process should reflect that balance.",
    mistakes: [
      "Missing educational content that captures research-phase searches",
      "Not differentiating between contested vs. uncontested divorce — these attract different clients with different intent",
      "Ignoring review management — divorce clients read reviews more carefully than almost any other practice area",
    ],
    services: ["Law Firm SEO", "Content Writing", "Local SEO"],
    faqs: [
      { question: "Is divorce law competitive for SEO?", answer: "Moderately. Less competitive than PI, more competitive than niche practices. A consistent 6-12 month SEO strategy can reach top-5 positions for local divorce attorney searches in most mid-size markets." },
    ],
  },
  {
    slug: "dui-lawyer-marketing",
    title: "DUI Lawyer Marketing | JurisPage",
    heading: "DUI Lawyer Marketing: Be There When Someone Needs You Right Now",
    primaryKeyword: "DUI lawyer marketing",
    description: "Marketing services for DUI and criminal traffic attorneys — mobile-first SEO and Google Ads for clients searching immediately after a DUI charge.",
    intro: "DUI clients search immediately. They're often still at the police station or waiting for arraignment when they start looking for an attorney. Your marketing needs to appear instantly, load fast on mobile, and make it simple to call or text.",
    whyDifferent: "No other practice area is more time-sensitive. DUI clients decide within hours. Your Google Ads campaigns need to run 24/7. Your website needs to load in under 2 seconds on mobile. And your phone number needs to be the first thing they see.",
    mistakes: [
      "Not running paid ads at night and on weekends — that's when DUI arrests happen",
      "Slow mobile website — DUI clients bounce faster than almost any other practice area",
      "Missing location-specific pages ('DUI lawyer [city]', 'drunk driving attorney [county]')",
    ],
    services: ["Google Ads Management", "Law Firm SEO", "Local SEO", "Law Firm Website Design"],
    faqs: [
      { question: "What's the most important marketing channel for DUI attorneys?", answer: "Google Ads + a fast mobile website is the highest-ROI combination for DUI. The search intent is immediate, and paid ads put you at the top instantly. SEO builds long-term presence." },
    ],
  },
  {
    slug: "workers-comp-lawyer-marketing",
    title: "Workers' Compensation Lawyer Marketing | JurisPage",
    heading: "Workers' Comp Lawyer Marketing: Reach Injured Workers Before the Insurance Companies Do",
    primaryKeyword: "workers compensation attorney marketing",
    description: "Marketing services for workers' compensation attorneys — SEO, Google Ads, and local optimization for injury and work comp practices.",
    intro: "Workers' compensation clients often don't realize they need an attorney immediately after an injury. Your marketing strategy needs to intercept them during the research phase — often 1-2 weeks after the injury — before they accept an insurance settlement without legal guidance.",
    whyDifferent: "Workers' comp marketing requires educating potential clients about why they need representation before they'll convert. Content that explains the claims process, common insurance tactics, and settlement value builds trust and generates better-qualified leads.",
    mistakes: [
      "Only targeting 'workers comp lawyer' instead of injury-specific searches ('hurt at work', 'workplace injury attorney')",
      "Not capturing educational searches about the workers' comp process",
      "Missing Spanish-language content in markets with large labor force populations",
    ],
    services: ["Law Firm SEO", "Content Writing", "Google Ads Management", "Local SEO"],
    faqs: [
      { question: "How do workers' comp firms compete with insurance company marketing?", answer: "By owning educational content that answers worker questions before insurance adjusters frame the narrative. Informational SEO for 'what to do after a workplace injury' type queries is highly effective and low competition." },
    ],
  },
  {
    slug: "social-security-disability-lawyer-marketing",
    title: "Social Security Disability Lawyer Marketing | JurisPage",
    heading: "SSDI Attorney Marketing: Reach Applicants Who Have Been Denied",
    primaryKeyword: "SSDI attorney marketing",
    description: "Marketing services for Social Security Disability attorneys — SEO and content strategy targeting applicants who have been denied benefits and need representation.",
    intro: "SSDI clients are specific: they've been denied benefits and need help appealing. Your marketing needs to find those people at exactly that moment — when they've received a denial letter and are searching for what to do next.",
    whyDifferent: "SSDI marketing is unusually content-friendly. There's enormous search volume for educational queries about the appeals process, disability criteria, and how to get a hearing. A content-heavy SEO strategy can generate very low-cost case acquisitions.",
    mistakes: [
      "Not targeting denial-specific searches ('my disability claim was denied', 'how to appeal SSDI denial')",
      "Missing condition-specific content (SSDI for back injury, SSDI for mental health conditions, etc.)",
      "Ignoring the long decision timeline — SSDI clients may be in the research phase for months",
    ],
    services: ["Law Firm SEO", "Content Writing", "Local SEO"],
    faqs: [
      { question: "Is SSDI law competitive for digital marketing?", answer: "Less competitive than PI and criminal defense, which creates a real opportunity. A well-executed content strategy can reach top positions for SSDI terms in most markets within 6-12 months." },
    ],
  },
  {
    slug: "medical-malpractice-lawyer-marketing",
    title: "Medical Malpractice Lawyer Marketing | JurisPage",
    heading: "Medical Malpractice Lawyer Marketing: Get Quality Cases From Qualified Clients",
    primaryKeyword: "medical malpractice lawyer marketing",
    description: "Marketing services for medical malpractice attorneys — SEO, Google Ads, and content strategy for high-value med mal case acquisition.",
    intro: "Medical malpractice is a high-value, high-competition practice area that requires a sophisticated marketing strategy. Cases are expensive to litigate and require careful pre-qualification. Your marketing should attract serious inquiries, not unqualified volume.",
    whyDifferent: "Med mal marketing needs to attract and pre-qualify simultaneously. Content that educates potential clients about the strength of their claim filters in serious inquiries and filters out cases that won't survive screening.",
    mistakes: [
      "Running ads that generate high volume without pre-qualifying for case viability",
      "Missing condition-specific content (surgical error, misdiagnosis, birth injury)",
      "Not being present for long-tail research queries that indicate a potential case",
    ],
    services: ["Law Firm SEO", "Content Writing", "Google Ads Management"],
    faqs: [
      { question: "How do you generate quality med mal leads vs. unqualified inquiries?", answer: "Educational content strategy is key. Articles that explain what constitutes malpractice, typical case values, and what documentation you'll need pre-qualify clients before they ever pick up the phone." },
    ],
  },
  {
    slug: "mass-tort-law-firm-marketing",
    title: "Mass Tort Law Firm Marketing | JurisPage",
    heading: "Mass Tort Law Firm Marketing: Scale Case Acquisition for Active Litigation",
    primaryKeyword: "mass tort law firm marketing",
    description: "Marketing services for mass tort law firms — targeted SEO, Google Ads, and content strategies for active litigation and emerging tort campaigns.",
    intro: "Mass tort marketing moves fast. When a new litigation campaign opens — a pharmaceutical recall, a dangerous device case, a new environmental claim — the firms that execute fastest capture the most cases. Your digital infrastructure needs to be ready before the campaign launches.",
    whyDifferent: "Mass tort marketing requires campaign-specific landing pages, targeted PPC with tight geographic controls, and SEO content that can rank quickly for emerging queries before the space becomes crowded.",
    mistakes: [
      "Waiting for a litigation campaign to launch before building digital assets — pre-build gives you a head start",
      "Generic tort content instead of injury/product-specific pages that match how victims search",
      "Not capturing emerging search queries early in a new tort lifecycle",
    ],
    services: ["Law Firm SEO", "Google Ads Management", "Law Firm Website Design", "Content Writing"],
    faqs: [
      { question: "How fast can you launch a mass tort digital campaign?", answer: "We can launch a targeted landing page and PPC campaign within 72 hours for active litigation campaigns. Pre-planning for anticipated new torts allows even faster activation." },
    ],
  },
  {
    slug: "startup-law-firm-marketing",
    title: "Startup Law Firm Marketing | JurisPage",
    heading: "Startup Law Firm Marketing: Build Your Online Presence Before Day One",
    primaryKeyword: "startup law firm marketing",
    description: "Marketing services for attorneys launching new law firms — website, SEO foundation, and Google Business Profile setup that attracts first clients fast.",
    intro: "Launching a law firm is one of the most exciting and stressful career moves an attorney can make. The marketing decisions you make in the first 90 days set the trajectory for your first two years. The Launchpad package is built specifically for this moment.",
    whyDifferent: "Startup firm marketing is about efficiency. You need to establish credibility fast, appear in local searches quickly, and convert visits into consultations without a big brand reputation to rely on yet.",
    mistakes: [
      "Launching without a professional website — even one client referral will Google you before calling",
      "Waiting to set up Google Business Profile — it takes weeks to verify, and you can't rank in the map pack without it",
      "Choosing a generic agency that's never done startup law firm marketing specifically",
    ],
    services: ["Launchpad Package", "Law Firm Website Design", "Local SEO", "Google Ads Management"],
    faqs: [
      { question: "How soon can I start appearing in Google searches after launching my firm?", answer: "With Launchpad, your website can be live within 30 days and your Google Business Profile verified within 2 weeks. Map pack appearances typically start within 60-90 days of an optimized GBP. Organic rankings take longer — 4-6 months for most local terms." },
    ],
  },
];

export function getPracticeAreaBySlug(slug: string): PracticeAreaData | undefined {
  return practiceAreas.find((p) => p.slug === slug);
}

export const practiceAreaSlugs = practiceAreas.map((p) => p.slug);
