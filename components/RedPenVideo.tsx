"use client";

import { useRef, useState } from "react";
import Link from "next/link";

export default function RedPenVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="py-16 px-6 bg-[#1a1a1a]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="font-heading font-extrabold text-white text-3xl md:text-4xl mb-3">
            See What Your Competitors Don&apos;t Want You to Know
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            We&apos;ll show you exactly where you&apos;re losing cases to competitors, and how to take them back.
          </p>
        </div>

        <Link
          href="/see-my-market-gap"
          className="group relative block rounded-2xl overflow-hidden no-underline"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Video */}
          <video
            ref={videoRef}
            src="/videos/jurispage-red-pen.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full rounded-2xl transition-transform duration-500 group-hover:scale-[1.02]"
          />

          {/* Hover overlay */}
          <div
            className={`absolute inset-0 rounded-2xl flex items-center justify-center transition-all duration-300 ${
              isHovered ? "bg-black/40" : "bg-black/0"
            }`}
          >
            <div
              className={`flex items-center gap-3 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 ${
                isHovered
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2"
              }`}
              style={{ background: "#EE6C13" }}
            >
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
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
              See Your Free Market Gap Report
            </div>
          </div>

          {/* Persistent subtle CTA at bottom */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 rounded-b-2xl">
            <div className="flex items-center justify-between">
              <p className="text-white font-heading font-bold text-sm">
                Free Market Gap Analysis for Your Firm
              </p>
              <span
                className="text-white text-xs font-semibold px-4 py-2 rounded-full"
                style={{ background: "#EE6C13" }}
              >
                Get Your Report &rarr;
              </span>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
