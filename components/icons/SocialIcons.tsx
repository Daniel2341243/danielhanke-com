import { siteConfig } from "@/lib/siteConfig";

const STROKE = 1.5;
const SIZE = 20;

type IconProps = React.SVGProps<SVGSVGElement>;

const baseSvgProps = {
  width: SIZE,
  height: SIZE,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: STROKE,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function YouTubeIcon(props: IconProps) {
  return (
    <svg {...baseSvgProps} {...props}>
      <rect x="2" y="5.5" width="20" height="13" rx="3" />
      <path d="M10 9.5v5l5-2.5z" />
    </svg>
  );
}

function InstagramIcon(props: IconProps) {
  return (
    <svg {...baseSvgProps} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon(props: IconProps) {
  return (
    <svg {...baseSvgProps} {...props}>
      <path d="M14 4v9.5a3.5 3.5 0 1 1-3.5-3.5" />
      <path d="M14 4c.4 2.4 2.2 4.2 4.6 4.6" />
    </svg>
  );
}

function LinkedInIcon(props: IconProps) {
  return (
    <svg {...baseSvgProps} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7.5 10v7" />
      <circle cx="7.5" cy="7.5" r="0.6" fill="currentColor" stroke="none" />
      <path d="M11.5 17v-4.5a2.5 2.5 0 0 1 5 0V17" />
      <path d="M11.5 10v7" />
    </svg>
  );
}

function AmazonIcon(props: IconProps) {
  return (
    <svg {...baseSvgProps} {...props}>
      <path d="M4 16.5c2.4 1.7 5.3 2.5 8 2.5s5.6-.8 8-2.5" />
      <path d="M18.5 18.2c.5-.4.7-1 .5-1.5" />
      <path d="M9 11c0-2.2 1.7-3.5 4-3.5S17 8.8 17 11v3c0 1 .3 1.7.8 2.3" />
      <path d="M9 13c0 1.4 1.1 2.5 2.5 2.5 1.4 0 2.5-1 2.5-2.3v-1.7" />
    </svg>
  );
}

const channels = [
  { key: "youtube", Icon: YouTubeIcon, href: siteConfig.social.youtube, label: "YouTube" },
  { key: "instagram", Icon: InstagramIcon, href: siteConfig.social.instagram, label: "Instagram" },
  { key: "tiktok", Icon: TikTokIcon, href: siteConfig.social.tiktok, label: "TikTok" },
  { key: "linkedin", Icon: LinkedInIcon, href: siteConfig.social.linkedin, label: "LinkedIn" },
  { key: "amazon", Icon: AmazonIcon, href: siteConfig.social.amazon, label: "Amazon" },
] as const;

export function SocialIcons({ className }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-5 ${className ?? ""}`}>
      {channels.map(({ key, Icon, href, label }) => (
        <li key={key}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="text-text-secondary hover:text-accent transition-colors duration-200 inline-flex"
          >
            <Icon />
          </a>
        </li>
      ))}
    </ul>
  );
}
