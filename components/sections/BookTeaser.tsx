import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Section, Eyebrow } from "@/components/ui/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { buttonStyles } from "@/components/ui/Button";
import { siteConfig } from "@/lib/siteConfig";
import { ArrowRight } from "lucide-react";

export function BookTeaser() {
  const t = useTranslations("home.book");

  return (
    <Section>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-4">
          <ScrollReveal>
            <PhotoPlaceholder
              aspect="portrait"
              alt={t("coverAlt")}
              caption="Cover folgt"
              className="max-w-[280px] mx-auto lg:mx-0 shadow-2xl"
            />
          </ScrollReveal>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <ScrollReveal>
            <Eyebrow>{t("eyebrow")}</Eyebrow>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="font-serif italic font-semibold tracking-[-0.02em] leading-[1.1] text-text-primary text-[clamp(1.875rem,4vw,3rem)]">
              {t("title")}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-8 text-text-secondary leading-relaxed max-w-[55ch]">
              {t("body")}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:items-center">
              <a
                href={siteConfig.social.amazon}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonStyles({ variant: "primary" })}
              >
                {t("ctaPrimary")}
              </a>
              <Link
                href="/buch"
                className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors duration-200"
              >
                {t("ctaGhost")}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </Section>
  );
}
