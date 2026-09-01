import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { HospitalProfile } from "@/components/hospitals/hospital-profile";
import { JsonLd } from "@/components/shared/json-ld";
import { getHospitalBySlug, hospitals } from "@/lib/data/hospitals";
import { getRequestLocale } from "@/lib/i18n/request";
import { absoluteUrl, createMetadata } from "@/lib/metadata";
import { createBreadcrumbSchema, createWebPageSchema } from "@/lib/schema";

type HospitalPageProps = { params: { slug: string } };

export function generateStaticParams() {
  return hospitals.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: HospitalPageProps): Metadata {
  const hospital = getHospitalBySlug(params.slug);
  if (!hospital) return {};
  return createMetadata({
    title: hospital.seo.title,
    description: hospital.seo.description,
    path: `/hospitals/${hospital.slug}`,
    locale: getRequestLocale(),
    keywords: hospital.seo.keywords,
    image: hospital.featuredImage,
    ogTitle: hospital.seo.title,
    ogDescription: hospital.seo.description,
  });
}

export default function HospitalDetailPage({ params }: HospitalPageProps) {
  const hospital = getHospitalBySlug(params.slug);
  if (!hospital) notFound();
  const locale = getRequestLocale();
  const path = `/hospitals/${hospital.slug}`;
  const hospitalSchema = {
    "@context": "https://schema.org",
    "@type": "Hospital",
    name: hospital.name,
    description: hospital.description,
    url: absoluteUrl(path),
    image: hospital.gallery.map((image) => absoluteUrl(image)),
    address: {
      "@type": "PostalAddress",
      addressLocality: hospital.city,
      addressRegion: hospital.state,
      addressCountry: "IN",
    },
    medicalSpecialty: hospital.specialties,
  };
  return (
    <>
      <JsonLd data={[
        createWebPageSchema({ name: hospital.name, description: hospital.seo.description, path, locale }),
        createBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Hospitals", path: "/hospitals" },
          { name: hospital.name, path },
        ], locale),
        hospitalSchema,
      ]} />
      <HospitalProfile hospital={hospital} />
    </>
  );
}
