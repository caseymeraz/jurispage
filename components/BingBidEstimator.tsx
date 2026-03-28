"use client";

import { useState } from "react";

const O = "#EE6C13";
const G = "#27ae60";

type Area = "Personal Injury" | "Criminal Defense" | "Family Law" | "DUI" | "Estate Planning" | "Employment Law" | "Business Litigation";

const DATA: Record<Area, { googleCpc: number; bingCpc: number; monthlySearchesBing: number }> = {
  "Personal Injury":     { googleCpc: 150, bingCpc: 55, monthlySearchesBing: 800 },
  "Criminal Defense":    { googleCpc: 100, bingCpc: 40, monthlySearchesBing: 600 },
  "Family Law":          { googleCpc: 80,  bingCpc: 35, monthlySearchesBing: 500 },
  "DUI":                 { googleCpc: 90,  bingCpc: 38, monthlySearchesBing: 450 },
  "Estate Planning":     { googleCpc: 60,  bingCpc: 22, monthlySearchesBing: 350 },
  "Employment Law":      { googleCpc: 65,  bingCpc: 28, monthlySearchesBing: 300 },
  "Business Litigation": { googleCpc: 85,  bingCpc: 32, monthlySearchesBing: 250 },
};

export default function BingBidEstimator() {
  const [area, setArea] = useState<Area>("Personal Injury");
  const [budget, setBudget] = useState(3000);

  const d = DATA[area];
  const googleClicks = Math.floor(budget / d.googleCpc);
  const bingClicks = Math.floor(budget / d.bingCpc);
  const extraClicks = bingClicks - googleClicks;
  const savings = budget - (googleClicks * d.bingCpc);
  const savingsPct = Math.round((1 - d.bingCpc / d.googleCpc) * 100);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div>
          <label className="block text-sm font-heading font-semibold text-gray-700 mb-2">Practice Area</label>
          <select
            value={area}
            onChange={(e) => setArea(e.target.value as Area)}
            className="w-full rounded-xl px-4 py-3 text-sm text-gray-900 bg-white border border-gray-200 focus:outline-none focus:ring-2"
            style={{ ["--tw-ring-color" as string]: O } as React.CSSProperties}
          >
            {(Object.keys(DATA) as Area[]).map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-heading font-semibold text-gray-700 mb-2">Monthly Ad Budget ($)</label>
          <input
            type="number"
            min={500}
            step={500}
            value={budget}
            onChange={(e) => setBudget(Math.max(500, parseInt(e.target.value) || 500))}
            className="w-full rounded-xl px-4 py-3 text-sm text-gray-900 bg-white border border-gray-200 focus:outline-none focus:ring-2"
            style={{ ["--tw-ring-color" as string]: O } as React.CSSProperties}
          />
        </div>
      </div>

      {/* Comparison */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 text-center">
          <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Google Ads</div>
          <div className="font-heading font-extrabold text-gray-900 text-3xl mb-1">${d.googleCpc}</div>
          <div className="text-xs text-gray-500 mb-4">avg cost per click</div>
          <div className="border-t border-gray-200 pt-3">
            <div className="text-sm text-gray-600">With ${budget.toLocaleString()} budget:</div>
            <div className="font-heading font-bold text-gray-900 text-xl">{googleClicks} clicks</div>
          </div>
        </div>

        <div className="rounded-xl border-2 p-5 text-center" style={{ borderColor: O, background: O + "08" }}>
          <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: O }}>Bing / Microsoft Ads</div>
          <div className="font-heading font-extrabold text-3xl mb-1" style={{ color: O }}>${d.bingCpc}</div>
          <div className="text-xs text-gray-500 mb-4">avg cost per click</div>
          <div className="border-t pt-3" style={{ borderColor: O + "30" }}>
            <div className="text-sm text-gray-600">With ${budget.toLocaleString()} budget:</div>
            <div className="font-heading font-bold text-xl" style={{ color: O }}>{bingClicks} clicks</div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="rounded-xl p-5 text-center" style={{ background: G + "10", border: `1px solid ${G}30` }}>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="font-heading font-extrabold text-2xl" style={{ color: G }}>{savingsPct}%</div>
            <div className="text-xs text-gray-600">Lower cost per click</div>
          </div>
          <div>
            <div className="font-heading font-extrabold text-2xl" style={{ color: G }}>+{extraClicks}</div>
            <div className="text-xs text-gray-600">Extra clicks per month</div>
          </div>
          <div>
            <div className="font-heading font-extrabold text-2xl" style={{ color: G }}>${savings.toLocaleString()}</div>
            <div className="text-xs text-gray-600">Saved vs Google rates</div>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-400 text-center mt-4">Estimates based on industry averages for {area.toLowerCase()} keywords in mid-size US markets. Actual CPCs vary by market and competition.</p>
    </div>
  );
}
