"use client";
import { useState } from "react";
import { getHubSpotCookie } from "@/lib/hubspot-cookie";

const practiceAreas = [
  "Personal Injury",
  "Criminal Defense",
  "Family Law / Divorce",
  "Immigration",
  "Estate Planning",
  "Employment Law",
  "Bankruptcy",
  "Workers' Compensation",
  "Social Security Disability",
  "Real Estate Law",
  "Medical Malpractice",
  "DUI / Traffic",
  "Business Law",
  "Other",
];

const budgets = [
  "Under $1,000/month",
  "$1,000–$2,000/month",
  "$2,000–$5,000/month",
  "$5,000+/month",
];

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    practiceArea: "",
    budget: "",
    referral: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
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
        <div className="text-5xl mb-4">✓</div>
        <h3 className="font-heading text-2xl font-bold text-gray-900 mb-3">We received your message!</h3>
        <p className="text-gray-600">We'll be in touch within one business day. No spam, no pressure.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">First Name *</label>
          <input
            type="text"
            name="firstName"
            required
            value={formData.firstName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Last Name *</label>
          <input
            type="text"
            name="lastName"
            required
            value={formData.lastName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Work Email *</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number *</label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Primary Practice Area *</label>
        <select
          name="practiceArea"
          required
          value={formData.practiceArea}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
        >
          <option value="">Select your practice area</option>
          {practiceAreas.map((area) => (
            <option key={area} value={area}>{area}</option>
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
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
        >
          <option value="">Select your budget range</option>
          {budgets.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">How did you hear about us?</label>
        <input
          type="text"
          name="referral"
          value={formData.referral}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tell us about your goals</label>
        <textarea
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
          placeholder="What are you trying to accomplish? What's not working with your current marketing?"
        />
      </div>
      {status === "error" && (
        <p className="text-red-600 text-sm">Something went wrong. Please try again or call (855) 593-6935.</p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-4 rounded-lg font-heading font-bold text-gray-900 text-base disabled:opacity-60 transition-opacity"
        style={{ background: "linear-gradient(135deg, #EE6C13, #982A0B)" }}
      >
        {status === "loading" ? "Sending..." : "Let\u2019s Talk Growth"}
      </button>
      <a
        href="https://maps.app.goo.gl/smpzUJfYEozJgomE8"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-1.5 text-xs text-gray-400 no-underline hover:text-gray-500 transition-colors"
      >
        <svg width="14" height="14" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/>
          <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/>
          <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"/>
          <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"/>
        </svg>
        <span className="text-yellow-400 text-xs leading-none">★★★★★</span>
        <span className="text-gray-600 font-semibold">4.9</span>
        <span>· 27 Google reviews</span>
      </a>
      <p className="text-xs text-gray-500 text-center">No spam. No long-term commitment required to chat.</p>
    </form>
  );
}
