import { useTranslations } from "next-intl";
import { Section, Eyebrow } from "@/components/ui/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { buttonStyles } from "@/components/ui/Button";

export function NewsletterCta() {
  const t = useTranslations("home.newsletter");

  return (
    <Section tone="tinted">
      <div className="max-w-2xl mx-auto text-center">
        <ScrollReveal>
          <Eyebrow className="mx-auto inline-block">{t("eyebrow")}</Eyebrow>
        </ScrollReveal>
        <ScrollReveal delay={0.05}>
          <h2 className="font-serif font-semibold tracking-[-0.02em] leading-[1.1] text-text-primary text-[clamp(1.875rem,4vw,3rem)]">
            {t("headline")}
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className="mt-8 text-text-secondary leading-relaxed max-w-[55ch] mx-auto">
            {t("body")}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <form
            action="https://app.kit.com/forms/PLACEHOLDER_NEWSLETTER_FORM_ID/subscriptions"
            method="post"
            target="_blank"
            className="mt-10 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
          >
            <label className="sr-only" htmlFor="newsletter-firstname">
              {t("firstNamePlaceholder")}
            </label>
            <input
              id="newsletter-firstname"
              name="fields[first_name]"
              type="text"
              autoComplete="given-name"
              placeholder={t("firstNamePlaceholder")}
              className="flex-1 bg-transparent border border-border-strong px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
            />
            <label className="sr-only" htmlFor="newsletter-email">
              {t("emailPlaceholder")}
            </label>
            <input
              id="newsletter-email"
              name="email_address"
              type="email"
              required
              autoComplete="email"
              placeholder={t("emailPlaceholder")}
              className="flex-1 bg-transparent border border-border-strong px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
            />
            <button
              type="submit"
              className={buttonStyles({ variant: "primary" })}
            >
              {t("submit")}
            </button>
          </form>
        </ScrollReveal>
        <ScrollReveal delay={0.25}>
          <p className="mt-6 text-xs text-text-muted">{t("fineprint")}</p>
        </ScrollReveal>
      </div>
    </Section>
  );
}
