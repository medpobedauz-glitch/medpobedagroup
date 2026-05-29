export const InquiryType = {
  CONTACT: "CONTACT",
  PARTNERSHIP: "PARTNERSHIP",
  MEDICAL_TOURISM: "MEDICAL_TOURISM",
  INTERNATIONAL_PATIENT: "INTERNATIONAL_PATIENT",
  STUDENT_MOBILITY: "STUDENT_MOBILITY",
} as const;

export type InquiryType = (typeof InquiryType)[keyof typeof InquiryType];

export const LeadPriority = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
  URGENT: "URGENT",
} as const;

export type LeadPriority = (typeof LeadPriority)[keyof typeof LeadPriority];

export const PipelineStage = {
  NEW: "NEW",
  CONTACTED: "CONTACTED",
  QUALIFIED: "QUALIFIED",
  NEGOTIATION: "NEGOTIATION",
  CONVERTED: "CONVERTED",
  CLOSED: "CLOSED",
} as const;

export type PipelineStage = (typeof PipelineStage)[keyof typeof PipelineStage];

export const UrgencyLevel = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
  CRITICAL: "CRITICAL",
} as const;

export type UrgencyLevel = (typeof UrgencyLevel)[keyof typeof UrgencyLevel];

export const BlogStatus = {
  DRAFT: "DRAFT",
  PUBLISHED: "PUBLISHED",
  ARCHIVED: "ARCHIVED",
} as const;

export type BlogStatus = (typeof BlogStatus)[keyof typeof BlogStatus];
