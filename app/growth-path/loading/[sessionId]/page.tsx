"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";

const STAGES = [
  "Looking at your market...",
  "Checking who already shows up when people search...",
  "Reviewing how your website asks visitors to contact you...",
  "Pulling public Google Maps and competitor data...",
  "Building your recommended path...",
] as const;

const DID_YOU_KNOW = [
  "96% of people seeking legal advice use a search engine.",
  "The average personal injury case value from organic search is 3x higher than from paid ads.",
  "Google Maps results drive 42% of clicks for local law firm searches.",
  "Firms that respond to web leads within 5 minutes are 8x more likely to convert.",
  "Over 70% of potential clients visit a law firm's website before making contact.",
  "The top 3 organic search results capture 68% of all clicks.",
  "Your Growth Path report analyzes keyword demand, competitor density, and online visibility.",
  "Mobile searches for 'lawyer near me' have grown over 150% in the last two years.",
  "Consistent NAP (Name, Address, Phone) data across directories boosts local rankings.",
  "Law firms with 50+ Google reviews get 266% more leads than those with fewer than 10.",
  "We're checking real Google search results and Maps data for your specific market.",
  "Your report will include a 90-day action plan tailored to your firm's situation.",
] as const;

const POLL_INTERVAL = 4_000;
const MAX_POLLS = 75; // 5 minutes

export default function GrowthPathLoadingPage() {
  const params = useParams<{ sessionId: string }>();
  const router = useRouter();

  const [stageIndex, setStageIndex] = useState(0);
  const [factIndex, setFactIndex] = useState(0);
  const [timedOut, setTimedOut] = useState(false);
  const [checking, setChecking] = useState(false);
  const [partialResults, setPartialResults] = useState<{
    keywordDemand?: number;
    competitorCount?: number;
    mapsCompetitorCount?: number;
  }>({});
  const [progress, setProgress] = useState({ completed: 0, total: 1 });
  const pollCount = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* Cycle through stages */
  useEffect(() => {
    const stageTimer = setInterval(() => {
      setStageIndex((prev) => (prev + 1) % STAGES.length);
    }, 4_000);
    return () => clearInterval(stageTimer);
  }, []);

  /* Cycle through facts */
  useEffect(() => {
    const factTimer = setInterval(() => {
      setFactIndex((prev) => (prev + 1) % DID_YOU_KNOW.length);
    }, 8_000);
    return () => clearInterval(factTimer);
  }, []);

  const poll = useCallback(async () => {
    try {
      const res = await fetch(
        `/api/growth-path/status/${params.sessionId}`
      );
      if (!res.ok) return false;

      const data = await res.json();

      if (data.partialResults) {
        setPartialResults(data.partialResults);
      }

      if (data.totalScans) {
        setProgress({
          completed: data.completedScans,
          total: data.totalScans,
        });
      }

      // Report ready
      if (
        (data.status === "report_ready" || data.status === "reviewed") &&
        data.accessToken
      ) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        router.push(`/growth-path/report/${data.accessToken}`);
        return true;
      }
    } catch {
      /* network hiccup */
    }
    return false;
  }, [params.sessionId, router]);

  /* Poll for status */
  useEffect(() => {
    if (!params.sessionId) return;

    async function doPoll() {
      const done = await poll();
      if (done) return;

      pollCount.current += 1;
      if (pollCount.current >= MAX_POLLS) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setTimedOut(true);
      }
    }

    doPoll();
    intervalRef.current = setInterval(doPoll, POLL_INTERVAL);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [params.sessionId, poll]);

  /* "Check again" handler for timed-out state */
  async function handleCheckAgain() {
    setChecking(true);
    const done = await poll();
    if (!done) {
      // Restart polling for another round
      pollCount.current = 0;
      setTimedOut(false);
      intervalRef.current = setInterval(async () => {
        const ready = await poll();
        if (ready) return;
        pollCount.current += 1;
        if (pollCount.current >= MAX_POLLS) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setTimedOut(true);
        }
      }, POLL_INTERVAL);
    }
    setChecking(false);
  }

  /* Timed-out fallback */
  if (timedOut) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-6"
        style={{ background: "#1a1a1a" }}
      >
        <div className="max-w-md text-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: "rgba(238,108,19,0.15)" }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#EE6C13"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>

          <h1 className="font-heading font-extrabold text-white text-2xl mb-3">
            Your report is almost ready
          </h1>
          <p className="text-gray-400 text-base leading-relaxed mb-4">
            Your analysis is taking a bit longer than usual.
            We&apos;ll email your full report as soon as it&apos;s ready &mdash;
            no action needed on your end.
          </p>

          {progress.completed > 0 && (
            <p className="text-gray-500 text-sm mb-6">
              {progress.completed} of {progress.total} scans completed so far.
            </p>
          )}

          <div className="flex flex-col items-center gap-3">
            <button
              onClick={handleCheckAgain}
              disabled={checking}
              className="inline-block font-heading font-bold text-sm text-white px-8 py-3.5 rounded-[40px] no-underline transition-colors disabled:opacity-50"
              style={{ background: "#EE6C13" }}
            >
              {checking ? "Checking..." : "Check Again"}
            </button>
            <a
              href="/"
              className="text-gray-500 text-sm hover:text-gray-400 transition-colors"
            >
              Back to Homepage
            </a>
          </div>
        </div>
      </div>
    );
  }

  /* Loading state */
  const progressPct = Math.round(
    (progress.completed / Math.max(progress.total, 1)) * 100
  );

  // Map scan progress to meaningful stage message
  const dynamicStage =
    progress.completed === 0
      ? STAGES[stageIndex]
      : progress.completed < progress.total
        ? `${progress.completed} of ${progress.total} scans complete — ${STAGES[stageIndex]}`
        : "Finalizing your recommendations...";

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: "#1a1a1a" }}
    >
      <div className="max-w-md w-full text-center">
        {/* Animated spinner */}
        <div className="relative w-20 h-20 mx-auto mb-8">
          <svg
            className="animate-spin w-20 h-20"
            viewBox="0 0 80 80"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="40"
              cy="40"
              r="36"
              stroke="rgba(238,108,19,0.2)"
              strokeWidth="6"
            />
            <path
              d="M40 4a36 36 0 0 1 36 36"
              stroke="#EE6C13"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-8 h-8 rounded-full animate-pulse"
              style={{ background: "rgba(238,108,19,0.3)" }}
            />
          </div>
        </div>

        {/* Stage indicator */}
        <h1 className="font-heading font-extrabold text-white text-2xl mb-3">
          Building Your Growth Path
        </h1>

        <div className="h-8 flex items-center justify-center mb-6">
          <p
            key={`stage-${stageIndex}-${progress.completed}`}
            className="text-base font-medium animate-fade-in"
            style={{ color: "#EE6C13" }}
          >
            {dynamicStage}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-xs mx-auto mb-6">
          <div className="h-2 w-full rounded-full bg-gray-800 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000 ease-out"
              style={{
                width: `${Math.max(progressPct, 10)}%`,
                background: "#EE6C13",
              }}
            />
          </div>
          <p className="text-gray-500 text-xs mt-2">
            {progress.completed} of {progress.total} scans complete
          </p>
        </div>

        {/* Partial results */}
        {(partialResults.keywordDemand || partialResults.mapsCompetitorCount) && (
          <div className="flex items-center justify-center gap-6 mb-6">
            {partialResults.keywordDemand ? (
              <div className="text-center">
                <p className="text-white text-2xl font-bold">
                  {partialResults.keywordDemand.toLocaleString()}
                </p>
                <p className="text-gray-500 text-xs">monthly searches</p>
              </div>
            ) : null}
            {partialResults.mapsCompetitorCount ? (
              <div className="text-center">
                <p className="text-white text-2xl font-bold">
                  {partialResults.mapsCompetitorCount}
                </p>
                <p className="text-gray-500 text-xs">firms competing</p>
              </div>
            ) : null}
          </div>
        )}

        {/* Did you know? */}
        <div className="mt-6 px-4 py-3 rounded-lg" style={{ background: "rgba(238,108,19,0.08)" }}>
          <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Did you know?</p>
          <p
            key={factIndex}
            className="text-gray-300 text-sm leading-relaxed animate-fade-in"
          >
            {DID_YOU_KNOW[factIndex]}
          </p>
        </div>

        <p className="text-gray-500 text-sm mt-6">
          This usually takes 60&ndash;90 seconds.
        </p>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
