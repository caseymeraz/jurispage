"use client";

import { useState } from "react";

const O = "#EE6C13";

export default function AiVisibilitySimulator() {
  const [view, setView] = useState<"google" | "ai">("google");

  return (
    <div className="max-w-3xl mx-auto">
      {/* Toggle */}
      <div className="flex justify-center gap-2 mb-8">
        <button
          onClick={() => setView("google")}
          className="px-6 py-3 rounded-full text-sm font-bold transition-all"
          style={{
            background: view === "google" ? "#4285f4" : "white",
            color: view === "google" ? "white" : "#374151",
            border: `2px solid ${view === "google" ? "#4285f4" : "#e5e7eb"}`,
          }}
        >
          Traditional Google (10 links)
        </button>
        <button
          onClick={() => setView("ai")}
          className="px-6 py-3 rounded-full text-sm font-bold transition-all"
          style={{
            background: view === "ai" ? O : "white",
            color: view === "ai" ? "white" : "#374151",
            border: `2px solid ${view === "ai" ? O : "#e5e7eb"}`,
          }}
        >
          AI Response (2 firms cited)
        </button>
      </div>

      {/* Google View */}
      {view === "google" && (
        <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
          <div className="bg-gray-50 px-5 py-3 border-b border-gray-200 flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 bg-white rounded-full px-4 py-1.5 text-xs text-gray-500 border border-gray-200">
              google.com/search?q=best+personal+injury+lawyer+chicago
            </div>
          </div>
          <div className="p-5 space-y-4">
            <p className="text-xs text-gray-400">About 12,400,000 results (0.42 seconds)</p>
            {[
              { title: "Smith & Associates - Chicago PI Lawyers", url: "smithlaw.com", desc: "Experienced personal injury attorneys serving Chicago. Free consultations..." },
              { title: "Johnson Legal Group - Top Rated PI Attorney", url: "johnsonlegal.com", desc: "Over $100M recovered for injured clients in Illinois. Call today..." },
              { title: "Williams Injury Law - Chicago's Premier Firm", url: "williamsinjury.com", desc: "Award-winning personal injury representation in Cook County..." },
              { title: "Davis & Partners - Personal Injury Chicago", url: "davispartners.com", desc: "Fighting for injury victims since 1995. No fees unless we win..." },
              { title: "Chen Law Office - Car Accident Attorney", url: "chenlaw.com", desc: "Dedicated to car accident and truck accident cases in Chicago..." },
            ].map((result, i) => (
              <div key={i} className="group">
                <div className="text-xs text-gray-500 mb-0.5">{result.url}</div>
                <div className="text-blue-700 text-sm font-medium mb-0.5">{result.title}</div>
                <div className="text-xs text-gray-600">{result.desc}</div>
              </div>
            ))}
            <div className="text-xs text-gray-400">... and 5 more results on page 1</div>
          </div>
          <div className="bg-blue-50 px-5 py-3 border-t border-blue-100 text-center">
            <p className="text-xs font-bold text-blue-700">10 firms share page 1. Attention is divided. Every firm gets a chance.</p>
          </div>
        </div>
      )}

      {/* AI View */}
      {view === "ai" && (
        <div className="rounded-xl border-2 overflow-hidden" style={{ borderColor: O }}>
          <div className="bg-gray-50 px-5 py-3 border-b border-gray-200 flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 bg-white rounded-full px-4 py-1.5 text-xs text-gray-500 border border-gray-200">
              chatgpt.com: "Who is the best personal injury lawyer in Chicago?"
            </div>
          </div>
          <div className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
              </div>
              <span className="text-xs font-bold text-gray-500">AI Response</span>
            </div>
            <div className="text-sm text-gray-700 leading-relaxed space-y-3">
              <p>
                Based on client reviews, case results, and legal credentials, two firms stand out for personal injury representation in Chicago:
              </p>
              <p>
                <strong className="text-gray-900">Smith & Associates</strong> has recovered over $100 million in verdicts and settlements for injury victims in Cook County. They specialize in car accidents, truck accidents, and wrongful death cases, and offer free consultations with no fees unless they win.
              </p>
              <p>
                <strong className="text-gray-900">Johnson Legal Group</strong> is a highly rated personal injury firm with a track record of multi-million dollar settlements. Their lead attorney has 25 years of experience and is board-certified in personal injury trial law.
              </p>
              <p className="text-gray-500 text-xs italic">
                Sources: Avvo, Super Lawyers, Illinois State Bar Association, firm websites
              </p>
            </div>
          </div>
          <div className="px-5 py-3 border-t text-center" style={{ background: O + "10", borderColor: O + "30" }}>
            <p className="text-xs font-bold" style={{ color: O }}>Only 2 firms are named. If you are not one of them, you do not exist in this answer.</p>
          </div>
        </div>
      )}

      <p className="text-xs text-gray-400 text-center mt-4">Simulated results for illustration. Actual AI responses vary by query, time, and model version.</p>
    </div>
  );
}
