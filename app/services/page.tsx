import type { Metadata } from "next";
import { ArrowRight, Building2, FileText, Globe2, Users } from "lucide-react";

import { PremiumCtaBanner } from "@/components/marketing/premium-cta-banner";
import { PremiumPageHero } from "@/components/marketing/premium-page-hero";
import { PremiumSplitTrustSection } from "@/components/marketing/premium-split-trust-section";
import { FAQAccordion } from "@/components/shared/faq-accordion";
import { JsonLd } from "@/components/shared/json-ld";
import { Card } from "@/components/ui/card";
import { getMessages } from "@/lib/i18n";
import { localizePath } from "@/lib/i18n/config";
import { getRequestLocale } from "@/lib/i18n/request";
import { createMetadata } from "@/lib/metadata";
import { createPremiumVisual } from "@/lib/premium-visuals";
import { createBreadcrumbSchema, createFaqSchema, createWebPageSchema } from "@/lib/schema";

const serviceCards = [
  {
    title: "Free Medical Opinion",
    description:
      "Share reports and receive guidance on the right treatment route, hospital options, and specialist review in India.",
  },
  {
    title: "Hospital & Doctor Selection",
    description:
      "We help shortlist trusted hospitals and specialist teams based on diagnosis, city preference, and treatment goals.",
  },
  {
    title: "Treatment Cost Estimate",
    description:
      "Families receive structured estimate guidance before making travel commitments for treatment in India.",
  },
  {
    title: "Medical Visa Guidance",
    description:
      "Support for hospital documents, travel timing, and practical visa-readiness planning before departure.",
  },
  {
    title: "Travel & Interpreter Support",
    description:
      "Arrival, airport pickup, local coordination, and language assistance for patients traveling from Central Asia.",
  },
  {
    title: "Post-Treatment Follow-up",
    description:
      "Continued support for reports, recovery communication, and next-step planning after discharge.",
  },
] as const;

const journeySteps = [
  {
    title: "Medical Inquiry Review",
    description: "We understand the diagnosis, urgency, and treatment goal before hospital routing begins.",
  },
  {
    title: "Report & Specialist Routing",
    description: "Medical files are structured so the right specialists and hospitals can assess the case clearly.",
  },
  {
    title: "Hospital Comparison",
    description: "Relevant treatment pathways are compared across trusted hospitals in India.",
  },
  {
    title: "Estimate & Travel Readiness",
    description: "Patients receive cost guidance and practical support for travel and visa preparation.",
  },
  {
    title: "Arrival & Admission Support",
    description: "We help coordinate the patient journey from airport arrival to hospital intake and communication.",
  },
  {
    title: "Follow-up Continuity",
    description: "Post-treatment questions, reports, and recovery steps stay organized after return travel.",
  },
] as const;

const trustItems = [
  {
    icon: Building2,
    title: "Hospital Access",
    description:
      "Structured treatment planning with leading hospitals in India for oncology, cardiology, transplant, surgery, and more.",
  },
  {
    icon: Users,
    title: "International Patient Focus",
    description:
      "Built for patients and families from Uzbekistan and Central Asia who need clear communication across borders.",
  },
  {
    icon: Globe2,
    title: "Cross-Border Coordination",
    description:
      "A practical bridge between Central Asia and India for treatment decisions, travel planning, and support.",
  },
  {
    icon: FileText,
    title: "Report-First Planning",
    description:
      "Medical records, estimates, and next-step decisions are organized before the journey becomes expensive or stressful.",
  },
] as const;

const reasonsToChoose = [
  {
    title: "Premium care coordination",
    description: "Designed for serious medical decisions, not generic travel marketing.",
  },
  {
    title: "Trusted India treatment focus",
    description: "Strong alignment with the treatments and hospitals patients from Central Asia search for most.",
  },
  {
    title: "Family-friendly communication",
    description: "Clear explanations, next steps, and practical support before and after treatment travel.",
  },
] as const;

const serviceFaq = [
  {
    question: "What services does MedPobeda Group provide for treatment in India?",
    answer:
      "MedPobeda Group supports medical opinion requests, hospital selection, treatment estimate guidance, visa planning, travel coordination, interpreter support, admission assistance, and follow-up communication.",
  },
  {
    question: "Is MedPobeda Group focused only on patients from Uzbekistan?",
    answer:
      "The strongest focus is Uzbekistan and Central Asia, but the same international patient care structure can support other patients traveling to India for treatment.",
  },
  {
    question: "Can MedPobeda Group help compare hospitals before travel?",
    answer:
      "Yes. Comparing hospital pathways, specialist fit, city options, and practical travel implications is one of the most important early steps we support.",
  },
] as const;

export function generateMetadata(): Metadata {
  const locale = getRequestLocale();
  const messages = getMessages(locale);

  return createMetadata({
    title: messages.routes.services.title,
    description: messages.routes.services.description,
    path: "/services",
    locale,
    keywords: messages.routes.services.keywords,
    ogTitle: messages.routes.services.openGraphTitle,
    ogDescription: messages.routes.services.openGraphDescription,
  });
}

export default function ServicesPage() {
  const locale = getRequestLocale();
  const messages = getMessages(locale);

  return (
    <>
      <JsonLd
        data={[
          createWebPageSchema({
            name: messages.routes.services.title,
            description: messages.routes.services.description,
            path: "/services",
            locale,
            type: "CollectionPage",
          }),
          createBreadcrumbSchema(
            [
              { name: messages.chrome.navigation.home, path: "/" },
              { name: messages.chrome.navigation.services, path: "/services" },
            ],
            locale,
          ),
          createFaqSchema([...serviceFaq]),
        ]}
      />

      <PremiumPageHero
        eyebrow="Services"
        title="International patient care services from Central Asia to India"
        description="MedPobeda Group helps patients from Uzbekistan and Central Asia access trusted hospitals, specialist doctors, transparent treatment planning, and complete travel support for medical treatment in India."
        highlights={[
          "Free Medical Opinion",
          "Hospital & Doctor Matching",
          "Travel, Visa, and Follow-up Support",
        ]}
        primaryCta={{ href: localizePath("/contact", locale), label: "Contact Our Team" }}
        secondaryCta={{
          href: localizePath("/international-patient-care", locale),
          label: "Explore International Patient Care",
        }}
        images={[
          createPremiumVisual(
            "medical-tourism-hero",
            "doctor-patient-consultation",
            "Doctor consultation for international patient treatment planning in India.",
          ),
          createPremiumVisual(
            "medical-tourism-inner",
            "doctor-hospital-matching",
            "Hospital and specialist matching for treatment in India.",
          ),
          createPremiumVisual(
            "medical-tourism-story",
            "coordinator-patient-family",
            "Medical coordinator supporting an international patient family.",
          ),
        ]}
        accentLabel="India Care Services"
        stats={[
          { value: "6", label: "core support services built around real patient travel and treatment needs" },
          { value: "Central Asia", label: "focused support for patients traveling from Uzbekistan and nearby markets" },
          { value: "End-to-end", label: "from report review to follow-up after treatment in India" },
        ]}
        floatingCards={["Medical Opinion", "Hospital Matching", "Visa Guidance", "Follow-up Care"]}
      />

      <section className="section-shell">
        <div className="container-wide">
          <div className="section-frame grid gap-10 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
            <div>
              <p className="section-kicker">Service Scope</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Core services shaped for international patients and their families
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                This service hub supports Google sitelinks, clearer internal navigation, and
                stronger understanding of how MedPobeda Group helps patients reach treatment in India.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {serviceCards.map((item) => (
                <Card key={item.title} className="rounded-[1.8rem] border border-slate-200 p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-slate-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell bg-slate-50">
        <div className="container-wide">
          <div className="section-frame px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
            <div className="space-y-6">
              <p className="section-kicker">Service Journey</p>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                A treatment support workflow designed for clarity before travel begins
              </h2>
              <p className="max-w-3xl text-base leading-8 text-slate-600">
                Each step helps patients and families move from first inquiry to treatment planning
                with more structure and less confusion.
              </p>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              {journeySteps.map((item) => (
                <Card key={item.title} className="rounded-[1.8rem] border border-slate-200 p-6 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-50 text-sky-700">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-950">{item.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PremiumSplitTrustSection
        eyebrow="Why This Works"
        title="A premium support model built for healthcare trust, not generic tourism language"
        description="MedPobeda Group is positioned as an international patient care bridge between Central Asia and India, with service lanes designed around medical decisions, not travel sales tactics."
        image={createPremiumVisual(
          "medical-tourism-trust",
          "care-coordination-meeting",
          "Healthcare coordination meeting for treatment planning in India.",
        )}
        items={trustItems.map((item) => ({
          icon: item.icon,
          title: item.title,
          description: item.description,
        }))}
      />

      <section className="section-shell">
        <div className="container-wide">
          <div className="section-frame px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
            <div className="space-y-6">
              <p className="section-kicker">Why MedPobeda Group</p>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                A more credible route for treatment in India from Uzbekistan and Central Asia
              </h2>
              <p className="max-w-3xl text-base leading-8 text-slate-600">
                Patients need trusted hospitals, clear communication, and realistic planning. This
                service architecture is designed around those needs.
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {reasonsToChoose.map((card) => (
                <Card key={card.title} className="rounded-[1.8rem] border border-slate-200 p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-slate-950">{card.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{card.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FAQAccordion
        eyebrow="Services FAQ"
        title="Questions patients ask before starting treatment planning in India"
        description="These answers help clarify what MedPobeda Group does, how support is structured, and what patients should expect before medical travel."
        items={[...serviceFaq]}
      />

      <PremiumCtaBanner
        title="Need support for treatment in India?"
        description="Send your reports and treatment question. MedPobeda Group can help define the right hospital route, specialist plan, and next practical steps."
        image={createPremiumVisual(
          "medical-tourism-trust",
          "care-coordination-meeting",
          "Care coordination discussion for medical treatment planning in India.",
        )}
        primary={{ href: localizePath("/contact", locale), label: "Contact Our Team" }}
        secondary={{
          href: localizePath("/international-patient-care", locale),
          label: "Get Free Medical Opinion",
        }}
      />
    </>
  );
}
