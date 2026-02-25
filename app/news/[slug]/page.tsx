import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import SchemaOrg from "@/components/SchemaOrg";
import CTASection from "@/components/CTASection";

interface Props {
  params: Promise<{ slug: string }>;
}

function getNewsBySlug(slug: string) {
  const filePath = path.join(process.cwd(), "content/news", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { slug, ...data, content } as {
    slug: string; title: string; description: string; datePublished: string;
    dateModified?: string; content: string;
  };
}

function getAllNewsSlugs() {
  const dir = path.join(process.cwd(), "content/news");
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".mdx")).map((f) => f.replace(".mdx", ""));
}

export async function generateStaticParams() {
  return getAllNewsSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getNewsBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `https://jurispage.com/news/${slug}/` },
  };
}

export default async function NewsPage({ params }: Props) {
  const { slug } = await params;
  const post = getNewsBySlug(slug);
  if (!post) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "@id": `https://jurispage.com/news/${slug}/`,
    headline: post.title,
    description: post.description,
    datePublished: post.datePublished,
    dateModified: post.dateModified || post.datePublished,
    author: { "@type": "Organization", name: "JurisPage", url: "https://jurispage.com" },
    publisher: { "@type": "Organization", name: "JurisPage", url: "https://jurispage.com" },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://jurispage.com/news/${slug}/` },
  };

  return (
    <>
      <SchemaOrg schema={schema} />
      <section className="bg-gray-900 py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <nav className="text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-white no-underline">Home</Link> /{" "}
            <span className="text-gray-300">News</span>
          </nav>
          <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{ background: "#14EEEE22", color: "#14EEEE" }}>
            Press Release
          </span>
          <h1 className="font-heading font-extrabold text-white text-4xl leading-tight">{post.title}</h1>
          <time className="text-gray-400 text-sm mt-3 block" dateTime={post.datePublished}>
            {new Date(post.datePublished).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </time>
        </div>
      </section>
      <article className="py-12 px-6">
        <div className="max-w-3xl mx-auto prose prose-lg prose-gray max-w-none">
          <MDXRemote source={post.content} />
        </div>
      </article>
      <CTASection heading="Meet the New JurisPage Team" subtext="We're building something worth trusting. No long-term contracts, transparent pricing, 100% legal focus." primaryLabel="Learn About JurisPage" primaryHref="/about-us/" />
    </>
  );
}
