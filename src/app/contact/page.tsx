import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Gespräch anfragen — AK21 Consulting",
  description: "Starten Sie Ihr KI-Projekt. Erste Antwort innerhalb von 24 Stunden.",
};

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-brand-ground pt-32 pb-24">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left: Context */}
            <div className="flex flex-col gap-8 lg:sticky lg:top-32">
              <div>
                <span className="font-dm text-xs text-brand-amber tracking-[0.15em] uppercase block mb-6">
                  Kontakt
                </span>
                <h1
                  className="font-syne font-bold text-brand-white leading-tight mb-6"
                  style={{ fontSize: "clamp(36px, 5vw, 72px)", letterSpacing: "-0.02em" }}
                >
                  Gespräch
                  <br />
                  anfragen.
                </h1>
                <p className="font-dm text-brand-text text-lg leading-relaxed max-w-sm">
                  Kein Verkaufsgespräch. Wir klären in 30 Minuten, ob und wie KI
                  konkret in Ihr Unternehmen passt.
                </p>
              </div>

              <div className="flex flex-col gap-4 pt-4 border-t border-brand-white/10">
                {[
                  { label: "Antwortzeit", value: "< 24 Stunden" },
                  { label: "Format", value: "Video-Call oder persönlich" },
                  { label: "Kosten", value: "Erstgespräch kostenfrei" },
                ].map((item) => (
                  <div key={item.label} className="flex items-baseline justify-between gap-8">
                    <span className="font-dm text-xs text-brand-text uppercase tracking-wider">
                      {item.label}
                    </span>
                    <span className="font-dm text-sm text-brand-white">{item.value}</span>
                  </div>
                ))}
              </div>

              <blockquote className="border-l-2 border-brand-amber/50 pl-6 mt-4">
                <p className="font-syne italic text-brand-text text-base leading-relaxed">
                  „Nicht beraten und verschwinden — einbauen und befähigen."
                </p>
              </blockquote>
            </div>

            {/* Right: Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
