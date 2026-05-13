import { writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { stadiums } from "../data/stadiums";
import { clubs } from "../data/clubs";
import { cities } from "../data/cities";
import { products } from "../data/products";
import { glossary } from "../data/glossary";
import { blogPosts } from "../data/blogPosts";
import { SITE } from "../lib/utils";

interface Entry {
  loc: string;
  changefreq?: "daily" | "weekly" | "monthly" | "yearly";
  priority?: number;
}

const staticPages: Entry[] = [
  { loc: "/", changefreq: "weekly", priority: 1.0 },
  { loc: "/shop", changefreq: "weekly", priority: 0.9 },
  { loc: "/build", changefreq: "monthly", priority: 0.9 },
  { loc: "/stadiums", changefreq: "weekly", priority: 0.9 },
  { loc: "/clubs", changefreq: "weekly", priority: 0.8 },
  { loc: "/blog", changefreq: "weekly", priority: 0.7 },
  { loc: "/glossary", changefreq: "monthly", priority: 0.6 },
  { loc: "/about", changefreq: "yearly", priority: 0.4 },
  { loc: "/shipping", changefreq: "yearly", priority: 0.3 },
  { loc: "/returns", changefreq: "yearly", priority: 0.3 },
  { loc: "/contact", changefreq: "yearly", priority: 0.3 },
];

const stadiumEntries: Entry[] = stadiums.map((s) => ({
  loc: `/stadiums/${s.slug}`,
  changefreq: "monthly",
  priority: 0.9,
}));

const clubEntries: Entry[] = clubs.map((c) => ({
  loc: `/clubs/${c.slug}`,
  changefreq: "monthly",
  priority: 0.8,
}));

const cityEntries: Entry[] = cities.map((c) => ({
  loc: `/cities/${c.slug}`,
  changefreq: "monthly",
  priority: 0.7,
}));

const productEntries: Entry[] = products.map((p) => ({
  loc: `/products/${p.slug}`,
  changefreq: "monthly",
  priority: 0.7,
}));

const glossaryEntries: Entry[] = glossary.map((g) => ({
  loc: `/glossary/${g.slug}`,
  changefreq: "monthly",
  priority: 0.5,
}));

const blogEntries: Entry[] = blogPosts.map((p) => ({
  loc: `/blog/${p.slug}`,
  changefreq: "monthly",
  priority: 0.6,
}));

const all: Entry[] = [
  ...staticPages,
  ...stadiumEntries,
  ...clubEntries,
  ...cityEntries,
  ...productEntries,
  ...glossaryEntries,
  ...blogEntries,
];

const today = new Date().toISOString().slice(0, 10);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${all
  .map(
    (e) => `  <url>
    <loc>${SITE.url}${e.loc}</loc>
    <lastmod>${today}</lastmod>${
      e.changefreq ? `\n    <changefreq>${e.changefreq}</changefreq>` : ""
    }${e.priority != null ? `\n    <priority>${e.priority.toFixed(1)}</priority>` : ""}
  </url>`
  )
  .join("\n")}
</urlset>
`;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const outDir = resolve(__dirname, "../public");
const outPath = resolve(outDir, "sitemap.xml");
mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, xml, "utf8");

console.log("Sitemap written:", outPath);
console.log("  static:    ", staticPages.length);
console.log("  stadiums:  ", stadiumEntries.length);
console.log("  clubs:     ", clubEntries.length);
console.log("  cities:    ", cityEntries.length);
console.log("  products:  ", productEntries.length);
console.log("  glossary:  ", glossaryEntries.length);
console.log("  blog:      ", blogEntries.length);
console.log("  total:     ", all.length);
