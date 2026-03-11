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

  const res = await fetch(
    `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${formGuid}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HubSpot submission failed (${res.status}): ${text}`);
  }

  return res.json();
}
