"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonStyles } from "./ui/Button";

const STORAGE_KEY = "consent";

type Consent = "all" | "essential";

export function CookieBanner() {
  const t = useTranslations("cookies");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) setVisible(true);
    } catch {
      setVisible(false);
    }
  }, []);

  const decide = (value: Consent) => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ value, at: new Date().toISOString() }),
      );
    } catch {}
    setVisible(false);
    if (value === "all") {
      window.dispatchEvent(new CustomEvent("consent:all"));
    }
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie-Hinweis"
      className="fixed inset-x-4 bottom-4 md:inset-x-auto md:right-6 md:bottom-6 z-[60] max-w-[480px] md:ml-auto"
    >
      <div className="bg-bg-elevated border border-border rounded-sm p-6 shadow-2xl">
        <p className="text-sm text-text-secondary leading-relaxed">
          {t("text")}{" "}
          <Link
            href="/datenschutz"
            className="text-accent hover:text-accent-hover underline underline-offset-4"
          >
            {t("privacyLink")}
          </Link>
          .
        </p>
        <div className="mt-5 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => decide("essential")}
            className={buttonStyles({ variant: "ghost" })}
          >
            {t("essential")}
          </button>
          <button
            type="button"
            onClick={() => decide("all")}
            className={buttonStyles({ variant: "primary" })}
          >
            {t("all")}
          </button>
        </div>
      </div>
    </div>
  );
}
