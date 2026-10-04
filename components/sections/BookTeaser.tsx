import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Section, Eyebrow } from "@/components/ui/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function BookTeaser() {
  const t = useTranslations("home.book");

  return (
    <Section>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
        <div className="md:col-span-4">
          <ScrollReveal>
            <Image
              src="/selbstdisziplin-2-0.png"
              alt={t("coverAlt")}
              width={800}
              height={1200}
              sizes="(min-width: 768px) 16rem, 60vw"
              className="max-w-[240px] w-full h-auto mx-auto md:mx-0 shadow-[0_24px_48px_-16px_rgba(27,25,22,0.35)]"
            />
          </ScrollReveal>
        </div>
        <div className="md:col-span-8">
          <ScrollReveal>
            <Eyebrow>{t("eyebrow")}</Eyebrow>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="font-serif italic font-medium tracking-[-0.02em] leading-[1.1] text-text-primary text-[clamp(1.875rem,3.6vw,2.75rem)]">
              {t("title")}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-6 text-text-secondary leading-relaxed max-w-[58ch]">
              {t("body")}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <Link
              href="/buch"
              className="mt-8 inline-flex items-center gap-1.5 text-sm text-text-primary border-b border-text-primary pb-0.5 hover:text-accent hover:border-accent"
            >
              {t("cta")}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </Section>
  );
}
