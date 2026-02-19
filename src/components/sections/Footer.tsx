"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");
  const tSite = useTranslations("siteConfig");
  const locale = useLocale();

  const columns = [
    {
      title: t("columns.product.title"),
      links: [
        { name: t("columns.product.features"), href: "#features" },
        { name: t("columns.product.faq"), href: "#faq" },
        { name: t("columns.product.newsletter"), href: "#newsletter" },
      ],
    },
    {
      title: t("columns.support.title"),
      links: [
        { name: t("columns.support.contact"), href: "mailto:raymond.dzeryhago36@gmail.com" },
      ],
    },
    {
      title: t("columns.legal.title"),
      links: [
        { name: t("columns.legal.privacy"), href: `/${locale}/privacy` },
        { name: t("columns.legal.terms"), href: `/${locale}/terms` },
      ],
    },
  ];

  const social = [
    { name: t("social.facebook"), href: "#" },
    { name: t("social.twitter"), href: "#" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo-2.png" alt="Mitsitsy" className="w-8 h-8" />
              <span className="font-bold text-xl text-white">{tSite("name")}</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">{t("description")}</p>
            <div className="flex gap-4">
              {social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-primary transition-colors"
                  aria-label={item.name}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="font-semibold text-white mb-4">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
          {t("copyright")}
        </div>
      </div>
    </footer>
  );
}
