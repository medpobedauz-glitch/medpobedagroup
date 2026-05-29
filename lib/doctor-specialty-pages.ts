export type DoctorSpecialtyPage = {
  slug: string;
  name: string;
  title: string;
  description: string;
  h1: string;
  keywords: string[];
  overview: string;
  supportPoints: string[];
  relatedTreatmentPaths: string[];
  relatedHospitalSlugs: string[];
  faq: Array<{
    question: string;
    answer: string;
  }>;
};

export const doctorSpecialtyPages: DoctorSpecialtyPage[] = [
  {
    slug: "cardiology",
    name: "Cardiology Specialists",
    title: "Cardiology Specialists in India | Doctor Matching Support",
    description:
      "Find cardiology specialists in India for patients from Uzbekistan and Central Asia with structured doctor matching and hospital coordination support.",
    h1: "Cardiology Specialists in India for International Patients",
    keywords: [
      "cardiology specialists in India",
      "heart doctors India",
      "cardiology doctor matching India",
      "heart treatment India from Uzbekistan",
      "international patient cardiology India",
    ],
    overview:
      "Cardiology cases often require careful specialist selection, diagnostic review, and hospital branch matching before travel. MedPobeda Group helps organize those first steps for patients planning treatment in India.",
    supportPoints: [
      "Review the diagnosis and shortlist relevant cardiology or cardiac surgery teams.",
      "Help route investigations, imaging, and questions before hospital communication begins.",
      "Support treatment planning discussions linked to India heart-care pathways.",
    ],
    relatedTreatmentPaths: ["/cardiology-treatment-india", "/second-medical-opinion-india"],
    relatedHospitalSlugs: ["apollo-hospitals-india", "medanta-hospital-india", "narayana-health-india"],
    faq: [
      {
        question: "Can MedPobeda Group help find the right heart doctor in India?",
        answer:
          "Yes. We help patients organize their case details and identify the most relevant cardiology or cardiac surgery pathway before hospital discussions begin.",
      },
      {
        question: "What documents are important for cardiology doctor matching?",
        answer:
          "ECG, echocardiography, angiography, lab tests, discharge summaries, and current treatment notes are usually the most important starting documents.",
      },
    ],
  },
  {
    slug: "oncology",
    name: "Oncology Specialists",
    title: "Oncology Specialists in India | Cancer Doctor Matching Support",
    description:
      "Find oncology specialists in India for cancer treatment planning, hospital coordination, and international patient support from Uzbekistan and Central Asia.",
    h1: "Oncology Specialists in India for Cancer Treatment Planning",
    keywords: [
      "oncology specialists in India",
      "cancer doctor India",
      "oncology doctor matching India",
      "cancer treatment India from Uzbekistan",
      "international patient oncology India",
    ],
    overview:
      "Cancer-treatment planning often requires fast routing of pathology, scans, and treatment history to the right hospital team. MedPobeda Group supports that process for patients and families exploring oncology care in India.",
    supportPoints: [
      "Organize case summaries, pathology, and radiology for specialist review.",
      "Help route questions to relevant oncology teams and hospitals in India.",
      "Support treatment planning discussions before medical travel begins.",
    ],
    relatedTreatmentPaths: ["/oncology-treatment-india", "/second-medical-opinion-india"],
    relatedHospitalSlugs: ["apollo-hospitals-india", "fortis-hospitals-india", "max-healthcare-india"],
    faq: [
      {
        question: "Can MedPobeda Group help patients connect with cancer specialists in India?",
        answer:
          "Yes. We help prepare the medical file, organize questions, and support hospital-facing communication for oncology treatment planning.",
      },
      {
        question: "What is usually needed before contacting oncology hospitals in India?",
        answer:
          "Pathology reports, scan results, previous treatment history, and current doctor notes are the most useful first documents.",
      },
    ],
  },
  {
    slug: "nephrology",
    name: "Nephrology & Transplant Specialists",
    title: "Kidney Specialists in India | Nephrology and Transplant Support",
    description:
      "Find kidney specialists in India for nephrology care, kidney transplant planning, and hospital coordination from Uzbekistan and Central Asia.",
    h1: "Kidney Specialists in India for Nephrology and Transplant Support",
    keywords: [
      "kidney specialists in India",
      "nephrology doctor India",
      "kidney transplant India doctor matching",
      "kidney treatment India from Uzbekistan",
      "international patient nephrology India",
    ],
    overview:
      "Patients with kidney disease or transplant-related questions often need specialist triage, hospital matching, and careful document preparation. MedPobeda Group helps structure that intake process before travel.",
    supportPoints: [
      "Support the first-round routing of nephrology and transplant-related reports.",
      "Help families compare transplant and advanced nephrology pathways in India.",
      "Coordinate treatment-planning questions linked to hospital readiness.",
    ],
    relatedTreatmentPaths: ["/organ-transplant-india", "/second-medical-opinion-india"],
    relatedHospitalSlugs: ["medanta-hospital-india", "apollo-hospitals-india", "narayana-health-india"],
    faq: [
      {
        question: "Does MedPobeda Group support kidney transplant planning in India?",
        answer:
          "We support early-stage communication, report routing, and hospital coordination for patients and families exploring kidney transplant-related treatment pathways in India.",
      },
      {
        question: "Are nephrology and transplant specialists handled separately?",
        answer:
          "Sometimes yes. Depending on the case, the patient may need nephrology review first and transplant-team coordination later.",
      },
    ],
  },
  {
    slug: "ivf-specialists",
    name: "IVF & Fertility Specialists",
    title: "IVF Specialists in India | Fertility Treatment Support",
    description:
      "Find IVF and fertility specialists in India for international patient treatment planning and coordinated consultation support from Uzbekistan and Central Asia.",
    h1: "IVF and Fertility Specialists in India for International Patients",
    keywords: [
      "IVF specialists in India",
      "fertility doctor India",
      "IVF treatment India from Uzbekistan",
      "fertility consultation India",
      "international patient IVF India",
    ],
    overview:
      "IVF and fertility treatment planning requires privacy, structured communication, and careful doctor matching. MedPobeda Group helps patients prepare those first steps with clarity and discretion.",
    supportPoints: [
      "Support first-round communication for IVF and fertility evaluations.",
      "Help patients prepare case context, prior reports, and consultation questions.",
      "Coordinate guidance on treatment sequencing and travel planning for India.",
    ],
    relatedTreatmentPaths: ["/second-medical-opinion-india", "/international-patient-care"],
    relatedHospitalSlugs: ["apollo-hospitals-india", "max-healthcare-india", "artemis-hospital-india"],
    faq: [
      {
        question: "Can MedPobeda Group help patients explore IVF treatment in India?",
        answer:
          "Yes. We can help patients prepare initial fertility-related questions, documents, and treatment-planning communication before hospital coordination begins.",
      },
      {
        question: "Is fertility support handled confidentially?",
        answer:
          "Yes. IVF and fertility-related communication should be handled privately and with structured documentation support.",
      },
    ],
  },
  {
    slug: "neurosurgery",
    name: "Neurosurgery Specialists",
    title: "Neurosurgery Specialists in India | Specialist Matching Support",
    description:
      "Find neurosurgery specialists in India for diagnosis review, treatment planning, and hospital coordination support from Uzbekistan and Central Asia.",
    h1: "Neurosurgery Specialists in India for Complex Treatment Planning",
    keywords: [
      "neurosurgery specialists in India",
      "brain surgery doctor India",
      "neurosurgery doctor matching India",
      "neurosurgery treatment India from Uzbekistan",
      "international patient neurosurgery India",
    ],
    overview:
      "Neurosurgery inquiries often require fast diagnostic review and specialist-level triage. MedPobeda Group supports the early coordination process for families exploring advanced neurosurgery treatment in India.",
    supportPoints: [
      "Support structured routing of MRI, CT, and neurology/neurosurgery reports.",
      "Help compare specialist-led hospital pathways for complex neurosurgery cases.",
      "Coordinate communication for second opinions and treatment planning in India.",
    ],
    relatedTreatmentPaths: ["/neurosurgery-treatment-india", "/second-medical-opinion-india"],
    relatedHospitalSlugs: ["medanta-hospital-india", "apollo-hospitals-india", "artemis-hospital-india"],
    faq: [
      {
        question: "Can MedPobeda Group help with neurosurgery cases in India?",
        answer:
          "Yes. We help families prepare reports, questions, and treatment-planning details so hospitals can review neurosurgery cases more clearly.",
      },
      {
        question: "What is important before contacting neurosurgery hospitals?",
        answer:
          "Recent MRI or CT imaging, neurologist notes, prior surgical history, and current symptoms are usually essential.",
      },
    ],
  },
];

export function getDoctorSpecialtyPage(slug: string) {
  return doctorSpecialtyPages.find((page) => page.slug === slug) ?? null;
}
