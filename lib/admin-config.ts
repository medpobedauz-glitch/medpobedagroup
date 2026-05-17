import {
  InquiryStatus,
  LeadPriority,
  PipelineStage,
  UserRole,
} from "@prisma/client";

export const crmStatusOptions = [
  InquiryStatus.NEW,
  InquiryStatus.ACKNOWLEDGED,
  InquiryStatus.REVIEWING,
  InquiryStatus.QUALIFIED,
  InquiryStatus.CONTACTED,
  InquiryStatus.IN_PROGRESS,
  InquiryStatus.WON,
  InquiryStatus.CLOSED,
  InquiryStatus.REJECTED,
  InquiryStatus.LOST,
  InquiryStatus.SPAM,
] as const;

export const leadPriorityOptions = [
  LeadPriority.LOW,
  LeadPriority.MEDIUM,
  LeadPriority.HIGH,
  LeadPriority.URGENT,
] as const;

export const pipelineStageOptions = [
  PipelineStage.NEW,
  PipelineStage.CONTACTED,
  PipelineStage.QUALIFIED,
  PipelineStage.NEGOTIATION,
  PipelineStage.CONVERTED,
  PipelineStage.CLOSED,
] as const;

export const adminVisibleRoles = [
  UserRole.SUPER_ADMIN,
  UserRole.ADMIN,
  UserRole.STAFF,
] as const;

export const managementRoles = [UserRole.SUPER_ADMIN, UserRole.ADMIN] as const;
