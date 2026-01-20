"use client";

import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";
import { problem } from "@/constants/content";

export function Problem() {
  return (
    <section id="problem" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">
              {problem.headline}
            </h2>
          </FadeIn>

          <StaggerContainer className="grid sm:grid-cols-2 gap-6 mb-12">
            {problem.painPoints.map((point, index) => (
              <StaggerItem key={index}>
                <div className="bg-white rounded-xl p-6 border border-gray-200 h-full">
                  <span className="text-4xl mb-4 block">{point.icon}</span>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{point.title}</h3>
                  <p className="text-gray-600">{point.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn delay={0.4}>
            <div className="bg-gray-100 rounded-xl p-6 sm:p-8 text-center">
              <p className="text-lg text-gray-700 leading-relaxed">{problem.agitation}</p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
