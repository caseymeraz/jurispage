import type { Metadata } from "next";
import Link from "next/link";
import SchemaOrg from "@/components/SchemaOrg";

export const metadata: Metadata = {
  title: "Law Firm Content Writing That Converts Visitors Into Cases",
  description: "Legal content that ranks in Google and makes your phone ring. Attorney-reviewed, jurisdiction-specific, bar-compliant. No contracts.",
  robots: { index: false, follow: false },
};

/* ── Brand tokens ─────────────────────────────────────────── */
const O = "#EE6C13";   // orange accent
const D = "#1a1a2e";   // dark
const B = "#0f4c81";   // blue

export default function ContentWritingB() {
  return (
    <>
      <SchemaOrg schema={{
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Law Firm Content Writing",
        provider: { "@type": "Organization", name: "JurisPage", url: "https://jurispage.com" },
        description: "SEO content writing for law firms. Attorney-reviewed, jurisdiction-specific, bar-compliant.",
      }} />

      {/* ═══════════════════════════════════════════════════════
          1. HERO - StoryBrand: Character + Problem
      ═══════════════════════════════════════════════════════ */}
      <section className="bg-white py-20 px-6 border-b border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block text-xs font-heading font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6" style={{ background: O + "22", color: O }}>
            Law Firm Content Writing
          </span>
          <h1 className="font-heading font-extrabold text-gray-900 text-4xl md:text-5xl leading-tight mb-6">
            Your Website Has Content.<br />It Just Doesn't Have the <span style={{ color: O }}>Right</span> Content.
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            Thin practice area pages. Blog posts nobody reads. Content that sounds like every other firm in your city. If your website isn't generating consultation requests, the content is the problem.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#before-after" className="px-8 py-4 rounded-full text-white font-bold text-sm no-underline transition-opacity hover:opacity-90" style={{ background: O }}>
              See What's Missing
            </a>
            <Link href="/contact/" className="px-8 py-4 rounded-full font-bold text-sm no-underline border-2 transition-all hover:bg-gray-50" style={{ borderColor: D, color: D }}>
              Book a Strategy Session
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          2. THE PROBLEM - 3 Cards
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-4 text-center">Three Reasons Your Content Isn't Working</h2>
          <p className="text-gray-500 text-center mb-10 max-w-2xl mx-auto">These aren't edge cases. We see them on 9 out of 10 law firm websites we audit.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                num: "01",
                title: "It sounds like every other firm",
                body: "300 words of 'We are experienced attorneys dedicated to serving our clients.' Google has seen that sentence on 50,000 law firm websites. It ranks none of them.",
                color: "#c0392b",
              },
              {
                num: "02",
                title: "AI wrote it and nobody reviewed it",
                body: "ChatGPT writes fast. It also invents case citations, gets statute of limitations wrong, and mixes jurisdictions. For a law firm, that is a bar complaint waiting to happen.",
                color: "#e67e22",
              },
              {
                num: "03",
                title: "It ranks but doesn't convert",
                body: "Traffic without conversion is a vanity metric. If your page gets 1,000 visitors and zero calls, the content isn't doing its job. Good content pre-qualifies and moves readers to act.",
                color: "#c0392b",
              },
            ].map((card) => (
              <div key={card.num} className="bg-white rounded-xl border border-gray-200 p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1" style={{ background: card.color }} />
                <span className="font-heading font-extrabold text-4xl" style={{ color: card.color + "20" }}>{card.num}</span>
                <h3 className="font-heading font-bold text-gray-900 text-lg mt-2 mb-3">{card.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-6 text-sm text-gray-500">
            We wrote an in-depth analysis of this problem: <Link href="/blog/ai-content-without-seo-strategy/" className="font-semibold no-underline" style={{ color: O }}>Why AI Content Without a Strategy Destroys Rankings</Link>
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          3. BEFORE / AFTER VISUAL
      ═══════════════════════════════════════════════════════ */}
      <section id="before-after" className="py-16 px-6 bg-white scroll-mt-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-2 text-center">The Difference Is Visible</h2>
          <p className="text-gray-500 text-center mb-10">A generic page vs. a page built to rank and convert.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Before */}
            <div className="rounded-xl border-2 border-red-200 bg-red-50/50 overflow-hidden">
              <div className="bg-red-500 px-5 py-3 flex items-center justify-between">
                <span className="text-white font-bold text-sm">Generic Law Firm Page</span>
                <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">327 words</span>
              </div>
              <div className="p-6 space-y-4">
                <div className="bg-white rounded-lg p-4 border border-red-100">
                  <div className="h-3 bg-gray-300 rounded w-3/4 mb-3" />
                  <div className="space-y-2">
                    <div className="h-2 bg-gray-200 rounded w-full" />
                    <div className="h-2 bg-gray-200 rounded w-5/6" />
                    <div className="h-2 bg-gray-200 rounded w-full" />
                  </div>
                  <p className="text-gray-400 text-xs italic mt-4">"We are experienced personal injury attorneys dedicated to fighting for your rights. Call us today for a free consultation."</p>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-red-500"><span>&#x2717;</span> No H2 headings</div>
                  <div className="flex items-center gap-2 text-red-500"><span>&#x2717;</span> No FAQ schema</div>
                  <div className="flex items-center gap-2 text-red-500"><span>&#x2717;</span> No internal links</div>
                  <div className="flex items-center gap-2 text-red-500"><span>&#x2717;</span> No jurisdiction-specific details</div>
                  <div className="flex items-center gap-2 text-red-500"><span>&#x2717;</span> No attorney attribution</div>
                  <div className="flex items-center gap-2 text-red-500"><span>&#x2717;</span> Reads like 50,000 other pages</div>
                </div>
              </div>
            </div>

            {/* After */}
            <div className="rounded-xl border-2 border-green-200 bg-green-50/50 overflow-hidden">
              <div className="px-5 py-3 flex items-center justify-between" style={{ background: "#27ae60" }}>
                <span className="text-white font-bold text-sm">JurisPage Content</span>
                <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">2,847 words</span>
              </div>
              <div className="p-6 space-y-4">
                <div className="bg-white rounded-lg p-4 border border-green-100">
                  <div className="h-3 bg-gray-800 rounded w-5/6 mb-2" />
                  <div className="h-2 bg-orange-200 rounded w-1/3 mb-3" />
                  <div className="space-y-2">
                    <div className="h-2 bg-gray-200 rounded w-full" />
                    <div className="h-2 bg-gray-200 rounded w-5/6" />
                    <div className="h-2.5 bg-gray-700 rounded w-2/3 mt-3 mb-1" />
                    <div className="h-2 bg-gray-200 rounded w-full" />
                    <div className="h-2 bg-gray-200 rounded w-4/5" />
                    <div className="h-2.5 bg-gray-700 rounded w-1/2 mt-3 mb-1" />
                    <div className="h-2 bg-gray-200 rounded w-full" />
                  </div>
                  <p className="text-gray-400 text-xs italic mt-4">"Under Colorado Revised Statutes 13-80-101, you have 3 years from the date of a car accident to file a personal injury claim..."</p>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-green-600"><span>&#x2713;</span> 8 structured H2 sections</div>
                  <div className="flex items-center gap-2 text-green-600"><span>&#x2713;</span> FAQ schema (rich results in Google)</div>
                  <div className="flex items-center gap-2 text-green-600"><span>&#x2713;</span> 4 strategic internal links</div>
                  <div className="flex items-center gap-2 text-green-600"><span>&#x2713;</span> Jurisdiction-specific statutes cited</div>
                  <div className="flex items-center gap-2 text-green-600"><span>&#x2713;</span> Attorney-attributed with E-E-A-T signals</div>
                  <div className="flex items-center gap-2 text-green-600"><span>&#x2713;</span> Bar-compliant. Attorney-reviewed.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Live examples */}
          <div className="mt-8 bg-gray-50 rounded-xl p-6 text-center">
            <p className="text-sm text-gray-600 mb-3">See our content in action on real law firm websites:</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/case-studies/the-sands-law-group/" className="text-xs font-semibold px-4 py-2 rounded-full no-underline border border-gray-200 hover:border-orange-300 transition-colors" style={{ color: O }}>
                Sands Law Group (+200 leads/mo)
              </Link>
              <Link href="/case-studies/wilson-criminal-defence/" className="text-xs font-semibold px-4 py-2 rounded-full no-underline border border-gray-200 hover:border-orange-300 transition-colors" style={{ color: O }}>
                Wilson Criminal Defence (+1,851% traffic)
              </Link>
              <Link href="/case-studies/gjel-accident-attorneys/" className="text-xs font-semibold px-4 py-2 rounded-full no-underline border border-gray-200 hover:border-orange-300 transition-colors" style={{ color: O }}>
                GJEL Accident Attorneys (3x cases)
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          4. HOW WE USE AI (Transparency)
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-3 text-center">
            "Why Am I Paying You If You Use AI?"
          </h2>
          <p className="text-gray-500 text-center mb-10 max-w-2xl mx-auto">
            Fair question. Here's the honest answer.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* AI handles */}
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: B + "15", color: B }}>20%</span>
                <span className="font-heading font-bold text-gray-900">What AI Handles</span>
              </div>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex gap-2"><span style={{ color: B }}>&#9679;</span> Initial research and data synthesis</li>
                <li className="flex gap-2"><span style={{ color: B }}>&#9679;</span> Structural outlining</li>
                <li className="flex gap-2"><span style={{ color: B }}>&#9679;</span> Competitor page analysis</li>
                <li className="flex gap-2"><span style={{ color: B }}>&#9679;</span> Formatting and schema generation</li>
              </ul>
            </div>

            {/* Humans handle */}
            <div className="rounded-xl border-2 p-6" style={{ borderColor: O, background: O + "08" }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: O }}>80%</span>
                <span className="font-heading font-bold text-gray-900">What Humans Handle</span>
              </div>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex gap-2"><span style={{ color: O }}>&#9679;</span> Legal accuracy and jurisdiction-specific details</li>
                <li className="flex gap-2"><span style={{ color: O }}>&#9679;</span> Your firm's voice and tone</li>
                <li className="flex gap-2"><span style={{ color: O }}>&#9679;</span> E-E-A-T signals and attorney attribution</li>
                <li className="flex gap-2"><span style={{ color: O }}>&#9679;</span> Bar advertising rule compliance</li>
                <li className="flex gap-2"><span style={{ color: O }}>&#9679;</span> Conversion copy and CTA placement</li>
                <li className="flex gap-2"><span style={{ color: O }}>&#9679;</span> Attorney review (catches 2-5 errors per piece)</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <p className="text-gray-700 text-sm leading-relaxed max-w-2xl mx-auto">
              AI is a tool in our process, not the process itself. ChatGPT cannot tell you the statute of limitations for wrongful termination in Ohio, cite the correct EEOC filing deadline, or write in the voice of a criminal defense attorney who has tried 200 jury cases. Our writers can. The final product reads and ranks as human-authored legal content because the substantive decisions are made by humans.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          5. VOICE & TONE
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-3 text-center">
            Your Firm Has a Voice. We Write In It.
          </h2>
          <p className="text-gray-500 text-center mb-10 max-w-2xl mx-auto">
            A criminal defense attorney and an adoption lawyer need completely different tones. We don't use one template for both.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                tone: "Aggressive & Direct",
                type: "Criminal Defense",
                sample: "You were charged. Not convicted. The prosecution has to prove every element beyond a reasonable doubt. That is their burden, not yours. We find the holes in their case.",
                color: "#c0392b",
              },
              {
                tone: "Compassionate & Reassuring",
                type: "Family Law",
                sample: "Divorce is overwhelming. You are making decisions about your children, your home, and your future all at once. You deserve an attorney who listens first and advises second.",
                color: "#27ae60",
              },
              {
                tone: "Professional & Analytical",
                type: "Employment / Corporate",
                sample: "EEOC complaints require a response within 30 days. A poorly drafted position statement can expose your organization to additional liability. We draft responses that protect your interests.",
                color: B,
              },
            ].map((card) => (
              <div key={card.type} className="rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-5 py-3" style={{ background: card.color }}>
                  <span className="text-white text-xs font-bold uppercase tracking-widest">{card.tone}</span>
                  <div className="text-white/80 text-xs mt-0.5">{card.type}</div>
                </div>
                <div className="p-5">
                  <p className="text-gray-700 text-sm italic leading-relaxed">"{card.sample}"</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            Before we write a word, we study your existing content, your intake style, and your philosophy. The content we produce sounds like you wrote it on your best day.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          6. THE 6-STEP PROCESS
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 px-6" style={{ background: D }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading font-extrabold text-white text-3xl mb-3 text-center">How We Build Content That Ranks and Converts</h2>
          <p className="text-gray-400 text-center mb-12">Every piece follows the same proven process. No shortcuts.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { num: "1", title: "Keyword Research", desc: "We identify the exact searches your ideal clients type. Volume, difficulty, intent. No guesswork.", highlight: false },
              { num: "2", title: "Content Brief", desc: "A detailed blueprint: target keyword, competing pages to beat, required sections, word count, internal links.", highlight: false },
              { num: "3", title: "Drafting", desc: "Legal writers produce jurisdiction-specific content at 8th-10th grade reading level. Your state's laws, your courts, your procedures.", highlight: false },
              { num: "4", title: "Attorney Review", desc: "Every piece is fact-checked by an attorney. Catches 2-5 errors per piece. Non-optional. Non-skippable.", highlight: true },
              { num: "5", title: "SEO Optimization", desc: "Heading structure, internal links, FAQ schema, meta tags, featured snippet formatting. Built for Google.", highlight: false },
              { num: "6", title: "Publish & Track", desc: "We publish, submit for indexing, and review at 90 days. Underperformers get updated, not abandoned.", highlight: false },
            ].map((step) => (
              <div key={step.num} className={`rounded-xl p-6 ${step.highlight ? "ring-2" : "bg-gray-800"}`} style={step.highlight ? { background: O + "15", borderColor: O, ["--tw-ring-color" as string]: O } : {}}>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full font-heading font-extrabold text-white text-sm mb-4" style={{ background: step.highlight ? O : "#4b5563" }}>
                  {step.num}
                </span>
                <h3 className="font-heading font-bold text-white text-lg mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          7. SUCCESS METRICS
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-4">Content That Makes the Phone Ring</h2>
          <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
            We don't measure success by traffic charts. We measure it by consultation requests and signed cases.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { value: "113+", label: "Law firms served" },
              { value: "2-5", label: "Errors caught per piece in attorney review" },
              { value: "12-18 mo", label: "Compounding organic traffic timeline" },
              { value: "90 days", label: "Results guarantee or free month" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl bg-gray-50 p-5">
                <div className="font-heading font-extrabold text-2xl" style={{ color: O }}>{stat.value}</div>
                <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-xl p-6 text-left max-w-2xl mx-auto">
            <p className="text-gray-700 text-sm leading-relaxed">
              A potential client who reads your detailed DUI defense page - the one that explains the specific charges, the court process in their county, the likely outcomes, and your fee structure - arrives at the consultation already educated, already warmed up, and already past the point of wondering whether you handle their type of case.
            </p>
            <p className="text-gray-700 text-sm leading-relaxed mt-3">
              That is what good content does. It pre-qualifies. It builds trust before the first phone call. It reduces the intake team's workload. And it compounds over time in a way that paid advertising never will.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          8. PRICING
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-3 text-center">Transparent Pricing. On the Website. Like We Promised.</h2>
          <p className="text-gray-500 text-center mb-10">No discovery calls required to see what you'll pay.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Launchpad */}
            <div className="rounded-xl bg-white border border-gray-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100">
                <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: O }}>JurisPage Launchpad</div>
                <div className="font-heading font-extrabold text-gray-900 text-2xl">Starting at $2,000<span className="text-base font-normal text-gray-400">/mo</span></div>
                <div className="text-xs text-gray-500 mt-1">For solo attorneys and small firms (1-4 attorneys)</div>
              </div>
              <div className="px-6 py-5 space-y-3 text-sm">
                <div className="flex items-start gap-2"><span style={{ color: "#27ae60" }}>&#x2713;</span> Custom law firm website</div>
                <div className="flex items-start gap-2"><span style={{ color: "#27ae60" }}>&#x2713;</span> Monthly SEO blog posts</div>
                <div className="flex items-start gap-2"><span style={{ color: "#27ae60" }}>&#x2713;</span> Practice area page creation</div>
                <div className="flex items-start gap-2"><span style={{ color: "#27ae60" }}>&#x2713;</span> Google Business Profile setup</div>
                <div className="flex items-start gap-2"><span style={{ color: "#27ae60" }}>&#x2713;</span> Attorney review on all content</div>
                <div className="flex items-start gap-2"><span style={{ color: "#27ae60" }}>&#x2713;</span> Month-to-month. No contracts.</div>
              </div>
              <div className="px-6 pb-6">
                <Link href="/launchpad/" className="block text-center px-6 py-3 rounded-full text-white font-bold text-sm no-underline" style={{ background: O }}>
                  See Launchpad Pricing
                </Link>
              </div>
            </div>

            {/* Juris Digital */}
            <div className="rounded-xl overflow-hidden" style={{ background: D }}>
              <div className="px-6 py-5 border-b border-gray-700">
                <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: O }}>Juris Digital</div>
                <div className="font-heading font-extrabold text-white text-2xl">Starting at $5,000<span className="text-base font-normal text-gray-400">/mo</span></div>
                <div className="text-xs text-gray-400 mt-1">For established firms (5+ attorneys) ready to dominate</div>
              </div>
              <div className="px-6 py-5 space-y-3 text-sm text-gray-300">
                <div className="flex items-start gap-2"><span style={{ color: O }}>&#x2713;</span> Everything in Launchpad, plus:</div>
                <div className="flex items-start gap-2"><span style={{ color: O }}>&#x2713;</span> Full content strategy with topic mapping</div>
                <div className="flex items-start gap-2"><span style={{ color: O }}>&#x2713;</span> 4-8 content pieces per month</div>
                <div className="flex items-start gap-2"><span style={{ color: O }}>&#x2713;</span> Google Ads management</div>
                <div className="flex items-start gap-2"><span style={{ color: O }}>&#x2713;</span> Link building and authority development</div>
                <div className="flex items-start gap-2"><span style={{ color: O }}>&#x2713;</span> Dedicated account strategist</div>
              </div>
              <div className="px-6 pb-6">
                <Link href="/growth-assessment/" className="block text-center px-6 py-3 rounded-full font-bold text-sm no-underline border-2 border-white text-white hover:bg-white hover:text-gray-900 transition-colors">
                  Apply for a Strategy Session
                </Link>
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            <Link href="/services/pricing/" className="no-underline hover:underline" style={{ color: O }}>See full pricing breakdown</Link> | 90-day results guarantee | You own everything we build
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          9. FAILURE / RISK
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-6 text-center">What Happens If You Do Nothing</h2>
          <div className="space-y-4">
            {[
              "Every month without strategic content, your competitors are publishing pages that build authority you will have to outspend to overcome later.",
              "AI-generated content without attorney review is a bar complaint waiting to happen. One wrong statute of limitations, one fabricated case citation, and your credibility is gone.",
              "The firms ranking above you right now are not smarter. They just started publishing real content before you did. The gap gets wider every month you wait.",
            ].map((item, i) => (
              <div key={i} className="flex gap-4 bg-red-50 border border-red-100 rounded-xl p-5">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v6M8 11v1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                </span>
                <p className="text-gray-700 text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          10. CTA
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20 px-6 text-center" style={{ background: D }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="font-heading font-extrabold text-white text-3xl mb-4">Ready to Build Content That Actually Works?</h2>
          <p className="text-gray-400 mb-8">No contracts. No pressure. We will respond within one business day.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact/" className="px-8 py-4 rounded-full text-white font-bold text-sm no-underline transition-opacity hover:opacity-90" style={{ background: O }}>
              Book Your Strategy Session
            </Link>
            <Link href="/services/pricing/" className="px-8 py-4 rounded-full font-bold text-sm no-underline border-2 border-gray-600 text-gray-300 hover:border-white hover:text-white transition-colors">
              See Full Pricing
            </Link>
          </div>
          <p className="text-gray-500 text-xs mt-6">Month-to-month. 90-day guarantee. You own everything.</p>
        </div>
      </section>
    </>
  );
}
