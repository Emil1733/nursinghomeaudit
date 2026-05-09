import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Silence the multi-lockfile workspace warning
  turbopack: {
    root: __dirname,
  },

  async redirects() {
    return [
      // 301: www.nursinghomeaudit.com/* → nursinghomeaudit.com/*
      // Fires at edge level before any rendering — zero cost to Googlebot.
      // Consolidates all PageRank and crawl budget onto the canonical non-www domain.
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.nursinghomeaudit.com",
          },
        ],
        destination: "https://nursinghomeaudit.com/:path*",
        permanent: true, // 301 — tells Google this is canonical, transfer full authority
      },
    ];
  },
};

export default nextConfig;
