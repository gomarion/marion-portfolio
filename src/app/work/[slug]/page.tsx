import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseFile } from "@/components/case-study/CaseFile";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Contact } from "@/components/sections/Contact";
import { RichTextContent } from "@/components/ui/RichTextContent";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { caseStudies, getCaseStudy } from "@/data/case-studies";

// Only the case studies in the data exist; any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata(
  props: PageProps<"/work/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  const title = `${study.title} Case Study`;
  const description = study.intro
    .map((part) => (typeof part === "string" ? part : part.text))
    .join("");

  return {
    title,
    description,
    openGraph: { title, description, url: `/work/${study.slug}` },
    twitter: { title, description },
  };
}

// Figma "Case Study - Shopify" (259:30). The body wrapper matches the
// homepage: 1280px column, 100px top / 200px bottom padding, 180px between
// the case study and Contact.
export default async function CaseStudyPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return (
    <>
      <SiteHeader variant="bar" />
      <main className="flex-1">
        <div className="mx-auto box-content flex max-w-content flex-col gap-30 px-4 pt-16 pb-30 sm:px-6 lg:gap-45 lg:px-10 lg:pt-25 lg:pb-50">
          {/* Figma "Work" (259:51): label, title and intro 35px apart, then
              the case files 45px apart. */}
          <article>
            <p className="text-[1.25rem] leading-[1.5] font-bold tracking-design">
              Case study
            </p>
            <SectionHeading as="h1" className="mt-8.75">
              {study.title}
            </SectionHeading>
            <div className="mt-8.75 flex flex-col gap-11.25">
              <div>
                <h2 className="text-lead font-semibold uppercase">
                  {study.subtitle}
                </h2>
                <p className="mt-3.75 text-body-sm">
                  <RichTextContent content={study.intro} />
                </p>
              </div>
              {study.files.map((file) => (
                <CaseFile key={file.name} file={file} />
              ))}
            </div>
          </article>
          <Contact />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
