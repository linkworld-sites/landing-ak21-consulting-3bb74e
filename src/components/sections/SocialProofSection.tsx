"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  {
    number: "94%",
    label: "Belegverarbeitungsgenauigkeit",
    context: "SAP-Integration · Fertigungsunternehmen",
  },
  {
    number: "3T → 4H",
    label: "Schnellere Angebotserstellung",
    context: "Maschinenbau · DACH",
  },
  {
    number: "40–70%",
    label: "Zeitersparnis in operativen Workflows",
    context: "12 Branchen · 40+ Projekte",
  },
];

const fadeUp = {
  hidden: { y: 20, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function SocialProofSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="relative py-16 overflow-hidden"
      style={{ background: "#0A0F2C" }}
    >
      {/* Top border line */}
      <motion.div
        initial={{ scaleX: 0, transformOrigin: "left" }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-amber to-transparent"
      />

      <div className="relative z-10 w-full max-w-screen-xl mx-auto px-6 md:px-12">
        {/* Stat cards row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              custom={i}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="flex flex-col gap-2 px-6 py-7 rounded border border-white/8 bg-white/3 backdrop-blur-sm"
            >
              <span
                className="font-syne font-bold leading-none"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#F5A623" }}
              >
                {stat.number}
              </span>
              <span className="font-dm font-medium text-brand-white text-base leading-snug">
                {stat.label}
              </span>
              <span className="font-dm text-xs text-brand-text tracking-wide">
                {stat.context}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Sub-line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <span className="font-dm text-xs text-brand-text tracking-[0.15em] uppercase">
            40+ realisierte KI-Projekte · 12 Branchen · DACH-Raum
          </span>
        </motion.div>
      </div>

      {/* Bottom border line */}
      <motion.div
        initial={{ scaleX: 0, transformOrigin: "right" }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-amber/40 to-transparent"
      />
    </section>
  );
}
