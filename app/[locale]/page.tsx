import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import { Hero } from "@/components/sections/Hero";
import { Themes } from "@/components/sections/Themes";
import { NewsletterCta } from "@/components/sections/NewsletterCta";
import { LatestVideos } from "@/components/sections/LatestVideos";
import { PracticeTeaser } from "@/components/sections/PracticeTeaser";
import { BookTeaser } from "@/components/sections/BookTeaser";
import { AboutTeaser } from "@/components/sections/AboutTeaser";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale: locale as Locale,
    pathname: "/",
    titleKey: "homeTitle",
    descriptionKey: "homeDescription",
    absoluteTitle: true,
  });
}

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Themes />
      <NewsletterCta variant="feature" idPrefix="home-newsletter" />
      <LatestVideos />
      <PracticeTeaser />
      <BookTeaser />
      <AboutTeaser />
    </>
  );
}
