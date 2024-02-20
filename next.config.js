/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "ycuajmirzlqpgzuonzca.supabase.co",
      "www.sac.or.kr",
      "artinfokorea.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ycuajmirzlqpgzuonzca.supabase.co",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "jauusvckyqnvrzccxpru.supabase.co",
        port: "",
        pathname: "**",
      },
    ],
    formats: ["image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

module.exports = nextConfig;
