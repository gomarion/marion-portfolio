import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og-image";

// The site-wide link preview (homepage, and any page without its own): the
// hero headline.
export const alt =
  "Marion Go — I build websites and web experiences for the modern web.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    label: "Web Developer",
    title: "I build websites and web experiences for the modern web.",
  });
}
