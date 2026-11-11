import { useTranslations } from "next-intl";
import { PhoneFrame } from "@/components/intro/PhoneFrame";

const promiseKeys = ["see", "fast", "offline", "currency"] as const;

export function Solution() {
  const t = useTranslations("solution");
  const tShots = useTranslations("screenshots");

  return (
    <section className="lp-section">
      <div className="lp-page">
        <div className="lp-solution-head">
          <h2>{t("headline")}</h2>
          <p>{t("valueProposition")}</p>
        </div>
        <div className="lp-solution-body">
          <PhoneFrame
            src="/app/add-light.jpg"
            darkSrc="/app/add-dark.jpg"
            alt={tShots("entry")}
          />
          <div className="lp-promises">
            {promiseKeys.map((key) => (
              <article key={key}>
                <h3>{t(`benefits.${key}.title`)}</h3>
                <p>{t(`benefits.${key}.description`)}</p>
                <span className="lp-gain">{t(`benefits.${key}.outcome`)}</span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
