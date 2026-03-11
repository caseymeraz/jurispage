// OpenAI client for narrative synthesis
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface ReportNarrative {
  executiveSummary: string;
  biggestGaps: string[];
  fastestWins: string[];
  ninetyDayPriorities: string[];
  recommendedService: string;
}

interface NarrativeInput {
  firmName: string;
  practiceArea: string;
  city: string;
  state: string;
  totalSearchVolume: number;
  firmInMapPack: boolean;
  firmRating: number | null;
  firmReviewCount: number | null;
  topCompetitors: {
    name: string;
    rating: number | null;
    reviewCount: number | null;
    mapPosition: number | null;
  }[];
  organicDominators: string[];
  visibilityScore: number;
  gapScore: number;
  isNewFirm: boolean;
  responseTime?: string;
  hasAfterHours?: boolean;
}

export async function generateReportNarrative(
  input: NarrativeInput
): Promise<ReportNarrative> {
  const systemPrompt = `You are an expert legal marketing analyst. Given ONLY the structured data provided, generate a market gap report narrative. NEVER invent statistics, numbers, or data points. Only reference data that is explicitly provided in the input. Write in a direct, professional tone appropriate for law firm owners.`;

  const userPrompt = `Generate a market gap report narrative for the following data:

${JSON.stringify(input, null, 2)}

Return a JSON object with these exact fields:
- executiveSummary: 2-3 sentences summarizing the firm's market position
- biggestGaps: array of 3-5 specific gaps ranked by impact
- fastestWins: array of 3-5 actionable items the firm can do quickly
- ninetyDayPriorities: array of 3-4 strategic priorities for the next 90 days
- recommendedService: one of "seo", "ppc", "local-seo", "website", "launchpad", "geo"`;

  const response = await client.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    response_format: { type: "json_object" },
    temperature: 0.3,
  });

  const content = response.choices[0]?.message?.content;
  if (!content) throw new Error("Empty OpenAI response");

  return JSON.parse(content) as ReportNarrative;
}
