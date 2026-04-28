import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing, type AppPathname, type Locale } from "@/i18n/routing";
import { siteConfig } from "./siteConfig";

function getLocalizedPath(pathname: AppPathname, locale: Locale): string {
  const def = routing.pathnames[pathname];
  if (typeof def === "string") return def;
  return (def as Record<Locale, string>)[locale];
}

function urlFor(pathname: AppPathname, locale: Locale): string {
  const path = getLocalizedPath(pathname, locale);
  if (locale === routing.defaultLocale) {
    return `${siteConfig.url}${path === "/" ? "" : path}`;
  }
  return `${siteConfig.url}/${locale}${path === "/" ? "" : path}`;
}

export async function buildPageMetadata({
  locale,
  pathname,
  titleKey,
  descriptionKey,
  namespace = "seo",
}: {
  locale: Locale;
  pathname: AppPathname;
  titleKey: string;
  descriptionKey: string;
  namespace?: string;
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace });
  const canonical = urlFor(pathname, locale);
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = urlFor(pathname, l);
  }

  return {
    title: t(titleKey),
    description: t(descriptionKey),
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title: t(titleKey),
      description: t(descriptionKey),
      url: canonical,
      siteName: siteConfig.name,
      locale: locale === "de" ? "de_DE" : "en_US",
      type: "website",
      images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: t(titleKey),
      description: t(descriptionKey),
      images: ["/images/og-default.jpg"],
    },
  };
}
