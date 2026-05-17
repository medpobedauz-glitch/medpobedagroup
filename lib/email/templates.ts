import { InquiryType, UrgencyLevel } from "@prisma/client";

import { absoluteUrl } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";
import { startCase } from "@/lib/utils";

export type EmailTemplate = {
  html: string;
  text: string;
};

type EmailSection = {
  label: string;
  value: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function normalizeMultiline(value: string) {
  return escapeHtml(value).replace(/\n/g, "<br />");
}

function createLayout({
  eyebrow,
  title,
  intro,
  sections = [],
  detail,
  ctaLabel,
  ctaHref,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  sections?: EmailSection[];
  detail?: string;
  ctaLabel?: string;
  ctaHref?: string;
}): EmailTemplate {
  const html = `
    <div style="margin:0;background:#f3f8ff;padding:24px 0;font-family:Inter,Arial,sans-serif;color:#0f172a;">
      <div style="max-width:680px;margin:0 auto;padding:0 16px;">
        <div style="border-radius:28px;overflow:hidden;background:linear-gradient(160deg,#071226 0%,#0b1f4d 48%,#1d4ed8 100%);padding:32px;">
          <div style="display:inline-block;border:1px solid rgba(255,255,255,0.14);border-radius:999px;padding:8px 14px;color:#c8f7ff;font-size:11px;font-weight:700;letter-spacing:0.24em;text-transform:uppercase;">
            ${escapeHtml(eyebrow)}
          </div>
          <h1 style="margin:20px 0 0;color:#ffffff;font-size:34px;line-height:1.15;font-weight:700;">
            ${escapeHtml(title)}
          </h1>
          <p style="margin:18px 0 0;color:#d8e8ff;font-size:16px;line-height:1.75;">
            ${escapeHtml(intro)}
          </p>
        </div>
        <div style="margin-top:-18px;border:1px solid rgba(11,31,77,0.08);border-radius:28px;background:#ffffff;padding:28px;box-shadow:0 18px 60px rgba(7,31,77,0.1);">
          ${
            sections.length
              ? `
            <div style="display:grid;gap:12px;">
              ${sections
                .map(
                  (section) => `
                    <div style="border:1px solid rgba(11,31,77,0.08);border-radius:18px;padding:14px 16px;background:#f8fbff;">
                      <p style="margin:0;color:#1d4ed8;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;">
                        ${escapeHtml(section.label)}
                      </p>
                      <p style="margin:8px 0 0;color:#0f172a;font-size:15px;line-height:1.65;">
                        ${normalizeMultiline(section.value)}
                      </p>
                    </div>
                  `,
                )
                .join("")}
            </div>
          `
              : ""
          }
          ${
            detail
              ? `<div style="margin-top:${sections.length ? 20 : 0}px;border-radius:20px;background:#f3f8ff;padding:18px 20px;color:#334155;font-size:14px;line-height:1.75;">
                  ${normalizeMultiline(detail)}
                </div>`
              : ""
          }
          ${
            ctaLabel && ctaHref
              ? `<div style="margin-top:24px;">
                  <a href="${escapeHtml(ctaHref)}" style="display:inline-block;border-radius:999px;background:linear-gradient(135deg,#0b1f4d 0%,#1d4ed8 55%,#22d3ee 100%);padding:14px 22px;color:#ffffff;text-decoration:none;font-size:14px;font-weight:700;">
                    ${escapeHtml(ctaLabel)}
                  </a>
                </div>`
              : ""
          }
          <div style="margin-top:28px;border-top:1px solid rgba(11,31,77,0.08);padding-top:20px;">
            <p style="margin:0;color:#0f172a;font-size:15px;font-weight:700;">${escapeHtml(
              siteConfig.name,
            )}</p>
            <p style="margin:8px 0 0;color:#475569;font-size:13px;line-height:1.7;">
              ${escapeHtml(siteConfig.tagline)}
            </p>
            <p style="margin:8px 0 0;color:#64748b;font-size:12px;line-height:1.7;">
              ${escapeHtml(siteConfig.location)}
            </p>
          </div>
        </div>
      </div>
    </div>
  `;

  const text = [
    eyebrow.toUpperCase(),
    title,
    "",
    intro,
    "",
    ...sections.flatMap((section) => [section.label, section.value, ""]),
    detail ? [detail, ""] : [],
    ctaLabel && ctaHref ? [`${ctaLabel}: ${ctaHref}`, ""] : [],
    `${siteConfig.name}`,
    siteConfig.tagline,
    siteConfig.location,
  ]
    .flat()
    .join("\n")
    .trim();

  return { html, text };
}

type AcknowledgementParams = {
  recipientName: string;
  inquiryType: InquiryType;
  detailLabel: string;
  detailValue: string;
  detailMessage: string;
};

export function buildInquiryAcknowledgementEmail({
  recipientName,
  inquiryType,
  detailLabel,
  detailValue,
  detailMessage,
}: AcknowledgementParams): EmailTemplate {
  return createLayout({
    eyebrow: `${startCase(inquiryType)} Confirmation`,
    title: `Your ${startCase(inquiryType).toLowerCase()} has been received`,
    intro: `Thank you, ${recipientName}. MedPobeda Group has received your inquiry and our team will review it shortly.`,
    sections: [
      { label: "Inquiry Type", value: startCase(inquiryType) },
      { label: detailLabel, value: detailValue },
    ],
    detail: detailMessage,
    ctaLabel: "Visit MedPobeda Group",
    ctaHref: absoluteUrl("/contact"),
  });
}

export function buildAdminInquiryNotificationEmail({
  inquiryType,
  name,
  email,
  organization,
  country,
  detailLabel,
  detailValue,
  message,
}: {
  inquiryType: InquiryType;
  name: string;
  email: string;
  organization?: string | null;
  country?: string | null;
  detailLabel: string;
  detailValue: string;
  message: string;
}) {
  return createLayout({
    eyebrow: "Internal Lead Alert",
    title: `New ${startCase(inquiryType).toLowerCase()} submitted`,
    intro: "A new website inquiry has been captured and routed into the MedPobeda CRM.",
    sections: [
      { label: "Contact", value: `${name}\n${email}` },
      { label: "Organization", value: organization || "Not provided" },
      { label: "Country", value: country || "Not provided" },
      { label: detailLabel, value: detailValue },
    ],
    detail: message,
    ctaLabel: "Open Admin Dashboard",
    ctaHref: absoluteUrl("/admin"),
  });
}

export function buildHighUrgencyMedicalAlertEmail({
  name,
  email,
  treatmentType,
  urgencyLevel,
  message,
}: {
  name: string;
  email: string;
  treatmentType: string;
  urgencyLevel: UrgencyLevel;
  message: string;
}) {
  return createLayout({
    eyebrow: "Priority Medical Alert",
    title: `High-urgency medical tourism inquiry: ${treatmentType}`,
    intro:
      "A high-priority medical tourism case requires prompt internal review and follow-up.",
    sections: [
      { label: "Primary Contact", value: `${name}\n${email}` },
      { label: "Treatment Type", value: treatmentType },
      { label: "Urgency", value: startCase(urgencyLevel) },
    ],
    detail: message,
    ctaLabel: "Review Medical Tourism Leads",
    ctaHref: absoluteUrl("/admin/medical-tourism"),
  });
}

export function buildFollowUpEmail({
  subject,
  greetingName,
  body,
  ctaLabel,
  ctaHref,
}: {
  subject: string;
  greetingName?: string | null;
  body: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return createLayout({
    eyebrow: "MedPobeda Group Follow-Up",
    title: subject,
    intro: greetingName
      ? `Dear ${greetingName}, MedPobeda Group is following up regarding your recent inquiry.`
      : "MedPobeda Group is following up regarding your recent inquiry.",
    detail: body,
    ctaLabel,
    ctaHref,
  });
}
