import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Section, Eyebrow } from "@/components/ui/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { ArrowRight } from "lucide-react";

export function Approach() {
  const t = useTranslations("home.approach");

  return (
    <Section>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <div className="lg:col-span-7 max-w-[55ch]">
          <ScrollReveal>
            <Eyebrow>{t("eyebrow")}</Eyebrow>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="font-serif font-semibold tracking-[-0.02em] leading-[1.1] text-text-primary text-[clamp(1.875rem,4vw,3rem)]">
              <span className="block">{t("headlinePart1")}</span>
              <span className="block italic">{t("headlinePart2")}</span>
            </h2>
          </ScrollReveal>
          <div className="mt-10 space-y-6 text-text-secondary leading-relaxed">
            <ScrollReveal delay={0.1}>
              <p>{t("body1")}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <p>{t("body2")}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p>{t("body3")}</p>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={0.25}>
            <div className="mt-10">
              <Link
                href="/coaching"
                className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent-hover border-b border-accent pb-1 transition-colors duration-200"
              >
                {t("cta")}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </ScrollReveal>
        </div>

        <div className="lg:col-span-5">
          <ScrollReveal delay={0.1}>
            <PhotoPlaceholder
              aspect="portrait"
              alt={t("imageAlt")}
              slot="Approach · Coaching"
              dimensions="1200 × 1600 px"
              className="lg:max-w-sm lg:ml-auto"
            />
          </ScrollReveal>
        </div>
      </div>
    </Section>
  );
}
