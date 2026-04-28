export const siteConfig = {
  url: "https://danielhanke.com",
  name: "Daniel Hanke",
  email: "mail@danielhanke.com",

  social: {
    youtube: "https://www.youtube.com/@DanielHanke",
    instagram: "https://www.instagram.com/danielhanke",
    tiktok: "https://www.tiktok.com/@danielhanke",
    linkedin: "https://www.linkedin.com/in/daniel-hanke",
    amazon: "https://www.amazon.de/dp/PLACEHOLDER_ASIN",
  },

  convertKit: {
    newsletterFormId: "PLACEHOLDER_NEWSLETTER_FORM_ID",
    communityWaitlistFormId: "PLACEHOLDER_WAITLIST_FORM_ID",
  },

  latestVideo: {
    title: "Warum 'sei einfach du selbst' der schlechteste Ratschlag ist.",
    url: "https://www.youtube.com/@DanielHanke",
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
