import { cn } from "@/lib/cn";
import { buttonStyles } from "./ui/Button";

/**
 * Plain HTML POST to Kit (ConvertKit). Works without JavaScript; Kit handles
 * double opt-in and redirects to the success page configured in Kit.
 */
export function ConvertKitForm({
  formId,
  idPrefix,
  layout = "row",
  submitLabel,
  firstNamePlaceholder,
  emailPlaceholder,
  className,
}: {
  formId: string;
  /** Unique per page — the footer and page body may both render a form. */
  idPrefix: string;
  layout?: "row" | "stack";
  submitLabel: string;
  firstNamePlaceholder?: string;
  emailPlaceholder: string;
  className?: string;
}) {
  const inputClass =
    "w-full min-w-0 rounded-full bg-bg-elevated border border-border-strong px-5 py-3 text-base text-text-primary placeholder:text-text-muted focus:outline-none focus:border-text-primary transition-colors";

  return (
    <form
      action={`https://app.kit.com/forms/${formId}/subscriptions`}
      method="post"
      target="_blank"
      className={cn(
        "flex gap-3",
        layout === "row" ? "flex-col sm:flex-row" : "flex-col",
        className,
      )}
    >
      {firstNamePlaceholder && (
        <>
          <label className="sr-only" htmlFor={`${idPrefix}-firstname`}>
            {firstNamePlaceholder}
          </label>
          <input
            id={`${idPrefix}-firstname`}
            name="fields[first_name]"
            type="text"
            autoComplete="given-name"
            placeholder={firstNamePlaceholder}
            className={cn(inputClass, layout === "row" && "sm:flex-1")}
          />
        </>
      )}

      <label className="sr-only" htmlFor={`${idPrefix}-email`}>
        {emailPlaceholder}
      </label>
      <input
        id={`${idPrefix}-email`}
        name="email_address"
        type="email"
        required
        autoComplete="email"
        placeholder={emailPlaceholder}
        className={cn(inputClass, layout === "row" && "sm:flex-[1.4]")}
      />

      <button
        type="submit"
        className={buttonStyles({ variant: "primary", className: "shrink-0" })}
      >
        {submitLabel}
      </button>
    </form>
  );
}
