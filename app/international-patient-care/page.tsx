import {
  ClipboardList,
  FileSearch,
  Globe2,
  HeartHandshake,
  Hospital,
  Languages,
  MapPin,
  Plane,
  ShieldCheck,
  Stethoscope,
  UserRound,
} from "lucide-react";

import { FAQAccordion } from "@/components/shared/faq-accordion";
import { JsonLd } from "@/components/shared/json-ld";
import { PatientSuccessStories } from "@/components/sections/patient-success-stories";
import { AuthorityLinksSection } from "@/components/marketing/authority-links-section";
import { LocationLinksSection } from "@/components/marketing/location-links-section";
import { PremiumCtaBanner } from "@/components/marketing/premium-cta-banner";
import {
  PremiumFeatureCardsSection,
  type PremiumFeatureCardItem,
} from "@/components/marketing/premium-feature-cards-section";
import { PremiumImageStorySection } from "@/components/marketing/premium-image-story-section";
import { PremiumPageHero } from "@/components/marketing/premium-page-hero";
import { RouteAwareMedicalTourismForm } from "@/components/marketing/route-aware-medical-tourism-form";
import { PremiumSplitTrustSection } from "@/components/marketing/premium-split-trust-section";
import { PremiumStepsSection } from "@/components/marketing/premium-steps-section";
import { SectionHeader } from "@/components/marketing/section-header";
import { env } from "@/lib/env";
import { getMessages } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/i18n/request";
import {
  createInternationalPatientCareMetadata,
  INTERNATIONAL_PATIENT_CARE_PATH,
  INTERNATIONAL_PATIENT_CARE_REPORTS_URL,
  internationalPatientCareContent,
} from "@/lib/international-patient-care";
import { locationPageIdsForMedicalTourismHub } from "@/lib/location-pages";
import { authorityPageIdsForMedicalTourismHub } from "@/lib/authority-pages";
import { createPremiumVisual } from "@/lib/premium-visuals";
import { createPatientVideoSchema, homepagePatientVideo } from "@/lib/data/patient-videos";
import {
  createBreadcrumbSchema,
  createServiceSchema,
  createWebPageSchema,
} from "@/lib/schema";

export function generateMetadata() {
  return createInternationalPatientCareMetadata(getRequestLocale());
}

type InternationalPatientCarePageProps = {
  searchParams?: {
    submitted?: string;
    error?: string;
  };
};

export default function InternationalPatientCarePage({
  searchParams,
}: InternationalPatientCarePageProps) {
  const locale = getRequestLocale();
  const messages = getMessages(locale);
  const page = internationalPatientCareContent;
  const serviceItems: PremiumFeatureCardItem[] = page.scope.items.map((item, index) => ({
    ...item,
    icon:
      [
        FileSearch,
        Stethoscope,
        ClipboardList,
        ShieldCheck,
        Plane,
        Languages,
        MapPin,
        Hospital,
        HeartHandshake,
      ][index] ?? FileSearch,
  }));

  return (
    <>
      <JsonLd
        data={[
          createWebPageSchema({
            name: page.schemaName,
            description: page.schemaDescription,
            path: INTERNATIONAL_PATIENT_CARE_PATH,
            locale,
          }),
          createServiceSchema({
            name: page.serviceSchemaName,
            description: page.serviceSchemaDescription,
            path: INTERNATIONAL_PATIENT_CARE_PATH,
            locale,
          }),
          createBreadcrumbSchema(
            [
              { name: messages.chrome.navigation.home, path: "/" },
              {
                name: messages.chrome.navigation.medicalTourism,
                path: INTERNATIONAL_PATIENT_CARE_PATH,
              },
            ],
            locale,
          ),
          createPatientVideoSchema(homepagePatientVideo),
        ]}
      />

      <PremiumPageHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        description={page.hero.description}
        highlights={page.hero.highlights}
        primaryCta={{
          href: "#international-patient-care-inquiry",
          label: page.hero.primaryCta,
        }}
        secondaryCta={{
          href: INTERNATIONAL_PATIENT_CARE_REPORTS_URL,
          label: page.hero.secondaryCta,
        }}
        images={[
          createPremiumVisual(
            "medical-tourism-hero",
            "doctor-patient-consultation",
            page.hero.imageAlts[0],
          ),
          createPremiumVisual(
            "medical-tourism-hero",
            "hospital-campus",
            page.hero.imageAlts[1],
          ),
          createPremiumVisual(
            "medical-tourism-hero",
            "airport-patient-support",
            page.hero.imageAlts[2],
          ),
        ]}
        stats={page.hero.stats}
        floatingCards={page.hero.floatingCards}
        accentLabel={page.hero.accentLabel}
      />

      <PremiumImageStorySection
        eyebrow={page.story.eyebrow}
        title={page.story.title}
        description={page.story.description}
        body={page.story.body}
        badges={page.story.badges}
        images={[
          createPremiumVisual(
            "medical-tourism-story",
            "premium-hospital-lobby",
            page.story.imageAlts[0],
          ),
          createPremiumVisual(
            "medical-tourism-story",
            "coordinator-patient-family",
            page.story.imageAlts[1],
          ),
          createPremiumVisual(
            "medical-tourism-story",
            "diagnostics-review",
            page.story.imageAlts[2],
          ),
          createPremiumVisual(
            "medical-tourism-story",
            "recovery-support",
            page.story.imageAlts[3],
          ),
        ]}
      />

      <PatientSuccessStories
        stories={[]}
        featuredVideo={homepagePatientVideo}
        eyebrow="Patient Video Review"
        title="A treatment journey from Uzbekistan to India"
        description="Watch a published MedPobeda Group patient review about travelling from Uzbekistan to India for medical treatment."
      />

      <PremiumFeatureCardsSection
        eyebrow={page.scope.eyebrow}
        title={page.scope.title}
        description={page.scope.description}
        items={serviceItems}
        columns={3}
      />

      <PremiumSplitTrustSection
        eyebrow={page.trust.eyebrow}
        title={page.trust.title}
        description={page.trust.description}
        image={createPremiumVisual(
          "medical-tourism-trust",
          "care-coordination-meeting",
          page.trust.imageAlt,
        )}
        items={page.trust.items.map((item, index) => ({
          ...item,
          icon: [ShieldCheck, Hospital, Globe2, HeartHandshake][index] ?? ShieldCheck,
        }))}
        stats={page.trust.stats}
      />

      <PremiumStepsSection
        eyebrow={page.journey.eyebrow}
        title={page.journey.title}
        description={page.journey.description}
        items={page.journey.items.map((item, index) => ({
          ...item,
          icon:
            [
              UserRound,
              FileSearch,
              Stethoscope,
              ClipboardList,
              Plane,
              MapPin,
              Hospital,
              HeartHandshake,
            ][index] ?? UserRound,
        }))}
      />

      <LocationLinksSection
        eyebrow={page.locationLinks.eyebrow}
        title={page.locationLinks.title}
        description={page.locationLinks.description}
        pageIds={locationPageIdsForMedicalTourismHub}
        columns={3}
      />

      <AuthorityLinksSection
        eyebrow={page.authorityLinks.eyebrow}
        title={page.authorityLinks.title}
        description={page.authorityLinks.description}
        pageIds={authorityPageIdsForMedicalTourismHub}
        columns={4}
      />

      <section id="international-patient-care-inquiry" className="section-shell">
        <div className="container-wide">
          <SectionHeader
            eyebrow={page.inquiry.eyebrow}
            title={page.inquiry.title}
            description={page.inquiry.description}
            align="center"
          />
          <div className="mt-12">
            <RouteAwareMedicalTourismForm
              honeypotField={env.SPAM_HONEYPOT_FIELD}
              submitted={searchParams?.submitted === "1"}
              hasError={searchParams?.error === "validation"}
            />
          </div>
        </div>
      </section>

      <FAQAccordion
        eyebrow={page.faq.eyebrow}
        title={page.faq.title}
        description={page.faq.description}
        items={page.faq.items}
      />

      <PremiumCtaBanner
        eyebrow={page.cta.eyebrow}
        title={page.cta.title}
        description={page.cta.description}
        image={createPremiumVisual(
          "medical-tourism-cta",
          "patient-consultation-meeting",
          page.cta.imageAlt,
        )}
        primary={{ href: "#international-patient-care-inquiry", label: page.cta.primary }}
        secondary={{ href: INTERNATIONAL_PATIENT_CARE_REPORTS_URL, label: page.cta.secondary }}
      />
    </>
  );
}
