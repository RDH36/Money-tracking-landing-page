"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { routing } from "@/i18n/routing";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-full p-1">
      {routing.locales.filter((loc) => loc !== "mg").map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${
            locale === loc
              ? "bg-primary text-white"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
