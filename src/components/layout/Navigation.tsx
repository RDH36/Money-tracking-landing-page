import { useLocale, useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { DownloadLink } from "@/components/layout/DownloadLink";

export function Navigation() {
  const t = useTranslations("navigation");
  const tSite = useTranslations("siteConfig");
  const locale = useLocale();

  return (
    <header className="lp-page lp-nav">
      <a className="lp-logo" href={`/${locale}`}>
        <img src="/new-logo.png" alt="" width={30} height={30} />
        {tSite("name")}
      </a>
      <a className="lp-nav-link" href="#import">
        {t("import")}
      </a>
      <a className="lp-nav-link" href="#features">
        {t("features")}
      </a>
      <a className="lp-nav-link" href="#faq">
        {t("faq")}
      </a>
      <LanguageSwitcher label={t("language")} />
      <DownloadLink label={t("getNotified")} className="lp-btn-small" />
    </header>
  );
}
