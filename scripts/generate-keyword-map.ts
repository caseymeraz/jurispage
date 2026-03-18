import { services } from "../data/services";
import { practiceAreas } from "../data/practiceAreas";
import { metros, metroServiceCombos, metroServiceLabels } from "../data/metros";
import { intersections } from "../data/intersections";
import { caseStudies } from "../data/caseStudies";
import { getAllPosts } from "../lib/blog";
import fs from "fs";
import path from "path";

const BASE_URL = "https://jurispage.com";

interface KeywordMapEntry {
  primaryKeyword: string;
  pageType: string;
  audienceProfile: string;
}

type KeywordMap = Record<string, KeywordMapEntry>;

function getNewsSlugs(): string[] {
  const dir = path.join(process.cwd(), "content/news");
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".mdx")).map((f) => f.replace(".mdx", ""));
}

function generateKeywordMap(): KeywordMap {
  const map: KeywordMap = {};

  // Static pages
  map[`${BASE_URL}/`] = {
    primaryKeyword: "law firm marketing agency",
    pageType: "homepage",
    audienceProfile: "explorer",
  };
  map[`${BASE_URL}/about-us/`] = {
    primaryKeyword: "about JurisPage",
    pageType: "about",
    audienceProfile: "explorer",
  };
  map[`${BASE_URL}/contact/`] = {
    primaryKeyword: "contact JurisPage",
    pageType: "contact",
    audienceProfile: "explorer",
  };
  map[`${BASE_URL}/services/pricing/`] = {
    primaryKeyword: "law firm marketing pricing",
    pageType: "pricing",
    audienceProfile: "explorer",
  };
  map[`${BASE_URL}/blog/`] = {
    primaryKeyword: "law firm marketing blog",
    pageType: "blog-index",
    audienceProfile: "researcher",
  };
  map[`${BASE_URL}/case-studies/`] = {
    primaryKeyword: "law firm marketing case studies",
    pageType: "case-studies-index",
    audienceProfile: "proof-seeker",
  };
  map[`${BASE_URL}/best-law-firm-seo-companies/`] = {
    primaryKeyword: "best law firm SEO companies",
    pageType: "resource",
    audienceProfile: "researcher",
  };
  map[`${BASE_URL}/law-firm-seo-cost/`] = {
    primaryKeyword: "law firm SEO cost",
    pageType: "resource",
    audienceProfile: "researcher",
  };
  map[`${BASE_URL}/scorpion-legal-marketing-alternative/`] = {
    primaryKeyword: "Scorpion legal marketing alternative",
    pageType: "resource",
    audienceProfile: "service-evaluator",
  };

  // Service pages
  for (const service of services) {
    map[`${BASE_URL}/${service.slug}/`] = {
      primaryKeyword: service.primaryKeyword,
      pageType: "service",
      audienceProfile: "service-evaluator",
    };
  }

  // Practice area pages
  for (const pa of practiceAreas) {
    map[`${BASE_URL}/${pa.slug}/`] = {
      primaryKeyword: pa.primaryKeyword,
      pageType: "practice-area",
      audienceProfile: "practice-specific",
    };
  }

  // Metro pages
  for (const combo of metroServiceCombos) {
    const metro = metros.find((m) => m.slug === combo.metroSlug);
    if (!metro) continue;
    const serviceLabel = metroServiceLabels[combo.service];
    map[`${BASE_URL}/${combo.pageSlug}/`] = {
      primaryKeyword: `${serviceLabel} in ${metro.city}, ${metro.stateAbbr}`,
      pageType: "metro",
      audienceProfile: "local-searcher",
    };
  }

  // Intersection pages (practice area + service combos)
  for (const ix of intersections) {
    map[`${BASE_URL}/${ix.practiceAreaSlug}/${ix.serviceSlug}/`] = {
      primaryKeyword: ix.metaTitle,
      pageType: "intersection",
      audienceProfile: "practice-specific",
    };
  }

  // Blog posts
  try {
    const posts = getAllPosts();
    for (const post of posts) {
      map[`${BASE_URL}/blog/${post.slug}/`] = {
        primaryKeyword: post.title,
        pageType: "blog-post",
        audienceProfile: "researcher",
      };
    }
  } catch {
    console.warn("Could not read blog posts, skipping.");
  }

  // Case study pages
  for (const cs of caseStudies) {
    map[`${BASE_URL}/case-studies/${cs.slug}/`] = {
      primaryKeyword: `${cs.client} case study`,
      pageType: "case-study",
      audienceProfile: "proof-seeker",
    };
  }

  // News pages
  try {
    const newsSlugs = getNewsSlugs();
    for (const slug of newsSlugs) {
      map[`${BASE_URL}/news/${slug}/`] = {
        primaryKeyword: slug.replace(/-/g, " "),
        pageType: "news",
        audienceProfile: "researcher",
      };
    }
  } catch {
    console.warn("Could not read news pages, skipping.");
  }

  return map;
}

const map = generateKeywordMap();
const outputPath = path.join(__dirname, "output", "keyword-map.json");
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(map, null, 2));

console.log(`Keyword map generated: ${Object.keys(map).length} URLs`);
console.log(`Output: ${outputPath}`);

// Summary by page type
const typeCounts: Record<string, number> = {};
for (const entry of Object.values(map)) {
  typeCounts[entry.pageType] = (typeCounts[entry.pageType] || 0) + 1;
}
console.log("\nBy page type:");
for (const [type, count] of Object.entries(typeCounts).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${type}: ${count}`);
}
