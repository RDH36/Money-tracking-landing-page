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
  const t = await getTranslations({ locale, namespace: "terms" });
  return {
    title: t("title") + " | Mitsitsy",
    description: t("title"),
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "terms" });

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

            {/* Section 1: Acceptance */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {t("sections.acceptance.title")}
              </h2>
              <p className="text-gray-600 mb-4">
                {t("sections.acceptance.content")}
              </p>
            </section>

            {/* Section 2: Description */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {t("sections.description.title")}
              </h2>
              <p className="text-gray-600 mb-4">
                {t("sections.description.content")}
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
                {[0, 1, 2, 3, 4].map((i) => (
                  <li key={i}>{t(`sections.description.items.${i}`)}</li>
                ))}
              </ul>
              <p className="text-gray-600 mb-4">
                {t("sections.description.offline")}
              </p>
            </section>

            {/* Section 3: Usage */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {t("sections.usage.title")}
              </h2>
              <p className="text-gray-600 mb-4">
                {t("sections.usage.content")}
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
                {[0, 1, 2, 3].map((i) => (
                  <li key={i}>{t(`sections.usage.items.${i}`)}</li>
                ))}
              </ul>
            </section>

            {/* Section 4: Intellectual Property */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {t("sections.intellectualProperty.title")}
              </h2>
              <p className="text-gray-600 mb-4">
                {t("sections.intellectualProperty.content")}
              </p>
            </section>

            {/* Section 5: Data Responsibility */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {t("sections.dataResponsibility.title")}
              </h2>
              <p className="text-gray-600 mb-4">
                <strong>
                  {t("sections.dataResponsibility.yourData").split(":")[0]}:
                </strong>{" "}
                {t("sections.dataResponsibility.yourData")
                  .split(":")
                  .slice(1)
                  .join(":")}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>
                  {t("sections.dataResponsibility.backup").split(":")[0]}:
                </strong>{" "}
                {t("sections.dataResponsibility.backup")
                  .split(":")
                  .slice(1)
                  .join(":")}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>
                  {t("sections.dataResponsibility.accuracy").split(":")[0]}:
                </strong>{" "}
                {t("sections.dataResponsibility.accuracy")
                  .split(":")
                  .slice(1)
                  .join(":")}
              </p>
            </section>

            {/* Section 6: Liability */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {t("sections.liability.title")}
              </h2>
              <p className="text-gray-600 mb-4">
                {t("sections.liability.content")}
              </p>
              <p className="text-gray-600 mb-4">
                {t("sections.liability.noLiability")}
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
                {[0, 1, 2].map((i) => (
                  <li key={i}>{t(`sections.liability.items.${i}`)}</li>
                ))}
              </ul>
            </section>

            {/* Section 7: Free */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {t("sections.free.title")}
              </h2>
              <p className="text-gray-600 mb-4">
                {t("sections.free.content")}
              </p>
            </section>

            {/* Section 8: Modifications */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {t("sections.modifications.title")}
              </h2>
              <p className="text-gray-600 mb-4">
                {t("sections.modifications.content")}
              </p>
            </section>

            {/* Section 9: Termination */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {t("sections.termination.title")}
              </h2>
              <p className="text-gray-600 mb-4">
                {t("sections.termination.content")}
              </p>
            </section>

            {/* Section 10: Law */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {t("sections.law.title")}
              </h2>
              <p className="text-gray-600 mb-4">
                {t("sections.law.content")}
              </p>
            </section>

            {/* Section 11: Contact */}
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
