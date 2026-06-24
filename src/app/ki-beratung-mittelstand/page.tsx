import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import LandingClient from "./LandingClient";

export const metadata: Metadata = {
  title: "KI Beratung Mittelstand | AK21 – Pragmatisch. DSGVO-konform. ROI-nachweisbar.",
  description:
    "KI Beratung für den deutschen Mittelstand: 21 Jahre Erfahrung, ∅ 8× ROI in 12 Monaten, Pilot in 8 Wochen. Kostenlose AI Readiness Scorecard anfordern. DSGVO & EU AI Act konform.",
  keywords:
    "KI Beratung Mittelstand, Künstliche Intelligenz Mittelstand, KI Strategie Mittelstand, KI Beratung DACH, Rechnungsautomatisierung KI, Mittelstand Digitalisierung KI, KI Consultant Deutschland, KI Berater Mittelstand",
  openGraph: {
    title: "KI Beratung Mittelstand | AK21 Consulting",
    description:
      "Pragmatische KI-Lösungen für den deutschen Mittelstand. 21 Jahre Erfahrung, ∅ 8× ROI, Pilot in 8 Wochen. DSGVO- & EU AI Act-konform.",
    locale: "de_DE",
    type: "website",
    url: "https://5ecc822b.run.linkworld.ai/ki-beratung-mittelstand",
    siteName: "AK21 Consulting",
  },
  twitter: {
    card: "summary_large_image",
    title: "KI Beratung Mittelstand | AK21 Consulting",
    description: "Pragmatische KI-Lösungen für den deutschen Mittelstand. 21 Jahre Erfahrung, ∅ 8× ROI, Pilot in 8 Wochen.",
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
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://5ecc822b.run.linkworld.ai/ki-beratung-mittelstand#service",
      name: "KI Beratung für den Mittelstand",
      description:
        "Pragmatische KI-Strategie und Implementierungsberatung für mittelständische Unternehmen im DACH-Raum. DSGVO-konform, EU AI Act ready, inklusive Fördermittelberatung.",
      provider: {
        "@type": "Organization",
        name: "AK21 Consulting",
        url: "https://5ecc822b.run.linkworld.ai",
        foundingDate: "2003",
        areaServed: ["DE", "AT", "CH"],
      },
      serviceType: "KI-Strategie & Beratung",
      areaServed: [
        { "@type": "Country", name: "Deutschland" },
        { "@type": "Country", name: "Österreich" },
        { "@type": "Country", name: "Schweiz" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "KI Beratungsleistungen Mittelstand",
        itemListElement: [
          { "@type": "Offer", name: "KI-Strategie & Readiness-Analyse", price: "0", priceCurrency: "EUR", description: "Kostenloser 2-tägiger Discovery Workshop" },
          { "@type": "Offer", name: "Prozessautomatisierung (Pilot in 8 Wochen)" },
          { "@type": "Offer", name: "Rechnungsautomatisierung mit KI" },
          { "@type": "Offer", name: "KI-Compliance: DSGVO & EU AI Act" },
        ],
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Was kostet KI-Beratung für den Mittelstand?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Wir beginnen mit einem kostenlosen 2-tägigen Discovery Workshop. Festpreispakete für KI-Piloten ohne Budgetüberraschungen. KfW- und BMWK-Förderung kann bis zu 50% der Investition abdecken.",
          },
        },
        {
          "@type": "Question",
          name: "Wie lange dauert ein KI-Pilot im Mittelstand?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Unser Ansatz liefert einen funktionierenden KI-Pilot in 8 Wochen — mit echten Daten und echten Nutzern. Skalierung folgt erst nach beweisbarem Erfolg.",
          },
        },
        {
          "@type": "Question",
          name: "Ist KI DSGVO-konform und EU AI Act-ready einsetzbar?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ja. DSGVO, EU AI Act und ISO 42001 sind bei AK21 vollständig integriert — kein Add-on. On-premise- und Hybrid-Deployments sind Standard.",
          },
        },
        {
          "@type": "Question",
          name: "Welche KI-Fördermittel gibt es für mittelständische Unternehmen?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "KfW-Digitalisierungskredit, BMWK go-digital und Digital Jetzt, sowie Länderprogramme bieten Zuschüsse bis 50%. Fördermittelberatung ist in allen Paketen inklusive.",
          },
        },
        {
          "@type": "Question",
          name: "Was ist ein AI Readiness Scorecard?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Eine strukturierte Analyse Ihrer Datenbasis, Prozessreife und KI-Potentiale. Sie zeigt Ihren Score, Top-3 Use Cases mit ROI-Schätzung, und Fördermöglichkeiten. Kostenlos auf Anfrage.",
          },
        },
      ],
    },
  ],
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
