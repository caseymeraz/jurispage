"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setVisible(true);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (dismissed) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 lg:hidden transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div
        className="px-4 py-3 flex items-center justify-between gap-3"
        style={{ background: "linear-gradient(135deg, #EE6C13, #982A0B)" }}
      >
        <Link
          href="/see-my-market-gap"
          className="flex-1 text-center font-heading font-bold text-white text-sm py-2.5 px-4 rounded-[40px] no-underline transition-opacity hover:opacity-90"
          style={{
            background: "rgba(255,255,255,0.2)",
            backdropFilter: "blur(4px)",
          }}
        >
          See My Market Gap
        </Link>
        <button
          onClick={() => setDismissed(true)}
          className="flex-shrink-0 p-1.5 text-white/70 hover:text-white transition-colors"
          aria-label="Dismiss"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M13.5 4.5L4.5 13.5M4.5 4.5l9 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
