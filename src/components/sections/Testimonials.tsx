"use client";

import { Quote } from "lucide-react";
import { useTranslations } from "next-intl";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const testimonialKeys = ["rakoto", "marie", "jean"] as const;

export function Testimonials() {
  const t = useTranslations("testimonials");

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t("sectionTitle")}
            </h2>
            <p className="text-lg text-gray-600">{t("sectionSubtitle")}</p>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {testimonialKeys.map((key) => (
              <StaggerItem key={key}>
                <Card className="h-full border-gray-200 hover:border-primary/30 transition-colors">
                  <CardContent className="p-6">
                    <Quote className="w-8 h-8 text-primary/30 mb-4" />
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      "{t(`items.${key}.quote`)}"
                    </p>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {t(`items.${key}.author`)}
                        </p>
                        <p className="text-sm text-gray-500">
                          {t(`items.${key}.role`)}, {t(`items.${key}.location`)}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="mt-4 bg-primary/10 text-primary border-0">
                      {t(`items.${key}.result`)}
                    </Badge>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
