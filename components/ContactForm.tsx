"use client";
import { useState } from "react";

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
        body: JSON.stringify(formData),
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
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-400"
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
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-400"
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
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-400"
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
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-400"
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
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-white"
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
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-white"
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
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tell us about your goals</label>
        <textarea
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none"
          placeholder="What are you trying to accomplish? What's not working with your current marketing?"
        />
      </div>
      {status === "error" && (
        <p className="text-red-600 text-sm">Something went wrong. Please try again or call (888) 767-7447.</p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-4 rounded-lg font-heading font-bold text-gray-900 text-base disabled:opacity-60 transition-opacity"
        style={{ background: "linear-gradient(135deg, #EE6C13, #982A0B)" }}
      >
        {status === "loading" ? "Sending..." : "Get My Free Marketing Plan"}
      </button>
      <p className="text-xs text-gray-500 text-center">No spam. No long-term commitment required to chat.</p>
    </form>
  );
}
