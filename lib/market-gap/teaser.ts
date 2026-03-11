// Teaser data assembly

import type { MapCompetitor, KeywordVolume } from "@/lib/dataforseo";

export interface TeaserData {
  totalSearchVolume: number;
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
  keywordHighlights: { keyword: string; volume: number }[];
}

export function assembleTeaserData(
  keywordVolumes: KeywordVolume[],
  mapCompetitors: MapCompetitor[],
  firmName: string | null,
  firmPlaceId: string | null
): TeaserData {
  // Total search volume
  const totalSearchVolume = keywordVolumes.reduce(
    (sum, kv) => sum + kv.searchVolume,
    0
  );

  // Top 3 map competitors
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

  // Top keyword highlights
  const keywordHighlights = keywordVolumes
    .filter((kv) => kv.searchVolume > 0)
    .sort((a, b) => b.searchVolume - a.searchVolume)
    .slice(0, 5)
    .map((kv) => ({ keyword: kv.keyword, volume: kv.searchVolume }));

  return {
    totalSearchVolume,
    topCompetitors,
    firmInMapPack,
    firmRating,
    firmReviewCount,
    biggestGap,
    keywordHighlights,
  };
}
