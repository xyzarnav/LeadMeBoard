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
  // Ensure stable builds
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Disable Turbopack explicitly
  turbo: {
    rules: {},
  },
  // Optimize CSS handling
  transpilePackages: [],
};

export default nextConfig;
