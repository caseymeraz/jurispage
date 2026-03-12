"use client";

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

        {/* Big number */}
        <div className="mb-6">
          <p
            className="font-heading font-extrabold text-5xl sm:text-6xl leading-none"
            style={{ color: "#EE6C13" }}
          >
            {totalVolume.toLocaleString()}
          </p>
          <p className="text-gray-400 text-sm mt-2 leading-relaxed">
            monthly searches for {practiceArea.toLowerCase()} keywords in and around{" "}
            {city}
          </p>
        </div>

        {/* Local callout */}
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

        {/* Keyword list */}
        {keywords.length > 0 && (
          <div>
            <p className="text-gray-500 text-xs font-heading font-bold uppercase tracking-widest mb-3">
              Top keywords by volume
            </p>
            <div className="space-y-2">
              {keywords.map((kw, i) => (
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
      </div>
    </div>
  );
}
