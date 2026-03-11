import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ reportId: string }> }
) {
  try {
    const { reportId } = await params;

    if (!reportId) {
      return NextResponse.json(
        { error: "reportId is required" },
        { status: 400 }
      );
    }

    const report = await prisma.marketGapReport.findUnique({
      where: { id: reportId },
      select: {
        id: true,
        status: true,
        accessToken: true,
        practiceArea: true,
        city: true,
        state: true,
        totalSearchVolume: true,
        firmInMapPack: true,
        biggestGap: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!report) {
      return NextResponse.json(
        { error: "Report not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: report.id,
      status: report.status,
      accessToken: report.status !== "pending" ? report.accessToken : undefined,
      practiceArea: report.practiceArea,
      city: report.city,
      state: report.state,
      totalSearchVolume: report.totalSearchVolume,
      firmInMapPack: report.firmInMapPack,
      biggestGap: report.biggestGap,
      createdAt: report.createdAt,
      updatedAt: report.updatedAt,
    });
  } catch (error) {
    console.error("Market gap status error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
