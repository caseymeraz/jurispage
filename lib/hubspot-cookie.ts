export function getHubSpotCookie(): string {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(/(?:^|;\s*)hubspotutk=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : "";
}
