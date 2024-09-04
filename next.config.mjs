/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/genres",
        destination: "/",
        permanent: true,
      },
      {
        source: "/releases",
        destination: "/",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "placehold.jp", port: "", pathname: "/**" }],
    domains: ["cdn.sanity.io", "via.placeholder.com"],
  },
};

export default nextConfig;
