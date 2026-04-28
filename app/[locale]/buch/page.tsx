import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Section, Eyebrow } from "@/components/ui/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { buttonStyles } from "@/components/ui/Button";
import { siteConfig } from "@/lib/siteConfig";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/buch">): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale: locale as Locale,
    pathname: "/buch",
    titleKey: "buchTitle",
    descriptionKey: "buchDescription",
  });
}

export default async function BuchPage({
  params,
}: PageProps<"/[locale]/buch">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("buchPage");
  const items = t.raw("forWhom.items") as string[];

  return (
    <>
      <section className="pt-12 md:pt-20 pb-16">
        <div className="mx-auto max-w-screen px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5">
              <ScrollReveal>
                <PhotoPlaceholder
                  aspect="book"
                  alt={t("hero.coverAlt")}
                  slot="Buchcover"
                  dimensions="1000 × 1500 px"
                  className="max-w-[360px] mx-auto lg:mx-0 shadow-2xl"
                />
              </ScrollReveal>
            </div>
            <div className="lg:col-span-7">
              <ScrollReveal delay={0.05}>
                <Eyebrow>{t("hero.eyebrow")}</Eyebrow>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h1 className="font-serif italic font-semibold tracking-[-0.02em] leading-[1.05] text-text-primary text-[clamp(2.5rem,5vw,4.5rem)]">
                  {t("hero.title")}
                </h1>
              </ScrollReveal>
              <ScrollReveal delay={0.15}>
                <p className="mt-8 text-lg text-text-secondary max-w-[55ch] leading-relaxed">
                  {t("hero.subline")}
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <a
                  href={siteConfig.social.amazon}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-10 ${buttonStyles({ variant: "primary", size: "lg" })}`}
                >
                  {t("hero.cta")}
                </a>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <Section tone="secondary">
        <div className="max-w-3xl">
          <ScrollReveal>
            <h2 className="font-serif font-semibold tracking-[-0.02em] leading-[1.1] text-text-primary text-[clamp(1.875rem,4vw,3rem)]">
              {t("content.headline")}
            </h2>
          </ScrollReveal>
          <div className="mt-10 space-y-6 text-text-secondary leading-relaxed max-w-[65ch]">
            <ScrollReveal delay={0.1}>
              <p>{t("content.body1")}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <p>{t("content.body2")}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p>{t("content.body3")}</p>
            </ScrollReveal>
          </div>
        </div>
      </Section>

      <Section>
        <div className="max-w-3xl">
          <ScrollReveal>
            <h2 className="font-serif font-semibold tracking-[-0.02em] leading-[1.1] text-text-primary text-[clamp(1.5rem,3vw,2.25rem)]">
              {t("forWhom.headline")}
            </h2>
          </ScrollReveal>
          <ul className="mt-10 space-y-5 text-text-secondary leading-relaxed">
            {items.map((item, i) => (
              <ScrollReveal key={i} delay={0.05 + i * 0.05}>
                <li className="flex gap-4 border-l border-accent pl-5">
                  <span>{item}</span>
                </li>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="tinted">
        <div className="text-center">
          <ScrollReveal>
            <a
              href={siteConfig.social.amazon}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonStyles({ variant: "primary", size: "lg" })}
            >
              {t("outro.cta")}
            </a>
          </ScrollReveal>
        </div>
      </Section>
    </>
  );
}
