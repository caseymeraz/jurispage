"use client";

import { useState } from "react";
import SourceConfidencePill from "./SourceConfidencePill";

interface MarketOpportunityCardProps {
  totalVolume: number;
  localVolume: number;
  city: string;
  practiceArea: string;
  keywords: { keyword: string; volume: number; localVolume: number }[];
}

export default function MarketOpportunityCard({
  totalVolume,
  localVolume,
  city,
  practiceArea,
  keywords,
}: MarketOpportunityCardProps) {
  const [methodologyOpen, setMethodologyOpen] = useState(false);

  // Use local volume when available; estimate when zero
  const isEstimated = localVolume === 0;
  const displayVolume = localVolume > 0 ? localVolume : Math.round(totalVolume * 0.01);

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: "#1a1a1a" }}>
      <div className="px-6 sm:px-8 py-8">
        {/* Header */}
        <div className="flex items-start justify-between flex-wrap gap-3 mb-6">
          <h3 className="font-heading font-extrabold text-white text-xl">
            Market Opportunity
          </h3>
          <SourceConfidencePill label="Public market data" />
        </div>

        {/* Big number — local/estimated volume as primary */}
        <div className="mb-6">
          <div className="flex items-baseline gap-3">
            <p
              className="font-heading font-extrabold text-5xl sm:text-6xl leading-none"
              style={{ color: "#EE6C13" }}
            >
              {displayVolume.toLocaleString()}
            </p>
            {isEstimated && (
              <span
                className="text-xs font-bold px-2 py-1 rounded-full"
                style={{ background: "rgba(245,158,11,0.15)", color: "#f59e0b" }}
              >
                Estimated
              </span>
            )}
          </div>
          <p className="text-gray-400 text-sm mt-2 leading-relaxed">
            {isEstimated ? "estimated " : ""}monthly searches for {practiceArea.toLowerCase()} keywords
            in {city}
          </p>
          <p className="text-gray-500 text-xs mt-1">
            {totalVolume.toLocaleString()}/mo nationally
          </p>
        </div>

        {/* Local callout — only show when we have real local data */}
        {!isEstimated && (
          <div
            className="rounded-xl px-5 py-4 mb-6"
            style={{ background: "rgba(238,108,19,0.1)" }}
          >
            <p className="text-white text-sm">
              <span className="font-bold" style={{ color: "#EE6C13" }}>
                {localVolume.toLocaleString()}
              </span>{" "}
              of those searches are explicitly local, meaning the person typed your city
              name or is searching from within your service area.
            </p>
          </div>
        )}

        {/* Estimated local callout */}
        {isEstimated && (
          <div
            className="rounded-xl px-5 py-4 mb-6"
            style={{ background: "rgba(245,158,11,0.08)" }}
          >
            <p className="text-gray-400 text-sm leading-relaxed">
              Google doesn&apos;t report granular local volume for smaller markets. We estimated
              this based on {city}&apos;s share of national search demand. Your actual local
              volume may be higher due to surrounding metro areas.
            </p>
          </div>
        )}

        {/* Keyword list */}
        {keywords.length > 0 && (
          <div>
            <p className="text-gray-500 text-xs font-heading font-bold uppercase tracking-widest mb-3">
              Sample keywords by volume
            </p>
            <div className="space-y-2">
              {keywords.slice(0, 10).map((kw, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0"
                >
                  <span className="text-gray-300 text-sm">{kw.keyword}</span>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-white font-medium tabular-nums">
                      {kw.volume.toLocaleString()}
                    </span>
                    <span className="text-gray-500 tabular-nums">
                      {kw.localVolume.toLocaleString()} local
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Long-tail opportunities */}
            {keywords.length > 10 && (
              <div className="mt-6">
                <p className="text-gray-500 text-xs font-heading font-bold uppercase tracking-widest mb-3">
                  Long-tail opportunities
                </p>
                <div className="space-y-2">
                  {keywords.slice(10).map((kw, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0"
                    >
                      <span className="text-gray-300 text-sm">{kw.keyword}</span>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-white font-medium tabular-nums">
                          {kw.volume.toLocaleString()}
                        </span>
                        <span className="text-gray-500 tabular-nums">
                          {kw.localVolume.toLocaleString()} local
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Methodology collapsible */}
            <div className="mt-6">
              <button
                onClick={() => setMethodologyOpen(!methodologyOpen)}
                className="text-gray-500 text-xs font-medium hover:text-gray-300 transition-colors flex items-center gap-1"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-transform ${methodologyOpen ? "rotate-90" : ""}`}
                  aria-hidden="true"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
                How we calculated this
              </button>
              {methodologyOpen && (
                <div className="mt-3 rounded-xl border border-gray-800 px-5 py-4">
                  <div className="space-y-3 text-sm text-gray-400 leading-relaxed">
                    <p>
                      We queried <span className="text-white">{keywords.length} keywords</span> via
                      Google Ads keyword data (DataForSEO API) at the national level (US) and with
                      a local filter for <span className="text-white">{city}</span>.
                    </p>
                    <p>
                      <strong className="text-gray-300">National volume</strong> ({totalVolume.toLocaleString()}/mo)
                      is the sum of all keyword volumes across the US.
                    </p>
                    <p>
                      <strong className="text-gray-300">Local volume</strong>{" "}
                      {isEstimated ? (
                        <>is estimated at 1% of national because Google does not report
                        granular data for this market size.</>
                      ) : (
                        <>({localVolume.toLocaleString()}/mo) reflects searches originating in or
                        mentioning {city}.</>
                      )}
                    </p>
                    <p>
                      Volume data is approximate and sourced from Google. Actual numbers may vary
                      month to month.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Upsell note */}
            <div
              className="rounded-xl px-5 py-4 mt-6"
              style={{ background: "rgba(238,108,19,0.08)" }}
            >
              <p className="text-gray-400 text-sm leading-relaxed">
                This is a sample of high-value keywords. Working with JurisPage
                unlocks a deeper keyword analysis covering{" "}
                <span className="text-white font-medium">50+ keyword opportunities</span>{" "}
                tailored to your practice and market.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
