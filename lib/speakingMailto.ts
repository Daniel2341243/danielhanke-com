import { siteConfig } from "./siteConfig";

const bodyDe = `Hallo Daniel,

1. Name:

2. Organisation / Podcast / Event:

3. E-Mail:

4. Format (Keynote / Workshop / Podcast / Panel / anderes):

5. Datum oder Zeitraum:

6. Ort oder online:

7. Zielgruppe / Publikum:

8. Gewünschtes Thema:

9. Budgetrahmen (optional):

10. Was soll nach dem Vortrag, Workshop oder Gespräch anders sein?

Viele Grüße,
`;

const bodyEn = `Hi Daniel,

1. Name:

2. Organization / Podcast / Event:

3. Email:

4. Format (keynote / workshop / podcast / panel / other):

5. Date or timeframe:

6. Location or online:

7. Audience:

8. Desired topic:

9. Budget range (optional):

10. What should be different after the talk, workshop or conversation?

Best,
`;

export function buildSpeakingMailto(locale: "de" | "en") {
  const subject =
    locale === "de" ? "Speaking Anfrage" : "Speaking Inquiry";
  const body = locale === "de" ? bodyDe : bodyEn;
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
