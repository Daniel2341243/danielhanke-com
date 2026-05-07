import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonStyles } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function Hero() {
  const t = useTranslations("home.hero");

  return (
    <section className="relative pt-12 md:pt-20 pb-24 md:pb-32">
      <div className="mx-auto max-w-screen px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <ScrollReveal>
              <Eyebrow>{t("eyebrow")}</Eyebrow>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h1 className="font-serif font-semibold tracking-[-0.02em] leading-[1.05] text-text-primary text-[clamp(2.5rem,6vw,5.25rem)]">
                <span className="block">{t("headlinePart1")}</span>
                <span className="block italic">{t("headlinePart2")}</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <p className="mt-8 text-lg text-text-secondary max-w-[60ch] leading-relaxed">
                {t("subline")}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.25}>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/coaching"
                  className={buttonStyles({ variant: "primary", size: "lg" })}
                >
                  {t("ctaPrimary")}
                </Link>
                <Link
                  href="/newsletter"
                  className={buttonStyles({ variant: "ghost", size: "lg" })}
                >
                  {t("ctaGhost")}
                </Link>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2 lg:-mt-28">
            <ScrollReveal delay={0.1}>
              <Image
                src="/daniel-hanke-hero.jpg"
                alt={t("imageAlt")}
                width={1856}
                height={2254}
                priority
                sizes="(min-width: 1024px) 28rem, 100vw"
                className="w-full h-auto lg:max-w-md lg:ml-auto"
              />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
