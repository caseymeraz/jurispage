// Growth Path types and constants

// ─── Session statuses ─────────────────────────────────────────

export type SessionStatus =
  | "intake"
  | "scanning"
  | "scoring"
  | "report_ready"
  | "reviewed";

// ─── Scan types ───────────────────────────────────────────────

export type ScanType =
  | "keyword_volume"
  | "serp_analysis"
  | "serp_screenshot"
  | "maps_competition"
  | "website_screenshot"
  | "vision_analysis"
  | "pagespeed"
  | "competitor_density";

export const ALL_SCAN_TYPES: ScanType[] = [
  "keyword_volume",
  "serp_analysis",
  "serp_screenshot",
  "maps_competition",
  "website_screenshot",
  "vision_analysis",
  "pagespeed",
  "competitor_density",
];

export const SCANS_REQUIRING_WEBSITE: ScanType[] = [
  "website_screenshot",
  "vision_analysis",
  "pagespeed",
];

export type ScanStatus = "pending" | "running" | "complete" | "failed";

// ─── Flow types ───────────────────────────────────────────────

export type FlowType = "new_firm" | "existing_firm";

// ─── Brand routes ─────────────────────────────────────────────

export type BrandRoute = "jurispage" | "juris_digital";

// ─── Path IDs ─────────────────────────────────────────────────

export type PathId =
  | "starting_from_zero"
  | "get_cases"
  | "fix_broken"
  | "visitors_to_calls"
  | "win_local"
  | "improve_leads"
  | "dominant_position";

// ─── Intake answer shapes ─────────────────────────────────────

export interface ExistingFirmIntake {
  // Step 1: firm lookup handled separately
  // Step 2
  mainGoal: string;
  situationStatement: string;
  replacingAgency: boolean;
  // Step 3
  leadTracking: string;
  callTracking: string;
  responseSpeed: string;
  // Step 4
  attorneyCount: string;
  decisionStructure: string;
  quickWinVsLongTerm: string;
}

export interface NewFirmIntake {
  // Step 1
  firmName: string;
  practiceArea: string;
  targetCity: string;
  // Step 2
  situationRightNow: string;
  whatsAlreadyLive: string;
  // Step 3
  attorneyCount: string;
  oneOfficeVsExpansion: string;
}

export type IntakeAnswers = ExistingFirmIntake | NewFirmIntake;

// ─── Score dimensions ─────────────────────────────────────────

export interface ScoreDimensions {
  urgency: number;
  foundation: number;
  visibilityGap: number;
  websiteClarity: number;
  leadQuality: number;
  legacyFit: number;
  committeeScore: number;
}

// ─── Vision analysis ──────────────────────────────────────────

export interface VisionFinding {
  title: string;
  observation: string;
  why_it_matters: string;
  next_step: string;
}

export interface VisionSignals {
  phone_visible: boolean;
  contact_option_visible: boolean;
  practice_area_clear: boolean;
  location_signals: boolean;
  trust_signals: boolean;
  cluttered: boolean;
  good_first_impression: boolean;
}

export interface VisionAnalysis {
  top_findings: VisionFinding[];
  signals: VisionSignals;
}

// ─── SERP analysis ────────────────────────────────────────────

export interface SerpAnalysisResult {
  keyword: string;
  hasAds: boolean;
  hasMaps: boolean;
  hasAiOverview: boolean;
  firmPresent: boolean;
  firmPosition: number | null;
  topResults: { position: number; domain: string; title: string }[];
}

// ─── Growth path definition ───────────────────────────────────

export interface GrowthPathDefinition {
  id: PathId;
  name: string;
  userExplanation: string;
  brandRoute: BrandRoute;
  idealFor: string;
  days1to30: string[];
  days31to60: string[];
  days61to90: string[];
}

// ─── Partial results for loading page ─────────────────────────

export interface PartialResults {
  keywordDemand?: number;
  competitorCount?: number;
  mapsCompetitorCount?: number;
  serpPresent?: boolean;
}

// ─── Market availability note ─────────────────────────────────

export const MARKET_AVAILABILITY_NOTE =
  "Your market appears open based on the public information we can see today. Before we confirm a next step, we do a final internal client and conflict check on our side.";

// ─── Forbidden jargon (spec section 8) ────────────────────────

export const FORBIDDEN_TERMS = [
  "technical debt",
  "CTA",
  "CRO",
  "local authority",
  "attribution",
  "funnel",
  "SERP",
  "schema",
  "organic CTR",
  "conversion path",
  "martech",
  "nurture",
] as const;
