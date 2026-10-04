import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { buildPageMetadata } from "@/lib/seo";
import { routing, type Locale } from "@/i18n/routing";
import { Section, Eyebrow } from "@/components/ui/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { NewsletterCta } from "@/components/sections/NewsletterCta";
import { PracticeTeaser } from "@/components/sections/PracticeTeaser";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/ueber-mich">): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale: locale as Locale,
    pathname: "/ueber-mich",
    titleKey: "aboutTitle",
    descriptionKey: "aboutDescription",
  });
}

export default async function AboutPage({
  params,
}: PageProps<"/[locale]/ueber-mich">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("about");
  const stance = t.raw("stance.paragraphs") as string[];
  const path = t.raw("path.paragraphs") as string[];
  const facts = t.raw("facts.items") as string[];

  return (
    <>
      <section className="pt-10 md:pt-16 pb-20 md:pb-28">
        <div className="mx-auto max-w-screen px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end">
            <div className="lg:col-span-7">
              <Eyebrow>{t("hero.eyebrow")}</Eyebrow>
              <h1 className="font-serif font-medium tracking-[-0.03em] leading-[1] text-text-primary text-[clamp(3rem,8vw,6.5rem)]">
                Daniel Hanke
              </h1>
              <p className="mt-8 text-lg md:text-xl text-text-secondary max-w-[54ch] leading-relaxed">
                {t("hero.subline")}
              </p>
            </div>
            <div className="lg:col-span-5">
              <Image
                src="/daniel-hanke-portrait.jpg"
                alt={t("hero.imageAlt")}
                width={1807}
                height={2212}
                preload
                sizes="(min-width: 1024px) 26rem, 100vw"
                className="w-full max-w-md h-auto lg:ml-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <Section className="border-t border-border-strong">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4">
            <ScrollReveal>
              <h2 className="font-serif font-medium tracking-[-0.02em] leading-[1.1] text-text-primary text-[clamp(1.75rem,3.2vw,2.5rem)]">
                {t("stance.headline")}
              </h2>
            </ScrollReveal>
          </div>
          <div className="lg:col-span-8 space-y-6 text-lg text-text-secondary leading-relaxed max-w-[62ch]">
            {stance.map((p, i) => (
              <ScrollReveal key={i} delay={0.04 + i * 0.03}>
                <p>{p}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="secondary">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4">
            <ScrollReveal>
              <h2 className="font-serif font-medium tracking-[-0.02em] leading-[1.1] text-text-primary text-[clamp(1.75rem,3.2vw,2.5rem)]">
                {t("path.headline")}
              </h2>
            </ScrollReveal>
          </div>
          <div className="lg:col-span-8 space-y-6 text-text-secondary leading-relaxed max-w-[62ch]">
            {path.map((p, i) => (
              <ScrollReveal key={i} delay={0.04 + i * 0.03}>
                <p>{p}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4">
            <ScrollReveal>
              <h2 className="font-serif font-medium tracking-[-0.02em] leading-[1.1] text-text-primary text-[clamp(1.75rem,3.2vw,2.5rem)]">
                {t("facts.headline")}
              </h2>
            </ScrollReveal>
          </div>
          <ul className="lg:col-span-8 divide-y divide-border-strong border-y border-border-strong">
            {facts.map((item, i) => (
              <ScrollReveal as="li" key={item} delay={0.03 + i * 0.03}>
                <p className="py-4 text-text-primary leading-relaxed">{item}</p>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </Section>

      <PracticeTeaser />
      <NewsletterCta idPrefix="about-newsletter" />
    </>
  );
}
