import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Contact } from "@/components/sections/Contact";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatDate, getPosts } from "@/lib/blog";

// Only the posts in src/content/blog exist (drafts only in development);
// any other slug is a 404.
export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map(({ slug }) => ({ slug }));
}

async function findPost(slug: string) {
  const posts = await getPosts();
  return posts.find((post) => post.slug === slug);
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await findPost(slug);
  if (!post) return {};
  const { title, description, date, updated, tags } = post.meta;
  const url = `/blog/${slug}`;

  return {
    title,
    description,
    keywords: tags,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      publishedTime: date,
      modifiedTime: updated ?? date,
      tags,
    },
    twitter: { title, description },
  };
}

// A blog post, on the case study page layout without the case file design:
// a "Blog" label linking back to the index, the title and date in the 680px
// reading column, then the post (styled by mdx-components.tsx), whose
// images can widen to 1080px.
export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = await findPost(slug);
  if (!post) notFound();
  const { Content, meta } = post;

  return (
    <>
      <SiteHeader variant="bar" />
      <main className="flex-1">
        <div className="mx-auto box-content flex max-w-content flex-col gap-30 px-4 pt-16 pb-30 sm:px-6 lg:gap-45 lg:px-10 lg:pt-25 lg:pb-50">
          <article className="mx-auto w-full max-w-270">
            <header className="mx-auto w-full max-w-170">
              <p className="text-[1.25rem] leading-[1.5] font-bold tracking-design">
                <Link
                  href="/blog"
                  className="underline-offset-4 hover:underline"
                >
                  Blog
                </Link>
              </p>
              <SectionHeading as="h1" className="mt-8.75">
                {meta.title}
              </SectionHeading>
              <p className="mt-5 font-mono text-body-sm">
                <time dateTime={meta.date}>{formatDate(meta.date)}</time>
                {meta.updated && (
                  <>
                    {" · Updated "}
                    <time dateTime={meta.updated}>
                      {formatDate(meta.updated)}
                    </time>
                  </>
                )}
                {meta.draft && " · Draft"}
              </p>
              {meta.tags && meta.tags.length > 0 && (
                <p className="mt-2.5 font-code text-code">
                  {meta.tags.join(" · ")}
                </p>
              )}
            </header>
            <div className="mt-12.5">
              <Content />
            </div>
          </article>
          <Contact />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
