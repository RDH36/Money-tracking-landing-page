import { useTranslations } from "next-intl";
import { DownloadLink } from "@/components/layout/DownloadLink";
import { PhoneFrame } from "@/components/intro/PhoneFrame";

// "10 seconds" in the three languages, highlighted in the headline
const highlight = /(10\s(?:secondes|seconds|segondra))/;

export function Hero() {
  const t = useTranslations("hero");
  const tShots = useTranslations("screenshots");
  const parts = t("headline").split(highlight);

  return (
    <section className="lp-hero">
      <div className="lp-page">
        <div>
          <h1>
            {parts.map((part, index) =>
              highlight.test(part) ? (
                <em key={index}>{part.replace(/\s/, " ")}</em>
              ) : (
                part
              )
            )}
          </h1>
          <p className="lp-hero-intro">{t("subheadline")}</p>
          <ul className="lp-proofs">
            <li>{t("benefits.offline")}</li>
            <li>{t("benefits.multicurrency")}</li>
          </ul>
          <div className="lp-hero-action">
            <DownloadLink label={t("notifyLaunch")} withIcon />
            <span className="lp-hero-available">{t("comingSoon")}</span>
          </div>
        </div>
        <div className="lp-hero-scene">
          <PhoneFrame
            src="/app/home-light.jpg"
            darkSrc="/app/home-dark.jpg"
            alt={tShots("home")}
            eager
          />
          <PhoneFrame
            className="lp-phone-second"
            src="/app/add-light.jpg"
            darkSrc="/app/add-dark.jpg"
            alt={tShots("add")}
            eager
          />
        </div>
      </div>
    </section>
  );
}
