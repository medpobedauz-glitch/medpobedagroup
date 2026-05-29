"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  FileText,
  Globe2,
  HeartPulse,
  Hospital,
  Languages,
  MapPin,
  PhoneCall,
  Plane,
  Send,
  ShieldCheck,
} from "lucide-react";
import { usePathname } from "next/navigation";

import { getLocaleFromPathname, localizePath, stripLocaleFromPath } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const WHATSAPP_URL = "https://wa.me/998910124043";
const TELEGRAM_URL = "https://t.me/+998910124043";
const displayPhoneNumber = "+998 91 012 40 43";

const countryBadges = [
  {
    label: "Uzbekistan",
    visualClassName: "left-[4%] top-[10%] md:left-[5%] md:top-[11%]",
  },
  {
    label: "Kazakhstan",
    visualClassName: "left-[30%] top-[4%] md:left-[28%] md:top-[5%]",
  },
  {
    label: "Kyrgyzstan",
    visualClassName: "right-[12%] top-[18%] md:right-[10%] md:top-[20%]",
  },
  {
    label: "Tajikistan",
    visualClassName: "left-[18%] top-[43%] md:left-[16%] md:top-[44%]",
  },
  {
    label: "Turkmenistan",
    visualClassName: "left-[46%] top-[54%] md:left-[47%] md:top-[55%]",
  },
  {
    label: "Central Asia",
    visualClassName: "left-[37%] top-[28%] md:left-[37%] md:top-[30%]",
  },
] as const;

const supportFeatures: Array<{
  title: string;
  description: string;
  icon: LucideIcon;
  iconClassName: string;
}> = [
  {
    title: "Free Medical Opinion",
    description:
      "Share your medical reports and receive expert opinion from trusted hospital partners in India.",
    icon: FileText,
    iconClassName: "text-sky-700",
  },
  {
    title: "Treatment Cost Estimate",
    description:
      "Get transparent treatment package estimates before planning your travel for affordable treatment in India.",
    icon: ShieldCheck,
    iconClassName: "text-emerald-600",
  },
  {
    title: "Trusted Hospital Selection",
    description:
      "We help you choose suitable hospitals and doctors based on your diagnosis, urgency, and budget.",
    icon: Hospital,
    iconClassName: "text-blue-700",
  },
  {
    title: "Visa & Travel Assistance",
    description:
      "Support for medical visa guidance, airport pickup, accommodation planning, and travel coordination.",
    icon: Plane,
    iconClassName: "text-cyan-700",
  },
  {
    title: "Interpreter & Local Support",
    description:
      "Russian, Uzbek, English, and Hindi communication support for patients and families in India.",
    icon: Languages,
    iconClassName: "text-indigo-700",
  },
  {
    title: "Post-Treatment Follow-up",
    description:
      "Continued coordination after treatment for reports, follow-ups, recovery guidance, and next steps.",
    icon: HeartPulse,
    iconClassName: "text-emerald-700",
  },
] as const;

const trustIndicators = [
  "Trusted hospitals in India",
  "Medical tourism from Uzbekistan to India",
  "Dedicated patient coordinators",
  "Transparent treatment planning",
] as const;

const mapRouteLines = [
  "left-[14%] top-[20%] w-[42%] rotate-[15deg]",
  "left-[24%] top-[39%] w-[34%] rotate-[7deg]",
  "left-[48%] top-[29%] w-[24%] rotate-[29deg]",
  "left-[44%] top-[57%] w-[20%] rotate-[-6deg]",
] as const;

function buildWhatsAppLink(message: string) {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
}

export default function CentralAsiaPatientsSection() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const routePath = stripLocaleFromPath(pathname);

  if (routePath.startsWith("/admin")) {
    return null;
  }

  const medicalOpinionHref = localizePath("/international-patients", locale);
  const sendReportsHref = buildWhatsAppLink(
    "Hello MedPobeda Group, I want to send my medical reports and receive a free medical opinion for treatment in India.",
  );
  const whatsappConsultHref = buildWhatsAppLink(
    "Hello MedPobeda Group, I need guidance for medical treatment in India from Central Asia.",
  );

  return (
    <section
      aria-labelledby="central-asia-patients-heading"
      className="relative overflow-hidden px-4 py-14 sm:px-6 lg:px-8 lg:py-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(248,251,255,0.92)_0%,rgba(235,246,255,0.86)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.2),transparent_62%)]" />
      <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(191,219,254,0.55),transparent_68%)]" />
      <div className="pointer-events-none absolute right-0 top-10 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(125,211,252,0.28),transparent_72%)]" />

      <div className="relative mx-auto max-w-[92rem]">
        <div className="overflow-hidden rounded-[2rem] border border-[#D6E8FF] bg-white/88 shadow-[0_28px_90px_rgba(7,27,58,0.08)] backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.12),transparent_26%),radial-gradient(circle_at_top_right,rgba(29,78,216,0.08),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.08),transparent_24%)]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(29,78,216,0),rgba(29,78,216,0.7),rgba(56,189,248,0.7),rgba(29,78,216,0))]" />

          <div className="relative grid gap-10 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[1.04fr_0.96fr] lg:gap-12 lg:px-10 lg:py-12 xl:px-12">
            <div className="flex flex-col justify-between">
              <div>
                <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-[0_14px_34px_rgba(16,185,129,0.12)]">
                  <ShieldCheck className="h-4 w-4 shrink-0" />
                  <span className="text-balance">
                    Trusted medical travel support from Central Asia to India
                  </span>
                </div>

                <h2
                  id="central-asia-patients-heading"
                  className="mt-6 max-w-4xl text-balance font-display text-3xl font-semibold leading-[1.08] tracking-[-0.035em] text-[#071B3A] sm:text-4xl lg:text-[3.65rem] lg:leading-[1.02]"
                >
                  Patients from Central Asia Choose India for Advanced Medical Treatment
                </h2>

                <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                  MedPobeda Group provides complete medical tourism support for patients
                  from Uzbekistan and across Central Asia who are looking for advanced,
                  affordable, and reliable medical treatment in India. From hospital
                  selection and doctor consultation to visa support, travel coordination,
                  interpreter assistance, and post-treatment follow-up, our team helps
                  patients at every step of their medical journey with trusted hospitals
                  in India.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {trustIndicators.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-2xl border border-white/80 bg-white/78 px-4 py-3 text-sm font-medium text-slate-700 shadow-[0_14px_34px_rgba(7,27,58,0.05)]"
                    >
                      <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500 shadow-[0_0_0_6px_rgba(16,185,129,0.14)]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-10">
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-700">
                    Supporting Patients From
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {countryBadges.map((country) => (
                      <span
                        key={country.label}
                        className="inline-flex items-center gap-2 rounded-full border border-[#CFE4FF] bg-white px-4 py-2 text-sm font-semibold text-[#0B2D64] shadow-[0_14px_30px_rgba(29,78,216,0.08)]"
                      >
                        <MapPin className="h-3.5 w-3.5 text-emerald-600" />
                        {country.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-10 rounded-[1.9rem] border border-[#D6E8FF] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(244,249,255,0.96))] p-6 shadow-[0_20px_60px_rgba(7,27,58,0.08)] sm:p-7">
                <div className="flex items-start gap-3">
                  <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#071B3A_0%,#1D4ED8_52%,#38BDF8_100%)] text-white shadow-[0_16px_36px_rgba(29,78,216,0.22)]">
                    <Globe2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.26em] text-sky-700">
                      Need treatment in India?
                    </p>
                    <p className="mt-3 max-w-2xl text-base leading-8 text-slate-600">
                      Send your medical reports and our team will help you get a free
                      medical opinion and estimated treatment cost from trusted hospitals
                      in India.
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Button asChild variant="hero" size="xl" className="justify-center">
                    <Link href={medicalOpinionHref}>
                      Get Free Medical Opinion
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="surface" size="xl" className="justify-center">
                    <a href={sendReportsHref} target="_blank" rel="noreferrer">
                      Send Medical Reports
                    </a>
                  </Button>
                </div>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a
                    href={TELEGRAM_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-[3rem] items-center justify-center gap-2 rounded-full border border-[#D6E8FF] bg-white px-5 py-3 text-sm font-semibold text-[#0B2D64] shadow-[0_14px_34px_rgba(7,27,58,0.05)] transition duration-300 hover:-translate-y-0.5 hover:border-[#9CC8FF] hover:shadow-[0_20px_44px_rgba(29,78,216,0.12)]"
                  >
                    <Send className="h-4 w-4 text-sky-700" />
                    Contact on Telegram
                  </a>
                  <a
                    href={whatsappConsultHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-[3rem] items-center justify-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-5 py-3 text-sm font-semibold text-emerald-700 shadow-[0_14px_34px_rgba(16,185,129,0.08)] transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-100"
                  >
                    <PhoneCall className="h-4 w-4" />
                    WhatsApp {displayPhoneNumber}
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="group overflow-hidden rounded-[1.9rem] border border-[#D6E8FF] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(240,248,255,0.94))] p-6 shadow-[0_22px_70px_rgba(7,27,58,0.07)] transition duration-300 hover:-translate-y-1 hover:border-[#9CC8FF] hover:shadow-[0_30px_90px_rgba(29,78,216,0.12)] sm:p-7">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="max-w-xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.26em] text-sky-700">
                      Regional treatment access
                    </p>
                    <h3 className="mt-3 font-display text-2xl font-semibold tracking-[-0.03em] text-[#071B3A] sm:text-[2rem]">
                      A premium Central Asia to India medical tourism pathway
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                      Patients from Central Asia connect with expert doctors, trusted
                      hospitals in India, and complete care coordination through one
                      healthcare concierge team.
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    India Care Network
                  </div>
                </div>

                <div className="mt-6 rounded-[1.75rem] border border-white/70 bg-[linear-gradient(145deg,rgba(237,248,255,0.92),rgba(255,255,255,0.98))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] sm:p-5">
                  <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#0B2D64]">
                    <MapPin className="h-4 w-4 text-sky-700" />
                    Central Asia patient journey to India
                  </div>

                  <div className="grid gap-3 md:hidden">
                    <div className="flex flex-wrap gap-2">
                      {countryBadges.map((country) => (
                        <span
                          key={`${country.label}-mobile`}
                          className="inline-flex items-center gap-2 rounded-full border border-[#CFE4FF] bg-white px-3 py-2 text-xs font-semibold text-[#0B2D64]"
                        >
                          <MapPin className="h-3 w-3 text-emerald-600" />
                          {country.label}
                        </span>
                      ))}
                    </div>
                    <div className="rounded-3xl border border-[#CFE4FF] bg-white p-4 shadow-[0_14px_40px_rgba(29,78,216,0.08)]">
                      <div className="flex items-center gap-3">
                        <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#071B3A_0%,#1D4ED8_55%,#38BDF8_100%)] text-white">
                          <Hospital className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#071B3A]">
                            India Hospital Network
                          </p>
                          <p className="text-xs leading-6 text-slate-500">
                            Expert doctors, affordable treatment in India, and guided
                            coordination
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative hidden min-h-[19rem] md:block">
                    <div className="absolute inset-y-4 right-[6%] w-[27%] rounded-[2rem] border border-[#CFE4FF] bg-white/96 p-4 shadow-[0_16px_44px_rgba(29,78,216,0.1)]">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#071B3A_0%,#1D4ED8_55%,#38BDF8_100%)] text-white">
                        <Hospital className="h-5 w-5" />
                      </div>
                      <p className="mt-4 text-sm font-semibold text-[#071B3A]">
                        India Hospital Network
                      </p>
                      <p className="mt-2 text-xs leading-6 text-slate-500">
                        Specialist care, affordable treatment in India, and complete
                        travel support
                      </p>
                    </div>

                    {mapRouteLines.map((lineClassName) => (
                      <div
                        key={lineClassName}
                        className={cn(
                          "absolute h-px rounded-full bg-[linear-gradient(90deg,rgba(56,189,248,0.28),rgba(29,78,216,0.7),rgba(29,78,216,0))]",
                          lineClassName,
                        )}
                      />
                    ))}

                    {countryBadges.map((country) => (
                      <div
                        key={`${country.label}-visual`}
                        className={cn("absolute", country.visualClassName)}
                      >
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/96 px-3 py-2 text-xs font-semibold text-[#0B2D64] shadow-[0_14px_34px_rgba(29,78,216,0.08)]">
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                            <MapPin className="h-3.5 w-3.5" />
                          </span>
                          {country.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {supportFeatures.map((feature) => {
                  const Icon = feature.icon;

                  return (
                    <article
                      key={feature.title}
                      className="group rounded-[1.75rem] border border-[#D6E8FF] bg-white/92 p-5 shadow-[0_18px_44px_rgba(7,27,58,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[#9CC8FF] hover:shadow-[0_26px_70px_rgba(29,78,216,0.12)] sm:p-6"
                    >
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(180deg,rgba(239,246,255,0.96),rgba(255,255,255,0.98))] shadow-[inset_0_1px_0_rgba(255,255,255,0.88)]">
                        <Icon className={cn("h-5 w-5", feature.iconClassName)} />
                      </div>
                      <h3 className="mt-4 font-display text-xl font-semibold tracking-[-0.02em] text-[#071B3A]">
                        {feature.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">
                        {feature.description}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
