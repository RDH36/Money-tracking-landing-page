"use client";

import { CheckCircle, Bell } from "lucide-react";
import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function CTAFinal() {
  const t = useTranslations("cta");

  const guarantees = [
    t("guarantees.notification"),
    t("guarantees.earlyAccess"),
    t("guarantees.freeForever"),
    t("guarantees.localData"),
  ];

  return (
    <section id="cta" className="py-20 bg-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <Badge variant="secondary" className="mb-4">
              {t("comingSoon")}
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              {t("headline")}
            </h2>
            <p className="text-lg text-gray-600 mb-4">{t("subheadline")}</p>
            <p className="text-primary font-medium mb-8">{t("tagline")}</p>
          </FadeIn>

          <FadeIn delay={0.2} className="flex justify-center mb-8">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all group"
              asChild
            >
              <a href="#newsletter">
                <Bell className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                {t("comingSoon")}
              </a>
            </Button>
          </FadeIn>

          {/* Guarantees */}
          <FadeIn delay={0.3}>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
              {guarantees.map((guarantee, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>{guarantee}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
