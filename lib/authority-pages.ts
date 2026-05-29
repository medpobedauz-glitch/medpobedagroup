import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Building2,
  ClipboardList,
  FileSearch,
  HeartHandshake,
  HeartPulse,
  Hospital,
  Plane,
  ShieldCheck,
  Stethoscope,
  Users,
} from "lucide-react";

type VisualRef = {
  category: string;
  slug: string;
  alt: string;
};

type AuthorityPageConfig = {
  routeKey:
    | "treatment-in-india"
    | "kims-hospitals-india"
    | "medical-visa-support"
    | "second-medical-opinion"
    | "oncology-referrals"
    | "cardiology-referrals"
    | "organ-transplant-coordination"
    | "air-ambulance-coordination";
  path: string;
  icon: LucideIcon;
  heroImages: [VisualRef, VisualRef, VisualRef];
  overviewImage: VisualRef;
  overviewIcons: [LucideIcon, LucideIcon, LucideIcon, LucideIcon];
  cardVisual: VisualRef;
  ctaImage: VisualRef;
  related: AuthorityPageId[];
  secondaryCtaHref: string;
  secondaryCtaVariant: "contact" | "partnerships";
};

export const authorityPageIds = [
  "treatmentInIndia",
  "kimsHospitalsIndia",
  "medicalVisaSupport",
  "secondMedicalOpinion",
  "oncologyReferrals",
  "cardiologyReferrals",
  "organTransplantCoordination",
  "airAmbulanceCoordination",
] as const;

export type AuthorityPageId = (typeof authorityPageIds)[number];

export const authorityPageConfigs: Record<AuthorityPageId, AuthorityPageConfig> = {
  treatmentInIndia: {
    routeKey: "treatment-in-india",
    path: "/treatment-in-india",
    icon: Plane,
    heroImages: [
      {
        category: "medical-tourism-hero",
        slug: "doctor-patient-consultation",
        alt: "Doctor discussing treatment planning with an international patient.",
      },
      {
        category: "medical-tourism-hero",
        slug: "hospital-campus",
        alt: "Modern hospital campus connected to cross-border treatment access.",
      },
      {
        category: "medical-tourism-hero",
        slug: "airport-patient-support",
        alt: "Medical travel support during an international patient journey.",
      },
    ],
    overviewImage: {
      category: "medical-tourism-trust",
      slug: "care-coordination-meeting",
      alt: "Healthcare coordination meeting focused on treatment access in India.",
    },
    overviewIcons: [FileSearch, Stethoscope, ClipboardList, HeartHandshake],
    cardVisual: {
      category: "medical-tourism-inner",
      slug: "treatment-planning",
      alt: "Treatment planning for an international patient pathway.",
    },
    ctaImage: {
      category: "medical-tourism-cta",
      slug: "patient-consultation-meeting",
      alt: "Patient consultation meeting for treatment planning in India.",
    },
    related: ["secondMedicalOpinion", "medicalVisaSupport", "oncologyReferrals"],
    secondaryCtaHref: "/contact",
    secondaryCtaVariant: "contact",
  },
  kimsHospitalsIndia: {
    routeKey: "kims-hospitals-india",
    path: "/kims-hospitals-india",
    icon: Building2,
    heroImages: [
      {
        category: "partnerships-hero",
        slug: "executive-partnership-meeting",
        alt: "Healthcare leaders discussing institutional collaboration.",
      },
      {
        category: "partnerships-hero",
        slug: "premium-hospital-building",
        alt: "Premium hospital building representing large multi-specialty access in India.",
      },
      {
        category: "partnerships-hero",
        slug: "doctor-collaboration-roundtable",
        alt: "Doctors discussing international specialist collaboration.",
      },
    ],
    overviewImage: {
      category: "partnerships-trust",
      slug: "hospital-leadership-briefing",
      alt: "Hospital leadership briefing for strategic healthcare partnership planning.",
    },
    overviewIcons: [Hospital, ShieldCheck, Users, HeartHandshake],
    cardVisual: {
      category: "partnerships",
      slug: "hospital-partner-growth",
      alt: "International hospital growth and patient access planning.",
    },
    ctaImage: {
      category: "partnerships-cta",
      slug: "hospital-growth-conversation",
      alt: "Strategic hospital growth discussion with MedPobeda Group.",
    },
    related: ["treatmentInIndia", "secondMedicalOpinion", "medicalVisaSupport"],
    secondaryCtaHref: "/hospital-partnerships",
    secondaryCtaVariant: "partnerships",
  },
  medicalVisaSupport: {
    routeKey: "medical-visa-support",
    path: "/medical-visa-support",
    icon: ClipboardList,
    heroImages: [
      {
        category: "medical-tourism-inner",
        slug: "visa-travel-guidance",
        alt: "Travel documentation support for a medical journey.",
      },
      {
        category: "patients",
        slug: "travel-and-stay-support",
        alt: "Travel and stay planning for an international healthcare trip.",
      },
      {
        category: "home-hero",
        slug: "airport-patient-assistance",
        alt: "Arrival assistance during a cross-border treatment trip.",
      },
    ],
    overviewImage: {
      category: "medical-tourism-story",
      slug: "coordinator-patient-family",
      alt: "Care coordinator guiding a family through treatment travel preparation.",
    },
    overviewIcons: [ClipboardList, Plane, ShieldCheck, HeartHandshake],
    cardVisual: {
      category: "medical-tourism-inner",
      slug: "visa-travel-guidance",
      alt: "Medical visa guidance and travel document review.",
    },
    ctaImage: {
      category: "medical-tourism-cta",
      slug: "patient-consultation-meeting",
      alt: "Consultation meeting for medical travel and visa planning.",
    },
    related: ["treatmentInIndia", "airAmbulanceCoordination", "secondMedicalOpinion"],
    secondaryCtaHref: "/contact",
    secondaryCtaVariant: "contact",
  },
  secondMedicalOpinion: {
    routeKey: "second-medical-opinion",
    path: "/second-medical-opinion",
    icon: FileSearch,
    heroImages: [
      {
        category: "medical-tourism-inner",
        slug: "report-review",
        alt: "Clinical records under review for a second medical opinion request.",
      },
      {
        category: "patients",
        slug: "doctor-selection",
        alt: "Doctor selection support for specialist review.",
      },
      {
        category: "about-inner",
        slug: "clinical-relevance",
        alt: "Doctors reviewing clinical information and treatment options.",
      },
    ],
    overviewImage: {
      category: "medical-tourism-story",
      slug: "diagnostics-review",
      alt: "Diagnostic review meeting for a second medical opinion pathway.",
    },
    overviewIcons: [FileSearch, Stethoscope, ClipboardList, ShieldCheck],
    cardVisual: {
      category: "medical-tourism-inner",
      slug: "report-review",
      alt: "Medical report review and specialist routing.",
    },
    ctaImage: {
      category: "contact-cta",
      slug: "healthcare-guidance-conversation",
      alt: "Healthcare guidance conversation for a second opinion discussion.",
    },
    related: ["treatmentInIndia", "oncologyReferrals", "cardiologyReferrals"],
    secondaryCtaHref: "/contact",
    secondaryCtaVariant: "contact",
  },
  oncologyReferrals: {
    routeKey: "oncology-referrals",
    path: "/oncology-referrals",
    icon: Activity,
    heroImages: [
      {
        category: "specialties",
        slug: "oncology",
        alt: "Oncology consultation and treatment planning discussion.",
      },
      {
        category: "medical-tourism-inner",
        slug: "report-review",
        alt: "Cancer case records reviewed for specialist routing.",
      },
      {
        category: "patients",
        slug: "family-health-support",
        alt: "Family receiving support around complex cancer care planning.",
      },
    ],
    overviewImage: {
      category: "patients",
      slug: "treatment-guidance",
      alt: "Treatment guidance discussion for an oncology inquiry.",
    },
    overviewIcons: [FileSearch, Hospital, HeartHandshake, ShieldCheck],
    cardVisual: {
      category: "specialties",
      slug: "oncology",
      alt: "Oncology specialist consultation setting.",
    },
    ctaImage: {
      category: "medical-tourism-cta",
      slug: "patient-consultation-meeting",
      alt: "Cancer care planning discussion with an international patient family.",
    },
    related: ["secondMedicalOpinion", "treatmentInIndia", "organTransplantCoordination"],
    secondaryCtaHref: "/contact",
    secondaryCtaVariant: "contact",
  },
  cardiologyReferrals: {
    routeKey: "cardiology-referrals",
    path: "/cardiology-referrals",
    icon: HeartPulse,
    heroImages: [
      {
        category: "specialties",
        slug: "cardiology",
        alt: "Cardiology consultation in a modern specialist environment.",
      },
      {
        category: "patients",
        slug: "doctor-selection",
        alt: "Cardiology specialist selection support.",
      },
      {
        category: "medical-tourism-inner",
        slug: "treatment-planning",
        alt: "Treatment planning for a cardiology pathway.",
      },
    ],
    overviewImage: {
      category: "patients",
      slug: "hospital-appointment",
      alt: "Hospital appointment planning for an advanced cardiology case.",
    },
    overviewIcons: [FileSearch, Stethoscope, Hospital, ShieldCheck],
    cardVisual: {
      category: "specialties",
      slug: "cardiology",
      alt: "Cardiology consultation and referral support.",
    },
    ctaImage: {
      category: "medical-tourism-cta",
      slug: "patient-consultation-meeting",
      alt: "Cardiology treatment planning discussion for an international patient.",
    },
    related: ["secondMedicalOpinion", "treatmentInIndia", "medicalVisaSupport"],
    secondaryCtaHref: "/contact",
    secondaryCtaVariant: "contact",
  },
  organTransplantCoordination: {
    routeKey: "organ-transplant-coordination",
    path: "/organ-transplant-coordination",
    icon: HeartHandshake,
    heroImages: [
      {
        category: "gallery",
        slug: "operating-theatre-prep",
        alt: "Advanced operating theatre preparation for a complex care case.",
      },
      {
        category: "medical-tourism-inner",
        slug: "report-review",
        alt: "Clinical documentation being reviewed for a transplant pathway.",
      },
      {
        category: "patients",
        slug: "family-health-support",
        alt: "Family support during a complex transplant-related discussion.",
      },
    ],
    overviewImage: {
      category: "specialties",
      slug: "general-surgery",
      alt: "Advanced surgical support environment relevant to complex transplant planning.",
    },
    overviewIcons: [FileSearch, Hospital, ShieldCheck, HeartHandshake],
    cardVisual: {
      category: "gallery",
      slug: "operating-theatre-prep",
      alt: "Specialist surgical environment for complex international care planning.",
    },
    ctaImage: {
      category: "contact-cta",
      slug: "healthcare-guidance-conversation",
      alt: "Transplant inquiry discussion with a healthcare coordinator.",
    },
    related: ["secondMedicalOpinion", "oncologyReferrals", "treatmentInIndia"],
    secondaryCtaHref: "/contact",
    secondaryCtaVariant: "contact",
  },
  airAmbulanceCoordination: {
    routeKey: "air-ambulance-coordination",
    path: "/air-ambulance-coordination",
    icon: ShieldCheck,
    heroImages: [
      {
        category: "specialties",
        slug: "emergency-care",
        alt: "Emergency care team supporting urgent patient transfer planning.",
      },
      {
        category: "gallery",
        slug: "airport-wheelchair-assist",
        alt: "Mobility assistance during a high-dependency medical travel route.",
      },
      {
        category: "medical-tourism-hero",
        slug: "airport-patient-support",
        alt: "Airport support during an urgent international healthcare journey.",
      },
    ],
    overviewImage: {
      category: "gallery",
      slug: "medical-airport-arrival",
      alt: "Medical arrival logistics coordinated with patient transport assistance.",
    },
    overviewIcons: [ShieldCheck, Plane, Hospital, Users],
    cardVisual: {
      category: "specialties",
      slug: "emergency-care",
      alt: "Urgent transfer planning and medical travel coordination.",
    },
    ctaImage: {
      category: "medical-tourism-cta",
      slug: "patient-consultation-meeting",
      alt: "Urgent case discussion for medical transport planning.",
    },
    related: ["medicalVisaSupport", "treatmentInIndia", "secondMedicalOpinion"],
    secondaryCtaHref: "/contact",
    secondaryCtaVariant: "contact",
  },
};

export const authorityPageIdsForMedicalTourismHub: AuthorityPageId[] = [
  "treatmentInIndia",
  "secondMedicalOpinion",
  "medicalVisaSupport",
  "oncologyReferrals",
  "cardiologyReferrals",
  "organTransplantCoordination",
  "airAmbulanceCoordination",
  "kimsHospitalsIndia",
];
