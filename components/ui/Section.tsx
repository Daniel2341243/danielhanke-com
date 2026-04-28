import { cn } from "@/lib/cn";

type Tone = "default" | "secondary" | "tinted";

const tones: Record<Tone, string> = {
  default: "bg-bg-primary",
  secondary: "bg-bg-secondary",
  tinted: "bg-bg-tinted",
};

export function Section({
  tone = "default",
  className,
  children,
  id,
  as: Tag = "section",
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
  id?: string;
  as?: "section" | "div" | "article";
}) {
  return (
    <Tag
      id={id}
      className={cn("py-24 md:py-32", tones[tone], className)}
    >
      <div className="mx-auto max-w-screen px-6 md:px-12 lg:px-20">
        {children}
      </div>
    </Tag>
  );
}

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-xs uppercase tracking-[0.12em] text-accent font-medium mb-6",
        className,
      )}
    >
      {children}
    </p>
  );
}
