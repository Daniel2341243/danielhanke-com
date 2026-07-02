import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ConvertKitForm } from "@/components/ConvertKitForm";
import { siteConfig } from "@/lib/siteConfig";

const sitemap = [
  { href: "/coaching", key: "coaching" },
  { href: "/speaking", key: "speaking" },
  { href: "/ueber-mich", key: "about" },
] as const;

const legalLinks = [
  { href: "/impressum", key: "imprint" },
  { href: "/datenschutz", key: "privacy" },
  { href: "/agb", key: "terms" },
] as const;

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-strong bg-bg-primary mt-24">
      <div className="mx-auto max-w-screen px-6 md:px-12 lg:px-20 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-6">
            <Link
              href="/"
              className="font-serif text-xl text-text-primary hover:text-accent transition-colors duration-200"
            >
              Daniel Hanke
            </Link>
            <p className="text-sm text-text-secondary max-w-xs">
              {t("tagline")}
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <p className="text-xs uppercase tracking-[0.12em] text-text-muted mb-6">
                {t("sitemap")}
              </p>
              <ul className="space-y-3">
                {sitemap.map((l) => (
                  <li key={l.key}>
                    <Link
                      href={l.href}
                      className="text-sm text-text-secondary hover:text-accent transition-colors duration-200"
                    >
                      {tNav(l.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.12em] text-text-muted mb-6">
                {t("more")}
              </p>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/community"
                    className="text-sm text-text-secondary hover:text-accent transition-colors duration-200"
                  >
                    {tNav("community")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/buch"
                    className="text-sm text-text-secondary hover:text-accent transition-colors duration-200"
                  >
                    {tNav("book")}
                  </Link>
                </li>
                <li>
                  <a
                    href={siteConfig.social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-text-secondary hover:text-accent transition-colors duration-200"
                  >
                    {t("youtube")}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <p className="text-xs uppercase tracking-[0.12em] text-text-muted mb-6">
                {t("newsletter")}
              </p>
              <ConvertKitForm
                formId={siteConfig.convertKit.newsletterFormId}
                variant="mini"
                fields={["email"]}
                submitLabel={t("newsletterSubmit")}
                emailPlaceholder={t("newsletterPlaceholder")}
              />
            </div>
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
