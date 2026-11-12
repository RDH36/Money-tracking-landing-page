import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { getLocale } from "next-intl/server";
import { shareImage } from "@/constants/content";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mitsitsy.app"),
  keywords: [
    "mitsitsy",
    "expense tracker",
    "budget madagascar",
    "offline app",
    "ariary",
    "finance management",
    "suivi dépenses",
  ],
  authors: [{ name: "Mitsitsy Team" }],
  creator: "Mitsitsy",
  openGraph: {
    type: "website",
    url: "https://mitsitsy.app",
    siteName: "Mitsitsy",
    images: [shareImage],
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImage.url],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale} className={`${outfit.variable} ${plusJakarta.variable}`}>
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
