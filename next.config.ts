import type { NextConfig } from "next";

/* config options here */
const nextConfig: NextConfig = {
  /* Disable Source Mapping in Productions ENV */
  productionBrowserSourceMaps: false,
  experimental: {
    serverActions: {
      bodySizeLimit: '8mb',
    },
  },
};

export default nextConfig;
