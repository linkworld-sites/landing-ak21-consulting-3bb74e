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
  alternates: {
    canonical: "https://5ecc822b.run.linkworld.ai",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "ak21 consulting",
  url: "https://5ecc822b.run.linkworld.ai",
  description:
    "KI-Beratung DACH, Proof of Value in 4–8 Wochen. Wir übersetzen KI-Komplexität in messbaren Wettbewerbsvorteil — technologieneutral, vertraglich an KPIs gebunden.",
  areaServed: ["DE", "AT", "CH"],
  serviceType: "KI-Strategie und Implementierungsberatung",
  knowsAbout: [
    "KI-Beratung",
    "KI-Strategie",
    "Prozessautomatisierung",
    "Machine Learning",
    "Datenarchitektur",
    "Mittelstand",
  ],
  slogan: "Messbare KI-Ergebnisse in 4–8 Wochen — vertraglich gebunden.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
        />
      </head>
      <body>
        <FunnelTracker />
        <SmoothScroll>{children}</SmoothScroll>
        <CookieConsent />
      </body>
    </html>
  );
}
