// Visibility and gap scoring model

export interface ScoreInput {
  // Organic: % of tracked keywords where firm ranks top 10
  organicShareOfVoice: number; // 0-100
  // Maps: composite of in map pack, rating vs top 3, review count vs top 3
  mapsStrength: number; // 0-100
  // Authority: referring domains vs top competitor (0-100 normalized)
  authority: number; // 0-100
  // Content: % of practice area subtopics with ranking pages
  contentCoverage: number; // 0-100
  // AI visibility: LLM mention rate (0-100 normalized)
  aiVisibility: number; // 0-100
}

const WEIGHTS = {
  organic: 0.35,
  maps: 0.25,
  authority: 0.15,
  content: 0.15,
  ai: 0.10,
};

export function calculateVisibilityScore(input: ScoreInput): number {
  const score =
    input.organicShareOfVoice * WEIGHTS.organic +
    input.mapsStrength * WEIGHTS.maps +
    input.authority * WEIGHTS.authority +
    input.contentCoverage * WEIGHTS.content +
    input.aiVisibility * WEIGHTS.ai;
  return Math.round(Math.max(0, Math.min(100, score)));
}

export function calculateGapScore(visibilityScore: number): number {
  return 100 - visibilityScore;
}

export function calculateOpportunityScore(
  gapScore: number,
  totalSearchVolume: number,
  maxExpectedVolume: number = 10000
): number {
  const normalizedDemand = Math.min(totalSearchVolume / maxExpectedVolume, 1);
  return Math.round(gapScore * normalizedDemand * 100) / 100;
}

// Maps strength sub-score
export function calculateMapsStrength(
  firmInMapPack: boolean,
  firmRating: number | null,
  firmReviewCount: number | null,
  topCompetitors: { rating: number | null; reviewCount: number | null }[]
): number {
  let score = 0;

  // In map pack = 40 points
  if (firmInMapPack) score += 40;

  // Rating comparison = up to 30 points
  if (firmRating && topCompetitors.length > 0) {
    const avgCompRating = topCompetitors.reduce((sum, c) => sum + (c.rating || 0), 0) / topCompetitors.length;
    if (avgCompRating > 0) {
      score += Math.min(30, (firmRating / avgCompRating) * 30);
    }
  }

  // Review count comparison = up to 30 points
  if (firmReviewCount && topCompetitors.length > 0) {
    const avgCompReviews = topCompetitors.reduce((sum, c) => sum + (c.reviewCount || 0), 0) / topCompetitors.length;
    if (avgCompReviews > 0) {
      score += Math.min(30, (firmReviewCount / avgCompReviews) * 30);
    }
  }

  return Math.round(Math.max(0, Math.min(100, score)));
}

// Intake drag calculation
export interface IntakeDrag {
  multiplier: number;
  recoverableRange: string;
  estimatedDrag: string;
  urgencyLabel: string;
}

export function calculateIntakeDrag(
  responseTime: string | undefined,
  hasAfterHours: boolean | undefined,
  totalSearchVolume: number
): IntakeDrag {
  const responseMultipliers: Record<string, number> = {
    "Under 5 min": 1.0,
    "5-15 min": 0.85,
    "15-60 min": 0.70,
    "1-3 hrs": 0.50,
    "3+ hrs": 0.30,
  };

  let multiplier = responseMultipliers[responseTime || ""] || 1.0;
  if (hasAfterHours === false) multiplier *= 0.85;

  const maxLeads = Math.round(totalSearchVolume * 0.03); // ~3% CTR estimate
  const currentLeads = Math.round(maxLeads * multiplier);
  const lostLeads = maxLeads - currentLeads;

  let urgencyLabel = "Low";
  if (multiplier < 0.5) urgencyLabel = "Critical";
  else if (multiplier < 0.7) urgencyLabel = "High";
  else if (multiplier < 0.85) urgencyLabel = "Moderate";

  return {
    multiplier,
    recoverableRange: `${lostLeads}-${Math.round(lostLeads * 1.5)} leads/month`,
    estimatedDrag: `${Math.round((1 - multiplier) * 100)}% of potential leads lost`,
    urgencyLabel,
  };
}
