"use client";
import { useState, useEffect } from "react";

type PortfolioItem = { name: string; image: string; practiceArea?: string };

export default function PortfolioShowcase({ items }: { items: PortfolioItem[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setActive((i) => (i + 1) % items.length);
        setVisible(true);
      }, 200);
    }, 4000);
    return () => clearInterval(id);
  }, [paused, items.length]);

  const handleSelect = (i: number) => {
    setVisible(false);
    setTimeout(() => {
      setActive(i);
      setVisible(true);
    }, 150);
  };

  return (
    <section
      className="py-20 px-6 bg-gray-950"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="font-heading font-extrabold text-white text-4xl mb-3">
            Law Firm Websites We&apos;ve Built
          </h2>
          <p className="text-gray-400 text-lg">
            Custom-designed, mobile-first, built to rank in Google.
          </p>
          <div className="w-16 h-1 mx-auto mt-4 rounded-full" style={{ background: "#EE6C13" }} />
        </div>

        {/* Featured browser window */}
        <div className="max-w-3xl mx-auto mb-8 rounded-xl overflow-hidden shadow-2xl border border-gray-800">
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-4 py-3 bg-gray-800 border-b border-gray-700">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
            <div className="ml-3 flex-1 bg-gray-700 rounded-md px-3 py-1 text-xs text-gray-400 truncate">
              {items[active].name.toLowerCase().replace(/\s+/g, "")}.com
            </div>
          </div>
          {/* Screenshot */}
          <div className="relative bg-gray-900" style={{ height: "420px" }}>
            <img
              src={items[active].image}
              alt={`${items[active].name} website design`}
              className="w-full h-full object-cover object-top"
              style={{ opacity: visible ? 1 : 0, transition: "opacity 0.2s ease" }}
            />
            {/* Bottom name overlay */}
            <div className="absolute bottom-0 left-0 right-0 px-5 py-3 bg-gradient-to-t from-black/80 to-transparent">
              <div className="font-heading font-bold text-white text-lg">{items[active].name}</div>
              {items[active].practiceArea && (
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ background: "#EE6C1333", color: "#EE6C13" }}
                >
                  {items[active].practiceArea}
                </span>
              )}
            </div>
          </div>
          {/* Progress bar */}
          <div className="h-1 bg-gray-800">
            <div
              className="h-full"
              style={{
                background: "#EE6C13",
                width: `${((active + 1) / items.length) * 100}%`,
                transition: "width 0.3s ease",
              }}
            />
          </div>
        </div>

        {/* Thumbnail row */}
        <div className="flex gap-3 justify-center flex-wrap">
          {items.map((item, i) => (
            <button
              key={item.name}
              onClick={() => handleSelect(i)}
              className={`group flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200 focus:outline-none
                ${i === active
                  ? "border-[#EE6C13] scale-105 shadow-lg shadow-orange-900/30"
                  : "border-gray-700 hover:border-gray-500 hover:scale-105"
                }`}
              style={{ width: "140px" }}
              aria-label={`View ${item.name}`}
            >
              {/* Mini browser chrome */}
              <div className="flex items-center gap-1 px-2 py-1.5 bg-gray-800">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              </div>
              <img
                src={item.image}
                alt={item.name}
                className="w-full object-cover object-top"
                style={{ height: "80px" }}
                loading="lazy"
              />
              <div
                className={`px-2 py-1.5 bg-gray-900 text-xs font-semibold truncate transition-colors ${
                  i === active ? "text-[#EE6C13]" : "text-gray-400 group-hover:text-gray-200"
                }`}
              >
                {item.name}
              </div>
            </button>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-10">
          <a
            href="https://www.jurispage.com/design-portfolio/"
            className="inline-flex items-center gap-2 text-sm font-semibold hover:underline"
            style={{ color: "#EE6C13" }}
          >
            View all portfolio examples →
          </a>
        </div>
      </div>
    </section>
  );
}
