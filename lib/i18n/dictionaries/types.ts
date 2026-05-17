import type { AppLocale, LocalizedRouteKey } from "@/lib/i18n/config";

export type LocaleDictionary = {
  locale: AppLocale;
  chrome: {
    partner: string;
    explore: string;
    contact: string;
    schedule: string;
    quickLinks: string;
    healthcareFocus: string;
    contactInformation: string;
    signedIn?: string;
  };
  routes: Record<
    LocalizedRouteKey,
    {
      title: string;
      description: string;
    }
  >;
};
