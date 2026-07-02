"use client";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { buttonStyles } from "@/components/ui/Button";

const links = [
  { href: "/coaching", key: "coaching" },
  { href: "/speaking", key: "speaking" },
  { href: "/ueber-mich", key: "about" },
] as const;

export function Nav() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "bg-bg-primary/85 backdrop-blur-xl border-b border-border-strong"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto max-w-screen px-6 md:px-12 lg:px-20">
        <nav
          className="flex items-center justify-between h-16 md:h-20"
          aria-label="Hauptnavigation"
        >
          <Link
            href="/"
            className="font-serif text-lg tracking-tight text-text-primary hover:text-accent transition-colors duration-200"
            onClick={() => setOpen(false)}
          >
            Daniel Hanke
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.key}
                href={l.href}
                className="text-sm text-text-secondary hover:text-accent transition-colors duration-200"
              >
                {t(l.key)}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/newsletter" className={buttonStyles({ variant: "primary" })}>
              {t("ctaPrimary")}
            </Link>
          </div>

          <button
            type="button"
            className="md:hidden text-text-primary"
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <X className="size-6" aria-hidden="true" />
            ) : (
              <Menu className="size-6" aria-hidden="true" />
            )}
          </button>
        </nav>
      </div>

      {open && (
        <div className="md:hidden fixed inset-x-0 top-16 bottom-0 bg-bg-primary px-6 pt-12 overflow-y-auto">
          <ul className="flex flex-col gap-8">
            {links.map((l) => (
              <li key={l.key}>
                <Link
                  href={l.href}
                  className="font-serif text-3xl text-text-primary hover:text-accent transition-colors duration-200"
                  onClick={() => setOpen(false)}
                >
                  {t(l.key)}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-12 pt-8 border-t border-border-strong">
            <Link
              href="/newsletter"
              onClick={() => setOpen(false)}
              className={cn(buttonStyles({ variant: "primary" }), "w-full")}
            >
              {t("ctaPrimary")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
