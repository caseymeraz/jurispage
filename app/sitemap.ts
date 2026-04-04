import { MetadataRoute } from "next";
import { services } from "@/data/services";
import { practiceAreas } from "@/data/practiceAreas";
import { metroServiceCombos } from "@/data/metros";
import { intersections } from "@/data/intersections";
import { getAllPosts } from "@/lib/blog";
import fs from "fs";
import path from "path";

const BASE_URL = "https://jurispage.com";

function getNewsSlugs(): string[] {
  const dir = path.join(process.cwd(), "content/news");
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".mdx")).map((f) => f.replace(".mdx", ""));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL + "/", lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: BASE_URL + "/about-us/", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: BASE_URL + "/contact/", lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: BASE_URL + "/services/pricing/", lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: BASE_URL + "/best-law-firm-seo-companies/", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: BASE_URL + "/blog/", lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: BASE_URL + "/law-firm-seo-cost/", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: BASE_URL + "/scorpion-legal-marketing-alternative/", lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: BASE_URL + "/practice-areas/", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: BASE_URL + "/services/", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: BASE_URL + "/jurispage-now-backed-by-juris-digital/", lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
    { url: BASE_URL + "/growth-report/", lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: BASE_URL + "/" + s.slug + "/",
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const practiceAreaPages: MetadataRoute.Sitemap = practiceAreas.map((p) => ({
    url: BASE_URL + "/" + p.slug + "/",
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const metroPages: MetadataRoute.Sitemap = metroServiceCombos.map((m) => ({
    url: BASE_URL + "/" + m.pageSlug + "/",
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const intersectionPages: MetadataRoute.Sitemap = intersections.map((i) => ({
    url: BASE_URL + "/" + i.practiceAreaSlug + "/" + i.serviceSlug + "/",
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogPosts: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: BASE_URL + "/blog/" + post.slug + "/",
    lastModified: new Date(post.dateModified || post.datePublished),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const newsPages: MetadataRoute.Sitemap = getNewsSlugs().map((slug) => ({
    url: BASE_URL + "/news/" + slug + "/",
    lastModified: new Date("2026-02-27"),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  const caseStudyPages: MetadataRoute.Sitemap = [
    { url: BASE_URL + "/case-studies/", lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    ...["wilson-criminal-defence", "the-sands-law-group", "immigration-desk"].map((slug) => ({
      url: BASE_URL + "/case-studies/" + slug + "/",
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  return [...staticPages, ...servicePages, ...practiceAreaPages, ...metroPages, ...intersectionPages, ...blogPosts, ...newsPages, ...caseStudyPages];
}
