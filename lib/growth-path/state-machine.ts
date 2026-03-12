// Growth Path session state machine - pure functions, no DB calls

import type { SessionStatus } from "./types";

const VALID_TRANSITIONS: Record<SessionStatus, SessionStatus[]> = {
  intake: ["scanning"],
  scanning: ["scoring"],
  scoring: ["report_ready"],
  report_ready: ["reviewed"],
  reviewed: [],
};

export function canTransition(
  from: SessionStatus,
  to: SessionStatus
): boolean {
  return VALID_TRANSITIONS[from]?.includes(to) ?? false;
}

export function getNextStatus(
  current: SessionStatus,
  scansComplete: boolean,
  scoresComputed: boolean,
  recommendationReady: boolean
): SessionStatus | null {
  if (current === "intake") {
    return "scanning";
  }

  if (current === "scanning" && scansComplete) {
    return "scoring";
  }

  if (current === "scoring" && scoresComputed && recommendationReady) {
    return "report_ready";
  }

  return null;
}
