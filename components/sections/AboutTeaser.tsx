import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Section, Eyebrow } from "@/components/ui/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function AboutTeaser() {
  const t = useTranslations("home.about");

  return (
    <Section className="border-t border-border-strong">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
        <div className="md:col-span-7 md:order-1 order-2">
          <ScrollReveal>
            <Eyebrow>{t("eyebrow")}</Eyebrow>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="font-serif font-medium tracking-[-0.02em] leading-[1.1] text-text-primary text-[clamp(1.875rem,3.6vw,2.75rem)]">
              {t("headline")}
            </h2>
          </ScrollReveal>
          <div className="mt-6 space-y-5 text-text-secondary leading-relaxed max-w-[58ch]">
            <ScrollReveal delay={0.1}>
              <p>{t("body1")}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.12}>
              <p>{t("body2")}</p>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={0.15}>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm">
              <Link
                href="/ueber-mich"
                className="inline-flex items-center gap-1.5 text-text-primary border-b border-text-primary pb-0.5 hover:text-accent hover:border-accent"
              >
                {t("cta")}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/speaking"
                className="inline-flex items-center gap-1.5 text-text-secondary border-b border-border-strong pb-0.5 hover:text-accent hover:border-accent"
              >
                {t("ctaSpeaking")}
              </Link>
            </div>
          </ScrollReveal>
        </div>
        <div className="md:col-span-5 md:order-2 order-1">
          <ScrollReveal>
            <Image
              src="/daniel-hanke-portrait.jpg"
              alt={t("imageAlt")}
              width={1807}
              height={2212}
              sizes="(min-width: 768px) 24rem, 100vw"
              className="w-full max-w-sm h-auto md:ml-auto"
            />
          </ScrollReveal>
        </div>
      </div>
    </Section>
  );
}
