"use client";

import { useState } from "react";

interface LocalPackItem {
  name: string;
  domain: string;
  position: number;
}

interface OrganicItem {
  domain: string;
  title: string;
  url: string;
  position: number;
}

interface CompetitorReportProps {
  reportId: string;
  targetDomain: string;
  city: string;
  practiceArea: string;
  searchQuery: string;
  localPackItems: LocalPackItem[] | null;
  organicItems: OrganicItem[] | null;
  targetRank: number | null;
  targetInLocalPack: boolean;
}

const MEETINGS_URL =
  process.env.NEXT_PUBLIC_HUBSPOT_MEETINGS_URL ||
  "https://meetings.hubspot.com/armon-hatcher/proposal-review";

export default function CompetitorReport({
  targetDomain,
  city,
  practiceArea,
  searchQuery,
  localPackItems,
  organicItems,
  targetRank,
  targetInLocalPack,
}: CompetitorReportProps) {
  const [copied, setCopied] = useState(false);

  const topLocalPack = (localPackItems || []).slice(0, 3);
  const topOrganic = (organicItems || []).slice(0, 3);
  const topCompetitorDomain = topOrganic[0]?.domain;

  function handleShare() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const hasResults = (localPackItems && localPackItems.length > 0) || (organicItems && organicItems.length > 0);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-gray-100 py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div>
              <span
                className="inline-block text-xs font-heading font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3"
                style={{ background: "#EE6C1322", color: "#EE6C13" }}
              >
                Competitor Gap Report
              </span>
              <h1 className="font-heading font-extrabold text-gray-900 text-2xl md:text-3xl leading-tight">
                {targetDomain} in {city}
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                {practiceArea} &middot; Query: &ldquo;{searchQuery}&rdquo;
              </p>
            </div>
            <button
              onClick={handleShare}
              className="self-start text-sm font-medium px-4 py-2 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors"
            >
              {copied ? "Copied!" : "Share Report"}
            </button>
          </div>

          {!hasResults && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm text-yellow-800">
              Results are currently unavailable for this query. Our team has been notified and will follow up with your report.
            </div>
          )}
        </div>
      </section>

      {hasResults && (
        <div className="max-w-3xl mx-auto px-6 py-10 space-y-10">
          {/* Target Rank Summary */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
            <p className="text-gray-500 text-sm mb-1">Your Organic Ranking for &ldquo;{searchQuery}&rdquo;</p>
            <p
              className="font-heading font-extrabold text-4xl"
              style={{ color: targetRank && targetRank <= 10 ? "#16a34a" : "#dc2626" }}
            >
              {targetRank ? `#${targetRank}` : "Not in Top 100"}
            </p>
          </div>

          {/* Section 1: Local Map Pack */}
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-heading font-bold text-xl text-gray-900 mb-4">
              Google Map Pack Results
            </h2>

            {topLocalPack.length > 0 ? (
              <>
                <div className="space-y-3 mb-4">
                  {topLocalPack.map((item) => (
                    <div
                      key={item.position}
                      className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 border border-gray-100"
                    >
                      <span
                        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-heading font-bold text-white text-sm"
                        style={{ background: "#EE6C13" }}
                      >
                        {item.position}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-heading font-bold text-gray-900 text-sm truncate">
                          {item.name || item.domain}
                        </p>
                        {item.domain && (
                          <p className="text-gray-500 text-xs truncate">{item.domain}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {targetInLocalPack ? (
                  <div className="flex items-center gap-2 text-sm font-medium text-green-700 bg-green-50 rounded-xl p-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Your site appears in the Google Map Pack
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-sm font-medium text-orange-700 bg-orange-50 rounded-xl p-3" style={{ color: "#982A0B" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    Your site is not appearing in the Google Map Pack
                  </div>
                )}
              </>
            ) : (
              <p className="text-gray-500 text-sm">
                No Map Pack results found for this query. This search may not trigger a local pack.
              </p>
            )}
          </section>

          {/* Section 2: Organic Results */}
          {topOrganic.length > 0 && (
            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-heading font-bold text-xl text-gray-900 mb-4">
                Top Organic Competitors
              </h2>
              <div className="space-y-3">
                {topOrganic.map((item) => (
                  <div
                    key={item.position}
                    className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 border border-gray-100"
                  >
                    <span
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-heading font-bold text-white text-sm"
                      style={{ background: "#1a1a1a" }}
                    >
                      {item.position}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-heading font-bold text-gray-900 text-sm truncate">
                        {item.domain}
                      </p>
                      <p className="text-gray-500 text-xs truncate">{item.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section 3: CTA */}
          <section className="rounded-2xl p-8 text-center" style={{ background: "#1a1a1a" }}>
            <h2 className="font-heading font-extrabold text-white text-2xl mb-3">
              Want to see the exact blueprint we&apos;d use to outrank{" "}
              {topCompetitorDomain ? topCompetitorDomain : "your competitors"}?
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              Book a free strategy call with our team. We&apos;ll walk you through a custom plan to improve your rankings in {city}.
            </p>
            <a
              href={MEETINGS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-white font-bold py-3 px-8 rounded-xl text-sm transition-colors"
              style={{ background: "#EE6C13" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#982A0B")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#EE6C13")}
            >
              Book a Strategy Call
            </a>
          </section>
        </div>
      )}
    </div>
  );
}
