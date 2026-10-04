import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Section, Eyebrow } from "@/components/ui/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ConvertKitForm } from "@/components/ConvertKitForm";
import { siteConfig } from "@/lib/siteConfig";

export function NewsletterFineprint({ className }: { className?: string }) {
  const t = useTranslations("newsletterForm");
  return (
    <p className={className ?? "mt-5 text-sm text-text-muted"}>
      {t.rich("fineprint", {
        privacyLink: (chunks) => (
          <Link
            href="/datenschutz"
            className="underline underline-offset-4 hover:text-accent"
          >
            {chunks}
          </Link>
        ),
      })}
    </p>
  );
}

/**
 * The one newsletter signup block. `feature` is the large home/hub version,
 * `compact` closes sub-pages.
 */
export function NewsletterCta({
  variant = "compact",
  idPrefix,
}: {
  variant?: "feature" | "compact";
  idPrefix: string;
}) {
  const t = useTranslations("newsletterForm");
  const formId = siteConfig.convertKit.newsletterFormId;
  const isFeature = variant === "feature";

  return (
    <Section tone="tinted" id="newsletter">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
        <div className="lg:col-span-6">
          <ScrollReveal>
            <Eyebrow>{t("eyebrow")}</Eyebrow>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="font-serif font-medium tracking-[-0.02em] leading-[1.08] text-text-primary text-[clamp(2rem,4.4vw,3.5rem)]">
              {t("headline")}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-6 text-lg text-text-secondary leading-relaxed max-w-[52ch]">
              {isFeature ? t("bodyLong") : t("body")}
            </p>
          </ScrollReveal>
        </div>
        <div className="lg:col-span-6">
          <ScrollReveal delay={0.15}>
            <ConvertKitForm
              formId={formId}
              idPrefix={idPrefix}
              layout="stack"
              submitLabel={t("submit")}
              firstNamePlaceholder={t("firstNamePlaceholder")}
              emailPlaceholder={t("emailPlaceholder")}
            />
            <NewsletterFineprint />
            {!isFeature && (
              <Link
                href="/newsletter"
                className="mt-4 inline-block text-sm text-text-secondary underline underline-offset-4 hover:text-accent"
              >
                {t("moreLink")}
              </Link>
            )}
          </ScrollReveal>
        </div>
      </div>
    </Section>
  );
}
