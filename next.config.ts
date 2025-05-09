import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  
  images: {
    domains: ["raw.githubusercontent.com", "play.pokemonshowdown.com"]
  }
};

export default nextConfig;
