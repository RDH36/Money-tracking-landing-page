"use client";

import { FadeIn, StaggerContainer, StaggerItem, ScaleOnHover } from "@/components/motion";
import { features } from "@/constants/content";

export function Features() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Tout Ce Dont Vous Avez Besoin. Rien De Plus.
            </h2>
            <p className="text-lg text-gray-600">12 fonctionnalités pensées pour la simplicité</p>
          </FadeIn>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <StaggerItem key={index}>
                  <ScaleOnHover>
                    <div className="bg-white rounded-xl p-6 border border-gray-200 h-full hover:border-primary/30 hover:shadow-lg transition-all">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </ScaleOnHover>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
