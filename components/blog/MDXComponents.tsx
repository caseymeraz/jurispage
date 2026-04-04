"use client";

import { useState, type ReactNode, type DetailedHTMLProps, type HTMLAttributes, type TableHTMLAttributes, type TdHTMLAttributes, type ThHTMLAttributes } from "react";

/* ── Heading with anchor link ──────────────────────────────────────── */

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]*>/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function extractText(children: ReactNode): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(extractText).join("");
  if (children && typeof children === "object" && "props" in children) {
    return extractText((children as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

function AnchorHeading({
  as: Tag,
  children,
  ...props
}: { as: "h2" | "h3"; children?: ReactNode } & HTMLAttributes<HTMLHeadingElement>) {
  const text = extractText(children);
  const id = slugify(text);
  return (
    <Tag id={id} className="group scroll-mt-24" {...props}>
      <a href={`#${id}`} className="no-underline text-inherit hover:text-inherit">
        {children}
        <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 text-[#EE6C13]">#</span>
      </a>
    </Tag>
  );
}

/* ── Styled table ──────────────────────────────────────────────────── */

function Table(props: DetailedHTMLProps<TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>) {
  return (
    <div className="my-8 overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="w-full text-sm border-collapse" {...props} />
    </div>
  );
}

function Thead(props: DetailedHTMLProps<HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>) {
  return <thead className="bg-gray-900 text-white text-left" {...props} />;
}

function Th(props: DetailedHTMLProps<ThHTMLAttributes<HTMLTableCellElement>, HTMLTableCellElement>) {
  return <th className="px-4 py-3 font-semibold text-xs uppercase tracking-wider whitespace-nowrap" {...props} />;
}

function Td(props: DetailedHTMLProps<TdHTMLAttributes<HTMLTableCellElement>, HTMLTableCellElement>) {
  return <td className="px-4 py-3 border-t border-gray-100" {...props} />;
}

function Tr(props: DetailedHTMLProps<HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>) {
  return <tr className="even:bg-gray-50/50 hover:bg-orange-50/30 transition-colors" {...props} />;
}

/* ── Code block with copy button ───────────────────────────────────── */

function CodeBlock({ children, ...props }: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>) {
  const [copied, setCopied] = useState(false);

  const code = extractText(children);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-6">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 px-2.5 py-1 rounded text-xs font-medium bg-white/10 text-gray-400 hover:text-white hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100 z-10 border border-white/10"
        aria-label="Copy code"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
      <pre className="rounded-lg !bg-gray-900 !text-gray-100 p-5 overflow-x-auto text-sm leading-relaxed" {...props}>
        {children}
      </pre>
    </div>
  );
}

/* ── Interactive checklist ─────────────────────────────────────────── */

function ChecklistItem({ children }: { children?: ReactNode }) {
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

/* ── Blockquote / callout ──────────────────────────────────────────── */

function Callout(props: DetailedHTMLProps<HTMLAttributes<HTMLQuoteElement>, HTMLQuoteElement>) {
  return (
    <blockquote
      className="my-8 rounded-lg border-l-4 border-[#EE6C13] bg-orange-50/50 px-6 py-5 not-italic [&>p]:m-0"
      {...props}
    />
  );
}

/* ── Export all components ─────────────────────────────────────────── */

export const mdxComponents = {
  h2: (props: HTMLAttributes<HTMLHeadingElement>) => <AnchorHeading as="h2" {...props} />,
  h3: (props: HTMLAttributes<HTMLHeadingElement>) => <AnchorHeading as="h3" {...props} />,
  table: Table,
  thead: Thead,
  th: Th,
  td: Td,
  tr: Tr,
  pre: CodeBlock,
  blockquote: Callout,
  li: ChecklistItem,
};
