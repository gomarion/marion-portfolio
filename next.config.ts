import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Let other devices on the LAN load the dev server
  allowedDevOrigins: ["192.168.1.58"],
};

export default nextConfig;
