import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/siteConfig";

const pages = [
  { href: "/ueber-mich", key: "about" },
  { href: "/newsletter", key: "newsletter" },
  { href: "/inhalte", key: "content" },
  { href: "/buch", key: "books" },
  { href: "/speaking", key: "speaking" },
] as const;

const legalLinks = [
  { href: "/impressum", key: "imprint" },
  { href: "/datenschutz", key: "privacy" },
  { href: "/agb", key: "terms" },
] as const;

const linkClass =
  "text-sm text-text-secondary hover:text-accent transition-colors duration-200";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-strong bg-bg-primary">
      <div className="mx-auto max-w-screen px-6 md:px-12 lg:px-20 py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-4">
            <Link
              href="/"
              className="font-serif text-2xl text-text-primary hover:text-accent transition-colors duration-200"
            >
              Daniel Hanke
            </Link>
            <p className="text-sm text-text-secondary max-w-xs">
              {t("tagline")}
            </p>
          </div>

          <div className="lg:col-span-3">
            <p className="text-xs uppercase tracking-[0.12em] text-text-muted mb-5">
              {t("pages")}
            </p>
            <ul className="space-y-3">
              {pages.map((l) => (
                <li key={l.key}>
                  <Link href={l.href} className={linkClass}>
                    {tNav(l.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <p className="text-xs uppercase tracking-[0.12em] text-text-muted mb-5">
              {t("elsewhere")}
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  href={siteConfig.practice.home}
                  target="_blank"
                  rel="noopener"
                  className={`${linkClass} inline-flex items-center gap-1`}
                >
                  {t("practice")}
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${linkClass} inline-flex items-center gap-1`}
                >
                  {t("youtube")}
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className={linkClass}>
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border-strong flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-text-muted">
          <p>{t("copyright", { year })}</p>
          <ul className="flex gap-6">
            {legalLinks.map((l) => (
              <li key={l.key}>
                <Link
                  href={l.href}
                  className="hover:text-accent transition-colors duration-200"
                >
                  {t(`legal.${l.key}` as "legal.imprint")}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
