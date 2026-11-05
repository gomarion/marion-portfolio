import fs from "node:fs";
import path from "node:path";
import type { MDXContent } from "mdx/types";

// What each post declares at its top with `export const metadata = {...}`.
export type PostMeta = {
  title: string;
  // One or two sentences: the search result and link preview text.
  description: string;
  // Publication date, YYYY-MM-DD.
  date: string;
  // Last meaningful update, YYYY-MM-DD.
  updated?: string;
  tags?: string[];
  // Drafts show in `next dev` but are left out of production builds, so
  // they're never published by accident.
  draft?: boolean;
  // Unlisted posts are published, so anyone with the link can read them,
  // but they're left off the blog index and the sitemap and ask search
  // engines not to index them.
  unlisted?: boolean;
};

export type Post = { slug: string; meta: PostMeta; Content: MDXContent };

// Posts live here as `<slug>.mdx`; the file name is the URL.
const POSTS_DIR = path.join(process.cwd(), "src/content/blog");

const SHOW_DRAFTS = process.env.NODE_ENV !== "production";

export async function getPost(slug: string): Promise<Post> {
  const post = (await import(`@/content/blog/${slug}.mdx`)) as {
    default: MDXContent;
    metadata: PostMeta;
  };
  return { slug, meta: post.metadata, Content: post.default };
}

// The blog's posts (plus drafts in development), newest first. Unlisted
// posts are left out unless `unlisted` is set, which the post routes use so
// those posts still get pages.
export async function getPosts({
  unlisted = false,
}: { unlisted?: boolean } = {}): Promise<Post[]> {
  const slugs = fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
  const posts = await Promise.all(slugs.map(getPost));
  return posts
    .filter((post) => SHOW_DRAFTS || !post.meta.draft)
    .filter((post) => unlisted || !post.meta.unlisted)
    .sort((a, b) => b.meta.date.localeCompare(a.meta.date));
}

// "November 6, 2026". Dates are read as UTC so they never shift a day.
export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}
