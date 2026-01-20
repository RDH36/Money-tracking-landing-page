"use client";

import { FadeIn, StaggerContainer, StaggerItem, ScaleOnHover } from "@/components/motion";
import { solution } from "@/constants/content";

export function Solution() {
  return (
    <section id="solution" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              {solution.headline}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">{solution.valueProposition}</p>
          </FadeIn>

          <StaggerContainer className="grid sm:grid-cols-2 gap-8">
            {solution.benefits.map((benefit, index) => (
              <StaggerItem key={index}>
                <ScaleOnHover>
                  <div className="bg-gray-50 rounded-xl p-8 border border-gray-100 h-full hover:border-primary/30 transition-colors">
                    <span className="text-4xl mb-4 block">{benefit.icon}</span>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                    <p className="text-gray-600 mb-4">{benefit.description}</p>
                    <p className="text-sm font-medium text-primary">→ {benefit.outcome}</p>
                  </div>
                </ScaleOnHover>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
