import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await req.json();
    const { firmName, firstName, lastName, email, phone, practiceArea, targetMarket } = body;

    if (!firmName || !firstName || !email || !phone || !practiceArea || !targetMarket) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const emailHtml = `
      <h2>FREE MARKET REPORT REQUEST</h2>
      <p style="color: #EE6C13; font-weight: bold;">Deliver within 24 hours</p>
      <table style="border-collapse: collapse; width: 100%;">
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Firm Name</td><td style="padding: 8px; border: 1px solid #ddd;">${firmName}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Contact Name</td><td style="padding: 8px; border: 1px solid #ddd;">${firstName} ${lastName}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email</td><td style="padding: 8px; border: 1px solid #ddd;">${email}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Phone</td><td style="padding: 8px; border: 1px solid #ddd;">${phone}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Practice Area</td><td style="padding: 8px; border: 1px solid #ddd;">${practiceArea}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Target Market</td><td style="padding: 8px; border: 1px solid #ddd;">${targetMarket}</td></tr>
      </table>
    `;

    await resend.emails.send({
      from: "JurisPage Leads <leads@jurispage.com>",
      to: ["hello@jurispage.com"],
      cc: ["cmeraz@jurisdigital.com"],
      subject: `FREE MARKET REPORT REQUEST: ${firmName} - ${practiceArea} in ${targetMarket}`,
      html: emailHtml,
      replyTo: email,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Market report form error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
