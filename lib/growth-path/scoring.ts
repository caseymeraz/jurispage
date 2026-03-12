// Growth Path scoring model - 7 score calculators (0-100 each)

import type {
  ScoreDimensions,
  ExistingFirmIntake,
  NewFirmIntake,
  IntakeAnswers,
  VisionAnalysis,
  SerpAnalysisResult,
} from "./types";

function clamp(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

// ─── Urgency Score ────────────────────────────────────────────

export function urgencyScore(
  intakeAnswers: IntakeAnswers | null,
  scanResults: Record<string, unknown>,
  isNewFirm: boolean
): number {
  let score = 0;

  if (intakeAnswers && "mainGoal" in intakeAnswers) {
    const answers = intakeAnswers as ExistingFirmIntake;
    if (answers.mainGoal === "get_more_cases") score += 30;
    if (answers.situationStatement === "need_cases_soon") score += 25;
    if (answers.replacingAgency) score += 5;

    const attorneyCount = parseInt(answers.attorneyCount || "0");
    if (attorneyCount > 0 && attorneyCount <= 3) score += 10;
  }

  if (isNewFirm) score += 15;

  // Low search visibility from scans
  const serpData = scanResults.serp_analysis as SerpAnalysisResult[] | undefined;
  if (serpData) {
    const firmVisible = serpData.some((s) => s.firmPresent);
    if (!firmVisible) score += 15;
  }

  return clamp(score);
}

// ─── Foundation Score ─────────────────────────────────────────
// Higher = more broken (more foundation work needed)

export function foundationScore(
  intakeAnswers: IntakeAnswers | null,
  scanResults: Record<string, unknown>
): number {
  let score = 0;

  // Vision analysis findings
  const vision = scanResults.vision_analysis as VisionAnalysis | undefined;
  if (vision) {
    if (!vision.signals.contact_option_visible) score += 20;
    if (!vision.signals.phone_visible) score += 20;
  }

  // Intake answers about tracking
  if (intakeAnswers && "callTracking" in intakeAnswers) {
    const answers = intakeAnswers as ExistingFirmIntake;
    if (answers.callTracking === "no" || answers.callTracking === "not_sure") score += 15;
    if (answers.leadTracking === "none" || answers.leadTracking === "not_sure") score += 15;
  }

  // PageSpeed
  const pagespeed = scanResults.pagespeed as {
    mobile?: { score: number };
  } | undefined;
  if (pagespeed?.mobile && pagespeed.mobile.score < 50) score += 15;

  // Maps presence (no GBP detected = higher foundation score)
  const maps = scanResults.maps_competition as {
    competitors?: unknown[];
  } | undefined;
  if (maps && (!maps.competitors || maps.competitors.length === 0)) score += 15;

  return clamp(score);
}

// ─── Visibility Gap Score ─────────────────────────────────────

export function visibilityGapScore(
  scanResults: Record<string, unknown>
): number {
  let score = 0;

  const serpData = scanResults.serp_analysis as SerpAnalysisResult[] | undefined;
  if (serpData) {
    const firmInOrganic = serpData.some((s) => s.firmPresent);
    if (!firmInOrganic) score += 30;

    // Check competitor dominance
    const topDomains = new Set<string>();
    for (const serp of serpData) {
      for (const r of serp.topResults.slice(0, 3)) {
        topDomains.add(r.domain);
      }
    }
    if (topDomains.size <= 3) score += 20; // Few domains dominate
  }

  // Maps absence
  const maps = scanResults.maps_competition as {
    competitors?: { domain?: string | null }[];
  } | undefined;
  if (maps?.competitors) {
    // Firm absent from maps
    score += 25;
  }

  // AI overview absence
  if (serpData) {
    const hasAiPresence = serpData.some((s) => s.hasAiOverview);
    if (!hasAiPresence) score += 10;
  }

  return clamp(score);
}

// ─── Website Clarity Score ────────────────────────────────────
// Inverted: starts at 100, subtract for issues

export function websiteClarityScore(
  scanResults: Record<string, unknown>
): number {
  let score = 100;

  const vision = scanResults.vision_analysis as VisionAnalysis | undefined;
  if (!vision) return 50; // No data = assume mediocre

  if (!vision.signals.phone_visible) score -= 20;
  if (!vision.signals.contact_option_visible) score -= 20;
  if (!vision.signals.practice_area_clear) score -= 15;
  if (!vision.signals.trust_signals) score -= 15;
  if (vision.signals.cluttered) score -= 15;
  if (!vision.signals.good_first_impression) score -= 15;

  return clamp(score);
}

// ─── Lead Quality Score ───────────────────────────────────────

export function leadQualityScore(
  intakeAnswers: IntakeAnswers | null
): number {
  let score = 0;

  if (!intakeAnswers || !("leadTracking" in intakeAnswers)) return 0;

  const answers = intakeAnswers as ExistingFirmIntake;

  if (answers.leadTracking === "none" || answers.leadTracking === "not_sure") score += 15;
  if (answers.callTracking === "no" || answers.callTracking === "not_sure") score += 15;

  if (answers.responseSpeed === "same_day" || answers.responseSpeed === "next_day") score += 20;
  if (answers.responseSpeed === "next_day") score += 10; // Extra penalty

  if (answers.situationStatement === "leads_wrong_type") score += 25;

  return clamp(score);
}

// ─── Legacy Fit Score ─────────────────────────────────────────

export function legacyFitScore(
  intakeAnswers: IntakeAnswers | null
): number {
  let score = 0;

  if (!intakeAnswers) return 0;

  const attorneyCount = parseInt(
    ("attorneyCount" in intakeAnswers ? intakeAnswers.attorneyCount : "0") || "0"
  );

  if (attorneyCount >= 16) score += 30;
  else if (attorneyCount >= 6) score += 15;

  if ("decisionStructure" in intakeAnswers) {
    const answers = intakeAnswers as ExistingFirmIntake;
    if (answers.mainGoal === "dominate" || answers.mainGoal === "expand") score += 20;
    if (answers.decisionStructure === "committee") score += 15;
  }

  if ("oneOfficeVsExpansion" in intakeAnswers) {
    const answers = intakeAnswers as NewFirmIntake;
    if (answers.oneOfficeVsExpansion === "expansion") score += 25;
  }

  return clamp(score);
}

// ─── Committee Score ──────────────────────────────────────────

export function committeeScore(
  intakeAnswers: IntakeAnswers | null
): number {
  let score = 0;

  if (!intakeAnswers || !("decisionStructure" in intakeAnswers)) return 0;

  const answers = intakeAnswers as ExistingFirmIntake;

  if (answers.decisionStructure === "several_partners") score += 40;
  if (answers.decisionStructure === "committee") score += 50;
  if (answers.quickWinVsLongTerm === "long_term" || answers.quickWinVsLongTerm === "phased") score += 20;

  return clamp(score);
}

// ─── Compute all scores ──────────────────────────────────────

export function computeAllScores(
  intakeAnswers: IntakeAnswers | null,
  scanResults: Record<string, unknown>,
  isNewFirm: boolean
): ScoreDimensions {
  return {
    urgency: urgencyScore(intakeAnswers, scanResults, isNewFirm),
    foundation: foundationScore(intakeAnswers, scanResults),
    visibilityGap: visibilityGapScore(scanResults),
    websiteClarity: websiteClarityScore(scanResults),
    leadQuality: leadQualityScore(intakeAnswers),
    legacyFit: legacyFitScore(intakeAnswers),
    committeeScore: committeeScore(intakeAnswers),
  };
}
