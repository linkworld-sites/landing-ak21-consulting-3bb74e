"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const sentences = [
  { text: "Viele reden über KI.", color: "#8A8D99" },
  { text: "Wir bauen sie in Ihr Unternehmen ein.", color: "#E8EDF7" },
  { text: "Nachhaltig. Messbar. Jetzt.", color: "#F5A623" },
];

export default function PositioningSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.25 });

  return (
    <section ref={containerRef} className="relative" style={{ height: "320vh" }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-brand-ground">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #2AFFC8 0%, transparent 50%), radial-gradient(circle at 80% 50%, #F5A623 0%, transparent 50%)",
          }}
        />
        <div className="w-full max-w-screen-xl mx-auto px-6 md:px-12">
          <div className="max-w-4xl">
            {sentences.map((sentence, i) => (
              <div key={i} className="overflow-hidden mb-2 md:mb-4">
                <motion.h2
                  className="font-syne font-bold leading-tight"
                  initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
                  animate={
                    isInView
                      ? { clipPath: "inset(0 0% 0 0)", opacity: 1 }
                      : {}
                  }
                  transition={{
                    duration: 0.9,
                    delay: i * 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    color: sentence.color,
                    fontSize: "clamp(28px, 5vw, 72px)",
                    lineHeight: "1.1",
                    letterSpacing: "-0.02em",
                    marginBottom: "0.25em",
                  }}
                >
                  {sentence.text}
                </motion.h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
