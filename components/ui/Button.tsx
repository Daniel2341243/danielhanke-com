import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost";
type Size = "default" | "lg";

const base =
  "inline-flex items-center justify-center text-xs uppercase tracking-[0.12em] font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const variants: Record<Variant, string> = {
  primary:
    "px-6 py-3 text-accent border border-accent hover:bg-accent hover:text-bg-primary",
  ghost:
    "text-text-secondary hover:text-accent border-b border-transparent hover:border-accent pb-1",
};

const sizes: Record<Size, string> = {
  default: "",
  lg: "px-8 py-4 text-sm",
};

export function buttonStyles({
  variant = "primary",
  size = "default",
  className,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
} = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function Button({
  variant,
  size,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={buttonStyles({ variant, size, className })}
      {...rest}
    >
      {children}
    </button>
  );
}
