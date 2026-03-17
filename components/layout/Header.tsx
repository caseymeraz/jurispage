"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const services = [
  { label: "Law Firm SEO", href: "/law-firm-seo/", desc: "Rank #1 in Google for your practice area and city" },
  { label: "Google Ads for Law Firms", href: "/google-ads-for-law-firms/", desc: "Case inquiries within 24-48 hours of launch" },
  { label: "Law Firm Websites", href: "/law-firm-websites/", desc: "WordPress sites you own, built to convert" },
  { label: "Local SEO for Law Firms", href: "/local-seo-for-law-firms/", desc: "Dominate the Google Maps 3-Pack in your market" },
  { label: "Launchpad (New Firms)", href: "/launchpad/", desc: "Full digital presence launched in 30 days" },
  { label: "GEO / AI Search", href: "/generative-engine-optimization-legal-marketing/", desc: "Get cited by ChatGPT, Perplexity, and Gemini" },
  { label: "AI Chatbot", href: "/ai-chatbot-for-law-firm-website/", desc: "Convert after-hours visitors into consultations" },
  { label: "Email Marketing", href: "/law-firm-email-marketing/", desc: "Stay top-of-mind with your referral network" },
  { label: "Bing Ads for Lawyers", href: "/bing-ads-for-lawyers/", desc: "Capture leads your competitors ignore" },
  { label: "Content Writing", href: "/law-firm-content-writing/", desc: "Attorney-focused content built for rankings" },
];

const practiceAreas = [
  { label: "Personal Injury", href: "/personal-injury-lawyer-marketing/" },
  { label: "Criminal Defense", href: "/criminal-defense-lawyer-marketing/" },
  { label: "Family Law", href: "/family-law-firm-marketing/" },
  { label: "Immigration", href: "/immigration-lawyer-marketing/" },
  { label: "Bankruptcy", href: "/bankruptcy-lawyer-marketing/" },
  { label: "Estate Planning", href: "/estate-planning-lawyer-marketing/" },
  { label: "Employment Law", href: "/employment-lawyer-marketing/" },
  { label: "Solo Attorneys", href: "/solo-attorney-marketing/" },
  { label: "Small Law Firms", href: "/small-law-firm-marketing/" },
  { label: "DUI Defense", href: "/dui-lawyer-marketing/" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [practiceOpen, setPracticeOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobilePracticeOpen, setMobilePracticeOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const servicesCol1 = services.slice(0, 5);
  const servicesCol2 = services.slice(5);

  return (
    <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center no-underline">
            <Image
              src="/images/jurispage-logo-dark.svg"
              alt="JurisPage Law Firm Marketing"
              width={260}
              height={56}
              priority
              className="h-11 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-6 text-sm">
            {/* Services Mega-Menu */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className="text-gray-700 hover:text-gray-900 font-medium flex items-center gap-1 transition-colors"
                aria-expanded={servicesOpen}
              >
                Services <span className="text-xs">▾</span>
              </button>
              {/* Mega-menu panel (always in DOM for SEO crawlability) */}
              <div
                className={`absolute top-full left-0 min-w-[740px] bg-white rounded-xl shadow-2xl border border-gray-100 pt-2 px-6 pb-6 z-50 transition-all duration-200 ease-out
                  ${servicesOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"}`}
              >
                <div className="grid grid-cols-3 gap-6">
                  {/* Col 1: first 5 services */}
                  <div className="space-y-1">
                    {servicesCol1.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        className="block hover:bg-orange-50 rounded-lg px-3 py-2 no-underline transition-colors"
                      >
                        <span className="font-semibold text-gray-900 text-sm">{s.label}</span>
                        <span className="text-xs text-gray-500 block mt-0.5">{s.desc}</span>
                      </Link>
                    ))}
                  </div>
                  {/* Col 2: last 5 services */}
                  <div className="space-y-1">
                    {servicesCol2.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        className="block hover:bg-orange-50 rounded-lg px-3 py-2 no-underline transition-colors"
                      >
                        <span className="font-semibold text-gray-900 text-sm">{s.label}</span>
                        <span className="text-xs text-gray-500 block mt-0.5">{s.desc}</span>
                      </Link>
                    ))}
                    <Link
                      href="/services/"
                      className="block px-3 pt-2 text-sm font-semibold no-underline hover:underline transition-colors"
                      style={{ color: "#EE6C13" }}
                    >
                      View All Services →
                    </Link>
                  </div>
                  {/* Col 3: Featured card */}
                  <div
                    className="rounded-xl p-5 flex flex-col justify-between"
                    style={{ background: "linear-gradient(135deg, #EE6C13, #982A0B)" }}
                  >
                    <div>
                      <p className="text-white font-bold text-base mb-2">See My Market Gap</p>
                      <p className="text-white/90 text-sm leading-relaxed">
                        See exactly where your firm is losing your market, and what it takes to win. Free and personalized.
                      </p>
                    </div>
                    <Link
                      href="/see-my-market-gap/"
                      className="mt-4 inline-block border border-white text-white text-sm font-semibold px-4 py-2 rounded-lg no-underline hover:bg-white hover:text-[#982A0B] transition-colors"
                    >
                      See My Market Gap →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Practice Areas Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setPracticeOpen(true)}
              onMouseLeave={() => setPracticeOpen(false)}
            >
              <button
                className="text-gray-700 hover:text-gray-900 font-medium flex items-center gap-1 transition-colors"
                aria-expanded={practiceOpen}
              >
                Practice Areas <span className="text-xs">▾</span>
              </button>
              {/* Dropdown panel (always in DOM for SEO crawlability) */}
              <div
                className={`absolute top-full left-0 min-w-[340px] bg-white rounded-xl shadow-xl border border-gray-100 pt-2 px-5 pb-5 z-50 transition-all duration-200 ease-out
                  ${practiceOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"}`}
              >
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                  {practiceAreas.map((p) => (
                    <Link
                      key={p.href}
                      href={p.href}
                      className="text-sm text-gray-700 hover:text-[#EE6C13] font-medium py-1.5 block no-underline transition-colors"
                    >
                      {p.label}
                    </Link>
                  ))}
                  <Link
                    href="/practice-areas/"
                    className="col-span-2 text-sm font-semibold py-2 block no-underline transition-colors mt-1"
                    style={{ color: "#EE6C13" }}
                  >
                    View All Practice Areas →
                  </Link>
                </div>
              </div>
            </div>

            <Link href="/services/pricing/" className="text-gray-700 hover:text-gray-900 font-medium transition-colors no-underline">Pricing</Link>
            <Link href="/case-studies/" className="text-gray-700 hover:text-gray-900 font-medium transition-colors no-underline">Results</Link>
            <Link href="/about-us/" className="text-gray-700 hover:text-gray-900 font-medium transition-colors no-underline">About</Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="tel:+18555936935" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors no-underline">
              (855) 593-6935
            </a>
            <Link
              href="/contact/"
              className="font-heading font-bold text-sm text-white px-5 py-2.5 rounded-[40px] no-underline transition-colors"
              style={{ background: "#EE6C13" }}
              onMouseOver={(e) => (e.currentTarget.style.background = "#982A0B")}
              onMouseOut={(e) => (e.currentTarget.style.background = "#EE6C13")}
            >
              Let&apos;s Talk Growth
            </Link>
          </div>

          {/* Mobile Hamburger → X */}
          <button
            className="lg:hidden text-gray-700 hover:text-gray-900 p-2 flex flex-col justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <div className={`w-5 h-0.5 bg-gray-700 transition-transform duration-200 origin-center
              ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <div className={`w-5 h-0.5 bg-gray-700 my-1.5 transition-opacity duration-200
              ${mobileOpen ? "opacity-0" : ""}`} />
            <div className={`w-5 h-0.5 bg-gray-700 transition-transform duration-200 origin-center
              ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 lg:hidden
          ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white z-50 shadow-2xl overflow-y-auto
          transition-transform duration-300 ease-in-out lg:hidden
          ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <Link href="/" onClick={() => setMobileOpen(false)}>
            <Image
              src="/images/jurispage-logo-dark.svg"
              alt="JurisPage Law Firm Marketing"
              width={175}
              height={38}
              className="h-9 w-auto"
            />
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="text-gray-500 hover:text-gray-900 transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Phone */}
        <a
          href="tel:+18555936935"
          className="flex items-center px-5 py-4 text-base font-semibold text-gray-800 border-b border-gray-100 no-underline hover:text-[#EE6C13] transition-colors"
        >
          (855) 593-6935
        </a>

        {/* Services Accordion */}
        <div className="border-b border-gray-100">
          <button
            className="flex items-center justify-between w-full px-5 py-4 text-sm font-semibold text-gray-900"
            onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
          >
            Services
            <svg
              className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div className={`overflow-hidden transition-all duration-200 ${mobileServicesOpen ? "max-h-[800px]" : "max-h-0"}`}>
            <div className="px-4 pb-3 space-y-1">
              {services.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="block px-3 py-2 rounded-lg hover:bg-orange-50 no-underline transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="font-semibold text-gray-900 text-sm block">{s.label}</span>
                  <span className="text-xs text-gray-500 block mt-0.5">{s.desc}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Practice Areas Accordion */}
        <div className="border-b border-gray-100">
          <button
            className="flex items-center justify-between w-full px-5 py-4 text-sm font-semibold text-gray-900"
            onClick={() => setMobilePracticeOpen(!mobilePracticeOpen)}
          >
            Practice Areas
            <svg
              className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${mobilePracticeOpen ? "rotate-180" : ""}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div className={`overflow-hidden transition-all duration-200 ${mobilePracticeOpen ? "max-h-[400px]" : "max-h-0"}`}>
            <div className="px-4 pb-3 space-y-1">
              {practiceAreas.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="block px-3 py-2 text-sm text-gray-700 hover:text-[#EE6C13] font-medium no-underline transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {p.label}
                </Link>
              ))}
              <Link
                href="/practice-areas/"
                className="block px-3 py-2 text-sm font-semibold no-underline transition-colors"
                style={{ color: "#EE6C13" }}
                onClick={() => setMobileOpen(false)}
              >
                View All Practice Areas →
              </Link>
            </div>
          </div>
        </div>

        {/* Direct Links */}
        <div className="border-t border-gray-100 px-5 py-2 space-y-0">
          <Link href="/services/pricing/" className="py-3 text-sm font-medium text-gray-700 hover:text-gray-900 block no-underline transition-colors" onClick={() => setMobileOpen(false)}>Pricing</Link>
          <Link href="/case-studies/" className="py-3 text-sm font-medium text-gray-700 hover:text-gray-900 block no-underline transition-colors" onClick={() => setMobileOpen(false)}>Results</Link>
          <Link href="/about-us/" className="py-3 text-sm font-medium text-gray-700 hover:text-gray-900 block no-underline transition-colors" onClick={() => setMobileOpen(false)}>About</Link>
          <Link href="/blog/" className="py-3 text-sm font-medium text-gray-700 hover:text-gray-900 block no-underline transition-colors" onClick={() => setMobileOpen(false)}>Blog</Link>
        </div>

        {/* CTA */}
        <div className="px-5 pt-2 pb-6 space-y-3">
          <Link
            href="/contact/"
            className="block text-center py-3 rounded-[40px] font-bold text-white text-sm no-underline"
            style={{ background: "#EE6C13" }}
            onClick={() => setMobileOpen(false)}
          >
            Let&apos;s Talk Growth
          </Link>
          <Link
            href="/see-my-market-gap/"
            className="block text-center text-sm text-[#EE6C13] no-underline hover:underline"
            onClick={() => setMobileOpen(false)}
          >
            See My Market Gap →
          </Link>
        </div>
      </div>
    </header>
  );
}
