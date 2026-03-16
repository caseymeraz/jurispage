"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  loadGoogleMapsScript,
  extractPlaceDetails,
  type PlaceResult,
} from "@/lib/google-places";
import { trackClientEvent } from "@/lib/analytics";
import type { FlowType } from "@/lib/growth-path/types";
import { MARKET_AVAILABILITY_NOTE } from "@/lib/growth-path/types";
import TurnstileWidget from "@/components/TurnstileWidget";

/* ------------------------------------------------------------------ */
/*  Shared styles (matches MarketGapForm)                              */
/* ------------------------------------------------------------------ */

const INPUT_CLS =
  "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:border-transparent focus:shadow-[0_0_0_3px_rgba(238,108,19,0.15)]";

const RING_STYLE = { "--tw-ring-color": "#EE6C13" } as React.CSSProperties;

const LABEL_CLS = "block text-sm font-medium text-gray-700 mb-1";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const MAIN_GOALS = [
  { value: "get_more_cases", label: "Get more cases" },
  { value: "better_cases", label: "Get better quality cases" },
  { value: "dominate", label: "Dominate my market" },
  { value: "expand", label: "Expand to new markets" },
  { value: "not_sure", label: "Not sure yet" },
] as const;

const SITUATION_STATEMENTS = [
  { value: "need_cases_soon", label: "We need signed cases soon" },
  { value: "growing_steadily", label: "Growing steadily but want more" },
  { value: "leads_wrong_type", label: "Getting leads but wrong type" },
  { value: "starting_over", label: "Starting from scratch" },
  { value: "replacing_agency", label: "Replacing our current agency" },
] as const;

const LEAD_TRACKING_OPTIONS = [
  { value: "crm", label: "CRM (Clio, Litify, etc.)" },
  { value: "spreadsheet", label: "Spreadsheet or manual tracking" },
  { value: "none", label: "No formal tracking" },
  { value: "not_sure", label: "Not sure" },
] as const;

const CALL_TRACKING_OPTIONS = [
  { value: "yes", label: "Yes, we track calls" },
  { value: "no", label: "No call tracking" },
  { value: "not_sure", label: "Not sure" },
] as const;

const RESPONSE_SPEED_OPTIONS = [
  { value: "under_5_min", label: "Under 5 minutes" },
  { value: "same_hour", label: "Within an hour" },
  { value: "same_day", label: "Same day" },
  { value: "next_day", label: "Next business day" },
  { value: "varies", label: "It varies" },
] as const;

const ATTORNEY_COUNT_OPTIONS = [
  { value: "1", label: "Solo" },
  { value: "2-5", label: "2-5 attorneys" },
  { value: "6-15", label: "6-15 attorneys" },
  { value: "16+", label: "16+ attorneys" },
] as const;

const DECISION_STRUCTURE_OPTIONS = [
  { value: "solo_decision", label: "I make the decision" },
  { value: "several_partners", label: "A few partners decide together" },
  { value: "committee", label: "Larger committee or board" },
] as const;

const QUICK_WIN_OPTIONS = [
  { value: "quick_wins", label: "Quick wins first" },
  { value: "long_term", label: "Long-term strategy" },
  { value: "phased", label: "Phased approach" },
] as const;

const SITUATION_NOW_OPTIONS = [
  { value: "nothing", label: "Nothing yet, just starting" },
  { value: "planning", label: "In the planning stage" },
  { value: "recently_launched", label: "Recently launched" },
] as const;

const WHATS_LIVE_OPTIONS = [
  { value: "no_website", label: "No website yet" },
  { value: "basic_site", label: "Basic website" },
  { value: "professional_site", label: "Professional website" },
  { value: "gbp_only", label: "Google Business Profile only" },
] as const;

const OFFICE_EXPANSION_OPTIONS = [
  { value: "one_office", label: "One office, one market" },
  { value: "expansion", label: "Planning to expand" },
] as const;

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface FieldErrors {
  [field: string]: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function GrowthPathForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [step, setStep] = useState(0); // 0 = flow select
  const [flowType, setFlowType] = useState<FlowType | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [turnstileToken, setTurnstileToken] = useState("");
  const [placesReady, setPlacesReady] = useState(false);
  const [manualEntry, setManualEntry] = useState(false);

  // Existing firm data
  const [firmData, setFirmData] = useState({
    email: "",
    firmName: "",
    placeId: "",
    formattedAddress: "",
    website: "https://",
    phone: "",
    lat: undefined as number | undefined,
    lng: undefined as number | undefined,
    city: "",
    state: "",
  });

  // Existing firm intake
  const [existingIntake, setExistingIntake] = useState({
    mainGoal: "",
    situationStatement: "",
    replacingAgency: false,
    leadTracking: "",
    callTracking: "",
    responseSpeed: "",
    attorneyCount: "",
    decisionStructure: "",
    quickWinVsLongTerm: "",
  });

  // New firm intake
  const [newIntake, setNewIntake] = useState({
    firmName: "",
    practiceArea: "Personal Injury",
    targetCity: "",
    targetState: "",
    email: "",
    phone: "",
    website: "https://",
    situationRightNow: "",
    whatsAlreadyLive: "",
    attorneyCount: "",
    oneOfficeVsExpansion: "",
  });

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
      .catch(() => setManualEntry(true));
  }, []);

  useEffect(() => {
    if (!placesReady || !firmInputRef.current || autocompleteRef.current) return;
    if (flowType !== "existing_firm" || step !== 1) return;

    const ac = new google.maps.places.Autocomplete(firmInputRef.current, {
      types: ["establishment"],
      componentRestrictions: { country: "us" },
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
      if (!place.place_id) return;

      const details: PlaceResult = extractPlaceDetails(place);

      setFirmData((prev) => ({
        ...prev,
        firmName: details.name,
        placeId: details.placeId,
        formattedAddress: details.formattedAddress,
        website: details.website ?? prev.website,
        phone: details.phone ?? prev.phone,
        lat: details.lat,
        lng: details.lng,
        city: details.city || prev.city,
        state: details.state || prev.state,
      }));

      trackClientEvent("growth_path_place_selected", {
        placeId: details.placeId,
        firmName: details.name,
      });
    });

    autocompleteRef.current = ac;
  }, [placesReady, flowType, step]);

  /* ----- Total steps per flow -------------------------------------- */

  const totalSteps = flowType === "existing_firm" ? 5 : 4; // includes step 0

  /* ----- Validation ------------------------------------------------ */

  function validateExistingStep1(): boolean {
    const errs: FieldErrors = {};
    if (!firmData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(firmData.email)) {
      errs.email = "Please enter a valid work email.";
    }
    if (!firmData.firmName.trim()) errs.firmName = "Firm name is required.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function validateNewStep1(): boolean {
    const errs: FieldErrors = {};
    if (!newIntake.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newIntake.email)) {
      errs.email = "Please enter a valid work email.";
    }
    if (!newIntake.firmName.trim()) errs.firmName = "Firm name is required.";
    if (!newIntake.targetCity.trim()) errs.targetCity = "Target city is required.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  /* ----- Submit handler -------------------------------------------- */

  async function handleFinalSubmit() {
    setLoading(true);

    const isExisting = flowType === "existing_firm";

    trackClientEvent("growth_path_submit", { flowType });

    try {
      const payload = {
        turnstileToken,
        email: isExisting ? firmData.email : newIntake.email,
        firmName: isExisting ? firmData.firmName : newIntake.firmName,
        googlePlaceId: isExisting ? firmData.placeId : undefined,
        website: isExisting ? firmData.website : newIntake.website,
        phone: isExisting ? firmData.phone : newIntake.phone,
        lat: isExisting ? firmData.lat : undefined,
        lng: isExisting ? firmData.lng : undefined,
        city: isExisting ? firmData.city : newIntake.targetCity,
        state: isExisting ? firmData.state : newIntake.targetState,
        practiceArea: "Personal Injury",
        flowType,
        intakeAnswers: isExisting ? existingIntake : newIntake,
        ...getUtmParams(),
      };

      const res = await fetch("/api/growth-path/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to submit.");

      router.push(`/growth-path/loading/${data.sessionId}`);
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

  /* ----- Render helpers --------------------------------------------- */

  function renderProgressBar() {
    if (step === 0) return null;
    const pct = Math.round((step / (totalSteps - 1)) * 100);
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">
            Step {step} of {totalSteps - 1}
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
    return <p className="mt-1 text-xs text-red-600">{errors[field]}</p>;
  }

  function renderFormError() {
    if (!errors.form) return null;
    return (
      <div className="rounded-lg bg-red-50 border border-red-200 p-3 mb-4">
        <p className="text-sm text-red-700">{errors.form}</p>
      </div>
    );
  }

  function renderRadioGroup(
    name: string,
    options: readonly { value: string; label: string }[],
    value: string,
    onChange: (val: string) => void
  ) {
    return (
      <div className="space-y-2">
        {options.map((opt) => (
          <label
            key={opt.value}
            className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
              value === opt.value
                ? "border-[#EE6C13] bg-[#FEF3EC]"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className="sr-only"
            />
            <div
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                value === opt.value ? "border-[#EE6C13]" : "border-gray-300"
              }`}
            >
              {value === opt.value && (
                <div className="w-2 h-2 rounded-full bg-[#EE6C13]" />
              )}
            </div>
            <span className="text-sm text-gray-900">{opt.label}</span>
          </label>
        ))}
      </div>
    );
  }

  function renderNavButtons(
    onBack: () => void,
    onNext: () => void,
    nextLabel = "Continue",
    isSubmit = false
  ) {
    return (
      <div className="flex gap-3 mt-6">
        <button
          type="button"
          onClick={() => {
            setErrors({});
            onBack();
          }}
          disabled={loading}
          className="flex-1 font-bold text-sm py-3.5 rounded-[40px] border border-gray-200 text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-60"
        >
          Back
        </button>
        <button
          type="button"
          disabled={loading}
          onClick={onNext}
          className="flex-[2] font-bold text-white text-sm py-3.5 rounded-[40px] transition-colors disabled:opacity-60"
          style={{ background: "#EE6C13" }}
          onMouseOver={(e) => {
            if (!loading) (e.currentTarget as HTMLButtonElement).style.background = "#982A0B";
          }}
          onMouseOut={(e) => {
            if (!loading) (e.currentTarget as HTMLButtonElement).style.background = "#EE6C13";
          }}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Spinner /> {isSubmit ? "Building your report..." : "Saving..."}
            </span>
          ) : (
            nextLabel
          )}
        </button>
      </div>
    );
  }

  /* ----- Step 0: Flow Select --------------------------------------- */

  function renderFlowSelect() {
    return (
      <>
        <h2 className="text-xl font-bold text-gray-900 mb-1">
          Let&apos;s figure out the right path for your firm
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Are you an existing firm or starting a new one?
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => {
              setFlowType("existing_firm");
              setStep(1);
              trackClientEvent("growth_path_flow_selected", { flowType: "existing_firm" });
            }}
            className="p-6 rounded-xl border-2 border-gray-200 hover:border-[#EE6C13] transition-colors text-left group"
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
              style={{ background: "#FEF3EC" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EE6C13" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-1">
              Existing firm
            </h3>
            <p className="text-sm text-gray-500">
              We have a website and want to grow
            </p>
          </button>

          <button
            type="button"
            onClick={() => {
              setFlowType("new_firm");
              setStep(1);
              trackClientEvent("growth_path_flow_selected", { flowType: "new_firm" });
            }}
            className="p-6 rounded-xl border-2 border-gray-200 hover:border-[#EE6C13] transition-colors text-left group"
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
              style={{ background: "#FEF3EC" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EE6C13" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-1">
              New firm
            </h3>
            <p className="text-sm text-gray-500">
              We&apos;re launching and need to get started
            </p>
          </button>
        </div>
      </>
    );
  }

  /* ----- Existing Firm Steps --------------------------------------- */

  function renderExistingStep1() {
    return (
      <>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Find your firm</h2>
        <p className="text-sm text-gray-500 mb-6">
          We&apos;ll look up your firm details automatically.
        </p>
        {renderFormError()}

        <div className="mb-4">
          <label htmlFor="gp-email" className={LABEL_CLS}>
            Work email <span className="text-red-500">*</span>
          </label>
          <input
            id="gp-email"
            type="email"
            required
            placeholder="you@firmname.com"
            value={firmData.email}
            onChange={(e) => setFirmData((p) => ({ ...p, email: e.target.value }))}
            className={INPUT_CLS}
            style={RING_STYLE}
          />
          {renderError("email")}
        </div>

        <div className="mb-4">
          <label htmlFor="gp-firmName" className={LABEL_CLS}>
            Firm name <span className="text-red-500">*</span>
          </label>
          <input
            id="gp-firmName"
            ref={firmInputRef}
            type="text"
            required
            placeholder="Enter your firm name"
            value={firmData.firmName}
            onChange={(e) => setFirmData((p) => ({ ...p, firmName: e.target.value }))}
            className={INPUT_CLS}
            style={RING_STYLE}
          />
          {renderError("firmName")}
          {placesReady && !manualEntry && (
            <button
              type="button"
              onClick={() => setManualEntry(true)}
              className="mt-1.5 text-xs underline transition-colors"
              style={{ color: "#EE6C13" }}
            >
              Can&apos;t find your firm? Enter manually
            </button>
          )}
        </div>

        {manualEntry && (
          <div className="mb-4 space-y-4 rounded-lg bg-gray-50 p-4">
            <p className="text-xs text-gray-500">Enter your firm details manually.</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="gp-city" className={LABEL_CLS}>City</label>
                <input
                  id="gp-city"
                  type="text"
                  placeholder="e.g. Dallas"
                  value={firmData.city}
                  onChange={(e) => setFirmData((p) => ({ ...p, city: e.target.value }))}
                  className={INPUT_CLS}
                  style={RING_STYLE}
                />
              </div>
              <div>
                <label htmlFor="gp-state" className={LABEL_CLS}>State</label>
                <input
                  id="gp-state"
                  type="text"
                  placeholder="e.g. TX"
                  value={firmData.state}
                  onChange={(e) => setFirmData((p) => ({ ...p, state: e.target.value }))}
                  className={INPUT_CLS}
                  style={RING_STYLE}
                />
              </div>
            </div>
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="gp-website" className={LABEL_CLS}>Website</label>
          <input
            id="gp-website"
            type="url"
            placeholder="https://www.yourfirm.com"
            value={firmData.website}
            onChange={(e) => setFirmData((p) => ({ ...p, website: e.target.value }))}
            className={INPUT_CLS}
            style={RING_STYLE}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="gp-phone" className={LABEL_CLS}>Phone</label>
          <input
            id="gp-phone"
            type="tel"
            placeholder="(555) 123-4567"
            value={firmData.phone}
            onChange={(e) => setFirmData((p) => ({ ...p, phone: e.target.value }))}
            className={INPUT_CLS}
            style={RING_STYLE}
          />
        </div>

        <p className="text-xs text-gray-400 mb-4 leading-relaxed">
          {MARKET_AVAILABILITY_NOTE}
        </p>

        <button
          type="button"
          disabled={loading}
          onClick={() => {
            if (validateExistingStep1()) {
              setErrors({});
              setStep(2);
            }
          }}
          className="w-full font-bold text-white text-sm py-3.5 rounded-[40px] transition-colors disabled:opacity-60"
          style={{ background: "#EE6C13" }}
          onMouseOver={(e) => {
            if (!loading) (e.currentTarget as HTMLButtonElement).style.background = "#982A0B";
          }}
          onMouseOut={(e) => {
            if (!loading) (e.currentTarget as HTMLButtonElement).style.background = "#EE6C13";
          }}
        >
          Continue
        </button>
      </>
    );
  }

  function renderExistingStep2() {
    return (
      <>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Your goals</h2>
        <p className="text-sm text-gray-500 mb-6">What&apos;s driving your interest right now?</p>
        {renderFormError()}

        <div className="mb-5">
          <label className={LABEL_CLS}>What is your main goal right now?</label>
          {renderRadioGroup("mainGoal", MAIN_GOALS, existingIntake.mainGoal, (v) =>
            setExistingIntake((p) => ({ ...p, mainGoal: v }))
          )}
        </div>

        <div className="mb-5">
          <label className={LABEL_CLS}>Which best describes your situation?</label>
          {renderRadioGroup("situation", SITUATION_STATEMENTS, existingIntake.situationStatement, (v) =>
            setExistingIntake((p) => ({
              ...p,
              situationStatement: v,
              replacingAgency: v === "replacing_agency",
            }))
          )}
        </div>

        {renderNavButtons(
          () => setStep(1),
          () => {
            setErrors({});
            setStep(3);
          }
        )}
      </>
    );
  }

  function renderExistingStep3() {
    return (
      <>
        <h2 className="text-xl font-bold text-gray-900 mb-1">How you handle leads</h2>
        <p className="text-sm text-gray-500 mb-6">This helps us understand where cases might be leaking.</p>
        {renderFormError()}

        <div className="mb-5">
          <label className={LABEL_CLS}>How do you track leads?</label>
          {renderRadioGroup("leadTracking", LEAD_TRACKING_OPTIONS, existingIntake.leadTracking, (v) =>
            setExistingIntake((p) => ({ ...p, leadTracking: v }))
          )}
        </div>

        <div className="mb-5">
          <label className={LABEL_CLS}>Do you track phone calls?</label>
          {renderRadioGroup("callTracking", CALL_TRACKING_OPTIONS, existingIntake.callTracking, (v) =>
            setExistingIntake((p) => ({ ...p, callTracking: v }))
          )}
        </div>

        <div className="mb-5">
          <label className={LABEL_CLS}>How fast does your team typically respond to new leads?</label>
          {renderRadioGroup("responseSpeed", RESPONSE_SPEED_OPTIONS, existingIntake.responseSpeed, (v) =>
            setExistingIntake((p) => ({ ...p, responseSpeed: v }))
          )}
        </div>

        {renderNavButtons(
          () => setStep(2),
          () => {
            setErrors({});
            setStep(4);
          }
        )}
      </>
    );
  }

  function renderExistingStep4() {
    return (
      <>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Your firm</h2>
        <p className="text-sm text-gray-500 mb-6">A few more details to personalize your path.</p>
        {renderFormError()}

        <div className="mb-5">
          <label className={LABEL_CLS}>How many attorneys at your firm?</label>
          {renderRadioGroup("attorneyCount", ATTORNEY_COUNT_OPTIONS, existingIntake.attorneyCount, (v) =>
            setExistingIntake((p) => ({ ...p, attorneyCount: v }))
          )}
        </div>

        <div className="mb-5">
          <label className={LABEL_CLS}>Who makes marketing decisions?</label>
          {renderRadioGroup("decisionStructure", DECISION_STRUCTURE_OPTIONS, existingIntake.decisionStructure, (v) =>
            setExistingIntake((p) => ({ ...p, decisionStructure: v }))
          )}
        </div>

        <div className="mb-5">
          <label className={LABEL_CLS}>What matters more right now?</label>
          {renderRadioGroup("quickWin", QUICK_WIN_OPTIONS, existingIntake.quickWinVsLongTerm, (v) =>
            setExistingIntake((p) => ({ ...p, quickWinVsLongTerm: v }))
          )}
        </div>

        {renderNavButtons(
          () => setStep(3),
          handleFinalSubmit,
          "Build My Growth Path",
          true
        )}
      </>
    );
  }

  /* ----- New Firm Steps -------------------------------------------- */

  function renderNewStep1() {
    return (
      <>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Tell us about your new firm</h2>
        <p className="text-sm text-gray-500 mb-6">We&apos;ll use this to analyze your target market.</p>
        {renderFormError()}

        <div className="mb-4">
          <label htmlFor="gp-new-email" className={LABEL_CLS}>
            Work email <span className="text-red-500">*</span>
          </label>
          <input
            id="gp-new-email"
            type="email"
            required
            placeholder="you@firmname.com"
            value={newIntake.email}
            onChange={(e) => setNewIntake((p) => ({ ...p, email: e.target.value }))}
            className={INPUT_CLS}
            style={RING_STYLE}
          />
          {renderError("email")}
        </div>

        <div className="mb-4">
          <label htmlFor="gp-new-firmName" className={LABEL_CLS}>
            Firm name <span className="text-red-500">*</span>
          </label>
          <input
            id="gp-new-firmName"
            type="text"
            required
            placeholder="Your firm name"
            value={newIntake.firmName}
            onChange={(e) => setNewIntake((p) => ({ ...p, firmName: e.target.value }))}
            className={INPUT_CLS}
            style={RING_STYLE}
          />
          {renderError("firmName")}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label htmlFor="gp-new-city" className={LABEL_CLS}>
              Target city <span className="text-red-500">*</span>
            </label>
            <input
              id="gp-new-city"
              type="text"
              required
              placeholder="e.g. Dallas"
              value={newIntake.targetCity}
              onChange={(e) => setNewIntake((p) => ({ ...p, targetCity: e.target.value }))}
              className={INPUT_CLS}
              style={RING_STYLE}
            />
            {renderError("targetCity")}
          </div>
          <div>
            <label htmlFor="gp-new-state" className={LABEL_CLS}>State</label>
            <input
              id="gp-new-state"
              type="text"
              placeholder="e.g. TX"
              value={newIntake.targetState}
              onChange={(e) => setNewIntake((p) => ({ ...p, targetState: e.target.value }))}
              className={INPUT_CLS}
              style={RING_STYLE}
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="gp-new-phone" className={LABEL_CLS}>Phone</label>
          <input
            id="gp-new-phone"
            type="tel"
            placeholder="(555) 123-4567"
            value={newIntake.phone}
            onChange={(e) => setNewIntake((p) => ({ ...p, phone: e.target.value }))}
            className={INPUT_CLS}
            style={RING_STYLE}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="gp-new-website" className={LABEL_CLS}>
            Website <span className="text-gray-400 font-normal">(if you have one)</span>
          </label>
          <input
            id="gp-new-website"
            type="url"
            placeholder="https://www.yourfirm.com"
            value={newIntake.website}
            onChange={(e) => setNewIntake((p) => ({ ...p, website: e.target.value }))}
            className={INPUT_CLS}
            style={RING_STYLE}
          />
        </div>

        <p className="text-xs text-gray-400 mb-4 leading-relaxed">
          {MARKET_AVAILABILITY_NOTE}
        </p>

        <button
          type="button"
          disabled={loading}
          onClick={() => {
            if (validateNewStep1()) {
              setErrors({});
              setStep(2);
            }
          }}
          className="w-full font-bold text-white text-sm py-3.5 rounded-[40px] transition-colors disabled:opacity-60"
          style={{ background: "#EE6C13" }}
          onMouseOver={(e) => {
            if (!loading) (e.currentTarget as HTMLButtonElement).style.background = "#982A0B";
          }}
          onMouseOut={(e) => {
            if (!loading) (e.currentTarget as HTMLButtonElement).style.background = "#EE6C13";
          }}
        >
          Continue
        </button>
      </>
    );
  }

  function renderNewStep2() {
    return (
      <>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Where are you right now?</h2>
        <p className="text-sm text-gray-500 mb-6">This helps us understand what you need first.</p>
        {renderFormError()}

        <div className="mb-5">
          <label className={LABEL_CLS}>What best describes your situation right now?</label>
          {renderRadioGroup("situationNow", SITUATION_NOW_OPTIONS, newIntake.situationRightNow, (v) =>
            setNewIntake((p) => ({ ...p, situationRightNow: v }))
          )}
        </div>

        <div className="mb-5">
          <label className={LABEL_CLS}>What&apos;s already live?</label>
          {renderRadioGroup("whatsLive", WHATS_LIVE_OPTIONS, newIntake.whatsAlreadyLive, (v) =>
            setNewIntake((p) => ({ ...p, whatsAlreadyLive: v }))
          )}
        </div>

        {renderNavButtons(
          () => setStep(1),
          () => {
            setErrors({});
            setStep(3);
          }
        )}
      </>
    );
  }

  function renderNewStep3() {
    return (
      <>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Your firm setup</h2>
        <p className="text-sm text-gray-500 mb-6">Last step before we build your path.</p>
        {renderFormError()}

        <div className="mb-5">
          <label className={LABEL_CLS}>How many attorneys?</label>
          {renderRadioGroup("attorneyCount", ATTORNEY_COUNT_OPTIONS, newIntake.attorneyCount, (v) =>
            setNewIntake((p) => ({ ...p, attorneyCount: v }))
          )}
        </div>

        <div className="mb-5">
          <label className={LABEL_CLS}>What&apos;s your plan?</label>
          {renderRadioGroup("expansion", OFFICE_EXPANSION_OPTIONS, newIntake.oneOfficeVsExpansion, (v) =>
            setNewIntake((p) => ({ ...p, oneOfficeVsExpansion: v }))
          )}
        </div>

        {renderNavButtons(
          () => setStep(2),
          handleFinalSubmit,
          "Build My Growth Path",
          true
        )}
      </>
    );
  }

  /* ----- Main render ------------------------------------------------ */

  function renderCurrentStep() {
    if (step === 0) return renderFlowSelect();

    if (flowType === "existing_firm") {
      switch (step) {
        case 1: return renderExistingStep1();
        case 2: return renderExistingStep2();
        case 3: return renderExistingStep3();
        case 4: return renderExistingStep4();
      }
    }

    if (flowType === "new_firm") {
      switch (step) {
        case 1: return renderNewStep1();
        case 2: return renderNewStep2();
        case 3: return renderNewStep3();
      }
    }

    return null;
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 sm:p-8">
        {renderProgressBar()}
        {renderCurrentStep()}
        <TurnstileWidget onVerify={setTurnstileToken} />
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
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}
