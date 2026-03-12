// Growth Path recommendation engine - decision tree + plan builder

import type {
  ScoreDimensions,
  IntakeAnswers,
  FlowType,
  PathId,
  BrandRoute,
} from "./types";
import { GROWTH_PATHS, getPathById } from "./paths";

interface RecommendationResult {
  primaryPath: PathId;
  secondaryPath: PathId | null;
  notYetPath: PathId | null;
  brandRoute: BrandRoute;
  explanationShort: string;
  explanationLong: string;
  days1to30: string[];
  days31to60: string[];
  days61to90: string[];
}

// ─── Secondary path pairing rules ─────────────────────────────

const SECONDARY_PAIRINGS: Record<PathId, PathId> = {
  starting_from_zero: "get_cases",
  get_cases: "win_local",
  fix_broken: "visitors_to_calls",
  visitors_to_calls: "win_local",
  win_local: "visitors_to_calls",
  improve_leads: "visitors_to_calls",
  dominant_position: "win_local",
};

// ─── "Not yet" path examples ──────────────────────────────────

const NOT_YET_PAIRINGS: Record<PathId, PathId> = {
  starting_from_zero: "dominant_position",
  get_cases: "dominant_position",
  fix_broken: "get_cases",
  visitors_to_calls: "dominant_position",
  win_local: "dominant_position",
  improve_leads: "dominant_position",
  dominant_position: "improve_leads",
};

// ─── Decision tree from spec section 14 ───────────────────────

export function selectPaths(
  scores: ScoreDimensions,
  intakeAnswers: IntakeAnswers | null,
  flowType: FlowType
): { primary: PathId; secondary: PathId | null; notYet: PathId | null } {
  let primary: PathId;

  // Decision tree
  if (scores.legacyFit >= 70) {
    primary = "dominant_position";
  } else if (
    flowType === "new_firm" &&
    intakeAnswers &&
    "whatsAlreadyLive" in intakeAnswers &&
    (intakeAnswers.whatsAlreadyLive === "nothing" ||
      intakeAnswers.whatsAlreadyLive === "no_website")
  ) {
    primary = "starting_from_zero";
  } else if (scores.foundation >= 65) {
    primary = "fix_broken";
  } else if (scores.urgency >= 70 && scores.visibilityGap >= 55) {
    primary = "get_cases";
  } else if (scores.websiteClarity <= 45) {
    primary = "visitors_to_calls";
  } else if (scores.leadQuality >= 60) {
    primary = "improve_leads";
  } else {
    primary = "win_local";
  }

  const secondary = SECONDARY_PAIRINGS[primary] ?? null;
  const notYet = NOT_YET_PAIRINGS[primary] ?? null;

  return { primary, secondary, notYet };
}

// ─── Build full recommendation ────────────────────────────────

export function buildRecommendation(
  scores: ScoreDimensions,
  intakeAnswers: IntakeAnswers | null,
  flowType: FlowType
): RecommendationResult {
  const { primary, secondary, notYet } = selectPaths(
    scores,
    intakeAnswers,
    flowType
  );

  const primaryDef = getPathById(primary)!;
  const secondaryDef = secondary ? getPathById(secondary) : null;

  return {
    primaryPath: primary,
    secondaryPath: secondary,
    notYetPath: notYet,
    brandRoute: primaryDef.brandRoute,
    explanationShort: primaryDef.userExplanation,
    explanationLong: primaryDef.userExplanation,
    days1to30: primaryDef.days1to30,
    days31to60: primaryDef.days31to60,
    days61to90: primaryDef.days61to90,
  };
}
