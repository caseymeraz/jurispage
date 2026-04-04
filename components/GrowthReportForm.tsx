"use client";

import { useState } from "react";
import { getHubSpotCookie } from "@/lib/hubspot-cookie";
import TurnstileWidget from "@/components/TurnstileWidget";

/* ─── Option data ─── */

const PRACTICE_AREAS = [
  "Personal Injury", "Criminal Defense", "Family Law", "Immigration",
  "Employment Law", "Estate Planning", "Bankruptcy", "DUI Defense",
  "Workers' Compensation", "Social Security Disability",
  "Business / Corporate", "Real Estate Law", "Other",
];

const CASE_SOURCES = [
  "Referrals", "Google Ads", "Organic / SEO", "Social Media",
  "Directories (Avvo, FindLaw, etc.)", "Word of Mouth",
  "Court Appointments", "Other",
];

const PRIMARY_GOALS = [
  "More cases in general",
  "Better quality / higher-value cases",
  "More visibility on Google (I'm not showing up)",
  "A website that actually brings in clients",
  "Replace my current agency (it's not working)",
  "I'm starting from scratch and need everything",
];

const TWO_YEAR_VISIONS = [
  "Roughly the same size, just more profitable",
  "1-2 new attorneys hired",
  "New office location(s) opened",
  "Moved to a CEO/management role (less day-to-day lawyering)",
  "Expanded into new practice areas",
  "Expanded into new geographic markets",
  "I want to stay solo but cherry-pick the best cases",
];

const FRUSTRATIONS = [
  "I'm not getting enough cases from the internet",
  "I'm spending money on marketing but not seeing results",
  "My current agency doesn't communicate or show me what they're doing",
  "I'm doing my own marketing and it's taking up too much time",
  "I'm getting leads but they're low quality / wrong practice area",
  "I don't even have a real online presence yet",
];

/* ─── Form state type ─── */

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  firmName: string;
  website: string;
  noWebsite: boolean;
  city: string;
  state: string;
  attorneys: string;
  practiceAreas: string[];
  casesPerMonth: string;
  caseSources: string[];
  avgCaseValue: string;
  hasAgency: string;
  hasGoogleAds: string;
  primaryGoal: string;
  targetCases: string;
  twoYearVision: string[];
  budget: string;
  biggestFrustration: string;
  notes: string;
}

const INITIAL: FormData = {
  fullName: "", email: "", phone: "", firmName: "", website: "",
  noWebsite: false, city: "", state: "", attorneys: "",
  practiceAreas: [], casesPerMonth: "", caseSources: [], avgCaseValue: "",
  hasAgency: "", hasGoogleAds: "", primaryGoal: "", targetCases: "",
  twoYearVision: [], budget: "", biggestFrustration: "", notes: "",
};

const STEPS = ["About Your Firm", "Where You Are Now", "Where You Want to Be", "What's Not Working"];

/* ─── Component ─── */

export default function GrowthReportForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(INITIAL);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [turnstileToken, setTurnstileToken] = useState("");

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setData((prev) => ({ ...prev, [key]: value }));

  const toggleArray = (key: "practiceAreas" | "caseSources" | "twoYearVision", value: string) => {
    setData((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }));
  };

  /* ─── Validation per step ─── */
  const canProceed = () => {
    switch (step) {
      case 0: return data.fullName && data.email && data.firmName && data.city && data.state && data.attorneys && data.practiceAreas.length > 0;
      case 1: return data.casesPerMonth && data.caseSources.length > 0 && data.avgCaseValue;
      case 2: return data.primaryGoal && data.budget;
      case 3: return data.biggestFrustration;
      default: return true;
    }
  };

  const handleSubmit = async () => {
    if (!turnstileToken) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/growth-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          turnstileToken,
          hutk: getHubSpotCookie(),
          pageUri: window.location.href,
          pageName: document.title,
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  /* ─── Success state ─── */
  if (status === "success") {
    return (
      <div className="text-center py-16 px-6">
        <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ background: "linear-gradient(135deg, #EE6C13, #982A0B)" }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-4">We&apos;re Building Your Growth Report</h2>
        <p className="text-gray-600 text-lg max-w-md mx-auto mb-2">
          A senior strategist is reviewing your answers and researching your market right now.
        </p>
        <p className="text-gray-600 text-lg max-w-md mx-auto mb-8">
          Your personalized growth report will be in your inbox within <strong>24 hours</strong>.
        </p>
        <div className="bg-gray-50 rounded-xl p-6 max-w-sm mx-auto border border-gray-200">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">What happens next</p>
          <ol className="text-sm text-gray-600 text-left space-y-2">
            <li className="flex gap-2"><span className="font-bold text-[#EE6C13]">1.</span> We research your market, competitors, and keywords</li>
            <li className="flex gap-2"><span className="font-bold text-[#EE6C13]">2.</span> You receive your growth report via email</li>
            <li className="flex gap-2"><span className="font-bold text-[#EE6C13]">3.</span> We schedule a call to walk through it together</li>
          </ol>
        </div>
      </div>
    );
  }

  /* ─── Shared UI helpers ─── */

  const RadioGroup = ({ name, options, value }: { name: keyof FormData; options: string[]; value: string }) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => set(name, opt)}
          className={`px-4 py-3 rounded-lg text-sm font-medium border-2 transition-all text-left ${
            value === opt
              ? "border-[#EE6C13] bg-orange-50 text-[#982A0B]"
              : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );

  const CheckboxGroup = ({ name, options, values }: { name: "practiceAreas" | "caseSources" | "twoYearVision"; options: string[]; values: string[] }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => toggleArray(name, opt)}
          className={`px-4 py-3 rounded-lg text-sm font-medium border-2 transition-all text-left flex items-center gap-2 ${
            values.includes(opt)
              ? "border-[#EE6C13] bg-orange-50 text-[#982A0B]"
              : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
          }`}
        >
          <span className={`w-4 h-4 rounded flex-shrink-0 border-2 flex items-center justify-center ${
            values.includes(opt) ? "border-[#EE6C13] bg-[#EE6C13]" : "border-gray-300"
          }`}>
            {values.includes(opt) && <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
          </span>
          {opt}
        </button>
      ))}
    </div>
  );

  const SingleSelect = ({ name, options, value }: { name: keyof FormData; options: string[]; value: string }) => (
    <div className="space-y-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => set(name, opt)}
          className={`w-full px-5 py-4 rounded-lg text-sm font-medium border-2 transition-all text-left flex items-center gap-3 ${
            value === opt
              ? "border-[#EE6C13] bg-orange-50 text-[#982A0B]"
              : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
          }`}
        >
          <span className={`w-5 h-5 rounded-full flex-shrink-0 border-2 flex items-center justify-center ${
            value === opt ? "border-[#EE6C13]" : "border-gray-300"
          }`}>
            {value === opt && <span className="w-2.5 h-2.5 rounded-full bg-[#EE6C13]" />}
          </span>
          {opt}
        </button>
      ))}
    </div>
  );

  const Label = ({ children }: { children: React.ReactNode }) => (
    <label className="block text-sm font-semibold text-gray-800 mb-2">{children}</label>
  );

  const Input = ({ name, type = "text", placeholder, required }: { name: keyof FormData; type?: string; placeholder?: string; required?: boolean }) => (
    <input
      type={type}
      name={name}
      value={data[name] as string}
      onChange={(e) => set(name, e.target.value)}
      placeholder={placeholder}
      required={required}
      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 text-gray-900 text-sm focus:border-[#EE6C13] focus:ring-0 focus:outline-none transition-colors"
    />
  );

  return (
    <div className="max-w-2xl mx-auto">
      {/* ─── Progress bar ─── */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                i <= step
                  ? "bg-[#EE6C13] text-white"
                  : "bg-gray-200 text-gray-500"
              }`}>
                {i < step ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                ) : i + 1}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${i <= step ? "text-gray-900" : "text-gray-400"}`}>
                {label}
              </span>
            </div>
          ))}
        </div>
        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%`, background: "linear-gradient(135deg, #EE6C13, #982A0B)" }}
          />
        </div>
      </div>

      {/* ─── Step content ─── */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (step < 3) setStep(step + 1);
          else handleSubmit();
        }}
      >
        {/* Step 1: About Your Firm */}
        {step === 0 && (
          <div className="space-y-5">
            <h3 className="font-heading font-extrabold text-gray-900 text-2xl mb-1">Tell us about your firm</h3>
            <p className="text-gray-500 text-sm mb-6">We use this to research your market and build a report specific to your practice.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><Label>Full Name *</Label><Input name="fullName" placeholder="Jane Smith" required /></div>
              <div><Label>Email *</Label><Input name="email" type="email" placeholder="jane@yourfirm.com" required /></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><Label>Phone</Label><Input name="phone" type="tel" placeholder="(555) 123-4567" /></div>
              <div><Label>Firm Name *</Label><Input name="firmName" placeholder="Smith & Associates" required /></div>
            </div>
            <div>
              <Label>Website</Label>
              {data.noWebsite ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500 italic">No website yet</span>
                  <button type="button" onClick={() => set("noWebsite", false)} className="text-xs text-[#EE6C13] font-semibold underline">I do have one</button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Input name="website" placeholder="https://www.yourfirm.com" />
                  <button type="button" onClick={() => { set("noWebsite", true); set("website", ""); }} className="text-xs text-gray-500 whitespace-nowrap underline">No website</button>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>City *</Label><Input name="city" placeholder="Los Angeles" required /></div>
              <div><Label>State *</Label><Input name="state" placeholder="California" required /></div>
            </div>
            <div>
              <Label>How many attorneys at your firm? *</Label>
              <RadioGroup name="attorneys" options={["1 (solo)", "2-4", "5-9", "10+"]} value={data.attorneys} />
            </div>
            <div>
              <Label>Primary practice areas *</Label>
              <CheckboxGroup name="practiceAreas" options={PRACTICE_AREAS} values={data.practiceAreas} />
            </div>
          </div>
        )}

        {/* Step 2: Where You Are Now */}
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="font-heading font-extrabold text-gray-900 text-2xl mb-1">Where you are now</h3>
            <p className="text-gray-500 text-sm mb-6">This helps us understand your starting point so the report is realistic, not generic.</p>

            <div>
              <Label>How many new cases are you signing per month? *</Label>
              <RadioGroup name="casesPerMonth" options={["0-2", "3-5", "6-10", "11-20", "21-50", "50+"]} value={data.casesPerMonth} />
            </div>
            <div>
              <Label>Where are most of your cases coming from today? *</Label>
              <CheckboxGroup name="caseSources" options={CASE_SOURCES} values={data.caseSources} />
            </div>
            <div>
              <Label>What's your average case value? *</Label>
              <RadioGroup name="avgCaseValue" options={["$1K-$5K", "$5K-$15K", "$15K-$50K", "$50K-$100K", "$100K+"]} value={data.avgCaseValue} />
            </div>
            <div>
              <Label>Are you currently working with a marketing agency?</Label>
              <RadioGroup name="hasAgency" options={["Yes", "No", "I was, but it didn't work out"]} value={data.hasAgency} />
            </div>
            <div>
              <Label>Are you running Google Ads right now?</Label>
              <RadioGroup name="hasGoogleAds" options={["Yes", "No", "I tried but stopped"]} value={data.hasGoogleAds} />
            </div>
          </div>
        )}

        {/* Step 3: Where You Want to Be */}
        {step === 2 && (
          <div className="space-y-6">
            <h3 className="font-heading font-extrabold text-gray-900 text-2xl mb-1">Where you want to be</h3>
            <p className="text-gray-500 text-sm mb-6">This shapes the recommendations in your growth report.</p>

            <div>
              <Label>What&apos;s the #1 thing you want from your marketing? *</Label>
              <SingleSelect name="primaryGoal" options={PRIMARY_GOALS} value={data.primaryGoal} />
            </div>
            <div>
              <Label>How many new cases per month would make a real difference?</Label>
              <Input name="targetCases" type="number" placeholder="e.g., 10" />
            </div>
            <div>
              <Label>What does your firm look like 2 years from now?</Label>
              <CheckboxGroup name="twoYearVision" options={TWO_YEAR_VISIONS} values={data.twoYearVision} />
            </div>
            <div>
              <Label>Do you have a monthly marketing budget in mind? *</Label>
              <RadioGroup name="budget" options={["Under $2K", "$2K-$5K", "$5K-$10K", "$10K-$20K", "$20K+", "Not sure yet"]} value={data.budget} />
            </div>
          </div>
        )}

        {/* Step 4: What's Not Working */}
        {step === 3 && (
          <div className="space-y-6">
            <h3 className="font-heading font-extrabold text-gray-900 text-2xl mb-1">What&apos;s not working</h3>
            <p className="text-gray-500 text-sm mb-6">This helps us personalize your report and focus on what matters most.</p>

            <div>
              <Label>What&apos;s your biggest frustration right now? *</Label>
              <SingleSelect name="biggestFrustration" options={FRUSTRATIONS} value={data.biggestFrustration} />
            </div>
            <div>
              <Label>Anything else you want us to know?</Label>
              <textarea
                name="notes"
                value={data.notes}
                onChange={(e) => set("notes", e.target.value)}
                placeholder="Tell us anything else that would help us build a better report for you..."
                rows={4}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 text-gray-900 text-sm focus:border-[#EE6C13] focus:ring-0 focus:outline-none transition-colors resize-none"
              />
            </div>
            <TurnstileWidget onVerify={setTurnstileToken} />
          </div>
        )}

        {/* ─── Navigation buttons ─── */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              Back
            </button>
          ) : <div />}

          <button
            type="submit"
            disabled={!canProceed() || (step === 3 && !turnstileToken) || status === "loading"}
            className="font-heading font-bold text-white text-base px-8 py-4 rounded-full transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 shadow-lg shadow-orange-200"
            style={{ background: canProceed() ? "linear-gradient(135deg, #EE6C13, #982A0B)" : "#d1d5db" }}
          >
            {status === "loading" ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                Submitting...
              </span>
            ) : step < 3 ? (
              <span className="flex items-center gap-1">
                Next
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
            ) : "Get My Growth Report"}
          </button>
        </div>

        {status === "error" && (
          <p className="text-red-600 text-sm text-center mt-4">Something went wrong. Please try again or call us at (855) 593-6935.</p>
        )}
      </form>
    </div>
  );
}
