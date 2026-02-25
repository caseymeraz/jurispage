export interface ServiceData {
  slug: string;
  title: string;
  heading: string;
  tagline: string;
  primaryKeyword: string;
  description: string;
  intro: string;
  features: string[];
  faqs: { question: string; answer: string }[];
}

export const services: ServiceData[] = [
  {
    slug: "law-firm-seo",
    title: "Law Firm SEO Services | JurisPage",
    heading: "Law Firm SEO That Brings In Real Cases",
    tagline: "Stop guessing. Start ranking.",
    primaryKeyword: "law firm SEO",
    description: "JurisPage provides law firm SEO services that drive qualified traffic and real case inquiries. Transparent pricing, no long-term contracts.",
    intro: "Most law firms know they need SEO. Few understand what it actually takes to rank competitively and convert that traffic into signed clients. We do — because we've done it for 113+ law firms across every practice area.",
    features: [
      "Technical SEO audit and on-page optimization",
      "Practice area and location keyword targeting",
      "Link building from legal and local authority sites",
      "Google Business Profile optimization",
      "Monthly reporting tied to case inquiries, not just rankings",
    ],
    faqs: [
      { question: "How long does law firm SEO take to show results?", answer: "Most clients see measurable ranking movement within 60-90 days. Significant lead flow improvements typically appear at the 6-12 month mark, depending on your market and starting point." },
      { question: "Do you guarantee rankings?", answer: "No ethical SEO agency guarantees rankings — Google controls that. We guarantee our work, our deliverables, and our 90-day results commitment: if you're not seeing movement, we work for free the following month." },
      { question: "What makes law firm SEO different from general SEO?", answer: "Legal is a YMYL (Your Money or Your Life) category, which means Google applies stricter E-E-A-T standards. Legal sites also face unique challenges: bar advertising ethics, local map pack competition, and practice area keyword structures that require legal-specific expertise." },
      { question: "Do I need SEO if I'm already running Google Ads?", answer: "Yes. Paid ads stop the moment you stop paying. SEO compounds over time and eventually produces leads at a fraction of the cost per acquisition. Most firms benefit from running both simultaneously." },
    ],
  },
  {
    slug: "google-ads-for-law-firms",
    title: "Google Ads for Law Firms | JurisPage",
    heading: "Google Ads for Law Firms That Actually Convert",
    tagline: "Pay for clients, not just clicks.",
    primaryKeyword: "Google Ads for lawyers",
    description: "JurisPage manages Google Ads campaigns for law firms with a focus on qualified leads, not vanity metrics. No wasted spend.",
    intro: "The average law firm Google Ads account wastes 40-60% of its budget on irrelevant clicks. We've audited hundreds of campaigns. Bad keyword targeting, weak ad copy, and landing pages that don't convert are the culprits. We fix all three.",
    features: [
      "Campaign setup and full account audit",
      "Practice area and location targeting",
      "Negative keyword management to eliminate waste",
      "Ad copy testing built around case acquisition intent",
      "Monthly reporting tied to call and form conversions",
    ],
    faqs: [
      { question: "How much does Google Ads management cost?", answer: "Our Google Ads management is included in the Grow and Dominate plans, or available as an add-on. Ad spend is separate and paid directly to Google — we don't mark it up." },
      { question: "What's the difference between Google Ads and Local Service Ads?", answer: "Google Ads (traditional PPC) shows text ads across Google's network. Local Service Ads (LSAs) appear at the very top of results with a 'Google Screened' badge and charge per lead rather than per click. Most law firms benefit from running both." },
      { question: "How quickly do Google Ads generate leads?", answer: "Unlike SEO, Google Ads can generate calls and form submissions within 24-48 hours of launch. The first 30-60 days are typically a learning phase where we optimize bidding and targeting for your specific market." },
    ],
  },
  {
    slug: "law-firm-websites",
    title: "Law Firm Website Design | JurisPage",
    heading: "Law Firm Websites Built to Convert Visitors Into Clients",
    tagline: "Your website is your best salesperson.",
    primaryKeyword: "law firm website design",
    description: "JurisPage designs law firm websites that load fast, rank in Google, and convert visitors into consultation requests.",
    intro: "Most law firm websites fail the moment a potential client arrives. Slow load times, generic content, no clear call to action, and design that looks like it was built in 2015. We build sites that do the opposite — fast, credible, and conversion-optimized from day one.",
    features: [
      "Custom WordPress design built for law firms",
      "Mobile-first, Core Web Vitals optimized",
      "SEO-ready architecture from day one",
      "Conversion-focused page layouts (clear CTAs, trust signals)",
      "Delivered in 30 days for Launchpad clients",
    ],
    faqs: [
      { question: "Will I own my website?", answer: "Yes, always. Your domain, your WordPress installation, your content — all 100% yours. Unlike agencies that host on proprietary platforms, you can take your website anywhere at any time." },
      { question: "How long does a new website take?", answer: "Launchpad websites are live within 30 days. Custom redesigns for Grow and Dominate clients typically take 45-60 days depending on content readiness." },
      { question: "Do you design on WordPress?", answer: "Yes. WordPress is the standard for law firm websites for good reason — it's flexible, SEO-friendly, and every developer can work with it if you ever need to change agencies." },
    ],
  },
  {
    slug: "local-seo-for-law-firms",
    title: "Local SEO for Law Firms | JurisPage",
    heading: "Local SEO for Law Firms: Dominate the Map Pack",
    tagline: "Get found by clients searching near you.",
    primaryKeyword: "local SEO for law firms",
    description: "JurisPage specializes in local SEO for law firms — Google Business Profile, map pack rankings, and local citation building that drives case inquiries.",
    intro: "When a potential client types 'personal injury lawyer near me,' they see the map pack first. Three results. If you're not in that pack, you're invisible to the most motivated searchers in your market. Local SEO is how you get there and stay there.",
    features: [
      "Google Business Profile setup and ongoing optimization",
      "Local citation building (directories, legal listings)",
      "NAP consistency audit and cleanup",
      "Review strategy and response management",
      "Localized landing pages for service areas",
    ],
    faqs: [
      { question: "What is local SEO for law firms?", answer: "Local SEO is the set of tactics that help your law firm appear in Google's map pack — the 3-pack of results with a map pin shown for searches like 'personal injury lawyer near me' or 'divorce attorney [city].' It includes Google Business Profile optimization, citation building, and local content strategies." },
      { question: "How important is the Google map pack for law firms?", answer: "Extremely. Studies show that map pack results receive 44% of all clicks for local searches. For practice areas like PI, criminal defense, and family law, most clients search with local intent." },
      { question: "How do reviews affect local SEO rankings?", answer: "Review quantity, recency, and rating are all ranking signals for the map pack. We build a systematic review generation strategy as part of every local SEO engagement." },
    ],
  },
  {
    slug: "launchpad",
    title: "Launchpad — Law Firm Marketing for New Attorneys | JurisPage",
    heading: "JurisPage Launchpad: Marketing for New Law Firms",
    tagline: "Everything you need to open your doors online. Fast.",
    primaryKeyword: "startup law firm marketing",
    description: "JurisPage Launchpad is a complete marketing package for attorneys launching a new law firm. Website live in 30 days, local SEO, and Google Business Profile included.",
    intro: "Starting a law firm is hard enough. Marketing it shouldn't require a six-figure budget or three different vendors. Launchpad is a single package that gives you everything you need to start attracting clients online — from your first website to your first Google review strategy.",
    features: [
      "Professional WordPress website (live in 30 days)",
      "Google Business Profile setup and verification",
      "Local SEO foundation (citations, on-page)",
      "Branded email setup",
      "Basic citation building",
    ],
    faqs: [
      { question: "Who is Launchpad designed for?", answer: "Attorneys opening their first firm, lawyers leaving a larger firm to go independent, and small practices (1-3 attorneys) that have been running on referrals alone and need to build an online presence." },
      { question: "What's the difference between Launchpad and DIY website builders?", answer: "DIY builders like Squarespace or Wix can look fine but are SEO nightmares for law firms. Launchpad is built on WordPress with proper SEO structure, local optimization, and the same professional foundation that larger firms pay much more for." },
      { question: "Can I upgrade to a higher plan later?", answer: "Yes. Launchpad is designed as a foundation. Most clients move to Grow 6-12 months in once they're established and ready to add SEO and paid advertising. There's no penalty and no restart needed." },
    ],
  },
  {
    slug: "generative-engine-optimization-for-law-firms",
    title: "Generative Engine Optimization for Law Firms | JurisPage",
    heading: "GEO for Law Firms: Get Cited in ChatGPT, Perplexity, and AI Overviews",
    tagline: "The next search battle is in AI. Win it first.",
    primaryKeyword: "generative engine optimization for law firms",
    description: "JurisPage offers Generative Engine Optimization (GEO) services for law firms — helping attorneys get recommended inside ChatGPT, Perplexity, AI Overviews, and other AI-powered search experiences.",
    intro: "When someone asks ChatGPT 'I was rear-ended yesterday, do I need a lawyer?' — that's a qualified lead. AI search is handling millions of legal queries every day. Most law firms have zero presence in those answers. GEO changes that.",
    features: [
      "E-E-A-T authority building for AI search visibility",
      "Structured content formatting for AI citation",
      "Entity optimization (attorney profiles, firm schema)",
      "AI Overview monitoring and presence tracking",
      "Integration with existing SEO content strategy",
    ],
    faqs: [
      { question: "What is Generative Engine Optimization (GEO)?", answer: "GEO is the practice of optimizing your law firm's online presence to appear in AI-generated answers — including Google AI Overviews, ChatGPT responses, Perplexity answers, and other AI search tools. As more legal searches go through AI interfaces, GEO becomes as important as traditional SEO." },
      { question: "How is GEO different from traditional SEO?", answer: "Traditional SEO targets the blue link results in Google. GEO targets the AI-generated summaries that appear above those results (AI Overviews) or in standalone AI tools. The signals are different: AI systems favor authoritative, well-structured, E-E-A-T-strong content with clear entity connections." },
      { question: "Which practice areas benefit most from GEO?", answer: "Personal injury, criminal defense, family law, and immigration all see significant question-based searches that AI systems are answering. Any practice area where clients ask research questions before calling a lawyer benefits from GEO visibility." },
    ],
  },
  {
    slug: "ai-chatbot-for-law-firm-website",
    title: "AI Chatbot for Law Firm Websites | JurisPage",
    heading: "AI Chatbot for Law Firms: Capture Leads at 2am",
    tagline: "Your firm is open 24/7. Your intake shouldn't stop when you do.",
    primaryKeyword: "AI chatbot for law firm website",
    description: "JurisPage deploys AI chatbots for law firm websites that capture leads after hours, qualify prospects, and reduce response time.",
    intro: "40% of legal case inquiries come outside business hours. If your website has no way to respond, you lose those potential clients to whoever answers first. An AI chatbot captures them, qualifies them, and gets their information into your intake system before morning.",
    features: [
      "Custom-trained chatbot for your practice area",
      "24/7 lead capture and basic intake qualification",
      "SMS/email notification for new inquiries",
      "Integration with major CRM and intake tools",
      "Compliance-aware conversation design",
    ],
    faqs: [
      { question: "Is an AI chatbot compliant with bar advertising rules?", answer: "Properly configured, yes. We design chatbot conversations that follow bar advertising guidelines — including disclaimers that the chatbot does not create an attorney-client relationship and that information shared is for contact purposes only." },
      { question: "How much does a law firm AI chatbot cost?", answer: "The AI chatbot is available as an add-on to Grow or Dominate plans. Contact us for current pricing based on your practice area and website traffic volume." },
      { question: "Can the chatbot handle complex legal questions?", answer: "The chatbot is designed for intake, not legal advice. It's trained to gather prospect information, answer basic FAQs about your firm, and route complex questions to a human — while keeping the conversation on track for case qualification." },
    ],
  },
  {
    slug: "law-firm-email-marketing",
    title: "Law Firm Email Marketing | JurisPage",
    heading: "Law Firm Email Marketing That Keeps Clients and Referral Sources Warm",
    tagline: "The cheapest lead you'll ever get is a referral from a past client.",
    primaryKeyword: "law firm email marketing",
    description: "JurisPage builds and manages email marketing programs for law firms that generate referrals, nurture prospects, and re-engage past clients.",
    intro: "Most law firms collect email addresses and do nothing with them. Past clients, referral partners, newsletter subscribers — all sitting in a list that generates zero revenue. Email marketing changes that with a disciplined, compliance-aware approach to staying top of mind.",
    features: [
      "Email campaign strategy and content calendar",
      "Referral partner nurture sequences",
      "Past client re-engagement campaigns",
      "Practice area newsletter setup",
      "CRM integration and list management",
    ],
    faqs: [
      { question: "What kind of emails should a law firm send?", answer: "The most effective law firm emails include: past client newsletters with relevant legal updates, referral partner check-ins, case outcome announcements (for relevant practice areas), and educational content that keeps your firm top of mind when a need arises." },
      { question: "Are there legal compliance concerns with law firm email marketing?", answer: "Yes. CAN-SPAM and state bar advertising rules both apply. We build campaigns with compliant opt-in practices, proper disclaimers, and unsubscribe functionality." },
    ],
  },
  {
    slug: "bing-ads-for-lawyers",
    title: "Bing Ads for Lawyers | JurisPage",
    heading: "Bing Ads for Lawyers: The Overlooked 35%",
    tagline: "Your competitors aren't on Bing. That's your advantage.",
    primaryKeyword: "Bing ads for lawyers",
    description: "JurisPage manages Bing and Microsoft Ads campaigns for law firms. 35% of legal searches happen outside Google — most firms ignore them completely.",
    intro: "Bing powers search on Edge, Outlook, Copilot AI, and Microsoft 365 — all with users who skew older, wealthier, and more likely to need an attorney. And because most law firms only run Google Ads, competition on Bing is a fraction of what you'd pay on Google.",
    features: [
      "Microsoft Ads campaign setup and management",
      "Cross-platform keyword strategy (Google + Bing)",
      "Audience targeting for Bing's demographic skew",
      "Copilot AI search integration",
      "Monthly reporting across both platforms",
    ],
    faqs: [
      { question: "Is Bing Ads worth it for law firms?", answer: "Yes, especially as Bing grows through Microsoft Copilot integration. Average CPCs on Bing are 30-50% lower than Google for legal keywords, and conversion rates are comparable. Most law firms ignore Bing entirely, which means less competition for you." },
      { question: "Can I run Google Ads and Bing Ads simultaneously?", answer: "Absolutely, and it's recommended. We manage both platforms with a unified strategy to maximize coverage without duplicating spend." },
    ],
  },
  {
    slug: "law-firm-content-writing",
    title: "Law Firm Content Writing Services | JurisPage",
    heading: "Law Firm Content Writing: SEO Blog Posts and Practice Area Pages",
    tagline: "Content that ranks. Copy that converts.",
    primaryKeyword: "law firm content writing services",
    description: "JurisPage writes law firm blog posts, practice area pages, and legal guides that rank in Google and convert visitors into consultation requests.",
    intro: "Content is the fuel that makes SEO work. Without a consistent publishing cadence, even the best technical SEO stalls. Our legal content writers produce practice area pages, blog posts, and legal guides that are written for humans first and optimized for Google second.",
    features: [
      "SEO-optimized blog posts (1,500-3,000+ words)",
      "Practice area page rewrites and expansions",
      "Attorney bios and legal guide content",
      "AI-assisted drafting with human attorney review",
      "Internal linking strategy built into every piece",
    ],
    faqs: [
      { question: "Do your writers have legal backgrounds?", answer: "Our legal content team combines SEO expertise with legal research skills and attorney review processes. All practice area content is reviewed for accuracy before publication. We're not writing legal advice — we're writing marketing content that accurately represents what attorneys do." },
      { question: "How many articles per month do I get?", answer: "Content writing is included in the Dominate plan (monthly blog + practice pages) or available as a standalone add-on. Volume depends on your plan and goals — contact us for specifics." },
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return services.find((s) => s.slug === slug);
}
