import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "default" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const variants: Record<Variant, string> = {
  primary:
    "px-6 py-3 rounded-full bg-text-primary text-bg-primary border border-text-primary hover:bg-accent hover:border-accent",
  secondary:
    "px-6 py-3 rounded-full text-text-primary border border-border-strong hover:border-text-primary",
  ghost:
    "text-text-secondary hover:text-accent border-b border-transparent hover:border-accent pb-1",
};

const sizes: Record<Size, string> = {
  default: "",
  lg: "px-7 py-3.5 text-base",
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
