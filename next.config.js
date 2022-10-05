/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["upload.wikimedia.org", "www.pngitem.com", "replicate.com"],
  },
};

<<<<<<< HEAD
module.exports = {
  images: {
    domains: ['https://upload.wikimedia.org'],
  },
}

module.exports = nextConfig
=======
module.exports = nextConfig;
>>>>>>> f1000a289e63e4559d9f94fab7e7d472adb9c9d1
