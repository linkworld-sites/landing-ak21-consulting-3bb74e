"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { track } from "@/lib/funnel";

const navItems = [
  { label: "Leistungen", href: "#leistungen" },
  { label: "Ergebnisse", href: "#ergebnisse" },
  { label: "Über uns", href: "#ueber-uns" },
  { label: "Blog", href: "/blog" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5"
      animate={{
        backgroundColor: scrolled ? "rgba(10,15,44,0.85)" : "rgba(10,15,44,0)",
        backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
        borderBottom: scrolled ? "1px solid rgba(245,166,35,0.12)" : "1px solid transparent",
      }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav className="max-w-screen-xl mx-auto flex items-center justify-between">
        <Link href="/" className="font-syne font-bold text-xl tracking-tight text-brand-white">
          AK21
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.label}>
              <motion.a
                href={item.href}
                className="font-dm text-sm text-brand-text hover:text-brand-white transition-colors duration-200"
                whileHover={{ y: -1 }}
                transition={{ duration: 0.2 }}
              >
                {item.label}
              </motion.a>
            </li>
          ))}
        </ul>

        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Link
            href="/contact"
            onClick={() => track("intent")}
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 border border-brand-amber text-brand-amber font-dm text-sm font-medium rounded-full hover:bg-brand-amber hover:text-brand-ground transition-all duration-300"
          >
            Gespräch anfragen
          </Link>
        </motion.div>

        {/* Mobile CTA */}
        <Link
          href="/contact"
          onClick={() => track("intent")}
          className="md:hidden px-4 py-2 border border-brand-amber text-brand-amber font-dm text-xs font-medium rounded-full"
        >
          Anfragen
        </Link>
      </nav>
    </motion.header>
  );
}
