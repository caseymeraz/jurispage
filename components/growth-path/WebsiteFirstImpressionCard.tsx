"use client";

import SourceConfidencePill from "./SourceConfidencePill";

interface WebsiteFirstImpressionCardProps {
  screenshots: { url: string; type: string; caption: string }[];
  findings: {
    title: string;
    observation: string;
    why_it_matters: string;
    next_step: string;
  }[];
}

export default function WebsiteFirstImpressionCard({
  screenshots,
  findings,
}: WebsiteFirstImpressionCardProps) {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: "#1a1a1a" }}>
      <div className="px-6 sm:px-8 py-8">
        {/* Header */}
        <div className="flex items-start justify-between flex-wrap gap-3 mb-6">
          <h3 className="font-heading font-extrabold text-white text-xl">
            Website First Impression
          </h3>
          <SourceConfidencePill label="Public market data" />
        </div>

        {/* Screenshots grid */}
        {screenshots.length > 0 && (
          <div
            className={`grid gap-4 mb-8 ${
              screenshots.length === 1
                ? "grid-cols-1"
                : "grid-cols-1 sm:grid-cols-2"
            }`}
          >
            {screenshots.map((screenshot, i) => (
              <div key={i}>
                <div className="rounded-xl overflow-hidden border border-gray-800">
                  <img
                    src={screenshot.url}
                    alt={screenshot.caption || `${screenshot.type} screenshot`}
                    className="w-full h-auto"
                    loading="lazy"
                  />
                </div>
                {screenshot.caption && (
                  <p className="text-gray-500 text-xs mt-2">{screenshot.caption}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Findings */}
        {findings.length > 0 && (
          <div className="space-y-6">
            {findings.map((finding, i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-800 p-5"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                <h4 className="font-heading font-bold text-white text-base mb-4">
                  {finding.title}
                </h4>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-heading font-bold uppercase tracking-widest text-gray-500 mb-1">
                      What we found
                    </p>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {finding.observation}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-heading font-bold uppercase tracking-widest text-gray-500 mb-1">
                      Why it matters
                    </p>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {finding.why_it_matters}
                    </p>
                  </div>

                  <div>
                    <p
                      className="text-xs font-heading font-bold uppercase tracking-widest mb-1"
                      style={{ color: "#EE6C13" }}
                    >
                      What to do next
                    </p>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {finding.next_step}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
