// DataForSEO API client

const BASE_URL = "https://api.dataforseo.com/v3";

function getAuthHeader(): string {
  const login = process.env.DATAFORSEO_LOGIN;
  const password = process.env.DATAFORSEO_PASSWORD;
  if (!login || !password) throw new Error("DataForSEO credentials not configured");
  return "Basic " + Buffer.from(`${login}:${password}`).toString("base64");
}

async function apiRequest<T>(endpoint: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      Authorization: getAuthHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`DataForSEO error ${res.status}: ${text}`);
  }
  return res.json() as Promise<T>;
}

// Google Ads Search Volume Live
export interface KeywordVolume {
  keyword: string;
  searchVolume: number;
  monthlySearches: { year: number; month: number; search_volume: number }[];
}

export async function getSearchVolume(
  keywords: string[],
  locationCode: number = 2840, // US
  languageCode: string = "en",
  locationName?: string
): Promise<KeywordVolume[]> {
  const payload: Record<string, unknown> = {
    keywords,
    language_code: languageCode,
  };
  if (locationName) {
    payload.location_name = locationName;
  } else {
    payload.location_code = locationCode;
  }

  const data = await apiRequest<{ tasks: Array<{ result: Array<{ keyword: string; search_volume: number; monthly_searches: Array<{ year: number; month: number; search_volume: number }> }> }> }>(
    "/keywords_data/google_ads/search_volume/live",
    [payload]
  );

  const results = data.tasks?.[0]?.result || [];
  return results.map((r) => ({
    keyword: r.keyword,
    searchVolume: r.search_volume || 0,
    monthlySearches: r.monthly_searches || [],
  }));
}

// Google Maps Live
export interface MapCompetitor {
  title: string;
  placeId?: string;
  rating?: number;
  reviewCount?: number;
  position: number;
  domain?: string;
  cid?: string;
  checkUrl?: string;
}

export async function getMapsResults(
  query: string,
  lat: number,
  lng: number,
  languageCode: string = "en"
): Promise<{ competitors: MapCompetitor[]; checkUrl?: string }> {
  const data = await apiRequest<{
    tasks: Array<{
      result: Array<{
        check_url?: string;
        items?: Array<{
          title?: string;
          place_id?: string;
          rating?: { value?: number; votes_count?: number };
          rank_absolute?: number;
          domain?: string;
          cid?: string;
        }>;
      }>;
    }>;
  }>("/serp/google/maps/live/advanced", [
    {
      keyword: query,
      location_coordinate: `${lat},${lng},15z`,
      language_code: languageCode,
      search_places: false,
      depth: 10,
    },
  ]);

  const result = data.tasks?.[0]?.result?.[0];
  const items = result?.items || [];

  return {
    checkUrl: result?.check_url,
    competitors: items.map((item, i) => ({
      title: item.title || "",
      placeId: item.place_id,
      rating: item.rating?.value,
      reviewCount: item.rating?.votes_count,
      position: item.rank_absolute ?? i + 1,
      domain: item.domain,
      cid: item.cid,
    })),
  };
}

// Organic SERP Live
export interface SerpResult {
  position: number;
  domain: string;
  title: string;
  url: string;
  isDirectory: boolean;
}

export async function getOrganicSerp(
  keyword: string,
  locationCode: number = 2840,
  languageCode: string = "en"
): Promise<SerpResult[]> {
  const data = await apiRequest<{
    tasks: Array<{
      result: Array<{
        items?: Array<{
          rank_absolute?: number;
          domain?: string;
          title?: string;
          url?: string;
        }>;
      }>;
    }>;
  }>("/serp/google/organic/live/advanced", [
    { keyword, location_code: locationCode, language_code: languageCode, depth: 20 },
  ]);

  const directories = ["avvo.com", "findlaw.com", "justia.com", "lawyers.com", "martindale.com", "nolo.com", "yelp.com"];
  const items = data.tasks?.[0]?.result?.[0]?.items || [];

  return items.map((item) => ({
    position: item.rank_absolute ?? 0,
    domain: item.domain || "",
    title: item.title || "",
    url: item.url || "",
    isDirectory: directories.some((d) => (item.domain || "").includes(d)),
  }));
}

// DataForSEO LLM Mentions
export async function getAiVisibility(
  domain: string
): Promise<{ mentions: number; impressions: number }> {
  try {
    const data = await apiRequest<{
      tasks: Array<{
        result: Array<{ metrics?: { mentions?: number; impressions?: number } }>;
      }>;
    }>("/dataforseo_labs/google/relevant_pages/live", [
      { target: domain, language_code: "en", location_code: 2840 },
    ]);
    const metrics = data.tasks?.[0]?.result?.[0]?.metrics;
    return { mentions: metrics?.mentions ?? 0, impressions: metrics?.impressions ?? 0 };
  } catch {
    return { mentions: 0, impressions: 0 };
  }
}

// Google AI Overview SERP
export interface AiOverviewReference {
  domain: string;
  url: string;
  title: string;
}

export async function getAiModeSerp(
  keyword: string,
  locationCode: number = 2840,
  languageCode: string = "en"
): Promise<{ references: AiOverviewReference[] }> {
  const data = await apiRequest<{
    tasks: Array<{
      result: Array<{
        items?: Array<{
          type?: string;
          references?: Array<{
            domain?: string;
            url?: string;
            title?: string;
          }>;
          items?: Array<{
            type?: string;
            references?: Array<{
              domain?: string;
              url?: string;
              title?: string;
            }>;
          }>;
        }>;
      }>;
    }>;
  }>("/serp/google/ai_overview/live/advanced", [
    { keyword, location_code: locationCode, language_code: languageCode },
  ]);

  const items = data.tasks?.[0]?.result?.[0]?.items || [];
  const refs: AiOverviewReference[] = [];

  for (const item of items) {
    if (item.references) {
      for (const ref of item.references) {
        if (ref.domain) {
          refs.push({
            domain: ref.domain,
            url: ref.url || "",
            title: ref.title || "",
          });
        }
      }
    }
    if (item.items) {
      for (const sub of item.items) {
        if (sub.references) {
          for (const ref of sub.references) {
            if (ref.domain) {
              refs.push({
                domain: ref.domain,
                url: ref.url || "",
                title: ref.title || "",
              });
            }
          }
        }
      }
    }
  }

  // Deduplicate by domain
  const seen = new Set<string>();
  const unique = refs.filter((r) => {
    const d = r.domain.toLowerCase();
    if (seen.has(d)) return false;
    seen.add(d);
    return true;
  });

  return { references: unique };
}

// SERP Screenshot
export async function getSerpScreenshot(
  keyword: string,
  locationCode: number = 2840,
  languageCode: string = "en",
  device: "desktop" | "mobile" = "desktop"
): Promise<{ screenshotUrl: string | null }> {
  const payload: Record<string, unknown> = {
    keyword,
    location_code: locationCode,
    language_code: languageCode,
    load_serp_screenshot: true,
  };
  if (device === "mobile") {
    payload.device = "mobile";
    payload.os = "android";
  }

  const data = await apiRequest<{
    tasks: Array<{
      result: Array<Record<string, unknown>>;
    }>;
  }>("/serp/google/organic/live/regular", [payload]);

  const result = data.tasks?.[0]?.result?.[0];
  // DataForSEO returns screenshot URL at result.extra.screenshot when load_serp_screenshot is true
  const extra = result?.extra as Record<string, unknown> | undefined;
  const screenshot =
    extra?.screenshot as string | undefined
    ?? result?.screenshot as string | undefined
    ?? null;
  return { screenshotUrl: screenshot };
}

// Practice area to DataForSEO business listing category mapping
const PRACTICE_AREA_CATEGORIES: Record<string, string> = {
  "personal injury": "Personal injury attorney",
  "car accident": "Personal injury attorney",
  "truck accident": "Personal injury attorney",
  "wrongful death": "Personal injury attorney",
  "slip and fall": "Personal injury attorney",
  "criminal defense": "Criminal justice attorney",
  "criminal law": "Criminal justice attorney",
  "dui": "DUI attorney",
  "family law": "Family law attorney",
  "divorce": "Divorce lawyer",
  "immigration": "Immigration attorney",
  "estate planning": "Estate planning attorney",
  "bankruptcy": "Bankruptcy attorney",
  "employment law": "Employment attorney",
  "real estate": "Real estate attorney",
  "business law": "Corporate lawyer",
  "medical malpractice": "Personal injury attorney",
};

function getBusinessListingCategory(practiceArea: string): string {
  const normalized = practiceArea.toLowerCase().trim();
  return PRACTICE_AREA_CATEGORIES[normalized] ?? `${practiceArea} attorney`;
}

// Major city coordinates for geocoding fallback
const MAJOR_CITY_COORDS: Record<string, { lat: number; lng: number }> = {
  "san jose, ca": { lat: 37.3382, lng: -121.8863 },
  "los angeles, ca": { lat: 34.0522, lng: -118.2437 },
  "san francisco, ca": { lat: 37.7749, lng: -122.4194 },
  "san diego, ca": { lat: 32.7157, lng: -117.1611 },
  "new york, ny": { lat: 40.7128, lng: -74.006 },
  "chicago, il": { lat: 41.8781, lng: -87.6298 },
  "houston, tx": { lat: 29.7604, lng: -95.3698 },
  "phoenix, az": { lat: 33.4484, lng: -112.074 },
  "philadelphia, pa": { lat: 39.9526, lng: -75.1652 },
  "dallas, tx": { lat: 32.7767, lng: -96.797 },
  "austin, tx": { lat: 30.2672, lng: -97.7431 },
  "miami, fl": { lat: 25.7617, lng: -80.1918 },
  "atlanta, ga": { lat: 33.749, lng: -84.388 },
  "denver, co": { lat: 39.7392, lng: -104.9903 },
  "seattle, wa": { lat: 47.6062, lng: -122.3321 },
  "boston, ma": { lat: 42.3601, lng: -71.0589 },
  "las vegas, nv": { lat: 36.1699, lng: -115.1398 },
  "portland, or": { lat: 45.5152, lng: -122.6784 },
  "nashville, tn": { lat: 36.1627, lng: -86.7816 },
  "charlotte, nc": { lat: 35.2271, lng: -80.8431 },
  "sacramento, ca": { lat: 38.5816, lng: -121.4944 },
  "orlando, fl": { lat: 28.5383, lng: -81.3792 },
  "tampa, fl": { lat: 27.9506, lng: -82.4572 },
  "jacksonville, fl": { lat: 30.3322, lng: -81.6557 },
  "fort worth, tx": { lat: 32.7555, lng: -97.3308 },
  "san antonio, tx": { lat: 29.4241, lng: -98.4936 },
  "indianapolis, in": { lat: 39.7684, lng: -86.1581 },
  "columbus, oh": { lat: 39.9612, lng: -82.9988 },
  "minneapolis, mn": { lat: 44.9778, lng: -93.265 },
  "detroit, mi": { lat: 42.3314, lng: -83.0458 },
};

// US geographic center — used only as a last resort
const US_CENTER = { lat: 39.8283, lng: -98.5795 };

export async function geocodeCityState(city: string, state: string): Promise<{ lat: number; lng: number }> {
  const key = `${city.toLowerCase().trim()}, ${state.toLowerCase().trim()}`;

  // Fast path: check hardcoded cache first
  const cached = MAJOR_CITY_COORDS[key];
  if (cached) return cached;

  // Use Google Maps Geocoding API for unknown cities
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY || process.env.GOOGLE_MAPS_API_KEY;
  if (apiKey) {
    try {
      const address = encodeURIComponent(`${city}, ${state}, US`);
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`
      );
      if (res.ok) {
        const data = await res.json() as {
          status: string;
          results: Array<{ geometry: { location: { lat: number; lng: number } } }>;
        };
        if (data.status === "OK" && data.results?.[0]) {
          const loc = data.results[0].geometry.location;
          console.log(`Geocoded "${city}, ${state}" to ${loc.lat}, ${loc.lng}`);
          return { lat: loc.lat, lng: loc.lng };
        }
        console.warn(`Google Geocoding returned status "${data.status}" for "${city}, ${state}"`);
      }
    } catch (err) {
      console.warn(`Google Geocoding API failed for "${city}, ${state}":`, err);
    }
  } else {
    console.warn("No Google Maps API key available for geocoding");
  }

  console.error(`geocodeCityState: falling back to US_CENTER for "${city}, ${state}"`);
  return US_CENTER;
}

// Business Listings Density
export async function getBusinessListingsDensity(
  category: string,
  city: string,
  lat: number,
  lng: number
): Promise<{ firmCount: number; category: string }> {
  // Map practice area to valid DataForSEO category
  const mappedCategory = getBusinessListingCategory(category);

  try {
    const data = await apiRequest<{
      tasks: Array<{
        result: Array<{
          total_count?: number;
          items?: Array<unknown>;
        }>;
      }>;
    }>("/business_data/business_listings/search/live", [
      {
        categories: [mappedCategory],
        location_coordinate: {
          latitude: lat,
          longitude: lng,
          radius: 30000, // 30km radius
        },
        limit: 1,
      },
    ]);

    const totalCount = data.tasks?.[0]?.result?.[0]?.total_count ?? 0;
    return { firmCount: totalCount, category: mappedCategory };
  } catch {
    return { firmCount: 0, category: mappedCategory };
  }
}

// Keyword suggestions
export async function getKeywordSuggestions(
  seed: string[],
  locationCode: number = 2840,
  languageCode: string = "en",
  limit: number = 50
): Promise<string[]> {
  try {
    const data = await apiRequest<{
      tasks: Array<{
        result: Array<{ items?: Array<{ keyword?: string }> }>;
      }>;
    }>("/keywords_data/google_ads/keywords_for_keywords/live", [
      { keywords: seed, location_code: locationCode, language_code: languageCode, limit },
    ]);
    const items = data.tasks?.[0]?.result?.[0]?.items || [];
    return items.map((item) => item.keyword || "").filter(Boolean);
  } catch {
    return [];
  }
}
