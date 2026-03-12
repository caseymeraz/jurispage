"use client";

export default function MarketAvailabilityNote() {
  return (
    <div
      className="rounded-2xl px-6 sm:px-8 py-6"
      style={{
        background: "rgba(238,108,19,0.06)",
        border: "1px solid rgba(238,108,19,0.15)",
      }}
    >
      <p className="text-gray-300 text-sm leading-relaxed">
        Your market appears open based on the public information we can see today.
        Before we confirm a next step, we do a final internal client and conflict
        check on our side.
      </p>
    </div>
  );
}
