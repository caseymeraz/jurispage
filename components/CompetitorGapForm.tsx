"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import TurnstileWidget from "@/components/TurnstileWidget";
import { getHubSpotCookie } from "@/lib/hubspot-cookie";

const PRACTICE_AREAS = [
  "Personal Injury",
  "Criminal Defense",
  "Family Law",
  "Immigration",
  "Estate Planning",
  "Bankruptcy",
  "Employment Law",
  "DUI Defense",
  "Workers' Compensation",
  "Social Security Disability",
  "Medical Malpractice",
  "Real Estate Law",
  "Business / Corporate",
  "Other",
] as const;

const LOADING_MESSAGES = [
  "Connecting to Google Live Servers...",
  "Scanning Local Map Pack...",
  "Compiling Competitor Gap Report...",
];

type Step = "inputs" | "loading" | "email-gate" | "submitting";

export default function CompetitorGapForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [step, setStep] = useState<Step>("inputs");
  const [targetUrl, setTargetUrl] = useState("");
  const [city, setCity] = useState("");
  const [practiceArea, setPracticeArea] = useState("");
  const [email, setEmail] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const loadingInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  // Fake loading animation
  useEffect(() => {
    if (step !== "loading") return;

    setLoadingMessageIndex(0);
    let tick = 0;

    loadingInterval.current = setInterval(() => {
      tick++;
      if (tick < LOADING_MESSAGES.length) {
        setLoadingMessageIndex(tick);
      } else {
        if (loadingInterval.current) clearInterval(loadingInterval.current);
        setStep("email-gate");
      }
    }, 1200);

    return () => {
      if (loadingInterval.current) clearInterval(loadingInterval.current);
    };
  }, [step]);

  function handleRunScan(e: React.FormEvent) {
    e.preventDefault();
    setStep("loading");
  }

  async function handleRevealReport(e: React.FormEvent) {
    e.preventDefault();
    setStep("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/competitor-gap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          targetUrl,
          city,
          practiceArea,
          turnstileToken,
          hutk: getHubSpotCookie(),
          pageUri: window.location.href,
          pageName: document.title,
          utmSource: searchParams.get("utm_source") || undefined,
          utmMedium: searchParams.get("utm_medium") || undefined,
          utmCampaign: searchParams.get("utm_campaign") || undefined,
          utmTerm: searchParams.get("utm_term") || undefined,
          utmContent: searchParams.get("utm_content") || undefined,
          referrer: document.referrer || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong.");
      }

      const { reportId } = await res.json();
      router.push(`/competitor-report/${reportId}`);
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong."
      );
      setStep("email-gate");
    }
  }

  const inputClass =
    "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:border-transparent focus:shadow-[0_0_0_3px_rgba(238,108,19,0.15)]";
  const ringStyle = { "--tw-ring-color": "#EE6C13" } as React.CSSProperties;

  return (
    <div>
      {/* Step: loading */}
      {step === "loading" && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 text-center">
          <svg
            className="animate-spin h-10 w-10 mx-auto mb-4"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="#EE6C13"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="#EE6C13"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          <p className="text-gray-700 font-heading font-bold text-lg">
            {LOADING_MESSAGES[loadingMessageIndex]}
          </p>
        </div>
      )}

      {/* Step: email-gate */}
      {(step === "email-gate" || step === "submitting") && (
        <form
          onSubmit={handleRevealReport}
          className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 text-center"
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: "#dcfce7" }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#16a34a"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h3 className="font-heading font-bold text-xl text-gray-900 mb-2">
            Scan Complete
          </h3>
          <p className="text-gray-600 text-sm mb-6">
            We found several local firms outranking{" "}
            <span className="font-semibold text-gray-900">{targetUrl}</span>.
            Enter your work email to reveal your Competitor Gap Report.
          </p>

          {errorMessage && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4 text-sm text-red-700">
              {errorMessage}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your work email address"
              className={`flex-1 ${inputClass}`}
              style={ringStyle}
            />
            <button
              type="submit"
              disabled={step === "submitting"}
              className="text-white font-bold py-3 px-6 rounded-xl text-sm transition-colors disabled:opacity-60 whitespace-nowrap"
              style={{ background: "#EE6C13" }}
              onMouseEnter={(e) => {
                if (step !== "submitting")
                  e.currentTarget.style.background = "#982A0B";
              }}
              onMouseLeave={(e) => {
                if (step !== "submitting")
                  e.currentTarget.style.background = "#EE6C13";
              }}
            >
              {step === "submitting" ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Generating Report...
                </span>
              ) : (
                "Reveal Report"
              )}
            </button>
          </div>
        </form>
      )}

      {/* Step: inputs (default) */}
      {step === "inputs" && (
        <form
          onSubmit={handleRunScan}
          className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8"
        >
          <h2 className="font-heading font-bold text-xl text-gray-900 mb-2 text-center">
            See Who Is Stealing Your Local Search Traffic
          </h2>
          <p className="text-gray-600 text-sm text-center mb-6">
            Enter your firm&apos;s website, city, and practice area to scan
            Google and see exactly which local firms are outranking you
            for the searches that generate cases.
          </p>

          <div className="space-y-3 mb-4">
            <input
              type="text"
              required
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              placeholder="www.yourfirm.com"
              className={inputClass}
              style={ringStyle}
            />
            <input
              type="text"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g. Chicago"
              className={inputClass}
              style={ringStyle}
            />
            <select
              required
              value={practiceArea}
              onChange={(e) => setPracticeArea(e.target.value)}
              className={inputClass}
              style={ringStyle}
            >
              <option value="" disabled>
                Select Practice Area
              </option>
              {PRACTICE_AREAS.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full text-white font-bold py-3 px-6 rounded-xl text-sm transition-colors"
            style={{ background: "#EE6C13" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#982A0B")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#EE6C13")}
          >
            Run Free Competitor Scan
          </button>

          <p className="text-xs text-gray-400 text-center mt-3">
            Free instant analysis. No sales call required.
          </p>
        </form>
      )}

      {/* Turnstile widget — always mounted so the token stays valid across steps */}
      <TurnstileWidget onVerify={setTurnstileToken} />
    </div>
  );
}
