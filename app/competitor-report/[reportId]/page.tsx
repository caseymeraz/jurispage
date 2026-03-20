import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import CompetitorReport from "@/components/CompetitorReport";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: "noindex, nofollow",
};

interface Props {
  params: Promise<{ reportId: string }>;
}

export default async function CompetitorReportPage({ params }: Props) {
  const { reportId } = await params;

  const report = await prisma.competitorScanReport.findUnique({
    where: { id: reportId },
    include: { lead: true },
  });

  if (!report) {
    notFound();
  }

  return (
    <CompetitorReport
      reportId={report.id}
      targetDomain={report.targetDomain}
      city={report.city}
      practiceArea={report.practiceArea}
      searchQuery={report.searchQuery}
      localPackItems={report.localPackItems as Array<{ name: string; domain: string; position: number; rating?: number; reviewCount?: number; address?: string }> | null}
      organicItems={report.organicItems as Array<{ domain: string; title: string; url: string; position: number; isDirectory?: boolean }> | null}
      targetRank={report.targetRank}
      targetInLocalPack={report.targetInLocalPack}
    />
  );
}
