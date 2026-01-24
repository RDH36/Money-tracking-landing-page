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
  metadataBase: new URL("https://mitsitsy.mg"),
  title: {
    default: "Mitsitsy - Suivi des Dépenses Offline | Madagascar",
    template: "%s | Mitsitsy",
  },
  description:
    "Prenez le contrôle de vos finances en 10 secondes. Mitsitsy est l'app mobile offline-first de suivi des dépenses. Support MGA, EUR, USD. 100% gratuit.",
  keywords: [
    "mitsitsy",
    "suivi dépenses",
    "budget madagascar",
    "offline app",
    "ariary",
    "gestion finances",
    "expense tracker",
  ],
  authors: [{ name: "Mitsitsy Team" }],
  creator: "Mitsitsy",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://mitsitsy.mg",
    title: "Mitsitsy - Suivi des Dépenses Offline pour Madagascar",
    description:
      "Application mobile gratuite de suivi des dépenses. 100% offline, multi-devises.",
    siteName: "Mitsitsy",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mitsitsy - Application de suivi des dépenses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mitsitsy - Suivi des Dépenses Offline",
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
