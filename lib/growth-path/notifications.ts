// Growth Path notification helpers

import { Resend } from "resend";
import { notifySlack } from "@/lib/slack";
import type { ScoreDimensions } from "./types";

// ─── High-value lead Slack alert ──────────────────────────────

export async function notifyHighValueLead(
  session: {
    id: string;
    firmDomain?: string | null;
    city?: string | null;
    state?: string | null;
    practiceArea?: string | null;
  },
  lead: {
    email: string;
    firmName?: string | null;
    phone?: string | null;
  },
  scores: ScoreDimensions,
  attorneyCount: string
) {
  await notifySlack("High-Value Growth Path Lead", {
    Firm: lead.firmName || "N/A",
    Email: lead.email,
    Phone: lead.phone || "N/A",
    Market: `${session.city}, ${session.state}`,
    "Legacy Fit": `${scores.legacyFit}/100`,
    Urgency: `${scores.urgency}/100`,
    Attorneys: attorneyCount,
    Report: `https://www.jurispage.com/growth-path/report/${session.id}`,
    "Session ID": session.id,
  });
}

// ─── Report ready email ───────────────────────────────────────

export async function sendReportReadyEmail(
  lead: { email: string; firmName?: string | null },
  reportUrl: string
) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: "JurisPage <leads@jurispage.com>",
    to: [lead.email],
    subject: `Your Growth Path report is ready${lead.firmName ? ` - ${lead.firmName}` : ""}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a1a1a;">Your Growth Path Report is Ready</h2>
        <p style="color: #4a4a4a; line-height: 1.6;">
          ${lead.firmName ? `Hi ${lead.firmName} team,` : "Hi,"}
        </p>
        <p style="color: #4a4a4a; line-height: 1.6;">
          Your personalized Growth Path report is ready to view. It includes your market analysis, website review, and recommended next steps.
        </p>
        <div style="text-align: center; margin: 32px 0;">
          <a href="${reportUrl}" style="background: #EE6C13; color: white; padding: 14px 32px; border-radius: 40px; text-decoration: none; font-weight: bold; font-size: 14px;">
            View My Report
          </a>
        </div>
        <p style="color: #999; font-size: 12px; line-height: 1.6;">
          This link is unique to your firm. You can share it with partners or team members.
        </p>
      </div>
    `,
  });
}

// ─── Internal team notification ───────────────────────────────

export async function notifyInternalTeam(
  session: {
    id: string;
    city?: string | null;
    state?: string | null;
    practiceArea?: string | null;
  },
  lead: {
    email: string;
    firmName?: string | null;
  },
  primaryPath: string
) {
  await notifySlack("Growth Path Report Completed", {
    Firm: lead.firmName || "N/A",
    Email: lead.email,
    Market: `${session.city}, ${session.state}`,
    "Practice Area": session.practiceArea || "PI",
    "Recommended Path": primaryPath,
    Report: `https://www.jurispage.com/growth-path/report/${session.id}`,
    "Session ID": session.id,
  });
}

// ─── Session creation notification ────────────────────────────

export async function notifySessionCreated(
  lead: {
    email: string;
    firmName?: string | null;
    phone?: string | null;
    website?: string | null;
  },
  session: {
    id: string;
    city?: string | null;
    state?: string | null;
    flowType: string;
  }
) {
  // Slack
  notifySlack("New Growth Path Session", {
    Firm: lead.firmName || "N/A",
    Email: lead.email,
    Phone: lead.phone || "N/A",
    Website: lead.website || "N/A",
    Market: `${session.city}, ${session.state}`,
    "Flow Type": session.flowType,
    Report: `https://www.jurispage.com/growth-path/report/${session.id}`,
  });

  // Internal email
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "JurisPage Leads <leads@jurispage.com>",
      to: ["cmeraz@jurisdigital.com"],
      subject: `Growth Path: ${lead.firmName || lead.email} - ${session.city}, ${session.state}`,
      html: `
        <h2>New Growth Path Session</h2>
        <table style="border-collapse: collapse; width: 100%; font-family: sans-serif;">
          <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email</td><td style="padding: 8px; border: 1px solid #ddd;">${lead.email}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Firm</td><td style="padding: 8px; border: 1px solid #ddd;">${lead.firmName || "N/A"}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Phone</td><td style="padding: 8px; border: 1px solid #ddd;">${lead.phone || "N/A"}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Website</td><td style="padding: 8px; border: 1px solid #ddd;">${lead.website || "N/A"}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Market</td><td style="padding: 8px; border: 1px solid #ddd;">${session.city}, ${session.state}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Flow Type</td><td style="padding: 8px; border: 1px solid #ddd;">${session.flowType}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Session ID</td><td style="padding: 8px; border: 1px solid #ddd;">${session.id}</td></tr>
        </table>
      `,
      replyTo: lead.email,
    });
  } catch (err) {
    console.error("Growth Path notification email error:", err);
  }
}
