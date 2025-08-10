import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api",
        destination: process.env.API_URL!,
      },
    ];
  },
};

export default nextConfig;
