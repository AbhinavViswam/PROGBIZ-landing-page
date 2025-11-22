import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
       {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ]
  }
};

// https://res.cloudinary.com/dvjzovxaz/image/upload/v1763824118
export default nextConfig;
