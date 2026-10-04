import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo";
import { routing, type Locale } from "@/i18n/routing";
import { Section, Eyebrow } from "@/components/ui/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { buttonStyles } from "@/components/ui/Button";
import { VideoGrid } from "@/components/VideoGrid";
import { NewsletterCta } from "@/components/sections/NewsletterCta";
import { siteConfig, youtubeSearchUrl } from "@/lib/siteConfig";
import { getLatestVideos } from "@/lib/youtube";

type Topic = { label: string; query: string };

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/inhalte">): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale: locale as Locale,
    pathname: "/inhalte",
    titleKey: "contentTitle",
    descriptionKey: "contentDescription",
  });
}

export default async function ContentPage({
  params,
}: PageProps<"/[locale]/inhalte">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("contentPage");
  const topics = t.raw("topics.items") as Topic[];
  const videos = await getLatestVideos(6);

  return (
    <>
      <section className="pt-10 md:pt-16 pb-16 md:pb-20">
        <div className="mx-auto max-w-screen px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl">
            <Eyebrow>{t("hero.eyebrow")}</Eyebrow>
            <h1 className="font-serif font-medium tracking-[-0.03em] leading-[1.02] text-text-primary text-[clamp(2.5rem,6.5vw,5rem)]">
              {t("hero.title")}
            </h1>
            <p className="mt-8 text-lg md:text-xl text-text-secondary max-w-[56ch] leading-relaxed">
              {t("hero.subline")}
            </p>
            <a
              href={siteConfig.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-10 ${buttonStyles({ variant: "primary", size: "lg" })}`}
            >
              {t("hero.cta")}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <Section className="pt-0 md:pt-0">
        <ScrollReveal>
          <h2 className="font-serif font-medium tracking-[-0.02em] leading-[1.1] text-text-primary text-[clamp(1.75rem,3.2vw,2.5rem)]">
            {t("latest.headline")}
          </h2>
        </ScrollReveal>
        <div className="mt-10">
          <VideoGrid videos={videos} />
        </div>
      </Section>

      <Section tone="secondary">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <ScrollReveal>
              <h2 className="font-serif font-medium tracking-[-0.02em] leading-[1.1] text-text-primary text-[clamp(1.75rem,3.2vw,2.5rem)]">
                {t("topics.headline")}
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <p className="mt-6 text-text-secondary leading-relaxed max-w-[44ch]">
                {t("topics.intro")}
              </p>
            </ScrollReveal>
          </div>
          <ul className="lg:col-span-7 flex flex-wrap gap-3 content-start">
            {topics.map((topic) => (
              <li key={topic.label}>
                <a
                  href={youtubeSearchUrl(topic.query)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-border-strong bg-bg-elevated px-5 py-2.5 text-text-primary hover:border-text-primary transition-colors"
                >
                  {topic.label}
                  <ArrowUpRight className="size-3.5 text-text-muted" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section>
        <div className="max-w-3xl">
          <ScrollReveal>
            <Eyebrow>{t("articles.eyebrow")}</Eyebrow>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="font-serif font-medium tracking-[-0.02em] leading-[1.1] text-text-primary text-[clamp(1.75rem,3.2vw,2.5rem)]">
              {t("articles.headline")}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-6 text-lg text-text-secondary leading-relaxed">
              {t("articles.body")}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <a
              href={siteConfig.practice.articles}
              target="_blank"
              rel="noopener"
              className={`mt-8 ${buttonStyles({ variant: "secondary" })}`}
            >
              {t("articles.cta")}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </ScrollReveal>
        </div>
      </Section>

      <NewsletterCta idPrefix="content-newsletter" />
    </>
  );
}
