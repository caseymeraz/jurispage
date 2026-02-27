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
        <a href="tel:+18887677447" className="font-heading font-bold text-lg no-underline" style={{ color: "#EE6C13" }}>
          (888) 767-7447
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
        ) : (
          <select
            name="practiceArea"
            value={formData.practiceArea}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:border-transparent focus:shadow-[0_0_0_3px_rgba(238,108,19,0.15)] bg-white"
            style={{ "--tw-ring-color": "#EE6C13" } as React.CSSProperties}
          >
            <option value="">Practice Area (optional)</option>
            {practiceAreaOptions.map((area) => (
              <option key={area} value={area}>{area}</option>
            ))}
          </select>
        )}

        {status === "error" && (
          <p className="text-red-600 text-sm">Something went wrong. Please try again or call (888) 767-7447.</p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full font-heading font-bold text-white text-sm py-3.5 rounded-[40px] transition-colors disabled:opacity-60"
          style={{ background: "#1a1a1a" }}
          onMouseOver={(e) => { if (status !== "loading") (e.currentTarget as HTMLButtonElement).style.background = "#333333"; }}
          onMouseOut={(e) => { if (status !== "loading") (e.currentTarget as HTMLButtonElement).style.background = "#1a1a1a"; }}
        >
          {status === "loading" ? "Sending..." : ctaLabel}
        </button>

        {subtext && (
          <p className="text-center text-xs text-gray-400">{subtext}</p>
        )}
      </form>
    </div>
  );
}
