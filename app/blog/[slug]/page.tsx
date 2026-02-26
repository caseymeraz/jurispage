import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import SchemaOrg from "@/components/SchemaOrg";
import CTASection from "@/components/CTASection";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `https://jurispage.com/blog/${slug}/` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `https://jurispage.com/blog/${slug}/`,
    headline: post.title,
    description: post.description,
    datePublished: post.datePublished,
    dateModified: post.dateModified || post.datePublished,
    author: {
      "@type": "Organization",
      name: post.author || "JurisPage",
      url: "https://jurispage.com",
    },
    publisher: {
      "@type": "Organization",
      name: "JurisPage",
      url: "https://jurispage.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://jurispage.com/blog/${slug}/`,
    },
  };

  return (
    <>
      <SchemaOrg schema={articleSchema} />

      <section className="bg-[#1a1a1a] py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <nav className="text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-white no-underline">Home</Link>
            {" / "}
            <Link href="/blog/" className="hover:text-white no-underline">Blog</Link>
            {" / "}
            <span className="text-gray-300">{post.title}</span>
          </nav>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full" style={{ background: "#EE6C1322", color: "#EE6C13" }}>
              {post.category}
            </span>
            <time className="text-gray-400 text-sm" dateTime={post.datePublished}>
              {new Date(post.datePublished).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </time>
          </div>
          <h1 className="font-heading font-extrabold text-white text-4xl leading-tight">{post.title}</h1>
        </div>
      </section>

      <article className="py-12 px-6">
        <div className="max-w-3xl mx-auto prose prose-lg prose-gray max-w-none">
          <MDXRemote source={post.content} />
        </div>
      </article>

      <CTASection />
    </>
  );
}
