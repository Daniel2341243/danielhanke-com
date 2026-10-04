import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { Analytics } from "@/components/Analytics";
import { JsonLd } from "@/components/JsonLd";
import { siteJsonLd } from "@/lib/structuredData";
import "../globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://danielhanke.com"),
  title: {
    default: "Daniel Hanke",
    template: "%s — Daniel Hanke",
  },
  description:
    "Daniel Hanke über Psychologie, ACT und persönliche Entwicklung: Videos, Newsletter, Bücher und Gedanken.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  // Only client components need messages in the browser (Nav, CookieBanner).
  const messages = await getMessages();
  const clientMessages = { nav: messages.nav, cookies: messages.cookies };

  return (
    <html
      lang={locale}
      className={`${playfair.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg-primary text-text-primary">
        <NextIntlClientProvider messages={clientMessages}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[80] focus:px-4 focus:py-2 focus:bg-bg-elevated focus:border focus:border-accent focus:text-text-primary focus:text-sm"
          >
            Zum Inhalt springen
          </a>
          <Nav />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <CookieBanner />
          <Analytics />
          <JsonLd data={siteJsonLd()} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
