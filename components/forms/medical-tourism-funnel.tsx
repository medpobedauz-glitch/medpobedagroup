"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  Globe2,
  HeartHandshake,
  type LucideIcon,
  PhoneCall,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { submitMedicalTourismInquiryAction } from "@/app/actions/inquiries";
import { UrgencyLevel, type UrgencyLevel as UrgencyLevelValue } from "@/lib/client-enums";
import { useMessages } from "@/lib/i18n";
import { InquiryProgress } from "@/components/forms/inquiry-progress";
import { SubmitButton } from "@/components/forms/submit-button";
import { useDraftPersistence } from "@/components/forms/use-draft-persistence";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type MedicalTourismFunnelProps = {
  redirectPath: string;
  honeypotField: string;
  submitted?: boolean;
  hasError?: boolean;
};

type TourismState = {
  name: string;
  patientName: string;
  organization: string;
  country: string;
  email: string;
  phone: string;
  telegram: string;
  patientNationality: string;
  treatmentType: string;
  preferredHospital: string;
  preferredCountry: string;
  budgetRange: string;
  urgencyLevel: UrgencyLevelValue;
  reportsSummary: string;
  message: string;
};

const initialState: TourismState = {
  name: "",
  patientName: "",
  organization: "",
  country: "",
  email: "",
  phone: "",
  telegram: "",
  patientNationality: "",
  treatmentType: "",
  preferredHospital: "",
  preferredCountry: "India",
  budgetRange: "",
  urgencyLevel: UrgencyLevel.MEDIUM,
  reportsSummary: "",
  message: "",
};

type StepErrors = Partial<Record<keyof TourismState, string>>;

function isValidEmail(value: string) {
  return /\S+@\S+\.\S+/.test(value);
}

function FormNoticeCard({
  icon: Icon,
  text,
}: {
  icon: LucideIcon;
  text: string;
}) {
  return (
    <div className="rounded-[1.5rem] border border-[#D6E8FF] bg-[rgba(248,251,255,0.92)] p-4">
      <div className="flex items-start gap-3">
        <Icon className="mt-1 h-4 w-4 shrink-0 text-blue-700" />
        <p className="text-sm leading-7 text-slate-600">{text}</p>
      </div>
    </div>
  );
}

export function MedicalTourismInquiryFunnel({
  redirectPath,
  honeypotField,
  submitted = false,
  hasError = false,
}: MedicalTourismFunnelProps) {
  const messages = useMessages();
  const formMessages = messages.forms.medicalTourismFunnel;
  const isInternationalPatientCareRoute = redirectPath.includes("/international-patient-care");
  const steps = formMessages.steps;
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<TourismState>(initialState);
  const [errors, setErrors] = useState<StepErrors>({});
  const { status: draftStatus, clearDraft } = useDraftPersistence({
    storageKey: "medpobeda-medical-tourism-funnel",
    value: { step, values },
    onRestore(draft) {
      setStep(Math.min(draft.step ?? 0, steps.length - 1));
      setValues(draft.values ?? initialState);
    },
    enabled: !submitted,
  });

  const caseSummary = useMemo(
    () =>
      [
        values.patientName || values.name || formMessages.review.patientPending,
        values.treatmentType || formMessages.review.treatmentPending,
        formMessages.urgencyOptions[values.urgencyLevel],
      ].join(" • "),
    [
      formMessages.review.patientPending,
      formMessages.review.treatmentPending,
      formMessages.urgencyOptions,
      values.name,
      values.patientName,
      values.treatmentType,
      values.urgencyLevel,
    ],
  );

  useEffect(() => {
    if (submitted) {
      clearDraft();
    }
  }, [clearDraft, submitted]);

  function resetDraft() {
    clearDraft();
    setStep(0);
    setValues(initialState);
    setErrors({});
  }

  function updateValue<Field extends keyof TourismState>(
    field: Field,
    value: TourismState[Field],
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
        nextErrors.name = formMessages.validation.nameRequired;
      }

      if (!values.email.trim()) {
        nextErrors.email = formMessages.validation.emailRequired;
      } else if (!isValidEmail(values.email)) {
        nextErrors.email = formMessages.validation.emailInvalid;
      }
    }

    if (stepIndex === 1) {
      if (!values.patientNationality.trim()) {
        nextErrors.patientNationality = formMessages.validation.patientNationalityRequired;
      }

      if (!values.treatmentType.trim()) {
        nextErrors.treatmentType = formMessages.validation.treatmentTypeRequired;
      }

      if (!values.message.trim() || values.message.trim().length < 20) {
        nextErrors.message = formMessages.validation.messageRequired;
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
  const urgencyNote =
    values.urgencyLevel === UrgencyLevel.CRITICAL
      ? formMessages.urgencyNotes.critical
      : values.urgencyLevel === UrgencyLevel.HIGH
      ? formMessages.urgencyNotes.high
      : values.urgencyLevel === UrgencyLevel.MEDIUM
        ? formMessages.urgencyNotes.medium
        : formMessages.urgencyNotes.low;
  const draftMessage =
    draftStatus === "restored"
      ? formMessages.draftRestored
      : draftStatus === "saved"
        ? formMessages.draftSaved
        : formMessages.draftIdle;
  const formEyebrow = isInternationalPatientCareRoute
    ? "International Patient Care Inquiry"
    : formMessages.eyebrow;
  const successMessage = isInternationalPatientCareRoute
    ? "Thank you. MedPobeda Group has received your international patient care inquiry and will review the next steps."
    : formMessages.successMessage;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
      <Card variant="light" className="border-slate-200/80 p-6 text-slate-950 shadow-premium sm:p-8">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-700">
            {formEyebrow}
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold text-slate-950 sm:text-4xl">
            {formMessages.title}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
            {formMessages.description}
          </p>
          <Alert variant="light" className="mt-6 rounded-[1.5rem] border-blue-100 bg-blue-50/80">
            {formMessages.platformAlert}
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
          {submitted ? (
            <Alert variant="light" className="mt-4 rounded-[1.4rem] border-emerald-200 bg-emerald-50 text-emerald-900">
              {successMessage}
            </Alert>
          ) : null}
          {hasError ? (
            <Alert variant="light" className="mt-4 rounded-[1.4rem] border-amber-200 bg-amber-50 text-amber-900">
              {formMessages.errorMessage}
            </Alert>
          ) : null}
        </div>

        <form
          action={submitMedicalTourismInquiryAction}
          encType="multipart/form-data"
          className="grid gap-6"
        >
          <input type="hidden" name={honeypotField} tabIndex={-1} autoComplete="off" />
          <input type="hidden" name="redirectPath" value={redirectPath} />
          <input type="hidden" name="name" value={values.name} readOnly />
          <input type="hidden" name="patientName" value={values.patientName} readOnly />
          <input type="hidden" name="organization" value={values.organization} readOnly />
          <input type="hidden" name="country" value={values.country} readOnly />
          <input type="hidden" name="email" value={values.email} readOnly />
          <input type="hidden" name="phone" value={values.phone} readOnly />
          <input type="hidden" name="telegram" value={values.telegram} readOnly />
          <input
            type="hidden"
            name="patientNationality"
            value={values.patientNationality}
            readOnly
          />
          <input type="hidden" name="treatmentType" value={values.treatmentType} readOnly />
          <input
            type="hidden"
            name="preferredHospital"
            value={values.preferredHospital}
            readOnly
          />
          <input
            type="hidden"
            name="preferredCountry"
            value={values.preferredCountry}
            readOnly
          />
          <input type="hidden" name="budgetRange" value={values.budgetRange} readOnly />
          <input type="hidden" name="urgencyLevel" value={values.urgencyLevel} readOnly />
          <input
            type="hidden"
            name="reportsSummary"
            value={values.reportsSummary}
            readOnly
          />
          <input type="hidden" name="message" value={values.message} readOnly />

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
                      {formMessages.fields.contactName}
                      <Input
                        value={values.name}
                        onChange={(event) => updateValue("name", event.target.value)}
                        placeholder={formMessages.fields.contactNamePlaceholder}
                      />
                      {errors.name ? (
                        <span className="text-xs text-rose-600">{errors.name}</span>
                      ) : null}
                    </label>
                    <label className={sharedInputClass}>
                      {formMessages.fields.patientName}
                      <Input
                        value={values.patientName}
                        onChange={(event) => updateValue("patientName", event.target.value)}
                        placeholder={formMessages.fields.patientNamePlaceholder}
                      />
                    </label>
                  </div>
                  <div className="grid gap-5 md:grid-cols-2">
                    <label className={sharedInputClass}>
                      {formMessages.fields.organization}
                      <Input
                        value={values.organization}
                        onChange={(event) =>
                          updateValue("organization", event.target.value)
                        }
                        placeholder={formMessages.fields.organizationPlaceholder}
                      />
                    </label>
                    <label className={sharedInputClass}>
                      {formMessages.fields.country}
                      <Input
                        value={values.country}
                        onChange={(event) => updateValue("country", event.target.value)}
                        placeholder={formMessages.fields.countryPlaceholder}
                      />
                    </label>
                  </div>
                  <div className="grid gap-5 md:grid-cols-2">
                    <label className={sharedInputClass}>
                      {formMessages.fields.email}
                      <Input
                        type="email"
                        value={values.email}
                        onChange={(event) => updateValue("email", event.target.value)}
                        placeholder={formMessages.fields.emailPlaceholder}
                      />
                      {errors.email ? (
                        <span className="text-xs text-rose-600">{errors.email}</span>
                      ) : null}
                    </label>
                    <label className={sharedInputClass}>
                      {formMessages.fields.phone}
                      <Input
                        value={values.phone}
                        onChange={(event) => updateValue("phone", event.target.value)}
                        placeholder={formMessages.fields.phonePlaceholder}
                      />
                    </label>
                  </div>
                  <label className={sharedInputClass}>
                    {formMessages.fields.telegram}
                    <Input
                      value={values.telegram}
                      onChange={(event) => updateValue("telegram", event.target.value)}
                      placeholder={formMessages.fields.telegramPlaceholder}
                    />
                  </label>
                </>
              ) : null}

              {step === 1 ? (
                <>
                  <div className="grid gap-5 md:grid-cols-2">
                    <label className={sharedInputClass}>
                      {formMessages.fields.patientNationality}
                      <Input
                        value={values.patientNationality}
                        onChange={(event) =>
                          updateValue("patientNationality", event.target.value)
                        }
                        placeholder={formMessages.fields.patientNationalityPlaceholder}
                      />
                      {errors.patientNationality ? (
                        <span className="text-xs text-rose-600">
                          {errors.patientNationality}
                        </span>
                      ) : null}
                    </label>
                    <label className={sharedInputClass}>
                      {formMessages.fields.treatmentType}
                      <Input
                        value={values.treatmentType}
                        onChange={(event) =>
                          updateValue("treatmentType", event.target.value)
                        }
                        placeholder={formMessages.fields.treatmentTypePlaceholder}
                      />
                      {errors.treatmentType ? (
                        <span className="text-xs text-rose-600">
                          {errors.treatmentType}
                        </span>
                      ) : null}
                    </label>
                  </div>
                  <div className="grid gap-5 md:grid-cols-3">
                    <label className={sharedInputClass}>
                      {formMessages.fields.preferredCountry}
                      <Input
                        value={values.preferredCountry}
                        onChange={(event) =>
                          updateValue("preferredCountry", event.target.value)
                        }
                        placeholder={formMessages.fields.preferredCountryPlaceholder}
                      />
                    </label>
                    <label className={sharedInputClass}>
                      {formMessages.fields.preferredHospital}
                      <Input
                        value={values.preferredHospital}
                        onChange={(event) =>
                          updateValue("preferredHospital", event.target.value)
                        }
                        placeholder={formMessages.fields.preferredHospitalPlaceholder}
                      />
                    </label>
                    <label className={sharedInputClass}>
                      {formMessages.fields.budgetRange}
                      <Input
                        value={values.budgetRange}
                        onChange={(event) => updateValue("budgetRange", event.target.value)}
                        placeholder={formMessages.fields.budgetRangePlaceholder}
                      />
                    </label>
                  </div>
                  <div className="grid gap-5 md:grid-cols-2">
                    <label className={sharedInputClass}>
                      {formMessages.fields.urgencyLevel}
                      <select
                        value={values.urgencyLevel}
                        onChange={(event) =>
                          updateValue("urgencyLevel", event.target.value as UrgencyLevelValue)
                        }
                        className="select-enterprise"
                      >
                        {Object.values(UrgencyLevel).map((urgency) => (
                          <option key={urgency} value={urgency}>
                            {formMessages.urgencyOptions[urgency]}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <label className={sharedInputClass}>
                    {formMessages.fields.reportsSummary}
                    <Input
                      value={values.reportsSummary}
                      onChange={(event) =>
                        updateValue("reportsSummary", event.target.value)
                      }
                      placeholder={formMessages.fields.reportsSummaryPlaceholder}
                    />
                  </label>
                  <Alert variant="light" className="rounded-[1.4rem] border-[#D6E8FF] bg-sky-50/70 text-slate-700">
                    {urgencyNote}
                  </Alert>
                  <label className={sharedInputClass}>
                    {formMessages.fields.message}
                    <Textarea
                      value={values.message}
                      onChange={(event) => updateValue("message", event.target.value)}
                      placeholder={formMessages.fields.messagePlaceholder}
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
                      {formMessages.review.snapshotLabel}
                    </p>
                    <p className="mt-3 text-sm font-semibold text-slate-950">
                      {caseSummary}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {values.message || formMessages.review.summaryPlaceholder}
                    </p>
                  </div>
                  <Alert variant="light" className="rounded-[1.5rem] border-[#D6E8FF] bg-sky-50/70 text-slate-700">
                    {formMessages.review.reviewAlert}
                  </Alert>
                  <div className="grid gap-5 md:grid-cols-3">
                    <label className={sharedInputClass}>
                      {formMessages.review.medicalReports}
                        <Input
                          type="file"
                          name="medicalReports"
                          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                          multiple
                        />
                    </label>
                    <label className={sharedInputClass}>
                      {formMessages.review.treatmentDocuments}
                        <Input
                          type="file"
                          name="treatmentDocuments"
                          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                          multiple
                        />
                    </label>
                  </div>
                  <p className="text-sm leading-7 text-slate-500">
                    {formMessages.review.acceptedFormats}
                  </p>
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormNoticeCard
                      icon={ShieldCheck}
                      text={formMessages.notices.privacy}
                    />
                    <FormNoticeCard
                      icon={PhoneCall}
                      text={formMessages.notices.emergency}
                    />
                  </div>
                  <FormNoticeCard
                    icon={FileText}
                    text={formMessages.notices.patientUpload}
                  />
                  <label className="flex items-start gap-3 rounded-[1.5rem] border border-[#D6E8FF] bg-white p-4 text-sm leading-7 text-slate-600 shadow-[0_14px_36px_rgba(7,27,58,0.04)]">
                    <input
                      type="checkbox"
                      name="consentAccepted"
                      value="true"
                      required
                      className="mt-1 h-4 w-4 rounded border-[#9CC8FF] text-blue-700 focus:ring-blue-500"
                    />
                    <span>{formMessages.notices.consent}</span>
                  </label>
                </>
              ) : null}
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-col gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-3">
              {step > 0 ? (
                <Button
                  type="button"
                  variant="secondary"
                  size="lg"
                  onClick={goPrevious}
                  className="w-full sm:w-auto"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {messages.chrome.common.back}
                </Button>
              ) : null}
              {step < steps.length - 1 ? (
                <Button
                  type="button"
                  variant="primary"
                  size="lg"
                  onClick={goNext}
                  className="w-full sm:w-auto"
                >
                  {messages.chrome.common.nextStep}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <SubmitButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto"
                  pendingLabel={formMessages.actions.submitting}
                >
                  {formMessages.actions.submit}
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
            {formMessages.aside.scopeLabel}
          </p>
          <div className="mt-5 grid gap-3">
            {formMessages.aside.scopeItems.map((item, index) => {
              const MappedIcon =
                index === 0 ? HeartHandshake : index === 1 ? Globe2 : FileText;

              return (
                <div
                  key={item.title}
                  className="rounded-[1.4rem] border border-slate-200 bg-white px-4 py-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-sky-100 bg-sky-50 text-sky-700">
                      <MappedIcon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-950">{item.title}</p>
                      <p className="mt-1 text-sm leading-7 text-slate-600">{item.text}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
        <Card variant="muted" className="border-slate-200/80 p-6 shadow-soft backdrop-blur-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-700">
            {formMessages.aside.confidentialLabel}
          </p>
          <div className="mt-5 rounded-[1.4rem] border border-sky-100 bg-sky-50 px-4 py-4">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-1 h-5 w-5 text-sky-700" />
              <p className="text-sm leading-7 text-slate-700">
                {formMessages.aside.confidentialText}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
