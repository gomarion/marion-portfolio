// The site's public address, for metadata, the sitemap and structured data.
// Vercel sets this on every deployment; fall back to localhost for
// `next dev`.
export const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

// An absolute URL for a site path, e.g. absoluteUrl("/blog").
export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}
