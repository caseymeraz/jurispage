"use client";

import SourceConfidencePill from "./SourceConfidencePill";

interface CompetitorDensityCardProps {
  firmCount: number;
  mapsCompetitors: {
    name: string;
    rating: number | null;
    reviewCount: number | null;
    position: number;
  }[];
  city: string;
  practiceArea?: string;
}

const PRACTICE_AREA_TERMS: Record<string, string[]> = {
  "Personal Injury": [
    "personal injury", "injury", "accident", "car accident", "truck accident",
    "wrongful death", "slip and fall", "motorcycle accident",
  ],
  default: ["law", "legal", "attorney", "lawyer"],
};

function hasKeywordInName(name: string, practiceArea: string): boolean {
  const lower = name.toLowerCase();
  const terms = PRACTICE_AREA_TERMS[practiceArea] ?? PRACTICE_AREA_TERMS.default;
  return terms.some((term) => lower.includes(term));
}

function StarRating({ rating }: { rating: number | null }) {
  if (rating === null) return <span className="text-gray-600 text-xs">No rating</span>;

  return (
    <span className="flex items-center gap-1">
      <span className="text-yellow-400 text-xs">
        {"★".repeat(Math.round(rating))}
        {"☆".repeat(5 - Math.round(rating))}
      </span>
      <span className="text-gray-400 text-xs tabular-nums">{rating.toFixed(1)}</span>
    </span>
  );
}

export default function CompetitorDensityCard({
  firmCount,
  mapsCompetitors,
  city,
  practiceArea = "Personal Injury",
}: CompetitorDensityCardProps) {
  const top5 = mapsCompetitors.slice(0, 5);

  // Find top review count for insight
  const topReviewComp = top5.reduce<{ name: string; reviewCount: number } | null>(
    (best, c) =>
      c.reviewCount !== null && (best === null || c.reviewCount > best.reviewCount)
        ? { name: c.name, reviewCount: c.reviewCount }
        : best,
    null
  );

  // Check for keyword-in-name across competitors
  const keywordInNameComps = top5.filter((c) => hasKeywordInName(c.name, practiceArea));
  const anyKeywordInName = keywordInNameComps.length > 0;

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: "#1a1a1a" }}>
      <div className="px-6 sm:px-8 py-8">
        {/* Header */}
        <div className="flex items-start justify-between flex-wrap gap-3 mb-6">
          <h3 className="font-heading font-extrabold text-white text-xl">
            Your Competitive Landscape
          </h3>
          <SourceConfidencePill label="Public market data" />
        </div>

        {/* Main statement */}
        <div className="mb-6">
          <p className="text-gray-300 text-base leading-relaxed">
            We found at least{" "}
            <span
              className="font-heading font-extrabold text-3xl"
              style={{ color: "#EE6C13" }}
            >
              {firmCount}
            </span>{" "}
            firms competing for the same searches in {city}.
          </p>
        </div>

        {/* Maps competitors */}
        {top5.length > 0 && (
          <div>
            <p className="text-gray-500 text-xs font-heading font-bold uppercase tracking-widest mb-3">
              Top Maps competitors
            </p>
            <div className="space-y-1">
              {top5.map((comp, i) => {
                const kwInName = hasKeywordInName(comp.name, practiceArea);
                return (
                  <div
                    key={i}
                    className="flex items-center justify-between py-2.5 border-b border-gray-800 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{
                          background: "rgba(238,108,19,0.15)",
                          color: "#EE6C13",
                        }}
                      >
                        {comp.position}
                      </span>
                      <span className="text-gray-200 text-sm">{comp.name}</span>
                      {kwInName && (
                        <span
                          className="text-xs font-bold px-1.5 py-0.5 rounded"
                          style={{ background: "rgba(245,158,11,0.15)", color: "#f59e0b" }}
                          title="Practice area keyword detected in business name"
                        >
                          KW
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <StarRating rating={comp.rating} />
                      {comp.reviewCount !== null && (
                        <span className="text-gray-500 text-xs tabular-nums">
                          ({comp.reviewCount})
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Review insight */}
            {topReviewComp && topReviewComp.reviewCount > 0 && (
              <div
                className="rounded-xl px-4 py-3 mt-4"
                style={{ background: "rgba(238,108,19,0.08)" }}
              >
                <p className="text-gray-400 text-sm leading-relaxed">
                  The top-reviewed firm has{" "}
                  <span className="text-white font-medium">
                    {topReviewComp.reviewCount} reviews
                  </span>
                  . Google reviews are one of the strongest local ranking signals — firms with
                  more genuine reviews consistently outrank those without.
                </p>
              </div>
            )}

            {/* Keyword-in-name note */}
            {anyKeywordInName && (
              <div
                className="rounded-xl px-4 py-3 mt-3"
                style={{ background: "rgba(245,158,11,0.06)" }}
              >
                <p className="text-gray-400 text-sm leading-relaxed">
                  Some firms use practice area keywords in their Google Business Profile name
                  (marked with{" "}
                  <span
                    className="text-xs font-bold px-1.5 py-0.5 rounded"
                    style={{ background: "rgba(245,158,11,0.15)", color: "#f59e0b" }}
                  >
                    KW
                  </span>
                  ). This can boost local rankings but may violate{" "}
                  <span className="text-white">Google&apos;s Business Profile naming guidelines</span>,
                  which require the name to match the real-world business name. Worth discussing
                  with your SEO expert.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
