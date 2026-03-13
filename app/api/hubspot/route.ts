import { NextRequest, NextResponse } from "next/server";
import { submitToHubSpot } from "@/lib/hubspot";
import { verifyTurnstile } from "@/lib/turnstile";

export async function POST(req: NextRequest) {
  try {
    const formGuid = process.env.HUBSPOT_FORM_GUID;
    if (!formGuid) {
      return NextResponse.json({ error: "HUBSPOT_FORM_GUID not configured" }, { status: 500 });
    }

    const body = await req.json();
    const { fields, hutk, pageUri, pageName } = body;

    if (!fields || !Array.isArray(fields)) {
      return NextResponse.json({ error: "fields array is required" }, { status: 400 });
    }

    if (!body.turnstileToken || !(await verifyTurnstile(body.turnstileToken))) {
      return NextResponse.json({ error: "Spam verification failed" }, { status: 403 });
    }

    await submitToHubSpot(formGuid, fields, { hutk, pageUri, pageName });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("HubSpot API error:", error);
    return NextResponse.json({ error: "HubSpot submission failed" }, { status: 500 });
  }
}
