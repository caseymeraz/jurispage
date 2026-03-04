"use client";

import { useState, useEffect } from "react";

type AnswerKey = "yes" | "partial" | "no";

interface Answer {
  label: string;
  points: number;
  qualifier: string;
}

interface Question {
  id: number;
  category: string;
  weight: number;
  question: string;
  subtext: string;
  answers: Record<AnswerKey, Answer>;
}

interface StoredAnswer {
  qIndex: number;
  key: AnswerKey;
  points: number;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    category: "Google Business Profile",
    weight: 25,
    question: "Is your Google Business Profile fully optimized?",
    subtext: "Primary + secondary categories set, services listed, 10+ photos uploaded, and a keyword-rich business description written.",
    answers: {
      yes:     { label: "Yes — fully optimized",               points: 25, qualifier: "GBP needs full optimization (categories, services, photos, description)" },
      partial: { label: "Partially — some gaps",               points: 12, qualifier: "GBP has gaps (missing categories, photos, or description)" },
      no:      { label: "No — barely set up or incomplete",    points: 0,  qualifier: "GBP is incomplete and needs immediate attention" },
    },
  },
  {
    id: 2,
    category: "Reviews",
    weight: 25,
    question: "Do you have 50+ Google reviews and get new ones each month?",
    subtext: "Volume and recency both matter to Google's local algorithm. A stale review profile drags rankings.",
    answers: {
      yes:     { label: "Yes — 50+ reviews, growing monthly",  points: 25, qualifier: "Review volume needs to grow beyond 50 with a monthly generation system" },
      partial: { label: "Some reviews, inconsistent flow",      points: 10, qualifier: "Reviews are inconsistent — need a systematic monthly generation process" },
      no:      { label: "Under 25 reviews or nothing recent",  points: 0,  qualifier: "Review count is critically low — this is likely your biggest ranking gap" },
    },
  },
  {
    id: 3,
    category: "Citations & NAP",
    weight: 20,
    question: "Is your firm's name, address, and phone number consistent everywhere?",
    subtext: "Check Avvo, Justia, Yelp, Bing Places, FindLaw, and Martindale. Even small discrepancies suppress local rankings.",
    answers: {
      yes:     { label: "Yes — consistent across all directories", points: 20, qualifier: "Citation consistency needs audit across Avvo, Justia, Yelp, Bing, FindLaw" },
      partial: { label: "Mostly consistent, a few issues",          points: 8,  qualifier: "Citation inconsistencies exist and need to be cleaned up" },
      no:      { label: "Not sure / haven't checked",               points: 0,  qualifier: "Citations have never been audited — likely suppressing rankings" },
    },
  },
  {
    id: 4,
    category: "Map Pack Visibility",
    weight: 15,
    question: "Do you appear in the Google 3-Pack for your top practice area + city?",
    subtext: 'Search "[practice area] lawyer [city]" right now. Are you in the top 3 map results?',
    answers: {
      yes:     { label: "Yes — we show in the 3-pack",         points: 15, qualifier: "Map pack position needs to be maintained and expanded to more queries" },
      partial: { label: "Sometimes, depending on the search",  points: 6,  qualifier: "Map pack visibility is inconsistent across different searches" },
      no:      { label: "No — we don't appear",                points: 0,  qualifier: "Not in the map pack at all — this is your most urgent priority" },
    },
  },
  {
    id: 5,
    category: "Local Landing Pages",
    weight: 10,
    question: "Do you have dedicated city-specific landing pages with localized content?",
    subtext: "Pages targeting '[practice area] lawyer in [city]' with unique local content (not just city name swapped in).",
    answers: {
      yes:     { label: "Yes — real localized pages",           points: 10, qualifier: "Local landing pages could be expanded to more cities and practice areas" },
      partial: { label: "Generic pages with city names added",  points: 4,  qualifier: "Thin city pages need real localized content to rank" },
      no:      { label: "No dedicated local pages",             points: 0,  qualifier: "No local landing pages — leaving major keyword opportunities on the table" },
    },
  },
  {
    id: 6,
    category: "Review Responses",
    weight: 5,
    question: "Does someone at your firm respond to every Google review within a week?",
    subtext: "Responding to reviews signals engagement to Google and builds trust with prospects reading your profile.",
    answers: {
      yes:     { label: "Yes — we respond to every review",    points: 5, qualifier: "Review response process is working — keep it consistent" },
      partial: { label: "Sometimes, but not consistently",     points: 2, qualifier: "Review responses are inconsistent — need a defined process" },
      no:      { label: "No — reviews go unanswered",          points: 0, qualifier: "Reviews go unanswered — hurting trust signals" },
    },
  },
];

function getGrade(score: number): { letter: string; label: string; color: string } {
  if (score >= 85) return { letter: "A", label: "Map Pack Dominant", color: "#22c55e" };
  if (score >= 70) return { letter: "B", label: "Competitive",       color: "#84cc16" };
  if (score >= 50) return { letter: "C", label: "Needs Work",        color: "#f59e0b" };
  if (score >= 30) return { letter: "D", label: "Losing Cases",      color: "#f97316" };
  return                   { letter: "F", label: "Invisible",         color: "#ef4444" };
}

export default function LocalSeoScorecard() {
  const [phase, setPhase]               = useState<"quiz" | "score" | "capture" | "success">("quiz");
  const [currentQ, setCurrentQ]         = useState(0);
  const [answers, setAnswers]           = useState<StoredAnswer[]>([]);
  const [selectedKey, setSelectedKey]   = useState<AnswerKey | null>(null);
  const [displayScore, setDisplayScore] = useState(0);
  const [gradeVisible, setGradeVisible] = useState(false);

  // Lead form
  const [name, setName]           = useState("");
  const [email, setEmail]         = useState("");
  const [firmName, setFirmName]   = useState("");
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const totalScore = answers.reduce((sum, a) => sum + a.points, 0);
  const grade = getGrade(totalScore);

  const weakAreas = answers
    .filter((a) => a.points < QUESTIONS[a.qIndex].weight)
    .map((a) => QUESTIONS[a.qIndex].answers[a.key].qualifier);

  // Count-up animation when score phase begins
  useEffect(() => {
    if (phase !== "score") return;
    const target = totalScore;
    const steps = 40;
    const duration = 1200;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setDisplayScore(Math.round((target / steps) * step));
      if (step >= steps) {
        clearInterval(timer);
        setDisplayScore(target);
        setTimeout(() => setGradeVisible(true), 300);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [phase, totalScore]);

  function handleAnswer(key: AnswerKey) {
    setSelectedKey(key);
  }

  function handleNext() {
    if (!selectedKey) return;
    const newAnswer: StoredAnswer = {
      qIndex: currentQ,
      key: selectedKey,
      points: QUESTIONS[currentQ].answers[selectedKey].points,
    };
    const newAnswers = [...answers.filter((a) => a.qIndex !== currentQ), newAnswer];
    setAnswers(newAnswers);
    setSelectedKey(null);

    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setPhase("score");
    }
  }

  function handleBack() {
    if (currentQ === 0) return;
    setCurrentQ(currentQ - 1);
    const prev = answers.find((a) => a.qIndex === currentQ - 1);
    setSelectedKey(prev?.key ?? null);
  }

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("loading");

    const answerDetails = answers.map((a) => ({
      category:  QUESTIONS[a.qIndex].category,
      question:  QUESTIONS[a.qIndex].question,
      chosen:    QUESTIONS[a.qIndex].answers[a.key].label,
      points:    a.points,
      maxPoints: QUESTIONS[a.qIndex].weight,
    }));

    const res = await fetch("/api/scorecard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        firmName,
        score: totalScore,
        grade: grade.letter,
        gradeLabel: grade.label,
        weakAreas,
        answers: answerDetails,
      }),
    });

    setSubmitStatus(res.ok ? "success" : "error");
  };

  // ── Quiz Phase ──────────────────────────────────────────────────────────────
  if (phase === "quiz") {
    const q = QUESTIONS[currentQ];
    const progress = (currentQ / QUESTIONS.length) * 100;
    const existingAnswer = answers.find((a) => a.qIndex === currentQ);
    const activeKey = selectedKey ?? existingAnswer?.key ?? null;

    return (
      <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200">
        {/* Header */}
        <div className="px-8 py-5" style={{ background: "#1a1a1a" }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-400 text-xs font-heading font-bold uppercase tracking-widest">
              Question {currentQ + 1} of {QUESTIONS.length}
            </span>
            <span className="text-gray-400 text-xs">
              {QUESTIONS.length - currentQ - 1} remaining
            </span>
          </div>
          {/* Progress bar */}
          <div className="w-full h-1.5 rounded-full bg-gray-700">
            <div
              className="h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, background: "#EE6C13" }}
            />
          </div>
        </div>

        {/* Body */}
        <div className="bg-white px-8 py-8">
          {/* Category badge */}
          <span
            className="inline-block text-xs font-heading font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-5"
            style={{ background: "#EE6C1322", color: "#EE6C13" }}
          >
            {q.category}
          </span>

          <h3 className="font-heading font-extrabold text-gray-900 text-xl mb-2">
            {q.question}
          </h3>
          <p className="text-gray-500 text-sm mb-6 leading-relaxed">{q.subtext}</p>

          {/* Answer buttons */}
          <div className="space-y-3 mb-6">
            {(["yes", "partial", "no"] as AnswerKey[]).map((key) => {
              const answer = q.answers[key];
              const isSelected = activeKey === key;
              return (
                <button
                  key={key}
                  onClick={() => handleAnswer(key)}
                  className="w-full border-2 rounded-xl py-4 px-5 text-left transition-all"
                  style={
                    isSelected
                      ? { borderColor: "#EE6C13", background: "#EE6C13", color: "#fff" }
                      : { borderColor: "#e5e7eb", background: "#fff", color: "#374151" }
                  }
                >
                  <span className="font-semibold text-sm">{answer.label}</span>
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            {currentQ > 0 ? (
              <button
                onClick={handleBack}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                ← Back
              </button>
            ) : (
              <span />
            )}
            <button
              onClick={handleNext}
              disabled={!activeKey}
              className="font-heading font-bold text-white text-sm px-6 py-3 rounded-[40px] transition-opacity disabled:opacity-40 hover:opacity-90"
              style={{ background: "#EE6C13" }}
            >
              {currentQ < QUESTIONS.length - 1 ? "Next Question →" : "See My Score →"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Score Phase ─────────────────────────────────────────────────────────────
  if (phase === "score") {
    return (
      <div className="rounded-2xl overflow-hidden shadow-xl border-2" style={{ borderColor: "#EE6C13", background: "#1a1a1a" }}>
        <div className="px-8 py-10 text-center">
          <p className="text-gray-400 text-xs font-heading font-bold uppercase tracking-widest mb-4">
            Your Local SEO Score
          </p>

          {/* Animated score */}
          <div className="flex items-end justify-center gap-2 mb-2">
            <span
              className="font-heading font-extrabold leading-none"
              style={{ fontSize: "clamp(4rem, 16vw, 6rem)", color: "#EE6C13" }}
            >
              {displayScore}
            </span>
            <span className="text-gray-500 font-heading font-bold text-2xl mb-3">/100</span>
          </div>

          {/* Grade badge — fades in after count-up */}
          <div
            className={gradeVisible ? "animate-grade-pop" : "opacity-0"}
            style={{ display: "inline-block" }}
          >
            <span
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-heading font-extrabold text-white text-lg mb-6"
              style={{ background: grade.color }}
            >
              {grade.letter} — {grade.label}
            </span>
          </div>

          {/* Weak areas */}
          {weakAreas.length > 0 && (
            <div className="mt-6 mb-8 text-left">
              <p className="text-gray-400 text-xs font-heading font-bold uppercase tracking-widest mb-3">
                Gaps to Close
              </p>
              <div className="flex flex-wrap gap-2">
                {weakAreas.map((area, i) => (
                  <span
                    key={i}
                    className="bg-gray-800 text-gray-300 text-sm rounded-full px-3 py-1"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => setPhase("capture")}
            className="w-full font-heading font-extrabold text-white text-base py-4 rounded-[40px] transition-opacity hover:opacity-90 mt-2"
            style={{ background: "linear-gradient(135deg, #EE6C13, #982A0B)" }}
          >
            Get My Free Action Plan →
          </button>
          <p className="text-gray-600 text-xs mt-3">
            We&apos;ll send you a personalized fix for each gap we identified.
          </p>
        </div>
      </div>
    );
  }

  // ── Capture Phase ───────────────────────────────────────────────────────────
  if (phase === "capture") {
    return (
      <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200">
        {/* Header */}
        <div className="px-8 py-5" style={{ background: "#1a1a1a" }}>
          <div className="flex items-center gap-3">
            <span
              className="font-heading font-extrabold text-3xl"
              style={{ color: "#EE6C13" }}
            >
              {totalScore}
            </span>
            <span className="text-gray-500 font-heading">/100</span>
            <span
              className="ml-2 px-3 py-1 rounded-full text-white text-sm font-heading font-bold"
              style={{ background: grade.color }}
            >
              {grade.letter} — {grade.label}
            </span>
          </div>
          <p className="text-gray-400 text-sm mt-2">
            Enter your details and we&apos;ll send your personalized action plan.
          </p>
        </div>

        {/* Form body */}
        <div className="bg-white px-8 py-8">
          <form onSubmit={handleLeadSubmit} className="space-y-4">
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
              {submitStatus === "loading" ? "Sending…" : "Send My Action Plan →"}
            </button>
            <p className="text-center text-gray-400 text-xs">
              No spam. No sales pressure.
            </p>
          </form>
        </div>
      </div>
    );
  }

  // ── Success Phase ───────────────────────────────────────────────────────────
  return (
    <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200">
      <div className="bg-white px-8 py-12 text-center">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-5 text-white text-xl font-bold"
          style={{ background: "#EE6C13" }}
        >
          ✓
        </div>
        <h3 className="font-heading font-extrabold text-gray-900 text-xl mb-2">
          Check your inbox — action plan on its way.
        </h3>
        <p className="text-gray-500 text-sm mb-8 max-w-sm mx-auto">
          We&apos;ll walk through every gap we found and show you exactly what to fix first.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/contact/"
            className="font-heading font-bold text-white text-sm px-7 py-3.5 rounded-[40px] no-underline hover:opacity-90 transition-opacity"
            style={{ background: "#EE6C13" }}
          >
            Book a Strategy Call →
          </a>
          <a
            href="/services/pricing/"
            className="font-heading font-bold text-sm px-7 py-3.5 rounded-[40px] no-underline hover:opacity-90 transition-opacity border-2"
            style={{ borderColor: "#EE6C13", color: "#EE6C13" }}
          >
            See Pricing
          </a>
        </div>
      </div>
    </div>
  );
}
