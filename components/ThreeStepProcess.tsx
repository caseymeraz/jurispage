const steps = [
  {
    number: "01",
    title: "Tell Us Where You Want to Grow",
    description:
      "Book a free strategy call. Tell us your practice areas, your target markets, and how many cases you want to sign per month. No pitch deck — just a conversation about your goals.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "We Build Your Growth Blueprint",
    description:
      "Within 7 days, you receive a custom plan built on real data: your keyword gaps, your competitors' weaknesses, and the exact strategy to turn organic search into your most predictable source of signed cases.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Sign More Cases, Predictably",
    description:
      "We execute the plan, report on cases generated — not vanity metrics — and optimize every month. You get a growing pipeline of qualified consultations that compounds over time, not a bill for clicks that stop the moment you stop paying.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
  },
];

export default function ThreeStepProcess() {
  return (
    <section className="py-20 px-6 bg-[#FEF3EC]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <span
            className="inline-block text-xs font-heading font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
            style={{ background: "#EE6C1333", color: "#EE6C13" }}
          >
            How It Works
          </span>
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl md:text-4xl mb-3">
            From First Call to Signed Cases in Three Steps
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            No long onboarding. No months of guesswork. A clear path from where
            you are to a pipeline you can count on.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div
            className="hidden md:block absolute top-16 left-[calc(16.67%+14px)] right-[calc(16.67%+14px)] h-0.5"
            style={{ background: "#EE6C1333" }}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {steps.map((step, i) => (
              <div key={step.number} className="relative text-center">
                {/* Number circle */}
                <div className="relative z-10 mx-auto mb-6">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto text-white shadow-lg"
                    style={{
                      background:
                        i === 2
                          ? "linear-gradient(135deg, #EE6C13, #982A0B)"
                          : "#EE6C13",
                      boxShadow: "0 4px 14px rgba(238, 108, 19, 0.3)",
                    }}
                  >
                    {step.icon}
                  </div>
                </div>

                {/* Step number */}
                <p
                  className="font-heading font-extrabold text-sm mb-2 tracking-wider"
                  style={{ color: "#EE6C13" }}
                >
                  STEP {step.number}
                </p>

                {/* Title */}
                <h3 className="font-heading font-extrabold text-gray-900 text-xl mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>

                {/* Arrow between steps (mobile) */}
                {i < 2 && (
                  <div className="md:hidden flex justify-center my-4">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#EE6C13"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="opacity-40"
                      aria-hidden="true"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <polyline points="19 12 12 19 5 12" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="/contact/"
            className="inline-block text-white font-bold py-3.5 px-8 rounded-xl text-sm no-underline transition-colors bg-[#EE6C13] hover:bg-[#982A0B]"
          >
            Book Your Free Strategy Call
          </a>
          <p className="text-gray-400 text-xs mt-3">
            No contracts. No commitment. We respond within one business day.
          </p>
        </div>
      </div>
    </section>
  );
}
