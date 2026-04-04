"use client";

import { useState, type ReactNode, Children, isValidElement } from "react";

function extractText(children: ReactNode): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(extractText).join("");
  if (children && typeof children === "object" && "props" in children) {
    return extractText((children as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

function hasCheckbox(children: ReactNode): boolean {
  const text = extractText(children);
  if (text.startsWith("[ ] ") || text.startsWith("[x] ")) return true;

  // remark-gfm renders checkboxes as <input type="checkbox"> inside li
  const arr = Children.toArray(children);
  for (const child of arr) {
    if (isValidElement(child) && child.type === "input") {
      const props = child.props as { type?: string };
      if (props.type === "checkbox") return true;
    }
  }
  return false;
}

function stripCheckbox(children: ReactNode): ReactNode {
  const text = extractText(children);
  if (text.startsWith("[ ] ")) return text.slice(4);
  if (text.startsWith("[x] ")) return text.slice(4);

  // Remove the <input> element inserted by remark-gfm
  const arr = Children.toArray(children);
  const filtered: ReactNode[] = [];
  for (const child of arr) {
    if (isValidElement(child) && child.type === "input") continue;
    filtered.push(child);
  }
  return filtered;
}

export default function ChecklistItem({ children, className }: { children?: ReactNode; className?: string }) {
  const [checked, setChecked] = useState(false);
  const isCheckbox = hasCheckbox(children);

  if (!isCheckbox) {
    return <li className={className}>{children}</li>;
  }

  const label = stripCheckbox(children);

  return (
    <li className="!list-none !pl-0 flex items-start gap-3 !my-1.5" style={{ marginLeft: "-1.5rem" }}>
      <button
        onClick={() => setChecked(!checked)}
        className={`mt-1 flex-shrink-0 w-5 h-5 rounded border-2 transition-all flex items-center justify-center ${
          checked
            ? "bg-[#EE6C13] border-[#EE6C13]"
            : "border-gray-300 hover:border-[#EE6C13]"
        }`}
        aria-label={`Mark as ${checked ? "incomplete" : "complete"}`}
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
