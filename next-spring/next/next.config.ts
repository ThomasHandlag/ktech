import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // allow any remote pattern for images
  images: {
    remotePatterns: []
  },
};

export default nextConfig;
