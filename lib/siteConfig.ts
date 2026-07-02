export const siteConfig = {
  url: "https://danielhanke.com",
  name: "Daniel Hanke",
  email: "mail@danielhanke.com",

  social: {
    youtube: "https://youtube.com/@daniel_hanke",
    amazon: "https://amzn.to/3PGr6Ps",
  },

  convertKit: {
    newsletterFormId: "9456300",
  },

  youtube: {
    channelId: "UCxyGrnHEXDV36-xh3xCfgYA",
    fallbackVideoId: "lk7hqIzxuEE",
    fallbackTitle: "Sei einfach du selbst — der schlechteste Ratschlag",
  },
  latestVideo: {
    title: "Sei einfach du selbst — der schlechteste Ratschlag",
    url: "https://www.youtube.com/watch?v=lk7hqIzxuEE",
    thumbnail: "",
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
