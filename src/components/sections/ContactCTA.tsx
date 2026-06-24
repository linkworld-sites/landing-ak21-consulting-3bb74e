"use client";
import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { track } from "@/lib/funnel";

export default function ContactCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "#0A0F2C" }}
    >
      {/* Background process image */}
      <div className="absolute inset-0 pointer-events-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/process.png"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover opacity-15"
          style={{ filter: "saturate(0.3) brightness(0.4)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-ground via-transparent to-brand-ground" />
      </div>

      {/* Amber glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 40% at 50% 60%, rgba(245,166,35,0.08) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 w-full max-w-screen-xl mx-auto px-6 md:px-12 py-32 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="font-dm text-xs text-brand-amber tracking-[0.15em] uppercase">
            09 — Kontakt
          </span>
        </motion.div>

        <div className="overflow-hidden mb-6">
          <motion.h2
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="font-syne font-bold text-brand-white mx-auto"
            style={{
              fontSize: "clamp(48px, 8vw, 120px)",
              letterSpacing: "-0.03em",
              lineHeight: "0.95",
            }}
          >
            Bereit für KI?
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-dm text-brand-text text-lg max-w-xl mx-auto mb-12"
        >
          AK21. Beratung für das, was jetzt zählt.
          <br />
          Erste Antwort innerhalb von 24 Stunden.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/contact"
              onClick={() => track("intent")}
              className="inline-flex items-center gap-3 px-10 py-5 bg-brand-amber text-brand-ground font-syne font-bold text-sm tracking-wide rounded hover:brightness-110 transition-all duration-300"
            >
              Gespräch anfragen
              <span className="text-xl leading-none">→</span>
            </Link>
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 font-dm text-xs text-brand-text"
        >
          Vertraulich · Unverbindlich · Direkt mit dem Partner
        </motion.p>
      </div>
    </section>
  );
}
