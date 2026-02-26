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
  relatedCaseStudies?: string[];
  stats?: { value: string; label: string }[];
  process?: { step: string; detail: string }[];
  extendedFaqs?: { question: string; answer: string }[];
}

export const practiceAreas: PracticeAreaData[] = [
  {
    relatedCaseStudies: ["the-sands-law-group"],
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
    stats: [
      { value: "96%", label: "of PI clients search online before contacting an attorney (Google Consumer Survey)" },
      { value: "$150-$300", label: "average cost-per-click for PI keywords in major markets" },
      { value: "3x", label: "more leads from SEO vs. paid for PI firms after 12 months of consistent investment" },
      { value: "78%", label: "of PI searches have local intent — map pack visibility is not optional" },
    ],
    process: [
      { step: "Injury-Type Keyword Architecture", detail: "We map your target case types (car accidents, slip and fall, trucking, etc.) to dedicated pages with location-specific variants. This is the foundation that separates firms ranking for one keyword from firms owning an entire market." },
      { step: "Google Business Profile Optimization for PI Searches", detail: "We optimize your GBP specifically for injury-related search categories, build out the services section with case types, and implement a review acquisition process focused on generating 5-star reviews from settled clients." },
      { step: "Conversion-Optimized Landing Pages", detail: "Every paid traffic source gets a dedicated landing page — not your homepage. We build PI-specific pages with trust signals (verdicts and settlements, attorney credentials), fast load times, and click-to-call designed for mobile users." },
      { step: "Google Ads Campaign Structure", detail: "PI campaigns require tightly controlled ad groups by injury type and location. We build separate ad groups for car accidents, trucking, motorcycle, and slip-and-fall with match-type controls that prevent wasted spend on unqualified queries." },
      { step: "Local Service Ads Setup and Management", detail: "LSAs are often the highest-converting placement in PI. We get your firm Google Screened, build out the LSA profile, and manage bids to maximize qualified call volume within your budget." },
      { step: "Monthly Reporting Tied to Case Inquiries", detail: "We track keyword rankings, map pack positions, and paid campaign performance — but the metric that matters most is qualified case contacts. Every report connects marketing activity to actual intake volume." },
    ],
    faqs: [
      { question: "How competitive is PI lawyer SEO?", answer: "Personal injury is one of the most competitive verticals in all of search marketing. CPCs can reach $100-$300 per click in major markets. Organic SEO takes longer to establish but produces significantly lower cost-per-lead once rankings are established." },
      { question: "What's the best marketing channel for PI law firms?", answer: "The combination of Google Local Service Ads (for immediate visibility), Google Ads (for targeted volume), and SEO (for long-term compounding results) outperforms any single channel. The right mix depends on your market and budget." },
    ],
    extendedFaqs: [
      { question: "How long does it take for personal injury SEO to generate leads?", answer: "Most PI firms see initial ranking movement within 3-4 months and meaningful lead flow from organic at the 6-9 month mark. Highly competitive markets (Los Angeles, New York, Houston) can take 12-18 months to reach top-5 positions. Paid ads can generate leads in the first week — combining both channels is the fastest path to a full pipeline." },
      { question: "Should PI firms run Google Ads and SEO at the same time?", answer: "Yes. They serve different functions. Google Ads delivers immediate visibility and cases while your SEO builds authority. As organic rankings improve over time, you can reduce paid spend for terms where you rank organically. Firms that run both in coordination consistently outperform those relying on a single channel." },
      { question: "What case types should PI firms target first in their SEO?", answer: "Start with your highest-value case types in your primary geographic market. For most PI firms, that means motor vehicle accident pages (car, truck, motorcycle) with city-specific variants. These have the highest search volume and the clearest path to cases. Once those are ranking, expand to slip-and-fall, premises liability, and practice-area adjacent terms." },
      { question: "How many reviews does a PI firm need to rank in the map pack?", answer: "There's no fixed number, but in most mid-size markets, PI firms in the top 3 map pack positions average 50-150 Google reviews with a 4.7+ rating. Beyond count, review recency matters — a consistent flow of new reviews signals an active practice. We implement review request workflows that generate 3-5 new reviews per month for active clients." },
      { question: "Do personal injury law firms need separate pages for each accident type?", answer: "Yes. A single 'personal injury' page cannot compete with a firm that has dedicated pages for car accidents, truck accidents, motorcycle accidents, and slip-and-fall with location modifiers. Each page targets its own keyword cluster and provides Google with a clear signal of relevance for that specific case type." },
    ],
  },
  {
    relatedCaseStudies: ["wilson-criminal-defence"],
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
    stats: [
      { value: "72%", label: "of criminal defense searches happen on mobile — site speed is not optional" },
      { value: "48hrs", label: "average window from arrest to attorney hire — you must be found fast" },
      { value: "3x", label: "higher conversion rate for charge-specific landing pages vs. generic criminal defense pages" },
      { value: "24/7", label: "arrests happen at all hours — your Google Ads must run around the clock" },
    ],
    process: [
      { step: "Charge-Specific Page Architecture", detail: "We build individual pages for every charge type you handle: DUI, drug possession, assault, domestic violence, federal charges, and more. Each page targets the charge name plus location, matching how real clients search in crisis." },
      { step: "Mobile-First Website Performance", detail: "Criminal defense clients are searching on their phones, often under stress and in a hurry. We audit and optimize your site for sub-2-second load times on mobile, click-to-call placement, and simplified intake forms that don't ask for 20 fields." },
      { step: "Round-the-Clock Google Ads", detail: "DUI arrests peak on weekends and late nights. Most criminal defense inquiries come outside business hours. We configure campaigns to run 24/7 with bid adjustments for high-intent time windows, and ensure your after-hours contact options are clearly visible." },
      { step: "Map Pack Dominance for Charge-Specific Searches", detail: "We optimize your Google Business Profile for criminal defense categories, build citations in the right legal directories, and generate a consistent flow of client reviews. The map pack captures searchers who are looking for someone local and available now." },
      { step: "Trust-Building Content Strategy", detail: "Clients hiring a criminal defense attorney need to believe you can win. We produce case result pages, attorney bio content that highlights courtroom experience, and FAQ content that answers the specific questions people ask after being charged." },
      { step: "Intake Process Optimization", detail: "Getting to the top of Google means nothing if your intake process loses leads. We audit your contact form, phone answer rates, and after-hours options — then recommend changes that convert more of your inbound traffic into actual consultations." },
    ],
    faqs: [
      { question: "Should criminal defense firms run Google Ads?", answer: "Yes — criminal defense is one of the best practice areas for PPC because intent is high and timing matters. A client who just got a DUI charge and searches for an attorney needs immediate results. Paid ads put you at the top instantly." },
      { question: "What keywords work best for criminal defense SEO?", answer: "Practice-area specific terms (DUI lawyer, drug charge attorney, assault lawyer) combined with your city name consistently outperform generic 'criminal defense lawyer' terms in both SEO and PPC." },
    ],
    extendedFaqs: [
      { question: "How important is website speed for criminal defense law firms?", answer: "Critical. Criminal defense clients are searching in moments of urgency — they're not going to wait 5 seconds for your page to load. Our analysis of criminal defense firm websites shows that every second of additional load time increases bounce rates by 20-30%. A fast-loading mobile site is one of the highest-ROI improvements a criminal defense firm can make." },
      { question: "Should criminal defense attorneys have separate pages for DUI and general criminal defense?", answer: "Absolutely. A single criminal defense page competes for a broad, highly competitive term. Separate pages for DUI, drug charges, assault, and other charges each have their own keyword clusters — and someone searching 'DUI lawyer Denver' has much more specific intent than someone searching 'criminal lawyer Denver'. Specific pages convert better and rank faster." },
      { question: "How do criminal defense firms get more Google reviews?", answer: "The challenge is that many criminal defense clients don't want to publicly advertise that they needed a criminal attorney. The solution is a private, direct review request sent via text or email immediately after a positive case resolution — when client satisfaction is highest. We build these review workflows and typically generate 4-8 new reviews per month for active criminal defense clients." },
      { question: "What's a realistic SEO timeline for a criminal defense firm in a competitive city?", answer: "In a mid-size market (city population 100,000-500,000), most criminal defense firms see meaningful map pack improvement within 60-90 days and organic ranking improvements for specific charge terms within 3-5 months. Major cities (top 20 metro areas) take longer — typically 6-12 months for top-5 organic positions on competitive terms like 'DUI lawyer [city]'." },
      { question: "Do criminal defense firms benefit from content marketing?", answer: "Yes, but the content type matters. Educational content that answers post-arrest questions ('what happens after a DUI arrest', 'can a drug charge be expunged') captures high-intent searches from people at the beginning of their attorney search. This content also builds E-E-A-T signals that improve your overall domain authority." },
    ],
  },
  {
    relatedCaseStudies: ["the-sands-law-group"],
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
    relatedCaseStudies: ["immigration-desk"],
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
    stats: [
      { value: "45M+", label: "Spanish speakers in the US represent a massive underserved legal market" },
      { value: "60%", label: "of immigration searches in bilingual markets occur in a language other than English" },
      { value: "120+", label: "distinct immigration visa categories — each with its own search demand" },
      { value: "2x", label: "higher conversion rate for Spanish-language landing pages in Hispanic-majority markets" },
    ],
    process: [
      { step: "Visa-Type Page Architecture", detail: "We map your practice to specific visa categories: family-based petitions, employment visas (H-1B, L-1, O-1), green card applications, naturalization, DACA, asylum, and deportation defense. Each gets its own page targeting the exact terms people use when searching for that visa type." },
      { step: "Multilingual SEO Strategy", detail: "We build parallel English and Spanish content tracks where your market justifies it. Spanish-language immigration searches are underserved by most firms — ranking for 'abogado de inmigración [ciudad]' often requires far less competition than its English equivalent." },
      { step: "Google Business Profile for Community Trust", detail: "Immigration clients pick attorneys who serve their community. We optimize your GBP to reflect the languages you serve, the communities you work with, and the specific immigration services you offer. Photos, service descriptions, and posts all reinforce trust for non-English speaking clients." },
      { step: "Educational Content for Every Stage of the Process", detail: "Immigration clients research extensively before calling. We produce content that answers the questions people actually ask: how long does a green card take, what happens at a naturalization interview, what are my rights if ICE comes to my door. This builds authority and captures clients early." },
      { step: "Deportation Defense Urgency Campaigns", detail: "Deportation defense cases are time-critical. We build dedicated pages and, where appropriate, targeted paid campaigns for removal defense, bond hearings, and emergency immigration matters — with 24/7 contact options prominently positioned." },
      { step: "Referral and Community Network Development", detail: "Immigration clients often find attorneys through community networks — churches, cultural organizations, other immigrants. We help build the online presence that supports these offline referral relationships: reviews in multiple languages, community-specific content, and a website that builds credibility on first visit." },
    ],
    faqs: [
      { question: "Should immigration law firms have multilingual websites?", answer: "In most markets, yes. Spanish-language search volume alone can represent 20-40% of your total addressable audience. We build multilingual SEO strategies that target both English and Spanish searchers for immigration services." },
    ],
    extendedFaqs: [
      { question: "What are the most searched immigration keywords attorneys should target?", answer: "The highest-volume immigration searches typically include green card lawyer, citizenship attorney, deportation lawyer, DACA attorney, and visa application help — all with city modifiers. Visa-specific terms like H-1B attorney or asylum lawyer have lower volume but higher intent. We research your specific market and recommend a keyword strategy based on actual search demand in your city." },
      { question: "How does immigration law SEO differ from other practice areas?", answer: "The biggest difference is the multilingual dimension. A well-executed Spanish-language SEO strategy can double your organic traffic in markets with significant Hispanic populations — and that traffic often converts at higher rates because Spanish-language search results are far less competitive. Immigration SEO also requires content organized by visa type rather than just 'immigration lawyer'." },
      { question: "Should immigration firms invest in Google Ads?", answer: "Selectively. Google Ads work well for deportation defense (time-critical searches), specific visa types with high case values (EB-5, O-1, employment visas), and in markets where organic rankings are still developing. For general immigration and family visas, SEO typically delivers better long-term ROI. We recommend starting with paid ads on your highest-value case types while SEO builds momentum." },
      { question: "How do immigration attorneys get more positive reviews from clients?", answer: "The challenge is that many immigration clients are cautious about leaving online reviews that identify them as immigrants. The solution is to request reviews immediately after a positive outcome — when satisfaction is highest — and to offer options like leaving an anonymous review or a testimonial without identifying details. We build review systems that generate consistent reviews while being sensitive to client privacy concerns." },
      { question: "What's the ROI of a Spanish-language SEO strategy for immigration firms?", answer: "In markets with significant Hispanic populations, a Spanish-language SEO investment typically generates leads at 30-50% lower cost than English-language SEO because competition is weaker. For an immigration firm that handles 20-30 cases per month, adding a Spanish-language track to an existing SEO program often pays for itself within the first 3-4 months." },
    ],
  },
  {
    relatedCaseStudies: ["the-sands-law-group"],
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
    relatedCaseStudies: ["the-sands-law-group"],
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
    relatedCaseStudies: ["the-sands-law-group"],
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
    relatedCaseStudies: ["the-sands-law-group"],
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
    relatedCaseStudies: ["the-sands-law-group"],
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
    relatedCaseStudies: ["the-sands-law-group"],
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
    relatedCaseStudies: ["the-sands-law-group"],
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
    relatedCaseStudies: ["wilson-criminal-defence"],
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
    relatedCaseStudies: ["the-sands-law-group"],
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
    relatedCaseStudies: ["the-sands-law-group"],
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
    relatedCaseStudies: ["the-sands-law-group"],
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
    relatedCaseStudies: ["the-sands-law-group"],
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
    relatedCaseStudies: ["the-sands-law-group"],
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
