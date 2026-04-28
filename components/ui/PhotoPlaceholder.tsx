import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";

export function PhotoPlaceholder({
  aspect = "portrait",
  className,
  caption,
  alt,
}: {
  aspect?: "portrait" | "landscape" | "square";
  className?: string;
  caption?: string;
  alt: string;
}) {
  const t = useTranslations("common");

  const aspectClass =
    aspect === "portrait"
      ? "aspect-[3/4]"
      : aspect === "landscape"
        ? "aspect-[16/10]"
        : "aspect-square";

  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        aspectClass,
        "relative w-full bg-bg-elevated border border-border-strong overflow-hidden",
        className,
      )}
    >
      <div className="absolute inset-0 flex items-end p-6">
        <p className="text-xs uppercase tracking-[0.12em] text-text-muted">
          {caption ?? t("photoToFollow")}
        </p>
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at top right, rgba(200,168,130,0.06), transparent 60%)",
        }}
      />
    </div>
  );
}
