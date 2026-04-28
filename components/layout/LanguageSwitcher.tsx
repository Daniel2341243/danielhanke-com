"use client";

import { Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LanguageSwitcher({ className }: { className?: string }) {
  const t = useTranslations("languageSwitcher");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchTo = (next: (typeof routing.locales)[number]) => {
    if (next === locale) return;
    router.replace(pathname, { locale: next, scroll: false });
  };

  return (
    <div
      className={`inline-flex items-center gap-2 text-xs uppercase tracking-[0.12em] ${className ?? ""}`}
      aria-label={t("label")}
    >
      <Globe className="size-4 text-text-muted" aria-hidden="true" />
      {routing.locales.map((l, i) => (
        <span key={l} className="flex items-center gap-2">
          {i > 0 && <span className="text-text-muted">/</span>}
          <button
            type="button"
            onClick={() => switchTo(l)}
            aria-current={l === locale ? "true" : undefined}
            className={
              l === locale
                ? "text-accent"
                : "text-text-secondary hover:text-accent transition-colors duration-200"
            }
          >
            {t(l as "de" | "en")}
          </button>
        </span>
      ))}
    </div>
  );
}
