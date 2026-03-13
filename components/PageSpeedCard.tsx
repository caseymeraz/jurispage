"use client";

interface PageSpeedMetrics {
  score: number;
  fcp: number;
  lcp: number;
  cls: number;
  tbt: number;
}

interface PageSpeedCardProps {
  mobile: PageSpeedMetrics;
  desktop: PageSpeedMetrics;
}

function scoreColor(score: number): string {
  if (score >= 90) return "#16a34a";
  if (score >= 50) return "#d97706";
  return "#dc2626";
}

function scoreBg(score: number): string {
  if (score >= 90) return "#f0fdf4";
  if (score >= 50) return "#fffbeb";
  return "#fef2f2";
}

function scoreLabel(score: number): string {
  if (score >= 90) return "Good";
  if (score >= 50) return "Needs Work";
  return "Poor";
}

function formatMs(ms: number): string {
  if (ms >= 1000) return `${(ms / 1000).toFixed(1)}s`;
  return `${Math.round(ms)}ms`;
}

function metricStatus(name: string, value: number): "good" | "needs-work" | "poor" {
  const thresholds: Record<string, [number, number]> = {
    fcp: [1800, 3000],
    lcp: [2500, 4000],
    cls: [0.1, 0.25],
    tbt: [200, 600],
  };
  const [good, poor] = thresholds[name] ?? [0, 0];
  if (value <= good) return "good";
  if (value <= poor) return "needs-work";
  return "poor";
}

function statusDot(status: "good" | "needs-work" | "poor") {
  const colors = {
    good: "#16a34a",
    "needs-work": "#d97706",
    poor: "#dc2626",
  };
  return (
    <span
      className="inline-block w-2 h-2 rounded-full mr-1.5"
      style={{ background: colors[status] }}
    />
  );
}

function MetricRow({ label, value, name }: { label: string; value: number; name: string }) {
  const status = metricStatus(name, value);
  const display = name === "cls" ? value.toFixed(3) : formatMs(value);
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-xs text-gray-500 flex items-center">
        {statusDot(status)}
        {label}
      </span>
      <span className="text-xs font-mono font-medium text-gray-700">{display}</span>
    </div>
  );
}

function ScoreRing({ score, label }: { score: number; label: string }) {
  const color = scoreColor(score);
  const bg = scoreBg(score);
  const circumference = 2 * Math.PI * 36;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-20 h-20">
        <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80" aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="none" stroke="#e5e7eb" strokeWidth="6" />
          <circle
            cx="40"
            cy="40"
            r="36"
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-heading font-extrabold text-lg" style={{ color }}>
            {score}
          </span>
        </div>
      </div>
      <span className="text-xs font-medium text-gray-500 mt-1">{label}</span>
      <span
        className="text-xs font-bold mt-0.5 px-2 py-0.5 rounded-full"
        style={{ background: bg, color }}
      >
        {scoreLabel(score)}
      </span>
    </div>
  );
}

export default function PageSpeedCard({ mobile, desktop }: PageSpeedCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="font-heading font-bold text-gray-900 text-lg mb-1">
        Site Speed Analysis
      </h3>
      <p className="text-gray-500 text-sm mb-6 leading-relaxed">
        Google uses page speed as a ranking factor. Slow sites lose visitors and rankings.
        Here&apos;s how your site performs.
      </p>

      {/* Score rings */}
      <div className="flex justify-center gap-10 mb-6">
        <ScoreRing score={mobile.score} label="Mobile" />
        <ScoreRing score={desktop.score} label="Desktop" />
      </div>

      {/* Core Web Vitals */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="text-xs font-heading font-bold text-gray-400 uppercase tracking-widest mb-2">
            Mobile Vitals
          </p>
          <div className="divide-y divide-gray-100">
            <MetricRow label="First Contentful Paint" value={mobile.fcp} name="fcp" />
            <MetricRow label="Largest Contentful Paint" value={mobile.lcp} name="lcp" />
            <MetricRow label="Cumulative Layout Shift" value={mobile.cls} name="cls" />
            <MetricRow label="Total Blocking Time" value={mobile.tbt} name="tbt" />
          </div>
        </div>
        <div>
          <p className="text-xs font-heading font-bold text-gray-400 uppercase tracking-widest mb-2">
            Desktop Vitals
          </p>
          <div className="divide-y divide-gray-100">
            <MetricRow label="First Contentful Paint" value={desktop.fcp} name="fcp" />
            <MetricRow label="Largest Contentful Paint" value={desktop.lcp} name="lcp" />
            <MetricRow label="Cumulative Layout Shift" value={desktop.cls} name="cls" />
            <MetricRow label="Total Blocking Time" value={desktop.tbt} name="tbt" />
          </div>
        </div>
      </div>

      {/* Interpretation */}
      {mobile.score < 50 && (
        <div className="mt-4 rounded-lg bg-red-50 border border-red-100 px-4 py-3">
          <p className="text-sm text-red-700">
            <strong>Your mobile score is critically low.</strong> Over 60% of legal searches happen
            on mobile. A slow mobile experience means potential clients are leaving before they
            even see your phone number.
          </p>
        </div>
      )}
      {mobile.score >= 50 && mobile.score < 90 && (
        <div className="mt-4 rounded-lg bg-amber-50 border border-amber-100 px-4 py-3">
          <p className="text-sm text-amber-700">
            <strong>Your site speed needs improvement.</strong> Faster sites rank higher and
            convert more visitors into leads. There are likely quick wins available.
          </p>
        </div>
      )}
      {mobile.score >= 90 && (
        <div className="mt-4 rounded-lg bg-green-50 border border-green-100 px-4 py-3">
          <p className="text-sm text-green-700">
            <strong>Great site speed!</strong> Your site loads quickly, which gives you an
            advantage over slower competitors in search rankings and user experience.
          </p>
        </div>
      )}
    </div>
  );
}
