import { caseStudies, getCaseStudy } from "@/data/case-studies";
import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og-image";

// Each case study's link preview: its title and subtitle.
export const alt = "Case study by Marion Go";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  return ogImage({
    label: "Case study",
    title: study?.title ?? "Case study",
    detail: study?.subtitle,
  });
}
