/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'areafree.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'areafree.s3.ap-northeast-1.amazonaws.com',
      },
    ],
  },
}

export default nextConfig
