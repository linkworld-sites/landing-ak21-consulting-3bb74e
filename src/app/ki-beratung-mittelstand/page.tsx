import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import LandingClient from "./LandingClient";

export const metadata: Metadata = {
  title: "KI-Beratung Mittelstand | Messbarer ROI in 4–8 Wochen — ak21 consulting",
  description:
    "ak21 liefert KI-Beratung für den Mittelstand mit vertraglich gebundenen ROI-KPIs. Proof of Value in 4–8 Wochen. Technologieneutral. 40+ Projekte in 12 Branchen im DACH-Raum.",
  keywords:
    "KI-Beratung Mittelstand, KI Prozessautomatisierung Mittelstand, KI Implementierung DACH, Künstliche Intelligenz Mittelstand, KI Strategie Mittelstand, KI Berater Mittelstand",
  openGraph: {
    title: "KI-Beratung Mittelstand | Messbarer ROI in 4–8 Wochen — ak21 consulting",
    description:
      "ak21 liefert KI-Beratung für den Mittelstand mit vertraglich gebundenen ROI-KPIs. Proof of Value in 4–8 Wochen. Technologieneutral. 40+ Projekte in 12 Branchen im DACH-Raum.",
    locale: "de_DE",
    type: "website",
    url: "https://5ecc822b.run.linkworld.ai/ki-beratung-mittelstand",
    siteName: "ak21 consulting",
  },
  twitter: {
    card: "summary_large_image",
    title: "KI-Beratung Mittelstand | Messbarer ROI in 4–8 Wochen — ak21 consulting",
    description:
      "ak21 liefert KI-Beratung für den Mittelstand mit vertraglich gebundenen ROI-KPIs. Proof of Value in 4–8 Wochen. Technologieneutral.",
  },
  alternates: {
    canonical: "https://5ecc822b.run.linkworld.ai/ki-beratung-mittelstand",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "ak21 consulting — KI-Beratung für den Mittelstand",
  description:
    "ak21 liefert KI-Beratung für den Mittelstand mit vertraglich gebundenen ROI-KPIs. Proof of Value in 4–8 Wochen. Technologieneutral. 40+ Projekte in 12 Branchen im DACH-Raum.",
  url: "https://5ecc822b.run.linkworld.ai/ki-beratung-mittelstand",
  areaServed: "DE, AT, CH",
  serviceType: "KI-Beratung",
  provider: {
    "@type": "Organization",
    name: "ak21 consulting",
    url: "https://5ecc822b.run.linkworld.ai",
  },
};

export default function KiBeratungMittelstandPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CustomCursor />
      <Navigation />
      <main className="bg-brand-ground overflow-x-hidden">
        <LandingClient />
      </main>
      <Footer />
    </>
  );
}
