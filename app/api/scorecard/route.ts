import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

interface AnswerDetail {
  category: string;
  question: string;
  chosen: string;
  points: number;
  maxPoints: number;
}

export async function POST(req: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await req.json();
    const { name, email, firmName, score, grade, gradeLabel, weakAreas, answers } = body as {
      name: string;
      email: string;
      firmName?: string;
      score: number;
      grade: string;
      gradeLabel: string;
      weakAreas: string[];
      answers: AnswerDetail[];
    };

    if (!name || !email || typeof score !== "number") {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const gradeColor =
      grade === "A" ? "#22c55e" :
      grade === "B" ? "#84cc16" :
      grade === "C" ? "#f59e0b" :
      grade === "D" ? "#f97316" : "#ef4444";

    const answerRows = answers.map((a) => {
      const bg =
        a.points === a.maxPoints ? "#f0fdf4" :
        a.points > 0             ? "#fffbeb" : "#fff7ed";
      const textColor =
        a.points === a.maxPoints ? "#15803d" :
        a.points > 0             ? "#b45309" : "#c2410c";
      return `
        <tr style="background: ${bg};">
          <td style="padding: 10px 12px; border: 1px solid #e5e7eb; font-weight: 600; font-size: 13px;">${a.category}</td>
          <td style="padding: 10px 12px; border: 1px solid #e5e7eb; font-size: 13px; color: #374151;">${a.chosen}</td>
          <td style="padding: 10px 12px; border: 1px solid #e5e7eb; text-align: center; font-weight: 700; font-size: 13px; color: ${textColor};">${a.points}/${a.maxPoints}</td>
        </tr>
      `;
    }).join("");

    const weakAreaPills = weakAreas
      .map((w) => `<span style="display:inline-block; background:#fff3e0; color:#EE6C13; border-radius:999px; padding:4px 12px; font-size:12px; margin:3px;">${w}</span>`)
      .join("");

    // ── Internal email ──────────────────────────────────────────────────────
    const internalHtml = `
      <div style="font-family: sans-serif; max-width: 640px; margin: 0 auto;">
        <div style="background: #1a1a1a; padding: 24px 32px; border-radius: 12px 12px 0 0;">
          <h2 style="color: #fff; margin: 0; font-size: 20px;">
            Scorecard Lead — ${firmName || name}
          </h2>
          <p style="color: #9ca3af; margin: 6px 0 0; font-size: 14px;">
            Submitted via jurispage.com/local-seo-for-law-firms/
          </p>
        </div>
        <div style="background: #fff; padding: 32px; border: 1px solid #e5e7eb; border-top: none;">
          <!-- Score + grade row -->
          <div style="display: flex; gap: 16px; align-items: center; margin-bottom: 24px;">
            <div style="text-align: center; background: #1a1a1a; border-radius: 12px; padding: 16px 24px;">
              <div style="font-size: 48px; font-weight: 900; color: #EE6C13; line-height: 1;">${score}</div>
              <div style="color: #9ca3af; font-size: 12px;">/100</div>
            </div>
            <div>
              <span style="display: inline-block; background: ${gradeColor}; color: #fff; border-radius: 999px; padding: 6px 18px; font-weight: 700; font-size: 18px;">
                ${grade} — ${gradeLabel}
              </span>
            </div>
          </div>

          <!-- Contact info -->
          <table style="border-collapse: collapse; width: 100%; margin-bottom: 24px;">
            <tr><td style="padding: 8px 12px; border: 1px solid #e5e7eb; font-weight: 600; width: 120px;">Name</td><td style="padding: 8px 12px; border: 1px solid #e5e7eb;">${name}</td></tr>
            <tr><td style="padding: 8px 12px; border: 1px solid #e5e7eb; font-weight: 600;">Email</td><td style="padding: 8px 12px; border: 1px solid #e5e7eb;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding: 8px 12px; border: 1px solid #e5e7eb; font-weight: 600;">Firm</td><td style="padding: 8px 12px; border: 1px solid #e5e7eb;">${firmName || "—"}</td></tr>
          </table>

          <!-- Answer breakdown -->
          <h3 style="font-size: 14px; font-weight: 700; color: #1a1a1a; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em;">Answer Breakdown</h3>
          <table style="border-collapse: collapse; width: 100%; margin-bottom: 24px;">
            <thead>
              <tr style="background: #f9fafb;">
                <th style="padding: 8px 12px; border: 1px solid #e5e7eb; text-align: left; font-size: 12px;">Category</th>
                <th style="padding: 8px 12px; border: 1px solid #e5e7eb; text-align: left; font-size: 12px;">Answer</th>
                <th style="padding: 8px 12px; border: 1px solid #e5e7eb; text-align: center; font-size: 12px;">Score</th>
              </tr>
            </thead>
            <tbody>${answerRows}</tbody>
          </table>

          ${weakAreas.length > 0 ? `
          <h3 style="font-size: 14px; font-weight: 700; color: #1a1a1a; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em;">Gaps Identified</h3>
          <div style="margin-bottom: 24px;">${weakAreaPills}</div>
          ` : ""}
        </div>
      </div>
    `;

    // ── Prospect email ──────────────────────────────────────────────────────
    const weakAreaList = weakAreas
      .map((w) => `<li style="margin-bottom: 6px;">${w}</li>`)
      .join("");

    const prospectHtml = `
      <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
        <!-- Header -->
        <div style="background: #1a1a1a; padding: 32px; border-radius: 12px 12px 0 0; text-align: center;">
          <p style="color: #9ca3af; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 8px;">Your Local SEO Score</p>
          <div style="font-size: 72px; font-weight: 900; color: #EE6C13; line-height: 1;">${score}</div>
          <div style="color: #6b7280; font-size: 16px; margin-bottom: 16px;">/100</div>
          <span style="display: inline-block; background: ${gradeColor}; color: #fff; border-radius: 999px; padding: 8px 24px; font-weight: 700; font-size: 18px;">
            ${grade} — ${gradeLabel}
          </span>
        </div>

        <!-- Body -->
        <div style="background: #fff; padding: 32px; border: 1px solid #e5e7eb; border-top: none;">
          <p style="font-size: 16px; color: #374151; margin-top: 0;">
            Hi ${name},
          </p>
          <p style="font-size: 15px; color: #374151; line-height: 1.7;">
            Based on your self-assessment, we identified ${weakAreas.length} area${weakAreas.length !== 1 ? "s" : ""} where your firm has room to improve its local search visibility.
          </p>

          ${weakAreas.length > 0 ? `
          <div style="border-left: 4px solid #EE6C13; background: #fff7ed; padding: 16px 20px; border-radius: 0 8px 8px 0; margin: 20px 0;">
            <p style="font-weight: 700; color: #1a1a1a; margin: 0 0 10px; font-size: 14px;">Gaps to close:</p>
            <ul style="color: #374151; font-size: 14px; padding-left: 20px; margin: 0; line-height: 1.8;">
              ${weakAreaList}
            </ul>
          </div>
          ` : `
          <p style="font-size: 15px; color: #374151; line-height: 1.7;">
            Your score is strong! A JurisPage specialist can review your profile and identify any remaining opportunities.
          </p>
          `}

          <p style="font-size: 15px; color: #374151; line-height: 1.7;">
            We&apos;ll follow up with a personalized action plan. If you&apos;d like to talk through it right away, book a free strategy call below.
          </p>

          <div style="text-align: center; margin: 28px 0;">
            <a href="https://jurispage.com/contact/"
               style="display: inline-block; background: #EE6C13; color: white; font-weight: 700; padding: 14px 32px; border-radius: 40px; text-decoration: none; font-size: 15px;">
              Book a Free Strategy Call →
            </a>
          </div>

          <p style="font-size: 13px; color: #6b7280;">
            Or call us: <a href="tel:+18555936935" style="color: #EE6C13;">(855) 593-6935</a>
          </p>
        </div>

        <!-- Footer -->
        <div style="background: #f9fafb; padding: 20px 32px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px; text-align: center;">
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">
            JurisPage &middot; Law Firm Local SEO &middot;
            <a href="https://jurispage.com" style="color: #9ca3af;">jurispage.com</a>
          </p>
        </div>
      </div>
    `;

    // Send both emails
    await resend.emails.send({
      from: "JurisPage Leads <leads@jurispage.com>",
      to: ["cmeraz@jurisdigital.com", "ahatcher@jurisdigital.com", "jmeans@jurisdigital.com"],
      subject: `Scorecard: ${firmName || name} — ${score}/100 (${grade}: ${gradeLabel})`,
      html: internalHtml,
      replyTo: email,
    });

    await resend.emails.send({
      from: "JurisPage <hello@jurispage.com>",
      to: [email],
      subject: `Your Local SEO Score: ${score}/100 — ${grade}: ${gradeLabel}`,
      html: prospectHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Scorecard error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
