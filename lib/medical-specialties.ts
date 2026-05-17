export type MedicalSpecialtyIconKey =
  | "radiation"
  | "brain-circuit"
  | "bone"
  | "heart-pulse"
  | "baby"
  | "venus"
  | "sparkles"
  | "scale"
  | "scan-heart"
  | "droplets"
  | "microscope";

export type MedicalSpecialty = {
  id: string;
  title: string;
  icon: MedicalSpecialtyIconKey;
  summary: string;
  description: string;
  support: [string, string, string];
  patientSupport: string;
  ctaLabel: string;
  inquiryMessage: string;
};

export const medicalSpecialties: MedicalSpecialty[] = [
  {
    id: "oncology",
    title: "Oncology",
    icon: "radiation",
    summary:
      "Advanced cancer diagnostics, treatment planning, and multidisciplinary referral coordination.",
    description:
      "MedPobeda supports cross-border oncology coordination for patients requiring specialist review, treatment sequencing, or access to complex cancer programs.",
    support: [
      "Diagnostic review and second-opinion routing",
      "Hospital communication for treatment planning",
      "Travel-readiness support for time-sensitive care",
    ],
    patientSupport:
      "International patient assistance includes case file preparation, specialist scheduling, and family-facing coordination updates.",
    ctaLabel: "Request oncology review",
    inquiryMessage:
      "Hello MedPobeda Group, I need help with an oncology treatment inquiry.",
  },
  {
    id: "neurosurgery",
    title: "Neurosurgery",
    icon: "brain-circuit",
    summary:
      "Structured access to complex neuro care, surgical opinions, and high-acuity case coordination.",
    description:
      "For patients with brain, nerve, or intricate neurological conditions, the pathway is designed around precision review and destination-hospital coordination.",
    support: [
      "Case summary packaging for specialist review",
      "Pre-travel coordination for complex neuro interventions",
      "Care-pathway communication with destination teams",
    ],
    patientSupport:
      "International patient assistance covers records organization, coordination timing, and follow-through communication with patient families.",
    ctaLabel: "Discuss neurosurgery case",
    inquiryMessage:
      "Hello MedPobeda Group, I need guidance for a neurosurgery case.",
  },
  {
    id: "spine-surgery",
    title: "Spine Surgery",
    icon: "bone",
    summary:
      "Specialist support for spinal diagnostics, surgical planning, and rehabilitation-oriented coordination.",
    description:
      "The spine surgery pathway is built for patients requiring advanced evaluation, surgical options, or structured hospital matching for spinal care.",
    support: [
      "MRI and imaging-led case review support",
      "Coordination around surgical planning and recovery needs",
      "Hospital routing based on spine specialization",
    ],
    patientSupport:
      "International patient assistance includes document readiness, scheduling guidance, and clear next-step communication.",
    ctaLabel: "Open spine surgery inquiry",
    inquiryMessage:
      "Hello MedPobeda Group, I need support for a spine surgery inquiry.",
  },
  {
    id: "cardiology",
    title: "Cardiology",
    icon: "heart-pulse",
    summary:
      "Cross-border coordination for cardiac diagnostics, interventions, and specialist-led treatment pathways.",
    description:
      "MedPobeda helps structure cardiology-related movement for patients needing diagnostic clarity, interventional access, or hospital-level cardiac support.",
    support: [
      "Specialist matching for cardiac review",
      "Planning support for interventional or surgical pathways",
      "Travel sequencing for monitored care movement",
    ],
    patientSupport:
      "International patient assistance includes document triage, destination-hospital coordination, and ongoing communication support.",
    ctaLabel: "Request cardiology consultation",
    inquiryMessage:
      "Hello MedPobeda Group, I need help with a cardiology treatment inquiry.",
  },
  {
    id: "orthopedic-surgery",
    title: "Orthopedic Surgery",
    icon: "bone",
    summary:
      "Professional coordination for joint, trauma, sports injury, and reconstructive orthopedic care.",
    description:
      "This pathway supports patients seeking orthopedic surgical review, hospital options, or a more structured approach to mobility-related interventions.",
    support: [
      "Imaging and case-detail preparation",
      "Hospital and specialist matching for orthopedic programs",
      "Travel coordination around surgery and recovery windows",
    ],
    patientSupport:
      "International patient assistance includes pre-travel planning, medical records organization, and communication around recovery expectations.",
    ctaLabel: "Start orthopedic inquiry",
    inquiryMessage:
      "Hello MedPobeda Group, I need support for an orthopedic surgery case.",
  },
  {
    id: "ivf-fertility",
    title: "IVF & Fertility",
    icon: "baby",
    summary:
      "Discreet fertility coordination with clear planning, hospital communication, and patient guidance.",
    description:
      "The IVF and fertility route is designed for patients seeking professional, privacy-conscious support across consultation, treatment planning, and travel preparation.",
    support: [
      "Treatment planning and timeline coordination",
      "Hospital communication for fertility programs",
      "Patient guidance on documentation and readiness",
    ],
    patientSupport:
      "International patient assistance emphasizes confidentiality, schedule coordination, and a smoother end-to-end planning experience.",
    ctaLabel: "Discuss fertility pathway",
    inquiryMessage:
      "Hello MedPobeda Group, I need guidance for an IVF or fertility treatment inquiry.",
  },
  {
    id: "gynecology",
    title: "Gynecology",
    icon: "venus",
    summary:
      "Women’s health pathways covering diagnostics, surgery, specialist review, and planned treatment coordination.",
    description:
      "MedPobeda helps structure gynecology-related care discussions for patients who need clearer referral pathways and more confident treatment planning.",
    support: [
      "Specialist evaluation and hospital routing",
      "Coordination for planned procedures or complex review",
      "Document preparation for cross-border consultation",
    ],
    patientSupport:
      "International patient assistance includes record organization, hospital communication, and travel-preparation guidance where needed.",
    ctaLabel: "Open gynecology inquiry",
    inquiryMessage:
      "Hello MedPobeda Group, I need support for a gynecology treatment inquiry.",
  },
  {
    id: "cosmetic-plastic-surgery",
    title: "Cosmetic & Plastic Surgery",
    icon: "sparkles",
    summary:
      "Premium pathway for aesthetic, reconstructive, and post-treatment specialist consultations.",
    description:
      "This route supports patients seeking structured access to cosmetic and plastic surgery programs with more reliable planning and professional guidance.",
    support: [
      "Pre-consultation coordination and record review",
      "Hospital communication for procedure planning",
      "Scheduling and travel-readiness guidance",
    ],
    patientSupport:
      "International patient assistance includes expectation setting, communication support, and smoother coordination across the treatment journey.",
    ctaLabel: "Discuss plastic surgery route",
    inquiryMessage:
      "Hello MedPobeda Group, I need guidance for a cosmetic or plastic surgery inquiry.",
  },
  {
    id: "bariatric-weight-loss",
    title: "Bariatric & Weight Loss",
    icon: "scale",
    summary:
      "Specialist-led access to metabolic surgery pathways and long-horizon weight management planning.",
    description:
      "MedPobeda coordinates bariatric and weight-loss related inquiries for patients who need clinical review, destination-hospital access, or structured pre-travel planning.",
    support: [
      "Eligibility-focused case intake support",
      "Destination-hospital coordination for bariatric programs",
      "Planning guidance across surgery and follow-up phases",
    ],
    patientSupport:
      "International patient assistance includes medical record preparation, travel sequencing, and communication around program timelines.",
    ctaLabel: "Request bariatric support",
    inquiryMessage:
      "Hello MedPobeda Group, I need support for a bariatric or weight loss treatment inquiry.",
  },
  {
    id: "liver-transplant",
    title: "Liver Transplant",
    icon: "scan-heart",
    summary:
      "High-trust transplant coordination built for complex evaluation, specialist review, and hospital-level planning.",
    description:
      "For liver transplant pathways, MedPobeda focuses on disciplined case presentation, destination-hospital communication, and family-aware support around next steps.",
    support: [
      "Complex case review routing to transplant teams",
      "Structured communication for transplant planning",
      "Travel-readiness support for advanced care movement",
    ],
    patientSupport:
      "International patient assistance includes documentation support, hospital liaison communication, and clear updates for patients and families.",
    ctaLabel: "Discuss liver transplant case",
    inquiryMessage:
      "Hello MedPobeda Group, I need guidance for a liver transplant inquiry.",
  },
  {
    id: "kidney-transplant",
    title: "Kidney Transplant",
    icon: "droplets",
    summary:
      "Professional coordination for renal transplant evaluation, specialist review, and destination-hospital planning.",
    description:
      "The kidney transplant route is designed for patients and families needing a more structured pathway into advanced renal care and transplant-focused hospital systems.",
    support: [
      "Record packaging for renal and transplant review",
      "Hospital communication around transplant pathways",
      "Travel coordination for complex treatment movement",
    ],
    patientSupport:
      "International patient assistance includes scheduling support, document preparation, and patient-family communication across the process.",
    ctaLabel: "Open kidney transplant inquiry",
    inquiryMessage:
      "Hello MedPobeda Group, I need support for a kidney transplant inquiry.",
  },
  {
    id: "bone-marrow-transplant",
    title: "Bone Marrow Transplant",
    icon: "microscope",
    summary:
      "Specialized coordination for hematology-driven review, transplant planning, and international care sequencing.",
    description:
      "MedPobeda supports bone marrow transplant inquiries through careful case framing, specialist routing, and structured communication with destination programs.",
    support: [
      "Complex record review and specialist matching",
      "Hospital coordination for hematology and transplant programs",
      "Planning guidance for family, travel, and follow-through",
    ],
    patientSupport:
      "International patient assistance includes case preparation, cross-border coordination, and clear communication for time-sensitive treatment journeys.",
    ctaLabel: "Request BMT coordination",
    inquiryMessage:
      "Hello MedPobeda Group, I need guidance for a bone marrow transplant inquiry.",
  },
];
