// Full report data assembly

import type { SerpResult } from "@/lib/dataforseo";
import type { AuthorityData } from "@/lib/ahrefs";
import { calculateVisibilityScore, calculateGapScore, calculateOpportunityScore, calculateMapsStrength, calculateIntakeDrag, type ScoreInput } from "./scoring";

export interface FullReportData {
  visibilityScore: number;
  gapScore: number;
  opportunityScore: number;
  organicAnalysis: {
    lawFirmDominators: string[];
    directoryObstacles: string[];
    totalOrganicCompetitors: number;
  };
  authorityComparison: {
    firm: AuthorityData | null;
    competitors: Map<string, AuthorityData>;
  };
  intakeDrag: ReturnType<typeof calculateIntakeDrag> | null;
}

export function assembleFullReport(params: {
  firmDomain: string | null;
  firmInMapPack: boolean;
  firmRating: number | null;
  firmReviewCount: number | null;
  topMapCompetitors: { rating: number | null; reviewCount: number | null }[];
  serpResults: SerpResult[];
  firmAuthority: AuthorityData | null;
  competitorAuthority: Map<string, AuthorityData>;
  aiMentions: number;
  totalSearchVolume: number;
  trackedKeywordCount: number;
  firmRankingCount: number;
  subtopicCount: number;
  firmSubtopicsRanking: number;
  responseTime?: string;
  hasAfterHours?: boolean;
}): FullReportData {
  // Organic analysis
  const lawFirmDominators = [
    ...new Set(
      params.serpResults
        .filter((r) => !r.isDirectory)
        .map((r) => r.domain)
    ),
  ].slice(0, 10);

  const directoryObstacles = [
    ...new Set(
      params.serpResults
        .filter((r) => r.isDirectory)
        .map((r) => r.domain)
    ),
  ];

  // Score inputs
  const organicShareOfVoice =
    params.trackedKeywordCount > 0
      ? (params.firmRankingCount / params.trackedKeywordCount) * 100
      : 0;

  const mapsStrength = calculateMapsStrength(
    params.firmInMapPack,
    params.firmRating,
    params.firmReviewCount,
    params.topMapCompetitors
  );

  const topCompAuthority =
    params.competitorAuthority.size > 0
      ? Math.max(...Array.from(params.competitorAuthority.values()).map((a) => a.referringDomains))
      : 0;
  const authority =
    params.firmAuthority && topCompAuthority > 0
      ? Math.min(100, (params.firmAuthority.referringDomains / topCompAuthority) * 100)
      : 0;

  const contentCoverage =
    params.subtopicCount > 0
      ? (params.firmSubtopicsRanking / params.subtopicCount) * 100
      : 0;

  const aiVisibility = Math.min(100, params.aiMentions * 10); // rough normalization

  const scoreInput: ScoreInput = {
    organicShareOfVoice,
    mapsStrength,
    authority,
    contentCoverage,
    aiVisibility,
  };

  const visibilityScore = calculateVisibilityScore(scoreInput);
  const gapScore = calculateGapScore(visibilityScore);
  const opportunityScore = calculateOpportunityScore(gapScore, params.totalSearchVolume);

  const intakeDrag =
    params.responseTime
      ? calculateIntakeDrag(params.responseTime, params.hasAfterHours, params.totalSearchVolume)
      : null;

  return {
    visibilityScore,
    gapScore,
    opportunityScore,
    organicAnalysis: {
      lawFirmDominators,
      directoryObstacles,
      totalOrganicCompetitors: lawFirmDominators.length,
    },
    authorityComparison: {
      firm: params.firmAuthority,
      competitors: params.competitorAuthority,
    },
    intakeDrag,
  };
}
