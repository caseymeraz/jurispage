// OpenAI GPT-4o vision analysis for Growth Path website screenshots

import OpenAI from "openai";
import type { VisionAnalysis } from "./types";

function getClient() {
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

const SYSTEM_PROMPT = `You are a website UX analyst reviewing a law firm's website screenshots. Analyze the screenshots for the following signals:

1. Phone visibility - Is a phone number prominently displayed?
2. Contact options - Are there clear ways to contact the firm (form, chat, phone)?
3. Practice area clarity - Is it immediately clear what types of cases the firm handles?
4. Location signals - Does the site communicate where the firm practices?
5. Trust signals - Are there reviews, awards, case results, or credentials visible?
6. Clutter - Is the page cluttered or clean and focused?
7. First impression - Would a potential client trust this firm based on what they see?

Return a JSON object with:
- "top_findings": an array of up to 3 findings, each with:
  - "title": short descriptive title
  - "observation": what you specifically observed
  - "why_it_matters": why this matters for getting cases
  - "next_step": one concrete action to fix it
- "signals": an object with boolean values for:
  - "phone_visible"
  - "contact_option_visible"
  - "practice_area_clear"
  - "location_signals"
  - "trust_signals"
  - "cluttered" (true = page is cluttered)
  - "good_first_impression"

Be direct, calm, and use plain English. No marketing jargon. Focus on what matters for converting visitors into phone calls.`;

export async function analyzeScreenshots(
  screenshots: { url: string; type: string }[]
): Promise<VisionAnalysis> {
  const imageMessages: OpenAI.Chat.Completions.ChatCompletionContentPart[] =
    screenshots.map((s) => ({
      type: "image_url" as const,
      image_url: { url: s.url, detail: "high" as const },
    }));

  const response = await getClient().chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Analyze these ${screenshots.length} screenshot(s) of a law firm website. Types: ${screenshots.map((s) => s.type).join(", ")}`,
          },
          ...imageMessages,
        ],
      },
    ],
    response_format: { type: "json_object" },
    temperature: 0.3,
    max_tokens: 1500,
  });

  const content = response.choices[0]?.message?.content;
  if (!content) throw new Error("Empty OpenAI vision response");

  return JSON.parse(content) as VisionAnalysis;
}
