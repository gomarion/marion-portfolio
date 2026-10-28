import { ghost } from "./ghost";
import { personalProjects } from "./personal-projects";
import { shopify } from "./shopify";
import { tumblr } from "./tumblr";
import { wordpress } from "./wordpress";
import type { CaseStudy } from "./types";

export type * from "./types";

export const caseStudies: CaseStudy[] = [
  shopify,
  ghost,
  tumblr,
  wordpress,
  personalProjects,
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
