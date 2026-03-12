"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";

const STAGES = [
  "Analyzing your market...",
  "Looking up competitors...",
  "Calculating search volume...",
  "Building your snapshot...",
] as const;

const POLL_INTERVAL = 4_000;
const MAX_POLLS = 30; // 2 minutes

export default function MarketGapLoadingPage() {
  const params = useParams<{ reportId: string }>();
  const router = useRouter();

  const [stageIndex, setStageIndex] = useState(0);
  const [timedOut, setTimedOut] = useState(false);
  const pollCount = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ── Cycle through stages ── */
  useEffect(() => {
    const stageTimer = setInterval(() => {
      setStageIndex((prev) => (prev + 1) % STAGES.length);
    }, 3_000);
    return () => clearInterval(stageTimer);
  }, []);

  /* ── Poll for status ── */
  useEffect(() => {
    if (!params.reportId) return;

    async function poll() {
      try {
        const res = await fetch(
          `/api/market-gap/status/${params.reportId}`
        );
        if (!res.ok) return;

        const data = await res.json();

        if (data.status === "teaser_ready" && data.accessToken) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          router.push(`/market-gap/report/${data.accessToken}`);
          return;
        }

        if (data.status === "full_report_ready" && data.accessToken) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          router.push(`/market-gap/report/${data.accessToken}`);
          return;
        }
      } catch {
        /* network hiccup - keep polling */
      }

      pollCount.current += 1;
      if (pollCount.current >= MAX_POLLS) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setTimedOut(true);
      }
    }

    poll(); // first call immediately
    intervalRef.current = setInterval(poll, POLL_INTERVAL);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [params.reportId, router]);

  /* ── Timed-out fallback ── */
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
            your full report within 24 hours. No action needed on your end.
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

  /* ── Loading state ── */
  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: "#1a1a1a" }}
    >
      <div className="max-w-md w-full text-center">
        {/* Animated spinner */}
        <div className="relative w-20 h-20 mx-auto mb-8">
          {/* Outer ring */}
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
          {/* Inner pulse */}
          <div
            className="absolute inset-0 flex items-center justify-center"
          >
            <div
              className="w-8 h-8 rounded-full animate-pulse"
              style={{ background: "rgba(238,108,19,0.3)" }}
            />
          </div>
        </div>

        {/* Stage indicator */}
        <h1 className="font-heading font-extrabold text-white text-2xl mb-3">
          Generating Your Report
        </h1>

        <div className="h-8 flex items-center justify-center mb-8">
          <p
            key={stageIndex}
            className="text-base font-medium animate-fade-in"
            style={{ color: "#EE6C13" }}
          >
            {STAGES[stageIndex]}
          </p>
        </div>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {STAGES.map((_, i) => (
            <div
              key={i}
              className="w-2.5 h-2.5 rounded-full transition-all duration-500"
              style={{
                background:
                  i <= stageIndex ? "#EE6C13" : "rgba(238,108,19,0.2)",
                transform: i === stageIndex ? "scale(1.3)" : "scale(1)",
              }}
            />
          ))}
        </div>

        <p className="text-gray-500 text-sm">
          This usually takes less than 60 seconds.
        </p>
      </div>

      {/* Keyframe for fade-in animation */}
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
