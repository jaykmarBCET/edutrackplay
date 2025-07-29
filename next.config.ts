import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  server: {
    externalPackages: ['pg'], // ✅ Tells Next.js NOT to bundle `pg`
  },
};

export default nextConfig;
