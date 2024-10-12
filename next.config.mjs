/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        domains: ['cdn.filestackcontent.com'], // Add the Filestack CDN domain
    },
};

export default nextConfig;
