"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Play } from "lucide-react";
import { buttonStyles } from "./ui/Button";

const STORAGE_KEY = "consent";

export function YouTubeEmbed({
  videoId,
  title,
}: {
  videoId: string;
  title: string;
}) {
  const t = useTranslations("youtubeEmbed");
  const [consented, setConsented] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return setConsented(false);
        const parsed = JSON.parse(raw) as { value?: string };
        setConsented(parsed.value === "all");
      } catch {
        setConsented(false);
      }
    };
    check();
    const onConsent = () => check();
    window.addEventListener("consent:all", onConsent);
    return () => window.removeEventListener("consent:all", onConsent);
  }, []);

  const acceptAndLoad = () => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ value: "all", at: new Date().toISOString() }),
      );
    } catch {}
    window.dispatchEvent(new CustomEvent("consent:all"));
    setConsented(true);
  };

  if (consented) {
    return (
      <div className="relative aspect-video bg-bg-elevated border border-border-strong">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
          title={title}
          loading="lazy"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-video bg-bg-elevated border border-border-strong overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(200,168,130,0.10), transparent 70%)",
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 gap-6">
        <span className="size-16 md:size-20 rounded-full border border-accent flex items-center justify-center text-accent">
          <Play className="size-6 md:size-7 ml-1" aria-hidden="true" />
        </span>
        {consented === false && (
          <>
            <p className="text-sm text-text-secondary leading-relaxed max-w-md">
              {t("notice")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={acceptAndLoad}
                className={buttonStyles({ variant: "primary" })}
              >
                {t("accept")}
              </button>
              <a
                href={`https://www.youtube.com/watch?v=${videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonStyles({ variant: "ghost" })}
              >
                {t("openOnYoutube")}
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
