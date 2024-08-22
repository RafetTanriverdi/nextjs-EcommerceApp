/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["www.kaft.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "product-images-dev-us-east-1.s3.amazonaws.com",
        pathname: "/products/**",
      },
    ],
  },
};

export default nextConfig;
