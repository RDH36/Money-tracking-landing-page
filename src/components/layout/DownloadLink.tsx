import { siteConfig } from "@/constants/content";

interface DownloadLinkProps {
  label: string;
  className?: string;
  withIcon?: boolean;
}

/** Link to the Play Store listing, styled as the main button. */
export function DownloadLink({
  label,
  className = "",
  withIcon = false,
}: DownloadLinkProps) {
  return (
    <a
      className={`lp-btn ${className}`.trim()}
      href={siteConfig.playStoreUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      {withIcon && (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 4v11m0 0-4-4m4 4 4-4M5 20h14" />
        </svg>
      )}
      {label}
    </a>
  );
}
