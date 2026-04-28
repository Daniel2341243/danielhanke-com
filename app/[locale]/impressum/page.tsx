import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Section } from "@/components/ui/Section";
import { Prose } from "@/components/ui/Prose";
import { siteConfig } from "@/lib/siteConfig";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/impressum">): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale: locale as Locale,
    pathname: "/impressum",
    titleKey: "impressumTitle",
    descriptionKey: "impressumDescription",
  });
}

export default async function ImpressumPage({
  params,
}: PageProps<"/[locale]/impressum">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const isDe = locale === "de";
  const l = siteConfig.legal;

  return (
    <Section>
      <Prose>
        <h1>{isDe ? "Impressum" : "Imprint"}</h1>

        <h2>{isDe ? "Angaben gemäß § 5 TMG" : "Information per § 5 TMG"}</h2>
        <p>
          {l.company}
          <br />
          {l.street}
          <br />
          {l.zip} {l.city}
          <br />
          {l.country}
        </p>

        <p>
          <strong>{isDe ? "Vertreten durch:" : "Represented by:"}</strong>{" "}
          Daniel Hanke ({isDe ? "Geschäftsführer" : "Managing Director"})
        </p>

        <h2>{isDe ? "Kontakt" : "Contact"}</h2>
        <p>
          {isDe ? "Telefon" : "Phone"}: {l.phone}
          <br />
          E-Mail:{" "}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        </p>

        <h2>{isDe ? "Registereintrag" : "Commercial Register"}</h2>
        <p>
          {isDe
            ? "Eintragung im Handelsregister."
            : "Entry in the commercial register."}
          <br />
          {isDe ? "Registergericht:" : "Register court:"} {l.court}
          <br />
          {isDe ? "Registernummer:" : "Registration number:"} {l.register}
        </p>

        <h2>
          {isDe ? "Umsatzsteuer-ID" : "VAT Identification Number"}
        </h2>
        <p>
          {isDe
            ? "Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:"
            : "VAT identification number per § 27a German VAT Act:"}{" "}
          {l.vatId}
        </p>

        <h2>
          {isDe
            ? "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV"
            : "Responsible for content per § 18 (2) MStV"}
        </h2>
        <p>
          Daniel Hanke
          <br />
          {l.street}
          <br />
          {l.zip} {l.city}
        </p>

        <h2>{isDe ? "EU-Streitschlichtung" : "EU Dispute Resolution"}</h2>
        <p>
          {isDe
            ? "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:"
            : "The European Commission provides a platform for online dispute resolution (ODR):"}{" "}
          <a
            href="https://ec.europa.eu/consumers/odr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://ec.europa.eu/consumers/odr/
          </a>
          .{" "}
          {isDe
            ? "Unsere E-Mail-Adresse findest du oben im Impressum."
            : "Our email address is listed above."}
        </p>

        <h2>
          {isDe
            ? "Verbraucherstreitbeilegung / Universalschlichtungsstelle"
            : "Consumer Dispute Resolution"}
        </h2>
        <p>
          {isDe
            ? "Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen."
            : "We are neither willing nor obliged to participate in dispute resolution proceedings before a consumer arbitration board."}
        </p>
      </Prose>
    </Section>
  );
}
