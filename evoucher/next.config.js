/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    // Will be available on both server and client
    BACKEND_URL: 'http://localhost:3000',
    BACKEND_FILE: 'http://localhost:3000/upload'
  },
}

module.exports = nextConfig
