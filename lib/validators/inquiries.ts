import {
  InquiryStatus,
  InquiryType,
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
  passportNumber: z.string().optional(),
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
