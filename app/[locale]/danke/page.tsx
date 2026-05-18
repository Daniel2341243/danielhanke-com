import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { buttonStyles } from "@/components/ui/Button";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/danke">): Promise<Metadata> {
  const { locale } = await params;
  const base = await buildPageMetadata({
    locale: locale as Locale,
    pathname: "/danke",
    titleKey: "newsletterThanksTitle",
    descriptionKey: "newsletterThanksDescription",
  });
  return { ...base, robots: { index: false, follow: true } };
}

export default async function NewsletterThanksPage({
  params,
}: PageProps<"/[locale]/danke">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("newsletterThanksPage");

  return (
    <section className="min-h-[80vh] flex items-center bg-bg-secondary py-20 md:py-28">
      <div className="mx-auto w-full max-w-screen px-6 md:px-12 lg:px-20">
        <div className="max-w-xl mx-auto">
          <ScrollReveal>
            <div className="border border-border bg-bg-elevated px-8 py-12 md:px-14 md:py-16 text-center">
              <h1 className="font-serif italic font-semibold tracking-[-0.02em] leading-[1.05] text-text-primary text-[clamp(2.25rem,5vw,3.5rem)]">
                {t("headline")}
              </h1>
              <p className="mt-8 text-text-secondary leading-relaxed max-w-[42ch] mx-auto">
                {t("body")}
              </p>
              <p className="mt-6 text-xs text-text-muted leading-relaxed max-w-[42ch] mx-auto">
                {t("spam")}
              </p>
              <div className="mt-12">
                <Link
                  href="/"
                  className={buttonStyles({ variant: "primary", size: "lg" })}
                >
                  {t("backToHome")}
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
