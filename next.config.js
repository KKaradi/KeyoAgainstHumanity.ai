/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "upload.wikimedia.org",
      "www.pngitem.com",
      "replicate.com",
      "replicate.delivery",
      "imgs.search.brave.com",
      "i.pinimg.com",
    ],
  },
};

module.exports = nextConfig;
