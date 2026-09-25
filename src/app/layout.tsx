import type { Metadata, Viewport } from "next";
import { Outfit, Work_Sans } from "next/font/google";
import Script from 'next/script';

import { BootSplash, RouteProgress } from "@/components/site/page-loader";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { SmoothScroll } from "@/components/site/smooth-scroll";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/site/toaster";
import { site } from "@/content/site";

import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: {
    default: `${site.brand.name} · Express washes & hand detailing`,
    template: `%s · ${site.brand.name}`,
  },
  description: site.brand.description,
  applicationName: site.brand.name,
  keywords: [
    "car wash",
    "express car wash",
    "auto detailing",
    "ceramic coating",
    "paint correction",
    "interior deep clean",
    "fleet car wash",
  ],
  openGraph: {
    type: "website",
    title: `${site.brand.name} · Express washes & hand detailing`,
    description: site.brand.description,
    siteName: site.brand.name,
  },
  twitter: {
    card: "summary_large_image",
    title: site.brand.name,
    description: site.brand.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f0f9ff" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
};

/**
 * Runs before first paint. If this browser has not seen the boot splash yet,
 * flag <html> so the overlay is painted on the very first frame; otherwise the
 * class is never added and returning visitors skip the splash entirely.
 *
 * The trailing timeout is a safety net: if hydration somehow never completes,
 * the overlay releases itself rather than trapping the visitor.
 */
const BOOT_SCRIPT = `(function(){try{if(!sessionStorage.getItem('jdw:booted')){document.documentElement.classList.add('is-booting');setTimeout(function(){document.documentElement.classList.remove('is-booting')},6000)}}catch(e){}})();`;

function structuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoWash",
    name: site.brand.name,
    description: site.brand.description,
    telephone: site.contact.phone,
    foundingDate: String(site.brand.founded),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.contact.address.line1,
      addressLocality: site.contact.address.city,
      addressRegion: site.contact.address.region,
      postalCode: site.contact.address.postal,
    },
    openingHours: site.contact.hours.map(
      (entry) => `${entry.days} ${entry.time}`,
    ),
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${outfit.variable} ${workSans.variable} h-full`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
        <noscript>
          {/* Without JS the splash can never dismiss itself, so hide it. */}
          <style>{`.boot-overlay{display:none !important}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-full flex-col antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <a
            href="#main"
            className="sr-only rounded-[var(--radius-sm)] bg-accent px-4 py-2 font-semibold text-accent-contrast focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[120]"
          >
            Skip to content
          </a>

          <SmoothScroll />
          <BootSplash />
          <RouteProgress />
          <SiteHeader />

          <main id="main" className="flex-1">
            {children}
          </main>

          <SiteFooter />
          <Toaster />
        </ThemeProvider>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData()) }}
        />
        <Script src="https://scoutvero.awais.cc/t.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
