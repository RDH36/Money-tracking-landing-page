"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
// TODO: Décommenter après le lancement - import { CheckCircle, Star, Download } from "lucide-react";
import { CheckCircle, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// TODO: Décommenter après le lancement - import { siteConfig } from "@/constants/content";
import { hero } from "@/constants/content";

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

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
              {hero.headline.split("10 Secondes")[0]}
              <span className="text-primary">10 Secondes</span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {hero.subheadline}
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
              {hero.benefits.map((benefit, i) => (
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
                  Être notifié du lancement
                </a>
              </Button>
              <Badge variant="secondary" className="text-sm px-3 py-1">
                Bientôt disponible
              </Badge>
            </motion.div>

            {/* TODO: POST-LAUNCH - Décommenter et supprimer la section PRE-LAUNCH ci-dessus
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                size="lg"
                className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-6"
                asChild
              >
                <a href={siteConfig.playStoreUrl} target="_blank" rel="noopener noreferrer">
                  <Download className="w-5 h-5 mr-2" />
                  Télécharger sur Google Play
                </a>
              </Button>
            </motion.div>

            <motion.div
              className="mt-8 flex flex-wrap items-center gap-6 text-sm text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <span className="flex items-center gap-1">
                <span className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </span>
                <span className="ml-1">{hero.stats.rating}</span>
              </span>
              <span className="text-gray-300">|</span>
              <span>{hero.stats.downloads} téléchargements sur Play Store</span>
            </motion.div>
            */}

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
                    alt="Money Tracker Dashboard"
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
