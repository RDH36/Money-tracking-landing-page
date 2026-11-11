import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getTranslations } from "next-intl/server";

const PRIVACY_URL = "https://www.mitsitsy.app/privacy";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tirage" });
  return {
    title: t("title"),
    description: t("metaDescription"),
  };
}

export default async function TiragePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tirage" });

  const simpleSections = (keys: readonly string[]) =>
    keys.map((key) => (
      <section key={key} className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {t(`sections.${key}.title`)}
        </h2>
        <p className="text-gray-600 mb-4">{t(`sections.${key}.content`)}</p>
      </section>
    ));

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
            {/* Sections 1-3: Organizer, Free entry, Who */}
            {simpleSections(["organizer", "free", "who"])}

            {/* Section 4: How to enter */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {t("sections.how.title")}
              </h2>
              <ol className="list-decimal list-outside pl-5 text-gray-600 mb-4 space-y-1">
                {[0, 1].map((i) => (
                  <li key={i}>{t(`sections.how.steps.${i}`)}</li>
                ))}
              </ol>
              <p className="text-gray-600 mb-4">{t("sections.how.content")}</p>
            </section>

            {/* Section 5: Dates */}
            {simpleSections(["dates"])}

            {/* Section 6: Prizes */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {t("sections.prizes.title")}
              </h2>
              <p className="text-gray-600 mb-4">
                {t("sections.prizes.lead")}
                <strong>{t("sections.prizes.prize")}</strong>{" "}
                {t("sections.prizes.rest")}
              </p>
            </section>

            {/* Section 7: Winners */}
            {simpleSections(["winners"])}

            {/* Section 8: Personal data */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {t("sections.data.title")}
              </h2>
              <p className="text-gray-600 mb-4">
                {t("sections.data.content")} {t("sections.data.seeAlso")}{" "}
                <Link
                  href={`/${locale}/privacy`}
                  className="text-primary hover:underline break-words"
                >
                  {PRIVACY_URL}
                </Link>
                .
              </p>
            </section>

            {/* Section 9: Changes or cancellation */}
            {simpleSections(["changes"])}
          </div>
        </div>
      </div>
    </div>
  );
}
