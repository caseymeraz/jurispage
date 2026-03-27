"use client";

import { useState } from "react";

const TABS = [
  {
    id: "plaintiff",
    label: "For Employee-Side Firms",
    accent: "#EE6C13",
    searchExamples: [
      "can I sue my employer for firing me",
      "wrongful termination lawyer free consultation",
      "do I have a discrimination case",
      "sexual harassment attorney near me",
    ],
    messagingFocus: [
      "Validate their experience first. They need to feel heard before they will schedule a call.",
      "Emphasize free consultation and contingency fee. Cost fear is the #1 barrier to action.",
      "Make EEOC deadlines visible. Many clients don't know they have a filing window.",
      "Use empathetic, direct language. Not corporate. Not legal jargon.",
    ],
    ctaExample: "Get a Free, Confidential Case Review",
    pagesToBuild: [
      "Wrongful Termination",
      "Sexual Harassment",
      "Wage & Hour Violations",
      "FMLA Violations",
      "Workplace Discrimination",
      "Retaliation & Whistleblower",
    ],
  },
  {
    id: "defendant",
    label: "For Employer-Side Firms",
    accent: "#0f4c81",
    searchExamples: [
      "employment attorney for employers",
      "EEOC defense attorney",
      "non-compete agreement lawyer",
      "HR compliance counsel",
    ],
    messagingFocus: [
      "Lead with risk minimization. Employers search when they have a problem to solve.",
      "Highlight industry experience and response time. They are evaluating competence, not empathy.",
      "Show retainer and hourly billing clearly. These are B2B decisions with budget approval processes.",
      "Use professional, competence-focused language. No emotional appeals.",
    ],
    ctaExample: "Schedule a Compliance Consultation",
    pagesToBuild: [
      "EEOC Defense",
      "Employment Agreements",
      "HR Policy Compliance",
      "Non-Compete Drafting & Enforcement",
    ],
  },
];

export default function PracticeToggle() {
  const [active, setActive] = useState(0);
  const tab = TABS[active];

  return (
    <section id="practice-toggle" className="py-16 px-6 bg-gray-50 border-t border-gray-100 scroll-mt-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-2">
          Choose Your Practice Focus
        </h2>
        <p className="text-gray-600 mb-8">
          Plaintiff and defendant employment marketing require completely different strategies. Select your focus to see what applies to your firm.
        </p>

        {/* Toggle Buttons */}
        <div className="flex gap-2 mb-10">
          {TABS.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActive(i)}
              className="px-6 py-3 rounded-full text-sm font-bold transition-all"
              style={{
                background: active === i ? t.accent : "white",
                color: active === i ? "white" : "#374151",
                border: `2px solid ${active === i ? t.accent : "#e5e7eb"}`,
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Search Examples */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: tab.accent }}>
              What They Search
            </div>
            <div className="space-y-2">
              {tab.searchExamples.map((ex) => (
                <div key={ex} className="flex items-center gap-3 text-sm">
                  <span className="flex-shrink-0 text-gray-400">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5"/><line x1="11" y1="11" x2="14" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </span>
                  <span className="text-gray-700 italic">"{ex}"</span>
                </div>
              ))}
            </div>
          </div>

          {/* Messaging Focus */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: tab.accent }}>
              Messaging Strategy
            </div>
            <div className="space-y-3">
              {tab.messagingFocus.map((msg, i) => (
                <div key={i} className="flex gap-3 text-sm">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: tab.accent }}>
                    {i + 1}
                  </span>
                  <span className="text-gray-700">{msg}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Example */}
          <div className="rounded-xl p-6" style={{ background: tab.accent + "0D", border: `2px solid ${tab.accent}33` }}>
            <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: tab.accent }}>
              Recommended CTA
            </div>
            <div className="text-lg font-heading font-bold text-gray-900">{tab.ctaExample}</div>
          </div>

          {/* Pages to Build */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: tab.accent }}>
              Pages to Build
            </div>
            <div className="flex flex-wrap gap-2">
              {tab.pagesToBuild.map((page) => (
                <span
                  key={page}
                  className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ background: tab.accent + "15", color: tab.accent }}
                >
                  {page}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
