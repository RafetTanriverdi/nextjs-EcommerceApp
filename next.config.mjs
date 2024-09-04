/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["www.kaft.com", "product-images-dev-us-east-1.s3.amazonaws.com", "profile-pictures-dev-us-east-1.s3.amazonaws.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "product-images-dev-us-east-1.s3.amazonaws.com",
        pathname: "/products/**",
      },
      {
        protocol: "https",
        hostname: "profile-pictures-dev-us-east-1.s3.us-east-1.amazonaws.com",
        pathname: "/profile-pictures/**",
      },
    ],
  },
};

export default nextConfig;
