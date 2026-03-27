"use client";

import { useState } from "react";
import Link from "next/link";

const O = "#EE6C13";

interface Question {
  question: string;
  subtext: string;
  options: { label: string; points: number }[];
}

const QUESTIONS: Question[] = [
  {
    question: "Does your website load in under 3 seconds on mobile?",
    subtext: "57% of visitors leave if a page takes longer than 3 seconds. Google penalizes slow sites in rankings.",
    options: [
      { label: "Yes, it loads fast", points: 15 },
      { label: "Not sure", points: 5 },
      { label: "No, it feels slow", points: 0 },
    ],
  },
  {
    question: "Is your phone number visible without scrolling on mobile?",
    subtext: "Click-to-call above the fold is the #1 conversion driver for mobile legal searches.",
    options: [
      { label: "Yes, prominently displayed", points: 15 },
      { label: "It's there but you have to look", points: 5 },
      { label: "No, or buried in the footer", points: 0 },
    ],
  },
  {
    question: "Do you have a dedicated page for each practice area you handle?",
    subtext: "One generic page listing everything ranks for nothing. Separate pages capture specific searches.",
    options: [
      { label: "Yes, every practice area has its own page", points: 15 },
      { label: "Some, but not all", points: 8 },
      { label: "Just one page that lists everything", points: 0 },
    ],
  },
  {
    question: "Are your attorney bio pages detailed with real credentials?",
    subtext: "Google's E-E-A-T framework evaluates attorney bios for bar admissions, case experience, and speaking credits.",
    options: [
      { label: "Yes, bar numbers, case experience, memberships", points: 15 },
      { label: "Basic info only (name, school, practice areas)", points: 5 },
      { label: "No bios or just a paragraph", points: 0 },
    ],
  },
  {
    question: "Has your website content been updated in the last 6 months?",
    subtext: "Stale content signals to Google that your site is not actively maintained. Competitors publishing monthly pull ahead.",
    options: [
      { label: "Yes, we publish regularly", points: 15 },
      { label: "Minor updates only", points: 5 },
      { label: "Not in over a year", points: 0 },
    ],
  },
  {
    question: "Do you know how many leads your website generated last month?",
    subtext: "If you can't measure it, you can't improve it. GA4 conversion tracking is table stakes.",
    options: [
      { label: "Yes, I track form fills and calls", points: 15 },
      { label: "I have analytics but don't check", points: 5 },
      { label: "No idea", points: 0 },
    ],
  },
  {
    question: "Do you own your website and domain, or does your agency control it?",
    subtext: "Agencies that host on proprietary platforms hold your site hostage. If you leave, your website disappears.",
    options: [
      { label: "I own everything (WordPress, domain, hosting)", points: 10 },
      { label: "I think so, but I'm not sure", points: 4 },
      { label: "My agency owns/controls it", points: 0 },
    ],
  },
];

const MAX_SCORE = QUESTIONS.reduce((sum, q) => sum + Math.max(...q.options.map((o) => o.points)), 0);

function getGrade(score: number): { letter: string; color: string; message: string } {
  const pct = score / MAX_SCORE;
  if (pct >= 0.85) return { letter: "A", color: "#27ae60", message: "Your website is in strong shape. Focus on content velocity and conversion optimization to pull further ahead." };
  if (pct >= 0.7) return { letter: "B", color: "#2980b9", message: "Good foundation with clear gaps. A few targeted fixes could significantly increase your case flow from organic search." };
  if (pct >= 0.5) return { letter: "C", color: "#e67e22", message: "Your website has meaningful problems that are costing you cases. Competitors with better sites are capturing clients that should be calling you." };
  if (pct >= 0.3) return { letter: "D", color: "#c0392b", message: "Your website is actively losing you cases. Referrals who Google your firm are seeing an outdated site and calling someone else." };
  return { letter: "F", color: "#c0392b", message: "Your website is a liability. Every day it stays in its current state, you are losing potential clients to firms with inferior legal skills but better websites." };
}

function getRecommendations(answers: number[]): string[] {
  const recs: string[] = [];
  if (answers[0] <= 5) recs.push("Your site speed needs immediate attention. Slow sites lose 57% of visitors and rank lower in Google.");
  if (answers[1] <= 5) recs.push("Add a click-to-call phone number above the fold on every page. This is the single highest-impact conversion change you can make.");
  if (answers[2] <= 8) recs.push("Build dedicated pages for each practice area. A 2,000+ word page targeting 'car accident lawyer [city]' captures searches a generic page never will.");
  if (answers[3] <= 5) recs.push("Upgrade your attorney bios with bar admissions, case experience, and professional credentials. Google evaluates these for E-E-A-T on legal sites.");
  if (answers[4] <= 5) recs.push("Start publishing 2-4 content pieces per month. Stale sites lose ground to competitors who publish consistently.");
  if (answers[5] <= 5) recs.push("Set up GA4 conversion tracking for phone calls and form submissions. You need to know which pages generate cases and which don't.");
  if (answers[6] <= 4) recs.push("Verify that you own your domain and hosting. If your agency controls access, you are one contract dispute away from losing your entire online presence.");
  return recs;
}

export default function WebsiteGrader() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [currentPick, setCurrentPick] = useState<number | null>(null);

  const isComplete = step >= QUESTIONS.length;
  const totalScore = answers.reduce((a, b) => a + b, 0);

  function handleNext() {
    if (currentPick === null) return;
    setAnswers([...answers, currentPick]);
    setCurrentPick(null);
    setStep(step + 1);
  }

  if (isComplete) {
    const grade = getGrade(totalScore);
    const recs = getRecommendations(answers);

    return (
      <div className="max-w-2xl mx-auto text-center">
        {/* Grade */}
        <div className="mb-8">
          <div
            className="inline-flex items-center justify-center w-28 h-28 rounded-full font-heading font-extrabold text-5xl text-white mb-4"
            style={{ background: grade.color }}
          >
            {grade.letter}
          </div>
          <div className="font-heading font-extrabold text-gray-900 text-2xl mb-2">
            Your Score: {totalScore} / {MAX_SCORE}
          </div>
          <p className="text-gray-600 text-sm leading-relaxed max-w-md mx-auto">{grade.message}</p>
        </div>

        {/* Recommendations */}
        {recs.length > 0 && (
          <div className="text-left bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <h3 className="font-heading font-bold text-gray-900 text-base mb-4">What to fix first:</h3>
            <div className="space-y-3">
              {recs.map((rec, i) => (
                <div key={i} className="flex gap-3 text-sm">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: O }}>
                    {i + 1}
                  </span>
                  <span className="text-gray-700 leading-relaxed">{rec}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="space-y-3">
          <Link
            href="/contact/"
            className="inline-block px-8 py-4 rounded-full text-white font-bold text-sm no-underline transition-opacity hover:opacity-90"
            style={{ background: O }}
          >
            Book a Free Website Review
          </Link>
          <p className="text-xs text-gray-400">We will audit your site and show you exactly what to fix. No contracts. No obligation.</p>
        </div>

        {/* Retake */}
        <button
          onClick={() => { setStep(0); setAnswers([]); setCurrentPick(null); }}
          className="mt-6 text-xs text-gray-400 underline hover:text-gray-600"
        >
          Retake the quiz
        </button>
      </div>
    );
  }

  const q = QUESTIONS[step];
  const progress = ((step) / QUESTIONS.length) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="flex items-center gap-3 mb-8">
        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: O }} />
        </div>
        <span className="text-xs text-gray-400 font-bold">{step + 1}/{QUESTIONS.length}</span>
      </div>

      {/* Question */}
      <h3 className="font-heading font-bold text-gray-900 text-xl mb-2">{q.question}</h3>
      <p className="text-gray-500 text-sm mb-6">{q.subtext}</p>

      {/* Options */}
      <div className="space-y-3 mb-8">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => setCurrentPick(opt.points)}
            className="w-full text-left px-5 py-4 rounded-xl border-2 transition-all text-sm font-medium"
            style={{
              borderColor: currentPick === opt.points ? O : "#e5e7eb",
              background: currentPick === opt.points ? O + "08" : "white",
              color: currentPick === opt.points ? "#1a1a2e" : "#374151",
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Next */}
      <button
        onClick={handleNext}
        disabled={currentPick === null}
        className="px-8 py-3 rounded-full font-bold text-sm text-white transition-opacity disabled:opacity-30"
        style={{ background: O }}
      >
        {step === QUESTIONS.length - 1 ? "See My Grade" : "Next Question"}
      </button>
    </div>
  );
}
