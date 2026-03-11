import { getAiModeSerp } from "@/lib/dataforseo";

export interface AiSearchCheck {
  query: string;
  found: boolean;
  citedDomains: string[];
}

function normalizeDomain(domain: string): string {
  return domain
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/+$/, "")
    .toLowerCase();
}

export async function checkAiSearchVisibility(
  queries: string[],
  firmDomain: string | null,
  locationCode: number = 2840
): Promise<AiSearchCheck[]> {
  const normalizedFirm = firmDomain ? normalizeDomain(firmDomain) : null;

  const results = await Promise.all(
    queries.map(async (query): Promise<AiSearchCheck> => {
      try {
        const { references } = await getAiModeSerp(query, locationCode);
        const citedDomains = references.map((r) => r.domain.toLowerCase());
        const found = normalizedFirm
          ? citedDomains.some((d) => d.includes(normalizedFirm) || normalizedFirm.includes(d))
          : false;
        return { query, found, citedDomains };
      } catch (err) {
        console.error(`AI search check failed for "${query}":`, err);
        return { query, found: false, citedDomains: [] };
      }
    })
  );

  return results;
}
