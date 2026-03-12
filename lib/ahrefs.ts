// Ahrefs API client (optional enrichment, skips gracefully if not available)

const BASE_URL = "https://api.ahrefs.com/v3";

function getApiKey(): string | null {
  return process.env.AHREFS_API_KEY || null;
}

export interface AuthorityData {
  referringDomains: number;
  organicKeywords: number;
  domainRating: number;
}

export async function getDomainAuthority(domain: string): Promise<AuthorityData | null> {
  const apiKey = getApiKey();
  if (!apiKey) return null;

  try {
    const res = await fetch(`${BASE_URL}/site-explorer/domain-rating?target=${encodeURIComponent(domain)}`, {
      headers: { Authorization: `Bearer ${apiKey}`, Accept: "application/json" },
    });
    if (!res.ok) return null;

    const data = await res.json() as {
      domain_rating?: number;
      refdomains?: number;
      organic_keywords?: number;
    };

    return {
      domainRating: data.domain_rating ?? 0,
      referringDomains: data.refdomains ?? 0,
      organicKeywords: data.organic_keywords ?? 0,
    };
  } catch {
    return null;
  }
}

export async function getCompetitorAuthority(
  domains: string[]
): Promise<Map<string, AuthorityData>> {
  const results = new Map<string, AuthorityData>();
  for (const domain of domains) {
    const data = await getDomainAuthority(domain);
    if (data) results.set(domain, data);
  }
  return results;
}
