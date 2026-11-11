import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { siteConfig } from "@/constants/content";

export function Footer() {
  const t = useTranslations("footer");
  const tSite = useTranslations("siteConfig");
  const locale = useLocale();

  return (
    <footer className="lp-footer">
      <div className="lp-page">
        <div className="lp-footer-cols">
          <div>
            <b>{tSite("name")}</b>
            {t("description")}
          </div>
          <div>
            <b>{t("columns.product.title")}</b>
            <a href="#features">{t("columns.product.features")}</a>
            <a href="#faq">{t("columns.product.faq")}</a>
            <a href="#newsletter">{t("columns.product.newsletter")}</a>
          </div>
          <div>
            <b>{t("columns.support.title")}</b>
            <a href={`mailto:${siteConfig.contactEmail}`}>
              {t("columns.support.contact")}
            </a>
            <a href={siteConfig.facebookUrl} target="_blank" rel="noopener">
              {t("columns.support.facebook")}
            </a>
            <Link href={`/${locale}/tirage`}>{t("columns.support.draw")}</Link>
          </div>
          <div>
            <b>{t("columns.legal.title")}</b>
            <Link href={`/${locale}/privacy`}>{t("columns.legal.privacy")}</Link>
            <Link href={`/${locale}/terms`}>{t("columns.legal.terms")}</Link>
          </div>
        </div>
        <div className="lp-footer-bottom">
          {t.rich("copyright", {
            author: (chunks) => (
              <a href={siteConfig.authorUrl} target="_blank" rel="noopener">
                {chunks}
              </a>
            ),
          })}
        </div>
      </div>
    </footer>
  );
}
