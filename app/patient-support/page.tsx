import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, FileText, Languages, Plane, ShieldCheck } from "lucide-react";

import { PremiumCtaBanner } from "@/components/marketing/premium-cta-banner";
import { PremiumPageHero } from "@/components/marketing/premium-page-hero";
import { FAQAccordion } from "@/components/shared/faq-accordion";
import { JsonLd } from "@/components/shared/json-ld";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { localizePath } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/i18n/request";
import { createMetadata } from "@/lib/metadata";
import { patientSupportPages } from "@/lib/patient-support-pages";
import { createPremiumVisual } from "@/lib/premium-visuals";
import { createBreadcrumbSchema, createFaqSchema, createWebPageSchema } from "@/lib/schema";

const hubFaq = [
  {
    question: "What does patient support include for treatment in India?",
    answer:
      "Patient support can include medical-report routing, hospital communication, visa readiness guidance, travel planning, interpreter support, hospital admission assistance, and follow-up communication after treatment.",
  },
  {
    question: "Is patient support only for patients from Uzbekistan?",
    answer:
      "The primary focus is patients from Uzbekistan and Central Asia, but the same international patient support model can be useful for other cross-border treatment journeys into India.",
  },
  {
    question: "Can patient support continue after treatment is completed?",
    answer:
      "Yes. Post-treatment support is important for reports, follow-up coordination, and practical next steps after discharge and return travel.",
  },
] as const;

export function generateMetadata(): Metadata {
  const locale = getRequestLocale();

  return createMetadata({
    title: "Patient Support Services | Treatment in India from Uzbekistan",
    description:
      "Explore patient support services for treatment in India, including visa assistance, travel planning, hospital admission guidance, translation support, and follow-up care.",
    path: "/patient-support",
    locale,
    keywords: [
      "patient support services",
      "treatment in India from Uzbekistan",
      "medical tourism support India",
      "international patient assistance",
      "Uzbek patients in India support",
    ],
    ogTitle: "Patient Support Services for Treatment in India",
    ogDescription:
      "Medical visa, travel, admission, interpreter, and post-treatment support for patients traveling from Uzbekistan and Central Asia to India.",
  });
}

export default function PatientSupportPage() {
  const locale = getRequestLocale();
  const messages = getMessages(locale);

  return (
    <>
      <JsonLd
        data={[
          createWebPageSchema({
            name: "Patient Support Services",
            description:
              "Patient support services for treatment in India, including travel, visa, interpreter, admission, and follow-up coordination.",
            path: "/patient-support",
            locale,
            type: "CollectionPage",
          }),
          createBreadcrumbSchema(
            [
              { name: messages.chrome.navigation.home, path: "/" },
              { name: "Patient Support", path: "/patient-support" },
            ],
            locale,
          ),
          createFaqSchema([...hubFaq]),
        ]}
      />

      <PremiumPageHero
        eyebrow="Patient Support"
        title="Complete support for international patients traveling to India for treatment"
        description="MedPobeda Group helps patients and families from Uzbekistan and Central Asia manage visa guidance, travel readiness, admission preparation, interpreter support, and post-treatment follow-up."
        highlights={[
          "Medical Visa Guidance",
          "Travel & Admission Support",
          "Interpreter & Follow-up Coordination",
        ]}
        primaryCta={{ href: localizePath("/international-patient-care", locale), label: "Get Free Medical Opinion" }}
        secondaryCta={{ href: localizePath("/contact", locale), label: "Talk to Our Team" }}
        images={[
          createPremiumVisual(
            "medical-tourism-story",
            "coordinator-patient-family",
            "Care coordinator guiding an international patient family.",
          ),
          createPremiumVisual(
            "medical-tourism-inner",
            "visa-travel-guidance",
            "Travel and visa preparation support for treatment in India.",
          ),
          createPremiumVisual(
            "medical-tourism-story",
            "recovery-support",
            "Post-treatment support for a patient after hospital care.",
          ),
        ]}
        stats={[
          { value: "5", label: "support lanes for pre-travel, hospital, and post-treatment needs" },
          { value: "End-to-end", label: "support from reports and visa readiness to discharge follow-up" },
          { value: "Patient-first", label: "communication built for families navigating treatment abroad" },
        ]}
        floatingCards={["Visa Readiness", "Travel Support", "Admission Help", "Follow-up Care"]}
        accentLabel="India Patient Journey"
      />

      <section className="section-shell">
        <div className="container-wide">
          <div className="section-frame px-4 py-8 sm:px-8 lg:px-10 lg:py-12">
            <div className="max-w-3xl">
              <p className="section-kicker">Support Lanes</p>
              <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-4xl">
                Patient support pages designed to strengthen Google sitelinks and real user trust
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-600">
                These subpages make the patient journey easier to understand for search engines,
                patients, and families planning treatment in India.
              </p>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
              {patientSupportPages.map((page) => (
                <Card key={page.slug} className="rounded-[1.85rem] border border-slate-200 p-6 shadow-sm">
                  <h3 className="font-display text-2xl font-semibold text-slate-950">{page.name}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{page.description}</p>
                  <div className="mt-6 flex flex-col gap-3">
                    <Button asChild variant="primary" className="justify-center">
                      <Link href={localizePath(`/patient-support/${page.slug}`, locale)}>
                        Explore Support Page
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="surface" className="justify-center">
                      <Link href={localizePath("/contact", locale)}>Contact Support Desk</Link>
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
                  title: "Reports & Opinions",
                  description: "Organize documents before medical opinion and hospital review begin.",
                  icon: FileText,
                },
                {
                  title: "Travel & Visa",
                  description: "Prepare documentation and sequencing for treatment travel to India.",
                  icon: Plane,
                },
                {
                  title: "Communication Support",
                  description: "Reduce confusion with structured hospital and interpreter coordination.",
                  icon: Languages,
                },
                {
                  title: "Safer Planning",
                  description: "Keep the patient journey more organized from first inquiry to follow-up.",
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
        eyebrow="Patient Support FAQ"
        title="Common questions about international patient support"
        description="These answers explain how MedPobeda Group supports families before travel, during hospital coordination, and after treatment in India."
        items={[...hubFaq]}
      />

      <PremiumCtaBanner
        eyebrow="Support Coordination"
        title="Need support for the full patient journey to India?"
        description="Share the medical concern and destination goal. MedPobeda Group will help define the right support path for travel, admission, communication, and follow-up."
        image={createPremiumVisual(
          "medical-tourism-inner",
          "arrival-stay-coordination",
          "Arrival and stay coordination for an international patient in India.",
        )}
        primary={{ href: localizePath("/international-patient-care", locale), label: "Get Free Medical Opinion" }}
        secondary={{ href: localizePath("/contact", locale), label: "Request Patient Support" }}
      />
    </>
  );
}
