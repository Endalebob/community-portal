/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // output: "export",
  images: {
    domains: ['media.licdn.com','picsum.photos','res.cloudinary.com',"github.com"]
  },
}

module.exports = nextConfig
