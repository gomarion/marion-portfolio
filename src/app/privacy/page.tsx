import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatDate } from "@/lib/blog";
import Privacy from "@/content/privacy.mdx";

// Update when the policy changes, e.g. a new analytics tool.
const UPDATED = "2026-11-06";

const description =
  "What this site collects (Vercel analytics, and Google Analytics only with consent) and how to control it.";

export const metadata: Metadata = {
  title: "Privacy",
  description,
  alternates: { canonical: "/privacy" },
  openGraph: { title: "Privacy", description, url: "/privacy" },
};

// The privacy page, laid out like a blog post: the text comes from
// src/content/privacy.mdx and uses the blog's reading styles
// (mdx-components.tsx).
export default function PrivacyPage() {
  return (
    <>
      <SiteHeader variant="bar" />
      <main className="flex-1">
        <div className="mx-auto box-content max-w-content px-4 pt-16 pb-30 sm:px-6 lg:px-10 lg:pt-25 lg:pb-50">
          <article className="mx-auto w-full max-w-270">
            <header className="mx-auto w-full max-w-170">
              <SectionHeading as="h1">Privacy</SectionHeading>
              <p className="mt-5 font-mono text-body-sm">
                Last updated{" "}
                <time dateTime={UPDATED}>{formatDate(UPDATED)}</time>
              </p>
            </header>
            <div className="mt-12.5">
              <Privacy />
            </div>
          </article>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
