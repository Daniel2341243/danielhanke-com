import type { Metadata } from "next";
import { Construction } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { ConvertKitForm } from "@/components/ConvertKitForm";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { siteConfig } from "@/lib/siteConfig";

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

  return (
    <section className="min-h-[calc(100vh-5rem)] flex items-center justify-center py-24 md:py-32">
      <div className="mx-auto max-w-screen px-6 md:px-12 lg:px-20 text-center max-w-2xl">
        <ScrollReveal>
          <span
            aria-hidden="true"
            className="inline-flex items-center justify-center text-accent animate-pulse-slow"
          >
            <Construction className="size-12 md:size-14" strokeWidth={1.25} />
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <p className="mt-10 text-xs uppercase tracking-[0.12em] text-accent">
            {t("eyebrow")}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.12}>
          <h1 className="mt-6 font-serif italic font-semibold tracking-[-0.02em] leading-[1.1] text-text-primary text-[clamp(2.5rem,6vw,4.5rem)]">
            {t("headline")}
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.18}>
          <p className="mt-8 text-text-secondary leading-relaxed max-w-[50ch] mx-auto">
            {t("body")}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <div className="mt-12 max-w-md mx-auto text-left">
            <ConvertKitForm
              formId={siteConfig.convertKit.communityWaitlistFormId}
              variant="card"
              fields={["email"]}
              submitLabel={t("submit")}
              emailPlaceholder={t("emailPlaceholder")}
              fineprint={t("fineprint")}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.32}>
          <p className="mt-10 text-sm text-text-muted">
            <Link
              href="/newsletter"
              className="text-text-secondary hover:text-accent transition-colors duration-200 underline-offset-4 hover:underline"
            >
              {t("newsletterCta")} →
            </Link>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
