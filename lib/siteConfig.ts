const practiceUrl = "https://act-beratung-berlin.de";

export const siteConfig = {
  url: "https://danielhanke.com",
  name: "Daniel Hanke",
  email: "mail@danielhanke.com",

  social: {
    youtube: "https://youtube.com/@daniel_hanke",
    amazon: "https://amzn.to/3PGr6Ps",
  },

  /**
   * Die psychologische Beratung läuft ausschließlich über die Praxiswebsite.
   * danielhanke.com verlinkt dorthin, verkauft aber kein eigenes Angebot.
   */
  practice: {
    name: "ACT Beratung Berlin",
    home: `${practiceUrl}/de`,
    counselling: `${practiceUrl}/de/psychologische-beratung-berlin`,
    counsellingEn: `${practiceUrl}/en/psychological-counselling-berlin`,
    articles: `${practiceUrl}/de/wissen`,
  },

  convertKit: {
    newsletterFormId: "9456300",
  },

  youtube: {
    channelId: "UCxyGrnHEXDV36-xh3xCfgYA",
    channelName: "Daniel Hanke | Psychologie & ACT",
    fallbackVideoId: "lk7hqIzxuEE",
    fallbackTitle: "Sei einfach du selbst — der schlechteste Ratschlag",
  },

  legal: {
    company: "Next Level Education GmbH",
    street: "Gottlob-Schneider-Straße 37",
    zip: "76275",
    city: "Ettlingen",
    country: "Deutschland",
    register: "HRB 700221",
    court: "Amtsgericht Mannheim",
    vatId: "DE814634983",
    lastUpdated: "Februar 2026",
  },
} as const;

export type SiteConfig = typeof siteConfig;

export function youtubeSearchUrl(query: string) {
  return `${siteConfig.social.youtube}/search?query=${encodeURIComponent(query)}`;
}
