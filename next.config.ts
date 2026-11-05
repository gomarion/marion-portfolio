import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Let other devices on the LAN load the dev server
  allowedDevOrigins: ["192.168.1.58"],
  // Blog posts are .mdx files (src/content/blog), imported by the blog
  // routes rather than used as routes themselves.
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX();

export default withMDX(nextConfig);
