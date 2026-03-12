// Growth Path definitions - the 7 possible paths with full metadata

import type { GrowthPathDefinition } from "./types";

export const GROWTH_PATHS: GrowthPathDefinition[] = [
  {
    id: "starting_from_zero",
    name: "Starting From Zero",
    userExplanation:
      "You're building from scratch. The priority is getting a professional website live, claiming your Google Business Profile, and making sure people who search your name or your practice area in your city can actually find you.",
    brandRoute: "jurispage",
    idealFor:
      "New firms with no website, no Google presence, and no existing marketing foundation.",
    days1to30: [
      "Launch a professional, mobile-first website with clear practice area pages",
      "Claim and fully optimize your Google Business Profile",
      "Set up call tracking so every lead is accounted for",
      "Submit your site to Google Search Console and request indexing",
    ],
    days31to60: [
      "Publish 3-5 practice area pages targeting your city",
      "Build initial local citations (directories, legal listings)",
      "Set up a basic review generation process",
      "Install analytics to track where visitors come from",
    ],
    days61to90: [
      "Begin monthly content targeting common questions in your area",
      "Launch a small Google Ads campaign for high-intent keywords",
      "Monitor rankings and adjust pages based on early data",
      "Evaluate lead volume and quality for next-phase planning",
    ],
  },
  {
    id: "get_cases",
    name: "Get Cases In The Door",
    userExplanation:
      "Your firm needs signed cases soon. The focus is on the fastest channels to generate qualified leads: paid search, local visibility, and making sure your website converts visitors into calls.",
    brandRoute: "jurispage",
    idealFor:
      "Firms with urgency to generate leads quickly, especially those with low current visibility.",
    days1to30: [
      "Launch targeted Google Ads for your top 3 case types",
      "Optimize your Google Business Profile for conversions",
      "Add or fix phone number visibility on every page",
      "Set up call tracking and lead source attribution",
    ],
    days31to60: [
      "Expand ad campaigns based on first 30 days of data",
      "Improve website landing pages for top converting keywords",
      "Begin local SEO work on highest-volume practice area pages",
      "Implement a follow-up process for every lead",
    ],
    days61to90: [
      "Scale what's working in paid, pause what isn't",
      "Build out SEO content for secondary practice areas",
      "Review cost per case and adjust budget allocation",
      "Plan transition from paid-heavy to SEO-balanced approach",
    ],
  },
  {
    id: "fix_broken",
    name: "Fix What's Broken First",
    userExplanation:
      "Your website and online presence have foundational issues that are costing you cases right now. Before investing in traffic or visibility, the priority is fixing what's broken so the leads you do get actually convert.",
    brandRoute: "jurispage",
    idealFor:
      "Firms with a website that has poor performance, missing contact info, broken pages, or no call tracking.",
    days1to30: [
      "Fix critical website issues: speed, mobile experience, broken pages",
      "Make phone number and contact options visible on every page",
      "Set up call tracking if not already in place",
      "Ensure Google Business Profile is claimed and accurate",
    ],
    days31to60: [
      "Rebuild or improve practice area pages with clear next steps",
      "Add trust signals: reviews, case results, credentials",
      "Fix any local citation inconsistencies",
      "Install proper analytics and conversion tracking",
    ],
    days61to90: [
      "Begin targeted SEO content for your primary practice area",
      "Optimize for local search with city-specific pages",
      "Review lead flow and identify remaining conversion gaps",
      "Plan next phase: growth after the foundation is solid",
    ],
  },
  {
    id: "visitors_to_calls",
    name: "Turn More Visitors Into Calls",
    userExplanation:
      "Your site gets traffic but isn't converting visitors into calls and cases at the rate it should. The focus is on conversion: making it easier, faster, and more compelling for potential clients to reach out.",
    brandRoute: "jurispage",
    idealFor:
      "Firms with existing traffic but low conversion rates, unclear calls to action, or poor user experience.",
    days1to30: [
      "Audit and improve contact visibility on all key pages",
      "Add or redesign calls to action on practice area pages",
      "Implement click-to-call and mobile contact optimization",
      "Review and improve page load speed",
    ],
    days31to60: [
      "Add social proof: reviews, case results, and credentials near CTAs",
      "Create or improve intake forms to reduce friction",
      "Test different page layouts on top-traffic pages",
      "Add live chat or after-hours contact options",
    ],
    days61to90: [
      "Analyze conversion data and double down on what works",
      "Expand high-converting page patterns to other practice areas",
      "Build a follow-up system for leads that don't convert immediately",
      "Plan SEO expansion to increase qualified traffic volume",
    ],
  },
  {
    id: "win_local",
    name: "Win More Local Searches",
    userExplanation:
      "Your foundation is solid but you're not showing up where it matters most: Google search results and Google Maps in your city. The focus is on earning the visibility your firm deserves.",
    brandRoute: "jurispage",
    idealFor:
      "Firms with a decent website but poor organic and local search visibility.",
    days1to30: [
      "Fully optimize Google Business Profile with photos, posts, and Q&A",
      "Audit and fix local citation consistency across directories",
      "Optimize existing practice area pages for target keywords",
      "Begin a structured review generation campaign",
    ],
    days31to60: [
      "Publish new content targeting high-volume local keywords",
      "Build local backlinks through community involvement and directories",
      "Create city-specific landing pages if serving multiple areas",
      "Monitor and respond to all Google Business Profile activity",
    ],
    days61to90: [
      "Expand content to secondary practice areas and nearby cities",
      "Analyze ranking progress and adjust strategy",
      "Increase review volume to compete with top local competitors",
      "Evaluate Maps pack performance and organic position improvements",
    ],
  },
  {
    id: "improve_leads",
    name: "Improve Lead Quality",
    userExplanation:
      "You're getting leads but they're the wrong type, too low value, or leaking out before they become cases. The focus is on improving the quality and handling of your incoming leads.",
    brandRoute: "jurispage",
    idealFor:
      "Firms getting leads that don't convert, have slow response times, or lack proper lead tracking.",
    days1to30: [
      "Set up call tracking with recording and source attribution",
      "Implement a CRM or lead management system",
      "Audit response time and create a same-day response process",
      "Review which marketing channels produce the best cases",
    ],
    days31to60: [
      "Refine website messaging to attract the right case types",
      "Adjust ad targeting to filter out low-quality leads",
      "Train intake staff on lead qualification and follow-up",
      "Set up automated follow-up for leads that don't connect",
    ],
    days61to90: [
      "Analyze cost-per-signed-case by channel and keyword",
      "Shift budget toward highest-ROI sources",
      "Build content targeting high-value case types specifically",
      "Review and optimize the full intake-to-signed-case pipeline",
    ],
  },
  {
    id: "dominant_position",
    name: "Build a Dominant Market Position",
    userExplanation:
      "Your firm has the size and ambition to own your market. This is a comprehensive strategy across SEO, paid, content, and reputation to build a position that's hard for competitors to take.",
    brandRoute: "juris_digital",
    idealFor:
      "Larger firms (6+ attorneys) with multi-office or multi-market ambitions and the budget to invest in long-term dominance.",
    days1to30: [
      "Complete competitive audit across all target markets",
      "Develop comprehensive keyword strategy for all practice areas",
      "Launch multi-channel campaign: SEO, paid search, and local",
      "Set up advanced analytics and attribution across all channels",
    ],
    days31to60: [
      "Scale content production with targeted blog and resource pages",
      "Expand Google Ads across all practice areas and locations",
      "Build authority through PR, legal publications, and partnerships",
      "Optimize each office location's local presence independently",
    ],
    days61to90: [
      "Analyze multi-market performance and reallocate resources",
      "Launch reputation management and review strategy at scale",
      "Begin AI search optimization for emerging search formats",
      "Plan next quarter expansion based on 90-day performance data",
    ],
  },
];

export function getPathById(id: string): GrowthPathDefinition | undefined {
  return GROWTH_PATHS.find((p) => p.id === id);
}
