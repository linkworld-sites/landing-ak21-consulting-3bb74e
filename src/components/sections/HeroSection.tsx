"use client";
import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import { track } from "@/lib/funnel";

const ParticleMesh = dynamic(() => import("@/components/ParticleMesh"), { ssr: false });

const clipReveal = {
  hidden: { clipPath: "inset(0 100% 0 0)", opacity: 1 },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    opacity: 1,
    transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
  },
};

const fadeUp = {
  hidden: { y: 24, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden bg-brand-ground"
    >
      {/* Background grid overlay */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(42,255,200,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(42,255,200,0.3) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 w-full max-w-screen-xl mx-auto px-6 md:px-12 pt-32 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-center min-h-[70vh]">
          {/* Left: Headline */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {/* Metadata tag */}
            <motion.div
              variants={fadeUp}
              custom={0}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="flex items-center gap-3"
            >
              <span className="font-dm text-xs font-medium text-brand-cyan tracking-[0.15em] uppercase">
                // KI-Beratung · Strategie · Implementierung · 2024
              </span>
            </motion.div>

            {/* Main headline */}
            <div className="flex flex-col gap-2">
              <div className="overflow-hidden">
                <motion.h1
                  variants={clipReveal}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  className="font-syne font-light text-display-xl text-brand-white"
                >
                  Künstliche Intelligenz.
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.span
                  variants={clipReveal}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  transition={{ delay: 0.15 }}
                  className="font-syne font-bold text-display-xl text-brand-white block"
                >
                  Strategisch eingesetzt.
                </motion.span>
              </div>
            </div>

            {/* Amber rule */}
            <motion.div
              initial={{ scaleX: 0, transformOrigin: "left" }}
              animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="h-px bg-brand-amber w-[40vw] max-w-xs"
            />

            {/* Sub-copy */}
            <motion.p
              variants={fadeUp}
              custom={4}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="font-dm text-brand-text text-lg max-w-md leading-relaxed"
            >
              Wir übersetzen KI-Komplexität in Wettbewerbsvorteil — von der Strategie
              bis zur laufenden Implementierung. Keine Buzzwords. Messbare Ergebnisse.
            </motion.p>

            {/* CTA row */}
            <motion.div
              variants={fadeUp}
              custom={6}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/contact"
                  onClick={() => track("intent")}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-brand-amber text-brand-ground font-syne font-bold text-sm tracking-wide rounded hover:brightness-110 transition-all duration-300"
                >
                  Gespräch anfragen
                  <span className="text-lg leading-none">→</span>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <a
                  href="#ergebnisse"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-brand-white/20 text-brand-white font-dm text-sm rounded hover:border-brand-white/50 transition-all duration-300"
                >
                  Unsere Ergebnisse
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* Right: Particle mesh + hero image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="lg:col-span-5 relative h-[400px] lg:h-[600px]"
          >
            {/* Hero image */}
            <div className="absolute inset-0 rounded-lg overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/hero.png"
                alt="KI-Strategie Visualisierung"
                className="w-full h-full object-cover"
                style={{ filter: "brightness(0.5) saturate(1.2)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-brand-ground/60" />
            </div>
            {/* Particle overlay */}
            <div className="absolute inset-0 z-10">
              <ParticleMesh />
            </div>
            {/* Corner accent */}
            <div className="absolute bottom-4 right-4 z-20 text-right">
              <span className="font-syne font-bold text-5xl text-brand-amber/20">AK21</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-dm text-xs text-brand-text tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-brand-amber to-transparent"
        />
      </motion.div>
    </section>
  );
}
