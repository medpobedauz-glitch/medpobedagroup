import { z } from "zod";

const phonePattern = /^[+]?[0-9()[\]\-.\s]{7,20}$/;
const supportedCurrencies = [
  "USD",
  "INR",
  "UZS",
  "KZT",
  "KGS",
  "TJS",
  "TMT",
  "AZN",
  "SAR",
  "AED",
  "RUB",
] as const;

const optionalText = (maximum: number) =>
  z
    .string()
    .trim()
    .max(maximum)
    .optional()
    .transform((value) => value || undefined);

const optionalBoolean = z.boolean().optional().default(false);
const estimateAmount = z.number().finite().min(0).max(100_000_000);

export const costEstimateSnapshotSchema = z
  .object({
    version: z.number().int().min(1).max(10).optional().default(1),
    currency: z.enum(supportedCurrencies).optional().default("USD"),
    displayCurrency: z.enum(supportedCurrencies).optional(),
    treatmentId: optionalText(160),
    treatmentSlug: optionalText(160),
    treatmentName: optionalText(240),
    disease: optionalText(500),
    hospitalId: optionalText(160),
    hospitalName: optionalText(240),
    doctorId: optionalText(160),
    doctorName: optionalText(240),
    preferredCity: optionalText(160),
    patientCountry: optionalText(160),
    preferredLanguage: optionalText(80),
    age: z.number().int().min(0).max(120).optional(),
    gender: z
      .enum(["MALE", "FEMALE", "OTHER", "PREFER_NOT_TO_SAY"])
      .optional(),
    companions: z.number().int().min(0).max(10).optional(),
    expectedStayDays: z.number().int().min(1).max(365).optional(),
    hotelCategory: optionalText(80),
    services: z
      .object({
        interpreter: optionalBoolean,
        airportPickup: optionalBoolean,
        visaAssistance: optionalBoolean,
        teleconsultation: optionalBoolean,
      })
      .optional(),
    minimumEstimate: estimateAmount.optional(),
    maximumEstimate: estimateAmount.optional(),
    estimatedTotal: estimateAmount.optional(),
    lineItems: z
      .array(
        z
          .object({
            key: optionalText(80),
            label: z.string().trim().min(1).max(160),
            minimum: estimateAmount.optional(),
            maximum: estimateAmount.optional(),
            amount: estimateAmount.optional(),
          })
          .strip(),
      )
      .max(40)
      .optional(),
    recommendedHospitalIds: z.array(z.string().trim().max(160)).max(20).optional(),
    recommendedDoctorIds: z.array(z.string().trim().max(160)).max(20).optional(),
  })
  .strip()
  .superRefine((value, context) => {
    if (
      value.minimumEstimate !== undefined &&
      value.maximumEstimate !== undefined &&
      value.minimumEstimate > value.maximumEstimate
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["maximumEstimate"],
        message: "Maximum estimate must be greater than or equal to the minimum.",
      });
    }
  });

export const costEstimateLeadSchema = z.object({
  fullName: z.string().trim().min(2, "Full name is required.").max(160),
  country: z.string().trim().min(2, "Country is required.").max(160),
  phone: z
    .string()
    .trim()
    .min(1, "Phone is required.")
    .refine((value) => phonePattern.test(value), "Enter a valid phone number."),
  whatsapp: z
    .string()
    .trim()
    .min(1, "WhatsApp number is required.")
    .refine((value) => phonePattern.test(value), "Enter a valid WhatsApp number."),
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Enter a valid email address.")
    .max(254),
  preferredTreatment: z
    .string()
    .trim()
    .min(2, "Preferred treatment is required.")
    .max(240),
  medicalCondition: z
    .string()
    .trim()
    .min(5, "Please briefly describe the medical condition.")
    .max(3000, "Medical condition must be 3,000 characters or fewer."),
  consentAccepted: z.boolean().refine((value) => value, {
    message: "Consent is required.",
  }),
  redirectPath: z
    .string()
    .trim()
    .regex(/^\/(?:(?:uz|ky|en|kk|tg|tk|ru)\/)?cost-calculator\/?$/)
    .optional()
    .default("/cost-calculator"),
  sessionId: optionalText(120),
  estimateSnapshot: costEstimateSnapshotSchema,
});

export type CostEstimateSnapshot = z.infer<typeof costEstimateSnapshotSchema>;
export type CostEstimateLeadInput = z.infer<typeof costEstimateLeadSchema>;

export function parseCostEstimateSnapshot(value: FormDataEntryValue | null) {
  if (typeof value !== "string" || !value.trim()) {
    return {};
  }

  if (value.length > 25_000) {
    throw new Error("Estimate payload is too large.");
  }

  let decoded: unknown;

  try {
    decoded = JSON.parse(value);
  } catch {
    throw new Error("Estimate payload is not valid JSON.");
  }

  const parsed = costEstimateSnapshotSchema.safeParse(decoded);

  if (!parsed.success) {
    throw new Error("Estimate payload is invalid.");
  }

  return parsed.data;
}
