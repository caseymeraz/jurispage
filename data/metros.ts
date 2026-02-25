export interface MetroData {
  slug: string;
  city: string;
  state: string;
  stateAbbr: string;
  nearbyCities: string[];
  legalMarketNote: string;
}

export type MetroService = "law-firm-seo" | "google-ads-lawyers" | "law-firm-website-design" | "law-firm-marketing";

export const metroServiceLabels: Record<MetroService, string> = {
  "law-firm-seo": "Law Firm SEO",
  "google-ads-lawyers": "Google Ads for Lawyers",
  "law-firm-website-design": "Law Firm Website Design",
  "law-firm-marketing": "Law Firm Marketing",
};

export const metros: MetroData[] = [
  { slug: "new-york", city: "New York", state: "New York", stateAbbr: "NY", nearbyCities: ["Jersey City", "Newark", "Yonkers"], legalMarketNote: "One of the largest legal markets in the world, with fierce competition across personal injury, criminal defense, and corporate law." },
  { slug: "los-angeles", city: "Los Angeles", state: "California", stateAbbr: "CA", nearbyCities: ["Long Beach", "Santa Ana", "Anaheim"], legalMarketNote: "A massive and competitive legal market with high PPC costs and significant volume for PI, immigration, and entertainment law." },
  { slug: "chicago", city: "Chicago", state: "Illinois", stateAbbr: "IL", nearbyCities: ["Naperville", "Aurora", "Joliet"], legalMarketNote: "Strong market for PI, criminal defense, workers' comp, and business litigation with competitive but winnable SEO opportunities." },
  { slug: "houston", city: "Houston", state: "Texas", stateAbbr: "TX", nearbyCities: ["The Woodlands", "Sugar Land", "Pasadena"], legalMarketNote: "Fast-growing Texas legal market with high volume for PI, oil & gas law, and immigration." },
  { slug: "phoenix", city: "Phoenix", state: "Arizona", stateAbbr: "AZ", nearbyCities: ["Mesa", "Scottsdale", "Tempe"], legalMarketNote: "Growing Southwest market with strong PI and family law volume and lower SEO competition than coastal metros." },
  { slug: "philadelphia", city: "Philadelphia", state: "Pennsylvania", stateAbbr: "PA", nearbyCities: ["Camden", "Chester", "Wilmington"], legalMarketNote: "Major East Coast market with high PI case values and strong demand across criminal defense and workers' comp." },
  { slug: "san-antonio", city: "San Antonio", state: "Texas", stateAbbr: "TX", nearbyCities: ["New Braunfels", "Boerne", "Seguin"], legalMarketNote: "Texas market with significant PI, immigration, and family law volume and growing digital competition." },
  { slug: "san-diego", city: "San Diego", state: "California", stateAbbr: "CA", nearbyCities: ["Chula Vista", "Escondido", "Oceanside"], legalMarketNote: "Competitive California legal market with strong PI, immigration, and military legal services demand." },
  { slug: "dallas", city: "Dallas", state: "Texas", stateAbbr: "TX", nearbyCities: ["Fort Worth", "Arlington", "Plano"], legalMarketNote: "DFW Metroplex is a high-volume, high-competition Texas legal market with strong PI and commercial litigation." },
  { slug: "san-jose", city: "San Jose", state: "California", stateAbbr: "CA", nearbyCities: ["Santa Clara", "Sunnyvale", "Fremont"], legalMarketNote: "Silicon Valley legal market with strong tech employment, IP, and immigration law demand." },
  { slug: "austin", city: "Austin", state: "Texas", stateAbbr: "TX", nearbyCities: ["Round Rock", "Cedar Park", "Georgetown"], legalMarketNote: "Fast-growing Texas capital with rising legal demand across family law, business law, and PI." },
  { slug: "charlotte", city: "Charlotte", state: "North Carolina", stateAbbr: "NC", nearbyCities: ["Concord", "Gastonia", "Rock Hill"], legalMarketNote: "Growing Southeast legal market with strong family law, PI, and business litigation volume." },
  { slug: "indianapolis", city: "Indianapolis", state: "Indiana", stateAbbr: "IN", nearbyCities: ["Carmel", "Fishers", "Noblesville"], legalMarketNote: "Midwest market with strong workers' comp, PI, and family law demand and lower competitive barriers." },
  { slug: "san-francisco", city: "San Francisco", state: "California", stateAbbr: "CA", nearbyCities: ["Oakland", "Berkeley", "San Mateo"], legalMarketNote: "Bay Area legal market with premium CPCs, strong employment law, PI, and tech IP demand." },
  { slug: "seattle", city: "Seattle", state: "Washington", stateAbbr: "WA", nearbyCities: ["Bellevue", "Tacoma", "Redmond"], legalMarketNote: "Pacific Northwest market with strong tech employment law, PI, and family law competition." },
  { slug: "denver", city: "Denver", state: "Colorado", stateAbbr: "CO", nearbyCities: ["Aurora", "Lakewood", "Thornton"], legalMarketNote: "Growing mountain west market with strong PI, criminal defense, and family law demand." },
  { slug: "nashville", city: "Nashville", state: "Tennessee", stateAbbr: "TN", nearbyCities: ["Brentwood", "Murfreesboro", "Franklin"], legalMarketNote: "Fast-growing Southeast market with rising PI, family law, and business litigation demand." },
  { slug: "las-vegas", city: "Las Vegas", state: "Nevada", stateAbbr: "NV", nearbyCities: ["Henderson", "North Las Vegas", "Boulder City"], legalMarketNote: "High-volume PI, criminal defense, and family law market with significant tourist-related legal demand." },
  { slug: "atlanta", city: "Atlanta", state: "Georgia", stateAbbr: "GA", nearbyCities: ["Marietta", "Sandy Springs", "Roswell"], legalMarketNote: "Major Southeast legal hub with high PI, criminal defense, and immigration volume." },
  { slug: "portland", city: "Portland", state: "Oregon", stateAbbr: "OR", nearbyCities: ["Beaverton", "Gresham", "Hillsboro"], legalMarketNote: "Pacific Northwest market with strong employment law, PI, and family law demand." },
  { slug: "minneapolis", city: "Minneapolis", state: "Minnesota", stateAbbr: "MN", nearbyCities: ["St. Paul", "Bloomington", "Plymouth"], legalMarketNote: "Midwest market with strong family law, PI, and workers' comp volume and lower digital competition." },
  { slug: "tampa", city: "Tampa", state: "Florida", stateAbbr: "FL", nearbyCities: ["St. Petersburg", "Clearwater", "Brandon"], legalMarketNote: "Florida's Gulf Coast legal market with strong PI, immigration, and family law demand." },
  { slug: "miami", city: "Miami", state: "Florida", stateAbbr: "FL", nearbyCities: ["Fort Lauderdale", "Boca Raton", "Hialeah"], legalMarketNote: "High-volume Florida market with heavy competition in PI, immigration, and criminal defense." },
  { slug: "washington-dc", city: "Washington DC", state: "District of Columbia", stateAbbr: "DC", nearbyCities: ["Arlington", "Alexandria", "Bethesda"], legalMarketNote: "Federal law hub with strong government law, immigration, employment, and criminal defense demand." },
  { slug: "boston", city: "Boston", state: "Massachusetts", stateAbbr: "MA", nearbyCities: ["Cambridge", "Somerville", "Newton"], legalMarketNote: "Major Northeast legal market with strong PI, medical malpractice, and employment law competition." },
];

export function getMetroBySlug(slug: string): MetroData | undefined {
  return metros.find((m) => m.slug === slug);
}

export const metroServiceCombos: { metroSlug: string; service: MetroService; pageSlug: string }[] =
  metros.flatMap((metro) =>
    (["law-firm-seo", "google-ads-lawyers", "law-firm-website-design", "law-firm-marketing"] as MetroService[]).map(
      (service) => ({
        metroSlug: metro.slug,
        service,
        pageSlug: `${service}-${metro.slug}`,
      })
    )
  );

export function parseMetroPageSlug(pageSlug: string): { metro: MetroData; service: MetroService } | null {
  const services: MetroService[] = [
    "law-firm-seo",
    "google-ads-lawyers",
    "law-firm-website-design",
    "law-firm-marketing",
  ];
  for (const service of services) {
    const prefix = service + "-";
    if (pageSlug.startsWith(prefix)) {
      const metroSlug = pageSlug.slice(prefix.length);
      const metro = getMetroBySlug(metroSlug);
      if (metro) return { metro, service };
    }
  }
  return null;
}
