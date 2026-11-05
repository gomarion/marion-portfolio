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

// Every published post (plus drafts in development), newest first.
export async function getPosts(): Promise<Post[]> {
  const slugs = fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
  const posts = await Promise.all(slugs.map(getPost));
  return posts
    .filter((post) => SHOW_DRAFTS || !post.meta.draft)
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
