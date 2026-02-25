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
  heading = "Ready to Grow Your Law Firm?",
  subtext = "No long-term contracts. Transparent pricing. Results in 90 days or we work for free.",
  primaryLabel = "Get a Free Marketing Plan",
  primaryHref = "/contact/",
  secondaryLabel = "See Pricing",
  secondaryHref = "/services/pricing/",
}: CTASectionProps) {
  return (
    <section className="py-16 px-6" style={{ background: "linear-gradient(135deg, #6FFF2C, #14EEEE)" }}>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-heading text-3xl font-extrabold text-gray-900 mb-4">{heading}</h2>
        <p className="text-gray-800 text-lg mb-8 max-w-xl mx-auto">{subtext}</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href={primaryHref}
            className="inline-block bg-gray-900 text-white font-heading font-bold text-base px-8 py-4 rounded-lg no-underline hover:bg-gray-800 transition-colors"
          >
            {primaryLabel}
          </Link>
          {secondaryLabel && (
            <Link
              href={secondaryHref!}
              className="inline-block border-2 border-gray-900 text-gray-900 font-heading font-bold text-base px-8 py-4 rounded-lg no-underline hover:bg-gray-900 hover:text-white transition-colors"
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
        <p className="text-gray-700 text-sm mt-4">No obligation. No sales pressure.</p>
      </div>
    </section>
  );
}
