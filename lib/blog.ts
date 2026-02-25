import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  category?: string;
  excerpt?: string;
  content: string;
}

const contentDir = path.join(process.cwd(), "content/blog");

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(contentDir)) return [];
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".mdx"));
  return files
    .map((file) => {
      const slug = file.replace(".mdx", "");
      const raw = fs.readFileSync(path.join(contentDir, file), "utf-8");
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title || slug,
        description: data.description || "",
        datePublished: data.datePublished || "2026-01-01",
        dateModified: data.dateModified,
        author: data.author || "JurisPage",
        category: data.category || "Legal Marketing",
        excerpt: data.excerpt || content.slice(0, 200),
        content,
      } as BlogPost;
    })
    .sort((a, b) => (a.datePublished > b.datePublished ? -1 : 1));
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(contentDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title || slug,
    description: data.description || "",
    datePublished: data.datePublished || "2026-01-01",
    dateModified: data.dateModified,
    author: data.author || "JurisPage",
    category: data.category || "Legal Marketing",
    excerpt: data.excerpt || content.slice(0, 200),
    content,
  };
}
