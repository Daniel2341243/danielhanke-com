import { getTranslations } from "next-intl/server";
import { Section, Eyebrow } from "@/components/ui/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { siteConfig } from "@/lib/siteConfig";
import { getLatestVideo } from "@/lib/youtube";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";
import { ArrowRight } from "lucide-react";

export async function LatestVideo() {
  const t = await getTranslations("home.video");
  const video = await getLatestVideo();

  return (
    <Section tone="secondary">
      <ScrollReveal>
        <Eyebrow>{t("eyebrow")}</Eyebrow>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-7">
          <ScrollReveal delay={0.05}>
            <YouTubeEmbed videoId={video.videoId} title={video.title} />
          </ScrollReveal>
        </div>

        <div className="lg:col-span-5">
          <ScrollReveal delay={0.1}>
            <h2 className="font-serif italic font-medium text-text-primary text-[clamp(1.5rem,2.5vw,2rem)] leading-snug tracking-[-0.01em]">
              {video.title}
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
