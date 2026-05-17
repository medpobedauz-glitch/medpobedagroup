import "server-only";

import { Prisma } from "@prisma/client";
import nodemailer from "nodemailer";
import { Resend } from "resend";

import { emailProviderConfigured, env } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import {
  buildAdminInquiryNotificationEmail,
  buildFollowUpEmail,
  buildHighUrgencyMedicalAlertEmail,
  buildInquiryAcknowledgementEmail,
  type EmailTemplate,
} from "@/lib/email/templates";

export type EmailLogContext = {
  sentByUserId?: string;
  contactSubmissionId?: string;
  partnershipLeadId?: string;
  studentMobilityInquiryId?: string;
  medicalTourismInquiryId?: string;
  metadata?: Record<string, unknown>;
};

type EmailPayload = {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
  cc?: string | string[];
  bcc?: string | string[];
  templateKey?: string;
  log?: EmailLogContext;
};

type EmailDispatchResult = {
  provider: "resend" | "smtp" | "unconfigured";
  messageId?: string;
  status: "SENT" | "SKIPPED";
};

let resendClient: Resend | null = null;

function normalizeRecipients(value: string | string[] | undefined) {
  if (!value) {
    return [];
  }

  return Array.isArray(value)
    ? value.filter(Boolean)
    : value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
}

function getResendClient() {
  if (!env.RESEND_API_KEY) {
    return null;
  }

  resendClient ??= new Resend(env.RESEND_API_KEY);
  return resendClient;
}

function getTransporter() {
  if (!env.SMTP_HOST || !env.SMTP_FROM_EMAIL) {
    return null;
  }

  return nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_PORT === 465,
    auth: env.SMTP_USER
      ? {
          user: env.SMTP_USER,
          pass: env.SMTP_PASSWORD,
        }
      : undefined,
  });
}

async function createEmailLog({
  payload,
  provider,
  status,
  providerMessageId,
  errorMessage,
}: {
  payload: EmailPayload;
  provider: string;
  status: string;
  providerMessageId?: string;
  errorMessage?: string;
}) {
  if (!env.DATABASE_URL) {
    return;
  }

  const [firstRecipient] = normalizeRecipients(payload.to);
  const ccRecipients = normalizeRecipients(payload.cc);
  const bccRecipients = normalizeRecipients(payload.bcc);

  await prisma.emailLog.create({
    data: {
      direction: "OUTBOUND",
      templateKey: payload.templateKey,
      subject: payload.subject,
      toEmail: firstRecipient ?? "unknown@example.com",
      ccEmail: ccRecipients.join(", ") || null,
      bccEmail: bccRecipients.join(", ") || null,
      status,
      provider,
      providerMessageId,
      errorMessage,
      sentByUserId: payload.log?.sentByUserId,
      contactSubmissionId: payload.log?.contactSubmissionId,
      partnershipLeadId: payload.log?.partnershipLeadId,
      studentMobilityInquiryId: payload.log?.studentMobilityInquiryId,
      medicalTourismInquiryId: payload.log?.medicalTourismInquiryId,
      metadata:
        (payload.log?.metadata as Prisma.InputJsonValue | null | undefined) ?? undefined,
    },
  });
}

export async function sendEmail(payload: EmailPayload): Promise<EmailDispatchResult> {
  const to = normalizeRecipients(payload.to);
  const cc = normalizeRecipients(payload.cc);
  const bcc = normalizeRecipients(payload.bcc);

  if (!to.length) {
    throw new Error("At least one email recipient is required.");
  }

  if (!emailProviderConfigured) {
    console.info("Email provider not configured. Skipping email:", payload.subject);
    await createEmailLog({
      payload,
      provider: "unconfigured",
      status: "SKIPPED",
    });
    return {
      provider: "unconfigured",
      status: "SKIPPED",
    };
  }

  const resend = getResendClient();

  try {
    if (resend && env.RESEND_FROM_EMAIL) {
      const result = await resend.emails.send({
        from: env.RESEND_FROM_EMAIL,
        to,
        cc: cc.length ? cc : undefined,
        bcc: bcc.length ? bcc : undefined,
        subject: payload.subject,
        html: payload.html,
        text: payload.text,
      });

      const messageId = "data" in result && result.data ? result.data.id : undefined;
      await createEmailLog({
        payload,
        provider: "resend",
        status: "SENT",
        providerMessageId: messageId,
      });

      return {
        provider: "resend",
        messageId,
        status: "SENT",
      };
    }

    const transporter = getTransporter();

    if (!transporter || !env.SMTP_FROM_EMAIL) {
      await createEmailLog({
        payload,
        provider: "unconfigured",
        status: "SKIPPED",
      });
      return {
        provider: "unconfigured",
        status: "SKIPPED",
      };
    }

    const info = await transporter.sendMail({
      from: env.SMTP_FROM_EMAIL,
      to,
      cc: cc.length ? cc : undefined,
      bcc: bcc.length ? bcc : undefined,
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
    });

    await createEmailLog({
      payload,
      provider: "smtp",
      status: "SENT",
      providerMessageId: info.messageId,
    });

    return {
      provider: "smtp",
      messageId: info.messageId,
      status: "SENT",
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Email delivery failed.";

    await createEmailLog({
      payload,
      provider: resend && env.RESEND_FROM_EMAIL ? "resend" : "smtp",
      status: "FAILED",
      errorMessage,
    });

    throw error;
  }
}

export function buildSimpleEmail({
  heading,
  body,
}: {
  heading: string;
  body: string;
}): EmailTemplate {
  return buildFollowUpEmail({
    subject: heading,
    body,
    ctaLabel: "Visit MedPobeda Group",
    ctaHref: env.NEXT_PUBLIC_SITE_URL,
  });
}

export {
  buildAdminInquiryNotificationEmail,
  buildFollowUpEmail,
  buildHighUrgencyMedicalAlertEmail,
  buildInquiryAcknowledgementEmail,
};
