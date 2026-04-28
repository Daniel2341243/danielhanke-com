import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { ProblemMirror } from "@/components/sections/ProblemMirror";
import { Approach } from "@/components/sections/Approach";
import { LatestVideo } from "@/components/sections/LatestVideo";
import { BookTeaser } from "@/components/sections/BookTeaser";
import { NewsletterCta } from "@/components/sections/NewsletterCta";
import { CoachingCta } from "@/components/sections/CoachingCta";

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
