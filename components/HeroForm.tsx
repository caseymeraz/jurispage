"use client";
import { useState } from "react";

const practiceAreaOptions = [
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
];

interface HeroFormProps {
  ctaLabel: string;
  subtext?: string;
  defaultPracticeArea?: string;
  formType?: "standard" | "competitive";
}

export default function HeroForm({
  ctaLabel,
  subtext = "No contracts. No commitment.",
  defaultPracticeArea = "",
  formType = "standard",
}: HeroFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    practiceArea: defaultPracticeArea,
    firmName: "",
    targetMarket: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const endpoint = formType === "competitive" ? "/api/market-report" : "/api/contact";
      const payload =
        formType === "competitive"
          ? formData
          : {
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              phone: formData.phone,
              practiceArea: formData.practiceArea,
              budget: "Not Specified",
            };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
      <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 text-center">
        <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl" style={{ background: "#EE6C13" }}>
          ✓
        </div>
        <h3 className="font-heading font-bold text-gray-900 text-xl mb-2">We&apos;ll be in touch shortly.</h3>
        <p className="text-gray-600 text-sm mb-3">Expect a response within one business day.</p>
        <a href="tel:+18555936935" className="font-heading font-bold text-lg no-underline" style={{ color: "#EE6C13" }}>
          (855) 593-6935
        </a>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {formType === "competitive" && (
          <div>
            <input
              type="text"
              name="firmName"
              placeholder="Law Firm Name"
              required
              value={formData.firmName}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:border-transparent focus:shadow-[0_0_0_3px_rgba(238,108,19,0.15)]"
              style={{ "--tw-ring-color": "#EE6C13" } as React.CSSProperties}
            />
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            required
            value={formData.firstName}
            onChange={handleChange}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:border-transparent focus:shadow-[0_0_0_3px_rgba(238,108,19,0.15)]"
            style={{ "--tw-ring-color": "#EE6C13" } as React.CSSProperties}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:border-transparent focus:shadow-[0_0_0_3px_rgba(238,108,19,0.15)]"
            style={{ "--tw-ring-color": "#EE6C13" } as React.CSSProperties}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:border-transparent focus:shadow-[0_0_0_3px_rgba(238,108,19,0.15)]"
            style={{ "--tw-ring-color": "#EE6C13" } as React.CSSProperties}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            required
            value={formData.phone}
            onChange={handleChange}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:border-transparent focus:shadow-[0_0_0_3px_rgba(238,108,19,0.15)]"
            style={{ "--tw-ring-color": "#EE6C13" } as React.CSSProperties}
          />
        </div>

        {formType === "competitive" ? (
          <div className="grid grid-cols-2 gap-3">
            <select
              name="practiceArea"
              required
              value={formData.practiceArea}
              onChange={handleChange}
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:border-transparent focus:shadow-[0_0_0_3px_rgba(238,108,19,0.15)] bg-white"
              style={{ "--tw-ring-color": "#EE6C13" } as React.CSSProperties}
            >
              <option value="">Practice Area</option>
              {practiceAreaOptions.map((area) => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
            <input
              type="text"
              name="targetMarket"
              placeholder="Target City / State"
              required
              value={formData.targetMarket}
              onChange={handleChange}
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:border-transparent focus:shadow-[0_0_0_3px_rgba(238,108,19,0.15)]"
              style={{ "--tw-ring-color": "#EE6C13" } as React.CSSProperties}
            />
          </div>
        ) : null}

        {status === "error" && (
          <p className="text-red-600 text-sm">Something went wrong. Please try again or call (855) 593-6935.</p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full font-heading font-bold text-white text-sm py-3.5 rounded-[40px] transition-colors disabled:opacity-60"
          style={{ background: "#EE6C13" }}
          onMouseOver={(e) => { if (status !== "loading") (e.currentTarget as HTMLButtonElement).style.background = "#d45e0a"; }}
          onMouseOut={(e) => { if (status !== "loading") (e.currentTarget as HTMLButtonElement).style.background = "#EE6C13"; }}
        >
          {status === "loading" ? "Sending..." : ctaLabel}
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

        {subtext && (
          <p className="text-center text-xs text-gray-400">{subtext}</p>
        )}
      </form>
    </div>
  );
}
