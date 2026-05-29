export type MediaAsset = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

function asset(src: string, alt: string, width?: number, height?: number): MediaAsset {
  return { src, alt, width, height };
}

export const media = {
  brand: {
    logo: asset("/images/brand/medpobeda-logo.png", "MedPobeda Group logo", 1536, 1024),
    logoDark: asset("/images/brand/medpobeda-logo-dark.png", "MedPobeda Group logo", 1536, 1024),
    favicon: asset("/icon", "MedPobeda Group icon", 512, 512),
    openGraph: asset(
      "/images/brand/medpobeda-og-image.jpg",
      "MedPobeda Group healthcare coordination between Uzbekistan and India",
      1200,
      630,
    ),
  },
  defaults: {
    blog: asset(
      "/images/blog/default-blog-feature.jpg",
      "MedPobeda Group editorial healthcare update visual",
      1600,
      900,
    ),
    servicePage: asset(
      "/images/hero/default-service-page.jpg",
      "Modern international healthcare environment for MedPobeda Group services",
      1600,
      1200,
    ),
  },
  hero: {
    homepage: asset(
      "/images/hero/medpobeda-healthcare-bridge.jpg",
      "MedPobeda Group healthcare coordination between Uzbekistan and India",
      1600,
      1200,
    ),
    about: asset(
      "/images/hero/about-medpobeda-group.jpg",
      "Healthcare leaders discussing international medical collaboration at MedPobeda Group",
      1600,
      1200,
    ),
    medicalTourism: asset(
      "/images/hero/medical-tourism-overview.jpg",
      "International patient consultation for treatment planning abroad",
      1600,
      1200,
    ),
    internationalPatients: asset(
      "/images/hero/international-patients-support.jpg",
      "Patient family receiving guidance for international healthcare planning",
      1600,
      1200,
    ),
    hospitalPartnerships: asset(
      "/images/hero/hospital-partnerships-overview.jpg",
      "Hospital leaders discussing cross-border healthcare partnership opportunities",
      1600,
      1200,
    ),
    studentMobility: asset(
      "/images/hero/student-mobility-overview.jpg",
      "Medical students participating in structured clinical education support",
      1600,
      1200,
    ),
    contact: asset(
      "/images/hero/contact-coordination-desk.jpg",
      "MedPobeda Group coordination desk supporting patient and institutional inquiries",
      1600,
      1200,
    ),
  },
  medicalTourism: {
    patientSupport: asset(
      "/images/medical-tourism/international-patient-support.jpg",
      "International patient support and medical tourism coordination",
      1600,
      1200,
    ),
    documentsReview: asset(
      "/images/medical-tourism/medical-documents-review.jpg",
      "Medical documents review for treatment planning and specialist referral routing",
      1600,
      1200,
    ),
    travelPlanning: asset(
      "/images/medical-tourism/travel-planning-for-treatment.jpg",
      "Travel planning for international patients preparing for treatment abroad",
      1600,
      1200,
    ),
    interpreterAssistance: asset(
      "/images/medical-tourism/interpreter-assistance.jpg",
      "Interpreter assistance during international patient communication",
      1600,
      1200,
    ),
  },
  hospitals: {
    partnershipDiscussion: asset(
      "/images/hospitals/hospital-partnership-discussion.jpg",
      "Hospital partnership discussion in a professional healthcare boardroom",
      1600,
      1200,
    ),
    clinicalDiscussion: asset(
      "/images/hospitals/doctors-clinical-discussion.jpg",
      "Doctors discussing institutional healthcare collaboration",
      1600,
      1200,
    ),
    modernExterior: asset(
      "/images/hospitals/modern-hospital-exterior.jpg",
      "Modern hospital exterior representing international healthcare infrastructure",
      1600,
      1200,
    ),
    conference: asset(
      "/images/hospitals/medical-conference-seminar.jpg",
      "Healthcare conference and institutional cooperation event",
      1600,
      1200,
    ),
  },
  patients: {
    familyConsultation: asset(
      "/images/patients/patient-family-consultation.jpg",
      "Patient family consultation for treatment travel planning",
      1600,
      1200,
    ),
    doctorDiscussion: asset(
      "/images/patients/doctor-patient-discussion.jpg",
      "Doctor and patient discussion about cross-border care options",
      1600,
      1200,
    ),
    appointmentPlanning: asset(
      "/images/patients/hospital-appointment-planning.jpg",
      "Hospital appointment planning and patient desk coordination",
      1600,
      1200,
    ),
    travelSupport: asset(
      "/images/patients/travel-support-concept.jpg",
      "Travel support concept for an international patient journey",
      1600,
      1200,
    ),
    followUpCommunication: asset(
      "/images/patients/follow-up-communication.jpg",
      "Follow-up communication after an international patient inquiry",
      1600,
      1200,
    ),
  },
  partnerships: {
    leadershipDiscussion: asset(
      "/images/partnerships/healthcare-leadership-discussion.jpg",
      "Healthcare leadership discussion for hospital partnership development",
      1600,
      1200,
    ),
    institutionalCooperation: asset(
      "/images/partnerships/institutional-cooperation.jpg",
      "Institutional cooperation meeting for international healthcare planning",
      1600,
      1200,
    ),
    collaborationNetwork: asset(
      "/images/partnerships/healthcare-collaboration-network.jpg",
      "International healthcare bridge connecting Uzbekistan, India, and partner institutions",
      1600,
      1200,
    ),
  },
  studentMobility: {
    clinicalEducation: asset(
      "/images/student-mobility/clinical-education-rounds.jpg",
      "Medical students participating in clinical education rounds",
      1600,
      1200,
    ),
    campusSupport: asset(
      "/images/student-mobility/university-campus-support.jpg",
      "University and healthcare campus environment for student mobility planning",
      1600,
      1200,
    ),
    academicCooperation: asset(
      "/images/student-mobility/academic-cooperation.jpg",
      "Academic cooperation discussion supporting student mobility and observership planning",
      1600,
      1200,
    ),
  },
  legal: {
    medicalDisclaimer: asset(
      "/images/legal/medical-disclaimer-cover.jpg",
      "Clean hospital interior representing ethical medical information and patient guidance",
      1600,
      1200,
    ),
  },
  blog: {
    hero: asset(
      "/images/blog/default-blog-feature.jpg",
      "MedPobeda Group editorial healthcare insights and medical tourism updates",
      1600,
      900,
    ),
    posts: {
      "medical-tourism-from-uzbekistan-to-india-guide": asset(
        "/images/blog/medical-tourism-uzbekistan-india.jpg",
        "Medical tourism planning from Uzbekistan to India with international patient support",
        1600,
        900,
      ),
      "how-international-patients-can-prepare-for-treatment-in-india": asset(
        "/images/blog/international-patient-preparation-india.jpg",
        "International patient preparing documentation and next steps for treatment in India",
        1600,
        900,
      ),
      "documents-needed-for-medical-tourism-to-india": asset(
        "/images/blog/medical-documents-review.jpg",
        "Medical documents review for treatment planning in India",
        1600,
        900,
      ),
      "patient-inquiry-support-from-tashkent": asset(
        "/images/blog/patient-support-tashkent.jpg",
        "Patient inquiry support handled by a healthcare coordinator in Tashkent",
        1600,
        900,
      ),
      "india-uzbekistan-healthcare-collaboration-opportunities": asset(
        "/images/blog/india-uzbekistan-healthcare-collaboration.jpg",
        "Healthcare collaboration discussion between Uzbekistan and India institutions",
        1600,
        900,
      ),
      "hospital-partnership-opportunities-in-uzbekistan": asset(
        "/images/blog/hospital-partnership-uzbekistan.jpg",
        "Hospital partnership opportunity discussion in Uzbekistan",
        1600,
        900,
      ),
      "medical-interpreter-support-in-uzbekistan": asset(
        "/images/blog/medical-interpreter-support.jpg",
        "Medical interpreter support during international patient communication in Uzbekistan",
        1600,
        900,
      ),
      "how-to-choose-hospital-for-treatment-abroad": asset(
        "/images/blog/choose-hospital-abroad.jpg",
        "Modern hospital exterior representing treatment abroad decision-making",
        1600,
        900,
      ),
      "role-of-medical-tourism-coordinator": asset(
        "/images/blog/medical-tourism-coordinator.jpg",
        "Medical tourism coordinator assisting a patient inquiry",
        1600,
        900,
      ),
      "travel-accommodation-planning-international-patients-india": asset(
        "/images/blog/patient-travel-accommodation-india.jpg",
        "Travel and accommodation planning for international patients visiting India",
        1600,
        900,
      ),
      "tashkent-healthcare-collaboration-hub-central-asia": asset(
        "/images/blog/tashkent-healthcare-hub.jpg",
        "Tashkent city visual representing healthcare collaboration in Central Asia",
        1600,
        900,
      ),
      "student-mobility-support-in-uzbekistan-guide": asset(
        "/images/blog/student-mobility-uzbekistan.jpg",
        "Student mobility and clinical education support in Uzbekistan",
        1600,
        900,
      ),
      "how-hospitals-build-international-patient-referral-pathways": asset(
        "/images/blog/hospital-referral-pathway.jpg",
        "Hospital referral pathway planning for international patient access",
        1600,
        900,
      ),
      "questions-before-traveling-for-treatment-abroad": asset(
        "/images/blog/questions-before-treatment-abroad.jpg",
        "Patient preparing key questions before traveling abroad for treatment",
        1600,
        900,
      ),
      "medical-tourism-from-kyrgyzstan-to-india-guide": asset(
        "/images/blog/kyrgyzstan-india-medical-tourism.jpg",
        "Medical tourism planning from Kyrgyzstan to India",
        1600,
        900,
      ),
      "medical-tourism-from-kazakhstan-to-india-guide": asset(
        "/images/blog/kazakhstan-india-medical-tourism.jpg",
        "Medical tourism planning from Kazakhstan to India with hospital access guidance",
        1600,
        900,
      ),
      "medical-tourism-from-tajikistan-to-india-guide": asset(
        "/images/blog/tajikistan-india-medical-tourism.jpg",
        "Medical tourism planning from Tajikistan to India with follow-up guidance",
        1600,
        900,
      ),
      "medical-tourism-from-turkmenistan-to-india-guide": asset(
        "/images/blog/turkmenistan-india-medical-tourism.jpg",
        "Medical tourism planning from Turkmenistan to India with patient assistance",
        1600,
        900,
      ),
      "ethical-medical-tourism-patient-coordinator-guide": asset(
        "/images/blog/ethical-medical-tourism.jpg",
        "Healthcare professionals discussing ethical medical tourism practices",
        1600,
        900,
      ),
      "international-healthcare-partnerships-patient-access": asset(
        "/images/blog/international-healthcare-partnerships.jpg",
        "International healthcare partnership meeting supporting better patient access",
        1600,
        900,
      ),
    },
  },
  icons: {
    brandMark: asset("/icon", "MedPobeda Group icon", 512, 512),
  },
  backgrounds: {
    // TODO: Add dedicated exported raster background assets here if the site needs image-based backgrounds later.
    socialGradient: asset(
      "/images/brand/medpobeda-og-image.jpg",
      "",
      1200,
      630,
    ),
  },
} as const;

export const legacyImageOverrides: Record<string, MediaAsset> = {
  "/images/home/hero-doctors.jpg": media.hero.homepage,
  "/images/home/hospital-network.jpg": media.hospitals.modernExterior,
  "/images/home/patient-coordinator.jpg": media.patients.appointmentPlanning,
  "/images/home/medical-tourism-assistance.jpg": media.medicalTourism.patientSupport,
  "/images/home/airport-assistance.jpg": media.patients.travelSupport,
  "/images/home/medical-reports-review.jpg": media.medicalTourism.documentsReview,
  "/images/home/global-patient-assistance.jpg": media.patients.doctorDiscussion,
  "/images/home/hospital-partnership-meeting.jpg": media.hospitals.partnershipDiscussion,
  "/images/about/leadership-consultation.jpg": media.hero.about,
  "/images/about/operations-desk.jpg": media.hero.contact,
  "/images/about/international-network.jpg": media.partnerships.collaborationNetwork,
  "/images/about/team-meeting.jpg": media.partnerships.leadershipDiscussion,
  "/images/about/founder-vision.jpg": media.partnerships.institutionalCooperation,
  "/images/medical-tourism/patient-consultation.jpg": media.medicalTourism.patientSupport,
  "/images/medical-tourism/airport-assistance.jpg": media.patients.travelSupport,
  "/images/medical-tourism/visa-support.jpg": media.medicalTourism.travelPlanning,
  "/images/medical-tourism/accommodation-support.jpg": media.patients.familyConsultation,
  "/images/medical-tourism/medical-reports-review.jpg": media.medicalTourism.documentsReview,
  "/images/hospital-partnerships/partnership-meeting.jpg": media.hospitals.partnershipDiscussion,
  "/images/hospital-partnerships/partner-hospital-01.jpg": media.hospitals.modernExterior,
  "/images/hospital-partnerships/doctor-collaboration.jpg": media.hospitals.clinicalDiscussion,
  "/images/hospital-partnerships/healthcare-conference.jpg": media.hospitals.conference,
  "/images/hospital-partnerships/international-desk.jpg": media.patients.appointmentPlanning,
  "/images/international-patients/patient-coordinator.jpg": media.patients.appointmentPlanning,
  "/images/international-patients/translator-support.jpg": media.medicalTourism.interpreterAssistance,
  "/images/international-patients/hospital-guidance.jpg": media.hospitals.modernExterior,
  "/images/international-patients/family-support.jpg": media.patients.familyConsultation,
  "/images/student-mobility/health-sciences-campus.jpg": media.studentMobility.campusSupport,
  "/images/student-mobility/student-advising.jpg": media.studentMobility.academicCooperation,
  "/images/student-mobility/document-review.jpg": media.medicalTourism.documentsReview,
  "/images/student-mobility/international-welcome.jpg": media.patients.travelSupport,
  "/images/blog/healthcare-news-01.jpg": media.defaults.blog,
  "/images/blog/healthcare-news-02.jpg": media.blog.hero,
  "/images/blog/cancer-breakthrough.jpg": media.blog.posts["questions-before-traveling-for-treatment-abroad"],
  "/images/blog/transplant-innovation.jpg": media.blog.posts["medical-tourism-from-kyrgyzstan-to-india-guide"],
  "/images/blog/hospital-partnership-news.jpg": media.blog.posts["hospital-partnership-opportunities-in-uzbekistan"],
  "/images/blog/international-healthcare-events.jpg": media.blog.posts["india-uzbekistan-healthcare-collaboration-opportunities"],
  "/images/contact/contact-desk.jpg": media.hero.contact,
  "/images/contact/consultation-meeting.jpg": media.patients.doctorDiscussion,
  "/images/contact/hospital-campus.jpg": media.hospitals.modernExterior,
  "/images/contact/international-support.jpg": media.patients.followUpCommunication,
} as const;

export const premiumImageOverrides: Record<string, MediaAsset> = {
  "home-hero/doctor-patient-consultation": media.hero.homepage,
  "home-hero/premium-hospital-campus": media.hospitals.modernExterior,
  "home-hero/airport-patient-assistance": media.patients.travelSupport,
  "about/patient-family-guidance": media.patients.familyConsultation,
  "about/hospital-corridor": media.legal.medicalDisclaimer,
  "regions/global-healthcare-bridge": media.partnerships.collaborationNetwork,
  "services/medical-tourism-facilitation": media.medicalTourism.patientSupport,
  "services/international-patient-assistance": media.patients.doctorDiscussion,
  "services/hospital-collaboration": media.hospitals.clinicalDiscussion,
  "services/medical-travel-coordination": media.patients.travelSupport,
  "services/healthcare-partnership-development": media.partnerships.leadershipDiscussion,
  "services/student-mobility-clinical-exposure": media.studentMobility.clinicalEducation,
  "patients/family-health-support": media.patients.familyConsultation,
  "patients/medical-coordinator-desk": media.patients.appointmentPlanning,
  "partnerships/hospital-partner-growth": media.hospitals.modernExterior,
  "partnerships/doctor-faculty-exchange": media.studentMobility.academicCooperation,
  "partnerships/medical-tourism-desk-support": media.patients.appointmentPlanning,
  "contact-trust/tashkent-coordination-base": media.blog.posts["tashkent-healthcare-collaboration-hub-central-asia"],
  "medical-tourism-inner/treatment-planning": media.medicalTourism.documentsReview,
  "gallery/uzbekistan-healthcare-bridge": media.partnerships.collaborationNetwork,
  "gallery/hospital-lobby": media.hospitals.modernExterior,
  "gallery/india-specialist-access": media.hospitals.clinicalDiscussion,
  "gallery/executive-partnership-meeting": media.hospitals.partnershipDiscussion,
  "gallery/conference-networking": media.hospitals.conference,
  "gallery/family-consultation": media.patients.familyConsultation,
  "contact-hero/premium-contact-desk": media.hero.contact,
  "contact-hero/international-support": media.patients.followUpCommunication,
  "about-hero/leadership-meeting": media.hero.about,
} as const;

export function getBlogFeaturedImage(slug: string): MediaAsset {
  return media.blog.posts[slug as keyof typeof media.blog.posts] ?? media.defaults.blog;
}

const seoImageRules: Array<{
  matches: string[];
  asset: MediaAsset;
}> = [
  { matches: ["/", ""], asset: media.brand.openGraph },
  { matches: ["/blog", "/press"], asset: media.blog.hero },
  { matches: ["/about", "/company-profile"], asset: media.hero.about },
  {
    matches: ["/medical-tourism", "/international-patient-care", "/treatment-in-india"],
    asset: media.hero.medicalTourism,
  },
  { matches: ["/international-patients"], asset: media.hero.internationalPatients },
  { matches: ["/hospital-partnerships", "/hospitals"], asset: media.hero.hospitalPartnerships },
  { matches: ["/student-mobility"], asset: media.hero.studentMobility },
  { matches: ["/contact"], asset: media.hero.contact },
  { matches: ["/privacy-policy", "/terms", "/medical-disclaimer", "/cookie-policy"], asset: media.legal.medicalDisclaimer },
];

export function getSeoImageForPath(path = "/"): MediaAsset {
  const normalizedPath = path === "/" ? "/" : path.replace(/\/+$/, "");
  const match = seoImageRules.find((rule) =>
    rule.matches.some((candidate) =>
      candidate === "/"
        ? normalizedPath === "/"
        : normalizedPath === candidate || normalizedPath.startsWith(`${candidate}/`),
    ),
  );

  return match?.asset ?? media.defaults.servicePage;
}
