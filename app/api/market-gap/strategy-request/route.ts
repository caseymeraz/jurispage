import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { submitToHubSpot } from "@/lib/hubspot";

interface StrategyRequestBody {
  reportId: string;
  name: string;
  email: string;
  phone?: string;
  preferredTime?: string;
}

export async function POST(req: NextRequest) {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      { error: "Service temporarily unavailable." },
      { status: 503 }
    );
  }

  try {
    const body: StrategyRequestBody = await req.json();

    if (!body.reportId || !body.email || !body.name) {
      return NextResponse.json(
        { error: "reportId, name, and email are required" },
        { status: 400 }
      );
    }

    // Look up report for context
    const report = await prisma.marketGapReport.findUnique({
      where: { id: body.reportId },
      include: { lead: true },
    });

    if (!report) {
      return NextResponse.json(
        { error: "Report not found" },
        { status: 404 }
      );
    }

    // Log event
    await prisma.marketGapEvent.create({
      data: {
        reportId: report.id,
        event: "strategy_call_requested",
        metadata: {
          name: body.name,
          email: body.email,
          phone: body.phone || null,
          preferredTime: body.preferredTime || null,
        } as unknown as Prisma.InputJsonValue,
      },
    });

    // Send internal notification email
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);

      const notificationHtml = `
        <h2>Strategy Call Request</h2>
        <table style="border-collapse: collapse; width: 100%; font-family: sans-serif;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Name</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${body.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${body.email}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Phone</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${body.phone || "N/A"}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Preferred Time</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${body.preferredTime || "N/A"}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Firm</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${report.lead.firmName || "N/A"}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Practice Area</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${report.practiceArea}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Market</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${report.city}, ${report.state}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Report ID</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${report.id}</td>
          </tr>
        </table>
      `;

      await resend.emails.send({
        from: "JurisPage Leads <leads@jurispage.com>",
        to: ["cmeraz@jurisdigital.com"],
        subject: `Strategy Call Request: ${body.name} - ${report.practiceArea} in ${report.city}, ${report.state}`,
        html: notificationHtml,
        replyTo: body.email,
      });
    } catch (emailError) {
      console.error("Strategy request email error:", emailError);
    }

    // Submit to HubSpot
    try {
      await submitToHubSpot(
        process.env.HUBSPOT_STRATEGY_FORM_GUID || process.env.HUBSPOT_CONTACT_FORM_GUID || "",
        [
          { name: "firstname", value: body.name },
          { name: "email", value: body.email },
          { name: "phone", value: body.phone || "" },
          { name: "message", value: `Strategy call request: ${report.practiceArea} in ${report.city}, ${report.state}. Preferred time: ${body.preferredTime || "Not specified"}` },
        ]
      );
    } catch (hubspotError) {
      console.error("HubSpot submission error:", hubspotError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Strategy request error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
