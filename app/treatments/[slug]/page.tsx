import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { TreatmentProfile } from "@/components/treatments/treatment-profile";
import { JsonLd } from "@/components/shared/json-ld";
import { hospitals } from "@/lib/data/hospitals";
import { getTreatmentBySlug, getTreatmentHospitals, treatments } from "@/lib/data/treatments";
import { getRequestLocale } from "@/lib/i18n/request";
import { absoluteUrl, createMetadata } from "@/lib/metadata";
import { createBreadcrumbSchema, createFaqSchema, createMedicalWebPageSchema } from "@/lib/schema";
import { createOrganizationSchema } from "@/lib/schema-generators";
import { doctors } from "@/lib/data/doctors";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return treatments.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const treatment = getTreatmentBySlug(params.slug);
  if (!treatment) return {};
  return createMetadata({
    title: treatment.seo.title,
    description: treatment.seo.description,
    path: `/treatments/${treatment.slug}`,
    locale: getRequestLocale(),
    keywords: treatment.seo.keywords,
    image: treatment.heroImage,
    ogTitle: treatment.seo.title,
    ogDescription: treatment.seo.description,
  });
}

export default function TreatmentPage({ params }: Props) {
  const treatment = getTreatmentBySlug(params.slug);
  if (!treatment) notFound();
  const locale = getRequestLocale();
  const path = `/treatments/${treatment.slug}`;
  const related = treatment.relatedTreatments.map(getTreatmentBySlug).filter((item): item is NonNullable<typeof item> => Boolean(item));
  const recommendedDoctors = doctors.filter((doctor) => doctor.treatments.includes(treatment.slug));
  const procedureSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: treatment.name,
    description: treatment.overview,
    procedureType: treatment.category,
    bodyLocation: treatment.organSystem,
    url: absoluteUrl(path),
    followup: treatment.recovery.join(" "),
    howPerformed: treatment.procedure.join(" "),
  };
  return (
    <>
      <JsonLd data={[
        createMedicalWebPageSchema({ name: treatment.name, description: treatment.seo.description, path, locale, medicalAudience: "Patient", areaServed: ["Uzbekistan", "Central Asia", "India"] }),
        createBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Treatments", path: "/treatments" }, { name: treatment.name, path }], locale),
        createFaqSchema(treatment.faq),
        createOrganizationSchema(),
        procedureSchema,
      ]} />
      <TreatmentProfile treatment={treatment} hospitals={getTreatmentHospitals(treatment, hospitals)} relatedTreatments={related} recommendedDoctors={recommendedDoctors} />
    </>
  );
}
