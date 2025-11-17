import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
      },
    ],
  },
};
const withNextintl = createNextIntlPlugin();
export default withNextintl(nextConfig);
