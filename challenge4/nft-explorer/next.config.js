/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'img.seadn.io',
      'ipfs.io',
      'api.nikeape.xyz',
      'gateway.pinatas.cloud',
      'lh3.googleusercontent.com',
      'api.nikeapenft.xyz',
      'api.elonmusknft.top',
      'api.mercedesnft.xyz',
      'api.coachnft.xyz'
    ]
  }
}

module.exports = nextConfig
