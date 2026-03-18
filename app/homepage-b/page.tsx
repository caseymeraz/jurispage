import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import CTASection from "@/components/CTASection";
import SchemaOrg from "@/components/SchemaOrg";
import CaseStudyCard from "@/components/CaseStudyCard";
import ReviewRibbon from "@/components/ReviewRibbon";
import YouTubeFacade from "@/components/YouTubeFacade";
import { caseStudies } from "@/data/caseStudies";

export const metadata: Metadata = {
  title: "Law Firm Marketing Agency | JurisPage",
  description:
    "Law firm marketing that measures success by cases signed, not rankings reported. SEO, Google Ads, websites, and AI search for attorneys. Month-to-month. Pricing published online.",
  robots: { index: false, follow: false },
};

/* ────────────────────────────────────────────
   Static data
   ──────────────────────────────────────────── */

const stats = [
  { value: "113+", label: "Law firms served" },
  { value: "68%", label: "Avg case increase in 12 mo" },
  { value: "$412", label: "Avg cost per organic case inquiry" },
  { value: "4.9", label: "Google review rating" },
];

const services = [
  {
    title: "Law Firm SEO",
    description: "Rank for the keywords that produce signed cases, not just traffic. Technical foundation, authoritative content, and real backlinks.",
    href: "/law-firm-seo/",
    stat: "+3,942%",
    statLabel: "traffic increase (GJEL)",
  },
  {
    title: "Google Ads",
    description: "Stop paying $200/click for junk leads. Practice-area targeting, negative keyword lists, and landing pages built to convert.",
    href: "/google-ads-for-law-firms/",
    stat: "+100",
    statLabel: "monthly SQLs (Immigration Desk)",
  },
  {
    title: "Law Firm Websites",
    description: "Fast, mobile-first, conversion-optimized. Built for attorneys, live in 30 days. You own the code.",
    href: "/law-firm-websites/",
    stat: "30",
    statLabel: "days to launch",
  },
  {
    title: "Local SEO",
    description: "Get into the map pack. 44% of local search clicks go to the top 3 map results. If you are not there, your competitors are getting those calls.",
    href: "/local-seo-for-law-firms/",
    stat: "44%",
    statLabel: "of clicks go to map pack",
  },
  {
    title: "GEO / AI Search",
    description: "Get your firm cited inside ChatGPT, Perplexity, and Google AI Overviews before your competitors figure out this channel exists.",
    href: "/generative-engine-optimization-legal-marketing/",
    stat: "28%",
    statLabel: "of consumers use ChatGPT for lawyers",
  },
  {
    title: "Launchpad",
    description: "The complete marketing package for attorneys opening a new firm. Website, Google Business Profile, local SEO. Live in 30 days.",
    href: "/launchpad/",
    stat: "$2K",
    statLabel: "/mo starting price",
  },
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

const practiceAreas = [
  { label: "Personal Injury", href: "/personal-injury-lawyer-marketing/" },
  { label: "Criminal Defense", href: "/criminal-defense-lawyer-marketing/" },
  { label: "Family Law", href: "/family-law-firm-marketing/" },
  { label: "Immigration", href: "/immigration-lawyer-marketing/" },
  { label: "Estate Planning", href: "/estate-planning-lawyer-marketing/" },
  { label: "Bankruptcy", href: "/bankruptcy-lawyer-marketing/" },
  { label: "Employment Law", href: "/employment-lawyer-marketing/" },
  { label: "DUI Defense", href: "/dui-lawyer-marketing/" },
  { label: "Solo Attorneys", href: "/solo-attorney-marketing/" },
  { label: "Small Law Firms", href: "/small-law-firm-marketing/" },
  { label: "Workers' Comp", href: "/workers-comp-lawyer-marketing/" },
  { label: "Medical Malpractice", href: "/medical-malpractice-lawyer-marketing/" },
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

const GBP_URL = "https://maps.app.goo.gl/smpzUJfYEozJgomE8";

/* ────────────────────────────────────────────
   Page component
   ──────────────────────────────────────────── */

export default function HomepageB() {
  return (
    <>
      <SchemaOrg schema={{ "@context": "https://schema.org", "@type": "WebPage", name: "JurisPage Homepage B", url: "https://jurispage.com/homepage-b" }} />

      {/* ── 1. Hero: Dark, bold, problem-first ── */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(165deg, #0f0f0f 0%, #1a1a1a 50%, #241208 100%)" }}>
        {/* Subtle grain texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />

        <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32">
          <div className="max-w-3xl">
            {/* Google reviews badge */}
            <a
              href={GBP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-8 no-underline hover:bg-white/10 transition-colors"
            >
              <span className="text-yellow-400 text-sm">★★★★★</span>
              <span className="text-white text-sm font-semibold">4.9</span>
              <span className="text-gray-500 text-xs">on Google</span>
              <span className="text-gray-600 text-xs">|</span>
              <span className="text-gray-400 text-xs">113+ law firms served</span>
            </a>

            <h1 className="font-heading font-extrabold text-white text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-6 tracking-tight">
              Your competitors are
              <br />
              <span style={{ color: "#EE6C13" }}>signing your cases.</span>
            </h1>

            <p className="text-gray-400 text-xl md:text-2xl leading-relaxed mb-10 max-w-2xl">
              Every day you are not ranking, someone else answers the phone. We build the SEO, ads, and web presence that makes your firm the one potential clients find first.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Link
                href="/see-my-market-gap"
                className="inline-flex items-center gap-2 font-heading font-bold text-white text-base px-8 py-4 rounded-full no-underline transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(238,108,19,0.3)]"
                style={{ background: "linear-gradient(135deg, #EE6C13, #982A0B)" }}
              >
                See My Market Gap
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3.33 8h9.34M8.67 4l4 4-4 4" /></svg>
              </Link>
              <Link
                href="/services/pricing"
                className="inline-block font-heading font-bold text-base px-8 py-4 rounded-full no-underline border border-white/20 text-white hover:bg-white/5 transition-colors"
              >
                See Pricing
              </Link>
            </div>

            <p className="text-gray-600 text-sm">No contracts. No mystery pricing. No wasted budget.</p>
          </div>
        </div>

        {/* Stats bar embedded in hero */}
        <div className="relative border-t border-white/10">
          <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-heading font-extrabold text-3xl md:text-4xl mb-1" style={{ color: "#EE6C13" }}>{stat.value}</div>
                  <div className="text-gray-500 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Trust logos ── */}
      <section className="bg-white border-b border-gray-100 py-8 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-[10px] font-heading font-bold uppercase tracking-[0.2em] text-gray-400 mb-5">
            Recognized By
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {partnerLogos.map((logo) => (
              <img
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                className="h-6 w-auto opacity-40 grayscale hover:opacity-70 hover:grayscale-0 transition-all duration-300"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Review ribbon */}
      <ReviewRibbon />

      {/* ── 3. The Problem / Solution ── */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <span className="text-xs font-heading font-bold uppercase tracking-[0.2em] text-red-500 mb-3 block">The problem</span>
              <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-5 leading-tight">
                Most law firm marketing is built on vanity metrics
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Your last agency sent reports full of impressions, keyword charts, and traffic numbers. When you asked how many cases came from organic search last month, they could not answer.
              </p>
              <p className="text-gray-600 leading-relaxed">
                That is because they are optimizing for their dashboard, not your intake line.
              </p>
            </div>
            <div>
              <span className="text-xs font-heading font-bold uppercase tracking-[0.2em] mb-3 block" style={{ color: "#EE6C13" }}>How we fix it</span>
              <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-5 leading-tight">
                We measure one thing: cases signed
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Every dollar we spend is tied to qualified leads generated, cost per lead, and cases signed. If we cannot connect our work to your intake, we have not done our job.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Month-to-month contracts mean we earn your business every 30 days. Pricing is published online. No discovery calls required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Services: card grid with proof stats ── */}
      <section className="bg-gray-50 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading font-extrabold text-gray-900 text-4xl mb-4">
              Everything your firm needs to grow
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Each service is available individually or bundled in our transparent pricing tiers.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((svc) => (
              <Link
                key={svc.href}
                href={svc.href}
                className="group relative bg-white rounded-2xl p-7 border border-gray-100 hover:border-gray-300 hover:shadow-xl transition-all duration-300 no-underline block overflow-hidden"
              >
                {/* Accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" style={{ background: "#EE6C13" }} />

                <div className="flex items-baseline justify-between mb-4">
                  <h3 className="font-heading font-bold text-gray-900 text-lg group-hover:text-[#EE6C13] transition-colors">{svc.title}</h3>
                  <div className="text-right flex-shrink-0 ml-4">
                    <span className="font-heading font-extrabold text-xl" style={{ color: "#EE6C13" }}>{svc.stat}</span>
                    <span className="block text-[10px] text-gray-400 leading-tight">{svc.statLabel}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{svc.description}</p>
                <span className="text-sm font-semibold" style={{ color: "#EE6C13" }}>
                  Learn more &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Case studies ── */}
      <section className="py-24 px-6" style={{ background: "#FEF3EC" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-heading font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full mb-4 text-white" style={{ background: "#EE6C13" }}>
              Client Results
            </span>
            <h2 className="font-heading font-extrabold text-gray-900 text-4xl mb-4">
              Proof, not promises
            </h2>
            <p className="text-gray-600 text-lg max-w-xl mx-auto">
              Real numbers from real law firms.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {caseStudies.map((cs) => (
              <CaseStudyCard key={cs.slug} caseStudy={cs} />
            ))}
          </div>
          <div className="text-center">
            <Link href="/case-studies/" className="inline-block font-heading font-bold text-white text-sm px-7 py-3.5 rounded-full no-underline hover:opacity-90 transition-opacity" style={{ background: "#EE6C13" }}>
              View All Results
            </Link>
          </div>
        </div>
      </section>

      {/* ── 6. Wall of Proof: video testimonials ── */}
      <section className="py-24 px-6" style={{ background: "#0f0f0f" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-heading font-extrabold text-white text-4xl mb-3">
              Hear it from the attorneys
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Not actors. Not stock photos. Real law firm owners talking about real results.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {wallOfProof.map((item) => (
              <div key={item.videoId} className="flex flex-col gap-4">
                <YouTubeFacade
                  videoId={item.videoId}
                  title={`${item.author} testimonial`}
                />
                <div className="bg-white/5 rounded-xl p-5">
                  <p className="text-white font-heading font-bold text-lg leading-snug mb-2">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <p className="text-gray-500 text-sm">
                    {item.author}{item.firm ? `, ${item.firm}` : ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Three differentiators: side-by-side ── */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-4xl mb-16 text-center">
            Three things every other agency won&apos;t do
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                number: "01",
                title: "Publish pricing",
                body: "Our pricing is on the website. You will never sit through a 45-minute sales call to learn what anything costs.",
                link: "/services/pricing/",
              },
              {
                number: "02",
                title: "Month-to-month",
                body: "No 12-month lock-ins. You stay because the results are there. Cancel with 30 days notice.",
                link: null,
              },
              {
                number: "03",
                title: "100% legal focus",
                body: "We do not do e-commerce. We do not run campaigns for restaurants. Every person on our team works exclusively with law firms.",
                link: "/about-us/",
              },
            ].map((item) => (
              <div key={item.number} className="relative">
                <span className="font-heading font-extrabold text-6xl leading-none block mb-4" style={{ color: "#EE6C13", opacity: 0.15 }}>{item.number}</span>
                <h3 className="font-heading font-bold text-gray-900 text-xl mb-3 -mt-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{item.body}</p>
                {item.link && (
                  <Link href={item.link} className="text-sm font-semibold mt-4 inline-block no-underline" style={{ color: "#EE6C13" }}>
                    Learn more &rarr;
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. Ownership transition ── */}
      <section className="bg-gray-50 py-24 px-6 border-y border-gray-100">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-14 items-center">
          <div className="lg:col-span-3">
            <span className="text-xs font-heading font-bold uppercase tracking-[0.2em] mb-3 block" style={{ color: "#EE6C13" }}>Now backed by Juris Digital</span>
            <h2 className="font-heading font-extrabold text-gray-900 text-3xl md:text-4xl mb-5 leading-tight">
              Two legal-only teams. One mission.
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              In 2026, JurisPage joined the Juris Digital family. Led by CEO Casey Meraz, President Leann Pickard, and CSO Matt Green, we now have more firepower, more research capability, and the same laser focus on law firms.
            </p>
            <Link href="/about-us/" className="inline-block font-heading font-bold text-white text-sm px-7 py-3.5 rounded-full no-underline hover:opacity-90 transition-opacity" style={{ background: "#EE6C13" }}>
              Meet the Team
            </Link>
          </div>
          <div className="lg:col-span-2 flex gap-5 justify-center lg:justify-end">
            {[
              { name: "Casey Meraz", title: "CEO", img: "https://jurisdigital.com/wp-content/uploads/CaseyMeraz_W3A6602.jpg" },
              { name: "Leann Pickard", title: "President & COO", img: "https://jurisdigital.com/wp-content/uploads/leann_pickard_chief_operations_officer_juris_digital.png.webp" },
              { name: "Matt Green", title: "CSO", img: "https://jurisdigital.com/wp-content/uploads/MattGreen_W3A6645.jpg" },
            ].map((person) => (
              <div key={person.name} className="text-center flex-shrink-0">
                <div className="w-28 h-28 rounded-2xl overflow-hidden shadow-lg mx-auto mb-3 ring-2 ring-white">
                  <img src={person.img} alt={`${person.name}, ${person.title}`} className="w-full h-full object-cover object-top" loading="lazy" />
                </div>
                <p className="font-heading font-bold text-gray-900 text-sm">{person.name}</p>
                <p className="text-gray-500 text-xs mt-0.5">{person.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. Practice areas ── */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-4">
            Dedicated strategies for every practice area
          </h2>
          <p className="text-gray-500 text-base mb-10 max-w-xl mx-auto">
            Your practice area has unique search patterns, competition dynamics, and client behavior. We build for that.
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

      {/* ── 10. Final CTA ── */}
      <CTASection
        heading="See where your firm stands"
        subtext="Free market gap analysis. Personalized for your practice area and city. No obligation."
        primaryLabel="See My Market Gap"
        primaryHref="/see-my-market-gap"
        secondaryLabel="See Pricing"
        secondaryHref="/services/pricing/"
      />
    </>
  );
}
