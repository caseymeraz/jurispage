"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function StickyCTA() {
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
      className={`fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ borderTop: "3px solid #EE6C13", background: "#1a1a1a" }}
    >
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
        <p className="text-white text-sm font-heading font-semibold hidden sm:block">
          Ready to dominate the map pack?
        </p>
        <div className="flex items-center gap-3 flex-1 justify-end">
          <Link
            href="/contact/"
            className="font-heading font-bold text-sm text-white px-5 py-2.5 rounded-[40px] no-underline transition-colors whitespace-nowrap"
            style={{ background: "#EE6C13" }}
            onMouseOver={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#d45e0a"; }}
            onMouseOut={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#EE6C13"; }}
          >
            Get My Free Strategy
          </Link>
          <button
            onClick={() => setDismissed(true)}
            className="text-gray-400 hover:text-white transition-colors flex-shrink-0 p-1"
            aria-label="Dismiss"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
