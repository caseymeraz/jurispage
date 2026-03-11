"use client";

import Link from "next/link";
import MarketGapTeaser from "./MarketGapTeaser";
import type { MarketGapTeaserProps } from "./MarketGapTeaser";

interface MarketGapReportProps {
  teaser: MarketGapTeaserProps;
  visibilityScore: number;
  gapScore: number;
  opportunityScore: number;
  executiveSummary: string | null;
  biggestGaps: string[] | null;
  fastestWins: string[] | null;
  ninetyDayPriorities: string[] | null;
  recommendedService: string | null;
  organicDominators: string[];
  directoryObstacles: string[];
  intakeDrag: {
    multiplier: number;
    recoverableRange: string;
    estimatedDrag: string;
    urgencyLabel: string;
  } | null;
  aiVisibility: {
    mentions: number;
    impressions: number;
  } | null;
  authorityData: {
    firm: {
      referringDomains: number;
      domainRating: number;
    } | null;
    topCompetitor: {
      domain: string;
      referringDomains: number;
      domainRating: number;
    } | null;
  } | null;
  isNewFirm: boolean;
  hasSlowResponse: boolean;
}

function ScoreGauge({ score, label }: { score: number; label: string }) {
  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (score / 100) * circumference;
  const color =
    score >= 70 ? "#22c55e" : score >= 40 ? "#f59e0b" : "#ef4444";

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24">
        <svg width="96" height="96" viewBox="0 0 96 96" aria-hidden="true">
          <circle
            cx="48"
            cy="48"
            r="40"
            stroke="#e5e7eb"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="48"
            cy="48"
            r="40"
            stroke={color}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 48 48)"
            className="transition-all duration-700"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-heading font-extrabold text-xl text-gray-900">
            {score}
          </span>
        </div>
      </div>
      <p className="text-gray-500 text-xs font-heading font-bold uppercase tracking-widest mt-2">
        {label}
      </p>
    </div>
  );
}

export default function MarketGapReport({
  teaser,
  visibilityScore,
  gapScore,
  opportunityScore,
  executiveSummary,
  biggestGaps,
  fastestWins,
  ninetyDayPriorities,
  recommendedService,
  organicDominators,
  directoryObstacles,
  intakeDrag,
  aiVisibility,
  authorityData,
  isNewFirm,
  hasSlowResponse,
}: MarketGapReportProps) {
  return (
    <div className="space-y-0">
      {/* Teaser section */}
      <div className="bg-white px-6 sm:px-8 py-10">
        <MarketGapTeaser {...teaser} />
      </div>

      {/* Score gauges */}
      <div className="bg-gray-50 px-6 sm:px-8 py-10">
        <h3 className="font-heading font-extrabold text-gray-900 text-xl mb-8 text-center">
          Your Scores
        </h3>
        <div className="flex flex-wrap justify-center gap-10">
          <ScoreGauge score={visibilityScore} label="Visibility" />
          <ScoreGauge score={gapScore} label="Gap Score" />
          <ScoreGauge score={opportunityScore} label="Opportunity" />
        </div>
      </div>

      {/* Executive Summary */}
      {executiveSummary && (
        <div className="bg-white px-6 sm:px-8 py-10">
          <h3 className="font-heading font-extrabold text-gray-900 text-xl mb-4">
            Executive Summary
          </h3>
          <div
            className="rounded-xl p-6 border leading-relaxed text-gray-700"
            style={{ background: "#FEF3EC", borderColor: "rgba(238,108,19,0.2)" }}
          >
            {executiveSummary}
          </div>
        </div>
      )}

      {/* Biggest Gaps */}
      {biggestGaps && biggestGaps.length > 0 && (
        <div className="bg-gray-50 px-6 sm:px-8 py-10">
          <h3 className="font-heading font-extrabold text-gray-900 text-xl mb-6">
            Biggest Gaps
          </h3>
          <ol className="space-y-3">
            {biggestGaps.map((gap, i) => (
              <li key={i} className="flex items-start gap-4">
                <span
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                  style={{ background: "#EE6C13" }}
                >
                  {i + 1}
                </span>
                <p className="text-gray-700 text-sm leading-relaxed pt-1">
                  {gap}
                </p>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Fastest Wins */}
      {fastestWins && fastestWins.length > 0 && (
        <div className="bg-white px-6 sm:px-8 py-10">
          <h3 className="font-heading font-extrabold text-gray-900 text-xl mb-6">
            Fastest Wins
          </h3>
          <ul className="space-y-3">
            {fastestWins.map((win, i) => (
              <li key={i} className="flex items-start gap-3">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                >
                  <circle cx="10" cy="10" r="10" fill="#22c55e" />
                  <path
                    d="M6 10l3 3 5-5"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="text-gray-700 text-sm leading-relaxed">{win}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Organic SERP Analysis */}
      {(organicDominators.length > 0 || directoryObstacles.length > 0) && (
        <div className="bg-gray-50 px-6 sm:px-8 py-10">
          <h3 className="font-heading font-extrabold text-gray-900 text-xl mb-6">
            Organic SERP Analysis
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {organicDominators.length > 0 && (
              <div className="rounded-xl border border-gray-100 bg-white p-6">
                <p className="text-gray-400 text-xs font-heading font-bold uppercase tracking-widest mb-4">
                  Law Firm Dominators
                </p>
                <ul className="space-y-2">
                  {organicDominators.map((d, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <span
                        className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold"
                        style={{ background: "#EE6C13" }}
                      >
                        {i + 1}
                      </span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {directoryObstacles.length > 0 && (
              <div className="rounded-xl border border-gray-100 bg-white p-6">
                <p className="text-gray-400 text-xs font-heading font-bold uppercase tracking-widest mb-4">
                  Directory Obstacles
                </p>
                <ul className="space-y-2">
                  {directoryObstacles.map((d, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="flex-shrink-0"
                        aria-hidden="true"
                      >
                        <circle cx="8" cy="8" r="8" fill="#f59e0b" />
                        <path
                          d="M8 5v3M8 10h.01"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Authority Comparison */}
      {authorityData && (authorityData.firm || authorityData.topCompetitor) && (
        <div className="bg-white px-6 sm:px-8 py-10">
          <h3 className="font-heading font-extrabold text-gray-900 text-xl mb-6">
            Authority Comparison
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Your firm */}
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-6">
              <p className="text-gray-400 text-xs font-heading font-bold uppercase tracking-widest mb-4">
                Your Firm
              </p>
              {authorityData.firm ? (
                <div className="space-y-3">
                  <div>
                    <p className="text-gray-500 text-xs mb-1">Domain Rating</p>
                    <p className="font-heading font-extrabold text-2xl text-gray-900">
                      {authorityData.firm.domainRating}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs mb-1">Referring Domains</p>
                    <p className="font-heading font-extrabold text-2xl text-gray-900">
                      {authorityData.firm.referringDomains.toLocaleString("en-US")}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-400 text-sm">No data available</p>
              )}
            </div>

            {/* Top competitor */}
            <div
              className="rounded-xl border p-6"
              style={{ borderColor: "rgba(238,108,19,0.2)", background: "#FEF3EC" }}
            >
              <p className="text-gray-400 text-xs font-heading font-bold uppercase tracking-widest mb-4">
                Top Competitor
              </p>
              {authorityData.topCompetitor ? (
                <div className="space-y-3">
                  <p className="text-sm text-gray-600 font-medium mb-2">
                    {authorityData.topCompetitor.domain}
                  </p>
                  <div>
                    <p className="text-gray-500 text-xs mb-1">Domain Rating</p>
                    <p
                      className="font-heading font-extrabold text-2xl"
                      style={{ color: "#EE6C13" }}
                    >
                      {authorityData.topCompetitor.domainRating}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs mb-1">Referring Domains</p>
                    <p
                      className="font-heading font-extrabold text-2xl"
                      style={{ color: "#EE6C13" }}
                    >
                      {authorityData.topCompetitor.referringDomains.toLocaleString("en-US")}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-400 text-sm">No data available</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* AI Visibility */}
      {aiVisibility && (
        <div className="bg-gray-50 px-6 sm:px-8 py-10">
          <h3 className="font-heading font-extrabold text-gray-900 text-xl mb-6">
            AI Visibility
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-gray-100 bg-white p-6 text-center">
              <p className="text-gray-400 text-xs font-heading font-bold uppercase tracking-widest mb-2">
                AI Mentions
              </p>
              <p
                className="font-heading font-extrabold text-3xl"
                style={{ color: "#EE6C13" }}
              >
                {aiVisibility.mentions}
              </p>
            </div>
            <div className="rounded-xl border border-gray-100 bg-white p-6 text-center">
              <p className="text-gray-400 text-xs font-heading font-bold uppercase tracking-widest mb-2">
                AI Impressions
              </p>
              <p
                className="font-heading font-extrabold text-3xl"
                style={{ color: "#EE6C13" }}
              >
                {aiVisibility.impressions.toLocaleString("en-US")}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 90-Day Priorities */}
      {ninetyDayPriorities && ninetyDayPriorities.length > 0 && (
        <div className="bg-white px-6 sm:px-8 py-10">
          <h3 className="font-heading font-extrabold text-gray-900 text-xl mb-6">
            90-Day Priorities
          </h3>
          <ol className="space-y-4">
            {ninetyDayPriorities.map((priority, i) => (
              <li key={i} className="flex items-start gap-4">
                <span
                  className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                  style={{
                    background:
                      i === 0
                        ? "#EE6C13"
                        : i === 1
                          ? "#f59e0b"
                          : "#6b7280",
                  }}
                >
                  {i + 1}
                </span>
                <p className="text-gray-700 text-sm leading-relaxed pt-1">
                  {priority}
                </p>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Intake Drag */}
      {intakeDrag && (
        <div
          className="px-6 sm:px-8 py-10"
          style={{ background: "#1a1a1a" }}
        >
          <h3 className="font-heading font-extrabold text-white text-xl mb-6">
            Intake Drag Analysis
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              className="rounded-xl p-5"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <p className="text-gray-400 text-xs font-heading font-bold uppercase tracking-widest mb-2">
                Drag Multiplier
              </p>
              <p
                className="font-heading font-extrabold text-2xl"
                style={{ color: "#EE6C13" }}
              >
                {intakeDrag.multiplier}x
              </p>
            </div>
            <div
              className="rounded-xl p-5"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <p className="text-gray-400 text-xs font-heading font-bold uppercase tracking-widest mb-2">
                Recoverable Range
              </p>
              <p className="font-heading font-bold text-white text-lg">
                {intakeDrag.recoverableRange}
              </p>
            </div>
            <div
              className="rounded-xl p-5"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <p className="text-gray-400 text-xs font-heading font-bold uppercase tracking-widest mb-2">
                Estimated Drag
              </p>
              <p className="font-heading font-bold text-white text-lg">
                {intakeDrag.estimatedDrag}
              </p>
            </div>
            <div
              className="rounded-xl p-5"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <p className="text-gray-400 text-xs font-heading font-bold uppercase tracking-widest mb-2">
                Urgency
              </p>
              <p
                className="font-heading font-extrabold text-lg"
                style={{
                  color:
                    intakeDrag.urgencyLabel.toLowerCase().includes("high") ||
                    intakeDrag.urgencyLabel.toLowerCase().includes("critical")
                      ? "#ef4444"
                      : intakeDrag.urgencyLabel.toLowerCase().includes("medium")
                        ? "#f59e0b"
                        : "#22c55e",
                }}
              >
                {intakeDrag.urgencyLabel}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Smart CTA */}
      <div
        className="px-6 sm:px-8 py-12 text-center"
        style={{ background: "linear-gradient(135deg, #EE6C13, #982A0B)" }}
      >
        <h3 className="font-heading font-extrabold text-white text-2xl mb-3">
          {isNewFirm
            ? "Ready to Launch Your Online Presence?"
            : hasSlowResponse
              ? "Your Speed to Lead Is Costing You Cases"
              : "Let\u2019s Build Your 90-Day Growth Plan"}
        </h3>
        <p className="text-orange-100 text-base mb-6 max-w-lg mx-auto">
          {isNewFirm
            ? "Get a transparent, instant quote for your firm\u2019s exact needs."
            : hasSlowResponse
              ? "See exactly what intake delays are costing your firm every month."
              : "Book a strategy session and we\u2019ll map out every priority together."}
        </p>
        {recommendedService && (
          <p className="text-orange-200 text-sm mb-6">
            Recommended: <span className="font-bold text-white">{recommendedService}</span>
          </p>
        )}
        <Link
          href={
            isNewFirm
              ? "/launchpad"
              : hasSlowResponse
                ? "/secret-shop"
                : "/contact"
          }
          className="inline-block bg-white font-heading font-bold text-base px-8 py-4 rounded-[40px] no-underline hover:bg-orange-50 transition-colors"
          style={{ color: "#982A0B" }}
        >
          {isNewFirm
            ? "Get My Instant Quote"
            : hasSlowResponse
              ? "See What Intake Delays Cost Me"
              : "Book My Strategy Session"}
        </Link>
      </div>
    </div>
  );
}
