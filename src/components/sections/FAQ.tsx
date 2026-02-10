"use client";

import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FadeIn } from "@/components/motion";

const faqKeys = [
  "availability",
  "free",
  "offline",
  "security",
  "currencies",
  "platforms",
  "notify",
  "planning",
] as const;

export function FAQ() {
  const t = useTranslations("faq");

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t("sectionTitle")}
            </h2>
            <p className="text-lg text-gray-600">
              {t("sectionSubtitle")}
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <Accordion type="single" collapsible className="space-y-4">
              {faqKeys.map((key, index) => (
                <AccordionItem
                  key={key}
                  value={`item-${index}`}
                  className="bg-gray-50 rounded-lg border border-gray-200 px-6"
                >
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-primary hover:no-underline py-4">
                    {t(`items.${key}.question`)}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pb-4">
                    {t(`items.${key}.answer`)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
