import createNextIntlPlugin from 'next-intl/plugin';
// Force restart
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  // Add any other Next.js config here
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ipbwhhqpipejcstzzomd.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
