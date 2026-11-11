import { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const baseUrl = "https://mitsitsy.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    // Prize draw rules, one page per language
    ...routing.locales.map((locale) => ({
      url: `${baseUrl}/${locale}/tirage`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.3,
    })),
  ];
}
