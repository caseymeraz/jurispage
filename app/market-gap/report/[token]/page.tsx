import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import MarketGapTeaser from "@/components/MarketGapTeaser";
import MarketGapReport from "@/components/MarketGapReport";

export const metadata: Metadata = {
  robots: "noindex, nofollow",
};

interface PageProps {
  params: Promise<{ token: string }>;
}

export default async function MarketGapReportPage({ params }: PageProps) {
  const { token } = await params;

  const report = await prisma.marketGapReport.findUnique({
    where: { accessToken: token },
    include: {
      lead: true,
      competitors: { orderBy: { mapPackPosition: "asc" } },
      keywords: { orderBy: { searchVolume: "desc" } },
    },
  });

  if (!report) {
    notFound();
  }

  /* ── Still pending - send to loading page ── */
  if (report.status === "pending") {
    redirect(`/market-gap/loading/${report.id}`);
  }

  /* ── Build teaser props ── */
  const methodology = report.searchVolumeMethodology as {
    keywords?: string[];
    localAvailable?: boolean;
    estimated?: boolean;
    estimationMethod?: string | null;
  } | null;
  const isEstimated = methodology?.estimated ?? false;
  const nationalTotal = report.totalSearchVolume ?? 0;
  const localTotal2 = report.localSearchVolume ?? null;
  // Compute display volume: local if available, estimated if not, fallback to national
  const displayVol = localTotal2 && localTotal2 > 0
    ? localTotal2
    : isEstimated
      ? Math.round(nationalTotal * 0.01)
      : nationalTotal;

  const teaserProps = {
    totalSearchVolume: nationalTotal,
    localTotalSearchVolume: localTotal2,
    localVolumeEstimated: isEstimated,
    displaySearchVolume: displayVol,
    topCompetitors: report.competitors.map((c) => ({
      name: c.name,
      rating: c.rating,
      reviewCount: c.reviewCount,
      position: c.mapPackPosition ?? 0,
      domain: c.domain ?? undefined,
    })),
    firmInMapPack: report.firmInMapPack ?? false,
    firmRating: report.firmRating,
    firmReviewCount: report.firmReviewCount,
    biggestGap: report.biggestGap ?? "Analysis pending",
    keywordHighlights: report.keywords
      .filter((k) => (k.searchVolume ?? 0) > 0 || (k.localSearchVolume ?? 0) > 0)
      .slice(0, 7)
      .map((k) => {
        const natVol = k.searchVolume ?? 0;
        const locVol = k.localSearchVolume ?? 0;
        const kwEstimated = locVol === 0 && natVol > 0 && isEstimated;
        return {
          keyword: k.keyword,
          volume: natVol,
          localVolume: locVol > 0 ? locVol : (kwEstimated ? Math.round(natVol * 0.01) : 0),
          nationalVolume: natVol,
          localEstimated: kwEstimated,
        };
      }),
    practiceArea: report.lead?.practiceArea ?? "Legal Services",
    city: report.lead?.city ?? "",
    state: report.lead?.state ?? "",
    aiSearchResults: report.aiSearchData
      ? (report.aiSearchData as { query: string; found: boolean; citedDomains: string[] }[])
      : undefined,
    searchVolumeMethodology: methodology ?? undefined,
    serpScreenshots: report.serpScreenshots
      ? (report.serpScreenshots as { keyword: string; desktopUrl: string; mobileUrl?: string }[])
      : undefined,
    pageSpeedData: report.pageSpeedData
      ? (report.pageSpeedData as {
          mobile: { score: number; fcp: number; lcp: number; cls: number; tbt: number };
          desktop: { score: number; fcp: number; lcp: number; cls: number; tbt: number };
        })
      : undefined,
    reportId: report.id,
    leadName: report.lead?.firmName ?? "",
    leadEmail: report.lead?.email ?? "",
    leadPhone: report.lead?.phone ?? "",
  };

  /* ── Teaser-only view ── */
  if (report.status === "teaser_ready") {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <MarketGapTeaser {...teaserProps} />
      </div>
    );
  }

  /* ── Full report view ── */
  if (report.status === "full_report_ready") {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <MarketGapReport
            teaser={teaserProps}
            visibilityScore={report.visibilityScore ?? 0}
            gapScore={report.gapScore ?? 0}
            opportunityScore={report.opportunityScore ?? 0}
            executiveSummary={report.executiveSummary}
            biggestGaps={
              report.biggestGaps
                ? (report.biggestGaps as string[])
                : null
            }
            fastestWins={
              report.fastestWins
                ? (report.fastestWins as string[])
                : null
            }
            ninetyDayPriorities={
              report.ninetyDayPriorities
                ? (report.ninetyDayPriorities as string[])
                : null
            }
            recommendedService={report.recommendedService}
            organicDominators={
              report.organicSerpData
                ? ((report.organicSerpData as Record<string, unknown>).dominators as string[] ?? [])
                : []
            }
            directoryObstacles={
              report.organicSerpData
                ? ((report.organicSerpData as Record<string, unknown>).obstacles as string[] ?? [])
                : []
            }
            intakeDrag={
              report.intakeDragEstimate
                ? (report.intakeDragEstimate as {
                    multiplier: number;
                    recoverableRange: string;
                    estimatedDrag: string;
                    urgencyLabel: string;
                  })
                : null
            }
            aiVisibility={
              report.aiVisibilityData
                ? (report.aiVisibilityData as {
                    mentions: number;
                    impressions: number;
                  })
                : null
            }
            authorityData={
              report.authorityData
                ? (report.authorityData as {
                    firm: {
                      referringDomains: number;
                      domainRating: number;
                    } | null;
                    topCompetitor: {
                      domain: string;
                      referringDomains: number;
                      domainRating: number;
                    } | null;
                  })
                : null
            }
            isNewFirm={report.lead.isNewFirm}
            hasSlowResponse={(() => {
              const intake = report.lead.intakeAnswers as Record<string, unknown> | null;
              const rt = intake?.responseTime as string | undefined;
              return rt === "1-3 hrs" || rt === "3+ hrs";
            })()}
          />
      </div>
    );
  }

  /* ── Fallback for unknown statuses ── */
  return (
    <div className="flex items-center justify-center px-6 py-24">
      <div className="text-center max-w-md">
        <h1 className="font-heading font-extrabold text-2xl text-gray-900 mb-3">
          Report Processing
        </h1>
        <p className="text-gray-600 text-base leading-relaxed mb-6">
          Your report is still being generated. Check your email. We&apos;ll
          send a link as soon as it&apos;s ready.
        </p>
        <a
          href="/"
          className="inline-block font-heading font-bold text-sm text-white px-8 py-3.5 rounded-[40px] no-underline transition-colors"
          style={{ background: "#EE6C13" }}
        >
          Back to Homepage
        </a>
      </div>
    </div>
  );
}
