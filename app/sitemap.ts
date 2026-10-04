import type { MetadataRoute } from "next";
import type { AppPathname } from "@/i18n/routing";
import { siteConfig } from "@/lib/siteConfig";

// Only indexable pages. /danke and /willkommen are noindex.
const pages: { path: AppPathname; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/newsletter", priority: 0.9 },
  { path: "/ueber-mich", priority: 0.8 },
  { path: "/inhalte", priority: 0.8 },
  { path: "/buch", priority: 0.6 },
  { path: "/speaking", priority: 0.6 },
  { path: "/impressum", priority: 0.2 },
  { path: "/datenschutz", priority: 0.2 },
  { path: "/agb", priority: 0.1 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return pages.map(({ path, priority }) => ({
    url: `${siteConfig.url}${path === "/" ? "" : path}`,
    lastModified: now,
    changeFrequency: path === "/" || path === "/inhalte" ? "weekly" : "monthly",
    priority,
  }));
}
