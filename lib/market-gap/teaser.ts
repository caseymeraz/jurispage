// Teaser data assembly

import type { MapCompetitor, KeywordVolume } from "@/lib/dataforseo";
import type { AiSearchCheck } from "@/lib/market-gap/ai-search";

export interface TeaserData {
  totalSearchVolume: number;
  localTotalSearchVolume: number | null;
  localDataAvailable: boolean;
  topCompetitors: {
    name: string;
    rating: number | null;
    reviewCount: number | null;
    position: number;
  }[];
  firmInMapPack: boolean;
  firmRating: number | null;
  firmReviewCount: number | null;
  biggestGap: string;
  keywordHighlights: {
    keyword: string;
    localVolume: number;
    nationalVolume: number;
  }[];
  aiSearchResults: AiSearchCheck[];
}

export function assembleTeaserData(
  nationalKeywordVolumes: KeywordVolume[],
  localKeywordVolumes: KeywordVolume[] | null,
  mapCompetitors: MapCompetitor[],
  firmName: string | null,
  firmPlaceId: string | null,
  aiSearchResults: AiSearchCheck[] = []
): TeaserData {
  // National total search volume
  const totalSearchVolume = nationalKeywordVolumes.reduce(
    (sum, kv) => sum + kv.searchVolume,
    0
  );

  // Local total search volume
  const localTotal = localKeywordVolumes
    ? localKeywordVolumes.reduce((sum, kv) => sum + kv.searchVolume, 0)
    : null;
  const localDataAvailable = localTotal !== null && localTotal > 0;
  const localTotalSearchVolume = localDataAvailable ? localTotal : null;

  // Build a map of local volumes by keyword for easy lookup
  const localVolumeMap = new Map<string, number>();
  if (localKeywordVolumes) {
    for (const kv of localKeywordVolumes) {
      localVolumeMap.set(kv.keyword.toLowerCase(), kv.searchVolume);
    }
  }

  // Top 5 map competitors
  const topCompetitors = mapCompetitors
    .slice(0, 5)
    .map((c) => ({
      name: c.title,
      rating: c.rating ?? null,
      reviewCount: c.reviewCount ?? null,
      position: c.position,
    }));

  // Check if firm is in map pack
  const firmMatch = mapCompetitors.find(
    (c) =>
      (firmPlaceId && c.placeId === firmPlaceId) ||
      (firmName && c.title.toLowerCase().includes(firmName.toLowerCase()))
  );
  const firmInMapPack = !!firmMatch;
  const firmRating = firmMatch?.rating ?? null;
  const firmReviewCount = firmMatch?.reviewCount ?? null;

  // Determine biggest gap
  let biggestGap = "Not appearing in local map pack";
  if (firmInMapPack) {
    const topReviews = topCompetitors[0]?.reviewCount ?? 0;
    const topRating = topCompetitors[0]?.rating ?? 0;
    if (firmReviewCount !== null && topReviews > 0 && firmReviewCount < topReviews * 0.5) {
      biggestGap = "Review count significantly below top competitors";
    } else if (firmRating !== null && topRating > 0 && firmRating < topRating - 0.3) {
      biggestGap = "Rating below top competitors";
    } else {
      biggestGap = "Local authority and content coverage";
    }
  }

  // Top keyword highlights — sort by national volume
  const keywordHighlights = nationalKeywordVolumes
    .filter((kv) => kv.searchVolume > 0)
    .sort((a, b) => b.searchVolume - a.searchVolume)
    .slice(0, 5)
    .map((kv) => ({
      keyword: kv.keyword,
      localVolume: localVolumeMap.get(kv.keyword.toLowerCase()) ?? 0,
      nationalVolume: kv.searchVolume,
    }));

  return {
    totalSearchVolume,
    localTotalSearchVolume,
    localDataAvailable,
    topCompetitors,
    firmInMapPack,
    firmRating,
    firmReviewCount,
    biggestGap,
    keywordHighlights,
    aiSearchResults,
  };
}
