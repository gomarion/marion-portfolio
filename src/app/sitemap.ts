import type { MetadataRoute } from "next";
import { caseStudies } from "@/data/case-studies";
import { getPosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/site-url";

// /sitemap.xml: every public page, so search engines find new posts
// quickly. Only the blog has reliable dates, so only blog entries carry
// `lastModified` (a wrong date is worse than none). Drafts are left out of
// production builds by getPosts.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  const newest = posts[0];

  return [
    { url: absoluteUrl("/") },
    ...caseStudies.map((study) => ({
      url: absoluteUrl(`/work/${study.slug}`),
    })),
    {
      url: absoluteUrl("/blog"),
      ...(newest && {
        lastModified: newest.meta.updated ?? newest.meta.date,
      }),
    },
    ...posts.map(({ slug, meta }) => ({
      url: absoluteUrl(`/blog/${slug}`),
      lastModified: meta.updated ?? meta.date,
    })),
    { url: absoluteUrl("/privacy") },
  ];
}
