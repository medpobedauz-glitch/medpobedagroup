"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  FileText,
  Globe2,
  GraduationCap,
  Handshake,
  Hospital,
  Mail,
  MessageCircle,
  PhoneCall,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

import { submitContactInquiryAction } from "@/lib/actions/inquiries";
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

const tabMeta = {
  patient: {
    label: "For Patients",
    eyebrow: "International Patient Support",
    title: "Share your treatment requirement and receive a guided next-step response.",
    description:
      "Use this route for medical tourism coordination, doctor matching, hospital appointment planning, and medical report review support.",
    inquiryType: "INTERNATIONAL_PATIENT",
    successKey: "international_patient",
    icon: UserRound,
    message:
      "Please describe the diagnosis, treatment need, preferred travel timing, and any hospital preferences.",
  },
  hospital: {
    label: "For Hospitals",
    eyebrow: "Hospital Collaboration",
    title: "Open a formal partnership discussion for referrals, training, or growth programs.",
    description:
      "This route is for hospital leadership, international desks, and healthcare organizations exploring collaboration with MedPobeda Group.",
    inquiryType: "PARTNERSHIP",
    successKey: "partnership",
    icon: Hospital,
    message:
      "Outline the collaboration model, target specialties, geography, and the operational support you want to discuss.",
  },
  institution: {
    label: "For Institutions",
    eyebrow: "Institutional Collaboration",
    title: "Discuss student mobility, observerships, faculty exchange, or healthcare-linked institutional cooperation.",
    description:
      "Use this route for universities, training institutions, and healthcare education stakeholders seeking structured cross-border collaboration.",
    inquiryType: "CONTACT",
    successKey: "contact",
    icon: GraduationCap,
    message:
      "Explain the collaboration type, institutional objectives, target country, and expected partnership scope.",
  },
} as const;

const submittedTypeToTab: Record<string, ContactTab> = {
  international_patient: "patient",
  partnership: "hospital",
  contact: "institution",
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

export function HomeContactSection({
  honeypotField,
  submittedType,
  hasError = false,
}: HomeContactSectionProps) {
  const pathname = usePathname();
  const initialTab = submittedType ? submittedTypeToTab[submittedType] : "patient";
  const [activeTab, setActiveTab] = useState<ContactTab>(initialTab || "patient");

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
    () =>
      getWhatsAppUrl(
        "Hello MedPobeda Group, I would like to discuss international healthcare collaboration.",
      ),
    [],
  );
  const telegramHref = useMemo(
    () =>
      getTelegramUrl(
        "Hello MedPobeda Group, I would like to discuss international healthcare collaboration.",
      ),
    [],
  );

  return (
    <section id="contact-section" className="section-shell">
      <div className="container-wide">
        <div className="section-frame overflow-visible px-6 py-8 sm:px-8 lg:px-10 lg:py-12">
          <SectionHeader
            eyebrow="Contact & Coordination"
            title="Contact MedPobeda Group through the right healthcare coordination desk"
            description="Choose the route that matches your objective. Each inquiry lane is designed for premium patient support, hospital partnerships, and institutional collaboration."
            align="center"
          />
          <div className="mt-12 grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
            <PremiumCard hover={false} className="p-6 sm:p-8">
              <div className="flex flex-wrap gap-3">
                {(Object.entries(tabMeta) as [ContactTab, (typeof tabMeta)[ContactTab]][]).map(
                  ([tab, meta]) => {
                    const Icon = meta.icon;

                    return (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                          "inline-flex items-center gap-2 rounded-full border px-4 py-3 text-sm font-semibold transition",
                          activeTab === tab
                            ? "border-[#1D4ED8] bg-[linear-gradient(135deg,rgba(29,78,216,0.12),rgba(56,189,248,0.16))] text-[#071B3A] shadow-[0_16px_48px_rgba(29,78,216,0.14)]"
                            : "border-[#D6E8FF] bg-white text-slate-600 hover:border-[#9CC8FF] hover:text-[#071B3A]",
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {meta.label}
                      </button>
                    );
                  },
                )}
              </div>

              {submittedType === activeMeta.successKey ? (
                <Alert className="mt-6 border-emerald-200 bg-emerald-50 text-emerald-900" variant="light">
                  Thank you. Our coordination team will contact you shortly.
                </Alert>
              ) : null}

              {hasError ? (
                <Alert className="mt-6 border-amber-200 bg-amber-50 text-amber-900" variant="light">
                  Some required details were missing or invalid. Please review the form and submit again.
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
                      <input type="hidden" name="preferredCountry" value="India and partner hospitals abroad" />
                      <div className="grid gap-5 md:grid-cols-2">
                        <label className="field-shell">
                          <span>Full Name</span>
                          <Input name="name" placeholder="Patient or family representative" required />
                        </label>
                        <label className="field-shell">
                          <span>Country</span>
                          <Input name="country" placeholder="Current country of residence" required />
                        </label>
                        <label className="field-shell">
                          <span>Phone / WhatsApp</span>
                          <Input name="phone" placeholder="+998 or international number" />
                        </label>
                        <label className="field-shell">
                          <span>Email</span>
                          <Input name="email" type="email" placeholder="your@email.com" required />
                        </label>
                      </div>
                      <label className="field-shell">
                        <span>Treatment Required</span>
                        <Input
                          name="collaborationInterest"
                          placeholder="Cardiology, oncology, surgery, rehabilitation, diagnostics..."
                          required
                        />
                      </label>
                      <FileDrop
                        label="Upload Medical Report"
                        name="medicalReports"
                        helper="PDF or image files can be added for initial review support."
                      />
                      <label className="field-shell">
                        <span>Message</span>
                        <Textarea
                          name="message"
                          placeholder={activeMeta.message}
                          required
                        />
                      </label>
                      <SubmitButton
                        variant="hero"
                        size="xl"
                        pendingLabel="Submitting inquiry..."
                        className="w-full justify-center sm:w-auto"
                      >
                        Request Patient Assistance
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
                          <span>Hospital Name</span>
                          <Input name="organization" placeholder="Hospital or healthcare group" required />
                        </label>
                        <label className="field-shell">
                          <span>Country / City</span>
                          <Input name="country" placeholder="Tashkent, Delhi, Dubai..." required />
                        </label>
                        <label className="field-shell">
                          <span>Contact Person</span>
                          <Input name="name" placeholder="Director, coordinator, or desk lead" required />
                        </label>
                        <label className="field-shell">
                          <span>Email</span>
                          <Input name="email" type="email" placeholder="contact@hospital.com" required />
                        </label>
                        <label className="field-shell">
                          <span>Phone</span>
                          <Input name="phone" placeholder="Direct phone or WhatsApp" />
                        </label>
                        <label className="field-shell">
                          <span>Partnership Interest</span>
                          <Input
                            name="collaborationInterest"
                            placeholder="Referrals, faculty exchange, tourism desk, branding abroad..."
                            required
                          />
                        </label>
                      </div>
                      <FileDrop
                        label="Hospital Profile or Supporting Documents"
                        name="partnershipDocuments"
                        helper="Optional profile decks, service lists, or collaboration notes."
                      />
                      <label className="field-shell">
                        <span>Message</span>
                        <Textarea
                          name="message"
                          placeholder={activeMeta.message}
                          required
                        />
                      </label>
                      <SubmitButton
                        variant="hero"
                        size="xl"
                        pendingLabel="Submitting partnership request..."
                        className="w-full justify-center sm:w-auto"
                      >
                        Become a Partner Hospital
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
                          <span>Institution Name</span>
                          <Input name="organization" placeholder="University or institution name" required />
                        </label>
                        <label className="field-shell">
                          <span>Country</span>
                          <Input name="country" placeholder="Country or city" required />
                        </label>
                        <label className="field-shell">
                          <span>Contact Person</span>
                          <Input name="name" placeholder="Department head or coordinator" required />
                        </label>
                        <label className="field-shell">
                          <span>Email</span>
                          <Input name="email" type="email" placeholder="institution@email.com" required />
                        </label>
                        <label className="field-shell md:col-span-2">
                          <span>Collaboration Type</span>
                          <Input
                            name="collaborationInterest"
                            placeholder="Clinical exposure, student mobility, observerships, faculty exchange..."
                            required
                          />
                        </label>
                      </div>
                      <label className="field-shell">
                        <span>Message</span>
                        <Textarea
                          name="message"
                          placeholder={activeMeta.message}
                          required
                        />
                      </label>
                      <SubmitButton
                        variant="hero"
                        size="xl"
                        pendingLabel="Submitting institutional inquiry..."
                        className="w-full justify-center sm:w-auto"
                      >
                        Contact MedPobeda Group
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
                      Coordination Notes
                    </p>
                    <h3 className="mt-1 font-display text-2xl font-semibold text-[#071B3A]">
                      Trust-led healthcare communication
                    </h3>
                  </div>
                </div>
                <div className="mt-6 grid gap-4 text-sm leading-7 text-slate-600">
                  {[
                    "Patient support requests are handled with sensitive document awareness.",
                    "Hospital and institutional discussions are positioned around structured collaboration.",
                    "Follow-up routing can support Uzbekistan, India, and broader cross-border inquiries.",
                  ].map((item) => (
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
                  Direct Channels
                </p>
                <div className="mt-5 grid gap-4">
                  {whatsappHref ? (
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between rounded-[1.6rem] border border-[#D6E8FF] bg-white px-5 py-4 text-sm font-semibold text-[#071B3A] transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(16,185,129,0.14)]"
                    >
                      <span className="inline-flex items-center gap-3">
                        <MessageCircle className="h-4 w-4 text-emerald-500" />
                        WhatsApp Coordination
                      </span>
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  ) : null}
                  {telegramHref ? (
                    <a
                      href={telegramHref}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between rounded-[1.6rem] border border-[#D6E8FF] bg-white px-5 py-4 text-sm font-semibold text-[#071B3A] transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(29,78,216,0.14)]"
                    >
                      <span className="inline-flex items-center gap-3">
                        <Globe2 className="h-4 w-4 text-blue-600" />
                        Telegram Support
                      </span>
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  ) : null}
                  <div className="rounded-[1.6rem] border border-[#D6E8FF] bg-[linear-gradient(180deg,rgba(248,251,255,0.98),rgba(255,255,255,0.96))] px-5 py-4 text-sm leading-7 text-slate-600">
                    <div className="flex items-start gap-3">
                      <Mail className="mt-1 h-4 w-4 text-blue-600" />
                      <div>
                        <p className="font-semibold text-[#071B3A]">
                          {siteConfig.contactEmail || "Email to be configured"}
                        </p>
                        <p>For treatment coordination, hospital partnerships, and institutional discussions.</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-[1.6rem] border border-[#D6E8FF] bg-[linear-gradient(180deg,rgba(248,251,255,0.98),rgba(255,255,255,0.96))] px-5 py-4 text-sm leading-7 text-slate-600">
                    <div className="flex items-start gap-3">
                      <PhoneCall className="mt-1 h-4 w-4 text-blue-600" />
                      <div>
                        <p className="font-semibold text-[#071B3A]">
                          {siteConfig.contactPhone || "Phone to be configured"}
                        </p>
                        <p>Tashkent-based coordination for cross-border healthcare facilitation.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </PremiumCard>

              <PremiumCard className="p-6 sm:p-7" delay={0.15}>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-700">
                  Best-Fit Use Cases
                </p>
                <div className="mt-5 grid gap-4">
                  {[
                    {
                      icon: Building2,
                      title: "International patient referrals",
                      description: "For hospitals or families seeking specialist access and treatment guidance.",
                    },
                    {
                      icon: Handshake,
                      title: "Cross-border healthcare partnerships",
                      description: "For institutions developing referral, training, or medical tourism collaboration.",
                    },
                    {
                      icon: FileText,
                      title: "Clinical training and student mobility",
                      description: "For observerships, faculty exchange, and healthcare-linked institutional cooperation.",
                    },
                  ].map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.title}
                        className="rounded-[1.6rem] border border-[#D6E8FF] bg-[rgba(248,251,255,0.88)] p-4"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-blue-700 shadow-[0_12px_30px_rgba(29,78,216,0.1)]">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-[#071B3A]">{item.title}</h4>
                            <p className="mt-1 text-sm leading-7 text-slate-600">{item.description}</p>
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
