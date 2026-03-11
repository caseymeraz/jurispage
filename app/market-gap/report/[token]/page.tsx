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
      competitors: { orderBy: { position: "asc" } },
      keywords: { orderBy: { volume: "desc" } },
    },
  });

  if (!report) {
    notFound();
  }

  /* ── Still pending — send to loading page ── */
  if (report.status === "pending") {
    redirect(`/market-gap/loading/${report.id}`);
  }

  /* ── Build teaser props ── */
  const teaserProps = {
    totalSearchVolume: report.totalSearchVolume ?? 0,
    topCompetitors: report.competitors.map((c: { name: string; rating: number | null; reviewCount: number | null; position: number }) => ({
      name: c.name,
      rating: c.rating,
      reviewCount: c.reviewCount,
      position: c.position,
    })),
    firmInMapPack: report.firmInMapPack ?? false,
    firmRating: report.firmRating,
    firmReviewCount: report.firmReviewCount,
    biggestGap: report.biggestGap ?? "Analysis pending",
    keywordHighlights: report.keywords.map((k: { keyword: string; volume: number }) => ({
      keyword: k.keyword,
      volume: k.volume,
    })),
    practiceArea: report.lead?.primaryPracticeArea ?? "Legal Services",
    city: report.lead?.targetCity ?? "",
    state: report.lead?.targetState ?? "",
  };

  /* ── Teaser-only view ── */
  if (report.status === "teaser_ready") {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <MarketGapTeaser {...teaserProps} />
        </div>
      </div>
    );
  }

  /* ── Full report view ── */
  if (report.status === "full_report_ready") {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto">
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
              report.organicDominators
                ? (report.organicDominators as string[])
                : []
            }
            directoryObstacles={
              report.directoryObstacles
                ? (report.directoryObstacles as string[])
                : []
            }
            intakeDrag={
              report.intakeDrag
                ? (report.intakeDrag as {
                    multiplier: number;
                    recoverableRange: string;
                    estimatedDrag: string;
                    urgencyLabel: string;
                  })
                : null
            }
            aiVisibility={
              report.aiVisibility
                ? (report.aiVisibility as {
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
            isNewFirm={report.lead?.isNewFirm ?? false}
            hasSlowResponse={
              report.lead?.avgResponseTime === "1-3 hrs" ||
              report.lead?.avgResponseTime === "3+ hrs"
            }
          />
        </div>
      </div>
    );
  }

  /* ── Fallback for unknown statuses ── */
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1 className="font-heading font-extrabold text-2xl text-gray-900 mb-3">
          Report Processing
        </h1>
        <p className="text-gray-600 text-base leading-relaxed mb-6">
          Your report is still being generated. Check your email — we&apos;ll
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
