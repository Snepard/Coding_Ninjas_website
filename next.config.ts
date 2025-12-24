import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "1mb",
    },
  },
  // Mark MongoDB/Mongoose as external server packages (prevents bundling issues)
  serverExternalPackages: ["mongodb", "mongoose"],
  // Disable typed routes to avoid build complications
  // typedRoutes: true,
  async redirects() {
    return [
      {
        source: "/hiring/admin",
        destination: "/admin",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
