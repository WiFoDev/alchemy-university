/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['img.seadn.io', 'ipfs.io']
  }
}

module.exports = nextConfig
