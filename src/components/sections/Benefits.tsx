"use client";

import { Check, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/motion";

const criteriaKeys = [
  "entryTime",
  "internet",
  "currency",
  "planning",
  "price",
  "privacy",
] as const;

export function Benefits() {
  const t = useTranslations("comparison");

  return (
    <section id="benefits" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t("headline")}
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">
                        {t("criteriaLabel")}
                      </th>
                      <th className="text-center py-4 px-6 font-semibold text-gray-500">
                        {t("traditional")}
                      </th>
                      <th className="text-center py-4 px-6 font-semibold text-primary">
                        {t("mitsitsy")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {criteriaKeys.map((key, index) => (
                      <tr
                        key={key}
                        className={index !== criteriaKeys.length - 1 ? "border-b border-gray-100" : ""}
                      >
                        <td className="py-4 px-6 font-medium text-gray-900">
                          {t(`criteria.${key}.label`)}
                        </td>
                        <td className="py-4 px-6 text-center text-gray-500">
                          <span className="flex items-center justify-center gap-2">
                            <X className="w-4 h-4 text-red-400" />
                            {t(`criteria.${key}.traditional`)}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className="flex items-center justify-center gap-2 font-medium text-primary">
                            <Check className="w-4 h-4" />
                            {t(`criteria.${key}.mitsitsy`)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
