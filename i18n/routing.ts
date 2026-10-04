import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["de"],
  defaultLocale: "de",
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    "/ueber-mich": "/ueber-mich",
    "/newsletter": "/newsletter",
    "/inhalte": "/inhalte",
    "/buch": "/buch",
    "/speaking": "/speaking",
    "/danke": "/danke",
    "/willkommen": "/willkommen",
    "/impressum": "/impressum",
    "/datenschutz": "/datenschutz",
    "/agb": "/agb",
  },
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;
