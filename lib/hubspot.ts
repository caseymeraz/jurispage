const PORTAL_ID = "23597402";

interface HubSpotField {
  objectTypeId: string;
  name: string;
  value: string;
}

interface HubSpotContext {
  hutk?: string;
  pageUri?: string;
  pageName?: string;
}

export async function submitToHubSpot(
  formGuid: string,
  fields: { name: string; value: string }[],
  context?: HubSpotContext
) {
  const payload: {
    fields: HubSpotField[];
    context?: Record<string, string>;
  } = {
    fields: fields.map((f) => ({
      objectTypeId: "0-1",
      name: f.name,
      value: f.value,
    })),
  };

  const ctx: Record<string, string> = {};
  if (context?.hutk) ctx.hutk = context.hutk;
  if (context?.pageUri) ctx.pageUri = context.pageUri;
  if (context?.pageName) ctx.pageName = context.pageName;
  if (Object.keys(ctx).length > 0) payload.context = ctx;

  const url = `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${formGuid}`;
  console.log("[HubSpot] Submitting to:", url);
  console.log("[HubSpot] Payload:", JSON.stringify(payload, null, 2));

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  console.log("[HubSpot] Response status:", res.status);
  console.log("[HubSpot] Response body:", text);

  if (!res.ok) {
    throw new Error(`HubSpot submission failed (${res.status}): ${text}`);
  }

  return JSON.parse(text);
}
