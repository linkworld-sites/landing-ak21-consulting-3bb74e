"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const cases = [
  {
    industry: "Logistik & Supply Chain",
    problem: "Manuelle Dokumentenverarbeitung blockiert 60+ Stunden pro Woche im Operations-Team.",
    metric: "−60h",
    metricLabel: "pro Woche",
    outcome: "Automatisierte Belegverarbeitung mit 94% Genauigkeit — integriert in SAP.",
  },
  {
    industry: "Professionelle Dienstleistungen",
    problem: "Angebotserstellung dauert im Schnitt 3 Tage, Konversionsrate unter 30%.",
    metric: "+34%",
    metricLabel: "Conversion",
    outcome: "KI-gestützter Angebotsgenerator mit Preisoptimierung reduziert Zeit auf 4 Stunden.",
  },
  {
    industry: "Industrie & Fertigung",
    problem: "Qualitätssicherung läuft vollständig manuell, Fehlerquote bei 3,2%.",
    metric: "−85%",
    metricLabel: "Fehlerquote",
    outcome: "Vision-KI-System erkennt Defekte in Echtzeit auf dem Produktionsband.",
  },
];

export default function CaseStudiesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="ergebnisse" ref={ref} className="py-32 bg-brand-surface-dark overflow-hidden" style={{ background: "#0D1635" }}>
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="font-dm text-xs text-brand-amber tracking-[0.15em] uppercase block mb-4"
            >
              06 — Ergebnisse
            </motion.span>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
                transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                className="font-syne font-bold text-brand-white"
                style={{ fontSize: "clamp(28px, 3.5vw, 52px)", letterSpacing: "-0.02em" }}
              >
                Zahlen, die zählen.
              </motion.h2>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="font-dm text-brand-text text-sm max-w-xs"
          >
            Reale Projekte. Keine Logos — die Ergebnisse sprechen lauter.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <CaseCard key={i} caseData={c} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseCard({
  caseData,
  index,
  inView,
}: {
  caseData: (typeof cases)[0];
  index: number;
  inView: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const cardInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
      className="bg-brand-surface-card border border-brand-white/8 rounded-lg p-8 flex flex-col gap-6 cursor-default"
      style={{ background: "#111828", border: "1px solid rgba(232,237,247,0.06)" }}
    >
      {/* Industry tag */}
      <span className="font-dm text-xs text-brand-amber tracking-wide uppercase">
        {caseData.industry}
      </span>

      {/* Metric */}
      <div>
        <CountUp
          value={caseData.metric}
          inView={cardInView}
          delay={index * 0.15}
        />
        <span className="font-dm text-sm text-brand-text ml-2">{caseData.metricLabel}</span>
      </div>

      {/* Problem */}
      <p className="font-dm text-sm text-brand-text leading-relaxed border-t border-brand-white/8 pt-6">
        {caseData.problem}
      </p>

      {/* Outcome */}
      <p className="font-dm text-sm text-brand-white/80 leading-relaxed mt-auto">
        {caseData.outcome}
      </p>
    </motion.div>
  );
}

function CountUp({
  value,
  inView,
  delay = 0,
}: {
  value: string;
  inView: boolean;
  delay?: number;
}) {
  const isNeg = value.startsWith("−") || value.startsWith("-");
  const isPos = value.startsWith("+");
  const prefix = isNeg ? "−" : isPos ? "+" : "";
  const numStr = value.replace(/[^0-9]/g, "");
  const suffix = value.replace(/[0-9−+\-]/g, "");
  const num = parseInt(numStr, 10);

  return (
    <motion.span
      className="font-syne font-bold text-brand-white"
      style={{ fontSize: "clamp(40px, 5vw, 64px)", letterSpacing: "-0.03em" }}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ delay: delay + 0.3 }}
    >
      {prefix}
      <motion.span
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: delay + 0.3 }}
      >
        {inView ? (
          <AnimatedNumber target={num} duration={1400} delay={(delay + 0.3) * 1000} />
        ) : (
          "0"
        )}
      </motion.span>
      {suffix}
    </motion.span>
  );
}

function AnimatedNumber({
  target,
  duration,
  delay,
}: {
  target: number;
  duration: number;
  delay: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  const inView = useInView(ref, { once: true });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      onAnimationComplete={() => {
        if (!ref.current) return;
        let start = 0;
        const step = Math.ceil(target / (duration / 16));
        const timer = setInterval(() => {
          start = Math.min(start + step, target);
          if (ref.current) ref.current.textContent = String(start);
          if (start >= target) clearInterval(timer);
        }, 16);
      }}
    >
      0
    </motion.span>
  );
}
