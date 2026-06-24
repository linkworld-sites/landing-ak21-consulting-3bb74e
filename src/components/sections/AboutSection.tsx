"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="ueber-uns" ref={ref} className="py-32 bg-brand-ground">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        {/* Section label */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="font-dm text-xs text-brand-amber tracking-[0.15em] uppercase block mb-16"
        >
          08 — Team
        </motion.span>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[3/4] md:aspect-[4/5] rounded-lg overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/detail.png"
                alt="AK21 Consulting Team"
                className="w-full h-full object-cover"
                style={{ filter: "grayscale(80%) brightness(0.75) sepia(20%)" }}
              />
              {/* Amber duotone overlay */}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(135deg, rgba(245,166,35,0.12) 0%, transparent 60%)" }}
              />
              {/* Bottom gradient */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-brand-ground/80 to-transparent" />
              {/* Name overlay */}
              <div className="absolute bottom-8 left-8 right-8">
                <p className="font-syne font-bold text-2xl text-brand-white">Alexander Koch</p>
                <p className="font-dm text-sm text-brand-amber mt-1">Gründer & Managing Partner</p>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <div className="lg:col-span-7 flex flex-col gap-8 lg:pt-8">
            <div className="overflow-hidden">
              <motion.h2
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
                transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                className="font-syne font-bold text-brand-white leading-tight"
                style={{ fontSize: "clamp(32px, 4vw, 60px)", letterSpacing: "-0.02em" }}
              >
                Beratung, die
                <br />
                <span className="text-brand-amber">liefert.</span>
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col gap-5"
            >
              <p className="font-dm text-brand-text leading-relaxed text-base md:text-lg">
                AK21 wurde gegründet, weil KI-Beratung einen Widerspruch aufgelöst werden musste:
                Entweder strategische Tiefe ohne technische Umsetzungskraft — oder
                Tech-Implementierung ohne unternehmerischen Kontext.
              </p>
              <p className="font-dm text-brand-text leading-relaxed text-base md:text-lg">
                Wir verbinden beides. Unser Team aus Strategen und Ingenieuren hat
                KI-Systeme in Produktion gebracht, die heute täglich tausende
                Geschäftsvorgänge verarbeiten — in Logistik, Fertigung, Professional
                Services und Finanzwesen.
              </p>
              <p className="font-dm text-brand-text leading-relaxed text-base md:text-lg">
                Die einzige Metrik, die zählt: Wieviel Wettbewerbsvorteil hat der
                Mandant nach sechs Monaten — messbar, nicht hypothetisch.
              </p>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-3 gap-8 pt-4 border-t border-brand-white/10 mt-4"
            >
              {[
                { value: "40+", label: "KI-Projekte" },
                { value: "12", label: "Branchen" },
                { value: "DACH", label: "Region" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <span className="font-syne font-bold text-3xl md:text-4xl text-brand-white" style={{ letterSpacing: "-0.03em" }}>
                    {stat.value}
                  </span>
                  <span className="font-dm text-xs text-brand-text uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
