import { PremiumHomePage } from "@/components/marketing/premium-homepage";
import { HomepageEnhancements } from "@/components/marketing/homepage-enhancements";
import { JsonLd } from "@/components/shared/json-ld";
import { env } from "@/lib/env";
import { getMessages } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/i18n/request";
import { createMetadata } from "@/lib/metadata";
import { createFaqSchema, createHomePageSchemaGraph } from "@/lib/schema";
import {
  getTrustStats,
  getFeaturedHospitalPartners,
  getFeaturedSuccessStories,
  getTeamMembers,
  getAccreditations,
} from "@/lib/data/site-content";

export function generateMetadata() {
  const locale = getRequestLocale();
  const messages = getMessages(locale);
  const metadata = createMetadata({
    title: messages.routes.home.title,
    description: messages.routes.home.description,
    path: "/",
    locale,
    keywords: messages.routes.home.keywords,
    ogTitle: messages.routes.home.openGraphTitle,
    ogDescription: messages.routes.home.openGraphDescription,
  });

  return {
    ...metadata,
    title: {
      absolute: messages.site.defaultTitle,
    },
    openGraph: {
      ...metadata.openGraph,
      title: messages.site.defaultTitle,
      description: messages.routes.home.description,
    },
    twitter: {
      ...metadata.twitter,
      title: messages.site.defaultTitle,
      description: messages.routes.home.description,
    },
  };
}

type HomePageProps = {
  searchParams?: {
    submitted?: string;
    error?: string;
  };
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const locale = getRequestLocale();
  const messages = getMessages(locale);
  const navigationItems = [
    { name: messages.chrome.navigation.medicalTourism, path: "/international-patient-care" },
    { name: messages.pages.home.brandHub.items[1].title, path: "/treatment-in-india" },
    { name: messages.pages.home.brandHub.items[2].title, path: "/kims-hospitals-india" },
    { name: messages.pages.home.brandHub.items[3].title, path: "/hospital-partnerships" },
    { name: messages.pages.home.brandHub.items[4].title, path: "/international-patients" },
    { name: messages.pages.home.brandHub.items[5].title, path: "/contact" },
    { name: messages.pages.home.brandHub.items[6].title, path: "/others" },
  ];
  const homeSchema = createHomePageSchemaGraph({
    locale,
    name: messages.pages.home.schemaName,
    description: messages.pages.home.schemaDescription,
    tagline: messages.site.tagline,
    location: messages.site.location,
    navigationItems,
  });

  // Fetch data for enhanced sections
  const [trustStats, hospitalPartners, successStories, teamMembers, accreditations] =
    await Promise.all([
      getTrustStats().catch(() => []),
      getFeaturedHospitalPartners().catch(() => []),
      getFeaturedSuccessStories().catch(() => []),
      getTeamMembers().catch(() => []),
      getAccreditations().catch(() => []),
    ]);

  return (
    <>
      <JsonLd data={[homeSchema, createFaqSchema(messages.pages.home.brandFaq.items)]} />
      <PremiumHomePage
        honeypotField={env.SPAM_HONEYPOT_FIELD}
        submittedType={searchParams?.submitted}
        hasError={searchParams?.error === "validation"}
      />
      <HomepageEnhancements
        trustStats={trustStats}
        hospitalPartners={hospitalPartners}
        successStories={successStories}
        teamMembers={teamMembers}
        accreditations={accreditations}
      />
    </>
  );
}