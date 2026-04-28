import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import { Hero } from "@/components/sections/Hero";
import { ProblemMirror } from "@/components/sections/ProblemMirror";
import { Approach } from "@/components/sections/Approach";
import { LatestVideo } from "@/components/sections/LatestVideo";
import { BookTeaser } from "@/components/sections/BookTeaser";
import { NewsletterCta } from "@/components/sections/NewsletterCta";
import { CoachingCta } from "@/components/sections/CoachingCta";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale: locale as Locale,
    pathname: "/",
    titleKey: "homeTitle",
    descriptionKey: "homeDescription",
  });
}

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <ProblemMirror />
      <Approach />
      <LatestVideo />
      <BookTeaser />
      <NewsletterCta />
      <CoachingCta />
    </>
  );
}
