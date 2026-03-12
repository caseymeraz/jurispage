"use client";
import { useState, useMemo } from "react";
import { getHubSpotCookie } from "@/lib/hubspot-cookie";

const BASE_PRICE = 2000;
const PER_ATTORNEY = 500;
const BIG_CITY_ADD = 1500;
const PI_CITY_ADD = 1000;
const CHATBOT_ADD = 299;
const LOGO_ONETIME = 999;

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

type CitySize = "small" | "medium" | "large";

function computeMonthly(
  attorneys: number,
  practiceArea: string,
  citySize: CitySize,
  chatbot: boolean
): number {
  const base =
    attorneys <= 2 ? BASE_PRICE : BASE_PRICE + (attorneys - 2) * PER_ATTORNEY;
  const bigCity = citySize === "large" ? BIG_CITY_ADD : 0;
  const piCity =
    practiceArea === "Personal Injury" && citySize !== "small" ? PI_CITY_ADD : 0;
  return base + bigCity + piCity + (chatbot ? CHATBOT_ADD : 0);
}

function buildBreakdown(
  attorneys: number,
  practiceArea: string,
  citySize: CitySize,
  chatbot: boolean,
  logo: boolean
): { label: string; amount: number; recurring: boolean }[] {
  const items: { label: string; amount: number; recurring: boolean }[] = [];
  const baseLabel =
    attorneys <= 2
      ? "Base rate (1–2 attorneys)"
      : `Base + ${attorneys - 2} additional ${attorneys - 2 === 1 ? "attorney" : "attorneys"}`;
  const baseAmount =
    attorneys <= 2 ? BASE_PRICE : BASE_PRICE + (attorneys - 2) * PER_ATTORNEY;
  items.push({ label: baseLabel, amount: baseAmount, recurring: true });
  if (citySize === "large")
    items.push({ label: "Major metro market (1M+ population)", amount: BIG_CITY_ADD, recurring: true });
  if (practiceArea === "Personal Injury" && citySize !== "small")
    items.push({ label: "Personal Injury competitive market", amount: PI_CITY_ADD, recurring: true });
  if (chatbot)
    items.push({ label: "AI Chatbot", amount: CHATBOT_ADD, recurring: true });
  if (logo)
    items.push({ label: "Custom Logo Design", amount: LOGO_ONETIME, recurring: false });
  return items;
}

export default function LaunchpadCalculator() {
  const [attorneys, setAttorneys] = useState(1);
  const [practiceArea, setPracticeArea] = useState("");
  const [citySize, setCitySize] = useState<CitySize>("small");
  const [chatbot, setChatbot] = useState(false);
  const [logo, setLogo] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const isCustom = attorneys > 4;

  const monthly = useMemo(
    () => (isCustom ? null : computeMonthly(attorneys, practiceArea, citySize, chatbot)),
    [attorneys, practiceArea, citySize, chatbot, isCustom]
  );
  const oneTime = logo ? LOGO_ONETIME : 0;

  const breakdown = useMemo(
    () => (isCustom ? [] : buildBreakdown(attorneys, practiceArea, citySize, chatbot, logo)),
    [attorneys, practiceArea, citySize, chatbot, logo, isCustom]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          attorneys,
          practiceArea: practiceArea || "Not specified",
          citySize,
          addons: { chatbot, logo },
          monthlyTotal: monthly,
          oneTimeTotal: oneTime,
          isCustom,
          hutk: getHubSpotCookie(),
          pageUri: window.location.href,
          pageName: document.title,
        }),
      });
      if (res.ok) setStatus("success");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    if (isCustom) {
      return (
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2" style={{ borderColor: "#EE6C13" }}>
          <div className="px-8 py-6 text-center" style={{ background: "#1a1a1a" }}>
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold text-2xl"
              style={{ background: "#EE6C13" }}
            >
              ✓
            </div>
            <h3 className="font-heading font-extrabold text-white text-2xl">You&apos;re in good hands.</h3>
            <p className="text-gray-400 text-sm mt-1">
              We&apos;ve notified the Juris Digital team. Expect a personal outreach within one business day.
            </p>
          </div>

          <div className="p-8">
            <p className="text-gray-600 leading-relaxed mb-4">
              With 5+ attorneys, your firm doesn&apos;t need a foundation. You need a full-service growth partner that can help you dominate your market, sign more cases, and build a lasting legacy.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              That&apos;s exactly what Juris Digital does. Same ownership, same data-driven approach, but built for established firms investing $5K–$20K+/month in growth.
            </p>

            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 mb-6">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">What Juris Digital Delivers</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  "Full-service SEO & content strategy",
                  "Google Ads management",
                  "Custom website design & development",
                  "Dedicated account strategist",
                  "Market domination strategy",
                  "Comprehensive monthly reporting",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="flex-shrink-0 font-bold text-sm" style={{ color: "#EE6C13" }}>✓</span>
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://jurisdigital.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center font-heading font-bold text-white py-3.5 px-6 rounded-[40px] no-underline"
                style={{ background: "#EE6C13" }}
              >
                Explore Juris Digital →
              </a>
              <a
                href="tel:+18555936935"
                className="flex-1 text-center font-heading font-bold py-3.5 px-6 rounded-[40px] no-underline border-2"
                style={{ borderColor: "#EE6C13", color: "#EE6C13" }}
              >
                (855) 593-6935
              </a>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2" style={{ borderColor: "#EE6C13" }}>
        <div className="px-8 py-6 text-center" style={{ background: "#1a1a1a" }}>
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold text-2xl"
            style={{ background: "#EE6C13" }}
          >
            ✓
          </div>
          <h3 className="font-heading font-extrabold text-white text-2xl">Your pricing estimate is on its way.</h3>
          <p className="text-gray-400 text-sm mt-1">Sent to {email}</p>
        </div>

        <div className="p-8">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Your Pricing Summary</p>
          <div className="space-y-2 mb-4">
            {breakdown.map((item) => (
              <div key={item.label} className="flex justify-between items-center text-sm py-1.5 border-b border-gray-100">
                <span className="text-gray-600">{item.label}</span>
                <span className="font-semibold text-gray-900">
                  ${item.amount.toLocaleString()}
                  <span className="text-gray-400 font-normal">{item.recurring ? "/mo" : " one-time"}</span>
                </span>
              </div>
            ))}
          </div>
          <div className="rounded-xl p-5 mt-4" style={{ background: "#1a1a1a" }}>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Monthly Total</p>
                <span className="font-heading font-extrabold text-4xl text-white">
                  ${monthly?.toLocaleString()}
                </span>
                <span className="text-gray-400 ml-1">/month</span>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Month-to-month</p>
                <p className="text-xs text-gray-500">No long-term contract</p>
                <p className="text-xs text-gray-500">90-day guarantee</p>
              </div>
            </div>
            {oneTime > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-700 flex justify-between items-center">
                <span className="text-gray-400 text-sm">One-time setup</span>
                <span className="text-white font-semibold">${oneTime.toLocaleString()}</span>
              </div>
            )}
          </div>
          <p className="text-gray-500 text-xs mt-3 text-center">
            This estimate is based on the info you provided. Book a brief strategy call to confirm this pricing aligns with your firm&apos;s growth goals.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a
              href="/contact/"
              className="flex-1 text-center font-heading font-bold text-white py-3.5 px-6 rounded-[40px] no-underline"
              style={{ background: "#EE6C13" }}
            >
              Book a Free Strategy Call
            </a>
            <a
              href="tel:+18555936935"
              className="flex-1 text-center font-heading font-bold py-3.5 px-6 rounded-[40px] no-underline border-2"
              style={{ borderColor: "#EE6C13", color: "#EE6C13" }}
            >
              (855) 593-6935
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
      <div className="px-8 py-6" style={{ background: "#1a1a1a" }}>
        <h3 className="font-heading font-extrabold text-white text-xl mb-1">Get Your Instant Pricing</h3>
        <p className="text-gray-400 text-sm">Answer a few questions, then enter your details to see your pricing.</p>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-8">

        {/* Step 1 */}
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-1">
            How many attorneys are at your firm?
          </label>
          <p className="text-xs text-gray-400 mb-3">Count all active attorneys, including yourself.</p>
          <select
            value={attorneys}
            onChange={(e) => setAttorneys(Number(e.target.value))}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none bg-white"
          >
            <option value={1}>1 attorney</option>
            <option value={2}>2 attorneys</option>
            <option value={3}>3 attorneys</option>
            <option value={4}>4 attorneys</option>
            <option value={5}>5+ attorneys</option>
          </select>
          {isCustom && (
            <p className="text-sm text-gray-500 mt-3 p-3 rounded-lg bg-gray-50">
              With 5 or more attorneys, your firm has outgrown a foundation package. You need a full-service growth partner. Fill in your details below and our Juris Digital team will reach out within one business day.
            </p>
          )}
        </div>

        {/* Step 2 */}
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-3">
            What&apos;s your primary practice area?
          </label>
          <select
            value={practiceArea}
            onChange={(e) => setPracticeArea(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none bg-white"
          >
            <option value="">Select your practice area</option>
            {PRACTICE_AREAS.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>

        {/* Step 3 */}
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-1">
            What&apos;s the population of your target city?
          </label>
          <p className="text-xs text-gray-400 mb-3">Larger markets require more competitive campaigns.</p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: "small" as CitySize, label: "Under 100K", sub: "Smaller markets" },
              { value: "medium" as CitySize, label: "100K – 1M", sub: "Mid-size cities" },
              { value: "large" as CitySize, label: "Over 1M", sub: "Major metros" },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setCitySize(opt.value)}
                className="p-3 rounded-xl border-2 text-left transition-all"
                style={
                  citySize === opt.value
                    ? { background: "#EE6C13", borderColor: "#EE6C13" }
                    : { background: "#fff", borderColor: "#e5e7eb" }
                }
              >
                <div
                  className="text-sm font-bold"
                  style={{ color: citySize === opt.value ? "#fff" : "#1f2937" }}
                >
                  {opt.label}
                </div>
                <div
                  className="text-xs mt-0.5"
                  style={{ color: citySize === opt.value ? "rgba(255,255,255,0.7)" : "#6b7280" }}
                >
                  {opt.sub}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Add-ons */}
        {!isCustom && (
          <div>
            <p className="text-sm font-bold text-gray-800 mb-1">Optional add-ons</p>
            <p className="text-xs text-gray-400 mb-3">Enhance your campaign with these high-impact extras.</p>
            <div className="space-y-3">
              {[
                {
                  key: "chatbot",
                  checked: chatbot,
                  toggle: () => setChatbot((v) => !v),
                  label: "AI Lead Capture Chatbot",
                  price: "+$299/mo",
                  desc: "A 24/7 chatbot trained on your firm's practice areas. It answers questions, qualifies visitors, and routes hot leads directly to you, even at 2am.",
                },
                {
                  key: "logo",
                  checked: logo,
                  toggle: () => setLogo((v) => !v),
                  label: "Custom Logo & Brand Design",
                  price: "+$999 one-time",
                  desc: "A professionally designed logo, color palette, and typography system for your firm. Delivered within 10 business days.",
                },
              ].map((addon) => (
                <label
                  key={addon.key}
                  className="flex gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all"
                  style={
                    addon.checked
                      ? { background: "#FEF3EC", borderColor: "#EE6C13" }
                      : { background: "#fff", borderColor: "#e5e7eb" }
                  }
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <input
                      type="checkbox"
                      checked={addon.checked}
                      onChange={addon.toggle}
                      className="w-4 h-4 rounded"
                      style={{ accentColor: "#EE6C13" }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-sm font-bold text-gray-900">{addon.label}</span>
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                        style={{ background: "#EE6C13" }}
                      >
                        {addon.price}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">{addon.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Locked price teaser */}
        <div className="rounded-xl p-5 border-2 border-dashed border-gray-200 text-center">
          <div className="text-2xl mb-2">{isCustom ? "🚀" : "🔒"}</div>
          <p className="font-heading font-bold text-gray-800 text-base mb-1">
            {isCustom ? "You're ready for Juris Digital." : "Your pricing is ready."}
          </p>
          <p className="text-sm text-gray-500">
            {isCustom
              ? "Enter your name and email below and our Juris Digital team will reach out within one business day with a custom strategy."
              : "Enter your name and email below to reveal your price."}
          </p>
        </div>

        {/* Contact */}
        <div>
          <p className="text-sm font-bold text-gray-800 mb-3">
            Where should we send your pricing?
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Your full name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-orange-400"
            />
            <input
              type="email"
              placeholder="Your email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-orange-400"
            />
          </div>
        </div>

        {status === "error" && (
          <p className="text-red-600 text-sm">
            Something went wrong. Please try again or call{" "}
            <a href="tel:+18555936935" className="underline">(855) 593-6935</a>.
          </p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full font-heading font-bold text-white text-base py-4 rounded-[40px] transition-opacity disabled:opacity-60"
          style={{ background: "#EE6C13" }}
        >
          {status === "loading"
            ? "Sending..."
            : isCustom
            ? "Connect with Juris Digital →"
            : "Get My Instant Pricing →"}
        </button>

        <p className="text-center text-xs text-gray-400">
          No commitment required. No spam. Just your pricing.
        </p>
      </form>
    </div>
  );
}
