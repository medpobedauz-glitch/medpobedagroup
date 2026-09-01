export type DoctorSeo = { title: string; description: string; keywords: string[] };

export type Doctor = {
  id: string;
  slug: string;
  name: string;
  title: string;
  qualifications: string[];
  specialization: string;
  subspecialties: string[];
  hospitalId: string;
  hospitalGroup: string;
  city: string;
  state: string;
  country: "India";
  yearsOfExperience: number;
  patientsTreated: string;
  proceduresPerformed: string;
  specialInterests: string[];
  successAreas: string[];
  languages: string[];
  education: string[];
  fellowships: string[];
  training: string[];
  certifications: string[];
  memberships: string[];
  awards: string[];
  professionalAchievements: string[];
  biography: string;
  professionalSummary: string;
  expertise: string[];
  treatments: string[];
  procedures: string[];
  diseases: string[];
  publications: string[];
  research: string[];
  consultationAvailable: boolean;
  teleconsultationAvailable: boolean;
  internationalPatients: boolean;
  image: string;
  gallery: string[];
  addedAt: string;
  sourceUrl: string;
  seo: DoctorSeo;
};

type DoctorSeed = Pick<Doctor,
  "slug" | "name" | "title" | "qualifications" | "specialization" | "subspecialties" |
  "hospitalId" | "hospitalGroup" | "city" | "state" | "yearsOfExperience" | "expertise" |
  "treatments" | "procedures" | "awards" | "fellowships" | "sourceUrl"
>;

const profileImage = "/images/patients/doctor-patient-discussion.jpg";
const gallery = [
  "/images/patients/doctor-patient-discussion.jpg",
  "/images/hospitals/doctors-clinical-discussion.jpg",
  "/images/hospitals/medical-conference-seminar.jpg",
];

const seeds: DoctorSeed[] = [
  {
    slug: "dr-naresh-trehan",
    name: "Dr. Naresh Trehan",
    title: "Chairman & Managing Director, Medanta",
    qualifications: ["MBBS", "Diplomate, American Board of Cardiothoracic Surgery"],
    specialization: "Cardiac Surgery",
    subspecialties: ["Cardiothoracic Surgery", "Cardiovascular Surgery", "Minimally Invasive Cardiac Surgery", "Heart Transplant"],
    hospitalId: "medanta-gurugram",
    hospitalGroup: "Medanta - The Medicity",
    city: "Gurugram",
    state: "Haryana",
    yearsOfExperience: 50,
    expertise: ["Complex cardiac surgery", "Minimally invasive cardiac surgery", "Heart transplantation"],
    treatments: ["heart-surgery", "cabg", "valve-replacement", "heart-transplant"],
    procedures: ["CABG", "Valve surgery", "Minimally invasive cardiac surgery"],
    awards: ["Padma Shri", "Padma Bhushan", "Dr. B. C. Roy National Award"],
    fellowships: [],
    sourceUrl: "https://www.medanta.org/hospitals-near-me/gurugram-hospital/speciality/cardiology/doctor/dr-naresh-trehan",
  },
  {
    slug: "dr-adarsh-chaudhary",
    name: "Dr. Adarsh Chaudhary",
    title: "Chairman, Gastrosciences",
    qualifications: ["MBBS", "MS (General Surgery)", "FRCS"],
    specialization: "Gastroenterology",
    subspecialties: ["GI Surgery", "GI Oncology", "Hepatobiliary Surgery", "Minimally Invasive Surgery"],
    hospitalId: "medanta-gurugram",
    hospitalGroup: "Medanta - The Medicity",
    city: "Gurugram",
    state: "Haryana",
    yearsOfExperience: 40,
    expertise: ["Upper and lower GI oncosurgery", "Pancreatic surgery", "Hepatobiliary surgery"],
    treatments: ["pancreatic-disorders", "colorectal-surgery", "gallbladder-surgery", "gerd-surgery"],
    procedures: ["GI oncosurgery", "Pancreatic surgery", "Minimally invasive surgery"],
    awards: [],
    fellowships: ["Fellowship of the Royal College of Surgeons"],
    sourceUrl: "https://www.medanta.org/doctor-listing",
  },
  {
    slug: "dr-tejinder-kataria",
    name: "Dr. Tejinder Kataria",
    title: "Chairperson, Radiation Oncology",
    qualifications: ["MBBS", "MD (Radiotherapy)"],
    specialization: "Radiation Oncology",
    subspecialties: ["Stereotactic Radiotherapy", "Image-Guided Radiotherapy", "Cancer Care"],
    hospitalId: "medanta-gurugram",
    hospitalGroup: "Medanta - The Medicity",
    city: "Gurugram",
    state: "Haryana",
    yearsOfExperience: 35,
    expertise: ["Precision radiotherapy", "Multidisciplinary cancer care", "Advanced radiation planning"],
    treatments: ["radiotherapy", "breast-cancer", "lung-cancer", "prostate-cancer"],
    procedures: ["Radiotherapy planning", "Image-guided radiotherapy", "Stereotactic radiotherapy"],
    awards: [],
    fellowships: [],
    sourceUrl: "https://www.medanta.org/doctor-listing",
  },
  {
    slug: "dr-sandeep-vaishya",
    name: "Dr. Sandeep Vaishya",
    title: "Executive Director & HOD, Neurosurgery",
    qualifications: ["MBBS", "MS (General Surgery)", "MCh (Neurosurgery)"],
    specialization: "Neurosurgery",
    subspecialties: ["Neuro and Spine Surgery", "Gamma Knife Surgery", "Skull Base Surgery", "Functional Neurosurgery"],
    hospitalId: "fortis-memorial-gurugram",
    hospitalGroup: "Fortis Healthcare",
    city: "Gurugram",
    state: "Haryana",
    yearsOfExperience: 30,
    expertise: ["Minimally invasive neurosurgery", "Intracranial tumour surgery", "Spinal surgery", "Peripheral nerve surgery"],
    treatments: ["brain-tumor-surgery", "spine-surgery", "deep-brain-stimulation", "spinal-tumor-surgery"],
    procedures: ["Gamma Knife surgery", "Skull base tumour surgery", "Image-guided neurosurgery"],
    awards: ["Herbert Krause Medal"],
    fellowships: ["Sundt Fellowship, Mayo Clinic, USA"],
    sourceUrl: "https://www.fortishealthcare.com/doctors/dr-sandeep-vaishya-566",
  },
];

function createDoctor(seed: DoctorSeed, index: number): Doctor {
  const biography = `${seed.name} is a ${seed.specialization.toLowerCase()} specialist associated with ${seed.hospitalGroup} in ${seed.city}. This profile supports international patient discovery and MedPobeda Group consultation coordination.`;
  return {
    id: seed.slug,
    ...seed,
    country: "India",
    patientsTreated: "Available on request",
    proceduresPerformed: "Available on request",
    specialInterests: seed.expertise,
    successAreas: seed.subspecialties,
    languages: ["English", "Hindi"],
    education: seed.qualifications,
    training: seed.fellowships,
    certifications: [],
    memberships: [],
    professionalAchievements: [...seed.awards, ...seed.fellowships],
    biography,
    professionalSummary: biography,
    diseases: seed.subspecialties,
    publications: ["Publication details available from the hospital profile"],
    research: ["Research interests align with the listed areas of expertise"],
    consultationAvailable: true,
    teleconsultationAvailable: true,
    internationalPatients: true,
    image: profileImage,
    gallery,
    addedAt: new Date(Date.UTC(2026, 6, 28 - index)).toISOString(),
    seo: {
      title: `${seed.name} | ${seed.specialization} in India | MedPobeda Group`,
      description: `Request a consultation with ${seed.name}, ${seed.specialization} specialist at ${seed.hospitalGroup}, through MedPobeda Group international patient support.`,
      keywords: [seed.name, `${seed.name} appointment`, seed.specialization, seed.hospitalGroup, ...seed.treatments],
    },
  };
}

export const doctors: Doctor[] = seeds.map(createDoctor);

export const specialtyNames = [
  "Cardiology", "Cardiac Surgery", "Neurosurgery", "Orthopaedics", "Oncology",
  "Radiation Oncology", "Medical Oncology", "Nephrology", "Urology", "Gastroenterology",
  "Liver Transplant", "Kidney Transplant", "Pulmonology", "Plastic Surgery",
  "Cosmetic Surgery", "IVF", "Fertility", "Pediatrics", "Obstetrics", "Gynecology",
  "Ophthalmology", "ENT", "Emergency Medicine", "Robotic Surgery",
] as const;

export const specialties = specialtyNames.map((name) => ({
  name,
  slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
}));

export function getDoctorBySlug(slug: string) {
  return doctors.find((doctor) => doctor.slug === slug) ?? null;
}
