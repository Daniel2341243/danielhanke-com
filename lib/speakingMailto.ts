import { siteConfig } from "./siteConfig";

const body = `Hallo Daniel,

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

export function buildSpeakingMailto() {
  const subject = "Speaking Anfrage";
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
