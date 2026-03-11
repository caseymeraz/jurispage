"use client";

import TeaserContactForm from "@/components/TeaserContactForm";

export interface MarketGapTeaserProps {
  totalSearchVolume: number;
  localTotalSearchVolume?: number | null;
  topCompetitors: {
    name: string;
    rating: number | null;
    reviewCount: number | null;
    position: number;
  }[];
  firmInMapPack: boolean;
  firmRating: number | null;
  firmReviewCount: number | null;
  biggestGap: string;
  keywordHighlights: {
    keyword: string;
    volume?: number;
    localVolume?: number;
    nationalVolume?: number;
  }[];
  practiceArea: string;
  city: string;
  state: string;
  aiSearchResults?: { query: string; found: boolean; citedDomains: string[] }[];
  reportId?: string;
  leadName?: string;
  leadEmail?: string;
  leadPhone?: string;
}

function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

export default function MarketGapTeaser({
  totalSearchVolume,
  localTotalSearchVolume,
  topCompetitors,
  firmInMapPack,
  firmRating,
  firmReviewCount,
  biggestGap,
  keywordHighlights,
  practiceArea,
  city,
  state,
  aiSearchResults,
  reportId,
  leadName,
  leadEmail,
  leadPhone,
}: MarketGapTeaserProps) {
  const top3 = topCompetitors.slice(0, 3);
  const hasLocal = localTotalSearchVolume != null && localTotalSearchVolume > 0;
  const hasAiResults = aiSearchResults && aiSearchResults.length > 0;
  const aiFoundCount = aiSearchResults?.filter((r) => r.found).length ?? 0;

  // Determine if keyword highlights have dual volume data
  const hasDualVolumes = keywordHighlights.some(
    (kw) => kw.nationalVolume !== undefined
  );

  return (
    <div>
      {/* Report header */}
      <div className="mb-10 pb-8 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-1.5 w-8 rounded-full" style={{ background: "#EE6C13" }} />
          <p className="text-gray-400 text-xs font-heading font-bold uppercase tracking-widest">
            Market Gap Snapshot
          </p>
        </div>
        <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-gray-900 mb-2">
          {practiceArea}
        </h2>
        <p className="text-gray-500 text-lg font-heading">
          {city}, {state}
        </p>
      </div>

      {/* Snapshot cards — 2x2 grid + full-width bottom row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {/* Monthly Market Demand */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="h-1 w-10 rounded-full mb-4" style={{ background: "#EE6C13" }} />
          <p className="text-gray-400 text-xs font-heading font-bold uppercase tracking-widest mb-2">
            {hasLocal ? "Monthly Local Demand" : "Monthly Market Demand"}
          </p>
          {hasLocal ? (
            <>
              <p className="font-heading font-extrabold text-gray-900 text-3xl">
                {formatNumber(localTotalSearchVolume!)}
                <span className="text-gray-400 text-base font-bold">/mo</span>
              </p>
              <p className="text-gray-500 text-sm mt-1">
                {formatNumber(totalSearchVolume)}/mo nationally
              </p>
            </>
          ) : (
            <p className="font-heading font-extrabold text-gray-900 text-3xl">
              {formatNumber(totalSearchVolume)}
              <span className="text-gray-400 text-base font-bold">/mo</span>
            </p>
          )}
        </div>

        {/* Your Visibility */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div
            className="h-1 w-10 rounded-full mb-4"
            style={{ background: firmInMapPack ? "#22c55e" : "#f59e0b" }}
          />
          <p className="text-gray-400 text-xs font-heading font-bold uppercase tracking-widest mb-2">
            Your Visibility
          </p>
          <p className="font-heading font-extrabold text-gray-900 text-3xl mb-1">
            {firmInMapPack ? "In Map Pack" : "Not Found"}
          </p>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            {firmRating != null && (
              <span>
                {firmRating.toFixed(1)}
                <span className="text-yellow-400">&#9733;</span>
              </span>
            )}
            {firmReviewCount != null && (
              <span>{firmReviewCount} reviews</span>
            )}
            {firmRating == null && firmReviewCount == null && (
              <span className="text-gray-400 text-xs">No rating data found</span>
            )}
          </div>
        </div>

        {/* Biggest Gap */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="h-1 w-10 rounded-full mb-4" style={{ background: "#ef4444" }} />
          <p className="text-gray-400 text-xs font-heading font-bold uppercase tracking-widest mb-2">
            Biggest Gap
          </p>
          <p className="font-heading font-bold text-gray-900 text-lg leading-snug">
            {biggestGap}
          </p>
        </div>

        {/* AI Search Visibility card */}
        {hasAiResults ? (
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div
              className="h-1 w-10 rounded-full mb-4"
              style={{ background: aiFoundCount > 0 ? "#22c55e" : "#ef4444" }}
            />
            <p className="text-gray-400 text-xs font-heading font-bold uppercase tracking-widest mb-2">
              AI Search Visibility
            </p>
            <p className="font-heading font-extrabold text-gray-900 text-3xl mb-1">
              {aiFoundCount} of {aiSearchResults!.length}
            </p>
            <p className="text-gray-500 text-sm">AI-generated queries</p>
          </div>
        ) : (
          /* Firms Winning Now — only show as card if no AI results */
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="h-1 w-10 rounded-full mb-4" style={{ background: "#22c55e" }} />
            <p className="text-gray-400 text-xs font-heading font-bold uppercase tracking-widest mb-3">
              Firms Winning Now
            </p>
            <div className="space-y-2">
              {top3.map((comp) => (
                <div key={comp.name} className="flex items-center gap-2">
                  <span className="text-gray-900 text-sm font-semibold truncate">{comp.name}</span>
                  {comp.rating != null && (
                    <span className="text-gray-500 text-xs whitespace-nowrap">
                      {comp.rating.toFixed(1)}
                      <span className="text-yellow-400">&#9733;</span>
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Competitor Comparison Table */}
      <div className="mb-10">
        <h3 className="font-heading font-bold text-gray-900 text-lg mb-4">
          Competitor Comparison
        </h3>
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-5 py-3 font-heading font-bold text-gray-500 text-xs uppercase tracking-widest">
                  Firm
                </th>
                <th className="text-left px-5 py-3 font-heading font-bold text-gray-500 text-xs uppercase tracking-widest">
                  Rating
                </th>
                <th className="text-left px-5 py-3 font-heading font-bold text-gray-500 text-xs uppercase tracking-widest">
                  Reviews
                </th>
                <th className="text-left px-5 py-3 font-heading font-bold text-gray-500 text-xs uppercase tracking-widest">
                  Map Pack Position
                </th>
              </tr>
            </thead>
            <tbody>
              {topCompetitors.map((comp, i) => (
                <tr
                  key={comp.name}
                  className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-5 py-3 font-semibold text-gray-900">{comp.name}</td>
                  <td className="px-5 py-3 text-gray-600">
                    {comp.rating != null ? (
                      <>
                        {comp.rating.toFixed(1)}
                        <span className="text-yellow-400 ml-0.5">&#9733;</span>
                      </>
                    ) : (
                      <span className="text-gray-400">--</span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-gray-600">
                    {comp.reviewCount != null ? comp.reviewCount : <span className="text-gray-400">--</span>}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className="inline-flex items-center justify-center w-7 h-7 rounded-full text-white text-xs font-bold"
                      style={{ background: comp.position <= 3 ? "#22c55e" : "#6b7280" }}
                    >
                      {comp.position}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Keyword Highlights */}
      {keywordHighlights.length > 0 && (
        <div className="mb-10">
          <h3 className="font-heading font-bold text-gray-900 text-lg mb-4">
            Keyword Highlights
          </h3>
          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-5 py-3 font-heading font-bold text-gray-500 text-xs uppercase tracking-widest">
                    Keyword
                  </th>
                  {hasDualVolumes && (
                    <th className="text-left px-5 py-3 font-heading font-bold text-gray-500 text-xs uppercase tracking-widest">
                      Local Volume
                    </th>
                  )}
                  <th className="text-left px-5 py-3 font-heading font-bold text-gray-500 text-xs uppercase tracking-widest">
                    {hasDualVolumes ? "National Volume" : "Monthly Volume"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {keywordHighlights.map((kw, i) => {
                  const national = kw.nationalVolume ?? kw.volume ?? 0;
                  const local = kw.localVolume ?? 0;
                  return (
                    <tr
                      key={kw.keyword}
                      className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-5 py-3 text-gray-900 font-medium">
                        {kw.keyword}
                      </td>
                      {hasDualVolumes && (
                        <td className="px-5 py-3 font-heading font-bold" style={{ color: "#EE6C13" }}>
                          {local > 0 ? `${formatNumber(local)}/mo` : <span className="text-gray-400 font-normal">--</span>}
                        </td>
                      )}
                      <td className="px-5 py-3 font-heading font-bold text-gray-600">
                        {formatNumber(national)}/mo
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* AI Search Visibility Table */}
      {hasAiResults && (
        <div className="mb-10">
          <h3 className="font-heading font-bold text-gray-900 text-lg mb-4">
            AI Search Visibility
          </h3>
          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-5 py-3 font-heading font-bold text-gray-500 text-xs uppercase tracking-widest">
                    AI Search Query
                  </th>
                  <th className="text-left px-5 py-3 font-heading font-bold text-gray-500 text-xs uppercase tracking-widest">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {aiSearchResults!.map((result, i) => (
                  <tr
                    key={result.query}
                    className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-5 py-3 text-gray-900 font-medium">
                      {result.query}
                    </td>
                    <td className="px-5 py-3">
                      {result.found ? (
                        <span className="inline-flex items-center gap-1.5 text-green-600 font-semibold">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          Found
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-red-500 font-semibold">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                          Not Found
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CTA: Strategy Call Form or fallback */}
      {reportId ? (
        <TeaserContactForm
          reportId={reportId}
          defaultName={leadName}
          defaultEmail={leadEmail}
          defaultPhone={leadPhone}
        />
      ) : (
        <div
          className="rounded-xl p-6 border"
          style={{ background: "#FEF3EC", borderColor: "rgba(238,108,19,0.2)" }}
        >
          <div className="flex items-start gap-4">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white"
              style={{ background: "#EE6C13" }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </div>
            <div>
              <p className="font-heading font-bold text-gray-900 text-base mb-1">
                Full Report Coming Soon
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Your full report with detailed analysis and action plan will be ready within 24 hours.
                We&apos;ll email you as soon as it&apos;s available.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
