import type { SocialPlatform } from "@/lib/site";

type SocialIconProps = {
  platform: SocialPlatform;
  className?: string;
};

export function SocialIcon({ platform, className }: SocialIconProps) {
  const shared = {
    className,
    width: 18,
    height: 18,
    "aria-hidden": true as const,
    focusable: false as const,
  };

  switch (platform) {
    case "x":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" {...shared}>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...shared}>
          <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
          <circle cx="12" cy="12" r="4.1" />
          <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" {...shared}>
          <path d="M4.98 3.5a2.25 2.25 0 1 1 0 4.5 2.25 2.25 0 0 1 0-4.5zM3.75 9h2.46v11.25H3.75V9zm5.13 0h2.36v1.54h.03c.33-.62 1.14-1.28 2.35-1.28 2.51 0 2.97 1.65 2.97 3.8v6.19h-2.46v-5.49c0-1.31-.03-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9v5.59H8.88V9z" />
        </svg>
      );
    case "mail":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...shared}>
          <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
          <path d="m4.5 7.5 7.5 5.5 7.5-5.5" />
        </svg>
      );
  }
}
