"use client";

import { InquiryType } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, MessageCircle, Send, ShieldCheck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { useMessages } from "@/lib/i18n";
import { submitContactInquiryAction } from "@/lib/actions/inquiries";
import { getTelegramUrl, getWhatsAppUrl } from "@/lib/site";
import { InquiryProgress } from "@/components/forms/inquiry-progress";
import { SubmitButton } from "@/components/forms/submit-button";
import { useDraftPersistence } from "@/components/forms/use-draft-persistence";
import { PublicLink } from "@/components/shared/public-link";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type InquiryVariant =
  | "general"
  | "partnership"
  | "international-patient"
  | "student-mobility";

type ContactInquiryFunnelProps = {
  variant: InquiryVariant;
  redirectPath: string;
  honeypotField: string;
  submittedType?: string;
  hasError?: boolean;
};

type InquiryState = {
  name: string;
  organization: string;
  country: string;
  email: string;
  phone: string;
  telegram: string;
  message: string;
  preferredCountry: string;
  preferredContactTime: string;
  collaborationInterest: string;
  academicBackground: string;
  programInterest: string;
};

const initialState: InquiryState = {
  name: "",
  organization: "",
  country: "",
  email: "",
  phone: "",
  telegram: "",
  message: "",
  preferredCountry: "",
  preferredContactTime: "",
  collaborationInterest: "",
  academicBackground: "",
  programInterest: "",
};

const funnelConfig = {
  general: {
    inquiryType: InquiryType.CONTACT,
    uploadName: "attachments",
  },
  partnership: {
    inquiryType: InquiryType.PARTNERSHIP,
    uploadName: "partnershipDocuments",
  },
  "international-patient": {
    inquiryType: InquiryType.INTERNATIONAL_PATIENT,
    uploadName: "attachments",
  },
  "student-mobility": {
    inquiryType: InquiryType.STUDENT_MOBILITY,
    uploadName: "attachments",
  },
} as const;

type StepErrors = Partial<Record<keyof InquiryState, string>>;

function isValidEmail(value: string) {
  return /\S+@\S+\.\S+/.test(value);
}

export function ContactInquiryFunnel({
  variant,
  redirectPath,
  honeypotField,
  submittedType,
  hasError = false,
}: ContactInquiryFunnelProps) {
  const messages = useMessages();
  const contactMessages = messages.forms.contactFunnel;
  const config = funnelConfig[variant];
  const variantMessages = contactMessages.variants[variant];
  const steps = contactMessages.steps;
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<InquiryState>(initialState);
  const [errors, setErrors] = useState<StepErrors>({});

  const successActive = submittedType === config.inquiryType.toLowerCase();
  const { status: draftStatus, clearDraft } = useDraftPersistence({
    storageKey: `medpobeda-contact-funnel:${variant}`,
    value: { step, values },
    onRestore(draft) {
      setStep(Math.min(draft.step ?? 0, steps.length - 1));
      setValues(draft.values ?? initialState);
    },
    enabled: !successActive,
  });

  const contactSummary = useMemo(
    () =>
      [
        values.name || contactMessages.review.namePending,
        values.organization || contactMessages.review.organizationPending,
        values.country || contactMessages.review.countryPending,
      ].join(" • "),
    [
      contactMessages.review.countryPending,
      contactMessages.review.namePending,
      contactMessages.review.organizationPending,
      values.country,
      values.name,
      values.organization,
    ],
  );
  const directMessage = `Hello MedPobeda Group, I would like to discuss ${variantMessages.eyebrow.toLowerCase()}.`;
  const whatsappHref = getWhatsAppUrl(directMessage);
  const telegramHref = getTelegramUrl(directMessage);

  useEffect(() => {
    if (successActive) {
      clearDraft();
    }
  }, [clearDraft, successActive]);

  function resetDraft() {
    clearDraft();
    setStep(0);
    setValues(initialState);
    setErrors({});
  }

  function updateValue<Field extends keyof InquiryState>(
    field: Field,
    value: InquiryState[Field],
  ) {
    setValues((current) => ({
      ...current,
      [field]: value,
    }));
    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }));
  }

  function validateStep(stepIndex: number) {
    const nextErrors: StepErrors = {};

    if (stepIndex === 0) {
      if (!values.name.trim()) {
        nextErrors.name = contactMessages.validation.nameRequired;
      }

      if (!values.email.trim()) {
        nextErrors.email = contactMessages.validation.emailRequired;
      } else if (!isValidEmail(values.email)) {
        nextErrors.email = contactMessages.validation.emailInvalid;
      }
    }

    if (stepIndex === 1) {
      if (!values.message.trim() || values.message.trim().length < 20) {
        nextErrors.message = contactMessages.validation.messageTooShort;
      }

      if (variant === "student-mobility" && !values.programInterest.trim()) {
        nextErrors.programInterest = contactMessages.validation.programInterestRequired;
      }

      if (variant !== "student-mobility" && !values.collaborationInterest.trim()) {
        nextErrors.collaborationInterest =
          contactMessages.validation.collaborationInterestRequired;
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function goNext() {
    if (!validateStep(step)) {
      return;
    }

    setStep((current) => Math.min(current + 1, steps.length - 1));
  }

  function goPrevious() {
    setStep((current) => Math.max(current - 1, 0));
  }

  const sharedInputClass = "field-shell";
  const draftMessage =
    draftStatus === "restored"
      ? contactMessages.draftRestored
      : draftStatus === "saved"
        ? contactMessages.draftSaved
        : contactMessages.draftIdle;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
      <Card variant="light" className="border-slate-200/80 p-6 text-slate-950 shadow-premium sm:p-8">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-700">
            {variantMessages.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold text-slate-950 sm:text-4xl">
            {variantMessages.title}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
            {variantMessages.description}
          </p>
          <Alert variant="light" className="mt-6 rounded-[1.5rem] border-blue-100 bg-blue-50/80">
            {contactMessages.platformAlert}
          </Alert>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span>{draftMessage}</span>
            {draftStatus !== "idle" ? (
              <button
                type="button"
                onClick={resetDraft}
                className="font-semibold text-blue-700 transition hover:text-blue-900"
              >
                {messages.chrome.common.clearDraft}
              </button>
            ) : null}
          </div>
          {successActive ? (
            <Alert variant="light" className="mt-4 rounded-[1.4rem] border-emerald-200 bg-emerald-50 text-emerald-900">
              {contactMessages.successMessage}
            </Alert>
          ) : null}
          {hasError ? (
            <Alert variant="light" className="mt-4 rounded-[1.4rem] border-amber-200 bg-amber-50 text-amber-900">
              {contactMessages.errorMessage}
            </Alert>
          ) : null}
        </div>

        <form
          action={submitContactInquiryAction}
          encType="multipart/form-data"
          className="grid gap-6"
        >
          <input type="hidden" name={honeypotField} tabIndex={-1} autoComplete="off" />
          <input type="hidden" name="redirectPath" value={redirectPath} />
          <input type="hidden" name="inquiryType" value={config.inquiryType} />
          <input type="hidden" name="name" value={values.name} readOnly />
          <input type="hidden" name="organization" value={values.organization} readOnly />
          <input type="hidden" name="country" value={values.country} readOnly />
          <input type="hidden" name="email" value={values.email} readOnly />
          <input type="hidden" name="phone" value={values.phone} readOnly />
          <input type="hidden" name="telegram" value={values.telegram} readOnly />
          <input type="hidden" name="message" value={values.message} readOnly />
          <input
            type="hidden"
            name="preferredCountry"
            value={values.preferredCountry}
            readOnly
          />
          <input
            type="hidden"
            name="preferredContactTime"
            value={values.preferredContactTime}
            readOnly
          />
          <input
            type="hidden"
            name="collaborationInterest"
            value={values.collaborationInterest}
            readOnly
          />
          <input
            type="hidden"
            name="academicBackground"
            value={values.academicBackground}
            readOnly
          />
          <input
            type="hidden"
            name="programInterest"
            value={values.programInterest}
            readOnly
          />

          <InquiryProgress steps={steps} currentStep={step} />

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-5"
            >
              {step === 0 ? (
                <>
                  <div className="grid gap-5 md:grid-cols-2">
                  <label className={sharedInputClass}>
                    {contactMessages.fields.name}
                      <Input
                        value={values.name}
                        onChange={(event) => updateValue("name", event.target.value)}
                        placeholder={contactMessages.fields.namePlaceholder}
                      />
                      {errors.name ? (
                        <span className="text-xs text-rose-600">{errors.name}</span>
                      ) : null}
                    </label>
                  <label className={sharedInputClass}>
                    {contactMessages.fields.organization}
                      <Input
                        value={values.organization}
                        onChange={(event) =>
                          updateValue("organization", event.target.value)
                        }
                        placeholder={contactMessages.fields.organizationPlaceholder}
                      />
                    </label>
                  </div>
                  <div className="grid gap-5 md:grid-cols-2">
                  <label className={sharedInputClass}>
                    {contactMessages.fields.country}
                      <Input
                        value={values.country}
                        onChange={(event) => updateValue("country", event.target.value)}
                        placeholder={contactMessages.fields.countryPlaceholder}
                      />
                    </label>
                  <label className={sharedInputClass}>
                    {contactMessages.fields.email}
                      <Input
                        type="email"
                        value={values.email}
                        onChange={(event) => updateValue("email", event.target.value)}
                        placeholder={contactMessages.fields.emailPlaceholder}
                      />
                      {errors.email ? (
                        <span className="text-xs text-rose-600">{errors.email}</span>
                      ) : null}
                    </label>
                  </div>
                  <div className="grid gap-5 md:grid-cols-2">
                  <label className={sharedInputClass}>
                    {contactMessages.fields.phone}
                      <Input
                        value={values.phone}
                        onChange={(event) => updateValue("phone", event.target.value)}
                        placeholder={contactMessages.fields.phonePlaceholder}
                      />
                    </label>
                  <label className={sharedInputClass}>
                    {contactMessages.fields.telegram}
                      <Input
                        value={values.telegram}
                        onChange={(event) => updateValue("telegram", event.target.value)}
                        placeholder={contactMessages.fields.telegramPlaceholder}
                      />
                    </label>
                  </div>
                </>
              ) : null}

              {step === 1 ? (
                <>
                  <div className="grid gap-5 md:grid-cols-2">
                    <label className={sharedInputClass}>
                      {variantMessages.detailLabel}
                      <Input
                        value={
                          variant === "student-mobility"
                            ? values.programInterest
                            : values.collaborationInterest
                        }
                        onChange={(event) =>
                          variant === "student-mobility"
                            ? updateValue("programInterest", event.target.value)
                            : updateValue("collaborationInterest", event.target.value)
                        }
                        placeholder={variantMessages.detailPlaceholder}
                      />
                      {variant === "student-mobility" && errors.programInterest ? (
                        <span className="text-xs text-rose-600">
                          {errors.programInterest}
                        </span>
                      ) : null}
                      {variant !== "student-mobility" && errors.collaborationInterest ? (
                        <span className="text-xs text-rose-600">
                          {errors.collaborationInterest}
                        </span>
                      ) : null}
                    </label>
                    <label className={sharedInputClass}>
                      {variantMessages.preferredCountryLabel}
                      <Input
                        value={values.preferredCountry}
                        onChange={(event) =>
                          updateValue("preferredCountry", event.target.value)
                        }
                        placeholder={variantMessages.preferredCountryPlaceholder}
                      />
                    </label>
                  </div>
                  {variant === "student-mobility" ? (
                    <div className="grid gap-5 md:grid-cols-2">
                      <label className={sharedInputClass}>
                        {contactMessages.fields.academicBackground}
                        <Input
                          value={values.academicBackground}
                          onChange={(event) =>
                            updateValue("academicBackground", event.target.value)
                          }
                          placeholder={contactMessages.fields.academicBackgroundPlaceholder}
                        />
                      </label>
                      <label className={sharedInputClass}>
                        {contactMessages.fields.preferredContactTime}
                        <Input
                          value={values.preferredContactTime}
                          onChange={(event) =>
                            updateValue("preferredContactTime", event.target.value)
                          }
                          placeholder={contactMessages.fields.preferredContactTimePlaceholder}
                        />
                      </label>
                    </div>
                  ) : (
                    <label className={sharedInputClass}>
                      {contactMessages.fields.preferredContactTime}
                      <Input
                        value={values.preferredContactTime}
                        onChange={(event) =>
                          updateValue("preferredContactTime", event.target.value)
                        }
                        placeholder={contactMessages.fields.preferredContactTimePlaceholder}
                      />
                    </label>
                  )}
                  <label className={sharedInputClass}>
                    {contactMessages.fields.message}
                    <Textarea
                      value={values.message}
                      onChange={(event) => updateValue("message", event.target.value)}
                      placeholder={contactMessages.fields.messagePlaceholder}
                    />
                    {errors.message ? (
                      <span className="text-xs text-rose-600">{errors.message}</span>
                    ) : null}
                  </label>
                </>
              ) : null}

              {step === 2 ? (
                <>
                  <div className="rounded-[1.5rem] border border-[#D6E8FF] bg-[linear-gradient(180deg,rgba(248,251,255,0.98),rgba(255,255,255,0.96))] px-5 py-5 shadow-[0_16px_40px_rgba(8,22,52,0.05)]">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">
                      {contactMessages.review.snapshotLabel}
                    </p>
                    <p className="mt-3 text-sm font-semibold text-slate-950">
                      {contactSummary}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {values.message || contactMessages.review.summaryPlaceholder}
                    </p>
                  </div>
                  <Alert variant="light" className="rounded-[1.5rem] border-[#D6E8FF] bg-sky-50/70 text-slate-700">
                    {contactMessages.review.reviewAlert}
                  </Alert>

                  {variant === "international-patient" ? (
                    <div className="grid gap-5 md:grid-cols-2">
                      <label className={sharedInputClass}>
                        {contactMessages.review.medicalReports}
                        <Input
                          type="file"
                          name="medicalReports"
                          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                          multiple
                        />
                        <span className="text-xs text-slate-500">
                          {contactMessages.review.medicalReportsHelp}
                        </span>
                      </label>
                      <label className={sharedInputClass}>
                        {contactMessages.review.passportCopy}
                        <Input
                          type="file"
                          name="passportCopies"
                          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                          multiple
                        />
                        <span className="text-xs text-slate-500">
                          {contactMessages.review.passportCopyHelp}
                        </span>
                      </label>
                    </div>
                  ) : null}

                  <label className={sharedInputClass}>
                    {variantMessages.uploadLabel}
                    <Input
                      type="file"
                      name={config.uploadName}
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      multiple
                    />
                    <span className="text-xs text-slate-500">{variantMessages.uploadHelper}</span>
                  </label>
                </>
              ) : null}
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-col gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-3">
              {step > 0 ? (
                <Button type="button" variant="secondary" size="lg" onClick={goPrevious}>
                  <ArrowLeft className="h-4 w-4" />
                  {messages.chrome.common.back}
                </Button>
              ) : null}
              {step < steps.length - 1 ? (
                <Button type="button" variant="primary" size="lg" onClick={goNext}>
                  {messages.chrome.common.nextStep}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <SubmitButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  pendingLabel={contactMessages.actions.submitting}
                >
                  {contactMessages.actions.submit}
                </SubmitButton>
              )}
            </div>
            <p className="text-sm text-slate-500">
              {messages.chrome.common.step} {step + 1} {messages.chrome.common.of} {steps.length}
            </p>
          </div>
        </form>
      </Card>

      <div className="grid gap-6">
        <Card variant="muted" className="border-slate-200/80 p-6 shadow-soft backdrop-blur-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-700">
            {contactMessages.aside.focusLabel}
          </p>
          <div className="mt-5 grid gap-3">
            {variantMessages.asidePoints.map((point) => (
              <div
                key={point}
                className="rounded-[1.4rem] border border-slate-200 bg-white px-4 py-4 text-sm leading-7 text-slate-600"
              >
                {point}
              </div>
            ))}
          </div>
        </Card>
        <Card variant="muted" className="border-slate-200/80 p-6 shadow-soft backdrop-blur-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-700">
            {contactMessages.aside.channelsLabel}
          </p>
          <h3 className="mt-4 font-display text-2xl font-semibold text-slate-950">
            {contactMessages.aside.channelsTitle}
          </h3>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            {contactMessages.aside.channelsDescription}
          </p>
          <div className="mt-6 grid gap-4">
            <Button asChild variant="outline" size="lg" className="w-full justify-center">
              <PublicLink href="/contact">
                <ShieldCheck className="h-4 w-4" />
                {messages.chrome.actions.contactDesk}
              </PublicLink>
            </Button>
            {whatsappHref ? (
              <Button asChild variant="outline" size="lg" className="w-full justify-center">
                <a href={whatsappHref} target="_blank" rel="noreferrer">
                  <MessageCircle className="h-4 w-4" />
                  {messages.chrome.floatingButtons.whatsAppLabel}
                </a>
              </Button>
            ) : null}
            {telegramHref ? (
              <Button asChild variant="outline" size="lg" className="w-full justify-center">
                <a href={telegramHref} target="_blank" rel="noreferrer">
                  <Send className="h-4 w-4" />
                  {messages.chrome.floatingButtons.telegramLabel}
                </a>
              </Button>
            ) : null}
          </div>
        </Card>
      </div>
    </div>
  );
}
