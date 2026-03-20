"use client";

import { useEffect, useRef, useState } from "react";

interface Stat {
  value: string;
  label: string;
}

interface CountUpStatsProps {
  stats: Stat[];
}

/** Parse a stat value like "113+", "68%", "$453", "0" into parts */
function parseStat(value: string): {
  prefix: string;
  number: number;
  suffix: string;
} {
  const match = value.match(/^([^0-9]*)(\d+)(.*)$/);
  if (!match) return { prefix: "", number: 0, suffix: value };
  return {
    prefix: match[1],
    number: parseInt(match[2], 10),
    suffix: match[3],
  };
}

function useCountUp(target: number, duration: number, trigger: boolean): number {
  const [current, setCurrent] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!trigger) return;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic for a fast start that slows down
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration, trigger]);

  return current;
}

function CountUpStat({ value, label }: Stat) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const parsed = parseStat(value);
  const count = useCountUp(parsed.number, 1200, visible);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-center">
      <div className="font-heading font-extrabold text-white text-3xl md:text-4xl leading-none mb-1">
        {parsed.prefix}
        {visible ? count : 0}
        {parsed.suffix}
      </div>
      <div className="text-orange-100 text-sm leading-snug">{label}</div>
    </div>
  );
}

export default function CountUpStats({ stats }: CountUpStatsProps) {
  return (
    <section className="py-10 px-6 bg-[#EE6C13]">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <CountUpStat key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
