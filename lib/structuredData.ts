import { siteConfig } from "./siteConfig";

export const personId = `${siteConfig.url}/#person`;

/** Person + WebSite graph, rendered once in the root layout. */
export function siteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: siteConfig.name,
        url: siteConfig.url,
        image: `${siteConfig.url}/daniel-hanke-portrait.jpg`,
        jobTitle: "Psychologischer Berater",
        description:
          "Daniel Hanke veröffentlicht Videos, Texte und einen Newsletter über Psychologie, Acceptance and Commitment Therapy (ACT) und persönliche Entwicklung.",
        knowsAbout: [
          "Psychologie",
          "Acceptance and Commitment Therapy",
          "Psychologische Flexibilität",
          "Persönliche Entwicklung",
          "Selbstführung",
        ],
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "SRH Hochschule Heidelberg",
        },
        sameAs: [siteConfig.social.youtube, siteConfig.practice.home],
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        inLanguage: "de-DE",
        publisher: { "@id": personId },
      },
    ],
  };
}
