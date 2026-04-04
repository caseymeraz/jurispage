"use client";

import { useState, useEffect, useCallback, useRef } from "react";

/* ─── Search queries that cycle through ─── */
const QUERIES = [
  { text: "personal injury lawyer Los Angeles", city: "Los Angeles, CA" },
  { text: "car accident attorney near me", city: "Houston, TX" },
  { text: "divorce lawyer Denver", city: "Denver, CO" },
  { text: "criminal defense attorney Miami", city: "Miami, FL" },
  { text: "employment lawyer Chicago", city: "Chicago, IL" },
];

/* ─── Mock result data per query ─── */
const RESULTS = [
  { title: "Top-Rated Personal Injury Lawyers", url: "www.yourfirm.com/personal-injury", desc: "Experienced personal injury attorneys with a 98% success rate. Free consultation. No fee unless we win your case.", rating: "4.9", reviews: "127" },
  { title: "Car Accident Attorney — Free Case Review", url: "www.yourfirm.com/car-accidents", desc: "Injured in a car accident? Our attorneys have recovered $50M+ for accident victims. Call 24/7 for a free evaluation.", rating: "4.8", reviews: "94" },
  { title: "Trusted Divorce & Family Law Attorney", url: "www.yourfirm.com/divorce", desc: "Compassionate divorce representation with 20+ years of experience. Custody, property division, and mediation services.", rating: "5.0", reviews: "83" },
  { title: "Criminal Defense Lawyer — Available 24/7", url: "www.yourfirm.com/criminal-defense", desc: "Aggressive defense for felony and misdemeanor charges. Former prosecutor on staff. Thousands of cases handled.", rating: "4.9", reviews: "156" },
  { title: "Employment Law Attorney — Workers' Rights", url: "www.yourfirm.com/employment-law", desc: "Wrongful termination, discrimination, and wage disputes. We fight for employees. No upfront cost.", rating: "4.7", reviews: "61" },
];

/* ─── Typing speed config ─── */
const TYPE_SPEED = 55;
const PAUSE_AFTER_TYPE = 1200;
const RESULT_DISPLAY = 3200;
const FADE_DURATION = 400;

export default function HeroSearchAnimation() {
  const [queryIndex, setQueryIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState<"typing" | "result" | "fading">("typing");
  const [resultVisible, setResultVisible] = useState(false);
  const [rankCount, setRankCount] = useState(8);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const query = QUERIES[queryIndex];
  const result = RESULTS[queryIndex];

  /* ─── Typing effect ─── */
  const startTyping = useCallback(() => {
    const fullText = QUERIES[queryIndex].text;
    let i = 0;
    setDisplayText("");
    setPhase("typing");
    setResultVisible(false);
    setRankCount(8);

    intervalRef.current = setInterval(() => {
      i++;
      setDisplayText(fullText.slice(0, i));
      if (i >= fullText.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        // Pause, then show result
        setTimeout(() => {
          setPhase("result");
          setResultVisible(true);
          // Animate rank from 8 -> 1
          let rank = 8;
          const rankInterval = setInterval(() => {
            rank--;
            setRankCount(rank);
            if (rank <= 1) clearInterval(rankInterval);
          }, 80);
          // Hold result, then fade and advance
          setTimeout(() => {
            setPhase("fading");
            setTimeout(() => {
              setQueryIndex((prev) => (prev + 1) % QUERIES.length);
            }, FADE_DURATION);
          }, RESULT_DISPLAY);
        }, PAUSE_AFTER_TYPE);
      }
    }, TYPE_SPEED);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [queryIndex]);

  useEffect(() => {
    const cleanup = startTyping();
    return cleanup;
  }, [startTyping]);

  return (
    <div className="relative w-full max-w-md mx-auto lg:mx-0">
      {/* ─── Ambient glow ─── */}
      <div
        className="absolute -inset-8 rounded-3xl blur-2xl opacity-30 animate-pulse"
        style={{
          background: "radial-gradient(ellipse at 30% 20%, #EE6C13 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, #982A0B 0%, transparent 60%)",
          animationDuration: "3s",
        }}
      />

      {/* ─── Browser window container ─── */}
      <div
        className={`relative rounded-2xl overflow-hidden shadow-2xl shadow-black/20 border border-white/10 transition-opacity duration-[400ms] ${
          phase === "fading" ? "opacity-0" : "opacity-100"
        }`}
        style={{ background: "linear-gradient(145deg, #1a1f2e, #0f1219)" }}
      >
        {/* ─── Window chrome ─── */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="bg-white/5 rounded-md px-3 py-1 flex items-center gap-1.5 text-[11px] text-white/40 font-mono">
              <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor" opacity="0.5"><path d="M8 0a8 8 0 100 16A8 8 0 008 0zm3.28 5.78l-4 4a.75.75 0 01-1.06 0l-2-2a.75.75 0 011.06-1.06L6.75 8.19l3.47-3.47a.75.75 0 011.06 1.06z"/></svg>
              google.com
            </div>
          </div>
          <div className="w-14" /> {/* Spacer to balance dots */}
        </div>

        {/* ─── Search bar ─── */}
        <div className="px-5 pt-5 pb-4">
          <div className="bg-white rounded-full border border-gray-200 shadow-sm flex items-center px-4 py-3 gap-3">
            {/* Google "G" favicon */}
            <svg width="18" height="18" viewBox="0 0 48 48" className="flex-shrink-0">
              <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
              <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
              <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z" />
              <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
            </svg>
            <div className="flex-1 min-w-0">
              <span className="text-gray-800 text-[15px] leading-none">
                {displayText}
              </span>
              {phase === "typing" && (
                <span className="inline-block w-[2px] h-[16px] bg-blue-500 ml-0.5 align-middle animate-pulse" style={{ animationDuration: "0.8s" }} />
              )}
            </div>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 text-gray-400">
              <path d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* ─── Location indicator ─── */}
        <div className="px-5 pb-2">
          <div className="flex items-center gap-1.5 text-[11px] text-white/30">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
            {query.city}
          </div>
        </div>

        {/* ─── Search result card ─── */}
        <div className="px-5 pb-5">
          <div
            className={`transition-all duration-500 ease-out ${
              resultVisible && phase !== "fading"
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            {/* Rank badge */}
            <div className="flex items-center gap-2 mb-3">
              <div
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide"
                style={{
                  background: rankCount <= 1 ? "linear-gradient(135deg, #EE6C13, #982A0B)" : "rgba(255,255,255,0.06)",
                  color: rankCount <= 1 ? "white" : "rgba(255,255,255,0.4)",
                  transition: "all 0.2s",
                }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                #{rankCount} Organic
              </div>
              {rankCount <= 1 && (
                <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
                  <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0a8 8 0 100 16A8 8 0 008 0zm3.28 5.78l-4 4a.75.75 0 01-1.06 0l-2-2a.75.75 0 011.06-1.06L6.75 8.19l3.47-3.47a.75.75 0 011.06 1.06z"/></svg>
                  Organic Result
                </span>
              )}
            </div>

            {/* Result card */}
            <div className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-4 backdrop-blur-sm">
              {/* URL breadcrumb */}
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-5 h-5 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[9px] font-bold text-blue-400">Y</span>
                </div>
                <span className="text-emerald-400/80 text-[12px] truncate">{result.url}</span>
              </div>

              {/* Title */}
              <h4 className="text-[15px] font-semibold text-blue-400 leading-snug mb-1.5 hover:underline cursor-default">
                {result.title}
              </h4>

              {/* Star rating */}
              <div className="flex items-center gap-1 mb-2">
                <span className="text-yellow-400 text-[12px] leading-none tracking-tight">★★★★★</span>
                <span className="text-white/50 text-[11px]">{result.rating}</span>
                <span className="text-white/30 text-[11px]">({result.reviews} reviews)</span>
              </div>

              {/* Description snippet */}
              <p className="text-white/40 text-[13px] leading-relaxed line-clamp-2">
                {result.desc}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── "Live" indicator ─── */}
      <div className="flex items-center justify-center gap-2 mt-4 text-[11px] text-gray-400">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "#EE6C13" }} />
          <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "#EE6C13" }} />
        </span>
        Live search simulation
      </div>
    </div>
  );
}
