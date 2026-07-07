import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "abubakarmall.com" },
      { protocol: "https", hostname: "i0.wp.com" },
      { protocol: "https", hostname: "arewa-digital.com" },
    ],
  },
};

export default nextConfig;
