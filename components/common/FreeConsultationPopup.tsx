"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  Calculator,
  FileText,
  Globe2,
  HeartPulse,
  Hospital,
  Languages,
  LockKeyhole,
  MapPin,
  MessageCircleMore,
  Plane,
  Send,
  ShieldCheck,
  X,
  type LucideIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import { stripLocaleFromPath } from "@/lib/i18n/config";
import { useLocale } from "@/lib/i18n/provider";
import {
  getFreeConsultationPopupCopy,
  popupCountryKeys,
  popupTreatmentKeys,
} from "@/lib/i18n/free-consultation-popup";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const STORAGE_KEY = "medpobeda-free-consultation-popup-dismissed";
const WHATSAPP_URL = "https://wa.me/998910124043";
const TELEGRAM_URL = "https://t.me/+998910124043";

const journeySteps: Array<{
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    step: "01",
    title: "Medical Report Review",
    description: "Share your reports and receive expert medical guidance.",
    icon: FileText,
  },
  {
    step: "02",
    title: "Doctor & Hospital Selection",
    description: "We help you choose suitable hospitals and specialists in India.",
    icon: Hospital,
  },
  {
    step: "03",
    title: "Treatment Cost Estimate",
    description: "Get transparent estimated treatment packages before travel.",
    icon: Calculator,
  },
  {
    step: "04",
    title: "Visa & Travel Support",
    description: "Assistance with medical visa guidance, flight planning, and airport pickup.",
    icon: Plane,
  },
  {
    step: "05",
    title: "Hospital Admission Assistance",
    description: "On-ground support for admission, interpreter help, and care coordination.",
    icon: Languages,
  },
  {
    step: "06",
    title: "Post-Treatment Follow-up",
    description: "Continued coordination after discharge and return home.",
    icon: HeartPulse,
  },
];

type FormValues = {
  fullName: string;
  country: string;
  phone: string;
  age: string;
  email: string;
  treatment: string;
  concern: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;
type StatusState = {
  tone: "error" | "success";
  message: string;
} | null;

const initialValues: FormValues = {
  fullName: "",
  country: "",
  phone: "",
  age: "",
  email: "",
  treatment: "",
  concern: "",
};

function getFieldClasses(hasError?: boolean) {
  return cn(
    "flex h-[3.35rem] w-full appearance-none rounded-[1.35rem] border border-slate-200/80 bg-[rgba(255,255,255,0.94)] px-4 py-3 text-sm text-slate-950 shadow-[0_12px_30px_rgba(8,22,52,0.06)] outline-none backdrop-blur-xl transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100 disabled:cursor-not-allowed disabled:opacity-60",
    hasError ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100" : undefined,
  );
}

function FieldLabel({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: string;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-sm font-semibold text-[#071B3A]"
    >
      {children}
      {required ? <span className="ml-1 text-[#D14343]">*</span> : null}
    </label>
  );
}

function readDismissedState(locale: string) {
  try {
    return window.sessionStorage.getItem(`${STORAGE_KEY}-${locale}`) === "true";
  } catch {
    return false;
  }
}

function persistDismissedState(locale: string) {
  try {
    window.sessionStorage.setItem(`${STORAGE_KEY}-${locale}`, "true");
  } catch {
    return;
  }
}

function validateForm(values: FormValues, copy: ReturnType<typeof getFreeConsultationPopupCopy>) {
  const nextErrors: FormErrors = {};

  if (!values.fullName.trim()) {
    nextErrors.fullName = copy.required.fullName;
  }

  if (!values.country.trim()) {
    nextErrors.country = copy.required.country;
  }

  if (!values.phone.trim()) {
    nextErrors.phone = copy.required.phone;
  }

  if (!values.age.trim()) {
    nextErrors.age = copy.required.age;
  } else {
    const numericAge = Number(values.age);
    if (!Number.isFinite(numericAge) || numericAge <= 0) {
      nextErrors.age = copy.required.validAge;
    }
  }

  if (!values.treatment.trim()) {
    nextErrors.treatment = copy.required.treatment;
  }

  if (!values.concern.trim()) {
    nextErrors.concern = copy.required.concern;
  }

  return nextErrors;
}

function buildWhatsAppMessage(values: FormValues, selectedReportName: string, copy: ReturnType<typeof getFreeConsultationPopupCopy>) {
  const lines = [
    copy.whatsappIntro,
    "",
    `${copy.patientDetails}:`,
    `Name: ${values.fullName.trim()}`,
    `Country: ${copy.countries[values.country] ?? values.country}`,
    `Phone: ${values.phone.trim()}`,
    `Age: ${values.age.trim()}`,
    `Email: ${values.email.trim() || copy.notProvided}`,
    `Treatment / Medical Concern: ${copy.treatments[values.treatment] ?? values.treatment}`,
    `Medical Concern Description: ${values.concern.trim()}`,
    selectedReportName ? `Selected Medical Report: ${selectedReportName}` : "",
    selectedReportName
      ? "I will send the medical reports directly on WhatsApp after submitting."
      : "",
    "",
    copy.whatsappClosing,
  ];

  return lines.filter(Boolean).join("\n");
}

export default function FreeConsultationPopup() {
  const locale = useLocale();
  const copy = getFreeConsultationPopupCopy(locale);
  const pathname = usePathname();
  const routePath = stripLocaleFromPath(pathname);
  const isAdminRoute = routePath.startsWith("/admin");
  const fullNameRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<StatusState>(null);
  const [selectedReportName, setSelectedReportName] = useState("");

  useEffect(() => {
    if (isAdminRoute || open || readDismissedState(locale)) {
      return;
    }

    const timer = window.setTimeout(() => {
      setOpen(true);
    }, 2000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [isAdminRoute, locale, open, routePath]);

  if (isAdminRoute) {
    return null;
  }

  const handleFieldChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setValues((current) => ({
      ...current,
      [name]: value,
    }));
    setStatus(null);

    setErrors((current) => {
      if (!current[name as keyof FormErrors]) {
        return current;
      }

      const next = { ...current };
      delete next[name as keyof FormErrors];
      return next;
    });
  };

  const handleReportChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedReportName(file?.name ?? "");
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen && open) {
      persistDismissedState(locale);
    }

    setOpen(nextOpen);
  };

  const handleClose = () => {
    persistDismissedState(locale);
    setOpen(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateForm(values, copy);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus({
        tone: "error",
        message: copy.requiredStatus,
      });
      return;
    }

    const message = buildWhatsAppMessage(values, selectedReportName, copy);
    const whatsappHref = `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;

    persistDismissedState(locale);
    setStatus({
      tone: "success",
      message: copy.successStatus,
    });

    const popupWindow = window.open(whatsappHref, "_blank", "noopener,noreferrer");
    if (!popupWindow) {
      window.location.href = whatsappHref;
    }
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={handleOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[70] bg-[#02162F]/62 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out" />
        <DialogPrimitive.Content
          aria-describedby="free-consultation-popup-description"
          aria-modal="true"
          role="dialog"
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            fullNameRef.current?.focus();
          }}
          className="fixed left-1/2 top-1/2 z-[71] w-[calc(100%-1rem)] max-w-[72rem] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[2rem] border border-white/60 bg-white shadow-[0_36px_120px_rgba(2,22,47,0.28)] outline-none data-[state=open]:animate-in data-[state=closed]:animate-out sm:w-[calc(100%-2rem)] md:w-[min(calc(100%-4rem),64rem)] lg:w-[min(72rem,calc(100vw-18rem),calc((100svh-18rem)*16/9))] lg:aspect-video"
        >
          <div className="relative max-h-[calc(100svh-1rem)] overflow-y-auto sm:max-h-[calc(100svh-2rem)] lg:h-full lg:max-h-[calc(100svh-18rem)] lg:overflow-hidden">
            <DialogPrimitive.Close asChild>
              <button
                type="button"
                aria-label={copy.close}
                className="absolute right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,#0B3A67_0%,#0F766E_100%)] text-white shadow-[0_18px_42px_rgba(8,22,52,0.22)] transition hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-2"
                onClick={handleClose}
              >
                <X className="h-5 w-5" />
                <span className="sr-only">{copy.close}</span>
              </button>
            </DialogPrimitive.Close>

            <div className="grid lg:h-full lg:grid-cols-[1.03fr_0.97fr]">
              <section className="order-2 overflow-hidden bg-[linear-gradient(180deg,#F5FAFF_0%,#E8F4FF_100%)] p-5 sm:p-7 lg:order-1 lg:h-full lg:overflow-y-auto lg:p-8">
                <div className="relative overflow-hidden rounded-[1.9rem] border border-[#CFE4FF] bg-[radial-gradient(circle_at_top_left,rgba(125,211,252,0.32),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.9),rgba(234,245,255,0.92))] p-6 shadow-[0_24px_64px_rgba(29,78,216,0.12)]">
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(125,211,252,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.12)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-35" />
                  <div className="pointer-events-none absolute -right-12 top-10 h-40 w-40 rounded-full bg-[rgba(29,78,216,0.14)] blur-3xl" />
                  <div className="pointer-events-none absolute -left-12 bottom-10 h-40 w-40 rounded-full bg-[rgba(16,185,129,0.14)] blur-3xl" />

                  <div className="relative">
                    <Badge
                      variant="success"
                      className="w-fit border-emerald-200/80 bg-emerald-50/90 px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em]"
                    >
                      {copy.badge}
                    </Badge>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/85 px-3 py-2 text-xs font-semibold text-[#0B3A67] shadow-[0_10px_28px_rgba(7,27,58,0.08)]">
                        <Globe2 className="h-4 w-4 text-sky-600" />
                        {copy.region}
                      </div>
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/85 px-3 py-2 text-xs font-semibold text-[#0B3A67] shadow-[0_10px_28px_rgba(7,27,58,0.08)]">
                        <MapPin className="h-4 w-4 text-emerald-600" />
                        {copy.coordination}
                      </div>
                    </div>

                    <h2 className="mt-6 font-display text-[2rem] font-semibold leading-[1.06] tracking-[-0.04em] text-[#071B3A] sm:text-[2.45rem]">
                      {copy.journeyTitle}
                    </h2>
                    <p className="mt-3 text-base font-medium text-[#0F3B63]">
                      {copy.journeySubtitle}
                    </p>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
                      {copy.journeyDescription}
                    </p>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      {journeySteps.map(({ step, icon: Icon }, index) => {
                        const [title, description] = copy.journeySteps[index] ?? ["", ""];
                        return (
                        <div
                          key={step}
                          className="rounded-[1.55rem] border border-white/80 bg-white/84 p-4 shadow-[0_16px_38px_rgba(7,27,58,0.08)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_52px_rgba(7,27,58,0.12)]"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#0B3A67_0%,#38BDF8_100%)] text-white shadow-[0_14px_30px_rgba(29,78,216,0.18)]">
                              <Icon className="h-5 w-5" />
                            </span>
                            <span className="rounded-full border border-[#CFE4FF] bg-[#F3F9FF] px-2.5 py-1 text-[0.68rem] font-semibold tracking-[0.18em] text-[#0B3A67]">
                              {copy.step} {step}
                            </span>
                          </div>
                          <h3 className="mt-4 font-display text-lg font-semibold tracking-[-0.02em] text-[#071B3A]">
                            {title}
                          </h3>
                          <p className="mt-2 text-sm leading-6 text-slate-600">
                            {description}
                          </p>
                        </div>
                        );
                      })}
                    </div>

                    <div className="mt-6 rounded-[1.6rem] border border-white/75 bg-white/84 p-4 shadow-[0_16px_36px_rgba(7,27,58,0.08)]">
                      <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 font-semibold text-emerald-700">
                          <ShieldCheck className="h-4 w-4" />
                          {copy.coordinated}
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1.5 font-semibold text-sky-700">
                          <LockKeyhole className="h-4 w-4" />
                          {copy.confidentialHandling}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="order-1 bg-white p-5 sm:p-7 lg:order-2 lg:h-full lg:overflow-y-auto lg:border-l lg:border-[#E3EFFD] lg:p-8">
                <div className="pr-12 sm:pr-14">
                  <Badge
                    variant="surface"
                    className="w-fit border-[#D6E8FF] bg-[#F8FBFF] px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#0B3A67]"
                  >
                    {copy.freeConsultation}
                  </Badge>
                  <DialogPrimitive.Title className="mt-5 font-display text-[2rem] font-semibold leading-[1.06] tracking-[-0.04em] text-[#071B3A] sm:text-[2.35rem]">
                    {copy.formTitle}
                  </DialogPrimitive.Title>
                  <DialogPrimitive.Description
                    id="free-consultation-popup-description"
                    className="mt-3 text-base font-medium leading-7 text-[#0F3B63]"
                  >
                    {copy.formDescription}
                  </DialogPrimitive.Description>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {copy.formIntro}
                  </p>
                </div>

                <form className="mt-7 space-y-4" noValidate onSubmit={handleSubmit}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <FieldLabel htmlFor="free-consultation-full-name" required>
                        {copy.fullName}
                      </FieldLabel>
                      <Input
                        ref={fullNameRef}
                        id="free-consultation-full-name"
                        name="fullName"
                        placeholder={copy.fullNamePlaceholder}
                        value={values.fullName}
                        onChange={handleFieldChange}
                        aria-invalid={Boolean(errors.fullName)}
                        aria-describedby={
                          errors.fullName ? "free-consultation-full-name-error" : undefined
                        }
                        className={getFieldClasses(Boolean(errors.fullName))}
                      />
                      {errors.fullName ? (
                        <p
                          id="free-consultation-full-name-error"
                          className="mt-2 text-xs font-medium text-rose-600"
                        >
                          {errors.fullName}
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <FieldLabel htmlFor="free-consultation-country" required>
                        {copy.country}
                      </FieldLabel>
                      <select
                        id="free-consultation-country"
                        name="country"
                        value={values.country}
                        onChange={handleFieldChange}
                        aria-invalid={Boolean(errors.country)}
                        aria-describedby={
                          errors.country ? "free-consultation-country-error" : undefined
                        }
                        className={getFieldClasses(Boolean(errors.country))}
                      >
                        <option value="">{copy.chooseCountry}</option>
                        {popupCountryKeys.map((country) => (
                          <option key={country} value={country}>
                            {copy.countries[country]}
                          </option>
                        ))}
                      </select>
                      {errors.country ? (
                        <p
                          id="free-consultation-country-error"
                          className="mt-2 text-xs font-medium text-rose-600"
                        >
                          {errors.country}
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <FieldLabel htmlFor="free-consultation-phone" required>
                        {copy.phone}
                      </FieldLabel>
                      <Input
                        id="free-consultation-phone"
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        placeholder="+998 91 012 40 43"
                        value={values.phone}
                        onChange={handleFieldChange}
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={
                          errors.phone ? "free-consultation-phone-error" : undefined
                        }
                        className={getFieldClasses(Boolean(errors.phone))}
                      />
                      {errors.phone ? (
                        <p
                          id="free-consultation-phone-error"
                          className="mt-2 text-xs font-medium text-rose-600"
                        >
                          {errors.phone}
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <FieldLabel htmlFor="free-consultation-age" required>
                        {copy.age}
                      </FieldLabel>
                      <Input
                        id="free-consultation-age"
                        name="age"
                        type="number"
                        min="0"
                        placeholder={copy.agePlaceholder}
                        value={values.age}
                        onChange={handleFieldChange}
                        aria-invalid={Boolean(errors.age)}
                        aria-describedby={
                          errors.age ? "free-consultation-age-error" : undefined
                        }
                        className={getFieldClasses(Boolean(errors.age))}
                      />
                      {errors.age ? (
                        <p
                          id="free-consultation-age-error"
                          className="mt-2 text-xs font-medium text-rose-600"
                        >
                          {errors.age}
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <FieldLabel htmlFor="free-consultation-email">
                        {copy.email}
                      </FieldLabel>
                      <Input
                        id="free-consultation-email"
                        name="email"
                        type="email"
                        placeholder="name@example.com"
                        value={values.email}
                        onChange={handleFieldChange}
                        className={getFieldClasses()}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <FieldLabel htmlFor="free-consultation-treatment" required>
                        {copy.treatment}
                      </FieldLabel>
                      <select
                        id="free-consultation-treatment"
                        name="treatment"
                        value={values.treatment}
                        onChange={handleFieldChange}
                        aria-invalid={Boolean(errors.treatment)}
                        aria-describedby={
                          errors.treatment
                            ? "free-consultation-treatment-error"
                            : undefined
                        }
                        className={getFieldClasses(Boolean(errors.treatment))}
                      >
                        <option value="">{copy.chooseTreatment}</option>
                        {popupTreatmentKeys.map((treatment) => (
                          <option key={treatment} value={treatment}>
                            {copy.treatments[treatment]}
                          </option>
                        ))}
                      </select>
                      {errors.treatment ? (
                        <p
                          id="free-consultation-treatment-error"
                          className="mt-2 text-xs font-medium text-rose-600"
                        >
                          {errors.treatment}
                        </p>
                      ) : null}
                    </div>

                    <div className="sm:col-span-2">
                      <FieldLabel htmlFor="free-consultation-concern" required>
                        {copy.concern}
                      </FieldLabel>
                      <Textarea
                        id="free-consultation-concern"
                        name="concern"
                        placeholder={copy.concernPlaceholder}
                        value={values.concern}
                        onChange={handleFieldChange}
                        aria-invalid={Boolean(errors.concern)}
                        aria-describedby={
                          errors.concern ? "free-consultation-concern-error" : undefined
                        }
                        className={cn(
                          "min-h-[148px]",
                          errors.concern
                            ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100"
                            : undefined,
                        )}
                      />
                      {errors.concern ? (
                        <p
                          id="free-consultation-concern-error"
                          className="mt-2 text-xs font-medium text-rose-600"
                        >
                          {errors.concern}
                        </p>
                      ) : null}
                    </div>

                    <div className="sm:col-span-2">
                      <FieldLabel htmlFor="free-consultation-reports">
                        {copy.reports}
                      </FieldLabel>
                      <Input
                        id="free-consultation-reports"
                        name="reports"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        onChange={handleReportChange}
                        className="h-auto min-h-[3.35rem] py-2.5"
                      />
                      <p className="mt-2 text-xs leading-5 text-slate-500">
                        {copy.reportHint}
                      </p>
                      {selectedReportName ? (
                        <p className="mt-2 inline-flex rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
                          {copy.selectedFile}: {selectedReportName}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="rounded-[1.6rem] border border-[#E3EFFD] bg-[#F8FBFF] p-4">
                    <Button
                      type="submit"
                      variant="primary"
                      size="xl"
                      className="w-full justify-center rounded-[1.35rem]"
                    >
                      {copy.submit}
                    </Button>
                    <p className="mt-3 flex items-center justify-center gap-2 text-center text-xs font-medium text-slate-500">
                      <ShieldCheck className="h-4 w-4 text-emerald-600" />
                      {copy.confidential}
                    </p>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <Button asChild variant="outline" className="w-full justify-center rounded-[1.15rem]">
                        <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                          <MessageCircleMore className="h-4 w-4 text-emerald-600" />
                          WhatsApp
                        </a>
                      </Button>
                      <Button asChild variant="surface" className="w-full justify-center rounded-[1.15rem]">
                        <a href={TELEGRAM_URL} target="_blank" rel="noreferrer">
                          <Send className="h-4 w-4 text-sky-600" />
                          Telegram
                        </a>
                      </Button>
                    </div>

                    {status ? (
                      <p
                        aria-live="polite"
                        className={cn(
                          "mt-4 rounded-[1.15rem] px-4 py-3 text-sm leading-6",
                          status.tone === "success"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-rose-50 text-rose-700",
                        )}
                      >
                        {status.message}
                      </p>
                    ) : null}
                  </div>
                </form>
              </section>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
