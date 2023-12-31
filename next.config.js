/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['ycuajmirzlqpgzuonzca.supabase.co', 'www.sac.or.kr'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ycuajmirzlqpgzuonzca.supabase.co',
        port: '',
        pathname: '**',
      },
    ],
    formats: ['image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/kr',
  //       permanent: true,
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
