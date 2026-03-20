"use client";

import { useState } from "react";

interface ComparisonItem {
  painPoint: string;
  them: string;
  us: string;
}

const comparisons: ComparisonItem[] = [
  {
    painPoint: "How They Report Results",
    them: "Monthly PDF full of keyword charts and traffic graphs. When you ask how many cases SEO generated, they change the subject to 'impressions' and 'domain authority.'",
    us: "Three numbers on page one: qualified leads generated, cost per lead, and cases signed. Everything else is supporting detail.",
  },
  {
    painPoint: "What Happens After You Sign",
    them: "Enthusiastic onboarding call, then radio silence. Your account gets handed to a junior coordinator. You email your 'strategist' and hear back 4 days later with a templated response.",
    us: "Dedicated strategist with a named Slack channel. 90-day checkpoints with specific benchmarks. If we miss one, we change the strategy and explain why — same week.",
  },
  {
    painPoint: "How They Handle Your Content",
    them: "Generic blog posts that could belong to any firm in any state. No attorney review, no bar compliance check, no real legal substance. Just SEO filler with keywords stuffed in.",
    us: "Every page references specific statutes, realistic timelines, and practical guidance. Content is checked against your state bar's advertising rules before it goes live.",
  },
  {
    painPoint: "Their Contract Structure",
    them: "12-month contract with an auto-renewal buried in the fine print. You want to leave at month 6 because nothing is working? Pay the remaining 6 months anyway.",
    us: "Month-to-month. No long-term contracts. We earn your business every 30 days. If we are not generating cases, you should leave — and you can.",
  },
  {
    painPoint: "How They Build Links",
    them: "Cheap links from irrelevant blogs, private blog networks, or 'guest post' farms in countries you have never heard of. Your backlink profile looks like spam because it is.",
    us: "Manual outreach to bar associations, legal publications, local press, and established directories. Every link is vetted. We show you exactly where each one came from.",
  },
  {
    painPoint: "Their Pricing Transparency",
    them: "No pricing on the website. You have to book a 'discovery call,' sit through a 45-minute pitch deck, and then get a proposal 3 days later. The price depends on 'how much you seem willing to pay.'",
    us: "Our pricing is published on our website. You can see exactly what is included at every tier without scheduling a call or sitting through a presentation.",
  },
  {
    painPoint: "How They Handle AI Search",
    them: "They have not mentioned it. They do not know that ChatGPT and Perplexity are already recommending lawyers. Your competitors are showing up in AI search results and you are not.",
    us: "We optimize for AI citation from day one. Structured content, consistent entity data, and authority signals that get your firm recommended by ChatGPT, Perplexity, and Google AI Overviews.",
  },
  {
    painPoint: "What Happens When Rankings Drop",
    them: "They blame a 'Google algorithm update' and tell you to be patient. No diagnosis, no action plan, no accountability. Rankings stay down for months.",
    us: "We diagnose the cause within 48 hours, present a remediation plan, and execute. If we caused the drop, we work for free until it is fixed.",
  },
];

export default function ThemVsUs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = comparisons[activeIndex];

  return (
    <section className="py-20 px-6 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span
            className="inline-block text-xs font-heading font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
            style={{ background: "#EE6C1322", color: "#EE6C13" }}
          >
            Why Firms Switch to JurisPage
          </span>
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl md:text-4xl mb-3">
            Your Current Agency vs. JurisPage
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            If any of these sound familiar, you are not alone. These are the
            exact reasons 113+ law firms made the switch.
          </p>
        </div>

        {/* Pain point selector pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {comparisons.map((item, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer border ${
                i === activeIndex
                  ? "text-white border-transparent shadow-lg"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:text-gray-900"
              }`}
              style={
                i === activeIndex
                  ? { background: "#EE6C13", borderColor: "#EE6C13" }
                  : undefined
              }
            >
              {item.painPoint}
            </button>
          ))}
        </div>

        {/* Comparison cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          {/* THEM card */}
          <div className="relative rounded-2xl border-2 border-red-200 bg-red-50/50 p-8 overflow-hidden">
            {/* Diagonal stripe accent */}
            <div className="absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 rotate-45 bg-red-100" />

            <div className="relative">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#dc2626"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </div>
                <h3 className="font-heading font-extrabold text-red-900 text-lg">
                  The Typical Agency
                </h3>
              </div>
              <p className="text-red-900/80 text-[15px] leading-relaxed">
                {active.them}
              </p>
            </div>
          </div>

          {/* US card */}
          <div className="relative rounded-2xl border-2 p-8 overflow-hidden" style={{ borderColor: "#EE6C13", background: "#FEF3EC" }}>
            {/* Diagonal stripe accent */}
            <div className="absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 rotate-45" style={{ background: "#EE6C1333" }} />

            <div className="relative">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#EE6C1333" }}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#EE6C13"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="font-heading font-extrabold text-lg" style={{ color: "#982A0B" }}>
                  JurisPage
                </h3>
              </div>
              <p className="text-[15px] leading-relaxed" style={{ color: "#982A0B" }}>
                {active.us}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center gap-1.5 mt-6 mb-8">
          {comparisons.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-2 h-2 rounded-full transition-all duration-200 cursor-pointer ${
                i === activeIndex ? "w-6" : "bg-gray-300 hover:bg-gray-400"
              }`}
              style={i === activeIndex ? { background: "#EE6C13" } : undefined}
              aria-label={`View comparison ${i + 1}`}
            />
          ))}
        </div>

        {/* Bottom stat bar */}
        <div className="rounded-2xl bg-[#1a1a1a] p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="font-heading font-extrabold text-2xl md:text-3xl text-white mb-1">113+</p>
            <p className="text-gray-400 text-xs">Law firms served</p>
          </div>
          <div>
            <p className="font-heading font-extrabold text-2xl md:text-3xl mb-1" style={{ color: "#EE6C13" }}>$0</p>
            <p className="text-gray-400 text-xs">Long-term contract required</p>
          </div>
          <div>
            <p className="font-heading font-extrabold text-2xl md:text-3xl text-white mb-1">40+</p>
            <p className="text-gray-400 text-xs">States with bar compliance experience</p>
          </div>
          <div>
            <p className="font-heading font-extrabold text-2xl md:text-3xl mb-1" style={{ color: "#EE6C13" }}>100%</p>
            <p className="text-gray-400 text-xs">Pricing published online</p>
          </div>
        </div>
      </div>
    </section>
  );
}
