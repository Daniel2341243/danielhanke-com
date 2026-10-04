import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Section, Eyebrow } from "@/components/ui/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { buttonStyles } from "@/components/ui/Button";
import { siteConfig } from "@/lib/siteConfig";

/**
 * Short pointer to the practice website. Deliberately does not repeat
 * prices, formats or process — that all lives on act-beratung-berlin.de.
 */
export function PracticeTeaser() {
  const t = useTranslations("practiceTeaser");

  return (
    <Section tone="secondary">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
        <div className="lg:col-span-8">
          <ScrollReveal>
            <Eyebrow>{t("eyebrow")}</Eyebrow>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="font-serif font-medium tracking-[-0.02em] leading-[1.1] text-text-primary text-[clamp(1.875rem,3.6vw,2.75rem)]">
              {t("headline")}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-6 text-lg text-text-secondary leading-relaxed max-w-[58ch]">
              {t("body")}
            </p>
          </ScrollReveal>
        </div>
        <div className="lg:col-span-4 lg:text-right">
          <ScrollReveal delay={0.15}>
            <a
              href={siteConfig.practice.home}
              target="_blank"
              rel="noopener"
              className={buttonStyles({ variant: "primary", size: "lg" })}
            >
              {t("cta")}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
            <p className="mt-3 text-sm text-text-muted">act-beratung-berlin.de</p>
          </ScrollReveal>
        </div>
      </div>
    </Section>
  );
}
