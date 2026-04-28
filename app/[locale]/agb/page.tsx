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
}: PageProps<"/[locale]/agb">): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale: locale as Locale,
    pathname: "/agb",
    titleKey: "agbTitle",
    descriptionKey: "agbDescription",
  });
}

export default async function AgbPage({ params }: PageProps<"/[locale]/agb">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const isDe = locale === "de";
  const l = siteConfig.legal;

  return (
    <Section>
      {/* TODO: Anwaltliche Prüfung vor Live-Schaltung */}
      <Prose>
        <h1>
          {isDe
            ? "Allgemeine Geschäftsbedingungen"
            : "General Terms and Conditions"}
        </h1>

        <h2>{isDe ? "1. Geltungsbereich" : "1. Scope"}</h2>
        <p>
          {isDe
            ? `Diese AGB gelten für sämtliche Coaching-Leistungen, die Daniel Hanke über die ${l.company} mit Sitz in ${l.city} erbringt. Die Inanspruchnahme der Leistungen setzt die Annahme dieser AGB voraus.`
            : `These terms apply to all coaching services Daniel Hanke provides via ${l.company} based in ${l.city}. Use of the services requires acceptance of these terms.`}
        </p>

        <h2>
          {isDe ? "2. Vertragsabschluss" : "2. Contract Conclusion"}
        </h2>
        <p>
          {isDe
            ? "Der Vertrag kommt durch deine Anfrage per E-Mail und unsere Bestätigung in Textform zustande. Ein Erstgespräch (45 Minuten, kostenlos, per Zoom) begründet noch keinen kostenpflichtigen Vertrag."
            : "The contract is concluded through your email inquiry and our confirmation in text form. A first call (45 minutes, free, via Zoom) does not yet create a paid contract."}
        </p>

        <h2>
          {isDe
            ? "3. Leistungsbeschreibung"
            : "3. Description of Services"}
        </h2>
        <p>
          {isDe
            ? "Coaching ist eine prozessbegleitende Beratung zur persönlichen und beruflichen Entwicklung. Es ersetzt keine ärztliche oder psychotherapeutische Behandlung, keine Rechts-, Steuer- oder Anlageberatung. Bei akuten psychischen Erkrankungen wird ausdrücklich auf entsprechende Fachstellen verwiesen."
            : "Coaching is process-supporting consulting for personal and professional development. It does not replace medical or psychotherapeutic treatment, nor legal, tax, or investment advice. For acute psychological illness, we explicitly refer to appropriate specialist services."}
        </p>

        <h2>
          {isDe
            ? "4. Vergütung und Zahlung"
            : "4. Compensation and Payment"}
        </h2>
        <p>
          {isDe
            ? "Eine Coaching-Stunde von 60 Minuten kostet 90 € inkl. ggf. Umsatzsteuer. Die Zahlung erfolgt vorab per Banküberweisung auf Grundlage einer Rechnung. Die Mehrwertsteuer wird gemäß der jeweils gültigen Gesetzeslage ausgewiesen."
            : "A 60-minute coaching session costs 90 € incl. VAT where applicable. Payment is made in advance by bank transfer based on an invoice. VAT is shown per applicable law."}
        </p>

        <h2>
          {isDe ? "5. Stornierung und Absage" : "5. Cancellation"}
        </h2>
        <p>
          {isDe
            ? "Termine können bis 24 Stunden vor Beginn kostenfrei verschoben oder abgesagt werden. Bei späterer Absage oder Nichterscheinen wird die volle Sitzungsgebühr berechnet. Bei nachgewiesener Krankheit oder höherer Gewalt wird kulant verfahren."
            : "Sessions can be rescheduled or cancelled up to 24 hours before start without charge. For later cancellation or no-show, the full session fee applies. In case of proven illness or force majeure, we handle this leniently."}
        </p>

        <h2>
          {isDe ? "6. Haftung" : "6. Liability"}
        </h2>
        <p>
          {isDe
            ? "Wir haften unbeschränkt für Vorsatz und grobe Fahrlässigkeit sowie für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit. Im Übrigen ist die Haftung auf die Verletzung wesentlicher Vertragspflichten beschränkt und der Höhe nach auf den vorhersehbaren, vertragstypischen Schaden begrenzt."
            : "We are liable without limitation for intent and gross negligence and for damages arising from injury to life, body, or health. Otherwise, liability is limited to breaches of essential contractual obligations and limited in amount to foreseeable, contract-typical damage."}
        </p>

        <h2>
          {isDe
            ? "7. Widerrufsrecht für Verbraucher"
            : "7. Right of Withdrawal for Consumers"}
        </h2>
        <p>
          {isDe
            ? "Verbraucher haben das Recht, binnen 14 Tagen ohne Angabe von Gründen den Vertrag zu widerrufen. Die Widerrufsfrist beträgt 14 Tage ab Vertragsschluss. Um dein Widerrufsrecht auszuüben, sende eine eindeutige Erklärung (z. B. per E-Mail an "
            : "Consumers have the right to withdraw from the contract within 14 days without stating reasons. The withdrawal period is 14 days from contract conclusion. To exercise your right of withdrawal, send a clear declaration (e.g. by email to "}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          {isDe
            ? "). Wenn du den Vertrag widerrufst, erstatten wir alle erhaltenen Zahlungen unverzüglich, spätestens binnen 14 Tagen ab Widerruf zurück."
            : "). If you withdraw, we refund all payments received without delay, at the latest within 14 days after withdrawal."}
        </p>
        <p>
          {isDe
            ? "Wünschst du, dass die Coaching-Leistung bereits während der Widerrufsfrist beginnt, wirst du gesondert um eine ausdrückliche Zustimmung gebeten. Erbringen wir die Leistung vollständig vor Ablauf der Widerrufsfrist mit deinem ausdrücklichen Einverständnis, erlischt dein Widerrufsrecht."
            : "If you wish coaching services to begin during the withdrawal period, you will be asked separately for explicit consent. If services are fully rendered before the withdrawal period ends with your explicit agreement, the right of withdrawal expires."}
        </p>

        <h2>
          {isDe ? "8. Schlussbestimmungen" : "8. Final Provisions"}
        </h2>
        <p>
          {isDe
            ? `Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts. Sollten einzelne Bestimmungen unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt. Erfüllungsort und ausschließlicher Gerichtsstand für Kaufleute ist ${l.city}.`
            : `German law applies under exclusion of the UN Convention on Contracts. Should individual provisions be invalid, the remaining provisions remain valid. Place of performance and exclusive jurisdiction for merchants is ${l.city}.`}
        </p>

        <p className="text-text-muted text-sm mt-12">
          {isDe
            ? "Stand: April 2026."
            : "Last updated: April 2026."}
        </p>
      </Prose>
    </Section>
  );
}
