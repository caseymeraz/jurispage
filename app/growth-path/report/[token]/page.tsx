import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import GrowthPathReport from "@/components/GrowthPathReport";

interface Props {
  params: Promise<{ token: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { token } = await params;
  const session = await prisma.growthPathSession.findUnique({
    where: { accessToken: token },
    include: { lead: true },
  });

  const firmName = session?.lead?.firmName || "Your Firm";

  return {
    title: `${firmName} Growth Path Report | JurisPage`,
    description: `Personalized growth path report for ${firmName}`,
    robots: "noindex, nofollow",
  };
}

export default async function GrowthPathReportPage({ params }: Props) {
  const { token } = await params;

  const session = await prisma.growthPathSession.findUnique({
    where: { accessToken: token },
    include: {
      lead: true,
      scans: true,
      score: true,
      recommendation: true,
      assets: { orderBy: { sortOrder: "asc" } },
      events: true,
    },
  });

  if (!session) return notFound();

  // If not yet ready, redirect to loading
  if (session.status === "intake" || session.status === "scanning" || session.status === "scoring") {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-6"
        style={{ background: "#1a1a1a" }}
      >
        <div className="max-w-md text-center">
          <h1 className="font-heading font-extrabold text-white text-2xl mb-3">
            Your report is still being built
          </h1>
          <p className="text-gray-400 text-base leading-relaxed mb-8">
            We&apos;re still scanning your market and building your
            recommendations. This usually takes about 60-90 seconds.
          </p>
          <a
            href={`/growth-path/loading/${session.id}`}
            className="inline-block font-heading font-bold text-sm text-white px-8 py-3.5 rounded-[40px] no-underline transition-colors"
            style={{ background: "#EE6C13" }}
          >
            View Progress
          </a>
        </div>
      </div>
    );
  }

  // Build scan results map
  const scanResults: Record<string, unknown> = {};
  for (const scan of session.scans) {
    if (scan.status === "complete" && scan.result) {
      scanResults[scan.scanType] = scan.result;
    }
  }

  // Serialize data for client component
  const reportData = {
    sessionId: session.id,
    firmName: session.lead.firmName || "Your Firm",
    email: session.lead.email,
    city: session.city || "",
    state: session.state || "",
    practiceArea: session.practiceArea || "Personal Injury",
    website: session.website || null,
    flowType: session.flowType,
    isNewFirm: session.flowType === "new_firm",
    accessToken: session.accessToken,

    // Scan results
    scanResults,

    // Scores
    scores: session.score
      ? {
          urgency: session.score.urgency,
          foundation: session.score.foundation,
          visibilityGap: session.score.visibilityGap,
          websiteClarity: session.score.websiteClarity,
          leadQuality: session.score.leadQuality,
          legacyFit: session.score.legacyFit,
          committeeScore: session.score.committeeScore,
        }
      : null,

    // Recommendation
    recommendation: session.recommendation
      ? {
          primaryPath: session.recommendation.primaryPath,
          secondaryPath: session.recommendation.secondaryPath,
          notYetPath: session.recommendation.notYetPath,
          brandRoute: session.recommendation.brandRoute,
          explanationShort: session.recommendation.explanationShort,
          explanationLong: session.recommendation.explanationLong,
          days1to30: session.recommendation.days1to30 as string[],
          days31to60: session.recommendation.days31to60 as string[],
          days61to90: session.recommendation.days61to90 as string[],
        }
      : null,

    // Assets
    assets: session.assets.map((a) => ({
      type: a.assetType,
      url: a.url,
      caption: a.caption,
    })),

    // Status
    status: session.status,
    reviewedBy: session.reviewedBy,
    overriddenPath: session.overriddenPath,
  };

  return (
    <div className="min-h-screen" style={{ background: "#111" }}>
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="https://jurispage.com" className="text-white font-heading font-bold text-lg">
            JurisPage
          </a>
          <span className="text-gray-500 text-sm">Growth Path Report</span>
        </div>
      </header>

      <GrowthPathReport data={reportData} />

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-gray-500 text-sm">
            This report was generated by JurisPage using public market data.
          </p>
        </div>
      </footer>
    </div>
  );
}
