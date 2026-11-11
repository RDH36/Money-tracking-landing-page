import { useTranslations } from "next-intl";

const featureKeys = [
  "fast",
  "offline",
  "currency",
  "planning",
  "charts",
  "gamification",
] as const;

export function Features() {
  const t = useTranslations("features");

  return (
    <>
      <h2>{t("sectionTitle")}</h2>
      <p className="lp-soft lp-lead">{t("sectionSubtitle")}</p>
      <dl className="lp-tools">
        {featureKeys.map((key) => (
          <div key={key}>
            <dt>{t(`items.${key}.title`)}</dt>
            <dd>{t(`items.${key}.description`)}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}
