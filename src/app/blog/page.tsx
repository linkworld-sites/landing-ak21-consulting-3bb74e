import Link from "next/link";
import { getPosts } from "@/lib/posts";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Blog — AK21 Consulting",
  description: "Einblicke in KI-Strategie, Implementierung und den Stand der KI-Adoption im DACH-Raum.",
};

export default function BlogIndex() {
  const posts = getPosts();
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-brand-ground pt-32 pb-24">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="max-w-2xl mb-16">
            <span className="font-dm text-xs text-brand-amber tracking-[0.15em] uppercase block mb-6">
              Perspektiven
            </span>
            <h1 className="font-syne font-bold text-brand-white mb-4" style={{ fontSize: "clamp(36px, 5vw, 72px)", letterSpacing: "-0.02em" }}>
              Blog
            </h1>
            <p className="font-dm text-brand-text text-lg leading-relaxed">
              Einblicke in KI-Strategie, Implementierung und den Stand der
              KI-Adoption im DACH-Raum.
            </p>
          </div>

          {/* Posts */}
          {posts.length === 0 ? (
            <p className="font-dm text-brand-text text-base">
              Neue Beiträge erscheinen in Kürze.
            </p>
          ) : (
            <ul className="flex flex-col divide-y divide-brand-white/10">
              {posts.map((p) => (
                <li key={p.slug} className="py-10">
                  <Link href={`/blog/${p.slug}`} className="group block">
                    <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8">
                      {p.date && (
                        <span className="font-dm text-xs text-brand-text shrink-0">
                          {p.date}
                        </span>
                      )}
                      <div>
                        <h2 className="font-syne font-bold text-xl md:text-2xl text-brand-white group-hover:text-brand-amber transition-colors duration-200" style={{ letterSpacing: "-0.01em" }}>
                          {p.title}
                        </h2>
                        {p.description && (
                          <p className="mt-2 font-dm text-base text-brand-text leading-relaxed">
                            {p.description}
                          </p>
                        )}
                      </div>
                      <span className="md:ml-auto font-dm text-brand-amber text-sm shrink-0 group-hover:translate-x-1 transition-transform duration-200">
                        Lesen →
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
