import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import CTASection from "@/components/CTASection";
import SchemaOrg from "@/components/SchemaOrg";
import CaseStudyCard from "@/components/CaseStudyCard";
import ReviewRibbon from "@/components/ReviewRibbon";
import YouTubeFacade from "@/components/YouTubeFacade";
import StartHereStrip from "@/components/StartHereStrip";
import MarketGapPreview from "@/components/MarketGapPreview";
import { caseStudies } from "@/data/caseStudies";

export const metadata: Metadata = {
  title:
    "See Where Your Law Firm Is Losing Market Share | JurisPage",
  description:
    "Get a free, personalized market-gap analysis for your practice area and city. See search demand, who's winning, your visibility score, and the gaps you can close. Built for law firms only.",
  alternates: { canonical: "https://jurispage.com/" },
  openGraph: {
    title:
      "See Where Your Law Firm Is Losing Market Share | JurisPage",
    description:
      "Free market-gap analysis for law firms. See search demand, top competitors, your visibility score, and the specific gaps costing you cases.",
    url: "https://jurispage.com/",
  },
};

/* ────────────────────────────────────────────
   Static data
   ──────────────────────────────────────────── */

const partnerLogos = [
  { src: "/images/about/partner-forbes.svg", alt: "Forbes" },
  { src: "/images/about/partner-lawyerist.svg", alt: "Lawyerist" },
  { src: "/images/about/partner-moz.svg", alt: "Moz" },
  {
    src: "/images/about/partner-unbounce-agency.svg",
    alt: "Unbounce Agency Partner",
  },
  { src: "/images/about/partner-expertise-com.svg", alt: "Expertise.com" },
  { src: "/images/about/partner-backlinko.svg", alt: "Backlinko" },
  { src: "/images/about/partner-google.svg", alt: "Google" },
  { src: "/images/about/partner-law360.svg", alt: "Law360" },
];

const wallOfProof = [
  {
    role: "The Scaler",
    videoId: "T_7--aGpB54",
    author: "Michael Oykhman",
    firm: "Oykhman Criminal Defence",
    quote: "My business has grown 10-fold.",
  },
  {
    role: "The Closer",
    videoId: "l5xHsqhkgI8",
    author: "Cory Wilson",
    firm: "Wilson Criminal Defence",
    quote: "I'm closing more high-value clients than ever.",
  },
  {
    role: "The Believer",
    videoId: "B9zSA5lzvwc",
    author: "Williams",
    firm: "",
    quote: "Finally, an agency that understands the legal niche.",
  },
];

const services = [
  {
    icon: "seo",
    title: "Law Firm SEO",
    description:
      "Rank higher in Google for the keywords that bring in qualified case inquiries. Technical, on-page, and link building done right.",
    href: "/law-firm-seo/",
  },
  {
    icon: "ads",
    title: "Google Ads",
    description:
      "Stop wasting budget on bad clicks. We build law firm PPC campaigns that convert searches into signed cases.",
    href: "/google-ads-for-law-firms/",
  },
  {
    icon: "website",
    title: "Law Firm Websites",
    description:
      "Fast, credible, conversion-optimized websites built for law firms. Live in 30 days with the Launchpad package.",
    href: "/law-firm-websites/",
  },
  {
    icon: "local",
    title: "Local SEO",
    description:
      "Get into the Google map pack for searches in your market. The most cost-effective source of local legal leads.",
    href: "/local-seo-for-law-firms/",
  },
  {
    icon: "geo",
    title: "GEO / AI Search",
    description:
      "Get your firm cited inside ChatGPT, Perplexity, and AI Overviews. First-mover advantage before your competitors figure it out.",
    href: "/generative-engine-optimization-legal-marketing/",
  },
  {
    icon: "launchpad",
    title: "Launchpad",
    description:
      "The complete marketing package for attorneys opening a new firm. Website, GBP, local SEO - live in 30 days.",
    href: "/launchpad/",
  },
];

const practiceAreas = [
  { label: "Personal Injury", href: "/personal-injury-lawyer-marketing/" },
  {
    label: "Criminal Defense",
    href: "/criminal-defense-lawyer-marketing/",
  },
  { label: "Family Law", href: "/family-law-firm-marketing/" },
  { label: "Immigration", href: "/immigration-lawyer-marketing/" },
  { label: "Estate Planning", href: "/estate-planning-lawyer-marketing/" },
  { label: "Bankruptcy", href: "/bankruptcy-lawyer-marketing/" },
  { label: "Employment Law", href: "/employment-lawyer-marketing/" },
  { label: "DUI Defense", href: "/dui-lawyer-marketing/" },
  { label: "Solo Attorneys", href: "/solo-attorney-marketing/" },
  { label: "Small Law Firms", href: "/small-law-firm-marketing/" },
  { label: "Workers' Comp", href: "/workers-comp-lawyer-marketing/" },
  {
    label: "SSDI",
    href: "/social-security-disability-lawyer-marketing/",
  },
];

const marketGapItems = [
  {
    title: "Total market demand",
    description:
      "How many people search for your practice area in your city every month.",
    color: "#EE6C13",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
        />
      </svg>
    ),
  },
  {
    title: "Who's winning now",
    description:
      "The top firms dominating Google Maps and organic search in your market.",
    color: "#22c55e",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0 1 16.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.024 6.024 0 0 1-4.27 1.772 6.024 6.024 0 0 1-4.27-1.772"
        />
      </svg>
    ),
  },
  {
    title: "Your visibility score",
    description:
      "A clear picture of where you stand compared to competitors.",
    color: "#f59e0b",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
      </svg>
    ),
  },
  {
    title: "Your biggest gaps",
    description:
      "The specific weaknesses competitors are exploiting right now.",
    color: "#ef4444",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
        />
      </svg>
    ),
  },
];

const serviceIcons: Record<string, React.ReactNode> = {
  seo: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      width="100%"
      height="100%"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
      />
    </svg>
  ),
  ads: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      width="100%"
      height="100%"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 1 8.835-2.535m0 0A23.74 23.74 0 0 1 18.795 3m.38 1.125a23.91 23.91 0 0 0 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m-1.394-9.965c.09.38.187.765.292 1.148m-1.394 9.965a24.05 24.05 0 0 1-.292 1.148"
      />
    </svg>
  ),
  website: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      width="100%"
      height="100%"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0H3"
      />
    </svg>
  ),
  local: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      width="100%"
      height="100%"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
      />
    </svg>
  ),
  geo: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      width="100%"
      height="100%"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
      />
    </svg>
  ),
  launchpad: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      width="100%"
      height="100%"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
      />
    </svg>
  ),
};

const GBP_URL = "https://maps.app.goo.gl/smpzUJfYEozJgomE8";

const homeSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://jurispage.com/",
  name: "JurisPage - Law Firm Market Gap Analysis",
  url: "https://jurispage.com/",
  description:
    "Free, personalized market-gap analysis for law firms. See search demand, top competitors, your visibility score, and the specific gaps costing you cases.",
  publisher: {
    "@type": "Organization",
    name: "JurisPage",
    url: "https://jurispage.com",
  },
};

/* ────────────────────────────────────────────
   Page component
   ──────────────────────────────────────────── */

export default function HomePage() {
  return (
    <>
      <SchemaOrg schema={homeSchema} />

      {/* ── 1. Announcement Bar ── */}
      <div
        className="w-full py-2.5 px-4 text-center"
        style={{ background: "#EE6C13" }}
      >
        <p className="text-white text-sm max-w-4xl mx-auto">
          Now backed by Juris Digital. Same legal-only focus. More research,
          more firepower, more clarity.{" "}
          <Link
            href="/jurispage-now-backed-by-juris-digital"
            className="text-white underline font-semibold hover:text-orange-100 transition-colors"
          >
            Learn more &rarr;
          </Link>
        </p>
      </div>

      {/* ── 2. Hero Section ── */}
      <section className="bg-white py-16 px-6 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
            {/* Left: 3/5 */}
            <div className="lg:col-span-3">
              <span
                className="inline-block text-xs font-heading font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 text-white"
                style={{ background: "#EE6C13" }}
              >
                Free Law Firm Market Gap Analysis
              </span>

              {/* Google reviews badge */}
              <div className="mb-5">
                <a
                  href={GBP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm no-underline hover:shadow-md transition-shadow"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 48 48"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="#4285F4"
                      d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"
                    />
                    <path
                      fill="#EA4335"
                      d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
                    />
                  </svg>
                  <span className="text-yellow-400 text-sm leading-none">
                    ★★★★★
                  </span>
                  <span className="text-gray-700 text-sm font-semibold">
                    4.9
                  </span>
                  <span className="text-gray-400 text-xs">on Google</span>
                </a>
              </div>

              <h1 className="font-heading font-extrabold text-gray-900 text-4xl md:text-5xl leading-tight mb-5">
                Law Firm Marketing That Shows You Exactly Where You&apos;re Losing Cases
              </h1>

              <p className="text-gray-600 text-xl leading-relaxed mb-8">
                Your law firm marketing strategy starts with knowing where
                you&apos;re losing. Get a personalized market-gap analysis for
                your practice area and city. See how many potential clients
                search for a lawyer like you, who&apos;s winning those searches
                today, and the specific gaps you can close to start winning.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <Link
                  href="/see-my-market-gap"
                  className="inline-block font-heading font-bold text-white text-base px-8 py-4 rounded-full no-underline hover:opacity-90 transition-opacity"
                  style={{
                    background: "linear-gradient(135deg, #EE6C13, #982A0B)",
                  }}
                >
                  See My Market Gap
                </Link>
                <Link
                  href="/services/pricing"
                  className="inline-block font-heading font-bold text-base px-8 py-4 rounded-full no-underline border-2 transition-colors hover:bg-[#FEF3EC]"
                  style={{ borderColor: "#EE6C13", color: "#EE6C13" }}
                >
                  See Our Pricing
                </Link>
              </div>
              <Link
                href="/secret-shop"
                className="text-sm font-semibold no-underline hover:underline transition-colors"
                style={{ color: "#EE6C13" }}
              >
                See What Intake Delays Cost Me &rarr;
              </Link>

              <p className="text-gray-400 text-sm mt-5">
                Free. Personalized. Built for law firms only.
              </p>
            </div>

            {/* Right: 2/5 - MarketGapPreview */}
            <div className="lg:col-span-2">
              <MarketGapPreview />
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Trust Strip (Partner / Recognition Ribbon) ── */}
      <section className="bg-gray-50 border-b border-gray-100 py-8 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xs font-heading font-bold uppercase tracking-widest text-gray-400 mb-6">
            As Seen In &amp; Recognized By
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {partnerLogos.map((logo) => (
              <img
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                className="h-7 w-auto opacity-50 grayscale hover:opacity-80 hover:grayscale-0 transition-all duration-300"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Review Ribbon - after trust strip */}
      <ReviewRibbon />

      {/* ── 4. Start Here Strip ── */}
      <StartHereStrip />

      {/* ── 5. What Your Market Gap Analysis Shows ── */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-heading font-extrabold text-gray-900 text-4xl mb-4">
              What Your Market Gap Analysis Shows
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Everything you need to understand your competitive position
              , delivered in under 60 seconds.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {marketGapItems.map((item) => (
              <div key={item.title} className="text-center">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5 text-white"
                  style={{ background: item.color }}
                >
                  {item.icon}
                </div>
                <h3 className="font-heading font-bold text-gray-900 text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Real Results / Case Studies ── */}
      <section className="bg-[#FEF3EC] py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span
              className="inline-block text-xs font-heading font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 text-white"
              style={{ background: "#EE6C13" }}
            >
              Real Client Results
            </span>
            <h2 className="font-heading font-extrabold text-gray-900 text-4xl mb-4">
              Real Results from Real Law Firms
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We don&apos;t promise clicks. We deliver cases. Here&apos;s what
              happened when these firms partnered with JurisPage.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {caseStudies.map((cs) => (
              <CaseStudyCard key={cs.slug} caseStudy={cs} />
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/case-studies/"
              className="inline-block font-heading font-bold text-white text-sm px-7 py-3.5 rounded-[40px] no-underline hover:opacity-90 transition-opacity"
              style={{ background: "#EE6C13" }}
            >
              View All Success Stories
            </Link>
          </div>
        </div>
      </section>

      {/* ── 7. Why JurisPage is Different ── */}
      <section className="bg-[#1a1a1a] py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-heading font-extrabold text-white text-4xl mb-4">
              We Do Legal Marketing Differently
            </h2>
            <p className="text-gray-400 text-lg">
              Three things that separate us from every other agency in this
              space.
            </p>
          </div>
          <div className="space-y-6">
            {[
              {
                color: "#EE6C13",
                title: "Pricing Published Online",
                body: "Every competitor will make you sit through a 45-minute sales call before they'll tell you what anything costs. We put our starting price on the website and give you a straight answer on cost in the first conversation. No runaround.",
                link: "/services/pricing/",
                linkText: "See all pricing \u2192",
              },
              {
                color: "#EE6C13",
                title: "Month-to-Month Contracts",
                body: "We don't lock you into 12-month agreements and collect a check whether you're happy or not. You stay because the results are there. You leave with 30 days notice if they're not. It's that simple.",
                link: null,
                linkText: null,
              },
              {
                color: "#EE6C13",
                title: "100% Legal Focus",
                body: "We don't do e-commerce SEO. We don't run campaigns for restaurants. Every person on our team lives in legal marketing. That specialization is what makes the difference.",
                link: "/about-us/",
                linkText: "About our team \u2192",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-gray-800 rounded-xl p-8 border-l-4"
                style={{ borderLeftColor: item.color }}
              >
                <h3 className="font-heading font-bold text-white text-xl mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">{item.body}</p>
                {item.link && (
                  <Link
                    href={item.link}
                    className="text-sm font-semibold mt-3 inline-block no-underline"
                    style={{ color: item.color }}
                  >
                    {item.linkText}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. Wall of Proof / Testimonials ── */}
      <section className="bg-[#1a1a1a] py-20 px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span
              className="inline-block text-xs font-heading font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 text-white"
              style={{ background: "#EE6C13" }}
            >
              Real Attorneys. Real Results.
            </span>
            <h2 className="font-heading font-extrabold text-white text-4xl mb-3">
              Don&apos;t Take Our Word for It
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Hear directly from the law firm owners who&apos;ve grown their
              practices with JurisPage.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {wallOfProof.map((item) => (
              <div key={item.videoId} className="flex flex-col gap-4">
                <div className="bg-gray-800 rounded-xl px-3 py-1.5 self-start">
                  <span
                    className="text-xs font-heading font-bold uppercase tracking-widest"
                    style={{ color: "#EE6C13" }}
                  >
                    {item.role}
                  </span>
                </div>
                <YouTubeFacade
                  videoId={item.videoId}
                  title={`${item.author} testimonial - JurisPage`}
                />
                <div>
                  <p className="text-white font-heading font-bold text-lg leading-snug">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    - {item.author}
                    {item.firm ? `, ${item.firm}` : ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. Now Backed by Juris Digital (Ownership Transition) ── */}
      <section className="bg-white py-20 px-6 border-b border-gray-100">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Left: copy */}
          <div>
            <span
              className="inline-block text-xs font-heading font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 text-white"
              style={{ background: "#EE6C13" }}
            >
              New Ownership
            </span>
            <h2 className="font-heading font-extrabold text-gray-900 text-3xl md:text-4xl mb-5 leading-tight">
              A New Era of Legal Growth: JurisPage x Juris Digital
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              In February 2026, JurisPage joined the Juris Digital family. Led
              by CEO Casey Meraz, President &amp; COO Leann Pickard, and CSO Matt Green,
              we&apos;ve united two of the most effective teams in legal SEO to
              provide a level of transparency and performance that general
              agencies simply can&apos;t match.
            </p>
            <Link
              href="/about-us/"
              className="inline-block font-heading font-bold text-white text-sm px-7 py-3.5 rounded-[40px] no-underline hover:opacity-90 transition-opacity"
              style={{ background: "#EE6C13" }}
            >
              Meet the Team
            </Link>
          </div>
          {/* Right: headshots */}
          <div className="flex gap-6 justify-center lg:justify-end">
            {[
              {
                name: "Casey Meraz",
                title: "CEO",
                img: "https://jurisdigital.com/wp-content/uploads/CaseyMeraz_W3A6602.jpg",
              },
              {
                name: "Leann Pickard",
                title: "President & COO",
                img: "https://jurisdigital.com/wp-content/uploads/leann_pickard_chief_operations_officer_juris_digital.png.webp",
              },
              {
                name: "Matt Green",
                title: "Chief Strategy Officer",
                img: "https://jurisdigital.com/wp-content/uploads/MattGreen_W3A6645.jpg",
              },
            ].map((person) => (
              <div key={person.name} className="text-center flex-shrink-0">
                <div className="w-36 h-36 rounded-2xl overflow-hidden shadow-lg mx-auto mb-3">
                  <img
                    src={person.img}
                    alt={`${person.name}, ${person.title} at JurisPage / Juris Digital`}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
                <p className="font-heading font-bold text-gray-900 text-sm">
                  {person.name}
                </p>
                <p className="text-gray-500 text-xs mt-0.5">{person.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. Services Grid ── */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-heading font-extrabold text-gray-900 text-4xl mb-4">
              Everything Your Law Firm Needs to Grow Online
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              All services are available individually or bundled in our three
              transparent pricing tiers.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group bg-white rounded-xl p-6 border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all no-underline block"
              >
                <div className="w-8 h-8 mb-3 text-gray-300 group-hover:text-[#EE6C13] transition-colors">
                  {serviceIcons[service.icon]}
                </div>
                <h3 className="font-heading font-bold text-gray-900 text-lg mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </p>
                <span
                  className="text-sm font-semibold mt-3 inline-block"
                  style={{ color: "#EE6C13" }}
                >
                  Learn more &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11. Practice Areas ── */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-heading font-extrabold text-gray-900 text-4xl mb-4">
            We Market Law Firms Across Every Practice Area
          </h2>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
            Dedicated strategies for how clients search in your specific area
            of law.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {practiceAreas.map((pa) => (
              <Link
                key={pa.href}
                href={pa.href}
                className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-[#1a1a1a] hover:text-white hover:border-[#1a1a1a] transition-all no-underline text-center"
              >
                {pa.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 12. Final CTA ── */}
      <CTASection
        heading="See Where Your Firm Stands"
        subtext="Free market gap analysis. Personalized. Built for law firms only."
        primaryLabel="See My Market Gap"
        primaryHref="/see-my-market-gap"
        secondaryLabel="See Pricing"
        secondaryHref="/services/pricing/"
      />
    </>
  );
}
