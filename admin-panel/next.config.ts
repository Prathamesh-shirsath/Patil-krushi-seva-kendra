import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-a1af7329c9c547d39865875bc2a0f92b.r2.dev",
      },
    ],
  },
};

export default nextConfig;