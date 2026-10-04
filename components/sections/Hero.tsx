import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { buttonStyles } from "@/components/ui/Button";
import { siteConfig } from "@/lib/siteConfig";

export function Hero() {
  const t = useTranslations("home.hero");

  return (
    <section className="pt-10 md:pt-16 pb-20 md:pb-28">
      <div className="mx-auto max-w-screen px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7">
              <p className="text-sm tracking-[0.08em] text-text-muted">
                {t("eyebrow")}
              </p>
              <h1 className="mt-6 font-serif font-medium tracking-[-0.03em] leading-[0.98] text-text-primary text-[clamp(3.25rem,9vw,7.5rem)]">
                Daniel Hanke
              </h1>
              <p className="mt-6 font-serif italic text-text-primary text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.25] tracking-[-0.01em]">
                {t("tagline")}
              </p>
              <p className="mt-8 text-lg text-text-secondary max-w-[54ch] leading-relaxed">
                {t("body")}
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:items-center">
                <Link
                  href="/newsletter"
                  className={buttonStyles({ variant: "primary", size: "lg" })}
                >
                  {t("ctaNewsletter")}
                </Link>
                <a
                  href={siteConfig.practice.home}
                  target="_blank"
                  rel="noopener"
                  className={buttonStyles({ variant: "secondary", size: "lg" })}
                >
                  {t("ctaPractice")}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              </div>
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-1.5 text-sm text-text-secondary underline underline-offset-4 decoration-border-strong hover:text-accent hover:decoration-accent"
              >
                {t("youtubeLink")}
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </a>
          </div>

          <div className="lg:col-span-5">
              <Image
                src="/daniel-hanke.jpg"
                alt={t("imageAlt")}
                width={1856}
                height={2254}
                preload
                sizes="(min-width: 1024px) 26rem, (min-width: 640px) 60vw, 100vw"
                className="w-full max-w-md h-auto lg:ml-auto"
              />
          </div>
        </div>
      </div>
    </section>
  );
}
