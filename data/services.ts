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
  relatedCaseStudies?: string[];
  // Phase 3 enrichment fields
  whyMatters?: string;
  process?: { step: string; detail: string }[];
  stats?: { value: string; label: string }[];
  signs?: string[];
  extendedFaqs?: { question: string; answer: string }[];
}

export const services: ServiceData[] = [
  {
    relatedCaseStudies: ["wilson-criminal-defence", "the-sands-law-group"],
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
    whyMatters: "Law firm SEO is the difference between your website sitting on page three and it generating 15-20 qualified case inquiries every month. Over 70% of prospective legal clients start their search on Google, and the firms in the top three organic positions capture the overwhelming majority of that traffic. Without a disciplined SEO strategy, you are funding your competitors' growth every time a potential client searches for a lawyer in your practice area.",
    process: [
      {
        step: "Technical Audit",
        detail: "We start with a full crawl of your site to identify indexing issues, Core Web Vitals failures, broken links, duplicate content, and schema gaps. Most law firm sites have 15-25 fixable technical issues holding them back before we ever write a word of content.",
      },
      {
        step: "Keyword Research and Strategy",
        detail: "We map out every practice area and location combination worth targeting, ranked by search volume and competitive difficulty. You get a clear picture of which keywords drive cases, not just traffic, before we start any work.",
      },
      {
        step: "On-Page Optimization",
        detail: "We rewrite or restructure your practice area pages around the right keyword targets, proper heading hierarchy, E-E-A-T signals, and conversion-focused copy. Title tags, meta descriptions, schema markup, and internal linking all get cleaned up in month one.",
      },
      {
        step: "Content Publishing",
        detail: "We build out a content calendar targeting high-intent queries your potential clients are already searching. Each piece is written for the reader first and optimized for Google second — no thin AI content that triggers Google's quality filters.",
      },
      {
        step: "Link Building",
        detail: "We earn backlinks from legal directories, local news sites, bar associations, and practice-area adjacent publications. Every link is manually vetted. We do not use link farms, private blog networks, or link exchanges.",
      },
      {
        step: "Monthly Reporting",
        detail: "You get a clear monthly report showing keyword position changes, organic traffic trends, and most importantly, the number of phone calls and form submissions attributable to organic search. Rankings are a means to an end — cases are the metric that matters.",
      },
    ],
    stats: [
      { value: "113+", label: "Law firms served across every practice area" },
      { value: "68%", label: "Average increase in organic case inquiries within 12 months" },
      { value: "6-12 mo", label: "Typical timeline to significant lead flow improvement" },
      { value: "#1", label: "Focus: case inquiries, not vanity rankings" },
    ],
    signs: [
      "Your website gets traffic but very few consultation requests — you rank for broad terms but not the high-intent practice area searches that convert.",
      "Competitors you consider inferior are outranking you consistently, even for searches in your own city.",
      "You have no idea which of your pages are driving calls because no tracking is set up.",
      "Your last SEO agency sent monthly reports full of graphs but could never connect the work to actual case leads.",
      "You launched a new website 6-12 months ago and organic traffic has not recovered to prior levels.",
    ],
    extendedFaqs: [
      {
        question: "How much does law firm SEO cost?",
        answer: "Law firm SEO typically ranges from $1,500 to $10,000+ per month depending on market competitiveness, practice area, and scope of work. Our Grow plan starts at a published price you can see on our pricing page without booking a discovery call. We do not quote differently based on firm size.",
      },
      {
        question: "What is E-E-A-T and why does it matter for law firm websites?",
        answer: "E-E-A-T stands for Experience, Expertise, Authoritativeness, and Trustworthiness. Google uses these signals to evaluate whether content on YMYL (Your Money or Your Life) topics like legal advice should rank. For law firms, this means having attorney bios with credentials, bar memberships listed, case results where permitted, and content written or reviewed by actual attorneys. Sites that lack these signals struggle to rank regardless of how good their technical SEO is.",
      },
      {
        question: "What is the difference between law firm SEO and local SEO?",
        answer: "Traditional law firm SEO targets organic blue-link rankings across all of Google Search. Local SEO specifically targets the map pack — the three local business results shown with a map pin. Both matter, and both are included in our work. For most practice areas, the map pack gets 40%+ of clicks for searches with local intent, so ignoring it means leaving a large portion of potential leads on the table.",
      },
      {
        question: "Can I do law firm SEO myself?",
        answer: "You can handle some elements, like publishing practice area content and managing your Google Business Profile. But competitive law firm SEO in most markets requires technical expertise, consistent link building, and ongoing optimization that is difficult to manage alongside a full-time legal practice. Most solo attorneys who start DIY SEO see initial gains stall within 6 months as competitors with professional help pull ahead.",
      },
      {
        question: "How do I know if my current SEO agency is actually doing anything?",
        answer: "Ask for a report that shows keyword position changes tied to specific deliverables (pages published, links built, technical fixes completed). If your agency sends charts without connecting them to work output, that is a red flag. You should also be able to verify in Google Search Console that organic impressions and clicks are trending upward over a 6-month window. If neither of those things is happening, it is time for an audit.",
      },
    ],
  },
  {
    relatedCaseStudies: ["immigration-desk", "the-sands-law-group"],
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
    whyMatters: "Google Ads for lawyers sits at the top of every high-intent search — the moment someone types 'criminal defense attorney near me' or 'personal injury lawyer free consultation,' paid results are the first thing they see. Legal is one of the most expensive advertising categories on Google, with some keywords costing $50-200+ per click. That means a poorly managed account burns through budget fast, while a well-managed one delivers qualified case inquiries at a predictable cost. The difference is almost entirely in how the account is structured and managed day-to-day.",
    process: [
      {
        step: "Account Audit",
        detail: "If you have an existing account, we do a full audit before touching anything. We identify wasted spend from broad match keywords, missing negative keyword lists, low-quality score ads, and conversion tracking gaps. Most accounts we inherit have recoverable waste of 30-50% of monthly spend.",
      },
      {
        step: "Campaign Architecture",
        detail: "We structure campaigns by practice area, not by keyword theme. Each practice area gets its own campaign with tightly themed ad groups of 3-5 keywords maximum. This approach improves Quality Score, reduces cost per click, and makes it easy to allocate budget where it is working.",
      },
      {
        step: "Keyword Strategy and Match Types",
        detail: "We build precise keyword lists using exact and phrase match types, paired with a robust negative keyword list that blocks irrelevant searches from day one. Legal PPC requires aggressive negative keyword management — terms like 'law school,' 'salary,' and 'template' waste thousands of dollars per month if not excluded.",
      },
      {
        step: "Ad Copy and Landing Page Alignment",
        detail: "We write ad copy that speaks directly to case-acquisition intent and matches the language of your landing page. A visitor searching 'DUI lawyer no jail time' should land on a page that addresses that exact concern, not your generic homepage. We set up or optimize dedicated landing pages for each practice area.",
      },
      {
        step: "Conversion Tracking Setup",
        detail: "We implement call tracking and form tracking so every dollar spent is tied to an actual lead action. Without proper conversion data, Google's automated bidding has nothing to optimize for — and you have no idea which keywords are generating cases versus wasting money.",
      },
      {
        step: "Ongoing Optimization and Reporting",
        detail: "Every month we review search term reports, pause low-performers, expand what is working, and adjust bids based on conversion data. You receive a report showing cost per lead, total leads generated, and the keywords driving them — not just impressions and click-through rates.",
      },
    ],
    stats: [
      { value: "40-60%", label: "Budget waste in typical unmanaged law firm PPC accounts" },
      { value: "24-48 hrs", label: "Time to first leads after campaign launch" },
      { value: "$50-200+", label: "Cost per click for competitive legal keywords" },
      { value: "113+", label: "Law firm campaigns audited and managed" },
    ],
    signs: [
      "You are spending $3,000+ per month on Google Ads but cannot tell which keywords are generating actual consultations.",
      "Your campaigns are using broad match keywords on legal terms, which means you are paying for searches like 'law school near me' or 'attorney salary.'",
      "Your ads send visitors to your homepage instead of a practice area-specific landing page.",
      "Conversion tracking is not set up, so Google has no data to optimize your bids against.",
      "Your cost per lead has been climbing every month and your agency's explanation is 'the market is more competitive.'",
    ],
    extendedFaqs: [
      {
        question: "How much should a law firm spend on Google Ads?",
        answer: "It depends entirely on your practice area and market. Personal injury and criminal defense in major metros often require $5,000-$20,000+ per month in ad spend to generate meaningful volume. Smaller markets and niche practice areas can see results with $2,000-$5,000 per month. The more important number is cost per acquired case, not total spend. We can estimate realistic lead costs for your specific market before you commit to a budget.",
      },
      {
        question: "Should I use broad match or exact match keywords for legal ads?",
        answer: "For most law firm campaigns, we start with exact and phrase match keywords. Broad match can work once you have strong conversion data and a robust negative keyword list, but in the early stages it almost always leads to wasted spend on irrelevant searches. Legal keywords are expensive enough that precise targeting from day one is non-negotiable.",
      },
      {
        question: "What is a good cost per lead for law firm Google Ads?",
        answer: "It varies significantly by practice area. Personal injury leads might cost $150-400 per form submission but represent cases worth $10,000-$100,000+, making even high CPLs worthwhile. Family law and immigration leads in smaller markets might target $50-150 per lead. The right benchmark is your case value and conversion rate from lead to signed client, not an arbitrary CPL target.",
      },
      {
        question: "Should law firms use Performance Max campaigns?",
        answer: "We approach Performance Max campaigns cautiously for law firms. They offer limited control over placement and search terms, which is a problem in legal where ad placements need to match bar advertising guidelines and irrelevant traffic is expensive. For most firms, we recommend well-structured Search campaigns first, then test Performance Max once you have strong conversion data to guide the algorithm.",
      },
      {
        question: "Can I run Google Ads myself without an agency?",
        answer: "You can, and some attorneys do manage their own accounts effectively. But legal is one of the most expensive categories on Google, which means mistakes cost more than in most industries. A single week of broad match keywords on the wrong terms can waste an entire month's budget. If you manage it yourself, invest time in learning keyword match types, negative keywords, and conversion tracking before spending significant money.",
      },
    ],
  },
  {
    relatedCaseStudies: ["the-sands-law-group"],
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
    stats: [
      { value: "57%", label: "Of users abandon sites that take more than 3 seconds to load" },
      { value: "30 days", label: "Guaranteed launch timeline for Launchpad website projects" },
      { value: "100%", label: "Client ownership of domain, WordPress, and content" },
      { value: "3x", label: "Average improvement in contact form submissions after redesign" },
    ],
    whyMatters: "Your website is the first thing a prospective client evaluates before calling your office. A slow, generic, or dated site tells that person everything they need to know about how your firm presents itself. Over 70% of legal consumers visit a law firm website before making contact, and most make a decision about credibility within the first 10 seconds. A professionally designed site built for law firms is not a marketing luxury - it is the foundation every other channel (SEO, paid ads, referrals) relies on to actually convert.",
    process: [
      {
        step: "Discovery and Strategy",
        detail: "We start with a 60-minute intake covering your practice areas, target client profile, geographic focus, and competitive landscape. We research your top local competitors, identify what the top-ranking law firm sites are doing right, and map out a site architecture that positions you to win in your market.",
      },
      {
        step: "Wireframe and Content Planning",
        detail: "Before any design starts, we wireframe every key page - homepage, practice area pages, attorney bios, and contact. We identify which pages need to convert visitors (practice area pages) versus which build trust (about, attorney profiles), and plan content accordingly so design and copy are built together, not bolted on afterward.",
      },
      {
        step: "Design and Brand Development",
        detail: "We build a custom WordPress design that reflects your firm's identity - not a recycled template with your logo dropped in. Every page layout is built around conversion: phone number prominent, clear call-to-action above the fold, trust signals (awards, bar memberships, case results where permitted) placed where they will actually be seen.",
      },
      {
        step: "SEO Foundation Setup",
        detail: "Every site we build launches with proper on-page SEO from day one. Title tags, meta descriptions, heading structure, schema markup (attorney, law firm, FAQ), XML sitemap, robots.txt, and Google Search Console verification are all configured before the site goes live. Most law firm websites launch without any of this in place.",
      },
      {
        step: "Speed and Core Web Vitals Optimization",
        detail: "We optimize every site for Google's Core Web Vitals - Largest Contentful Paint, Cumulative Layout Shift, and Interaction to Next Paint. This means proper image compression, caching configuration, and code cleanup. A slow site is penalized in rankings and loses visitors before they read a word.",
      },
      {
        step: "Launch and 30-Day Review",
        detail: "We handle the full launch process including DNS configuration, SSL setup, and analytics installation. At 30 days post-launch, we review heatmap data, form submission rates, and Google Search Console performance to identify any early conversion gaps and address them before they cost you leads.",
      },
    ],
    signs: [
      "Your current site takes more than 3 seconds to load on mobile - Google's own data shows bounce rate nearly doubles between 1s and 3s load time.",
      "You have been embarrassed to send potential clients to your website because the design looks unprofessional compared to competitors.",
      "Your site has no clear call to action above the fold - visitors have to scroll or search to figure out how to contact you.",
      "You do not own your website outright; you are on a proprietary platform that requires you to stay with your current vendor to maintain access.",
      "Your attorney bio pages have stock photos and generic descriptions rather than real credentials, case results, and bar admissions.",
    ],
    extendedFaqs: [
      {
        question: "How much does a law firm website cost?",
        answer: "Law firm website design ranges from $3,000 to $25,000+ depending on size and complexity. Our Launchpad plan includes a professional WordPress site at a fixed, published price with a 30-day delivery guarantee. Grow and Dominate plan clients get a full custom redesign as part of their engagement. We do not charge ongoing monthly fees to maintain your WordPress installation - your site is yours.",
      },
      {
        question: "What makes a good law firm website?",
        answer: "The best law firm websites do three things well: they load fast (under 2 seconds on mobile), they establish credibility immediately (real attorney photos, specific credentials, case results where bar rules permit), and they make it frictionless to contact the firm (phone number in the header, contact form on every practice area page). Most law firm sites fail on at least two of those three criteria.",
      },
      {
        question: "Should a law firm use WordPress or a website builder like Wix or Squarespace?",
        answer: "WordPress is the right choice for law firms that care about SEO and long-term control. Wix and Squarespace have improved, but they still limit how much control you have over technical SEO settings, page speed optimization, and structured data markup. More importantly, you cannot take your Wix or Squarespace site to another developer - you are locked in. WordPress sites can be moved, modified, and managed by any developer.",
      },
      {
        question: "How important is mobile design for law firm websites?",
        answer: "Over 60% of legal searches happen on mobile devices. If your site is not designed mobile-first, you are delivering a bad experience to the majority of your potential clients. This means easy-to-tap phone numbers, readable text without zooming, and forms that work correctly on small screens. Google also uses mobile page experience as a ranking factor, so a poor mobile site hurts your SEO directly.",
      },
      {
        question: "Do I need a separate page for each practice area?",
        answer: "Yes, and this is one of the most common structural mistakes law firm websites make. A single practice areas page that lists criminal defense, family law, and personal injury as bullet points is not rankable for any competitive keyword. Each practice area needs its own dedicated page with a specific keyword target, sufficient content depth, and a clear conversion path. Firms that invest in individual practice area pages consistently outrank those that do not.",
      },
    ],
  },
  {
    relatedCaseStudies: ["the-sands-law-group"],
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
    whyMatters: "Local SEO for law firms is not a nice-to-have — it is the primary way most clients find an attorney today. Over 46% of prospective legal clients use Google when researching law firms, and the majority of those searches include local intent. The map pack appears above the organic results for nearly every practice area search in every market. A firm that ranks in the top three map pack positions for their city and practice area typically captures more leads per month from local search alone than firms spending thousands on paid advertising.",
    process: [
      {
        step: "Google Business Profile Audit and Optimization",
        detail: "We start by claiming and fully completing your Google Business Profile — categories, services, attributes, photos, business hours, and a keyword-rich description. Most GBP profiles we inherit are 40-50% complete. Getting to 100% completion is one of the highest-ROI tasks in local SEO.",
      },
      {
        step: "NAP Consistency Cleanup",
        detail: "We audit your Name, Address, and Phone number across every directory, legal listing, and data aggregator where your firm appears. Inconsistent information confuses Google and suppresses local rankings. We fix discrepancies across Avvo, Justia, Martindale, FindLaw, Yelp, and 50+ other sources.",
      },
      {
        step: "Citation Building",
        detail: "We submit your firm to the top legal and local directories, prioritizing those with the highest domain authority and relevance to your practice area. Citation quantity and quality both factor into map pack rankings, and most new and mid-sized firms are significantly under-cited compared to competitors.",
      },
      {
        step: "Review Generation Strategy",
        detail: "Review quantity, recency, and rating are direct ranking signals in the map pack. We build a review generation process your team can actually execute — typically a simple post-matter email sequence or intake follow-up that increases review volume without violating bar advertising rules.",
      },
      {
        step: "Localized Content and Landing Pages",
        detail: "We create location-specific practice area pages targeting searches like 'divorce attorney [city]' and 'DUI lawyer [neighborhood].' These pages signal geographic relevance to Google and capture long-tail local searches that the map pack alone does not cover.",
      },
      {
        step: "Ongoing Monitoring and Reporting",
        detail: "Map pack rankings fluctuate. We track your position weekly using geo-specific rank tracking tools and report on map pack visibility, Google Business Profile views, and direction requests — leading indicators of local search health that most reports ignore.",
      },
    ],
    stats: [
      { value: "44%", label: "Of local search clicks go to the top 3 map pack results" },
      { value: "46%+", label: "Of prospective legal clients start their search on Google" },
      { value: "3x", label: "Average increase in GBP views after full optimization" },
      { value: "113+", label: "Law firms helped dominate their local markets" },
    ],
    signs: [
      "You search your own practice area and city and your firm does not appear in the map pack — competitors you know are smaller or newer show up instead.",
      "Your Google Business Profile was set up years ago and has not been updated since — categories, photos, and service descriptions are minimal or missing.",
      "Your firm appears in Google results but with an incorrect address, old phone number, or wrong business name on some directories.",
      "You have fewer than 10 Google reviews and your primary competitors have 50, 100, or more — and they are actively getting new ones every month.",
      "You serve multiple cities or neighborhoods but have only one location page on your website with no geo-specific content.",
    ],
    extendedFaqs: [
      {
        question: "What is the difference between local SEO and regular SEO for law firms?",
        answer: "Regular (organic) SEO targets the blue-link results that appear below the map pack. Local SEO specifically targets the map pack — the three results shown with a map pin at the top of the page. Both require different tactics. Organic SEO is driven primarily by content quality and backlinks. Local SEO is driven by Google Business Profile signals, citation consistency, review volume, and proximity to the searcher. Most competitive law firm marketing strategies address both.",
      },
      {
        question: "How long does it take to rank in the Google map pack?",
        answer: "In less competitive markets, firms with complete GBP profiles and consistent citations can see map pack appearances within 60-90 days. In competitive markets like large metro areas for personal injury or criminal defense, it can take 6-12 months of sustained effort. The starting point matters a lot — a firm with an existing GBP and some reviews can move faster than one starting from scratch.",
      },
      {
        question: "Does having more Google reviews actually help rankings?",
        answer: "Yes. Google uses review count, average rating, and recency as signals for local prominence — one of the three main map pack ranking factors alongside relevance and proximity. Firms that consistently generate new reviews rank more consistently than those with the same number of old reviews. Responding to reviews also signals active management of your profile, which Google views positively.",
      },
      {
        question: "What local directories matter most for law firms?",
        answer: "The highest-value legal directories for local SEO are Avvo, Justia, Martindale-Hubbell, FindLaw, Super Lawyers, and the state bar directory. Beyond legal-specific directories, being listed consistently on Google Business Profile, Yelp, Bing Places, Apple Maps, and major data aggregators (Acxiom, Data Axle, Neustar Localeze) is critical for citation consistency. Quality matters more than quantity — being accurate on 30 high-authority directories beats being inconsistent on 200.",
      },
      {
        question: "Can a law firm with multiple offices rank locally in each city?",
        answer: "Yes, but each office location needs its own Google Business Profile and its own set of local citations. You cannot rank a single GBP listing across multiple cities. Each location should also have a dedicated page on your website with location-specific content. Firms that try to shortcut this — using one address for multiple service areas — typically see weak local rankings everywhere rather than strong rankings anywhere.",
      },
    ],
  },
  {
    relatedCaseStudies: ["the-sands-law-group"],
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
    stats: [
      { value: "30 days", label: "From signed agreement to live website" },
      { value: "6-12 mo", label: "Typical timeline to upgrade from Launchpad to Grow" },
      { value: "1 vendor", label: "Website, GBP, local SEO, and email all in one package" },
      { value: "0", label: "Long-term contracts required" },
    ],
    whyMatters: "New law firms face a specific challenge: you need cases now, but most marketing channels take months to produce results. Launchpad is designed for that reality. It puts the foundational assets in place immediately - a professional website, a verified Google Business Profile, and correct citation data across directories - so that when potential clients search for your practice area in your city, they find a firm that looks credible and ready to take their case. Getting these basics right from day one is dramatically easier than trying to fix them after six months of inconsistent data has spread across the web.",
    process: [
      {
        step: "Intake and Brand Alignment",
        detail: "We gather your practice areas, target geography, bar admissions, attorney bio information, and any existing brand assets (logo, colors). If you have nothing yet, we help you make fast decisions rather than getting stuck. Most Launchpad clients are operational and sending us materials within 48 hours of signing.",
      },
      {
        step: "Website Build",
        detail: "We build your WordPress site on a clean, fast theme designed specifically for law firms - not a generic business theme adapted for legal. Pages include: homepage, practice area pages for each area you handle, attorney bio, and a contact page with a form and click-to-call phone number. The site launches with title tags, meta descriptions, and schema markup already in place.",
      },
      {
        step: "Google Business Profile Setup and Verification",
        detail: "We set up or claim your Google Business Profile, complete every field (categories, services, business hours, description, photos), and initiate the verification process. GBP verification can take 5-14 days by postcard for new firms - we start this process on day one so it is resolved by the time your site launches.",
      },
      {
        step: "Citation and Directory Foundation",
        detail: "We submit your firm to the essential legal directories (Avvo, Justia, FindLaw, Martindale) and local data aggregators with consistent NAP information. Getting this right from the start prevents the citation inconsistency problems that plague firms who let random directory submissions accumulate over time.",
      },
      {
        step: "Branded Email Configuration",
        detail: "We configure your professional email through Google Workspace or Microsoft 365 so you are sending from yourname@yourfirm.com from day one. This matters for client trust and for email deliverability - emails from gmail.com addresses to potential clients are frequently filtered as spam.",
      },
      {
        step: "Launch Walkthrough and First-30-Days Guidance",
        detail: "We deliver a recorded walkthrough of your new site, GBP dashboard, and what to focus on in your first 30 days. This includes your first review generation playbook - the right way to ask satisfied contacts, former colleagues, and referral sources for Google reviews before you have active clients leaving reviews organically.",
      },
    ],
    signs: [
      "You are about to open your firm or recently launched and have no website - potential referrals from colleagues cannot find you online.",
      "You left a larger firm and your online presence still points to your former employer rather than your own practice.",
      "You have been practicing solo for 6-12 months on referrals but know you need a digital presence to grow beyond your immediate network.",
      "Your current website is a DIY Wix or Squarespace build you threw together quickly - it does not rank for any practice area keywords and converts very few visitors.",
      "You have no Google Business Profile or it was set up incorrectly and shows the wrong address or phone number.",
    ],
    extendedFaqs: [
      {
        question: "How much should a new law firm spend on marketing?",
        answer: "Industry benchmarks suggest law firms should allocate 2-5% of gross revenue to marketing, but new firms obviously have little revenue yet. A practical approach: start with the fixed-cost foundational items (website, GBP, citations) that pay dividends indefinitely, and hold off on paid advertising until you have consistent enough cash flow to absorb a 60-90 day ramp period. Launchpad is specifically priced for this phase.",
      },
      {
        question: "Is it true that new law firms should focus on referrals instead of digital marketing?",
        answer: "Referrals and digital presence are not in competition - they support each other. When a colleague refers a potential client to you, the first thing that person does is Google your name. If they find nothing, or find a half-built site, you lose that referral. A professional website and Google Business Profile make every referral you receive more likely to convert. Referral networking is a great strategy for new firms - just make sure your digital presence does not undermine it.",
      },
      {
        question: "How long does it take for a new law firm website to rank on Google?",
        answer: "New domains typically take 3-6 months before Google starts ranking them for competitive terms. However, a properly configured Google Business Profile can appear in local map pack results much faster - sometimes within 30-60 days for less competitive markets. This is one reason Launchpad prioritizes GBP setup alongside the website build: it gives new firms a faster path to local visibility while the site's domain authority builds over time.",
      },
      {
        question: "Do I need to hire separate vendors for my website, SEO, and Google Business Profile?",
        answer: "You do not, and doing so often creates problems. When your website developer, your SEO vendor, and your GBP manager are three different companies, you end up with inconsistent information, conflicting strategies, and no single point of accountability. Launchpad handles all three as a coordinated package with a single team and a single point of contact.",
      },
      {
        question: "What happens if I need to change my address or phone number after launch?",
        answer: "We update your website, Google Business Profile, and notify the major data aggregators of the change. Address consistency across the web is a live SEO signal, not a one-time setup task. Plan changes (new office, phone system updates) to your Grow or Dominate plan include citation maintenance as a standard service.",
      },
    ],
  },
  {
    relatedCaseStudies: ["the-sands-law-group"],
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
    stats: [
      { value: "28%", label: "Of consumers now use ChatGPT to research lawyers (Juris Digital, 2025)" },
      { value: "40%+", label: "Of Google searches now show an AI Overview above organic results" },
      { value: "2.8M", label: "Google results for 'generative engine optimization for law firms'" },
      { value: "Early", label: "Most law firms have zero deliberate GEO strategy today" },
    ],
    whyMatters: "AI search is not coming - it is already here. Over a quarter of legal consumers now use tools like ChatGPT or Perplexity to research their situation before they ever call an attorney. When someone asks 'do I need a personal injury lawyer after a car accident in Denver,' they are a qualified lead - but only the attorneys whose content gets cited in that answer get consideration. GEO is still a first-mover opportunity in legal: the firms that build AI visibility now will be harder to displace as these systems mature and entrench citation patterns.",
    process: [
      {
        step: "AI Presence Audit",
        detail: "We run systematic queries across ChatGPT, Perplexity, and Google AI Overviews for your practice area and geography to establish your current AI presence baseline. Most law firms discover they are cited in zero of the queries that are actively sending leads to competitors. This audit defines the gap we need to close.",
      },
      {
        step: "Entity and Authority Optimization",
        detail: "AI systems build their knowledge from the web's entity graph. We strengthen your firm's entity signals - complete attorney profiles on authoritative legal directories (Avvo, Justia, Super Lawyers, state bar), properly structured schema markup, and consistent Name-Address-Phone data across every source AI models index. Weak entity definition is the most common reason law firms are invisible in AI answers.",
      },
      {
        step: "Content Structuring for AI Citation",
        detail: "AI systems favor content that directly answers questions in clear, citable formats. We audit your existing practice area pages and blog content, then restructure it with direct-answer formatting: explicit question-answer structure, short declarative sentences, and factual statements that AI models can lift and attribute. This is different from writing for human readers or traditional keyword optimization.",
      },
      {
        step: "Authority Content Development",
        detail: "We identify the specific legal questions your potential clients are asking AI systems right now and build content that answers them with the depth and credibility AI models require for citation. This includes first-person attorney experience signals, specific jurisdictional detail, and references to verifiable facts - the elements that distinguish citable authority content from generic legal information.",
      },
      {
        step: "E-E-A-T Signal Strengthening",
        detail: "Google's AI Overviews and the underlying models used by ChatGPT and Perplexity all weight Experience, Expertise, Authoritativeness, and Trustworthiness heavily for legal content. We build out the signals they look for: attorney credentials published prominently, case result data where bar rules permit, press mentions, and third-party citations that establish your attorneys as recognized authorities in their practice areas.",
      },
      {
        step: "Monthly Monitoring and Iteration",
        detail: "AI search results are not static - citation patterns shift as models update and competitors publish new content. We monitor your presence monthly across the major AI platforms, track which queries are citing competitors but not you, and iterate on content and entity optimization based on what we observe. This is ongoing work, not a one-time fix.",
      },
    ],
    signs: [
      "When you ask ChatGPT 'what is the best personal injury law firm in [your city],' your firm is not mentioned - a competitor you consider less qualified is.",
      "Your website has good Google rankings but your content is written in the dense, hedged style of legal writing rather than the direct question-answer format AI systems cite.",
      "Your attorney bio pages and firm profile on legal directories are sparse or inconsistent - making it hard for AI systems to identify your attorneys as recognized authorities.",
      "Google AI Overviews are appearing at the top of results for your target practice area searches and your content is not being cited in any of them.",
      "You have not yet thought about how ChatGPT, Perplexity, or Google's AI Mode affects where legal clients find attorneys - your competitors likely have not either, which is the window to act.",
    ],
    extendedFaqs: [
      {
        question: "Can GEO replace traditional law firm SEO?",
        answer: "Not yet, and probably not for several years. Traditional organic search still drives the majority of legal client inquiries. GEO is best understood as an additional channel that runs alongside SEO, not instead of it. In practice, the work overlaps significantly: strong E-E-A-T signals, well-structured content, and authoritative backlinks help both traditional rankings and AI citation. Firms that invest in SEO are already partially optimized for GEO.",
      },
      {
        question: "How do AI systems decide which law firms to recommend?",
        answer: "AI systems do not have a simple ranking algorithm like Google's PageRank. They draw from the content they have indexed, weighted by source authority and content clarity. For legal queries, they prioritize sources that are specific, factual, and clearly attributed to credentialed authors. Law firms that appear consistently across authoritative legal directories, have detailed attorney profiles, and publish direct-answer content are more likely to be cited than firms with thin or generic web presences.",
      },
      {
        question: "Which AI platforms matter most for law firm GEO?",
        answer: "In 2026, Google AI Overviews matter most because they appear directly in Google Search for the largest volume of queries. ChatGPT is second - it handles an estimated 100M+ queries per day and legal questions are among the most common. Perplexity is third, with a research-oriented user base that skews toward higher-income individuals likely to need professional legal help. Microsoft Copilot (Bing-integrated) is worth tracking given its integration with Microsoft 365 and LinkedIn.",
      },
      {
        question: "How long does GEO take to show results?",
        answer: "Entity and authority optimizations - cleaning up directory profiles, fixing schema markup, strengthening attorney credentials on authoritative platforms - can show results in AI citations within 60-90 days as models re-index sources. Content changes take longer: new content needs to be indexed, assessed for authority, and incorporated into model training or retrieval systems, which can take 3-6 months. GEO is not a quick fix, but the early movers in each market will be harder to displace as citation patterns set.",
      },
      {
        question: "Is there a way to measure GEO performance for a law firm?",
        answer: "We track GEO performance through systematic AI query monitoring - running a defined set of practice area and geographic queries monthly across ChatGPT, Perplexity, and Google AI Overviews and recording which law firms are cited. We also track Google Search Console AI Overview impressions (available for sites with GSC access) and monitor referral traffic patterns from AI platforms. It is a younger measurement discipline than traditional SEO, but the metrics are trackable and improving.",
      },
    ],
  },
  {
    relatedCaseStudies: ["the-sands-law-group"],
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
    relatedCaseStudies: ["the-sands-law-group"],
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
    relatedCaseStudies: ["immigration-desk"],
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
    relatedCaseStudies: ["wilson-criminal-defence"],
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
