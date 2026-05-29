import {
  Gender,
  InquiryStatus,
  InquiryType,
  PartnershipInterest,
  StudentService,
  LeadPriority,
  PipelineStage,
  UrgencyLevel,
} from "@prisma/client";
import { z } from "zod";

export const contactInquirySchema = z.object({
  name: z.string().min(2, "Name is required."),
  organization: z.string().optional(),
  country: z.string().optional(),
  phone: z.string().optional(),
  telegram: z.string().optional(),
  email: z.string().email("Valid email is required."),
  inquiryType: z.nativeEnum(InquiryType),
  message: z.string().min(20, "Please provide more detail."),
  academicBackground: z.string().optional(),
  preferredCountry: z.string().optional(),
  programInterest: z.string().optional(),
  preferredContactTime: z.string().optional(),
  collaborationInterest: z.string().optional(),
  consentAccepted: z.boolean().refine((value) => value, {
    message: "Consent is required.",
  }),
});

export const medicalTourismInquirySchema = z.object({
  name: z.string().min(2, "Name is required."),
  organization: z.string().optional(),
  country: z.string().optional(),
  phone: z.string().optional(),
  telegram: z.string().optional(),
  email: z.string().email("Valid email is required."),
  message: z.string().min(20, "Please provide the care requirement."),
  treatmentType: z.string().min(2, "Treatment type is required."),
  preferredCountry: z.string().optional(),
  budgetRange: z.string().optional(),
  preferredHospital: z.string().optional(),
  patientNationality: z.string().min(2, "Patient nationality is required."),
  urgencyLevel: z.nativeEnum(UrgencyLevel),
  reportsSummary: z.string().optional(),
  patientName: z.string().optional(),
  consentAccepted: z.boolean().refine((value) => value, {
    message: "Consent is required.",
  }),
});

export const leadStatusSchema = z.object({
  id: z.string().cuid(),
  model: z.enum([
    "contactSubmission",
    "partnershipLead",
    "studentMobilityInquiry",
    "medicalTourismInquiry",
  ]),
  status: z.nativeEnum(InquiryStatus),
});

export const leadWorkflowSchema = z.object({
  id: z.string().cuid(),
  model: z.enum([
    "contactSubmission",
    "partnershipLead",
    "studentMobilityInquiry",
    "medicalTourismInquiry",
  ]),
  status: z.nativeEnum(InquiryStatus),
  priority: z.nativeEnum(LeadPriority),
  pipelineStage: z.nativeEnum(PipelineStage).optional(),
  assignedToId: z.string().cuid().optional().or(z.literal("")),
  assignedHospitalId: z.string().cuid().optional().or(z.literal("")),
  tags: z.string().optional(),
  closedReason: z.string().max(200).optional(),
});

export const leadNoteSchema = z.object({
  id: z.string().cuid(),
  model: z.enum([
    "contactSubmission",
    "partnershipLead",
    "studentMobilityInquiry",
    "medicalTourismInquiry",
  ]),
  content: z.string().min(2, "Note cannot be empty."),
});

export const leadFollowUpEmailSchema = z.object({
  id: z.string().cuid(),
  model: z.enum([
    "contactSubmission",
    "partnershipLead",
    "studentMobilityInquiry",
    "medicalTourismInquiry",
  ]),
  subject: z.string().min(4, "Subject is required."),
  body: z.string().min(20, "Email body is required."),
  markContacted: z
    .string()
    .optional()
    .transform((value) => value === "true"),
});

export const adminLeadFilterSchema = z.object({
  search: z.string().optional(),
  status: z.nativeEnum(InquiryStatus).optional(),
  type: z.nativeEnum(InquiryType).optional(),
  country: z.string().optional(),
});

export const leadPipelineStageSchema = z.object({
  id: z.string().cuid(),
  model: z.enum([
    "contactSubmission",
    "partnershipLead",
    "studentMobilityInquiry",
    "medicalTourismInquiry",
  ]),
  pipelineStage: z.nativeEnum(PipelineStage),
  assignedToId: z.string().cuid().optional().or(z.literal("")),
  tags: z.string().optional(),
});

export const leadReminderSchema = z.object({
  leadId: z.string().cuid(),
  leadModel: z.enum([
    "contactSubmission",
    "partnershipLead",
    "studentMobilityInquiry",
    "medicalTourismInquiry",
  ]),
  title: z.string().min(3, "Reminder title is required."),
  note: z.string().max(500).optional(),
  dueAt: z.string().min(10, "Due date is required."),
  priority: z.nativeEnum(LeadPriority),
  assignedToId: z.string().cuid().optional().or(z.literal("")),
});

export type InquiryValidationMessages = {
  nameRequired: string;
  emailRequired: string;
  emailInvalid: string;
  phoneInvalid: string;
  countryRequired: string;
  messageTooShort: string;
  messageTooLong: string;
  consentRequired: string;
  inquiryTypeRequired: string;
  patientNameRequired: string;
  treatmentDepartmentRequired: string;
  diagnosisRequired: string;
  ageInvalid: string;
  websiteInvalid: string;
  partnershipInterestRequired: string;
  interestedServiceRequired: string;
  preferredCourseRequired: string;
};

const phonePattern = /^[+]?[0-9()[\]\-.\s]{7,20}$/;
const optionalPhoneSchema = (message: string) =>
  z
    .string()
    .trim()
    .optional()
    .transform((value) => value || undefined)
    .refine((value) => !value || phonePattern.test(value), message);

const optionalUrlSchema = (message: string) =>
  z
    .string()
    .trim()
    .optional()
    .transform((value) => value || undefined)
    .refine((value) => !value || /^https?:\/\//i.test(value), message);

const requiredMessageSchema = (messages: InquiryValidationMessages) =>
  z
    .string()
    .trim()
    .min(20, messages.messageTooShort)
    .max(3000, messages.messageTooLong);

const consentSchema = (message: string) =>
  z.boolean().refine((value) => value, { message });

export function createContactInquirySubmissionSchema(
  messages: InquiryValidationMessages,
) {
  return z.object({
    fullName: z.string().trim().min(2, messages.nameRequired),
    email: z
      .string()
      .trim()
      .min(1, messages.emailRequired)
      .email(messages.emailInvalid),
    phone: optionalPhoneSchema(messages.phoneInvalid),
    country: z.string().trim().optional().transform((value) => value || undefined),
    inquiryType: z.nativeEnum(InquiryType, {
      errorMap: () => ({ message: messages.inquiryTypeRequired }),
    }),
    message: requiredMessageSchema(messages),
    consent: consentSchema(messages.consentRequired),
  });
}

export function createPatientInquirySubmissionSchema(
  messages: InquiryValidationMessages,
) {
  return z.object({
    patientName: z.string().trim().min(2, messages.patientNameRequired),
    age: z
      .union([z.number().int(), z.nan()])
      .optional()
      .transform((value) => (Number.isNaN(value) ? undefined : value))
      .refine(
        (value) => value === undefined || (value >= 0 && value <= 120),
        messages.ageInvalid,
      ),
    gender: z.nativeEnum(Gender).optional(),
    country: z.string().trim().optional().transform((value) => value || undefined),
    phone: optionalPhoneSchema(messages.phoneInvalid),
    email: z
      .string()
      .trim()
      .optional()
      .transform((value) => value || undefined)
      .refine((value) => !value || /\S+@\S+\.\S+/.test(value), messages.emailInvalid),
    preferredTreatmentDepartment: z
      .string()
      .trim()
      .min(2, messages.treatmentDepartmentRequired),
    diagnosisOrConcern: z
      .string()
      .trim()
      .optional()
      .transform((value) => value || undefined),
    preferredTreatmentCountry: z
      .string()
      .trim()
      .optional()
      .transform((value) => value || undefined),
    needsVisaSupport: z.boolean().optional().default(false),
    needsAccommodationSupport: z.boolean().optional().default(false),
    message: requiredMessageSchema(messages),
    consent: consentSchema(messages.consentRequired),
  });
}

export function createHospitalPartnershipInquirySubmissionSchema(
  messages: InquiryValidationMessages,
) {
  return z.object({
    hospitalName: z.string().trim().min(2, messages.nameRequired),
    contactPersonName: z.string().trim().min(2, messages.nameRequired),
    designation: z.string().trim().optional().transform((value) => value || undefined),
    country: z.string().trim().min(2, messages.countryRequired),
    city: z.string().trim().optional().transform((value) => value || undefined),
    email: z
      .string()
      .trim()
      .min(1, messages.emailRequired)
      .email(messages.emailInvalid),
    phone: optionalPhoneSchema(messages.phoneInvalid),
    website: optionalUrlSchema(messages.websiteInvalid),
    partnershipInterest: z.nativeEnum(PartnershipInterest).optional(),
    message: requiredMessageSchema(messages),
    consent: consentSchema(messages.consentRequired),
  });
}

export function createStudentMobilityInquirySubmissionSchema(
  messages: InquiryValidationMessages,
) {
  return z.object({
    studentName: z.string().trim().min(2, messages.nameRequired),
    country: z.string().trim().min(2, messages.countryRequired),
    phone: optionalPhoneSchema(messages.phoneInvalid),
    email: z
      .string()
      .trim()
      .min(1, messages.emailRequired)
      .email(messages.emailInvalid),
    interestedService: z.nativeEnum(StudentService).optional(),
    preferredCountry: z
      .string()
      .trim()
      .optional()
      .transform((value) => value || undefined),
    preferredCourse: z
      .string()
      .trim()
      .optional()
      .transform((value) => value || undefined),
    message: requiredMessageSchema(messages),
    consent: consentSchema(messages.consentRequired),
  });
}
