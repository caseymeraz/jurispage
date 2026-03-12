import { NextRequest, NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";

interface ReviewRequestBody {
  action: "approve" | "flag" | "override";
  reviewedBy: string;
  overriddenPath?: string;
  teamNotes?: string;
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId } = await params;
    const body: ReviewRequestBody = await req.json();

    const session = await prisma.growthPathSession.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    const updateData: Record<string, unknown> = {
      reviewedBy: body.reviewedBy,
      reviewedAt: new Date(),
      teamNotes: body.teamNotes || session.teamNotes,
    };

    if (body.action === "approve") {
      updateData.status = "reviewed";
    }

    if (body.action === "override" && body.overriddenPath) {
      updateData.overriddenPath = body.overriddenPath;
      updateData.status = "reviewed";
    }

    await prisma.growthPathSession.update({
      where: { id: sessionId },
      data: updateData,
    });

    await prisma.growthPathEvent.create({
      data: {
        sessionId,
        event: `review_${body.action}`,
        metadata: {
          reviewedBy: body.reviewedBy,
          overriddenPath: body.overriddenPath,
          teamNotes: body.teamNotes,
        } as unknown as Prisma.InputJsonValue,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Growth path review error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
