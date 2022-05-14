/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['stonks-app.s3.amazonaws.com', 'stonks.com', 'lh3.googleusercontent.com'],
  },
}

module.exports = nextConfig
