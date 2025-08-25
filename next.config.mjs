/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "mobile-be.berbagibitesjogja.com",
      "mobile-panel.berbagibitesjogja.com",
    ],
  },
  output: "standalone",
};

export default nextConfig;
