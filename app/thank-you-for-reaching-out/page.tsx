import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Thank You for Reaching Out | JurisPage",
  description:
    "We received your message and will be in touch within 24 hours.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="font-heading font-extrabold text-gray-900 text-4xl mb-4">
          Thank You for Reaching Out
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed mb-10">
          We received your message and will be in touch within the next 24
          hours. In the meantime, if you'd like to skip the wait, you can book a
          time directly with Armon.
        </p>

        <div className="bg-gray-50 rounded-2xl p-8 inline-block">
          <Image
            src="https://jurisdigital.com/wp-content/uploads/ArmonHatcher.jpg.webp"
            alt="Armon Hatcher"
            width={120}
            height={120}
            className="rounded-full mx-auto mb-4 object-cover"
          />
          <p className="font-heading font-bold text-gray-900 text-xl mb-1">
            Armon Hatcher
          </p>
          <p className="text-gray-500 text-sm mb-5">
            Growth Strategist, JurisPage
          </p>
          <a
            href="https://meetings.hubspot.com/armon-hatcher/proposal-review"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-8 py-3 transition-colors"
          >
            Book a Time with Armon
          </a>
        </div>
      </div>
    </section>
  );
}
