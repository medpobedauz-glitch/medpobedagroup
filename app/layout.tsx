import type { ReactNode } from "react";
import { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import { Public_Sans } from "next/font/google";

import "@/app/globals.css";

import { absoluteUrl, defaultKeywords } from "@/lib/metadata";
import { getPlatformSettings } from "@/lib/data/settings";
import { siteConfig } from "@/lib/site";
import { I18nProvider, getMessages } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/i18n/request";
import { organizationSchema } from "@/lib/schema";
import { AnalyticsTracker } from "@/components/shared/analytics-tracker";
import { FloatingButtons } from "@/components/shared/floating-buttons";
import { InquiryConcierge } from "@/components/shared/inquiry-concierge";
import { StickyMobileContactBar } from "@/components/shared/sticky-mobile-contact-bar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getPlatformSettings();
  const title =
    settings.seoDefaultTitle ||
    "MedPobeda Group | Medical Tourism & Healthcare Partnerships";
  const description = settings.seoDefaultDescription || siteConfig.description;
  const siteUrl = settings.siteUrl || siteConfig.siteUrl;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s | ${settings.brandName || siteConfig.name}`,
    },
    description,
    keywords: [...defaultKeywords, ...settings.seoKeywords],
    authors: [{ name: settings.brandName || siteConfig.name }],
    creator: settings.brandName || siteConfig.name,
    publisher: settings.brandName || siteConfig.name,
    applicationName: settings.brandName || siteConfig.name,
    alternates: {
      canonical: siteUrl,
    },
    openGraph: {
      title: settings.brandName || siteConfig.name,
      description,
      type: "website",
      url: siteUrl,
      siteName: settings.brandName || siteConfig.name,
      locale: "en_US",
      images: [
        {
          url: absoluteUrl(settings.ogImage || "/opengraph-image", siteUrl),
          width: 1200,
          height: 630,
          alt: `${settings.brandName || siteConfig.name} social preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: settings.brandName || siteConfig.name,
      description,
      images: [absoluteUrl(settings.ogImage || "/opengraph-image", siteUrl)],
      creator: settings.twitterHandle || undefined,
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

  return (
    <html lang={locale} className={publicSans.variable}>
      <body className="overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <I18nProvider locale={locale} messages={messages}>
          <Suspense fallback={null}>
            <AnalyticsTracker />
          </Suspense>
          <div className="relative flex min-h-screen flex-col">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(191,219,254,0.08)_100%)]" />
            <SiteHeader />
            <main className="relative flex-1">{children}</main>
            <InquiryConcierge />
            <FloatingButtons />
            <StickyMobileContactBar />
            <SiteFooter />
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}
