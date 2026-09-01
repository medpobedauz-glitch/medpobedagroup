import type { Hospital } from "@/lib/data/hospitals";

export type TreatmentFaq = { question: string; answer: string };
export type TreatmentCost = {
  estimatedCostIndia: string;
  averageHospitalStay: string;
  averageIcuStay: string;
  recoveryTime: string;
  travelDuration: string;
  companionAllowed: boolean;
};

export type Treatment = {
  id: string;
  slug: string;
  name: string;
  category: string;
  specialty: string;
  organSystem: string;
  shortDescription: string;
  overview: string;
  symptoms: string[];
  causes: string[];
  diagnosis: string[];
  treatmentOptions: string[];
  benefits: string[];
  procedure: string[];
  recovery: string[];
  risks: string[];
  expectedOutcomes: string[];
  successRate: string;
  estimatedHospitalStay: string;
  estimatedRecoveryTime: string;
  cost: TreatmentCost;
  suitableHospitals: string[];
  relatedTreatments: string[];
  relatedSpecialties: string[];
  faq: TreatmentFaq[];
  seo: { title: string; description: string; keywords: string[] };
  heroImage: string;
  icon: string;
  featured: boolean;
  popular: boolean;
  addedAt: string;
};

type Seed = {
  name: string;
  category: string;
  specialty: string;
  organSystem: string;
  icon: string;
  featured?: boolean;
  popular?: boolean;
};

const categoryHospitals: Record<string, string[]> = {
  Cardiology: ["apollo-hospitals-chennai", "medanta-gurugram", "kims-secunderabad", "fortis-escorts-delhi", "max-saket", "geims-dehradun"],
  Oncology: ["apollo-hospitals-chennai", "yashoda-hospitals-somajiguda", "aster-medcity-kochi", "fortis-memorial-gurugram", "mgm-healthcare-chennai"],
  Neurosciences: ["kims-secunderabad", "apollo-hospitals-chennai", "medanta-gurugram", "fortis-memorial-gurugram", "geims-dehradun"],
  Orthopaedics: ["apollo-hospitals-chennai", "fortis-memorial-gurugram", "max-saket", "manipal-hospital-old-airport-road", "kims-secunderabad"],
  "Organ Transplant": ["apollo-hospitals-chennai", "medanta-gurugram", "rela-hospital-chennai", "aster-medcity-kochi", "kims-secunderabad"],
  Gastroenterology: ["rela-hospital-chennai", "apollo-hospitals-chennai", "medanta-gurugram", "kims-secunderabad", "gleneagles-hospital-chennai"],
  Nephrology: ["apollo-hospitals-chennai", "medanta-gurugram", "kims-secunderabad", "fortis-memorial-gurugram"],
  Gynecology: ["apollo-hospitals-hyderabad", "yashoda-hospitals-somajiguda", "kims-kondapur", "max-saket"],
  Fertility: ["apollo-hospitals-chennai", "kims-kondapur", "manipal-hospital-old-airport-road", "aster-medcity-kochi"],
  "Plastic Surgery": ["kokilaben-hospital-mumbai", "apollo-hospitals-chennai", "max-saket", "fortis-memorial-gurugram"],
  Ophthalmology: ["apollo-hospitals-chennai", "medanta-gurugram", "kims-secunderabad", "manipal-hospital-old-airport-road"],
};

const categoryImages: Record<string, string> = {
  Cardiology: "/images/medical-tourism/medical-documents-review.jpg",
  Oncology: "/images/hospitals/doctors-clinical-discussion.jpg",
  Neurosciences: "/images/patients/doctor-patient-discussion.jpg",
  Orthopaedics: "/images/medical-tourism/international-patient-support.jpg",
  "Organ Transplant": "/images/hospitals/medical-conference-seminar.jpg",
};

const seeds: Seed[] = [
  { name: "Cardiology", category: "Cardiology", specialty: "Cardiology", organSystem: "Cardiovascular", icon: "HeartPulse", featured: true },
  { name: "Heart Surgery", category: "Cardiology", specialty: "Cardiac Surgery", organSystem: "Cardiovascular", icon: "HeartPulse", popular: true, featured: true },
  { name: "CABG", category: "Cardiology", specialty: "Cardiac Surgery", organSystem: "Cardiovascular", icon: "HeartPulse", popular: true },
  { name: "Valve Replacement", category: "Cardiology", specialty: "Cardiac Surgery", organSystem: "Cardiovascular", icon: "HeartPulse" },
  { name: "Angioplasty", category: "Cardiology", specialty: "Cardiology", organSystem: "Cardiovascular", icon: "Activity", popular: true },
  { name: "Pacemaker Implantation", category: "Cardiology", specialty: "Cardiology", organSystem: "Cardiovascular", icon: "Activity" },
  { name: "Electrophysiology", category: "Cardiology", specialty: "Cardiology", organSystem: "Cardiovascular", icon: "Activity" },
  ...["Breast Cancer", "Lung Cancer", "Colon Cancer", "Liver Cancer", "Prostate Cancer", "Leukemia", "Bone Marrow Transplant", "Chemotherapy", "Radiotherapy", "Immunotherapy"].map((name, index) => ({ name, category: "Oncology", specialty: "Oncology", organSystem: index === 0 ? "Breast" : "Oncology", icon: "Microscope", popular: index < 3, featured: index === 0 })),
  ...["Brain Tumor Surgery", "Stroke Treatment", "Epilepsy Surgery", "Deep Brain Stimulation", "Spinal Tumor Surgery", "Hydrocephalus", "Aneurysm Clipping"].map((name, index) => ({ name, category: "Neurosciences", specialty: index === 1 ? "Neurology" : "Neurosurgery", organSystem: "Nervous System", icon: "Brain", popular: index < 2, featured: index === 0 })),
  ...["Knee Replacement", "Hip Replacement", "Shoulder Replacement", "Sports Injury", "Arthroscopy", "ACL Reconstruction", "Spine Surgery", "Scoliosis Surgery"].map((name, index) => ({ name, category: "Orthopaedics", specialty: "Orthopaedics", organSystem: "Musculoskeletal", icon: "Bone", popular: index < 2, featured: index === 0 })),
  ...["Kidney Transplant", "Liver Transplant", "Heart Transplant", "Lung Transplant"].map((name, index) => ({ name, category: "Organ Transplant", specialty: `${name.replace(" Transplant", "")} Transplant`, organSystem: "Transplant Medicine", icon: "ShieldCheck", popular: index < 2, featured: index === 1 })),
  ...["Gallbladder Surgery", "Hernia Surgery", "GERD Surgery", "Liver Disease", "Pancreatic Disorders", "Colorectal Surgery"].map((name) => ({ name, category: "Gastroenterology", specialty: "Gastroenterology", organSystem: "Digestive System", icon: "Stethoscope" })),
  ...["Dialysis", "Kidney Stone Surgery", "Urology", "Prostate Surgery"].map((name) => ({ name, category: "Nephrology", specialty: name.includes("Prostate") || name === "Urology" ? "Urology" : "Nephrology", organSystem: "Renal and Urinary", icon: "Droplets" })),
  ...["Fibroid Surgery", "Endometriosis", "Hysterectomy", "High-Risk Pregnancy"].map((name) => ({ name, category: "Gynecology", specialty: "Gynecology", organSystem: "Reproductive System", icon: "HeartHandshake" })),
  ...["IVF", "ICSI", "Egg Freezing", "Male Infertility", "Female Infertility"].map((name, index) => ({ name, category: "Fertility", specialty: "Fertility", organSystem: "Reproductive System", icon: "Baby", popular: index === 0, featured: index === 0 })),
  ...["Rhinoplasty", "Facelift", "Liposuction", "Breast Reconstruction", "Hair Transplant"].map((name) => ({ name, category: "Plastic Surgery", specialty: "Plastic Surgery", organSystem: "Integumentary", icon: "Sparkles" })),
  ...["LASIK", "Cataract Surgery", "Corneal Transplant", "Retina Surgery"].map((name, index) => ({ name, category: "Ophthalmology", specialty: "Ophthalmology", organSystem: "Visual System", icon: "Eye", popular: index === 1 })),
];

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function makeFaq(name: string): TreatmentFaq[] {
  const items = [
    ["What is", `${name} is a specialist-led medical pathway. The exact approach depends on diagnosis, test results, general health, and the treating team's recommendations.`],
    ["Who may need", `A specialist may recommend ${name} after reviewing symptoms, previous treatment, imaging, laboratory results, and the patient's overall condition.`],
    ["How is it diagnosed before", `Doctors may use clinical examination, imaging, laboratory tests, pathology, or functional tests before planning ${name}.`],
    ["How should international patients prepare for", `International patients should organize recent reports, scans, prescriptions, passport details, and a concise medical history for review.`],
    ["How long does", `The timeline varies by complexity. The hospital confirms the likely procedure, admission, and recovery schedule after medical review.`],
    ["Is travel to India required for", `Some initial reviews can be completed by teleconsultation, while procedures and detailed examinations generally require travel to India.`],
    ["Can a companion travel with the patient for", `Yes, a companion can usually travel with the patient, subject to hospital policy and current visa requirements.`],
    ["What affects the cost of", `Cost depends on the hospital, specialist, procedure complexity, room category, investigations, implants or medicines, and length of stay.`],
    ["What happens after", `Follow-up may include medicines, rehabilitation, wound care, repeat testing, lifestyle guidance, or teleconsultation with the treating team.`],
    ["How can MedPobeda Group help with", `MedPobeda Group coordinates report review, hospital communication, estimates, visas, travel, interpreters, accommodation, and follow-up support for ${name}.`],
  ];
  return items.map(([question, answer]) => ({ question: `${question} ${name}?`, answer }));
}

function createTreatment(seed: Seed, index: number): Treatment {
  const slug = slugify(seed.name);
  const hospitalSlugs = categoryHospitals[seed.category] ?? categoryHospitals.Cardiology;
  const overview = `${seed.name} in India is delivered through specialist evaluation, modern diagnostics, and a personalized treatment plan. MedPobeda Group helps international patients compare appropriate hospitals and coordinate the complete care journey.`;
  return {
    id: slug,
    slug,
    name: seed.name,
    category: seed.category,
    specialty: seed.specialty,
    organSystem: seed.organSystem,
    shortDescription: `Specialist ${seed.name.toLowerCase()} planning in India with hospital matching and international patient support.`,
    overview,
    symptoms: ["Persistent or worsening symptoms", "Abnormal diagnostic findings", "Reduced daily function", "Symptoms not improving with current care"],
    causes: ["Underlying disease or injury", "Genetic or age-related factors", "Lifestyle and environmental factors", "Previous or progressive medical conditions"],
    diagnosis: ["Specialist consultation", "Medical history and examination", "Laboratory and imaging review", "Additional procedure-specific testing"],
    treatmentOptions: ["Conservative or medical management", `Specialist-led ${seed.name.toLowerCase()}`, "Minimally invasive options where suitable", "Rehabilitation and follow-up care"],
    benefits: ["Specialist hospital access", "Multidisciplinary case review", "Modern diagnostic and treatment technology", "Coordinated international patient journey"],
    procedure: ["Remote medical-report review", "Specialist evaluation and pre-treatment tests", "Personalized treatment or procedure", "Monitoring, discharge planning, and follow-up"],
    recovery: ["Immediate clinical monitoring", "Hospital discharge when medically appropriate", "Medication and rehabilitation plan", "Remote follow-up after returning home"],
    risks: ["Infection or bleeding", "Reaction to medicines or anesthesia", "Procedure-specific complications", "Need for additional treatment or longer recovery"],
    expectedOutcomes: ["Treatment goals are defined after specialist assessment", "Outcomes depend on diagnosis, stage, health, and response", "Rehabilitation and follow-up can influence recovery"],
    successRate: "Individual success rates are confirmed by the treating hospital after case review.",
    estimatedHospitalStay: "3–10 days, depending on the treatment plan",
    estimatedRecoveryTime: "2–12 weeks, depending on complexity",
    cost: {
      estimatedCostIndia: "Available after medical-report review",
      averageHospitalStay: "3–10 days",
      averageIcuStay: "0–3 days, if clinically required",
      recoveryTime: "2–12 weeks",
      travelDuration: "Allow 2–4 weeks in India",
      companionAllowed: true,
    },
    suitableHospitals: hospitalSlugs,
    relatedTreatments: [],
    relatedSpecialties: [seed.specialty, seed.category].filter((value, itemIndex, values) => values.indexOf(value) === itemIndex),
    faq: makeFaq(seed.name),
    seo: {
      title: `${seed.name} in India | Cost & Hospitals | MedPobeda Group`,
      description: `Explore ${seed.name} in India with suitable hospitals, expected stay, recovery, and full international patient support from MedPobeda Group.`,
      keywords: [`${seed.name} in India`, `${seed.name} cost India`, `${seed.name} hospitals`, seed.specialty, "medical tourism India"],
    },
    heroImage: categoryImages[seed.category] ?? "/images/medical-tourism/international-patient-support.jpg",
    icon: seed.icon,
    featured: seed.featured ?? false,
    popular: seed.popular ?? false,
    addedAt: new Date(Date.UTC(2026, 6, Math.max(1, 28 - (index % 27)))).toISOString(),
  };
}

export const treatments: Treatment[] = seeds.map(createTreatment).map((treatment, _, all) => ({
  ...treatment,
  relatedTreatments: all
    .filter((candidate) => candidate.slug !== treatment.slug && candidate.category === treatment.category)
    .slice(0, 4)
    .map((candidate) => candidate.slug),
}));

export const treatmentCategories = [...new Set(treatments.map((item) => item.category))].sort();
export const treatmentSpecialties = [...new Set(treatments.map((item) => item.specialty))].sort();
export const treatmentOrganSystems = [...new Set(treatments.map((item) => item.organSystem))].sort();

export function getTreatmentBySlug(slug: string) {
  return treatments.find((item) => item.slug === slug) ?? null;
}

export function getTreatmentHospitals(treatment: Treatment, hospitals: Hospital[]) {
  return treatment.suitableHospitals
    .map((slug) => hospitals.find((hospital) => hospital.slug === slug))
    .filter((hospital): hospital is Hospital => Boolean(hospital));
}
