export interface CaseStudy {
  slug: string;
  client: string;
  practiceArea: string;
  location: string;
  type: "seo" | "ppc" | "seo-ppc";
  heroStat: string;
  stats: { label: string; value: string }[];
  challenge: string;
  solution: string;
  results: string;
  testimonial?: { quote: string; author: string; title: string };
  imageFile: string;
  relatedServices: string[];
  relatedPracticeAreas: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "wilson-criminal-defence",
    client: "Wilson Criminal Defence",
    practiceArea: "Criminal Defense",
    location: "Canada",
    type: "seo",
    heroStat: "+1,851% Increase in Website Traffic",
    stats: [
      { label: "Website Traffic Increase", value: "+1,851%" },
      { label: "Business Growth", value: "10x" },
      { label: "Service", value: "Law Firm SEO" },
      { label: "Practice Area", value: "Criminal Defense" },
    ],
    challenge: "Wilson Criminal Defence was a well-regarded criminal defense firm struggling to get found online. Despite strong client outcomes, they had virtually no organic search presence - their website generated minimal traffic and the firm relied almost entirely on referrals. In the competitive criminal defense market, they needed a sustainable digital channel that would work 24/7.",
    solution: "JurisPage conducted a comprehensive SEO audit and keyword strategy specific to the criminal defense market. We restructured the site architecture to target high-intent search queries, built out practice-specific content pages for each charge type the firm handles, and implemented a local SEO strategy to dominate Google Maps results in their target service area. A targeted content program addressed the specific questions potential clients ask when searching for criminal defense representation.",
    results: "The results exceeded every projection. Within 18 months, Wilson Criminal Defence saw a +1,851% increase in organic website traffic. The firm grew by 10x according to attorney Cory Wilson, who credits JurisPage as a vital partner in that growth. The practice moved from referral-dependency to a consistent digital pipeline of qualified leads.",
    testimonial: {
      quote: "My Business Has Grown 10-Fold",
      author: "Cory Wilson",
      title: "Attorney, Wilson Criminal Defence",
    },
    imageFile: "/images/client-cory-wilson-logo.svg",
    relatedServices: ["law-firm-seo", "law-firm-content-writing"],
    relatedPracticeAreas: ["criminal-defense-lawyer-marketing"],
  },
  {
    slug: "the-sands-law-group",
    client: "The Sands Law Group",
    practiceArea: "Family Law",
    location: "Los Angeles, CA",
    type: "seo-ppc",
    heroStat: "+200% Monthly Website Visitors",
    stats: [
      { label: "Monthly Website Visitors", value: "+200%" },
      { label: "New #1 Keyword Rankings", value: "+30" },
      { label: "Monthly SQLs from PPC", value: "+200" },
      { label: "ROI on Paid Ads", value: "+60%" },
    ],
    challenge: "The Sands Law Group is a family law firm in Los Angeles - one of the most competitive legal markets in the country. Despite strong client outcomes and an experienced team led by attorney Jarret Janis, the firm's digital presence wasn't generating the consistent lead flow needed to support their growth goals. They needed both organic and paid channels working together.",
    solution: "JurisPage built an integrated SEO and Google Ads strategy. On the organic side, we targeted high-intent family law and divorce-related keywords across Los Angeles County, building content that matched what potential clients actually search for during emotionally difficult situations. On the paid side, we restructured campaigns with tighter geographic targeting, improved landing pages, and built negative keyword lists that dramatically reduced wasted ad spend.",
    results: "The Sands Law Group now sees double the monthly website visitors compared to before working with JurisPage. Their Google Ads campaigns generate over 200 monthly sales-qualified leads - a 60% improvement in ROI on paid ad spend. The firm also added 30 new #1 keyword rankings, giving them sustained organic visibility alongside the paid pipeline.",
    testimonial: {
      quote: "A Vital Part of Our Firm's Growth",
      author: "Jarret Janis",
      title: "Attorney, The Sands Law Group",
    },
    imageFile: "/images/client-sands-law-logo.svg",
    relatedServices: ["law-firm-seo", "google-ads-for-law-firms"],
    relatedPracticeAreas: ["family-law-firm-marketing", "divorce-lawyer-marketing"],
  },
  {
    slug: "immigration-desk",
    client: "Immigration Desk",
    practiceArea: "Immigration Law",
    location: "United States",
    type: "ppc",
    heroStat: "+100 Monthly Sales-Qualified Leads from PPC",
    stats: [
      { label: "Monthly Sales-Qualified Leads", value: "+100" },
      { label: "Lead Source", value: "Google Ads" },
      { label: "Firm Founded", value: "1999" },
      { label: "Practice Area", value: "Immigration Law" },
    ],
    challenge: "Immigration Desk is an established immigration law firm with 25+ years of experience. The challenge: immigration law is intensely competitive in paid search, with high CPCs and broad queries that attract a lot of unqualified traffic. The firm needed a Google Ads strategy that would generate genuinely qualified leads - people actively seeking immigration legal services - not just clicks.",
    solution: "JurisPage built a segmented Google Ads architecture with dedicated landing pages for each major immigration service type - family petitions, work visas, deportation defense, naturalization, and asylum. Each campaign used tightly themed ad groups with exact-match and phrase-match keywords. Landing pages were built to qualify visitors and convert serious inquiries. Aggressive negative keyword lists prevented budget waste on irrelevant searches.",
    results: "Immigration Desk went from inconsistent digital lead flow to generating over 100 monthly sales-qualified leads through Google Ads alone. Attorney Anu Gupta reports closing more clients than ever before, with a lead quality that her team can work with - people who have a real immigration need and are ready to hire.",
    testimonial: {
      quote: "I'm Closing More Clients Than Ever",
      author: "Anu Gupta",
      title: "Attorney, Immigration Desk",
    },
    imageFile: "/images/case-study-anu-gupta.jpg",
    relatedServices: ["google-ads-for-law-firms", "local-seo-for-law-firms"],
    relatedPracticeAreas: ["immigration-lawyer-marketing"],
  },
  {
    slug: "gjel-accident-attorneys",
    client: "GJEL Accident Attorneys",
    practiceArea: "Personal Injury",
    location: "San Jose, CA",
    type: "seo",
    heroStat: "3x Increase in Qualified Case Inquiries",
    stats: [
      { label: "Case Inquiry Volume", value: "3x" },
      { label: "Signed Cases from Organic", value: "40+/mo" },
      { label: "Cost per Signed Case", value: "-62%" },
      { label: "Client Recoveries", value: "$980M+" },
    ],
    challenge: "GJEL Accident Attorneys is an established 50+ year personal injury firm with strong case results but limited online visibility. Despite decades of courtroom success and over $980 million in client recoveries, the firm relied heavily on referrals and paid advertising to generate new case sign-ups. Organic search was not producing a meaningful volume of qualified consultations, and the cost per signed case through paid channels was unsustainable for long-term growth.",
    solution: "JurisPage executed a comprehensive SEO strategy focused on generating qualified case inquiries, not just traffic. We built an injury-type keyword architecture targeting high-intent searches that lead to consultations, created city-specific landing pages across the San Jose metro area, and optimized conversion paths so visitors became leads. We also optimized the firm's Google Business Profile and developed a bar-compliant review generation process that grew their profile to 300+ five-star reviews.",
    results: "GJEL tripled their qualified case inquiry volume from organic search. The firm now signs 40+ cases per month from organic channels alone, and their cost per signed case dropped 62% compared to paid acquisition. They rank for 14,000+ keywords with 141 position-1 rankings, but the metric that matters is the consistent pipeline of signed retainers that SEO now delivers every month without paying per click.",
    imageFile: "/images/client-gjel-logo.svg",
    relatedServices: ["law-firm-seo", "local-seo-for-law-firms", "law-firm-content-writing"],
    relatedPracticeAreas: ["personal-injury-lawyer-marketing"],
  },
];
