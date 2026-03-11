import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await req.json();
    const {
      name,
      email,
      attorneys,
      practiceArea,
      citySize,
      addons,
      monthlyTotal,
      oneTimeTotal,
      isCustom,
    } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const cityLabel =
      citySize === "large"
        ? "Over 1M (major metro)"
        : citySize === "medium"
        ? "100K–1M (mid-size city)"
        : "Under 100K (smaller market)";

    const attorneyDisplay = attorneys > 4 ? "5+" : attorneys <= 2 ? "1–2" : attorneys;

    // ── Internal notification ──────────────────────────────────────────
    const internalHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <div style="background: #1a1a1a; padding: 20px 28px;">
          <h2 style="color: #EE6C13; margin: 0; font-size: 20px;">${isCustom ? "Juris Digital Lead — 5+ Attorneys" : "New Launchpad Pricing Request"}</h2>
          ${isCustom ? '<p style="color: #fbbf24; margin: 8px 0 0; font-size: 14px;">⚠ JURIS DIGITAL HANDOFF (5+ attorneys)</p>' : ""}
        </div>
        <div style="padding: 24px 28px; background: #f9fafb;">
          <table style="border-collapse: collapse; width: 100%;">
            <tr><td style="padding: 8px 12px; border: 1px solid #e5e7eb; font-weight: bold; background: #fff;">Name</td><td style="padding: 8px 12px; border: 1px solid #e5e7eb; background: #fff;">${name}</td></tr>
            <tr><td style="padding: 8px 12px; border: 1px solid #e5e7eb; font-weight: bold; background: #f9fafb;">Email</td><td style="padding: 8px 12px; border: 1px solid #e5e7eb; background: #f9fafb;">${email}</td></tr>
            <tr><td style="padding: 8px 12px; border: 1px solid #e5e7eb; font-weight: bold; background: #fff;">Attorneys</td><td style="padding: 8px 12px; border: 1px solid #e5e7eb; background: #fff;">${attorneyDisplay}</td></tr>
            <tr><td style="padding: 8px 12px; border: 1px solid #e5e7eb; font-weight: bold; background: #f9fafb;">Practice Area</td><td style="padding: 8px 12px; border: 1px solid #e5e7eb; background: #f9fafb;">${practiceArea}</td></tr>
            <tr><td style="padding: 8px 12px; border: 1px solid #e5e7eb; font-weight: bold; background: #fff;">Target City</td><td style="padding: 8px 12px; border: 1px solid #e5e7eb; background: #fff;">${cityLabel}</td></tr>
            <tr><td style="padding: 8px 12px; border: 1px solid #e5e7eb; font-weight: bold; background: #f9fafb;">AI Chatbot</td><td style="padding: 8px 12px; border: 1px solid #e5e7eb; background: #f9fafb;">${addons?.chatbot ? "Yes (+$299/mo)" : "No"}</td></tr>
            <tr><td style="padding: 8px 12px; border: 1px solid #e5e7eb; font-weight: bold; background: #fff;">Logo Design</td><td style="padding: 8px 12px; border: 1px solid #e5e7eb; background: #fff;">${addons?.logo ? "Yes (+$999 one-time)" : "No"}</td></tr>
            <tr style="background: #fef3ec;">
              <td style="padding: 10px 12px; border: 1px solid #e5e7eb; font-weight: bold;">Estimated Monthly</td>
              <td style="padding: 10px 12px; border: 1px solid #e5e7eb; font-weight: bold; color: #EE6C13; font-size: 18px;">${isCustom ? "Custom Pricing" : `$${monthlyTotal?.toLocaleString()}/mo`}</td>
            </tr>
            ${oneTimeTotal > 0 ? `<tr><td style="padding: 8px 12px; border: 1px solid #e5e7eb; font-weight: bold; background: #f9fafb;">One-Time Setup</td><td style="padding: 8px 12px; border: 1px solid #e5e7eb; background: #f9fafb;">$${oneTimeTotal?.toLocaleString()}</td></tr>` : ""}
          </table>
          <p style="margin-top: 16px; color: #6b7280; font-size: 13px;">Reply to this email to contact the prospect directly.</p>
        </div>
      </div>
    `;

    await resend.emails.send({
      from: "JurisPage Pricing <leads@jurispage.com>",
      to: ["cmeraz@jurisdigital.com", "ahatcher@jurisdigital.com", "jmeans@jurisdigital.com"],
      subject: `New Pricing Request: ${name} — ${isCustom ? "Juris Digital Lead (5+ attorneys)" : `$${monthlyTotal?.toLocaleString()}/mo`} | ${practiceArea}`,
      html: internalHtml,
      replyTo: email,
    });

    // ── Prospect email ─────────────────────────────────────────────────
    const prospectHtml = isCustom
      ? `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1a1a1a; padding: 24px 32px;">
            <h1 style="color: #EE6C13; font-size: 22px; margin: 0;">Your firm deserves more than a foundation.</h1>
          </div>
          <div style="padding: 32px; background: #ffffff;">
            <p style="color: #374151;">Hi ${name},</p>
            <p style="color: #555; line-height: 1.7;">Thanks for reaching out. With 5+ attorneys, your firm has outgrown a foundation package — you need a full-service growth partner that can help you dominate your market, sign more cases, and build a lasting legacy.</p>
            <p style="color: #555; line-height: 1.7;">That's where <strong>Juris Digital</strong> comes in. Same parent company as JurisPage, same data-driven approach — but built specifically for established firms investing <strong>$5,000–$20,000+/month</strong> in growth.</p>
            <div style="background: #f9fafb; border-radius: 12px; padding: 20px 24px; margin: 24px 0; border: 1px solid #e5e7eb;">
              <p style="font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; color: #9ca3af; margin: 0 0 12px;">What Juris Digital Delivers</p>
              <ul style="color: #555; font-size: 14px; margin: 0; padding-left: 18px; line-height: 2;">
                <li>Full-service SEO & content strategy</li>
                <li>Google Ads management</li>
                <li>Custom website design & development</li>
                <li>Dedicated account strategist</li>
                <li>Market domination strategy</li>
                <li>Comprehensive monthly reporting</li>
              </ul>
            </div>
            <p style="color: #555; line-height: 1.7;">A member of the Juris Digital team will reach out within one business day to discuss your firm's goals and build a custom strategy.</p>
            <div style="margin: 28px 0;">
              <a href="https://jurisdigital.com" style="display: inline-block; background: #EE6C13; color: white; font-weight: bold; padding: 14px 28px; border-radius: 100px; text-decoration: none; font-size: 15px;">Explore Juris Digital →</a>
            </div>
            <p style="color: #6b7280; font-size: 14px;">Or call us directly: <a href="tel:+18555936935" style="color: #EE6C13;">(855) 593-6935</a></p>
            <p style="color: #555; font-size: 14px; margin-top: 24px;">— The JurisPage + Juris Digital Team</p>
          </div>
          <div style="background: #f5f5f5; padding: 16px 32px; text-align: center;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">JurisPage + Juris Digital · Law Firm Marketing</p>
          </div>
        </div>
      `
      : `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1a1a1a; padding: 24px 32px;">
            <h1 style="color: #EE6C13; font-size: 22px; margin: 0;">Your JurisPage Launchpad Pricing</h1>
          </div>
          <div style="padding: 32px; background: #ffffff;">
            <p style="color: #374151;">Hi ${name},</p>
            <p style="color: #555; line-height: 1.7;">Here's your personalized Launchpad pricing based on what you told us. This is your all-in monthly investment — no hidden fees, no long-term contract.</p>

            <div style="background: #f9fafb; border-radius: 12px; padding: 24px; margin: 24px 0; border: 1px solid #e5e7eb;">
              <p style="font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; color: #9ca3af; margin: 0 0 16px;">Your Pricing Details</p>
              <p style="margin: 6px 0; color: #555; font-size: 14px;">Firm size: <strong>${attorneyDisplay} ${attorneys > 10 ? "" : "attorneys"}</strong></p>
              <p style="margin: 6px 0; color: #555; font-size: 14px;">Practice area: <strong>${practiceArea}</strong></p>
              <p style="margin: 6px 0; color: #555; font-size: 14px;">Target market: <strong>${cityLabel}</strong></p>
              ${addons?.chatbot ? '<p style="margin: 6px 0; color: #555; font-size: 14px;">+ AI Lead Capture Chatbot: <strong>$299/mo</strong></p>' : ""}
              ${addons?.logo ? '<p style="margin: 6px 0; color: #555; font-size: 14px;">+ Custom Logo Design: <strong>$999 one-time</strong></p>' : ""}
              <div style="border-top: 1px solid #e5e7eb; margin-top: 20px; padding-top: 20px;">
                <p style="font-size: 36px; font-weight: 900; color: #EE6C13; margin: 0; font-family: Arial, sans-serif;">$${monthlyTotal?.toLocaleString()}<span style="font-size: 16px; color: #9ca3af; font-weight: normal;">/month</span></p>
                ${oneTimeTotal > 0 ? `<p style="color: #6b7280; font-size: 14px; margin: 6px 0 0;">+ $${oneTimeTotal?.toLocaleString()} one-time</p>` : ""}
              </div>
            </div>

            <p style="color: #555; font-size: 14px; line-height: 1.7;">This is a transparent, fixed price — no guesswork, no surprises. <strong>Month-to-month. Cancel anytime with 30 days notice.</strong> And if we don't show measurable results within 90 days, we work for free until we do.</p>
            <p style="color: #555; font-size: 14px; line-height: 1.7;">Book a strategy call to confirm this pricing matches your firm's growth goals.</p>

            <div style="background: #f0fdf4; border-left: 4px solid #22c55e; padding: 16px 20px; border-radius: 0 8px 8px 0; margin: 24px 0;">
              <p style="color: #166534; font-size: 14px; font-weight: bold; margin: 0 0 4px;">What's included in Launchpad:</p>
              <ul style="color: #166534; font-size: 13px; margin: 0; padding-left: 18px; line-height: 1.8;">
                <li>Professional website (live within 45 days)</li>
                <li>Google Business Profile setup and optimization</li>
                <li>Keyword research and SEO content production</li>
                <li>Local directory and citation building</li>
                <li>Social media profile setup</li>
                <li>Ongoing monthly reporting and content updates</li>
              </ul>
            </div>

            <div style="margin: 28px 0;">
              <a href="https://jurispage.com/contact/" style="display: inline-block; background: #EE6C13; color: white; font-weight: bold; padding: 14px 28px; border-radius: 100px; text-decoration: none; font-size: 15px;">Book a Free Strategy Call</a>
            </div>

            <p style="color: #6b7280; font-size: 14px;">Questions? Call us at <a href="tel:+18555936935" style="color: #EE6C13;">(855) 593-6935</a>. We typically respond the same business day.</p>
            <p style="color: #555; font-size: 14px; margin-top: 24px;">— The JurisPage Team</p>
          </div>
          <div style="background: #f5f5f5; padding: 16px 32px; text-align: center;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">JurisPage · Law Firm Marketing · jurispage.com</p>
          </div>
        </div>
      `;

    await resend.emails.send({
      from: "JurisPage <hello@jurispage.com>",
      to: [email],
      subject: isCustom
        ? "Your firm is ready for Juris Digital"
        : `Your JurisPage Launchpad Pricing — $${monthlyTotal?.toLocaleString()}/mo`,
      html: prospectHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Quote API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
