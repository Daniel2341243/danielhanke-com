export const siteConfig = {
  url: "https://danielhanke.com",
  name: "Daniel Hanke",
  email: "mail@danielhanke.com",

  social: {
    youtube: "https://www.youtube.com/@DanielHanke",
    instagram: "https://www.instagram.com/danielhanke",
    tiktok: "https://www.tiktok.com/@danielhanke",
    linkedin: "https://www.linkedin.com/in/daniel-hanke",
    amazon: "https://amzn.to/3QU4hYS",
  },

  convertKit: {
    newsletterFormId: "9456300",
    communityWaitlistFormId: "PLACEHOLDER_WAITLIST_FORM_ID",
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
    street: "PLACEHOLDER_STRASSE",
    zip: "PLACEHOLDER_PLZ",
    city: "Ettlingen",
    country: "Deutschland",
    phone: "PLACEHOLDER_TELEFON",
    register: "PLACEHOLDER_HRB_NUMMER",
    court: "PLACEHOLDER_REGISTERGERICHT",
    vatId: "PLACEHOLDER_USTID",
  },
} as const;

export type SiteConfig = typeof siteConfig;
