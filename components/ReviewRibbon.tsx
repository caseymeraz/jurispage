const reviews = [
  {
    quote: "JurisPage is a clear winner for law firms looking to build a fresh, clean, professional website. What sold me was their professionalism and command of web design.",
    author: "Yasin A.",
  },
  {
    quote: "These guys are extremely professional, easy to work with and great at what they do.",
    author: "Pat M.",
  },
  {
    quote: "They did a great job of building our website for us in a timely fashion. We were assigned a client manager who went above and beyond to help us. Many thanks to this company.",
    author: "Cynthia R.",
  },
  {
    quote: "Working with their team was a great experience. They made building our website seem simple, were very responsive to my requests, and had the site up and running in no time.",
    author: "Joseph C.",
  },
  {
    quote: "They put together a great website for my law firm on a reasonable budget with a tight time frame. Easy to work with and they really understood my vision.",
    author: "Christina D.",
  },
  {
    quote: "The team is very responsive, does excellent design work, and is very helpful! I would highly recommend.",
    author: "Gwendolyn B.",
  },
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
            <p className="text-gray-500 text-xs font-semibold">- {review.author}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
