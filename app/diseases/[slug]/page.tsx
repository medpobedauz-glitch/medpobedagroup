import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DiseaseProfile } from "@/components/diseases/disease-profile";
import { JsonLd } from "@/components/shared/json-ld";
import {
  DISEASE_LOCALES,
  diseases,
  getDiseaseBySlug,
  getLocalizedDisease,
  getRelatedDiseases,
  type DiseaseLocale,
} from "@/lib/data/diseases";
import { doctors } from "@/lib/data/doctors";
import { hospitals } from "@/lib/data/hospitals";
import { treatments } from "@/lib/data/treatments";
import { localizePath } from "@/lib/i18n/config";
import { getRequestLocale } from "@/lib/i18n/request";
import { absoluteUrl, createMetadata } from "@/lib/metadata";
import {
  createBreadcrumbSchema,
  createFaqSchema,
  createMedicalWebPageSchema,
} from "@/lib/schema";
import { createOrganizationSchema } from "@/lib/schema-generators";

type Props = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return diseases.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const sourceDisease = getDiseaseBySlug(params.slug);
  if (!sourceDisease) return {};
  const locale = getRequestLocale();
  const diseaseLocale = DISEASE_LOCALES.includes(locale as DiseaseLocale)
    ? (locale as DiseaseLocale)
    : "en";
  const disease = getLocalizedDisease(sourceDisease, diseaseLocale);
  const documentTitle = disease.seo.title.replace(
    /\s*\|\s*MedPobeda Group$/,
    "",
  );

  return createMetadata({
    title: documentTitle,
    description: disease.seo.description,
    path: `/diseases/${disease.slug}`,
    locale,
    keywords: disease.seo.keywords,
    image: disease.heroImage,
    ogTitle: disease.seo.title,
    ogDescription: disease.seo.description,
  });
}

export default function DiseasePage({ params }: Props) {
  const sourceDisease = getDiseaseBySlug(params.slug);
  if (!sourceDisease) notFound();
  const locale = getRequestLocale();
  const diseaseLocale = DISEASE_LOCALES.includes(locale as DiseaseLocale)
    ? (locale as DiseaseLocale)
    : "en";
  const disease = getLocalizedDisease(sourceDisease, diseaseLocale);
  const path = `/diseases/${disease.slug}`;
  const localizedUrl = absoluteUrl(localizePath(path, locale));
  const recommendedHospitals = disease.relatedHospitals
    .map((slug) => hospitals.find((hospital) => hospital.slug === slug))
    .filter((hospital): hospital is NonNullable<typeof hospital> =>
      Boolean(hospital),
    );
  const relatedTreatments = disease.relatedTreatments
    .map((slug) => treatments.find((treatment) => treatment.slug === slug))
    .filter((treatment): treatment is NonNullable<typeof treatment> =>
      Boolean(treatment),
    );
  const recommendedDoctors = disease.relatedDoctors
    .map((slug) => doctors.find((doctor) => doctor.slug === slug))
    .filter((doctor): doctor is NonNullable<typeof doctor> => Boolean(doctor));
  const relatedDiseases = getRelatedDiseases(sourceDisease).map((item) =>
    getLocalizedDisease(item, diseaseLocale),
  );

  const medicalConditionSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalCondition",
    "@id": `${localizedUrl}#condition`,
    name: disease.name,
    description: disease.overview,
    url: localizedUrl,
    ...(disease.symptoms.length
      ? {
          signOrSymptom: disease.symptoms.map((symptom) => ({
            "@type": "MedicalSymptom",
            name: symptom,
          })),
        }
      : {}),
    ...(disease.riskFactors.length
      ? {
          riskFactor: disease.riskFactors.map((riskFactor) => ({
            "@type": "MedicalRiskFactor",
            name: riskFactor,
          })),
        }
      : {}),
    ...(relatedTreatments.length
      ? {
          possibleTreatment: relatedTreatments.map((treatment) => ({
            "@type": "MedicalTherapy",
            name: treatment.name,
            url: absoluteUrl(
              localizePath(`/treatments/${treatment.slug}`, locale),
            ),
          })),
        }
      : {}),
  };

  return (
    <>
      <JsonLd
        data={[
          createMedicalWebPageSchema({
            name: disease.name,
            description: disease.seo.description,
            path,
            locale,
            medicalAudience: "Patient",
            areaServed: ["Uzbekistan", "Central Asia", "India"],
          }),
          createBreadcrumbSchema(
            [
              { name: "Home", path: "/" },
              { name: "Diseases", path: "/diseases" },
              { name: disease.name, path },
            ],
            locale,
          ),
          createFaqSchema(disease.faqs),
          createOrganizationSchema(),
          medicalConditionSchema,
        ]}
      />

      <DiseaseProfile
        disease={disease}
        hospitals={recommendedHospitals}
        treatments={relatedTreatments}
        doctors={recommendedDoctors}
        relatedDiseases={relatedDiseases}
      />
    </>
  );
}
