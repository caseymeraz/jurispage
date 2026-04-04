"use client";

import { useState, type ReactNode } from "react";

function extractText(children: ReactNode): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(extractText).join("");
  if (children && typeof children === "object" && "props" in children) {
    return extractText((children as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

export default function ChecklistItem({ children }: { children?: ReactNode }) {
  const [checked, setChecked] = useState(false);
  const text = extractText(children);
  const isCheckbox = text.startsWith("[ ] ") || text.startsWith("[x] ");

  if (!isCheckbox) {
    return <li>{children}</li>;
  }

  const label = text.replace(/^\[[ x]\] /, "");

  return (
    <li className="list-none -ml-6 flex items-start gap-3 py-1.5">
      <button
        onClick={() => setChecked(!checked)}
        className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded border-2 transition-all flex items-center justify-center ${
          checked
            ? "bg-[#EE6C13] border-[#EE6C13]"
            : "border-gray-300 hover:border-[#EE6C13]"
        }`}
        aria-label={`Mark "${label}" as ${checked ? "incomplete" : "complete"}`}
      >
        {checked && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
      <span className={`${checked ? "line-through text-gray-400" : "text-gray-700"} transition-colors`}>
        {label}
      </span>
    </li>
  );
}
