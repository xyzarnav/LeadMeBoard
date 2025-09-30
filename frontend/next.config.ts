import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Optimize package imports
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Set output file tracing root to silence workspace warning
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
