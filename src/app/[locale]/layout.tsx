import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });

  const titles: Record<string, string> = {
    en: "Mitsitsy - Offline expense tracking | Madagascar",
    fr: "Mitsitsy - Suivi des dépenses offline | Madagascar",
    mg: "Mitsitsy - Fanaraha-maso fandaniana offline | Madagasikara",
  };

  const descriptions: Record<string, string> = {
    en: "Take control of your finances in 10 seconds. Mitsitsy is the offline-first mobile expense tracking app. MGA, EUR, USD support. 100% free.",
    fr: "Prenez le contrôle de vos finances en 10 secondes. Mitsitsy est l'app mobile offline-first de suivi des dépenses. Support MGA, EUR, USD. 100% gratuit.",
    mg: "Tantano ny volanao anatin'ny 10 segondra. Mitsitsy dia rindranasa finday fanaraha-maso fandaniana offline-first. Tohanana MGA, EUR, USD. 100% maimaim-poana.",
  };

  const ogLocales: Record<string, string> = {
    en: "en_US",
    fr: "fr_FR",
    mg: "mg_MG",
  };

  return {
    title: {
      default: titles[locale] || titles.en,
      template: "%s | Mitsitsy",
    },
    description: descriptions[locale] || descriptions.en,
    openGraph: {
      locale: ogLocales[locale] || ogLocales.en,
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "fr" | "mg")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
