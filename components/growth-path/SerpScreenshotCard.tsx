"use client";

import { useState } from "react";
import SourceConfidencePill from "./SourceConfidencePill";

interface ScreenshotItem {
  keyword: string;
  screenshotUrl: string | null;
  mobileScreenshotUrl?: string | null;
}

interface SerpScreenshotCardProps {
  /** New array format — one entry per keyword */
  screenshots?: ScreenshotItem[];
  /** Legacy single-screenshot props (backward compat) */
  screenshotUrl?: string | null;
  mobileScreenshotUrl?: string | null;
  keyword?: string;
  serpResults: {
    keyword: string;
    hasAds: boolean;
    hasMaps: boolean;
    hasAiOverview: boolean;
    firmPresent: boolean;
    firmPosition: number | null;
  }[];
}

function AnnotationBadge({
  label,
  variant,
}: {
  label: string;
  variant: "neutral" | "warning" | "success" | "danger";
}) {
  const styles: Record<string, { bg: string; color: string }> = {
    neutral: { bg: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" },
    warning: { bg: "rgba(245,158,11,0.15)", color: "#f59e0b" },
    success: { bg: "rgba(34,197,94,0.15)", color: "#22c55e" },
    danger: { bg: "rgba(239,68,68,0.15)", color: "#ef4444" },
  };

  const s = styles[variant];

  return (
    <span
      className="inline-flex items-center text-xs font-medium px-3 py-1.5 rounded-full"
      style={{ background: s.bg, color: s.color }}
    >
      {label}
    </span>
  );
}

function ScreenshotPanel({
  item,
  caption,
}: {
  item: ScreenshotItem;
  caption?: string;
}) {
  const [activeTab, setActiveTab] = useState<"desktop" | "mobile">("desktop");
  const hasMultipleTabs = item.screenshotUrl && item.mobileScreenshotUrl;
  const activeUrl =
    activeTab === "mobile" ? item.mobileScreenshotUrl : item.screenshotUrl;

  return (
    <div>
      {caption && (
        <p className="text-gray-400 text-xs font-heading font-bold uppercase tracking-widest mb-3">
          {caption}
        </p>
      )}

      {hasMultipleTabs && (
        <div className="flex gap-2 mb-3">
          {(["desktop", "mobile"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-xs font-medium px-4 py-2 rounded-full transition-colors ${
                activeTab === tab
                  ? "text-white"
                  : "text-gray-500 hover:text-gray-300"
              }`}
              style={
                activeTab === tab
                  ? { background: "rgba(238,108,19,0.2)", color: "#EE6C13" }
                  : {}
              }
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      )}

      {activeUrl ? (
        <div
          className={`rounded-xl overflow-hidden border border-gray-800 ${
            activeTab === "mobile" && hasMultipleTabs ? "max-w-sm mx-auto" : ""
          }`}
        >
          <img
            src={activeUrl}
            alt={`Google search results for "${item.keyword}" (${activeTab})`}
            className="w-full h-auto"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="rounded-xl border border-gray-800 bg-gray-900 flex items-center justify-center py-16">
          <p className="text-gray-600 text-sm">Screenshot not available</p>
        </div>
      )}
    </div>
  );
}

export default function SerpScreenshotCard({
  screenshots,
  screenshotUrl,
  mobileScreenshotUrl,
  keyword,
  serpResults,
}: SerpScreenshotCardProps) {
  // Normalize to array format (backward compat with legacy single-screenshot)
  const items: ScreenshotItem[] = screenshots && screenshots.length > 0
    ? screenshots
    : keyword
      ? [{ keyword, screenshotUrl: screenshotUrl ?? null, mobileScreenshotUrl }]
      : [];

  const primary = serpResults[0];

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: "#1a1a1a" }}>
      <div className="px-6 sm:px-8 py-8">
        {/* Header */}
        <div className="flex items-start justify-between flex-wrap gap-3 mb-6">
          <div>
            <h3 className="font-heading font-extrabold text-white text-xl mb-1">
              Search Results
            </h3>
            <p className="text-gray-400 text-sm">
              Here&apos;s exactly what potential clients see when they search
            </p>
          </div>
          <SourceConfidencePill label="Public market data" />
        </div>

        {/* Annotation badges */}
        {primary && (
          <div className="flex flex-wrap gap-2 mb-6">
            {primary.hasAds && (
              <AnnotationBadge label="Ads present" variant="warning" />
            )}
            {primary.hasMaps && (
              <AnnotationBadge label="Maps present" variant="neutral" />
            )}
            {primary.hasAiOverview && (
              <AnnotationBadge label="AI Overview" variant="neutral" />
            )}
            {primary.firmPresent && primary.firmPosition !== null ? (
              <AnnotationBadge
                label={`Your firm: position ${primary.firmPosition}`}
                variant="success"
              />
            ) : (
              <AnnotationBadge label="Your firm: not found" variant="danger" />
            )}
          </div>
        )}

        {/* Screenshots — dual layout when 2, single otherwise */}
        {items.length >= 2 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ScreenshotPanel
              item={items[0]}
              caption={`"${items[0].keyword}"`}
            />
            <ScreenshotPanel
              item={items[1]}
              caption={`"${items[1].keyword}" (localized)`}
            />
          </div>
        ) : items.length === 1 ? (
          <ScreenshotPanel item={items[0]} />
        ) : (
          <div className="rounded-xl border border-gray-800 bg-gray-900 flex items-center justify-center py-16">
            <p className="text-gray-600 text-sm">Screenshot not available</p>
          </div>
        )}

        {/* Additional SERP results */}
        {serpResults.length > 1 && (
          <div className="mt-6">
            <p className="text-gray-500 text-xs font-heading font-bold uppercase tracking-widest mb-3">
              Other keywords checked
            </p>
            <div className="space-y-2">
              {serpResults.slice(1).map((result, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0"
                >
                  <span className="text-gray-300 text-sm">{result.keyword}</span>
                  <div className="flex items-center gap-2">
                    {result.firmPresent && result.firmPosition !== null ? (
                      <AnnotationBadge
                        label={`#${result.firmPosition}`}
                        variant="success"
                      />
                    ) : (
                      <AnnotationBadge label="Not found" variant="danger" />
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
