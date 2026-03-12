"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  loadGoogleMapsScript,
  extractPlaceDetails,
  type PlaceResult,
} from "@/lib/google-places";
import { trackClientEvent } from "@/lib/analytics";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

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

type PracticeArea = (typeof PRACTICE_AREAS)[number];

const AVG_CASE_VALUES = ["$1K-5K", "$5K-15K", "$15K-50K", "$50K+"] as const;

const MONTHLY_LEAD_VOLUMES = [
  "Under 10",
  "10-25",
  "25-50",
  "50-100",
  "100+",
] as const;

const AVG_RESPONSE_TIMES = [
  "Under 5 min",
  "5-15 min",
  "15-60 min",
  "1-3 hrs",
  "3+ hrs",
] as const;

const COUNTRIES = ["United States", "Canada"] as const;

interface Step1Data {
  email: string;
  firmName: string;
  placeId: string;
  formattedAddress: string;
  website: string;
  phone: string;
  lat?: number;
  lng?: number;
}

interface Step2Data {
  primaryPracticeArea: PracticeArea | "";
  targetCity: string;
  targetState: string;
  country: (typeof COUNTRIES)[number];
  secondaryPracticeArea: PracticeArea | "";
  isNewFirm: boolean;
}

interface Step3Data {
  avgCaseValue: (typeof AVG_CASE_VALUES)[number] | "";
  monthlyLeadVolume: (typeof MONTHLY_LEAD_VOLUMES)[number] | "";
  avgResponseTime: (typeof AVG_RESPONSE_TIMES)[number] | "";
  afterHoursCoverage: boolean;
  crmService: string;
}

interface FieldErrors {
  [field: string]: string;
}

/* ------------------------------------------------------------------ */
/*  Shared styles                                                      */
/* ------------------------------------------------------------------ */

const INPUT_CLS =
  "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:border-transparent focus:shadow-[0_0_0_3px_rgba(238,108,19,0.15)]";

const RING_STYLE = { "--tw-ring-color": "#EE6C13" } as React.CSSProperties;

const LABEL_CLS = "block text-sm font-medium text-gray-700 mb-1";

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function MarketGapForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  /* ----- state ------------------------------------------------------ */

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [placesReady, setPlacesReady] = useState(false);
  const [manualEntry, setManualEntry] = useState(false);

  const [step1, setStep1] = useState<Step1Data>({
    email: "",
    firmName: "",
    placeId: "",
    formattedAddress: "",
    website: "",
    phone: "",
  });

  const [step2, setStep2] = useState<Step2Data>({
    primaryPracticeArea: "",
    targetCity: "",
    targetState: "",
    country: "United States",
    secondaryPracticeArea: "",
    isNewFirm: false,
  });

  const [step3, setStep3] = useState<Step3Data>({
    avgCaseValue: "",
    monthlyLeadVolume: "",
    avgResponseTime: "",
    afterHoursCoverage: false,
    crmService: "",
  });

  /* partial-lead id returned from step 1 */
  const [leadId, setLeadId] = useState<string | null>(null);

  const firmInputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  /* ----- UTM capture ------------------------------------------------ */

  const getUtmParams = useCallback(() => {
    const mapping: Record<string, string> = {
      utm_source: "utmSource",
      utm_medium: "utmMedium",
      utm_campaign: "utmCampaign",
      utm_term: "utmTerm",
      utm_content: "utmContent",
    };
    const utms: Record<string, string> = {};
    for (const [param, key] of Object.entries(mapping)) {
      const val = searchParams.get(param);
      if (val) utms[key] = val;
    }
    return utms;
  }, [searchParams]);

  /* ----- Google Places ---------------------------------------------- */

  useEffect(() => {
    loadGoogleMapsScript()
      .then(() => setPlacesReady(true))
      .catch(() => {
        /* API key missing or load failed; fall back to manual entry */
        setManualEntry(true);
      });
  }, []);

  useEffect(() => {
    if (!placesReady || !firmInputRef.current || autocompleteRef.current) return;

    const ac = new google.maps.places.Autocomplete(firmInputRef.current, {
      types: ["establishment"],
      componentRestrictions: { country: ["us", "ca"] },
      fields: [
        "name",
        "place_id",
        "formatted_address",
        "website",
        "formatted_phone_number",
        "geometry",
        "address_components",
      ],
    });

    ac.addListener("place_changed", () => {
      const place = ac.getPlace();
      if (!place || !place.place_id) return;

      const details: PlaceResult = extractPlaceDetails(place);

      setStep1((prev) => ({
        ...prev,
        firmName: details.name,
        placeId: details.placeId,
        formattedAddress: details.formattedAddress,
        website: details.website ?? prev.website,
        phone: details.phone ?? prev.phone,
        lat: details.lat,
        lng: details.lng,
      }));

      /* Pre-fill step 2 city / state from place */
      setStep2((prev) => ({
        ...prev,
        targetCity: details.city || prev.targetCity,
        targetState: details.state || prev.targetState,
        country:
          details.country === "CA" ? "Canada" : "United States",
      }));

      trackClientEvent("market_gap_place_selected", {
        placeId: details.placeId,
        firmName: details.name,
      });
    });

    autocompleteRef.current = ac;
  }, [placesReady]);

  /* ----- validation ------------------------------------------------- */

  function validateStep1(): boolean {
    const errs: FieldErrors = {};
    if (!step1.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(step1.email)) {
      errs.email = "Please enter a valid work email.";
    }
    if (!step1.firmName.trim()) {
      errs.firmName = "Firm name is required.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function validateStep2(): boolean {
    const errs: FieldErrors = {};
    if (!step2.primaryPracticeArea) {
      errs.primaryPracticeArea = "Please select a practice area.";
    }
    if (!step2.targetCity.trim()) {
      errs.targetCity = "Target city is required.";
    }
    if (!step2.targetState.trim()) {
      errs.targetState = "Target state is required.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  /* ----- handlers --------------------------------------------------- */

  async function handleStep1Submit() {
    if (!validateStep1()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/market-gap/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          step: 1,
          email: step1.email,
          firmName: step1.firmName,
          googlePlaceId: step1.placeId,
          formattedAddress: step1.formattedAddress,
          website: step1.website,
          phone: step1.phone,
          lat: step1.lat,
          lng: step1.lng,
          city: step2.targetCity,
          state: step2.targetState,
          ...getUtmParams(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to save.");
      if (data.leadId) setLeadId(data.leadId);

      trackClientEvent("market_gap_step_1_complete", {
        firmName: step1.firmName,
        email: step1.email,
      });

      setErrors({});
      setStep(2);
    } catch (err) {
      setErrors({
        form:
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleStep2Submit() {
    if (!validateStep2()) return;

    trackClientEvent("market_gap_step_2_complete", {
      practiceArea: step2.primaryPracticeArea,
      targetCity: step2.targetCity,
      targetState: step2.targetState,
    });

    setErrors({});
    setStep(3);
  }

  async function handleFinalSubmit(skipStep3 = false) {
    setLoading(true);

    trackClientEvent("market_gap_step_3_complete", {
      skipped: skipStep3,
    });

    try {
      const payload = {
        step: 3,
        leadId,
        // Step 1
        email: step1.email,
        firmName: step1.firmName,
        googlePlaceId: step1.placeId,
        formattedAddress: step1.formattedAddress,
        website: step1.website,
        phone: step1.phone,
        lat: step1.lat,
        lng: step1.lng,
        // Step 2
        practiceArea: step2.primaryPracticeArea,
        secondaryPracticeArea: step2.secondaryPracticeArea,
        targetCity: step2.targetCity,
        targetState: step2.targetState,
        country: step2.country === "Canada" ? "CA" : "US",
        isNewFirm: step2.isNewFirm,
        // Step 3
        ...(skipStep3 ? {} : {
          caseValue: step3.avgCaseValue,
          leadVolume: step3.monthlyLeadVolume,
          responseTime: step3.avgResponseTime,
          afterHours: step3.afterHoursCoverage,
          crmService: step3.crmService,
        }),
        ...getUtmParams(),
      };

      const res = await fetch("/api/market-gap/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to generate report.");

      const reportId = data.reportId ?? data.id;
      router.push(`/market-gap/loading/${reportId}`);
    } catch (err) {
      setErrors({
        form:
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  /* ----- render helpers --------------------------------------------- */

  function renderProgressBar() {
    const pct = step === 1 ? 33 : step === 2 ? 66 : 100;
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">
            Step {step} of 3
          </span>
          <span className="text-xs text-gray-400">{pct}% complete</span>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${pct}%`, background: "#EE6C13" }}
          />
        </div>
      </div>
    );
  }

  function renderError(field: string) {
    if (!errors[field]) return null;
    return (
      <p className="mt-1 text-xs text-red-600">{errors[field]}</p>
    );
  }

  function renderFormError() {
    if (!errors.form) return null;
    return (
      <div className="rounded-lg bg-red-50 border border-red-200 p-3 mb-4">
        <p className="text-sm text-red-700">{errors.form}</p>
      </div>
    );
  }

  /* ----- Step 1 ----------------------------------------------------- */

  function renderStep1() {
    return (
      <>
        <h2 className="text-xl font-bold text-gray-900 mb-1">
          Find your firm
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          We&apos;ll look up your firm details automatically.
        </p>

        {renderFormError()}

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="mgf-email" className={LABEL_CLS}>
            Work email <span className="text-red-500">*</span>
          </label>
          <input
            id="mgf-email"
            type="email"
            required
            placeholder="you@firmname.com"
            value={step1.email}
            onChange={(e) =>
              setStep1((p) => ({ ...p, email: e.target.value }))
            }
            className={INPUT_CLS}
            style={RING_STYLE}
          />
          {renderError("email")}
        </div>

        {/* Firm name: autocomplete or manual */}
        <div className="mb-4">
          <label htmlFor="mgf-firmName" className={LABEL_CLS}>
            Firm name <span className="text-red-500">*</span>
          </label>
          <input
            id="mgf-firmName"
            ref={firmInputRef}
            type="text"
            required
            placeholder={
              placesReady && !manualEntry
                ? "Start typing your firm name..."
                : "Enter your firm name"
            }
            value={step1.firmName}
            onChange={(e) =>
              setStep1((p) => ({ ...p, firmName: e.target.value }))
            }
            className={INPUT_CLS}
            style={RING_STYLE}
          />
          {renderError("firmName")}

          {/* Toggle manual entry */}
          {placesReady && !manualEntry && (
            <button
              type="button"
              onClick={() => setManualEntry(true)}
              className="mt-1.5 text-xs underline transition-colors"
              style={{ color: "#EE6C13" }}
            >
              Can&apos;t find your firm?
            </button>
          )}
        </div>

        {/* Manual fields (shown if Places unavailable or toggled) */}
        {manualEntry && (
          <div className="mb-4 space-y-4 rounded-lg bg-gray-50 p-4">
            <p className="text-xs text-gray-500">
              Enter your firm details manually.
            </p>

            <div>
              <label htmlFor="mgf-address" className={LABEL_CLS}>
                Address
              </label>
              <input
                id="mgf-address"
                type="text"
                placeholder="123 Main St, City, State"
                value={step1.formattedAddress}
                onChange={(e) =>
                  setStep1((p) => ({
                    ...p,
                    formattedAddress: e.target.value,
                  }))
                }
                className={INPUT_CLS}
                style={RING_STYLE}
              />
            </div>
          </div>
        )}

        {/* Website */}
        <div className="mb-4">
          <label htmlFor="mgf-website" className={LABEL_CLS}>
            Website
          </label>
          <input
            id="mgf-website"
            type="url"
            placeholder="https://www.yourfirm.com"
            value={step1.website}
            onChange={(e) =>
              setStep1((p) => ({ ...p, website: e.target.value }))
            }
            className={INPUT_CLS}
            style={RING_STYLE}
          />
        </div>

        {/* Phone */}
        <div className="mb-6">
          <label htmlFor="mgf-phone" className={LABEL_CLS}>
            Phone
          </label>
          <input
            id="mgf-phone"
            type="tel"
            placeholder="(555) 123-4567"
            value={step1.phone}
            onChange={(e) =>
              setStep1((p) => ({ ...p, phone: e.target.value }))
            }
            className={INPUT_CLS}
            style={RING_STYLE}
          />
        </div>

        <button
          type="button"
          disabled={loading}
          onClick={handleStep1Submit}
          className="w-full font-bold text-white text-sm py-3.5 rounded-[40px] transition-colors disabled:opacity-60"
          style={{ background: "#EE6C13" }}
          onMouseOver={(e) => {
            if (!loading)
              (e.currentTarget as HTMLButtonElement).style.background =
                "#982A0B";
          }}
          onMouseOut={(e) => {
            if (!loading)
              (e.currentTarget as HTMLButtonElement).style.background =
                "#EE6C13";
          }}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Spinner /> Saving...
            </span>
          ) : (
            "Continue"
          )}
        </button>
      </>
    );
  }

  /* ----- Step 2 ----------------------------------------------------- */

  function renderStep2() {
    return (
      <>
        <h2 className="text-xl font-bold text-gray-900 mb-1">
          Market configuration
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Tell us about your target market.
        </p>

        {renderFormError()}

        {/* Primary practice area */}
        <div className="mb-4">
          <label htmlFor="mgf-practice" className={LABEL_CLS}>
            Primary practice area <span className="text-red-500">*</span>
          </label>
          <select
            id="mgf-practice"
            required
            value={step2.primaryPracticeArea}
            onChange={(e) =>
              setStep2((p) => ({
                ...p,
                primaryPracticeArea: e.target.value as PracticeArea,
              }))
            }
            className={INPUT_CLS}
            style={RING_STYLE}
          >
            <option value="">Select practice area</option>
            {PRACTICE_AREAS.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
          {renderError("primaryPracticeArea")}
        </div>

        {/* Target city & state */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label htmlFor="mgf-city" className={LABEL_CLS}>
              Target city <span className="text-red-500">*</span>
            </label>
            <input
              id="mgf-city"
              type="text"
              required
              placeholder="e.g. Dallas"
              value={step2.targetCity}
              onChange={(e) =>
                setStep2((p) => ({ ...p, targetCity: e.target.value }))
              }
              className={INPUT_CLS}
              style={RING_STYLE}
            />
            {renderError("targetCity")}
          </div>
          <div>
            <label htmlFor="mgf-state" className={LABEL_CLS}>
              Target state <span className="text-red-500">*</span>
            </label>
            <input
              id="mgf-state"
              type="text"
              required
              placeholder="e.g. TX"
              value={step2.targetState}
              onChange={(e) =>
                setStep2((p) => ({ ...p, targetState: e.target.value }))
              }
              className={INPUT_CLS}
              style={RING_STYLE}
            />
            {renderError("targetState")}
          </div>
        </div>

        {/* Country */}
        <div className="mb-4">
          <label htmlFor="mgf-country" className={LABEL_CLS}>
            Country
          </label>
          <select
            id="mgf-country"
            value={step2.country}
            onChange={(e) =>
              setStep2((p) => ({
                ...p,
                country: e.target.value as (typeof COUNTRIES)[number],
              }))
            }
            className={INPUT_CLS}
            style={RING_STYLE}
          >
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Secondary practice area */}
        <div className="mb-4">
          <label htmlFor="mgf-secondary" className={LABEL_CLS}>
            Secondary practice area{" "}
            <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <select
            id="mgf-secondary"
            value={step2.secondaryPracticeArea}
            onChange={(e) =>
              setStep2((p) => ({
                ...p,
                secondaryPracticeArea: e.target.value as PracticeArea,
              }))
            }
            className={INPUT_CLS}
            style={RING_STYLE}
          >
            <option value="">None</option>
            {PRACTICE_AREAS.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
        </div>

        {/* New firm toggle */}
        <div className="mb-6 flex items-center justify-between">
          <label
            htmlFor="mgf-newFirm"
            className="text-sm font-medium text-gray-700"
          >
            Are you launching a new firm?
          </label>
          <button
            id="mgf-newFirm"
            type="button"
            role="switch"
            aria-checked={step2.isNewFirm}
            onClick={() =>
              setStep2((p) => ({ ...p, isNewFirm: !p.isNewFirm }))
            }
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              step2.isNewFirm ? "" : "bg-gray-200"
            }`}
            style={
              step2.isNewFirm
                ? { background: "#EE6C13", "--tw-ring-color": "#EE6C13" } as React.CSSProperties
                : { "--tw-ring-color": "#EE6C13" } as React.CSSProperties
            }
          >
            <span
              aria-hidden="true"
              className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                step2.isNewFirm ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => {
              setErrors({});
              setStep(1);
            }}
            className="flex-1 font-bold text-sm py-3.5 rounded-[40px] border border-gray-200 text-gray-700 transition-colors hover:bg-gray-50"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleStep2Submit}
            className="flex-[2] font-bold text-white text-sm py-3.5 rounded-[40px] transition-colors"
            style={{ background: "#EE6C13" }}
            onMouseOver={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background =
                "#982A0B")
            }
            onMouseOut={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background =
                "#EE6C13")
            }
          >
            Continue
          </button>
        </div>
      </>
    );
  }

  /* ----- Step 3 ----------------------------------------------------- */

  function renderStep3() {
    return (
      <>
        <h2 className="text-xl font-bold text-gray-900 mb-1">
          Intake details
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Optional &mdash; these details improve your report.
        </p>

        {renderFormError()}

        {/* Avg case value */}
        <div className="mb-4">
          <label htmlFor="mgf-caseValue" className={LABEL_CLS}>
            Average case value
          </label>
          <select
            id="mgf-caseValue"
            value={step3.avgCaseValue}
            onChange={(e) =>
              setStep3((p) => ({
                ...p,
                avgCaseValue:
                  e.target.value as (typeof AVG_CASE_VALUES)[number],
              }))
            }
            className={INPUT_CLS}
            style={RING_STYLE}
          >
            <option value="">Select range</option>
            {AVG_CASE_VALUES.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>

        {/* Monthly lead volume */}
        <div className="mb-4">
          <label htmlFor="mgf-leadVol" className={LABEL_CLS}>
            Monthly lead volume
          </label>
          <select
            id="mgf-leadVol"
            value={step3.monthlyLeadVolume}
            onChange={(e) =>
              setStep3((p) => ({
                ...p,
                monthlyLeadVolume:
                  e.target.value as (typeof MONTHLY_LEAD_VOLUMES)[number],
              }))
            }
            className={INPUT_CLS}
            style={RING_STYLE}
          >
            <option value="">Select range</option>
            {MONTHLY_LEAD_VOLUMES.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>

        {/* Avg response time */}
        <div className="mb-4">
          <label htmlFor="mgf-responseTime" className={LABEL_CLS}>
            Average response time
          </label>
          <select
            id="mgf-responseTime"
            value={step3.avgResponseTime}
            onChange={(e) =>
              setStep3((p) => ({
                ...p,
                avgResponseTime:
                  e.target.value as (typeof AVG_RESPONSE_TIMES)[number],
              }))
            }
            className={INPUT_CLS}
            style={RING_STYLE}
          >
            <option value="">Select range</option>
            {AVG_RESPONSE_TIMES.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>

        {/* After-hours coverage */}
        <div className="mb-4 flex items-center justify-between">
          <label
            htmlFor="mgf-afterHours"
            className="text-sm font-medium text-gray-700"
          >
            After-hours coverage
          </label>
          <button
            id="mgf-afterHours"
            type="button"
            role="switch"
            aria-checked={step3.afterHoursCoverage}
            onClick={() =>
              setStep3((p) => ({
                ...p,
                afterHoursCoverage: !p.afterHoursCoverage,
              }))
            }
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              step3.afterHoursCoverage ? "" : "bg-gray-200"
            }`}
            style={
              step3.afterHoursCoverage
                ? { background: "#EE6C13", "--tw-ring-color": "#EE6C13" } as React.CSSProperties
                : { "--tw-ring-color": "#EE6C13" } as React.CSSProperties
            }
          >
            <span
              aria-hidden="true"
              className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                step3.afterHoursCoverage ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* CRM / answering service */}
        <div className="mb-6">
          <label htmlFor="mgf-crm" className={LABEL_CLS}>
            CRM / answering service{" "}
            <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <input
            id="mgf-crm"
            type="text"
            placeholder="e.g. Clio, Smith.ai, Ruby"
            value={step3.crmService}
            onChange={(e) =>
              setStep3((p) => ({ ...p, crmService: e.target.value }))
            }
            className={INPUT_CLS}
            style={RING_STYLE}
          />
        </div>

        {/* Skip link */}
        <div className="text-center mb-4">
          <button
            type="button"
            onClick={() => handleFinalSubmit(true)}
            disabled={loading}
            className="text-sm underline transition-colors disabled:opacity-60"
            style={{ color: "#EE6C13" }}
          >
            Skip to results
          </button>
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => {
              setErrors({});
              setStep(2);
            }}
            disabled={loading}
            className="flex-1 font-bold text-sm py-3.5 rounded-[40px] border border-gray-200 text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-60"
          >
            Back
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={() => handleFinalSubmit(false)}
            className="flex-[2] font-bold text-white text-sm py-3.5 rounded-[40px] transition-colors disabled:opacity-60"
            style={{ background: "#EE6C13" }}
            onMouseOver={(e) => {
              if (!loading)
                (e.currentTarget as HTMLButtonElement).style.background =
                  "#982A0B";
            }}
            onMouseOut={(e) => {
              if (!loading)
                (e.currentTarget as HTMLButtonElement).style.background =
                  "#EE6C13";
            }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Spinner /> Generating...
              </span>
            ) : (
              "Generate My Market Gap"
            )}
          </button>
        </div>
      </>
    );
  }

  /* ----- Main render ------------------------------------------------ */

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 sm:p-8">
        {renderProgressBar()}

        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Tiny spinner                                                       */
/* ------------------------------------------------------------------ */

function Spinner() {
  return (
    <svg
      className="animate-spin h-4 w-4 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}
