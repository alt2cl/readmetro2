/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['rm.metrolatam.com'],
  },
  experimental: {
    optionalCatchAll: true,
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/docs/:path*',
  //       destination: '/:path*', // The :path parameter is used here so will not be automatically passed in the query
  //     },
  //   ]
  // },
}

module.exports = nextConfig
