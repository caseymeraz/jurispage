import type { Metadata } from "next";
import Link from "next/link";
import { practiceAreas } from "@/data/practiceAreas";

export const metadata: Metadata = {
  title: "Practice Areas",
  description:
    "JurisPage provides specialized marketing for every legal practice area. Explore our practice-area-specific strategies for SEO, Google Ads, websites, and more.",
  alternates: { canonical: "https://jurispage.com/practice-areas/" },
};

export default function PracticeAreasPage() {
  return (
    <>
      <section className="bg-white py-16 px-6 border-b border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-heading font-extrabold text-gray-900 text-4xl md:text-5xl leading-tight mb-4">
            Legal Marketing by Practice Area
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Every practice area has its own competitive landscape, client
            behavior, and keyword economics. We build strategies around yours.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {practiceAreas.map((pa) => (
              <Link
                key={pa.slug}
                href={`/${pa.slug}/`}
                className="group block rounded-xl border border-gray-200 bg-white p-6 no-underline hover:border-[#EE6C13] hover:shadow-md transition-all"
              >
                <h2 className="font-heading font-bold text-gray-900 text-lg mb-2 group-hover:text-[#EE6C13] transition-colors">
                  {pa.displayKeyword ?? pa.primaryKeyword}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                  {pa.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
