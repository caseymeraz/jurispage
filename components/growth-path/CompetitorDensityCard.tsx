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
}: CompetitorDensityCardProps) {
  const top5 = mapsCompetitors.slice(0, 5);

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: "#1a1a1a" }}>
      <div className="px-6 sm:px-8 py-8">
        {/* Header */}
        <div className="flex items-start justify-between flex-wrap gap-3 mb-6">
          <h3 className="font-heading font-extrabold text-white text-xl">
            Competitor Density
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
              {top5.map((comp, i) => (
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
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
