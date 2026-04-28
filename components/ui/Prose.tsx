import { cn } from "@/lib/cn";

export function Prose({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-[68ch] text-text-secondary leading-relaxed",
        "[&>h1]:font-serif [&>h1]:text-text-primary [&>h1]:font-semibold [&>h1]:tracking-[-0.02em] [&>h1]:leading-[1.1] [&>h1]:text-[clamp(2rem,4vw,3rem)] [&>h1]:mb-12",
        "[&>h2]:font-serif [&>h2]:text-text-primary [&>h2]:font-semibold [&>h2]:tracking-[-0.01em] [&>h2]:leading-snug [&>h2]:text-2xl [&>h2]:mt-16 [&>h2]:mb-6",
        "[&>h3]:font-sans [&>h3]:text-text-primary [&>h3]:font-medium [&>h3]:text-lg [&>h3]:mt-10 [&>h3]:mb-4",
        "[&>p]:my-5",
        "[&>ul]:my-5 [&>ul]:space-y-2 [&>ul]:list-none",
        "[&>ul>li]:pl-5 [&>ul>li]:relative [&>ul>li:before]:content-['·'] [&>ul>li:before]:text-accent [&>ul>li:before]:absolute [&>ul>li:before]:left-0",
        "[&_a]:text-accent [&_a]:underline-offset-4 [&_a]:hover:underline [&_a]:transition-colors",
        "[&_strong]:text-text-primary [&_strong]:font-medium",
        className,
      )}
    >
      {children}
    </div>
  );
}
