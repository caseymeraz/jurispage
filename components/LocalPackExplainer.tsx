import Image from "next/image";

export default function LocalPackExplainer() {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <span
            className="inline-block text-xs font-heading font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
            style={{ background: "#EE6C1322", color: "#EE6C13" }}
          >
            The Google Map Pack
          </span>
          <h2 className="font-heading font-extrabold text-gray-900 text-3xl md:text-4xl mb-3">
            This Is Where Your Firm Needs to Be
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            When someone searches &ldquo;personal injury lawyer near me,&rdquo;
            the first thing they see is the map pack: three firms with ratings,
            a map, and a direct call button. Everything else is below the fold.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          {/* Screenshot */}
          <div className="lg:col-span-3 relative">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200">
              <Image
                src="/images/google-local-pack-example.png"
                alt="Google local pack search results for Los Angeles Personal Injury Lawyer showing map and top law firm listings with ratings and contact info"
                width={800}
                height={1000}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>

          {/* Callouts */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-[#FEF3EC] rounded-xl p-6 border border-orange-100">
              <p
                className="font-heading font-extrabold text-3xl mb-1"
                style={{ color: "#EE6C13" }}
              >
                44%
              </p>
              <p className="font-heading font-bold text-gray-900 text-sm mb-1">
                of all local clicks go here
              </p>
              <p className="text-gray-500 text-xs leading-relaxed">
                Nearly half of everyone searching for a lawyer in your city
                clicks one of these three results, before ever scrolling down.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#EE6C13"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  <polyline points="16 7 22 7 22 13" />
                </svg>
                <p className="font-heading font-bold text-gray-900 text-sm">
                  Above All Organic Results
                </p>
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                The map pack sits above the ten blue links, above most paid ads,
                and directly below the search bar where attention is highest.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#EE6C13"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                  <line x1="12" y1="18" x2="12.01" y2="18" />
                </svg>
                <p className="font-heading font-bold text-gray-900 text-sm">
                  One-Tap to Call on Mobile
                </p>
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                On mobile, the map pack includes a direct call button. A
                potential client can go from search to phone call without ever
                visiting your website.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#EE6C13"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <p className="font-heading font-bold text-gray-900 text-sm">
                  Reviews Build Trust Instantly
                </p>
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                Star ratings and review counts are visible right in the results.
                Firms with more reviews and higher ratings win the click, before
                anyone reads a single word on your website.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
