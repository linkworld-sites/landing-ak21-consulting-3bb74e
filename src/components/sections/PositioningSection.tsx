"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const sentences = [
  { text: "Viele reden über KI.", color: "#8A8D99" },
  { text: "Wir bauen sie in Ihr Unternehmen ein.", color: "#E8EDF7" },
  { text: "Nachhaltig. Messbar. Jetzt.", color: "#F5A623" },
];

export default function PositioningSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={containerRef} className="relative" style={{ height: "320vh" }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-brand-ground">
        {/* Background subtle texture */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 20% 50%, #2AFFC8 0%, transparent 50%), radial-gradient(circle at 80% 50%, #F5A623 0%, transparent 50%)",
          }}
        />
        <div className="w-full max-w-screen-xl mx-auto px-6 md:px-12">
          <div className="max-w-4xl">
            {sentences.map((sentence, i) => (
              <SentenceReveal
                key={i}
                text={sentence.text}
                color={sentence.color}
                index={i}
                scrollYProgress={scrollYProgress}
                total={sentences.length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SentenceReveal({
  text,
  color,
  index,
  scrollYProgress,
  total,
}: {
  text: string;
  color: string;
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  total: number;
}) {
  const segmentSize = 0.8 / total;
  const start = 0.05 + index * segmentSize;
  const end = start + segmentSize * 0.7;

  const clipProgress = useTransform(scrollYProgress, [start, end], [100, 0]);
  const opacity = useTransform(scrollYProgress, [start - 0.02, start + 0.05], [0, 1]);

  const clipPath = useTransform(
    clipProgress,
    (v) => `inset(0 ${v}% 0 0)`
  );

  return (
    <div className="overflow-hidden mb-2 md:mb-4">
      <motion.h2
        className="font-syne font-bold leading-tight"
        style={{
          clipPath,
          opacity,
          color,
          fontSize: "clamp(28px, 5vw, 72px)",
          lineHeight: "1.1",
          letterSpacing: "-0.02em",
          marginBottom: "0.25em",
        }}
      >
        {text}
      </motion.h2>
    </div>
  );
}
