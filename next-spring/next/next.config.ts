import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
        NEXTAUTH_SECRET: '4b5jMM1qXd+1/gv2eZ320qltFCrTGVG/qtsLbKMG+Go=',
        NEXTAUTH_URL: 'http://localhost:3000'
    },
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
