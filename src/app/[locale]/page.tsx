import type { Viewport } from "next";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { StickyDownload } from "@/components/layout/StickyDownload";
import { Hero } from "@/components/intro/Hero";
import { Problem } from "@/components/intro/Problem";
import { Solution } from "@/components/intro/Solution";
import { ImportBeta } from "@/components/import-beta/ImportBeta";
import { Features } from "@/components/product/Features";
import { Comparison } from "@/components/product/Comparison";
import { FAQ } from "@/components/product/FAQ";
import { FinalBlock } from "@/components/closing/FinalBlock";

// Lets the fixed download bar respect the safe area of the phone
export const viewport: Viewport = { viewportFit: "cover" };

const Ticket = () => <hr className="lp-ticket" />;

export default function Home() {
  return (
    <div className="lp">
      <Navigation />
      <main>
        <Hero />
        <Ticket />
        <ImportBeta />
        <Problem />
        <Ticket />
        <Solution />
        <Ticket />
        <section id="features" className="lp-section">
          <div className="lp-page">
            <Features />
            <Comparison />
          </div>
        </section>
        <Ticket />
        <FAQ />
        <FinalBlock />
      </main>
      <Footer />
      <StickyDownload />
    </div>
  );
}
