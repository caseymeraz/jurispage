import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { submitToHubSpot } from "@/lib/hubspot";
import { notifySlack } from "@/lib/slack";
import { verifyTurnstile } from "@/lib/turnstile";

interface StrategyRequestBody {
  sessionId: string;
  name: string;
  email: string;
  phone?: string;
  pageUri?: string;
  turnstileToken?: string;
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

    if (!body.sessionId || !body.email || !body.name) {
      return NextResponse.json(
        { error: "sessionId, name, and email are required" },
        { status: 400 }
      );
    }

    if (!body.turnstileToken || !(await verifyTurnstile(body.turnstileToken))) {
      return NextResponse.json({ error: "Spam verification failed" }, { status: 403 });
    }

    const session = await prisma.growthPathSession.findUnique({
      where: { id: body.sessionId },
      include: { lead: true, recommendation: true },
    });

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    // Log event
    await prisma.growthPathEvent.create({
      data: {
        sessionId: session.id,
        event: "strategy_request",
        metadata: {
          name: body.name,
          email: body.email,
          phone: body.phone || null,
        } as unknown as Prisma.InputJsonValue,
      },
    });

    // Slack notification
    notifySlack("Growth Path Strategy Request", {
      Name: body.name,
      Email: body.email,
      Phone: body.phone || "N/A",
      Firm: session.lead.firmName || "N/A",
      Market: `${session.city}, ${session.state}`,
      Path: session.recommendation?.primaryPath || "N/A",
      "Session ID": session.id,
      "Page URL": body.pageUri || "N/A",
    });

    // Internal email
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: "JurisPage Leads <leads@jurispage.com>",
        to: ["cmeraz@jurisdigital.com"],
        subject: `Growth Path Strategy Request: ${body.name} - ${session.city}, ${session.state}`,
        html: `
          <h2>Growth Path - Reviewed Version Request</h2>
          <table style="border-collapse: collapse; width: 100%; font-family: sans-serif;">
            <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Name</td><td style="padding: 8px; border: 1px solid #ddd;">${body.name}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email</td><td style="padding: 8px; border: 1px solid #ddd;">${body.email}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Phone</td><td style="padding: 8px; border: 1px solid #ddd;">${body.phone || "N/A"}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Firm</td><td style="padding: 8px; border: 1px solid #ddd;">${session.lead.firmName || "N/A"}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Market</td><td style="padding: 8px; border: 1px solid #ddd;">${session.city}, ${session.state}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Recommended Path</td><td style="padding: 8px; border: 1px solid #ddd;">${session.recommendation?.primaryPath || "N/A"}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Session ID</td><td style="padding: 8px; border: 1px solid #ddd;">${session.id}</td></tr>
          </table>
        `,
        replyTo: body.email,
      });
    } catch (emailError) {
      console.error("Strategy request email error:", emailError);
    }

    // HubSpot
    try {
      const formGuid = process.env.HUBSPOT_STRATEGY_FORM_GUID || process.env.HUBSPOT_CONTACT_FORM_GUID;
      if (formGuid) {
        await submitToHubSpot(formGuid, [
          { name: "firstname", value: body.name },
          { name: "email", value: body.email },
          { name: "phone", value: body.phone || "" },
          { name: "form_source", value: "growth-path-strategy-request" },
          {
            name: "message",
            value: `Growth Path reviewed version request. ${session.practiceArea} in ${session.city}, ${session.state}. Recommended: ${session.recommendation?.primaryPath || "N/A"}`,
          },
        ]);
      }
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
