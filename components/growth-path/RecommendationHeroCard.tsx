"use client";

interface RecommendationHeroCardProps {
  pathName: string;
  explanation: string;
  brandRoute: string;
}

export default function RecommendationHeroCard({
  pathName,
  explanation,
  brandRoute,
}: RecommendationHeroCardProps) {
  const isJurisDigital = brandRoute === "juris_digital";

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #1a1a1a 0%, #111 100%)",
        borderLeft: "4px solid #EE6C13",
      }}
    >
      <div className="px-6 sm:px-8 py-10">
        {/* Label */}
        <p
          className="text-xs font-heading font-bold uppercase tracking-widest mb-3"
          style={{ color: "#EE6C13" }}
        >
          Recommended path
        </p>

        {/* Path name */}
        <h2 className="font-heading font-extrabold text-white text-3xl sm:text-4xl leading-tight mb-4">
          {pathName}
        </h2>

        {/* Explanation */}
        <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-2xl">
          {explanation}
        </p>

        {/* Brand badge */}
        {isJurisDigital && (
          <div className="mt-8 flex items-center gap-3">
            <div
              className="rounded-xl px-5 py-3 flex items-center gap-3"
              style={{ background: "rgba(238,108,19,0.1)" }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center font-heading font-extrabold text-sm text-white"
                style={{ background: "#EE6C13" }}
              >
                JD
              </div>
              <div>
                <p className="text-white text-sm font-heading font-bold">
                  <a href="https://jurisdigital.com/services/ascend/" target="_blank" rel="noopener noreferrer" className="text-white no-underline hover:underline">Juris Digital</a>
                </p>
                <p className="text-gray-400 text-xs">
                  Delivered by our parent company
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
