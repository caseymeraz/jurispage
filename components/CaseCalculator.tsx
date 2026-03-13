"use client";

import { useState } from "react";

interface CaseCalculatorProps {
  monthlySearchVolume: number;
  practiceArea: string;
  city: string;
  dark?: boolean;
}

export default function CaseCalculator({
  monthlySearchVolume,
  practiceArea,
  city,
  dark,
}: CaseCalculatorProps) {
  const [optimizationLevel, setOptimizationLevel] = useState(50);

  // Conversion rates based on optimization level (0-100 slider)
  const optimizationFactor = optimizationLevel / 100;

  // CTR: blended between map pack avg (3.5%) and position 1 (28%)
  const ctr = 0.035 + optimizationFactor * (0.28 - 0.035);
  // Lead conversion: between unoptimized (2%) and optimized (5%)
  const leadRate = 0.02 + optimizationFactor * (0.05 - 0.02);
  // Intake conversion: fixed at 25%
  const intakeRate = 0.25;

  const clicks = Math.round(monthlySearchVolume * ctr);
  const leads = Math.round(clicks * leadRate);
  const cases = Math.round(leads * intakeRate);

  const optimizationLabel =
    optimizationLevel < 30
      ? "Low"
      : optimizationLevel < 70
        ? "Moderate"
        : "High";

  return (
    <div className={dark ? "" : "rounded-xl border border-gray-200 bg-white p-6 shadow-sm"}>
      <h3 className={`font-heading font-bold text-lg mb-1 ${dark ? "text-white" : "text-gray-900"}`}>
        Case Potential Calculator
      </h3>
      <p className={`text-sm mb-6 leading-relaxed ${dark ? "text-gray-400" : "text-gray-500"}`}>
        See how many {practiceArea.toLowerCase()} cases you could sign from
        Google search traffic in {city}.
      </p>

      {/* Optimization slider */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className={`text-sm font-medium ${dark ? "text-gray-300" : "text-gray-700"}`}>
            Site Optimization Level
          </label>
          <span
            className="text-xs font-bold px-2 py-0.5 rounded-full"
            style={{
              background:
                optimizationLevel < 30
                  ? "#fef2f2"
                  : optimizationLevel < 70
                    ? "#fffbeb"
                    : "#f0fdf4",
              color:
                optimizationLevel < 30
                  ? "#dc2626"
                  : optimizationLevel < 70
                    ? "#d97706"
                    : "#16a34a",
            }}
          >
            {optimizationLabel}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={optimizationLevel}
          onChange={(e) => setOptimizationLevel(Number(e.target.value))}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer"
          style={{ accentColor: "#EE6C13" }}
        />
        <div className={`flex justify-between text-xs mt-1 ${dark ? "text-gray-500" : "text-gray-400"}`}>
          <span>No SEO</span>
          <span>Fully Optimized</span>
        </div>
      </div>

      {/* Conversion funnel */}
      <div className="space-y-0">
        {/* Searches */}
        <FunnelStep
          label="Monthly Searches"
          value={monthlySearchVolume}
          detail={`People searching for ${practiceArea.toLowerCase()} help in ${city}`}
          color="#6b7280"
          isFirst
          dark={dark}
        />
        <FunnelArrow rate={`${(ctr * 100).toFixed(1)}% CTR`} dark={dark} />

        {/* Clicks */}
        <FunnelStep
          label="Website Clicks"
          value={clicks}
          detail={
            optimizationLevel >= 70
              ? "Position 1 organic gets ~28% of clicks"
              : optimizationLevel >= 30
                ? "Average map pack position gets ~8-15% of clicks"
                : "Low-visibility listings get ~3.5% of clicks"
          }
          color="#EE6C13"
          dark={dark}
        />
        <FunnelArrow rate={`${(leadRate * 100).toFixed(1)}% convert`} dark={dark} />

        {/* Leads */}
        <FunnelStep
          label="Leads (calls + forms)"
          value={leads}
          detail={
            optimizationLevel >= 50
              ? "Optimized sites convert 3-5% of visitors to leads"
              : "Unoptimized sites convert only 2% of visitors"
          }
          color="#EE6C13"
          dark={dark}
        />
        <FunnelArrow rate="25% intake" dark={dark} />

        {/* Cases */}
        <FunnelStep
          label="Signed Cases / Month"
          value={cases}
          detail="Based on industry-average 25% intake conversion rate"
          color="#16a34a"
          isFinal
          dark={dark}
        />
      </div>

      <p className={`text-xs mt-5 leading-relaxed ${dark ? "text-gray-500" : "text-gray-400"}`}>
        These projections are estimates based on industry averages. Actual
        results vary based on competition, site quality, intake process, and
        practice area. The average client we work with gains 5,000+ ranking
        keywords in the first 60 days.
      </p>
    </div>
  );
}

function FunnelStep({
  label,
  value,
  detail,
  color,
  isFirst,
  isFinal,
  dark,
}: {
  label: string;
  value: number;
  detail: string;
  color: string;
  isFirst?: boolean;
  isFinal?: boolean;
  dark?: boolean;
}) {
  const borderClass = dark
    ? isFinal
      ? "border-green-900 bg-green-950/40"
      : "border-gray-700 bg-gray-800/50"
    : isFinal
      ? "border-green-200 bg-green-50"
      : "border-gray-100 bg-gray-50";

  return (
    <div className={`rounded-lg border px-4 py-3 ${borderClass}`}>
      <div className="flex items-baseline justify-between">
        <span className={`text-sm font-medium ${dark ? "text-gray-300" : "text-gray-600"}`}>{label}</span>
        <span className="font-heading font-extrabold text-xl" style={{ color }}>
          {value.toLocaleString("en-US")}
        </span>
      </div>
      <p className={`text-xs mt-0.5 ${dark ? "text-gray-500" : "text-gray-400"}`}>{detail}</p>
    </div>
  );
}

function FunnelArrow({ rate, dark }: { rate: string; dark?: boolean }) {
  return (
    <div className="flex items-center justify-center py-1">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke={dark ? "#4b5563" : "#d1d5db"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
      <span className={`text-xs ml-1 ${dark ? "text-gray-500" : "text-gray-400"}`}>{rate}</span>
    </div>
  );
}
