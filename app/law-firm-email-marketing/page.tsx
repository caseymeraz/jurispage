import type { Metadata } from "next";
import Link from "next/link";
import { getServiceBySlug } from "@/data/services";
import FAQAccordion from "@/components/FAQAccordion";
import SchemaOrg from "@/components/SchemaOrg";
import CTASection from "@/components/CTASection";

const service = getServiceBySlug("law-firm-email-marketing")!;
const O = "#EE6C13";
const D = "#1a1a2e";
const G = "#27ae60";

export const metadata: Metadata = {
  title: "Law Firm Email Marketing: Turn Past Clients Into Your Best Referral Source",
  description: "Email marketing for law firms that turns dormant contact lists into a steady referral pipeline. Bar-compliant campaigns. $36 return per $1 spent. No upfront fee.",
  alternates: { canonical: "https://jurispage.com/law-firm-email-marketing/" },
};

export default function EmailMarketingPage() {
  const allFaqs = [
    { question: "Can I email past clients after their case closes?", preview: "In most jurisdictions, yes. Past clients are an existing relationship with fewer restrictions than cold outreach.", answer: service.extendedFaqs?.[2]?.answer ?? "" },
    { question: "How often should a law firm send marketing emails?", preview: "Once a month is the sweet spot. Enough to stay top of mind. Not so frequent that people unsubscribe.", answer: service.extendedFaqs?.[0]?.answer ?? "" },
    { question: "What is a good open rate for law firm emails?", preview: "Legal industry average is 21%. A well-segmented past client list can hit 30-40%.", answer: service.extendedFaqs?.[1]?.answer ?? "" },
    { question: "Should I use Mailchimp or a legal-specific CRM?", preview: "If you already have Lawmatics or Clio Grow, use their email tools. If not, Mailchimp is a reliable starting point.", answer: service.extendedFaqs?.[3]?.answer ?? "" },
    { question: "Is email marketing worth it for small law firms?", preview: "One referral case per year pays for the entire investment. The math works at any firm size.", answer: service.extendedFaqs?.[4]?.answer ?? "" },
    ...service.faqs,
  ];

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://jurispage.com/law-firm-email-marketing/",
      name: "Law Firm Email Marketing",
      description: "Email marketing for law firms that turns dormant contact lists into a steady referral pipeline.",
      provider: { "@type": "Organization", name: "JurisPage", url: "https://jurispage.com" },
      url: "https://jurispage.com/law-firm-email-marketing/",
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
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://jurispage.com/" },
        { "@type": "ListItem", position: 2, name: "Law Firm Email Marketing", item: "https://jurispage.com/law-firm-email-marketing/" },
      ],
    },
  ];

  return (
    <>
      <SchemaOrg schema={schemas} />

      {/* ═══════════════════════════════════════════════════════
          1. HERO
      ═══════════════════════════════════════════════════════ */}
      <section className="bg-white py-20 px-6 border-b border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <nav className="text-sm text-gray-500 mb-5">
            <Link href="/" className="hover:text-gray-900 no-underline">Home</Link> /{" "}
            <span className="text-gray-700">Law Firm Email Marketing</span>
          </nav>

          <div className="flex flex-wrap gap-3 justify-center mb-6">
            <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: O + "15", color: O }}>$36 Return Per $1 Spent</span>
            <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: G + "15", color: G }}>100% Bar Compliant</span>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-gray-100 text-gray-600">Zero Ad Spend Required</span>
          </div>

          <h1 className="font-heading font-extrabold text-gray-900 text-4xl md:text-5xl leading-tight mb-6">
            You Have Hundreds of Past Clients.<br />When Was the Last Time You <span style={{ color: O }}>Emailed</span> Them?
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            Every past client is a potential referral source. Every referral partner who hasn't heard from you in a year has forgotten your name. Right now, those contacts are sitting in a CRM or a spreadsheet, generating zero revenue.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            One well-timed email to a past client whose friend needs a lawyer can be worth $5,000 to $50,000 in fees. That is not a marketing theory. That is how established firms grow.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact/" className="px-8 py-4 rounded-full text-white font-bold text-sm no-underline transition-opacity hover:opacity-90" style={{ background: O }}>
              Get a Free Email Strategy Session
            </Link>
            <Link href="/services/pricing/" className="px-8 py-4 rounded-full font-bold text-sm no-underline border-2 transition-all hover:bg-gray-50" style={{ borderColor: D, color: D }}>
              See Transparent Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          2. ROI STATS - Visual
      ═══════════════════════════════════════════════════════ */}
      <section className="py-10 px-6" style={{ background: O }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "$36", label: "Average return per $1 spent on email marketing" },
              { value: "70%+", label: "Of new clients come from referrals or past relationships" },
              { value: "21%", label: "Average open rate for legal industry emails" },
              { value: "$0", label: "Cost per send to your existing contact list" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-heading font-extrabold text-white text-3xl md:text-4xl leading-none mb-1">{stat.value}</div>
                <div className="text-orange-100 text-sm leading-snug">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          3. THE REVENUE LEAK (StoryBrand: Problem)
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-3 text-center">Are You Leaking Revenue?</h2>
          <p className="text-gray-500 text-center mb-10 max-w-2xl mx-auto">If you have 500 past clients in your CRM and you are not emailing them monthly, you are actively losing referrals to competitors who do.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* Failure scenario */}
            <div className="rounded-xl border border-red-200 bg-white overflow-hidden">
              <div className="bg-red-500 text-white text-center py-2 text-xs font-bold uppercase tracking-widest">Without Email Marketing</div>
              <div className="p-6 space-y-4">
                <div className="flex gap-3 text-sm"><span className="text-red-400 flex-shrink-0 mt-0.5">&#x2717;</span><span className="text-gray-700">Your past client's friend gets injured. Because you haven't been in touch in 3 years, they Google a lawyer and hire your competitor.</span></div>
                <div className="flex gap-3 text-sm"><span className="text-red-400 flex-shrink-0 mt-0.5">&#x2717;</span><span className="text-gray-700">Referral partners who sent you cases 2 years ago have gone quiet. They didn't stop liking you. They just forgot about you.</span></div>
                <div className="flex gap-3 text-sm"><span className="text-red-400 flex-shrink-0 mt-0.5">&#x2717;</span><span className="text-gray-700">Your newsletter signup form has 200 names on it. You have never sent them a single email.</span></div>
                <div className="flex gap-3 text-sm"><span className="text-red-400 flex-shrink-0 mt-0.5">&#x2717;</span><span className="text-gray-700">Prospective clients who had a consultation but didn't hire you never hear from you again. No follow-up. No nurture. Lost.</span></div>
              </div>
              <div className="bg-red-50 px-6 py-3 text-center">
                <p className="text-red-600 text-xs font-bold">These are cases you earned the right to get. You just didn't stay in touch.</p>
              </div>
            </div>

            {/* Success scenario */}
            <div className="rounded-xl overflow-hidden border-2" style={{ borderColor: O }}>
              <div className="text-white text-center py-2 text-xs font-bold uppercase tracking-widest" style={{ background: O }}>With JurisPage Email Marketing</div>
              <div className="p-6 space-y-4" style={{ background: O + "06" }}>
                <div className="flex gap-3 text-sm"><span className="flex-shrink-0 mt-0.5" style={{ color: G }}>&#x2713;</span><span className="text-gray-700">Past clients get a monthly update from your firm. When their neighbor needs a lawyer, your name is the first one they think of.</span></div>
                <div className="flex gap-3 text-sm"><span className="flex-shrink-0 mt-0.5" style={{ color: G }}>&#x2713;</span><span className="text-gray-700">Referral partners receive quarterly check-ins. They remember you exist and send cases your way consistently.</span></div>
                <div className="flex gap-3 text-sm"><span className="flex-shrink-0 mt-0.5" style={{ color: G }}>&#x2713;</span><span className="text-gray-700">Newsletter subscribers get educational content that builds trust. When they need an attorney, the decision is already made.</span></div>
                <div className="flex gap-3 text-sm"><span className="flex-shrink-0 mt-0.5" style={{ color: G }}>&#x2713;</span><span className="text-gray-700">Consultation prospects who didn't hire you receive a 6-part nurture sequence. 15-20% come back and retain you.</span></div>
              </div>
              <div className="px-6 py-3 text-center" style={{ background: O + "10" }}>
                <p className="text-xs font-bold" style={{ color: O }}>You become the "go-to" attorney in your network. Zero ad spend.</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-700 text-sm font-bold">An attorney who wins a great case shouldn't be forgotten 3 years later just because they didn't send an email.</p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          4. BAR COMPLIANCE (Moved to forefront)
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6" style={{ background: G + "15" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2.5" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
          </div>
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-4">100% State Bar Compliant. Every Campaign. Every Send.</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            General marketing agencies will blindly email your list and accidentally violate your state's bar advertising rules. One non-compliant email can trigger a bar complaint. We know the rules and build every campaign within them.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            {[
              { title: "CAN-SPAM Compliance", desc: "Physical address, unsubscribe link, honest subject lines. Every email. Automatically." },
              { title: "State Bar Ad Rules", desc: "Jurisdiction-specific disclaimers, solicitation restrictions, and content guidelines reviewed before every send." },
              { title: "Opt-In Best Practices", desc: "Proper consent tracking, list hygiene, and unsubscribe handling that protects your reputation and deliverability." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-gray-200 p-5">
                <h3 className="font-heading font-bold text-gray-900 text-sm mb-2">{item.title}</h3>
                <p className="text-gray-600 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          5. THE 3-STEP PLAN (StoryBrand: Plan)
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 px-6" style={{ background: D }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading font-extrabold text-white text-3xl mb-3">How It Works: 3 Steps to a Referral Pipeline</h2>
          <p className="text-gray-400 mb-4">You don't have time to write newsletters or figure out Mailchimp. We handle everything.</p>
          <p className="mb-12">
            <span className="inline-block px-4 py-2 rounded-full text-xs font-bold" style={{ background: O + "25", color: O }}>
              Your time: approve the content once a month. We handle the rest.
            </span>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: "1", title: "We Mine Your Existing Network", desc: "We audit your CRM, consolidate scattered contacts, and segment your list by relationship type: past clients, referral sources, prospects, and newsletter subscribers. Most firms have 200-2,000+ contacts sitting dormant." },
              { num: "2", title: "We Create Compliant Content", desc: "We design branded templates, write your campaigns in your firm's voice, and review every send against CAN-SPAM and your state's bar advertising rules. You approve the content. We handle everything else." },
              { num: "3", title: "You Stay Top-of-Mind", desc: "Your network receives consistent, valuable communication from your firm. Past clients refer friends. Referral partners send cases. Prospects who didn't hire you come back. All with zero ad spend." },
            ].map((step) => (
              <div key={step.num} className="bg-gray-800 rounded-xl p-6 text-left">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full font-heading font-extrabold text-white text-sm mb-4" style={{ background: O }}>
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
          6. ANATOMY OF A PERFECT LEGAL EMAIL
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-3 text-center">What a Great Law Firm Email Looks Like</h2>
          <p className="text-gray-500 text-center mb-10">Not a sales pitch. Not legal advice. A value-first touchpoint that makes your phone ring.</p>

          <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            {/* Email header mockup */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full" style={{ background: O }} />
                <div>
                  <div className="text-sm font-bold text-gray-900">Smith & Associates, PLLC</div>
                  <div className="text-xs text-gray-500">monthly-update@smithlegal.com</div>
                </div>
              </div>
              <div className="text-sm font-heading font-bold text-gray-900">New Texas Employment Laws: What Changed in 2026</div>
            </div>
            {/* Email body with annotations */}
            <div className="p-6 space-y-4 relative">
              <div className="flex gap-4">
                <div className="flex-1">
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">Hi [First Name],</p>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">Texas passed three new employment laws this session that affect every employer in the state. Here is what you need to know.</p>
                  <div className="h-2 bg-gray-100 rounded w-full mb-2" />
                  <div className="h-2 bg-gray-100 rounded w-5/6 mb-4" />
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">If you or someone you know has questions about how these changes affect your workplace, we are happy to talk. No charge for the initial conversation.</p>
                  <div className="inline-block px-5 py-2 rounded-full text-white text-xs font-bold" style={{ background: O }}>Schedule a Free Consultation</div>
                </div>
                {/* Annotation callouts */}
                <div className="hidden md:block w-48 space-y-4 text-[10px]">
                  <div className="rounded-lg border border-green-200 bg-green-50 p-2">
                    <span className="font-bold text-green-700">Educational, not salesy</span>
                    <p className="text-green-600 mt-0.5">Provides real value before asking for anything.</p>
                  </div>
                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-2">
                    <span className="font-bold text-blue-700">Personalized</span>
                    <p className="text-blue-600 mt-0.5">First name merge tag. Feels personal, not mass-blasted.</p>
                  </div>
                  <div className="rounded-lg border border-orange-200 bg-orange-50 p-2">
                    <span className="font-bold" style={{ color: O }}>Clear CTA</span>
                    <p className="mt-0.5" style={{ color: O }}>One action. Not five links competing for attention.</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Footer */}
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
              <div className="flex items-center justify-between text-[10px] text-gray-400">
                <span>Smith & Associates, PLLC | 123 Main St, Houston TX 77002</span>
                <div className="flex gap-3">
                  <span className="underline">Unsubscribe</span>
                  <span className="rounded px-1.5 py-0.5 bg-green-100 text-green-700 font-bold no-underline">Bar compliant disclaimer</span>
                </div>
              </div>
            </div>
          </div>
          {/* Mobile annotations */}
          <div className="md:hidden grid grid-cols-3 gap-2 mt-4">
            <div className="rounded-lg border border-green-200 bg-green-50 p-2 text-[10px]">
              <span className="font-bold text-green-700">Educational</span>
            </div>
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-2 text-[10px]">
              <span className="font-bold text-blue-700">Personalized</span>
            </div>
            <div className="rounded-lg border border-orange-200 bg-orange-50 p-2 text-[10px]">
              <span className="font-bold" style={{ color: O }}>Clear CTA</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          7. WHAT WE BUILD (Campaign types)
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-3 text-center">Email Campaigns We Build for Law Firms</h2>
          <p className="text-gray-500 text-center mb-10">Each campaign type serves a different purpose. Most firms need 2-3 running simultaneously.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: "Past Client Newsletter", desc: "Monthly legal updates relevant to their case type. Keeps you top-of-mind for referrals.", tag: "Highest ROI" },
              { title: "Referral Partner Check-Ins", desc: "Quarterly touchpoints with attorneys, financial advisors, and other referral sources.", tag: "Relationship" },
              { title: "Prospect Nurture Sequence", desc: "6-email automated series for consultation prospects who didn't hire you. 15-20% convert.", tag: "Automation" },
              { title: "Practice Area Drip Campaign", desc: "Educational series for specific practice areas. Estate planning. Employment law. Family law.", tag: "Authority" },
              { title: "Case Outcome Announcements", desc: "Tasteful, bar-compliant announcements of notable results. Builds credibility across your list.", tag: "Social proof" },
              { title: "Seasonal/Event Campaigns", desc: "Holiday messages, community event invitations, and firm milestone announcements.", tag: "Brand" },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl border border-gray-200 p-5 hover:border-orange-200 hover:shadow-sm transition-all">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-heading font-bold text-gray-900 text-sm">{item.title}</h3>
                  <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full" style={{ background: O + "15", color: O }}>{item.tag}</span>
                </div>
                <p className="text-gray-600 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          8. US vs INDUSTRY
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-3 text-center">Why Law Firms Choose JurisPage for Email Marketing</h2>
          <p className="text-gray-500 text-center mb-10">Quick comparison of what you get.</p>

          <div className="rounded-xl border border-gray-200 overflow-hidden bg-white">
            <div className="grid grid-cols-3 text-xs font-bold uppercase tracking-widest">
              <div className="px-5 py-3 bg-gray-50 text-gray-500">Feature</div>
              <div className="px-5 py-3 text-center text-white" style={{ background: O }}>JurisPage</div>
              <div className="px-5 py-3 bg-gray-100 text-center text-gray-500">DIY / Generic Agency</div>
            </div>
            {[
              "State bar compliance review on every send",
              "Content written in your firm's voice",
              "Past client and referral list segmentation",
              "CRM integration and automation setup",
              "Monthly performance reporting",
              "100% legal industry focus",
              "No upfront setup fee",
            ].map((feature, i) => (
              <div key={feature} className={`grid grid-cols-3 text-sm ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                <div className="px-5 py-3 text-gray-700 font-medium">{feature}</div>
                <div className="px-5 py-3 text-center"><span className="text-lg" style={{ color: G }}>&#x2713;</span></div>
                <div className="px-5 py-3 text-center"><span className="text-lg text-red-400">&#x2717;</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          9. PRICING
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-3 text-center">Pricing That Makes the Math Easy</h2>
          <p className="text-gray-500 text-center mb-10">One referral case pays for years of email marketing. The ROI is not theoretical.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl bg-white border border-gray-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100">
                <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: O }}>Included in Launchpad</div>
                <div className="font-heading font-extrabold text-gray-900 text-2xl">Starting at $2,000<span className="text-base font-normal text-gray-400">/mo</span></div>
                <div className="text-xs text-gray-500 mt-1">Email marketing included with website, SEO, and GBP</div>
              </div>
              <div className="px-6 py-5 space-y-3 text-sm">
                {["Monthly newsletter campaigns", "List setup and segmentation", "Bar-compliant templates", "CRM integration", "Performance reporting", "No upfront setup fee. Costs spread across the 24-month engagement."].map((f) => (
                  <div key={f} className="flex items-start gap-2"><span style={{ color: G }}>&#x2713;</span> {f}</div>
                ))}
              </div>
              <div className="px-6 pb-6">
                <Link href="/launchpad/" className="block text-center px-6 py-3 rounded-full text-white font-bold text-sm no-underline" style={{ background: O }}>
                  See Launchpad Pricing
                </Link>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden" style={{ background: D }}>
              <div className="px-6 py-5 border-b border-gray-700">
                <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: O }}>Juris Digital</div>
                <div className="font-heading font-extrabold text-white text-2xl">$5,000 to $50,000+<span className="text-base font-normal text-gray-400">/mo</span></div>
                <div className="text-xs text-gray-400 mt-1">Advanced email strategy with full marketing suite</div>
              </div>
              <div className="px-6 py-5 space-y-3 text-sm text-gray-300">
                {["Everything in Launchpad, plus:", "Automated drip campaigns", "Referral partner nurture sequences", "Prospect re-engagement automation", "A/B testing and optimization", "Dedicated strategist"].map((f) => (
                  <div key={f} className="flex items-start gap-2"><span style={{ color: O }}>&#x2713;</span> {f}</div>
                ))}
              </div>
              <div className="px-6 pb-6">
                <Link href="/growth-assessment/" className="block text-center px-6 py-3 rounded-full font-bold text-sm no-underline border-2 border-white text-white hover:bg-white hover:text-gray-900 transition-colors">
                  Apply for a Strategy Session
                </Link>
              </div>
            </div>
          </div>
          <p className="text-center text-xs text-gray-400 mt-6">
            <Link href="/services/pricing/" className="no-underline hover:underline" style={{ color: O }}>See full pricing breakdown</Link> | You own your list | Cancel anytime
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          10. RELATED SERVICES
      ═══════════════════════════════════════════════════════ */}
      <section className="py-12 px-6 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Works best with</p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Law Firm SEO", href: "/law-firm-seo/" },
              { label: "Law Firm Content Writing", href: "/law-firm-content-writing/" },
              { label: "Law Firm Websites", href: "/law-firm-websites/" },
              { label: "Local SEO for Law Firms", href: "/local-seo-for-law-firms/" },
            ].map((link) => (
              <Link key={link.label} href={link.href} className="px-4 py-2 rounded-full border text-sm font-medium no-underline transition-all hover:bg-[#EE6C13] hover:text-white hover:border-[#EE6C13]" style={{ borderColor: O, color: O }}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQAccordion faqs={allFaqs} heading="Law Firm Email Marketing Questions Answered" />

      {/* CTA */}
      <CTASection
        heading="Your Contact List is Worth More Than You Think"
        subtext="One email. One referral. One case that pays for a year of marketing. Let's get started."
        primaryLabel="Get a Free Email Strategy Session"
        primaryHref="/contact/"
        secondaryLabel="See Transparent Pricing"
        secondaryHref="/services/pricing/"
      />
    </>
  );
}
