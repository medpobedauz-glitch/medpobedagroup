import { JsonLd } from '@/components/shared/json-ld';
import { siteConfig } from '@/lib/site';
import { absoluteUrl } from '@/lib/metadata';
import { localizePath } from '@/lib/i18n/config';
import type { AppLocale } from '@/lib/i18n/config';

const navigationRoutes = [
  '/',
  '/international-patient-care',
  '/services',
  '/treatments',
  '/hospitals',
  '/doctors',
  '/patient-support',
  '/about',
  '/contact',
] as const;

/**
 * Generates a SiteNavigationElement JSON‑LD schema for Google sitelinks.
 * It lists only links that are present in the primary site navigation.
 */
export function SiteNavigationSchema({ locale }: { locale: AppLocale }) {
  const items = navigationRoutes.map((route, index) => ({
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
        '@id': `${siteConfig.siteUrl}/#website`,
        name: siteConfig.name,
        alternateName: siteConfig.legalName,
        url: siteConfig.siteUrl,
        inLanguage: locale,
        hasPart: items,
      }}
    />
  );
}
