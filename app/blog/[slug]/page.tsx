import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import SchemaOrg from "@/components/SchemaOrg";
import CTASection from "@/components/CTASection";
import { mdxComponents } from "@/components/blog/MDXComponents";
import TableOfContents from "@/components/blog/TableOfContents";

interface Props {
  params: Promise<{ slug: string }>;
}

const AUTHOR = {
  name: "Casey Meraz",
  role: "Founder, JurisPage",
  image: "/images/about/headshot-casey-meraz.jpg",
  url: "https://jurispage.com/about-us/",
  bio: "Casey Meraz has spent 15 years helping law firms get found online and turn that traffic into signed clients. He has personally managed SEO campaigns for 100+ law firms and built one of the most-read blogs on legal marketing online.",
};

/** Extract H2/H3 headings from raw MDX content for the TOC */
function extractHeadings(content: string) {
  const lines = content.split("\n");
  const headings: { id: string; text: string; level: number }[] = [];
  let inCodeBlock = false;

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].replace(/\*\*/g, "").replace(/`/g, "").trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      headings.push({ id, text, level });
    }
  }
  return headings;
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
      authors: [AUTHOR.name],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const headings = extractHeadings(post.content);

  const formattedDate = new Date(post.datePublished).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  const formattedModified = post.dateModified
    ? new Date(post.dateModified).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `https://jurispage.com/blog/${slug}/`,
    headline: post.title,
    description: post.description,
    datePublished: post.datePublished,
    dateModified: post.dateModified || post.datePublished,
    author: {
      "@type": "Person",
      name: AUTHOR.name,
      url: AUTHOR.url,
      image: `https://jurispage.com${AUTHOR.image}`,
      jobTitle: "Founder",
      worksFor: {
        "@type": "Organization",
        name: "JurisPage",
        url: "https://jurispage.com",
      },
    },
    publisher: {
      "@type": "Organization",
      name: "JurisPage",
      url: "https://jurispage.com",
      logo: {
        "@type": "ImageObject",
        url: "https://jurispage.com/icon.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://jurispage.com/blog/${slug}/`,
    },
    image: `https://jurispage.com${AUTHOR.image}`,
  };

  return (
    <>
      <SchemaOrg schema={articleSchema} />

      <section className="bg-white py-12 px-6 border-b border-gray-100">
        <div className="max-w-3xl mx-auto lg:max-w-5xl">
          <nav className="text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-gray-900 no-underline">
              Home
            </Link>
            {" / "}
            <Link href="/blog/" className="hover:text-gray-900 no-underline">
              Blog
            </Link>
            {" / "}
            <span className="text-gray-700">{post.title}</span>
          </nav>
          <div className="flex items-center gap-3 mb-4">
            <span
              className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
              style={{ background: "#EE6C1322", color: "#EE6C13" }}
            >
              {post.category}
            </span>
            <time className="text-gray-500 text-sm" dateTime={post.datePublished}>
              {formattedDate}
            </time>
          </div>
          <h1 className="font-heading font-extrabold text-gray-900 text-4xl leading-tight mb-6 max-w-3xl">
            {post.title}
          </h1>

          {/* Author byline */}
          <div className="flex items-center gap-3 pt-4 border-t border-gray-100 max-w-3xl">
            <Image
              src={AUTHOR.image}
              alt={`${AUTHOR.name}, ${AUTHOR.role} - Author`}
              width={48}
              height={48}
              className="rounded-full object-cover"
              style={{ width: 48, height: 48 }}
            />
            <div>
              <Link
                href={AUTHOR.url}
                className="text-sm font-semibold text-gray-900 no-underline hover:underline"
              >
                {AUTHOR.name}
              </Link>
              <p className="text-xs text-gray-500">{AUTHOR.role}</p>
            </div>
            {formattedModified && formattedModified !== formattedDate && (
              <span className="text-xs text-gray-400 ml-auto">
                Updated {formattedModified}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Mobile TOC */}
      <div className="lg:hidden px-6">
        <div className="max-w-3xl mx-auto">
          {headings.length > 3 && <TableOfContents items={headings} />}
        </div>
      </div>

      {/* Main content with desktop sidebar TOC */}
      <div className="py-12 px-6">
        <div className="max-w-5xl mx-auto flex gap-12">
          <article className="flex-1 min-w-0 max-w-3xl prose prose-lg prose-gray">
            <MDXRemote
              source={post.content}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
              components={mdxComponents as Record<string, React.ComponentType>}
            />
          </article>

          {/* Desktop TOC sidebar */}
          {headings.length > 3 && <TableOfContents items={headings} />}
        </div>
      </div>

      {/* Author bio */}
      <section className="px-6 pb-12">
        <div className="max-w-3xl mx-auto">
          <div
            className="flex gap-5 items-start rounded-xl p-6"
            style={{ background: "#f9fafb", border: "1px solid #e5e7eb" }}
          >
            <Image
              src={AUTHOR.image}
              alt={`${AUTHOR.name}, Founder of JurisPage - legal marketing expert with 15 years of experience helping law firms grow through SEO`}
              width={80}
              height={80}
              className="rounded-full object-cover flex-shrink-0"
              style={{ width: 80, height: 80 }}
            />
            <div>
              <p className="font-semibold text-gray-900 text-base mb-0.5">
                About the author
              </p>
              <Link
                href={AUTHOR.url}
                className="text-sm font-bold no-underline hover:underline"
                style={{ color: "#EE6C13" }}
              >
                {AUTHOR.name}
              </Link>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                {AUTHOR.bio}
              </p>
              <div className="flex gap-3 mt-3">
                <Link
                  href={AUTHOR.url}
                  className="text-xs font-semibold no-underline hover:underline"
                  style={{ color: "#0f4c81" }}
                >
                  Read full bio
                </Link>
                <Link
                  href="/blog/"
                  className="text-xs font-semibold text-gray-500 no-underline hover:underline"
                >
                  All articles
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
