import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // allow any remote pattern for images
  images: {
    unoptimized: true,
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "**",
    //     pathname: "**",
    //   },
    // ]
  },
};

export default nextConfig;
