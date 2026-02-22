/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com"
            }
        ]
    },

    experimental: {
        missingSuspenseWithCSRBailout: false,
    },

    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
