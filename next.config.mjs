/** @type {import('next').NextConfig} */
const nextConfig = {
  // webpack: (config, { isServer }) => {

  // config.externals = [...config.externals, "bcrypt"];
  // return config;
  // },
  webpack: (config, { isServer }) => {
    // Add a loader for SVG files
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
      };
    }

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "bluewingsm.x7md.workers.dev",
      },
    ],
  },
};

export default nextConfig;
