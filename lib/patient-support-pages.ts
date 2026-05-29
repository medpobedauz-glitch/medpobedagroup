export type PatientSupportPage = {
  slug: string;
  name: string;
  title: string;
  description: string;
  h1: string;
  keywords: string[];
  overview: string;
  supportPoints: string[];
  relatedPaths: string[];
  faq: Array<{
    question: string;
    answer: string;
  }>;
};

export const patientSupportPages: PatientSupportPage[] = [
  {
    slug: "visa-assistance",
    name: "Visa Assistance",
    title: "Medical Visa Assistance | India Travel Preparation Support",
    description:
      "Get medical visa preparation support for treatment in India, including hospital documents, readiness guidance, and travel sequencing from Uzbekistan and Central Asia.",
    h1: "Medical Visa Assistance for Treatment in India",
    keywords: [
      "medical visa assistance India",
      "medical visa India from Uzbekistan",
      "patient travel documents India",
      "treatment in India visa support",
      "medical tourism visa India",
    ],
    overview:
      "Medical visa readiness is one of the most important parts of international treatment planning. MedPobeda Group helps patients understand which hospital-linked documents, travel details, and treatment papers are usually needed before departure.",
    supportPoints: [
      "Review which treatment and hospital documents should be prepared first.",
      "Help align visa timing with hospital communication and treatment planning.",
      "Support patients and families with practical readiness for travel to India.",
    ],
    relatedPaths: ["/medical-visa-support", "/international-patient-care", "/contact"],
    faq: [
      {
        question: "Can MedPobeda Group issue a visa directly?",
        answer:
          "No. Visa issuance is handled by the relevant authorities, but MedPobeda Group can help patients prepare the hospital-facing and treatment-planning documents usually needed before applying.",
      },
      {
        question: "When should medical visa preparation begin?",
        answer:
          "It should begin as soon as the treatment pathway, hospital communication, and travel timeline become clear.",
      },
    ],
  },
  {
    slug: "travel-arrangements",
    name: "Travel Arrangements",
    title: "Travel Arrangements for Treatment in India | Patient Journey Support",
    description:
      "Plan travel arrangements for treatment in India with MedPobeda Group support for flights, arrival planning, stay logistics, and patient-family coordination.",
    h1: "Travel Arrangements for International Patients Going to India",
    keywords: [
      "travel arrangements treatment India",
      "patient travel India from Uzbekistan",
      "medical tourism travel support India",
      "hospital travel planning India",
      "international patient travel India",
    ],
    overview:
      "Travel planning for treatment in India includes timing, airport arrival, companion coordination, accommodation, and movement around hospital schedules. MedPobeda Group helps patients organize those steps before departure.",
    supportPoints: [
      "Coordinate travel timing around treatment estimates and hospital schedules.",
      "Help families plan arrival, local movement, and companion logistics.",
      "Support practical travel readiness before the medical journey begins.",
    ],
    relatedPaths: ["/international-patient-care", "/patient-support/hospital-admission", "/contact"],
    faq: [
      {
        question: "Does MedPobeda Group book flights directly?",
        answer:
          "The role is to support travel readiness and planning logic around the treatment journey, not to replace licensed travel providers.",
      },
      {
        question: "Can companions be included in travel planning?",
        answer:
          "Yes. Companion support is often an important part of medical travel and should be considered early in the planning process.",
      },
    ],
  },
  {
    slug: "hospital-admission",
    name: "Hospital Admission Assistance",
    title: "Hospital Admission Assistance | International Patient Coordination",
    description:
      "Get hospital admission assistance for treatment in India, including pre-arrival coordination, intake support, and patient communication guidance.",
    h1: "Hospital Admission Assistance for International Patients in India",
    keywords: [
      "hospital admission assistance India",
      "international patient admission India",
      "patient coordination hospital India",
      "treatment admission support India",
      "medical tourism admission help",
    ],
    overview:
      "Admission planning is often stressful for patients and families, especially across borders. MedPobeda Group helps align paperwork, hospital communication, and pre-arrival expectations so the transition into treatment is smoother.",
    supportPoints: [
      "Clarify what needs to be ready before hospital intake begins.",
      "Support communication around scheduled admission and treatment timing.",
      "Help families understand the practical sequence from arrival to admission.",
    ],
    relatedPaths: ["/international-patients", "/patient-support/travel-arrangements", "/contact"],
    faq: [
      {
        question: "What is usually needed before hospital admission?",
        answer:
          "That depends on the hospital and treatment type, but passports, medical reports, admission letters, and payment or estimate documents are commonly important.",
      },
      {
        question: "Can MedPobeda Group help patients communicate with the hospital before arrival?",
        answer:
          "Yes. We support structured communication so patients and hospitals have clearer expectations before the admission date.",
      },
    ],
  },
  {
    slug: "medical-translation",
    name: "Medical Translation & Interpreter Support",
    title: "Medical Translation Support | Interpreter Help for Patients in India",
    description:
      "Get medical translation and interpreter support for international patients traveling from Uzbekistan and Central Asia to India for treatment.",
    h1: "Medical Translation and Interpreter Support for Treatment in India",
    keywords: [
      "medical translation support India",
      "interpreter support patient India",
      "Uzbek interpreter India hospital",
      "Russian interpreter medical India",
      "international patient communication India",
    ],
    overview:
      "Clear communication is essential in cross-border healthcare. MedPobeda Group supports patients and families who need language support while preparing for treatment discussions, admission, and follow-up communication in India.",
    supportPoints: [
      "Support clearer communication between families, hospitals, and coordinators.",
      "Help reduce confusion around medical terms, treatment steps, and logistics.",
      "Improve patient confidence during pre-travel and on-ground coordination.",
    ],
    relatedPaths: ["/international-patients", "/patient-support/hospital-admission", "/contact"],
    faq: [
      {
        question: "Why is interpreter support important for medical tourism?",
        answer:
          "It helps patients and caregivers understand treatment recommendations, admission steps, and practical hospital communication more clearly.",
      },
      {
        question: "Can translation support continue after hospital discharge?",
        answer:
          "Yes. Follow-up communication, discharge understanding, and post-treatment instructions often still require clear translation support.",
      },
    ],
  },
  {
    slug: "post-treatment-care",
    name: "Post-Treatment Follow-up",
    title: "Post-Treatment Follow-up | Continued Patient Support After India Care",
    description:
      "Get post-treatment follow-up support after treatment in India, including reports, communication continuity, and next-step guidance for patients and families.",
    h1: "Post-Treatment Follow-up After Treatment in India",
    keywords: [
      "post-treatment follow-up India",
      "after treatment support India",
      "international patient follow-up care",
      "medical tourism follow-up support",
      "reports and recovery guidance India",
    ],
    overview:
      "The patient journey does not end at discharge. MedPobeda Group helps maintain communication continuity around reports, next steps, and practical follow-up questions after the treatment stage in India.",
    supportPoints: [
      "Help organize post-treatment reports and communication continuity.",
      "Support questions around next steps, recovery guidance, and follow-up timing.",
      "Maintain a clearer bridge between the family and treatment destination after discharge.",
    ],
    relatedPaths: ["/international-patient-care", "/second-medical-opinion-india", "/contact"],
    faq: [
      {
        question: "Why is post-treatment follow-up important?",
        answer:
          "Patients often need clarity on reports, medications, future review timing, and recovery guidance after returning home.",
      },
      {
        question: "Can MedPobeda Group support communication after the patient leaves India?",
        answer:
          "Yes. Continued communication support can help keep the recovery and follow-up process more organized.",
      },
    ],
  },
];

export function getPatientSupportPage(slug: string) {
  return patientSupportPages.find((page) => page.slug === slug) ?? null;
}
