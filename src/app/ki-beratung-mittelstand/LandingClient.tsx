"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { track } from "@/lib/funnel";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EASE_SHARP: [number, number, number, number] = [0.76, 0, 0.24, 1];

const fadeUp = {
  hidden: { y: 28, opacity: 0 },
  visible: (i: number = 0) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.65, delay: i * 0.1, ease: EASE },
  }),
};

// ─── Neural Network SVG ───────────────────────────────────────────────────────

const NN_NODES: [number, number][] = [
  [12, 18], [30, 7], [52, 11], [72, 5], [88, 20],
  [94, 42], [90, 64], [74, 82], [54, 90], [32, 88],
  [14, 73], [5, 50],
  [38, 42], [58, 48], [76, 33], [28, 58], [50, 28], [70, 54],
];

const NN_EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5],
  [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 0],
  [12, 13], [13, 17], [16, 12], [15, 12], [13, 14],
  [0, 12], [2, 16], [4, 14], [6, 17], [9, 15], [11, 12],
];

const NN_FLOWS: [number, number][] = [[1, 3], [4, 14], [7, 13], [11, 15], [2, 16]];

function NeuralNetSVG() {
  const noMotion = useReducedMotion();
  return (
    <svg
      viewBox="0 0 100 100"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <pattern id="kbmGrid" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(42,255,200,0.07)" strokeWidth="0.25" />
        </pattern>
        <radialGradient id="kbmGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F5A623" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#F5A623" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="100" height="100" fill="url(#kbmGrid)" />
      {NN_EDGES.map(([a, b], i) => (
        <line
          key={i}
          x1={NN_NODES[a][0]} y1={NN_NODES[a][1]}
          x2={NN_NODES[b][0]} y2={NN_NODES[b][1]}
          stroke="rgba(245,166,35,0.22)"
          strokeWidth="0.4"
        />
      ))}
      {!noMotion && NN_FLOWS.map(([a, b], i) => (
        <circle key={`f${i}`} r="1.3" fill="#2AFFC8">
          <animate attributeName="cx" from={NN_NODES[a][0]} to={NN_NODES[b][0]} dur={`${1.8 + i * 0.42}s`} repeatCount="indefinite" begin={`${i * 0.65}s`} />
          <animate attributeName="cy" from={NN_NODES[a][1]} to={NN_NODES[b][1]} dur={`${1.8 + i * 0.42}s`} repeatCount="indefinite" begin={`${i * 0.65}s`} />
          <animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.08;0.88;1" dur={`${1.8 + i * 0.42}s`} repeatCount="indefinite" begin={`${i * 0.65}s`} />
        </circle>
      ))}
      {NN_NODES.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="3.5" fill="url(#kbmGlow)">
            {!noMotion && (
              <animate attributeName="r" values="2.5;4.5;2.5" dur={`${3.5 + (i % 5) * 0.42}s`} repeatCount="indefinite" begin={`${(i % 7) * 0.22}s`} />
            )}
          </circle>
          <circle cx={x} cy={y} r="1.2" fill="#F5A623" />
          <circle cx={x} cy={y} r="2.2" fill="none" stroke="rgba(245,166,35,0.32)" strokeWidth="0.4" />
        </g>
      ))}
    </svg>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden bg-brand-ground">
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(42,255,200,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(42,255,200,0.4) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 w-full max-w-screen-xl mx-auto px-6 md:px-12 pt-32 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-center min-h-[70vh]">

          {/* Left: Copy */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <motion.div
              variants={fadeUp} custom={0}
              initial="hidden" animate={inView ? "visible" : "hidden"}
            >
              <span className="font-dm text-xs font-medium text-brand-cyan tracking-[0.15em] uppercase">
                // KI-Beratung · Mittelstand · DACH · 40+ Projekte · 12 Branchen
              </span>
            </motion.div>

            <h1
              className="font-syne font-bold text-brand-white"
              style={{ fontSize: "clamp(26px, 3.8vw, 58px)", lineHeight: "1.08", letterSpacing: "-0.02em" }}
            >
              <div className="overflow-hidden">
                <motion.span
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
                  transition={{ duration: 0.85, ease: EASE_SHARP }}
                  className="block"
                >
                  KI-Beratung für den Mittelstand —
                </motion.span>
              </div>
              <div className="overflow-hidden">
                <motion.span
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
                  transition={{ duration: 0.85, delay: 0.18, ease: EASE_SHARP }}
                  className="block text-brand-amber"
                >
                  Proof of Value in 4–8 Wochen,
                </motion.span>
              </div>
              <div className="overflow-hidden">
                <motion.span
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
                  transition={{ duration: 0.85, delay: 0.34, ease: EASE_SHARP }}
                  className="block font-light text-brand-white/75"
                >
                  vertraglich an KPIs gebunden.
                </motion.span>
              </div>
            </h1>

            <motion.div
              initial={{ scaleX: 0, transformOrigin: "left" }}
              animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.8, delay: 0.58, ease: EASE }}
              className="h-px bg-brand-amber w-[40vw] max-w-xs"
            />

            <motion.p
              variants={fadeUp} custom={5}
              initial="hidden" animate={inView ? "visible" : "hidden"}
              className="font-dm text-brand-text text-lg max-w-xl leading-relaxed"
            >
              ak21 consulting liefert messbaren KI-ROI — technologieneutral, ohne Vendor-Bindung,
              mit dem Ziel vollständiger Ownership-Übergabe statt Dauerabhängigkeit.
            </motion.p>

            {/* Key metrics */}
            <motion.div
              variants={fadeUp} custom={6}
              initial="hidden" animate={inView ? "visible" : "hidden"}
              className="flex flex-wrap gap-x-8 gap-y-4 pt-1"
            >
              {[
                { v: "40+", l: "Projekte im DACH-Raum" },
                { v: "12", l: "Branchen" },
                { v: "4–8 Wo.", l: "bis Proof of Value" },
                { v: "100%", l: "Technologieneutral" },
              ].map(({ v, l }) => (
                <div key={v} className="flex flex-col">
                  <span className="font-syne font-bold text-brand-amber text-xl tracking-tight">{v}</span>
                  <span className="font-dm text-xs text-brand-text mt-0.5">{l}</span>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={fadeUp} custom={8}
              initial="hidden" animate={inView ? "visible" : "hidden"}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <motion.a
                href="#erstgespraech"
                onClick={() => track("intent")}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-amber text-brand-ground font-syne font-bold text-sm tracking-wide rounded hover:brightness-110 transition-all duration-300"
              >
                Kostenloses Erstgespräch →
              </motion.a>
              <motion.a
                href="#leistungen"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-8 py-4 border border-brand-white/20 text-brand-white font-dm text-sm rounded hover:border-brand-white/50 transition-all duration-300"
              >
                Leistungen ansehen
              </motion.a>
            </motion.div>
          </div>

          {/* Right: Neural net visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
            className="lg:col-span-5 relative h-[340px] lg:h-[540px]"
          >
            <div className="absolute inset-0 rounded-xl border border-brand-amber/15 overflow-hidden bg-brand-surface/10">
              <NeuralNetSVG />
            </div>
            <div className="absolute bottom-5 left-5 right-5 z-10 grid grid-cols-2 gap-3">
              {[
                { value: "40+", label: "Realisierte Projekte" },
                { value: "94%", label: "Belegverarbeitungsgenauigkeit" },
              ].map(({ value, label }) => (
                <motion.div
                  key={label}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className="rounded-lg px-4 py-3 border border-brand-amber/20"
                  style={{ background: "rgba(10,15,44,0.88)", backdropFilter: "blur(14px)" }}
                >
                  <span className="font-syne font-bold text-brand-amber text-2xl block leading-tight">{value}</span>
                  <span className="font-dm text-xs text-brand-text mt-0.5 block">{label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-brand-amber to-transparent"
        />
      </motion.div>
    </section>
  );
}

// ─── USP Block ────────────────────────────────────────────────────────────────

const USPS = [
  {
    title: "Technologieneutral",
    icon: "⬡",
    badge: "Kein Vendor Lock-in",
    desc: "Keine Vendor-Provisionen. Empfehlungen über OpenAI, Azure AI, Google Vertex und Open Source — strukturell unvereinbar mit dem Geschäftsmodell der meisten IT-Beratungen.",
  },
  {
    title: "Verbindliche ROI-KPIs",
    icon: "◎",
    badge: "Vertraglich gebunden",
    desc: "Messbare Ergebnisse: Stunden/Woche, Fehlerquote, Conversion-Delta — vertraglich vereinbart. Wenige Berater binden sich an solche Metriken.",
  },
  {
    title: "Ownership-Übergabe",
    icon: "△",
    badge: "Kein Dauerauftrag",
    desc: "Kein Dauerauftrag — vollständige interne Ownership ist das explizite Ziel. Widerspricht dem Anreiz klassischer Beratungshäuser, Abhängigkeiten zu erzeugen.",
  },
];

function USPSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-28 border-t border-brand-amber/10" style={{ background: "#0D1635" }}>
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <div className="mb-14">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="font-dm text-xs text-brand-amber tracking-[0.15em] uppercase block mb-4"
          >
            // Was uns strukturell unterscheidet
          </motion.span>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
              transition={{ duration: 0.85, ease: EASE_SHARP }}
              className="font-syne font-bold text-brand-white max-w-2xl"
              style={{ fontSize: "clamp(24px, 3vw, 46px)", letterSpacing: "-0.02em" }}
            >
              Drei Eigenschaften, die andere Beratungen strukturell nicht replizieren können.
            </motion.h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {USPS.map((usp, i) => (
            <motion.div
              key={usp.title}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.14, ease: EASE }}
              whileHover={{ y: -5 }}
              className="group rounded-xl p-8 flex flex-col gap-5 cursor-default border border-brand-white/6"
              style={{ background: "#111828" }}
            >
              <div className="flex items-center justify-between">
                <span className="text-brand-amber/50 text-3xl leading-none font-light group-hover:text-brand-amber/80 transition-colors duration-300">
                  {usp.icon}
                </span>
                <span className="font-dm text-xs text-brand-cyan border border-brand-cyan/25 rounded px-2.5 py-1">
                  {usp.badge}
                </span>
              </div>
              <h3 className="font-syne font-bold text-brand-white text-xl leading-snug group-hover:text-brand-amber transition-colors duration-300">
                {usp.title}
              </h3>
              <p className="font-dm text-sm text-brand-text leading-relaxed">{usp.desc}</p>
              <div className="mt-auto pt-4 border-t border-brand-white/6">
                <div className="h-0.5 bg-brand-amber/15 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ scaleX: 0, transformOrigin: "left" }}
                    animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 + i * 0.15, ease: EASE }}
                    className="h-full bg-brand-amber rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Reference Results ────────────────────────────────────────────────────────

const REF_RESULTS = [
  {
    metric: "94%",
    label: "Belegverarbeitungsgenauigkeit in SAP",
    desc: "Automatisierte Dokumentenverarbeitung nahtlos in SAP integriert — DSGVO-konform, on-premise. Logistik & Supply Chain.",
    industry: "Logistik & Supply Chain",
  },
  {
    metric: "3 Tage → 4h",
    label: "Angebotserstellung verkürzt",
    desc: "KI-Angebotsgenerator mit Preisoptimierung. Erstellungszeit von 3 Tagen auf 4 Stunden bei gleichzeitig verbesserter Conversion.",
    industry: "B2B-Dienstleistungen",
  },
  {
    metric: "Echtzeit",
    label: "Defekterkennung in der Produktion",
    desc: "Vision-KI erkennt Oberflächendefekte am Produktionsband in Echtzeit — Pilot in 6 Wochen, SAP QM-integriert.",
    industry: "Fertigung & Qualitätssicherung",
  },
];

function ResultsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="ergebnisse" className="py-32 bg-brand-ground">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="font-dm text-xs text-brand-amber tracking-[0.15em] uppercase block mb-4"
            >
              // 40+ Projekte · 12 Branchen · Reale Ergebnisse
            </motion.span>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
                transition={{ duration: 0.85, ease: EASE_SHARP }}
                className="font-syne font-bold text-brand-white max-w-xl"
                style={{ fontSize: "clamp(24px, 3vw, 46px)", letterSpacing: "-0.02em" }}
              >
                Zahlen aus abgeschlossenen Projekten im DACH-Raum.
              </motion.h2>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="font-dm text-brand-text text-sm max-w-xs leading-relaxed"
          >
            Keine Hochglanzbroschüren. Drei Ergebnisse aus realen Kundenprojekten.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REF_RESULTS.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.14, ease: EASE }}
              whileHover={{ y: -4 }}
              className="rounded-xl p-8 flex flex-col gap-4 cursor-default"
              style={{ background: "#0D1635", border: "1px solid rgba(245,166,35,0.18)" }}
            >
              <span className="font-dm text-xs text-brand-amber/70 tracking-wide uppercase">{r.industry}</span>
              <div className="flex flex-col gap-1">
                <span
                  className="font-syne font-bold text-brand-white leading-tight"
                  style={{ fontSize: "clamp(28px, 3.5vw, 48px)", letterSpacing: "-0.03em" }}
                >
                  {r.metric}
                </span>
                <span className="font-dm text-sm text-brand-amber/80">{r.label}</span>
              </div>
              <p className="font-dm text-sm text-brand-text leading-relaxed border-t border-brand-white/6 pt-4 mt-1">
                {r.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Services Section ─────────────────────────────────────────────────────────

const SERVICES = [
  {
    category: "Strategie",
    title: "KI-Strategie & Roadmap",
    desc: "Entwicklung einer maßgeschneiderten KI-Roadmap — von der Potenzialanalyse bis zur konkreten Priorisierung mit klaren ROI-Metriken. Kein Theoriepapier, sondern ein verbindlicher Plan.",
  },
  {
    category: "Strategie",
    title: "Potenzialanalyse",
    desc: "Identifikation der drei bis fünf KI-Hebel mit dem höchsten ROI-Potential basierend auf tiefem Verständnis der Prozesse, Datenlage und strategischen Ziele.",
  },
  {
    category: "Automatisierung",
    title: "Prozessautomatisierung",
    desc: "Identifikation und Automatisierung repetitiver Prozesse mit KI — nahtlos in bestehende Systeme integriert. Typische Resultate: 40–70% Zeitersparnis in operativen Workflows, ohne Systembruch.",
  },
  {
    category: "Implementierung",
    title: "Pilotprojekt & Proof of Value",
    desc: "Schneller erster Proof of Value in 4–8 Wochen mit messbarem Ergebnis im realen Betrieb — als Basis für den internen Business Case.",
  },
];

function ServicesSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="leistungen" className="py-32 border-t border-brand-white/6" style={{ background: "#0D1635" }}>
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="font-dm text-xs text-brand-amber tracking-[0.15em] uppercase block mb-4"
            >
              // Leistungsübersicht
            </motion.span>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
                transition={{ duration: 0.85, ease: EASE_SHARP }}
                className="font-syne font-bold text-brand-white max-w-lg"
                style={{ fontSize: "clamp(24px, 3vw, 46px)", letterSpacing: "-0.02em" }}
              >
                Von der Strategie bis zum laufenden Betrieb.
              </motion.h2>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="font-dm text-brand-text text-sm max-w-xs leading-relaxed"
          >
            Keine Endlos-Projekte. Klare Schritte mit definierten Deliverables.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
              whileHover={{ y: -3 }}
              className="group rounded-xl p-8 flex flex-col gap-3 cursor-default border border-brand-white/6"
              style={{ background: "#111828" }}
            >
              <span className="font-dm text-xs text-brand-cyan tracking-wide uppercase">{s.category}</span>
              <h3 className="font-syne font-bold text-brand-white text-lg leading-snug group-hover:text-brand-amber transition-colors duration-300">
                {s.title}
              </h3>
              <p className="font-dm text-sm text-brand-text leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Section ──────────────────────────────────────────────────────────────

function CTASection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="erstgespraech" className="py-32 bg-brand-ground">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <div
          className="relative rounded-2xl overflow-hidden p-12 md:p-20 flex flex-col items-center text-center gap-10"
          style={{ background: "linear-gradient(135deg, #111828 0%, #0D1635 100%)", border: "1px solid rgba(245,166,35,0.2)" }}
        >
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div
              className="absolute top-0 left-1/4 w-96 h-96 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(245,166,35,0.10) 0%, transparent 70%)" }}
            />
            <div
              className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(42,255,200,0.07) 0%, transparent 70%)" }}
            />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-8 max-w-3xl">
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="font-dm text-xs text-brand-amber tracking-[0.15em] uppercase"
            >
              // Kostenloses Erstgespräch — 30 Minuten
            </motion.span>

            <div className="overflow-hidden">
              <motion.h2
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
                transition={{ duration: 0.85, ease: EASE_SHARP }}
                className="font-syne font-bold text-brand-white"
                style={{ fontSize: "clamp(24px, 3.2vw, 48px)", letterSpacing: "-0.02em" }}
              >
                Kostenloses Erstgespräch vereinbaren — wir analysieren Ihr größtes KI-Hebelpotenzial in 30 Minuten.
              </motion.h2>
            </div>

            <motion.p
              variants={fadeUp} custom={3}
              initial="hidden" animate={inView ? "visible" : "hidden"}
              className="font-dm text-brand-text text-base leading-relaxed max-w-xl"
            >
              Kein Verkaufsgespräch, keine unverbindliche Präsentation.
              Ein strukturiertes 30-Minuten-Gespräch mit den KI-Hebeln, die in Ihrer Branche den größten ROI liefern.
            </motion.p>

            <motion.div
              variants={fadeUp} custom={5}
              initial="hidden" animate={inView ? "visible" : "hidden"}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.a
                href="mailto:hallo@ak21.de?subject=Erstgespr%C3%A4ch%20KI-Beratung%20Mittelstand&body=Guten%20Tag%2C%20ich%20m%C3%B6chte%20ein%20kostenloses%20Erstgespr%C3%A4ch%20zur%20KI-Beratung%20f%C3%BCr%20den%20Mittelstand%20vereinbaren."
                onClick={() => track("intent")}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-3 px-10 py-5 bg-brand-amber text-brand-ground font-syne font-bold text-base tracking-wide rounded-lg hover:brightness-110 transition-all duration-300"
              >
                Jetzt Erstgespräch anfragen
                <span className="text-xl leading-none">→</span>
              </motion.a>
              <motion.a
                href="/#contact"
                onClick={() => track("intent")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-8 py-5 border border-brand-white/20 text-brand-white font-dm text-sm rounded-lg hover:border-brand-amber/50 transition-all duration-300"
              >
                Zum Kontaktformular
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap justify-center gap-6 text-xs font-dm text-brand-text"
            >
              <span>✓ Kostenlos & unverbindlich</span>
              <span>✓ Kein Akquise-Anruf ohne Erlaubnis</span>
              <span>✓ 30 Minuten, direkt mit dem Gründer</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Internal Links ───────────────────────────────────────────────────────────

function InternalLinksSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-16 bg-brand-ground border-t border-brand-white/6">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <Link
              href="/"
              className="group flex items-start gap-5 rounded-xl border border-brand-white/6 p-6 hover:border-brand-amber/30 transition-all duration-300"
              style={{ background: "#111828" }}
            >
              <span className="text-brand-amber/40 text-2xl group-hover:text-brand-amber/70 transition-colors duration-300 mt-0.5">←</span>
              <div className="flex flex-col gap-1.5">
                <span className="font-syne font-bold text-brand-white text-base group-hover:text-brand-amber transition-colors duration-300">
                  Zurück zur Startseite
                </span>
                <span className="font-dm text-sm text-brand-text leading-relaxed">
                  Alle Leistungen, Referenzen und Informationen zu ak21 consulting.
                </span>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
          >
            <Link
              href="/blog"
              className="group flex items-start gap-5 rounded-xl border border-brand-white/6 p-6 hover:border-brand-amber/30 transition-all duration-300"
              style={{ background: "#111828" }}
            >
              <span className="text-brand-amber/40 text-2xl group-hover:text-brand-amber/70 transition-colors duration-300 mt-0.5">→</span>
              <div className="flex flex-col gap-1.5">
                <span className="font-syne font-bold text-brand-white text-base group-hover:text-brand-amber transition-colors duration-300">
                  KI-Insights & Praxisberichte
                </span>
                <span className="font-dm text-sm text-brand-text leading-relaxed">
                  Aktuelle Fachartikel zu KI-Prozessautomatisierung, ROI-Metriken und DACH-Praxisbeispielen.
                </span>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Root Export ──────────────────────────────────────────────────────────────

export default function LandingClient() {
  return (
    <>
      <HeroSection />
      <USPSection />
      <ResultsSection />
      <ServicesSection />
      <CTASection />
      <InternalLinksSection />
    </>
  );
}
