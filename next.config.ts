import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/en", destination: "/", permanent: true },
      { source: "/en/coaching", destination: "/coaching", permanent: true },
      { source: "/en/about", destination: "/ueber-mich", permanent: true },
      { source: "/en/book", destination: "/buch", permanent: true },
      { source: "/en/community", destination: "/community", permanent: true },
      { source: "/en/imprint", destination: "/impressum", permanent: true },
      { source: "/en/privacy", destination: "/datenschutz", permanent: true },
      { source: "/en/terms", destination: "/agb", permanent: true },
      { source: "/en/newsletter", destination: "/newsletter", permanent: true },
      { source: "/en/speaking", destination: "/speaking", permanent: true },
      { source: "/en/welcome", destination: "/willkommen", permanent: true },
      { source: "/en/thanks", destination: "/danke", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
