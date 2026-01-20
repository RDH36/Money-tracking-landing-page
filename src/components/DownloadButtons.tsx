"use client";

import { Smartphone, Apple } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/constants/content";

interface DownloadButtonsProps {
  className?: string;
  size?: "default" | "lg";
}

export function DownloadButtons({ className, size = "lg" }: DownloadButtonsProps) {
  return (
    <div className={`flex flex-col sm:flex-row gap-4 ${className}`}>
      <Button
        size={size}
        className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all group"
        asChild
      >
        <a href={siteConfig.playStoreUrl} target="_blank" rel="noopener noreferrer">
          <Smartphone className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
          Télécharger sur Android
        </a>
      </Button>

      <Button
        size={size}
        variant="outline"
        className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-6 text-base font-semibold transition-all group"
        asChild
      >
        <a href={siteConfig.appStoreUrl} target="_blank" rel="noopener noreferrer">
          <Apple className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
          Télécharger sur iOS
        </a>
      </Button>
    </div>
  );
}
