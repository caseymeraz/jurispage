import Link from "next/link";

interface CTASectionProps {
  heading?: string;
  subtext?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function CTASection({
  heading = "Book Your Strategy Session",
  subtext = "No long-term contracts. Transparent pricing. 113+ law firms served.",
  primaryLabel = "Book Your Strategy Session",
  primaryHref = "/contact/",
  secondaryLabel = "See Pricing",
  secondaryHref = "/services/pricing/",
}: CTASectionProps) {
  return (
    <section className="py-16 px-6" style={{ background: "linear-gradient(135deg, #EE6C13, #982A0B)" }}>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-heading text-3xl font-extrabold text-white mb-4">{heading}</h2>
        <p className="text-orange-100 text-lg mb-8 max-w-xl mx-auto">{subtext}</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href={primaryHref}
            className="inline-block bg-white font-heading font-bold text-base px-8 py-4 rounded-[40px] no-underline hover:bg-orange-50 transition-colors"
            style={{ color: "#982A0B" }}
          >
            {primaryLabel}
          </Link>
          {secondaryLabel && (
            <Link
              href={secondaryHref!}
              className="inline-block border-2 border-white text-white font-heading font-bold text-base px-8 py-4 rounded-[40px] no-underline hover:bg-white hover:text-[#982A0B] transition-colors"
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
        <p className="text-orange-100 text-sm mt-4">No obligation. No sales pressure.</p>
      </div>
    </section>
  );
}
