import { useTranslations } from "next-intl";

const faqKeys = [
  "availability",
  "free",
  "offline",
  "security",
  "planning",
] as const;

export function FAQ() {
  const t = useTranslations("faq");

  return (
    <section id="faq" className="lp-section">
      <div className="lp-page lp-faq">
        <h2>{t("sectionTitle")}</h2>
        <p className="lp-soft lp-lead">{t("sectionSubtitle")}</p>
        {faqKeys.map((key, index) => (
          <details key={key} open={index === 0}>
            <summary>{t(`items.${key}.question`)}</summary>
            <p>{t(`items.${key}.answer`)}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
