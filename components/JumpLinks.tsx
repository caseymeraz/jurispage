"use client";

interface JumpLink {
  id: string;
  label: string;
}

export default function JumpLinks({ links }: { links: JumpLink[] }) {
  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-3 overflow-x-auto" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        <div className="flex gap-2 min-w-max">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold no-underline transition-all border border-gray-200 text-gray-600 hover:text-white hover:border-[#EE6C13] hover:bg-[#EE6C13]"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
