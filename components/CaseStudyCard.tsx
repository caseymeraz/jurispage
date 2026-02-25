import Link from "next/link";
import Image from "next/image";
import type { CaseStudy } from "@/data/caseStudies";

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
}

const typeLabels: Record<CaseStudy["type"], string> = {
  seo: "SEO",
  ppc: "Google Ads",
  "seo-ppc": "SEO + Google Ads",
};

export default function CaseStudyCard({ caseStudy: cs }: CaseStudyCardProps) {
  const isImage = cs.imageFile.endsWith(".jpg") || cs.imageFile.endsWith(".png");

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
      {/* Image/Logo header */}
      <div className="relative h-32 bg-[#1a1a1a] flex items-center justify-center p-6">
        {isImage ? (
          <Image
            src={cs.imageFile}
            alt={cs.client}
            fill
            className="object-cover opacity-60"
          />
        ) : (
          <Image
            src={cs.imageFile}
            alt={cs.client}
            width={160}
            height={48}
            className="h-10 w-auto object-contain"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full text-white" style={{ background: "#EE6C13" }}>
            {typeLabels[cs.type]}
          </span>
          <span className="text-xs text-gray-500">{cs.practiceArea}</span>
        </div>
        <h3 className="font-heading font-bold text-gray-900 text-lg mb-1">{cs.client}</h3>
        <p className="text-sm text-gray-500 mb-4">{cs.location}</p>

        {/* Hero stat */}
        <div className="mb-4 p-4 rounded-xl bg-[#FEF3EC] border border-orange-100">
          <p className="font-heading font-extrabold text-2xl" style={{ color: "#EE6C13" }}>{cs.heroStat}</p>
        </div>

        {cs.testimonial && (
          <p className="text-sm text-gray-600 italic mb-4 leading-relaxed">
            &ldquo;{cs.testimonial.quote}&rdquo; — {cs.testimonial.author}
          </p>
        )}

        <div className="mt-auto">
          <Link
            href={`/case-studies/${cs.slug}/`}
            className="inline-flex items-center gap-2 font-heading font-bold text-sm no-underline transition-colors"
            style={{ color: "#EE6C13" }}
          >
            Read Case Study →
          </Link>
        </div>
      </div>
    </div>
  );
}
