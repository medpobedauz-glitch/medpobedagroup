import { getLegacyImageSrc } from "@/lib/images";

export type SiteImagePage =
  | "home"
  | "about"
  | "medical-tourism"
  | "hospital-partnerships"
  | "international-patients"
  | "student-mobility"
  | "blog"
  | "contact";

export type SiteImageAsset = {
  key: string;
  page: SiteImagePage;
  path: string;
  title: string;
  alt: string;
  category: string;
};

export const siteImageCatalog = {
  homeHeroDoctors: {
    key: "homeHeroDoctors",
    page: "home",
    path: getLegacyImageSrc("/images/home/hero-doctors.jpg"),
    title: "International Specialist Team",
    alt: "International doctor team welcoming patients in a premium hospital consultation setting.",
    category: "International patient consultation images",
  },
  homeHospitalNetwork: {
    key: "homeHospitalNetwork",
    page: "home",
    path: getLegacyImageSrc("/images/home/hospital-network.jpg"),
    title: "Hospital Network Access",
    alt: "Modern partner hospital building representing MedPobeda's international healthcare network.",
    category: "Hospital building images",
  },
  homePatientCoordinator: {
    key: "homePatientCoordinator",
    page: "home",
    path: getLegacyImageSrc("/images/home/patient-coordinator.jpg"),
    title: "Dedicated Patient Coordination",
    alt: "Healthcare coordinator assisting an international patient with treatment planning.",
    category: "Patient coordinator images",
  },
  homeMedicalTourismAssistance: {
    key: "homeMedicalTourismAssistance",
    page: "home",
    path: getLegacyImageSrc("/images/home/medical-tourism-assistance.jpg"),
    title: "Medical Travel Support",
    alt: "Medical tourism assistance team helping a patient family prepare for treatment travel.",
    category: "Medical tourism assistance images",
  },
  homeAirportAssistance: {
    key: "homeAirportAssistance",
    page: "home",
    path: getLegacyImageSrc("/images/home/airport-assistance.jpg"),
    title: "Arrival Assistance",
    alt: "International patient assistance representative supporting airport arrival logistics.",
    category: "Airport assistance images",
  },
  homeSpecialistReview: {
    key: "homeSpecialistReview",
    page: "home",
    path: getLegacyImageSrc("/images/home/medical-reports-review.jpg"),
    title: "Medical Reports Review",
    alt: "Doctors reviewing medical reports and imaging for an international case assessment.",
    category: "Medical reports review images",
  },
  homeTreatmentSupport: {
    key: "homeTreatmentSupport",
    page: "home",
    path: getLegacyImageSrc("/images/home/surgery-treatment-support.jpg"),
    title: "Treatment Support",
    alt: "Hospital team preparing for surgery and treatment coordination support.",
    category: "Surgery and treatment support images",
  },
  homeAccommodationSupport: {
    key: "homeAccommodationSupport",
    page: "home",
    path: getLegacyImageSrc("/images/home/accommodation-support.jpg"),
    title: "Stay and Recovery Planning",
    alt: "Comfortable accommodation planning scene for patient and family travel support.",
    category: "Accommodation and travel support images",
  },
  homeHospitalPartnership: {
    key: "homeHospitalPartnership",
    page: "home",
    path: getLegacyImageSrc("/images/home/hospital-partnership-meeting.jpg"),
    title: "Partnership Dialogue",
    alt: "Hospital administrators in a professional partnership meeting with international healthcare representatives.",
    category: "Hospital partnership meeting images",
  },
  homePatientSuccess: {
    key: "homePatientSuccess",
    page: "home",
    path: getLegacyImageSrc("/images/home/patient-success-story.jpg"),
    title: "Patient Confidence",
    alt: "Recovered patient and family sharing a positive international treatment experience.",
    category: "Patient success story images",
  },
  homeHealthcareConference: {
    key: "homeHealthcareConference",
    page: "home",
    path: getLegacyImageSrc("/images/home/healthcare-conference.jpg"),
    title: "Global Healthcare Events",
    alt: "International healthcare conference scene with medical professionals networking.",
    category: "International healthcare conference images",
  },
  homeDoctorTeam: {
    key: "homeDoctorTeam",
    page: "home",
    path: getLegacyImageSrc("/images/home/doctor-team.jpg"),
    title: "Doctor Network",
    alt: "Multidisciplinary doctor team in a premium hospital environment.",
    category: "Doctor team images",
  },
  homeGlobalPatients: {
    key: "homeGlobalPatients",
    page: "home",
    path: getLegacyImageSrc("/images/home/global-patient-assistance.jpg"),
    title: "Global Patient Assistance",
    alt: "International patient support team guiding a family through hospital coordination.",
    category: "International patient consultation images",
  },
  homeCtaConsultation: {
    key: "homeCtaConsultation",
    page: "home",
    path: getLegacyImageSrc("/images/home/cta-consultation.jpg"),
    title: "Start the Conversation",
    alt: "Premium consultation meeting between MedPobeda coordinators and an international healthcare client.",
    category: "International patient consultation images",
  },
  homeServicesSupportOverview: {
    key: "homeServicesSupportOverview",
    page: "home",
    path: "/uploads/home-services-support-overview.png",
    title: "Complete Patient Support Journey",
    alt: "Visual overview of MedPobeda Group services including airport pickup, free consultation, hospitals, treatment, personal care coordination, accommodation, translation, transport, travel support, and aftercare.",
    category: "Patient support journey visual",
  },
  aboutLeadership: {
    key: "aboutLeadership",
    page: "about",
    path: getLegacyImageSrc("/images/about/leadership-consultation.jpg"),
    title: "Leadership Consultation",
    alt: "Healthcare leadership consultation meeting illustrating MedPobeda's professional operating model.",
    category: "Hospital partnership meeting images",
  },
  aboutOperations: {
    key: "aboutOperations",
    page: "about",
    path: getLegacyImageSrc("/images/about/operations-desk.jpg"),
    title: "Coordination Desk",
    alt: "Premium healthcare coordination desk handling international patient and hospital communications.",
    category: "Patient coordinator images",
  },
  aboutInternationalNetwork: {
    key: "aboutInternationalNetwork",
    page: "about",
    path: getLegacyImageSrc("/images/about/international-network.jpg"),
    title: "International Network",
    alt: "Global medical network visual representing MedPobeda's hospital and specialist access.",
    category: "Hospital building images",
  },
  aboutTeamMeeting: {
    key: "aboutTeamMeeting",
    page: "about",
    path: getLegacyImageSrc("/images/about/team-meeting.jpg"),
    title: "Team Alignment",
    alt: "MedPobeda leadership and coordinators in a modern healthcare strategy meeting.",
    category: "Doctor team images",
  },
  aboutFounderVision: {
    key: "aboutFounderVision",
    page: "about",
    path: getLegacyImageSrc("/images/about/founder-vision.jpg"),
    title: "Founder Vision",
    alt: "Founder-level healthcare strategy conversation in a premium office setting.",
    category: "Hospital partnership meeting images",
  },
  medicalTourismConsultation: {
    key: "medicalTourismConsultation",
    page: "medical-tourism",
    path: getLegacyImageSrc("/images/medical-tourism/patient-consultation.jpg"),
    title: "Case Consultation",
    alt: "International patient consultation focused on treatment options and travel planning.",
    category: "International patient consultation images",
  },
  medicalTourismAirport: {
    key: "medicalTourismAirport",
    page: "medical-tourism",
    path: getLegacyImageSrc("/images/medical-tourism/airport-assistance.jpg"),
    title: "Airport Assistance",
    alt: "Healthcare support agent meeting an international patient at the airport.",
    category: "Airport assistance images",
  },
  medicalTourismVisa: {
    key: "medicalTourismVisa",
    page: "medical-tourism",
    path: getLegacyImageSrc("/images/medical-tourism/visa-support.jpg"),
    title: "Visa and Documentation Support",
    alt: "Travel support specialist reviewing visa and medical travel documents with a patient.",
    category: "Medical tourism assistance images",
  },
  medicalTourismHospitalArrival: {
    key: "medicalTourismHospitalArrival",
    page: "medical-tourism",
    path: getLegacyImageSrc("/images/medical-tourism/hospital-arrival.jpg"),
    title: "Hospital Arrival",
    alt: "International patient arriving at a premium hospital with assistance support.",
    category: "Hospital building images",
  },
  medicalTourismAccommodation: {
    key: "medicalTourismAccommodation",
    page: "medical-tourism",
    path: getLegacyImageSrc("/images/medical-tourism/accommodation-support.jpg"),
    title: "Accommodation Planning",
    alt: "Patient family discussing accommodation and recovery support near a treatment facility.",
    category: "Accommodation and travel support images",
  },
  medicalTourismCaseReview: {
    key: "medicalTourismCaseReview",
    page: "medical-tourism",
    path: getLegacyImageSrc("/images/medical-tourism/medical-reports-review.jpg"),
    title: "Clinical Review",
    alt: "Medical specialists reviewing reports and diagnostics for a treatment case.",
    category: "Medical reports review images",
  },
  medicalTourismTreatment: {
    key: "medicalTourismTreatment",
    page: "medical-tourism",
    path: getLegacyImageSrc("/images/medical-tourism/treatment-support.jpg"),
    title: "Treatment Coordination",
    alt: "Hospital team coordinating surgery and treatment preparation for an international patient.",
    category: "Surgery and treatment support images",
  },
  partnershipMeeting: {
    key: "partnershipMeeting",
    page: "hospital-partnerships",
    path: getLegacyImageSrc("/images/hospital-partnerships/partnership-meeting.jpg"),
    title: "Partnership Meeting",
    alt: "Hospital leaders in a formal international healthcare partnership discussion.",
    category: "Hospital partnership meeting images",
  },
  partnershipHospital: {
    key: "partnershipHospital",
    page: "hospital-partnerships",
    path: getLegacyImageSrc("/images/hospital-partnerships/partner-hospital-01.jpg"),
    title: "Partner Hospital",
    alt: "Premium hospital building representing potential institutional collaboration.",
    category: "Hospital building images",
  },
  partnershipDoctors: {
    key: "partnershipDoctors",
    page: "hospital-partnerships",
    path: getLegacyImageSrc("/images/hospital-partnerships/doctor-collaboration.jpg"),
    title: "Doctor Collaboration",
    alt: "Doctors in clinical discussion for cross-border specialist collaboration.",
    category: "Doctor team images",
  },
  partnershipConference: {
    key: "partnershipConference",
    page: "hospital-partnerships",
    path: getLegacyImageSrc("/images/hospital-partnerships/healthcare-conference.jpg"),
    title: "Conference and Exchange",
    alt: "International healthcare conference supporting partnership development and institutional networking.",
    category: "International healthcare conference images",
  },
  partnershipDesk: {
    key: "partnershipDesk",
    page: "hospital-partnerships",
    path: getLegacyImageSrc("/images/hospital-partnerships/international-desk.jpg"),
    title: "International Desk Support",
    alt: "Hospital international desk team coordinating patient referral and partnership workflows.",
    category: "Patient coordinator images",
  },
  internationalPatientsCoordinator: {
    key: "internationalPatientsCoordinator",
    page: "international-patients",
    path: getLegacyImageSrc("/images/international-patients/patient-coordinator.jpg"),
    title: "Patient Coordination",
    alt: "Dedicated case manager assisting an international patient and family.",
    category: "Patient coordinator images",
  },
  internationalPatientsTranslator: {
    key: "internationalPatientsTranslator",
    page: "international-patients",
    path: getLegacyImageSrc("/images/international-patients/translator-support.jpg"),
    title: "Language Support",
    alt: "Translator and interpreter assisting an international healthcare consultation.",
    category: "Medical tourism assistance images",
  },
  internationalPatientsHospital: {
    key: "internationalPatientsHospital",
    page: "international-patients",
    path: getLegacyImageSrc("/images/international-patients/hospital-guidance.jpg"),
    title: "Hospital Guidance",
    alt: "International patient receiving in-hospital guidance and appointment support.",
    category: "International patient consultation images",
  },
  internationalPatientsFamily: {
    key: "internationalPatientsFamily",
    page: "international-patients",
    path: getLegacyImageSrc("/images/international-patients/family-support.jpg"),
    title: "Family Support",
    alt: "Patient family receiving reassurance and treatment journey guidance from healthcare staff.",
    category: "International patient consultation images",
  },
  internationalPatientsSuccess: {
    key: "internationalPatientsSuccess",
    page: "international-patients",
    path: getLegacyImageSrc("/images/international-patients/patient-success.jpg"),
    title: "Patient Success",
    alt: "Recovered patient celebrating a positive international healthcare experience.",
    category: "Patient success story images",
  },
  studentMobilityCampus: {
    key: "studentMobilityCampus",
    page: "student-mobility",
    path: getLegacyImageSrc("/images/student-mobility/health-sciences-campus.jpg"),
    title: "Health Sciences Campus",
    alt: "Modern health sciences campus representing international academic mobility opportunities.",
    category: "Hospital building images",
  },
  studentMobilityAdvising: {
    key: "studentMobilityAdvising",
    page: "student-mobility",
    path: getLegacyImageSrc("/images/student-mobility/student-advising.jpg"),
    title: "Academic Advising",
    alt: "Professional student mobility advising session focused on healthcare education pathways.",
    category: "International patient consultation images",
  },
  studentMobilityDocumentation: {
    key: "studentMobilityDocumentation",
    page: "student-mobility",
    path: getLegacyImageSrc("/images/student-mobility/document-review.jpg"),
    title: "Documentation Review",
    alt: "Admissions coordinator reviewing student documents for an international health sciences application.",
    category: "Medical reports review images",
  },
  studentMobilityWelcome: {
    key: "studentMobilityWelcome",
    page: "student-mobility",
    path: getLegacyImageSrc("/images/student-mobility/international-welcome.jpg"),
    title: "International Welcome",
    alt: "Students arriving for a healthcare-focused international mobility experience.",
    category: "Airport assistance images",
  },
  blogHealthcareNews01: {
    key: "blogHealthcareNews01",
    page: "blog",
    path: getLegacyImageSrc("/images/blog/healthcare-news-01.jpg"),
    title: "Healthcare News",
    alt: "Editorial healthcare news visual with hospital and specialist context.",
    category: "Hospital building images",
  },
  blogHealthcareNews02: {
    key: "blogHealthcareNews02",
    page: "blog",
    path: getLegacyImageSrc("/images/blog/healthcare-news-02.jpg"),
    title: "Medical Tourism Updates",
    alt: "Editorial image representing medical tourism and international patient coordination updates.",
    category: "Medical tourism assistance images",
  },
  blogCancerBreakthrough: {
    key: "blogCancerBreakthrough",
    page: "blog",
    path: getLegacyImageSrc("/images/blog/cancer-breakthrough.jpg"),
    title: "Cancer Treatment Breakthroughs",
    alt: "Advanced oncology consultation scene for editorial coverage of cancer treatment breakthroughs.",
    category: "Doctor team images",
  },
  blogTransplantInnovation: {
    key: "blogTransplantInnovation",
    page: "blog",
    path: getLegacyImageSrc("/images/blog/transplant-innovation.jpg"),
    title: "Transplant Innovation",
    alt: "Specialist team in a transplant-focused hospital environment.",
    category: "Surgery and treatment support images",
  },
  blogHospitalPartnership: {
    key: "blogHospitalPartnership",
    page: "blog",
    path: getLegacyImageSrc("/images/blog/hospital-partnership-news.jpg"),
    title: "Hospital Partnership News",
    alt: "Hospital leadership meeting supporting editorial coverage of healthcare partnerships.",
    category: "Hospital partnership meeting images",
  },
  blogConferenceReport: {
    key: "blogConferenceReport",
    page: "blog",
    path: getLegacyImageSrc("/images/blog/international-healthcare-events.jpg"),
    title: "International Healthcare Events",
    alt: "Editorial image from a premium international healthcare event or conference.",
    category: "International healthcare conference images",
  },
  contactDesk: {
    key: "contactDesk",
    page: "contact",
    path: getLegacyImageSrc("/images/contact/contact-desk.jpg"),
    title: "Contact Desk",
    alt: "Professional healthcare contact desk ready to receive patient and hospital enquiries.",
    category: "Patient coordinator images",
  },
  contactMeeting: {
    key: "contactMeeting",
    page: "contact",
    path: getLegacyImageSrc("/images/contact/consultation-meeting.jpg"),
    title: "Consultation Meeting",
    alt: "Premium healthcare consultation meeting between MedPobeda representatives and stakeholders.",
    category: "International patient consultation images",
  },
  contactHospitalCampus: {
    key: "contactHospitalCampus",
    page: "contact",
    path: getLegacyImageSrc("/images/contact/hospital-campus.jpg"),
    title: "Hospital Campus",
    alt: "Modern hospital campus representing MedPobeda's healthcare partner environment.",
    category: "Hospital building images",
  },
  contactInternationalSupport: {
    key: "contactInternationalSupport",
    page: "contact",
    path: getLegacyImageSrc("/images/contact/international-support.jpg"),
    title: "International Support",
    alt: "International healthcare support specialist helping a client with next steps.",
    category: "Medical tourism assistance images",
  },
} as const satisfies Record<string, SiteImageAsset>;

export type SiteImageKey = keyof typeof siteImageCatalog;

export const siteImages = Object.values(siteImageCatalog);

export const siteImagesByPath = Object.fromEntries(
  siteImages.map((asset) => [asset.path, asset]),
) as Record<string, SiteImageAsset>;

export function getSiteImage(key: SiteImageKey) {
  return siteImageCatalog[key];
}

export function getPageImages(page: SiteImagePage) {
  return siteImages.filter((asset) => asset.page === page);
}
