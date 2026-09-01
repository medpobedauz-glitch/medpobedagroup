import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Building2, ShieldCheck, Stethoscope } from "lucide-react";

import { PremiumCtaBanner } from "@/components/marketing/premium-cta-banner";
import { PremiumPageHero } from "@/components/marketing/premium-page-hero";
import { FAQAccordion } from "@/components/shared/faq-accordion";
import { JsonLd } from "@/components/shared/json-ld";
import { Card } from "@/components/ui/card";
import { doctorSpecialtyPages, getDoctorSpecialtyPage } from "@/lib/doctor-specialty-pages";
import { getFeaturedHospital } from "@/lib/hospital-pages";
import { localizePath } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/i18n/request";
import { createMetadata } from "@/lib/metadata";
import { createPremiumVisual } from "@/lib/premium-visuals";
import { createBreadcrumbSchema, createFaqSchema, createWebPageSchema } from "@/lib/schema";
import { DoctorProfile } from "@/components/doctors/doctor-profile";
import { doctors, getDoctorBySlug } from "@/lib/data/doctors";
import { getHospitalBySlug, hospitals } from "@/lib/data/hospitals";
import { getTreatmentBySlug } from "@/lib/data/treatments";
import { absoluteUrl } from "@/lib/metadata";

type DoctorSpecialtyProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return [...doctors.map((doctor) => ({ slug: doctor.slug })), ...doctorSpecialtyPages.map((page) => ({ slug: page.slug }))];
}

export function generateMetadata({ params }: DoctorSpecialtyProps): Metadata {
  const locale = getRequestLocale();
  const page = getDoctorSpecialtyPage(params.slug);
  const doctor = getDoctorBySlug(params.slug);

  if (doctor) {
    return createMetadata({
      title: doctor.seo.title,
      description: doctor.seo.description,
      path: `/doctors/${doctor.slug}`,
      locale,
      keywords: doctor.seo.keywords,
      image: doctor.image,
      ogTitle: doctor.seo.title,
      ogDescription: doctor.seo.description,
    });
  }

  if (!page) {
    return createMetadata({
      title: "Doctor Specialty | MedPobeda Group",
      description: "Doctor specialty page for international patient treatment planning in India.",
      path: `/doctors/${params.slug}`,
      locale,
    });
  }

  return createMetadata({
    title: page.title,
    description: page.description,
    path: `/doctors/${page.slug}`,
    locale,
    keywords: page.keywords,
    ogTitle: page.title,
    ogDescription: page.description,
  });
}

export default function DoctorSpecialtyPage({ params }: DoctorSpecialtyProps) {
  const locale = getRequestLocale();
  const messages = getMessages(locale);
  const page = getDoctorSpecialtyPage(params.slug);
  const doctor = getDoctorBySlug(params.slug);

  if (doctor) {
    const hospital = getHospitalBySlug(doctor.hospitalId);
    if (!hospital) notFound();
    const doctorTreatments = doctor.treatments.map(getTreatmentBySlug).filter((item): item is NonNullable<typeof item> => Boolean(item));
    const relatedDoctors = doctors.filter((item) => item.slug !== doctor.slug && (item.hospitalId === doctor.hospitalId || item.specialization === doctor.specialization || item.procedures.some((procedure) => doctor.procedures.includes(procedure)))).slice(0, 3);
    const path = `/doctors/${doctor.slug}`;
    const personSchema = {
      "@context": "https://schema.org",
      "@type": ["Person", "Physician"],
      name: doctor.name,
      jobTitle: doctor.title,
      description: doctor.biography,
      image: absoluteUrl(doctor.image),
      url: absoluteUrl(path),
      medicalSpecialty: doctor.specialization,
      knowsLanguage: doctor.languages,
      worksFor: {
        "@type": ["Hospital", "MedicalOrganization"],
        name: hospital.name,
        url: absoluteUrl(`/hospitals/${hospital.slug}`),
      },
    };
    return (
      <>
        <JsonLd data={[
          createWebPageSchema({ name: doctor.name, description: doctor.seo.description, path, locale }),
          createBreadcrumbSchema([{ name: messages.chrome.navigation.home, path: "/" }, { name: "Doctors", path: "/doctors" }, { name: doctor.name, path }], locale),
          personSchema,
        ]} />
        <DoctorProfile doctor={doctor} hospital={hospital} treatments={doctorTreatments} relatedDoctors={relatedDoctors} allDoctors={doctors} allHospitals={hospitals} />
      </>
    );
  }

  if (!page) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={[
          createWebPageSchema({
            name: page.name,
            description: page.description,
            path: `/doctors/${page.slug}`,
            locale,
          }),
          createBreadcrumbSchema(
            [
              { name: messages.chrome.navigation.home, path: "/" },
              { name: "Doctors", path: "/doctors" },
              { name: page.name, path: `/doctors/${page.slug}` },
            ],
            locale,
          ),
          createFaqSchema(page.faq),
        ]}
      />

      <PremiumPageHero
        eyebrow="Specialist Profile"
        title={page.h1}
        description={page.overview}
        highlights={[page.name, "Doctor Matching", "Treatment in India"]}
        primaryCta={{ href: localizePath("/international-patient-care", locale), label: "Get Free Medical Opinion" }}
        secondaryCta={{ href: localizePath("/doctors", locale), label: "Explore More Specialties" }}
        images={[
          createPremiumVisual(
            "medical-tourism-hero",
            "doctor-patient-consultation",
            `${page.name} consultation planning for international patients.`,
          ),
          createPremiumVisual(
            "medical-tourism-story",
            "diagnostics-review",
            `Diagnostic review for ${page.name} treatment planning.`,
          ),
          createPremiumVisual(
            "medical-tourism-inner",
            "doctor-hospital-matching",
            `${page.name} doctor matching support in India.`,
          ),
        ]}
        stats={[
          { value: "Specialist-led", label: "doctor matching built around diagnosis and treatment fit" },
          { value: String(page.relatedHospitalSlugs.length), label: "featured hospital routes commonly linked to this specialty" },
          { value: "Pre-travel", label: "specialist planning before hospital admission and travel commitments" },
        ]}
        floatingCards={page.relatedTreatmentPaths.map((path) => path.replace("/", "").replace(/-/g, " ")).slice(0, 4)}
        accentLabel={page.name}
      />

      <section className="section-shell">
        <div className="container-wide">
          <div className="section-frame px-4 py-8 sm:px-8 lg:px-10 lg:py-12">
            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <Card className="rounded-[1.85rem] border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-semibold text-sky-700">
                  <Stethoscope className="h-4 w-4" />
                  How MedPobeda Group Supports This Specialty
                </div>
                <div className="mt-5 space-y-4">
                  {page.supportPoints.map((point) => (
                    <div key={point} className="rounded-[1.35rem] border border-slate-200/80 bg-white px-4 py-4 text-sm leading-7 text-slate-600">
                      {point}
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="rounded-[1.85rem] border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-semibold text-sky-700">
                  <ShieldCheck className="h-4 w-4" />
                  Related Treatment Pages
                </div>
                <div className="mt-5 space-y-3">
                  {page.relatedTreatmentPaths.map((path) => (
                    <Link
                      key={path}
                      href={localizePath(path, locale)}
                      className="flex items-center justify-between gap-4 rounded-[1.35rem] border border-slate-200/80 bg-white px-4 py-4 text-sm font-semibold text-slate-700 transition hover:border-sky-200 hover:text-sky-700"
                    >
                      <span>{path.replace("/", "").replace(/-/g, " ")}</span>
                      <ArrowRight className="h-4 w-4 shrink-0" />
                    </Link>
                  ))}
                </div>
              </Card>
            </div>

            <div className="mt-10">
              <p className="section-kicker">Related Hospitals</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {page.relatedHospitalSlugs
                  .map((slug) => getFeaturedHospital(slug))
                  .filter(Boolean)
                  .map((hospital) => (
                    <Link
                      key={hospital!.slug}
                      href={localizePath(`/hospitals/${hospital!.slug}`, locale)}
                      className="rounded-[1.55rem] border border-slate-200 bg-white px-5 py-5 text-sm shadow-[0_12px_28px_rgba(8,22,52,0.05)] transition hover:border-sky-200"
                    >
                      <div className="flex items-center gap-2 text-sky-700">
                        <Building2 className="h-4 w-4" />
                        <span className="font-semibold">{hospital!.name}</span>
                      </div>
                      <p className="mt-2 text-slate-600">{hospital!.city}</p>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQAccordion
        eyebrow="Specialist FAQ"
        title={`Questions about ${page.name.toLowerCase()} in India`}
        description="These answers help patients understand how specialist matching works before treatment travel and hospital selection."
        items={page.faq}
      />

      <PremiumCtaBanner
        eyebrow="Specialist Matching"
        title={`Need help finding ${page.name.toLowerCase()} in India?`}
        description="Send the medical reports and treatment question. MedPobeda Group can help identify the right specialist route and hospital pathway before travel."
        image={createPremiumVisual(
          "medical-tourism-trust",
          "care-coordination-meeting",
          `${page.name} support and treatment planning meeting.`,
        )}
        primary={{ href: localizePath("/international-patient-care", locale), label: "Get Free Medical Opinion" }}
        secondary={{ href: localizePath("/contact", locale), label: "Request Specialist Support" }}
      />
    </>
  );
}
