import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().default(""),
  AUTH_SECRET: z
    .string()
    .min(32)
    .default("change-this-to-a-long-random-secret-key"),
  ADMIN_EMAIL: z.string().email().default("info@medpobedagroup.uz"),
  ADMIN_PASSWORD: z.string().min(12).default("ChangeThisPassword123!"),
  ADMIN_BOOTSTRAP_NAME: z.string().default("MedPobeda Admin"),
  ADMIN_BOOTSTRAP_EMAIL: z.string().email().default("info@medpobedagroup.uz"),
  ADMIN_BOOTSTRAP_PASSWORD: z.string().min(12).default("ChangeThisPassword123!"),
  UPLOAD_ROOT: z.string().default("./storage/uploads/private"),
  MAX_UPLOAD_SIZE_MB: z.coerce.number().int().positive().default(10),
  EMAIL_SERVER_HOST: z.string().default(""),
  EMAIL_SERVER_PORT: z.coerce.number().int().positive().default(587),
  EMAIL_SERVER_USER: z.string().default(""),
  EMAIL_SERVER_PASSWORD: z.string().default(""),
  EMAIL_FROM: z.string().default(""),
  ADMIN_NOTIFICATION_EMAIL: z.string().default(""),
  RESEND_API_KEY: z.string().default(""),
  RESEND_FROM_EMAIL: z.string().default(""),
  SMTP_HOST: z.string().default(""),
  SMTP_PORT: z.coerce.number().int().positive().default(587),
  SMTP_USER: z.string().default(""),
  SMTP_PASSWORD: z.string().default(""),
  SMTP_FROM_EMAIL: z.string().default(""),
  MEDICAL_TOURISM_ADMIN_EMAIL: z.string().default(""),
  PARTNERSHIP_ADMIN_EMAIL: z.string().default(""),
  STUDENT_MOBILITY_ADMIN_EMAIL: z.string().default(""),
  CONTACT_ADMIN_EMAIL: z.string().default(""),
  HIGH_URGENCY_ALERT_EMAIL: z.string().default(""),
  NEXT_PUBLIC_SITE_URL: z.string().default("https://medpobedagroup.uz"),
  NEXT_PUBLIC_WHATSAPP_URL: z.string().default(""),
  NEXT_PUBLIC_TELEGRAM_URL: z.string().default(""),
  NEXT_PUBLIC_CONTACT_EMAIL: z.string().default(""),
  NEXT_PUBLIC_CONTACT_PHONE: z.string().default(""),
  NEXT_PUBLIC_WHATSAPP_NUMBER: z.string().default(""),
  NEXT_PUBLIC_TELEGRAM_HANDLE: z.string().default(""),
  TELEGRAM_BOT_TOKEN: z.string().default(""),
  TELEGRAM_CHAT_ID: z.string().default(""),
  SPAM_HONEYPOT_FIELD: z.string().default("website"),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
});

export const env = envSchema.parse({
  DATABASE_URL: process.env.DATABASE_URL,
  AUTH_SECRET: process.env.AUTH_SECRET,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL ?? process.env.ADMIN_BOOTSTRAP_EMAIL,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD ?? process.env.ADMIN_BOOTSTRAP_PASSWORD,
  ADMIN_BOOTSTRAP_NAME: process.env.ADMIN_BOOTSTRAP_NAME,
  ADMIN_BOOTSTRAP_EMAIL: process.env.ADMIN_BOOTSTRAP_EMAIL,
  ADMIN_BOOTSTRAP_PASSWORD: process.env.ADMIN_BOOTSTRAP_PASSWORD,
  UPLOAD_ROOT: process.env.UPLOAD_ROOT,
  MAX_UPLOAD_SIZE_MB: process.env.MAX_UPLOAD_SIZE_MB,
  EMAIL_SERVER_HOST: process.env.EMAIL_SERVER_HOST ?? process.env.SMTP_HOST,
  EMAIL_SERVER_PORT: process.env.EMAIL_SERVER_PORT ?? process.env.SMTP_PORT,
  EMAIL_SERVER_USER: process.env.EMAIL_SERVER_USER ?? process.env.SMTP_USER,
  EMAIL_SERVER_PASSWORD:
    process.env.EMAIL_SERVER_PASSWORD ?? process.env.SMTP_PASSWORD,
  EMAIL_FROM: process.env.EMAIL_FROM ?? process.env.SMTP_FROM_EMAIL,
  ADMIN_NOTIFICATION_EMAIL:
    process.env.ADMIN_NOTIFICATION_EMAIL ?? process.env.CONTACT_ADMIN_EMAIL,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL ?? process.env.EMAIL_FROM,
  SMTP_HOST: process.env.SMTP_HOST ?? process.env.EMAIL_SERVER_HOST,
  SMTP_PORT: process.env.SMTP_PORT ?? process.env.EMAIL_SERVER_PORT,
  SMTP_USER: process.env.SMTP_USER ?? process.env.EMAIL_SERVER_USER,
  SMTP_PASSWORD:
    process.env.SMTP_PASSWORD ?? process.env.EMAIL_SERVER_PASSWORD,
  SMTP_FROM_EMAIL: process.env.SMTP_FROM_EMAIL ?? process.env.EMAIL_FROM,
  MEDICAL_TOURISM_ADMIN_EMAIL: process.env.MEDICAL_TOURISM_ADMIN_EMAIL,
  PARTNERSHIP_ADMIN_EMAIL: process.env.PARTNERSHIP_ADMIN_EMAIL,
  STUDENT_MOBILITY_ADMIN_EMAIL: process.env.STUDENT_MOBILITY_ADMIN_EMAIL,
  CONTACT_ADMIN_EMAIL:
    process.env.CONTACT_ADMIN_EMAIL ?? process.env.ADMIN_NOTIFICATION_EMAIL,
  HIGH_URGENCY_ALERT_EMAIL: process.env.HIGH_URGENCY_ALERT_EMAIL,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_WHATSAPP_URL: process.env.NEXT_PUBLIC_WHATSAPP_URL,
  NEXT_PUBLIC_TELEGRAM_URL: process.env.NEXT_PUBLIC_TELEGRAM_URL,
  NEXT_PUBLIC_CONTACT_EMAIL: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
  NEXT_PUBLIC_CONTACT_PHONE: process.env.NEXT_PUBLIC_CONTACT_PHONE,
  NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
  NEXT_PUBLIC_TELEGRAM_HANDLE: process.env.NEXT_PUBLIC_TELEGRAM_HANDLE,
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
  TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID,
  SPAM_HONEYPOT_FIELD: process.env.SPAM_HONEYPOT_FIELD,
  NODE_ENV: process.env.NODE_ENV,
});

export const emailProviderConfigured =
  Boolean(env.RESEND_API_KEY && env.RESEND_FROM_EMAIL) ||
  Boolean(env.EMAIL_SERVER_HOST && env.EMAIL_FROM) ||
  Boolean(env.SMTP_HOST && env.SMTP_FROM_EMAIL);

export function assertDatabaseUrl() {
  if (!env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured.");
  }
}
