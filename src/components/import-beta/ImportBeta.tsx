import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { VerticalVideo } from "@/components/media/VerticalVideo";

// Set at build time by next.config.ts when public/videos/teaser-import.mp4 exists
const teaserSrc =
  process.env.NEXT_PUBLIC_TEASER_IMPORT === "1"
    ? "/videos/teaser-import.mp4"
    : undefined;

const stepKeys = ["pick", "check", "save"] as const;

export function ImportBeta() {
  const t = useTranslations("importBeta");
  const locale = useLocale();

  return (
    <section id="import" className="lp-section">
      <div className="lp-page">
        <div className="lp-soon">
          <VerticalVideo
            src={teaserSrc}
            fallbackSrc="/import/import-done.jpg"
            fallbackAlt={t("media.imageAlt")}
            videoLabel={t("media.videoLabel")}
            playLabel={t("media.play")}
          />
          <div>
            <span className="lp-eyebrow">{t("soon")}</span>
            <h2>{t("headline")}</h2>
            <p>{t("subheadline")}</p>
            <ol className="lp-steps">
              {stepKeys.map((key) => (
                <li key={key}>
                  <div>
                    {t(`steps.${key}.title`)}
                    <span>{t(`steps.${key}.description`)}</span>
                  </div>
                </li>
              ))}
            </ol>
            <div className="lp-draw">
              <p>
                {t.rich("tester.description", {
                  b: (chunks) => <b>{chunks}</b>,
                })}
              </p>
              <Link href={`/${locale}/tirage`}>{t("tester.rules")}</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
