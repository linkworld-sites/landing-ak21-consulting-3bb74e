"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const services = [
  {
    index: "01",
    title: "KI-Strategie",
    description:
      "Wir entwickeln eine maßgeschneiderte KI-Roadmap für Ihr Unternehmen — von der Potenzialanalyse bis zur konkreten Priorisierung. Kein Theoriepapier, sondern ein verbindlicher Plan mit klaren ROI-Metriken.",
    tags: ["Potenzialanalyse", "Roadmap", "ROI-Messung"],
  },
  {
    index: "02",
    title: "Prozessautomatisierung",
    description:
      "Identifikation und Automatisierung repetitiver Prozesse mit KI — nahtlos in bestehende Systeme integriert. Typische Resultate: 40–70% Zeitersparnis in operativen Workflows, ohne Systembruch.",
    tags: ["Workflow-Analyse", "RPA + KI", "Integration"],
  },
  {
    index: "03",
    title: "Datenarchitektur",
    description:
      "Ohne saubere Daten keine funktionierende KI. Wir strukturieren Ihre Datenbasis, bauen Pipeline-Infrastrukturen und schaffen die technische Grundlage für skalierbare Modelle.",
    tags: ["Data Engineering", "ML-Pipelines", "Governance"],
  },
];

export default function ServicesSection() {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="leistungen" ref={ref} className="py-32 bg-brand-ground">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="overflow-hidden mb-16">
          <motion.div
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="flex items-center gap-4"
          >
            <span className="font-dm text-xs text-brand-amber tracking-[0.15em] uppercase">
              04 — Leistungen
            </span>
          </motion.div>
        </div>

        {/* Service bands */}
        <div className="border-t border-brand-white/10">
          {services.map((service, i) => (
            <ServiceBand
              key={service.index}
              service={service}
              index={i}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceBand({
  service,
  index,
  isOpen,
  onToggle,
  inView,
}: {
  service: (typeof services)[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="border-b border-brand-white/10"
    >
      <motion.button
        onClick={onToggle}
        className="w-full py-8 flex items-center justify-between gap-8 text-left group"
        whileHover={{ x: 4 }}
        transition={{ duration: 0.3 }}
        data-cursor="hover"
      >
        <div className="flex items-center gap-8 md:gap-16">
          <span className="font-syne font-light text-4xl md:text-5xl text-brand-text w-16 shrink-0 tabular-nums">
            {service.index}
          </span>
          <h3 className="font-syne font-bold text-2xl md:text-3xl text-brand-white group-hover:text-brand-amber transition-colors duration-300">
            {service.title}
          </h3>
        </div>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
          className="text-brand-amber text-2xl shrink-0"
        >
          +
        </motion.span>
      </motion.button>

      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <div className="pb-8 pl-0 md:pl-24 flex flex-col md:flex-row gap-6 md:gap-16">
          <p className="font-dm text-brand-text leading-relaxed text-base max-w-xl">
            {service.description}
          </p>
          <div className="flex flex-wrap gap-2 md:items-start">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="font-dm text-xs text-brand-amber border border-brand-amber/30 px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
