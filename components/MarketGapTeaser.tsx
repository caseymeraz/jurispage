"use client";

import { useState } from "react";
import TeaserContactForm from "@/components/TeaserContactForm";
import CaseCalculator from "@/components/CaseCalculator";
import PageSpeedCard from "@/components/PageSpeedCard";

export interface MarketGapTeaserProps {
  totalSearchVolume: number;
  localTotalSearchVolume?: number | null;
  localVolumeEstimated?: boolean;
  displaySearchVolume?: number;
  topCompetitors: {
    name: string;
    rating: number | null;
    reviewCount: number | null;
    position: number;
    domain?: string;
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
    localEstimated?: boolean;
  }[];
  practiceArea: string;
  city: string;
  state: string;
  aiSearchResults?: { query: string; found: boolean; citedDomains: string[] }[];
  searchVolumeMethodology?: {
    keywords?: string[];
    localAvailable?: boolean;
    estimated?: boolean;
    estimationMethod?: string | null;
  };
  serpScreenshots?: { keyword: string; desktopUrl: string; mobileUrl?: string }[];
  pageSpeedData?: {
    mobile: { score: number; fcp: number; lcp: number; cls: number; tbt: number };
    desktop: { score: number; fcp: number; lcp: number; cls: number; tbt: number };
  };
  reportId?: string;
  leadName?: string;
  leadEmail?: string;
  leadPhone?: string;
}

function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

function getBiggestGapExplanation(gap: string, topCompetitors: MarketGapTeaserProps["topCompetitors"]): string {
  const lower = gap.toLowerCase();
  if (lower.includes("not appearing in local map pack") || lower.includes("not in map pack")) {
    return "The map pack gets ~42% of clicks. This is your biggest missed opportunity.";
  }
  if (lower.includes("review count")) {
    const topReviews = topCompetitors[0]?.reviewCount;
    if (topReviews != null) {
      return `Reviews are a top ranking factor. The #1 firm has ${topReviews} reviews.`;
    }
    return "Reviews are a top ranking factor. Your competitors have significantly more.";
  }
  if (lower.includes("rating below") || lower.includes("rating")) {
    const topRating = topCompetitors[0]?.rating;
    if (topRating != null) {
      return `Ratings influence click-through rate. Top firms average ${topRating.toFixed(1)}\u2605.`;
    }
    return "Ratings influence click-through rate. Top competitors are rated higher.";
  }
  if (lower.includes("authority") || lower.includes("content coverage")) {
    return "Your competitors have stronger local signals and more relevant content.";
  }
  return "Addressing this gap could significantly improve your visibility.";
}

/** Check if a competitor name contains practice area keywords */
function hasKeywordInName(name: string, practiceArea: string): boolean {
  const normalizedName = name.toLowerCase();
  const paTerms = practiceArea.toLowerCase().split(/\s+/);
  // Check if name contains the full practice area phrase or key terms
  if (normalizedName.includes(practiceArea.toLowerCase())) return true;
  // Check for common patterns like "injury lawyer", "injury attorneys"
  const keyTerms = paTerms.filter((t) => t.length > 3 && !["and", "the", "for"].includes(t));
  return keyTerms.length > 0 && keyTerms.every((term) => normalizedName.includes(term));
}

export default function MarketGapTeaser({
  totalSearchVolume,
  localTotalSearchVolume,
  localVolumeEstimated,
  displaySearchVolume,
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
  searchVolumeMethodology,
  serpScreenshots,
  pageSpeedData,
  reportId,
  leadName,
  leadEmail,
  leadPhone,
}: MarketGapTeaserProps) {
  const [methodologyOpen, setMethodologyOpen] = useState(false);

  const top3 = topCompetitors.slice(0, 3);
  const hasLocal = localTotalSearchVolume != null && localTotalSearchVolume > 0;
  const isEstimated = localVolumeEstimated ?? false;
  const hasAiResults = aiSearchResults && aiSearchResults.length > 0;
  const aiFoundCount = aiSearchResults?.filter((r) => r.found).length ?? 0;
  // Use displaySearchVolume if provided; fall back to local or national
  const localVolume = displaySearchVolume ?? (hasLocal ? localTotalSearchVolume! : totalSearchVolume);

  const hasDualVolumes = keywordHighlights.some(
    (kw) => kw.nationalVolume !== undefined
  );

  const firmDisplayName = leadName && leadName.trim() ? leadName.trim() : null;

  // Competitor analysis: review insights + keyword-in-name detection
  const topReviewCount = topCompetitors.reduce(
    (max, c) => Math.max(max, c.reviewCount ?? 0),
    0
  );
  const competitorsWithKeyword = topCompetitors.filter((c) =>
    hasKeywordInName(c.name, practiceArea)
  );

  return (
    <div>
      {/* Disclaimer banner */}
      <div className="rounded-lg bg-blue-50 border border-blue-100 px-4 py-3 mb-8">
        <p className="text-xs text-blue-700 leading-relaxed">
          This is an automated analysis powered by Google Ads and DataForSEO data.
          It sets the stage for how we can help your firm improve but is not a replacement for
          a comprehensive human audit. The average client we work with gains 5,000+ ranking
          keywords in the first 60 days.
        </p>
      </div>

      {/* Report header */}
      <div className="mb-8 pb-8 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-1.5 w-8 rounded-full" style={{ background: "#EE6C13" }} />
          <p className="text-gray-400 text-xs font-heading font-bold uppercase tracking-widest">
            Market Gap Analysis
          </p>
        </div>
        {firmDisplayName ? (
          <>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-gray-900 mb-2">
              Market Analysis for <span style={{ color: "#EE6C13" }}>{firmDisplayName}</span>
            </h2>
            <p className="text-gray-500 text-lg font-heading">
              {practiceArea} &middot; {city}, {state}
            </p>
          </>
        ) : (
          <>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-gray-900 mb-2">
              {practiceArea}
            </h2>
            <p className="text-gray-500 text-lg font-heading">
              {city}, {state}
            </p>
          </>
        )}
      </div>

      {/* Executive Summary */}
      <div
        className="rounded-xl p-6 mb-10 border"
        style={{ background: "#F8FAFC", borderColor: "#E2E8F0" }}
      >
        <p className="text-gray-800 text-base leading-relaxed">
          We analyzed the <strong>{practiceArea.toLowerCase()}</strong> market in{" "}
          <strong>{city}</strong> and found{" "}
          <strong>
            {isEstimated ? "~" : ""}
            {formatNumber(localVolume)} searches per month
          </strong>
          {hasLocal && !isEstimated ? " locally" : ""}
          {isEstimated ? " (estimated for your metro area)" : ""},{" "}
          <strong>{topCompetitors.length} competing firms</strong> in Google Maps
          {hasAiResults && (
            <>
              , and{" "}
              <strong>
                {aiFoundCount > 0
                  ? `your firm cited in ${aiFoundCount} of ${aiSearchResults!.length} AI queries`
                  : "no AI search visibility"}
              </strong>
            </>
          )}
          .{" "}
          {firmInMapPack
            ? "Your firm appears in Google\u2019s local map pack, but there\u2019s room to strengthen your position against top competitors."
            : `Your firm is not currently appearing in Google\u2019s local map pack \u2014 the top 3 results that capture the majority of clicks when someone searches for a ${practiceArea.toLowerCase()} lawyer in ${city}.`}
        </p>
      </div>

      {/* Snapshot cards - 2x2 grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {/* Monthly Market Demand */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="h-1 w-10 rounded-full mb-4" style={{ background: "#EE6C13" }} />
          <p className="text-gray-400 text-xs font-heading font-bold uppercase tracking-widest mb-2">
            {hasLocal && !isEstimated ? "Monthly Local Demand" : "Monthly Market Demand"}
          </p>
          <p className="font-heading font-extrabold text-gray-900 text-3xl">
            {isEstimated ? "~" : ""}
            {formatNumber(localVolume)}
            <span className="text-gray-400 text-base font-bold">/mo</span>
          </p>
          {isEstimated && (
            <span className="inline-block mt-1 text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
              Estimated
            </span>
          )}
          {(hasLocal || isEstimated) && (
            <p className="text-gray-500 text-sm mt-1">
              {formatNumber(totalSearchVolume)}/mo nationally
            </p>
          )}
          <p className="text-gray-400 text-xs mt-2">
            People searching for {practiceArea.toLowerCase()} help in {city} every month
          </p>
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
          <p className="text-gray-400 text-xs mt-2">
            {firmInMapPack
              ? "You\u2019re visible, but there\u2019s room to improve your position"
              : "Your firm isn\u2019t showing up when potential clients search"}
          </p>
        </div>

        {/* Biggest Gap */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="h-1 w-10 rounded-full mb-4" style={{ background: "#ef4444" }} />
          <p className="text-gray-400 text-xs font-heading font-bold uppercase tracking-widest mb-2">
            Biggest Gap
          </p>
          <p className="font-heading font-bold text-gray-900 text-lg leading-snug mb-2">
            {biggestGap}
          </p>
          <p className="text-gray-400 text-xs">
            {getBiggestGapExplanation(biggestGap, topCompetitors)}
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
            <p className="text-gray-400 text-xs mt-2">
              AI tools like ChatGPT and Perplexity are becoming how people find lawyers
            </p>
          </div>
        ) : (
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

      {/* SERP Screenshots */}
      {serpScreenshots && serpScreenshots.length > 0 && (
        <div className="mb-10">
          <h3 className="font-heading font-bold text-gray-900 text-lg mb-2">
            What People See When They Search
          </h3>
          <p className="text-gray-500 text-sm mb-4 leading-relaxed">
            These are actual Google search results for your market. This is what potential
            clients see when they look for a {practiceArea.toLowerCase()} lawyer.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {serpScreenshots.map((ss, i) => (
              <div
                key={ss.keyword}
                className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden"
              >
                <div className="aspect-[4/3] relative bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={ss.desktopUrl}
                    alt={`Google search results for "${ss.keyword}"`}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
                <div className="px-4 py-3">
                  <p className="text-sm font-medium text-gray-900 mb-0.5">
                    &ldquo;{ss.keyword}&rdquo;
                  </p>
                  <p className="text-xs text-gray-500">
                    {i === 0
                      ? "This is what shows up when someone searches with your city name."
                      : "Google still shows local results based on where the searcher is located \u2014 this is what they see."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Competitor Comparison Table */}
      <div className="mb-10">
        <h3 className="font-heading font-bold text-gray-900 text-lg mb-2">
          Competitor Comparison
        </h3>
        <p className="text-gray-500 text-sm mb-4 leading-relaxed">
          These are the firms currently dominating Google Maps for{" "}
          {practiceArea.toLowerCase()} in {city}. Position matters &mdash; the top 3
          results get the vast majority of calls.
        </p>
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
              {topCompetitors.map((comp, i) => {
                const kwInName = hasKeywordInName(comp.name, practiceArea);
                return (
                  <tr
                    key={comp.name}
                    className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-5 py-3 font-semibold text-gray-900">
                      {comp.name}
                      {kwInName && (
                        <span
                          className="ml-2 inline-flex items-center text-xs font-medium px-1.5 py-0.5 rounded-full"
                          style={{ background: "#fef3c7", color: "#92400e" }}
                          title="This firm uses practice area keywords in their business name"
                        >
                          KW
                        </span>
                      )}
                    </td>
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
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Competitor insights below table */}
        <div className="mt-3 px-1 space-y-2">
          {!firmInMapPack ? (
            <p className="text-gray-500 text-sm italic">
              Your firm didn&apos;t appear in this analysis. Getting into the map pack should be priority #1.
            </p>
          ) : (
            <p className="text-gray-500 text-sm italic">
              You&apos;re in the pack, but positions 1&ndash;3 get significantly more visibility.
            </p>
          )}

          {/* Review count context */}
          {topReviewCount > 0 && (
            <p className="text-gray-500 text-sm">
              The top-ranking firm has <strong>{topReviewCount} reviews</strong> &mdash; reviews
              are one of the top local ranking factors. A strong review generation strategy is
              essential for competing in this market.
            </p>
          )}

          {/* Keyword-in-name note */}
          {competitorsWithKeyword.length > 0 && (
            <div className="rounded-lg bg-amber-50 border border-amber-100 px-4 py-3 mt-2">
              <p className="text-xs text-amber-800 leading-relaxed">
                <strong>Note:</strong> Some firms use practice area keywords in their Google Business
                Profile name (e.g., &ldquo;City + {practiceArea} + Lawyers&rdquo;). This can boost
                local rankings but may violate Google&apos;s naming guidelines. Worth discussing
                with your SEO expert.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Keyword Highlights */}
      {keywordHighlights.length > 0 && (
        <div className="mb-10">
          <h3 className="font-heading font-bold text-gray-900 text-lg mb-2">
            Keyword Highlights
          </h3>
          <p className="text-gray-500 text-sm mb-4 leading-relaxed">
            These are the exact terms people in {city} type into Google when they need a{" "}
            {practiceArea.toLowerCase()} lawyer. Each search represents a potential client.
          </p>
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
                  const kwEstimated = kw.localEstimated ?? false;
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
                          {local > 0 ? (
                            <>
                              {kwEstimated ? "~" : ""}
                              {formatNumber(local)}/mo
                              {kwEstimated && (
                                <span className="ml-1 text-xs font-normal text-amber-500">est.</span>
                              )}
                            </>
                          ) : (
                            <span className="text-gray-400 font-normal">--</span>
                          )}
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

          {/* How We Calculated This - collapsible */}
          <div className="mt-3">
            <button
              onClick={() => setMethodologyOpen(!methodologyOpen)}
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors"
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
              How We Calculated This
            </button>
            {methodologyOpen && (
              <div className="mt-2 rounded-lg bg-gray-50 border border-gray-100 px-4 py-3">
                <p className="text-xs text-gray-600 leading-relaxed mb-2">
                  We queried Google Ads data for{" "}
                  <strong>{searchVolumeMethodology?.keywords?.length ?? keywordHighlights.length}</strong>{" "}
                  keyword variations related to {practiceArea.toLowerCase()} in {city}.
                  {hasLocal && !isEstimated
                    ? ` Local volume reflects searches from people in or near ${city}.`
                    : ""}
                </p>
                {isEstimated && (
                  <p className="text-xs text-amber-600 leading-relaxed mb-2">
                    Local data was limited for this market. These estimates are based on
                    national search patterns (approximately 1% of national volume as a
                    metro-level estimate).
                  </p>
                )}
                {searchVolumeMethodology?.keywords && searchVolumeMethodology.keywords.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 font-medium mb-1">Keywords analyzed:</p>
                    <div className="flex flex-wrap gap-1">
                      {searchVolumeMethodology.keywords.slice(0, 10).map((kw) => (
                        <span
                          key={kw}
                          className="text-xs bg-white border border-gray-200 rounded px-1.5 py-0.5 text-gray-600"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Case Calculator */}
      <div className="mb-10">
        <CaseCalculator
          monthlySearchVolume={localVolume}
          practiceArea={practiceArea}
          city={city}
        />
      </div>

      {/* AI Search Visibility Table */}
      {hasAiResults && (
        <div className="mb-10">
          <h3 className="font-heading font-bold text-gray-900 text-lg mb-2">
            AI Search Visibility
          </h3>
          <p className="text-gray-500 text-sm mb-4 leading-relaxed">
            More people are using AI tools like ChatGPT, Perplexity, and Google&apos;s AI Overview
            to find lawyers. We checked whether your firm appears in these AI-generated results.
          </p>
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
                  <th className="text-left px-5 py-3 font-heading font-bold text-gray-500 text-xs uppercase tracking-widest">
                    Firms Cited Instead
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
                    <td className="px-5 py-3 text-gray-400 text-xs">
                      {!result.found && result.citedDomains && result.citedDomains.length > 0
                        ? result.citedDomains.slice(0, 3).join(", ")
                        : result.found
                          ? <span className="text-green-600">&mdash;</span>
                          : <span>No data</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* AI Takeaway */}
          <div className="mt-3 px-1">
            {aiFoundCount === 0 ? (
              <p className="text-gray-500 text-sm italic">
                Your firm wasn&apos;t cited in any AI search results. As AI search grows, this is an
                emerging opportunity to get ahead of competitors.
              </p>
            ) : (
              <p className="text-gray-500 text-sm italic">
                Your firm appeared in {aiFoundCount} out of {aiSearchResults!.length} queries &mdash;
                a good start, but there&apos;s room to improve AI visibility.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Page Speed Card */}
      {pageSpeedData && (
        <div className="mb-10">
          <PageSpeedCard mobile={pageSpeedData.mobile} desktop={pageSpeedData.desktop} />
        </div>
      )}

      {/* CTA: Strategy Call Form or fallback */}
      {reportId ? (
        <div className="mb-4">
          <h3 className="font-heading font-bold text-gray-900 text-xl mb-2">
            Ready to Close the Gap?
          </h3>
          <p className="text-gray-500 text-sm mb-6 leading-relaxed">
            {firmInMapPack
              ? `You\u2019re visible but leaving opportunity on the table. Let\u2019s build a plan to dominate ${practiceArea.toLowerCase()} in ${city}.`
              : `Your ${city} ${practiceArea.toLowerCase()} market has ${formatNumber(localVolume)} searches/mo and you\u2019re not showing up. Let\u2019s change that.`}
          </p>
          <TeaserContactForm
            reportId={reportId}
            defaultName={leadName}
            defaultEmail={leadEmail}
            defaultPhone={leadPhone}
          />
        </div>
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
