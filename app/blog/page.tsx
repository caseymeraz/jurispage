import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import SchemaOrg from "@/components/SchemaOrg";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Law Firm Marketing Blog | JurisPage",
  description: "Actionable guides on law firm SEO, Google Ads, website design, and digital marketing for attorneys. No fluff, no vague advice — just what actually works.",
  alternates: { canonical: "https://jurispage.com/blog/" },
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <>
      <SchemaOrg schema={{
        "@context": "https://schema.org",
        "@type": "Blog",
        "@id": "https://jurispage.com/blog/",
        name: "JurisPage Law Firm Marketing Blog",
        url: "https://jurispage.com/blog/",
        description: "Actionable law firm marketing guides from JurisPage.",
      }} />

      <section className="bg-gray-900 py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-heading font-extrabold text-white text-4xl mb-4">Law Firm Marketing Blog</h1>
          <p className="text-gray-300 text-lg">Actionable guides on SEO, Google Ads, websites, and AI search for law firms. No fluff.</p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Blog posts coming soon. Check back shortly.</p>
              <p className="text-gray-400 mt-2">We're publishing 6-8 posts per month starting in March 2026.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <article key={post.slug} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">{post.category}</span>
                    <span className="text-gray-300">·</span>
                    <time className="text-xs text-gray-500" dateTime={post.datePublished}>
                      {new Date(post.datePublished).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                    </time>
                  </div>
                  <h2 className="font-heading font-bold text-gray-900 text-xl mb-2">
                    <Link href={`/blog/${post.slug}/`} className="no-underline hover:underline">{post.title}</Link>
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{post.description}</p>
                  <Link href={`/blog/${post.slug}/`} className="text-sm font-semibold no-underline" style={{ color: "#14EEEE" }}>
                    Read more →
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
