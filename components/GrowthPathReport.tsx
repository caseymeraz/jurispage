"use client";

import { useState } from "react";
import TurnstileWidget from "@/components/TurnstileWidget";
import MarketOpportunityCard from "@/components/growth-path/MarketOpportunityCard";
import CompetitorDensityCard from "@/components/growth-path/CompetitorDensityCard";
import SerpScreenshotCard from "@/components/growth-path/SerpScreenshotCard";
import AiSearchVisibilityCard from "@/components/growth-path/AiSearchVisibilityCard";
import WebsiteFirstImpressionCard from "@/components/growth-path/WebsiteFirstImpressionCard";
import RecommendationHeroCard from "@/components/growth-path/RecommendationHeroCard";
import PlanTimeline from "@/components/growth-path/PlanTimeline";
import SourceConfidencePill from "@/components/growth-path/SourceConfidencePill";
import MarketAvailabilityNote from "@/components/growth-path/MarketAvailabilityNote";
import { getPathById } from "@/lib/growth-path/paths";
import type { VisionAnalysis, SerpAnalysisResult } from "@/lib/growth-path/types";

interface ReportData {
  sessionId: string;
  firmName: string;
  email: string;
  city: string;
  state: string;
  practiceArea: string;
  website: string | null;
  flowType: string;
  isNewFirm: boolean;
  accessToken: string;
  scanResults: Record<string, unknown>;
  scores: {
    urgency: number;
    foundation: number;
    visibilityGap: number;
    websiteClarity: number;
    leadQuality: number;
    legacyFit: number;
    committeeScore: number;
  } | null;
  recommendation: {
    primaryPath: string;
    secondaryPath: string | null;
    notYetPath: string | null;
    brandRoute: string;
    explanationShort: string | null;
    explanationLong: string | null;
    days1to30: string[];
    days31to60: string[];
    days61to90: string[];
  } | null;
  assets: { type: string; url: string; caption: string | null }[];
  status: string;
  reviewedBy: string | null;
  overriddenPath: string | null;
}

interface Props {
  data: ReportData;
}

export default function GrowthPathReport({ data }: Props) {
  const [strategySubmitted, setStrategySubmitted] = useState(false);
  const [strategyLoading, setStrategyLoading] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");

  const {
    scanResults,
    recommendation,
    scores,
    assets,
    city,
    state,
    practiceArea,
    firmName,
    accessToken,
  } = data;

  // Extract scan data
  const keywordData = scanResults.keyword_volume as {
    keywords: { keyword: string; volume: number; localVolume: number }[];
    totalVolume: number;
    totalLocalVolume: number;
  } | undefined;

  const serpData = scanResults.serp_analysis as SerpAnalysisResult[] | undefined;

  const serpScreenshot = scanResults.serp_screenshot as {
    screenshotUrl: string | null;
    mobileScreenshotUrl?: string | null;
    keyword: string;
  } | undefined;

  const mapsData = scanResults.maps_competition as {
    competitors: { name: string; rating: number | null; reviewCount: number | null; position: number; domain: string | null }[];
    totalFound: number;
  } | undefined;

  const competitorDensity = scanResults.competitor_density as {
    firmCount: number;
  } | undefined;

  const rawVision = scanResults.vision_analysis as VisionAnalysis | undefined;
  const visionData = rawVision && Array.isArray(rawVision.top_findings) ? rawVision : undefined;

  // Get path definition
  const primaryPath = recommendation
    ? getPathById(data.overriddenPath || recommendation.primaryPath)
    : null;
  const notYetPath = recommendation?.notYetPath
    ? getPathById(recommendation.notYetPath)
    : null;

  // Calendly URLs based on brand route
  const calendlyUrl =
    recommendation?.brandRoute === "juris_digital"
      ? "https://calendly.com/jurisdigital"
      : "https://calendly.com/jurispage";

  // Strategy request handler
  async function handleStrategyRequest() {
    setStrategyLoading(true);
    try {
      const res = await fetch("/api/growth-path/strategy-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: data.sessionId,
          name: firmName,
          email: data.email,
          turnstileToken,
        }),
      });
      if (res.ok) setStrategySubmitted(true);
    } catch {
      // Silent fail
    } finally {
      setStrategyLoading(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <TurnstileWidget onVerify={setTurnstileToken} />
      {/* Title */}
      <div className="mb-12">
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-white mb-3">
          {firmName} Growth Path Report
        </h1>
        <p className="text-gray-400 text-lg">
          {practiceArea} in {city}, {state}
        </p>
        <div className="flex gap-2 mt-4">
          <SourceConfidencePill label="Public market data" />
        </div>
      </div>

      {/* Section 1: Situation Summary */}
      {recommendation?.explanationLong && (
        <section className="mb-12">
          <h2 className="font-heading font-bold text-xl text-white mb-4">
            Your situation in plain English
          </h2>
          <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-6">
            <p className="text-gray-300 leading-relaxed">
              {recommendation.explanationLong}
            </p>
          </div>
        </section>
      )}

      {/* Fallback: No scan data available */}
      {!keywordData && !serpData && !mapsData && !competitorDensity && !visionData && assets.length === 0 && (
        <section className="mb-12">
          <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-6">
            <p className="text-gray-400 text-sm leading-relaxed">
              Some market scans were unavailable at the time this report was generated.
              Your recommended path is based on the information you provided during intake.
              Book a call with our team for a deeper analysis.
            </p>
          </div>
        </section>
      )}

      {/* Section 2: Market Opportunity */}
      {keywordData && (
        <section className="mb-12">
          <h2 className="font-heading font-bold text-xl text-white mb-2">
            What your market looks like
          </h2>
          <p className="text-gray-400 text-sm mb-4">
            Here&apos;s what potential clients in {city} are searching for — and where the opportunities are.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MarketOpportunityCard
              totalVolume={keywordData.totalVolume}
              localVolume={keywordData.totalLocalVolume}
              city={city}
              practiceArea={practiceArea}
              keywords={keywordData.keywords}
            />
            {(competitorDensity || mapsData) && (
              <CompetitorDensityCard
                firmCount={competitorDensity?.firmCount ?? mapsData?.totalFound ?? 0}
                mapsCompetitors={
                  mapsData?.competitors?.slice(0, 5).map((c) => ({
                    name: c.name,
                    rating: c.rating,
                    reviewCount: c.reviewCount,
                    position: c.position,
                  })) ?? []
                }
                city={city}
              />
            )}
          </div>
        </section>
      )}

      {/* Section 2.5: AI Search Visibility */}
      {serpData && serpData.some((r) => r.hasAiOverview) && (
        <section className="mb-12">
          <h2 className="font-heading font-bold text-xl text-white mb-4">
            Your visibility in AI-powered search
          </h2>
          <AiSearchVisibilityCard
            serpResults={serpData}
            firmDomain={data.website}
          />
        </section>
      )}

      {/* Section 3: What People See When They Search */}
      {(serpScreenshot || serpData) && (
        <section className="mb-12">
          <h2 className="font-heading font-bold text-xl text-white mb-2">
            What people see when they search
          </h2>
          <p className="text-gray-400 text-sm mb-4">
            This is what potential clients see when they search — this is what you&apos;re competing against.
          </p>
          <SerpScreenshotCard
            screenshotUrl={serpScreenshot?.screenshotUrl ?? null}
            mobileScreenshotUrl={serpScreenshot?.mobileScreenshotUrl ?? null}
            keyword={serpScreenshot?.keyword ?? `personal injury lawyer ${city}`}
            serpResults={serpData ?? []}
          />
        </section>
      )}

      {/* Section 4: Website First Impression */}
      {(assets.length > 0 || visionData) && (
        <section className="mb-12">
          <h2 className="font-heading font-bold text-xl text-white mb-4">
            What your website communicates
          </h2>
          <WebsiteFirstImpressionCard
            screenshots={assets.map((a) => ({
              url: a.url,
              type: a.type,
              caption: a.caption || "",
            }))}
            findings={visionData?.top_findings ?? []}
          />
        </section>
      )}

      {/* Section 5: Where Cases May Be Leaking */}
      {visionData && visionData.top_findings.length > 0 && (
        <section className="mb-12">
          <h2 className="font-heading font-bold text-xl text-white mb-4">
            Where cases may be leaking
          </h2>
          <div className="space-y-4">
            {visionData.top_findings.map((finding, i) => (
              <div
                key={i}
                className="bg-gray-900/50 rounded-xl border border-gray-800 p-6"
              >
                <h3 className="font-bold text-white mb-2">{finding.title}</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-300">
                    <span className="text-gray-500 font-medium">What we found: </span>
                    {finding.observation}
                  </p>
                  <p className="text-gray-300">
                    <span className="text-gray-500 font-medium">Why it matters: </span>
                    {finding.why_it_matters}
                  </p>
                  <p style={{ color: "#EE6C13" }}>
                    <span className="font-medium">What to do next: </span>
                    {finding.next_step}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Section 6: Recommended Path */}
      {primaryPath && recommendation && (
        <section className="mb-12">
          <h2 className="font-heading font-bold text-xl text-white mb-4">
            Recommended path now
          </h2>
          <RecommendationHeroCard
            pathName={primaryPath.name}
            explanation={recommendation.explanationShort || primaryPath.userExplanation}
            brandRoute={recommendation.brandRoute}
          />
        </section>
      )}

      {/* Section 7: 30/60/90 Day Plan */}
      {recommendation && (
        <section className="mb-12">
          <h2 className="font-heading font-bold text-xl text-white mb-4">
            What should happen next
          </h2>
          <PlanTimeline
            days1to30={recommendation.days1to30 ?? []}
            days31to60={recommendation.days31to60 ?? []}
            days61to90={recommendation.days61to90 ?? []}
          />
        </section>
      )}

      {/* Section 8: What Should Wait */}
      {notYetPath && (
        <section className="mb-12">
          <h2 className="font-heading font-bold text-xl text-white mb-4">
            What should wait
          </h2>
          <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-6">
            <h3 className="font-bold text-gray-400 mb-2">{notYetPath.name}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {notYetPath.userExplanation} This is a strong path for your firm, but it makes
              more sense after the recommended path is underway.
            </p>
          </div>
        </section>
      )}

      {/* Section 9: Source Confidence */}
      <section className="mb-12">
        <h2 className="font-heading font-bold text-xl text-white mb-4">
          What this report is based on
        </h2>
        <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-6">
          <div className="flex flex-wrap gap-3 mb-4">
            <SourceConfidencePill label="Public market data" />
            {data.website && <SourceConfidencePill label="Website analysis" />}
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            This report uses live Google search data, Google Maps rankings, and
            public website analysis. All data was pulled at the time of your
            report generation.
          </p>
        </div>
      </section>

      {/* Section 10: Share with Partners */}
      <section className="mb-12">
        <h2 className="font-heading font-bold text-xl text-white mb-4">
          Share with your partners
        </h2>
        <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-6">
          <p className="text-gray-300 text-sm mb-4">
            Need to share this with other decision-makers? Use the partner
            view link below -- it shows a condensed version with the key
            findings and recommended path.
          </p>
          <a
            href={`/growth-path/report/${accessToken}/partner`}
            className="text-sm font-medium underline"
            style={{ color: "#EE6C13" }}
          >
            View partner-friendly version
          </a>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mb-12">
        <div
          className="rounded-2xl p-8 sm:p-12 text-center"
          style={{ background: "linear-gradient(135deg, #1a1a2e, #16213e)" }}
        >
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-4">
            Let&apos;s review these findings together
          </h2>
          <p className="text-gray-300 text-base max-w-xl mx-auto mb-8">
            Book a call to walk through your report with our team and build a plan
            tailored to {city}. Or request a reviewed version with additional detail
            for your partners.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-heading font-bold text-sm text-white px-8 py-3.5 rounded-[40px] no-underline transition-colors"
              style={{ background: "#EE6C13" }}
            >
              Book a Call
            </a>

            {strategySubmitted ? (
              <span className="inline-block font-heading font-bold text-sm text-green-400 px-8 py-3.5 rounded-[40px] border border-green-400/30">
                Request submitted
              </span>
            ) : (
              <button
                onClick={handleStrategyRequest}
                disabled={strategyLoading}
                className="font-heading font-bold text-sm px-8 py-3.5 rounded-[40px] border border-gray-600 text-gray-300 transition-colors hover:border-gray-400 hover:text-white disabled:opacity-60"
              >
                {strategyLoading
                  ? "Submitting..."
                  : "Request Reviewed Version"}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Market Availability Note */}
      <MarketAvailabilityNote />
    </div>
  );
}
