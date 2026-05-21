import { siteConfig } from "./siteConfig";

export type YouTubeVideo = {
  videoId: string;
  title: string;
  url: string;
  publishedAt: string;
};

const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${siteConfig.youtube.channelId}`;

function decodeXmlEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function isShort(title: string): boolean {
  return /#shorts?\b/i.test(title);
}

function parseEntries(xml: string): YouTubeVideo[] {
  const entries: YouTubeVideo[] = [];
  const entryRx = /<entry>([\s\S]*?)<\/entry>/g;
  let m: RegExpExecArray | null;
  while ((m = entryRx.exec(xml)) !== null) {
    const block = m[1];
    const id = /<yt:videoId>([^<]+)<\/yt:videoId>/.exec(block)?.[1];
    const title = /<title>([^<]+)<\/title>/.exec(block)?.[1];
    const published = /<published>([^<]+)<\/published>/.exec(block)?.[1];
    if (!id || !title) continue;
    entries.push({
      videoId: id,
      title: decodeXmlEntities(title),
      url: `https://www.youtube.com/watch?v=${id}`,
      publishedAt: published ?? "",
    });
  }
  return entries;
}

export async function getLatestVideo(): Promise<YouTubeVideo> {
  const fallback: YouTubeVideo = {
    videoId: siteConfig.youtube.fallbackVideoId,
    title: siteConfig.youtube.fallbackTitle,
    url: `https://www.youtube.com/watch?v=${siteConfig.youtube.fallbackVideoId}`,
    publishedAt: "",
  };

  try {
    const res = await fetch(FEED_URL, { next: { revalidate: 1800 } });
    if (!res.ok) return fallback;
    const xml = await res.text();
    const entries = parseEntries(xml);
    const longform = entries.find((e) => !isShort(e.title));
    return longform ?? entries[0] ?? fallback;
  } catch {
    return fallback;
  }
}
