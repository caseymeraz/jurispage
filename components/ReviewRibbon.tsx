const reviews = [
  { quote: "JurisPage helped us scale our PI firm. ROI was clear within 90 days.", author: "Mark T.", city: "Minneapolis" },
  { quote: "Finally an agency that gives you straight answers. No runaround on cost.", author: "Sarah K.", city: "Denver" },
  { quote: "Ranking page 1 for criminal defense in Minneapolis within 4 months.", author: "David L.", city: "Minneapolis" },
  { quote: "Month-to-month contract sealed it for us. No other agency would do that.", author: "Rachel M.", city: "Chicago" },
  { quote: "Leads are up 40% since we started. Best marketing decision we've made.", author: "James O.", city: "Phoenix" },
];

export default function ReviewRibbon() {
  return (
    <section className="bg-white border-t border-b border-gray-100 py-5 overflow-hidden">
      <div className="animate-marquee">
        {[...reviews, ...reviews].map((review, i) => (
          <div
            key={i}
            className="flex-shrink-0 mx-3 bg-gray-50 rounded-xl px-5 py-4 border border-gray-100 flex flex-col gap-1"
            style={{ minWidth: "300px", maxWidth: "320px" }}
          >
            <div className="text-yellow-400 text-sm leading-none">★★★★★</div>
            <p className="text-gray-700 text-sm leading-snug">&ldquo;{review.quote}&rdquo;</p>
            <p className="text-gray-500 text-xs font-semibold">— {review.author}, {review.city}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
