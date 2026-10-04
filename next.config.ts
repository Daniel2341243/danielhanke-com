import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

// Kept in sync with lib/siteConfig.ts (practice.*). Duplicated here because
// next.config is evaluated before the app's module graph.
const practice = {
  counselling: "https://act-beratung-berlin.de/de/psychologische-beratung-berlin",
  counsellingEn:
    "https://act-beratung-berlin.de/en/psychological-counselling-berlin",
};

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
      // www → apex. Only takes effect if www.danielhanke.com is attached to
      // this Vercel project (see README → Domains).
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.danielhanke.com" }],
        destination: "https://danielhanke.com/:path*",
        permanent: true,
      },

      // The former 1:1 coaching offer now lives on the practice website.
      { source: "/coaching", destination: practice.counselling, permanent: true },
      { source: "/coaching-online", destination: practice.counselling, permanent: true },
      { source: "/coaching-berlin", destination: practice.counselling, permanent: true },
      { source: "/beratung", destination: practice.counselling, permanent: true },
      { source: "/en/coaching", destination: practice.counsellingEn, permanent: true },

      // The men's community never launched; its waitlist was the newsletter.
      { source: "/community", destination: "/newsletter", permanent: true },
      { source: "/en/community", destination: "/newsletter", permanent: true },

      // German is the only locale and has no prefix. Make the /de prefix a
      // permanent redirect instead of next-intl's temporary 307.
      { source: "/de", destination: "/", permanent: true },
      { source: "/de/:path*", destination: "/:path*", permanent: true },

      // Former English URLs → their German counterparts.
      { source: "/en", destination: "/", permanent: true },
      { source: "/en/about", destination: "/ueber-mich", permanent: true },
      { source: "/en/book", destination: "/buch", permanent: true },
      { source: "/en/imprint", destination: "/impressum", permanent: true },
      { source: "/en/privacy", destination: "/datenschutz", permanent: true },
      { source: "/en/terms", destination: "/agb", permanent: true },
      { source: "/en/newsletter", destination: "/newsletter", permanent: true },
      { source: "/en/speaking", destination: "/speaking", permanent: true },
      { source: "/en/welcome", destination: "/willkommen", permanent: true },
      { source: "/en/thanks", destination: "/danke", permanent: true },
      { source: "/en/:path*", destination: "/", permanent: true },

      // Short aliases people are likely to type.
      { source: "/about", destination: "/ueber-mich", permanent: true },
      { source: "/buecher", destination: "/buch", permanent: true },
      { source: "/youtube", destination: "/inhalte", permanent: true },
      { source: "/videos", destination: "/inhalte", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
