import type { AppLocale } from "@/lib/i18n/config";
import { createMetadata } from "@/lib/metadata";

export const INTERNATIONAL_PATIENT_CARE_PATH = "/international-patient-care";
export const INTERNATIONAL_PATIENT_CARE_REPORTS_URL = "https://wa.me/998910124043";

export function createInternationalPatientCareMetadata(locale: AppLocale) {
  return createMetadata({
    title:
      "International Patient Care | Medical Treatment in India for Patients from Central Asia",
    description:
      "MedPobeda Group provides international patient care for patients from Uzbekistan and Central Asia seeking advanced medical treatment in India, including hospital selection, cost estimates, visa support, interpreter assistance, travel coordination, and post-treatment follow-up.",
    path: INTERNATIONAL_PATIENT_CARE_PATH,
    locale,
    keywords: [
      "International Patient Care",
      "medical treatment in India",
      "patients from Central Asia",
      "treatment in India from Uzbekistan",
      "medical tourism from Uzbekistan to India",
      "affordable treatment in India",
      "trusted hospitals in India",
      "India healthcare support",
    ],
    ogTitle:
      "International Patient Care | Medical Treatment in India for Patients from Central Asia",
    ogDescription:
      "MedPobeda Group provides international patient care for patients from Uzbekistan and Central Asia seeking advanced medical treatment in India, including hospital selection, cost estimates, visa support, interpreter assistance, travel coordination, and post-treatment follow-up.",
  });
}

export const internationalPatientCareContent = {
  schemaName: "International Patient Care",
  schemaDescription:
    "MedPobeda Group supports patients from Central Asia seeking advanced medical treatment in India through structured hospital coordination, treatment planning, travel support, and follow-up care.",
  serviceSchemaName: "International Patient Care Coordination",
  serviceSchemaDescription:
    "Complete support for international patients traveling from Central Asia to India for hospital selection, treatment estimates, medical travel planning, and recovery coordination.",
  hero: {
    eyebrow: "International Patient Care",
    title: "International Patient Care from Central Asia to India",
    description:
      "MedPobeda Group supports patients from Uzbekistan, Kazakhstan, Kyrgyzstan, Tajikistan, Turkmenistan, and other Central Asian countries in accessing trusted hospitals, expert doctors, affordable treatment packages, and complete care coordination in India.",
    highlights: [
      "Uzbekistan",
      "Kazakhstan",
      "Kyrgyzstan",
      "Tajikistan",
      "Turkmenistan",
      "Central Asia",
    ],
    primaryCta: "Get Free Medical Opinion",
    secondaryCta: "Send Medical Reports",
    stats: [
      {
        value: "Central Asia",
        label: "patient support focused on Uzbekistan and neighboring markets",
      },
      {
        value: "India-ready",
        label: "trusted hospital access, specialist matching, and treatment planning",
      },
      {
        value: "End-to-end",
        label: "coordination across reports, travel, admission, and follow-up care",
      },
    ],
    floatingCards: [
      "Free Medical Opinion",
      "Cost Estimate",
      "Visa Support",
      "Interpreter Support",
    ],
    accentLabel: "Trusted Hospitals in India",
    imageAlts: [
      "International patient coordinator guiding a family through treatment planning for India.",
      "Premium hospital campus in India for international patient care.",
      "Airport and arrival assistance for patients traveling from Central Asia to India.",
    ],
  },
  story: {
    eyebrow: "Why This Route",
    title:
      "A premium international patient care pathway built for treatment clarity, family confidence, and trusted hospital access",
    description:
      "MedPobeda Group positions this service as healthcare coordination first, with the polish and reassurance patients expect from an international medical concierge brand.",
    body: [
      "Patients from Central Asia often need more than a hospital list. They need clear case review, realistic treatment direction, doctor and hospital selection, cost visibility, and practical support before leaving home for care in India.",
      "Many families describe this journey as medical tourism from Uzbekistan to India, but MedPobeda Group manages it as a healthcare coordination process. Medical reports are reviewed, trusted hospitals in India are shortlisted, travel and interpreter needs are discussed, and each next step is made easier to understand.",
    ],
    badges: [
      "Free medical opinion",
      "Trusted hospitals in India",
      "Transparent cost estimates",
      "Medical visa guidance",
      "Post-treatment follow-up",
    ],
    imageAlts: [
      "International patient reception space with premium healthcare presentation.",
      "Coordinator explaining hospital options to a Central Asian patient family.",
      "Doctor reviewing medical reports for treatment planning in India.",
      "Follow-up coordination after hospital treatment in India.",
    ],
  },
  scope: {
    eyebrow: "Complete Support",
    title: "Complete Support for International Patients",
    description:
      "This route is designed for patients from Central Asia seeking affordable treatment in India with reliable coordination before travel, during hospitalization, and after discharge.",
    items: [
      {
        title: "Medical Report Review",
        description:
          "Share diagnosis details, test results, and medical reports for an organized first review.",
      },
      {
        title: "Doctor & Hospital Selection",
        description:
          "Identify suitable doctors, specialties, and trusted hospitals in India based on diagnosis and budget.",
      },
      {
        title: "Treatment Cost Estimate",
        description:
          "Receive clearer treatment package estimates before committing to travel plans.",
      },
      {
        title: "Medical Visa Guidance",
        description:
          "Get help understanding documentation, timing, and next steps for treatment travel.",
      },
      {
        title: "Airport Pickup",
        description:
          "Reduce arrival friction with coordination support for airport reception and transfers.",
      },
      {
        title: "Interpreter Support",
        description:
          "Communication support helps patients and families move more confidently through hospital interactions.",
      },
      {
        title: "Accommodation Support",
        description:
          "Receive guidance on stay planning for patients and attendants near the treatment hospital.",
      },
      {
        title: "Hospital Admission Assistance",
        description:
          "Prepare documents, scheduling inputs, and admission coordination before treatment begins.",
      },
      {
        title: "Post-Treatment Follow-up",
        description:
          "Stay connected for reports, recovery communication, and ongoing coordination after discharge.",
      },
    ],
  },
  trust: {
    eyebrow: "Why MedPobeda Group",
    title:
      "Trusted coordination for medical treatment in India with a clear Central Asia focus",
    description:
      "Families choosing treatment in India from Uzbekistan and the wider region need a team that understands both hospital expectations and the realities of cross-border care planning.",
    items: [
      {
        title: "Healthcare-First Positioning",
        description:
          "The service is framed around patient care coordination rather than generic travel promotion.",
      },
      {
        title: "Trusted Hospital Access",
        description:
          "MedPobeda Group helps patients approach established hospital partners and suitable specialties in India.",
      },
      {
        title: "Affordable Treatment Planning",
        description:
          "Cost estimates and hospital options are discussed early so families can plan responsibly.",
      },
      {
        title: "Family-Friendly Coordination",
        description:
          "Travel, language, accommodation, and follow-up questions are handled with a calmer, more supportive process.",
      },
    ],
    stats: [
      {
        label: "Primary Corridor",
        value: "Central Asia to India",
        description:
          "Built for patients from Uzbekistan and neighboring markets seeking advanced specialist care.",
      },
      {
        label: "Care Model",
        value: "Patient-first",
        description:
          "Focused on trust, coordination quality, and smoother hospital access before and after travel.",
      },
    ],
    imageAlt:
      "International patient care planning discussion with a healthcare coordinator and hospital team.",
  },
  journey: {
    eyebrow: "Patient Journey",
    title: "How MedPobeda Group moves a patient case from reports to follow-up",
    description:
      "The process is structured to reduce confusion, improve response quality, and help patients from Central Asia approach treatment in India with more confidence.",
    items: [
      {
        title: "Share Medical Reports",
        description:
          "The case begins with diagnosis details, patient context, and the reports available for review.",
      },
      {
        title: "Initial Case Review",
        description:
          "The coordination team organizes the case for clearer specialist and hospital discussion.",
      },
      {
        title: "Hospital & Doctor Matching",
        description:
          "Suitable doctors, specialties, and hospitals in India are shortlisted based on needs and budget.",
      },
      {
        title: "Treatment Plan & Estimate",
        description:
          "Indicative treatment direction and expected cost inputs are gathered before travel decisions.",
      },
      {
        title: "Visa & Travel Preparation",
        description:
          "Medical visa guidance, timeline planning, and travel readiness are reviewed with the family.",
      },
      {
        title: "Arrival & Local Support",
        description:
          "Airport pickup, accommodation coordination, and interpreter support help the journey start smoothly.",
      },
      {
        title: "Hospital Admission Assistance",
        description:
          "The team stays aligned on admission flow, documents, and key coordination steps at the hospital.",
      },
      {
        title: "Follow-up Care",
        description:
          "After treatment, reports, recovery questions, and future review needs can still be coordinated.",
      },
    ],
  },
  inquiry: {
    eyebrow: "Need treatment in India?",
    title: "Share your medical reports for expert guidance and hospital options",
    description:
      "Share your medical reports with our team and receive expert guidance, hospital options, and estimated treatment cost from trusted hospitals in India.",
  },
  faq: {
    eyebrow: "International Patient Care FAQ",
    title: "Common questions about treatment in India for patients from Central Asia",
    description:
      "These answers help patients and families understand what MedPobeda Group coordinates and how the process works before travel begins.",
    items: [
      {
        question: "Does MedPobeda Group provide treatment directly?",
        answer:
          "No. MedPobeda Group coordinates international patient care, hospital communication, travel support, and follow-up planning. Medical treatment is provided by licensed hospitals and doctors.",
      },
      {
        question: "Can I get a free medical opinion before deciding to travel?",
        answer:
          "Yes. Patients can share medical reports first so hospital options, specialist direction, and estimated treatment cost can be reviewed before travel planning moves forward.",
      },
      {
        question: "Is this only for patients from Uzbekistan?",
        answer:
          "No. Uzbekistan is a major focus, but MedPobeda Group also supports patients from Kazakhstan, Kyrgyzstan, Tajikistan, Turkmenistan, and the wider Central Asia region.",
      },
      {
        question: "Can support include visa, interpreter, and accommodation help?",
        answer:
          "Yes. The coordination process can include medical visa guidance, airport pickup planning, interpreter support, accommodation guidance, and post-treatment follow-up.",
      },
    ],
  },
  cta: {
    eyebrow: "International Patient Care",
    title: "Need treatment in India?",
    description:
      "Send your medical reports and our team will help you get a free medical opinion and estimated treatment cost from trusted hospitals in India.",
    primary: "Get Free Medical Opinion",
    secondary: "Send Medical Reports",
    imageAlt:
      "Patient family reviewing treatment options in India with an international patient coordinator.",
  },
  authorityLinks: {
    eyebrow: "Treatment & Access Pages",
    title: "Explore trusted treatment pathways in India",
    description:
      "These pages help patients move from a general inquiry into treatment specialties, hospital options, and travel support routes that matter for real case planning.",
  },
  locationLinks: {
    eyebrow: "Regional Patient Routes",
    title: "Explore Central Asia treatment coordination pages",
    description:
      "These region-focused pages help patients and families connect this international patient care route with their country, city, and treatment planning context.",
  },
};
