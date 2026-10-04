import { getTranslations } from "next-intl/server";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Section, Eyebrow } from "@/components/ui/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { VideoGrid } from "@/components/VideoGrid";
import { siteConfig } from "@/lib/siteConfig";
import { getLatestVideos } from "@/lib/youtube";

export async function LatestVideos() {
  const t = await getTranslations("home.videos");
  const videos = await getLatestVideos(3);

  return (
    <Section>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <ScrollReveal>
            <Eyebrow>{t("eyebrow")}</Eyebrow>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="font-serif font-medium tracking-[-0.02em] leading-[1.1] text-text-primary text-[clamp(1.875rem,3.6vw,2.75rem)]">
              {t("headline")}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-4 text-text-secondary leading-relaxed max-w-[52ch]">
              {t("intro")}
            </p>
          </ScrollReveal>
        </div>
        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <Link
              href="/inhalte"
              className="inline-flex items-center gap-1.5 text-text-primary border-b border-text-primary pb-0.5 hover:text-accent hover:border-accent"
            >
              {t("ctaAll")}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <a
              href={siteConfig.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-text-secondary border-b border-border-strong pb-0.5 hover:text-accent hover:border-accent"
            >
              {t("ctaChannel")}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </ScrollReveal>
      </div>

      <div className="mt-12 md:mt-16">
        <VideoGrid videos={videos} />
      </div>
    </Section>
  );
}
