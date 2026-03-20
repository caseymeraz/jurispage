"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { CaseStudy } from "@/data/caseStudies";

interface CaseStudyShowcaseProps {
  caseStudies: CaseStudy[];
  heading?: string;
}

const typeLabels: Record<CaseStudy["type"], string> = {
  seo: "SEO",
  ppc: "Google Ads",
  "seo-ppc": "SEO + Google Ads",
};

export default function CaseStudyShowcase({
  caseStudies,
  heading = "Real Results from Law Firms Like Yours",
}: CaseStudyShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = caseStudies[activeIndex];
  if (!caseStudies.length) return null;

  return (
    <section className="py-16 px-6 bg-white border-t border-gray-100">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-3">
            {heading}
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            These are real law firms generating real cases through organic search
            and paid campaigns. Click any card to see the full story.
          </p>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {caseStudies.map((cs, i) => {
            const isActive = i === activeIndex;
            const isImage =
              cs.imageFile.endsWith(".jpg") || cs.imageFile.endsWith(".png");
            return (
              <button
                key={cs.slug}
                onClick={() => setActiveIndex(i)}
                className={`relative text-left rounded-xl p-5 transition-all duration-300 border-2 cursor-pointer group ${
                  isActive
                    ? "bg-[#FEF3EC] border-[#EE6C13] shadow-lg shadow-orange-500/10"
                    : "bg-gray-50 border-gray-100 hover:bg-gray-100 hover:border-gray-200"
                }`}
              >
                {/* Logo */}
                <div className="h-8 mb-4 flex items-center">
                  {isImage ? (
                    <Image
                      src={cs.imageFile}
                      alt={cs.client}
                      width={60}
                      height={32}
                      className="object-contain h-8 w-auto opacity-50 group-hover:opacity-80 transition-opacity"
                    />
                  ) : (
                    <Image
                      src={cs.imageFile}
                      alt={cs.client}
                      width={80}
                      height={32}
                      className="object-contain h-6 w-auto opacity-50 group-hover:opacity-80 transition-opacity"
                    />
                  )}
                </div>

                {/* Hero metric */}
                <p
                  className="font-heading font-extrabold text-lg leading-tight mb-1"
                  style={{ color: "#EE6C13" }}
                >
                  {cs.stats[0].value}
                </p>
                <p className="text-gray-500 text-xs leading-snug mb-3">
                  {cs.stats[0].label}
                </p>

                {/* Practice area + location */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded bg-gray-200 text-gray-600">
                    {typeLabels[cs.type]}
                  </span>
                  <span className="text-[10px] text-gray-400">
                    {cs.location}
                  </span>
                </div>

                {/* Active indicator */}
                {isActive && (
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 rotate-45 rounded-sm"
                    style={{ background: "#1a1a1a" }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Expanded detail panel — dark for contrast */}
        <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left: metrics */}
            <div className="p-8 lg:p-10">
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full text-white"
                  style={{ background: "#EE6C13" }}
                >
                  {typeLabels[active.type]}
                </span>
                <span className="text-xs text-gray-400">
                  {active.practiceArea} &middot; {active.location}
                </span>
              </div>

              <h3 className="font-heading font-extrabold text-white text-2xl mb-6">
                {active.client}
              </h3>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {active.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white/5 rounded-xl p-4 border border-white/5"
                  >
                    <p
                      className="font-heading font-extrabold text-2xl leading-none mb-1"
                      style={{ color: "#EE6C13" }}
                    >
                      {stat.value}
                    </p>
                    <p className="text-gray-400 text-xs leading-snug">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              {active.testimonial && (
                <blockquote className="border-l-2 border-[#EE6C13] pl-4 mb-6">
                  <p className="text-gray-300 text-sm italic leading-relaxed">
                    &ldquo;{active.testimonial.quote}&rdquo;
                  </p>
                  <cite className="text-gray-500 text-xs not-italic mt-1 block">
                    &mdash; {active.testimonial.author}
                  </cite>
                </blockquote>
              )}

              <Link
                href={`/case-studies/${active.slug}/`}
                className="inline-flex items-center gap-2 text-white font-bold py-3 px-6 rounded-xl text-sm no-underline transition-colors"
                style={{ background: "#EE6C13" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#982A0B")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#EE6C13")
                }
              >
                Read Full Case Study
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Right: challenge + results */}
            <div className="p-8 lg:p-10 bg-white/[0.03] border-t lg:border-t-0 lg:border-l border-white/10">
              <div className="mb-6">
                <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wide mb-2">
                  The Challenge
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {active.challenge}
                </p>
              </div>
              <div className="mb-6">
                <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wide mb-2">
                  What We Did
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {active.solution}
                </p>
              </div>
              <div>
                <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wide mb-2">
                  The Results
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed font-medium">
                  {active.results}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/case-studies/"
            className="text-sm font-medium no-underline transition-colors"
            style={{ color: "#EE6C13" }}
          >
            View All Success Stories &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
