// AI-generated narrative for Growth Path reports

import OpenAI from "openai";
import type { ScoreDimensions, PathId } from "./types";

function getClient() {
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

export interface GrowthPathNarrative {
  situationSummary: string;
  marketSummary: string;
  whyThisPath: string;
  whatShouldWait: string;
}

interface NarrativeInput {
  firmName: string;
  city: string;
  state: string;
  practiceArea: string;
  isNewFirm: boolean;
  scores: ScoreDimensions;
  primaryPath: PathId;
  secondaryPath: PathId | null;
  keywordDemand: number;
  competitorCount: number;
  mapsCompetitorCount: number;
  visionFindings: string[];
}

const SYSTEM_PROMPT = `You are a law firm growth advisor writing a report summary. Write in a direct, calm tone. Use plain English. No acronyms or marketing jargon. Never use these words: technical debt, CTA, CRO, local authority, attribution, funnel, SERP, schema, organic CTR, conversion path, martech, nurture.

Every finding follows this pattern:
1. What we found
2. Why it matters
3. What to do next

Be specific to the firm's situation. Do not invent data. Only reference information provided in the input.`;

export async function generateNarrative(
  input: NarrativeInput
): Promise<GrowthPathNarrative> {
  const userPrompt = `Generate a Growth Path report narrative for this firm:

${JSON.stringify(input, null, 2)}

Return a JSON object with:
- "situationSummary": 2-3 sentences summarizing where the firm stands today. Be specific about their market.
- "marketSummary": 2-3 sentences about the market opportunity (demand, competition level).
- "whyThisPath": 2-3 sentences explaining why this specific path was recommended over others.
- "whatShouldWait": 1-2 sentences about what the firm should NOT focus on yet and why.`;

  const response = await getClient().chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userPrompt },
    ],
    response_format: { type: "json_object" },
    temperature: 0.3,
    max_tokens: 1000,
  });

  const content = response.choices[0]?.message?.content;
  if (!content) throw new Error("Empty OpenAI narrative response");

  return JSON.parse(content) as GrowthPathNarrative;
}
