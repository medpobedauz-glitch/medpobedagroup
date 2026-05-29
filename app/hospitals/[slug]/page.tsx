import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowRight, MapPin, ShieldCheck } from "lucide-react";

import { PremiumCtaBanner } from "@/components/marketing/premium-cta-banner";
import { PremiumPageHero } from "@/components/marketing/premium-page-hero";
import { FAQAccordion } from "@/components/shared/faq-accordion";
import { JsonLd } from "@/components/shared/json-ld";
import { HospitalDetailPageContent } from "@/components/pages/hospital-detail-page";
import { Card } from "@/components/ui/card";
import { featuredHospitals, getFeaturedHospital } from "@/lib/hospital-pages";
import { localizePath } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/i18n/request";
import { createMetadata } from "@/lib/metadata";
import { createPremiumVisual } from "@/lib/premium-visuals";
import { createBreadcrumbSchema, createFaqSchema, createWebPageSchema } from "@/lib/schema";
import { getHospitalPartnerBySlug, getAllHospitalPartnerSlugs } from "@/lib/data/hospital-partner-profile";

type HospitalPageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const staticSlugs = featuredHospitals.map((hospital) => ({ slug: hospital.slug }));
  
  // Also add DB hospital partner slugs
  let dbSlugs: string[] = [];
  try {
    dbSlugs = await getAllHospitalPartnerSlugs();
  } catch {
    // DB may not be available during build
  }
  
  const allSlugs = [...staticSlugs, ...dbSlugs.map((s) => ({ slug: s }))];
  // Remove duplicates
  const seen = new Set<string>();
  return allSlugs.filter((item) => {
    const isDuplicate = seen.has(item.slug);
    seen.add(item.slug);
    return !isDuplicate;
  });
}

export async function generateMetadata({ params }: HospitalPageProps): Promise<Metadata> {
  const locale = getRequestLocale();
  
  // Try DB first
  try {
    const dbHospital = await getHospitalPartnerBySlug(params.slug);
    if (dbHospital) {
      return createMetadata({
        title: `${dbHospital.name} | Partner Hospital in India | MedPobeda Group`,
        description: dbHospital.description ?? `Comprehensive profile of ${dbHospital.name} - a trusted partner hospital in India for international patients from Central Asia.`,
        path: `/hospitals/${dbHospital.slug}`,
        locale,
        keywords: [
          dbHospital.name,
          `${dbHospital.shortName || dbHospital.name} international patients`,
          `treatment at ${dbHospital.name}`,
          "hospital India international patients",
          "medical tourism India",
          ...dbHospital.specialties,
        ],
        ogTitle: `${dbHospital.name} - Partner Hospital for Medical Treatment in India`,
        ogDescription: dbHospital.description ?? `Learn about ${dbHospital.name}, our trusted partner hospital in India.`,
      });
    }
  } catch {
    // DB not available, fall through to static
  }

  // Fall back to static
  const hospital = getFeaturedHospital(params.slug);
  if (!hospital) {
    return createMetadata({
      title: "Hospital in India | MedPobeda Group",
      description: "Hospital profile page for international patient treatment planning in India.",
      path: `/hospitals/${params.slug}`,
      locale,
    });
  }

  return createMetadata({
    title: hospital.title,
    description: hospital.description,
    path: `/hospitals/${hospital.slug}`,
    locale,
    keywords: hospital.keywords,
    ogTitle: hospital.title,
    ogDescription: hospital.description,
  });
}

export default async function HospitalDetailPage({ params }: HospitalPageProps) {
  const locale = getRequestLocale();
  const messages = getMessages(locale);
  
  // Try DB partner profile first
  try {
    const dbHospital = await getHospitalPartnerBySlug(params.slug);
    if (dbHospital) {
      return (
        <>
          <JsonLd
            data={[
              createWebPageSchema({
                name: dbHospital.name,
                description: dbHospital.description ?? `Partner hospital profile for ${dbHospital.name}.`,
                path: `/hospitals/${dbHospital.slug}`,
                locale,
              }),
              createBreadcrumbSchema(
                [
                  { name: messages.chrome.navigation.home, path: "/" },
                  { name: messages.chrome.navigation.hospitals, path: "/hospitals" },
                  { name: dbHospital.name, path: `/hospitals/${dbHospital.slug}` },
                ],
                locale,
              ),
            ]}
          />
          <HospitalDetailPageContent hospital={dbHospital} />
        </>
      );
    }
  } catch {
    // DB not available, fall through to static
  }

  // Fall back to static SEO hospital page
  const hospital = getFeaturedHospital(params.slug);
  if (!hospital) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={[
          createWebPageSchema({
            name: hospital.name,
            description: hospital.description,
            path: `/hospitals/${hospital.slug}`,
            locale,
          }),
          createBreadcrumbSchema(
            [
              { name: messages.chrome.navigation.home, path: "/" },
              { name: messages.chrome.navigation.hospitals, path: "/hospitals" },
              { name: hospital.name, path: `/hospitals/${hospital.slug}` },
            ],
            locale,
          ),
          createFaqSchema(hospital.faq),
        ]}
      />

      <PremiumPageHero
        eyebrow="Hospital Profile"
        title={hospital.h1}
        description={hospital.overview}
        highlights={[hospital.city, "International Patient Focus", hospital.specialties[0] ?? "Multispecialty"]}
        primaryCta={{ href: localizePath("/international-patient-care", locale), label: "Get Free Medical Opinion" }}
        secondaryCta={{ href: localizePath("/hospitals", locale), label: "Compare More Hospitals" }}
        images={[
          createPremiumVisual(
            "medical-tourism-hero",
            "hospital-campus",
            `${hospital.name} hospital campus for international patients in India.`,
          ),
          createPremiumVisual(
            "medical-tourism-inner",
            "doctor-hospital-matching",
            `Specialist matching support connected to ${hospital.name}.`,
          ),
          createPremiumVisual(
            "medical-tourism-trust",
            "care-coordination-meeting",
            `Patient coordination meeting for ${hospital.name} treatment planning.`,
          ),
        ]}
        stats={[
          { value: hospital.city, label: "commonly evaluated city route for treatment planning in India" },
          { value: String(hospital.specialties.length), label: "featured specialty pathways linked to this hospital profile" },
          { value: "Featured", label: "hospital profile built for trust, comparison, and SEO discovery" },
        ]}
        floatingCards={hospital.specialties.slice(0, 4)}
        accentLabel={hospital.name}
      />

      <section className="section-shell">
        <div className="container-wide">
          <div className="section-frame px-4 py-8 sm:px-8 lg:px-10 lg:py-12">
            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <Card className="rounded-[1.85rem] border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-semibold text-sky-700">
                  <MapPin className="h-4 w-4 text-emerald-600" />
                  {hospital.city}
                </div>
                <h2 className="mt-4 font-display text-3xl font-semibold text-slate-950">
                  Why patients consider {hospital.name}
                </h2>
                <p className="mt-4 text-base leading-8 text-slate-600">{hospital.trustLine}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {hospital.specialties.map((specialty) => (
                    <span key={specialty} className="glass-badge">
                      {specialty}
                    </span>
                  ))}
                </div>
              </Card>

              <Card className="rounded-[1.85rem] border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-semibold text-sky-700">
                  <ShieldCheck className="h-4 w-4" />
                  MedPobeda Group Support
                </div>
                <div className="mt-5 space-y-4">
                  {hospital.supportPoints.map((point) => (
                    <div key={point} className="rounded-[1.35rem] border border-slate-200/80 bg-white px-4 py-4 text-sm leading-7 text-slate-600">
                      {point}
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div className="mt-10">
              <p className="section-kicker">Related Treatment Pages</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {hospital.relatedTreatmentPaths.map((path) => (
                  <Link
                    key={path}
                    href={localizePath(path, locale)}
                    className="rounded-[1.55rem] border border-slate-200 bg-white px-5 py-5 text-sm font-semibold text-slate-700 shadow-[0_12px_28px_rgba(8,22,52,0.05)] transition hover:border-sky-200 hover:text-sky-700"
                  >
                    <span className="flex items-center justify-between gap-4">
                      <span>{path.replace("/", "").replace(/-/g, " ")}</span>
                      <ArrowRight className="h-4 w-4 shrink-0" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQAccordion
        eyebrow="Hospital FAQ"
        title={`Questions about ${hospital.name} and treatment planning in India`}
        description="These answers help patients compare hospital options and understand how MedPobeda Group supports hospital-focused treatment planning."
        items={hospital.faq}
      />

      <PremiumCtaBanner
        eyebrow="Hospital Planning"
        title={`Need help evaluating ${hospital.name} for treatment in India?`}
        description="Share the diagnosis and treatment goal. MedPobeda Group can help assess specialty fit, hospital route, and the next practical steps before travel."
        image={createPremiumVisual(
          "medical-tourism-cta",
          "patient-consultation-meeting",
          `Patient treatment planning discussion for ${hospital.name}.`,
        )}
        primary={{ href: localizePath("/international-patient-care", locale), label: "Get Free Medical Opinion" }}
        secondary={{ href: localizePath("/contact", locale), label: "Contact MedPobeda Group" }}
      />
    </>
  );
}