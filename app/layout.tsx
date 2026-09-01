import type { ReactNode } from "react";
import { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import "@/app/globals.css";

import { absoluteUrl, defaultKeywords } from "@/lib/metadata";
import { getPlatformSettings } from "@/lib/data/settings";
import { media } from "@/lib/media";
import { resolveSeoImage } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { I18nProvider, getMessages } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/i18n/request";
import { createOrganizationSchema } from "@/lib/schema";
import { SiteNavigationSchema } from "@/components/shared/site-navigation-schema";
import { AnalyticsTracker } from "@/components/shared/analytics-tracker";
import FreeConsultationPopup from "@/components/common/FreeConsultationPopup";
import { FloatingButtons } from "@/components/shared/floating-buttons";
import { InquiryConcierge } from "@/components/shared/inquiry-concierge";
import { StickyMobileContactBar } from "@/components/shared/sticky-mobile-contact-bar";
import { SiteSearchPalette } from "@/components/common/SiteSearchPalette";
import CentralAsiaPatientsSection from "@/components/sections/CentralAsiaPatientsSection";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  preload: true,
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getPlatformSettings();
  const messages = getMessages(getRequestLocale());
  const title = settings.seoDefaultTitle || messages.site.defaultTitle;
  const description = settings.seoDefaultDescription || messages.site.description;
  const siteUrl = settings.siteUrl || siteConfig.siteUrl;
  const localizedKeywords =
    messages.site.seoKeywords?.length ? messages.site.seoKeywords : settings.seoKeywords;
  const openGraphTitle = messages.routes.home.openGraphTitle || title;
  const openGraphDescription =
    messages.routes.home.openGraphDescription || description;
  const defaultSeoImage = resolveSeoImage("/", settings.ogImage || media.brand.openGraph.src);

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s | ${settings.brandName || siteConfig.name}`,
    },
      description,
      keywords: [...defaultKeywords, ...localizedKeywords],
      authors: [{ name: settings.brandName || siteConfig.name }],
      creator: settings.brandName || siteConfig.name,
      publisher: settings.brandName || siteConfig.name,
      applicationName: settings.brandName || siteConfig.name,
      // IMPORTANT: page-level metadata should set canonical + hreflang per-route.
      // Keeping a fixed canonical here can cause locale/canonical conflicts.
      manifest: "/manifest.webmanifest",

    verification: {
      google: "cnane2mjoJ062ZlXCGD8KaB7Y6tLzdutA92GvMVR1es",
    },
    openGraph: {
      title: openGraphTitle,
      description: openGraphDescription,
      type: "website",
      url: siteUrl,
      siteName: settings.brandName || siteConfig.name,
      locale: "en_US",
      images: [
        {
          url: absoluteUrl(defaultSeoImage.src, siteUrl),
          width: 1200,
          height: 630,
          alt: defaultSeoImage.alt || messages.site.socialPreviewAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: openGraphTitle,
      description: openGraphDescription,
      images: [absoluteUrl(defaultSeoImage.src, siteUrl)],
      creator: settings.twitterHandle || undefined,
    },
    icons: {
      icon: [{ url: "/icon", type: "image/png" }],
      apple: [{ url: "/apple-icon", type: "image/png" }],
      shortcut: ["/icon"],
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#F8FBFF",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const locale = getRequestLocale();
  const messages = getMessages(locale);
  const organizationSchema = createOrganizationSchema({
    name: messages.site.name,
    description: messages.site.description,
    tagline: messages.site.tagline,
    location: messages.site.location,
  });

  return (
    <html lang={locale} className={inter.variable}>
      <head>{/* Canonical + hreflang are emitted by page-level metadata (generateMetadata). */}</head>

      <body className="overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {/* Site navigation schema for Google sitelinks */}
        <SiteNavigationSchema locale={locale} />
        <I18nProvider locale={locale} messages={messages}>
          <Suspense fallback={null}>
            <AnalyticsTracker />
          </Suspense>
          <div className="relative flex min-h-screen flex-col pb-24 md:pb-0">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(191,219,254,0.08)_100%)]" />
            <SiteHeader />
            <main className="relative flex-1">{children}</main>
            <FreeConsultationPopup />
            <InquiryConcierge />
            <FloatingButtons />
            <StickyMobileContactBar />
            <div className="fixed bottom-20 left-4 z-40 sm:bottom-6 sm:left-6">
              <SiteSearchPalette />
            </div>
            <CentralAsiaPatientsSection />
            <SiteFooter />
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}
