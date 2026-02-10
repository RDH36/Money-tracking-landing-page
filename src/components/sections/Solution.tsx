"use client";

import { Eye, Zap, WifiOff, Coins } from "lucide-react";
import { useTranslations } from "next-intl";
import { FadeIn, StaggerContainer, StaggerItem, ScaleOnHover } from "@/components/motion";

const icons = [Eye, Zap, WifiOff, Coins];

export function Solution() {
  const t = useTranslations("solution");

  const benefitKeys = ["see", "fast", "offline", "currency"] as const;

  return (
    <section id="solution" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              {t("headline")}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t("valueProposition")}</p>
          </FadeIn>

          <StaggerContainer className="grid sm:grid-cols-2 gap-8">
            {benefitKeys.map((key, index) => {
              const Icon = icons[index];
              return (
                <StaggerItem key={key}>
                  <ScaleOnHover>
                    <div className="bg-gray-50 rounded-xl p-8 border border-gray-100 h-full hover:border-primary/30 transition-colors">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {t(`benefits.${key}.title`)}
                      </h3>
                      <p className="text-gray-600 mb-4">{t(`benefits.${key}.description`)}</p>
                      <p className="text-sm font-medium text-primary">→ {t(`benefits.${key}.outcome`)}</p>
                    </div>
                  </ScaleOnHover>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
