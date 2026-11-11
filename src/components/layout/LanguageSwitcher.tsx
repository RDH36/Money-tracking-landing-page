"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { routing } from "@/i18n/routing";

export function LanguageSwitcher({ label }: { label: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <div className="lp-lang" role="group" aria-label={label}>
      {routing.locales
        .filter((loc) => loc !== "mg")
        .map((loc) => (
          <button
            key={loc}
            type="button"
            lang={loc}
            aria-pressed={locale === loc}
            onClick={() => switchLocale(loc)}
          >
            {loc.toUpperCase()}
          </button>
        ))}
    </div>
  );
}
