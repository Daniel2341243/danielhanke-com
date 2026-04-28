import { cn } from "@/lib/cn";

type Aspect = "portrait" | "landscape" | "square" | "book";

const aspectClass: Record<Aspect, string> = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[16/10]",
  square: "aspect-square",
  book: "aspect-[2/3]",
};

export function PhotoPlaceholder({
  aspect = "portrait",
  className,
  alt,
  slot,
  dimensions,
}: {
  aspect?: Aspect;
  className?: string;
  alt: string;
  /** Short label of the slot, e.g. "Hero · Berlin" */
  slot: string;
  /** Recommended source dimensions, e.g. "1600 × 2133 px" */
  dimensions: string;
}) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        aspectClass[aspect],
        "relative w-full bg-bg-elevated border border-border-strong overflow-hidden",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at top right, rgba(168,146,122,0.05), transparent 60%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between gap-3">
        <p className="text-[10px] uppercase tracking-[0.14em] text-text-muted">
          {slot}
        </p>
        <p className="text-[10px] tabular-nums tracking-[0.04em] text-text-muted">
          {dimensions}
        </p>
      </div>
    </div>
  );
}
