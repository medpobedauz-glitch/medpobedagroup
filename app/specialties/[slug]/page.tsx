import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DoctorCard } from "@/components/doctors/doctor-card";
import { HospitalCard } from "@/components/hospitals/hospital-card";
import { PremiumPageHero } from "@/components/marketing/premium-page-hero";
import { JsonLd } from "@/components/shared/json-ld";
import { doctors, specialties } from "@/lib/data/doctors";
import { hospitals } from "@/lib/data/hospitals";
import { treatments } from "@/lib/data/treatments";
import { getRequestLocale } from "@/lib/i18n/request";
import { createMetadata } from "@/lib/metadata";
import { createPremiumVisual } from "@/lib/premium-visuals";
import { createBreadcrumbSchema, createWebPageSchema } from "@/lib/schema";

type Props = { params: { slug: string } };
export function generateStaticParams() { return specialties.map(({ slug }) => ({ slug })); }
export function generateMetadata({ params }: Props): Metadata {
  const specialty = specialties.find((item) => item.slug === params.slug);
  if (!specialty) return {};
  return createMetadata({
    title: `${specialty.name} Doctors, Hospitals & Treatments in India | MedPobeda Group`,
    description: `Explore ${specialty.name} doctors, hospitals, and treatments in India with international patient coordination from MedPobeda Group.`,
    path: `/specialties/${specialty.slug}`,
    locale: getRequestLocale(),
    keywords: [`${specialty.name} India`, `${specialty.name} doctors`, `${specialty.name} hospitals`, `${specialty.name} treatment`],
  });
}

export default function SpecialtyPage({ params }: Props) {
  const specialty = specialties.find((item) => item.slug === params.slug);
  if (!specialty) notFound();
  const locale = getRequestLocale();
  const name = specialty.name.toLowerCase();
  const specialtyDoctors = doctors.filter((item) => `${item.specialization} ${item.subspecialties.join(" ")}`.toLowerCase().includes(name));
  const specialtyTreatments = treatments.filter((item) => `${item.specialty} ${item.category}`.toLowerCase().includes(name) || name.includes(item.specialty.toLowerCase())).slice(0, 12);
  const hospitalIds = new Set([...specialtyDoctors.map((item) => item.hospitalId), ...specialtyTreatments.flatMap((item) => item.suitableHospitals)]);
  const specialtyHospitals = hospitals.filter((item) => hospitalIds.has(item.slug) || item.specialties.some((value) => value.toLowerCase() === name)).slice(0, 9);
  const path = `/specialties/${specialty.slug}`;
  return (
    <>
      <JsonLd data={[
        createWebPageSchema({ name: specialty.name, description: `${specialty.name} doctors, hospitals, and treatments in India.`, path, locale, type: "CollectionPage" }),
        createBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Doctors", path: "/doctors" }, { name: specialty.name, path }], locale),
      ]} />
      <PremiumPageHero
        eyebrow="Medical Specialty"
        title={`${specialty.name} in India`}
        description={`Explore related doctors, hospitals, and treatment pathways with coordinated support for international patients.`}
        highlights={["Specialist Doctors", "Partner Hospitals", "Treatment Pathways"]}
        primaryCta={{ href: "/international-patient-care", label: "Book Free Consultation" }}
        secondaryCta={{ href: "/doctors", label: "Search Doctors" }}
        images={[
          createPremiumVisual("medical-tourism-hero", "doctor-patient-consultation", `${specialty.name} consultation in India.`),
          createPremiumVisual("specialties", "diagnostics", `${specialty.name} diagnostics.`),
          createPremiumVisual("medical-tourism-inner", "doctor-hospital-matching", `${specialty.name} doctor matching.`),
        ]}
        stats={[
          { value: `${specialtyDoctors.length}`, label: "listed doctors in this specialty" },
          { value: `${specialtyHospitals.length}`, label: "related hospital locations" },
          { value: `${specialtyTreatments.length}`, label: "related treatment pathways" },
        ]}
        floatingCards={specialtyTreatments.map((item) => item.name).slice(0, 4)}
        accentLabel={specialty.name}
      />
      <DirectorySection title="Doctors" empty="Doctor profiles for this specialty are being verified and will be added centrally."><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{specialtyDoctors.map((doctor) => <DoctorCard key={doctor.slug} doctor={doctor} />)}</div></DirectorySection>
      <DirectorySection title="Hospitals" empty="Contact MedPobeda Group for a current hospital recommendation."><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{specialtyHospitals.map((hospital) => <HospitalCard key={hospital.slug} hospital={hospital} />)}</div></DirectorySection>
      <DirectorySection title="Treatments" empty="Treatment pathways for this specialty are being prepared."><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{specialtyTreatments.map((treatment) => <a key={treatment.slug} href={`/treatments/${treatment.slug}`} className="rounded-2xl border border-[#D6E8FF] bg-white p-5 font-semibold text-[#1D4ED8]">{treatment.name}</a>)}</div></DirectorySection>
    </>
  );
}

function DirectorySection({ title, empty, children }: { title: string; empty: string; children: React.ReactNode }) {
  const hasContent = Array.isArray((children as React.ReactElement)?.props?.children) ? (children as React.ReactElement).props.children.length > 0 : true;
  return <section className="section-shell pt-0"><div className="container-wide"><span className="section-kicker">{title}</span><h2 className="mt-5 heading-section">{title} connected to this specialty</h2><div className="mt-8">{hasContent ? children : <p className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-600">{empty}</p>}</div></div></section>;
}
