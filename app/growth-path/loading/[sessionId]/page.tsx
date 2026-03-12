"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";

const STAGES = [
  "Looking at your market...",
  "Checking who already shows up when people search...",
  "Reviewing how your website asks visitors to contact you...",
  "Pulling public Google Maps and competitor data...",
  "Building your recommended path...",
] as const;

const POLL_INTERVAL = 4_000;
const MAX_POLLS = 45; // 3 minutes

export default function GrowthPathLoadingPage() {
  const params = useParams<{ sessionId: string }>();
  const router = useRouter();

  const [stageIndex, setStageIndex] = useState(0);
  const [timedOut, setTimedOut] = useState(false);
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

  /* Poll for status */
  useEffect(() => {
    if (!params.sessionId) return;

    async function poll() {
      try {
        const res = await fetch(
          `/api/growth-path/status/${params.sessionId}`
        );
        if (!res.ok) return;

        const data = await res.json();

        // Update partial results
        if (data.partialResults) {
          setPartialResults(data.partialResults);
        }

        // Update progress
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
          return;
        }
      } catch {
        /* network hiccup */
      }

      pollCount.current += 1;
      if (pollCount.current >= MAX_POLLS) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setTimedOut(true);
      }
    }

    poll();
    intervalRef.current = setInterval(poll, POLL_INTERVAL);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [params.sessionId, router]);

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
            We&apos;re building your report
          </h1>
          <p className="text-gray-400 text-base leading-relaxed mb-8">
            Your analysis is taking a bit longer than usual. We&apos;ll email
            your full report as soon as it&apos;s ready. No action needed on
            your end.
          </p>

          <a
            href="/"
            className="inline-block font-heading font-bold text-sm text-white px-8 py-3.5 rounded-[40px] no-underline transition-colors"
            style={{ background: "#EE6C13" }}
          >
            Back to Homepage
          </a>
        </div>
      </div>
    );
  }

  /* Loading state */
  const progressPct = Math.round(
    (progress.completed / Math.max(progress.total, 1)) * 100
  );

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
            key={stageIndex}
            className="text-base font-medium animate-fade-in"
            style={{ color: "#EE6C13" }}
          >
            {STAGES[stageIndex]}
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

        <p className="text-gray-500 text-sm">
          This usually takes 60-90 seconds.
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
