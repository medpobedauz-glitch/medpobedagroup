import { JsonLd } from '@/components/shared/json-ld';
import { siteConfig } from '@/lib/site';
import { publicRoutes } from '@/lib/site';
import { absoluteUrl } from '@/lib/metadata';
import { localizePath } from '@/lib/i18n/config';
import type { AppLocale } from '@/lib/i18n/config';

/**
 * Generates a SiteNavigationElement JSON‑LD schema for Google sitelinks.
 * It lists the main navigation links defined in `publicRoutes`.
 */
export function SiteNavigationSchema({ locale }: { locale: AppLocale }) {
  const items = publicRoutes.map((route, index) => ({
    '@type': 'SiteNavigationElement',
    position: index + 1,
    name: route === '/' ? 'Home' : route.replace(/^\//, '').replace(/-/g, ' '),
    url: absoluteUrl(localizePath(route, locale)),
  }));

  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        url: siteConfig.siteUrl,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${siteConfig.siteUrl}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
        hasPart: items,
      }}
    />
  );
}
