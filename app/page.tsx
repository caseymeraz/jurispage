import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import CTASection from "@/components/CTASection";
import SchemaOrg from "@/components/SchemaOrg";
import CaseStudyCard from "@/components/CaseStudyCard";
import HeroForm from "@/components/HeroForm";
import ReviewRibbon from "@/components/ReviewRibbon";
import { caseStudies } from "@/data/caseStudies";

export const metadata: Metadata = {
  title: "Law Firm Marketing That Gets Cases, Not Just Clicks | JurisPage",
  description: "JurisPage provides ethical, transparent digital marketing for law firms. SEO, Google Ads, websites, GEO. Transparent pricing, month-to-month contracts, 113+ law firms served.",
  alternates: { canonical: "https://jurispage.com/" },
  openGraph: {
    title: "Law Firm Marketing That Gets Cases, Not Just Clicks | JurisPage",
    description: "Transparent legal marketing for small and mid-market law firms. SEO, Google Ads, websites. Month-to-month. Pricing published online.",
    url: "https://jurispage.com/",
  },
};

const trustStats = [
  { value: "113+", label: "Law Firms Served" },
  { value: "15+", label: "Years in Legal Marketing" },
  { value: "Month-to-Month", label: "No Long-Term Contracts" },
  { value: "90-Day", label: "Results Guarantee" },
];

const services = [
  {
    icon: "seo",
    title: "Law Firm SEO",
    description: "Rank higher in Google for the keywords that bring in qualified case inquiries. Technical, on-page, and link building done right.",
    href: "/law-firm-seo/",
  },
  {
    icon: "ads",
    title: "Google Ads",
    description: "Stop wasting budget on bad clicks. We build law firm PPC campaigns that convert searches into signed cases.",
    href: "/google-ads-for-law-firms/",
  },
  {
    icon: "website",
    title: "Law Firm Websites",
    description: "Fast, credible, conversion-optimized websites built for law firms. Live in 30 days with the Launchpad package.",
    href: "/law-firm-websites/",
  },
  {
    icon: "local",
    title: "Local SEO",
    description: "Get into the Google map pack for searches in your market. The most cost-effective source of local legal leads.",
    href: "/local-seo-for-law-firms/",
  },
  {
    icon: "geo",
    title: "GEO / AI Search",
    description: "Get your firm cited inside ChatGPT, Perplexity, and AI Overviews. First-mover advantage before your competitors figure it out.",
    href: "/generative-engine-optimization-for-law-firms/",
  },
  {
    icon: "launchpad",
    title: "Launchpad",
    description: "The complete marketing package for attorneys opening a new firm. Website, GBP, local SEO - live in 30 days.",
    href: "/launchpad/",
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
  { label: "SSDI", href: "/social-security-disability-lawyer-marketing/" },
];

const homeSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://jurispage.com/",
  name: "JurisPage - Law Firm Marketing",
  url: "https://jurispage.com/",
  description: "Ethical, transparent law firm marketing. SEO, Google Ads, website design, GEO. Month-to-month contracts. Serving 113+ law firms nationwide.",
  publisher: {
    "@type": "Organization",
    name: "JurisPage",
    url: "https://jurispage.com",
  },
};

const GBP_URL = "https://search.google.com/local/reviews?placeid=REPLACE_WITH_PLACE_ID";

const serviceIcons: Record<string, React.ReactNode> = {
  seo: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="100%" height="100%">
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
  ),
  ads: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="100%" height="100%">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 1 8.835-2.535m0 0A23.74 23.74 0 0 1 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m-1.394-9.965c.09.38.187.765.292 1.148m-1.394 9.965a24.05 24.05 0 0 1-.292 1.148" />
    </svg>
  ),
  website: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="100%" height="100%">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0H3" />
    </svg>
  ),
  local: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="100%" height="100%">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
  ),
  geo: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="100%" height="100%">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
    </svg>
  ),
  launchpad: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="100%" height="100%">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
    </svg>
  ),
};

export default function HomePage() {
  return (
    <>
      <SchemaOrg schema={homeSchema} />

      {/* Hero */}
      <section className="bg-white py-16 px-6 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: headline + proof */}
            <div className="pt-4">
              <span className="inline-block text-xs font-heading font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 text-white" style={{ background: "#EE6C13" }}>
                Law Firm Marketing
              </span>
              <div className="mb-5">
                <a href={GBP_URL} target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm no-underline hover:shadow-md transition-shadow">
                  <svg width="16" height="16" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/>
                    <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/>
                    <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"/>
                    <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"/>
                  </svg>
                  <span className="text-yellow-400 text-sm leading-none">★★★★★</span>
                  <span className="text-gray-700 text-sm font-semibold">4.9</span>
                  <span className="text-gray-400 text-xs">on Google</span>
                </a>
              </div>
              <h1 className="font-heading font-extrabold text-gray-900 text-4xl md:text-5xl leading-tight mb-6">
                Stop Losing Cases to Firms With Worse Lawyers
              </h1>
              <p className="text-gray-600 text-xl leading-relaxed mb-8">
                Your competitors are outranking you online. JurisPage fixes that with ethical, transparent digital marketing built exclusively for law firms.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {trustStats.map((stat) => (
                  <div key={stat.label} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <div className="font-heading font-extrabold text-xl" style={{ color: "#EE6C13" }}>{stat.value}</div>
                    <div className="text-gray-600 text-sm mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
              <Link
                href="/services/pricing/"
                className="text-sm font-semibold no-underline transition-colors"
                style={{ color: "#EE6C13" }}
              >
                See transparent pricing →
              </Link>
            </div>
            {/* Right: inline form */}
            <div>
              <HeroForm
                ctaLabel="Start Getting Better Cases"
                subtext="No contracts. No commitment. We'll respond within one business day."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-gray-50 border-b border-gray-100 py-6 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {trustStats.map((stat) => (
            <div key={stat.label}>
              <div className="font-heading font-extrabold text-2xl" style={{ color: "#EE6C13" }}>{stat.value}</div>
              <div className="text-gray-600 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <ReviewRibbon />

      {/* Services */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-heading font-extrabold text-gray-900 text-4xl mb-4">Everything Your Law Firm Needs to Grow Online</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">All services are available individually or bundled in our three transparent pricing tiers.</p>
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
                <span className="text-sm font-semibold mt-3 inline-block" style={{ color: "#EE6C13" }}>Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* We Understand / Our Approach */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-xs font-heading font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 text-white" style={{ background: "#EE6C13" }}>
              100% Legal Focus
            </span>
            <h2 className="font-heading font-extrabold text-gray-900 text-3xl md:text-4xl mb-4 leading-tight">
              We Understand the Pressure of Filling a Pipeline
            </h2>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Law firm owners don&apos;t have time to babysit an agency. You need a partner who understands your market, shows up with results, and tells you the truth - even when it&apos;s not what you want to hear.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              JurisPage was built to do exactly that. We work exclusively with law firms, which means every strategy we recommend has been tested across 113+ firms in your exact situation.
            </p>
            <Link
              href="/about-us/"
              className="inline-block font-heading font-bold text-white text-sm px-7 py-3.5 rounded-[40px] no-underline hover:opacity-90 transition-opacity"
              style={{ background: "#EE6C13" }}
            >
              About JurisPage
            </Link>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/images/we-understand.jpg"
              alt="Law firm marketing team understanding client needs and case acquisition goals"
              width={600}
              height={720}
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="bg-[#FEF3EC] py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="rounded-2xl overflow-hidden shadow-xl order-2 md:order-1">
            <Image
              src="/images/our-approach.jpg"
              alt="JurisPage law firm marketing approach - research, strategy, and execution"
              width={600}
              height={750}
              className="w-full h-auto"
            />
          </div>
          <div className="order-1 md:order-2">
            <span className="inline-block text-xs font-heading font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 text-white" style={{ background: "#EE6C13" }}>
              Our Process
            </span>
            <h2 className="font-heading font-extrabold text-gray-900 text-3xl md:text-4xl mb-4 leading-tight">
              Strategy First. Execution Second. Results Always.
            </h2>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Every engagement starts with an honest audit of where you are. We research your market, analyze your competitors, and build a strategy that fits your budget and goals - before we touch anything.
            </p>
            <ul className="space-y-3 mb-8">
              {["Market and competitor analysis before any work begins", "Transparent monthly reporting tied to leads and cases, not rankings", "Dedicated point of contact who knows your firm by name"].map((item) => (
                <li key={item} className="flex gap-3 items-start">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white mt-0.5" style={{ background: "#EE6C13" }}>✓</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/contact/"
              className="inline-block font-heading font-bold text-white text-sm px-7 py-3.5 rounded-[40px] no-underline hover:opacity-90 transition-opacity"
              style={{ background: "#EE6C13" }}
            >
              Book Your Strategy Session
            </Link>
          </div>
        </div>
      </section>

      {/* Real Results - Case Studies */}
      <section className="bg-[#FEF3EC] py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-heading font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 text-white" style={{ background: "#EE6C13" }}>
              Real Client Results
            </span>
            <h2 className="font-heading font-extrabold text-gray-900 text-4xl mb-4">Real Results from Real Law Firms</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">We don&apos;t promise clicks. We deliver cases. Here&apos;s what happened when these firms partnered with JurisPage.</p>
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

      {/* Why JurisPage */}
      <section className="bg-[#1a1a1a] py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-heading font-extrabold text-white text-4xl mb-4">We Do Legal Marketing Differently</h2>
            <p className="text-gray-400 text-lg">Three things that separate us from every other agency in this space.</p>
          </div>
          <div className="space-y-6">
            {[
              {
                color: "#EE6C13",
                title: "Pricing Published Online",
                body: "Every competitor will make you sit through a 45-minute sales call before they'll tell you what anything costs. We put our starting price on the website and give you a straight answer on cost in the first conversation. No runaround.",
                link: "/services/pricing/",
                linkText: "See all pricing →",
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
                linkText: "About our team →",
              },
            ].map((item) => (
              <div key={item.title} className="bg-gray-800 rounded-xl p-8 border-l-4" style={{ borderLeftColor: item.color }}>
                <h3 className="font-heading font-bold text-white text-xl mb-3">{item.title}</h3>
                <p className="text-gray-300 leading-relaxed">{item.body}</p>
                {item.link && (
                  <Link href={item.link} className="text-sm font-semibold mt-3 inline-block no-underline" style={{ color: item.color }}>
                    {item.linkText}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practice Areas */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-heading font-extrabold text-gray-900 text-4xl mb-4">We Market Law Firms Across Every Practice Area</h2>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto">Dedicated strategies for how clients search in your specific area of law.</p>
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

      {/* Pricing Preview */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading font-extrabold text-gray-900 text-4xl mb-4">Simple, Transparent Pricing</h2>
          <p className="text-gray-600 text-lg mb-3">We publish our pricing because we&apos;re not afraid of scrutiny.</p>
          <p className="text-gray-600 mb-10">Plans starting at $2,000/month. Month-to-month. Results in 90 days or we work for free.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { name: "Launchpad", price: "Starting at $2,000", desc: "New & startup firms" },
              { name: "Grow", price: "Starting at $2,000", desc: "Established firms", featured: true },
              { name: "Dominate", price: "Starting at $2,000", desc: "Market leaders" },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`rounded-xl p-6 text-center ${plan.featured ? "bg-[#1a1a1a] border-2 text-white" : "bg-white border border-gray-200 text-gray-900"}`}
                style={plan.featured ? { borderColor: "#EE6C13" } : {}}
              >
                {plan.featured && (
                  <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#EE6C13" }}>Most Popular</div>
                )}
                <div className="font-heading font-extrabold text-xl mb-1">{plan.name}</div>
                <div className="font-heading font-extrabold text-4xl mb-1" style={{ color: "#EE6C13" }}>{plan.price}</div>
                <div className={`text-sm mb-4 ${plan.featured ? "text-gray-400" : "text-gray-500"}`}>/month · {plan.desc}</div>
                <Link href="/services/pricing/" className="text-sm font-semibold no-underline" style={{ color: "#EE6C13" }}>See what&apos;s included →</Link>
              </div>
            ))}
          </div>
          <Link
            href="/services/pricing/"
            className="inline-block font-heading font-bold text-white text-base px-8 py-4 rounded-[40px] no-underline hover:opacity-90 transition-opacity"
            style={{ background: "#EE6C13" }}
          >
            View Full Pricing Details
          </Link>
        </div>
      </section>

      <CTASection
        heading="Book Your Strategy Session"
        subtext="No long-term contracts. Transparent pricing. 113+ law firms served."
        primaryLabel="Book Your Strategy Session"
        primaryHref="/contact/"
        secondaryLabel="See Pricing"
        secondaryHref="/services/pricing/"
      />
    </>
  );
}
