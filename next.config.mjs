/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "placehold.jp", port: "", pathname: "/**" }],
    domains: ["cdn.sanity.io", "via.placeholder.com"],
  },
};

export default nextConfig;
