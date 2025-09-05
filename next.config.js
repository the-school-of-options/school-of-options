/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  // Optimize for production - swcMinify removed as it's deprecated
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "exciting-action-06824a0289.media.strapiapp.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "exciting-action-06824a0289.strapiapp.com",
        pathname: "/**",
      },
    ],
  },
  compress: true,
  poweredByHeader: false,
  // Redirects for old routes
  async redirects() {
    return [
      {
        source: "/knowledge-hub",
        destination: "/newsletter",
        permanent: true,
      },
      {
        source: "/knowledge-hub/blogs",
        destination: "/newsletter/blogs",
        permanent: true,
      },
      {
        source: "/knowledge-hub/blogs/:slug*",
        destination: "/newsletter/blogs/:slug*",
        permanent: true,
      },
      {
        source: "/knowledge-hub/blogs/archive",
        destination: "/newsletter/blogs/archive",
        permanent: true,
      },
      {
        source: "/knowledge-hub/blogs/category/:category*",
        destination: "/newsletter/blogs/category/:category*",
        permanent: true,
      },
      {
        source: "/about",
        destination: "/",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: "all",
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: "vendors",
              chunks: "all",
            },
          },
        },
      };
    }
    return config;
  },
};

module.exports = nextConfig;