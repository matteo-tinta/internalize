import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false
      config.resolve.fallback.tls = false
      config.resolve.fallback.net = false
      config.resolve.fallback["timers/promises"] = false
      config.resolve.fallback.dns = false
      config.resolve.fallback.child_process = false
    }

    return config
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
