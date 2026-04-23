import type { Metadata } from "next";
import Link from "next/link";
import CTASection from "@/components/CTASection";
import StartHereStrip from "@/components/StartHereStrip";
import YouTubeFacade from "@/components/YouTubeFacade";

export const metadata: Metadata = {
  title: "JurisPage | Now Backed by Juris Digital",
  description:
    "In February 2026, JurisPage joined the Juris Digital family. Same legal-only focus, deeper research, stronger execution, and more clarity on what's working.",
  alternates: { canonical: "https://jurispage.com/jurispage-now-backed-by-juris-digital/" },
  openGraph: {
    title: "JurisPage | Now Backed by Juris Digital",
    description:
      "Same legal-only focus. Deeper research. Stronger execution. More clarity on what's working and what's not.",
    type: "article",
    url: "https://jurispage.com/jurispage-now-backed-by-juris-digital/",
  },
  twitter: {
    card: "summary_large_image",
    title: "JurisPage | Now Backed by Juris Digital",
    description:
      "Same legal-only focus. Deeper research. Stronger execution. More clarity on what's working and what's not.",
  },
};

const changes = [
  {
    title: "Deeper bench",
    description:
      "Access to the combined Juris Digital + JurisPage research and strategy team.",
  },
  {
    title: "Clearer path",
    description:
      "Market gap analysis and diagnostic tools that show you exactly where you stand before any pitch.",
  },
  {
    title: "Stronger execution",
    description:
      "The same playbook that's grown 113+ law firms, now with more resources behind it.",
  },
  {
    title: "Same mindset",
    description:
      "Transparent pricing. No upfront setup fee. Territory exclusivity. Nothing changes about how we work.",
  },
];

const standOutReasons = [
  {
    title: "We only do legal",
    description:
      "Every person on the team lives in legal marketing. No e-commerce, no restaurants, no side projects.",
  },
  {
    title: "Pricing on the website",
    description:
      "Competitors make you sit through a 45-minute call before telling you what anything costs. We publish our pricing.",
  },
  {
    title: "No upfront setup fee",
    description:
      "We spread costs across the 24-month Launchpad engagement so small and startup firms can afford the work without a massive day-one check.",
  },
];

const testimonials = [
  {
    name: "Michael Oykhman",
    firm: "Oykhman Criminal Defence",
    quote: "My business has grown 10-fold.",
  },
  {
    name: "Cory Wilson",
    firm: "Wilson Criminal Defence",
    quote: "I'm closing more high-value clients than ever.",
  },
  {
    name: "Williams",
    firm: "",
    quote: "Finally, an agency that understands the legal niche.",
  },
];

export default function JurispageNowBackedPage() {
  return (
    <>
      {/* ───────── 1. Hero ───────── */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span
            className="inline-block font-heading text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6"
            style={{ background: "#FEF3EC", color: "#EE6C13" }}
          >
            NEW CHAPTER
          </span>

          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-gray-900 mb-6 leading-tight">
            More firepower for law firms that want growth without agency fluff
          </h1>

          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            In February 2026, JurisPage joined the <a href="https://jurisdigital.com" target="_blank" rel="noopener noreferrer" className="text-gray-900 font-semibold underline hover:no-underline">Juris Digital</a> family. Same
            legal-only focus. Deeper research. Stronger execution. More clarity
            on what&apos;s working and what&apos;s not.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/see-my-market-gap"
              className="inline-block font-heading font-bold text-base text-white px-8 py-4 rounded-[40px] no-underline transition-colors"
              style={{ background: "#EE6C13" }}
            >
              See My Market Gap
            </Link>
            <Link
              href="/services/pricing"
              className="inline-block font-heading font-bold text-base px-8 py-4 rounded-[40px] no-underline border-2 transition-colors"
              style={{
                borderColor: "#EE6C13",
                color: "#EE6C13",
              }}
            >
              See Our Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* ───────── 2. What Changed ───────── */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-gray-900 mb-12 text-center">
            What changed for your firm
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {changes.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-xl border border-gray-100 p-8"
              >
                <div
                  className="h-1 w-10 rounded-full mb-5"
                  style={{ background: "#EE6C13" }}
                />
                <h3 className="font-heading font-bold text-gray-900 text-xl mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 3. Start Here ───────── */}
      <StartHereStrip />

      {/* ───────── 4. Why We Stand Out ───────── */}
      <section className="py-20 px-6" style={{ background: "#1a1a1a" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white mb-12 text-center">
            Why we stand out
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {standOutReasons.map((item) => (
              <div key={item.title}>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-4"
                  style={{ background: "rgba(238,108,19,0.2)" }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#EE6C13"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-white text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 5. Proof / Testimonials ───────── */}
      <section className="py-20 px-6" style={{ background: "#FEF3EC" }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-gray-900 mb-12 text-center">
            What our clients say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="#EE6C13"
                  className="mb-4 opacity-30"
                  aria-hidden="true"
                >
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                </svg>
                <p className="text-gray-800 text-base font-medium leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="font-heading font-bold text-gray-900 text-sm">
                    {t.name}
                  </p>
                  {t.firm && (
                    <p className="text-gray-500 text-xs">{t.firm}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 6. Founder Video ───────── */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-gray-900 mb-8 text-center">
            A message from our CEO
          </h2>
          <YouTubeFacade
            videoId="T_7--aGpB54"
            title="Casey Meraz on the JurisPage acquisition"
          />
        </div>
      </section>

      {/* ───────── 7. Final CTA ───────── */}
      <CTASection
        heading="Ready to see where you stand?"
        subtext="Three free tools. No obligation. Built for law firms only."
        primaryLabel="See My Market Gap"
        primaryHref="/see-my-market-gap"
        secondaryLabel="See Our Pricing"
        secondaryHref="/services/pricing"
      />
    </>
  );
}
