import type { Metadata, Viewport } from "next";
import { Anton, Inter } from "next/font/google";
import { ScrollToTop } from "@/components/ScrollToTop";
import { SITE } from "@/lib/utils";
import "./globals.css";

const display = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `Framed Football Stadium Prints — ${SITE.name}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `Framed Football Stadium Prints — ${SITE.name}`,
    description: SITE.description,
    url: SITE.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `Framed Football Stadium Prints — ${SITE.name}`,
    description: SITE.description,
  },
  alternates: { canonical: SITE.url },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
