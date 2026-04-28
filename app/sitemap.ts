import type { MetadataRoute } from "next";
import { routing, type AppPathname, type Locale } from "@/i18n/routing";
import { siteConfig } from "@/lib/siteConfig";

const allPaths: AppPathname[] = [
  "/",
  "/coaching",
  "/community",
  "/buch",
  "/ueber-mich",
  "/newsletter",
  "/impressum",
  "/datenschutz",
  "/agb",
];

function pathFor(p: AppPathname, locale: Locale): string {
  const def = routing.pathnames[p];
  return typeof def === "string" ? def : (def as Record<Locale, string>)[locale];
}

function urlFor(p: AppPathname, locale: Locale): string {
  const path = pathFor(p, locale);
  if (locale === routing.defaultLocale) {
    return `${siteConfig.url}${path === "/" ? "" : path}`;
  }
  return `${siteConfig.url}/${locale}${path === "/" ? "" : path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return allPaths.flatMap((p) =>
    routing.locales.map((locale) => {
      const languages: Record<string, string> = {};
      for (const l of routing.locales) {
        languages[l] = urlFor(p, l);
      }
      return {
        url: urlFor(p, locale),
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: p === "/" ? 1 : 0.7,
        alternates: { languages },
      };
    }),
  );
}
