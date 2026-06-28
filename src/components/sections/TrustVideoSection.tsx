"use client";
import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { track } from "@/lib/funnel";

const fadeUp = {
  hidden: { y: 32, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function TrustVideoSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  const [videoError, setVideoError] = useState(false);

  const animate = reduced ? "visible" : inView ? "visible" : "hidden";

  return (
    <section
      ref={ref}
      id="spokesperson-video"
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: "#0A0F2C" }}
    >
      {/* Subtle blueprint grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(245,166,35,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(245,166,35,0.8) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Ambient amber glow top-right */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[400px] opacity-5 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 80% 20%, #F5A623 0%, transparent 70%)",
        }}
      />

      {/* Top rule */}
      <motion.div
        initial={{ scaleX: 0, transformOrigin: "left" }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-amber/50 to-transparent"
      />

      <div className="relative z-10 w-full max-w-screen-xl mx-auto px-6 md:px-12">
        {/* Eyebrow */}
        <motion.p
          variants={fadeUp}
          custom={0}
          initial="hidden"
          animate={animate}
          className="font-inter text-xs tracking-[0.2em] uppercase text-brand-amber mb-4 text-center"
        >
          Methode &amp; Haltung
        </motion.p>

        {/* Heading */}
        <motion.h2
          variants={fadeUp}
          custom={1}
          initial="hidden"
          animate={animate}
          className="font-heading font-bold text-center text-brand-white mb-12 md:mb-16"
          style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", lineHeight: 1.15 }}
        >
          So arbeitet ak21 —{" "}
          <span className="text-brand-amber">
            vertraglich gebunden an Ihre KPIs
          </span>
        </motion.h2>

        {/* Video card */}
        <motion.div
          variants={fadeUp}
          custom={2}
          initial="hidden"
          animate={animate}
          className="mx-auto max-w-3xl"
        >
          <motion.div
            whileHover={reduced ? {} : { scale: 1.005 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl overflow-hidden"
            style={{
              border: "2px solid #F5A623",
              boxShadow: "0 0 48px rgba(245,166,35,0.12), 0 4px 32px rgba(0,0,0,0.5)",
              background: "#0D1635",
            }}
          >
            {!videoError ? (
              <div className="aspect-video relative">
                <video
                  src="/api/video"
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                  onError={() => setVideoError(true)}
                  style={{ display: "block" }}
                />
              </div>
            ) : (
              /* Elegant fallback when video is unavailable */
              <div
                className="aspect-video flex flex-col items-center justify-center gap-6 px-8"
                style={{ background: "#0D1635" }}
              >
                {/* Abstract visual: animated amber pulse rings */}
                <div className="relative flex items-center justify-center">
                  <motion.div
                    animate={reduced ? {} : { scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute w-24 h-24 rounded-full border border-brand-amber/30"
                  />
                  <motion.div
                    animate={reduced ? {} : { scale: [1, 1.25, 1], opacity: [0.8, 0, 0.8] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                    className="absolute w-16 h-16 rounded-full border border-brand-amber/50"
                  />
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(245,166,35,0.15)", border: "1.5px solid #F5A623" }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="#F5A623"
                      aria-hidden="true"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <p className="font-inter text-sm text-brand-text text-center max-w-xs">
                  Spokesperson-Video wird geladen…
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Pull-quote */}
        <motion.blockquote
          variants={fadeUp}
          custom={3}
          initial="hidden"
          animate={animate}
          className="mx-auto max-w-2xl mt-10 text-center"
        >
          <div
            className="w-8 h-px mx-auto mb-5"
            style={{ background: "#F5A623" }}
          />
          <p
            className="font-inter italic leading-relaxed text-brand-white/80"
            style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)" }}
          >
            &bdquo;Kein Theoriepapier. Keine Vendor-Provisionen. Messbares
            Ergebnis in 4&ndash;8 Wochen &mdash; oder wir reden nicht über eine
            Zusammenarbeit.&ldquo;
          </p>
          <div
            className="w-8 h-px mx-auto mt-5"
            style={{ background: "#F5A623" }}
          />
        </motion.blockquote>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          custom={4}
          initial="hidden"
          animate={animate}
          className="flex justify-center mt-10"
        >
          <motion.a
            href="#kontakt"
            onClick={() => track("intent")}
            whileHover={reduced ? {} : { scale: 1.04 }}
            whileTap={reduced ? {} : { scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 font-inter font-semibold text-sm px-8 py-4 rounded-full"
            style={{
              background: "#F5A623",
              color: "#0A0F2C",
              boxShadow: "0 4px 24px rgba(245,166,35,0.25)",
              minWidth: "220px",
              justifyContent: "center",
            }}
          >
            Erstgespräch anfragen →
          </motion.a>
        </motion.div>
      </div>

      {/* Bottom rule */}
      <motion.div
        initial={{ scaleX: 0, transformOrigin: "right" }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-amber/30 to-transparent"
      />
    </section>
  );
}
