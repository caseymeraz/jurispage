import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await req.json();
    const { name, email, firmName, monthlyBleed, annualBleed, avgCaseValue, monthlyLeads } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const fmt = (n: number) =>
      n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

    const internalHtml = `
      <h2>Secret Shop Audit Request: ${firmName || name}</h2>
      <p style="color: #EE6C13; font-weight: bold; font-size: 18px;">
        Monthly Bleed: ${fmt(monthlyBleed)}/mo
      </p>
      <table style="border-collapse: collapse; width: 100%; margin-top: 16px;">
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Name</td><td style="padding: 8px; border: 1px solid #ddd;">${name}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email</td><td style="padding: 8px; border: 1px solid #ddd;">${email}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Firm Name</td><td style="padding: 8px; border: 1px solid #ddd;">${firmName || "N/A"}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Avg Case Value</td><td style="padding: 8px; border: 1px solid #ddd;">${fmt(avgCaseValue)}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Monthly Leads</td><td style="padding: 8px; border: 1px solid #ddd;">${monthlyLeads}</td></tr>
        <tr style="background: #fff3e0;"><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; color: #EE6C13;">Monthly Bleed</td><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; color: #EE6C13;">${fmt(monthlyBleed)}/mo</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Annual Bleed</td><td style="padding: 8px; border: 1px solid #ddd;">${fmt(annualBleed)}/yr</td></tr>
      </table>
    `;

    const confirmationHtml = `
      <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
        <h2 style="color: #1a1a1a;">We received your Secret Shop audit request.</h2>
        <p style="font-size: 16px; color: #444;">
          Based on the numbers you entered, your firm may be losing up to
          <strong style="color: #EE6C13; font-size: 20px;">${fmt(monthlyBleed)}/month</strong>
          in revenue from slow intake response times.
        </p>
        <p style="color: #444;">
          A JurisPage intake specialist will review your numbers and respond within 1 business day
          with specific recommendations for your firm.
        </p>
        <a href="https://jurispage.com/contact/"
           style="display: inline-block; background: #EE6C13; color: white; font-weight: bold;
                  padding: 14px 28px; border-radius: 40px; text-decoration: none; margin-top: 16px;">
          Book a Strategy Call →
        </a>
        <p style="color: #888; font-size: 13px; margin-top: 24px;">
          JurisPage · Law Firm Marketing · jurispage.com
        </p>
      </div>
    `;

    // Internal notification
    await resend.emails.send({
      from: "JurisPage Leads <leads@jurispage.com>",
      to: ["cmeraz@jurisdigital.com", "ahatcher@jurisdigital.com", "jmeans@jurisdigital.com"],
      subject: `Secret Shop Audit Request: ${firmName || name} (${fmt(monthlyBleed)}/mo bleed)`,
      html: internalHtml,
      replyTo: email,
    });

    // Prospect confirmation
    await resend.emails.send({
      from: "JurisPage <hello@jurispage.com>",
      to: [email],
      subject: `Your JurisPage Intake Audit: ${fmt(monthlyBleed)}/mo estimated bleed`,
      html: confirmationHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Ghost lead error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
