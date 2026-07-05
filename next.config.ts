import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // [Architecture §10 fix] Cloudinary is part of the backend stack for
    // project screenshots — remotePatterns must be declared or next/image
    // will 400 the first time it's pointed at a Cloudinary URL.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
