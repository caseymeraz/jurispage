"use client";

import SourceConfidencePill from "./SourceConfidencePill";

interface AiSearchVisibilityCardProps {
  serpResults: {
    keyword: string;
    hasAiOverview: boolean;
    topResults: { position: number; domain: string; title: string }[];
  }[];
  firmDomain?: string | null;
}

export default function AiSearchVisibilityCard({
  serpResults,
  firmDomain,
}: AiSearchVisibilityCardProps) {
  const keywordsWithAi = serpResults.filter((r) => r.hasAiOverview);
  const aiCount = keywordsWithAi.length;
  const totalChecked = serpResults.length;

  // Check if the firm appears in any top results for AI Overview keywords
  const normalizedDomain = firmDomain?.toLowerCase().replace(/^www\./, "");
  const firmInAiKeywords = normalizedDomain
    ? keywordsWithAi.filter((r) =>
        r.topResults.some((tr) =>
          tr.domain.toLowerCase().replace(/^www\./, "").includes(normalizedDomain)
        )
      )
    : [];

  // Collect unique competitor domains that appear across AI Overview keywords
  const competitorDomains = new Map<string, number>();
  for (const result of keywordsWithAi) {
    for (const tr of result.topResults.slice(0, 5)) {
      const d = tr.domain.toLowerCase().replace(/^www\./, "");
      if (normalizedDomain && d.includes(normalizedDomain)) continue;
      competitorDomains.set(d, (competitorDomains.get(d) || 0) + 1);
    }
  }
  const topCompetitors = [...competitorDomains.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: "#1a1a1a" }}>
      <div className="px-6 sm:px-8 py-8">
        {/* Header */}
        <div className="flex items-start justify-between flex-wrap gap-3 mb-6">
          <div>
            <h3 className="font-heading font-extrabold text-white text-xl mb-1">
              AI Search Visibility
            </h3>
            <p className="text-gray-400 text-sm">
              AI-powered search is growing rapidly. Here&apos;s how visible your
              market is in this new channel.
            </p>
          </div>
          <SourceConfidencePill label="Public market data" />
        </div>

        {/* AI Overview count */}
        <div className="mb-6">
          <p className="text-gray-300 text-base leading-relaxed">
            Of the{" "}
            <span className="text-white font-medium">{totalChecked} keywords</span>{" "}
            we checked,{" "}
            <span
              className="font-heading font-extrabold text-3xl"
              style={{ color: "#EE6C13" }}
            >
              {aiCount}
            </span>{" "}
            trigger an AI Overview in Google.
          </p>
        </div>

        {/* Firm visibility */}
        {normalizedDomain && (
          <div
            className="rounded-xl px-5 py-4 mb-6"
            style={{
              background:
                firmInAiKeywords.length > 0
                  ? "rgba(34,197,94,0.1)"
                  : "rgba(239,68,68,0.1)",
            }}
          >
            <p className="text-white text-sm">
              {firmInAiKeywords.length > 0 ? (
                <>
                  Your firm appears in search results for{" "}
                  <span className="font-bold" style={{ color: "#22c55e" }}>
                    {firmInAiKeywords.length}
                  </span>{" "}
                  of those keywords.
                </>
              ) : (
                <>
                  Your firm was{" "}
                  <span className="font-bold" style={{ color: "#ef4444" }}>
                    not found
                  </span>{" "}
                  in results for any AI Overview keywords. This is an opportunity
                  to get ahead of competitors.
                </>
              )}
            </p>
          </div>
        )}

        {/* Keywords triggering AI Overviews */}
        {keywordsWithAi.length > 0 && (
          <div className="mb-6">
            <p className="text-gray-500 text-xs font-heading font-bold uppercase tracking-widest mb-3">
              Keywords with AI Overviews
            </p>
            <div className="space-y-2">
              {keywordsWithAi.map((result, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0"
                >
                  <span className="text-gray-300 text-sm">{result.keyword}</span>
                  <span
                    className="inline-flex items-center text-xs font-medium px-3 py-1.5 rounded-full"
                    style={{ background: "rgba(238,108,19,0.15)", color: "#EE6C13" }}
                  >
                    AI Overview
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Competitor presence */}
        {topCompetitors.length > 0 && (
          <div className="mb-6">
            <p className="text-gray-500 text-xs font-heading font-bold uppercase tracking-widest mb-3">
              Competitors visible in AI results
            </p>
            <div className="space-y-2">
              {topCompetitors.map(([domain, count], i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0"
                >
                  <span className="text-gray-300 text-sm">{domain}</span>
                  <span className="text-gray-500 text-xs">
                    {count} keyword{count > 1 ? "s" : ""}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA note */}
        <div
          className="rounded-xl px-5 py-4"
          style={{ background: "rgba(238,108,19,0.08)" }}
        >
          <p className="text-gray-400 text-sm leading-relaxed">
            AI search citations are becoming a key source of referrals. JurisPage
            helps firms build the content and authority signals needed to appear in
            AI-generated answers.
          </p>
        </div>
      </div>
    </div>
  );
}
