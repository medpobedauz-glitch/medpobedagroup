import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, FileSearch, Hospital, ShieldCheck, Stethoscope } from "lucide-react";

import { PremiumCtaBanner } from "@/components/marketing/premium-cta-banner";
import { PremiumPageHero } from "@/components/marketing/premium-page-hero";
import { FAQAccordion } from "@/components/shared/faq-accordion";
import { JsonLd } from "@/components/shared/json-ld";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { doctorSpecialtyPages } from "@/lib/doctor-specialty-pages";
import { localizePath } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/i18n/request";
import { createMetadata } from "@/lib/metadata";
import { createPremiumVisual } from "@/lib/premium-visuals";
import { createBreadcrumbSchema, createFaqSchema, createWebPageSchema } from "@/lib/schema";

const hubFaq = [
  {
    question: "How does MedPobeda Group help patients find the right doctor in India?",
    answer:
      "We help patients define the treatment need, organize reports, and compare relevant doctor specialties and hospital pathways before treatment travel begins.",
  },
  {
    question: "Does doctor matching only apply to one hospital?",
    answer:
      "No. Doctor matching can span several hospitals in India so the patient can compare specialists, branches, and treatment fit before choosing a route.",
  },
  {
    question: "Can patients request a second medical opinion before traveling?",
    answer:
      "Yes. Second-opinion routing is often an important first step before a family commits to treatment travel or hospital admission in India.",
  },
] as const;

export function generateMetadata(): Metadata {
  const locale = getRequestLocale();

  return createMetadata({
    title: "Doctors in India for International Patients | MedPobeda Group",
    description:
      "Explore doctor specialties in India for patients from Uzbekistan and Central Asia with specialist matching, second-opinion support, and hospital coordination.",
    path: "/doctors",
    locale,
    keywords: [
      "doctors in India",
      "specialist doctors India for international patients",
      "doctor matching India",
      "Uzbek patients in India doctors",
      "medical tourism doctor support India",
    ],
    ogTitle: "Doctors in India for International Patients",
    ogDescription:
      "Find specialist doctors in India for oncology, cardiology, nephrology, fertility, and neurosurgery treatment planning.",
  });
}

export default function DoctorsPage() {
  const locale = getRequestLocale();
  const messages = getMessages(locale);

  return (
    <>
      <JsonLd
        data={[
          createWebPageSchema({
            name: "Doctors in India for International Patients",
            description:
              "Specialist matching and doctor coordination support for patients from Uzbekistan and Central Asia planning treatment in India.",
            path: "/doctors",
            locale,
            type: "CollectionPage",
          }),
          createBreadcrumbSchema(
            [
              { name: messages.chrome.navigation.home, path: "/" },
              { name: "Doctors", path: "/doctors" },
            ],
            locale,
          ),
          createFaqSchema([...hubFaq]),
        ]}
      />

      <PremiumPageHero
        eyebrow="Doctor Matching"
        title="Find the right specialists in India before treatment planning begins"
        description="MedPobeda Group helps patients from Uzbekistan and Central Asia shortlist specialist doctors, compare hospital pathways, and prepare clearer medical inquiries before traveling to India."
        highlights={[
          "Specialist Doctor Matching",
          "Second Medical Opinion Support",
          "Hospital Comparison Guidance",
        ]}
        primaryCta={{ href: localizePath("/international-patient-care", locale), label: "Get Free Medical Opinion" }}
        secondaryCta={{ href: localizePath("/contact", locale), label: "Request Specialist Support" }}
        images={[
          createPremiumVisual(
            "medical-tourism-hero",
            "doctor-patient-consultation",
            "Doctor consulting an international patient about treatment planning.",
          ),
          createPremiumVisual(
            "medical-tourism-inner",
            "doctor-hospital-matching",
            "Specialist doctor and hospital matching for international patients.",
          ),
          createPremiumVisual(
            "medical-tourism-story",
            "diagnostics-review",
            "Diagnostic review for specialist selection and second opinions.",
          ),
        ]}
        stats={[
          { value: "5", label: "specialty clusters built as scalable SEO and referral hubs" },
          { value: "Pre-travel", label: "doctor selection before treatment, admission, and travel commitments" },
          { value: "Cross-hospital", label: "comparison support across leading hospitals in India" },
        ]}
        floatingCards={["Cardiology", "Oncology", "Nephrology", "Neurosurgery"]}
        accentLabel="India Specialist Network"
      />

      <section className="section-shell">
        <div className="container-wide">
          <div className="section-frame px-4 py-8 sm:px-8 lg:px-10 lg:py-12">
            <div className="max-w-3xl">
              <p className="section-kicker">Doctor Specialty Pages</p>
              <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-4xl">
                Specialty-led landing pages built for better doctor discovery and Google sitelinks
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-600">
                Each page helps patients understand the specialist type, treatment links, and
                hospital routes related to their medical concern.
              </p>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
              {doctorSpecialtyPages.map((specialty) => (
                <Card key={specialty.slug} className="rounded-[1.85rem] border border-slate-200 p-6 shadow-sm">
                  <div className="flex items-center gap-3 text-sm font-semibold text-sky-700">
                    <Stethoscope className="h-4 w-4" />
                    Doctor Specialty
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-semibold text-slate-950">
                    {specialty.name}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{specialty.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {specialty.relatedTreatmentPaths.slice(0, 2).map((path) => (
                      <span key={path} className="glass-badge">
                        {path.replace("/", "").replace(/-/g, " ")}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-col gap-3">
                    <Button asChild variant="primary" className="justify-center">
                      <Link href={localizePath(`/doctors/${specialty.slug}`, locale)}>
                        Explore Specialty Page
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="surface" className="justify-center">
                      <Link href={localizePath("/hospitals", locale)}>View Related Hospitals</Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell-compact">
        <div className="container-wide">
          <div className="section-frame-soft px-4 py-8 sm:px-8 lg:px-10 lg:py-10">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  title: "Diagnosis Review",
                  description: "Clarify what specialty should review the case first.",
                  icon: FileSearch,
                },
                {
                  title: "Specialist Matching",
                  description: "Shortlist the right doctors and hospital pathways in India.",
                  icon: Stethoscope,
                },
                {
                  title: "Hospital Fit",
                  description: "Compare doctor availability with hospital branch strengths.",
                  icon: Hospital,
                },
                {
                  title: "Safer Decisions",
                  description: "Improve treatment planning before travel commitments are made.",
                  icon: ShieldCheck,
                },
              ].map(({ title, description, icon: Icon }) => (
                <Card key={title} className="rounded-[1.75rem] border border-slate-200 p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 text-sky-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-slate-950">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FAQAccordion
        eyebrow="Doctor Matching FAQ"
        title="Questions patients ask before choosing specialists in India"
        description="These answers help clarify specialist matching, second opinions, and how doctor-selection support works before medical travel."
        items={[...hubFaq]}
      />

      <PremiumCtaBanner
        eyebrow="Specialist Support"
        title="Need help matching the right doctor with the right hospital?"
        description="Share your diagnosis or medical reports. MedPobeda Group can help identify the right specialty route and prepare the next step for treatment planning in India."
        image={createPremiumVisual(
          "medical-tourism-trust",
          "care-coordination-meeting",
          "Care coordination meeting focused on specialist selection and hospital planning.",
        )}
        primary={{ href: localizePath("/international-patient-care", locale), label: "Get Free Medical Opinion" }}
        secondary={{ href: localizePath("/contact", locale), label: "Request Doctor Support" }}
      />
    </>
  );
}
