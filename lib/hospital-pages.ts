export type FeaturedHospital = {
  slug: string;
  name: string;
  city: string;
  trustLine: string;
  h1: string;
  title: string;
  description: string;
  keywords: string[];
  overview: string;
  specialties: string[];
  supportPoints: string[];
  faq: Array<{
    question: string;
    answer: string;
  }>;
  relatedTreatmentPaths: string[];
};

export const featuredHospitals: FeaturedHospital[] = [
  {
    slug: "apollo-hospitals-india",
    name: "Apollo Hospitals",
    city: "New Delhi / Chennai",
    trustLine: "Large multi-city hospital network with established international patient support.",
    h1: "Apollo Hospitals India for International Patients from Uzbekistan",
    title: "Apollo Hospitals India | International Patient Hospital Access",
    description:
      "Explore Apollo Hospitals India access for patients from Uzbekistan and Central Asia with treatment planning, hospital coordination, and specialist matching support.",
    keywords: [
      "Apollo Hospitals India",
      "Apollo Hospitals international patients",
      "treatment in India Apollo Hospitals",
      "Uzbek patients Apollo Hospitals India",
      "hospitals in India for international patients",
    ],
    overview:
      "Apollo Hospitals is one of the most recognized private hospital groups in India. For international patients, it is commonly considered for oncology, cardiology, organ transplant, orthopedics, neuroscience, and complex multispecialty treatment pathways.",
    specialties: [
      "Oncology",
      "Cardiology",
      "Organ Transplant",
      "Orthopedics",
      "Neurosciences",
      "Second Medical Opinion",
    ],
    supportPoints: [
      "Structured routing of reports before hospital discussions begin.",
      "Guidance on hospital branch suitability based on specialty and travel preference.",
      "Coordination support for treatment plans, documentation readiness, and travel sequencing.",
    ],
    faq: [
      {
        question: "What treatments do patients commonly seek at Apollo Hospitals India?",
        answer:
          "Patients often explore Apollo Hospitals for cancer treatment, heart care, neurosurgery, orthopedic procedures, transplant-related evaluations, and multispecialty second opinions.",
      },
      {
        question: "Can MedPobeda Group help patients approach Apollo Hospitals India?",
        answer:
          "MedPobeda Group helps organize reports, define the treatment need, and support international patient communication before travel and hospital intake.",
      },
      {
        question: "Is Apollo Hospitals suitable for international patients from Central Asia?",
        answer:
          "Apollo Hospitals is widely recognized for international patient support and is frequently evaluated by families in Uzbekistan and Central Asia looking for advanced treatment in India.",
      },
    ],
    relatedTreatmentPaths: [
      "/oncology-treatment-india",
      "/cardiology-treatment-india",
      "/organ-transplant-india",
    ],
  },
  {
    slug: "medanta-hospital-india",
    name: "Medanta - The Medicity",
    city: "Gurugram",
    trustLine: "Known for advanced tertiary care and destination treatment planning for complex cases.",
    h1: "Medanta Hospital India for Patients Seeking Advanced Treatment",
    title: "Medanta Hospital India | Specialist Treatment Access",
    description:
      "Review Medanta Hospital India for international patient treatment planning, specialist access, and hospital coordination from Uzbekistan and Central Asia.",
    keywords: [
      "Medanta hospital India",
      "Medanta international patients",
      "treatment in India Medanta",
      "hospital in Gurugram for international patients",
      "medical tourism India hospital Medanta",
    ],
    overview:
      "Medanta is often considered for complex, specialist-led treatment journeys in cardiology, oncology, transplant medicine, neurology, and surgical care. It is a strong fit for patients who need a high-acuity hospital environment in North India.",
    specialties: [
      "Cardiology",
      "Oncology",
      "Liver & Kidney Transplant",
      "Neurosciences",
      "General Surgery",
      "Critical Care",
    ],
    supportPoints: [
      "Case preparation for specialist review and branch-level triage.",
      "Guidance on treatment planning conversations and international patient intake.",
      "Travel readiness support for patients choosing North India treatment routes.",
    ],
    faq: [
      {
        question: "Why do international patients consider Medanta?",
        answer:
          "Patients often consider Medanta for specialist-led treatment planning, advanced diagnostics, complex surgery, and tertiary-care support in Gurugram.",
      },
      {
        question: "Does MedPobeda Group arrange treatment planning for Medanta?",
        answer:
          "MedPobeda Group can help organize case details, coordinate inquiry routing, and support hospital communication for families evaluating Medanta.",
      },
      {
        question: "What regions commonly seek care at Medanta?",
        answer:
          "Patients from Central Asia, Africa, and the Middle East often evaluate Medanta for advanced treatment in India.",
      },
    ],
    relatedTreatmentPaths: [
      "/cardiology-treatment-india",
      "/oncology-treatment-india",
      "/neurosurgery-treatment-india",
    ],
  },
  {
    slug: "fortis-hospitals-india",
    name: "Fortis Healthcare",
    city: "New Delhi / Gurugram / Mumbai",
    trustLine: "Established hospital network with dedicated international-patient pathways across key Indian cities.",
    h1: "Fortis Hospitals India for International Patient Treatment Planning",
    title: "Fortis Hospitals India | Hospital Network for International Patients",
    description:
      "Discover Fortis Hospitals India for treatment planning, specialist communication, and international patient support from Uzbekistan and Central Asia.",
    keywords: [
      "Fortis Hospitals India",
      "Fortis international patients",
      "Fortis hospital medical tourism India",
      "hospital network India for Uzbek patients",
      "treatment in India Fortis",
    ],
    overview:
      "Fortis Healthcare operates a broad hospital network that is commonly explored for cardiology, oncology, orthopedics, gastroenterology, and multidisciplinary hospital coordination across major Indian metro cities.",
    specialties: [
      "Cardiology",
      "Oncology",
      "Orthopedics",
      "Gastro Sciences",
      "Neurosciences",
      "General Surgery",
    ],
    supportPoints: [
      "Support choosing the most relevant Fortis hospital location for the case.",
      "Inquiry routing for specialist access, doctor review, and patient logistics.",
      "Travel and communication support for families planning care in major Indian cities.",
    ],
    faq: [
      {
        question: "What makes Fortis useful for international treatment planning?",
        answer:
          "Its network model gives patients multiple city options in India while maintaining access to strong specialist and multispecialty treatment pathways.",
      },
      {
        question: "Can patients compare Fortis with other Indian hospitals?",
        answer:
          "Yes. MedPobeda Group can help families compare hospitals such as Fortis, Apollo, Medanta, and Max based on specialty and travel needs.",
      },
      {
        question: "Is Fortis suitable for cardiology and oncology cases?",
        answer:
          "Fortis is frequently explored for cardiology, oncology, and other specialist-driven treatment pathways in India.",
      },
    ],
    relatedTreatmentPaths: [
      "/cardiology-treatment-india",
      "/oncology-treatment-india",
      "/orthopedic-treatment-india",
    ],
  },
  {
    slug: "max-healthcare-india",
    name: "Max Healthcare",
    city: "New Delhi",
    trustLine: "Recognized multispecialty hospital group frequently considered by international patients headed to Delhi.",
    h1: "Max Healthcare India for International Treatment in Delhi",
    title: "Max Healthcare India | Delhi Hospital Access for International Patients",
    description:
      "Evaluate Max Healthcare India for cancer treatment, heart care, surgery, and hospital coordination for patients traveling from Uzbekistan and Central Asia.",
    keywords: [
      "Max Healthcare India",
      "Max hospital international patient",
      "Delhi hospital for international patients",
      "treatment in India Max Healthcare",
      "medical tourism hospital Delhi India",
    ],
    overview:
      "Max Healthcare is commonly evaluated for Delhi-based treatment journeys, especially when patients want strong specialist access in oncology, cardiology, orthopedics, and surgical care with a metropolitan treatment base.",
    specialties: [
      "Oncology",
      "Cardiology",
      "Orthopedics",
      "Neurosciences",
      "Urology",
      "General Surgery",
    ],
    supportPoints: [
      "Delhi-focused treatment planning and city-based hospital coordination.",
      "Support with medical opinion requests, treatment estimate preparation, and admission planning.",
      "Structured communication for international patients before arrival in India.",
    ],
    faq: [
      {
        question: "Why do patients choose Delhi-based hospitals like Max Healthcare?",
        answer:
          "Delhi offers strong specialist access, airline connectivity, and a concentration of hospitals that support international patient treatment planning.",
      },
      {
        question: "Can Max Healthcare be considered for oncology or cardiology?",
        answer:
          "Yes. Max Healthcare is often evaluated for cancer treatment, cardiology, orthopedics, and general specialist care in India.",
      },
      {
        question: "Can MedPobeda Group help compare Max with other Delhi hospitals?",
        answer:
          "Yes. We can help compare Delhi-area hospitals such as Max, Fortis, and Medanta based on treatment type, branch suitability, and travel factors.",
      },
    ],
    relatedTreatmentPaths: [
      "/oncology-treatment-india",
      "/cardiology-treatment-india",
      "/orthopedic-treatment-india",
    ],
  },
  {
    slug: "artemis-hospital-india",
    name: "Artemis Hospitals",
    city: "Gurugram",
    trustLine: "Premium multispecialty hospital often considered for specialist-led and surgical treatment journeys.",
    h1: "Artemis Hospital India for Specialist and Surgical Care",
    title: "Artemis Hospital India | International Patient Specialist Access",
    description:
      "Review Artemis Hospital India for oncology, surgery, orthopedics, and specialist treatment planning for patients traveling from Uzbekistan and Central Asia.",
    keywords: [
      "Artemis hospital India",
      "Artemis international patient",
      "Gurugram hospital medical tourism",
      "treatment in India Artemis",
      "international patients hospital India",
    ],
    overview:
      "Artemis Hospitals is often explored for specialist and surgery-led treatment journeys in Gurugram, particularly for patients who want premium hospital positioning and coordinated international patient support.",
    specialties: [
      "Oncology",
      "Orthopedics",
      "Spine Surgery",
      "Neurosciences",
      "Urology",
      "Surgical Care",
    ],
    supportPoints: [
      "Guidance on case routing for specialist care and hospital intake.",
      "Planning support for surgery-focused patient journeys in Gurugram.",
      "International patient communication support before departure.",
    ],
    faq: [
      {
        question: "What kind of patients often explore Artemis Hospitals?",
        answer:
          "Patients with surgical, orthopedic, oncology, spine, and specialist consultation needs often review Artemis Hospitals as part of India treatment planning.",
      },
      {
        question: "Does Artemis support international patients?",
        answer:
          "Artemis is known for serving international patients and is often evaluated by families seeking structured care coordination in India.",
      },
      {
        question: "Can MedPobeda Group help prepare a case for Artemis?",
        answer:
          "Yes. We can help assemble the case summary, reports, and treatment questions before hospital communication begins.",
      },
    ],
    relatedTreatmentPaths: [
      "/orthopedic-treatment-india",
      "/neurosurgery-treatment-india",
      "/oncology-treatment-india",
    ],
  },
  {
    slug: "narayana-health-india",
    name: "Narayana Health",
    city: "Bengaluru",
    trustLine: "Large Indian hospital network often considered for cardiac, transplant, and value-conscious advanced care.",
    h1: "Narayana Health India for Cardiac and Advanced Multispecialty Care",
    title: "Narayana Health India | International Patient Hospital Access",
    description:
      "Explore Narayana Health India for cardiac care, transplant evaluation, and multispecialty treatment pathways for patients from Uzbekistan and Central Asia.",
    keywords: [
      "Narayana Health India",
      "Narayana Health international patients",
      "cardiac surgery India hospital",
      "treatment in India Narayana Health",
      "hospital in Bengaluru for international patients",
    ],
    overview:
      "Narayana Health is widely recognized for cardiac care and is also explored for transplant, oncology, and complex multispecialty treatment journeys. It is frequently considered by families who prioritize specialist depth and structured hospital planning.",
    specialties: [
      "Cardiac Surgery",
      "Pediatric Cardiac Care",
      "Kidney Care",
      "Oncology",
      "Organ Transplant",
      "General Multispecialty Care",
    ],
    supportPoints: [
      "Specialist coordination for heart care and complex treatment needs.",
      "Planning support for families seeking value-conscious advanced treatment in India.",
      "Structured communication for international patient and caregiver questions.",
    ],
    faq: [
      {
        question: "Why is Narayana Health often considered for international patients?",
        answer:
          "Narayana Health is known for strong cardiac care and advanced multispecialty treatment pathways, making it a frequent consideration for international patient planning.",
      },
      {
        question: "Is Narayana Health relevant for pediatric cardiac cases?",
        answer:
          "Yes. Narayana Health is frequently explored for pediatric cardiac and complex cardiac treatment pathways in India.",
      },
      {
        question: "Can MedPobeda Group help arrange communication with Narayana Health?",
        answer:
          "We can help families prepare treatment inquiries, route case details, and coordinate hospital-facing communication as part of India treatment planning.",
      },
    ],
    relatedTreatmentPaths: [
      "/cardiology-treatment-india",
      "/organ-transplant-india",
      "/second-medical-opinion-india",
    ],
  },
];

export function getFeaturedHospital(slug: string) {
  return featuredHospitals.find((hospital) => hospital.slug === slug) ?? null;
}
