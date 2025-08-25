import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",  // 👈 this makes Next.js generate static HTML files in `out/`
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'exciting-action-06824a0289.media.strapiapp.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'exciting-action-06824a0289.strapiapp.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
