"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const services = [
  { label: "Law Firm SEO", href: "/law-firm-seo/" },
  { label: "Google Ads for Law Firms", href: "/google-ads-for-law-firms/" },
  { label: "Law Firm Websites", href: "/law-firm-websites/" },
  { label: "Local SEO for Law Firms", href: "/local-seo-for-law-firms/" },
  { label: "Launchpad (New Firms)", href: "/launchpad/" },
  { label: "GEO / AI Search", href: "/generative-engine-optimization-for-law-firms/" },
  { label: "AI Chatbot", href: "/ai-chatbot-for-law-firm-website/" },
  { label: "Email Marketing", href: "/law-firm-email-marketing/" },
  { label: "Bing Ads for Lawyers", href: "/bing-ads-for-lawyers/" },
  { label: "Content Writing", href: "/law-firm-content-writing/" },
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

  return (
    <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center no-underline">
            <Image
              src="/images/jurispage-logo.png"
              alt="JurisPage Law Firm Marketing"
              width={213}
              height={46}
              priority
              className="h-9 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 text-sm">
            {/* Services Dropdown */}
            <div className="relative group">
              <button
                className="text-gray-700 hover:text-gray-900 font-medium flex items-center gap-1 transition-colors"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                Services <span className="text-xs">▾</span>
              </button>
              {servicesOpen && (
                <div
                  className="absolute top-full left-0 bg-white border border-gray-200 rounded-lg shadow-xl py-2 w-64 z-50"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  {services.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className="block px-4 py-2.5 text-gray-700 hover:text-gray-900 hover:bg-gray-50 text-sm transition-colors no-underline"
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Practice Areas Dropdown */}
            <div className="relative group">
              <button
                className="text-gray-700 hover:text-gray-900 font-medium flex items-center gap-1 transition-colors"
                onMouseEnter={() => setPracticeOpen(true)}
                onMouseLeave={() => setPracticeOpen(false)}
              >
                Practice Areas <span className="text-xs">▾</span>
              </button>
              {practiceOpen && (
                <div
                  className="absolute top-full left-0 bg-white border border-gray-200 rounded-lg shadow-xl py-2 w-56 z-50"
                  onMouseEnter={() => setPracticeOpen(true)}
                  onMouseLeave={() => setPracticeOpen(false)}
                >
                  {practiceAreas.map((p) => (
                    <Link
                      key={p.href}
                      href={p.href}
                      className="block px-4 py-2.5 text-gray-700 hover:text-gray-900 hover:bg-gray-50 text-sm transition-colors no-underline"
                    >
                      {p.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/services/pricing/" className="text-gray-700 hover:text-gray-900 font-medium transition-colors no-underline">Pricing</Link>
            <Link href="/case-studies/" className="text-gray-700 hover:text-gray-900 font-medium transition-colors no-underline">Success Stories</Link>
            <Link href="/best-law-firm-seo-companies/" className="text-gray-700 hover:text-gray-900 font-medium transition-colors no-underline">Compare</Link>
            <Link href="/blog/" className="text-gray-700 hover:text-gray-900 font-medium transition-colors no-underline">Blog</Link>
            <Link href="/about-us/" className="text-gray-700 hover:text-gray-900 font-medium transition-colors no-underline">About</Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="tel:+18887677447" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors no-underline">
              (888) 767-7447
            </a>
            <Link
              href="/free-market-report/"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 no-underline transition-colors"
            >
              Free Market Report
            </Link>
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

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-700 hover:text-gray-900 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-0.5 bg-current mb-1.5"></div>
            <div className="w-6 h-0.5 bg-current mb-1.5"></div>
            <div className="w-6 h-0.5 bg-current"></div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 px-2 pt-2 pb-1">Services</p>
          {services.map((s) => (
            <Link key={s.href} href={s.href} className="block py-2 px-2 text-gray-700 hover:text-gray-900 text-sm no-underline" onClick={() => setMobileOpen(false)}>
              {s.label}
            </Link>
          ))}
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 px-2 pt-4 pb-1">Practice Areas</p>
          {practiceAreas.map((p) => (
            <Link key={p.href} href={p.href} className="block py-2 px-2 text-gray-700 hover:text-gray-900 text-sm no-underline" onClick={() => setMobileOpen(false)}>
              {p.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-gray-100 space-y-2">
            <Link href="/services/pricing/" className="block py-2 px-2 text-gray-700 hover:text-gray-900 text-sm font-medium no-underline" onClick={() => setMobileOpen(false)}>Pricing</Link>
            <Link href="/case-studies/" className="block py-2 px-2 text-gray-700 hover:text-gray-900 text-sm font-medium no-underline" onClick={() => setMobileOpen(false)}>Success Stories</Link>
            <Link href="/free-market-report/" className="block py-2 px-2 text-gray-700 hover:text-gray-900 text-sm font-medium no-underline" onClick={() => setMobileOpen(false)}>Free Market Report</Link>
            <Link href="/blog/" className="block py-2 px-2 text-gray-700 hover:text-gray-900 text-sm font-medium no-underline" onClick={() => setMobileOpen(false)}>Blog</Link>
            <Link href="/about-us/" className="block py-2 px-2 text-gray-700 hover:text-gray-900 text-sm font-medium no-underline" onClick={() => setMobileOpen(false)}>About</Link>
            <Link
              href="/contact/"
              className="block mt-3 text-center py-3 rounded-[40px] font-bold text-white text-sm no-underline"
              style={{ background: "#EE6C13" }}
              onClick={() => setMobileOpen(false)}
            >
              Let&apos;s Talk Growth
            </Link>
            <a href="tel:+18887677447" className="block text-center py-2 text-gray-500 text-sm no-underline">(888) 767-7447</a>
          </div>
        </div>
      )}
    </header>
  );
}
