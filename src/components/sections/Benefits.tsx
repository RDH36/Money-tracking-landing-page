"use client";

import { Check, X } from "lucide-react";
import { FadeIn } from "@/components/motion";
import { comparison } from "@/constants/content";

export function Benefits() {
  return (
    <section id="benefits" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {comparison.headline}
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Critère</th>
                      <th className="text-center py-4 px-6 font-semibold text-gray-500">
                        Apps Traditionnelles
                      </th>
                      <th className="text-center py-4 px-6 font-semibold text-primary">
                        Mitsitsy
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.criteria.map((row, index) => (
                      <tr
                        key={index}
                        className={index !== comparison.criteria.length - 1 ? "border-b border-gray-100" : ""}
                      >
                        <td className="py-4 px-6 font-medium text-gray-900">{row.label}</td>
                        <td className="py-4 px-6 text-center text-gray-500">
                          <span className="flex items-center justify-center gap-2">
                            <X className="w-4 h-4 text-red-400" />
                            {row.traditional}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className="flex items-center justify-center gap-2 font-medium text-primary">
                            <Check className="w-4 h-4" />
                            {row.mitsitsy}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
