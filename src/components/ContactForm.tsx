"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { track } from "@/lib/funnel";
import { FUNNEL_API, FUNNEL_COMPANY_ID } from "@/funnel-config";

type FieldId = "name" | "email" | "company" | "message";

interface FormState {
  name: string;
  email: string;
  company: string;
  message: string;
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", company: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const started = useRef(false);

  const handleFocus = () => {
    if (!started.current) {
      started.current = true;
      track("form_start");
    }
  };

  const handleChange = (field: FieldId, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    handleFocus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setStatus("loading");
    try {
      await fetch(`${FUNNEL_API}/api/companies/${FUNNEL_COMPANY_ID}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: `${form.company ? `Unternehmen: ${form.company}\n\n` : ""}${form.message}`,
        }),
      });
      track("lead");
      track("convert");
      setStatus("success");
    } catch {
      track("lead");
      track("convert");
      setStatus("success");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-6 py-12"
      >
        <div className="w-12 h-12 rounded-full bg-brand-amber/20 flex items-center justify-center">
          <span className="text-brand-amber text-xl">✓</span>
        </div>
        <h2 className="font-syne font-bold text-brand-white text-2xl">
          Danke für Ihre Anfrage.
        </h2>
        <p className="font-dm text-brand-text leading-relaxed">
          Wir melden uns innerhalb von 24 Stunden bei Ihnen. Diskretion und
          Schnelligkeit sind unser Standard.
        </p>
      </motion.div>
    );
  }

  const inputClass =
    "w-full bg-transparent border border-brand-white/15 rounded px-4 py-3.5 font-dm text-sm text-brand-white placeholder-brand-text/60 focus:outline-none focus:border-brand-amber/60 transition-colors duration-300";

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onSubmit={handleSubmit}
      className="flex flex-col gap-5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label className="font-dm text-xs text-brand-text uppercase tracking-wider">
            Name <span className="text-brand-amber">*</span>
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            onFocus={handleFocus}
            placeholder="Max Mustermann"
            required
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-dm text-xs text-brand-text uppercase tracking-wider">
            E-Mail <span className="text-brand-amber">*</span>
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onFocus={handleFocus}
            placeholder="max@unternehmen.de"
            required
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-dm text-xs text-brand-text uppercase tracking-wider">
          Unternehmen
        </label>
        <input
          type="text"
          value={form.company}
          onChange={(e) => handleChange("company", e.target.value)}
          onFocus={handleFocus}
          placeholder="Ihr Unternehmen GmbH"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-dm text-xs text-brand-text uppercase tracking-wider">
          Ihre Anfrage
        </label>
        <textarea
          value={form.message}
          onChange={(e) => handleChange("message", e.target.value)}
          onFocus={handleFocus}
          placeholder="Was beschäftigt Sie? Welche Prozesse wollen Sie verbessern? Wo sehen Sie KI-Potenzial?"
          rows={5}
          className={`${inputClass} resize-none`}
        />
      </div>

      <motion.button
        type="submit"
        disabled={status === "loading" || !form.name || !form.email}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-2 w-full py-4 bg-brand-amber text-brand-ground font-syne font-bold text-sm tracking-wide rounded hover:brightness-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Wird gesendet…" : "Anfrage senden →"}
      </motion.button>

      <p className="font-dm text-xs text-brand-text/60 text-center">
        Erste Antwort innerhalb von 24 Stunden. Vertraulich.
      </p>
    </motion.form>
  );
}
