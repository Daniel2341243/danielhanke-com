import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { siteConfig } from "@/lib/siteConfig";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/willkommen">): Promise<Metadata> {
  const { locale } = await params;
  const base = await buildPageMetadata({
    locale: locale as Locale,
    pathname: "/willkommen",
    titleKey: "willkommenTitle",
    descriptionKey: "willkommenDescription",
  });
  return { ...base, robots: { index: false, follow: true } };
}

export default async function WillkommenPage({
  params,
}: PageProps<"/[locale]/willkommen">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("willkommenPage");

  return (
    <section className="min-h-[80vh] flex items-center bg-bg-primary py-20 md:py-28">
      <div className="mx-auto w-full max-w-screen px-6 md:px-12 lg:px-20">
        <article className="max-w-[640px] mx-auto text-center">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[0.16em] text-accent font-medium">
              ✓ {t("subheadline")}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <h1 className="mt-6 font-serif italic font-semibold tracking-[-0.02em] leading-[1.05] text-text-primary text-[clamp(2.5rem,6vw,4rem)]">
              {t("headline")}
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="mt-10 text-lg text-text-secondary leading-relaxed max-w-[52ch] mx-auto">
              {t("body1")}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <p className="mt-6 text-lg text-text-secondary leading-relaxed max-w-[52ch] mx-auto">
              {t("body2")}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="mt-10 text-sm text-text-muted leading-relaxed max-w-[48ch] mx-auto">
              {t("spam")}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center justify-center px-8 py-4 text-sm uppercase tracking-[0.12em] font-medium bg-text-primary text-bg-primary rounded-sm transition-colors duration-200 hover:bg-accent hover:text-bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent w-full sm:w-auto"
              >
                {t("ctaPrimary")}
              </Link>
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 text-sm uppercase tracking-[0.12em] font-medium text-text-primary border border-border-strong rounded-sm transition-colors duration-200 hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent w-full sm:w-auto"
              >
                {t("ctaSecondary")}
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.35}>
            <footer className="mt-20 pt-10 border-t border-border">
              <p className="font-serif italic text-text-primary text-base">
                {t("footerName")}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.14em] text-text-muted">
                {t("footerTagline")}
              </p>
            </footer>
          </ScrollReveal>
        </article>
      </div>
    </section>
  );
}
