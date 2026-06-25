import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import { FunnelTracker } from "@/components/FunnelTracker";
import { CookieConsent } from "@/components/CookieConsent";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "AK21 Consulting — KI-Strategie. Messbare Ergebnisse.",
  description:
    "Wir übersetzen KI-Komplexität in Wettbewerbsvorteil. Strategische KI-Beratung, Prozessautomatisierung und Datenarchitektur für DACH-Unternehmen.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body>
        <FunnelTracker />
        <SmoothScroll>{children}</SmoothScroll>
        <CookieConsent />
      </body>
    </html>
  );
}
