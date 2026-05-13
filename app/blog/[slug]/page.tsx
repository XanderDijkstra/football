import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import {
  blogPosts,
  getBlogPost,
  formatPostDate,
} from "@/data/blogPosts";
import { getStadium } from "@/data/stadiums";
import { getClub } from "@/data/clubs";
import { SITE } from "@/lib/utils";
import { article, breadcrumbList } from "@/lib/schema";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.lede,
    alternates: { canonical: `${SITE.url}/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.lede,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const relatedStadiums = post.related.stadiums
    .map((s) => getStadium(s))
    .filter((x): x is NonNullable<typeof x> => !!x);
  const relatedClubs = post.related.clubs
    .map((s) => getClub(s))
    .filter((x): x is NonNullable<typeof x> => !!x);
  const relatedPosts = post.related.posts
    .map((s) => getBlogPost(s))
    .filter((x): x is NonNullable<typeof x> => !!x);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="container py-6 md:py-8">
        <Breadcrumbs
          items={[{ label: "Journal", href: "/blog" }, { label: post.title }]}
        />
        <article className="max-w-3xl mx-auto mt-3">
          <header>
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-numeric">
              {formatPostDate(post.date)} · {post.readMinutes} min read
            </p>
            <h1 className="font-serif text-4xl md:text-6xl text-foreground mt-3 leading-[1.05]">
              {post.title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mt-5 max-w-2xl">
              {post.lede}
            </p>
          </header>

          <div className="mt-12 text-base md:text-lg text-foreground/90 leading-relaxed space-y-5">
            <p>{post.body}</p>
            <p className="text-muted-foreground italic">
              [Full article in progress — this is a starter draft.]
            </p>
          </div>

          {(relatedStadiums.length > 0 || relatedClubs.length > 0) && (
            <section className="mt-16 border-t border-border pt-8">
              <h2 className="text-xs uppercase tracking-widest text-muted-foreground">
                Mentioned in this piece
              </h2>
              <ul className="mt-4 flex flex-wrap gap-3">
                {relatedStadiums.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/stadiums/${s.slug}`}
                      className="inline-flex h-10 items-center px-4 rounded border border-border text-foreground hover:border-foreground"
                    >
                      {s.name}
                    </Link>
                  </li>
                ))}
                {relatedClubs.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/clubs/${c.slug}`}
                      className="inline-flex h-10 items-center px-4 rounded border border-border text-foreground hover:border-foreground"
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {relatedPosts.length > 0 && (
            <section className="mt-16 border-t border-border pt-8">
              <h2 className="font-serif text-2xl text-foreground">
                You might also like
              </h2>
              <ul className="mt-6 grid sm:grid-cols-3 gap-4">
                {relatedPosts.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/blog/${p.slug}`}
                      className="block p-5 bg-surface border border-border rounded hover:border-foreground"
                    >
                      <p className="text-xs uppercase tracking-widest text-muted-foreground">
                        {formatPostDate(p.date)}
                      </p>
                      <p className="font-serif text-lg text-foreground mt-2">
                        {p.title}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>
      </main>
      <SiteFooter />
      <JsonLd
        data={[
          article({
            headline: post.title,
            description: post.lede,
            datePublished: post.date,
            url: `/blog/${post.slug}`,
          }),
          breadcrumbList([
            { name: "Home", href: "/" },
            { name: "Journal", href: "/blog" },
            { name: post.title, href: `/blog/${post.slug}` },
          ]),
        ]}
      />
    </div>
  );
}
