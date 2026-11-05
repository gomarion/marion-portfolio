import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og-image";

// The blog index's link preview.
export const alt = "Marion Go — Blog";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    label: "Blog",
    title: "Notes on web development, themes and AI-assisted tools.",
  });
}
