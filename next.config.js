/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['po3rin.com', 'pon-blog-media.s3-ap-northeast-1.amazonaws.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NODE_ENV === 'production'
          ? 'https://po3rin.com/api/:path*'
          : 'http://localhost:8080/api/:path*',
      },
    ];
  },
  sassOptions: {
    prependData: `
      $sec-color: #1d3152;
      $main-color: #00ffc4;
    `,
  },
};

module.exports = nextConfig;
