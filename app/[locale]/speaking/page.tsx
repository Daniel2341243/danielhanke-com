import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { Section, Eyebrow } from "@/components/ui/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { buttonStyles } from "@/components/ui/Button";
import { buildSpeakingMailto } from "@/lib/speakingMailto";
import { siteConfig } from "@/lib/siteConfig";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";
import { ArrowRight, Play } from "lucide-react";

type Offer = { title: string; body: string };
type Keynote = { title: string; body: string; fit: string; videoTopic: string };
type Workshop = {
  title: string;
  format: string;
  body: string;
  result: string;
  fit: string;
};
type VideoSlot = { category: string };

/**
 * YouTube-Video-IDs für die Keynote-Embeds.
 * Hier kannst du nach und nach die passenden YouTube-Video-IDs eintragen.
 * Lass das Feld leer (""), solange noch kein Video ausgewählt ist —
 * dann wird automatisch eine Platzhalter-Card angezeigt.
 *
 * Reihenfolge entspricht der Reihenfolge der Keynotes in den Translations
 * (i18n/messages/de.json → speakingPage.keynotes.items).
 */
const KEYNOTE_VIDEO_IDS: string[] = [
  "", // 1. Du bist nicht schüchtern. Dein System schützt dich.
  "", // 2. Die Fassade hält. Der Mann dahinter nicht.
  "", // 3. Das Ja, das dich auffrisst.
  "", // 4. Selbstwert, der nicht von außen kommt.
  "", // 5. Kein Alpha, kein Opfer.
];

/**
 * YouTube-Video-IDs für das Proof-Grid (Sektion "Schau dir an, wie ich denke…").
 * Reihenfolge entspricht speakingPage.proof.videos in den Translations.
 */
const PROOF_VIDEO_IDS: string[] = [
  "", // Inner Stability
  "", // Selbstdisziplin
  "", // People-Pleasing & Grenzen
  "", // Selbstwert & Bestätigung
  "", // Moderne Männlichkeit
  "", // Dating & Nähe
];

/**
 * Speaker-One-Pager (PDF).
 * Sobald du eine PDF unter /public/speaker-one-pager.pdf hochlädst,
 * setze ONEPAGER_URL auf "/speaker-one-pager.pdf".
 */
const ONEPAGER_URL: string | null = null;

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/speaking">): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale: locale as Locale,
    pathname: "/speaking",
    titleKey: "speakingTitle",
    descriptionKey: "speakingDescription",
  });
}

export default async function SpeakingPage({
  params,
}: PageProps<"/[locale]/speaking">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("speakingPage");
  const mailto = buildSpeakingMailto(locale);

  const offers = t.raw("offers.items") as Offer[];
  const keynotes = t.raw("keynotes.items") as Keynote[];
  const workshops = t.raw("workshops.items") as Workshop[];
  const podcastTopics = t.raw("podcast.topics") as string[];
  const proofVideos = t.raw("proof.videos") as VideoSlot[];
  const forItems = t.raw("fit.forItems") as string[];
  const notForItems = t.raw("fit.notForItems") as string[];
  const formats = t.raw("logistics.formats") as string[];
  const requestFields = t.raw("request.fields") as string[];

  return (
    <>
      {/* HERO */}
      <section className="pt-12 md:pt-20 pb-20 md:pb-28">
        <div className="mx-auto max-w-screen px-6 md:px-12 lg:px-20 max-w-4xl">
          <ScrollReveal>
            <Eyebrow>{t("hero.eyebrow")}</Eyebrow>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h1 className="font-serif font-semibold tracking-[-0.02em] leading-[1.05] text-text-primary text-[clamp(2.5rem,6vw,5rem)]">
              {t("hero.headline")}
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-8 font-serif italic text-text-primary text-[clamp(1.25rem,2.5vw,1.75rem)] leading-[1.4] max-w-[55ch]">
              {t("hero.subline")}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="mt-8 text-lg text-text-secondary max-w-[62ch] leading-relaxed">
              {t("hero.body")}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <a
                href="#anfrage"
                className={buttonStyles({ variant: "primary", size: "lg" })}
              >
                {t("hero.ctaPrimary")}
              </a>
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonStyles({ variant: "ghost", size: "lg" })}
              >
                {t("hero.ctaSecondary")}
              </a>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <p className="mt-14 text-xs text-text-muted leading-relaxed max-w-[70ch]">
              {t("hero.proof")}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* INTRO */}
      <Section tone="secondary">
        <div className="max-w-3xl">
          <ScrollReveal>
            <Eyebrow>{t("intro.eyebrow")}</Eyebrow>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="font-serif font-semibold tracking-[-0.02em] leading-[1.1] text-text-primary text-[clamp(1.875rem,4vw,3rem)]">
              {t("intro.headline")}
            </h2>
          </ScrollReveal>
          <div className="mt-10 space-y-6 text-text-secondary leading-relaxed">
            <ScrollReveal delay={0.1}>
              <p>{t("intro.body1")}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <p>{t("intro.body2")}</p>
            </ScrollReveal>
          </div>
        </div>
      </Section>

      {/* 3 OFFERS */}
      <Section>
        <ScrollReveal>
          <Eyebrow>{t("offers.eyebrow")}</Eyebrow>
        </ScrollReveal>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {offers.map((o, i) => (
            <ScrollReveal key={i} delay={0.05 + i * 0.05}>
              <article className="h-full border border-border bg-bg-elevated p-8 md:p-10">
                <h3 className="font-serif text-2xl text-text-primary leading-snug tracking-[-0.01em]">
                  {o.title}
                </h3>
                <p className="mt-5 text-text-secondary leading-relaxed">
                  {o.body}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* 5 KEYNOTES */}
      <Section tone="secondary">
        <ScrollReveal>
          <Eyebrow>{t("keynotes.eyebrow")}</Eyebrow>
        </ScrollReveal>
        <ScrollReveal delay={0.05}>
          <h2 className="mt-2 font-serif font-semibold tracking-[-0.02em] leading-[1.1] text-text-primary text-[clamp(1.875rem,4vw,3rem)] max-w-3xl">
            {t("keynotes.headline")}
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className="mt-8 text-text-secondary leading-relaxed max-w-[62ch]">
            {t("keynotes.intro")}
          </p>
        </ScrollReveal>

        <ol className="mt-16 space-y-20 md:space-y-24">
          {keynotes.map((k, i) => {
            const videoId = KEYNOTE_VIDEO_IDS[i] ?? "";
            return (
              <ScrollReveal key={i} delay={0.05}>
                <li className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
                  <div className="lg:col-span-7 border-l border-accent pl-6 md:pl-8">
                    <span className="font-serif text-xl text-accent tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 font-serif text-text-primary leading-[1.15] tracking-[-0.01em] text-[clamp(1.5rem,2.5vw,2rem)]">
                      {k.title}
                    </h3>
                    <p className="mt-6 text-text-secondary leading-relaxed">
                      {k.body}
                    </p>
                    <div className="mt-6">
                      <p className="text-xs uppercase tracking-[0.12em] text-text-muted">
                        {t("keynotes.suitableFor")}
                      </p>
                      <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                        {k.fit}
                      </p>
                    </div>
                  </div>
                  <div className="lg:col-span-5">
                    <p className="text-xs uppercase tracking-[0.12em] text-text-muted mb-4">
                      {t("keynotes.videoLabel")}
                    </p>
                    {videoId ? (
                      <YouTubeEmbed videoId={videoId} title={k.title} />
                    ) : (
                      <VideoPlaceholder
                        topic={k.videoTopic}
                        hint={t("keynotes.videoPlaceholderHint")}
                      />
                    )}
                  </div>
                </li>
              </ScrollReveal>
            );
          })}
        </ol>

        <ScrollReveal delay={0.1}>
          <p className="mt-16 text-sm text-text-muted leading-relaxed max-w-[62ch] border-t border-border-strong pt-8">
            {t("keynotes.reserve")}
          </p>
        </ScrollReveal>
      </Section>

      {/* 3 WORKSHOPS */}
      <Section>
        <ScrollReveal>
          <Eyebrow>{t("workshops.eyebrow")}</Eyebrow>
        </ScrollReveal>
        <ScrollReveal delay={0.05}>
          <h2 className="mt-2 font-serif font-semibold tracking-[-0.02em] leading-[1.1] text-text-primary text-[clamp(1.875rem,4vw,3rem)] max-w-3xl">
            {t("workshops.headline")}
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className="mt-8 text-text-secondary leading-relaxed max-w-[62ch]">
            {t("workshops.intro")}
          </p>
        </ScrollReveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {workshops.map((w, i) => (
            <ScrollReveal key={i} delay={0.05 + i * 0.05}>
              <article className="h-full border border-border bg-bg-elevated p-8 md:p-10 flex flex-col">
                <span className="font-serif text-base text-accent tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-serif text-xl md:text-2xl text-text-primary leading-snug tracking-[-0.01em]">
                  {w.title}
                </h3>
                <p className="mt-3 text-xs uppercase tracking-[0.12em] text-text-muted">
                  {t("workshops.formatLabel")} {w.format}
                </p>
                <p className="mt-6 text-text-secondary leading-relaxed">
                  {w.body}
                </p>
                <div className="mt-6">
                  <p className="text-xs uppercase tracking-[0.12em] text-accent">
                    {t("workshops.resultLabel")}
                  </p>
                  <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                    {w.result}
                  </p>
                </div>
                <div className="mt-6 pt-6 border-t border-border-strong">
                  <p className="text-xs uppercase tracking-[0.12em] text-text-muted">
                    {t("workshops.fitLabel")}
                  </p>
                  <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                    {w.fit}
                  </p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* PODCAST & MEDIA */}
      <Section tone="tinted">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <ScrollReveal>
              <Eyebrow>{t("podcast.eyebrow")}</Eyebrow>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h2 className="font-serif font-semibold tracking-[-0.02em] leading-[1.1] text-text-primary text-[clamp(1.875rem,4vw,3rem)]">
                {t("podcast.headline")}
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="mt-6 font-serif italic text-text-primary text-lg leading-relaxed">
                {t("podcast.subline")}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <p className="mt-6 text-text-secondary leading-relaxed">
                {t("podcast.body")}
              </p>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-7">
            <ScrollReveal delay={0.1}>
              <p className="text-xs uppercase tracking-[0.12em] text-text-muted mb-8">
                {t("podcast.topicsHeadline")}
              </p>
            </ScrollReveal>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
              {podcastTopics.map((topic, i) => (
                <ScrollReveal key={i} delay={0.05 + i * 0.02}>
                  <li className="flex gap-3 text-text-secondary leading-relaxed">
                    <span aria-hidden="true" className="text-accent shrink-0 mt-1.5 text-xs">
                      ◦
                    </span>
                    <span className="text-sm md:text-base">{topic}</span>
                  </li>
                </ScrollReveal>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* YOUTUBE PROOF */}
      <Section>
        <div className="max-w-3xl">
          <ScrollReveal>
            <Eyebrow>{t("proof.eyebrow")}</Eyebrow>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="font-serif font-semibold tracking-[-0.02em] leading-[1.1] text-text-primary text-[clamp(1.875rem,4vw,3rem)]">
              {t("proof.headline")}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-8 text-text-secondary leading-relaxed">
              {t("proof.body")}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="mt-10">
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonStyles({ variant: "primary", size: "lg" })}
              >
                {t("proof.cta")}
              </a>
            </div>
          </ScrollReveal>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {proofVideos.map((v, i) => {
            const videoId = PROOF_VIDEO_IDS[i] ?? "";
            return (
              <ScrollReveal key={i} delay={0.05 + i * 0.04}>
                <figure>
                  {videoId ? (
                    <YouTubeEmbed videoId={videoId} title={v.category} />
                  ) : (
                    <VideoPlaceholder
                      topic={v.category}
                      hint={t("proof.videoPlaceholderHint")}
                    />
                  )}
                  <figcaption className="mt-3 text-xs uppercase tracking-[0.12em] text-text-muted">
                    {v.category}
                  </figcaption>
                </figure>
              </ScrollReveal>
            );
          })}
        </div>
      </Section>

      {/* FOR WHOM */}
      <Section tone="secondary">
        <ScrollReveal>
          <Eyebrow>{t("fit.eyebrow")}</Eyebrow>
        </ScrollReveal>
        <ScrollReveal delay={0.05}>
          <h2 className="mt-2 font-serif font-semibold tracking-[-0.02em] leading-[1.1] text-text-primary text-[clamp(1.875rem,4vw,3rem)] max-w-3xl">
            {t("fit.headline")}
          </h2>
        </ScrollReveal>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
          <ScrollReveal delay={0.05}>
            <div>
              <h3 className="font-sans font-medium text-text-primary text-lg mb-6">
                {t("fit.forTitle")}
              </h3>
              <ul className="space-y-4 text-text-secondary leading-relaxed">
                {forItems.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span aria-hidden="true" className="text-accent shrink-0 mt-1">
                      ·
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="border-l border-accent pl-8">
              <h3 className="font-sans font-medium text-text-primary text-lg mb-6">
                {t("fit.notForTitle")}
              </h3>
              <ul className="space-y-4 text-text-secondary leading-relaxed">
                {notForItems.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span aria-hidden="true" className="text-text-muted shrink-0 mt-1">
                      ·
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </Section>

      {/* LOGISTICS */}
      <Section>
        <ScrollReveal>
          <Eyebrow>{t("logistics.eyebrow")}</Eyebrow>
        </ScrollReveal>
        <ScrollReveal delay={0.05}>
          <h2 className="mt-2 font-serif font-semibold tracking-[-0.02em] leading-[1.1] text-text-primary text-[clamp(1.875rem,4vw,3rem)] max-w-3xl">
            {t("logistics.headline")}
          </h2>
        </ScrollReveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          <ScrollReveal delay={0.05}>
            <article className="border border-border bg-bg-elevated p-8 h-full">
              <p className="text-xs uppercase tracking-[0.12em] text-accent">
                {t("logistics.formatsTitle")}
              </p>
              <ul className="mt-6 space-y-3 text-text-secondary leading-relaxed">
                {formats.map((f, i) => (
                  <li key={i} className="flex gap-3">
                    <span aria-hidden="true" className="text-text-muted shrink-0 mt-1.5 text-xs">
                      ◦
                    </span>
                    <span className="text-sm">{f}</span>
                  </li>
                ))}
              </ul>
            </article>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <article className="border border-border bg-bg-elevated p-8 h-full">
              <p className="text-xs uppercase tracking-[0.12em] text-accent">
                {t("logistics.languageTitle")}
              </p>
              <p className="mt-6 text-text-secondary leading-relaxed">
                {t("logistics.language")}
              </p>
              <p className="mt-10 text-xs uppercase tracking-[0.12em] text-accent">
                {t("logistics.locationTitle")}
              </p>
              <p className="mt-6 text-text-secondary leading-relaxed text-sm">
                {t("logistics.location")}
              </p>
            </article>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <article className="border border-border bg-bg-elevated p-8 h-full flex flex-col">
              <p className="text-xs uppercase tracking-[0.12em] text-accent">
                {t("logistics.onepagerTitle")}
              </p>
              <p className="mt-6 text-sm text-text-muted leading-relaxed">
                {t("logistics.onepagerNote")}
              </p>
              <div className="mt-auto pt-8">
                {ONEPAGER_URL ? (
                  <a
                    href={ONEPAGER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonStyles({ variant: "primary" })}
                  >
                    {t("logistics.onepagerCta")}
                  </a>
                ) : (
                  // TODO: Sobald die Speaker-One-Pager-PDF unter /public/speaker-one-pager.pdf
                  // liegt, ONEPAGER_URL oben auf "/speaker-one-pager.pdf" setzen.
                  <span
                    aria-disabled="true"
                    className="inline-flex items-center justify-center px-6 py-3 text-xs uppercase tracking-[0.12em] font-medium text-text-muted border border-border-strong cursor-not-allowed select-none"
                  >
                    {t("logistics.onepagerCta")}
                  </span>
                )}
              </div>
            </article>
          </ScrollReveal>
        </div>
      </Section>

      {/* ANFRAGE */}
      <Section tone="secondary" id="anfrage">
        <div className="max-w-3xl">
          <ScrollReveal>
            <Eyebrow>{t("request.eyebrow")}</Eyebrow>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="font-serif font-semibold tracking-[-0.02em] leading-[1.1] text-text-primary text-[clamp(1.875rem,4vw,3rem)]">
              {t("request.headline")}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-8 text-text-secondary leading-relaxed max-w-[62ch]">
              {t("request.body")}
            </p>
          </ScrollReveal>

          <ol className="mt-12 space-y-5">
            {requestFields.map((field, i) => (
              <ScrollReveal key={i} delay={0.03 + i * 0.03}>
                <li className="grid grid-cols-[auto_1fr] gap-5">
                  <span className="font-serif text-base text-accent tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-text-secondary leading-relaxed">{field}</p>
                </li>
              </ScrollReveal>
            ))}
          </ol>

          <ScrollReveal delay={0.2}>
            <div className="mt-14 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <a
                href={mailto}
                className={buttonStyles({ variant: "primary", size: "lg" })}
              >
                {t("request.cta")}
                <ArrowRight className="size-4 ml-2" aria-hidden="true" />
              </a>
              <Link
                href="/"
                className="text-sm text-text-secondary hover:text-accent border-b border-transparent hover:border-accent pb-1 transition-colors duration-200"
              >
                ← Daniel Hanke
              </Link>
            </div>
            <p className="mt-6 text-sm text-text-muted">{t("request.subtext")}</p>
          </ScrollReveal>
        </div>
      </Section>
    </>
  );
}

/**
 * Platzhalter-Card für nicht ausgewählte YouTube-Videos.
 * Wird automatisch ersetzt, sobald in KEYNOTE_VIDEO_IDS bzw. PROOF_VIDEO_IDS
 * eine gültige Video-ID eingetragen wird.
 */
function VideoPlaceholder({ topic, hint }: { topic: string; hint: string }) {
  return (
    <div
      role="img"
      aria-label={`YouTube-Video-Platzhalter: ${topic}`}
      className="relative aspect-video bg-bg-elevated border border-dashed border-border-strong overflow-hidden"
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 gap-4">
        <span className="size-12 md:size-14 rounded-full border border-text-muted/40 flex items-center justify-center text-text-muted">
          <Play className="size-5 ml-0.5" aria-hidden="true" />
        </span>
        <p className="text-xs uppercase tracking-[0.14em] text-text-muted">
          {hint}
        </p>
        <p className="text-sm text-text-secondary leading-relaxed max-w-[28ch]">
          {topic}
        </p>
      </div>
    </div>
  );
}

