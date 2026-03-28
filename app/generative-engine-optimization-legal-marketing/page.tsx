import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getServiceBySlug } from "@/data/services";
import FAQAccordion from "@/components/FAQAccordion";
import SchemaOrg from "@/components/SchemaOrg";
import CTASection from "@/components/CTASection";
import AiVisibilitySimulator from "@/components/AiVisibilitySimulator";

const service = getServiceBySlug("generative-engine-optimization-legal-marketing")!;
const O = "#EE6C13";
const D = "#1a1a2e";
const G = "#27ae60";
const B = "#0f4c81";
const R = "#c0392b";

export const metadata: Metadata = {
  title: "Generative Engine Optimization for Law Firms: Get Cited in ChatGPT, Perplexity, and AI Overviews",
  description: "GEO for law firms. Get your firm cited by name in ChatGPT, Perplexity, Google AI Overviews, and Claude. Schema optimization, E-E-A-T content, and AI citation strategy.",
  alternates: { canonical: "https://jurispage.com/generative-engine-optimization-legal-marketing/" },
};

export default function GeoPage() {
  const allFaqs = [
    { question: "What is generative engine optimization for law firms?", preview: "The process of getting your firm cited by name inside AI-generated answers from ChatGPT, Perplexity, and Google AI Overviews.", answer: service.extendedFaqs?.[0]?.answer ?? "" },
    { question: "How does ChatGPT decide which lawyers to recommend?", preview: "It cites firms that appear consistently across authoritative sources: legal directories, bar sites, publications, and firm websites with attorney-attributed content.", answer: service.extendedFaqs?.[1]?.answer ?? "" },
    { question: "How do you appear in Google AI Overviews?", preview: "Structured data (LegalService, FAQPage schema), direct-answer content formatting, and existing top-10 organic rankings.", answer: service.extendedFaqs?.[2]?.answer ?? "" },
    { question: "What schema types matter most for law firm GEO?", preview: "LegalService, Person, FAQPage, and HowTo. Most law firm websites have none of these implemented correctly.", answer: service.extendedFaqs?.[3]?.answer ?? "" },
    { question: "Does GEO replace traditional law firm SEO?", preview: "No. GEO is an additional layer on top of SEO. The authority signals from SEO are what make AI citation possible.", answer: service.extendedFaqs?.[4]?.answer ?? "" },
    ...service.faqs,
  ];

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://jurispage.com/generative-engine-optimization-legal-marketing/",
      name: "Generative Engine Optimization for Law Firms",
      description: "GEO services for law firms. Get cited in ChatGPT, Perplexity, Google AI Overviews, and other AI search tools.",
      provider: { "@type": "Organization", name: "JurisPage", url: "https://jurispage.com" },
      url: "https://jurispage.com/generative-engine-optimization-legal-marketing/",
      areaServed: { "@type": "Country", name: "United States" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: allFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ];

  return (
    <>
      <SchemaOrg schema={schemas} />

      {/* 1. HERO */}
      <section className="bg-white py-20 px-6 border-b border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <nav className="text-sm text-gray-500 mb-5">
            <Link href="/" className="hover:text-gray-900 no-underline">Home</Link> /{" "}
            <span className="text-gray-700">GEO for Law Firms</span>
          </nav>
          <div className="flex flex-wrap gap-3 justify-center mb-6">
            <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: O + "15", color: O }}>28% Use ChatGPT to Research Lawyers</span>
            <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: R + "15", color: R }}>40%+ of Google Shows AI Overviews</span>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-gray-100 text-gray-600">Most Firms Are Invisible to AI</span>
          </div>
          <h1 className="font-heading font-extrabold text-gray-900 text-3xl md:text-5xl leading-tight mb-6">
            Generative Engine Optimization for Law Firms: Get Cited in ChatGPT, Perplexity, and <span style={{ color: O }}>AI Overviews</span>
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            You rank on page 1 of Google. But when someone asks ChatGPT "who is the best personal injury lawyer in my city," your name is nowhere in the answer.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            The firms being cited are not necessarily the best. They are the ones whose content AI systems can identify, attribute, and trust. That is what GEO fixes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact/" className="px-8 py-4 rounded-full text-white font-bold text-sm no-underline transition-opacity hover:opacity-90" style={{ background: O }}>Get Your AI Visibility Audit</Link>
            <Link href="/services/pricing/" className="px-8 py-4 rounded-full font-bold text-sm no-underline border-2 transition-all hover:bg-gray-50" style={{ borderColor: D, color: D }}>See Transparent Pricing</Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 px-6" style={{ background: O }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "28%", label: "Of consumers use ChatGPT to research lawyers" },
              { value: "40%+", label: "Of Google searches show an AI Overview" },
              { value: "1-2", label: "Firms cited in a typical AI response (not 10)" },
              { value: "Early", label: "Most law firms have zero GEO strategy" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-heading font-extrabold text-white text-3xl md:text-4xl leading-none mb-1">{stat.value}</div>
                <div className="text-orange-100 text-sm leading-snug">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. THE SHIFT (Problem) */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-3 text-center">You Rank on Google. But Do You Exist in AI?</h2>
          <p className="text-gray-500 text-center mb-10 max-w-2xl mx-auto">AI search is not a future trend. It is actively routing qualified legal inquiries to a small number of firms right now.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { label: "The External Problem", title: "AI recommends your competitors by name", body: "Someone asks ChatGPT for a lawyer recommendation. It names 2 firms. Neither is yours. The client never searches Google at all.", color: R },
              { label: "The Internal Problem", title: "You invested years in SEO and the rules just changed", body: "You built authority, earned rankings, and published content. Now AI is answering the question before anyone clicks a link. And you don't know how to get into those answers.", color: "#e67e22" },
              { label: "The Philosophical Problem", title: "The best lawyer shouldn't be invisible to AI", body: "You have more experience, better results, and stronger credentials than the firm AI is recommending. The only difference is their content is structured for AI extraction. Yours isn't. That is fixable.", color: O },
            ].map((card) => (
              <div key={card.title} className="bg-white rounded-xl border border-gray-200 p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1" style={{ background: card.color }} />
                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: card.color }}>{card.label}</span>
                <h3 className="font-heading font-bold text-gray-900 text-lg mt-2 mb-3">{card.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-900 rounded-xl p-6 text-center">
            <p className="text-white text-sm font-bold">Unlike SEO, where 10 links fit on page one, AI often cites only one or two firms. If you aren't the first citation, you don't exist in that answer.</p>
          </div>
        </div>
      </section>

      {/* 3. AI VISIBILITY SIMULATOR */}
      <section className="py-16 px-6 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <span className="inline-block text-xs font-heading font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{ background: O + "15", color: O }}>Interactive Comparison</span>
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-3">Google Shows 10 Results. AI Cites 2.</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Toggle between a traditional Google search and an AI response. See the difference in visibility.</p>
        </div>
        <AiVisibilitySimulator />
      </section>

      {/* 4. HOW AI CHOOSES WHICH LAWYERS TO CITE */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-3 text-center">How AI Decides Which Lawyers to Cite</h2>
          <p className="text-gray-500 text-center mb-10 max-w-2xl mx-auto">Four factors determine whether your firm appears in AI answers. We optimize all four.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: "E-E-A-T Signals",
                what: "Attorney credentials, bar admissions, case experience, and professional memberships visible on your website.",
                why: "AI systems weight YMYL content from credentialed sources. A bio that says 'experienced attorney' gets ignored. A bio with bar numbers, court admissions, and case results gets cited.",
                we: "We audit and enhance every attorney bio and practice area page for the E-E-A-T signals AI models look for.",
                color: O,
              },
              {
                title: "Structured Data (Schema)",
                what: "LegalService, Person, FAQPage, and HowTo markup that tells AI systems what your firm does and who your attorneys are.",
                why: "Without schema, AI cannot reliably attribute content to your firm. It sees text but doesn't know which firm it belongs to.",
                we: "We implement the four schema types that matter most for legal AI visibility. Most firms have none.",
                color: B,
              },
              {
                title: "Third-Party Citations",
                what: "Mentions on Avvo, Justia, Super Lawyers, state bar directories, legal publications, and news outlets.",
                why: "ChatGPT and Perplexity pull from sources they consider authoritative. A single mention in a legal publication can produce repeated citations across hundreds of queries.",
                we: "We run targeted digital PR to earn mentions on the third-party sources AI models draw from.",
                color: G,
              },
              {
                title: "Content Clarity",
                what: "Direct, factual answers in plain language that AI can extract and attribute to your firm by name.",
                why: "'An experienced attorney can help you navigate this complex situation' will never get cited. 'In Colorado, you have 3 years from the date of injury to file a personal injury claim' will.",
                we: "We restructure your content for AI extraction: question headings, 40-100 word factual answers, jurisdiction-specific detail.",
                color: D,
              },
            ].map((card) => (
              <div key={card.title} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="h-1.5" style={{ background: card.color }} />
                <div className="p-6">
                  <h3 className="font-heading font-bold text-gray-900 text-lg mb-3">{card.title}</h3>
                  <div className="space-y-3 text-sm">
                    <div><span className="font-bold text-gray-700">What:</span> <span className="text-gray-600">{card.what}</span></div>
                    <div><span className="font-bold text-gray-700">Why AI cares:</span> <span className="text-gray-600">{card.why}</span></div>
                    <div className="rounded-lg p-3" style={{ background: card.color + "08" }}>
                      <span className="font-bold text-xs" style={{ color: card.color }}>What we do:</span>
                      <span className="text-gray-700 text-xs ml-1">{card.we}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SCHEMA VISUALIZER */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-3 text-center">What AI Reads When It Looks at Your Website</h2>
          <p className="text-gray-500 text-center mb-10">Schema markup is the code that tells AI systems who you are and what you do. Without it, AI sees text but can't attribute it.</p>

          <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
            {/* Fake search result with annotations */}
            <div className="bg-white rounded-lg p-5 border border-gray-100 relative">
              <div className="text-xs text-gray-500 mb-1">smithlegal.com &gt; personal-injury</div>
              <div className="text-blue-700 text-lg font-medium mb-1">Chicago Personal Injury Lawyer | Smith & Associates</div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map((s) => <span key={s} className="text-yellow-400 text-xs">&#9733;</span>)}
                </div>
                <span className="text-xs text-gray-500">4.9 (127 reviews)</span>
              </div>
              <div className="text-sm text-gray-600">John Smith is a board-certified personal injury trial lawyer with 25 years of experience in Cook County courts. Free consultations. No fees unless we win.</div>

              {/* Annotation callouts */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  { label: "Person Schema", desc: "Attorney name, bar number, credentials", color: O },
                  { label: "LegalService Schema", desc: "Practice areas, geographic coverage", color: B },
                  { label: "AggregateRating", desc: "Star rating visible in search results", color: "#e67e22" },
                  { label: "FAQPage Schema", desc: "Q&A content AI can extract and cite", color: G },
                ].map((item) => (
                  <div key={item.label} className="rounded-lg px-3 py-2 border" style={{ borderColor: item.color + "40", background: item.color + "08" }}>
                    <span className="text-[10px] font-bold uppercase" style={{ color: item.color }}>{item.label}</span>
                    <p className="text-xs text-gray-600 mt-0.5">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-xs text-gray-400 text-center mt-4">Most law firm websites have none of these schema types implemented. AI cannot extract what it cannot read.</p>
          </div>
        </div>
      </section>

      {/* 6. THE 6-STEP GEO PROCESS */}
      <section className="py-16 px-6" style={{ background: D }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading font-extrabold text-white text-3xl mb-3">The 6-Step GEO Process</h2>
          <p className="text-gray-400 mb-12">How we get your firm cited in AI responses. Each step builds on the last.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { num: "1", title: "AI Citation Audit", desc: "We query ChatGPT, Perplexity, and Google AI Overviews for your practice areas and market. You see exactly where you are and where competitors appear.", outcome: "Know your visibility gap." },
              { num: "2", title: "Schema Optimization", desc: "We implement LegalService, Person, FAQPage, and HowTo schema across your site so AI systems can identify and attribute your content.", outcome: "AI can finally read your site." },
              { num: "3", title: "E-E-A-T Enhancement", desc: "We strengthen attorney bios, add credentials, and ensure every practice area page demonstrates real legal expertise AI models trust.", outcome: "Content AI considers credible." },
              { num: "4", title: "Q&A Content Development", desc: "We build content answering the exact questions people ask AI about your practice area. Question headings, factual answers, jurisdiction-specific detail.", outcome: "Content formatted for AI citation." },
              { num: "5", title: "Digital PR for Citations", desc: "We earn mentions on the third-party sources AI models draw from: legal publications, bar associations, and authoritative directories.", outcome: "Authority AI trusts beyond your own site." },
              { num: "6", title: "Monthly AI Monitoring", desc: "We re-run your query set monthly across all AI platforms, track citation changes, and identify new opportunities as models update.", outcome: "Stay visible as AI evolves." },
            ].map((step) => (
              <div key={step.num} className="bg-gray-800 rounded-xl p-5 text-left">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full font-heading font-extrabold text-white text-sm mb-3" style={{ background: O }}>{step.num}</span>
                <h3 className="font-heading font-bold text-white text-base mb-2">{step.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed mb-3">{step.desc}</p>
                <span className="text-[10px] font-bold uppercase" style={{ color: O }}>{step.outcome}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. JURISPAGE vs GENERALIST */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-3 text-center">Why a Legal-Specific GEO Agency Matters</h2>
          <p className="text-gray-500 text-center mb-10">Generalist agencies don't understand YMYL, bar compliance, or legal schema. The difference is measurable.</p>

          <div className="rounded-xl border border-gray-200 overflow-hidden bg-white">
            <div className="grid grid-cols-3 text-xs font-bold uppercase tracking-widest">
              <div className="px-5 py-3 bg-gray-50 text-gray-500">Feature</div>
              <div className="px-5 py-3 text-center text-white" style={{ background: O }}>JurisPage</div>
              <div className="px-5 py-3 bg-gray-100 text-center text-gray-500">Generalist Agency</div>
            </div>
            {[
              { feature: "Legal ethics and bar compliance", us: "Native to our process", them: "\"We'll check if you tell us\"" },
              { feature: "Schema complexity", us: "LegalService, Person, FAQ, HowTo", them: "Basic LocalBusiness only" },
              { feature: "Content quality", us: "Legal content specialists", them: "General writers" },
              { feature: "AI visibility tracking", us: "ChatGPT + Perplexity + AI Overviews", them: "Google Search Console only" },
              { feature: "E-E-A-T expertise", us: "Built for YMYL legal content", them: "Generic approach" },
              { feature: "Digital PR targets", us: "Legal publications, bar associations", them: "General news sites" },
              { feature: "100% law firm focus", us: "Yes", them: "No" },
            ].map((row, i) => (
              <div key={row.feature} className={`grid grid-cols-3 text-sm ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                <div className="px-5 py-3 text-gray-700 font-medium">{row.feature}</div>
                <div className="px-5 py-3 text-center text-xs" style={{ color: G }}>{row.us}</div>
                <div className="px-5 py-3 text-center text-xs text-gray-400">{row.them}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. THE LAND GRAB */}
      <section className="py-16 px-6" style={{ background: D }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading font-extrabold text-white text-3xl mb-6">The Window Is Closing. Early Movers Are Locking In Citations.</h2>
          <div className="space-y-4 text-left">
            {[
              "AI citation patterns reinforce themselves. Firms cited today build authority signals that make future citations more likely. The gap between early movers and late adopters widens every month.",
              "Unlike SEO, where 10 firms share page one and you can always climb, AI often cites only one or two. The first firms to establish entity authority in their market may hold those citation positions for years.",
              "Most law firms have zero deliberate GEO strategy. The firms acting in 2026 are claiming positions before the market crowds. Every month you wait, a competitor moves into the space you could have owned.",
            ].map((item, i) => (
              <div key={i} className="flex gap-4 rounded-xl p-5" style={{ background: "rgba(255,255,255,0.05)" }}>
                <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: O }}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 3v6M8 11v1" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
                </span>
                <p className="text-gray-300 text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. PRICING */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-3 text-center">Pricing</h2>
          <p className="text-gray-500 text-center mb-10">GEO is included in JurisPage Pro. Foundational GEO starts in Launchpad.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl bg-white border border-gray-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100">
                <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: O }}>Launchpad (Foundation)</div>
                <div className="font-heading font-extrabold text-gray-900 text-2xl">Starting at $2,000<span className="text-base font-normal text-gray-400">/mo</span></div>
                <div className="text-xs text-gray-500 mt-1">Foundational GEO included with website and SEO</div>
              </div>
              <div className="px-6 py-5 space-y-3 text-sm">
                {["Schema markup (LegalService, Person, FAQ)", "E-E-A-T content on attorney bios", "Structured Q&A content", "Google Business Profile optimization", "Month-to-month. No contracts."].map((f) => (
                  <div key={f} className="flex items-start gap-2"><span style={{ color: G }}>&#x2713;</span> {f}</div>
                ))}
              </div>
              <div className="px-6 pb-6">
                <Link href="/launchpad/" className="block text-center px-6 py-3 rounded-full text-white font-bold text-sm no-underline" style={{ background: O }}>See Launchpad Pricing</Link>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden" style={{ background: D }}>
              <div className="px-6 py-5 border-b border-gray-700">
                <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: O }}>JurisPage Pro (Full GEO)</div>
                <div className="font-heading font-extrabold text-white text-2xl">Starting at $5,000<span className="text-base font-normal text-gray-400">/mo</span></div>
                <div className="text-xs text-gray-400 mt-1">Complete GEO strategy with monitoring and digital PR</div>
              </div>
              <div className="px-6 py-5 space-y-3 text-sm text-gray-300">
                {["Everything in Launchpad, plus:", "Monthly AI citation audit across all platforms", "Digital PR for third-party AI citations", "Structured Q&A content library", "Copilot and Perplexity optimization", "Dedicated GEO strategist"].map((f) => (
                  <div key={f} className="flex items-start gap-2"><span style={{ color: O }}>&#x2713;</span> {f}</div>
                ))}
              </div>
              <div className="px-6 pb-6">
                <Link href="/growth-assessment/" className="block text-center px-6 py-3 rounded-full font-bold text-xs no-underline border-2 border-white text-white hover:bg-white hover:text-gray-900 transition-colors">Apply for a Strategy Session</Link>
              </div>
            </div>
          </div>
          <p className="text-center text-xs text-gray-400 mt-6">
            <Link href="/services/pricing/" className="no-underline hover:underline" style={{ color: O }}>See full pricing breakdown</Link> | 90-day results guarantee | You own everything
          </p>
        </div>
      </section>

      {/* Related */}
      <section className="py-12 px-6 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">GEO works best with</p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Law Firm SEO", href: "/law-firm-seo/" },
              { label: "Law Firm Content Writing", href: "/law-firm-content-writing/" },
              { label: "Local SEO for Law Firms", href: "/local-seo-for-law-firms/" },
              { label: "Law Firm Websites", href: "/law-firm-websites/" },
            ].map((link) => (
              <Link key={link.label} href={link.href} className="px-4 py-2 rounded-full border text-sm font-medium no-underline transition-all hover:bg-[#EE6C13] hover:text-white hover:border-[#EE6C13]" style={{ borderColor: O, color: O }}>{link.label}</Link>
            ))}
          </div>
        </div>
      </section>

      <FAQAccordion faqs={allFaqs} heading="Generative Engine Optimization: Questions Answered" />

      {/* 11. CTA with photo */}
      <section className="py-20 px-6 text-center" style={{ background: D }}>
        <div className="max-w-2xl mx-auto">
          <Image
            src="/images/about/headshot-casey-meraz.jpg"
            alt="Casey Meraz, Founder of JurisPage - GEO strategist for law firms"
            width={80}
            height={80}
            className="rounded-full mx-auto mb-4 object-cover"
            style={{ width: 80, height: 80 }}
          />
          <p className="text-gray-400 text-sm italic mb-6">"I've audited 50+ firms this month. Most are invisible to AI. Let's change that for you."</p>
          <h2 className="font-heading font-extrabold text-white text-3xl mb-4">Get Your AI Visibility Audit</h2>
          <p className="text-gray-400 mb-8">We will query ChatGPT, Perplexity, and Google AI Overviews for your practice area and city. You will see exactly where you stand. Free. No obligation.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact/" className="px-8 py-4 rounded-full text-white font-bold text-sm no-underline transition-opacity hover:opacity-90" style={{ background: O }}>Get Your AI Visibility Audit</Link>
            <Link href="/services/pricing/" className="px-8 py-4 rounded-full font-bold text-sm no-underline border-2 border-gray-600 text-gray-300 hover:border-white hover:text-white transition-colors">See Transparent Pricing</Link>
          </div>
          <p className="text-gray-500 text-xs mt-6">Month-to-month. 90-day guarantee. You own everything.</p>
        </div>
      </section>
    </>
  );
}
