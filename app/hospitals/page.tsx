import type { Metadata } from "next";

import { HospitalDirectory } from "@/components/hospitals/hospital-directory";
import { KimsNetworkSection } from "@/components/hospitals/kims-network-section";
import { PremiumCtaBanner } from "@/components/marketing/premium-cta-banner";
import { PremiumPageHero } from "@/components/marketing/premium-page-hero";
import { JsonLd } from "@/components/shared/json-ld";
import { hospitals, hospitalGroups } from "@/lib/data/hospitals";
import { getRequestLocale } from "@/lib/i18n/request";
import { createMetadata } from "@/lib/metadata";
import { createPremiumVisual } from "@/lib/premium-visuals";
import { createBreadcrumbSchema, createWebPageSchema } from "@/lib/schema";

export function generateMetadata(): Metadata {
  const locale = getRequestLocale();
  return createMetadata({
    title: "Hospitals in India for International Patients | MedPobeda Group",
    description: "Search leading hospitals in India by city, state, specialty, treatment, and hospital group, with international patient support from MedPobeda Group.",
    path: "/hospitals",
    locale,
    keywords: ["hospitals in India", "India hospital network", "international patients India", "medical tourism hospitals India"],
  });
}

export default function HospitalsPage() {
  const locale = getRequestLocale();
  return (
    <>
      <JsonLd data={[
        createWebPageSchema({
          name: "India Hospital Network",
          description: "Search MedPobeda Group's India hospital network.",
          path: "/hospitals",
          locale,
          type: "CollectionPage",
        }),
        createBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Hospitals", path: "/hospitals" }], locale),
      ]} />
      <PremiumPageHero
        eyebrow="India Hospital Network"
        title="Leading hospitals across India for international patients"
        description="Search trusted hospitals by location, specialty, treatment, and network. MedPobeda Group coordinates every step of the international patient journey."
        highlights={["Instant Hospital Search", "International Patient Support", "Specialist Treatment Access"]}
        primaryCta={{ href: "/international-patient-care", label: "Book Free Consultation" }}
        secondaryCta={{ href: "/contact", label: "Request Treatment" }}
        images={[
          createPremiumVisual("medical-tourism-hero", "hospital-campus", "Modern hospital campus in India."),
          createPremiumVisual("medical-tourism-trust", "care-coordination-meeting", "International patient care coordination."),
          createPremiumVisual("medical-tourism-inner", "doctor-hospital-matching", "Doctor and hospital matching."),
        ]}
        stats={[
          { value: `${hospitals.length}+`, label: "hospital locations in the India network" },
          { value: `${hospitalGroups.length}`, label: "leading hospital groups represented" },
          {
            value: `${new Set(
              hospitals
                .filter((hospital) => hospital.hospitalGroupSlug === "kims")
                .map((hospital) => hospital.state),
            ).size} states`,
            label: "covered by the complete KIMS branch network",
          },
        ]}
        floatingCards={["Cardiology", "Oncology", "Transplants", "Robotic Surgery"]}
        accentLabel="MedPobeda Hospital Directory"
      />
      <KimsNetworkSection hospitals={hospitals} />
      <section className="section-shell pt-0">
        <div className="container-wide">
          <HospitalDirectory hospitals={hospitals} />
        </div>
      </section>
      <PremiumCtaBanner
        eyebrow="Hospital Guidance"
        title="Need help choosing the right hospital?"
        description="Share your medical reports and treatment goals. Our coordinators will help compare hospitals and plan the next steps."
        image={createPremiumVisual("medical-tourism-cta", "patient-consultation-meeting", "Hospital consultation and treatment planning.")}
        primary={{ href: "/international-patient-care", label: "Book Free Consultation" }}
        secondary={{ href: "/contact", label: "Request Treatment" }}
      />
    </>
  );
}
