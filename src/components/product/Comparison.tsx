import { useTranslations } from "next-intl";

const criteriaKeys = ["entryTime", "internet", "price", "privacy"] as const;

export function Comparison() {
  const t = useTranslations("comparison");

  return (
    <>
      <h2 className="lp-compare-title">{t("headline")}</h2>
      <table className="lp-compare">
        <thead>
          <tr>
            <th scope="col">{t("criteriaLabel")}</th>
            <th scope="col">{t("traditional")}</th>
            <th scope="col">{t("mitsitsy")}</th>
          </tr>
        </thead>
        <tbody>
          {criteriaKeys.map((key) => (
            <tr key={key}>
              <th scope="row">{t(`criteria.${key}.label`)}</th>
              <td>{t(`criteria.${key}.traditional`)}</td>
              <td>{t(`criteria.${key}.mitsitsy`)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
