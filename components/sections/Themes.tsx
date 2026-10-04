import { useTranslations } from "next-intl";
import { Section, Eyebrow } from "@/components/ui/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

type Theme = { title: string; line: string };

export function Themes() {
  const t = useTranslations("home.themes");
  const items = t.raw("items") as Theme[];

  return (
    <Section className="border-t border-border-strong">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-4">
          <ScrollReveal>
            <Eyebrow>{t("eyebrow")}</Eyebrow>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="font-serif font-medium tracking-[-0.02em] leading-[1.1] text-text-primary text-[clamp(1.875rem,3.6vw,2.75rem)]">
              {t("headline")}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-6 text-text-secondary leading-relaxed max-w-[40ch]">
              {t("intro")}
            </p>
          </ScrollReveal>
        </div>

        <ul className="lg:col-span-8 divide-y divide-border-strong border-y border-border-strong">
          {items.map((item, i) => (
            <ScrollReveal as="li" key={item.title} delay={0.04 + i * 0.03}>
              <div className="py-5 md:py-6 grid grid-cols-1 md:grid-cols-12 gap-1 md:gap-6 md:items-baseline">
                <p className="md:col-span-5 font-serif text-[clamp(1.375rem,2.4vw,1.75rem)] leading-snug text-text-primary">
                  {item.title}
                </p>
                <p className="md:col-span-7 text-text-secondary leading-relaxed">
                  {item.line}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
