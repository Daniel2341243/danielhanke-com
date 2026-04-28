import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import { Section, Eyebrow } from "@/components/ui/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { buttonStyles } from "@/components/ui/Button";
import { buildCoachingMailto } from "@/lib/coachingMailto";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

type Step = { title: string; body: string };
type Benefit = { title: string; body: string };
type Question = { title: string; body: string };
type Faq = { q: string; a: string };

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/coaching">): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale: locale as Locale,
    pathname: "/coaching",
    titleKey: "coachingTitle",
    descriptionKey: "coachingDescription",
  });
}

export default async function CoachingPage({ params }: PageProps<"/[locale]/coaching">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("coaching");
  const mailto = buildCoachingMailto(locale);

  const steps = t.raw("steps.items") as Step[];
  const benefits = t.raw("benefits.items") as Benefit[];
  const forYou = t.raw("fit.forYou") as string[];
  const notForYou = t.raw("fit.notForYou") as string[];
  const questions = t.raw("request.questions") as Question[];
  const faqs = t.raw("faq.items") as Faq[];

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
            <p className="mt-8 text-lg text-text-secondary max-w-[60ch] leading-relaxed">
              {t("hero.subline")}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <Section tone="secondary">
        <ScrollReveal>
          <Eyebrow>{t("steps.eyebrow")}</Eyebrow>
        </ScrollReveal>
        <ol className="mt-8 grid gap-10 md:gap-12 max-w-3xl">
          {steps.map((step, i) => (
            <ScrollReveal key={i} delay={0.05 + i * 0.05}>
              <li className="grid grid-cols-[auto_1fr] gap-6 border-l border-accent pl-6">
                <span className="font-serif text-2xl text-accent tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="font-sans font-medium text-text-primary text-lg leading-snug">
                    {step.title}
                  </h2>
                  <p className="mt-3 text-text-secondary leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </li>
            </ScrollReveal>
          ))}
        </ol>
      </Section>

      <Section>
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
              </article>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      <Section tone="secondary">
        <ScrollReveal>
          <Eyebrow>{t("fit.eyebrow")}</Eyebrow>
        </ScrollReveal>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
          <ScrollReveal delay={0.05}>
            <div>
              <h3 className="font-sans font-medium text-text-primary text-lg mb-6">
                {t("fit.forYouTitle")}
              </h3>
              <ul className="space-y-4 text-text-secondary leading-relaxed">
                {forYou.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span aria-hidden="true" className="text-accent shrink-0 mt-1">
                      ·
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="border-l border-accent pl-8">
              <h3 className="font-sans font-medium text-text-primary text-lg mb-6">
                {t("fit.notForYouTitle")}
              </h3>
              <ul className="space-y-4 text-text-secondary leading-relaxed">
                {notForYou.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span aria-hidden="true" className="text-text-muted shrink-0 mt-1">
                      ·
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </Section>

      <Section id="anfrage">
        <div className="max-w-3xl">
          <ScrollReveal>
            <Eyebrow>{t("request.eyebrow")}</Eyebrow>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="font-serif font-semibold tracking-[-0.02em] leading-[1.1] text-text-primary text-[clamp(1.875rem,4vw,3rem)]">
              {t("request.headline")}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-8 text-text-secondary leading-relaxed max-w-[60ch]">
              {t("request.body")}
            </p>
          </ScrollReveal>

          <ol className="mt-12 space-y-8">
            {questions.map((q, i) => (
              <ScrollReveal key={i} delay={0.05 + i * 0.04}>
                <li className="grid grid-cols-[auto_1fr] gap-5">
                  <span className="font-serif text-xl text-accent tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-sans font-medium text-text-primary leading-snug">
                      {q.title}
                    </p>
                    {q.body && (
                      <p className="mt-2 text-text-secondary leading-relaxed">
                        {q.body}
                      </p>
                    )}
                  </div>
                </li>
              </ScrollReveal>
            ))}
          </ol>

          <ScrollReveal delay={0.2}>
            <div className="mt-14">
              <a href={mailto} className={buttonStyles({ variant: "primary", size: "lg" })}>
                {t("request.cta")}
              </a>
              <p className="mt-6 text-sm text-text-muted">{t("request.subtext")}</p>
            </div>
          </ScrollReveal>
        </div>
      </Section>

      <Section tone="secondary">
        <ScrollReveal>
          <Eyebrow>{t("faq.eyebrow")}</Eyebrow>
        </ScrollReveal>
        <ul className="mt-10 max-w-3xl divide-y divide-border-strong">
          {faqs.map((item, i) => (
            <ScrollReveal key={i} delay={0.05 + i * 0.04}>
              <li>
                <details className="group py-6">
                  <summary className="cursor-pointer list-none flex items-center justify-between gap-6 text-text-primary font-sans font-medium leading-snug">
                    <span>{item.q}</span>
                    <span
                      aria-hidden="true"
                      className="text-accent text-xl transition-transform duration-200 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-4 text-text-secondary leading-relaxed max-w-[65ch]">
                    {item.a}
                  </p>
                </details>
              </li>
            </ScrollReveal>
          ))}
        </ul>
      </Section>
    </>
  );
}
