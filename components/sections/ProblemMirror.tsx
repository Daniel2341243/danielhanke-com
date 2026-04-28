import { useTranslations } from "next-intl";
import { Section, Eyebrow } from "@/components/ui/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

type Card = { title: string; body: string };

export function ProblemMirror() {
  const t = useTranslations("home.problem");
  const cards = t.raw("cards") as Card[];

  return (
    <Section tone="secondary">
      <ScrollReveal>
        <Eyebrow>{t("eyebrow")}</Eyebrow>
      </ScrollReveal>
      <ScrollReveal delay={0.05}>
        <h2 className="font-serif font-semibold tracking-[-0.02em] leading-[1.1] text-text-primary text-[clamp(1.875rem,4vw,3rem)] max-w-[20ch]">
          {t("headline")}
        </h2>
      </ScrollReveal>

      <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
        {cards.map((card, i) => (
          <ScrollReveal key={i} delay={0.1 + i * 0.08}>
            <article className="border-l border-accent pl-6 h-full">
              <h3 className="font-sans font-medium text-text-primary text-lg leading-snug">
                {card.title}
              </h3>
              <p className="mt-4 text-text-secondary leading-relaxed text-base">
                {card.body}
              </p>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  );
}
