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
}: PageProps<"/[locale]/datenschutz">): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale: locale as Locale,
    pathname: "/datenschutz",
    titleKey: "datenschutzTitle",
    descriptionKey: "datenschutzDescription",
  });
}

export default async function DatenschutzPage({
  params,
}: PageProps<"/[locale]/datenschutz">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const isDe = locale === "de";
  const l = siteConfig.legal;

  return (
    <Section>
      {/* TODO: Anwaltliche Prüfung vor Live-Schaltung */}
      <Prose>
        <h1>{isDe ? "Datenschutzerklärung" : "Privacy Policy"}</h1>

        <h2>
          {isDe
            ? "1. Verantwortlicher"
            : "1. Controller"}
        </h2>
        <p>
          {isDe
            ? "Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:"
            : "The controller responsible under the General Data Protection Regulation (GDPR):"}
        </p>
        <p>
          {l.company}
          <br />
          {l.street}
          <br />
          {l.zip} {l.city}, {l.country}
          <br />
          E-Mail:{" "}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        </p>

        <h2>
          {isDe
            ? "2. Allgemeine Hinweise zur Datenverarbeitung"
            : "2. General Information on Data Processing"}
        </h2>
        <p>
          {isDe
            ? "Wir verarbeiten personenbezogene Daten unserer Nutzer nur, soweit dies zur Bereitstellung einer funktionsfähigen Website sowie unserer Inhalte und Leistungen erforderlich ist. Rechtsgrundlagen sind Art. 6 Abs. 1 lit. a (Einwilligung), lit. b (Vertragserfüllung), lit. c (rechtliche Verpflichtung) und lit. f (berechtigtes Interesse) DSGVO."
            : "We process personal data only as necessary to provide a functional website and our services. Legal bases are Art. 6 (1) (a) (consent), (b) (contract performance), (c) (legal obligation), and (f) (legitimate interest) GDPR."}
        </p>

        <h2>{isDe ? "3. Hosting (Vercel)" : "3. Hosting (Vercel)"}</h2>
        <p>
          {isDe
            ? "Diese Website wird bei Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA, gehostet. Beim Aufruf der Seite werden Verbindungsdaten (IP-Adresse, User Agent, Zeitstempel, aufgerufene URL) verarbeitet, um die Seite auszuliefern und Angriffe abzuwehren. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Die Übertragung in die USA stützt sich auf das EU-US Data Privacy Framework und die Standardvertragsklauseln. Mit Vercel besteht ein Auftragsverarbeitungsvertrag."
            : "This site is hosted by Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA. Connection data (IP address, user agent, timestamp, requested URL) is processed to deliver the page and prevent attacks. Legal basis is Art. 6 (1) (f) GDPR. Transfer to the US is based on the EU-US Data Privacy Framework and Standard Contractual Clauses. A data processing agreement with Vercel is in place."}
        </p>

        <h2>
          {isDe ? "4. Server-Logfiles" : "4. Server Log Files"}
        </h2>
        <p>
          {isDe
            ? "Beim Aufruf erhebt der Hosting-Provider automatisch technische Daten (IP-Adresse, Datum, Uhrzeit, Browsertyp, Betriebssystem, Referrer). Diese Daten dienen der technischen Auslieferung und Sicherheit der Seite und werden nach kurzer Zeit gelöscht. Eine Zusammenführung mit anderen Datenquellen erfolgt nicht."
            : "When the page is accessed, the hosting provider automatically collects technical data (IP address, date, time, browser type, operating system, referrer). This data serves technical delivery and security and is deleted after a short period. No merging with other data sources occurs."}
        </p>

        <h2>{isDe ? "5. Newsletter (Kit / ConvertKit)" : "5. Newsletter (Kit / ConvertKit)"}</h2>
        <p>
          {isDe
            ? "Für den Versand des Newsletters nutzen wir Kit (ehemals ConvertKit), betrieben von ConvertKit, LLC, 401 N. Liberty St., Boise, ID 83702, USA. Bei der Anmeldung werden deine E-Mail-Adresse und ggf. dein Vorname verarbeitet. Die Verarbeitung erfolgt im Double-Opt-In-Verfahren auf Grundlage deiner Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO. Du kannst die Einwilligung jederzeit widerrufen, etwa durch den Abmeldelink in jeder Newsletter-Mail. Mit Kit besteht ein Auftragsverarbeitungsvertrag; die US-Übermittlung stützt sich auf Standardvertragsklauseln."
            : "For the newsletter we use Kit (formerly ConvertKit), operated by ConvertKit, LLC, 401 N. Liberty St., Boise, ID 83702, USA. On signup, your email address and optionally first name are processed. Processing occurs via double opt-in based on your consent per Art. 6 (1) (a) GDPR. You can revoke consent at any time, e.g. via the unsubscribe link in every newsletter email. A data processing agreement with Kit is in place; US transfer is based on Standard Contractual Clauses."}
        </p>

        <h2>{isDe ? "6. YouTube-Verlinkungen" : "6. YouTube Links"}</h2>
        <p>
          {isDe
            ? "Diese Website bettet keine YouTube-Videos direkt ein. Wir verlinken auf Inhalte unseres YouTube-Kanals; beim Klick auf den Link wirst du zu YouTube weitergeleitet, wo eigene Datenschutzbestimmungen gelten."
            : "This site does not embed YouTube videos directly. We link to our YouTube channel; clicking the link redirects you to YouTube, where its own privacy terms apply."}
        </p>

        <h2>
          {isDe ? "7. Vercel Analytics (nur mit Einwilligung)" : "7. Vercel Analytics (consent-gated)"}
        </h2>
        <p>
          {isDe
            ? "Wir nutzen Vercel Analytics zur anonymen Reichweitenmessung — jedoch nur, wenn du im Cookie-Banner „Alle akzeptieren“ wählst. Die Verarbeitung beruht dann auf deiner Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO. Erfasst werden anonymisierte Aufrufzahlen ohne Personenbezug und ohne Cookies. Du kannst deine Einwilligung jederzeit widerrufen, indem du den Local-Storage-Eintrag „consent“ entfernst und neu wählst."
            : "We use Vercel Analytics for anonymous reach measurement — only if you select 'Accept all' in the cookie banner. Processing is then based on your consent per Art. 6 (1) (a) GDPR. Anonymized page views are captured without personal reference and without cookies. You can revoke consent anytime by clearing the 'consent' entry in local storage."}
        </p>

        <h2>{isDe ? "8. Cookies und Local Storage" : "8. Cookies and Local Storage"}</h2>
        <p>
          {isDe
            ? "Diese Website verwendet ausschließlich technisch notwendige Speichermechanismen (Local Storage), um deine Cookie-Auswahl persistent zu speichern. Es werden keine Tracking-Cookies ohne deine Zustimmung gesetzt."
            : "This site uses only technically necessary storage (local storage) to persist your cookie choice. No tracking cookies are set without your consent."}
        </p>

        <h2>
          {isDe ? "9. Deine Rechte" : "9. Your Rights"}
        </h2>
        <p>
          {isDe
            ? "Dir stehen folgende Rechte zu: Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20), Widerspruch (Art. 21), Widerruf erteilter Einwilligungen sowie Beschwerde bei einer Aufsichtsbehörde (Art. 77). Zuständige Behörde ist die Datenschutzaufsichtsbehörde des Bundeslandes des Verantwortlichen."
            : "You have the following rights: access (Art. 15 GDPR), rectification (Art. 16), erasure (Art. 17), restriction of processing (Art. 18), data portability (Art. 20), objection (Art. 21), revocation of consent, and to lodge a complaint with a supervisory authority (Art. 77). The competent authority is the data protection authority of the controller's federal state."}
        </p>

        <h2>{isDe ? "10. Kontakt für Datenschutzanfragen" : "10. Contact for Data Protection Requests"}</h2>
        <p>
          {isDe
            ? "Bei Fragen zum Datenschutz erreichst du uns unter:"
            : "For data protection inquiries you can reach us at:"}{" "}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        </p>

        <p className="text-text-muted text-sm mt-12">
          {isDe
            ? "Stand: April 2026. Diese Datenschutzerklärung wird bei rechtlichen oder technischen Änderungen angepasst."
            : "Last updated: April 2026. This policy will be adjusted in case of legal or technical changes."}
        </p>
      </Prose>
    </Section>
  );
}
