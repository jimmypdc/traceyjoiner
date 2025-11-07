/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['clsx']
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    localPatterns: [
      {
        pathname: '/api/placeholder/**',
      },
      {
        pathname: '/logo/**',
      },
      {
        pathname: '/**',
      },
    ],
  },
};
module.exports = nextConfig;