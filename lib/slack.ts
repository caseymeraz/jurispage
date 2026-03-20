export async function notifySlack(
  title: string,
  fields: Record<string, string>,
  channel?: "newleads" | "leadmagnets"
) {
  const webhookUrl =
    channel === "newleads"
      ? process.env.SLACK_WEBHOOK_URL_NEWLEADS
      : channel === "leadmagnets"
        ? process.env.SLACK_WEBHOOK_URL_LEADMAGNETS
        : process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) return;

  const fieldBlocks = Object.entries(fields).map(([key, value]) => ({
    type: "mrkdwn" as const,
    text: `*${key}:*\n${value}`,
  }));

  const payload = {
    blocks: [
      {
        type: "header",
        text: { type: "plain_text", text: title },
      },
      {
        type: "section",
        fields: fieldBlocks,
      },
    ],
  };

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error("[Slack] Notification failed:", err);
  }
}
