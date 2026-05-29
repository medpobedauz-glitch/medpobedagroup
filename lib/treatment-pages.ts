import type { LucideIcon } from "lucide-react";
import {
  Bone,
  Brain,
  FileSearch,
  HeartPulse,
  Microscope,
  ShieldCheck,
  Stethoscope,
  Plane,
} from "lucide-react";

import type { AuthorityPageId } from "@/lib/authority-pages";

type VisualRef = {
  category: string;
  slug: string;
  alt: string;
};

type TreatmentPageConfig = {
  routeKey:
    | "oncology-treatment-india"
    | "cardiology-treatment-india"
    | "organ-transplant-india"
    | "neurosurgery-treatment-india"
    | "orthopedic-treatment-india"
    | "second-medical-opinion-india";
  path: string;
  icon: LucideIcon;
  heroImages: [VisualRef, VisualRef, VisualRef];
  overviewImage: VisualRef;
  overviewIcons: [LucideIcon, LucideIcon, LucideIcon, LucideIcon];
  cardVisual: VisualRef;
  ctaImage: VisualRef;
  relatedTreatments: TreatmentPageId[];
  relatedAuthorities: AuthorityPageId[];
};

export const treatmentPageIds = [
  "oncologyTreatmentIndia",
  "cardiologyTreatmentIndia",
  "organTransplantIndia",
  "neurosurgeryTreatmentIndia",
  "orthopedicTreatmentIndia",
  "secondMedicalOpinionIndia",
] as const;

export type TreatmentPageId = (typeof treatmentPageIds)[number];

export const treatmentPageConfigs: Record<TreatmentPageId, TreatmentPageConfig> = {
  oncologyTreatmentIndia: {
    routeKey: "oncology-treatment-india",
    path: "/oncology-treatment-india",
    icon: Microscope,
    heroImages: [
      {
        category: "specialties",
        slug: "oncology",
        alt: "Oncology consultation and patient care planning in a specialist setting.",
      },
      {
        category: "medical-tourism-story",
        slug: "diagnostics-review",
        alt: "Diagnostic review meeting for oncology treatment planning in India.",
      },
      {
        category: "gallery",
        slug: "family-consultation",
        alt: "Family consultation supporting an oncology treatment discussion abroad.",
      },
    ],
    overviewImage: {
      category: "specialties",
      slug: "oncology",
      alt: "Oncology treatment discussion supported by MedPobeda Group.",
    },
    overviewIcons: [FileSearch, Stethoscope, Plane, ShieldCheck],
    cardVisual: {
      category: "specialties",
      slug: "oncology",
      alt: "Oncology treatment access in India for international patients.",
    },
    ctaImage: {
      category: "contact-cta",
      slug: "healthcare-guidance-conversation",
      alt: "Healthcare guidance conversation for an oncology treatment inquiry.",
    },
    relatedTreatments: [
      "secondMedicalOpinionIndia",
      "organTransplantIndia",
      "neurosurgeryTreatmentIndia",
    ],
    relatedAuthorities: [
      "oncologyReferrals",
      "secondMedicalOpinion",
      "medicalVisaSupport",
      "treatmentInIndia",
    ],
  },
  cardiologyTreatmentIndia: {
    routeKey: "cardiology-treatment-india",
    path: "/cardiology-treatment-india",
    icon: HeartPulse,
    heroImages: [
      {
        category: "specialties",
        slug: "cardiology",
        alt: "Cardiology consultation in a modern clinical setting.",
      },
      {
        category: "gallery",
        slug: "doctor-rounds",
        alt: "Cardiology-related discussion with doctors and care coordinators.",
      },
      {
        category: "medical-tourism-inner",
        slug: "treatment-planning",
        alt: "Treatment planning discussion for a cardiology patient traveling to India.",
      },
    ],
    overviewImage: {
      category: "specialties",
      slug: "cardiology",
      alt: "Cardiology planning and specialist access discussion.",
    },
    overviewIcons: [HeartPulse, FileSearch, Plane, ShieldCheck],
    cardVisual: {
      category: "specialties",
      slug: "cardiology",
      alt: "Cardiology treatment in India for patients from Uzbekistan and Central Asia.",
    },
    ctaImage: {
      category: "medical-tourism-cta",
      slug: "patient-consultation-meeting",
      alt: "Patient consultation for cardiology treatment planning in India.",
    },
    relatedTreatments: [
      "oncologyTreatmentIndia",
      "secondMedicalOpinionIndia",
      "orthopedicTreatmentIndia",
    ],
    relatedAuthorities: [
      "cardiologyReferrals",
      "secondMedicalOpinion",
      "medicalVisaSupport",
      "treatmentInIndia",
    ],
  },
  organTransplantIndia: {
    routeKey: "organ-transplant-india",
    path: "/organ-transplant-india",
    icon: ShieldCheck,
    heroImages: [
      {
        category: "specialties",
        slug: "general-surgery",
        alt: "Advanced surgical environment relevant to organ transplant discussions.",
      },
      {
        category: "medical-tourism-story",
        slug: "diagnostics-review",
        alt: "Clinical diagnostics review for a transplant-related treatment pathway.",
      },
      {
        category: "gallery",
        slug: "operating-theatre-prep",
        alt: "Surgical team preparing for advanced treatment support.",
      },
    ],
    overviewImage: {
      category: "specialties",
      slug: "general-surgery",
      alt: "Surgical environment connected to transplant pathway planning.",
    },
    overviewIcons: [FileSearch, ShieldCheck, Plane, Stethoscope],
    cardVisual: {
      category: "specialties",
      slug: "general-surgery",
      alt: "Organ transplant pathway planning in India for international patients.",
    },
    ctaImage: {
      category: "contact-cta",
      slug: "healthcare-guidance-conversation",
      alt: "Healthcare guidance conversation for an organ transplant inquiry.",
    },
    relatedTreatments: [
      "oncologyTreatmentIndia",
      "neurosurgeryTreatmentIndia",
      "secondMedicalOpinionIndia",
    ],
    relatedAuthorities: [
      "organTransplantCoordination",
      "secondMedicalOpinion",
      "medicalVisaSupport",
      "treatmentInIndia",
    ],
  },
  neurosurgeryTreatmentIndia: {
    routeKey: "neurosurgery-treatment-india",
    path: "/neurosurgery-treatment-india",
    icon: Brain,
    heroImages: [
      {
        category: "specialties",
        slug: "neurosurgery",
        alt: "Neurosurgery planning and advanced operating room support.",
      },
      {
        category: "specialties",
        slug: "diagnostics",
        alt: "Advanced diagnostics support relevant to neurosurgery case planning.",
      },
      {
        category: "medical-tourism-inner",
        slug: "report-review",
        alt: "Medical report review for a neurosurgery treatment discussion.",
      },
    ],
    overviewImage: {
      category: "specialties",
      slug: "neurosurgery",
      alt: "Neurosurgery pathway discussion for treatment in India.",
    },
    overviewIcons: [Brain, FileSearch, Plane, ShieldCheck],
    cardVisual: {
      category: "specialties",
      slug: "neurosurgery",
      alt: "Neurosurgery treatment planning in India for international patients.",
    },
    ctaImage: {
      category: "medical-tourism-cta",
      slug: "patient-consultation-meeting",
      alt: "Patient consultation for neurosurgery treatment planning in India.",
    },
    relatedTreatments: [
      "organTransplantIndia",
      "oncologyTreatmentIndia",
      "secondMedicalOpinionIndia",
    ],
    relatedAuthorities: [
      "secondMedicalOpinion",
      "medicalVisaSupport",
      "airAmbulanceCoordination",
      "treatmentInIndia",
    ],
  },
  orthopedicTreatmentIndia: {
    routeKey: "orthopedic-treatment-india",
    path: "/orthopedic-treatment-india",
    icon: Bone,
    heroImages: [
      {
        category: "specialties",
        slug: "orthopedics",
        alt: "Orthopedic recovery and mobility-focused treatment support.",
      },
      {
        category: "gallery",
        slug: "rehabilitation-session",
        alt: "Rehabilitation session related to orthopedic treatment planning.",
      },
      {
        category: "patients",
        slug: "treatment-guidance",
        alt: "Treatment guidance conversation for an orthopedic case.",
      },
    ],
    overviewImage: {
      category: "specialties",
      slug: "orthopedics",
      alt: "Orthopedic treatment and recovery discussion for treatment in India.",
    },
    overviewIcons: [Bone, Stethoscope, Plane, ShieldCheck],
    cardVisual: {
      category: "specialties",
      slug: "orthopedics",
      alt: "Orthopedic treatment in India for patients from Central Asia.",
    },
    ctaImage: {
      category: "contact-cta",
      slug: "healthcare-guidance-conversation",
      alt: "Healthcare guidance conversation for an orthopedic treatment inquiry.",
    },
    relatedTreatments: [
      "cardiologyTreatmentIndia",
      "neurosurgeryTreatmentIndia",
      "secondMedicalOpinionIndia",
    ],
    relatedAuthorities: [
      "secondMedicalOpinion",
      "medicalVisaSupport",
      "airAmbulanceCoordination",
      "treatmentInIndia",
    ],
  },
  secondMedicalOpinionIndia: {
    routeKey: "second-medical-opinion-india",
    path: "/second-medical-opinion-india",
    icon: FileSearch,
    heroImages: [
      {
        category: "medical-tourism-inner",
        slug: "report-review",
        alt: "Medical report review for an India-focused second opinion pathway.",
      },
      {
        category: "specialties",
        slug: "diagnostics",
        alt: "Advanced diagnostics review for a second medical opinion request.",
      },
      {
        category: "patients",
        slug: "doctor-selection",
        alt: "Doctor selection support for an India-focused second opinion discussion.",
      },
    ],
    overviewImage: {
      category: "medical-tourism-story",
      slug: "diagnostics-review",
      alt: "Second medical opinion planning and diagnostic review for India treatment access.",
    },
    overviewIcons: [FileSearch, Stethoscope, Plane, ShieldCheck],
    cardVisual: {
      category: "medical-tourism-inner",
      slug: "report-review",
      alt: "Second medical opinion in India for international patients.",
    },
    ctaImage: {
      category: "contact-cta",
      slug: "healthcare-guidance-conversation",
      alt: "Healthcare guidance discussion for a second opinion request.",
    },
    relatedTreatments: [
      "oncologyTreatmentIndia",
      "cardiologyTreatmentIndia",
      "neurosurgeryTreatmentIndia",
    ],
    relatedAuthorities: [
      "secondMedicalOpinion",
      "treatmentInIndia",
      "medicalVisaSupport",
      "kimsHospitalsIndia",
    ],
  },
};

export const treatmentPageIdsForHub: TreatmentPageId[] = [...treatmentPageIds];
export const treatmentPageIdsForIndiaPage: TreatmentPageId[] = [...treatmentPageIds];
export const treatmentAuthorityPageIdsForHub: AuthorityPageId[] = [
  "treatmentInIndia",
  "secondMedicalOpinion",
  "medicalVisaSupport",
  "kimsHospitalsIndia",
];

export const treatmentHubHeroIcons: LucideIcon[] = [
  Microscope,
  HeartPulse,
  Brain,
  Bone,
  ShieldCheck,
  FileSearch,
  Stethoscope,
  Plane,
];
