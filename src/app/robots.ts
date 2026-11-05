import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site-url";

// /robots.txt: every page may be crawled, and here's the sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
