/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    typedRoutes: true,
  },
  // Optimize bundle for production
  swcMinify: true,
  // Enable compression
  compress: true,
  // Performance optimizations
  reactStrictMode: true,
  // Optimize for serverless
  poweredByHeader: false,
};

module.exports = nextConfig;
