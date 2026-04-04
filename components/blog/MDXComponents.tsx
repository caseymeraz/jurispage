import type { ReactNode, DetailedHTMLProps, HTMLAttributes, TableHTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from "react";
import CopyButton from "./CopyButton";
import ChecklistItem from "./ChecklistItem";

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

function H2({ children, ...props }: HTMLAttributes<HTMLHeadingElement> & { children?: ReactNode }) {
  const text = extractText(children);
  const id = slugify(text);
  return (
    <h2 id={id} className="group scroll-mt-24" {...props}>
      <a href={`#${id}`} className="no-underline text-inherit hover:text-inherit">
        {children}
        <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 text-[#EE6C13]">#</span>
      </a>
    </h2>
  );
}

function H3({ children, ...props }: HTMLAttributes<HTMLHeadingElement> & { children?: ReactNode }) {
  const text = extractText(children);
  const id = slugify(text);
  return (
    <h3 id={id} className="group scroll-mt-24" {...props}>
      <a href={`#${id}`} className="no-underline text-inherit hover:text-inherit">
        {children}
        <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 text-[#EE6C13]">#</span>
      </a>
    </h3>
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

function Th({ style, ...props }: DetailedHTMLProps<ThHTMLAttributes<HTMLTableCellElement>, HTMLTableCellElement>) {
  return <th className="px-4 py-3 font-semibold text-xs uppercase tracking-wider whitespace-nowrap" style={{ color: "white", ...style }} {...props} />;
}

function Td(props: DetailedHTMLProps<TdHTMLAttributes<HTMLTableCellElement>, HTMLTableCellElement>) {
  return <td className="px-4 py-3 border-t border-gray-100" {...props} />;
}

function Tr(props: DetailedHTMLProps<HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>) {
  return <tr className="even:bg-gray-50/50 hover:bg-orange-50/30 transition-colors" {...props} />;
}

/* ── Code block with copy button ───────────────────────────────────── */

function CodeBlock({ children, ...props }: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement> & { children?: ReactNode }) {
  const code = extractText(children);

  return (
    <div className="relative group my-6">
      <CopyButton text={code} />
      <pre className="rounded-lg !bg-gray-900 !text-gray-100 p-5 overflow-x-auto text-sm leading-relaxed" {...props}>
        {children}
      </pre>
    </div>
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mdxComponents: Record<string, React.ComponentType<any>> = {
  h2: H2,
  h3: H3,
  table: Table,
  thead: Thead,
  th: Th,
  td: Td,
  tr: Tr,
  pre: CodeBlock,
  blockquote: Callout,
  li: ChecklistItem,
};
