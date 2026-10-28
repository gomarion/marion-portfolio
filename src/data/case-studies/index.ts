import { ghost } from "./ghost";
import { shopify } from "./shopify";
import { tumblr } from "./tumblr";
import { wordpress } from "./wordpress";
import type { CaseStudy } from "./types";

export type * from "./types";

export const caseStudies: CaseStudy[] = [shopify, ghost, tumblr, wordpress];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
