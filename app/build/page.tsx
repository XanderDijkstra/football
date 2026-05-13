import type { Metadata } from "next";
import { Suspense } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Builder } from "@/components/builder/Builder";
import { SITE } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Build your framed stadium print",
  description:
    "Pick a stadium, preview it in oak, black or white framing, and choose from A3, A2, A1 or 50×70 cm. Live preview before you buy.",
  alternates: { canonical: `${SITE.url}/build` },
};

export default function BuildPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="container py-6 md:py-8">
        <Breadcrumbs items={[{ label: "Build" }]} />
        <header className="mt-3 max-w-2xl">
          <h1 className="font-display text-3xl md:text-5xl text-foreground">
            Build your framed stadium print
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mt-4">
            Pick a ground, choose your frame, see it on a wall before you commit.
          </p>
        </header>

        <div className="mt-12 md:mt-16">
          <Suspense fallback={<div className="h-[600px]" />}>
            <Builder />
          </Suspense>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
