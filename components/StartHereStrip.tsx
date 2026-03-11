import Link from "next/link";

const cards = [
  {
    title: "See My Market Gap",
    description:
      "Find out exactly where your firm is losing cases to competitors. Free, personalized, built for law firms only.",
    href: "/see-my-market-gap",
    cta: "See My Market Gap",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <polyline points="11 8 11 11 14 11" />
        <path d="M7 14l2-3 2 2 3-4" />
      </svg>
    ),
  },
  {
    title: "Get My Instant Quote",
    description:
      "Transparent pricing for your firm's exact needs. No sales call required, no fine print.",
    href: "/launchpad",
    cta: "Get My Quote",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <line x1="8" y1="6" x2="16" y2="6" />
        <line x1="8" y1="10" x2="16" y2="10" />
        <line x1="8" y1="14" x2="12" y2="14" />
        <path d="M14 17l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "See What Intake Delays Cost Me",
    description:
      "78% of clients hire the first firm that responds. Find out what slow follow-up is costing you.",
    href: "/secret-shop",
    cta: "Run the Secret Shop",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
        <path d="M17 17l2 2" />
        <rect x="18" y="18" width="4" height="5" rx="1" transform="rotate(-45 18 18)" />
      </svg>
    ),
  },
];

export default function StartHereStrip() {
  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-gray-900 mb-3">
            Start Here
          </h2>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            Three free tools to see exactly where your firm stands.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group bg-gray-50 rounded-xl border border-gray-100 p-8 no-underline transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-gray-200"
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white mb-5"
                style={{ background: "#EE6C13" }}
              >
                {card.icon}
              </div>

              {/* Title */}
              <h3 className="font-heading font-bold text-gray-900 text-xl mb-3">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed mb-5">
                {card.description}
              </p>

              {/* CTA */}
              <span
                className="font-heading font-bold text-sm inline-flex items-center gap-1 transition-colors"
                style={{ color: "#EE6C13" }}
              >
                {card.cta}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
