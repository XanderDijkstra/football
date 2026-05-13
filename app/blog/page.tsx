import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { blogPosts, formatPostDate } from "@/data/blogPosts";
import { SITE } from "@/lib/utils";
import { breadcrumbList, collectionPage } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Notes on stadium design, matchday culture, and the framed prints we make. One issue a month.",
  alternates: { canonical: `${SITE.url}/blog` },
};

export default function BlogIndex() {
  const sorted = [...blogPosts].sort((a, b) =>
    a.date < b.date ? 1 : -1
  );

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="container py-6 md:py-8">
        <Breadcrumbs items={[{ label: "Journal" }]} />
        <header className="mt-3 max-w-2xl">
          <h1 className="font-display text-3xl md:text-5xl text-foreground">
            Journal
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mt-4">
            Stadium design, matchday culture, gift guides, design notes. One issue a month, sent when there's something to look at.
          </p>
        </header>

        <ul className="mt-12 divide-y divide-border border-y border-border">
          {sorted.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block py-6 md:py-8"
              >
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-numeric">
                  {formatPostDate(post.date)} · {post.readMinutes} min read
                </p>
                <h2 className="font-display text-2xl md:text-3xl text-foreground mt-2 group-hover:underline">
                  {post.title}
                </h2>
                <p className="text-base text-muted-foreground mt-2 max-w-2xl">
                  {post.lede}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter />
      <JsonLd
        data={[
          collectionPage({
            name: "Journal",
            description: metadata.description as string,
            url: "/blog",
            items: sorted.map((p) => ({
              name: p.title,
              href: `/blog/${p.slug}`,
            })),
          }),
          breadcrumbList([
            { name: "Home", href: "/" },
            { name: "Journal", href: "/blog" },
          ]),
        ]}
      />
    </div>
  );
}
