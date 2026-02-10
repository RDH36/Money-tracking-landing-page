"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CheckCircle, Bell } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  const ref = useRef(null);
  const t = useTranslations("hero");
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const benefits = [
    t("benefits.fast"),
    t("benefits.offline"),
    t("benefits.multicurrency"),
  ];

  // Split headline to highlight "10 Secondes/Seconds/Segondra"
  const headline = t("headline");
  const highlightMatch = headline.match(/(10\s*\w+)/);
  const highlightText = highlightMatch ? highlightMatch[0] : "10 Secondes";
  const headlineParts = headline.split(highlightText);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden pt-16"
    >
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          {/* Text Content */}
          <motion.div style={{ y: textY }}>
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {headlineParts[0]}
              <span className="text-primary">{highlightText}</span>
              {headlineParts[1] || ""}
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t("subheadline")}
            </motion.p>

            {/* Benefits List */}
            <motion.ul
              className="space-y-3 mb-8"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.3,
                  },
                },
              }}
            >
              {benefits.map((benefit, i) => (
                <motion.li
                  key={i}
                  className="flex items-start text-gray-700"
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <CheckCircle className="w-5 h-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </motion.li>
              ))}
            </motion.ul>

            {/* PRE-LAUNCH: Newsletter CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all group"
                asChild
              >
                <a href="#newsletter">
                  <Bell className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                  {t("notifyLaunch")}
                </a>
              </Button>
              <Badge variant="secondary" className="text-sm px-3 py-1">
                {t("comingSoon")}
              </Badge>
            </motion.div>
          </motion.div>

          {/* Screenshot */}
          <motion.div
            className="relative hidden lg:block"
            style={{ y: imageY }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              {/* Phone Mockup */}
              <div className="relative mx-auto w-[280px] h-[580px] bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-10" />
                <div className="w-full h-full rounded-[2.5rem] overflow-hidden">
                  <img
                    src="/screen.jpg"
                    alt="Mitsitsy Dashboard"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
              {/* Floating Badge */}
              <div className="absolute -right-4 top-20 bg-white rounded-lg shadow-lg px-4 py-2 border border-gray-100">
                <p className="text-sm font-semibold text-primary">100% Offline</p>
              </div>
              {/* Second Badge */}
              <div className="absolute -left-4 bottom-32 bg-white rounded-lg shadow-lg px-4 py-2 border border-gray-100">
                <p className="text-sm font-semibold text-green-600">Multi-devises</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
