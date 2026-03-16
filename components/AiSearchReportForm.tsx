"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import TurnstileWidget from "@/components/TurnstileWidget";

const PRACTICE_AREAS = [
  "Personal Injury",
  "Criminal Defense",
  "Family Law",
  "Immigration",
  "Estate Planning",
  "Bankruptcy",
  "Employment Law",
  "DUI Defense",
  "Workers' Compensation",
  "Social Security Disability",
  "Medical Malpractice",
  "Real Estate Law",
  "Business / Corporate",
  "Other",
] as const;

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA",
  "HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
  "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
  "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY","DC",
] as const;

interface AiSearchResult {
  query: string;
  found: boolean;
  citedDomains: string[];
}

interface ReportResponse {
  reportId: string;
  practiceArea: string;
  city: string;
  state: string;
  firmDomain: string | null;
  queriesRun: number;
  queriesFound: number;
  results: AiSearchResult[];
}

type FormState = "idle" | "loading" | "results" | "rate-limited" | "error";

const inputClass =
  "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:border-transparent focus:shadow-[0_0_0_3px_rgba(238,108,19,0.15)]";

const labelClass = "block text-sm font-medium text-gray-700 mb-1";

const ringStyle = { "--tw-ring-color": "#EE6C13" } as React.CSSProperties;

export default function AiSearchReportForm() {
  const searchParams = useSearchParams();

  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [report, setReport] = useState<ReportResponse | null>(null);

  // Form fields
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [firmName, setFirmName] = useState("");
  const [website, setWebsite] = useState("https://");
  const [practiceArea, setPracticeArea] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormState("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/ai-search-report/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contactName,
          email,
          firmName,
          website,
          practiceArea,
          city,
          state,
          turnstileToken,
          utmSource: searchParams.get("utm_source") || undefined,
          utmMedium: searchParams.get("utm_medium") || undefined,
          utmCampaign: searchParams.get("utm_campaign") || undefined,
          utmTerm: searchParams.get("utm_term") || undefined,
          utmContent: searchParams.get("utm_content") || undefined,
          referrer: document.referrer || undefined,
        }),
      });

      if (res.status === 429) {
        setFormState("rate-limited");
        return;
      }

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong.");
      }

      const data: ReportResponse = await res.json();
      setReport(data);
      setFormState("results");
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
      setFormState("error");
    }
  }

  // ─── Rate Limited ────────────────────────────────────────────
  if (formState === "rate-limited") {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 text-center">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ background: "#FEF3EC" }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#EE6C13" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </div>
        <h3 className="font-heading font-bold text-xl text-gray-900 mb-2">
          You&apos;ve already run a report today
        </h3>
        <p className="text-gray-600 text-sm">
          Check back in 24 hours to run another AI search report.
        </p>
      </div>
    );
  }

  // ─── Results ─────────────────────────────────────────────────
  if (formState === "results" && report) {
    // Aggregate cited domains across all queries
    const domainCounts = new Map<string, number>();
    for (const result of report.results) {
      for (const domain of result.citedDomains) {
        domainCounts.set(domain, (domainCounts.get(domain) || 0) + 1);
      }
    }
    const rankedDomains = [...domainCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    const isOwnDomain = (domain: string) =>
      report.firmDomain && (domain.includes(report.firmDomain) || report.firmDomain.includes(domain));

    return (
      <div className="space-y-6">
        {/* Summary Banner */}
        <div
          className="rounded-2xl border p-8 text-center"
          style={{
            background: report.queriesFound > 0 ? "#f0fdf4" : "#fef2f2",
            borderColor: report.queriesFound > 0 ? "#bbf7d0" : "#fecaca",
          }}
        >
          <div className="text-4xl font-extrabold mb-2" style={{ color: report.queriesFound > 0 ? "#16a34a" : "#dc2626" }}>
            {report.queriesFound} of {report.queriesRun}
          </div>
          <p className="text-gray-700 font-medium">
            AI search queries cited your firm
          </p>
          <p className="text-gray-500 text-sm mt-1">
            {report.firmDomain} in {report.practiceArea}, {report.city}, {report.state}
          </p>
        </div>

        {/* Per-Query Results */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6">
          <h3 className="font-heading font-bold text-lg text-gray-900 mb-4">
            Query Results
          </h3>
          <div className="space-y-4">
            {report.results.map((result, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <div className="flex items-start gap-3 mb-3">
                  <span
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                    style={{
                      background: result.found ? "#dcfce7" : "#fee2e2",
                    }}
                  >
                    {result.found ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    )}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      &ldquo;{result.query}&rdquo;
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {result.found ? "Your firm was cited" : "Your firm was not cited"}
                    </p>
                  </div>
                </div>
                {result.citedDomains.length > 0 && (
                  <div className="ml-9">
                    <p className="text-xs font-medium text-gray-500 mb-1.5">Cited domains:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {result.citedDomains.map((domain, j) => (
                        <span
                          key={j}
                          className="inline-block text-xs px-2 py-0.5 rounded-full"
                          style={{
                            background: isOwnDomain(domain) ? "#dcfce7" : "#f3f4f6",
                            color: isOwnDomain(domain) ? "#16a34a" : "#6b7280",
                            fontWeight: isOwnDomain(domain) ? 600 : 400,
                          }}
                        >
                          {domain}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Who's Getting Cited */}
        {rankedDomains.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6">
            <h3 className="font-heading font-bold text-lg text-gray-900 mb-4">
              Who&apos;s Getting Cited by AI
            </h3>
            <div className="space-y-2">
              {rankedDomains.map(([domain, count], i) => (
                <div
                  key={domain}
                  className="flex items-center gap-3 py-2 px-3 rounded-lg"
                  style={{
                    background: isOwnDomain(domain) ? "#f0fdf4" : i % 2 === 0 ? "#f9fafb" : "transparent",
                  }}
                >
                  <span className="text-sm font-bold text-gray-400 w-6 text-right">
                    {i + 1}
                  </span>
                  <span
                    className="text-sm flex-1"
                    style={{
                      color: isOwnDomain(domain) ? "#16a34a" : "#374151",
                      fontWeight: isOwnDomain(domain) ? 600 : 400,
                    }}
                  >
                    {domain}
                    {isOwnDomain(domain) && (
                      <span className="text-xs ml-2 text-green-600">(your firm)</span>
                    )}
                  </span>
                  <span className="text-xs text-gray-500">
                    {count}/{report.queriesRun} queries
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 text-center">
          <h3 className="font-heading font-bold text-xl text-gray-900 mb-2">
            Want to improve your AI visibility?
          </h3>
          <p className="text-gray-600 text-sm mb-6">
            Get a full market gap analysis to see exactly where your firm stands, and what to fix first.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/see-my-market-gap"
              className="inline-block text-white font-bold py-3 px-8 rounded-[40px] text-sm transition-colors"
              style={{ background: "#EE6C13" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#982A0B")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#EE6C13")}
            >
              See My Full Market Gap
            </a>
            <a
              href="/contact"
              className="inline-block text-gray-700 font-bold py-3 px-8 rounded-[40px] text-sm border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              Talk to Our Team
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ─── Form ────────────────────────────────────────────────────
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8"
    >
      <h2 className="font-heading font-bold text-xl text-gray-900 mb-6 text-center">
        Check Your AI Search Visibility
      </h2>

      {formState === "error" && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="contactName" className={labelClass}>
            Your Name
          </label>
          <input
            id="contactName"
            type="text"
            required
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            className={inputClass}
            style={ringStyle}
            placeholder="Jane Smith"
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            style={ringStyle}
            placeholder="jane@smithlaw.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="firmName" className={labelClass}>
            Firm Name
          </label>
          <input
            id="firmName"
            type="text"
            required
            value={firmName}
            onChange={(e) => setFirmName(e.target.value)}
            className={inputClass}
            style={ringStyle}
            placeholder="Smith & Associates"
          />
        </div>
        <div>
          <label htmlFor="website" className={labelClass}>
            Website
          </label>
          <input
            id="website"
            type="text"
            required
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className={inputClass}
            style={ringStyle}
            placeholder="https://smithlaw.com"
          />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="practiceArea" className={labelClass}>
          Practice Area
        </label>
        <select
          id="practiceArea"
          required
          value={practiceArea}
          onChange={(e) => setPracticeArea(e.target.value)}
          className={inputClass}
          style={ringStyle}
        >
          <option value="">Select a practice area</option>
          {PRACTICE_AREAS.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="city" className={labelClass}>
            City
          </label>
          <input
            id="city"
            type="text"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className={inputClass}
            style={ringStyle}
            placeholder="Miami"
          />
        </div>
        <div>
          <label htmlFor="state" className={labelClass}>
            State
          </label>
          <select
            id="state"
            required
            value={state}
            onChange={(e) => setState(e.target.value)}
            className={inputClass}
            style={ringStyle}
          >
            <option value="">Select state</option>
            {US_STATES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={formState === "loading"}
        className="w-full text-white font-bold py-3.5 rounded-[40px] text-sm transition-colors disabled:opacity-60"
        style={{ background: "#EE6C13" }}
        onMouseEnter={(e) => {
          if (formState !== "loading") e.currentTarget.style.background = "#982A0B";
        }}
        onMouseLeave={(e) => {
          if (formState !== "loading") e.currentTarget.style.background = "#EE6C13";
        }}
      >
        {formState === "loading" ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Checking AI search visibility...
          </span>
        ) : (
          "Check My AI Visibility"
        )}
      </button>

      <TurnstileWidget onVerify={setTurnstileToken} />
      <p className="text-xs text-gray-400 text-center mt-3">
        One free report per email per day. No spam, ever.
      </p>
    </form>
  );
}
