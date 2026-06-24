import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, getPosts } from "@/lib/posts";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: `${post.title} — AK21 Consulting`, description: post.description };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-brand-ground pt-32 pb-24">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12">
          <div className="max-w-2xl">
            {/* Breadcrumb */}
            <Link
              href="/blog"
              className="font-dm text-xs text-brand-text hover:text-brand-amber transition-colors duration-200 inline-flex items-center gap-2 mb-12"
            >
              ← Alle Beiträge
            </Link>

            {/* Post header */}
            {post.date && (
              <p className="font-dm text-xs text-brand-amber tracking-wider uppercase mb-4">
                {post.date}
              </p>
            )}
            <h1
              className="font-syne font-bold text-brand-white mb-8 leading-tight"
              style={{ fontSize: "clamp(28px, 4vw, 52px)", letterSpacing: "-0.02em" }}
            >
              {post.title}
            </h1>
            {post.description && (
              <p className="font-dm text-brand-text text-lg leading-relaxed mb-10 pb-10 border-b border-brand-white/10">
                {post.description}
              </p>
            )}

            {/* Post body */}
            <article
              className="post-body font-dm text-brand-white/85"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
