import { useTranslations } from "next-intl";
import { Section, Eyebrow } from "@/components/ui/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { siteConfig } from "@/lib/siteConfig";
import { Play, ArrowRight } from "lucide-react";

export function LatestVideo() {
  const t = useTranslations("home.video");
  const { latestVideo } = siteConfig;

  return (
    <Section tone="secondary">
      <ScrollReveal>
        <Eyebrow>{t("eyebrow")}</Eyebrow>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-7">
          <ScrollReveal delay={0.05}>
            <a
              href={latestVideo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block relative aspect-video bg-bg-elevated border border-border-strong overflow-hidden focus-visible:outline-2 focus-visible:outline-accent"
              aria-label={latestVideo.title}
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-50 transition-opacity duration-300 group-hover:opacity-70"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(200,168,130,0.10), transparent 70%)",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="size-16 md:size-20 rounded-full border border-accent flex items-center justify-center text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-bg-primary">
                  <Play className="size-6 md:size-7 ml-1" aria-hidden="true" />
                </span>
              </div>
            </a>
          </ScrollReveal>
        </div>

        <div className="lg:col-span-5">
          <ScrollReveal delay={0.1}>
            <h2 className="font-serif italic font-medium text-text-primary text-[clamp(1.5rem,2.5vw,2rem)] leading-snug tracking-[-0.01em]">
              {latestVideo.title}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="mt-6 text-text-secondary leading-relaxed">
              {t("teaser")}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <a
              href={siteConfig.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-sm text-accent hover:text-accent-hover border-b border-accent pb-1 transition-colors duration-200"
            >
              {t("cta")}
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </ScrollReveal>
        </div>
      </div>
    </Section>
  );
}
