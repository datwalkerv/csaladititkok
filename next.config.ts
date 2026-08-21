import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imageservice.production4ig.opentv.com",
      },
      // Channel logos may come from a different host — allow all opentv subdomains
      {
        protocol: "https",
        hostname: "*.opentv.com",
      },
    ],
  },
};

export default nextConfig;
