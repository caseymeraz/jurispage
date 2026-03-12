"use client";

interface PlanTimelineProps {
  days1to30: string[];
  days31to60: string[];
  days61to90: string[];
}

function TimelineColumn({
  label,
  items,
  accentOpacity,
}: {
  label: string;
  items: string[];
  accentOpacity: number;
}) {
  return (
    <div className="flex-1 min-w-0">
      <div
        className="rounded-xl p-5 h-full"
        style={{ background: `rgba(238,108,19,${accentOpacity})` }}
      >
        <h4
          className="font-heading font-extrabold text-sm uppercase tracking-widest mb-4"
          style={{ color: "#EE6C13" }}
        >
          {label}
        </h4>
        <ul className="space-y-2.5">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span
                className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-1.5"
                style={{ background: "#EE6C13" }}
              />
              <span className="text-gray-300 text-sm leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function PlanTimeline({
  days1to30,
  days31to60,
  days61to90,
}: PlanTimelineProps) {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: "#1a1a1a" }}>
      <div className="px-6 sm:px-8 py-8">
        <h3 className="font-heading font-extrabold text-white text-xl mb-6">
          Your 90-Day Plan
        </h3>

        <div className="flex flex-col sm:flex-row gap-4">
          <TimelineColumn
            label="Days 1-30"
            items={days1to30}
            accentOpacity={0.08}
          />
          <TimelineColumn
            label="Days 31-60"
            items={days31to60}
            accentOpacity={0.05}
          />
          <TimelineColumn
            label="Days 61-90"
            items={days61to90}
            accentOpacity={0.03}
          />
        </div>
      </div>
    </div>
  );
}
