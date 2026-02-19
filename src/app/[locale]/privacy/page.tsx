import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });
  return {
    title: t("title") + " | Mitsitsy",
    description: t("title"),
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center text-primary hover:text-primary/80 mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("backHome")}
          </Link>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
            {t("title")}
          </h1>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-6">{t("lastUpdated")}</p>

            {/* Section 1: Introduction */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {t("sections.introduction.title")}
              </h2>
              <p className="text-gray-600 mb-4">
                {t("sections.introduction.content")}
              </p>
            </section>

            {/* Section 2: Data Collected */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {t("sections.dataCollected.title")}
              </h2>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                {t("sections.dataCollected.appData.title")}
              </h3>
              <p className="text-gray-600 mb-4">
                {t("sections.dataCollected.appData.content")}
              </p>

              <h3 className="text-lg font-medium text-gray-800 mb-2">
                {t("sections.dataCollected.newsletter.title")}
              </h3>
              <p className="text-gray-600 mb-4">
                {t("sections.dataCollected.newsletter.content")}
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
                {[0, 1, 2].map((i) => (
                  <li key={i}>
                    {t(`sections.dataCollected.newsletter.items.${i}`)}
                  </li>
                ))}
              </ul>
              <p className="text-gray-600 mb-4">
                {t("sections.dataCollected.newsletter.usage")}
              </p>
            </section>

            {/* Section 3: Data Storage */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {t("sections.dataStorage.title")}
              </h2>
              <p className="text-gray-600 mb-4">
                <strong>
                  {t("sections.dataStorage.appData").split(":")[0]}:
                </strong>{" "}
                {t("sections.dataStorage.appData").split(":").slice(1).join(":")}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>
                  {t("sections.dataStorage.newsletterData").split(":")[0]}:
                </strong>{" "}
                {t("sections.dataStorage.newsletterData")
                  .split(":")
                  .slice(1)
                  .join(":")}
              </p>
            </section>

            {/* Section 4: Data Sharing */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {t("sections.dataSharing.title")}
              </h2>
              <p className="text-gray-600 mb-4">
                {t("sections.dataSharing.noSelling")}
              </p>
              <p className="text-gray-600 mb-4">
                {t("sections.dataSharing.localOnly")}
              </p>
            </section>

            {/* Section 5: Your Rights */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {t("sections.yourRights.title")}
              </h2>
              <p className="text-gray-600 mb-4">
                {t("sections.yourRights.content")}
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
                {[0, 1, 2, 3, 4].map((i) => (
                  <li key={i}>{t(`sections.yourRights.items.${i}`)}</li>
                ))}
              </ul>
              <p className="text-gray-600 mb-4">
                {t("sections.yourRights.contact")}
              </p>
            </section>

            {/* Section 6: Security */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {t("sections.security.title")}
              </h2>
              <p className="text-gray-600 mb-4">
                {t("sections.security.content")}
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
                {[0, 1, 2, 3].map((i) => (
                  <li key={i}>{t(`sections.security.items.${i}`)}</li>
                ))}
              </ul>
            </section>

            {/* Section 7: Modifications */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {t("sections.modifications.title")}
              </h2>
              <p className="text-gray-600 mb-4">
                {t("sections.modifications.content")}
              </p>
            </section>

            {/* Section 8: Contact */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {t("sections.contact.title")}
              </h2>
              <p className="text-gray-600 mb-4">
                {t("sections.contact.content")}
              </p>
              <p className="text-gray-600">
                {t("sections.contact.email")}{" "}
                <a
                  href="mailto:raymond.dzeryhago36@gmail.com"
                  className="text-primary hover:underline"
                >
                  raymond.dzeryhago36@gmail.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
