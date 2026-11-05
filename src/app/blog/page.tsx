import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Contact } from "@/components/sections/Contact";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatDate, getPosts } from "@/lib/blog";

const description =
  "Notes on web development, theme building, and working with AI-assisted tools.";

export const metadata: Metadata = {
  title: "Blog",
  description,
  alternates: { canonical: "/blog" },
  openGraph: { title: "Blog", description, url: "/blog" },
  twitter: { title: "Blog", description },
};

// The blog index, on the case study page layout: the posts, newest first,
// in the 680px reading column (see mdx-components.tsx), each with its date,
// title, description and tags.
export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <SiteHeader variant="bar" />
      <main className="flex-1">
        <div className="mx-auto box-content flex max-w-content flex-col gap-30 px-4 pt-16 pb-30 sm:px-6 lg:gap-45 lg:px-10 lg:pt-25 lg:pb-50">
          <section className="mx-auto w-full max-w-170">
            <SectionHeading as="h1">Blog</SectionHeading>
            <p className="mt-5 text-body">{description}</p>

            {posts.length === 0 ? (
              <p className="mt-12.5 text-body-sm">No posts yet.</p>
            ) : (
              <ul className="mt-12.5 flex flex-col">
                {posts.map(({ slug, meta }) => (
                  <li
                    key={slug}
                    className="border-t border-line py-8 last:border-b"
                  >
                    <article className="flex flex-col gap-2.5">
                      <p className="font-mono text-body-sm">
                        <time dateTime={meta.date}>
                          {formatDate(meta.date)}
                        </time>
                        {meta.draft && " · Draft"}
                      </p>
                      <h2 className="text-lead font-semibold">
                        <Link
                          href={`/blog/${slug}`}
                          className="underline-offset-4 hover:underline"
                        >
                          {meta.title}
                        </Link>
                      </h2>
                      <p className="text-[1.0625rem] leading-[1.7] tracking-[0.01em]">
                        {meta.description}
                      </p>
                      {meta.tags && meta.tags.length > 0 && (
                        <p className="font-code text-code">
                          {meta.tags.join(" · ")}
                        </p>
                      )}
                    </article>
                  </li>
                ))}
              </ul>
            )}
          </section>
          <Contact />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
