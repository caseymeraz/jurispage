"use client";

import { useState, useEffect } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-80px 0px -75% 0px", threshold: 0 }
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [items]);

  return (
    <>
      {/* Mobile: collapsible */}
      <div className="lg:hidden my-8">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between gap-3 px-5 py-4 bg-gray-50 rounded-lg border border-gray-200 text-left"
        >
          <div className="flex items-center gap-2.5">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0 text-[#EE6C13]">
              <path d="M2.25 4.5H15.75M2.25 9H12M2.25 13.5H15.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="font-heading font-semibold text-sm text-gray-900">Table of Contents</span>
          </div>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className={`transition-transform text-gray-400 ${isOpen ? "rotate-180" : ""}`}
          >
            <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {isOpen && (
          <nav className="mt-1 px-5 py-4 bg-gray-50 rounded-lg border border-gray-200">
            <ul className="space-y-2">
              {items.map((item) => (
                <li key={item.id} style={{ paddingLeft: item.level === 3 ? 16 : 0 }}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setIsOpen(false)}
                    className={`block text-sm no-underline transition-colors py-0.5 ${
                      activeId === item.id
                        ? "text-[#EE6C13] font-semibold"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {/* Desktop: sticky sidebar */}
      <aside className="hidden lg:block sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto w-56 flex-shrink-0 pr-4">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-[#EE6C13]">
            <path d="M1.75 3.5H12.25M1.75 7H9.5M1.75 10.5H12.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          On this page
        </p>
        <nav>
          <ul className="space-y-1 border-l border-gray-200">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`block text-[13px] no-underline transition-all py-1 border-l-2 -ml-px ${
                    item.level === 3 ? "pl-6" : "pl-4"
                  } ${
                    activeId === item.id
                      ? "border-[#EE6C13] text-[#EE6C13] font-semibold"
                      : "border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300"
                  }`}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
