import { formatDate, getPosts } from "@/lib/blog";
import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og-image";

// Each post's link preview: its title and date, drawn at build time.
export const alt = "Blog post by Marion Go";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export async function generateStaticParams() {
  const posts = await getPosts({ unlisted: true });
  return posts.map(({ slug }) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = (await getPosts({ unlisted: true })).find(
    (entry) => entry.slug === slug,
  );
  return ogImage({
    label: "Blog",
    title: post?.meta.title ?? "Blog",
    detail: post ? formatDate(post.meta.date) : undefined,
  });
}
