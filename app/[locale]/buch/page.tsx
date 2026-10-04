import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo";
import { routing, type Locale } from "@/i18n/routing";
import { Section } from "@/components/ui/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { buttonStyles } from "@/components/ui/Button";
import { NewsletterCta } from "@/components/sections/NewsletterCta";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/lib/siteConfig";
import { personId } from "@/lib/structuredData";

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
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Book",
          name: "Selbstdisziplin 2.0",
          author: { "@id": personId },
          datePublished: "2021",
          inLanguage: "de",
          image: `${siteConfig.url}/selbstdisziplin-2-0.png`,
          url: `${siteConfig.url}/buch`,
        }}
      />

      <section className="pt-10 md:pt-16 pb-20 md:pb-28">
        <div className="mx-auto max-w-screen px-6 md:px-12 lg:px-20">
          <p className="text-sm tracking-[0.08em] text-text-muted">
            {t("hero.eyebrow")}
          </p>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
            <div className="md:col-span-5">
              <Image
                src="/selbstdisziplin-2-0.png"
                alt={t("hero.coverAlt")}
                width={1000}
                height={1500}
                preload
                sizes="(min-width: 768px) 22rem, 70vw"
                className="max-w-[320px] w-full h-auto mx-auto md:mx-0 shadow-[0_24px_48px_-16px_rgba(27,25,22,0.35)]"
              />
            </div>
            <div className="md:col-span-7">
              <h1 className="font-serif italic font-medium tracking-[-0.02em] leading-[1.05] text-text-primary text-[clamp(2.5rem,5.5vw,4.5rem)]">
                {t("hero.title")}
              </h1>
              <p className="mt-8 text-lg text-text-secondary max-w-[55ch] leading-relaxed">
                {t("hero.subline")}
              </p>
              <p className="mt-4 text-sm text-text-muted">{t("hero.meta")}</p>
              <a
                href={siteConfig.social.amazon}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-10 ${buttonStyles({ variant: "primary", size: "lg" })}`}
              >
                {t("hero.cta")}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Section tone="secondary">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4">
            <ScrollReveal>
              <h2 className="font-serif font-medium tracking-[-0.02em] leading-[1.1] text-text-primary text-[clamp(1.75rem,3.2vw,2.5rem)]">
                {t("content.headline")}
              </h2>
            </ScrollReveal>
          </div>
          <div className="lg:col-span-8 space-y-6 text-text-secondary leading-relaxed max-w-[62ch]">
            <ScrollReveal delay={0.05}>
              <p>{t("content.body1")}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p>{t("content.body2")}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <p>{t("content.body3")}</p>
            </ScrollReveal>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4">
            <ScrollReveal>
              <h2 className="font-serif font-medium tracking-[-0.02em] leading-[1.1] text-text-primary text-[clamp(1.75rem,3.2vw,2.5rem)]">
                {t("forWhom.headline")}
              </h2>
            </ScrollReveal>
          </div>
          <ul className="lg:col-span-8 divide-y divide-border-strong border-y border-border-strong">
            {items.map((item, i) => (
              <ScrollReveal as="li" key={item} delay={0.04 + i * 0.04}>
                <p className="py-5 text-lg text-text-primary leading-relaxed">{item}</p>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </Section>

      <NewsletterCta idPrefix="book-newsletter" />
    </>
  );
}
