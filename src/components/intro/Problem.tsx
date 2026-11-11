import { useTranslations } from "next-intl";

const findingKeys = ["salary", "offline"] as const;

export function Problem() {
  const t = useTranslations("problem");

  return (
    <section className="lp-section">
      <div className="lp-page">
        <h2>{t("headline")}</h2>
        <div className="lp-findings">
          {findingKeys.map((key) => (
            <article key={key}>
              <h3>{t(`painPoints.${key}.title`)}</h3>
              <p>{t(`painPoints.${key}.description`)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
