import type { LucideIcon } from "lucide-react";
import {
  Globe2,
  HeartHandshake,
  Languages,
  MapPin,
  Plane,
  ShieldCheck,
  Stethoscope,
  Users,
} from "lucide-react";

import type { AuthorityPageId } from "@/lib/authority-pages";

type VisualRef = {
  category: string;
  slug: string;
  alt: string;
};

type LocationPageConfig = {
  routeKey:
    | "medical-tourism-uzbekistan"
    | "treatment-in-india-from-uzbekistan"
    | "medical-tourism-tashkent"
    | "treatment-in-india-from-kazakhstan"
    | "treatment-in-india-from-kyrgyzstan"
    | "treatment-in-india-from-tajikistan";
  path: string;
  icon: LucideIcon;
  heroImages: [VisualRef, VisualRef, VisualRef];
  overviewImage: VisualRef;
  overviewIcons: [LucideIcon, LucideIcon, LucideIcon, LucideIcon];
  cardVisual: VisualRef;
  ctaImage: VisualRef;
  relatedLocations: LocationPageId[];
  relatedAuthorities: AuthorityPageId[];
  secondaryCtaHref: string;
};

export const locationPageIds = [
  "medicalTourismUzbekistan",
  "treatmentInIndiaFromUzbekistan",
  "medicalTourismTashkent",
  "treatmentInIndiaFromKazakhstan",
  "treatmentInIndiaFromKyrgyzstan",
  "treatmentInIndiaFromTajikistan",
] as const;

export type LocationPageId = (typeof locationPageIds)[number];

export const locationPageConfigs: Record<LocationPageId, LocationPageConfig> = {
  medicalTourismUzbekistan: {
    routeKey: "medical-tourism-uzbekistan",
    path: "/medical-tourism-uzbekistan",
    icon: Globe2,
    heroImages: [
      {
        category: "gallery",
        slug: "uzbekistan-healthcare-bridge",
        alt: "Uzbekistan healthcare bridge visual centered on Tashkent.",
      },
      {
        category: "medical-tourism-hero",
        slug: "doctor-patient-consultation",
        alt: "Doctor discussing treatment pathways with an international patient from Uzbekistan.",
      },
      {
        category: "medical-tourism-hero",
        slug: "hospital-campus",
        alt: "Modern hospital campus connected to medical tourism from Uzbekistan.",
      },
    ],
    overviewImage: {
      category: "regions",
      slug: "global-healthcare-bridge",
      alt: "India Uzbekistan healthcare network for structured patient communication.",
    },
    overviewIcons: [MapPin, Stethoscope, ShieldCheck, Users],
    cardVisual: {
      category: "gallery",
      slug: "uzbekistan-healthcare-bridge",
      alt: "Healthcare bridge between Uzbekistan and international hospital systems.",
    },
    ctaImage: {
      category: "medical-tourism-cta",
      slug: "patient-consultation-meeting",
      alt: "International patient consultation meeting in Tashkent.",
    },
    relatedLocations: [
      "treatmentInIndiaFromUzbekistan",
      "medicalTourismTashkent",
      "treatmentInIndiaFromKazakhstan",
    ],
    relatedAuthorities: [
      "treatmentInIndia",
      "kimsHospitalsIndia",
      "medicalVisaSupport",
      "secondMedicalOpinion",
    ],
    secondaryCtaHref: "/international-patient-care",
  },
  treatmentInIndiaFromUzbekistan: {
    routeKey: "treatment-in-india-from-uzbekistan",
    path: "/treatment-in-india-from-uzbekistan",
    icon: Plane,
    heroImages: [
      {
        category: "medical-tourism-inner",
        slug: "treatment-planning",
        alt: "Treatment planning discussion for a patient traveling from Uzbekistan to India.",
      },
      {
        category: "medical-tourism-inner",
        slug: "visa-travel-guidance",
        alt: "Travel and visa planning for treatment in India from Uzbekistan.",
      },
      {
        category: "medical-tourism-hero",
        slug: "hospital-campus",
        alt: "Indian hospital campus relevant to patients from Uzbekistan.",
      },
    ],
    overviewImage: {
      category: "medical-tourism-trust",
      slug: "care-coordination-meeting",
      alt: "Treatment planning coordination for India-bound patients from Uzbekistan.",
    },
    overviewIcons: [Stethoscope, Plane, Languages, HeartHandshake],
    cardVisual: {
      category: "medical-tourism-inner",
      slug: "treatment-planning",
      alt: "Treatment in India planning for patients in Uzbekistan.",
    },
    ctaImage: {
      category: "medical-tourism-cta",
      slug: "patient-consultation-meeting",
      alt: "Patient consultation about treatment in India from Uzbekistan.",
    },
    relatedLocations: [
      "medicalTourismUzbekistan",
      "medicalTourismTashkent",
      "treatmentInIndiaFromKazakhstan",
    ],
    relatedAuthorities: [
      "treatmentInIndia",
      "kimsHospitalsIndia",
      "medicalVisaSupport",
      "secondMedicalOpinion",
    ],
    secondaryCtaHref: "/international-patient-care",
  },
  medicalTourismTashkent: {
    routeKey: "medical-tourism-tashkent",
    path: "/medical-tourism-tashkent",
    icon: MapPin,
    heroImages: [
      {
        category: "contact-trust",
        slug: "tashkent-coordination-base",
        alt: "Tashkent skyline representing a local healthcare coordination base.",
      },
      {
        category: "medical-tourism-story",
        slug: "coordinator-patient-family",
        alt: "Tashkent-based coordinator assisting a patient family.",
      },
      {
        category: "medical-tourism-hero",
        slug: "airport-patient-support",
        alt: "Medical travel support connected to a Tashkent coordination route.",
      },
    ],
    overviewImage: {
      category: "contact-trust",
      slug: "tashkent-coordination-base",
      alt: "Tashkent-based healthcare communication office.",
    },
    overviewIcons: [MapPin, ShieldCheck, Languages, Users],
    cardVisual: {
      category: "contact-trust",
      slug: "tashkent-coordination-base",
      alt: "Tashkent-centered healthcare inquiry route.",
    },
    ctaImage: {
      category: "contact-cta",
      slug: "healthcare-guidance-conversation",
      alt: "Healthcare guidance conversation with a Tashkent-based team.",
    },
    relatedLocations: [
      "medicalTourismUzbekistan",
      "treatmentInIndiaFromUzbekistan",
      "treatmentInIndiaFromKyrgyzstan",
    ],
    relatedAuthorities: [
      "medicalVisaSupport",
      "secondMedicalOpinion",
      "treatmentInIndia",
      "kimsHospitalsIndia",
    ],
    secondaryCtaHref: "/international-patient-care",
  },
  treatmentInIndiaFromKazakhstan: {
    routeKey: "treatment-in-india-from-kazakhstan",
    path: "/treatment-in-india-from-kazakhstan",
    icon: Globe2,
    heroImages: [
      {
        category: "regions",
        slug: "global-healthcare-bridge",
        alt: "Central Asia healthcare bridge relevant to Kazakhstan and India.",
      },
      {
        category: "medical-tourism-hero",
        slug: "hospital-campus",
        alt: "Hospital campus connected to treatment planning from Kazakhstan.",
      },
      {
        category: "patients",
        slug: "travel-and-stay-support",
        alt: "Travel and stay planning for a patient from Kazakhstan seeking treatment in India.",
      },
    ],
    overviewImage: {
      category: "patients",
      slug: "medical-coordinator-desk",
      alt: "Medical coordinator handling cross-border patient communication for Kazakhstan.",
    },
    overviewIcons: [Users, Stethoscope, Plane, ShieldCheck],
    cardVisual: {
      category: "regions",
      slug: "global-healthcare-bridge",
      alt: "Treatment in India route for patients from Kazakhstan.",
    },
    ctaImage: {
      category: "medical-tourism-cta",
      slug: "patient-consultation-meeting",
      alt: "Cross-border treatment planning discussion for a patient from Kazakhstan.",
    },
    relatedLocations: [
      "medicalTourismUzbekistan",
      "treatmentInIndiaFromKyrgyzstan",
      "treatmentInIndiaFromTajikistan",
    ],
    relatedAuthorities: [
      "treatmentInIndia",
      "medicalVisaSupport",
      "cardiologyReferrals",
      "oncologyReferrals",
    ],
    secondaryCtaHref: "/international-patient-care",
  },
  treatmentInIndiaFromKyrgyzstan: {
    routeKey: "treatment-in-india-from-kyrgyzstan",
    path: "/treatment-in-india-from-kyrgyzstan",
    icon: Languages,
    heroImages: [
      {
        category: "regions",
        slug: "global-healthcare-bridge",
        alt: "Central Asia healthcare bridge relevant to Kyrgyzstan and India.",
      },
      {
        category: "patients",
        slug: "doctor-selection",
        alt: "Doctor selection support for a patient from Kyrgyzstan planning treatment in India.",
      },
      {
        category: "medical-tourism-inner",
        slug: "visa-travel-guidance",
        alt: "Travel document planning for treatment in India from Kyrgyzstan.",
      },
    ],
    overviewImage: {
      category: "medical-tourism-story",
      slug: "diagnostics-review",
      alt: "Diagnostic review and case discussion for a patient from Kyrgyzstan.",
    },
    overviewIcons: [Languages, Stethoscope, Plane, HeartHandshake],
    cardVisual: {
      category: "patients",
      slug: "doctor-selection",
      alt: "Treatment in India route for Kyrgyzstan patients.",
    },
    ctaImage: {
      category: "contact-cta",
      slug: "healthcare-guidance-conversation",
      alt: "Healthcare guidance discussion for a Kyrgyzstan treatment inquiry.",
    },
    relatedLocations: [
      "medicalTourismUzbekistan",
      "treatmentInIndiaFromKazakhstan",
      "treatmentInIndiaFromTajikistan",
    ],
    relatedAuthorities: [
      "treatmentInIndia",
      "secondMedicalOpinion",
      "medicalVisaSupport",
      "organTransplantCoordination",
    ],
    secondaryCtaHref: "/international-patient-care",
  },
  treatmentInIndiaFromTajikistan: {
    routeKey: "treatment-in-india-from-tajikistan",
    path: "/treatment-in-india-from-tajikistan",
    icon: HeartHandshake,
    heroImages: [
      {
        category: "regions",
        slug: "global-healthcare-bridge",
        alt: "Central Asia healthcare bridge relevant to Tajikistan and India.",
      },
      {
        category: "patients",
        slug: "family-health-support",
        alt: "Family support discussion for treatment in India from Tajikistan.",
      },
      {
        category: "medical-tourism-inner",
        slug: "treatment-planning",
        alt: "Treatment pathway planning for a patient traveling from Tajikistan to India.",
      },
    ],
    overviewImage: {
      category: "patients",
      slug: "follow-up-coordination",
      alt: "Follow-up communication for a Tajikistan patient seeking treatment in India.",
    },
    overviewIcons: [HeartHandshake, Stethoscope, Plane, ShieldCheck],
    cardVisual: {
      category: "patients",
      slug: "family-health-support",
      alt: "Treatment in India route for Tajikistan families.",
    },
    ctaImage: {
      category: "medical-tourism-cta",
      slug: "patient-consultation-meeting",
      alt: "Patient family consultation about treatment in India from Tajikistan.",
    },
    relatedLocations: [
      "medicalTourismUzbekistan",
      "treatmentInIndiaFromKazakhstan",
      "treatmentInIndiaFromKyrgyzstan",
    ],
    relatedAuthorities: [
      "treatmentInIndia",
      "secondMedicalOpinion",
      "medicalVisaSupport",
      "oncologyReferrals",
    ],
    secondaryCtaHref: "/international-patient-care",
  },
};

export const locationPageIdsForMedicalTourismHub: LocationPageId[] = [
  "medicalTourismUzbekistan",
  "treatmentInIndiaFromUzbekistan",
  "medicalTourismTashkent",
  "treatmentInIndiaFromKazakhstan",
  "treatmentInIndiaFromKyrgyzstan",
  "treatmentInIndiaFromTajikistan",
];
