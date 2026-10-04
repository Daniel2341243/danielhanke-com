import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { buildPageMetadata } from "@/lib/seo";
import { routing, type Locale } from "@/i18n/routing";
import { Section, Eyebrow } from "@/components/ui/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ConvertKitForm } from "@/components/ConvertKitForm";
import { NewsletterFineprint } from "@/components/sections/NewsletterCta";
import { siteConfig } from "@/lib/siteConfig";

type Item = { title: string; body: string };

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/newsletter">): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale: locale as Locale,
    pathname: "/newsletter",
    titleKey: "newsletterTitle",
    descriptionKey: "newsletterDescription",
  });
}

export default async function NewsletterPage({
  params,
}: PageProps<"/[locale]/newsletter">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("newsletterPage");
  const tForm = await getTranslations("newsletterForm");
  const expectations = t.raw("expectations.items") as Item[];
  const topics = t.raw("topics.items") as string[];
  const promises = t.raw("promises.items") as Item[];

  return (
    <>
      <section className="pt-10 md:pt-16 pb-20 md:pb-28">
        <div className="mx-auto max-w-screen px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl">
            <Eyebrow>{t("hero.eyebrow")}</Eyebrow>
            <h1 className="font-serif font-medium tracking-[-0.03em] leading-[1.02] text-text-primary text-[clamp(2.5rem,6.5vw,5rem)]">
              {t("hero.title")}
            </h1>
            <p className="mt-8 text-lg md:text-xl text-text-secondary max-w-[56ch] leading-relaxed">
              {t("hero.subline")}
            </p>
            <div className="mt-10 max-w-xl">
              <ConvertKitForm
                formId={siteConfig.convertKit.newsletterFormId}
                idPrefix="newsletter-page"
                layout="row"
                submitLabel={tForm("submit")}
                firstNamePlaceholder={tForm("firstNamePlaceholder")}
                emailPlaceholder={tForm("emailPlaceholder")}
              />
              <NewsletterFineprint />
            </div>
          </div>
        </div>
      </section>

      <Section tone="secondary">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4">
            <ScrollReveal>
              <h2 className="font-serif font-medium tracking-[-0.02em] leading-[1.1] text-text-primary text-[clamp(1.75rem,3.2vw,2.5rem)]">
                {t("expectations.headline")}
              </h2>
            </ScrollReveal>
          </div>
          <ol className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
            {expectations.map((item, i) => (
              <ScrollReveal as="li" key={item.title} delay={0.04 + i * 0.04}>
                <span className="font-serif text-lg text-accent tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-serif text-xl text-text-primary leading-snug">
                  {item.title}
                </h3>
                <p className="mt-2 text-text-secondary leading-relaxed">
                  {item.body}
                </p>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4">
            <ScrollReveal>
              <h2 className="font-serif font-medium tracking-[-0.02em] leading-[1.1] text-text-primary text-[clamp(1.75rem,3.2vw,2.5rem)]">
                {t("topics.headline")}
              </h2>
            </ScrollReveal>
          </div>
          <div className="lg:col-span-8">
            <ScrollReveal delay={0.05}>
              <ul className="flex flex-wrap gap-x-3 gap-y-3">
                {topics.map((topic) => (
                  <li
                    key={topic}
                    className="rounded-full border border-border-strong px-4 py-2 text-text-secondary"
                  >
                    {topic}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
            <ul className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
              {promises.map((p, i) => (
                <ScrollReveal as="li" key={p.title} delay={0.05 + i * 0.04}>
                  <h3 className="font-medium text-text-primary">{p.title}</h3>
                  <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                    {p.body}
                  </p>
                </ScrollReveal>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="tinted">
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-serif font-medium tracking-[-0.02em] leading-[1.1] text-text-primary text-[clamp(1.75rem,3.2vw,2.5rem)]">
              {t("closing.headline")}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <div className="mt-8 text-left">
              <ConvertKitForm
                formId={siteConfig.convertKit.newsletterFormId}
                idPrefix="newsletter-page-bottom"
                layout="row"
                submitLabel={tForm("submit")}
                emailPlaceholder={tForm("emailPlaceholder")}
              />
              <NewsletterFineprint className="mt-5 text-sm text-text-muted text-center" />
            </div>
          </ScrollReveal>
        </div>
      </Section>
    </>
  );
}
