"use client";
import { useState } from "react";
import { getHubSpotCookie } from "@/lib/hubspot-cookie";
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
  "Real Estate Law",
  "Business / Corporate",
  "Other",
];

const ATTORNEY_RANGES = ["5-10", "11-25", "26-50", "50+"];

const BUDGETS = [
  "Under $5K",
  "$5K-$10K",
  "$10K-$20K",
  "$20K+",
  "Not sure yet",
];

const GROWTH_GOALS = [
  "Sign more cases",
  "Dominate my market",
  "Expand to new locations",
  "Build a lasting brand",
  "All of the above",
];

export default function GrowthAssessmentForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    firmName: "",
    attorneys: "",
    practiceAreas: [] as string[],
    website: "",
    markets: "",
    budget: "",
    growthGoal: "",
    notes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCheckbox = (area: string) => {
    setFormData((prev) => ({
      ...prev,
      practiceAreas: prev.practiceAreas.includes(area)
        ? prev.practiceAreas.filter((a) => a !== area)
        : [...prev.practiceAreas, area],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.practiceAreas.length === 0) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/growth-assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          turnstileToken,
          hutk: getHubSpotCookie(),
          pageUri: window.location.href,
          pageName: document.title,
        }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold" style={{ background: "linear-gradient(135deg, #EE6C13, #982A0B)" }}>
          ✓
        </div>
        <h3 className="font-heading text-2xl font-bold text-gray-900 mb-3">Your application has been received.</h3>
        <p className="text-gray-600 mb-4">A senior strategist will reach out within one business day to schedule your Growth Strategy Session.</p>
        <p className="text-gray-500 text-sm">
          Prefer to call?{" "}
          <a href="tel:+18555936935" className="font-semibold no-underline" style={{ color: "#EE6C13" }}>(855) 593-6935</a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name *</label>
          <input
            type="text"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Firm Name *</label>
          <input
            type="text"
            name="firmName"
            required
            value={formData.firmName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email *</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone *</label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Number of Attorneys *</label>
          <select
            name="attorneys"
            required
            value={formData.attorneys}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
          >
            <option value="">Select range</option>
            {ATTORNEY_RANGES.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Monthly Marketing Budget *</label>
          <select
            name="budget"
            required
            value={formData.budget}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
          >
            <option value="">Select budget range</option>
            {BUDGETS.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Practice Area(s) *</label>
        <p className="text-xs text-gray-400 mb-3">Select all that apply.</p>
        <div className="grid grid-cols-2 gap-2">
          {PRACTICE_AREAS.map((area) => (
            <label key={area} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.practiceAreas.includes(area)}
                onChange={() => handleCheckbox(area)}
                className="rounded border-gray-300 text-orange-500 focus:ring-orange-400"
              />
              {area}
            </label>
          ))}
        </div>
        {formData.practiceAreas.length === 0 && status === "error" && (
          <p className="text-red-500 text-xs mt-1">Please select at least one practice area.</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Website</label>
        <input
          type="url"
          name="website"
          placeholder="https://yourfirm.com"
          value={formData.website}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Markets / Cities *</label>
        <input
          type="text"
          name="markets"
          required
          placeholder="e.g. Dallas, Houston, Austin"
          value={formData.markets}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Primary Growth Goal *</label>
        <select
          name="growthGoal"
          required
          value={formData.growthGoal}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
        >
          <option value="">Select your primary goal</option>
          {GROWTH_GOALS.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Anything else we should know?</label>
        <textarea
          name="notes"
          rows={3}
          value={formData.notes}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
          placeholder="Current marketing challenges, timeline, anything relevant..."
        />
      </div>

      {status === "error" && (
        <p className="text-red-600 text-sm">Something went wrong. Please try again or call (855) 593-6935.</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-4 rounded-[40px] font-heading font-bold text-white text-base disabled:opacity-60 transition-opacity"
        style={{ background: "linear-gradient(135deg, #EE6C13, #982A0B)" }}
      >
        {status === "loading" ? "Submitting..." : "Apply for a Growth Strategy Session"}
      </button>

      <TurnstileWidget onVerify={setTurnstileToken} />
      <p className="text-xs text-gray-500 text-center">No spam. A senior strategist will reach out within one business day.</p>
    </form>
  );
}
