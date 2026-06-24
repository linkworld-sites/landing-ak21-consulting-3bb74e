"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Analyse & Discovery",
    description:
      "Tiefes Verständnis Ihrer Prozesse, Datenlage und strategischen Ziele. Wir identifizieren die drei bis fünf KI-Hebel mit dem höchsten ROI-Potential.",
  },
  {
    number: "02",
    title: "Strategische Roadmap",
    description:
      "Eine verbindliche Priorisierung: Was wird wann gebaut, mit welchem Budget, welchen KPIs und welcher internen Ownership. Kein Whitepaper — ein Arbeitsplan.",
  },
  {
    number: "03",
    title: "Pilotprojekt & Proof",
    description:
      "Schneller erster Proof of Value in 4–8 Wochen. Messbares Ergebnis im realen Betrieb — die Basis für den internen Business Case.",
  },
  {
    number: "04",
    title: "Skalierung & Integration",
    description:
      "Vom Piloten in die Produktion: technische Integration, Qualitätssicherung, Monitoring und schrittweise Ausweitung auf weitere Geschäftsbereiche.",
  },
  {
    number: "05",
    title: "Befähigung & Übergabe",
    description:
      "Training Ihrer Teams, Dokumentation, Governance-Strukturen. Ziel ist vollständige interne Ownership — kein Dauerauftrag für externe Berater.",
  },
];

export default function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 bg-brand-ground overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <span className="font-dm text-xs text-brand-amber tracking-[0.15em] uppercase block mb-4">
            07 — Vorgehen
          </span>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
              transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
              className="font-syne font-bold text-brand-white"
              style={{ fontSize: "clamp(28px, 3.5vw, 52px)", letterSpacing: "-0.02em" }}
            >
              Von der Idee zur Wirkung.
            </motion.h2>
          </div>
        </motion.div>

        {/* Staircase steps */}
        <div className="relative flex flex-col gap-0">
          {/* Vertical connecting line */}
          <div className="absolute left-[calc(2rem+1px)] top-8 bottom-8 hidden md:block">
            <motion.div
              initial={{ scaleY: 0, transformOrigin: "top" }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="w-px bg-gradient-to-b from-brand-cyan/50 to-brand-cyan/10 h-full"
            />
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              style={{ marginLeft: `${i * 3}%` }}
              className="relative flex gap-8 md:gap-12 py-8 md:py-10 group"
            >
              {/* Step dot */}
              <div className="relative shrink-0">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-brand-amber/40 flex items-center justify-center bg-brand-ground group-hover:border-brand-amber transition-colors duration-300">
                  <span className="font-syne font-bold text-brand-amber text-sm md:text-base">
                    {step.number}
                  </span>
                </div>
                {/* Connecting dot glow */}
                <motion.div
                  animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
                  className="absolute inset-0 rounded-full bg-brand-amber/10"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2 pt-4">
                <h3 className="font-syne font-bold text-brand-white text-lg md:text-xl group-hover:text-brand-amber transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="font-dm text-brand-text text-sm md:text-base leading-relaxed max-w-xl">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
