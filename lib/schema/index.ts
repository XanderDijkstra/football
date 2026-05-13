import { SITE } from "@/lib/utils";

type JsonLd = Record<string, unknown>;

export function organization(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
  };
}

export function website(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE.url}/clubs?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export interface BreadcrumbItem {
  name: string;
  href: string;
}

export function breadcrumbList(items: BreadcrumbItem[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.href.startsWith("http") ? item.href : `${SITE.url}${item.href}`,
    })),
  };
}

export interface ProductSchemaInput {
  name: string;
  description: string;
  url: string;
  image?: string;
  brand?: string;
  sku?: string;
  priceGbp?: number;
  inStock?: boolean;
}

export function product(input: ProductSchemaInput): JsonLd {
  const base: JsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: input.name,
    description: input.description,
    url: input.url.startsWith("http") ? input.url : `${SITE.url}${input.url}`,
    brand: { "@type": "Brand", name: input.brand ?? SITE.name },
  };
  if (input.sku) base.sku = input.sku;
  if (input.image) base.image = input.image;
  if (input.priceGbp != null) {
    base.offers = {
      "@type": "Offer",
      price: input.priceGbp.toFixed(2),
      priceCurrency: "GBP",
      availability: input.inStock === false
        ? "https://schema.org/OutOfStock"
        : "https://schema.org/InStock",
      url: base.url,
    };
  }
  return base;
}

export function faqPage(items: { q: string; a: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

export interface ArticleSchemaInput {
  headline: string;
  description: string;
  datePublished: string;
  url: string;
  image?: string;
}

export function article(input: ArticleSchemaInput): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.headline,
    description: input.description,
    datePublished: input.datePublished,
    url: input.url.startsWith("http") ? input.url : `${SITE.url}${input.url}`,
    ...(input.image ? { image: input.image } : {}),
    author: { "@type": "Organization", name: SITE.name },
    publisher: { "@type": "Organization", name: SITE.name },
  };
}

export function definedTerm(input: {
  term: string;
  description: string;
  url: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: input.term,
    description: input.description,
    url: input.url.startsWith("http") ? input.url : `${SITE.url}${input.url}`,
    inDefinedTermSet: `${SITE.url}/glossary`,
  };
}

export function collectionPage(input: {
  name: string;
  description: string;
  url: string;
  items?: { name: string; href: string }[];
}): JsonLd {
  const base: JsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: input.name,
    description: input.description,
    url: input.url.startsWith("http") ? input.url : `${SITE.url}${input.url}`,
  };
  if (input.items?.length) {
    base.mainEntity = {
      "@type": "ItemList",
      itemListElement: input.items.map((it, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: it.name,
        url: it.href.startsWith("http") ? it.href : `${SITE.url}${it.href}`,
      })),
    };
  }
  return base;
}

export function place(input: {
  name: string;
  lat: number;
  lng: number;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    name: input.name,
    geo: {
      "@type": "GeoCoordinates",
      latitude: input.lat,
      longitude: input.lng,
    },
  };
}

export function renderJsonLd(...docs: JsonLd[]): string {
  return JSON.stringify(docs.length === 1 ? docs[0] : docs);
}
