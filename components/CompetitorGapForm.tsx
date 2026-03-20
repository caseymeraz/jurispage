"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import TurnstileWidget from "@/components/TurnstileWidget";
import { getHubSpotCookie } from "@/lib/hubspot-cookie";

type FormState = "idle" | "loading" | "success" | "error";

export default function CompetitorGapForm() {
  const searchParams = useSearchParams();
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [email, setEmail] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormState("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/competitor-gap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
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

      setFormState("success");
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong."
      );
      setFormState("error");
    }
  }

  if (formState === "success") {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 text-center">
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
          Your Competitor Gap Scan Is on the Way
        </h3>
        <p className="text-gray-600 text-sm">
          Check your inbox shortly for your local search scorecard. We&apos;ll
          show you exactly which competitors are capturing your potential cases.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8"
    >
      <h2 className="font-heading font-bold text-xl text-gray-900 mb-2 text-center">
        Are your competitors outranking you for the most lucrative cases?
      </h2>
      <p className="text-gray-600 text-sm text-center mb-6">
        Enter your work email. We will instantly analyze your domain and show you
        exactly which local firms are capturing the Google search traffic that
        should be yours.
      </p>

      {formState === "error" && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 mb-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your work email address"
          className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:border-transparent focus:shadow-[0_0_0_3px_rgba(238,108,19,0.15)]"
          style={{ "--tw-ring-color": "#EE6C13" } as React.CSSProperties}
        />
        <button
          type="submit"
          disabled={formState === "loading"}
          className="text-white font-bold py-3 px-6 rounded-xl text-sm transition-colors disabled:opacity-60 whitespace-nowrap"
          style={{ background: "#EE6C13" }}
          onMouseEnter={(e) => {
            if (formState !== "loading")
              e.currentTarget.style.background = "#982A0B";
          }}
          onMouseLeave={(e) => {
            if (formState !== "loading")
              e.currentTarget.style.background = "#EE6C13";
          }}
        >
          {formState === "loading" ? (
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
              Scanning...
            </span>
          ) : (
            "Scan My Competitor Gap"
          )}
        </button>
      </div>

      <TurnstileWidget onVerify={setTurnstileToken} />
      <p className="text-xs text-gray-400 text-center mt-3">
        No sales call required. Instant access to your local search scorecard.
      </p>
    </form>
  );
}
