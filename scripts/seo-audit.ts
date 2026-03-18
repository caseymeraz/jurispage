import fs from "fs";
import path from "path";

// ── Types ────────────────────────────────────────────────────────────────────

interface KeywordMapEntry {
  primaryKeyword: string;
  pageType: string;
  audienceProfile: string;
}

interface Goals {
  domain: string;
  audience: string;
  audienceContext: string;
  brand: string;
  goals: { ranking: string; usability: string; audienceDelight: string };
  audienceProfiles: Record<string, {
    pageTypes: string[];
    intent: string;
    description: string;
    keyQuestions: string[];
  }>;
  requiredSchema: Record<string, string[]>;
  acronymGlossary: Record<string, string>;
}

interface AuditIssue {
  severity: string;
  category: string;
  goal: string;
  issue: string;
  recommendation: string;
}

interface AuditResult {
  url: string;
  primaryKeyword: string;
  pageType: string;
  audienceProfile: string;
  scores: {
    search_ranking_potential: number;
    usability: number;
    audience_delight: number;
  };
  goal_alignment: { ranking: string; usability: string; delight: string };
  issues: AuditIssue[];
  quick_wins: string[];
  schemaCompliance: { required: string[]; found: string[]; missing: string[] };
  acronymCompliance: { explained: string[]; unexplained: string[] };
}

// ── File paths ───────────────────────────────────────────────────────────────

const OUTPUT_DIR = path.join(__dirname, "output");
const GOALS_PATH = path.join(OUTPUT_DIR, "goals.json");
const KEYWORD_MAP_PATH = path.join(OUTPUT_DIR, "keyword-map.json");
const REPORT_JSON_PATH = path.join(OUTPUT_DIR, "seo-audit-report.json");
const REPORT_MD_PATH = path.join(OUTPUT_DIR, "seo-audit-report.md");

// ── Load config ──────────────────────────────────────────────────────────────

function loadGoals(): Goals {
  if (!fs.existsSync(GOALS_PATH)) {
    throw new Error(`goals.json not found at ${GOALS_PATH}. Run the audit setup first.`);
  }
  return JSON.parse(fs.readFileSync(GOALS_PATH, "utf-8"));
}

function loadKeywordMap(): Record<string, KeywordMapEntry> {
  if (!fs.existsSync(KEYWORD_MAP_PATH)) {
    console.log("keyword-map.json not found. Generating...");
    const { execSync } = require("child_process");
    execSync("npx tsx scripts/generate-keyword-map.ts", {
      cwd: path.join(__dirname, ".."),
      stdio: "inherit",
    });
  }
  return JSON.parse(fs.readFileSync(KEYWORD_MAP_PATH, "utf-8"));
}

// ── Crawl ────────────────────────────────────────────────────────────────────

async function fetchSitemap(domain: string): Promise<string[]> {
  const sitemapUrl = `https://${domain}/sitemap.xml`;
  console.log(`Fetching sitemap: ${sitemapUrl}`);
  const res = await fetch(sitemapUrl, {
    headers: { "User-Agent": "Googlebot/2.1 (+http://www.google.com/bot.html)" },
  });
  const xml = await res.text();
  const urls: string[] = [];
  const locRegex = /<loc>(.*?)<\/loc>/g;
  let match;
  while ((match = locRegex.exec(xml)) !== null) {
    urls.push(match[1]);
  }
  console.log(`Found ${urls.length} URLs in sitemap`);
  return urls;
}

async function crawlPage(url: string): Promise<{ html: string; status: number } | null> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Googlebot/2.1 (+http://www.google.com/bot.html)" },
      redirect: "follow",
    });
    const html = await res.text();
    return { html, status: res.status };
  } catch (err) {
    console.error(`Failed to crawl ${url}:`, err);
    return null;
  }
}

// ── HTML extraction ──────────────────────────────────────────────────────────

function extractTitle(html: string): string {
  const match = html.match(/<title[^>]*>(.*?)<\/title>/is);
  return match ? match[1].trim() : "";
}

function extractMetaDescription(html: string): string {
  const match = html.match(/<meta[^>]*name=["']description["'][^>]*content=["'](.*?)["'][^>]*>/is)
    || html.match(/<meta[^>]*content=["'](.*?)["'][^>]*name=["']description["'][^>]*>/is);
  return match ? match[1].trim() : "";
}

function extractHeadings(html: string): { h1: string[]; h2: string[]; h3: string[] } {
  const h1s = [...html.matchAll(/<h1[^>]*>(.*?)<\/h1>/gis)].map((m) => m[1].replace(/<[^>]+>/g, "").trim());
  const h2s = [...html.matchAll(/<h2[^>]*>(.*?)<\/h2>/gis)].map((m) => m[1].replace(/<[^>]+>/g, "").trim());
  const h3s = [...html.matchAll(/<h3[^>]*>(.*?)<\/h3>/gis)].map((m) => m[1].replace(/<[^>]+>/g, "").trim());
  return { h1: h1s, h2: h2s, h3: h3s };
}

function extractMainContent(html: string): string {
  // Remove script, style, nav, header, footer
  let text = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<nav[\s\S]*?<\/nav>/gi, "")
    .replace(/<header[\s\S]*?<\/header>/gi, "")
    .replace(/<footer[\s\S]*?<\/footer>/gi, "");
  // Strip remaining tags
  text = text.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return text;
}

function extractSchemaTypes(html: string): string[] {
  const types: string[] = [];
  const scriptRegex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = scriptRegex.exec(html)) !== null) {
    try {
      const data = JSON.parse(match[1]);
      collectTypes(data, types);
    } catch {
      // malformed JSON-LD, skip
    }
  }
  return [...new Set(types)];
}

function collectTypes(obj: any, types: string[]): void {
  if (Array.isArray(obj)) {
    for (const item of obj) collectTypes(item, types);
  } else if (obj && typeof obj === "object") {
    if (obj["@type"]) {
      const t = obj["@type"];
      if (Array.isArray(t)) types.push(...t);
      else types.push(t);
    }
    if (obj["@graph"]) collectTypes(obj["@graph"], types);
  }
}

function extractInternalLinks(html: string, domain: string): string[] {
  const links: string[] = [];
  const regex = /<a[^>]*href=["'](.*?)["'][^>]*>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const href = match[1];
    if (href.startsWith("/") || href.includes(domain)) {
      links.push(href);
    }
  }
  return links;
}

// ── Schema validator ─────────────────────────────────────────────────────────

function validateSchema(
  foundTypes: string[],
  pageType: string,
  requiredSchema: Record<string, string[]>
): { required: string[]; found: string[]; missing: string[] } {
  const required = requiredSchema[pageType] || [];
  const found = foundTypes.filter((t) => required.includes(t));
  const missing = required.filter((t) => !foundTypes.includes(t));
  return { required, found, missing };
}

// ── Acronym validator ────────────────────────────────────────────────────────

function validateAcronyms(
  text: string,
  glossary: Record<string, string>
): { explained: string[]; unexplained: string[] } {
  const explained: string[] = [];
  const unexplained: string[] = [];

  for (const [acronym, expansion] of Object.entries(glossary)) {
    // Escape special regex chars in the acronym (e.g., E-E-A-T)
    const escaped = acronym.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`\\b${escaped}\\b`, "g");
    const matches = [...text.matchAll(regex)];

    if (matches.length === 0) continue;

    // Check if expansion appears near the first occurrence
    const firstIndex = matches[0].index!;
    const surroundingStart = Math.max(0, firstIndex - 120);
    const surroundingEnd = Math.min(text.length, firstIndex + acronym.length + 120);
    const surrounding = text.slice(surroundingStart, surroundingEnd);

    // Check for "Acronym (Expansion)" or "Expansion (Acronym)" patterns
    const expansionLower = expansion.toLowerCase();
    if (surrounding.toLowerCase().includes(expansionLower)) {
      explained.push(acronym);
    } else {
      unexplained.push(acronym);
    }
  }

  return { explained, unexplained };
}

// ── Gemini call ──────────────────────────────────────────────────────────────

async function callGemini(prompt: string): Promise<any> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is required");
  }

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.1,
          responseMimeType: "application/json",
        },
      }),
    }
  );

  const data = await res.json();
  if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
    console.error("Gemini response missing content:", JSON.stringify(data).slice(0, 500));
    return null;
  }

  try {
    return JSON.parse(data.candidates[0].content.parts[0].text);
  } catch {
    console.error("Failed to parse Gemini JSON response");
    return null;
  }
}

function buildGeminiPrompt(
  url: string,
  pageData: {
    title: string;
    metaDescription: string;
    headings: { h1: string[]; h2: string[]; h3: string[] };
    content: string;
    schemaTypes: string[];
    internalLinks: string[];
  },
  keywordEntry: KeywordMapEntry,
  audienceProfile: Goals["audienceProfiles"][string],
  goals: Goals
): string {
  const contentTruncated = pageData.content.slice(0, 8000);

  return `You are a senior SEO strategist who evaluates web pages against three specific goals.

TARGET PAGE: ${url}
DEFINITIVE TARGET KEYWORD: "${keywordEntry.primaryKeyword}" (this is the exact keyword -- do not guess a different one)
PAGE TYPE: ${keywordEntry.pageType}

AUDIENCE PROFILE: ${keywordEntry.audienceProfile}
- Intent: ${audienceProfile.intent}
- Description: ${audienceProfile.description}
- Key questions this visitor has: ${audienceProfile.keyQuestions.join("; ")}

BRAND: ${goals.brand}
AUDIENCE CONTEXT: ${goals.audienceContext}

THE THREE GOALS:

1. SEARCH RANKING: Will this page rank for "${keywordEntry.primaryKeyword}" in Google and AI search? Evaluate title tag optimization, meta description quality, heading hierarchy, keyword placement, content depth, schema markup, and internal linking.

2. USABILITY: Can a visitor quickly find what they need and take action? Evaluate content structure, readability, CTA placement and clarity, mobile considerations, and page load signals.

3. AUDIENCE DELIGHT: Does this page make a ${audienceProfile.intent} visitor feel like they found exactly the right resource? Evaluate whether the content addresses their specific questions (${audienceProfile.keyQuestions.join("; ")}), demonstrates real expertise, builds trust through specifics, and differentiates from competitors.

CONSERVATIVE FIX PHILOSOPHY:
Focus on additions and improvements. Do NOT recommend removing existing content unless it actively hurts a goal. The site is already heavily optimized. Label every fix as: ADD, IMPROVE, or REWRITE (use REWRITE only when existing text actively contradicts a goal).

PAGE DATA:
- Title: ${pageData.title}
- Meta Description: ${pageData.metaDescription}
- H1: ${pageData.headings.h1.join(", ") || "(none)"}
- H2s: ${pageData.headings.h2.join(", ") || "(none)"}
- H3s: ${pageData.headings.h3.join(", ") || "(none)"}
- Schema types found: ${pageData.schemaTypes.join(", ") || "(none)"}
- Internal links: ${pageData.internalLinks.length}
- Content excerpt: ${contentTruncated}

Score each goal 1-10 independently. Be specific -- reference actual content from the page.

Respond in this exact JSON format:
{
  "scores": {
    "search_ranking_potential": <1-10>,
    "usability": <1-10>,
    "audience_delight": <1-10>
  },
  "goal_alignment": {
    "ranking": "<1-2 sentence assessment>",
    "usability": "<1-2 sentence assessment>",
    "delight": "<1-2 sentence assessment>"
  },
  "issues": [
    {
      "severity": "high|medium|low",
      "category": "<e.g., title-tag, meta-description, content-depth, schema, internal-linking, cta, heading-structure>",
      "goal": "ranking|usability|delight",
      "issue": "<what is wrong>",
      "recommendation": "<ADD|IMPROVE|REWRITE: specific fix>"
    }
  ],
  "quick_wins": ["<specific actionable item>"]
}`;
}

// ── Main audit flow ──────────────────────────────────────────────────────────

async function runAudit() {
  console.log("Loading configuration...");
  const goals = loadGoals();
  const keywordMap = loadKeywordMap();

  console.log(`Keyword map: ${Object.keys(keywordMap).length} URLs`);

  // Fetch sitemap
  const urls = await fetchSitemap(goals.domain);
  if (urls.length === 0) {
    throw new Error("No URLs found in sitemap");
  }

  // Archive previous report if exists
  if (fs.existsSync(REPORT_JSON_PATH)) {
    const historyDir = path.join(OUTPUT_DIR, "audit-history");
    fs.mkdirSync(historyDir, { recursive: true });
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    fs.copyFileSync(REPORT_JSON_PATH, path.join(historyDir, `seo-audit-report-${timestamp}.json`));
    console.log("Archived previous report");
  }

  const results: AuditResult[] = [];
  const batchSize = 5;

  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    console.log(`\nProcessing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(urls.length / batchSize)} (${batch.length} pages)...`);

    const batchResults = await Promise.all(
      batch.map(async (url) => {
        try {
          return await auditPage(url, keywordMap, goals);
        } catch (err) {
          console.error(`Error auditing ${url}:`, err);
          return null;
        }
      })
    );

    for (const result of batchResults) {
      if (result) results.push(result);
    }

    // Rate limit between batches
    if (i + batchSize < urls.length) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  // Write results
  const report = {
    generatedAt: new Date().toISOString(),
    domain: goals.domain,
    totalPages: results.length,
    results,
  };

  fs.writeFileSync(REPORT_JSON_PATH, JSON.stringify(report, null, 2));
  console.log(`\nJSON report: ${REPORT_JSON_PATH}`);

  // Generate markdown report
  const md = generateMarkdownReport(report, goals);
  fs.writeFileSync(REPORT_MD_PATH, md);
  console.log(`Markdown report: ${REPORT_MD_PATH}`);

  // Summary
  const avgScores = {
    ranking: results.reduce((s, r) => s + r.scores.search_ranking_potential, 0) / results.length,
    usability: results.reduce((s, r) => s + r.scores.usability, 0) / results.length,
    delight: results.reduce((s, r) => s + r.scores.audience_delight, 0) / results.length,
  };
  console.log(`\n=== Audit Complete ===`);
  console.log(`Pages audited: ${results.length}`);
  console.log(`Average scores: Ranking ${avgScores.ranking.toFixed(1)} | Usability ${avgScores.usability.toFixed(1)} | Delight ${avgScores.delight.toFixed(1)}`);
  console.log(`Total issues: ${results.reduce((s, r) => s + r.issues.length, 0)}`);
}

async function auditPage(
  url: string,
  keywordMap: Record<string, KeywordMapEntry>,
  goals: Goals
): Promise<AuditResult | null> {
  // Normalize URL for lookup (ensure trailing slash)
  const normalizedUrl = url.endsWith("/") ? url : url + "/";
  const keywordEntry = keywordMap[normalizedUrl];

  if (!keywordEntry) {
    console.log(`  Skipping ${url} (not in keyword map)`);
    return null;
  }

  console.log(`  Auditing: ${url} [${keywordEntry.pageType}] "${keywordEntry.primaryKeyword}"`);

  // Crawl the page
  const crawled = await crawlPage(url);
  if (!crawled || crawled.status !== 200) {
    console.log(`  Failed to crawl (status: ${crawled?.status || "error"})`);
    return null;
  }

  const html = crawled.html;

  // Extract page data
  const title = extractTitle(html);
  const metaDescription = extractMetaDescription(html);
  const headings = extractHeadings(html);
  const content = extractMainContent(html);
  const schemaTypes = extractSchemaTypes(html);
  const internalLinks = extractInternalLinks(html, goals.domain);

  // Get audience profile
  const audienceProfile = goals.audienceProfiles[keywordEntry.audienceProfile];
  if (!audienceProfile) {
    console.log(`  Warning: no audience profile for "${keywordEntry.audienceProfile}"`);
  }

  // Call Gemini
  const prompt = buildGeminiPrompt(
    url,
    { title, metaDescription, headings, content, schemaTypes, internalLinks },
    keywordEntry,
    audienceProfile || {
      pageTypes: [],
      intent: "general",
      description: "General visitor",
      keyQuestions: [],
    },
    goals
  );

  const geminiResult = await callGemini(prompt);

  // Run deterministic validators
  const schemaCompliance = validateSchema(schemaTypes, keywordEntry.pageType, goals.requiredSchema);
  const acronymCompliance = validateAcronyms(content, goals.acronymGlossary);

  // Build issues list from Gemini + validators
  const issues: AuditIssue[] = geminiResult?.issues || [];

  // Add schema compliance issues
  for (const missing of schemaCompliance.missing) {
    issues.push({
      severity: "high",
      category: "schema",
      goal: "ranking",
      issue: `Missing required ${missing} schema for ${keywordEntry.pageType} page`,
      recommendation: `ADD: Implement ${missing} structured data markup on this page`,
    });
  }

  // Add acronym compliance issues
  for (const acronym of acronymCompliance.unexplained) {
    const expansion = goals.acronymGlossary[acronym];
    issues.push({
      severity: "medium",
      category: "acronym",
      goal: "delight",
      issue: `Acronym "${acronym}" used without explanation on first occurrence`,
      recommendation: `IMPROVE: Expand first use to "${expansion} (${acronym})" or "${acronym} (${expansion})"`,
    });
  }

  return {
    url,
    primaryKeyword: keywordEntry.primaryKeyword,
    pageType: keywordEntry.pageType,
    audienceProfile: keywordEntry.audienceProfile,
    scores: geminiResult?.scores || { search_ranking_potential: 0, usability: 0, audience_delight: 0 },
    goal_alignment: geminiResult?.goal_alignment || { ranking: "", usability: "", delight: "" },
    issues,
    quick_wins: geminiResult?.quick_wins || [],
    schemaCompliance,
    acronymCompliance,
  };
}

// ── Markdown report ──────────────────────────────────────────────────────────

function generateMarkdownReport(
  report: { generatedAt: string; domain: string; totalPages: number; results: AuditResult[] },
  goals: Goals
): string {
  const { results } = report;
  const lines: string[] = [];

  lines.push(`# SEO Audit Report: ${report.domain}`);
  lines.push(`Generated: ${report.generatedAt}`);
  lines.push(`Pages audited: ${report.totalPages}\n`);

  // Executive summary
  const avgScores = {
    ranking: results.reduce((s, r) => s + r.scores.search_ranking_potential, 0) / results.length,
    usability: results.reduce((s, r) => s + r.scores.usability, 0) / results.length,
    delight: results.reduce((s, r) => s + r.scores.audience_delight, 0) / results.length,
  };
  lines.push(`## Executive Summary\n`);
  lines.push(`| Goal | Average Score |`);
  lines.push(`|------|-------------|`);
  lines.push(`| Search Ranking | ${avgScores.ranking.toFixed(1)}/10 |`);
  lines.push(`| Usability | ${avgScores.usability.toFixed(1)}/10 |`);
  lines.push(`| Audience Delight | ${avgScores.delight.toFixed(1)}/10 |`);
  lines.push("");

  // Issues by severity
  const highIssues = results.reduce((s, r) => s + r.issues.filter((i) => i.severity === "high").length, 0);
  const mediumIssues = results.reduce((s, r) => s + r.issues.filter((i) => i.severity === "medium").length, 0);
  const lowIssues = results.reduce((s, r) => s + r.issues.filter((i) => i.severity === "low").length, 0);
  lines.push(`**Issues:** ${highIssues} high, ${mediumIssues} medium, ${lowIssues} low\n`);

  // Scores by page type
  const pageTypes = [...new Set(results.map((r) => r.pageType))];
  lines.push(`## Scores by Page Type\n`);
  lines.push(`| Page Type | Count | Ranking | Usability | Delight |`);
  lines.push(`|-----------|-------|---------|-----------|---------|`);
  for (const pt of pageTypes) {
    const pages = results.filter((r) => r.pageType === pt);
    const avg = {
      ranking: pages.reduce((s, r) => s + r.scores.search_ranking_potential, 0) / pages.length,
      usability: pages.reduce((s, r) => s + r.scores.usability, 0) / pages.length,
      delight: pages.reduce((s, r) => s + r.scores.audience_delight, 0) / pages.length,
    };
    lines.push(`| ${pt} | ${pages.length} | ${avg.ranking.toFixed(1)} | ${avg.usability.toFixed(1)} | ${avg.delight.toFixed(1)} |`);
  }
  lines.push("");

  // Schema Compliance
  lines.push(`## Schema Compliance\n`);
  const schemaByType: Record<string, { total: number; compliant: number; missingTypes: Record<string, number> }> = {};
  for (const r of results) {
    if (!schemaByType[r.pageType]) {
      schemaByType[r.pageType] = { total: 0, compliant: 0, missingTypes: {} };
    }
    schemaByType[r.pageType].total++;
    if (r.schemaCompliance.missing.length === 0) {
      schemaByType[r.pageType].compliant++;
    }
    for (const m of r.schemaCompliance.missing) {
      schemaByType[r.pageType].missingTypes[m] = (schemaByType[r.pageType].missingTypes[m] || 0) + 1;
    }
  }
  lines.push(`| Page Type | Compliant | Total | Missing Schema |`);
  lines.push(`|-----------|-----------|-------|----------------|`);
  for (const [pt, data] of Object.entries(schemaByType)) {
    const missingStr = Object.entries(data.missingTypes)
      .map(([t, c]) => `${t} (${c})`)
      .join(", ") || "None";
    lines.push(`| ${pt} | ${data.compliant}/${data.total} | ${data.total} | ${missingStr} |`);
  }
  lines.push("");

  // Acronym Compliance
  lines.push(`## Acronym Compliance\n`);
  const pagesWithUnexplained = results.filter((r) => r.acronymCompliance.unexplained.length > 0);
  if (pagesWithUnexplained.length === 0) {
    lines.push("All acronyms are properly explained on first use.\n");
  } else {
    lines.push(`${pagesWithUnexplained.length} pages have unexplained acronyms:\n`);
    // Aggregate which acronyms are most commonly unexplained
    const acronymCounts: Record<string, number> = {};
    for (const r of pagesWithUnexplained) {
      for (const a of r.acronymCompliance.unexplained) {
        acronymCounts[a] = (acronymCounts[a] || 0) + 1;
      }
    }
    lines.push(`| Acronym | Pages Missing Explanation |`);
    lines.push(`|---------|--------------------------|`);
    for (const [acronym, count] of Object.entries(acronymCounts).sort((a, b) => b[1] - a[1])) {
      const expansion = goals.acronymGlossary[acronym];
      lines.push(`| ${acronym} (${expansion}) | ${count} |`);
    }
    lines.push("");
  }

  // Top 10 lowest-scoring pages
  const sorted = [...results].sort(
    (a, b) =>
      a.scores.search_ranking_potential + a.scores.usability + a.scores.audience_delight -
      (b.scores.search_ranking_potential + b.scores.usability + b.scores.audience_delight)
  );
  lines.push(`## Top 10 Pages Needing Improvement\n`);
  for (const r of sorted.slice(0, 10)) {
    const total = r.scores.search_ranking_potential + r.scores.usability + r.scores.audience_delight;
    lines.push(`### ${r.url}`);
    lines.push(`- **Keyword:** ${r.primaryKeyword}`);
    lines.push(`- **Type:** ${r.pageType} | **Audience:** ${r.audienceProfile}`);
    lines.push(`- **Scores:** Ranking ${r.scores.search_ranking_potential} | Usability ${r.scores.usability} | Delight ${r.scores.audience_delight} (total: ${total})`);
    if (r.schemaCompliance.missing.length > 0) {
      lines.push(`- **Missing schema:** ${r.schemaCompliance.missing.join(", ")}`);
    }
    if (r.acronymCompliance.unexplained.length > 0) {
      lines.push(`- **Unexplained acronyms:** ${r.acronymCompliance.unexplained.join(", ")}`);
    }
    lines.push(`- **High-priority issues:**`);
    for (const issue of r.issues.filter((i) => i.severity === "high").slice(0, 3)) {
      lines.push(`  - ${issue.recommendation}`);
    }
    lines.push("");
  }

  // Common patterns
  lines.push(`## Common Patterns (Template-Level Fix Opportunities)\n`);
  const categoryCounts: Record<string, { count: number; pageTypes: Set<string> }> = {};
  for (const r of results) {
    for (const issue of r.issues) {
      if (!categoryCounts[issue.category]) {
        categoryCounts[issue.category] = { count: 0, pageTypes: new Set() };
      }
      categoryCounts[issue.category].count++;
      categoryCounts[issue.category].pageTypes.add(r.pageType);
    }
  }
  const sortedCategories = Object.entries(categoryCounts).sort((a, b) => b[1].count - a[1].count);
  for (const [category, data] of sortedCategories.slice(0, 10)) {
    lines.push(`- **${category}**: ${data.count} issues across ${[...data.pageTypes].join(", ")} pages`);
  }
  lines.push("");

  // Quick wins
  const allQuickWins = results.flatMap((r) => r.quick_wins);
  if (allQuickWins.length > 0) {
    lines.push(`## Quick Wins\n`);
    const uniqueWins = [...new Set(allQuickWins)].slice(0, 15);
    for (const win of uniqueWins) {
      lines.push(`- ${win}`);
    }
    lines.push("");
  }

  return lines.join("\n");
}

// ── Entry point ──────────────────────────────────────────────────────────────

runAudit().catch((err) => {
  console.error("Audit failed:", err);
  process.exit(1);
});
