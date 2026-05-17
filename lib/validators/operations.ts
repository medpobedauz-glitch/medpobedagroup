import {
  CaseTimelineEntryType,
  CommunicationChannel,
  CommunicationDirection,
  LanguageCode,
  LeadPriority,
  PatientCaseStatus,
  TaskStatus,
  TreatmentJourneyStage,
} from "@prisma/client";
import { z } from "zod";

export const countrySchema = z.object({
  code: z.string().trim().min(2).max(4),
  name: z.string().trim().min(2).max(120),
  localName: z.string().trim().max(120).optional(),
  region: z.string().trim().min(2).max(120),
  timezone: z.string().trim().min(2).max(120),
  languages: z.array(z.nativeEnum(LanguageCode)).min(1),
  isPriorityMarket: z.boolean().default(false),
});

export const countryOfficeSchema = z.object({
  countryId: z.string().cuid(),
  officeName: z.string().trim().min(2).max(120),
  city: z.string().trim().min(2).max(120),
  address: z.string().trim().max(500).optional(),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().trim().max(60).optional(),
  telegram: z.string().trim().max(60).optional(),
  timezone: z.string().trim().min(2).max(120),
  isPrimary: z.boolean().default(false),
});

export const regionalCoordinatorSchema = z.object({
  userId: z.string().cuid().optional(),
  countryId: z.string().cuid(),
  officeId: z.string().cuid().optional(),
  name: z.string().trim().min(2).max(120),
  email: z.string().email(),
  phone: z.string().trim().max(60).optional(),
  telegram: z.string().trim().max(60).optional(),
  specialization: z.string().trim().max(160).optional(),
  languages: z.array(z.nativeEnum(LanguageCode)).min(1),
  timezone: z.string().trim().min(2).max(120),
});

export const patientCaseCreateSchema = z.object({
  medicalTourismInquiryId: z.string().cuid(),
  countryId: z.string().cuid().optional(),
  coordinatorId: z.string().cuid().optional(),
  assignedHospitalId: z.string().cuid().optional(),
  assignedManagerId: z.string().cuid().optional(),
  summary: z.string().trim().max(2000).optional(),
  treatmentPlan: z.string().trim().max(2000).optional(),
  nextAction: z.string().trim().max(240).optional(),
  targetTravelDate: z.string().datetime().optional(),
});

export const patientCaseUpdateSchema = z.object({
  caseId: z.string().cuid(),
  status: z.nativeEnum(PatientCaseStatus),
  journeyStage: z.nativeEnum(TreatmentJourneyStage),
  countryId: z.string().cuid().optional(),
  coordinatorId: z.string().cuid().optional(),
  assignedHospitalId: z.string().cuid().optional(),
  assignedManagerId: z.string().cuid().optional(),
  summary: z.string().trim().max(2000).optional(),
  treatmentPlan: z.string().trim().max(2000).optional(),
  nextAction: z.string().trim().max(240).optional(),
  targetTravelDate: z.string().datetime().optional(),
});

export const caseTimelineEntrySchema = z.object({
  patientCaseId: z.string().cuid(),
  title: z.string().trim().min(2).max(160),
  description: z.string().trim().max(2000).optional(),
  entryType: z.nativeEnum(CaseTimelineEntryType),
});

export const caseCommunicationSchema = z.object({
  patientCaseId: z.string().cuid(),
  channel: z.nativeEnum(CommunicationChannel),
  direction: z.nativeEnum(CommunicationDirection),
  subject: z.string().trim().max(160).optional(),
  content: z.string().trim().min(2).max(4000),
});

export const staffTaskSchema = z.object({
  title: z.string().trim().min(2).max(160),
  description: z.string().trim().max(2000).optional(),
  priority: z.nativeEnum(LeadPriority),
  assignedToId: z.string().cuid().optional(),
  patientCaseId: z.string().cuid().optional(),
  partnershipId: z.string().cuid().optional(),
  leadModel: z.string().trim().max(80).optional(),
  leadId: z.string().cuid().optional(),
  dueAt: z.string().datetime().optional(),
});

export const taskStatusSchema = z.object({
  taskId: z.string().cuid(),
  status: z.nativeEnum(TaskStatus),
});

export const notificationReadSchema = z.object({
  notificationId: z.string().cuid(),
});
