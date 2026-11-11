import { useTranslations } from "next-intl";
import { DownloadLink } from "@/components/layout/DownloadLink";
import { NewsletterForm } from "@/components/closing/NewsletterForm";

const guaranteeKeys = ["notification", "earlyAccess", "localData"] as const;

/** Last block of the page: download call and newsletter form together. */
export function FinalBlock() {
  const t = useTranslations("cta");
  const tHero = useTranslations("hero");

  return (
    <section className="lp-section lp-section-flush">
      <div className="lp-page">
        <div className="lp-end">
          <div>
            <h2>{t("headline")}</h2>
            <p>{t("subheadline")}</p>
            <DownloadLink
              label={tHero("notifyLaunch")}
              className="lp-btn-light"
            />
            <ul className="lp-guarantees">
              {guaranteeKeys.map((key) => (
                <li key={key}>{t(`guarantees.${key}`)}</li>
              ))}
            </ul>
          </div>
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
}
