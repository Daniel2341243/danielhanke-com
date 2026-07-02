import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Section, Eyebrow } from "@/components/ui/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ConvertKitForm } from "@/components/ConvertKitForm";
import { siteConfig } from "@/lib/siteConfig";

type Benefit = { title: string; body: string; topics?: string[] };

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/community">): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale: locale as Locale,
    pathname: "/community",
    titleKey: "communityTitle",
    descriptionKey: "communityDescription",
  });
}

export default async function CommunityPage({
  params,
}: PageProps<"/[locale]/community">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("community");
  const benefits = t.raw("benefits.items") as Benefit[];

  return (
    <>
      <section className="pt-12 md:pt-20 pb-16 md:pb-24">
        <div className="mx-auto max-w-screen px-6 md:px-12 lg:px-20 max-w-4xl">
          <ScrollReveal>
            <Eyebrow>{t("hero.eyebrow")}</Eyebrow>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h1 className="font-serif font-semibold tracking-[-0.02em] leading-[1.05] text-text-primary text-[clamp(2.25rem,5vw,4.5rem)]">
              {t("hero.headline")}
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-8 text-lg text-text-secondary max-w-[62ch] leading-relaxed">
              {t("hero.intro")}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <Section tone="secondary">
        <ScrollReveal>
          <Eyebrow>{t("benefits.eyebrow")}</Eyebrow>
        </ScrollReveal>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
          {benefits.map((b, i) => (
            <ScrollReveal key={i} delay={0.05 + i * 0.05}>
              <article>
                <h3 className="font-serif text-2xl text-text-primary leading-snug tracking-[-0.01em]">
                  {b.title}
                </h3>
                <p className="mt-4 text-text-secondary leading-relaxed">
                  {b.body}
                </p>
                {b.topics && (
                  <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                    {b.topics.map((topic, j) => (
                      <li
                        key={j}
                        className="flex gap-3 text-sm text-text-secondary leading-relaxed"
                      >
                        <span
                          aria-hidden="true"
                          className="text-accent shrink-0 mt-1.5 text-xs"
                        >
                          ◦
                        </span>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      <Section>
        <ScrollReveal>
          <p className="max-w-2xl text-text-secondary leading-relaxed border-l border-accent pl-6">
            {t("disclaimer")}
          </p>
        </ScrollReveal>
      </Section>

      <Section tone="tinted">
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal>
            <Eyebrow className="mx-auto inline-block">{t("cta.eyebrow")}</Eyebrow>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="font-serif font-semibold tracking-[-0.02em] leading-[1.1] text-text-primary text-[clamp(1.875rem,4vw,3rem)]">
              {t("cta.headline")}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-8 text-text-secondary leading-relaxed max-w-[55ch] mx-auto">
              {t("cta.body")}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="mt-10 max-w-md mx-auto text-left">
              <ConvertKitForm
                formId={siteConfig.convertKit.newsletterFormId}
                variant="card"
                fields={["email"]}
                submitLabel={t("cta.submit")}
                emailPlaceholder={t("cta.emailPlaceholder")}
                fineprint={t("cta.fineprint")}
              />
            </div>
          </ScrollReveal>
        </div>
      </Section>
    </>
  );
}
