import { cn } from "@/lib/cn";

export function Quote({
  children,
  className,
  italic = true,
}: {
  children: React.ReactNode;
  className?: string;
  italic?: boolean;
}) {
  return (
    <blockquote
      className={cn(
        "font-serif text-text-primary leading-[1.15] tracking-[-0.02em]",
        italic && "italic",
        className,
      )}
    >
      {children}
    </blockquote>
  );
}
