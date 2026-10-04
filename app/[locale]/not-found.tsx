import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonStyles } from "@/components/ui/Button";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <section className="py-24 md:py-36">
      <div className="mx-auto max-w-screen px-6 md:px-12 lg:px-20">
        <div className="max-w-2xl">
          <p className="text-sm tracking-[0.08em] text-text-muted">404</p>
          <h1 className="mt-6 font-serif font-medium tracking-[-0.03em] leading-[1.05] text-text-primary text-[clamp(2.5rem,6vw,4.5rem)]">
            {t("headline")}
          </h1>
          <p className="mt-8 text-lg text-text-secondary leading-relaxed">
            {t("body")}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Link href="/" className={buttonStyles({ variant: "primary", size: "lg" })}>
              {t("home")}
            </Link>
            <Link
              href="/inhalte"
              className={buttonStyles({ variant: "secondary", size: "lg" })}
            >
              {t("content")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
