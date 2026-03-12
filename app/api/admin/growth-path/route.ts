import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const status = url.searchParams.get("status");
    const brandRoute = url.searchParams.get("brandRoute");

    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (brandRoute) where.brandRoute = brandRoute;

    const sessions = await prisma.growthPathSession.findMany({
      where,
      include: {
        lead: {
          select: {
            email: true,
            firmName: true,
            phone: true,
          },
        },
        recommendation: {
          select: {
            primaryPath: true,
            brandRoute: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 100,
    });

    return NextResponse.json({ sessions });
  } catch (error) {
    console.error("Admin growth path error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
