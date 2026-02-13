import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pdf6oe852d.ufs.sh',
        pathname: '/f/**',
      },
    ],
  },
};

export default nextConfig;
