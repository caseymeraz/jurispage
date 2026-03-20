export async function notifySlack(
  title: string,
  fields: Record<string, string>,
  channel?: "new-leads" | "lead-magnets"
) {
  const webhookUrl =
    channel === "new-leads"
      ? (process.env.SLACK_WEBHOOK_URL_NEW_LEADS || process.env.SLACK_WEBHOOK_URL)
      : channel === "lead-magnets"
        ? (process.env.SLACK_WEBHOOK_URL_LEAD_MAGNETS || process.env.SLACK_WEBHOOK_URL)
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
