import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Quote } from "@/components/ui/Quote";
import { buttonStyles } from "@/components/ui/Button";

export function CoachingCta() {
  const t = useTranslations("home.outro");

  return (
    <Section>
      <div className="max-w-3xl mx-auto text-center">
        <ScrollReveal>
          <Quote
            className="text-[clamp(1.875rem,4vw,3rem)] tracking-[-0.02em] leading-[1.15]"
          >
            {t("headline")}
          </Quote>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <div className="mt-12">
            <Link
              href="/coaching"
              className={buttonStyles({ variant: "primary", size: "lg" })}
            >
              {t("cta")}
            </Link>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.25}>
          <p className="mt-6 text-xs text-text-muted">{t("subtext")}</p>
        </ScrollReveal>
      </div>
    </Section>
  );
}
