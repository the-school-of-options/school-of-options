import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",  // 👈 this makes Next.js generate static HTML files in `out/`
  // you can add other config options here if needed
};

export default nextConfig;
