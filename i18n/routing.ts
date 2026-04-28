import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["de", "en"],
  defaultLocale: "de",
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    "/coaching": "/coaching",
    "/community": "/community",
    "/buch": {
      de: "/buch",
      en: "/book",
    },
    "/ueber-mich": {
      de: "/ueber-mich",
      en: "/about",
    },
    "/newsletter": "/newsletter",
    "/impressum": {
      de: "/impressum",
      en: "/imprint",
    },
    "/datenschutz": {
      de: "/datenschutz",
      en: "/privacy",
    },
    "/agb": {
      de: "/agb",
      en: "/terms",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;
