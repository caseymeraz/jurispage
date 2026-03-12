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
  languageCode: string = "en"
): Promise<{ screenshotUrl: string | null }> {
  const data = await apiRequest<{
    tasks: Array<{
      result: Array<{
        items?: Array<{
          type?: string;
          image?: { url?: string };
        }>;
      }>;
    }>;
  }>("/serp/google/organic/live/advanced", [
    {
      keyword,
      location_code: locationCode,
      language_code: languageCode,
      calculate_rectangles: true,
      screenshot: true,
    },
  ]);

  // The screenshot URL is typically in the task-level result
  const result = data.tasks?.[0]?.result?.[0];
  // DataForSEO returns screenshot as a separate field
  const screenshot = (result as Record<string, unknown>)?.screenshot as string | undefined;
  return { screenshotUrl: screenshot ?? null };
}

// Business Listings Density
export async function getBusinessListingsDensity(
  category: string,
  city: string,
  lat: number,
  lng: number
): Promise<{ firmCount: number; category: string }> {
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
        categories: [category],
        location_coordinate: {
          latitude: lat,
          longitude: lng,
          radius: 30000, // 30km radius
        },
        limit: 1,
      },
    ]);

    const totalCount = data.tasks?.[0]?.result?.[0]?.total_count ?? 0;
    return { firmCount: totalCount, category };
  } catch {
    return { firmCount: 0, category };
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
