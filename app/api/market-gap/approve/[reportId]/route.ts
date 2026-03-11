import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://jurispage.com";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ reportId: string }> }
) {
  try {
    const { reportId } = await params;
    const body = await req.json();
    const { approvedBy, teamNotes } = body as {
      approvedBy: string;
      teamNotes?: string;
    };

    if (!reportId) {
      return NextResponse.json(
        { error: "reportId is required" },
        { status: 400 }
      );
    }

    if (!approvedBy) {
      return NextResponse.json(
        { error: "approvedBy is required" },
        { status: 400 }
      );
    }

    // Fetch the report with lead data
    const report = await prisma.marketGapReport.findUnique({
      where: { id: reportId },
      include: { lead: true },
    });

    if (!report) {
      return NextResponse.json(
        { error: "Report not found" },
        { status: 404 }
      );
    }

    if (report.status === "full_report_ready" && report.emailSentAt) {
      return NextResponse.json(
        { error: "Report has already been approved and delivered" },
        { status: 409 }
      );
    }

    // Update report: mark as approved and full_report_ready
    await prisma.marketGapReport.update({
      where: { id: reportId },
      data: {
        status: "full_report_ready",
        approvedAt: new Date(),
        approvedBy,
        teamNotes: teamNotes || null,
      },
    });

    // Log approval event
    await prisma.marketGapEvent.create({
      data: {
        reportId,
        event: "report_approved",
        metadata: { approvedBy, teamNotes } as unknown as Prisma.InputJsonValue,
      },
    });

    // Send delivery email to the lead
    const resend = new Resend(process.env.RESEND_API_KEY);
    const reportUrl = `${BASE_URL}/market-gap/report/${report.accessToken}`;
    const leadEmail = report.lead.email;
    const firmName = report.lead.firmName || "your firm";
    const { practiceArea, city, state } = report;

    // Summary stats for the email
    const totalVolume = report.totalSearchVolume ?? 0;
    const inMapPack = report.firmInMapPack ?? false;
    const gap = report.biggestGap || "Multiple visibility gaps identified";
    const visScore = report.visibilityScore;
    const gapScoreVal = report.gapScore;

    const deliveryHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background: #f7f7f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">

    <!-- Header -->
    <div style="background: #1a1a2e; border-radius: 12px 12px 0 0; padding: 32px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">JurisPage</h1>
      <p style="color: #a0a0b0; margin: 8px 0 0; font-size: 14px;">Market Gap Analysis</p>
    </div>

    <!-- Body -->
    <div style="background: #ffffff; padding: 32px; border-radius: 0 0 12px 12px;">
      <h2 style="color: #1a1a2e; margin: 0 0 8px; font-size: 20px;">
        Your Market Gap Report is Ready
      </h2>
      <p style="color: #666; margin: 0 0 24px; font-size: 15px; line-height: 1.5;">
        We've completed the full analysis for <strong>${firmName}</strong> in the
        <strong>${practiceArea}</strong> market in <strong>${city}, ${state}</strong>.
      </p>

      <!-- Key Findings -->
      <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 0 0 24px;">
        <h3 style="color: #1a1a2e; margin: 0 0 12px; font-size: 16px;">Key Findings</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 6px 0; color: #666; font-size: 14px;">Monthly Search Demand</td>
            <td style="padding: 6px 0; color: #1a1a2e; font-weight: 600; font-size: 14px; text-align: right;">
              ${totalVolume.toLocaleString()} searches
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #666; font-size: 14px;">Google Maps Presence</td>
            <td style="padding: 6px 0; color: ${inMapPack ? "#22c55e" : "#ef4444"}; font-weight: 600; font-size: 14px; text-align: right;">
              ${inMapPack ? "Visible" : "Not Visible"}
            </td>
          </tr>
          ${visScore !== null && visScore !== undefined ? `
          <tr>
            <td style="padding: 6px 0; color: #666; font-size: 14px;">Visibility Score</td>
            <td style="padding: 6px 0; color: #1a1a2e; font-weight: 600; font-size: 14px; text-align: right;">
              ${visScore}/100
            </td>
          </tr>` : ""}
          ${gapScoreVal !== null && gapScoreVal !== undefined ? `
          <tr>
            <td style="padding: 6px 0; color: #666; font-size: 14px;">Gap Score</td>
            <td style="padding: 6px 0; color: #EE6C13; font-weight: 600; font-size: 14px; text-align: right;">
              ${gapScoreVal}/100
            </td>
          </tr>` : ""}
          <tr>
            <td style="padding: 6px 0; color: #666; font-size: 14px;">Biggest Gap</td>
            <td style="padding: 6px 0; color: #1a1a2e; font-weight: 600; font-size: 14px; text-align: right;">
              ${gap}
            </td>
          </tr>
        </table>
      </div>

      <!-- CTA Button -->
      <div style="text-align: center; margin: 0 0 24px;">
        <a href="${reportUrl}"
           style="display: inline-block; background: #EE6C13; color: #ffffff; font-weight: 700;
                  padding: 16px 40px; border-radius: 40px; text-decoration: none; font-size: 16px;">
          View Your Full Report
        </a>
      </div>

      <p style="color: #666; font-size: 14px; line-height: 1.5; margin: 0 0 24px;">
        Your report includes detailed competitor analysis, keyword opportunities,
        local search visibility data, and a prioritized action plan.
      </p>

      <!-- Secondary CTA -->
      <div style="border-top: 1px solid #e5e5e5; padding-top: 24px; text-align: center;">
        <p style="color: #1a1a2e; font-weight: 600; font-size: 15px; margin: 0 0 8px;">
          Want help closing these gaps?
        </p>
        <p style="color: #666; font-size: 14px; margin: 0 0 16px;">
          Schedule a free strategy session to discuss your report findings.
        </p>
        <a href="${BASE_URL}/contact/"
           style="display: inline-block; background: #1a1a2e; color: #ffffff; font-weight: 600;
                  padding: 12px 28px; border-radius: 40px; text-decoration: none; font-size: 14px;">
          Schedule Strategy Session
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align: center; padding: 24px 0;">
      <p style="color: #999; font-size: 12px; margin: 0;">
        JurisPage &middot; Law Firm Marketing &middot; jurispage.com
      </p>
      <p style="color: #bbb; font-size: 11px; margin: 8px 0 0;">
        This report was generated specifically for ${firmName}. Please do not forward.
      </p>
    </div>

  </div>
</body>
</html>`;

    await resend.emails.send({
      from: "JurisPage <reports@jurispage.com>",
      to: [leadEmail],
      subject: `Your Market Gap Report for ${practiceArea} in ${city} is ready`,
      html: deliveryHtml,
    });

    // Update emailSentAt
    await prisma.marketGapReport.update({
      where: { id: reportId },
      data: { emailSentAt: new Date() },
    });

    // Log email delivery event
    await prisma.marketGapEvent.create({
      data: {
        reportId,
        event: "report_email_sent",
        metadata: { to: leadEmail, sentAt: new Date().toISOString() } as unknown as Prisma.InputJsonValue,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Market gap approve error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
