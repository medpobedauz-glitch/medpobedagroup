import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, ShieldCheck } from "lucide-react";

import { PremiumCtaBanner } from "@/components/marketing/premium-cta-banner";
import { PremiumPageHero } from "@/components/marketing/premium-page-hero";
import { FAQAccordion } from "@/components/shared/faq-accordion";
import { JsonLd } from "@/components/shared/json-ld";
import { Card } from "@/components/ui/card";
import { localizePath } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/i18n/request";
import { createMetadata } from "@/lib/metadata";
import { patientSupportPages, getPatientSupportPage } from "@/lib/patient-support-pages";
import { createPremiumVisual } from "@/lib/premium-visuals";
import { createBreadcrumbSchema, createFaqSchema, createWebPageSchema } from "@/lib/schema";

type PatientSupportDetailProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return patientSupportPages.map((page) => ({ slug: page.slug }));
}

export function generateMetadata({ params }: PatientSupportDetailProps): Metadata {
  const locale = getRequestLocale();
  const page = getPatientSupportPage(params.slug);

  if (!page) {
    return createMetadata({
      title: "Patient Support | MedPobeda Group",
      description: "Patient support page for treatment planning in India.",
      path: `/patient-support/${params.slug}`,
      locale,
    });
  }

  return createMetadata({
    title: page.title,
    description: page.description,
    path: `/patient-support/${page.slug}`,
    locale,
    keywords: page.keywords,
    ogTitle: page.title,
    ogDescription: page.description,
  });
}

export default function PatientSupportDetailPage({ params }: PatientSupportDetailProps) {
  const locale = getRequestLocale();
  const messages = getMessages(locale);
  const page = getPatientSupportPage(params.slug);

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
            path: `/patient-support/${page.slug}`,
            locale,
          }),
          createBreadcrumbSchema(
            [
              { name: messages.chrome.navigation.home, path: "/" },
              { name: "Patient Support", path: "/patient-support" },
              { name: page.name, path: `/patient-support/${page.slug}` },
            ],
            locale,
          ),
          createFaqSchema(page.faq),
        ]}
      />

      <PremiumPageHero
        eyebrow="Support Detail"
        title={page.h1}
        description={page.overview}
        highlights={[page.name, "International Patient Support", "Treatment in India"]}
        primaryCta={{ href: localizePath("/international-patient-care", locale), label: "Get Free Medical Opinion" }}
        secondaryCta={{ href: localizePath("/patient-support", locale), label: "Explore More Support" }}
        images={[
          createPremiumVisual(
            "medical-tourism-inner",
            "visa-travel-guidance",
            `${page.name} support for treatment in India.`,
          ),
          createPremiumVisual(
            "medical-tourism-story",
            "coordinator-patient-family",
            `Care coordination related to ${page.name}.`,
          ),
          createPremiumVisual(
            "medical-tourism-story",
            "recovery-support",
            `Patient support continuity after treatment and travel.`,
          ),
        ]}
        stats={[
          { value: "Journey-critical", label: "support lane that strengthens the patient experience before and after travel" },
          { value: String(page.relatedPaths.length), label: "related internal SEO routes linked to this support topic" },
          { value: "Structured", label: "clear guidance for families preparing treatment in India" },
        ]}
        floatingCards={page.relatedPaths.map((path) => path.replace("/", "").replace(/-/g, " ")).slice(0, 4)}
        accentLabel={page.name}
      />

      <section className="section-shell">
        <div className="container-wide">
          <div className="section-frame px-4 py-8 sm:px-8 lg:px-10 lg:py-12">
            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <Card className="rounded-[1.85rem] border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-semibold text-sky-700">
                  <ShieldCheck className="h-4 w-4" />
                  How this support lane helps
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
                  <ArrowRight className="h-4 w-4" />
                  Related Pages
                </div>
                <div className="mt-5 space-y-3">
                  {page.relatedPaths.map((path) => (
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
          </div>
        </div>
      </section>

      <FAQAccordion
        eyebrow="Support FAQ"
        title={`Questions about ${page.name.toLowerCase()}`}
        description="These answers help patients and families understand how this part of the international treatment journey works."
        items={page.faq}
      />

      <PremiumCtaBanner
        eyebrow="Patient Assistance"
        title={`Need ${page.name.toLowerCase()} for treatment in India?`}
        description="MedPobeda Group can help organize the next step so the patient journey stays clearer, calmer, and better prepared before travel."
        image={createPremiumVisual(
          "medical-tourism-cta",
          "patient-consultation-meeting",
          `${page.name} discussion for international patient care planning.`,
        )}
        primary={{ href: localizePath("/international-patient-care", locale), label: "Get Free Medical Opinion" }}
        secondary={{ href: localizePath("/contact", locale), label: "Contact Support Desk" }}
      />
    </>
  );
}
