/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img1.picmix.com',
            },
        ],
    },
};

export default nextConfig;
