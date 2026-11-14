import type { NextConfig } from "next";

const isExport = process.env.NEXT_EXPORT === "true" || process.env.GITHUB_ACTIONS === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (isExport ? "/snipent_hub" : "");

const nextConfig: NextConfig = {
  output: isExport ? "export" : undefined,
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  allowedDevOrigins: [
    "localhost:3000",
    "localhost",
    "192.168.1.102:3000",
    "192.168.1.102",
    "10.0.60.243:3000",
    "10.0.60.243",
  ],
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "api.dicebear.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "*.googleusercontent.com" },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async rewrites() {
    if (isExport) return [];
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
