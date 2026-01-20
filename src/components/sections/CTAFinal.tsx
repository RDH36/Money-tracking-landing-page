"use client";

import { CheckCircle, Star } from "lucide-react";
import { FadeIn } from "@/components/motion";
import { DownloadButtons } from "@/components/DownloadButtons";
import { cta, hero } from "@/constants/content";

export function CTAFinal() {
  return (
    <section id="download" className="py-20 bg-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              {cta.headline}
            </h2>
            <p className="text-lg text-gray-600 mb-4">{cta.subheadline}</p>
            <p className="text-primary font-medium mb-8">{cta.tagline}</p>
          </FadeIn>

          <FadeIn delay={0.2} className="flex justify-center mb-8">
            <DownloadButtons />
          </FadeIn>

          {/* Stats */}
          <FadeIn delay={0.3} className="flex flex-wrap justify-center gap-8 mb-8">
            <div className="flex items-center gap-2">
              <span className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </span>
              <span className="font-semibold">{hero.stats.rating}</span>
              <span className="text-gray-500">sur le Play Store</span>
            </div>
            <div className="text-gray-500">
              <span className="font-semibold text-gray-900">{hero.stats.downloads}</span> téléchargements
            </div>
          </FadeIn>

          {/* Guarantees */}
          <FadeIn delay={0.4}>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
              {cta.guarantees.map((guarantee, index) => (
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
