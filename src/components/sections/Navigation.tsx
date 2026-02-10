"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("navigation");
  const tSite = useTranslations("siteConfig");

  const navItems = [
    { name: t("home"), href: "#" },
    { name: t("features"), href: "#features" },
    { name: t("faq"), href: "#faq" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <img src="/logo-2.png" alt="Mitsitsy" className="w-8 h-8" />
            <span className="font-bold text-xl text-gray-900">{tSite("name")}</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-primary transition-colors font-medium"
              >
                {item.name}
              </a>
            ))}
            <LanguageSwitcher />
            <Button asChild className="bg-primary hover:bg-primary/90">
              <a href="#newsletter">{t("getNotified")}</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? t("closeMenu") : t("openMenu")}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-primary transition-colors font-medium py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <LanguageSwitcher />
              <Button asChild className="bg-primary hover:bg-primary/90 w-full">
                <a href="#newsletter" onClick={() => setIsOpen(false)}>
                  {t("getNotified")}
                </a>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
