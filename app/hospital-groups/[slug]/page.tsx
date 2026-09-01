import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { HospitalCard } from "@/components/hospitals/hospital-card";
import { PremiumCtaBanner } from "@/components/marketing/premium-cta-banner";
import { PremiumPageHero } from "@/components/marketing/premium-page-hero";
import { JsonLd } from "@/components/shared/json-ld";
import { getHospitalsByGroup, hospitalGroups } from "@/lib/data/hospitals";
import { getRequestLocale } from "@/lib/i18n/request";
import { createMetadata } from "@/lib/metadata";
import { createPremiumVisual } from "@/lib/premium-visuals";
import { createBreadcrumbSchema, createWebPageSchema } from "@/lib/schema";

const publishedGroups = ["apollo", "kims", "fortis", "max", "medanta"] as const;
type Props = { params: { slug: string } };

export function generateStaticParams() {
  return publishedGroups.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const group = hospitalGroups.find((item) => item.slug === params.slug);
  if (!group || !publishedGroups.includes(params.slug as never)) return {};
  return createMetadata({
    title: `${group.name} Hospital Network in India | MedPobeda Group`,
    description: `Explore every listed ${group.name} hospital in the MedPobeda India network with international patient coordination and treatment planning.`,
    path: `/hospital-groups/${group.slug}`,
    locale: getRequestLocale(),
    keywords: [`${group.name} hospitals India`, `${group.name} international patients`, "India hospital network"],
  });
}

export default function HospitalGroupPage({ params }: Props) {
  if (!publishedGroups.includes(params.slug as never)) notFound();
  const group = hospitalGroups.find((item) => item.slug === params.slug);
  const groupHospitals = getHospitalsByGroup(params.slug);
  if (!group || groupHospitals.length === 0) notFound();
  const locale = getRequestLocale();
  const path = `/hospital-groups/${group.slug}`;
  return (
    <>
      <JsonLd data={[
        createWebPageSchema({ name: `${group.name} Hospital Network`, description: `Hospital locations in the ${group.name} network.`, path, locale, type: "CollectionPage" }),
        createBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Hospitals", path: "/hospitals" }, { name: group.name, path }], locale),
      ]} />
      <PremiumPageHero
        eyebrow="Hospital Group"
        title={`${group.name} hospital network in India`}
        description={`Explore ${groupHospitals.length} ${group.name} hospital locations and request coordinated support for specialist selection, treatment planning, visas, and travel.`}
        highlights={["International Patient Support", "Hospital Comparison", "Treatment Coordination"]}
        primaryCta={{ href: "/international-patient-care", label: "Book Free Consultation" }}
        secondaryCta={{ href: "/hospitals", label: "View All Hospitals" }}
        images={[
          createPremiumVisual("medical-tourism-hero", "hospital-campus", `${group.name} hospital network in India.`),
          createPremiumVisual("medical-tourism-inner", "doctor-hospital-matching", `${group.name} specialist matching.`),
          createPremiumVisual("medical-tourism-trust", "care-coordination-meeting", `${group.name} patient coordination.`),
        ]}
        stats={[
          { value: `${groupHospitals.length}`, label: "hospital locations listed in this network" },
          { value: `${new Set(groupHospitals.map((item) => item.state)).size}`, label: "states represented across the network" },
          { value: "Full", label: "international patient journey coordination" },
        ]}
        floatingCards={groupHospitals.flatMap((item) => item.specialties).slice(0, 4)}
        accentLabel={group.name}
      />
      <section className="section-shell pt-0">
        <div className="container-wide">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {groupHospitals.map((hospital) => <HospitalCard key={hospital.id} hospital={hospital} />)}
          </div>
        </div>
      </section>
      <PremiumCtaBanner
        eyebrow="International Patient Support"
        title={`Plan treatment with ${group.name}`}
        description="Send your reports for hospital matching, a treatment plan, travel guidance, and international patient coordination."
        image={createPremiumVisual("medical-tourism-cta", "patient-consultation-meeting", `${group.name} treatment consultation.`)}
        primary={{ href: "/international-patient-care", label: "Book Free Consultation" }}
        secondary={{ href: "/contact", label: "Request Treatment" }}
      />
    </>
  );
}
