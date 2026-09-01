export const HOSPITAL_SPECIALTIES = [
  "Cardiology",
  "Cardiac Surgery",
  "Neurology",
  "Neurosurgery",
  "Orthopaedics",
  "Joint Replacement",
  "Oncology",
  "Medical Oncology",
  "Surgical Oncology",
  "Radiation Oncology",
  "Nephrology",
  "Kidney Transplant",
  "Urology",
  "Liver Transplant",
  "Gastroenterology",
  "Pulmonology",
  "Endocrinology",
  "IVF",
  "Fertility",
  "Plastic Surgery",
  "Cosmetic Surgery",
  "Dermatology",
  "Ophthalmology",
  "ENT",
  "Pediatrics",
  "Obstetrics",
  "Gynecology",
  "General Surgery",
  "Robotic Surgery",
  "Critical Care",
  "Emergency Medicine",
] as const;

export const HOSPITAL_TREATMENTS = [
  "Heart Surgery",
  "Cancer Treatment",
  "Kidney Transplant",
  "Liver Transplant",
  "Bone Marrow Transplant",
  "Brain Surgery",
  "Spine Surgery",
  "Hip Replacement",
  "Knee Replacement",
  "IVF",
  "Robotic Surgery",
] as const;

export type HospitalSpecialty = (typeof HOSPITAL_SPECIALTIES)[number];
export type HospitalTreatment = (typeof HOSPITAL_TREATMENTS)[number];

export type HospitalSeo = {
  title: string;
  description: string;
  keywords: string[];
};

export type Hospital = {
  id: string;
  slug: string;
  name: string;
  logo: string | null;
  city: string;
  state: string;
  country: "India";
  hospitalGroup: string;
  hospitalGroupSlug: string;
  description: string;
  shortDescription: string;
  specialties: HospitalSpecialty[];
  treatments: HospitalTreatment[];
  diseases: string[];
  internationalPatients: true;
  medicalVisaSupport: true;
  airportPickup: true;
  interpreter: true;
  accommodation: true;
  teleconsultation: true;
  website: string;
  featuredImage: string;
  gallery: string[];
  beds: number | null;
  doctors: number | null;
  established: number | null;
  facilities: string[];
  technology: string[];
  medicalDepartments: string[];
  informationSource: string | null;
  imageCredit: string | null;
  seo: HospitalSeo;
};

type HospitalSeed = {
  slug: string;
  name: string;
  city: string;
  state: string;
  group: string;
  groupSlug: string;
  website: string;
  specialties?: HospitalSpecialty[];
  treatments?: HospitalTreatment[];
  beds?: number;
  doctors?: number;
  established?: number;
  description?: string;
  shortDescription?: string;
  logo?: string;
  featuredImage?: string;
  gallery?: string[];
  facilities?: string[];
  technology?: string[];
  informationSource?: string;
  imageCredit?: string;
};

const defaultSpecialties: HospitalSpecialty[] = [
  "Cardiology",
  "Oncology",
  "Neurology",
  "Orthopaedics",
  "Gastroenterology",
  "Critical Care",
];

const defaultTreatments: HospitalTreatment[] = [
  "Heart Surgery",
  "Cancer Treatment",
  "Brain Surgery",
  "Knee Replacement",
  "Robotic Surgery",
];

const hospitalImage = "/images/hospitals/modern-hospital-exterior.jpg";
const hospitalGallery = [
  "/images/hospitals/modern-hospital-exterior.jpg",
  "/images/hospitals/doctors-clinical-discussion.jpg",
  "/images/hospitals/medical-conference-seminar.jpg",
];

function createHospital(seed: HospitalSeed): Hospital {
  const specialties = seed.specialties ?? defaultSpecialties;
  const treatments = seed.treatments ?? defaultTreatments;
  const shortDescription =
    seed.shortDescription ??
    `${seed.group} in ${seed.city} provides advanced multispecialty care with coordinated support for international patients.`;
  const description =
    seed.description ??
    `${seed.name} is part of the MedPobeda Group India hospital network. Patients from Uzbekistan and Central Asia can receive support with case review, hospital communication, treatment planning, medical visas, travel, interpreters, and follow-up coordination.`;

  return {
    id: seed.slug,
    slug: seed.slug,
    name: seed.name,
    logo: seed.logo ?? null,
    city: seed.city,
    state: seed.state,
    country: "India",
    hospitalGroup: seed.group,
    hospitalGroupSlug: seed.groupSlug,
    description,
    shortDescription,
    specialties,
    treatments,
    diseases: ["Heart disease", "Cancer", "Kidney disease", "Neurological disorders", "Joint disorders"],
    internationalPatients: true,
    medicalVisaSupport: true,
    airportPickup: true,
    interpreter: true,
    accommodation: true,
    teleconsultation: true,
    website: seed.website,
    featuredImage: seed.featuredImage ?? hospitalImage,
    gallery: seed.gallery ?? hospitalGallery,
    beds: seed.beds ?? null,
    doctors: seed.doctors ?? null,
    established: seed.established ?? null,
    facilities: seed.facilities ?? [
      "International patient desk",
      "24/7 emergency and critical care",
      "Advanced diagnostic services",
      "Dedicated inpatient and outpatient care",
      "Pharmacy and rehabilitation support",
    ],
    technology: seed.technology ?? [
      "Advanced medical imaging",
      "Minimally invasive surgery systems",
      "Robotic surgery support",
      "Modern intensive care monitoring",
      "Digital diagnostics and teleconsultation",
    ],
    medicalDepartments: [...specialties],
    informationSource: seed.informationSource ?? null,
    imageCredit: seed.imageCredit ?? null,
    seo: {
      title: `${seed.name} | Medical Tourism | MedPobeda Group`,
      description: `Get treatment at ${seed.name} through MedPobeda Group. We assist international patients from Uzbekistan and Central Asia with visa support, travel coordination, interpreter services, and treatment planning.`,
      keywords: [
        seed.name,
        `${seed.name} international patients`,
        `${seed.group} ${seed.city}`,
        ...specialties,
        ...treatments,
      ],
    },
  };
}

const seeds: HospitalSeed[] = [
  { slug: "apollo-hospitals-chennai", name: "Apollo Hospitals Chennai", city: "Chennai", state: "Tamil Nadu", group: "Apollo Hospitals", groupSlug: "apollo", website: "https://www.apollohospitals.com", established: 1983 },
  { slug: "apollo-hospitals-hyderabad", name: "Apollo Hospitals Hyderabad", city: "Hyderabad", state: "Telangana", group: "Apollo Hospitals", groupSlug: "apollo", website: "https://www.apollohospitals.com" },
  { slug: "apollo-indraprastha-delhi", name: "Indraprastha Apollo Hospitals", city: "New Delhi", state: "Delhi", group: "Apollo Hospitals", groupSlug: "apollo", website: "https://www.apollohospitals.com" },
  { slug: "fortis-memorial-gurugram", name: "Fortis Memorial Research Institute", city: "Gurugram", state: "Haryana", group: "Fortis Healthcare", groupSlug: "fortis", website: "https://www.fortishealthcare.com" },
  { slug: "fortis-escorts-delhi", name: "Fortis Escorts Heart Institute", city: "New Delhi", state: "Delhi", group: "Fortis Healthcare", groupSlug: "fortis", website: "https://www.fortishealthcare.com", specialties: ["Cardiology", "Cardiac Surgery", "Critical Care", "Emergency Medicine"], treatments: ["Heart Surgery", "Robotic Surgery"] },
  { slug: "fortis-hospital-bannerghatta", name: "Fortis Hospital Bannerghatta Road", city: "Bengaluru", state: "Karnataka", group: "Fortis Healthcare", groupSlug: "fortis", website: "https://www.fortishealthcare.com" },
  { slug: "medanta-gurugram", name: "Medanta - The Medicity Gurugram", city: "Gurugram", state: "Haryana", group: "Medanta - The Medicity", groupSlug: "medanta", website: "https://www.medanta.org" },
  { slug: "medanta-lucknow", name: "Medanta Lucknow", city: "Lucknow", state: "Uttar Pradesh", group: "Medanta - The Medicity", groupSlug: "medanta", website: "https://www.medanta.org" },
  { slug: "max-saket", name: "Max Super Speciality Hospital Saket", city: "New Delhi", state: "Delhi", group: "Max Healthcare", groupSlug: "max", website: "https://www.maxhealthcare.in" },
  { slug: "max-shalimar-bagh", name: "Max Super Speciality Hospital Shalimar Bagh", city: "New Delhi", state: "Delhi", group: "Max Healthcare", groupSlug: "max", website: "https://www.maxhealthcare.in" },
  { slug: "max-vaishali", name: "Max Super Speciality Hospital Vaishali", city: "Ghaziabad", state: "Uttar Pradesh", group: "Max Healthcare", groupSlug: "max", website: "https://www.maxhealthcare.in" },
  { slug: "manipal-hospital-old-airport-road", name: "Manipal Hospital Old Airport Road", city: "Bengaluru", state: "Karnataka", group: "Manipal Hospitals", groupSlug: "manipal", website: "https://www.manipalhospitals.com" },
  { slug: "narayana-health-city", name: "Narayana Health City", city: "Bengaluru", state: "Karnataka", group: "Narayana Health", groupSlug: "narayana", website: "https://www.narayanahealth.org" },
  { slug: "artemis-hospital-gurugram", name: "Artemis Hospital", city: "Gurugram", state: "Haryana", group: "Artemis Hospital", groupSlug: "artemis", website: "https://www.artemishospitals.com" },
  { slug: "blk-max-delhi", name: "BLK-Max Super Speciality Hospital", city: "New Delhi", state: "Delhi", group: "BLK-Max Super Speciality Hospital", groupSlug: "blk-max", website: "https://www.blkmaxhospital.com" },
  { slug: "aster-medcity-kochi", name: "Aster Medcity", city: "Kochi", state: "Kerala", group: "Aster DM Healthcare", groupSlug: "aster", website: "https://www.asterhospitals.in" },
  { slug: "yashoda-hospitals-somajiguda", name: "Yashoda Hospitals Somajiguda", city: "Hyderabad", state: "Telangana", group: "Yashoda Hospitals", groupSlug: "yashoda", website: "https://www.yashodahospitals.com" },
  { slug: "care-hospitals-banjara-hills", name: "CARE Hospitals Banjara Hills", city: "Hyderabad", state: "Telangana", group: "CARE Hospitals", groupSlug: "care", website: "https://www.carehospitals.com" },
  { slug: "rela-hospital-chennai", name: "Rela Hospital", city: "Chennai", state: "Tamil Nadu", group: "Rela Hospital", groupSlug: "rela", website: "https://www.relainstitute.com", specialties: ["Liver Transplant", "Gastroenterology", "Pediatrics", "Critical Care", "General Surgery"], treatments: ["Liver Transplant", "Robotic Surgery"] },
  { slug: "mgm-healthcare-chennai", name: "MGM Healthcare", city: "Chennai", state: "Tamil Nadu", group: "MGM Healthcare", groupSlug: "mgm", website: "https://mgmhealthcare.in" },
  { slug: "gleneagles-hospital-chennai", name: "Gleneagles Hospital Chennai", city: "Chennai", state: "Tamil Nadu", group: "Gleneagles Hospitals", groupSlug: "gleneagles", website: "https://www.gleneagleshospitals.co.in" },
  { slug: "kauvery-hospital-alwarpet", name: "Kauvery Hospital Alwarpet", city: "Chennai", state: "Tamil Nadu", group: "Kauvery Hospital", groupSlug: "kauvery", website: "https://www.kauveryhospital.com" },
  { slug: "amrita-hospital-faridabad", name: "Amrita Hospital Faridabad", city: "Faridabad", state: "Haryana", group: "Amrita Hospital", groupSlug: "amrita", website: "https://www.amritahospitals.org" },
  { slug: "kokilaben-hospital-mumbai", name: "Kokilaben Dhirubhai Ambani Hospital", city: "Mumbai", state: "Maharashtra", group: "Kokilaben Dhirubhai Ambani Hospital", groupSlug: "kokilaben", website: "https://www.kokilabenhospital.com" },
  { slug: "sir-ganga-ram-hospital", name: "Sir Ganga Ram Hospital", city: "New Delhi", state: "Delhi", group: "Sir Ganga Ram Hospital", groupSlug: "sir-ganga-ram", website: "https://sgrh.com" },
  { slug: "geims-dehradun", name: "Graphic Era Institute of Medical Sciences (GEIMS)", city: "Dehradun", state: "Uttarakhand", group: "Graphic Era Institute of Medical Sciences (GEIMS)", groupSlug: "geims", website: "https://geims.geu.ac.in" },
];

const kimsBranches: Array<[string, string, string, string]> = [
  ["kims-secunderabad", "KIMS Secunderabad", "Secunderabad", "Telangana"],
  ["kims-kondapur", "KIMS Kondapur", "Hyderabad", "Telangana"],
  ["kims-gachibowli", "KIMS Gachibowli", "Hyderabad", "Telangana"],
  ["kims-begumpet", "KIMS-Sunshine Hospitals Begumpet", "Hyderabad", "Telangana"],
  ["kims-paradise-circle", "KIMS Paradise Circle (Asian Transcare & MIPPL)", "Secunderabad", "Telangana"],
  ["kims-kompally", "KIMS Kompally", "Hyderabad", "Telangana"],
  ["kims-nellore", "KIMS Nellore", "Nellore", "Andhra Pradesh"],
  ["kims-rajahmundry", "KIMS Rajahmundry", "Rajahmundry", "Andhra Pradesh"],
  ["kims-srikakulam", "KIMS Srikakulam", "Srikakulam", "Andhra Pradesh"],
  ["kims-ongole", "KIMS Ongole", "Ongole", "Andhra Pradesh"],
  ["kims-vizag-sheela-nagar", "KIMS-ICON Hospital Vizag, Sheela Nagar", "Visakhapatnam", "Andhra Pradesh"],
  ["kims-vizag-mvp-colony", "KIMS Vizag MVP Colony", "Visakhapatnam", "Andhra Pradesh"],
  ["kims-vizag-seethammadhara", "KIMS Vizag Seethammadhara", "Visakhapatnam", "Andhra Pradesh"],
  ["kims-anantapur", "KIMS Anantapur", "Anantapur", "Andhra Pradesh"],
  ["kims-kurnool", "KIMS Kurnool", "Kurnool", "Andhra Pradesh"],
  ["kims-guntur", "KIMS Guntur", "Guntur", "Andhra Pradesh"],
  ["kims-guntur-2", "KIMS Guntur 2", "Guntur", "Andhra Pradesh"],
  ["kims-nagpur", "KIMS-Kingsway Hospitals Nagpur", "Nagpur", "Maharashtra"],
  ["kims-nashik", "KIMS Nashik", "Nashik", "Maharashtra"],
  ["kims-nashik-2", "KIMS Nashik 2", "Nashik", "Maharashtra"],
  ["kims-sangli", "KIMS Sangli", "Sangli", "Maharashtra"],
  ["kims-thane", "KIMS Thane", "Thane", "Maharashtra"],
  ["kims-bengaluru-mahadevapura", "KIMS Bengaluru Mahadevapura", "Bengaluru", "Karnataka"],
  ["kims-bengaluru-electronic-city", "KIMS Bengaluru Electronic City", "Bengaluru", "Karnataka"],
  ["kims-kannur", "KIMS Kannur", "Kannur", "Kerala"],
  ["kims-kollam", "KIMS Kollam", "Kollam", "Kerala"],
  ["kims-palakkad", "KIMS Palakkad", "Palakkad", "Kerala"],
];

const kimsOfficialPaths: Record<string, string> = {
  "kims-secunderabad": "secunderabad",
  "kims-kondapur": "kondapur",
  "kims-gachibowli": "gachibowli",
  "kims-begumpet": "begumpet",
  "kims-paradise-circle": "",
  "kims-kompally": "kompally",
  "kims-nellore": "nellore",
  "kims-rajahmundry": "rajahmundry",
  "kims-srikakulam": "srikakulam",
  "kims-ongole": "ongole",
  "kims-vizag-sheela-nagar": "vizag-sheela-nagar",
  "kims-vizag-mvp-colony": "vizag-mvp-colony",
  "kims-vizag-seethammadhara": "seethammadhara",
  "kims-anantapur": "anantapur",
  "kims-kurnool": "kurnool",
  "kims-guntur": "guntur",
  "kims-guntur-2": "guntur",
  "kims-nagpur": "nagpur",
  "kims-nashik": "nashik",
  "kims-nashik-2": "nashik",
  "kims-sangli": "sangli",
  "kims-thane": "thane",
  "kims-bengaluru-mahadevapura": "bengaluru-mahadevapura",
  "kims-bengaluru-electronic-city": "bengaluru-electronic-city",
  "kims-kannur": "kannur",
  "kims-kollam": "kollam",
  "kims-palakkad": "palakkad",
};

const kimsKnownFacts: Record<
  string,
  Pick<HospitalSeed, "beds" | "established" | "facilities" | "technology">
> = {
  "kims-secunderabad": {
    beds: 1000,
    established: 2004,
    facilities: [
      "International patient wing",
      "24/7 emergency, pharmacy and blood bank",
      "Medical, surgical, cardiac and pediatric intensive care units",
      "10 operation theatres and CSSD",
      "MRI, CT, X-ray, ultrasound, Doppler and BMD imaging",
      "Endoscopy, dialysis, ERCP and chemotherapy day care",
    ],
    technology: [
      "Cardiac catheterization laboratories",
      "Advanced radiology and diagnostic imaging",
      "Intensive care monitoring",
      "Central sterile supply systems",
      "Digital diagnostics and laboratory services",
    ],
  },
  "kims-kondapur": {
    beds: 750,
    established: 2014,
    facilities: [
      "24/7 emergency and trauma centre",
      "Adult, pediatric and neonatal critical care units",
      "Advanced modular operation theatres",
      "More than 40 hemodialysis stations",
      "Blood bank and 24/7 pharmacy",
      "Smart wards and digital smart ICUs",
    ],
    technology: [
      "Robotic surgical systems",
      "Cardiac catheterization laboratories",
      "Advanced CT and MRI imaging",
      "Electronic health records and integrated HIMS",
      "Intelligent remote patient monitoring",
    ],
  },
  "kims-gachibowli": {
    beds: 250,
    established: 2018,
    facilities: [
      "24/7 emergency and trauma services",
      "More than 80 critical care beds",
      "7 advanced operation theatres",
      "Dialysis unit, blood bank and 24/7 pharmacy",
      "Advanced endoscopy suites",
      "Patient-friendly inpatient rooms",
    ],
    technology: [
      "Flat-panel digital cardiac catheterization laboratory",
      "MRI, CT, EEG, EMG and mammography",
      "Advanced intensive care monitoring",
      "Integrated electronic medical records",
      "Modern diagnostic laboratory systems",
    ],
  },
  "kims-begumpet": {
    beds: 350,
    established: 2009,
    facilities: [
      "30+ medical and surgical specialties",
      "Emergency and critical care",
      "Advanced operation theatres",
      "Diagnostic imaging and laboratory services",
      "Pharmacy and inpatient care",
      "NABH, NABL and ISO-accredited services",
    ],
    technology: [
      "Advanced diagnostic imaging",
      "Critical care monitoring",
      "Minimally invasive surgery systems",
      "Modern laboratory diagnostics",
      "Digital patient-care systems",
    ],
  },
  "kims-nellore": {
    established: 2000,
    facilities: [
      "6 operation theatres and 6 intensive care units",
      "24-hour MRI and CT imaging",
      "24-hour laboratory, pharmacy and ambulance",
      "Cardiac catheterization laboratory",
      "Emergency and rehabilitation services",
      "Health screening programmes",
    ],
    technology: ["MRI and CT imaging", "Cardiac catheterization laboratory", "Intensive care monitoring", "Modern operating theatres", "Laboratory diagnostics"],
  },
  "kims-rajahmundry": {
    beds: 200,
    established: 2021,
    facilities: ["5 operation theatres", "96 ICU, MICU, SICU, HDU and NICU beds", "Two catheterization laboratories", "CT and laboratory services", "Dialysis services", "NABH-accredited patient care"],
    technology: ["Cardiac catheterization laboratories", "CT imaging", "Advanced intensive care monitoring", "Dialysis technology", "Modern operating theatres"],
  },
  "kims-srikakulam": {
    beds: 200,
    established: 2011,
    facilities: ["4 operation theatres", "Cardiac catheterization laboratory", "CT imaging", "Emergency and critical care", "Multispecialty inpatient care", "Care for patients from Andhra Pradesh and neighbouring Odisha"],
    technology: ["Cardiac catheterization laboratory", "CT imaging", "Intensive care monitoring", "Modern operating theatres", "Digital diagnostics"],
  },
  "kims-ongole": {
    beds: 350,
    established: 2017,
    facilities: ["9 operation theatres", "Medical, surgical, cardiothoracic and neuro ICUs", "Cardiac catheterization laboratory", "MRI imaging", "Emergency services", "Multispecialty inpatient and outpatient care"],
    technology: ["MRI imaging", "Cardiac catheterization laboratory", "Advanced intensive care monitoring", "Modern operating theatres", "Laboratory diagnostics"],
  },
  "kims-nagpur": {
    beds: 300,
    facilities: ["80+ advanced critical care beds", "9 high-end modular operation theatres", "Transplant surgery support", "Advanced diagnostic services", "Cardiac care and catheterization laboratory", "Multispecialty tertiary care"],
    technology: ["High-end modular operating theatres", "Cardiac catheterization laboratory", "Advanced critical care monitoring", "Transplant surgery systems", "State-of-the-art diagnostics"],
  },
  "kims-thane": {
    beds: 300,
    facilities: ["51-bed intensive care unit", "30+ specialties and super-specialties", "Emergency and critical care", "Cardiac, neuro and oncology services", "Mother and child care", "Gastro and renal sciences"],
    technology: ["Advanced intensive care monitoring", "Modern operation theatres", "Cardiac diagnostics", "Advanced imaging", "Digital laboratory services"],
  },
};

const kimsDefaultFacilities = [
  "Multispecialty inpatient and outpatient care",
  "Emergency and critical care services",
  "Operation theatres and intensive care",
  "Diagnostic imaging and laboratory services",
  "Pharmacy and patient support",
  "Specialist consultation pathways",
];

const kimsDefaultTechnology = [
  "Advanced diagnostic imaging",
  "Modern operating theatre systems",
  "Intensive care monitoring",
  "Digital laboratory diagnostics",
  "Minimally invasive treatment support",
];

seeds.push(
  ...kimsBranches.map(([slug, name, city, state]) => ({
    ...kimsKnownFacts[slug],
    slug,
    name,
    city,
    state,
    group: "KIMS Hospitals",
    groupSlug: "kims",
    website: `https://www.kimshospitals.com/${kimsOfficialPaths[slug] ? `${kimsOfficialPaths[slug]}/` : ""}`,
    description: `${name} is part of the official KIMS Hospitals network, one of India's largest corporate healthcare groups. KIMS reports a network of 27 hospitals and more than 8,300 beds across Telangana, Andhra Pradesh, Maharashtra, Karnataka and Kerala, with tertiary and quaternary care across more than 25 specialties.`,
    shortDescription: `${name} provides multidisciplinary KIMS hospital care in ${city}, ${state}. MedPobeda coordinates case review, hospital communication, treatment planning and international patient travel support.`,
    logo: "/images/hospitals/kims/kims-logo.png",
    featuredImage: "/images/hospitals/kims/kims-network.png",
    gallery: ["/images/hospitals/kims/kims-network.png"],
    facilities: kimsKnownFacts[slug]?.facilities ?? kimsDefaultFacilities,
    technology: kimsKnownFacts[slug]?.technology ?? kimsDefaultTechnology,
    informationSource: `https://www.kimshospitals.com/${kimsOfficialPaths[slug] ? `${kimsOfficialPaths[slug]}/` : ""}`,
    imageCredit: "KIMS Hospitals official website",
  })),
);

export const hospitals: Hospital[] = seeds.map(createHospital);

export const hospitalGroups = Array.from(
  new Map(hospitals.map((hospital) => [hospital.hospitalGroupSlug, hospital.hospitalGroup])).entries(),
).map(([slug, name]) => ({ slug, name }));

export const featuredHospitals = hospitals.filter((hospital) =>
  [
    "apollo-hospitals-chennai",
    "fortis-memorial-gurugram",
    "medanta-gurugram",
    "max-saket",
    "kims-secunderabad",
    "manipal-hospital-old-airport-road",
    "narayana-health-city",
    "artemis-hospital-gurugram",
  ].includes(hospital.slug),
);

export function getHospitalBySlug(slug: string) {
  return hospitals.find((hospital) => hospital.slug === slug) ?? null;
}

export function getHospitalsByGroup(groupSlug: string) {
  return hospitals.filter((hospital) => hospital.hospitalGroupSlug === groupSlug);
}
