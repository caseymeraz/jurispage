export default function MarketGapPreview() {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.08)" }}>
      {/* Header label */}
      <div className="px-6 pt-5 pb-3 flex items-center gap-2">
        <div
          className="w-2 h-2 rounded-full"
          style={{ background: "#EE6C13" }}
        />
        <span className="text-gray-500 text-xs font-heading font-bold uppercase tracking-widest">
          Sample Report Preview
        </span>
      </div>

      {/* 2x2 Grid of cards */}
      <div className="px-6 pb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Monthly Demand */}
        <div className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="h-1 w-10 rounded-full mb-4" style={{ background: "#EE6C13" }} />
          <p className="text-gray-400 text-xs font-heading font-bold uppercase tracking-widest mb-2">
            Monthly Demand
          </p>
          <p className="font-heading font-extrabold text-white text-2xl mb-1">
            3,240<span className="text-gray-500 text-base font-bold">/mo</span>
          </p>
          <p className="text-gray-500 text-xs">searches in your market</p>
        </div>

        {/* Firms Winning Now */}
        <div className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="h-1 w-10 rounded-full mb-4" style={{ background: "#22c55e" }} />
          <p className="text-gray-400 text-xs font-heading font-bold uppercase tracking-widest mb-2">
            Firms Winning Now
          </p>
          <div className="space-y-1.5">
            <p className="text-white text-sm font-semibold">
              Firm A{" "}
              <span className="text-gray-400 text-xs font-normal">
                4.8<span className="text-yellow-400">&#9733;</span> &middot; 127 reviews
              </span>
            </p>
            <p className="text-white text-sm font-semibold">
              Firm B{" "}
              <span className="text-gray-400 text-xs font-normal">
                4.6<span className="text-yellow-400">&#9733;</span> &middot; 89 reviews
              </span>
            </p>
            <p className="text-white text-sm font-semibold">
              Firm C{" "}
              <span className="text-gray-400 text-xs font-normal">
                4.5<span className="text-yellow-400">&#9733;</span> &middot; 64 reviews
              </span>
            </p>
          </div>
        </div>

        {/* Your Visibility */}
        <div className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="h-1 w-10 rounded-full mb-4" style={{ background: "#f59e0b" }} />
          <p className="text-gray-400 text-xs font-heading font-bold uppercase tracking-widest mb-2">
            Your Visibility
          </p>
          <p className="font-heading font-extrabold text-white text-2xl mb-2">
            12<span className="text-gray-500 text-base font-bold">/100</span>
          </p>
          {/* Bar indicator */}
          <div className="w-full h-2 rounded-full bg-gray-700">
            <div
              className="h-2 rounded-full"
              style={{ width: "12%", background: "#f59e0b" }}
            />
          </div>
        </div>

        {/* Biggest Gap */}
        <div className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="h-1 w-10 rounded-full mb-4" style={{ background: "#ef4444" }} />
          <p className="text-gray-400 text-xs font-heading font-bold uppercase tracking-widest mb-2">
            Biggest Gap
          </p>
          <p className="font-heading font-bold text-white text-lg leading-snug">
            Reviews + local authority
          </p>
        </div>
      </div>
    </div>
  );
}
