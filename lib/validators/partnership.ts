import {
  AgreementStatus,
  MeetingType,
  PartnershipStatus,
} from "@prisma/client";
import { z } from "zod";

export const partnershipStatusSchema = z.object({
  id: z.string().cuid(),
  status: z.nativeEnum(PartnershipStatus),
  nextStep: z.string().optional(),
  agreementStatus: z.nativeEnum(AgreementStatus).optional(),
});

export const partnershipNoteSchema = z.object({
  partnershipId: z.string().cuid(),
  content: z.string().min(2, "Note cannot be empty."),
});

export const partnershipMeetingSchema = z.object({
  partnershipId: z.string().cuid(),
  hospitalId: z.string().cuid().optional(),
  title: z.string().min(2, "Meeting title is required."),
  meetingType: z.nativeEnum(MeetingType),
  meetingAt: z.string().min(1, "Meeting date is required."),
  location: z.string().optional(),
  notes: z.string().optional(),
  outcome: z.string().optional(),
});

export const hospitalSchema = z.object({
  name: z.string().min(2, "Hospital name is required."),
  country: z.string().min(2, "Country is required."),
  city: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
  description: z.string().optional(),
  hospitalType: z.string().optional(),
  internationalDeskEmail: z.string().email().optional().or(z.literal("")),
  internationalDeskPhone: z.string().optional(),
  status: z.nativeEnum(PartnershipStatus),
});

export const contactPersonSchema = z.object({
  partnershipId: z.string().cuid().optional(),
  hospitalId: z.string().cuid().optional(),
  name: z.string().min(2, "Contact name is required."),
  role: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
  telegram: z.string().optional(),
  country: z.string().optional(),
});
