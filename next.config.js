/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
	serverActions: {
 	   allowedOrigins: ["dkmhptit.tech"]
	}
    },
};

module.exports = nextConfig;
