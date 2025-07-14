import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://i.imgur.com/*")],
  },
  reactStrictMode: true,
};

export default nextConfig;
