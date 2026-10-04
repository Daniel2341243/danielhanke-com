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

async function fetchFeed(): Promise<YouTubeVideo[]> {
  try {
    const res = await fetch(FEED_URL, { next: { revalidate: 1800 } });
    if (!res.ok) return [];
    return parseEntries(await res.text());
  } catch {
    return [];
  }
}

export function thumbnailUrl(videoId: string): string {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

/**
 * Latest long-form videos from the channel's public RSS feed (no API key).
 * Falls back to one known real video if the feed is unreachable — never
 * invents entries.
 */
export async function getLatestVideos(limit: number): Promise<YouTubeVideo[]> {
  const longform = (await fetchFeed()).filter((e) => !isShort(e.title));
  if (longform.length > 0) return longform.slice(0, limit);
  return [
    {
      videoId: siteConfig.youtube.fallbackVideoId,
      title: siteConfig.youtube.fallbackTitle,
      url: `https://www.youtube.com/watch?v=${siteConfig.youtube.fallbackVideoId}`,
      publishedAt: "",
    },
  ];
}
