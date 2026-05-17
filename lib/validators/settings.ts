import { z } from "zod";

export const platformSettingsSchema = z.object({
  brandName: z.string().min(2, "Brand name is required."),
  shortName: z.string().min(2, "Short name is required."),
  siteUrl: z.string().url("A valid site URL is required."),
  seoDefaultTitle: z.string().min(10, "Default SEO title is required."),
  seoDefaultDescription: z.string().min(30, "Default SEO description is required."),
  seoKeywords: z.array(z.string()).default([]),
  ogImage: z.string().optional(),
  twitterHandle: z.string().optional(),
  linkedinUrl: z.string().url().optional().or(z.literal("")),
  xUrl: z.string().url().optional().or(z.literal("")),
  youtubeUrl: z.string().url().optional().or(z.literal("")),
  whatsappNumber: z.string().optional(),
  telegramHandle: z.string().optional(),
  contactEmail: z.string().email("A valid contact email is required."),
  contactPhone: z.string().optional(),
  medicalTourismEmail: z.string().email().optional().or(z.literal("")),
  partnershipEmail: z.string().email().optional().or(z.literal("")),
  studentMobilityEmail: z.string().email().optional().or(z.literal("")),
  generalInquiryEmail: z.string().email().optional().or(z.literal("")),
  highUrgencyEmail: z.string().email().optional().or(z.literal("")),
  brandingPrimary: z.string().regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/),
  brandingSecondary: z.string().regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/),
});

export const searchQuerySchema = z.object({
  query: z.string().min(2, "Search query is required."),
  scope: z
    .enum(["all", "leads", "hospitals", "partnerships", "blog"])
    .default("all"),
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(50).default(20),
});
