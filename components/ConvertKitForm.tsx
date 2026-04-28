import { cn } from "@/lib/cn";
import { buttonStyles } from "./ui/Button";

type Variant = "inline" | "card" | "mini";

export function ConvertKitForm({
  formId,
  variant = "inline",
  fields = ["firstName", "email"],
  submitLabel,
  firstNamePlaceholder,
  emailPlaceholder,
  fineprint,
  className,
}: {
  formId: string;
  variant?: Variant;
  fields?: ("firstName" | "email")[];
  submitLabel: string;
  firstNamePlaceholder?: string;
  emailPlaceholder: string;
  fineprint?: string;
  className?: string;
}) {
  const isMini = variant === "mini";
  const isCard = variant === "card";

  const inputClass =
    "w-full bg-transparent border border-border-strong px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors";

  return (
    <div
      className={cn(
        isCard && "bg-bg-elevated border border-border p-6 md:p-8",
        className,
      )}
    >
      <form
        action={`https://app.kit.com/forms/${formId}/subscriptions`}
        method="post"
        target="_blank"
        className={cn(
          "flex gap-3",
          isMini ? "flex-row" : "flex-col sm:flex-row",
        )}
      >
        {fields.includes("firstName") && !isMini && firstNamePlaceholder && (
          <>
            <label className="sr-only" htmlFor={`ck-${formId}-firstname`}>
              {firstNamePlaceholder}
            </label>
            <input
              id={`ck-${formId}-firstname`}
              name="fields[first_name]"
              type="text"
              autoComplete="given-name"
              placeholder={firstNamePlaceholder}
              className={cn(inputClass, "sm:flex-1")}
            />
          </>
        )}

        <label className="sr-only" htmlFor={`ck-${formId}-email`}>
          {emailPlaceholder}
        </label>
        <input
          id={`ck-${formId}-email`}
          name="email_address"
          type="email"
          required
          autoComplete="email"
          placeholder={emailPlaceholder}
          className={cn(inputClass, "sm:flex-1")}
        />

        <button type="submit" className={buttonStyles({ variant: "primary" })}>
          {submitLabel}
        </button>
      </form>

      {fineprint && (
        <p className="mt-4 text-xs text-text-muted">{fineprint}</p>
      )}
    </div>
  );
}
