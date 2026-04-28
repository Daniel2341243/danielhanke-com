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
import { Link } from "@/i18n/navigation";

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
  const expectations = t.raw("expectations.items") as Item[];
  const dontGet = t.raw("dontGet.items") as Item[];

  const fineprintRaw = t("form.fineprint");
  const linkText = t("form.privacyLinkText");
  const fineprintParts = fineprintRaw.split("{privacyLink}");

  return (
    <>
      <section className="pt-12 md:pt-20 pb-16 md:pb-24">
        <div className="mx-auto max-w-screen px-6 md:px-12 lg:px-20 max-w-3xl">
          <ScrollReveal>
            <Eyebrow>{t("hero.eyebrow")}</Eyebrow>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h1 className="font-serif italic font-semibold tracking-[-0.02em] leading-[1.05] text-text-primary text-[clamp(2.5rem,6vw,4.5rem)]">
              {t("hero.title")}
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-8 text-lg text-text-secondary max-w-[55ch] leading-relaxed">
              {t("hero.subline")}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <Section tone="secondary">
        <div className="max-w-3xl">
          <ScrollReveal>
            <h2 className="font-serif font-semibold tracking-[-0.02em] leading-[1.1] text-text-primary text-[clamp(1.5rem,3vw,2.25rem)]">
              {t("expectations.headline")}
            </h2>
          </ScrollReveal>
          <ol className="mt-12 space-y-10">
            {expectations.map((item, i) => (
              <ScrollReveal key={i} delay={0.05 + i * 0.05}>
                <li className="grid grid-cols-[auto_1fr] gap-5">
                  <span className="font-serif text-xl text-accent tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-sans font-medium text-text-primary leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-text-secondary leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </li>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </Section>

      <Section tone="tinted">
        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <ConvertKitForm
              formId={siteConfig.convertKit.newsletterFormId}
              variant="card"
              fields={["firstName", "email"]}
              submitLabel={t("form.submit")}
              firstNamePlaceholder={t("form.firstNamePlaceholder")}
              emailPlaceholder={t("form.emailPlaceholder")}
            />
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-6 text-xs text-text-muted text-center">
              {fineprintParts[0]}
              <Link
                href="/datenschutz"
                className="text-accent hover:text-accent-hover underline underline-offset-4"
              >
                {linkText}
              </Link>
              {fineprintParts[1]}
            </p>
          </ScrollReveal>
        </div>
      </Section>

      <Section>
        <div className="max-w-3xl">
          <ScrollReveal>
            <h2 className="font-serif font-semibold tracking-[-0.02em] leading-[1.1] text-text-primary text-[clamp(1.5rem,3vw,2.25rem)]">
              {t("dontGet.headline")}
            </h2>
          </ScrollReveal>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            {dontGet.map((item, i) => (
              <ScrollReveal key={i} delay={0.05 + i * 0.05}>
                <article className="border-l border-border-strong pl-5">
                  <h3 className="font-sans font-medium text-text-primary leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-text-secondary leading-relaxed text-sm">
                    {item.body}
                  </p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
