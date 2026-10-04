import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { thumbnailUrl, type YouTubeVideo } from "@/lib/youtube";

const dateFormat = new Intl.DateTimeFormat("de-DE", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

/**
 * Links out to YouTube instead of embedding, so no YouTube cookies are set.
 * Thumbnails go through next/image, i.e. are served from our own domain.
 */
export function VideoGrid({ videos }: { videos: YouTubeVideo[] }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
      {videos.map((v, i) => (
        <ScrollReveal as="li" key={v.videoId} delay={0.04 + i * 0.04}>
            <a
              href={v.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="relative aspect-video overflow-hidden bg-bg-tinted">
                <Image
                  src={thumbnailUrl(v.videoId)}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 22rem, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              {v.publishedAt && (
                <p className="mt-4 text-sm text-text-muted">
                  <time dateTime={v.publishedAt}>
                    {dateFormat.format(new Date(v.publishedAt))}
                  </time>
                </p>
              )}
              <h3 className="mt-2 font-serif text-xl leading-snug text-text-primary group-hover:text-accent transition-colors">
                {v.title}
              </h3>
            </a>
        </ScrollReveal>
      ))}
    </ul>
  );
}
