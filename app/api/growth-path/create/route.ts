import { NextRequest, NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { notifySessionCreated } from "@/lib/growth-path/notifications";
import { submitToHubSpot } from "@/lib/hubspot";
import type { FlowType, ScanType } from "@/lib/growth-path/types";
import { ALL_SCAN_TYPES, SCANS_REQUIRING_WEBSITE } from "@/lib/growth-path/types";
import { verifyTurnstile } from "@/lib/turnstile";

function normalizeDomain(url: string | undefined): string | null {
  if (!url) return null;
  try {
    const u = new URL(url.startsWith("http") ? url : `https://${url}`);
    return u.hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return url
      .replace(/^https?:\/\//, "")
      .replace(/^www\./, "")
      .split("/")[0]
      .split("?")[0]
      .split("#")[0]
      .toLowerCase();
  }
}

interface CreateRequestBody {
  email: string;
  firmName?: string;
  googlePlaceId?: string;
  website?: string;
  phone?: string;
  lat?: number;
  lng?: number;
  city?: string;
  state?: string;
  country?: string;
  practiceArea?: string;
  flowType: FlowType;
  intakeAnswers: Record<string, unknown>;
  // UTM
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  referrer?: string;
  clickId?: string;
  gclid?: string;
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
    const body: CreateRequestBody = await req.json();

    if (!body.email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    if (!body.turnstileToken || !(await verifyTurnstile(body.turnstileToken))) {
      return NextResponse.json({ error: "Spam verification failed" }, { status: 403 });
    }

    if (!body.flowType) {
      return NextResponse.json(
        { error: "Flow type is required" },
        { status: 400 }
      );
    }

    const normalizedDomain = normalizeDomain(body.website);
    const hasWebsite = !!body.website;

    // Create or update Lead
    const lead = await prisma.lead.create({
      data: {
        email: body.email,
        firmName: body.firmName,
        googlePlaceId: body.googlePlaceId,
        normalizedDomain: normalizedDomain,
        website: body.website,
        phone: body.phone,
        practiceArea: body.practiceArea || "Personal Injury",
        city: body.city,
        state: body.state,
        country: body.country || "US",
        lat: body.lat,
        lng: body.lng,
        isNewFirm: body.flowType === "new_firm",
        intakeAnswers: body.intakeAnswers as unknown as Prisma.InputJsonValue,
        utmSource: body.utmSource,
        utmMedium: body.utmMedium,
        utmCampaign: body.utmCampaign,
        utmTerm: body.utmTerm,
        utmContent: body.utmContent,
        referrer: body.referrer,
        clickId: body.clickId,
        gclid: body.gclid,
      },
    });

    // Create GrowthPathSession
    const session = await prisma.growthPathSession.create({
      data: {
        leadId: lead.id,
        status: "intake",
        flowType: body.flowType,
        intakeAnswers: body.intakeAnswers as unknown as Prisma.InputJsonValue,
        practiceArea: body.practiceArea || "Personal Injury",
        city: body.city,
        state: body.state,
        country: body.country || "US",
        lat: body.lat,
        lng: body.lng,
        website: body.website,
        firmDomain: normalizedDomain,
      },
    });

    // Create GrowthPathScan rows
    const scanTypes: ScanType[] = ALL_SCAN_TYPES.filter((scanType) => {
      if (!hasWebsite && SCANS_REQUIRING_WEBSITE.includes(scanType)) {
        return false;
      }
      return true;
    });

    await prisma.growthPathScan.createMany({
      data: scanTypes.map((scanType) => ({
        sessionId: session.id,
        scanType,
        status: "pending",
      })),
    });

    // Transition to scanning
    await prisma.growthPathSession.update({
      where: { id: session.id },
      data: { status: "scanning" },
    });

    // Log event
    await prisma.growthPathEvent.create({
      data: {
        sessionId: session.id,
        event: "session_created",
        metadata: {
          email: lead.email,
          firmName: lead.firmName,
          flowType: body.flowType,
          city: body.city,
          state: body.state,
        } as unknown as Prisma.InputJsonValue,
      },
    });

    // Fire notifications (non-blocking)
    notifySessionCreated(lead, {
      id: session.id,
      city: body.city,
      state: body.state,
      flowType: body.flowType,
    });

    // HubSpot submission (non-blocking)
    const hubspotGuid = process.env.HUBSPOT_GROWTH_PATH_FORM_GUID || process.env.HUBSPOT_FORM_GUID;
    if (hubspotGuid) {
      submitToHubSpot(hubspotGuid, [
        { name: "email", value: body.email },
        { name: "firstname", value: body.firmName || "" },
        { name: "phone", value: body.phone || "" },
        { name: "website", value: body.website || "" },
        { name: "city", value: body.city || "" },
        { name: "state", value: body.state || "" },
        {
          name: "message",
          value: `Growth Path: ${body.flowType} - ${body.practiceArea || "PI"} in ${body.city}, ${body.state}`,
        },
      ]).catch((err: unknown) => console.error("HubSpot growth path error:", err));
    }

    return NextResponse.json({
      sessionId: session.id,
      accessToken: session.accessToken,
    });
  } catch (error) {
    console.error("Growth path create error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
