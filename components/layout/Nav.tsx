"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/siteConfig";

const links = [
  { href: "/ueber-mich", key: "about" },
  { href: "/newsletter", key: "newsletter" },
  { href: "/inhalte", key: "content" },
  { href: "/buch", key: "books" },
  { href: "/speaking", key: "speaking" },
] as const;

export function Nav() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        // No backdrop-filter while the menu is open: it would make the header
        // the containing block of the fixed overlay and collapse it.
        open
          ? "bg-bg-primary border-b border-border-strong"
          : scrolled
            ? "bg-bg-primary/90 backdrop-blur-xl border-b border-border-strong"
            : "bg-bg-primary border-b border-transparent",
      )}
    >
      <div className="mx-auto max-w-screen px-6 md:px-12 lg:px-20">
        <nav
          className="flex items-center justify-between h-16 md:h-20 gap-6"
          aria-label={t("label")}
        >
          <Link
            href="/"
            className="font-serif text-xl tracking-tight text-text-primary hover:text-accent transition-colors duration-200"
            onClick={() => setOpen(false)}
          >
            Daniel Hanke
          </Link>

          <ul className="hidden lg:flex items-center gap-7">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <li key={l.key}>
                  <Link
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "text-sm transition-colors duration-200 hover:text-accent",
                      active ? "text-text-primary" : "text-text-secondary",
                    )}
                  >
                    {t(l.key)}
                  </Link>
                </li>
              );
            })}
          </ul>

          <a
            href={siteConfig.practice.home}
            target="_blank"
            rel="noopener"
            className="hidden lg:inline-flex items-center gap-1.5 rounded-full border border-border-strong px-4 py-2 text-sm text-text-primary hover:border-text-primary transition-colors"
          >
            {t("practice")}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>

          <button
            type="button"
            className="lg:hidden -mr-2 p-2 text-text-primary"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            aria-expanded={open}
            aria-controls="mobile-menu"
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
        <div
          id="mobile-menu"
          className="lg:hidden fixed inset-x-0 top-16 bottom-0 bg-bg-primary px-6 pt-10 pb-12 overflow-y-auto"
        >
          <ul className="flex flex-col gap-6">
            <li>
              <Link
                href="/"
                className="font-serif text-3xl text-text-primary hover:text-accent transition-colors duration-200"
                onClick={() => setOpen(false)}
              >
                {t("home")}
              </Link>
            </li>
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

          <div className="mt-10 pt-8 border-t border-border-strong">
            <a
              href={siteConfig.practice.home}
              target="_blank"
              rel="noopener"
              onClick={() => setOpen(false)}
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-text-primary text-bg-primary px-6 py-3.5 text-base font-medium"
            >
              {t("practice")}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
