"use client";

import { useActionState } from "react";
import { motion } from "framer-motion";
import { Mail, CheckCircle2, Loader2, Gift, Lightbulb, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn } from "@/components/motion";
import { newsletter } from "@/constants/content";
import { subscribeToNewsletter } from "@/actions/newsletter";

const benefitIcons = [Rocket, Lightbulb, Gift];

export function Newsletter() {
  const [state, formAction, isPending] = useActionState(subscribeToNewsletter, {
    success: false,
  });

  return (
    <section id="newsletter" className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <FadeIn className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {newsletter.headline}
            </h2>
            <p className="text-lg text-gray-600">{newsletter.subheadline}</p>
          </FadeIn>

          {/* Benefits */}
          <FadeIn delay={0.1} className="flex flex-wrap justify-center gap-4 mb-8">
            {newsletter.benefits.map((benefit, index) => {
              const Icon = benefitIcons[index];
              return (
                <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                  <Icon className="w-4 h-4 text-primary" />
                  <span>{benefit}</span>
                </div>
              );
            })}
          </FadeIn>

          <FadeIn delay={0.2}>
            <Card className="border-gray-200 shadow-lg">
              <CardContent className="p-8">
                {!state.success ? (
                  <form action={formAction} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-base font-medium">
                          Email <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="votre@email.com"
                          required
                          className="h-12"
                          disabled={isPending}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-base font-medium">
                          Prénom <span className="text-gray-400">(optionnel)</span>
                        </Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          type="text"
                          placeholder="Votre prénom"
                          className="h-12"
                          disabled={isPending}
                        />
                      </div>
                    </div>

                    {state.error && (
                      <p className="text-sm text-red-500 text-center">{state.error}</p>
                    )}

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-primary hover:bg-primary/90 text-white h-12 font-semibold"
                      disabled={isPending}
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Inscription en cours...
                        </>
                      ) : (
                        <>
                          <Mail className="w-5 h-5 mr-2" />
                          {newsletter.button}
                        </>
                      )}
                    </Button>

                    <p className="text-center text-sm text-gray-500">{newsletter.disclaimer}</p>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Merci pour votre inscription !
                    </h3>
                    <p className="text-gray-600">
                      Vous recevrez bientôt nos dernières actualités.
                    </p>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
