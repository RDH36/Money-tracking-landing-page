import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://moneytracker.mg"),
  title: {
    default: "Money Tracker - Suivi des Dépenses Offline | Madagascar",
    template: "%s | Money Tracker",
  },
  description:
    "Prenez le contrôle de vos finances en 10 secondes. Money Tracker est l'app mobile offline-first de suivi des dépenses. Support MGA, EUR, USD. 100% gratuit.",
  keywords: [
    "money tracker",
    "suivi dépenses",
    "budget madagascar",
    "offline app",
    "ariary",
    "gestion finances",
    "expense tracker",
  ],
  authors: [{ name: "Money Tracker Team" }],
  creator: "Money Tracker",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://moneytracker.mg",
    title: "Money Tracker - Suivi des Dépenses Offline pour Madagascar",
    description:
      "Application mobile gratuite de suivi des dépenses. 100% offline, multi-devises.",
    siteName: "Money Tracker",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Money Tracker - Application de suivi des dépenses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Money Tracker - Suivi des Dépenses Offline",
    description: "Application mobile gratuite. 100% offline, multi-devises.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
