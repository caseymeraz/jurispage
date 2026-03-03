import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await req.json();
    const { firstName, lastName, email, phone, practiceArea, budget, referral, message } = body;

    if (!firstName || !email || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const isPremium = budget === "$5,000+/month";

    const emailHtml = `
      <h2>New Lead from JurisPage.com</h2>
      ${isPremium ? '<p style="color: red; font-weight: bold;">⭐ PREMIUM LEAD - Budget $5,000+/month</p>' : ""}
      <table style="border-collapse: collapse; width: 100%;">
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Name</td><td style="padding: 8px; border: 1px solid #ddd;">${firstName} ${lastName}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email</td><td style="padding: 8px; border: 1px solid #ddd;">${email}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Phone</td><td style="padding: 8px; border: 1px solid #ddd;">${phone}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Practice Area</td><td style="padding: 8px; border: 1px solid #ddd;">${practiceArea || "—"}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Budget</td><td style="padding: 8px; border: 1px solid #ddd;">${budget}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Referral Source</td><td style="padding: 8px; border: 1px solid #ddd;">${referral || "—"}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Goals</td><td style="padding: 8px; border: 1px solid #ddd;">${message || "—"}</td></tr>
      </table>
    `;

    await resend.emails.send({
      from: "JurisPage Leads <leads@jurispage.com>",
      to: ["cmeraz@jurisdigital.com", "ahatcher@jurisdigital.com", "jmeans@jurisdigital.com"],
      subject: `${isPremium ? "⭐ PREMIUM LEAD" : "New Lead"}: ${firstName} ${lastName} - ${practiceArea || "Law Firm"}`,
      html: emailHtml,
      replyTo: email,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
