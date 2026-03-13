"use client";

import { useState } from "react";
import TurnstileWidget from "@/components/TurnstileWidget";

interface TeaserContactFormProps {
  reportId: string;
  defaultName?: string;
  defaultEmail?: string;
  defaultPhone?: string;
}

const timeOptions = [
  "ASAP",
  "Morning",
  "Afternoon",
  "This Week",
  "Next Week",
];

export default function TeaserContactForm({
  reportId,
  defaultName = "",
  defaultEmail = "",
  defaultPhone = "",
}: TeaserContactFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [formData, setFormData] = useState({
    name: defaultName,
    email: defaultEmail,
    phone: defaultPhone,
    preferredTime: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/market-gap/strategy-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reportId, ...formData, turnstileToken }),
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
      <div
        className="rounded-xl p-6 border text-center"
        style={{ background: "#F0FDF4", borderColor: "rgba(34,197,94,0.2)" }}
      >
        <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-white" style={{ background: "#22c55e" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <p className="font-heading font-bold text-gray-900 text-base mb-1">
          Request Received
        </p>
        <p className="text-gray-600 text-sm leading-relaxed">
          We&apos;ll reach out within 24 hours to schedule your strategy call.
        </p>
      </div>
    );
  }

  return (
    <div
      className="rounded-xl p-6 border"
      style={{ background: "#FEF3EC", borderColor: "rgba(238,108,19,0.2)" }}
    >
      <h3 className="font-heading font-bold text-gray-900 text-lg mb-1">
        Get Your Full Strategy Report
      </h3>
      <p className="text-gray-600 text-sm mb-5 leading-relaxed">
        See exactly how to close these gaps with a free 15-min strategy call.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Name
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Email
            </label>
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
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Preferred Time
          </label>
          <select
            name="preferredTime"
            required
            value={formData.preferredTime}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
          >
            <option value="">Select a time preference</option>
            {timeOptions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        {status === "error" && (
          <p className="text-red-600 text-sm">
            Something went wrong. Please try again.
          </p>
        )}
        <TurnstileWidget onVerify={setTurnstileToken} />
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full py-3.5 rounded-lg font-heading font-bold text-white text-base disabled:opacity-60 transition-opacity"
          style={{ background: "#EE6C13" }}
        >
          {status === "loading" ? "Submitting..." : "Request My Strategy Call"}
        </button>
      </form>
    </div>
  );
}
