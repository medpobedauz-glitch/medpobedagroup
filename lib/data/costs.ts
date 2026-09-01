import { doctors, type Doctor } from "@/lib/data/doctors";
import { hospitals, type Hospital } from "@/lib/data/hospitals";
import { treatments, type Treatment } from "@/lib/data/treatments";

export type CostCurrency = "USD" | "INR" | "UZS" | "KZT" | "KGS" | "TJS" | "TMT" | "AZN" | "SAR" | "AED";
export type HotelCategory = "budget" | "comfort" | "premium";

export type HospitalTreatmentCost = {
  treatmentId: string;
  hospitalId: string;
  city: string;
  currency: "USD";
  minTreatmentCost: number;
  maxTreatmentCost: number;
  consultationCost: number;
  diagnosticsCost: number;
  surgeryCost: number;
  medicineEstimate: number;
  icuCostPerDay: number;
  wardCostPerDay: number;
  hospitalStayDays: number;
  hotelCostPerNight: number;
  hotelDays: number;
  airportTransferCost: number;
  interpreterCost: number;
  visaCost: number;
  companionAllowed: boolean;
  companionEstimate: number;
  followUpCost: number;
  lastUpdated: string;
};

export type CostCalculatorInput = {
  patientCountry: string;
  preferredLanguage: string;
  treatmentId: string;
  disease: string;
  hospitalId: string;
  doctorId: string;
  preferredCity: string;
  age: number;
  gender: "MALE" | "FEMALE" | "OTHER" | "PREFER_NOT_TO_SAY";
  companions: number;
  expectedStayDays: number;
  hotelCategory: HotelCategory;
  interpreter: boolean;
  airportPickup: boolean;
  visaAssistance: boolean;
  teleconsultation: boolean;
  currency: CostCurrency;
};

export type CostBreakdownItem = {
  key: string;
  label: string;
  minUSD: number;
  maxUSD: number;
  estimatedUSD: number;
};

export type CostEstimate = {
  selectedTreatment: Treatment;
  selectedHospital?: Hospital;
  selectedDoctor?: Doctor;
  recommendedHospitals: Hospital[];
  recommendedDoctors: Doctor[];
  suggestedTreatments: Treatment[];
  minTotalUSD: number;
  maxTotalUSD: number;
  estimatedTotalUSD: number;
  displayCurrency: CostCurrency;
  minTotal: number;
  maxTotal: number;
  estimatedTotal: number;
  breakdown: CostBreakdownItem[];
  treatmentDuration: string;
  hospitalStay: string;
  recoveryTime: string;
  travelPreparation: string[];
  timeline: string[];
  fxRate: number;
  fxLastUpdated: string;
  disclaimer: string;
};

export const COST_COUNTRIES = [
  "Uzbekistan", "Kazakhstan", "Kyrgyzstan", "Tajikistan", "Turkmenistan",
  "Azerbaijan", "Russia", "Afghanistan", "Middle East",
] as const;

export const COST_LANGUAGES = [
  "English", "Russian", "Uzbek", "Arabic", "Hindi", "Kazakh", "Kyrgyz", "Tajik", "Turkmen", "Azerbaijani",
] as const;

export const HOTEL_CATEGORIES: Record<HotelCategory, { label: string; costPerNightUSD: number }> = {
  budget: { label: "Budget guesthouse", costPerNightUSD: 30 },
  comfort: { label: "Comfort hotel (3–4★)", costPerNightUSD: 75 },
  premium: { label: "Premium hotel (4–5★)", costPerNightUSD: 165 },
};

export const FX_LAST_UPDATED = "2026-07-28";
export const COST_CURRENCIES: Record<CostCurrency, { label: string; symbol: string; perUSD: number }> = {
  USD: { label: "US Dollar", symbol: "$", perUSD: 1 },
  INR: { label: "Indian Rupee", symbol: "₹", perUSD: 96.1856 },
  UZS: { label: "Uzbekistani Som", symbol: "UZS ", perUSD: 12101.84 },
  KZT: { label: "Kazakhstani Tenge", symbol: "₸", perUSD: 473.4 },
  KGS: { label: "Kyrgyzstani Som", symbol: "KGS ", perUSD: 87.45 },
  TJS: { label: "Tajikistani Somoni", symbol: "TJS ", perUSD: 9.55 },
  TMT: { label: "Turkmenistani Manat", symbol: "TMT ", perUSD: 3.5 },
  AZN: { label: "Azerbaijani Manat", symbol: "₼", perUSD: 1.7 },
  SAR: { label: "Saudi Riyal", symbol: "SAR ", perUSD: 3.75 },
  AED: { label: "UAE Dirham", symbol: "AED ", perUSD: 3.6725 },
};

const categoryPricing: Record<string, [number, number, number]> = {
  Cardiology: [4500, 22000, 7500],
  Oncology: [3500, 28000, 6500],
  Neurosciences: [6500, 26000, 10500],
  Orthopaedics: [5000, 16000, 8000],
  "Organ Transplant": [18000, 55000, 26000],
  Gastroenterology: [3500, 14500, 6000],
  Nephrology: [3000, 17000, 6500],
  Gynecology: [2800, 11000, 5000],
  Fertility: [2800, 8500, 3500],
  "Plastic Surgery": [2500, 12000, 5500],
  Ophthalmology: [1200, 7500, 2500],
};

const hospitalMultiplier: Record<string, number> = {
  apollo: 1.08, medanta: 1.12, fortis: 1.08, max: 1.1, kims: 0.96,
  manipal: 1.02, yashoda: 0.98, care: 0.96, aster: 1.02, rela: 1.08,
};

function round(value: number) {
  return Math.round(value / 10) * 10;
}

export const costEntries: HospitalTreatmentCost[] = treatments.flatMap((treatment) => {
  const [minimum, maximum, surgery] = categoryPricing[treatment.category] ?? [3000, 15000, 5500];
  return treatment.suitableHospitals.map((hospitalId) => {
    const hospital = hospitals.find((item) => item.slug === hospitalId);
    const multiplier = hospital ? hospitalMultiplier[hospital.hospitalGroupSlug] ?? 1 : 1;
    const hospitalStayDays = Math.max(2, Number.parseInt(treatment.estimatedHospitalStay, 10) || 5);
    return {
      treatmentId: treatment.slug,
      hospitalId,
      city: hospital?.city ?? "India",
      currency: "USD" as const,
      minTreatmentCost: round(minimum * multiplier),
      maxTreatmentCost: round(maximum * multiplier),
      consultationCost: round(80 * multiplier),
      diagnosticsCost: round(Math.max(450, minimum * 0.12) * multiplier),
      surgeryCost: round(surgery * multiplier),
      medicineEstimate: round(Math.max(350, minimum * 0.08) * multiplier),
      icuCostPerDay: round(650 * multiplier),
      wardCostPerDay: round(240 * multiplier),
      hospitalStayDays,
      hotelCostPerNight: 75,
      hotelDays: Math.max(7, hospitalStayDays + 5),
      airportTransferCost: 55,
      interpreterCost: 35,
      visaCost: 90,
      companionAllowed: true,
      companionEstimate: 30,
      followUpCost: round(60 * multiplier),
      lastUpdated: "2026-07-28",
    };
  });
});

export function convertCost(valueUSD: number, currency: CostCurrency) {
  return Math.round(valueUSD * COST_CURRENCIES[currency].perUSD);
}

export async function getExchangeRateSnapshot() {
  return { base: "USD" as const, rates: COST_CURRENCIES, lastUpdated: FX_LAST_UPDATED, source: "Configurable reference-rate fallback" };
}

export function getCostEntry(treatmentId: string, hospitalId?: string) {
  return costEntries.find((entry) => entry.treatmentId === treatmentId && (!hospitalId || entry.hospitalId === hospitalId)) ?? null;
}

export function getRecommendedHospitals(treatmentId: string, city?: string) {
  const treatment = treatments.find((item) => item.slug === treatmentId);
  if (!treatment) return [];
  const mapped = treatment.suitableHospitals.map((slug) => hospitals.find((hospital) => hospital.slug === slug)).filter((item): item is Hospital => Boolean(item));
  const cityMatches = city ? mapped.filter((hospital) => hospital.city === city) : [];
  return [...cityMatches, ...mapped.filter((hospital) => !cityMatches.includes(hospital))].slice(0, 6);
}

export function getRecommendedDoctors(treatmentId: string, hospitalId?: string) {
  return doctors.filter((doctor) => doctor.treatments.includes(treatmentId) && (!hospitalId || doctor.hospitalId === hospitalId)).slice(0, 6);
}

export function getSuggestedTreatments(treatmentId: string) {
  const treatment = treatments.find((item) => item.slug === treatmentId);
  if (!treatment) return [];
  return treatment.relatedTreatments.map((slug) => treatments.find((item) => item.slug === slug)).filter((item): item is Treatment => Boolean(item)).slice(0, 5);
}

export function getCostOptions() {
  return {
    treatments,
    hospitals,
    doctors,
    countries: COST_COUNTRIES,
    languages: COST_LANGUAGES,
    hotelCategories: HOTEL_CATEGORIES,
    currencies: COST_CURRENCIES,
    cities: [...new Set(hospitals.map((hospital) => hospital.city))].sort(),
  };
}

export function calculateCostEstimate(input: CostCalculatorInput): CostEstimate {
  const selectedTreatment = treatments.find((item) => item.slug === input.treatmentId) ?? treatments[0];
  const recommendedHospitals = getRecommendedHospitals(selectedTreatment.slug, input.preferredCity);
  const selectedHospital = hospitals.find((item) => item.slug === input.hospitalId) ?? recommendedHospitals[0];
  const entry = getCostEntry(selectedTreatment.slug, selectedHospital?.slug) ?? getCostEntry(selectedTreatment.slug);
  if (!entry) throw new Error("No cost configuration is available for this treatment.");
  const selectedDoctor = doctors.find((item) => item.slug === input.doctorId);
  const doctorConsultation = selectedDoctor ? entry.consultationCost * 1.25 : entry.consultationCost;
  const icuDays = ["Cardiology", "Neurosciences", "Organ Transplant"].includes(selectedTreatment.category) ? 2 : 0;
  const hotelRate = HOTEL_CATEGORIES[input.hotelCategory].costPerNightUSD;
  const hotelDays = Math.max(input.expectedStayDays - entry.hospitalStayDays, 0);
  const people = 1 + Math.max(0, input.companions);
  const breakdown: CostBreakdownItem[] = [
    { key: "treatment", label: "Treatment / surgery", minUSD: entry.surgeryCost * 0.9, maxUSD: entry.surgeryCost * 1.15, estimatedUSD: entry.surgeryCost },
    { key: "hospital", label: "Hospital charges", minUSD: entry.minTreatmentCost * 0.18, maxUSD: entry.maxTreatmentCost * 0.18, estimatedUSD: ((entry.minTreatmentCost + entry.maxTreatmentCost) / 2) * 0.18 },
    { key: "doctor", label: "Doctor consultation", minUSD: doctorConsultation, maxUSD: doctorConsultation * 1.35, estimatedUSD: doctorConsultation },
    { key: "medicines", label: "Medicines", minUSD: entry.medicineEstimate * 0.8, maxUSD: entry.medicineEstimate * 1.35, estimatedUSD: entry.medicineEstimate },
    { key: "diagnostics", label: "Diagnostic tests", minUSD: entry.diagnosticsCost * 0.85, maxUSD: entry.diagnosticsCost * 1.4, estimatedUSD: entry.diagnosticsCost },
    { key: "icu", label: "ICU charges", minUSD: entry.icuCostPerDay * icuDays, maxUSD: entry.icuCostPerDay * (icuDays + 1), estimatedUSD: entry.icuCostPerDay * icuDays },
    { key: "ward", label: "Ward / room charges", minUSD: entry.wardCostPerDay * entry.hospitalStayDays, maxUSD: entry.wardCostPerDay * entry.hospitalStayDays * 1.3, estimatedUSD: entry.wardCostPerDay * entry.hospitalStayDays },
    { key: "hotel", label: "Hotel accommodation", minUSD: hotelRate * hotelDays, maxUSD: hotelRate * hotelDays * 1.2, estimatedUSD: hotelRate * hotelDays },
    { key: "airport", label: "Airport pickup", minUSD: input.airportPickup ? entry.airportTransferCost : 0, maxUSD: input.airportPickup ? entry.airportTransferCost * 1.25 : 0, estimatedUSD: input.airportPickup ? entry.airportTransferCost : 0 },
    { key: "interpreter", label: "Interpreter", minUSD: input.interpreter ? entry.interpreterCost * input.expectedStayDays : 0, maxUSD: input.interpreter ? entry.interpreterCost * input.expectedStayDays * 1.25 : 0, estimatedUSD: input.interpreter ? entry.interpreterCost * input.expectedStayDays : 0 },
    { key: "visa", label: "Visa support", minUSD: input.visaAssistance ? entry.visaCost : 0, maxUSD: input.visaAssistance ? entry.visaCost * people : 0, estimatedUSD: input.visaAssistance ? entry.visaCost * people : 0 },
    { key: "transport", label: "Local transportation", minUSD: input.expectedStayDays * 10, maxUSD: input.expectedStayDays * 20, estimatedUSD: input.expectedStayDays * 14 },
    { key: "companion", label: "Companion expenses", minUSD: entry.companionEstimate * input.companions * input.expectedStayDays, maxUSD: entry.companionEstimate * 1.3 * input.companions * input.expectedStayDays, estimatedUSD: entry.companionEstimate * input.companions * input.expectedStayDays },
    { key: "miscellaneous", label: "Miscellaneous & follow-up", minUSD: entry.followUpCost + 150, maxUSD: entry.followUpCost + 450, estimatedUSD: entry.followUpCost + 250 },
  ].map((item) => ({ ...item, minUSD: round(item.minUSD), maxUSD: round(item.maxUSD), estimatedUSD: round(item.estimatedUSD) }));
  const minTotalUSD = breakdown.reduce((total, item) => total + item.minUSD, 0);
  const maxTotalUSD = breakdown.reduce((total, item) => total + item.maxUSD, 0);
  const estimatedTotalUSD = breakdown.reduce((total, item) => total + item.estimatedUSD, 0);
  return {
    selectedTreatment,
    selectedHospital,
    selectedDoctor,
    recommendedHospitals,
    recommendedDoctors: getRecommendedDoctors(selectedTreatment.slug, input.hospitalId || undefined),
    suggestedTreatments: getSuggestedTreatments(selectedTreatment.slug),
    minTotalUSD,
    maxTotalUSD,
    estimatedTotalUSD,
    displayCurrency: input.currency,
    minTotal: convertCost(minTotalUSD, input.currency),
    maxTotal: convertCost(maxTotalUSD, input.currency),
    estimatedTotal: convertCost(estimatedTotalUSD, input.currency),
    breakdown,
    treatmentDuration: `${entry.hospitalStayDays}–${entry.hospitalStayDays + 4} days`,
    hospitalStay: `${entry.hospitalStayDays} days estimated`,
    recoveryTime: selectedTreatment.estimatedRecoveryTime,
    travelPreparation: ["Share current medical reports", "Complete teleconsultation if requested", "Confirm hospital plan and invitation", "Prepare visa, flights, accommodation, and medicines"],
    timeline: ["Medical Report Review", "Online Consultation", "Treatment Plan", "Visa Processing", "Travel to India", "Admission", "Treatment", "Recovery", "Discharge", "Follow-up"],
    fxRate: COST_CURRENCIES[input.currency].perUSD,
    fxLastUpdated: FX_LAST_UPDATED,
    disclaimer: "This estimate is for informational purposes only. Final treatment costs depend on the patient's medical condition, investigations, hospital policies, treating physician, room category, and treatment plan.",
  };
}
