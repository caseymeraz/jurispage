"use client";

import { useState } from "react";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="absolute top-3 right-3 px-2.5 py-1 rounded text-xs font-medium bg-white/10 text-gray-400 hover:text-white hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100 z-10 border border-white/10"
      aria-label="Copy code"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}
