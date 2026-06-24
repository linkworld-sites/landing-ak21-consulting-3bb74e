import Link from "next/link";
import { notFound } from "next/navigation";
import { getLegalPage, getLegalSlugs } from "@/lib/legal";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return getLegalSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getLegalPage(slug);
  if (!page) notFound();

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-brand-ground pt-32 pb-24">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12">
          <div className="max-w-2xl">
            <Link
              href="/"
              className="font-dm text-xs text-brand-text hover:text-brand-amber transition-colors duration-200 inline-flex items-center gap-2 mb-12"
            >
              ← Startseite
            </Link>
            <article
              className="post-body font-dm text-brand-white/85"
              dangerouslySetInnerHTML={{ __html: page.html }}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
