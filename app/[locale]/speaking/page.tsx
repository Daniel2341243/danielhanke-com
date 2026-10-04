import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo";
import { routing, type Locale } from "@/i18n/routing";
import { Section, Eyebrow } from "@/components/ui/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { buttonStyles } from "@/components/ui/Button";
import { NewsletterCta } from "@/components/sections/NewsletterCta";
import { buildSpeakingMailto } from "@/lib/speakingMailto";
import { siteConfig } from "@/lib/siteConfig";

type Item = { title: string; body: string };

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/speaking">): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale: locale as Locale,
    pathname: "/speaking",
    titleKey: "speakingTitle",
    descriptionKey: "speakingDescription",
  });
}

export default async function SpeakingPage({
  params,
}: PageProps<"/[locale]/speaking">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("speakingPage");
  const mailto = buildSpeakingMailto();

  const topics = t.raw("topics.items") as Item[];
  const formats = t.raw("formats.items") as Item[];
  const audiences = t.raw("audiences.items") as string[];
  const requestFields = t.raw("request.fields") as string[];

  const h2 =
    "font-serif font-medium tracking-[-0.02em] leading-[1.1] text-text-primary text-[clamp(1.75rem,3.2vw,2.5rem)]";

  return (
    <>
      <section className="pt-10 md:pt-16 pb-20 md:pb-28">
        <div className="mx-auto max-w-screen px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl">
            <Eyebrow>{t("hero.eyebrow")}</Eyebrow>
            <h1 className="font-serif font-medium tracking-[-0.03em] leading-[1.02] text-text-primary text-[clamp(2.5rem,6.5vw,5rem)]">
              {t("hero.headline")}
            </h1>
            <p className="mt-8 text-lg md:text-xl text-text-secondary max-w-[58ch] leading-relaxed">
              {t("hero.body")}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <a
                href="#anfrage"
                className={buttonStyles({ variant: "primary", size: "lg" })}
              >
                {t("hero.ctaPrimary")}
              </a>
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonStyles({ variant: "secondary", size: "lg" })}
              >
                {t("hero.ctaSecondary")}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </div>
            <p className="mt-10 text-sm text-text-muted leading-relaxed max-w-[70ch]">
              {t("hero.proof")}
            </p>
          </div>
        </div>
      </section>

      <Section tone="secondary">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4">
            <ScrollReveal>
              <Eyebrow>{t("topics.eyebrow")}</Eyebrow>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h2 className={h2}>{t("topics.headline")}</h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="mt-6 text-text-secondary leading-relaxed max-w-[40ch]">
                {t("topics.intro")}
              </p>
            </ScrollReveal>
          </div>
          <ol className="lg:col-span-8 divide-y divide-border-strong border-y border-border-strong">
            {topics.map((topic, i) => (
              <ScrollReveal as="li" key={topic.title} delay={0.03 + i * 0.03}>
                <div className="py-6 grid grid-cols-[auto_1fr] gap-5">
                  <span className="font-serif text-lg text-accent tabular-nums pt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl text-text-primary leading-snug">
                      {topic.title}
                    </h3>
                    <p className="mt-2 text-text-secondary leading-relaxed">
                      {topic.body}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4">
            <ScrollReveal>
              <h2 className={h2}>{t("formats.headline")}</h2>
            </ScrollReveal>
          </div>
          <div className="lg:col-span-8">
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {formats.map((f, i) => (
                <ScrollReveal as="li" key={f.title} delay={0.04 + i * 0.04}>
                  <h3 className="font-serif text-xl text-text-primary">{f.title}</h3>
                  <p className="mt-2 text-text-secondary leading-relaxed">{f.body}</p>
                </ScrollReveal>
              ))}
            </ul>
            <ScrollReveal delay={0.1}>
              <div className="mt-12 pt-8 border-t border-border-strong">
                <p className="text-xs uppercase tracking-[0.12em] text-text-muted">
                  {t("audiences.title")}
                </p>
                <p className="mt-3 text-text-secondary leading-relaxed">
                  {audiences.join(" · ")}
                </p>
                <p className="mt-6 text-xs uppercase tracking-[0.12em] text-text-muted">
                  {t("logistics.title")}
                </p>
                <p className="mt-3 text-text-secondary leading-relaxed">
                  {t("logistics.body")}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Section>

      <Section tone="secondary" id="anfrage">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <ScrollReveal>
              <Eyebrow>{t("request.eyebrow")}</Eyebrow>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h2 className={h2}>{t("request.headline")}</h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="mt-6 text-text-secondary leading-relaxed max-w-[48ch]">
                {t("request.body")}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <a
                href={mailto}
                className={`mt-8 ${buttonStyles({ variant: "primary", size: "lg" })}`}
              >
                {t("request.cta")}
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
              <p className="mt-4 text-sm text-text-muted">
                {t("request.subtext", { email: siteConfig.email })}
              </p>
            </ScrollReveal>
          </div>
          <ol className="lg:col-span-7 space-y-3">
            {requestFields.map((field, i) => (
              <ScrollReveal as="li" key={field} delay={0.02 + i * 0.02}>
                <div className="grid grid-cols-[2rem_1fr] gap-3 text-text-secondary">
                  <span className="text-accent tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{field}</span>
                </div>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </Section>

      <NewsletterCta idPrefix="speaking-newsletter" />
    </>
  );
}
