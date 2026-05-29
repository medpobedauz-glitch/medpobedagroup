import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Building2, MapPin, ShieldCheck, Stethoscope } from "lucide-react";

import { PremiumCtaBanner } from "@/components/marketing/premium-cta-banner";
import { PremiumPageHero } from "@/components/marketing/premium-page-hero";
import { FAQAccordion } from "@/components/shared/faq-accordion";
import { JsonLd } from "@/components/shared/json-ld";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { featuredHospitals } from "@/lib/hospital-pages";
import { localizePath } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/i18n/request";
import { createMetadata } from "@/lib/metadata";
import { createPremiumVisual } from "@/lib/premium-visuals";
import { createBreadcrumbSchema, createFaqSchema, createWebPageSchema } from "@/lib/schema";

const hubFaq = [
  {
    question: "How do patients choose the right hospital in India?",
    answer:
      "The right hospital depends on the diagnosis, treatment goal, specialist availability, city preference, and practical travel considerations. MedPobeda Group helps patients compare these factors before moving forward.",
  },
  {
    question: "Does MedPobeda Group represent all hospitals listed on this page?",
    answer:
      "These are featured hospitals commonly considered by international patients. The page is designed to help patients understand hospital options in India and does not imply legal exclusivity unless stated separately.",
  },
  {
    question: "Can MedPobeda Group help patients compare hospitals before travel?",
    answer:
      "Yes. We help organize the case summary, review treatment needs, and compare hospital options in India before travel and treatment planning continue.",
  },
] as const;

export function generateMetadata(): Metadata {
  const locale = getRequestLocale();

  return createMetadata({
    title: "Hospitals in India for International Patients | MedPobeda Group",
    description:
      "Compare leading hospitals in India for patients from Uzbekistan and Central Asia with MedPobeda Group support for treatment planning, specialist matching, and travel coordination.",
    path: "/hospitals",
    locale,
    keywords: [
      "hospitals in India",
      "top hospitals in India for international patients",
      "medical tourism hospitals India",
      "Uzbek patients in India hospitals",
      "treatment in India hospitals",
    ],
    ogTitle: "Hospitals in India for International Patients",
    ogDescription:
      "Explore leading hospitals in India for oncology, cardiology, transplant, surgery, and international patient treatment planning.",
  });
}

export default function HospitalsPage() {
  const locale = getRequestLocale();
  const messages = getMessages(locale);

  return (
    <>
      <JsonLd
        data={[
          createWebPageSchema({
            name: "Hospitals in India for International Patients",
            description:
              "Featured hospitals in India for patients from Uzbekistan and Central Asia seeking advanced medical treatment and hospital coordination.",
            path: "/hospitals",
            locale,
            type: "CollectionPage",
          }),
          createBreadcrumbSchema(
            [
              { name: messages.chrome.navigation.home, path: "/" },
              { name: messages.chrome.navigation.hospitals, path: "/hospitals" },
            ],
            locale,
          ),
          createFaqSchema([...hubFaq]),
        ]}
      />

      <PremiumPageHero
        eyebrow="Hospitals in India"
        title="Leading hospitals in India for international patients from Uzbekistan and Central Asia"
        description="Compare trusted hospitals in India for cancer treatment, heart care, transplant, surgery, fertility, and advanced multispecialty treatment planning with MedPobeda Group support."
        highlights={[
          "Featured Hospitals in India",
          "International Patient Planning",
          "Specialist Hospital Access",
        ]}
        primaryCta={{ href: localizePath("/international-patient-care", locale), label: "Get Free Medical Opinion" }}
        secondaryCta={{ href: localizePath("/contact", locale), label: "Speak With Our Team" }}
        images={[
          createPremiumVisual(
            "medical-tourism-hero",
            "hospital-campus",
            "Premium hospital campus in India for international patients.",
          ),
          createPremiumVisual(
            "medical-tourism-trust",
            "care-coordination-meeting",
            "Care coordination discussion for hospital selection in India.",
          ),
          createPremiumVisual(
            "medical-tourism-inner",
            "doctor-hospital-matching",
            "Doctor and hospital matching support for international patients.",
          ),
        ]}
        stats={[
          { value: "6", label: "featured hospital groups for scalable India treatment planning" },
          { value: "Multi-city", label: "access across Delhi, Gurugram, Chennai, Bengaluru, and more" },
          { value: "Specialist-led", label: "pathways for oncology, cardiology, transplant, surgery, and IVF" },
        ]}
        floatingCards={["Hospital Comparison", "Doctor Matching", "Travel Readiness", "Patient Support"]}
        accentLabel="India Treatment Network"
      />

      <section className="section-shell">
        <div className="container-wide">
          <div className="section-frame px-4 py-8 sm:px-8 lg:px-10 lg:py-12">
            <div className="max-w-3xl">
              <p className="section-kicker">Featured Hospitals</p>
              <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-4xl">
                Hospital options patients commonly compare before treatment in India
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-600">
                This hospital hub is designed to support Google sitelinks, internal SEO clustering,
                and patient decision-making around specialist access, city choice, and treatment fit.
              </p>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
              {featuredHospitals.map((hospital) => (
                <Card key={hospital.slug} className="rounded-[1.85rem] border border-slate-200 p-6 shadow-sm">
                  <div className="flex items-center gap-3 text-sm font-semibold text-sky-700">
                    <Building2 className="h-4 w-4" />
                    Featured Hospital
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-semibold text-slate-950">
                    {hospital.name}
                  </h3>
                  <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                    <MapPin className="h-4 w-4 text-emerald-600" />
                    {hospital.city}
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{hospital.trustLine}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {hospital.specialties.slice(0, 4).map((specialty) => (
                      <span key={specialty} className="glass-badge">
                        {specialty}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-col gap-3">
                    <Button asChild variant="primary" className="justify-center">
                      <Link href={localizePath(`/hospitals/${hospital.slug}`, locale)}>
                        Explore Hospital Profile
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="surface" className="justify-center">
                      <Link href={localizePath("/international-patient-care", locale)}>Request Treatment Plan</Link>
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
            <div className="grid gap-6 lg:grid-cols-3">
              {[
                {
                  title: "Hospital Fit Review",
                  description:
                    "We compare hospitals based on diagnosis, specialty fit, treatment pathway, city, and patient travel comfort.",
                  icon: Building2,
                },
                {
                  title: "Specialist Matching",
                  description:
                    "We help align the medical concern with the relevant specialist or multispecialty team before hospital discussions begin.",
                  icon: Stethoscope,
                },
                {
                  title: "Trusted Coordination",
                  description:
                    "We support patients with reports, estimates, communication readiness, and practical next steps before departure.",
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
        eyebrow="Hospital FAQ"
        title="Questions patients often ask before choosing a hospital in India"
        description="These answers support hospital comparison, internal linking, and clearer search intent around hospitals in India for international patients."
        items={[...hubFaq]}
      />

      <PremiumCtaBanner
        eyebrow="Hospital Guidance"
        title="Need help choosing the right hospital in India?"
        description="Share the diagnosis, reports, and treatment goal. MedPobeda Group will help compare hospital options, treatment fit, and next-step planning before travel."
        image={createPremiumVisual(
          "medical-tourism-cta",
          "patient-consultation-meeting",
          "Patient consultation about hospitals in India and treatment planning.",
        )}
        primary={{ href: localizePath("/international-patient-care", locale), label: "Get Free Medical Opinion" }}
        secondary={{ href: localizePath("/contact", locale), label: "Contact MedPobeda Group" }}
      />
    </>
  );
}
