"use client";

export interface MarketGapTeaserProps {
  totalSearchVolume: number;
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
  keywordHighlights: { keyword: string; volume: number }[];
  practiceArea: string;
  city: string;
  state: string;
}

function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

export default function MarketGapTeaser({
  totalSearchVolume,
  topCompetitors,
  firmInMapPack,
  firmRating,
  firmReviewCount,
  biggestGap,
  keywordHighlights,
  practiceArea,
  city,
  state,
}: MarketGapTeaserProps) {
  const top3 = topCompetitors.slice(0, 3);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <p className="text-gray-400 text-xs font-heading font-bold uppercase tracking-widest mb-2">
          Market Gap Snapshot
        </p>
        <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-gray-900">
          {practiceArea} in {city}, {state}
        </h2>
      </div>

      {/* 4 Snapshot cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {/* Monthly Market Demand */}
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-6">
          <div className="h-1 w-10 rounded-full mb-4" style={{ background: "#EE6C13" }} />
          <p className="text-gray-400 text-xs font-heading font-bold uppercase tracking-widest mb-2">
            Monthly Market Demand
          </p>
          <p className="font-heading font-extrabold text-gray-900 text-2xl">
            {formatNumber(totalSearchVolume)}
            <span className="text-gray-400 text-base font-bold">/mo</span>
          </p>
        </div>

        {/* Firms Winning Now */}
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-6">
          <div className="h-1 w-10 rounded-full mb-4" style={{ background: "#22c55e" }} />
          <p className="text-gray-400 text-xs font-heading font-bold uppercase tracking-widest mb-3">
            Firms Winning Now
          </p>
          <div className="space-y-2">
            {top3.map((comp) => (
              <div key={comp.name} className="flex items-center gap-2">
                <span className="text-gray-900 text-sm font-semibold">{comp.name}</span>
                {comp.rating != null && (
                  <span className="text-gray-500 text-xs">
                    {comp.rating.toFixed(1)}
                    <span className="text-yellow-400">&#9733;</span>
                  </span>
                )}
                {comp.reviewCount != null && (
                  <span className="text-gray-400 text-xs">
                    &middot; {comp.reviewCount} reviews
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Your Visibility */}
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-6">
          <div
            className="h-1 w-10 rounded-full mb-4"
            style={{ background: firmInMapPack ? "#22c55e" : "#f59e0b" }}
          />
          <p className="text-gray-400 text-xs font-heading font-bold uppercase tracking-widest mb-2">
            Your Visibility
          </p>
          <p className="font-heading font-extrabold text-gray-900 text-2xl mb-1">
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
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-6">
          <div className="h-1 w-10 rounded-full mb-4" style={{ background: "#ef4444" }} />
          <p className="text-gray-400 text-xs font-heading font-bold uppercase tracking-widest mb-2">
            Biggest Gap
          </p>
          <p className="font-heading font-bold text-gray-900 text-lg leading-snug">
            {biggestGap}
          </p>
        </div>
      </div>

      {/* Competitor Comparison Table */}
      <div className="mb-8">
        <h3 className="font-heading font-bold text-gray-900 text-lg mb-4">
          Competitor Comparison
        </h3>
        <div className="overflow-x-auto rounded-xl border border-gray-100">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
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
        <div className="mb-8">
          <h3 className="font-heading font-bold text-gray-900 text-lg mb-4">
            Keyword Highlights
          </h3>
          <div className="overflow-x-auto rounded-xl border border-gray-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-5 py-3 font-heading font-bold text-gray-500 text-xs uppercase tracking-widest">
                    Keyword
                  </th>
                  <th className="text-left px-5 py-3 font-heading font-bold text-gray-500 text-xs uppercase tracking-widest">
                    Monthly Volume
                  </th>
                </tr>
              </thead>
              <tbody>
                {keywordHighlights.map((kw, i) => (
                  <tr
                    key={kw.keyword}
                    className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-5 py-3 text-gray-900 font-medium">{kw.keyword}</td>
                    <td className="px-5 py-3 font-heading font-bold" style={{ color: "#EE6C13" }}>
                      {formatNumber(kw.volume)}/mo
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CTA Info Box */}
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
    </div>
  );
}
