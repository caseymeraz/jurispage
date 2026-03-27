import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import type { PracticeAreaData } from "@/data/practiceAreas";
import { getPracticeAreaBySlug } from "@/data/practiceAreas";
import { getServiceBySlug } from "@/data/services";
import { getIntersectionsForPracticeArea } from "@/data/intersections";
import CTASection from "@/components/CTASection";
import FAQAccordion from "@/components/FAQAccordion";
import SchemaOrg from "@/components/SchemaOrg";
import CaseStudyPreview from "@/components/CaseStudyPreview";
import HeroForm from "@/components/HeroForm";
import CompetitorGapForm from "@/components/CompetitorGapForm";
import PpcRoiCalculator from "@/components/PpcRoiCalculator";
import { caseStudies } from "@/data/caseStudies";
import { renderLinkedText, stripMarkdownLinks } from "@/lib/renderLinkedText";

function UniqueSection({ section }: { section: NonNullable<PracticeAreaData["uniqueSections"]>[number] }) {
  return (
    <section className="py-16 px-6 bg-white border-t border-gray-100">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-4">{section.heading}</h2>
        <p className="text-gray-700 text-base leading-relaxed mb-8">{section.content}</p>

        {section.type === "keyword-table" && section.tableData && (
          <>
            <div className="hidden md:block overflow-hidden rounded-xl border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-900">
                    <th className="text-left px-4 py-3 font-heading font-bold text-white">Keyword</th>
                    <th className="text-right px-4 py-3 font-heading font-bold text-white">Volume/mo</th>
                    <th className="text-right px-4 py-3 font-heading font-bold text-white">Difficulty</th>
                    <th className="text-right px-4 py-3 font-heading font-bold text-white">CPC</th>
                    <th className="text-left px-4 py-3 font-heading font-bold text-white">Intent</th>
                  </tr>
                </thead>
                <tbody>
                  {section.tableData.map((row, i) => (
                    <tr key={row.keyword} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-4 py-3 font-medium text-gray-900">{row.keyword}</td>
                      <td className="px-4 py-3 text-right font-semibold" style={{ color: "#EE6C13" }}>{row.volume}</td>
                      <td className="px-4 py-3 text-right text-gray-600">{row.difficulty}</td>
                      <td className="px-4 py-3 text-right text-gray-600">{row.cpc}</td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{row.intent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="md:hidden space-y-3">
              {section.tableData.map((row) => (
                <div key={row.keyword} className="rounded-lg border border-gray-200 p-4">
                  <div className="font-heading font-bold text-gray-900 text-sm mb-2">{row.keyword}</div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div><span className="text-gray-500">Vol:</span> <span className="font-semibold" style={{ color: "#EE6C13" }}>{row.volume}</span></div>
                    <div><span className="text-gray-500">KD:</span> <span className="font-semibold">{row.difficulty}</span></div>
                    <div><span className="text-gray-500">CPC:</span> <span className="font-semibold">{row.cpc}</span></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{row.intent}</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-4">Source: Ahrefs Keywords Explorer, US data, March 2026. CPC values in USD.</p>
          </>
        )}

        {section.type === "svg-diagram" && (
          <div style={{ margin: "1.5rem 0", maxWidth: "100%" }}>
            <svg viewBox="0 0 800 520" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto", borderRadius: "12px", background: "#f8f9fb", border: "1px solid #e2e8f0" }}>
              {/* Homepage */}
              <rect x="300" y="15" width="200" height="40" rx="6" fill="#1a1a2e" />
              <text x="400" y="40" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="13" fontWeight="700" fill="white">Homepage</text>
              <line x1="400" y1="55" x2="200" y2="90" stroke="#ccc" strokeWidth="1.5" />
              <line x1="400" y1="55" x2="600" y2="90" stroke="#ccc" strokeWidth="1.5" />
              <line x1="400" y1="55" x2="400" y2="400" stroke="#ccc" strokeWidth="1.5" strokeDasharray="4,4" />

              {/* Plaintiff Branch */}
              <rect x="50" y="90" width="280" height="34" rx="6" fill="#EE6C13" />
              <text x="190" y="112" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="12" fontWeight="700" fill="white">Employee Rights (Plaintiff)</text>
              {[
                "Wrongful Termination", "Sexual Harassment", "Wage & Hour Violations",
                "FMLA Violations", "Workplace Discrimination", "Retaliation",
                "Whistleblower Protection"
              ].map((label, i) => (
                <g key={label}>
                  <line x1="120" y1="124" x2="120" y2={145 + i * 34} stroke="#EE6C13" strokeWidth="1" opacity="0.4" />
                  <rect x="70" y={138 + i * 34} width="220" height="28" rx="4" fill="white" stroke="#e2e8f0" strokeWidth="1" />
                  <text x="180" y={156 + i * 34} textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="11" fill="#333">{label}</text>
                </g>
              ))}

              {/* Defendant Branch */}
              <rect x="470" y="90" width="280" height="34" rx="6" fill="#0f4c81" />
              <text x="610" y="112" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="12" fontWeight="700" fill="white">Employer Services (Defendant)</text>
              {[
                "EEOC Defense", "Employment Agreements", "HR Compliance",
                "Non-Compete Drafting"
              ].map((label, i) => (
                <g key={label}>
                  <line x1="580" y1="124" x2="580" y2={145 + i * 34} stroke="#0f4c81" strokeWidth="1" opacity="0.4" />
                  <rect x="500" y={138 + i * 34} width="220" height="28" rx="4" fill="white" stroke="#e2e8f0" strokeWidth="1" />
                  <text x="610" y={156 + i * 34} textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="11" fill="#333">{label}</text>
                </g>
              ))}

              {/* Blog Branch */}
              <rect x="260" y="410" width="280" height="34" rx="6" fill="#27ae60" />
              <text x="400" y="432" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="12" fontWeight="700" fill="white">Blog: Pre-Attorney Questions</text>
              {[
                '"Can I sue my employer for..."', '"What counts as hostile work..."',
                '"Is my non-compete enforceable..."'
              ].map((label, i) => (
                <g key={label}>
                  <rect x="280" y={454 + i * 28} width="240" height="22" rx="3" fill="white" stroke="#e2e8f0" strokeWidth="1" />
                  <text x="400" y={469 + i * 28} textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="10" fill="#555">{label}</text>
                </g>
              ))}
            </svg>
          </div>
        )}

        {section.type === "deadline-table" && section.deadlineData && (
          <>
            <div className="hidden md:block overflow-hidden rounded-xl border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-900">
                    <th className="text-left px-4 py-3 font-heading font-bold text-white">State</th>
                    <th className="text-center px-4 py-3 font-heading font-bold text-white">EEOC Deadline</th>
                    <th className="text-left px-4 py-3 font-heading font-bold text-white">State Agency</th>
                  </tr>
                </thead>
                <tbody>
                  {section.deadlineData.map((row, i) => (
                    <tr key={row.state} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-4 py-2 font-medium text-gray-900">{row.state}</td>
                      <td className="px-4 py-2 text-center">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${row.deadline === "300 days" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                          {row.deadline}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-gray-600 text-xs">{row.agency}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="md:hidden space-y-2">
              {section.deadlineData.map((row) => (
                <div key={row.state} className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3">
                  <span className="font-medium text-gray-900 text-sm">{row.state}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${row.deadline === "300 days" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {row.deadline}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-4">States with a parallel fair employment agency get 300 days. States without get 180 days. Some states have separate state-level claims with different deadlines. Always verify current deadlines with your state agency.</p>
          </>
        )}

        {section.type === "roi-math" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
            <div className="rounded-xl border-2 p-6" style={{ borderColor: "#EE6C13", background: "#FFF8F5" }}>
              <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#EE6C13" }}>Plaintiff Side (Contingency)</div>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex justify-between"><span>Settlement amount</span><span className="font-bold">$200,000</span></div>
                <div className="flex justify-between"><span>Contingency fee (33%)</span><span className="font-bold">$66,000</span></div>
                <div className="flex justify-between"><span>Monthly marketing cost</span><span className="font-bold">$5,000</span></div>
                <div className="flex justify-between"><span>Annual marketing cost</span><span className="font-bold">$60,000</span></div>
                <div className="border-t border-orange-200 pt-3 flex justify-between">
                  <span className="font-bold">ROI from one case</span>
                  <span className="font-extrabold text-lg" style={{ color: "#EE6C13" }}>13:1</span>
                </div>
              </div>
            </div>
            <div className="rounded-xl border-2 p-6" style={{ borderColor: "#0f4c81", background: "#F5F8FC" }}>
              <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#0f4c81" }}>Defendant Side (Retainer)</div>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex justify-between"><span>Monthly retainer</span><span className="font-bold">$8,000</span></div>
                <div className="flex justify-between"><span>Annual client value</span><span className="font-bold">$96,000</span></div>
                <div className="flex justify-between"><span>Monthly marketing cost</span><span className="font-bold">$5,000</span></div>
                <div className="flex justify-between"><span>Annual marketing cost</span><span className="font-bold">$60,000</span></div>
                <div className="border-t pt-3 flex justify-between" style={{ borderColor: "#c0d4e8" }}>
                  <span className="font-bold">ROI from one client</span>
                  <span className="font-extrabold text-lg" style={{ color: "#0f4c81" }}>1.6:1</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {section.type === "prose" && null}
      </div>
    </section>
  );
}

function renderUniqueSections(sections: PracticeAreaData["uniqueSections"], placement: string) {
  if (!sections) return null;
  return sections
    .filter((s) => s.placement === placement)
    .map((s) => <UniqueSection key={s.id} section={s} />);
}

// Cross-practice-area related content map
const RELATED_PRACTICE_AREAS: Record<string, string[]> = {
  "personal-injury-lawyer-marketing": ["criminal-defense-lawyer-marketing", "workers-comp-lawyer-marketing", "medical-malpractice-lawyer-marketing", "mass-tort-law-firm-marketing"],
  "criminal-defense-lawyer-marketing": ["dui-lawyer-marketing", "personal-injury-lawyer-marketing", "immigration-lawyer-marketing"],
  "family-law-firm-marketing": ["divorce-lawyer-marketing", "estate-planning-lawyer-marketing", "immigration-lawyer-marketing"],
  "immigration-lawyer-marketing": ["family-law-firm-marketing", "criminal-defense-lawyer-marketing", "employment-lawyer-marketing"],
  "bankruptcy-lawyer-marketing": ["real-estate-lawyer-marketing", "employment-lawyer-marketing", "small-law-firm-marketing"],
  "estate-planning-lawyer-marketing": ["family-law-firm-marketing", "real-estate-lawyer-marketing", "divorce-lawyer-marketing"],
  "employment-lawyer-marketing": ["workers-comp-lawyer-marketing", "bankruptcy-lawyer-marketing", "immigration-lawyer-marketing"],
  "real-estate-lawyer-marketing": ["estate-planning-lawyer-marketing", "bankruptcy-lawyer-marketing", "small-law-firm-marketing"],
  "solo-attorney-marketing": ["small-law-firm-marketing", "startup-law-firm-marketing"],
  "small-law-firm-marketing": ["solo-attorney-marketing", "startup-law-firm-marketing"],
  "divorce-lawyer-marketing": ["family-law-firm-marketing", "estate-planning-lawyer-marketing", "immigration-lawyer-marketing"],
  "dui-lawyer-marketing": ["criminal-defense-lawyer-marketing", "personal-injury-lawyer-marketing"],
  "workers-comp-lawyer-marketing": ["personal-injury-lawyer-marketing", "employment-lawyer-marketing", "social-security-disability-lawyer-marketing"],
  "social-security-disability-lawyer-marketing": ["workers-comp-lawyer-marketing", "bankruptcy-lawyer-marketing", "employment-lawyer-marketing"],
  "medical-malpractice-lawyer-marketing": ["personal-injury-lawyer-marketing", "mass-tort-law-firm-marketing"],
  "mass-tort-law-firm-marketing": ["personal-injury-lawyer-marketing", "medical-malpractice-lawyer-marketing"],
  "startup-law-firm-marketing": ["solo-attorney-marketing", "small-law-firm-marketing"],
};

interface PracticeAreaPageProps {
  practiceArea: PracticeAreaData;
}

export function generatePracticeAreaMetadata(pa: PracticeAreaData): Metadata {
  return {
    title: pa.title,
    description: pa.description,
    alternates: { canonical: `https://jurispage.com/${pa.slug}/` },
    openGraph: {
      title: pa.title,
      description: pa.description,
      url: `https://jurispage.com/${pa.slug}/`,
    },
  };
}

export default function PracticeAreaPage({ practiceArea: pa }: PracticeAreaPageProps) {
  const allFaqs = [
    ...pa.faqs,
    ...(pa.extendedFaqs ?? []),
  ];

  const displayKw = pa.displayKeyword ?? pa.primaryKeyword;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://jurispage.com/${pa.slug}/`,
    name: pa.heading,
    description: pa.description,
    ...(pa.serviceType ? { serviceType: pa.serviceType } : {}),
    provider: { "@type": "Organization", name: "JurisPage", url: "https://jurispage.com" },
    url: `https://jurispage.com/${pa.slug}/`,
    areaServed: { "@type": "Country", name: "United States" },
  };

  const faqSchema = allFaqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: stripMarkdownLinks(faq.answer) },
    })),
  } : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://jurispage.com/" },
      { "@type": "ListItem", position: 2, name: pa.heading, item: `https://jurispage.com/${pa.slug}/` },
    ],
  };

  const schemas = [serviceSchema, breadcrumbSchema, ...(faqSchema ? [faqSchema] : [])];

  return (
    <>
      <SchemaOrg schema={schemas} />

      {/* Hero */}
      <section className="bg-white py-16 px-6 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="pt-2">
              <nav className="text-sm text-gray-500 mb-5">
                <Link href="/" className="hover:text-gray-900 no-underline">Home</Link> /{" "}
                <span className="text-gray-700">{displayKw}</span>
              </nav>
              <span className="inline-block text-xs font-heading font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{ background: "#EE6C1322", color: "#EE6C13" }}>
                {pa.primaryKeyword}
              </span>
              <h1 className="font-heading font-extrabold text-gray-900 text-4xl md:text-5xl leading-tight mb-6">{pa.heading}</h1>
              {pa.heroSubheadline ? (
                <p className="text-lg text-gray-600">{pa.heroSubheadline}</p>
              ) : (
                <p className="text-gray-500 text-sm">Speak directly with a legal marketing expert today.</p>
              )}
            </div>
            {pa.slug === "personal-injury-lawyer-marketing" ? (
              <div className="bg-gray-50 rounded-2xl p-6">
                <Suspense fallback={<div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 text-center text-gray-500">Loading form...</div>}>
                  <CompetitorGapForm />
                </Suspense>
              </div>
            ) : (
              <HeroForm
                ctaLabel="Book Your Strategy Session"
                subtext="No contracts. No commitment. We'll respond within one business day."
                defaultPracticeArea={pa.primaryKeyword.split(" ")[0]}
              />
            )}
          </div>
          {pa.socialProofStats && pa.socialProofStats.length > 0 && (
            <div className="mt-10 pt-8 border-t border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                {pa.socialProofStats.map((stat) => (
                  <div key={stat.label}>
                    <div className="font-heading font-extrabold text-2xl" style={{ color: "#EE6C13" }}>{stat.value}</div>
                    <div className="text-gray-600 text-sm mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Stats bar */}
      {pa.stats && pa.stats.length > 0 && (
        <section className="py-10 px-6 bg-[#EE6C13]">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {pa.stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-heading font-extrabold text-white text-3xl md:text-4xl leading-none mb-1">{stat.value}</div>
                  <div className="text-orange-100 text-sm leading-snug">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Intro */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <p className="text-gray-700 text-lg leading-relaxed">{renderLinkedText(pa.intro)}</p>
          {pa.introBullets && pa.introBullets.length > 0 && (
            <ul className="mt-6 space-y-3">
              {pa.introBullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-2 h-2 rounded-full mt-2" style={{ background: "#EE6C13" }} />
                  <span className="text-gray-700 text-base leading-relaxed">{renderLinkedText(bullet)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {renderUniqueSections(pa.uniqueSections, "after-intro")}

      {/* Why Different */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-6">
            {pa.sectionHeadings?.whyDifferent ?? `Why ${displayKw} is Different`}
          </h2>
          {pa.whyDifferent.includes("\n") ? (
            pa.whyDifferent.split("\n").filter(Boolean).map((paragraph, i) => (
              <p key={i} className="text-gray-700 text-base leading-relaxed mb-4 last:mb-0">{renderLinkedText(paragraph)}</p>
            ))
          ) : (
            <p className="text-gray-700 text-base leading-relaxed">{renderLinkedText(pa.whyDifferent)}</p>
          )}
        </div>
      </section>

      {/* Mistakes */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-8">
            {pa.sectionHeadings?.mistakes ?? `The 3 Biggest Marketing Mistakes in ${displayKw}`}
          </h2>
          {pa.mistakeCards ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pa.mistakeCards.map((card, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="h-1 bg-red-500" />
                  <div className="p-5">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-red-100 text-red-600 font-bold text-xs mb-3">{i + 1}</span>
                    <h3 className="font-heading font-bold text-gray-900 text-base mb-2">{card.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{card.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {pa.mistakes.map((mistake, i) => (
                <div key={i} className="flex gap-4 bg-red-50 border border-red-100 rounded-xl p-5">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-sm">{i + 1}</span>
                  <p className="text-gray-700 leading-relaxed">{mistake}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {renderUniqueSections(pa.uniqueSections, "after-mistakes")}

      {/* Services */}
      <section className="py-16 px-6 bg-[#1a1a1a]">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-extrabold text-white text-3xl mb-8">
            {pa.sectionHeadings?.services ?? `Services That Work for ${displayKw}`}
          </h2>
          <div className="flex flex-wrap gap-3">
            {(pa.relatedServices ?? []).map((slug) => {
              const svc = getServiceBySlug(slug);
              if (!svc) return null;
              return (
                <Link
                  key={slug}
                  href={`/${slug}/`}
                  className="px-4 py-2 rounded-full text-sm font-semibold text-white no-underline transition-opacity hover:opacity-80"
                  style={{ background: "#EE6C13" }}
                >
                  {svc.primaryKeyword}
                </Link>
              );
            })}
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { color: "#EE6C13", title: "Month-to-Month", body: "No long-term contracts. Cancel anytime with 30 days notice." },
              { color: "#982A0B", title: "Published Pricing", body: "See exactly what you pay. No sales calls required." },
              { color: "#EE6C13", title: "90-Day Guarantee", body: "Results within 90 days or we work for free the next month." },
            ].map((item) => (
              <div key={item.title} className="bg-gray-800 rounded-xl p-5">
                <div className="w-6 h-1 rounded mb-3" style={{ background: item.color }}></div>
                <h3 className="font-heading font-bold text-white text-sm mb-1">{item.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Market This Practice Area */}
      {pa.process && pa.process.length > 0 && (
        <section className="py-16 px-6 bg-[#1a1a1a]">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading font-extrabold text-white text-3xl mb-10">
              {pa.sectionHeadings?.process ?? `How We Market ${pa.primaryKeyword.split(" ").slice(0, 2).join(" ")} Firms`}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pa.process.map((item, index) => (
                <div key={item.step} className="bg-gray-800 rounded-xl p-6">
                  <span
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full font-heading font-extrabold text-white text-sm mb-4"
                    style={{ background: "#EE6C13" }}
                  >
                    {index + 1}
                  </span>
                  <h3 className="font-heading font-bold text-white text-lg mb-2">{item.step}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* LSA & Intake Optimization */}
      {pa.lsaIntakeSection && (
        <section className="py-16 px-6 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-10">{pa.lsaIntakeSection.heading}</h2>
            <div className="space-y-10">
              {pa.lsaIntakeSection.subsections.map((sub) => (
                <div key={sub.subheading}>
                  <h3 className="font-heading font-bold text-gray-900 text-xl mb-3">{sub.subheading}</h3>
                  <p className="text-gray-700 text-base leading-relaxed">{renderLinkedText(sub.body)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ROI Calculator */}
      {pa.showCalculator && (
        <section className="py-16 px-6 bg-[#111]">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading font-extrabold text-white text-3xl mb-2 text-center">
              See What Your PI Marketing Budget Could Generate
            </h2>
            <p className="text-gray-400 text-center mb-8">Adjust the inputs below to estimate your return on ad spend.</p>
            <PpcRoiCalculator />
          </div>
        </section>
      )}

      {renderUniqueSections(pa.uniqueSections, "after-process")}

      {pa.relatedCaseStudies && pa.relatedCaseStudies.length > 0 && (
        <CaseStudyPreview
          caseStudies={caseStudies.filter((cs) => pa.relatedCaseStudies!.includes(cs.slug))}
          heading="Real Results from Law Firms Like Yours"
        />
      )}

      {/* Comparison Table */}
      {pa.comparisonSection && (
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-3">{pa.comparisonSection.heading}</h2>
            <p className="text-gray-600 text-base mb-8">{pa.comparisonSection.intro}</p>
            {/* Desktop table */}
            <div className="hidden md:block overflow-hidden rounded-xl border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left px-5 py-3 bg-gray-100 font-heading font-bold text-gray-700">Feature</th>
                    <th className="text-left px-5 py-3 font-heading font-bold text-white" style={{ background: "#EE6C13" }}>JurisPage</th>
                    <th className="text-left px-5 py-3 bg-gray-100 font-heading font-bold text-gray-700">Big Agencies</th>
                  </tr>
                </thead>
                <tbody>
                  {pa.comparisonSection.rows.map((row, i) => (
                    <tr key={row.feature} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-5 py-3 font-medium text-gray-900">{row.feature}</td>
                      <td className="px-5 py-3 text-gray-700">{row.jurispage}</td>
                      <td className="px-5 py-3 text-gray-500">{row.bigAgency}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Mobile cards */}
            <div className="md:hidden space-y-4">
              {pa.comparisonSection.rows.map((row) => (
                <div key={row.feature} className="rounded-xl border border-gray-200 bg-white p-4">
                  <div className="font-heading font-bold text-gray-900 text-sm mb-2">{row.feature}</div>
                  <div className="flex flex-col gap-2 text-sm">
                    <div><span className="font-semibold" style={{ color: "#EE6C13" }}>JurisPage:</span> {row.jurispage}</div>
                    <div><span className="font-semibold text-gray-500">Big Agencies:</span> {row.bigAgency}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Results Highlights */}
      {pa.resultsHighlights && pa.resultsHighlights.length > 0 && (
        <section className="py-16 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-8 text-center">Results That Matter</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {pa.resultsHighlights.map((item) => (
                <div key={item.label} className="rounded-xl border border-gray-200 p-5 text-center">
                  <div className="font-heading font-extrabold text-3xl mb-1" style={{ color: "#EE6C13" }}>{item.value}</div>
                  <div className="font-heading font-bold text-gray-900 text-sm mb-1">{item.label}</div>
                  <div className="text-gray-500 text-xs">{item.context}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {pa.relatedServices && pa.relatedServices.length > 0 && (
        <section className="py-16 px-6 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading font-extrabold text-gray-900 text-2xl mb-6">
              Services We Use to Grow {displayKw.split(" ").slice(0, 2).join(" ")} Practices
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {pa.relatedServices.map((slug) => {
                const svc = getServiceBySlug(slug);
                if (!svc) return null;
                return (
                  <Link key={slug} href={`/${slug}/`} className="block p-4 rounded-xl border border-gray-200 hover:border-orange-300 hover:shadow-sm transition-all no-underline">
                    <div className="font-heading font-bold text-gray-900 text-sm mb-1">{svc.heading}</div>
                    <div className="text-xs font-semibold" style={{ color: "#EE6C13" }}>Learn more about {svc.heading} →</div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Cross-practice-area internal links */}
      {RELATED_PRACTICE_AREAS[pa.slug] && (
        <section className="py-12 px-6 bg-gray-50 border-t border-gray-100">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
              Attorneys also research
            </p>
            <div className="flex flex-wrap gap-3">
              {RELATED_PRACTICE_AREAS[pa.slug].map((slug) => {
                const related = getPracticeAreaBySlug(slug);
                if (!related) return null;
                return (
                  <Link
                    key={slug}
                    href={`/${slug}/`}
                    className="text-sm font-medium no-underline px-4 py-2 rounded-[40px] border-2 transition-all hover:bg-[#EE6C13] hover:text-white hover:border-[#EE6C13]"
                    style={{ borderColor: "#EE6C13", color: "#EE6C13" }}
                  >
                    {related.primaryKeyword}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Specialized Service Guides for this practice area */}
      {(() => {
        const guides = getIntersectionsForPracticeArea(pa.slug);
        if (guides.length === 0) return null;
        return (
          <section className="py-16 px-6 bg-white border-t border-gray-100">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-heading font-extrabold text-gray-900 text-2xl mb-2">
                Specialized Marketing Guides for {pa.heading.replace(" Marketing", " Attorneys")}
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                In-depth strategies combining {pa.primaryKeyword} with specific marketing services.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {guides.map((guide) => {
                  const svc = getServiceBySlug(guide.serviceSlug);
                  return (
                    <Link
                      key={guide.serviceSlug}
                      href={`/${guide.practiceAreaSlug}/${guide.serviceSlug}/`}
                      className="group flex flex-col gap-1 rounded-xl border border-gray-200 bg-gray-50 p-5 no-underline hover:border-[#EE6C13] hover:bg-[#EE6C1308] transition-colors"
                    >
                      <span className="font-heading font-bold text-gray-900 text-base group-hover:text-[#EE6C13] transition-colors">
                        {guide.heading}
                      </span>
                      {svc && (
                        <span className="text-gray-500 text-sm">{svc.tagline}</span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })()}

      {renderUniqueSections(pa.uniqueSections, "before-faq")}

      {allFaqs.length > 0 && <FAQAccordion faqs={allFaqs} heading="Frequently Asked Questions" />}

      {pa.slug === "personal-injury-lawyer-marketing" ? (
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-2xl mx-auto">
            <Suspense fallback={<div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 text-center text-gray-500">Loading form...</div>}>
              <CompetitorGapForm />
            </Suspense>
          </div>
        </section>
      ) : (
        <CTASection
          heading={pa.ctaOverride?.heading ?? "Book Your Strategy Session"}
          subtext={pa.ctaOverride?.subtext ?? `No long-term contracts. Transparent pricing. We've helped 113+ law firms grow - including ${displayKw.toLowerCase()} practices.`}
          primaryLabel={pa.ctaOverride?.primaryLabel ?? "Book Your Strategy Session"}
          primaryHref="/contact/"
          secondaryLabel={pa.ctaOverride?.secondaryLabel ?? "See Pricing"}
          secondaryHref="/services/pricing/"
        />
      )}
    </>
  );
}
