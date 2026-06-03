import { costGuideData } from "@/lib/data/cost-guide";

export type CountryCode =
  | "UZ"
  | "KZ"
  | "KG"
  | "TJ"
  | "TM"
  | "RU"
  | "OTHER";

export type HotelTier = "budget" | "comfort" | "premium";

export type Currency = "USD" | "INR" | "UZS" | "KZT" | "KGS" | "TJS" | "TMT" | "RUB";

export type Country = {
  code: CountryCode;
  name: string;
  flag: string;
  currency: Currency;
  visaFeeUSD: number;
  flightRangeUSD: [number, number];
  perDiemUSD: number;
};

export const COUNTRIES: Country[] = [
  {
    code: "UZ",
    name: "Uzbekistan",
    flag: "🇺🇿",
    currency: "UZS",
    visaFeeUSD: 0,
    flightRangeUSD: [350, 700],
    perDiemUSD: 25,
  },
  {
    code: "KZ",
    name: "Kazakhstan",
    flag: "🇰🇿",
    currency: "KZT",
    visaFeeUSD: 0,
    flightRangeUSD: [450, 900],
    perDiemUSD: 30,
  },
  {
    code: "KG",
    name: "Kyrgyzstan",
    flag: "🇰🇬",
    currency: "KGS",
    visaFeeUSD: 0,
    flightRangeUSD: [400, 800],
    perDiemUSD: 25,
  },
  {
    code: "TJ",
    name: "Tajikistan",
    flag: "🇹🇯",
    currency: "TJS",
    visaFeeUSD: 0,
    flightRangeUSD: [500, 950],
    perDiemUSD: 22,
  },
  {
    code: "TM",
    name: "Turkmenistan",
    flag: "🇹🇲",
    currency: "TMT",
    visaFeeUSD: 0,
    flightRangeUSD: [600, 1100],
    perDiemUSD: 28,
  },
  {
    code: "RU",
    name: "Russia",
    flag: "🇷🇺",
    currency: "RUB",
    visaFeeUSD: 0,
    flightRangeUSD: [400, 850],
    perDiemUSD: 30,
  },
  {
    code: "OTHER",
    name: "Other / International",
    flag: "🌍",
    currency: "USD",
    visaFeeUSD: 80,
    flightRangeUSD: [700, 1800],
    perDiemUSD: 40,
  },
];

export const HOTEL_TIERS: Record<HotelTier, { label: string; description: string; perNightUSD: number }> = {
  budget: {
    label: "Budget guesthouse",
    description: "Clean private room near the hospital, basic amenities.",
    perNightUSD: 25,
  },
  comfort: {
    label: "Comfort hotel (3–4★)",
    description: "Mid-range hotel with breakfast, walking distance to the hospital.",
    perNightUSD: 70,
  },
  premium: {
    label: "Premium hotel (4–5★)",
    description: "Full-service hotel, often on hospital campus with patient services.",
    perNightUSD: 160,
  },
};

// Static FX rates (USD = 1). These are illustrative; the calculator
// can be re-pointed at a live FX API later.
export const FX_RATES: Record<Currency, number> = {
  USD: 1,
  INR: 83.2,
  UZS: 12850,
  KZT: 460,
  KGS: 87.5,
  TJS: 10.95,
  TMT: 3.5,
  RUB: 92.5,
};

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: "$",
  INR: "₹",
  UZS: "UZS ",
  KZT: "₸",
  KGS: "KGS ",
  TJS: "TJS ",
  TMT: "TMT ",
  RUB: "₽",
};

export type CalculatorInput = {
  treatmentSlug: string;
  countryCode: CountryCode;
  hotelTier: HotelTier;
  days: number;
  companions: number;
};

export type CalculatorLineItem = {
  label: string;
  detail?: string;
  amountUSD: number;
};

export type CalculatorResult = {
  input: CalculatorInput;
  country: Country;
  hotel: { tier: HotelTier; label: string; perNightUSD: number };
  treatment: { name: string; startingFromUSD: number; maxUSD: number };
  lineItems: CalculatorLineItem[];
  subtotalUSD: number;
  bufferUSD: number;
  totalUSD: number;
  displayCurrency: Currency;
  displayTotal: number;
  savingsVsUS: number;
  notes: string[];
};

const SAVINGS_PERCENT_BY_COUNTRY: Record<CountryCode, number> = {
  UZ: 70,
  KZ: 70,
  KG: 70,
  TJ: 70,
  TM: 70,
  RU: 65,
  OTHER: 50,
};

// US baseline costs (typical private US hospital charges for equivalent procedures)
const US_BASELINE_MULTIPLIER = 4;

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function findTreatmentBySlug(slug: string) {
  return costGuideData.find((t) => slugify(t.treatment) === slug) ?? null;
}

export function listTreatmentChoices(): Array<{ slug: string; name: string; category: string; from: number }> {
  return costGuideData
    .slice()
    .sort((a, b) => a.startingFromUSD - b.startingFromUSD)
    .map((t) => ({
      slug: slugify(t.treatment),
      name: t.treatment,
      category: t.category,
      from: t.startingFromUSD,
    }));
}

function parseRange(range: string): [number, number] {
  const match = range.replace(/[^\d\-]/g, "").split("-").map((n) => Number(n));
  if (match.length !== 2 || match.some((n) => !Number.isFinite(n))) {
    return [0, 0];
  }
  return [match[0], match[1]];
}

export function calculate(input: CalculatorInput): CalculatorResult | null {
  const country = COUNTRIES.find((c) => c.code === input.countryCode);
  const hotel = HOTEL_TIERS[input.hotelTier];
  const treatment = findTreatmentBySlug(input.treatmentSlug);
  if (!country || !hotel || !treatment) return null;

  const [, treatmentMaxUSD] = parseRange(treatment.costRangeUSD);

  // 1. Treatment cost (use starting-from as conservative estimate)
  const treatmentCost = treatment.startingFromUSD;

  // 2. Hospital stay over the procedure duration
  const [flightMin, flightMax] = country.flightRangeUSD;
  const flightEstimate = (flightMin + flightMax) / 2;

  // 3. Accommodation
  const accommodation = hotel.perNightUSD * input.days;

  // 4. Per-diem (food, local transport, misc) for patient + companions
  const people = 1 + Math.max(0, input.companions);
  const perDiem = country.perDiemUSD * input.days * people;

  // 5. Visa & coordination fee
  const visa = country.visaFeeUSD;
  const coordinationFee = 250; // MedPobeda coordination package

  // 6. Buffer for unexpected / upgrades
  const subtotal =
    treatmentCost + flightEstimate + accommodation + perDiem + visa + coordinationFee;
  const buffer = Math.round(subtotal * 0.08);

  const totalUSD = subtotal + buffer;

  // 7. Display in user's currency
  const fx = FX_RATES[country.currency];
  const displayTotal = Math.round(totalUSD * fx);

  // 8. Savings vs US
  const usBaseline = treatmentMaxUSD * US_BASELINE_MULTIPLIER;
  const savingsVsUS = Math.max(0, usBaseline - totalUSD);

  const lineItems: CalculatorLineItem[] = [
    {
      label: treatment.treatment,
      detail: `Hospital package (from $${treatment.startingFromUSD.toLocaleString("en-US")})`,
      amountUSD: treatmentCost,
    },
    {
      label: "Round-trip flights",
      detail: `${country.name} → India, typical range $${flightMin}–$${flightMax}`,
      amountUSD: Math.round(flightEstimate),
    },
    {
      label: "Accommodation",
      detail: `${hotel.label} · ${input.days} night${input.days === 1 ? "" : "s"} × $${hotel.perNightUSD}/night`,
      amountUSD: accommodation,
    },
    {
      label: "Food & local travel",
      detail: `$${country.perDiemUSD}/day × ${input.days} day${input.days === 1 ? "" : "s"} × ${people} ${people === 1 ? "person" : "people"}`,
      amountUSD: perDiem,
    },
    {
      label: "Visa + documentation",
      detail: country.visaFeeUSD > 0 ? "Medical visa + invitation letter" : "E-visa or visa-free entry",
      amountUSD: visa,
    },
    {
      label: "MedPobeda coordination",
      detail: "Airport pickup, translator, hospital liaison, follow-up",
      amountUSD: coordinationFee,
    },
    {
      label: "Contingency buffer",
      detail: "8% reserve for unexpected costs, upgrades, or extended stay",
      amountUSD: buffer,
    },
  ];

  const notes: string[] = [
    `Estimate based on a ${input.days}-day stay in India for the patient${input.companions > 0 ? ` plus ${input.companions} companion${input.companions === 1 ? "" : "s"}` : ""}.`,
    `Typical savings of ${SAVINGS_PERCENT_BY_COUNTRY[input.countryCode]}% vs equivalent treatment in ${country.code === "OTHER" ? "Western countries" : "your home country"}.`,
    "Final hospital cost depends on surgeon, room category, and any complications.",
    "MedPobeda coordination is fixed; all other line items are estimates within ±15%.",
  ];

  return {
    input,
    country,
    hotel: { tier: input.hotelTier, label: hotel.label, perNightUSD: hotel.perNightUSD },
    treatment: { name: treatment.treatment, startingFromUSD: treatment.startingFromUSD, maxUSD: treatmentMaxUSD },
    lineItems,
    subtotalUSD: subtotal,
    bufferUSD: buffer,
    totalUSD,
    displayCurrency: country.currency,
    displayTotal,
    savingsVsUS,
    notes,
  };
}
