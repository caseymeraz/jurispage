import Link from "next/link";
import Image from "next/image";
import type { CaseStudy } from "@/data/caseStudies";

interface CaseStudyPreviewProps {
  caseStudies: CaseStudy[];
  heading?: string;
}

const typeLabels: Record<CaseStudy["type"], string> = {
  seo: "SEO",
  ppc: "Google Ads",
  "seo-ppc": "SEO + Google Ads",
};

export default function CaseStudyPreview({ caseStudies, heading = "Real Results from Real Law Firms" }: CaseStudyPreviewProps) {
  if (!caseStudies.length) return null;

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-heading font-extrabold text-gray-900 text-3xl mb-8">{heading}</h2>
        <div className="space-y-4">
          {caseStudies.map((cs) => {
            const isImage = cs.imageFile.endsWith(".jpg") || cs.imageFile.endsWith(".png");
            return (
              <div key={cs.slug} className="flex flex-col sm:flex-row gap-0 rounded-2xl overflow-hidden border border-orange-100 shadow-sm">
                {/* Orange left accent */}
                <div className="w-full sm:w-1 bg-[#EE6C13] min-h-[4px] sm:min-h-0" />

                {/* Logo/image */}
                <div className="bg-[#1a1a1a] w-full sm:w-28 h-24 sm:h-auto flex items-center justify-center p-4 flex-shrink-0">
                  {isImage ? (
                    <Image src={cs.imageFile} alt={cs.client} width={80} height={60} className="object-contain" />
                  ) : (
                    <Image src={cs.imageFile} alt={cs.client} width={100} height={40} className="h-8 w-auto object-contain" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-full text-white" style={{ background: "#EE6C13" }}>
                        {typeLabels[cs.type]}
                      </span>
                      <span className="text-xs text-gray-500">{cs.practiceArea} · {cs.location}</span>
                    </div>
                    <p className="font-heading font-extrabold text-xl mb-1" style={{ color: "#EE6C13" }}>{cs.heroStat}</p>
                    <p className="font-heading font-semibold text-gray-800 text-sm">{cs.client}</p>
                    {cs.testimonial && (
                      <p className="text-xs text-gray-500 italic mt-1">&ldquo;{cs.testimonial.quote}&rdquo;</p>
                    )}
                  </div>
                  <Link
                    href={`/case-studies/${cs.slug}/`}
                    className="font-heading font-bold text-sm px-5 py-2.5 rounded-[40px] text-white no-underline flex-shrink-0 text-center"
                    style={{ background: "#EE6C13" }}
                  >
                    Read Story
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-6 text-center">
          <Link href="/case-studies/" className="text-sm font-medium no-underline" style={{ color: "#EE6C13" }}>
            View All Success Stories →
          </Link>
        </div>
      </div>
    </section>
  );
}
