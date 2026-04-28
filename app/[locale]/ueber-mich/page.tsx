import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Section, Eyebrow } from "@/components/ui/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { Quote } from "@/components/ui/Quote";
import { buttonStyles } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";

export default async function AboutPage({
  params,
}: PageProps<"/[locale]/ueber-mich">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("about");
  const vita = t.raw("vita.items") as string[];
  const get = t.raw("distinction.get") as string[];
  const dontGet = t.raw("distinction.dontGet") as string[];

  return (
    <>
      <section className="pt-12 md:pt-20 pb-16 md:pb-24">
        <div className="mx-auto max-w-screen px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <ScrollReveal>
                <Eyebrow>{t("hero.eyebrow")}</Eyebrow>
              </ScrollReveal>
              <ScrollReveal delay={0.05}>
                <h1 className="font-serif italic font-semibold tracking-[-0.02em] leading-[1.05] text-text-primary text-[clamp(2.5rem,6vw,5.25rem)]">
                  {t("hero.title")}
                </h1>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <p className="mt-8 text-lg text-text-secondary max-w-[55ch] leading-relaxed">
                  {t("hero.subline")}
                </p>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-5 order-1 lg:order-2">
              <ScrollReveal delay={0.05}>
                <PhotoPlaceholder
                  aspect="portrait"
                  alt={t("hero.imageAlt")}
                  slot="Portrait"
                  dimensions="1200 × 1600 px"
                  className="lg:max-w-md lg:ml-auto"
                />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <Section tone="secondary">
        <div className="max-w-3xl">
          <ScrollReveal>
            <Eyebrow>{t("vita.eyebrow")}</Eyebrow>
          </ScrollReveal>
          <ul className="mt-8 space-y-5 border-l border-accent pl-6 text-text-secondary leading-relaxed">
            {vita.map((item, i) => (
              <ScrollReveal key={i} delay={0.04 + i * 0.04}>
                <li>{item}</li>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </Section>

      <Section>
        <div className="max-w-3xl space-y-20 md:space-y-24">
          <ScrollReveal>
            <h2 className="font-serif font-semibold tracking-[-0.02em] leading-[1.1] text-text-primary text-[clamp(1.875rem,4vw,3rem)]">
              {t("story.headline")}
            </h2>
          </ScrollReveal>

          <article>
            <ScrollReveal>
              <h3 className="font-sans font-medium text-text-primary text-lg leading-snug uppercase tracking-[0.08em]">
                {t("story.intro.title")}
              </h3>
            </ScrollReveal>
            <div className="mt-6 space-y-6 text-text-secondary leading-relaxed">
              <ScrollReveal delay={0.05}>
                <p>{t("story.intro.body1")}</p>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <p>{t("story.intro.body2")}</p>
              </ScrollReveal>
            </div>
          </article>

          <article>
            <ScrollReveal>
              <h3 className="font-sans font-medium text-text-primary text-lg leading-snug uppercase tracking-[0.08em]">
                {t("story.detour.title")}
              </h3>
            </ScrollReveal>
            <div className="mt-6 space-y-6 text-text-secondary leading-relaxed">
              <ScrollReveal delay={0.05}>
                <p>{t("story.detour.body1")}</p>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <p>{t("story.detour.body2")}</p>
              </ScrollReveal>
              <ScrollReveal delay={0.15}>
                <p>{t("story.detour.body3")}</p>
              </ScrollReveal>
            </div>
          </article>

          <article>
            <ScrollReveal>
              <h3 className="font-sans font-medium text-text-primary text-lg leading-snug uppercase tracking-[0.08em]">
                {t("story.why.title")}
              </h3>
            </ScrollReveal>
            <div className="mt-6 space-y-6 text-text-secondary leading-relaxed">
              <ScrollReveal delay={0.05}>
                <p>{t("story.why.body1")}</p>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <p>{t("story.why.body2")}</p>
              </ScrollReveal>
            </div>
          </article>
        </div>
      </Section>

      <Section tone="secondary">
        <ScrollReveal>
          <h2 className="font-serif font-semibold tracking-[-0.02em] leading-[1.1] text-text-primary text-[clamp(1.875rem,4vw,3rem)] max-w-[28ch]">
            {t("distinction.headline")}
          </h2>
        </ScrollReveal>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
          <ScrollReveal delay={0.05}>
            <div>
              <h3 className="font-sans font-medium text-text-primary text-lg mb-6">
                {t("distinction.getTitle")}
              </h3>
              <ul className="space-y-4 text-text-secondary leading-relaxed">
                {get.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span aria-hidden="true" className="text-accent shrink-0 mt-1">·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="border-l border-accent pl-8">
              <h3 className="font-sans font-medium text-text-primary text-lg mb-6">
                {t("distinction.dontGetTitle")}
              </h3>
              <ul className="space-y-4 text-text-secondary leading-relaxed">
                {dontGet.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span aria-hidden="true" className="text-text-muted shrink-0 mt-1">·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </Section>

      <Section>
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <Quote className="text-[clamp(1.875rem,4vw,3rem)] tracking-[-0.02em] leading-[1.15]">
              {t("outro.headline")}
            </Quote>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="mt-12">
              <Link
                href="/coaching"
                className={buttonStyles({ variant: "primary", size: "lg" })}
              >
                {t("outro.cta")}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </Section>
    </>
  );
}
