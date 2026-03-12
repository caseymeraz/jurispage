"use client";

interface SourceConfidencePillProps {
  label: string;
}

export default function SourceConfidencePill({ label }: SourceConfidencePillProps) {
  const isConfirmed = label === "Confirmed in your accounts";
  const isConnected = label === "Connected account data";

  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full"
      style={{
        background: isConfirmed
          ? "rgba(34,197,94,0.15)"
          : isConnected
            ? "rgba(59,130,246,0.15)"
            : "rgba(255,255,255,0.1)",
        color: isConfirmed
          ? "#22c55e"
          : isConnected
            ? "#60a5fa"
            : "rgba(255,255,255,0.6)",
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{
          background: isConfirmed
            ? "#22c55e"
            : isConnected
              ? "#60a5fa"
              : "rgba(255,255,255,0.4)",
        }}
      />
      {label}
    </span>
  );
}
