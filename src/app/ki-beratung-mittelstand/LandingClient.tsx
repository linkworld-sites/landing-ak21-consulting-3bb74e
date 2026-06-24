"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import { track } from "@/lib/funnel";
import ConversionForm from "@/components/ConversionForm";

// ─── Constants ───────────────────────────────────────────────────────────────

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
        <pattern id="nnGrid" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(42,255,200,0.07)" strokeWidth="0.25" />
        </pattern>
        <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F5A623" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#F5A623" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="100" height="100" fill="url(#nnGrid)" />
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
          <animate
            attributeName="cx"
            from={NN_NODES[a][0]}
            to={NN_NODES[b][0]}
            dur={`${1.8 + i * 0.42}s`}
            repeatCount="indefinite"
            begin={`${i * 0.65}s`}
          />
          <animate
            attributeName="cy"
            from={NN_NODES[a][1]}
            to={NN_NODES[b][1]}
            dur={`${1.8 + i * 0.42}s`}
            repeatCount="indefinite"
            begin={`${i * 0.65}s`}
          />
          <animate
            attributeName="opacity"
            values="0;0.9;0.9;0"
            keyTimes="0;0.08;0.88;1"
            dur={`${1.8 + i * 0.42}s`}
            repeatCount="indefinite"
            begin={`${i * 0.65}s`}
          />
        </circle>
      ))}
      {NN_NODES.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="3.5" fill="url(#nodeGlow)">
            {!noMotion && (
              <animate
                attributeName="r"
                values="2.5;4.5;2.5"
                dur={`${3.5 + (i % 5) * 0.42}s`}
                repeatCount="indefinite"
                begin={`${(i % 7) * 0.22}s`}
              />
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

function HeroLP() {
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
                // KI-Beratung · Mittelstand · DACH · 21 Jahre Erfahrung
              </span>
            </motion.div>

            <div className="flex flex-col gap-1">
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
                  transition={{ duration: 0.85, ease: EASE_SHARP }}
                  className="font-syne font-light text-display-xl text-brand-white"
                >
                  KI Beratung für den
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.span
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
                  transition={{ duration: 0.85, delay: 0.18, ease: EASE_SHARP }}
                  className="font-syne font-bold text-display-xl text-brand-amber block"
                >
                  Mittelstand.
                </motion.span>
              </div>
            </div>

            <motion.div
              initial={{ scaleX: 0, transformOrigin: "left" }}
              animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
              className="h-px bg-brand-amber w-[40vw] max-w-xs"
            />

            <motion.p
              variants={fadeUp} custom={4}
              initial="hidden" animate={inView ? "visible" : "hidden"}
              className="font-dm text-brand-text text-lg max-w-xl leading-relaxed"
            >
              Pragmatische KI-Lösungen für Fertigungsbetriebe, Logistiker und Dienstleister —
              ohne Vendor Lock-in, ohne Buzzwords. DSGVO- und EU AI Act-konform.
              ROI-nachweisbar in 12 Monaten.
            </motion.p>

            {/* Metrics strip */}
            <motion.div
              variants={fadeUp} custom={5}
              initial="hidden" animate={inView ? "visible" : "hidden"}
              className="flex flex-wrap gap-x-8 gap-y-4 pt-1"
            >
              {[
                { v: "21 Jahre", l: "Beratungserfahrung" },
                { v: "∅ 8×", l: "ROI in 12 Monaten" },
                { v: "8 Wochen", l: "bis zum Pilot" },
                { v: "DSGVO", l: "EU AI Act ready" },
              ].map(({ v, l }) => (
                <div key={v} className="flex flex-col">
                  <span className="font-syne font-bold text-brand-amber text-xl tracking-tight">{v}</span>
                  <span className="font-dm text-xs text-brand-text mt-0.5">{l}</span>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={fadeUp} custom={7}
              initial="hidden" animate={inView ? "visible" : "hidden"}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <motion.a
                href="#scorecard"
                onClick={() => track("intent")}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-amber text-brand-ground font-syne font-bold text-sm tracking-wide rounded hover:brightness-110 transition-all duration-300"
              >
                Kostenlose Scorecard anfordern
                <span className="text-lg leading-none">→</span>
              </motion.a>
              <motion.a
                href="#use-case"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-8 py-4 border border-brand-white/20 text-brand-white font-dm text-sm rounded hover:border-brand-white/50 transition-all duration-300"
              >
                Praxisbeispiel ansehen
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
            {/* Overlay metrics */}
            <div className="absolute bottom-5 left-5 right-5 z-10 grid grid-cols-2 gap-3">
              {[
                { value: "120+", label: "KI-Projekte" },
                { value: "94%", label: "Kundenzufriedenheit" },
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

      {/* Scroll indicator */}
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

// ─── Pain Points ─────────────────────────────────────────────────────────────

const PAINS = [
  {
    num: "01",
    title: "Kein internes KI-Know-how",
    desc: "73% der Mittelständler nennen fehlendes Fachwissen als größtes Hindernis. Neue Stellen zu besetzen dauert Monate — KI wartet nicht.",
  },
  {
    num: "02",
    title: "DSGVO & Compliance-Risiken",
    desc: "EU AI Act, DSGVO, ISO 42001 — die regulatorische Landschaft ist komplex. Falsches Setup kann sechs- bis siebenstellige Bußgelder nach sich ziehen.",
  },
  {
    num: "03",
    title: "ROI bleibt unklar",
    desc: "Ohne messbaren Business Case bleibt KI eine Kostenstelle statt ein Wachstumstreiber. Die meisten Piloten scheitern an fehlenden Erfolgskennzahlen.",
  },
  {
    num: "04",
    title: "Technologie-Wildwuchs",
    desc: "Hunderte KI-Anbieter, keine unabhängige Orientierung. Fehlentscheidungen binden Budget für Jahre und hinterlassen technische Schulden.",
  },
];

function PainSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-28 bg-brand-ground border-t border-brand-amber/10">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-xl">
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="font-dm text-xs text-brand-amber tracking-[0.15em] uppercase block mb-4"
            >
              // Die Realität im Mittelstand
            </motion.span>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
                transition={{ duration: 0.85, ease: EASE_SHARP }}
                className="font-syne font-bold text-brand-white"
                style={{ fontSize: "clamp(28px, 3.5vw, 52px)", letterSpacing: "-0.02em" }}
              >
                Warum 7 von 10 Mittelstands-KI-Projekten scheitern.
              </motion.h2>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="font-dm text-brand-text text-sm max-w-xs leading-relaxed"
          >
            Wir kennen diese Muster — und haben pragmatische Lösungen dafür.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PAINS.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
              whileHover={{ y: -4 }}
              className="group border border-brand-white/8 rounded-lg p-6 flex flex-col gap-4 cursor-default"
              style={{ background: "#111828" }}
            >
              <span
                className="font-syne font-bold text-brand-amber/30 text-4xl group-hover:text-brand-amber/50 transition-colors duration-300"
                style={{ letterSpacing: "-0.03em" }}
              >
                {p.num}
              </span>
              <h3 className="font-syne font-bold text-brand-white text-base leading-snug">
                {p.title}
              </h3>
              <p className="font-dm text-sm text-brand-text leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Use Case: Rechnungsautomatisierung ──────────────────────────────────────

function UseCaseSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const before = [
    "40+ Stunden manuelle Rechnungsprüfung pro Woche",
    "3 Vollzeitstellen im Kreditorenbereich",
    "8% Fehlerquote bei der Dateneingabe",
    "Häufige Zahlungsverzüge & Mahngebühren",
    "Keine Echtzeittransparenz über offene Verbindlichkeiten",
  ];
  const after = [
    "6 Stunden — 85% der Prüfung läuft automatisiert",
    "1 Vollzeitstelle für Ausnahmen & Freigaben",
    "< 0,5% Fehlerquote durch KI-Validierung",
    "Keine Zahlungsverzüge, automatische Fälligkeitswarnungen",
    "Echtzeit-Dashboard für alle offenen Verbindlichkeiten",
  ];
  const steps = [
    { week: "Woche 1–2", label: "Discovery & Datenstrategie", desc: "Prozessaufnahme, Datensichtung, DSGVO-Bewertung" },
    { week: "Woche 3–4", label: "Modelltraining & Validierung", desc: "Prototyp auf echten Rechnungsdaten, Feedback-Schleife" },
    { week: "Woche 5–6", label: "Integration & Go-Live", desc: "ERP-Anbindung, Nutzerschulung, produktiver Betrieb" },
  ];

  return (
    <section id="use-case" ref={ref} className="py-32 overflow-hidden" style={{ background: "#0D1635" }}>
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="font-dm text-xs text-brand-amber tracking-[0.15em] uppercase block mb-4"
        >
          // Praxisbeispiel · Fertigungsindustrie
        </motion.span>
        <div className="overflow-hidden mb-6">
          <motion.h2
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
            transition={{ duration: 0.9, ease: EASE_SHARP }}
            className="font-syne font-bold text-brand-white max-w-3xl"
            style={{ fontSize: "clamp(28px, 3.5vw, 52px)", letterSpacing: "-0.02em" }}
          >
            Rechnungsautomatisierung: Von 40 Stunden auf 6 Stunden pro Woche.
          </motion.h2>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.25 }}
          className="font-dm text-brand-text text-base max-w-2xl leading-relaxed mb-16"
        >
          Ein mittelständischer Fertigungsbetrieb (280 Mitarbeiter, Maschinenbau) automatisierte
          seinen gesamten Eingangsrechnungsprozess — DSGVO-konform, on-premise, in 6 Wochen.
        </motion.p>

        {/* Before / After */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {/* Before */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="rounded-xl p-7 flex flex-col gap-5"
            style={{ background: "#111828", border: "1px solid rgba(232,237,247,0.06)" }}
          >
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-red-500/60" />
              <span className="font-dm text-xs text-brand-text tracking-wide uppercase">Vorher</span>
            </div>
            <ul className="flex flex-col gap-3">
              {before.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease: EASE }}
                  className="flex items-start gap-3 font-dm text-sm text-brand-text/80 leading-relaxed"
                >
                  <span className="text-red-400/60 mt-0.5 shrink-0">✕</span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="rounded-xl p-7 flex flex-col gap-5"
            style={{ background: "#0A1A2F", border: "1px solid rgba(42,255,200,0.18)" }}
          >
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-brand-cyan" />
              <span className="font-dm text-xs text-brand-cyan tracking-wide uppercase">Nachher</span>
            </div>
            <ul className="flex flex-col gap-3">
              {after.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08, ease: EASE }}
                  className="flex items-start gap-3 font-dm text-sm text-brand-white/80 leading-relaxed"
                >
                  <span className="text-brand-cyan mt-0.5 shrink-0">✓</span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Key metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-14">
          {[
            { metric: "−85%", label: "Prozesskosten" },
            { metric: "−87%", label: "Zeitaufwand" },
            { metric: "<0,5%", label: "Fehlerquote" },
            { metric: "6 Mon.", label: "ROI-Break-even" },
          ].map(({ metric, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.35 + i * 0.1, ease: EASE }}
              whileHover={{ y: -3 }}
              className="rounded-lg p-5 text-center border border-brand-amber/15"
              style={{ background: "#111828" }}
            >
              <span
                className="font-syne font-bold text-brand-amber block"
                style={{ fontSize: "clamp(28px, 3.5vw, 44px)", letterSpacing: "-0.03em" }}
              >
                {metric}
              </span>
              <span className="font-dm text-xs text-brand-text mt-1 block">{label}</span>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <div className="border-t border-brand-white/8 pt-12">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="font-dm text-xs text-brand-amber tracking-[0.12em] uppercase mb-8"
          >
            Umsetzung in 6 Wochen
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.week}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.55 + i * 0.12, ease: EASE }}
                className="flex flex-col gap-2"
              >
                <span className="font-syne font-bold text-xs text-brand-amber/60 tracking-wide uppercase">
                  {s.week}
                </span>
                <span className="font-syne font-bold text-brand-white text-base leading-snug">
                  {s.label}
                </span>
                <span className="font-dm text-sm text-brand-text">{s.desc}</span>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Differentiation vs Large Consultancies ───────────────────────────────────

const COMPARISON = [
  { k: "Pilot-Dauer", g: "6–12 Monate", ak: "8 Wochen" },
  { k: "Ihr Ansprechpartner", g: "Junior-Berater-Team", ak: "Gründer direkt" },
  { k: "Preismodell", g: "Time & Material", ak: "Festpreis, klar definiert" },
  { k: "DSGVO / EU AI Act", g: "Kostenpflichtiges Add-on", ak: "Vollständig integriert" },
  { k: "Fördermittelberatung", g: "Nicht inkludiert", ak: "KfW & BMWK inklusive" },
  { k: "Mittelstand-Erfahrung", g: "Konzernmethodik", ak: "21 Jahre Mittelstand-DNA" },
];

function DiffSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-32 bg-brand-ground">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="font-dm text-xs text-brand-amber tracking-[0.15em] uppercase block mb-4"
            >
              // Die ehrliche Alternative
            </motion.span>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
                transition={{ duration: 0.85, ease: EASE_SHARP }}
                className="font-syne font-bold text-brand-white"
                style={{ fontSize: "clamp(28px, 3.5vw, 52px)", letterSpacing: "-0.02em" }}
              >
                AK21 vs. die Konzernberatung —
                <br />
                ein fairer Vergleich.
              </motion.h2>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="font-dm text-brand-text text-sm max-w-xs leading-relaxed lg:text-right"
          >
            Wir vergleichen uns nicht mit anderen KI-Beratern.
            Wir vergleichen uns mit Ihren Alternativen.
          </motion.p>
        </div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          className="rounded-xl overflow-hidden border border-brand-white/8"
          style={{ background: "#111828" }}
        >
          {/* Header row */}
          <div className="grid grid-cols-3 border-b border-brand-white/8">
            <div className="px-6 py-4 font-dm text-xs text-brand-text tracking-wide uppercase">Kriterium</div>
            <div className="px-6 py-4 font-dm text-xs text-brand-text/50 tracking-wide uppercase border-l border-brand-white/8">
              Große Beratung
            </div>
            <div className="px-6 py-4 font-dm text-xs text-brand-amber tracking-wide uppercase border-l border-brand-amber/25 bg-brand-amber/5">
              AK21 Consulting
            </div>
          </div>

          {COMPARISON.map((row, i) => (
            <motion.div
              key={row.k}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.07, ease: EASE }}
              className="grid grid-cols-3 border-b border-brand-white/5 last:border-b-0 group hover:bg-brand-white/2 transition-colors duration-200"
            >
              <div className="px-6 py-4 font-dm text-sm text-brand-white/70">{row.k}</div>
              <div className="px-6 py-4 font-dm text-sm text-brand-text/50 border-l border-brand-white/5">
                {row.g}
              </div>
              <div className="px-6 py-4 font-syne font-bold text-sm text-brand-white border-l border-brand-amber/20 bg-brand-amber/5 flex items-center gap-2">
                <span className="text-brand-cyan text-xs">✓</span>
                {row.ak}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4"
        >
          <motion.a
            href="#scorecard"
            onClick={() => track("intent")}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-amber text-brand-ground font-syne font-bold text-sm tracking-wide rounded hover:brightness-110 transition-all duration-300"
          >
            Jetzt AI Readiness Scorecard anfordern →
          </motion.a>
          <span className="font-dm text-xs text-brand-text">
            Kostenlos · Kein Akquise-Anruf ohne Ihre Erlaubnis
          </span>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Trust Signals ────────────────────────────────────────────────────────────

const RESULTS = [
  {
    industry: "Fertigung & Qualitätssicherung",
    metric: "−85%",
    metricLabel: "Fehlerquote",
    problem: "Manuelle QS mit 3,2% Fehlerquote — 40 Stunden Nacharbeit pro Woche.",
    outcome: "Vision-KI erkennt Defekte in Echtzeit am Produktionsband. Pilot in 6 Wochen, SAP-integriert.",
  },
  {
    industry: "Logistik & Supply Chain",
    metric: "−60h",
    metricLabel: "pro Woche",
    problem: "60+ Stunden manuelle Dokumentenverarbeitung blockierten das Ops-Team vollständig.",
    outcome: "Automatisierte Belegverarbeitung mit 94% Genauigkeit — integriert in SAP, DSGVO-konform.",
  },
  {
    industry: "B2B-Dienstleistungen",
    metric: "+34%",
    metricLabel: "Conversion",
    problem: "3 Tage Angebotserstellung, 28% Conversion — Vertrieb unter konstantem Margendruck.",
    outcome: "KI-Angebotsgenerator mit Preisoptimierung. Erstellungszeit: 4 Stunden statt 3 Tage.",
  },
];

function TrustSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="ergebnisse" className="py-32 overflow-hidden" style={{ background: "#0D1635" }}>
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="font-dm text-xs text-brand-amber tracking-[0.15em] uppercase block mb-4"
            >
              // 120+ Projekte · Nachweisbare Ergebnisse
            </motion.span>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
                transition={{ duration: 0.85, ease: EASE_SHARP }}
                className="font-syne font-bold text-brand-white"
                style={{ fontSize: "clamp(28px, 3.5vw, 52px)", letterSpacing: "-0.02em" }}
              >
                Zahlen statt Versprechen.
              </motion.h2>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="font-dm text-brand-text text-sm max-w-xs leading-relaxed"
          >
            Reale Projekte. Keine Logos — Ergebnisse sprechen lauter.
          </motion.p>
        </div>

        {/* Result cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {RESULTS.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15, ease: EASE }}
              whileHover={{ y: -4 }}
              className="rounded-lg p-8 flex flex-col gap-6 cursor-default"
              style={{ background: "#111828", border: "1px solid rgba(232,237,247,0.06)" }}
            >
              <span className="font-dm text-xs text-brand-amber tracking-wide uppercase">{r.industry}</span>
              <div>
                <span
                  className="font-syne font-bold text-brand-white block leading-none"
                  style={{ fontSize: "clamp(40px, 4.5vw, 56px)", letterSpacing: "-0.03em" }}
                >
                  {r.metric}
                </span>
                <span className="font-dm text-sm text-brand-text ml-1">{r.metricLabel}</span>
              </div>
              <p className="font-dm text-sm text-brand-text leading-relaxed border-t border-brand-white/6 pt-6">
                {r.problem}
              </p>
              <p className="font-dm text-sm text-brand-white/80 leading-relaxed mt-auto">{r.outcome}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
          className="rounded-xl border border-brand-amber/20 p-8 grid grid-cols-2 md:grid-cols-4 gap-8"
          style={{ background: "rgba(10,15,44,0.7)" }}
        >
          {[
            { v: "120+", l: "Abgeschlossene Projekte" },
            { v: "∅ 8×", l: "ROI in 12 Monaten" },
            { v: "94%", l: "Kundenzufriedenheit" },
            { v: "21 J.", l: "Beratungserfahrung" },
          ].map(({ v, l }, i) => (
            <div key={l} className="text-center">
              <motion.span
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="font-syne font-bold text-brand-amber block"
                style={{ fontSize: "clamp(28px, 3vw, 42px)", letterSpacing: "-0.03em" }}
              >
                {v}
              </motion.span>
              <span className="font-dm text-xs text-brand-text mt-1 block">{l}</span>
            </div>
          ))}
        </motion.div>

        {/* Compliance badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <span className="font-dm text-xs text-brand-text/50 mr-2">Zertifizierte Konformität:</span>
          {["DSGVO", "EU AI Act", "ISO 42001", "KfW-Förderfähig", "BMWK go-digital"].map((badge) => (
            <span
              key={badge}
              className="font-dm text-xs text-brand-cyan border border-brand-cyan/25 rounded px-3 py-1.5"
            >
              {badge}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Scorecard Form ───────────────────────────────────────────────────────────

const SCORECARD_FIELDS = [
  { name: "name", label: "Ihr Name", required: true },
  { name: "unternehmen", label: "Unternehmensname", required: true },
  { name: "email", label: "Geschäftliche E-Mail", type: "email", required: true },
  { name: "mitarbeiter", label: "Anzahl Mitarbeiter (z.B. 50–250)" },
  { name: "branche", label: "Branche (z.B. Maschinenbau, Logistik)" },
];

const SCORECARD_FEATURES = [
  "KI-Reifegrad Ihrer Organisation (Score 0–100)",
  "Top-3 Use Cases für Ihre Branche mit ROI-Schätzung",
  "Checkliste: EU AI Act & DSGVO-Readiness",
  "Empfohlene Fördermittel (KfW, BMWK) für Ihr Projekt",
  "Benchmark: Ihr Unternehmen vs. Mittelstand-Durchschnitt",
];

function ScorecardSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="scorecard" ref={ref} className="py-32 bg-brand-ground">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Scorecard info */}
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="font-dm text-xs text-brand-amber tracking-[0.15em] uppercase block mb-6"
            >
              // Kostenloser AI Readiness Scorecard
            </motion.span>
            <div className="overflow-hidden mb-6">
              <motion.h2
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
                transition={{ duration: 0.85, ease: EASE_SHARP }}
                className="font-syne font-bold text-brand-white"
                style={{ fontSize: "clamp(26px, 3vw, 44px)", letterSpacing: "-0.02em" }}
              >
                Wo steht Ihr Unternehmen in Sachen KI?
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="font-dm text-brand-text text-base leading-relaxed mb-8"
            >
              Unser kostenloser AI Readiness Scorecard liefert Ihnen in 48 Stunden eine
              ehrliche Standortbestimmung — ohne Verkaufsgespräch, ohne Verpflichtung.
            </motion.p>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="flex flex-col gap-3 mb-8"
            >
              {SCORECARD_FEATURES.map((f, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.35 + i * 0.08, ease: EASE }}
                  className="flex items-start gap-3 font-dm text-sm text-brand-white/80 leading-relaxed"
                >
                  <span className="text-brand-cyan mt-0.5 shrink-0 text-base">✓</span>
                  {f}
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
              className="border-t border-brand-white/8 pt-6"
            >
              <p className="font-dm text-xs text-brand-text italic">
                „Über 340 Mittelständler haben den Scorecard bereits genutzt —
                durchschnittliche Bewertung: 4,8 / 5,0"
              </p>
            </motion.div>
          </div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="rounded-xl border border-brand-amber/20 p-8 text-brand-white"
            style={{ background: "#111828" }}
          >
            <h3 className="font-syne font-bold text-brand-white text-lg mb-2">
              Jetzt anfordern — kostenlos & unverbindlich
            </h3>
            <p className="font-dm text-xs text-brand-text mb-6">
              Kein Akquise-Anruf ohne Ihre ausdrückliche Erlaubnis.
            </p>
            <ConversionForm
              startStep="form_start"
              submitStep="convert"
              cta="Scorecard anfordern"
              fields={SCORECARD_FIELDS}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

const FAQS = [
  {
    q: "Was kostet KI-Beratung für den Mittelstand?",
    a: "Wir beginnen mit einem kostenlosen 2-tägigen Discovery Workshop — ohne Verpflichtung. Festpreispakete für KI-Piloten beginnen bei klar definierten Budgets ohne Überraschungen. KfW- und BMWK-Förderung kann bis zu 50% der Investition abdecken. Alle Konditionen besprechen wir transparent im ersten Gespräch.",
  },
  {
    q: "Wie lange dauert ein KI-Pilot im Mittelstand?",
    a: "Unser bewährter Ansatz liefert einen funktionierenden, validierten KI-Pilot in 8 Wochen — mit echten Daten und echten Nutzern. Vergleich: Große Beratungen benötigen oft 6–12 Monate allein für die Strategiephase. Wir skalieren erst nach beweisbarem Erfolg.",
  },
  {
    q: "Ist KI DSGVO-konform und EU AI Act-ready einsetzbar?",
    a: "Ja. DSGVO, EU AI Act und ISO 42001 sind bei AK21 kein kostenpflichtiges Add-on, sondern von Beginn an in jede Lösung integriert. On-premise- und Hybrid-Deployments sind Standard — Ihre Daten verlassen niemals unkontrolliert Ihr Unternehmen.",
  },
  {
    q: "Welche KI-Fördermittel gibt es für mittelständische Unternehmen?",
    a: "KfW-Digitalisierungskredit, BMWK-Programme (go-digital, Digital Jetzt), sowie Länderprogramme bieten Zuschüsse bis zu 50% und zinsgünstige Darlehen für KI-Projekte. Fördermittelberatung ist in allen unseren Paketen kostenfrei inkludiert.",
  },
  {
    q: "Was unterscheidet AK21 von anderen KI-Beratungen?",
    a: "Drei Dinge: Erstens, 21 Jahre nachweisbare Erfahrung spezifisch mit dem deutschen Mittelstand. Zweitens, vollständige Herstellerunabhängigkeit — keine versteckten Provisionen. Drittens, Gründer-Direktkontakt: Ihr Projekt wird von denselben Experten geführt, die das Angebot erstellt haben.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-brand-white/10">
      <motion.button
        onClick={() => setOpen(!open)}
        className="w-full text-left py-6 flex items-start justify-between gap-6"
        whileHover={{ x: 2 }}
        whileTap={{ scale: 0.99 }}
        transition={{ duration: 0.2 }}
      >
        <span className="font-syne font-medium text-lg text-brand-white leading-snug">{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="text-brand-amber text-2xl shrink-0 mt-0.5 font-light leading-none"
        >
          +
        </motion.span>
      </motion.button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="faq-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="font-dm text-brand-text leading-relaxed pb-6 max-w-3xl">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FAQSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-28 bg-brand-ground border-t border-brand-white/8">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="font-dm text-xs text-brand-amber tracking-[0.15em] uppercase block mb-4"
            >
              // FAQ
            </motion.span>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
                transition={{ duration: 0.85, ease: EASE_SHARP }}
                className="font-syne font-bold text-brand-white mb-4"
                style={{ fontSize: "clamp(24px, 3vw, 40px)", letterSpacing: "-0.02em" }}
              >
                Häufige Fragen zur KI-Beratung.
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.25 }}
              className="font-dm text-brand-text text-sm leading-relaxed"
            >
              Keine Standardantworten — nur konkrete Informationen,
              die Ihnen helfen, eine fundierte Entscheidung zu treffen.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="lg:col-span-8"
          >
            {FAQS.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
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
      <HeroLP />
      <PainSection />
      <UseCaseSection />
      <DiffSection />
      <TrustSection />
      <ScorecardSection />
      <FAQSection />
    </>
  );
}
