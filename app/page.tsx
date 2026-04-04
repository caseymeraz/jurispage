import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import CTASection from "@/components/CTASection";
import SchemaOrg from "@/components/SchemaOrg";
import CaseStudyCard from "@/components/CaseStudyCard";
import ReviewRibbon from "@/components/ReviewRibbon";
import YouTubeFacade from "@/components/YouTubeFacade";
import CountUpStats from "@/components/CountUpStats";
import HeroSearchAnimation from "@/components/HeroSearchAnimation";
import { caseStudies } from "@/data/caseStudies";

export const metadata: Metadata = {
  title: "Law Firm Marketing | Get More Cases | JurisPage",
  description:
    "We help law firms show up online and get more cases. SEO, Google Ads, websites, and AI search built exclusively for attorneys. Month-to-month. Pricing published online.",
  alternates: { canonical: "https://jurispage.com/" },
  openGraph: {
    title: "Law Firm Marketing | Get More Cases | JurisPage",
    description:
      "We help law firms show up online and get more cases. SEO, Google Ads, websites, and AI search built exclusively for attorneys.",
    url: "https://jurispage.com/",
  },
};

/* ────────────────────────────────────────────
   Static data
   ──────────────────────────────────────────── */

const GBP_URL = "https://maps.app.goo.gl/smpzUJfYEozJgomE8";

const painPoints = [
  {
    quote: "I'm paying for marketing but I have no idea what I'm getting.",
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
    ),
  },
  {
    quote: "My website doesn't show up anywhere on Google.",
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
    ),
  },
  {
    quote: "I'm getting leads, but they're all junk.",
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" /></svg>
    ),
  },
  {
    quote: "I can't figure out SEO on top of running my practice.",
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
    ),
  },
];

const stats = [
  { value: "113+", label: "Law firms served" },
  { value: "68%", label: "Avg case increase in 12 months" },
  { value: "$412", label: "Avg cost per organic case inquiry" },
  { value: "4.9", label: "Google review rating" },
];

const partnerLogos = [
  { src: "/images/about/partner-forbes.svg", alt: "Forbes" },
  { src: "/images/about/partner-lawyerist.svg", alt: "Lawyerist" },
  { src: "/images/about/partner-moz.svg", alt: "Moz" },
  { src: "/images/about/partner-unbounce-agency.svg", alt: "Unbounce Agency Partner" },
  { src: "/images/about/partner-expertise-com.svg", alt: "Expertise.com" },
  { src: "/images/about/partner-backlinko.svg", alt: "Backlinko" },
  { src: "/images/about/partner-google.svg", alt: "Google" },
  { src: "/images/about/partner-law360.svg", alt: "Law360" },
];

const transformations = [
  { before: "Invisible online", after: "Showing up when it matters", icon: "eye" },
  { before: "Relying solely on referrals", after: "Multiple case sources feeding the pipeline", icon: "funnel" },
  { before: "Wasting money, unsure what's working", after: "Clear reporting, visible results", icon: "chart" },
  { before: "Doing your own marketing", after: "Focused on practicing law", icon: "scale" },
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
  { icon: "seo", title: "Law Firm SEO", description: "Rank higher in Google for the keywords that bring in qualified case inquiries. Technical, on-page, and link building done right.", href: "/law-firm-seo/" },
  { icon: "ads", title: "Google Ads", description: "Stop wasting budget on bad clicks. We build law firm PPC campaigns that convert searches into signed cases.", href: "/google-ads-for-law-firms/" },
  { icon: "website", title: "Law Firm Websites", description: "Fast, credible, conversion-optimized websites built for law firms. Live in 30 days with the Launchpad package.", href: "/law-firm-websites/" },
  { icon: "local", title: "Local SEO", description: "Get into the Google map pack for searches in your market. The most cost-effective source of local legal leads.", href: "/local-seo-for-law-firms/" },
  { icon: "geo", title: "GEO / AI Search", description: "Get your firm cited inside ChatGPT, Perplexity, and AI Overviews. First-mover advantage before your competitors figure it out.", href: "/generative-engine-optimization-legal-marketing/" },
  { icon: "launchpad", title: "Launchpad", description: "The complete marketing package for attorneys opening a new firm. Website, GBP, local SEO - live in 30 days.", href: "/launchpad/" },
];

const serviceIcons: Record<string, React.ReactNode> = {
  seo: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="100%" height="100%"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>,
  ads: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="100%" height="100%"><path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 1 8.835-2.535m0 0A23.74 23.74 0 0 1 18.795 3m.38 1.125a23.91 23.91 0 0 0 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m-1.394-9.965c.09.38.187.765.292 1.148m-1.394 9.965a24.05 24.05 0 0 1-.292 1.148" /></svg>,
  website: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="100%" height="100%"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0H3" /></svg>,
  local: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="100%" height="100%"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>,
  geo: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="100%" height="100%"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" /></svg>,
  launchpad: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="100%" height="100%"><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" /></svg>,
};

const transformIcons: Record<string, React.ReactNode> = {
  eye: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>,
  funnel: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" /></svg>,
  chart: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" /></svg>,
  scale: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z" /></svg>,
};

const homeSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://jurispage.com/",
  name: "JurisPage - Law Firm Marketing That Gets Cases",
  url: "https://jurispage.com/",
  description: "We help law firms show up online and get more cases. SEO, Google Ads, websites, and AI search built exclusively for attorneys.",
  publisher: { "@type": "Organization", name: "JurisPage", url: "https://jurispage.com" },
};

/* ────────────────────────────────────────────
   Page component — StoryBrand Framework
   ──────────────────────────────────────────── */

export default function HomePage() {
  return (
    <>
      <SchemaOrg schema={homeSchema} />

      {/* ══════════════════════════════════════════
          1. HERO — The Character (Above the Fold)
          ══════════════════════════════════════════ */}
      <section className="bg-white py-16 md:py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Copy */}
            <div>
              {/* Google reviews badge */}
              <a
                href={GBP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm no-underline hover:shadow-md transition-shadow mb-6"
              >
                <svg width="16" height="16" viewBox="0 0 48 48"><path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" /><path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" /><path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z" /><path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" /></svg>
                <span className="text-yellow-400 text-sm leading-none">★★★★★</span>
                <span className="text-gray-700 text-sm font-semibold">4.9</span>
                <span className="text-gray-400 text-xs">on Google</span>
              </a>

              <h1 className="font-heading font-extrabold text-gray-900 text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-6">
                Get More Cases.
              </h1>

              <p className="text-gray-600 text-xl leading-relaxed mb-8 max-w-lg">
                We build and market law firm websites that actually bring in clients. No jargon. No guesswork. Just cases.
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-4">
                <Link
                  href="/growth-report/"
                  className="inline-block font-heading font-bold text-white text-lg px-10 py-5 rounded-full no-underline hover:opacity-90 transition-opacity shadow-lg shadow-orange-200"
                  style={{ background: "linear-gradient(135deg, #EE6C13, #982A0B)" }}
                >
                  Get My Growth Plan
                </Link>
                <Link
                  href="/case-studies/"
                  className="inline-block font-heading font-bold text-lg px-10 py-5 rounded-full no-underline border-2 transition-colors hover:bg-[#FEF3EC]"
                  style={{ borderColor: "#EE6C13", color: "#EE6C13" }}
                >
                  See Our Results
                </Link>
              </div>

              <p className="text-gray-400 text-sm">
                No contracts. Transparent pricing. 113+ law firms served.
              </p>
            </div>

            {/* Right: Interactive search animation */}
            <div className="hidden md:block">
              <HeroSearchAnimation />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          2. PROBLEM — "Sound Familiar?"
          ══════════════════════════════════════════ */}
      <section className="bg-gray-50 py-20 px-6 border-y border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading font-extrabold text-gray-900 text-4xl mb-4">Sound familiar?</h2>
            <p className="text-gray-500 text-lg">Every one of these came from a real conversation with an attorney.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {painPoints.map((point) => (
              <div
                key={point.quote}
                className="bg-white rounded-xl p-6 border border-gray-200 flex items-start gap-4 hover:border-orange-200 hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0 text-[#EE6C13]">
                  {point.icon}
                </div>
                <p className="text-gray-800 text-lg font-medium leading-relaxed">
                  &ldquo;{point.quote}&rdquo;
                </p>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 mt-10 text-base max-w-xl mx-auto">
            A great attorney shouldn&apos;t lose cases to a worse attorney with a better website. That&apos;s the problem we fix.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. TRUST — Logos + Reviews
          ══════════════════════════════════════════ */}
      <section className="bg-white py-8 px-6 border-b border-gray-100">
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

      <ReviewRibbon />

      {/* ══════════════════════════════════════════
          4. GUIDE — Empathy + Authority
          ══════════════════════════════════════════ */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* Empathy */}
            <div>
              <span className="inline-block text-xs font-heading font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 text-white" style={{ background: "#EE6C13" }}>
                Legal Marketing Only
              </span>
              <h2 className="font-heading font-extrabold text-gray-900 text-4xl leading-tight mb-5">
                We only do one thing: help law firms grow.
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                JurisPage works exclusively with attorneys. We know your practice areas, your markets, and the exact online strategies that turn searches into signed cases. We&apos;ve done it for 113+ firms and we&apos;ll show you exactly how we&apos;ll do it for yours.
              </p>
              <p className="text-gray-900 text-lg font-semibold italic border-l-4 pl-5 py-2" style={{ borderColor: "#EE6C13" }}>
                &ldquo;You shouldn&apos;t have to choose between practicing law and marketing your firm.&rdquo;
              </p>
            </div>
            {/* Authority - what makes us different */}
            <div className="space-y-4">
              {[
                { title: "Pricing Published Online", body: "We put our pricing on the website. No 45-minute sales call required to find out what anything costs." },
                { title: "Month-to-Month Contracts", body: "No 12-month lock-ins. You stay because the results are there. You leave with 30 days notice if they're not." },
                { title: "100% Legal Focus", body: "We don't do e-commerce or restaurants. Every person on our team lives in legal marketing. That specialization is what makes the difference." },
              ].map((item) => (
                <div key={item.title} className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                  <h3 className="font-heading font-bold text-gray-900 text-base mb-1 flex items-center gap-2">
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" stroke="#EE6C13" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <CountUpStats stats={stats} />

      {/* ══════════════════════════════════════════
          5. PLAN — "Here's How It Works"
          ══════════════════════════════════════════ */}
      <section className="bg-[#FEF3EC] py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-heading font-extrabold text-gray-900 text-4xl mb-4">Here&apos;s how it works.</h2>
            <p className="text-gray-600 text-lg">Three steps. No mystery. No jargon.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line on desktop */}
            <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-0.5 bg-orange-200" />
            {[
              { step: "1", title: "Tell us about your firm", body: "Practice area, market, goals. Takes 5 minutes. No commitment." },
              { step: "2", title: "We analyze your market", body: "See where you stand, what competitors are doing, and where the opportunity is." },
              { step: "3", title: "Get your growth plan", body: "One clear recommendation. Transparent pricing. No mystery." },
            ].map((item) => (
              <div key={item.step} className="text-center relative z-10">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5 font-heading font-extrabold text-xl text-white shadow-lg" style={{ background: "linear-gradient(135deg, #EE6C13, #982A0B)" }}>
                  {item.step}
                </div>
                <h3 className="font-heading font-bold text-gray-900 text-xl mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/growth-report/"
              className="inline-block font-heading font-bold text-white text-base px-8 py-4 rounded-full no-underline hover:opacity-90 transition-opacity shadow-lg shadow-orange-200"
              style={{ background: "linear-gradient(135deg, #EE6C13, #982A0B)" }}
            >
              Get My Growth Plan
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          6. SUCCESS — Transformation
          ══════════════════════════════════════════ */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-heading font-extrabold text-gray-900 text-4xl mb-4">This is where you&apos;re headed.</h2>
            <p className="text-gray-600 text-lg max-w-xl mx-auto">The transformation our clients experience when their marketing actually works.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
            {transformations.map((t) => (
              <div key={t.before} className="bg-gray-50 rounded-xl p-6 border border-gray-200 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0 text-[#EE6C13]">
                  {transformIcons[t.icon]}
                </div>
                <div>
                  <p className="text-gray-400 text-sm line-through mb-1">{t.before}</p>
                  <p className="text-gray-900 font-semibold text-base">{t.after}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-[#FEF3EC] rounded-2xl p-8 md:p-10 text-center max-w-3xl mx-auto border border-orange-100">
            <p className="text-gray-800 text-xl md:text-2xl leading-relaxed font-heading italic mb-4">
              &ldquo;Imagine opening your laptop Monday morning to three new qualified consultations. From people who found you, not the other way around. That&apos;s what happens when your marketing actually works.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          7. PROOF — Case Studies
          ══════════════════════════════════════════ */}
      <section className="bg-gray-50 py-20 px-6 border-y border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-heading font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 text-white" style={{ background: "#EE6C13" }}>
              Real Client Results
            </span>
            <h2 className="font-heading font-extrabold text-gray-900 text-4xl mb-4">
              Real Results from Real Law Firms
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We don&apos;t promise clicks. We deliver cases.
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

      {/* ══════════════════════════════════════════
          8. WALL OF PROOF — Video Testimonials
          ══════════════════════════════════════════ */}
      <section className="bg-[#1a1a1a] py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-heading font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 text-white" style={{ background: "#EE6C13" }}>
              Real Attorneys. Real Results.
            </span>
            <h2 className="font-heading font-extrabold text-white text-4xl mb-3">Don&apos;t Take Our Word for It</h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">Hear directly from the law firm owners who&apos;ve grown their practices with JurisPage.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {wallOfProof.map((item) => (
              <div key={item.videoId} className="flex flex-col gap-4">
                <div className="bg-gray-800 rounded-xl px-3 py-1.5 self-start">
                  <span className="text-xs font-heading font-bold uppercase tracking-widest" style={{ color: "#EE6C13" }}>{item.role}</span>
                </div>
                <YouTubeFacade videoId={item.videoId} title={`${item.author} testimonial - JurisPage`} />
                <div>
                  <p className="text-white font-heading font-bold text-lg leading-snug">&ldquo;{item.quote}&rdquo;</p>
                  <p className="text-gray-400 text-sm mt-1">- {item.author}{item.firm ? `, ${item.firm}` : ""}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          9. FAILURE — Stakes (subtle)
          ══════════════════════════════════════════ */}
      <section className="bg-[#0F172A] py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading font-extrabold text-white text-3xl md:text-4xl mb-6 leading-tight">
            Every day you&apos;re not on page one, those cases go to someone else.
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed mb-4">
            Not because they&apos;re a better lawyer. Because they were easier to find.
          </p>
          <p className="text-slate-400 text-base leading-relaxed mb-10">
            The firms winning online right now are building a lead that compounds every month. The longer you wait, the harder and more expensive it gets to catch up.
          </p>
          <Link
            href="/contact/"
            className="inline-block font-heading font-bold text-white text-base px-8 py-4 rounded-full no-underline hover:opacity-90 transition-opacity"
            style={{ background: "linear-gradient(135deg, #EE6C13, #982A0B)" }}
          >
            Stop Losing Cases
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          10. SERVICES — What We Do
          ══════════════════════════════════════════ */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-heading font-extrabold text-gray-900 text-4xl mb-4">
              Everything Your Law Firm Needs to Grow Online
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              All services available individually or bundled. Transparent pricing on every one.
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
                <h3 className="font-heading font-bold text-gray-900 text-lg mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                <span className="text-sm font-semibold mt-3 inline-block" style={{ color: "#EE6C13" }}>Learn more &rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          11. FINAL CTA
          ══════════════════════════════════════════ */}
      <CTASection
        heading="Ready to start getting the cases you deserve?"
        subtext="No contracts. No jargon. Just a clear path to more cases."
        primaryLabel="Get My Growth Plan"
        primaryHref="/growth-report/"
        secondaryLabel="See Pricing"
        secondaryHref="/services/pricing/"
      />
    </>
  );
}
