import { useTranslations } from "next-intl";
import { DownloadLink } from "@/components/layout/DownloadLink";

/** Download bar fixed at the bottom on mobile (hidden from 900px up). */
export function StickyDownload() {
  const t = useTranslations("hero");

  return (
    <div className="lp-thumb">
      <DownloadLink label={t("notifyLaunch")} />
    </div>
  );
}
