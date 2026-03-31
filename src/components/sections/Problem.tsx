"use client";

import { Wallet, WifiOff } from "lucide-react";
import { useTranslations } from "next-intl";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";

const icons = [Wallet, WifiOff];

export function Problem() {
  const t = useTranslations("problem");

  const painPointKeys = ["salary", "offline"] as const;

  return (
    <section id="problem" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">
              {t("headline")}
            </h2>
          </FadeIn>

          <StaggerContainer className="grid sm:grid-cols-2 gap-6">
            {painPointKeys.map((key, index) => {
              const Icon = icons[index];
              return (
                <StaggerItem key={key}>
                  <div className="bg-white rounded-xl p-6 border border-gray-200 h-full">
                    <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-red-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {t(`painPoints.${key}.title`)}
                    </h3>
                    <p className="text-gray-600">{t(`painPoints.${key}.description`)}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
