import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["de"],
  defaultLocale: "de",
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    "/coaching": "/coaching",
    "/coaching-online": "/coaching-online",
    "/coaching-berlin": "/coaching-berlin",
    "/community": "/community",
    "/buch": "/buch",
    "/ueber-mich": "/ueber-mich",
    "/newsletter": "/newsletter",
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
