import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import CTASection from "@/components/CTASection";
import SchemaOrg from "@/components/SchemaOrg";
import CaseStudyCard from "@/components/CaseStudyCard";
import HeroForm from "@/components/HeroForm";
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
    icon: "🔍",
    title: "Law Firm SEO",
    description: "Rank higher in Google for the keywords that bring in qualified case inquiries. Technical, on-page, and link building done right.",
    href: "/law-firm-seo/",
  },
  {
    icon: "📢",
    title: "Google Ads",
    description: "Stop wasting budget on bad clicks. We build law firm PPC campaigns that convert searches into signed cases.",
    href: "/google-ads-for-law-firms/",
  },
  {
    icon: "🌐",
    title: "Law Firm Websites",
    description: "Fast, credible, conversion-optimized websites built for law firms. Live in 30 days with the Launchpad package.",
    href: "/law-firm-websites/",
  },
  {
    icon: "📍",
    title: "Local SEO",
    description: "Get into the Google map pack for searches in your market. The most cost-effective source of local legal leads.",
    href: "/local-seo-for-law-firms/",
  },
  {
    icon: "🤖",
    title: "GEO / AI Search",
    description: "Get your firm cited inside ChatGPT, Perplexity, and AI Overviews. First-mover advantage before your competitors figure it out.",
    href: "/generative-engine-optimization-for-law-firms/",
  },
  {
    icon: "🚀",
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
              <span className="inline-block text-xs font-heading font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 text-white" style={{ background: "#EE6C13" }}>
                Law Firm Marketing
              </span>
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
                className="bg-white rounded-xl p-6 border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all no-underline block"
              >
                <div className="text-3xl mb-3">{service.icon}</div>
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
                body: "Every competitor will make you sit through a 45-minute sales call before they'll tell you what anything costs. We put our pricing on the website. Launchpad starts at $1,497/month. See exactly what you get.",
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
          <p className="text-gray-600 mb-10">Three plans. Month-to-month. Results in 90 days or we work for free.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { name: "Launchpad", price: "$1,497", desc: "New & startup firms" },
              { name: "Grow", price: "$2,497", desc: "Established firms", featured: true },
              { name: "Dominate", price: "$4,497", desc: "Market leaders" },
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
