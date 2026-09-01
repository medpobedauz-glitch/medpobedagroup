import type { Doctor } from "@/lib/data/doctors";
import type { Hospital } from "@/lib/data/hospitals";
import type { Treatment } from "@/lib/data/treatments";

export const DISEASE_LOCALES = ["en", "ru", "uz", "ar"] as const;

export type DiseaseLocale = (typeof DISEASE_LOCALES)[number];
export type DiseaseSeverity = "Low" | "Moderate" | "High" | "Critical" | "Variable";
export type SurgeryLikelihood = "No" | "Rarely" | "Sometimes" | "Often";

export type DiseaseFaq = {
  question: string;
  answer: string;
};

export type DiseaseQuickFacts = {
  commonAgeGroup: string;
  riskLevel: DiseaseSeverity;
  treatable: string;
  requiresSurgery: SurgeryLikelihood;
  recoveryTime: string;
  medicalSpecialty: string;
};

export type DiseasePatientEducation = {
  dos: string[];
  donts: string[];
  healthyLifestyleTips: string[];
  dietAdvice: string[];
  exerciseAdvice: string[];
  recoveryGuidance: string[];
  travelConsiderations: string[];
};

export type DiseaseSeo = {
  title: string;
  description: string;
  keywords: string[];
};

/**
 * Localized overrides intentionally use the same content keys as the English
 * source. A translation can be published field-by-field without duplicating
 * relationship, routing, analytics, or clinical classification data.
 */
export type DiseaseTranslation = Partial<
  Pick<
    Disease,
    | "name"
    | "shortDescription"
    | "overview"
    | "causes"
    | "riskFactors"
    | "symptoms"
    | "warningSigns"
    | "complications"
    | "diagnosis"
    | "stages"
    | "prevention"
    | "treatmentOptions"
    | "prognosis"
    | "recovery"
    | "lifestyleChanges"
    | "whenToSeeDoctor"
    | "faqs"
    | "quickFacts"
    | "patientEducation"
    | "seo"
  >
>;

export type Disease = {
  id: string;
  slug: string;
  name: string;
  category: string;
  organSystem: string;
  specialty: string;
  shortDescription: string;
  overview: string;
  causes: string[];
  riskFactors: string[];
  symptoms: string[];
  warningSigns: string[];
  complications: string[];
  diagnosis: string[];
  stages: string[];
  prevention: string[];
  treatmentOptions: string[];
  prognosis: string;
  recovery: string[];
  lifestyleChanges: string[];
  whenToSeeDoctor: string[];
  faqs: DiseaseFaq[];
  quickFacts: DiseaseQuickFacts;
  patientEducation: DiseasePatientEducation;
  relatedDiseases: string[];
  relatedTreatments: string[];
  relatedHospitals: string[];
  relatedDoctors: string[];
  relatedArticles: string[];
  heroImage: string;
  icon: string;
  severity: DiseaseSeverity;
  emergency: boolean;
  emergencyMessage: string | null;
  featured: boolean;
  popular: boolean;
  addedAt: string;
  seo: DiseaseSeo;
  translations: Partial<Record<Exclude<DiseaseLocale, "en">, DiseaseTranslation>>;
};

export type DiseaseDirectoryRelation = {
  slug: string;
  name: string;
};

export type DiseaseDirectoryEntry = Pick<
  Disease,
  | "id"
  | "slug"
  | "name"
  | "category"
  | "organSystem"
  | "specialty"
  | "shortDescription"
  | "symptoms"
  | "warningSigns"
  | "heroImage"
  | "severity"
  | "featured"
  | "popular"
  | "addedAt"
> & {
  hospitals: DiseaseDirectoryRelation[];
  treatments: DiseaseDirectoryRelation[];
  doctorSearchTerms: string[];
};

type DiseaseSeed = {
  name: string;
  category: keyof typeof categoryProfiles;
  organSystem: string;
  specialty: string;
  shortDescription: string;
  symptoms: string[];
  treatments: string[];
  severity?: DiseaseSeverity;
  age?: string;
  surgery?: SurgeryLikelihood;
  emergency?: boolean;
  warningSigns?: string[];
  featured?: boolean;
  popular?: boolean;
};

type CategoryProfile = {
  causes: string[];
  riskFactors: string[];
  diagnosis: string[];
  complications: string[];
  prevention: string[];
  lifestyleChanges: string[];
  hospitals: string[];
  doctors: string[];
  article: string;
  heroImage: string;
  icon: string;
};

export const DISEASE_EMERGENCY_MESSAGE =
  "If you are experiencing symptoms of a medical emergency, seek immediate emergency medical care or contact your local emergency services. Do not rely on this website for urgent medical treatment.";

export const DISEASE_MEDICAL_DISCLAIMER =
  "This information is for patient education only and does not replace diagnosis, examination, or advice from a qualified medical professional.";

const categoryProfiles = {
  Cardiology: {
    causes: [
      "Changes affecting the heart muscle, valves, rhythm, or blood vessels",
      "Genetic or congenital factors in some people",
      "Long-term metabolic, inflammatory, or lifestyle-related factors",
    ],
    riskFactors: [
      "Older age or a family history of cardiovascular disease",
      "High blood pressure, diabetes, or unhealthy cholesterol levels",
      "Smoking, low physical activity, obesity, or an unbalanced diet",
    ],
    diagnosis: [
      "Clinical history, examination, blood pressure, and cardiovascular risk review",
      "Electrocardiogram and blood tests when clinically indicated",
      "Echocardiography, stress testing, CT, MRI, or angiography selected by a cardiologist",
    ],
    complications: [
      "Reduced heart function or impaired circulation",
      "Abnormal heart rhythm, blood clots, stroke, or organ injury",
      "Need for urgent admission or an invasive procedure in severe cases",
    ],
    prevention: [
      "Do not smoke and ask for support to stop if needed",
      "Manage blood pressure, diabetes, and cholesterol with professional guidance",
      "Choose regular activity and a heart-supportive diet appropriate to your health",
    ],
    lifestyleChanges: [
      "Take prescribed medicines consistently and attend scheduled monitoring",
      "Limit tobacco, excess alcohol, and highly processed foods",
      "Discuss safe exercise, sleep, stress, and weight goals with the care team",
    ],
    hospitals: ["apollo-hospitals-chennai", "kims-secunderabad", "medanta-gurugram", "fortis-escorts-delhi", "geims-dehradun", "max-saket"],
    doctors: ["dr-naresh-trehan"],
    article: "cardiology-treatment-abroad-planning-guide",
    heroImage: "/images/medical-tourism/medical-documents-review.jpg",
    icon: "HeartPulse",
  },
  Neurology: {
    causes: [
      "Changes in the brain, spinal cord, nerves, or their blood supply",
      "Genetic, developmental, immune, infectious, vascular, or degenerative factors",
      "In some patients, no single cause can be confirmed",
    ],
    riskFactors: [
      "Age, family history, or a previous neurological event",
      "Vascular risks such as high blood pressure, diabetes, or smoking",
      "Selected infections, injuries, medicines, or immune conditions",
    ],
    diagnosis: [
      "Detailed neurological history and examination",
      "MRI or CT imaging selected according to symptoms and urgency",
      "Blood, electrical, spinal-fluid, vascular, genetic, or tissue tests when indicated",
    ],
    complications: [
      "Changes in movement, speech, memory, sensation, vision, or independence",
      "Falls, seizures, swallowing problems, or secondary infection",
      "Permanent neurological disability or life-threatening deterioration in severe cases",
    ],
    prevention: [
      "Control blood pressure and other modifiable vascular risks",
      "Use protective equipment and follow infection-prevention advice",
      "Seek early review for new neurological symptoms rather than self-treating",
    ],
    lifestyleChanges: [
      "Follow medicine, rehabilitation, sleep, and safety plans",
      "Use mobility or communication aids recommended by the clinical team",
      "Involve family or caregivers when daily function is affected",
    ],
    hospitals: ["kims-secunderabad", "apollo-hospitals-chennai", "medanta-gurugram", "fortis-memorial-gurugram", "geims-dehradun"],
    doctors: ["dr-sandeep-vaishya"],
    article: "second-medical-opinion-international-patients-guide",
    heroImage: "/images/patients/doctor-patient-discussion.jpg",
    icon: "Brain",
  },
  Oncology: {
    causes: [
      "DNA changes that allow abnormal cells to grow or spread",
      "A combination of age, inherited susceptibility, environment, and lifestyle",
      "Some infections, hormones, radiation, or occupational exposures for selected cancers",
    ],
    riskFactors: [
      "Older age or a personal or family history of cancer",
      "Tobacco, alcohol, obesity, ultraviolet light, or selected environmental exposures",
      "Certain inherited variants, chronic inflammation, or infections",
    ],
    diagnosis: [
      "Clinical examination and organ-specific imaging",
      "Biopsy or blood and bone-marrow testing to confirm the diagnosis when appropriate",
      "Pathology, molecular testing, and staging studies used to plan treatment",
    ],
    complications: [
      "Local tissue or organ damage",
      "Spread to lymph nodes or distant organs",
      "Blood clots, infection, pain, weight loss, or treatment-related effects",
    ],
    prevention: [
      "Avoid tobacco and limit avoidable carcinogen exposure",
      "Use recommended vaccination and age-appropriate screening",
      "Maintain a healthy weight and seek review for persistent unexplained symptoms",
    ],
    lifestyleChanges: [
      "Prioritize adequate nutrition, symptom control, sleep, and emotional support",
      "Use activity plans suited to energy level, blood counts, and treatment phase",
      "Discuss supplements and complementary therapies before using them",
    ],
    hospitals: ["apollo-hospitals-chennai", "yashoda-hospitals-somajiguda", "fortis-memorial-gurugram", "aster-medcity-kochi", "mgm-healthcare-chennai"],
    doctors: ["dr-tejinder-kataria"],
    article: "oncology-treatment-abroad-patient-guide",
    heroImage: "/images/hospitals/doctors-clinical-discussion.jpg",
    icon: "Microscope",
  },
  Orthopaedics: {
    causes: [
      "Injury, repetitive loading, degeneration, inflammation, or altered alignment",
      "Age-related changes or reduced bone and joint strength",
      "Congenital, autoimmune, infectious, or metabolic factors in some cases",
    ],
    riskFactors: [
      "Older age, previous injury, family history, or physically demanding activity",
      "Low bone density, obesity, smoking, or poor muscle conditioning",
      "Inflammatory disease or medicines that affect bone health",
    ],
    diagnosis: [
      "Musculoskeletal history, movement assessment, and physical examination",
      "X-ray, ultrasound, CT, or MRI selected for the affected structure",
      "Blood tests, bone-density testing, or joint-fluid analysis when indicated",
    ],
    complications: [
      "Persistent pain, stiffness, weakness, or reduced mobility",
      "Joint instability, deformity, nerve symptoms, or loss of independence",
      "Blood clots, pressure injury, or deconditioning after severe injury or surgery",
    ],
    prevention: [
      "Use safe technique and appropriate protective equipment",
      "Build strength, flexibility, balance, and bone health gradually",
      "Address fall risks and seek early review after significant injury",
    ],
    lifestyleChanges: [
      "Balance activity with recovery and avoid sudden unsupported load increases",
      "Maintain a healthy weight and follow physiotherapy guidance",
      "Use footwear, braces, or mobility aids only as professionally advised",
    ],
    hospitals: ["apollo-hospitals-chennai", "fortis-memorial-gurugram", "max-saket", "manipal-hospital-old-airport-road", "kims-secunderabad"],
    doctors: [],
    article: "how-to-choose-hospital-for-treatment-abroad",
    heroImage: "/images/medical-tourism/international-patient-support.jpg",
    icon: "Bone",
  },
  Nephrology: {
    causes: [
      "Diabetes, high blood pressure, obstruction, infection, or immune disease",
      "Inherited or structural kidney conditions",
      "Medicines, toxins, dehydration, or reduced blood flow in selected cases",
    ],
    riskFactors: [
      "Diabetes, hypertension, cardiovascular disease, or family history",
      "Older age, recurrent urinary problems, or previous kidney injury",
      "Smoking, obesity, or unsupervised use of kidney-affecting medicines",
    ],
    diagnosis: [
      "Blood pressure, blood creatinine, estimated kidney function, and urine testing",
      "Ultrasound, CT, or other urinary-tract imaging when indicated",
      "Metabolic testing, genetic testing, or kidney biopsy for selected patients",
    ],
    complications: [
      "Fluid, electrolyte, acid-base, or blood-pressure imbalance",
      "Anemia, bone disease, infection, or cardiovascular problems",
      "Need for dialysis or transplantation if kidney function becomes severely impaired",
    ],
    prevention: [
      "Control diabetes and blood pressure",
      "Avoid unreviewed painkillers, supplements, and dehydration",
      "Use individualized salt, protein, and fluid advice rather than restrictive self-diets",
    ],
    lifestyleChanges: [
      "Monitor medicines, blood pressure, weight, and laboratory results as advised",
      "Follow a renal diet only when tailored by the clinical team",
      "Plan vaccinations, exercise, and travel around kidney function and treatment needs",
    ],
    hospitals: ["apollo-hospitals-chennai", "medanta-gurugram", "kims-secunderabad", "fortis-memorial-gurugram"],
    doctors: [],
    article: "organ-transplant-coordination-family-guide",
    heroImage: "/images/medical-tourism/medical-documents-review.jpg",
    icon: "Droplets",
  },
  Urology: {
    causes: [
      "Structural, muscular, nerve, hormonal, infectious, or age-related urinary changes",
      "Obstruction or dysfunction affecting urine storage or flow",
      "In some patients, several factors occur together",
    ],
    riskFactors: [
      "Older age, pelvic surgery, childbirth, neurological disease, or family history",
      "Diabetes, obesity, smoking, or recurrent urinary infection",
      "Medicines and fluid habits can influence symptoms in some people",
    ],
    diagnosis: [
      "Urinary and medical history with abdominal, pelvic, or prostate examination as appropriate",
      "Urine testing, blood testing, and ultrasound",
      "Flow studies, endoscopy, urodynamics, MRI, or biopsy when clinically indicated",
    ],
    complications: [
      "Urinary retention, infection, stones, or kidney impairment",
      "Skin problems, sleep disturbance, or reduced quality of life",
      "Need for catheterization or a procedure in selected cases",
    ],
    prevention: [
      "Seek assessment for persistent urinary symptoms or visible blood in urine",
      "Manage constipation, diabetes, weight, and smoking",
      "Follow individualized fluid and pelvic-floor advice",
    ],
    lifestyleChanges: [
      "Track symptoms and fluid patterns when requested",
      "Use bladder training or pelvic-floor therapy under professional guidance",
      "Avoid starting urinary medicines or supplements without review",
    ],
    hospitals: ["apollo-hospitals-chennai", "medanta-gurugram", "kims-secunderabad", "max-saket"],
    doctors: [],
    article: "second-medical-opinion-international-patients-guide",
    heroImage: "/images/patients/doctor-patient-discussion.jpg",
    icon: "Stethoscope",
  },
  Gastroenterology: {
    causes: [
      "Inflammatory, infectious, metabolic, structural, or immune-related digestive changes",
      "Diet, medicines, alcohol, or bile-flow factors in selected conditions",
      "Inherited susceptibility or an altered gut–immune response in some patients",
    ],
    riskFactors: [
      "Family history, age, obesity, smoking, alcohol, or metabolic disease",
      "Selected infections, medicines, operations, or immune conditions",
      "Dietary patterns may influence symptoms but are rarely the only cause",
    ],
    diagnosis: [
      "Digestive history, examination, blood and stool tests",
      "Ultrasound, CT, MRI, endoscopy, or functional testing selected by the specialist",
      "Biopsy, liver stiffness, or other organ-specific tests when indicated",
    ],
    complications: [
      "Bleeding, obstruction, infection, malnutrition, or dehydration",
      "Scarring or impaired liver, pancreatic, bowel, or gallbladder function",
      "Need for hospitalization, endoscopy, drainage, or surgery in severe cases",
    ],
    prevention: [
      "Use medicines, alcohol, and supplements safely",
      "Maintain vaccination, food hygiene, and metabolic-health measures",
      "Seek review for persistent pain, bleeding, jaundice, weight loss, or swallowing difficulty",
    ],
    lifestyleChanges: [
      "Use a symptom-informed diet designed with a clinician or dietitian",
      "Avoid tobacco and limit alcohol according to medical advice",
      "Maintain hydration, activity, sleep, and prescribed follow-up",
    ],
    hospitals: ["rela-hospital-chennai", "apollo-hospitals-chennai", "medanta-gurugram", "kims-secunderabad", "gleneagles-hospital-chennai"],
    doctors: ["dr-adarsh-chaudhary"],
    article: "how-international-patients-can-prepare-for-treatment-in-india",
    heroImage: "/images/hospitals/medical-conference-seminar.jpg",
    icon: "Stethoscope",
  },
  Endocrinology: {
    causes: [
      "Hormone overproduction, underproduction, or altered hormone response",
      "Autoimmune, genetic, metabolic, medication-related, or tumor-related factors",
      "The cause varies considerably by gland and condition",
    ],
    riskFactors: [
      "Family history, age, autoimmune disease, obesity, or previous gland treatment",
      "Selected medicines, radiation exposure, pregnancy, or other hormone disorders",
      "Risk factors do not confirm that a person has an endocrine disease",
    ],
    diagnosis: [
      "Clinical assessment and targeted blood or urine hormone tests",
      "Dynamic hormone testing when simple levels are insufficient",
      "Ultrasound, CT, MRI, nuclear imaging, or biopsy when indicated",
    ],
    complications: [
      "Effects on the heart, bones, fertility, growth, mood, or metabolism",
      "Acute hormone crisis in severe untreated cases",
      "Long-term organ complications when control remains poor",
    ],
    prevention: [
      "Attend screening when personal or family risk is increased",
      "Use steroid and hormone medicines only as directed",
      "Support metabolic health with sustainable nutrition, activity, and sleep",
    ],
    lifestyleChanges: [
      "Take hormones or metabolic medicines at the prescribed time and dose",
      "Learn condition-specific sick-day and monitoring instructions",
      "Carry relevant medical identification when an acute hormone crisis is possible",
    ],
    hospitals: ["medanta-gurugram", "apollo-hospitals-chennai", "max-saket", "kims-secunderabad"],
    doctors: [],
    article: "second-medical-opinion-international-patients-guide",
    heroImage: "/images/patients/doctor-patient-discussion.jpg",
    icon: "Activity",
  },
  Pulmonology: {
    causes: [
      "Airway inflammation, infection, scarring, obstruction, or altered breathing control",
      "Tobacco smoke, air pollution, allergens, work exposure, or immune disease",
      "Genetic or anatomical factors in selected patients",
    ],
    riskFactors: [
      "Smoking or second-hand smoke exposure",
      "Air pollution, dust, fumes, infections, allergy, or family history",
      "Obesity or neurological and anatomical factors for some sleep-related disorders",
    ],
    diagnosis: [
      "Respiratory history, oxygen assessment, and chest examination",
      "Chest X-ray or CT and lung-function testing when appropriate",
      "Sleep testing, sputum studies, bronchoscopy, or blood tests when indicated",
    ],
    complications: [
      "Low oxygen, respiratory failure, infection, or reduced exercise capacity",
      "Pulmonary hypertension or strain on the heart",
      "Sleep, work, travel, and daily activity limitations",
    ],
    prevention: [
      "Avoid tobacco and reduce harmful air or occupational exposure",
      "Use recommended vaccination and infection-control measures",
      "Follow inhaler, oxygen, or airway-device instructions carefully",
    ],
    lifestyleChanges: [
      "Learn correct inhaler or breathing-device technique",
      "Use gradual exercise or pulmonary rehabilitation when cleared",
      "Plan air-quality, infection, altitude, and flight precautions with the care team",
    ],
    hospitals: ["apollo-hospitals-chennai", "medanta-gurugram", "fortis-memorial-gurugram", "kims-secunderabad", "aster-medcity-kochi"],
    doctors: [],
    article: "how-international-patients-can-prepare-for-treatment-in-india",
    heroImage: "/images/medical-tourism/international-patient-support.jpg",
    icon: "Wind",
  },
  Gynecology: {
    causes: [
      "Hormonal, structural, inflammatory, genetic, or age-related reproductive changes",
      "Abnormal tissue growth or altered ovulation in selected conditions",
      "The cause may be multifactorial or remain uncertain",
    ],
    riskFactors: [
      "Age, family history, reproductive history, or hormone exposure",
      "Obesity, metabolic disease, smoking, or previous pelvic infection or surgery",
      "Risk patterns differ between benign and malignant conditions",
    ],
    diagnosis: [
      "Menstrual, reproductive, and general medical history with appropriate examination",
      "Pregnancy testing, blood tests, and pelvic ultrasound",
      "MRI, hysteroscopy, laparoscopy, cervical testing, or biopsy when indicated",
    ],
    complications: [
      "Pain, heavy bleeding, anemia, or reduced daily function",
      "Fertility or pregnancy problems in selected patients",
      "Pressure effects, organ involvement, or cancer spread depending on the condition",
    ],
    prevention: [
      "Attend recommended cervical screening and HPV vaccination programs",
      "Seek review for persistent pain, abnormal bleeding, or a pelvic mass",
      "Support metabolic and reproductive health without relying on unproven remedies",
    ],
    lifestyleChanges: [
      "Track cycles, pain, bleeding, and treatment effects when useful",
      "Address anemia, sleep, activity, and emotional wellbeing",
      "Discuss fertility goals before treatments that may affect reproduction",
    ],
    hospitals: ["apollo-hospitals-hyderabad", "yashoda-hospitals-somajiguda", "kims-kondapur", "max-saket"],
    doctors: [],
    article: "second-medical-opinion-international-patients-guide",
    heroImage: "/images/patients/patient-family-consultation.jpg",
    icon: "HeartHandshake",
  },
  Fertility: {
    causes: [
      "Ovulation, sperm, tubal, uterine, genetic, or age-related factors",
      "Endocrine disease, infection, previous treatment, or lifestyle factors",
      "More than one factor, or no clear cause, may be found",
    ],
    riskFactors: [
      "Increasing reproductive age or known reproductive-system disease",
      "Previous pelvic or testicular infection, surgery, chemotherapy, or radiation",
      "Smoking, marked weight change, heat, toxins, or selected medicines",
    ],
    diagnosis: [
      "Medical, reproductive, menstrual, sexual, and family history for both partners when applicable",
      "Semen analysis, ovulation and hormone assessment, and pelvic ultrasound",
      "Tubal, uterine, genetic, or other specialist tests when indicated",
    ],
    complications: [
      "Emotional distress and strain on relationships",
      "Effects of an underlying reproductive or endocrine condition",
      "Multiple pregnancy or procedure-related risks with selected assisted treatments",
    ],
    prevention: [
      "Protect against sexually transmitted infections and avoid tobacco",
      "Discuss fertility preservation before gonadotoxic treatment",
      "Seek timely assessment based on age, history, and duration of trying to conceive",
    ],
    lifestyleChanges: [
      "Use balanced nutrition, safe activity, and sustainable weight goals",
      "Avoid unregulated fertility supplements or hormones",
      "Include emotional and relationship support in the care plan",
    ],
    hospitals: ["apollo-hospitals-chennai", "kims-kondapur", "manipal-hospital-old-airport-road", "aster-medcity-kochi"],
    doctors: [],
    article: "questions-before-traveling-for-treatment-abroad",
    heroImage: "/images/patients/patient-family-consultation.jpg",
    icon: "Baby",
  },
  Ophthalmology: {
    causes: [
      "Age-related, vascular, pressure-related, inflammatory, genetic, or injury-related eye changes",
      "Alteration of the lens, retina, optic nerve, or supporting structures",
      "The mechanism differs substantially by eye condition",
    ],
    riskFactors: [
      "Older age, family history, diabetes, high blood pressure, or high myopia",
      "Previous eye injury or surgery and long-term steroid exposure",
      "Smoking or ultraviolet exposure for selected conditions",
    ],
    diagnosis: [
      "Visual acuity and full eye examination",
      "Eye-pressure measurement and dilated retinal or optic-nerve assessment",
      "Optical coherence tomography, visual field, ultrasound, or angiography when indicated",
    ],
    complications: [
      "Progressive or permanent loss of vision",
      "Falls, driving limitations, and reduced independence",
      "Pain or secondary eye damage in selected conditions",
    ],
    prevention: [
      "Attend regular eye checks when age or medical risk is increased",
      "Use eye protection and manage diabetes and blood pressure",
      "Seek urgent assessment for sudden vision loss, flashes, a curtain-like shadow, or severe eye pain",
    ],
    lifestyleChanges: [
      "Use prescribed drops correctly and keep follow-up appointments",
      "Improve lighting and reduce fall hazards if vision is limited",
      "Follow driving, lifting, positioning, and travel restrictions after procedures",
    ],
    hospitals: ["apollo-hospitals-chennai", "medanta-gurugram", "kims-secunderabad", "manipal-hospital-old-airport-road"],
    doctors: [],
    article: "how-to-choose-hospital-for-treatment-abroad",
    heroImage: "/images/patients/doctor-patient-discussion.jpg",
    icon: "Eye",
  },
} satisfies Record<string, CategoryProfile>;

const seeds: DiseaseSeed[] = [
  // Cardiology
  { name: "Coronary Artery Disease", category: "Cardiology", organSystem: "Cardiovascular System", specialty: "Cardiology", shortDescription: "Narrowing of the arteries that supply oxygen-rich blood to the heart muscle.", symptoms: ["Chest pressure or discomfort with activity", "Shortness of breath", "Reduced exercise tolerance", "Unusual fatigue"], treatments: ["angioplasty", "cabg", "heart-surgery"], severity: "High", age: "More common after age 45", surgery: "Sometimes", featured: true, popular: true },
  { name: "Heart Failure", category: "Cardiology", organSystem: "Cardiovascular System", specialty: "Cardiology", shortDescription: "A syndrome in which the heart cannot pump or fill well enough for the body's needs.", symptoms: ["Breathlessness", "Leg or ankle swelling", "Fatigue", "Difficulty lying flat"], treatments: ["cardiology", "heart-surgery", "heart-transplant"], severity: "High", age: "More common in older adults", surgery: "Sometimes", featured: true, popular: true },
  { name: "Heart Attack", category: "Cardiology", organSystem: "Cardiovascular System", specialty: "Cardiology", shortDescription: "Urgent heart-muscle injury, usually caused by sudden blockage of a coronary artery.", symptoms: ["Chest pressure, squeezing, or pain", "Shortness of breath", "Cold sweat or nausea", "Pain spreading to the arm, jaw, back, or upper abdomen"], treatments: ["angioplasty", "cabg"], severity: "Critical", age: "Adults; risk rises with age", surgery: "Sometimes", emergency: true, warningSigns: ["New or persistent chest pressure or pain", "Breathlessness, collapse, or a cold sweat", "Pain spreading to the arm, jaw, back, or upper abdomen"], featured: true, popular: true },
  { name: "Arrhythmia", category: "Cardiology", organSystem: "Cardiovascular System", specialty: "Cardiology", shortDescription: "A heartbeat that is unusually fast, slow, or irregular.", symptoms: ["Palpitations", "Dizziness or light-headedness", "Shortness of breath", "Fainting or near-fainting"], treatments: ["electrophysiology", "pacemaker-implantation", "cardiology"], severity: "Variable", age: "Any age; some types increase with age", surgery: "Sometimes" },
  { name: "Valve Disease", category: "Cardiology", organSystem: "Cardiovascular System", specialty: "Cardiac Surgery", shortDescription: "Damage or dysfunction that prevents one or more heart valves from opening or closing normally.", symptoms: ["Breathlessness", "Fatigue", "Chest discomfort", "Swelling or fainting"], treatments: ["valve-replacement", "heart-surgery"], severity: "High", age: "Any age; degenerative forms are common later in life", surgery: "Often" },
  { name: "Congenital Heart Disease", category: "Cardiology", organSystem: "Cardiovascular System", specialty: "Cardiac Surgery", shortDescription: "A structural heart or blood-vessel difference present from birth.", symptoms: ["Blue or grey lips or skin", "Poor feeding or growth in infants", "Breathlessness", "Reduced exercise tolerance"], treatments: ["heart-surgery", "cardiology"], severity: "Variable", age: "Present from birth", surgery: "Sometimes" },
  { name: "Hypertension", category: "Cardiology", organSystem: "Cardiovascular System", specialty: "Cardiology", shortDescription: "Persistently elevated blood pressure that can damage blood vessels and organs over time.", symptoms: ["Often no symptoms", "Headache in some people with very high readings", "Blurred vision in severe cases", "Breathlessness or chest symptoms require urgent assessment"], treatments: ["cardiology"], severity: "High", age: "Adults; can occur at any age", surgery: "Rarely", popular: true },

  // Neurology
  { name: "Stroke", category: "Neurology", organSystem: "Nervous System", specialty: "Neurology", shortDescription: "Sudden brain injury caused by an interrupted blood supply or bleeding.", symptoms: ["Face drooping", "Arm or leg weakness, often on one side", "Speech difficulty", "Sudden vision, balance, or severe headache symptoms"], treatments: ["stroke-treatment"], severity: "Critical", age: "Any age; risk rises with age", surgery: "Sometimes", emergency: true, warningSigns: ["Face drooping or one-sided weakness", "Sudden speech or understanding difficulty", "Sudden loss of vision, balance, or consciousness"], featured: true, popular: true },
  { name: "Brain Tumor", category: "Neurology", organSystem: "Nervous System", specialty: "Neurosurgery", shortDescription: "An abnormal growth in the brain; tumors may be benign, malignant, primary, or metastatic.", symptoms: ["New or changing headaches", "Seizures", "Weakness, vision, speech, or personality changes", "Nausea or balance difficulty"], treatments: ["brain-tumor-surgery", "radiotherapy", "chemotherapy"], severity: "High", age: "Any age", surgery: "Often", featured: true, popular: true },
  { name: "Epilepsy", category: "Neurology", organSystem: "Nervous System", specialty: "Neurology", shortDescription: "A neurological condition characterized by a continuing tendency to have unprovoked seizures.", symptoms: ["Convulsive seizures", "Brief loss of awareness", "Unusual sensations or repeated movements", "Confusion after an event"], treatments: ["epilepsy-surgery"], severity: "Variable", age: "Any age", surgery: "Rarely" },
  { name: "Parkinson's Disease", category: "Neurology", organSystem: "Nervous System", specialty: "Neurology", shortDescription: "A progressive neurological disorder affecting movement and other body functions.", symptoms: ["Slowness of movement", "Tremor", "Muscle stiffness", "Balance, sleep, mood, or bowel changes"], treatments: ["deep-brain-stimulation"], severity: "High", age: "Usually after age 60, but younger onset occurs", surgery: "Sometimes", popular: true },
  { name: "Multiple Sclerosis", category: "Neurology", organSystem: "Nervous System", specialty: "Neurology", shortDescription: "An immune-mediated condition affecting myelin in the brain and spinal cord.", symptoms: ["Vision changes", "Numbness or weakness", "Balance difficulty", "Fatigue or bladder symptoms"], treatments: [], severity: "Variable", age: "Often diagnosed between ages 20 and 50", surgery: "No" },
  { name: "Hydrocephalus", category: "Neurology", organSystem: "Nervous System", specialty: "Neurosurgery", shortDescription: "Excess cerebrospinal fluid within brain cavities, which may increase pressure or impair function.", symptoms: ["Head enlargement or irritability in infants", "Headache and vomiting", "Walking or balance difficulty", "Memory or bladder changes in some adults"], treatments: ["hydrocephalus"], severity: "High", age: "Infants and older adults are commonly affected", surgery: "Often" },
  { name: "Brain Aneurysm", category: "Neurology", organSystem: "Nervous System", specialty: "Neurosurgery", shortDescription: "A weakened, bulging area in a brain artery that can leak or rupture.", symptoms: ["Often no symptoms before rupture", "Local headache or eye symptoms in some cases", "Sudden extremely severe headache if rupture occurs", "Neck stiffness, vomiting, confusion, or collapse"], treatments: ["aneurysm-clipping"], severity: "Critical", age: "Most common in adults", surgery: "Sometimes", emergency: true, warningSigns: ["A sudden, extremely severe headache", "Collapse, seizure, confusion, or loss of consciousness", "Severe headache with vomiting, neck stiffness, or new neurological symptoms"] },

  // Oncology
  { name: "Breast Cancer", category: "Oncology", organSystem: "Breast", specialty: "Oncology", shortDescription: "Malignant cell growth arising in breast tissue.", symptoms: ["A new breast or underarm lump", "Breast shape or skin change", "Nipple change or discharge", "Persistent focal breast symptoms"], treatments: ["breast-cancer", "chemotherapy", "radiotherapy", "immunotherapy"], severity: "High", age: "Most common after age 50; younger adults can be affected", surgery: "Often", featured: true, popular: true },
  { name: "Lung Cancer", category: "Oncology", organSystem: "Respiratory System", specialty: "Oncology", shortDescription: "Malignant growth beginning in lung tissue or airways.", symptoms: ["Persistent or changing cough", "Coughing blood", "Chest pain or breathlessness", "Unexplained weight loss"], treatments: ["lung-cancer", "chemotherapy", "radiotherapy", "immunotherapy"], severity: "High", age: "Most common in older adults", surgery: "Sometimes", featured: true, popular: true },
  { name: "Colon Cancer", category: "Oncology", organSystem: "Digestive System", specialty: "Surgical Oncology", shortDescription: "Cancer arising in the large bowel, often developing from a polyp.", symptoms: ["Blood in stool", "Persistent change in bowel habit", "Abdominal discomfort", "Unexplained anemia or weight loss"], treatments: ["colon-cancer", "colorectal-surgery", "chemotherapy"], severity: "High", age: "More common after age 50", surgery: "Often", popular: true },
  { name: "Liver Cancer", category: "Oncology", organSystem: "Digestive System", specialty: "Surgical Oncology", shortDescription: "Cancer arising in liver cells or bile ducts within the liver.", symptoms: ["Upper abdominal discomfort", "Jaundice", "Abdominal swelling", "Unexplained weight or appetite loss"], treatments: ["liver-cancer", "liver-transplant", "chemotherapy", "immunotherapy"], severity: "High", age: "Most common in adults", surgery: "Sometimes" },
  { name: "Stomach Cancer", category: "Oncology", organSystem: "Digestive System", specialty: "Surgical Oncology", shortDescription: "Malignant cell growth arising in the stomach lining or deeper tissues.", symptoms: ["Persistent indigestion or upper abdominal discomfort", "Early fullness", "Vomiting or swallowing difficulty", "Unexplained weight loss or anemia"], treatments: ["chemotherapy", "radiotherapy"], severity: "High", age: "More common after age 50", surgery: "Often" },
  { name: "Pancreatic Cancer", category: "Oncology", organSystem: "Digestive System", specialty: "Surgical Oncology", shortDescription: "Cancer arising in the pancreas, commonly from cells lining pancreatic ducts.", symptoms: ["Jaundice", "Upper abdominal or back pain", "Unexplained weight loss", "New or worsening diabetes"], treatments: ["pancreatic-disorders", "chemotherapy", "radiotherapy"], severity: "High", age: "Most common in older adults", surgery: "Sometimes" },
  { name: "Blood Cancer", category: "Oncology", organSystem: "Blood and Immune System", specialty: "Medical Oncology", shortDescription: "A broad group of cancers affecting blood cells, bone marrow, or lymphatic tissue.", symptoms: ["Persistent fatigue or pallor", "Frequent infections", "Easy bruising or bleeding", "Unexplained fever, weight loss, or swollen nodes"], treatments: ["leukemia", "bone-marrow-transplant", "chemotherapy", "immunotherapy"], severity: "High", age: "Any age", surgery: "Rarely" },
  { name: "Prostate Cancer", category: "Oncology", organSystem: "Male Reproductive System", specialty: "Urology", shortDescription: "Malignant cell growth arising in the prostate gland.", symptoms: ["Often no early symptoms", "Urinary flow or frequency changes", "Blood in urine or semen", "Bone pain in advanced disease"], treatments: ["prostate-cancer", "prostate-surgery", "radiotherapy"], severity: "High", age: "Most common after age 50", surgery: "Sometimes", popular: true },
  { name: "Brain Cancer", category: "Oncology", organSystem: "Nervous System", specialty: "Neurosurgery", shortDescription: "A malignant primary brain tumor or cancer that has spread to the brain.", symptoms: ["New or changing headaches", "Seizures", "Weakness or speech and vision changes", "Personality, memory, or balance changes"], treatments: ["brain-tumor-surgery", "radiotherapy", "chemotherapy"], severity: "High", age: "Any age", surgery: "Sometimes" },
  { name: "Kidney Cancer", category: "Oncology", organSystem: "Renal and Urinary System", specialty: "Urology", shortDescription: "Cancer arising in kidney tissue, most commonly renal cell carcinoma in adults.", symptoms: ["Blood in urine", "Persistent side or back pain", "A flank mass in some cases", "Unexplained fever, fatigue, or weight loss"], treatments: ["immunotherapy", "chemotherapy"], severity: "High", age: "Most common after age 50", surgery: "Often" },

  // Orthopaedics
  { name: "Osteoarthritis", category: "Orthopaedics", organSystem: "Musculoskeletal System", specialty: "Orthopaedics", shortDescription: "A whole-joint disorder involving cartilage loss and changes in bone and surrounding tissues.", symptoms: ["Joint pain with activity", "Short-lived stiffness after rest", "Reduced movement", "Swelling or grinding sensation"], treatments: ["knee-replacement", "hip-replacement", "arthroscopy"], severity: "Variable", age: "More common after age 45", surgery: "Sometimes", popular: true },
  { name: "Rheumatoid Arthritis", category: "Orthopaedics", organSystem: "Musculoskeletal System", specialty: "Orthopaedics", shortDescription: "A systemic autoimmune disease that causes persistent joint inflammation.", symptoms: ["Symmetrical painful swollen joints", "Prolonged morning stiffness", "Fatigue", "Reduced grip or movement"], treatments: [], severity: "High", age: "Often begins between ages 30 and 60", surgery: "Sometimes" },
  { name: "Scoliosis", category: "Orthopaedics", organSystem: "Musculoskeletal System", specialty: "Orthopaedics", shortDescription: "A sideways spinal curve with vertebral rotation.", symptoms: ["Uneven shoulders or waist", "One shoulder blade or rib area more prominent", "Back discomfort", "Breathing limitation in severe curves"], treatments: ["scoliosis-surgery", "spine-surgery"], severity: "Variable", age: "Often recognized during adolescence", surgery: "Sometimes" },
  { name: "ACL Injury", category: "Orthopaedics", organSystem: "Musculoskeletal System", specialty: "Orthopaedics", shortDescription: "A sprain or tear of the anterior cruciate ligament that stabilizes the knee.", symptoms: ["A pop at the time of injury", "Rapid knee swelling", "Pain and reduced motion", "Knee giving way"], treatments: ["acl-reconstruction", "sports-injury", "arthroscopy"], severity: "Moderate", age: "Common in active adolescents and adults", surgery: "Sometimes" },
  { name: "Hip Arthritis", category: "Orthopaedics", organSystem: "Musculoskeletal System", specialty: "Joint Replacement", shortDescription: "Inflammation or degeneration of the hip joint causing pain and reduced function.", symptoms: ["Groin, thigh, or buttock pain", "Stiffness", "Reduced walking distance", "Difficulty with shoes, stairs, or getting up"], treatments: ["hip-replacement"], severity: "Variable", age: "More common in older adults", surgery: "Sometimes" },
  { name: "Spinal Disc Herniation", category: "Orthopaedics", organSystem: "Musculoskeletal System", specialty: "Orthopaedics", shortDescription: "Displacement of spinal-disc material that may irritate or compress a nerve.", symptoms: ["Neck or back pain", "Pain radiating into an arm or leg", "Numbness or tingling", "Weakness in a limb"], treatments: ["spine-surgery"], severity: "Variable", age: "Common between ages 30 and 60", surgery: "Rarely", warningSigns: ["New bladder or bowel control loss", "Numbness around the groin or saddle area", "Rapidly progressive limb weakness"] },
  { name: "Fractures", category: "Orthopaedics", organSystem: "Musculoskeletal System", specialty: "Orthopaedics", shortDescription: "A partial or complete break in a bone caused by injury, stress, or weakened bone.", symptoms: ["Pain and tenderness", "Swelling or bruising", "Deformity", "Difficulty using or bearing weight on the area"], treatments: ["sports-injury"], severity: "Variable", age: "Any age", surgery: "Sometimes", emergency: true, warningSigns: ["Bone visible through a wound", "A pale, cold, numb, or pulseless limb", "Severe bleeding, major deformity, or fracture after high-energy trauma"] },

  // Nephrology
  { name: "Kidney Failure", category: "Nephrology", organSystem: "Renal and Urinary System", specialty: "Nephrology", shortDescription: "Severe loss of kidney function that may develop suddenly or progress over time.", symptoms: ["Reduced or changed urination", "Swelling", "Nausea or poor appetite", "Fatigue, confusion, or breathlessness"], treatments: ["dialysis", "kidney-transplant"], severity: "Critical", age: "Any age; chronic disease risk rises with age", surgery: "Sometimes", featured: true, popular: true },
  { name: "Kidney Stones", category: "Nephrology", organSystem: "Renal and Urinary System", specialty: "Urology", shortDescription: "Hard mineral deposits that form in the urinary tract.", symptoms: ["Severe side pain that may move toward the groin", "Blood in urine", "Nausea or vomiting", "Urinary urgency or pain"], treatments: ["kidney-stone-surgery", "urology"], severity: "Variable", age: "Most common in adults", surgery: "Sometimes", popular: true },
  { name: "Polycystic Kidney Disease", category: "Nephrology", organSystem: "Renal and Urinary System", specialty: "Nephrology", shortDescription: "An inherited disorder in which multiple cysts develop in the kidneys.", symptoms: ["High blood pressure", "Side or back discomfort", "Blood in urine", "Kidney stones or recurrent urinary infection"], treatments: ["dialysis", "kidney-transplant"], severity: "High", age: "Inherited; symptoms often emerge in adulthood", surgery: "Sometimes" },

  // Urology (prostate cancer is represented once in Oncology with Urology specialty)
  { name: "Enlarged Prostate", category: "Urology", organSystem: "Male Reproductive System", specialty: "Urology", shortDescription: "Noncancerous enlargement of the prostate that can obstruct urinary flow.", symptoms: ["Weak or interrupted urine stream", "Difficulty starting urination", "Frequent or urgent urination", "Night-time urination"], treatments: ["prostate-surgery", "urology"], severity: "Variable", age: "Common after age 50", surgery: "Sometimes", popular: true },
  { name: "Urinary Incontinence", category: "Urology", organSystem: "Renal and Urinary System", specialty: "Urology", shortDescription: "Unintentional urine leakage caused by one or more bladder-control problems.", symptoms: ["Leakage with cough or activity", "Sudden strong urgency with leakage", "Frequent urination", "Continuous or overflow leakage"], treatments: ["urology"], severity: "Moderate", age: "Any adult age; prevalence rises later in life", surgery: "Sometimes" },

  // Gastroenterology
  { name: "Fatty Liver", category: "Gastroenterology", organSystem: "Digestive System", specialty: "Gastroenterology", shortDescription: "Excess fat accumulation in the liver, often associated with metabolic risk or alcohol.", symptoms: ["Often no symptoms", "Fatigue", "Right upper abdominal discomfort", "Abnormal liver tests"], treatments: ["liver-disease"], severity: "Variable", age: "Common in adults; can occur in children", surgery: "Rarely", popular: true },
  { name: "Liver Cirrhosis", category: "Gastroenterology", organSystem: "Digestive System", specialty: "Liver Transplant", shortDescription: "Advanced liver scarring that disrupts normal structure and function.", symptoms: ["Fatigue and muscle loss", "Jaundice", "Abdominal or leg swelling", "Easy bruising, bleeding, or confusion"], treatments: ["liver-disease", "liver-transplant"], severity: "High", age: "Most common in adults", surgery: "Sometimes", featured: true },
  { name: "Gallstones", category: "Gastroenterology", organSystem: "Digestive System", specialty: "General Surgery", shortDescription: "Hardened deposits in the gallbladder or bile ducts.", symptoms: ["Often no symptoms", "Right upper abdominal pain after meals", "Nausea or vomiting", "Jaundice or fever if complications occur"], treatments: ["gallbladder-surgery"], severity: "Variable", age: "Adults; risk rises with age", surgery: "Sometimes", popular: true },
  { name: "GERD", category: "Gastroenterology", organSystem: "Digestive System", specialty: "Gastroenterology", shortDescription: "Repeated reflux of stomach contents that causes troublesome symptoms or complications.", symptoms: ["Heartburn", "Acid or food regurgitation", "Chest or upper abdominal discomfort", "Cough, hoarseness, or swallowing difficulty"], treatments: ["gerd-surgery"], severity: "Variable", age: "Any age", surgery: "Rarely", popular: true },
  { name: "Crohn's Disease", category: "Gastroenterology", organSystem: "Digestive System", specialty: "Gastroenterology", shortDescription: "A chronic inflammatory bowel disease that can affect any part of the digestive tract.", symptoms: ["Diarrhea", "Abdominal pain", "Weight loss or poor growth", "Fatigue, fever, or perianal symptoms"], treatments: ["colorectal-surgery"], severity: "High", age: "Often begins in adolescence or early adulthood", surgery: "Sometimes" },
  { name: "Ulcerative Colitis", category: "Gastroenterology", organSystem: "Digestive System", specialty: "Gastroenterology", shortDescription: "A chronic inflammatory bowel disease affecting the colon lining.", symptoms: ["Bloody diarrhea", "Urgency or frequent bowel movements", "Abdominal cramps", "Fatigue, anemia, or weight loss"], treatments: ["colorectal-surgery"], severity: "High", age: "Often begins before age 30; any age is possible", surgery: "Sometimes" },

  // Endocrinology
  { name: "Diabetes", category: "Endocrinology", organSystem: "Endocrine System", specialty: "Endocrinology", shortDescription: "A group of conditions causing elevated blood glucose because insulin is absent, insufficient, or less effective.", symptoms: ["Increased thirst and urination", "Unexplained weight change", "Fatigue", "Blurred vision or recurrent infection"], treatments: [], severity: "High", age: "Any age", surgery: "Rarely", featured: true, popular: true },
  { name: "Thyroid Disorders", category: "Endocrinology", organSystem: "Endocrine System", specialty: "Endocrinology", shortDescription: "Conditions affecting thyroid hormone production, gland structure, or both.", symptoms: ["Weight, temperature tolerance, or energy changes", "Palpitations or slowed heartbeat", "Neck swelling", "Mood, bowel, skin, or menstrual changes"], treatments: [], severity: "Variable", age: "Any age", surgery: "Sometimes", popular: true },
  { name: "Pituitary Tumors", category: "Endocrinology", organSystem: "Endocrine System", specialty: "Endocrinology", shortDescription: "Usually benign growths of the pituitary gland that may alter hormone levels or compress nearby structures.", symptoms: ["Headache", "Peripheral vision loss", "Menstrual, sexual, growth, or weight changes", "Symptoms of excess or deficient hormones"], treatments: ["brain-tumor-surgery"], severity: "High", age: "Most often diagnosed in adults", surgery: "Sometimes" },
  { name: "Adrenal Disorders", category: "Endocrinology", organSystem: "Endocrine System", specialty: "Endocrinology", shortDescription: "Conditions causing too much or too little adrenal hormone, or structural adrenal changes.", symptoms: ["Blood pressure changes", "Weakness or fatigue", "Weight or skin changes", "Electrolyte or blood-glucose abnormalities"], treatments: [], severity: "Variable", age: "Any age", surgery: "Sometimes" },

  // Pulmonology
  { name: "Asthma", category: "Pulmonology", organSystem: "Respiratory System", specialty: "Pulmonology", shortDescription: "A chronic inflammatory airway condition with variable narrowing and breathing symptoms.", symptoms: ["Wheezing", "Shortness of breath", "Chest tightness", "Cough, often at night or with triggers"], treatments: [], severity: "Variable", age: "Any age; often begins in childhood", surgery: "No", popular: true },
  { name: "COPD", category: "Pulmonology", organSystem: "Respiratory System", specialty: "Pulmonology", shortDescription: "Persistent airflow limitation, most commonly including chronic bronchitis and emphysema.", symptoms: ["Progressive breathlessness", "Chronic cough", "Sputum production", "Wheezing or recurrent chest infections"], treatments: [], severity: "High", age: "Usually diagnosed after age 40", surgery: "Rarely", popular: true },
  { name: "Tuberculosis", category: "Pulmonology", organSystem: "Respiratory System", specialty: "Pulmonology", shortDescription: "An infectious disease caused by Mycobacterium tuberculosis, most often affecting the lungs.", symptoms: ["Cough lasting several weeks", "Fever or night sweats", "Weight loss", "Coughing blood in some cases"], treatments: [], severity: "High", age: "Any age", surgery: "Rarely" },
  { name: "Lung Fibrosis", category: "Pulmonology", organSystem: "Respiratory System", specialty: "Pulmonology", shortDescription: "Scarring of lung tissue that can progressively reduce oxygen transfer.", symptoms: ["Progressive breathlessness", "Persistent dry cough", "Fatigue", "Finger clubbing in some cases"], treatments: ["lung-transplant"], severity: "High", age: "Many forms are more common after age 50", surgery: "Rarely" },
  { name: "Sleep Apnea", category: "Pulmonology", organSystem: "Respiratory System", specialty: "Pulmonology", shortDescription: "Repeated pauses or reductions in breathing during sleep.", symptoms: ["Loud snoring", "Witnessed breathing pauses", "Unrefreshing sleep", "Daytime sleepiness or morning headache"], treatments: [], severity: "High", age: "Any age; prevalence rises in adults", surgery: "Rarely", popular: true },

  // Gynecology
  { name: "Uterine Fibroids", category: "Gynecology", organSystem: "Reproductive System", specialty: "Gynecology", shortDescription: "Noncancerous growths arising from uterine muscle.", symptoms: ["Heavy or prolonged periods", "Pelvic pressure or pain", "Frequent urination", "Fertility or pregnancy concerns in some patients"], treatments: ["fibroid-surgery", "hysterectomy"], severity: "Variable", age: "Common during reproductive years", surgery: "Sometimes", popular: true },
  { name: "Endometriosis", category: "Gynecology", organSystem: "Reproductive System", specialty: "Gynecology", shortDescription: "Endometrial-like tissue outside the uterus causing inflammation and sometimes scarring.", symptoms: ["Painful periods", "Chronic pelvic pain", "Pain with intercourse or bowel movements", "Difficulty becoming pregnant"], treatments: ["endometriosis"], severity: "Variable", age: "Usually affects reproductive-age patients", surgery: "Sometimes", featured: true, popular: true },
  { name: "PCOS", category: "Gynecology", organSystem: "Reproductive System", specialty: "Gynecology", shortDescription: "A hormonal and metabolic syndrome involving irregular ovulation and signs of androgen excess.", symptoms: ["Irregular or absent periods", "Excess facial or body hair", "Acne", "Difficulty conceiving or metabolic concerns"], treatments: ["ivf"], severity: "Variable", age: "Usually begins during reproductive years", surgery: "Rarely", popular: true },
  { name: "Ovarian Cysts", category: "Gynecology", organSystem: "Reproductive System", specialty: "Gynecology", shortDescription: "Fluid-filled or solid sacs arising in or on an ovary; many are benign and temporary.", symptoms: ["Often no symptoms", "Pelvic pain or pressure", "Bloating", "Sudden severe pain if rupture or twisting occurs"], treatments: [], severity: "Variable", age: "Common during reproductive years", surgery: "Sometimes" },
  { name: "Cervical Cancer", category: "Gynecology", organSystem: "Reproductive System", specialty: "Oncology", shortDescription: "Cancer arising in the cervix, commonly linked to persistent high-risk HPV infection.", symptoms: ["Abnormal vaginal bleeding", "Bleeding after intercourse", "Unusual discharge", "Pelvic pain in more advanced disease"], treatments: ["chemotherapy", "radiotherapy", "hysterectomy"], severity: "High", age: "Most often diagnosed between ages 30 and 60", surgery: "Sometimes", featured: true },

  // Fertility
  { name: "Male Infertility", category: "Fertility", organSystem: "Reproductive System", specialty: "Fertility", shortDescription: "Reduced ability to achieve pregnancy due wholly or partly to a male reproductive factor.", symptoms: ["Difficulty achieving pregnancy", "Sexual or ejaculation concerns in some patients", "Testicular pain, swelling, or small size in some cases", "Signs of a hormone or genetic condition"], treatments: ["male-infertility", "icsi", "ivf"], severity: "Variable", age: "Reproductive age", surgery: "Sometimes", popular: true },
  { name: "Female Infertility", category: "Fertility", organSystem: "Reproductive System", specialty: "Fertility", shortDescription: "Difficulty achieving pregnancy associated wholly or partly with a female reproductive factor.", symptoms: ["Difficulty achieving pregnancy", "Irregular or absent periods", "Pelvic pain", "Known ovulation, tubal, uterine, or endometriosis-related concerns"], treatments: ["female-infertility", "ivf", "icsi"], severity: "Variable", age: "Reproductive age", surgery: "Sometimes", featured: true, popular: true },
  { name: "Recurrent Miscarriage", category: "Fertility", organSystem: "Reproductive System", specialty: "Fertility", shortDescription: "Repeated pregnancy loss that warrants individualized medical evaluation.", symptoms: ["Repeated confirmed pregnancy losses", "Vaginal bleeding or cramping during a loss", "Emotional distress", "No symptoms between pregnancies in many patients"], treatments: ["ivf"], severity: "High", age: "Reproductive age", surgery: "Rarely" },

  // Ophthalmology
  { name: "Cataract", category: "Ophthalmology", organSystem: "Visual System", specialty: "Ophthalmology", shortDescription: "Clouding of the eye's natural lens that reduces vision.", symptoms: ["Blurred or hazy vision", "Glare or halos", "Reduced night vision", "Faded colours or frequent prescription changes"], treatments: ["cataract-surgery"], severity: "Variable", age: "Most common after age 60", surgery: "Often", featured: true, popular: true },
  { name: "Glaucoma", category: "Ophthalmology", organSystem: "Visual System", specialty: "Ophthalmology", shortDescription: "A group of diseases that damage the optic nerve, often but not always with raised eye pressure.", symptoms: ["Often no early symptoms", "Gradual peripheral vision loss", "Blurred vision", "Sudden pain, redness, halos, or nausea in acute angle closure"], treatments: [], severity: "High", age: "Risk rises after age 40", surgery: "Sometimes", popular: true },
  { name: "Retinal Detachment", category: "Ophthalmology", organSystem: "Visual System", specialty: "Ophthalmology", shortDescription: "Separation of the light-sensitive retina from the tissue supporting it.", symptoms: ["Sudden flashes of light", "A sudden increase in floaters", "A curtain or shadow across vision", "Sudden peripheral or central vision loss"], treatments: ["retina-surgery"], severity: "Critical", age: "Any age; risk rises with age and high myopia", surgery: "Often", emergency: true, warningSigns: ["New flashes with a sudden shower of floaters", "A curtain, veil, or shadow moving across vision", "Sudden loss of peripheral or central vision"] },
  { name: "Macular Degeneration", category: "Ophthalmology", organSystem: "Visual System", specialty: "Ophthalmology", shortDescription: "Damage to the macula that impairs detailed central vision, usually with age.", symptoms: ["Blurred central vision", "Straight lines appearing wavy", "A central dim or blank area", "Difficulty reading or recognizing faces"], treatments: ["retina-surgery"], severity: "High", age: "Usually after age 50", surgery: "Rarely" },
];

const treatmentNames: Record<string, string> = {
  angioplasty: "Angioplasty",
  cabg: "CABG",
  "heart-surgery": "Heart Surgery",
  cardiology: "Cardiology",
  "heart-transplant": "Heart Transplant",
  electrophysiology: "Electrophysiology",
  "pacemaker-implantation": "Pacemaker Implantation",
  "valve-replacement": "Valve Replacement",
  "stroke-treatment": "Stroke Treatment",
  "brain-tumor-surgery": "Brain Tumor Surgery",
  radiotherapy: "Radiotherapy",
  chemotherapy: "Chemotherapy",
  "epilepsy-surgery": "Epilepsy Surgery",
  "deep-brain-stimulation": "Deep Brain Stimulation",
  hydrocephalus: "Hydrocephalus Treatment",
  "aneurysm-clipping": "Aneurysm Clipping",
  "breast-cancer": "Breast Cancer Treatment",
  immunotherapy: "Immunotherapy",
  "lung-cancer": "Lung Cancer Treatment",
  "colon-cancer": "Colon Cancer Treatment",
  "colorectal-surgery": "Colorectal Surgery",
  "liver-cancer": "Liver Cancer Treatment",
  "liver-transplant": "Liver Transplant",
  "pancreatic-disorders": "Pancreatic Disorders Treatment",
  leukemia: "Leukemia Treatment",
  "bone-marrow-transplant": "Bone Marrow Transplant",
  "prostate-cancer": "Prostate Cancer Treatment",
  "prostate-surgery": "Prostate Surgery",
  "knee-replacement": "Knee Replacement",
  "hip-replacement": "Hip Replacement",
  arthroscopy: "Arthroscopy",
  "scoliosis-surgery": "Scoliosis Surgery",
  "spine-surgery": "Spine Surgery",
  "acl-reconstruction": "ACL Reconstruction",
  "sports-injury": "Sports Injury Treatment",
  dialysis: "Dialysis",
  "kidney-transplant": "Kidney Transplant",
  "kidney-stone-surgery": "Kidney Stone Surgery",
  urology: "Urology Treatment",
  "liver-disease": "Liver Disease Treatment",
  "gallbladder-surgery": "Gallbladder Surgery",
  "gerd-surgery": "GERD Surgery",
  "lung-transplant": "Lung Transplant",
  "fibroid-surgery": "Fibroid Surgery",
  hysterectomy: "Hysterectomy",
  endometriosis: "Endometriosis Treatment",
  ivf: "IVF",
  "male-infertility": "Male Infertility Treatment",
  icsi: "ICSI",
  "female-infertility": "Female Infertility Treatment",
  "cataract-surgery": "Cataract Surgery",
  "retina-surgery": "Retina Surgery",
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function makeFaqs(seed: DiseaseSeed): DiseaseFaq[] {
  const name = seed.name;
  return [
    {
      question: `What is ${name}?`,
      answer: `${name} is ${seed.shortDescription.charAt(0).toLowerCase()}${seed.shortDescription.slice(1)} A qualified clinician must assess symptoms and test results before confirming a diagnosis.`,
    },
    {
      question: `What symptoms can ${name} cause?`,
      answer: `Possible symptoms include ${seed.symptoms.slice(0, 3).join(", ").toLowerCase()}. Symptoms vary, and these features can also occur with other conditions.`,
    },
    {
      question: `What causes ${name}?`,
      answer: `Causes and contributing factors vary between patients. A specialist reviews medical history, examination findings, medicines, family history, and relevant tests rather than assuming a single cause.`,
    },
    {
      question: `How is ${name} diagnosed?`,
      answer: `Diagnosis starts with clinical assessment and condition-appropriate tests. Imaging, laboratory testing, functional studies, or tissue analysis may be used only when clinically indicated.`,
    },
    {
      question: `Is ${name} treatable?`,
      answer: `${seed.severity === "Critical" ? "Rapid assessment and treatment can be essential." : "Many patients have treatment or symptom-management options."} The most suitable plan depends on type, severity, general health, and specialist findings.`,
    },
    {
      question: `Does ${name} always require surgery?`,
      answer: `${seed.surgery === "Often" ? "Surgery is commonly considered, but it is not automatically appropriate for every patient." : seed.surgery === "No" ? "Surgery is generally not a routine treatment, although another diagnosis or complication may change the plan." : "Surgery may be considered for selected patients, but non-surgical care may also be appropriate."} A specialist should explain benefits, alternatives, and risks.`,
    },
    {
      question: `How long is recovery from ${name}?`,
      answer: "Recovery varies widely with disease severity, treatment, complications, age, and overall health. The treating team can provide an individualized timeline after assessment.",
    },
    {
      question: `When should someone with possible ${name} see a doctor?`,
      answer: "Arrange medical review for new, persistent, recurrent, or worsening symptoms, or when symptoms interfere with normal activity. Sudden severe symptoms require urgent local assessment.",
    },
    {
      question: `Can international patients get a second opinion for ${name}?`,
      answer: "Yes. A remote specialist review may be possible using recent reports, scans, pathology, medicine lists, and a concise medical history. It does not replace emergency or in-person care when that is needed.",
    },
    {
      question: `How can MedPobeda Group support care for ${name}?`,
      answer: "MedPobeda Group can coordinate report review, hospital and specialist options, indicative treatment planning, visa documentation, interpreters, travel, accommodation, and follow-up. Final clinical decisions remain with the patient and treating medical team.",
    },
  ];
}

function genericWarningSigns(seed: DiseaseSeed) {
  return seed.warningSigns ?? [
    `Symptoms of ${seed.name.toLowerCase()} that are sudden, severe, or rapidly worsening`,
    "New loss of consciousness, severe breathing difficulty, uncontrolled bleeding, or marked weakness",
    "A major change in function, pain, hydration, or mental state",
  ];
}

function createDisease(seed: DiseaseSeed, index: number): Disease {
  const slug = slugify(seed.name);
  const profile = categoryProfiles[seed.category];
  const severity = seed.severity ?? "Variable";
  const relatedTreatmentNames = seed.treatments
    .map((treatment) => treatmentNames[treatment])
    .filter((name): name is string => Boolean(name));
  const surgery = seed.surgery ?? "Sometimes";

  return {
    id: slug,
    slug,
    name: seed.name,
    category: seed.category,
    organSystem: seed.organSystem,
    specialty: seed.specialty,
    shortDescription: seed.shortDescription,
    overview: `${seed.name} is ${seed.shortDescription.charAt(0).toLowerCase()}${seed.shortDescription.slice(1)} Its course can differ substantially between patients. Assessment by an appropriately qualified ${seed.specialty.toLowerCase()} team is needed to confirm the diagnosis, understand severity, and create an individualized care plan.`,
    causes: profile.causes,
    riskFactors: profile.riskFactors,
    symptoms: seed.symptoms,
    warningSigns: genericWarningSigns(seed),
    complications: profile.complications,
    diagnosis: profile.diagnosis,
    stages: seed.category === "Oncology"
      ? [
          "Cancer stage is assigned only after pathology and appropriate imaging or other staging tests.",
          "The staging system and meaning differ by cancer type; specialists also consider grade, biomarkers, and patient health.",
          "Treatment should not be selected from a stage label alone.",
        ]
      : [
          `${seed.name} may be classified by cause, severity, anatomical findings, functional impact, or clinical course.`,
          "The relevant classification is determined by a specialist after examination and testing.",
          "A classification supports planning but does not predict an individual outcome by itself.",
        ],
    prevention: profile.prevention,
    treatmentOptions: [
      "Observation, monitoring, or supportive care when clinically appropriate",
      "Condition-specific medicines and rehabilitation selected by the treating specialist",
      ...relatedTreatmentNames.map((name) => `${name} for appropriately selected patients`),
      "Multidisciplinary review when diagnosis, severity, or treatment choices are complex",
    ],
    prognosis: `The outlook for ${seed.name} depends on the exact diagnosis, severity, timing of care, response to treatment, other health conditions, and follow-up. Population statistics cannot predict an individual patient's outcome.`,
    recovery: [
      "Recovery goals and timing are individualized after diagnosis and treatment planning",
      "Follow-up may include symptom review, examination, imaging, laboratory tests, or rehabilitation",
      "Medicines should not be started, stopped, or changed without the treating clinician",
      "New or worsening warning signs should be assessed promptly",
    ],
    lifestyleChanges: profile.lifestyleChanges,
    whenToSeeDoctor: [
      `Arrange a clinical assessment for possible ${seed.name.toLowerCase()} symptoms that persist, recur, or worsen`,
      "Seek earlier review when symptoms affect sleep, mobility, work, eating, breathing, vision, or daily function",
      seed.emergency
        ? "Use local emergency services immediately for the emergency warning signs listed on this page"
        : "Use urgent or emergency services for sudden severe symptoms, collapse, breathing difficulty, or major loss of function",
    ],
    faqs: makeFaqs(seed),
    quickFacts: {
      commonAgeGroup: seed.age ?? "Any age, depending on the condition",
      riskLevel: severity,
      treatable: severity === "Critical"
        ? "Often treatable, but urgent assessment may be essential"
        : "Treatment or symptom-control options are available for many patients",
      requiresSurgery: surgery,
      recoveryTime: "Varies by severity and treatment plan",
      medicalSpecialty: seed.specialty,
    },
    patientEducation: {
      dos: [
        "Keep a current list of diagnoses, medicines, allergies, and previous procedures",
        "Bring recent reports, images, and pathology when requesting a specialist opinion",
        "Ask the care team to explain goals, alternatives, risks, and expected follow-up",
      ],
      donts: [
        "Do not self-diagnose from symptoms or online information",
        "Do not stop prescribed medicine or begin supplements without medical advice",
        "Do not delay local urgent care while arranging international treatment",
      ],
      healthyLifestyleTips: profile.lifestyleChanges,
      dietAdvice: [
        "Use a balanced diet unless the treating team has prescribed condition-specific restrictions",
        "Ask a registered dietitian for advice when appetite, swallowing, weight, kidney, liver, or metabolic health is affected",
        "Avoid unproven restrictive diets and disclose all supplements",
      ],
      exerciseAdvice: [
        "Choose activity appropriate to symptoms, function, and clinician guidance",
        "Increase activity gradually and stop for chest pain, severe breathlessness, faintness, or new neurological symptoms",
        "Use supervised rehabilitation when recommended",
      ],
      recoveryGuidance: [
        "Follow discharge, wound, medicine, rehabilitation, and monitoring instructions",
        "Keep local and remote follow-up appointments",
        "Agree on who to contact if symptoms change after returning home",
      ],
      travelConsiderations: [
        "Travel only after a treating clinician confirms that the patient is stable enough",
        "Carry medicines, prescriptions, reports, emergency contacts, and suitable insurance in hand luggage",
        "Plan mobility, oxygen, infection, thrombosis, dialysis, or medication-timing needs before booking",
      ],
    },
    relatedDiseases: [],
    relatedTreatments: seed.treatments,
    relatedHospitals: profile.hospitals,
    relatedDoctors: profile.doctors,
    relatedArticles: [
      profile.article,
      "how-international-patients-can-prepare-for-treatment-in-india",
      "medical-visa-support-documentation-guide",
    ],
    heroImage: profile.heroImage,
    icon: profile.icon,
    severity,
    emergency: seed.emergency ?? false,
    emergencyMessage: seed.emergency ? DISEASE_EMERGENCY_MESSAGE : null,
    featured: seed.featured ?? false,
    popular: seed.popular ?? false,
    addedAt: new Date(Date.UTC(2026, 6, Math.max(1, 28 - (index % 28)))).toISOString(),
    seo: {
      title: `${seed.name}: Symptoms, Diagnosis & Treatment in India | MedPobeda Group`,
      description: `Learn about ${seed.name.toLowerCase()}, including symptoms, causes, diagnosis, treatment options, suitable hospitals, specialists, and international patient support in India.`,
      keywords: [
        seed.name,
        `${seed.name} symptoms`,
        `${seed.name} treatment`,
        `${seed.name} treatment in India`,
        seed.specialty,
        seed.organSystem,
        ...relatedTreatmentNames,
      ],
    },
    translations: {},
  };
}

export const diseases: Disease[] = seeds.map(createDisease).map((disease, _, all) => ({
  ...disease,
  relatedDiseases: all
    .filter(
      (candidate) =>
        candidate.slug !== disease.slug &&
        (candidate.category === disease.category ||
          candidate.specialty === disease.specialty ||
          candidate.organSystem === disease.organSystem),
    )
    .slice(0, 6)
    .map((candidate) => candidate.slug),
}));

export const diseaseCategories = [...new Set(diseases.map((disease) => disease.category))].sort();
export const diseaseOrganSystems = [...new Set(diseases.map((disease) => disease.organSystem))].sort();
export const diseaseSpecialties = [...new Set(diseases.map((disease) => disease.specialty))].sort();
export const diseaseSeverities: DiseaseSeverity[] = ["Low", "Moderate", "High", "Critical", "Variable"];
export const featuredDiseases = diseases.filter((disease) => disease.featured);
export const popularDiseases = diseases.filter((disease) => disease.popular);
export const recentlyAddedDiseases = [...diseases]
  .sort((left, right) => right.addedAt.localeCompare(left.addedAt))
  .slice(0, 12);

export function getDiseaseBySlug(slug: string) {
  return diseases.find((disease) => disease.slug === slug) ?? null;
}

export function getDiseasesByCategory(category: string) {
  return diseases.filter(
    (disease) => disease.category.toLowerCase() === category.toLowerCase(),
  );
}

export function getRelatedDiseases(disease: Disease) {
  return disease.relatedDiseases
    .map((slug) => getDiseaseBySlug(slug))
    .filter((item): item is Disease => Boolean(item));
}

export function getDiseaseTreatments(disease: Disease, catalog: Treatment[]) {
  return disease.relatedTreatments
    .map((slug) => catalog.find((treatment) => treatment.slug === slug))
    .filter((treatment): treatment is Treatment => Boolean(treatment));
}

export function getDiseaseHospitals(disease: Disease, catalog: Hospital[]) {
  return disease.relatedHospitals
    .map((slug) => catalog.find((hospital) => hospital.slug === slug))
    .filter((hospital): hospital is Hospital => Boolean(hospital));
}

export function getDiseaseDoctors(disease: Disease, catalog: Doctor[]) {
  return disease.relatedDoctors
    .map((slug) => catalog.find((doctor) => doctor.slug === slug))
    .filter((doctor): doctor is Doctor => Boolean(doctor));
}

/**
 * Builds the small client-side search index used by the directory. Detailed
 * medical content stays on the server-rendered profile pages, so the hub can
 * grow without serializing every FAQ and long-form section to the browser.
 */
export function createDiseaseDirectoryEntries(
  source: Disease[],
  catalogs: {
    hospitals: Hospital[];
    treatments: Treatment[];
    doctors: Doctor[];
  },
): DiseaseDirectoryEntry[] {
  const hospitalBySlug = new Map(
    catalogs.hospitals.map((hospital) => [hospital.slug, hospital]),
  );
  const treatmentBySlug = new Map(
    catalogs.treatments.map((treatment) => [treatment.slug, treatment]),
  );
  const doctorBySlug = new Map(
    catalogs.doctors.map((doctor) => [doctor.slug, doctor]),
  );

  return source.map((disease) => ({
    id: disease.id,
    slug: disease.slug,
    name: disease.name,
    category: disease.category,
    organSystem: disease.organSystem,
    specialty: disease.specialty,
    shortDescription: disease.shortDescription,
    symptoms: disease.symptoms,
    warningSigns: disease.warningSigns,
    heroImage: disease.heroImage,
    severity: disease.severity,
    featured: disease.featured,
    popular: disease.popular,
    addedAt: disease.addedAt,
    hospitals: disease.relatedHospitals.flatMap((slug) => {
      const hospital = hospitalBySlug.get(slug);
      return hospital ? [{ slug, name: hospital.name }] : [];
    }),
    treatments: disease.relatedTreatments.flatMap((slug) => {
      const treatment = treatmentBySlug.get(slug);
      return treatment ? [{ slug, name: treatment.name }] : [];
    }),
    doctorSearchTerms: disease.relatedDoctors.flatMap((slug) => {
      const doctor = doctorBySlug.get(slug);
      return doctor
        ? [doctor.name, doctor.specialization, ...doctor.expertise]
        : [];
    }),
  }));
}

export function getLocalizedDisease(
  disease: Disease,
  locale: DiseaseLocale,
): Disease {
  if (locale === "en") {
    return disease;
  }

  return {
    ...disease,
    ...(disease.translations[locale] ?? {}),
  };
}
