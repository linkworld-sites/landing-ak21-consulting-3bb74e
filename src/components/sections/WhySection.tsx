"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const points = [
  {
    heading: "Strategie kommt vor Algorithmus.",
    body: "Die meisten KI-Projekte scheitern nicht an der Technologie — sie scheitern daran, dass keine klare Problemdefinition, kein Erfolgskriterium und keine Ownership vorhanden ist. Wir beginnen immer mit dem Warum.",
  },
  {
    heading: "Keine Vendor-Abhängigkeit.",
    body: "Wir sind technologieneutral. Unsere Empfehlungen basieren auf Ihren Anforderungen — nicht auf Provisionszahlungen. OpenAI, Azure AI, Google Vertex, Open Source: was passt, was skaliert, was Sie kontrollieren können.",
  },
  {
    heading: "Einbauen, nicht beraten und verschwinden.",
    body: "Wir implementieren gemeinsam mit Ihren Teams, schulen intern und übergeben in Ownership. Das Ergebnis ist ein Unternehmen, das KI beherrscht — kein Dauerauftrag für externe Berater.",
  },
  {
    heading: "Messbar oder nicht relevant.",
    body: "Jedes Projekt startet mit definierten KPIs: Zeitersparnis in Stunden pro Woche, Fehlerquote vor/nach, Conversion-Delta. Was nicht gemessen werden kann, wird nicht gebaut.",
  },
];

export default function WhySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-32 bg-brand-light"
      style={{ background: "#E8EDF7" }}
    >
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span
            className="font-dm text-xs tracking-[0.15em] uppercase"
            style={{ color: "#8A8D99" }}
          >
            05 — Warum AK21
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: headline */}
          <div className="flex flex-col gap-8">
            <div className="overflow-hidden">
              <motion.h2
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
                transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                className="font-syne font-bold leading-tight"
                style={{
                  fontSize: "clamp(36px, 4.5vw, 72px)",
                  letterSpacing: "-0.02em",
                  color: "#0A0F2C",
                  lineHeight: "1.05",
                }}
              >
                Nicht Theorie.
                <br />
                Ergebnisse.
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-dm text-lg leading-relaxed"
              style={{ color: "#1C2E6B" }}
            >
              KI ist kein Projekt. KI ist eine Entscheidung. Wir helfen Führungskräften
              im DACH-Raum, diese Entscheidung fundiert zu treffen — und danach nicht
              allein damit zu stehen.
            </motion.p>

            {/* Material image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="rounded-lg overflow-hidden h-48 mt-4"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/material.png"
                alt="KI-Strategie Methodik"
                className="w-full h-full object-cover"
                style={{ filter: "sepia(20%) brightness(0.9)" }}
              />
            </motion.div>
          </div>

          {/* Right: points */}
          <div className="flex flex-col gap-10">
            {points.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                className="flex flex-col gap-2"
              >
                <h3
                  className="font-syne font-bold text-lg"
                  style={{ color: "#0A0F2C" }}
                >
                  {point.heading}
                </h3>
                <p className="font-dm text-base leading-relaxed" style={{ color: "#1C2E6B" }}>
                  {point.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pull quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-20 border-l-2 border-brand-amber pl-8 max-w-3xl"
        >
          <p
            className="font-syne italic leading-snug"
            style={{
              fontSize: "clamp(20px, 2.5vw, 36px)",
              color: "#0A0F2C",
              letterSpacing: "-0.01em",
            }}
          >
            „KI-Projekte scheitern nicht an Technologie — sie scheitern an Strategie."
          </p>
          <footer className="mt-4 font-dm text-sm" style={{ color: "#8A8D99" }}>
            — AK21 Consulting
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
}
