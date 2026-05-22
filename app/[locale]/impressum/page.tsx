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
          danielhanke.com ({isDe ? "Angebot der" : "an offering of"}{" "}
          {l.company})
        </p>
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
          Website:{" "}
          <a href={siteConfig.url}>danielhanke.com</a>
        </p>

        <h2>{isDe ? "Handelsregister" : "Commercial Register"}</h2>
        <p>
          {isDe ? "Handelsregister" : "Commercial register"}: {l.register}
          <br />
          {isDe ? "Registergericht" : "Register court"}: {l.court}
        </p>

        <h2>{isDe ? "Vertreten durch" : "Represented by"}</h2>
        <p>
          {isDe ? "Geschäftsführer" : "Managing Director"}: Daniel Hanke
        </p>

        <h2>{isDe ? "Kontakt" : "Contact"}</h2>
        <p>
          E-Mail:{" "}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        </p>

        <h2>{isDe ? "Umsatzsteuer-ID" : "VAT Identification Number"}</h2>
        <p>
          {isDe
            ? "Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:"
            : "VAT identification number per § 27a German VAT Act:"}{" "}
          {l.vatId}
        </p>

        <h2>
          {isDe ? "Redaktionell verantwortlich" : "Responsible for content"}
        </h2>
        <p>Daniel Hanke</p>

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
            ? "Unsere E-Mail-Adresse finden Sie oben im Impressum."
            : "Our email address is listed above in this imprint."}
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

        <h2>{isDe ? "Haftung für Inhalte" : "Liability for Content"}</h2>
        <p>
          {isDe
            ? "Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen."
            : "As a service provider, we are responsible for our own content on these pages under the general laws in accordance with § 7 (1) TMG. According to §§ 8 to 10 TMG, however, we as a service provider are not obliged to monitor transmitted or stored third-party information."}
        </p>
        <p>
          {isDe
            ? "Eine Haftung ist erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden entsprechender Rechtsverletzungen werden wir diese Inhalte umgehend entfernen."
            : "Liability is only possible from the point in time at which a concrete infringement of the law becomes known. Upon becoming aware of such infringements, we will remove the content immediately."}
        </p>

        <h2>{isDe ? "Haftung für Links" : "Liability for Links"}</h2>
        <p>
          {isDe
            ? "Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte keine Gewähr übernehmen."
            : "Our offer contains links to external third-party websites over whose content we have no influence. Therefore, we cannot accept any liability for this external content."}
        </p>
        <p>
          {isDe
            ? "Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen."
            : "If we become aware of any infringements, we will remove such links immediately."}
        </p>

        <h2>{isDe ? "Urheberrecht" : "Copyright"}</h2>
        <p>
          {isDe
            ? "Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet."
            : "The content and works created by the site operators on these pages are subject to German copyright law. Downloads and copies of this page are only permitted for private, non-commercial use."}
        </p>
        <p>
          {isDe
            ? "Sollten Sie auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen."
            : "If you become aware of any copyright infringement, please inform us accordingly. Upon becoming aware of such infringements, we will remove the content immediately."}
        </p>

        <p>
          <em>
            {isDe ? "Stand" : "Last updated"}: {l.lastUpdated}
          </em>
        </p>
      </Prose>
    </Section>
  );
}
