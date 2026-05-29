"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  FileText,
  GraduationCap,
  Handshake,
  Hospital,
  Mail,
  MapPin,
  MessageCircle,
  PhoneCall,
  Send,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

import { submitContactInquiryAction } from "@/app/actions/inquiries";
import { useMessages } from "@/lib/i18n";
import { getTelegramUrl, getWhatsAppUrl, siteConfig } from "@/lib/site";
import { SubmitButton } from "@/components/forms/submit-button";
import { SectionHeader } from "@/components/marketing/section-header";
import { PremiumCard } from "@/components/marketing/premium-card";
import { Alert } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type ContactTab = "patient" | "hospital" | "institution";

type HomeContactSectionProps = {
  honeypotField: string;
  submittedType?: string;
  hasError?: boolean;
};

const submittedTypeToTab: Record<string, ContactTab> = {
  international_patient: "patient",
  partnership: "hospital",
  contact: "institution",
  student_mobility: "institution",
};

function FileDrop({
  label,
  name,
  helper,
}: {
  label: string;
  name: string;
  helper: string;
}) {
  return (
    <label className="field-shell">
      <span>{label}</span>
      <div className="rounded-[1.6rem] border border-dashed border-[#B8D8FF] bg-[linear-gradient(180deg,rgba(248,251,255,0.98),rgba(240,248,255,0.94))] p-4">
        <input
          type="file"
          name={name}
          multiple
          className="block w-full cursor-pointer text-sm text-slate-500 file:mr-4 file:rounded-full file:border-0 file:bg-[#071B3A] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-[#0d2c5e]"
        />
        <p className="mt-3 text-xs leading-6 text-slate-500">{helper}</p>
      </div>
    </label>
  );
}

function FormCompliancePanel({
  consentLabel,
  privacyNote,
  emergencyDisclaimer,
  patientUploadNote,
}: {
  consentLabel: string;
  privacyNote: string;
  emergencyDisclaimer: string;
  patientUploadNote?: string;
}) {
  return (
    <div className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-[1.6rem] border border-[#D6E8FF] bg-[rgba(248,251,255,0.92)] p-4">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-1 h-4 w-4 shrink-0 text-blue-700" />
            <p className="text-sm leading-7 text-slate-600">{privacyNote}</p>
          </div>
        </div>
        <div className="rounded-[1.6rem] border border-[#D6E8FF] bg-[rgba(248,251,255,0.92)] p-4">
          <div className="flex items-start gap-3">
            <PhoneCall className="mt-1 h-4 w-4 shrink-0 text-blue-700" />
            <p className="text-sm leading-7 text-slate-600">{emergencyDisclaimer}</p>
          </div>
        </div>
      </div>
      {patientUploadNote ? (
        <div className="rounded-[1.6rem] border border-[#D6E8FF] bg-white p-4">
          <div className="flex items-start gap-3">
            <FileText className="mt-1 h-4 w-4 shrink-0 text-blue-700" />
            <p className="text-sm leading-7 text-slate-600">{patientUploadNote}</p>
          </div>
        </div>
      ) : null}
      <label className="flex items-start gap-3 rounded-[1.6rem] border border-[#D6E8FF] bg-white p-4 text-sm leading-7 text-slate-600 shadow-[0_14px_36px_rgba(7,27,58,0.04)]">
        <input
          type="checkbox"
          name="consentAccepted"
          value="true"
          required
          className="mt-1 h-4 w-4 rounded border-[#9CC8FF] text-blue-700 focus:ring-blue-500"
        />
        <span>{consentLabel}</span>
      </label>
    </div>
  );
}

export function HomeContactSection({
  honeypotField,
  submittedType,
  hasError = false,
}: HomeContactSectionProps) {
  const pathname = usePathname();
  const messages = useMessages();
  const formMessages = messages.forms.contactDesk;
  const initialTab = submittedType ? submittedTypeToTab[submittedType] : "patient";
  const [activeTab, setActiveTab] = useState<ContactTab>(initialTab || "patient");
  const tabMeta = {
    patient: {
      ...formMessages.tabs.patient,
      inquiryType: "INTERNATIONAL_PATIENT",
      successKey: "international_patient",
      icon: UserRound,
    },
    hospital: {
      ...formMessages.tabs.hospital,
      inquiryType: "PARTNERSHIP",
      successKey: "partnership",
      icon: Hospital,
    },
    institution: {
      ...formMessages.tabs.institution,
      inquiryType: "STUDENT_MOBILITY",
      successKey: "student_mobility",
      icon: GraduationCap,
    },
  } as const;

  useEffect(() => {
    if (submittedType && submittedTypeToTab[submittedType]) {
      setActiveTab(submittedTypeToTab[submittedType]);
    }
  }, [submittedType]);

  useEffect(() => {
    if (!submittedType && !hasError) {
      return;
    }

    const node = document.getElementById("contact-section");
    if (!node) {
      return;
    }

    const timer = window.setTimeout(() => {
      node.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);

    return () => window.clearTimeout(timer);
  }, [hasError, submittedType]);

  const activeMeta = tabMeta[activeTab];
  const whatsappHref = useMemo(
    () => getWhatsAppUrl(formMessages.directMessage),
    [formMessages.directMessage],
  );
  const telegramHref = useMemo(
    () => getTelegramUrl(formMessages.directMessage),
    [formMessages.directMessage],
  );

  return (
    <section id="contact-section" className="section-shell">
      <div className="container-wide">
        <div className="section-frame overflow-visible px-4 py-8 sm:px-8 lg:px-10 lg:py-12">
          <SectionHeader
            eyebrow={formMessages.section.eyebrow}
            title={formMessages.section.title}
            description={formMessages.section.description}
            align="center"
          />
          <div className="mt-12 grid gap-6 xl:grid-cols-[1.12fr_0.88fr]">
            <PremiumCard hover={false} className="p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {(Object.entries(tabMeta) as [ContactTab, (typeof tabMeta)[ContactTab]][]).map(
                  ([tab, meta]) => {
                    const card = formMessages.cards[tab];
                    const Icon = meta.icon;

                    return (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                          "rounded-[1.8rem] border p-5 text-left transition",
                          activeTab === tab
                            ? "border-[#1D4ED8] bg-[linear-gradient(135deg,rgba(29,78,216,0.12),rgba(56,189,248,0.14))] shadow-[0_22px_60px_rgba(29,78,216,0.14)]"
                            : "border-[#D6E8FF] bg-white hover:-translate-y-1 hover:border-[#9CC8FF] hover:shadow-[0_22px_60px_rgba(7,27,58,0.08)]",
                        )}
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#0B1F4D,#1D4ED8)] text-white shadow-[0_18px_48px_rgba(29,78,216,0.16)]">
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="mt-5 text-lg font-semibold text-[#071B3A]">{card.title}</h3>
                        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-blue-700">
                          {card.audienceLabel}
                        </p>
                        <p className="mt-2 text-sm leading-7 text-slate-600">{card.audience}</p>
                        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-blue-700">
                          {card.requestLabel}
                        </p>
                        <div className="mt-3 grid gap-2">
                          {card.requests.map((item) => (
                            <div key={item} className="flex items-start gap-2 text-sm leading-7 text-slate-600">
                              <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-blue-700" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#1D4ED8]">
                          {card.cta}
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </button>
                    );
                  },
                )}
              </div>

              {submittedType === activeMeta.successKey ? (
                <Alert className="mt-6 border-emerald-200 bg-emerald-50 text-emerald-900" variant="light">
                  {formMessages.alerts.success}
                </Alert>
              ) : null}

              {hasError ? (
                <Alert className="mt-6 border-amber-200 bg-amber-50 text-amber-900" variant="light">
                  {formMessages.alerts.error}
                </Alert>
              ) : null}

              <div className="mt-8 rounded-[1.8rem] border border-[#D6E8FF] bg-[linear-gradient(180deg,rgba(248,251,255,0.98),rgba(255,255,255,0.96))] p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-700">
                  {activeMeta.eyebrow}
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold tracking-[-0.04em] text-[#071B3A]">
                  {activeMeta.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{activeMeta.description}</p>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.28 }}
                  className="mt-8"
                >
                  {activeTab === "patient" ? (
                    <form
                      action={submitContactInquiryAction}
                      encType="multipart/form-data"
                      className="grid gap-5"
                    >
                      <input type="hidden" name={honeypotField} tabIndex={-1} autoComplete="off" />
                      <input type="hidden" name="redirectPath" value={pathname} />
                      <input type="hidden" name="inquiryType" value={activeMeta.inquiryType} />
                      <input
                        type="hidden"
                        name="preferredCountry"
                        value={formMessages.patientForm.preferredCountryValue}
                      />
                      <div className="grid gap-5 md:grid-cols-2">
                        <label className="field-shell">
                          <span>{formMessages.patientForm.fields.fullName}</span>
                          <Input
                            name="name"
                            placeholder={formMessages.patientForm.fields.fullNamePlaceholder}
                            required
                          />
                        </label>
                        <label className="field-shell">
                          <span>{formMessages.patientForm.fields.country}</span>
                          <Input
                            name="country"
                            placeholder={formMessages.patientForm.fields.countryPlaceholder}
                            required
                          />
                        </label>
                        <label className="field-shell">
                          <span>{formMessages.patientForm.fields.phone}</span>
                          <Input
                            name="phone"
                            placeholder={formMessages.patientForm.fields.phonePlaceholder}
                          />
                        </label>
                        <label className="field-shell">
                          <span>{formMessages.patientForm.fields.email}</span>
                          <Input
                            name="email"
                            type="email"
                            placeholder={formMessages.patientForm.fields.emailPlaceholder}
                            required
                          />
                        </label>
                      </div>
                      <label className="field-shell">
                        <span>{formMessages.patientForm.fields.treatmentRequired}</span>
                        <Input
                          name="collaborationInterest"
                          placeholder={formMessages.patientForm.fields.treatmentRequiredPlaceholder}
                          required
                        />
                      </label>
                      <FileDrop
                        label={formMessages.patientForm.fields.uploadLabel}
                        name="medicalReports"
                        helper={formMessages.patientForm.fields.uploadHelper}
                      />
                      <label className="field-shell">
                        <span>{formMessages.patientForm.fields.message}</span>
                        <Textarea
                          name="message"
                          placeholder={activeMeta.message}
                          required
                        />
                      </label>
                      <FormCompliancePanel
                        consentLabel={formMessages.sharedNotes.consent}
                        privacyNote={formMessages.sharedNotes.privacy}
                        emergencyDisclaimer={formMessages.sharedNotes.emergency}
                        patientUploadNote={formMessages.sharedNotes.patientUpload}
                      />
                      <SubmitButton
                        variant="hero"
                        size="xl"
                        pendingLabel={formMessages.patientForm.pendingLabel}
                        className="w-full justify-center sm:w-auto"
                      >
                        {formMessages.patientForm.submitLabel}
                        <ArrowRight className="h-4 w-4" />
                      </SubmitButton>
                    </form>
                  ) : null}

                  {activeTab === "hospital" ? (
                    <form
                      action={submitContactInquiryAction}
                      encType="multipart/form-data"
                      className="grid gap-5"
                    >
                      <input type="hidden" name={honeypotField} tabIndex={-1} autoComplete="off" />
                      <input type="hidden" name="redirectPath" value={pathname} />
                      <input type="hidden" name="inquiryType" value={activeMeta.inquiryType} />
                      <div className="grid gap-5 md:grid-cols-2">
                        <label className="field-shell">
                          <span>{formMessages.hospitalForm.fields.hospitalName}</span>
                          <Input
                            name="organization"
                            placeholder={formMessages.hospitalForm.fields.hospitalNamePlaceholder}
                            required
                          />
                        </label>
                        <label className="field-shell">
                          <span>{formMessages.hospitalForm.fields.countryCity}</span>
                          <Input
                            name="country"
                            placeholder={formMessages.hospitalForm.fields.countryCityPlaceholder}
                            required
                          />
                        </label>
                        <label className="field-shell">
                          <span>{formMessages.hospitalForm.fields.contactPerson}</span>
                          <Input
                            name="name"
                            placeholder={formMessages.hospitalForm.fields.contactPersonPlaceholder}
                            required
                          />
                        </label>
                        <label className="field-shell">
                          <span>{formMessages.hospitalForm.fields.email}</span>
                          <Input
                            name="email"
                            type="email"
                            placeholder={formMessages.hospitalForm.fields.emailPlaceholder}
                            required
                          />
                        </label>
                        <label className="field-shell">
                          <span>{formMessages.hospitalForm.fields.phone}</span>
                          <Input
                            name="phone"
                            placeholder={formMessages.hospitalForm.fields.phonePlaceholder}
                          />
                        </label>
                        <label className="field-shell">
                          <span>{formMessages.hospitalForm.fields.partnershipInterest}</span>
                          <Input
                            name="collaborationInterest"
                            placeholder={formMessages.hospitalForm.fields.partnershipInterestPlaceholder}
                            required
                          />
                        </label>
                      </div>
                      <FileDrop
                        label={formMessages.hospitalForm.fields.uploadLabel}
                        name="partnershipDocuments"
                        helper={formMessages.hospitalForm.fields.uploadHelper}
                      />
                      <label className="field-shell">
                        <span>{formMessages.hospitalForm.fields.message}</span>
                        <Textarea
                          name="message"
                          placeholder={activeMeta.message}
                          required
                        />
                      </label>
                      <FormCompliancePanel
                        consentLabel={formMessages.sharedNotes.consent}
                        privacyNote={formMessages.sharedNotes.privacy}
                        emergencyDisclaimer={formMessages.sharedNotes.emergency}
                      />
                      <SubmitButton
                        variant="hero"
                        size="xl"
                        pendingLabel={formMessages.hospitalForm.pendingLabel}
                        className="w-full justify-center sm:w-auto"
                      >
                        {formMessages.hospitalForm.submitLabel}
                        <ArrowRight className="h-4 w-4" />
                      </SubmitButton>
                    </form>
                  ) : null}

                  {activeTab === "institution" ? (
                    <form
                      action={submitContactInquiryAction}
                      encType="multipart/form-data"
                      className="grid gap-5"
                    >
                      <input type="hidden" name={honeypotField} tabIndex={-1} autoComplete="off" />
                      <input type="hidden" name="redirectPath" value={pathname} />
                      <input type="hidden" name="inquiryType" value={activeMeta.inquiryType} />
                      <div className="grid gap-5 md:grid-cols-2">
                        <label className="field-shell">
                          <span>{formMessages.institutionForm.fields.institutionName}</span>
                          <Input
                            name="organization"
                            placeholder={formMessages.institutionForm.fields.institutionNamePlaceholder}
                            required
                          />
                        </label>
                        <label className="field-shell">
                          <span>{formMessages.institutionForm.fields.country}</span>
                          <Input
                            name="country"
                            placeholder={formMessages.institutionForm.fields.countryPlaceholder}
                            required
                          />
                        </label>
                        <label className="field-shell">
                          <span>{formMessages.institutionForm.fields.contactPerson}</span>
                          <Input
                            name="name"
                            placeholder={formMessages.institutionForm.fields.contactPersonPlaceholder}
                            required
                          />
                        </label>
                        <label className="field-shell">
                          <span>{formMessages.institutionForm.fields.email}</span>
                          <Input
                            name="email"
                            type="email"
                            placeholder={formMessages.institutionForm.fields.emailPlaceholder}
                            required
                          />
                        </label>
                        <label className="field-shell md:col-span-2">
                          <span>{formMessages.institutionForm.fields.collaborationType}</span>
                          <Input
                            name="collaborationInterest"
                            placeholder={formMessages.institutionForm.fields.collaborationTypePlaceholder}
                            required
                          />
                        </label>
                      </div>
                      <label className="field-shell">
                        <span>{formMessages.institutionForm.fields.message}</span>
                        <Textarea
                          name="message"
                          placeholder={activeMeta.message}
                          required
                        />
                      </label>
                      <FormCompliancePanel
                        consentLabel={formMessages.sharedNotes.consent}
                        privacyNote={formMessages.sharedNotes.privacy}
                        emergencyDisclaimer={formMessages.sharedNotes.emergency}
                      />
                      <SubmitButton
                        variant="hero"
                        size="xl"
                        pendingLabel={formMessages.institutionForm.pendingLabel}
                        className="w-full justify-center sm:w-auto"
                      >
                        {formMessages.institutionForm.submitLabel}
                        <ArrowRight className="h-4 w-4" />
                      </SubmitButton>
                    </form>
                  ) : null}
                </motion.div>
              </AnimatePresence>
            </PremiumCard>

            <div className="space-y-6">
              <PremiumCard className="p-6 sm:p-7" delay={0.05}>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(7,27,58,0.96),rgba(29,78,216,0.92))] text-white shadow-[0_18px_40px_rgba(7,27,58,0.18)]">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-700">
                      {formMessages.notes.eyebrow}
                    </p>
                    <h3 className="mt-1 font-display text-2xl font-semibold text-[#071B3A]">
                      {formMessages.notes.title}
                    </h3>
                  </div>
                </div>
                <div className="mt-6 grid gap-4 text-sm leading-7 text-slate-600">
                  {formMessages.notes.items.map((item) => (
                    <div
                      key={item}
                      className="rounded-[1.5rem] border border-[#D6E8FF] bg-[rgba(248,251,255,0.92)] px-4 py-4"
                    >
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-500" />
                        <span>{item}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </PremiumCard>

              <PremiumCard className="p-6 sm:p-7" delay={0.1}>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-700">
                  {formMessages.channels.eyebrow}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-[#071B3A]">
                  {formMessages.channels.title}
                </h3>
                <div className="mt-5 grid gap-4">
                  {whatsappHref ? (
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-col items-start gap-3 rounded-[1.6rem] border border-[#D6E8FF] bg-white px-5 py-4 text-sm font-semibold text-[#071B3A] transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(16,185,129,0.14)] min-[380px]:flex-row min-[380px]:items-center min-[380px]:justify-between"
                    >
                      <span className="inline-flex items-center gap-3">
                        <MessageCircle className="h-4 w-4 text-emerald-500" />
                        {formMessages.channels.whatsapp}
                      </span>
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  ) : null}
                  {telegramHref ? (
                    <a
                      href={telegramHref}
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-col items-start gap-3 rounded-[1.6rem] border border-[#D6E8FF] bg-white px-5 py-4 text-sm font-semibold text-[#071B3A] transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(29,78,216,0.14)] min-[380px]:flex-row min-[380px]:items-center min-[380px]:justify-between"
                    >
                      <span className="inline-flex items-center gap-3">
                        <Send className="h-4 w-4 text-blue-600" />
                        {formMessages.channels.telegram}
                      </span>
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  ) : null}
                  <a
                    href={`mailto:${siteConfig.contactEmail}`}
                    className="rounded-[1.6rem] border border-[#D6E8FF] bg-[linear-gradient(180deg,rgba(248,251,255,0.98),rgba(255,255,255,0.96))] px-5 py-4 text-sm leading-7 text-slate-600 transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(29,78,216,0.1)]"
                  >
                    <div className="flex items-start gap-3">
                      <Mail className="mt-1 h-4 w-4 text-blue-600" />
                      <div>
                        <p className="font-semibold text-[#071B3A]">
                          {formMessages.channels.email}
                        </p>
                        <p className="mt-1 break-all">{siteConfig.contactEmail}</p>
                      </div>
                    </div>
                  </a>
                  <a
                    href={`tel:${siteConfig.contactPhone.replace(/\s+/g, "")}`}
                    className="rounded-[1.6rem] border border-[#D6E8FF] bg-[linear-gradient(180deg,rgba(248,251,255,0.98),rgba(255,255,255,0.96))] px-5 py-4 text-sm leading-7 text-slate-600 transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(29,78,216,0.1)]"
                  >
                    <div className="flex items-start gap-3">
                      <PhoneCall className="mt-1 h-4 w-4 text-blue-600" />
                      <div>
                        <p className="font-semibold text-[#071B3A]">
                          {formMessages.channels.phone}
                        </p>
                        <p className="mt-1">{siteConfig.contactPhone}</p>
                      </div>
                    </div>
                  </a>
                  <div className="rounded-[1.6rem] border border-[#D6E8FF] bg-[linear-gradient(180deg,rgba(248,251,255,0.98),rgba(255,255,255,0.96))] px-5 py-4 text-sm leading-7 text-slate-600">
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-1 h-4 w-4 text-blue-600" />
                      <div>
                        <p className="font-semibold text-[#071B3A]">
                          {formMessages.channels.location}
                        </p>
                        <p className="mt-1">{siteConfig.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </PremiumCard>

              <PremiumCard className="p-6 sm:p-7" delay={0.15}>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-700">
                  {formMessages.contactCard.eyebrow}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-[#071B3A]">
                  {formMessages.contactCard.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {formMessages.contactCard.description}
                </p>
                <div className="mt-5 grid gap-4">
                  {[
                    {
                      icon: Building2,
                      label: siteConfig.companyName,
                      text: siteConfig.location,
                    },
                    {
                      icon: Mail,
                      label: siteConfig.contactEmail,
                      text: formMessages.channels.emailDescription,
                    },
                    {
                      icon: Handshake,
                      label: siteConfig.contactPhone,
                      text: formMessages.channels.phoneDescription,
                    },
                  ].map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.label}
                        className="rounded-[1.6rem] border border-[#D6E8FF] bg-[rgba(248,251,255,0.88)] p-4"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-blue-700 shadow-[0_12px_30px_rgba(29,78,216,0.1)]">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-[#071B3A]">{item.label}</h4>
                            <p className="mt-1 text-sm leading-7 text-slate-600">{item.text}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </PremiumCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
