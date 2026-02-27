"use client";

import { useState, useEffect, useRef } from "react";

const CASE_VALUE_OPTIONS = [
  { label: "$1,000",   value: 1000 },
  { label: "$2,500",   value: 2500 },
  { label: "$5,000",   value: 5000 },
  { label: "$10,000",  value: 10000 },
  { label: "$25,000",  value: 25000 },
  { label: "$50,000+", value: 50000 },
];

const LEAD_VOLUME_OPTIONS = [
  { label: "10 leads/mo",   value: 10 },
  { label: "25 leads/mo",   value: 25 },
  { label: "50 leads/mo",   value: 50 },
  { label: "100 leads/mo",  value: 100 },
  { label: "200+ leads/mo", value: 200 },
];

const MILESTONES = [
  { seconds: 30,   message: "Studies show: the odds of qualifying a lead drop 21x if called after 5 minutes." },
  { seconds: 60,   message: "78% of clients hire the first attorney who responds. Are you first?" },
  { seconds: 300,  message: "After 5 minutes, your chance of reaching this lead drops by 80%." },
  { seconds: 1800, message: "This lead has likely called 2 other firms by now." },
];

function computeBleed(avgCaseValue: number, monthlyLeads: number) {
  const monthlyBleed = monthlyLeads * 0.45 * avgCaseValue * 0.28;
  const annualBleed  = monthlyBleed * 12;
  const hourlyBleed  = monthlyBleed / (30 * 8);
  const perSecond    = hourlyBleed / 3600;
  const perLeadLoss  = avgCaseValue * 0.28;
  return { monthlyBleed, annualBleed, hourlyBleed, perSecond, perLeadLoss };
}

function formatMoney(n: number, decimals = 0) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function formatTimer(seconds: number) {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function SecretShopAudit() {
  const [phase, setPhase]               = useState<"setup" | "running" | "reveal">("setup");
  const [avgCaseValue, setAvgCaseValue] = useState(10000);
  const [monthlyLeads, setMonthlyLeads] = useState(50);
  const [elapsedSeconds, setElapsedSeconds]     = useState(0);
  const [accumulatedLoss, setAccumulatedLoss]   = useState(0);
  const [shownMilestones, setShownMilestones]   = useState<Set<number>>(new Set());
  const [activeMilestone, setActiveMilestone]   = useState<string | null>(null);
  const [pulseButton, setPulseButton]           = useState(false);

  // Lead form
  const [name, setName]               = useState("");
  const [email, setEmail]             = useState("");
  const [firmName, setFirmName]       = useState("");
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const intervalRef   = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef  = useRef<number>(0);
  const milestoneTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const bleed = computeBleed(avgCaseValue, monthlyLeads);

  // Timer
  useEffect(() => {
    if (phase !== "running") {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    startTimeRef.current = Date.now() - elapsedSeconds * 1000;

    intervalRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      setElapsedSeconds(elapsed);
      setAccumulatedLoss(elapsed * bleed.perSecond);

      // Milestone check
      for (const m of MILESTONES) {
        if (elapsed >= m.seconds) {
          setShownMilestones((prev) => {
            if (prev.has(m.seconds)) return prev;
            const next = new Set(prev);
            next.add(m.seconds);
            setActiveMilestone(m.message);
            if (milestoneTimerRef.current) clearTimeout(milestoneTimerRef.current);
            milestoneTimerRef.current = setTimeout(() => setActiveMilestone(null), 6000);
            return next;
          });
        }
      }

      // Pulse at 30s
      if (elapsed >= 30) setPulseButton(true);
    }, 250);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  function startClock() {
    setElapsedSeconds(0);
    setAccumulatedLoss(0);
    setShownMilestones(new Set());
    setActiveMilestone(null);
    setPulseButton(false);
    setPhase("running");
  }

  function showDamage() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setPhase("reveal");
  }

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("loading");
    const res = await fetch("/api/ghost-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        firmName,
        monthlyBleed: Math.round(bleed.monthlyBleed),
        annualBleed:  Math.round(bleed.annualBleed),
        avgCaseValue,
        monthlyLeads,
      }),
    });
    setSubmitStatus(res.ok ? "success" : "error");
  };

  // ── Setup Phase ────────────────────────────────────────────────────────────
  if (phase === "setup") {
    return (
      <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200">
        {/* Header bar */}
        <div className="px-8 py-5" style={{ background: "#1a1a1a" }}>
          <h2 className="font-heading font-extrabold text-white text-xl">
            Configure Your Intake Profile
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Two inputs. Real math. No fluff.
          </p>
        </div>

        {/* Body */}
        <div className="bg-white px-8 py-8 space-y-8">
          {/* Case value */}
          <div>
            <label className="block font-heading font-bold text-gray-900 mb-3">
              Average Case Value
            </label>
            <div className="grid grid-cols-3 gap-2">
              {CASE_VALUE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setAvgCaseValue(opt.value)}
                  className="px-3 py-2.5 rounded-lg border text-sm font-semibold transition-all"
                  style={
                    avgCaseValue === opt.value
                      ? { background: "#EE6C13", borderColor: "#EE6C13", color: "#fff" }
                      : { background: "#fff", borderColor: "#d1d5db", color: "#374151" }
                  }
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Lead volume */}
          <div>
            <label className="block font-heading font-bold text-gray-900 mb-3">
              Monthly Lead Volume
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {LEAD_VOLUME_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setMonthlyLeads(opt.value)}
                  className="px-3 py-2.5 rounded-lg border text-sm font-semibold transition-all"
                  style={
                    monthlyLeads === opt.value
                      ? { background: "#EE6C13", borderColor: "#EE6C13", color: "#fff" }
                      : { background: "#fff", borderColor: "#d1d5db", color: "#374151" }
                  }
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Preview calc */}
          <div className="rounded-xl p-4 bg-gray-50 border border-gray-100 text-sm text-gray-500">
            Based on your inputs, estimated monthly bleed:{" "}
            <span className="font-bold text-gray-900">{formatMoney(bleed.monthlyBleed)}/mo</span>
          </div>

          <button
            onClick={startClock}
            className="w-full font-heading font-extrabold text-white text-lg py-4 rounded-[40px] transition-opacity hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #EE6C13, #982A0B)" }}
          >
            Start the Clock →
          </button>
          <p className="text-center text-gray-400 text-xs -mt-4">
            No email required to see the counter.
          </p>
        </div>
      </div>
    );
  }

  // ── Running Phase ──────────────────────────────────────────────────────────
  if (phase === "running") {
    return (
      <div className="rounded-2xl overflow-hidden shadow-xl" style={{ background: "#1a1a1a" }}>
        {/* Timer */}
        <div className="px-8 pt-10 pb-6 text-center">
          <p className="text-gray-500 text-xs font-heading font-bold uppercase tracking-widest mb-2">
            Time Since Lead Arrived
          </p>
          <div className="font-heading font-extrabold text-white" style={{ fontSize: "clamp(4rem, 12vw, 6rem)", lineHeight: 1 }}>
            {formatTimer(elapsedSeconds)}
          </div>
          <p className="text-gray-500 text-sm mt-3">
            Tick tock. Every second counts.
          </p>
        </div>

        {/* Loss counter */}
        <div className="mx-8 mb-6 rounded-2xl p-6 text-center"
             style={{ background: "linear-gradient(135deg, rgba(238,108,19,0.15), rgba(152,42,11,0.15))", border: "1px solid rgba(238,108,19,0.3)" }}>
          <p className="text-gray-400 text-xs font-heading font-bold uppercase tracking-widest mb-1">
            Revenue Bled This Hour
          </p>
          <div className="font-heading font-extrabold text-4xl" style={{ color: "#EE6C13" }}>
            {formatMoney(accumulatedLoss, 2)}
          </div>
          <p className="text-gray-500 text-xs mt-2">
            {formatMoney(bleed.hourlyBleed, 2)}/hr · {formatMoney(bleed.monthlyBleed)}/mo
          </p>
        </div>

        {/* Milestone toast */}
        <div
          className="mx-8 mb-6 rounded-xl p-4 transition-all duration-500"
          style={{
            background: "#374151",
            opacity: activeMilestone ? 1 : 0,
            transform: activeMilestone ? "translateY(0)" : "translateY(8px)",
          }}
        >
          <p className="text-white text-sm font-semibold text-center">
            {activeMilestone ?? ""}
          </p>
        </div>

        {/* CTA button */}
        <div className="px-8 pb-10">
          <button
            onClick={showDamage}
            className="w-full font-heading font-extrabold text-white text-lg py-4 rounded-[40px] transition-opacity hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #EE6C13, #982A0B)",
              animation: pulseButton ? "secret-shop-pulse 1.5s ease-in-out infinite" : "none",
            }}
          >
            Show Me the Damage →
          </button>
          <p className="text-center text-gray-600 text-xs mt-3">
            See your full breakdown and get a fix.
          </p>
        </div>
      </div>
    );
  }

  // ── Reveal Phase ───────────────────────────────────────────────────────────
  return (
    <div className="rounded-2xl overflow-hidden shadow-xl border-2" style={{ borderColor: "#EE6C13" }}>
      {/* Header */}
      <div className="px-8 py-5" style={{ background: "#1a1a1a" }}>
        <h2 className="font-heading font-extrabold text-white text-xl">
          The Damage Report
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Based on {monthlyLeads} leads/mo × {formatMoney(avgCaseValue)} avg case value
        </p>
      </div>

      <div className="bg-white px-8 py-8 space-y-6">
        {/* Three stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Monthly bleed */}
          <div className="rounded-xl p-5 text-center" style={{ background: "#fff3e0" }}>
            <p className="text-xs font-heading font-bold uppercase tracking-widest text-gray-500 mb-2">
              Monthly Bleed
            </p>
            <p className="font-heading font-extrabold text-3xl" style={{ color: "#EE6C13" }}>
              {formatMoney(bleed.monthlyBleed)}
            </p>
            <p className="text-gray-500 text-xs mt-1">per month</p>
          </div>

          {/* Annual bleed */}
          <div className="rounded-xl p-5 text-center" style={{ background: "#1a1a1a" }}>
            <p className="text-xs font-heading font-bold uppercase tracking-widest text-gray-500 mb-2">
              Annual Bleed
            </p>
            <p className="font-heading font-extrabold text-3xl text-white">
              {formatMoney(bleed.annualBleed)}
            </p>
            <p className="text-gray-500 text-xs mt-1">per year</p>
          </div>

          {/* Per-lead loss */}
          <div className="rounded-xl p-5 text-center bg-gray-50">
            <p className="text-xs font-heading font-bold uppercase tracking-widest text-gray-500 mb-2">
              Per-Lead Loss
            </p>
            <p className="font-heading font-extrabold text-3xl text-gray-900">
              {formatMoney(bleed.perLeadLoss)}
            </p>
            <p className="text-gray-500 text-xs mt-1">on average</p>
          </div>
        </div>

        {/* Assumptions */}
        <p className="text-xs text-gray-400 leading-relaxed">
          * Assumes 45% of leads lost to faster competitors (HBR, &ldquo;The Short Life of Online Sales Leads&rdquo;) and a 28% close rate on connected leads (Clio Legal Trends Report). Your actual results will vary.
        </p>

        {/* Lead capture form */}
        <div className="border-t border-gray-100 pt-6">
          {submitStatus === "success" ? (
            <div className="text-center py-6">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold"
                   style={{ background: "#EE6C13" }}>
                ✓
              </div>
              <p className="font-heading font-bold text-gray-900 text-lg mb-2">
                Got it - we&apos;ll be in touch within 1 business day.
              </p>
              <p className="text-gray-500 text-sm mb-4">
                A JurisPage specialist will review your numbers and send personalized recommendations.
              </p>
              <a
                href="/contact/"
                className="inline-block font-heading font-bold text-white text-sm px-7 py-3.5 rounded-[40px] no-underline hover:opacity-90 transition-opacity"
                style={{ background: "#EE6C13" }}
              >
                Book a Strategy Call →
              </a>
            </div>
          ) : (
            <>
              <h3 className="font-heading font-bold text-gray-900 text-lg mb-1">
                Want the Full Intake Audit?
              </h3>
              <p className="text-gray-500 text-sm mb-5">
                Get a personalized breakdown of where your firm is losing leads and a step-by-step fix.
              </p>
              <form onSubmit={handleLeadSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Your name *"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                  <input
                    type="email"
                    placeholder="Email address *"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Firm name (optional)"
                  value={firmName}
                  onChange={(e) => setFirmName(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                {submitStatus === "error" && (
                  <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>
                )}
                <button
                  type="submit"
                  disabled={submitStatus === "loading"}
                  className="w-full font-heading font-extrabold text-white text-base py-4 rounded-[40px] transition-opacity hover:opacity-90 disabled:opacity-60"
                  style={{ background: "linear-gradient(135deg, #EE6C13, #982A0B)" }}
                >
                  {submitStatus === "loading" ? "Sending…" : "Get My Intake Audit →"}
                </button>
                <p className="text-center text-gray-400 text-xs">
                  No spam. No sales pressure. Just real recommendations.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
