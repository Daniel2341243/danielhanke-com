import { siteConfig } from "./siteConfig";

const body = (format: string) => `Hallo Daniel,

1. Was läuft gerade?

2. Was hast du bisher versucht?

3. Was würde sich ändern in 3 Monaten?

4. Warum jetzt?

5. Verfügbarkeit (alle 1–2 Wochen, 60 Min.)?

Format: ${format}

Viele Grüße,
`;

export function buildCoachingMailto({ format }: { format: string }) {
  const subject = "Coaching Anfrage";
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body(format))}`;
}
