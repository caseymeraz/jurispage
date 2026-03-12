import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { getPathById } from "@/lib/growth-path/paths";
import { MARKET_AVAILABILITY_NOTE } from "@/lib/growth-path/types";

interface Props {
  params: Promise<{ token: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { token } = await params;
  const session = await prisma.growthPathSession.findUnique({
    where: { accessToken: token },
    include: { lead: true },
  });

  return {
    title: `${session?.lead?.firmName || "Firm"} Growth Path - Partner View`,
    robots: "noindex, nofollow",
  };
}

export default async function PartnerViewPage({ params }: Props) {
  const { token } = await params;

  const session = await prisma.growthPathSession.findUnique({
    where: { accessToken: token },
    include: {
      lead: true,
      scans: true,
      score: true,
      recommendation: true,
    },
  });

  if (!session || !session.recommendation) return notFound();

  const scanResults: Record<string, unknown> = {};
  for (const scan of session.scans) {
    if (scan.status === "complete" && scan.result) {
      scanResults[scan.scanType] = scan.result;
    }
  }

  const keywordData = scanResults.keyword_volume as {
    totalVolume?: number;
    totalLocalVolume?: number;
  } | undefined;

  const competitorDensity = scanResults.competitor_density as {
    firmCount?: number;
  } | undefined;

  const mapsData = scanResults.maps_competition as {
    totalFound?: number;
  } | undefined;

  const primaryPath = getPathById(
    session.overriddenPath || session.recommendation.primaryPath
  );

  const firmName = session.lead.firmName || "Your Firm";
  const brandRoute = session.recommendation.brandRoute;
  const calendlyUrl =
    brandRoute === "juris_digital"
      ? "https://calendly.com/jurisdigital"
      : "https://calendly.com/jurispage";

  return (
    <div className="min-h-screen" style={{ background: "#111" }}>
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-white font-heading font-bold text-lg">
            JurisPage
          </span>
          <span className="text-gray-500 text-sm">Partner View</span>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Title */}
        <h1 className="font-heading font-extrabold text-3xl text-white mb-2">
          {firmName} Growth Path
        </h1>
        <p className="text-gray-400 text-base mb-10">
          {session.practiceArea} in {session.city}, {session.state}
        </p>

        {/* Market Opportunity */}
        <section className="mb-8">
          <h2 className="font-heading font-bold text-lg text-white mb-3">
            The market opportunity
          </h2>
          <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-6">
            <div className="grid grid-cols-2 gap-6">
              {keywordData?.totalVolume ? (
                <div>
                  <p className="text-3xl font-bold text-white">
                    {keywordData.totalVolume.toLocaleString()}
                  </p>
                  <p className="text-gray-500 text-sm">
                    monthly searches nationally
                  </p>
                </div>
              ) : null}
              {(competitorDensity?.firmCount ?? mapsData?.totalFound) ? (
                <div>
                  <p className="text-3xl font-bold text-white">
                    {competitorDensity?.firmCount ?? mapsData?.totalFound}+
                  </p>
                  <p className="text-gray-500 text-sm">
                    firms competing in {session.city}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        {/* Major Gap */}
        {session.score && (
          <section className="mb-8">
            <h2 className="font-heading font-bold text-lg text-white mb-3">
              The biggest gap
            </h2>
            <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-6">
              <p className="text-gray-300 leading-relaxed">
                {session.score.visibilityGap >= 60
                  ? `${firmName} has a significant visibility gap. When potential clients search for a personal injury lawyer in ${session.city}, the firm is not showing up where it needs to be.`
                  : session.score.foundation >= 60
                    ? `${firmName}'s website and online presence have foundational issues that may be costing the firm cases right now.`
                    : session.score.websiteClarity <= 45
                      ? `${firmName}'s website is not converting visitors into calls at the rate it should. The issue is not traffic, it's what happens when people arrive.`
                      : `${firmName} has room to improve its market position in ${session.city}. The recommended path below is designed to close that gap efficiently.`}
              </p>
            </div>
          </section>
        )}

        {/* Recommended Path */}
        {primaryPath && (
          <section className="mb-8">
            <h2 className="font-heading font-bold text-lg text-white mb-3">
              Recommended path
            </h2>
            <div
              className="rounded-xl border p-6"
              style={{
                borderColor: "rgba(238,108,19,0.3)",
                background: "rgba(238,108,19,0.05)",
              }}
            >
              <h3
                className="font-heading font-bold text-xl mb-3"
                style={{ color: "#EE6C13" }}
              >
                {primaryPath.name}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {session.recommendation.explanationShort ||
                  primaryPath.userExplanation}
              </p>
            </div>
          </section>
        )}

        {/* 90-Day Plan */}
        {session.recommendation.days1to30 && (
          <section className="mb-8">
            <h2 className="font-heading font-bold text-lg text-white mb-3">
              Next 90 days
            </h2>
            <div className="space-y-4">
              {[
                { label: "Days 1-30", items: session.recommendation.days1to30 as string[] },
                { label: "Days 31-60", items: session.recommendation.days31to60 as string[] },
                { label: "Days 61-90", items: session.recommendation.days61to90 as string[] },
              ].map((phase) => (
                <div
                  key={phase.label}
                  className="bg-gray-900/50 rounded-xl border border-gray-800 p-5"
                >
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
                    {phase.label}
                  </h4>
                  <ul className="space-y-2">
                    {phase.items?.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                        <span style={{ color: "#EE6C13" }} className="mt-0.5">&#8226;</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="mb-8">
          <div
            className="rounded-xl p-8 text-center"
            style={{ background: "rgba(238,108,19,0.08)", border: "1px solid rgba(238,108,19,0.2)" }}
          >
            <p className="text-gray-300 mb-6">
              Ready to discuss this with the team at{" "}
              {brandRoute === "juris_digital" ? "Juris Digital" : "JurisPage"}?
            </p>
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-heading font-bold text-sm text-white px-8 py-3.5 rounded-[40px] no-underline"
              style={{ background: "#EE6C13" }}
            >
              Book a Call
            </a>
          </div>
        </section>

        {/* Market Note */}
        <p className="text-gray-600 text-xs leading-relaxed text-center">
          {MARKET_AVAILABILITY_NOTE}
        </p>
      </div>
    </div>
  );
}
