import { siteConfig } from "./siteConfig";

const bodyDe = `Hallo Daniel,

1. Was läuft gerade?

2. Was hast du bisher versucht?

3. Was würde sich ändern in 3 Monaten?

4. Warum jetzt?

5. Verfügbarkeit?

Viele Grüße,
`;

const bodyEn = `Hi Daniel,

1. What's going on right now?

2. What have you tried so far?

3. What would change in 3 months?

4. Why now?

5. Availability?

Best,
`;

export function buildCoachingMailto(locale: "de" | "en") {
  const subject = locale === "de" ? "Coaching Anfrage" : "Coaching Inquiry";
  const body = locale === "de" ? bodyDe : bodyEn;
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
