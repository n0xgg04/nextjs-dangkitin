/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
            allowedOrigins: ["*"],
        },
    },
    env: {
        PORT: process.env.PORT,
    },
};

module.exports = nextConfig;
