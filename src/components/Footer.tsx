import Link from "next/link";

const navLinks = [
  { label: "Leistungen", href: "/#leistungen" },
  { label: "Ergebnisse", href: "/#ergebnisse" },
  { label: "Über uns", href: "/#ueber-uns" },
  { label: "Blog", href: "/blog" },
  { label: "Kontakt", href: "/contact" },
];

const legalLinks = [
  { label: "Impressum", href: "/legal/impressum" },
  { label: "Datenschutz", href: "/legal/datenschutz" },
  { label: "Cookies", href: "/legal/cookies" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-ground border-t border-brand-amber/20">
      {/* Top amber rule */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-16">
          {/* Col 1: Logo + tagline */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="font-syne font-bold text-2xl text-brand-white">
              AK21
            </Link>
            <p className="font-dm text-sm text-brand-text leading-relaxed max-w-xs">
              Strategie kommt vor Algorithmus.
              <br />
              KI-Beratung für den DACH-Raum.
            </p>
            <p className="font-dm text-xs text-brand-text/60 mt-4">
              © {new Date().getFullYear()} AK21 Consulting. Alle Rechte vorbehalten.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div className="flex flex-col gap-4">
            <h4 className="font-syne font-bold text-xs text-brand-amber tracking-[0.15em] uppercase mb-2">
              Navigation
            </h4>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-dm text-sm text-brand-text hover:text-brand-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Legal */}
          <div className="flex flex-col gap-4">
            <h4 className="font-syne font-bold text-xs text-brand-amber tracking-[0.15em] uppercase mb-2">
              Rechtliches
            </h4>
            <ul className="flex flex-col gap-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-dm text-sm text-brand-text hover:text-brand-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-brand-white/10">
              <p className="font-dm text-xs text-brand-text/60">
                AK21 ist kein Technologievendor.
                <br />
                Unabhängige Beratung. Immer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
