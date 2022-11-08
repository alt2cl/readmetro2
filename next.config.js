/** @type {import('next').NextConfig} */


const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['rm.metrolatam.com', 'pdfserv2.readmetro.com'],
  },
  experimental: {
    fontLoaders: [
      { loader: '@next/font/google', options: { subsets: ['latin'] } },
    ],
  },
  // experimental: {
  //   optionalCatchAll: true,
  // },
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
