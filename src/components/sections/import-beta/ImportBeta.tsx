"use client";

import Link from "next/link";
import { CheckCircle, Download, FlaskConical } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { FadeIn } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VerticalVideo } from "@/components/media/VerticalVideo";
import { siteConfig } from "@/constants/content";

// Set at build time by next.config.ts when public/videos/teaser-import.mp4 exists
const teaserSrc =
  process.env.NEXT_PUBLIC_TEASER_IMPORT === "1"
    ? "/videos/teaser-import.mp4"
    : undefined;

const pointKeys = ["sources", "fees", "duplicates", "offline"] as const;

export function ImportBeta() {
  const t = useTranslations("importBeta");
  const locale = useLocale();

  return (
    <section id="import" className="py-20 bg-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <FadeIn>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge className="bg-green-100 text-green-700 border-green-200">
                {t("soon")}
              </Badge>
              <Badge variant="outline" className="border-primary text-primary">
                {t("beta")}
              </Badge>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              {t("headline")}
            </h2>
            <p className="text-lg text-gray-600 mb-8">{t("subheadline")}</p>

            <ul className="space-y-4 mb-6">
              {pointKeys.map((key) => (
                <li key={key} className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">
                      {t(`points.${key}.title`)}
                    </p>
                    <p className="text-gray-600">
                      {t(`points.${key}.description`)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-500 mb-8">{t("quota")}</p>

            <div className="bg-white rounded-xl p-6 border border-gray-200 mb-8">
              <div className="flex items-center gap-2 mb-2">
                <FlaskConical className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-gray-900">
                  {t("tester.title")}
                </h3>
              </div>
              <p className="text-gray-600 mb-3">{t("tester.description")}</p>
              <Link
                href={`/${locale}/tirage`}
                className="text-sm font-medium text-primary hover:underline"
              >
                {t("tester.rules")}
              </Link>
            </div>

            <p className="text-gray-700 font-medium mb-4">{t("cta.text")}</p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all group"
              asChild
            >
              <a
                href={siteConfig.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                {t("cta.button")}
              </a>
            </Button>
          </FadeIn>

          <FadeIn delay={0.2}>
            <VerticalVideo
              src={teaserSrc}
              fallbackSrc="/import/apercu-import.jpg"
              fallbackAlt={t("media.imageAlt")}
              videoLabel={t("media.videoLabel")}
            />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
