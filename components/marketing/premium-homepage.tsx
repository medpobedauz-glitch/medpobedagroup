"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  ClipboardList,
  FileSearch,
  Globe2,
  GraduationCap,
  Handshake,
  Hospital,
  Languages,
  MapPin,
  Plane,
  PhoneCall,
  ShieldCheck,
  Stethoscope,
  UserRound,
} from "lucide-react";

import { CTAButton } from "@/components/marketing/cta-button";
import { HomeContactSection } from "@/components/marketing/home-contact-section";
import { PremiumCard } from "@/components/marketing/premium-card";
import { FAQAccordion } from "@/components/shared/faq-accordion";
import { SectionHeader } from "@/components/marketing/section-header";
import { useMessages } from "@/lib/i18n";
import { getPremiumImage } from "@/lib/images";
import { easeOutExpo } from "@/lib/motion";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type PremiumHomePageProps = {
  honeypotField: string;
  submittedType?: string;
  hasError?: boolean;
};

type VisualAsset = {
  src: string;
  alt: string;
};

function image(category: string, slug: string, alt: string): VisualAsset {
  return getPremiumImage(category, slug, alt);
}

const heroImages = {
  consultation: image("home-hero", "doctor-patient-consultation", ""),
  hospital: image("home-hero", "premium-hospital-campus", ""),
  travel: image("home-hero", "airport-patient-assistance", ""),
};

const aboutVisuals = [
  image("about", "patient-family-guidance", ""),
  image("about", "hospital-corridor", ""),
  image("regions", "global-healthcare-bridge", ""),
] as const;

const serviceCardConfigs = [
  {
    icon: Plane,
    href: "/international-patient-care",
    image: image("services", "medical-tourism-facilitation", ""),
  },
  {
    icon: UserRound,
    href: "/international-patients",
    image: image("services", "international-patient-assistance", ""),
  },
  {
    icon: Hospital,
    href: "/hospitals",
    image: image("services", "hospital-collaboration", ""),
  },
  {
    icon: Globe2,
    href: "/international-patient-care",
    image: image("services", "medical-travel-coordination", ""),
  },
  {
    icon: Handshake,
    href: "/hospital-partnerships",
    image: image("services", "healthcare-partnership-development", ""),
  },
  {
    icon: GraduationCap,
    href: "/student-mobility",
    image: image("services", "student-mobility-clinical-exposure", ""),
  },
] as const;

const trustCardIcons = [Handshake, ShieldCheck, Building2, Languages] as const;
const scenarioCardIcons = [UserRound, Building2, GraduationCap, Handshake] as const;

const journeyStepIcons = [
  UserRound,
  FileSearch,
  Stethoscope,
  ClipboardList,
  Plane,
  MapPin,
  Hospital,
  CheckCircle2,
] as const;

const ctaBlockConfigs = {
  patient: {
    icon: UserRound,
    href: "/international-patients",
    image: image("patients", "family-health-support", ""),
    inset: image("patients", "medical-coordinator-desk", ""),
  },
  hospital: {
    icon: Building2,
    href: "/hospital-partnerships",
    image: image("partnerships", "hospital-partner-growth", ""),
    inset: image("partnerships", "doctor-faculty-exchange", ""),
  },
} as const;

const brandHubCardConfigs = [
  {
    icon: Plane,
    href: "/international-patient-care",
    image: image("services", "medical-tourism-facilitation", ""),
  },
  {
    icon: Stethoscope,
    href: "/treatment-in-india",
    image: image("medical-tourism-inner", "treatment-planning", ""),
  },
  {
    icon: Building2,
    href: "/kims-hospitals-india",
    image: image("partnerships", "hospital-partner-growth", ""),
  },
  {
    icon: Handshake,
    href: "/hospital-partnerships",
    image: image("partnerships", "medical-tourism-desk-support", ""),
  },
  {
    icon: UserRound,
    href: "/international-patients",
    image: image("patients", "medical-coordinator-desk", ""),
  },
  {
    icon: MapPin,
    href: "/contact",
    image: image("contact-trust", "tashkent-coordination-base", ""),
  },
] as const;

function ImageFrame({
  asset,
  className,
  aspectClassName = "aspect-[4/3]",
  priority = false,
  sizes = "(min-width: 1280px) 28vw, (min-width: 768px) 40vw, 100vw",
}: {
  asset: VisualAsset;
  className?: string;
  aspectClassName?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div
      className={cn(
        "group overflow-hidden rounded-[2rem] border border-[#D6E8FF] bg-white shadow-[0_24px_80px_rgba(7,27,58,0.08)]",
        className,
      )}
    >
      <div className={cn("relative overflow-hidden", aspectClassName)}>
        <Image
          src={asset.src}
          alt={asset.alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover transition duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(7,27,58,0.12)_48%,rgba(7,27,58,0.26)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.18),transparent_22%)]" />
      </div>
    </div>
  );
}

export function PremiumHomePage({
  honeypotField,
  submittedType,
  hasError = false,
}: PremiumHomePageProps) {
  const messages = useMessages();
  const page = messages.pages.home;
  const internationalPatientCareLabel = messages.chrome.navigation.medicalTourism;

  const serviceCards = serviceCardConfigs.map((config, index) => ({
    ...config,
    ...page.services.items[index],
    title: index === 0 ? internationalPatientCareLabel : page.services.items[index]?.title,
    description:
      index === 0
        ? "Structured hospital coordination, doctor matching, medical report review, and treatment planning for patients heading to India."
        : page.services.items[index]?.description,
    image: {
      ...config.image,
      alt:
        (index === 0 ? internationalPatientCareLabel : page.services.items[index]?.title) ??
        config.image.alt,
    },
  }));

  const trustCards = trustCardIcons.map((Icon, index) => ({
    icon: Icon,
    eyebrow: page.trustStats.stats[index]?.value,
    title: page.trustStats.stats[index]?.label,
    description: page.trustStats.stats[index]?.description,
  }));

  const journeySteps = journeyStepIcons.map((Icon, index) => ({
    icon: Icon,
    ...page.journey.items[index],
  }));
  const scenarioCards = scenarioCardIcons.map((Icon, index) => ({
    icon: Icon,
    ...page.scenarios.items[index],
  }));

  const localizedHeroImages = {
    consultation: {
      ...heroImages.consultation,
      alt: page.hero.imageAlts[0],
    },
    hospital: {
      ...heroImages.hospital,
      alt: page.hero.imageAlts[1],
    },
    travel: {
      ...heroImages.travel,
      alt: page.hero.imageAlts[2],
    },
  };

  const localizedAboutVisuals = aboutVisuals.map((asset, index) => ({
    ...asset,
    alt:
      page.about.imageAlts[index] ??
      (index === 2 ? page.regions.imageAlt : asset.alt),
  }));

  const patientHighlights = page.internationalPatients.items.slice(0, 3);
  const hospitalHighlights = page.partnerships.items.slice(0, 3);
  const PatientCtaIcon = ctaBlockConfigs.patient.icon;
  const HospitalCtaIcon = ctaBlockConfigs.hospital.icon;
  const brandHubCards = brandHubCardConfigs.map((config, index) => ({
    ...config,
    ...page.brandHub.items[index],
    title: index === 0 ? internationalPatientCareLabel : page.brandHub.items[index]?.title,
    description:
      index === 0
        ? "The main route for free medical opinions, hospital selection, treatment cost estimates, and patient care coordination in India."
        : page.brandHub.items[index]?.description,
    image: {
      ...config.image,
      alt:
        (index === 0 ? internationalPatientCareLabel : page.brandHub.items[index]?.title) ??
        config.image.alt,
    },
  }));
  const brandFactIcons = [Building2, MapPin, PhoneCall, Globe2] as const;
  const brandFactValues = [
    siteConfig.legalName,
    siteConfig.location,
    siteConfig.contactPhone,
    siteConfig.website,
  ];

  return (
    <>
      <section className="relative overflow-hidden px-4 pb-6 pt-4 sm:px-6 sm:pb-8 sm:pt-6 lg:px-8">
        <div className="container-wide">
          <div className="section-frame overflow-hidden px-4 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14">
            <div className="pointer-events-none absolute -left-12 top-8 h-52 w-52 rounded-full bg-[#E0F2FE]/80 blur-3xl" />
            <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-[#DBEAFE]/70 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 left-1/3 h-52 w-52 rounded-full bg-[#E0F7FA]/70 blur-3xl" />

            <div className="relative grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]">
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: easeOutExpo }}
              >
                <div className="flex flex-wrap gap-3">
                  {page.hero.badges.map((item) => (
                    <span key={item} className="glass-badge">
                      {item}
                    </span>
                  ))}
                </div>

                <h1 className="mt-7 max-w-3xl text-balance font-display text-3xl font-semibold leading-[1.08] tracking-[-0.035em] text-[#0B1F4D] sm:text-5xl lg:text-[4.75rem]">
                  {page.hero.title}
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-8 text-[#475569] sm:text-[1.05rem]">
                  {page.hero.description}
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <CTAButton
                    href="/international-patient-care"
                    label={page.hero.primaryCta}
                    variant="hero"
                    size="2xl"
                    icon="arrow-right"
                  />
                  <CTAButton
                    href="/hospital-partnerships"
                    label={page.hero.secondaryCta}
                    variant="surface"
                    size="2xl"
                    icon="arrow-up-right"
                    className="border-[#C7DCF9] bg-white/92 text-[#0B1F4D]"
                  />
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  {page.hero.infoCards.map((item) => (
                    <div
                      key={item}
                      className="rounded-full border border-[#D6E8FF] bg-white/88 px-3.5 py-2.5 text-xs font-semibold text-[#0B1F4D] shadow-[0_14px_36px_rgba(7,27,58,0.06)] backdrop-blur-xl sm:px-4 sm:py-3 sm:text-sm"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {page.hero.stats.map((item) => (
                    <div
                      key={item.value}
                      className="rounded-[1.6rem] border border-[#D6E8FF] bg-white/88 p-4 shadow-[0_18px_48px_rgba(7,27,58,0.06)] backdrop-blur-xl"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#1D4ED8]">
                        {item.value}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-[#0B1F4D]">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.08, ease: easeOutExpo }}
                className="relative"
              >
                <div className="relative mx-auto max-w-[42rem]">
                  <div className="absolute inset-x-8 -top-5 h-24 rounded-full bg-[#38BDF8]/18 blur-3xl" />
                  <div className="section-frame-soft p-3 sm:p-4">
                    <div className="relative overflow-hidden rounded-[2.2rem]">
                      <div className="relative aspect-[5/6] lg:aspect-[10/11]">
                        <Image
                          src={localizedHeroImages.consultation.src}
                          alt={localizedHeroImages.consultation.alt}
                          fill
                          priority
                          sizes="(min-width: 1280px) 38vw, (min-width: 1024px) 44vw, 100vw"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(11,31,77,0.08)_50%,rgba(11,31,77,0.3)_100%)]" />
                      </div>
                    </div>
                  </div>

                  <div className="absolute -left-3 bottom-6 hidden w-56 rounded-[1.6rem] border border-[#D6E8FF] bg-white/92 p-4 shadow-[0_24px_60px_rgba(11,31,77,0.12)] backdrop-blur-xl lg:block">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#1D4ED8]">
                      {page.hero.accent.eyebrow}
                    </p>
                    <p className="mt-3 font-display text-2xl font-semibold text-[#0B1F4D]">
                      {page.hero.accent.title}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[#475569]">
                      {page.hero.accent.description}
                    </p>
                  </div>

                  <div className="absolute -right-3 top-6 hidden w-52 rounded-[1.8rem] border border-[#D6E8FF] bg-white/92 p-3 shadow-[0_24px_60px_rgba(11,31,77,0.12)] backdrop-blur-xl lg:block">
                    <div className="relative overflow-hidden rounded-[1.4rem] border border-[#E3EEFF]">
                      <Image
                        src={localizedHeroImages.hospital.src}
                        alt={localizedHeroImages.hospital.alt}
                        width={640}
                        height={480}
                        className="aspect-[4/3] w-full object-cover"
                      />
                    </div>
                    <p className="mt-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#1D4ED8]">
                      {messages.chrome.navigation.hospitals}
                    </p>
                    <p className="mt-1 text-sm font-semibold leading-6 text-[#0B1F4D]">
                      {page.regions.mapLabels[0]} • {page.regions.mapLabels[1]}
                    </p>
                  </div>

                  <div className="absolute bottom-4 right-8 hidden items-center gap-3 rounded-[1.7rem] border border-[#D6E8FF] bg-white/92 p-3 shadow-[0_24px_70px_rgba(29,78,216,0.12)] backdrop-blur-xl xl:flex">
                    <div className="relative h-20 w-20 overflow-hidden rounded-[1.2rem] border border-[#E3EEFF]">
                      <Image
                        src={localizedHeroImages.travel.src}
                        alt={localizedHeroImages.travel.alt}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div className="max-w-[10rem]">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#1D4ED8]">
                        {page.services.items[3]?.title}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[#475569]">
                        {page.journey.items[5]?.title}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell-compact pt-2">
        <div className="container-wide">
          <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
            <div className="panel-stack">
              <SectionHeader
                eyebrow={page.trustStats.eyebrow}
                title={page.trustStats.title}
                description={page.trustStats.description}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {trustCards.map((item, index) => {
                const Icon = item.icon;

                return (
                  <PremiumCard key={item.title} className="p-6 sm:p-7" delay={index * 0.05}>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#0B1F4D,#1D4ED8,#38BDF8)] text-white shadow-[0_18px_50px_rgba(29,78,216,0.18)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-[#1D4ED8]">
                      {item.eyebrow}
                    </p>
                    <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-[#0B1F4D]">
                      {item.title}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-[#475569]">
                      {item.description}
                    </p>
                  </PremiumCard>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="container-wide">
          <div className="grid gap-6 xl:grid-cols-[1.18fr_0.82fr]">
            <div>
              <SectionHeader
                eyebrow={page.brandHub.eyebrow}
                title={page.brandHub.title}
                description={page.brandHub.description}
              />

              <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {brandHubCards.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <PremiumCard
                      key={item.title}
                      className="flex h-full flex-col p-5 sm:p-6"
                      delay={index * 0.04}
                    >
                      <div className="relative overflow-hidden rounded-[1.7rem] border border-[#D6E8FF] bg-white shadow-[0_18px_40px_rgba(7,27,58,0.06)]">
                        <div className="absolute left-4 top-4 z-[1] inline-flex items-center gap-2 rounded-full bg-white/92 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#1D4ED8] shadow-[0_10px_24px_rgba(7,27,58,0.08)]">
                          <Icon className="h-3.5 w-3.5" />
                          {page.brandHub.cardEyebrow}
                        </div>
                        <Image
                          src={item.image.src}
                          alt={item.image.alt}
                          width={900}
                          height={600}
                          className="aspect-[16/10] w-full object-cover"
                        />
                      </div>
                      <h2 className="mt-5 text-xl font-semibold tracking-[-0.03em] text-[#0B1F4D]">
                        {item.title}
                      </h2>
                      <p className="mt-3 flex-1 text-sm leading-7 text-[#475569]">
                        {item.description}
                      </p>
                      <Link
                        href={item.href}
                        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#1D4ED8] transition hover:gap-3 hover:text-[#0B1F4D]"
                      >
                        {messages.buttons.learnMore}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </PremiumCard>
                  );
                })}
              </div>
            </div>

            <div className="section-frame-accent p-6 sm:p-8">
              <SectionHeader
                eyebrow={page.brandHub.factsEyebrow}
                title={page.brandHub.factsTitle}
                description={page.brandHub.factsDescription}
              />

              <div className="mt-8 grid gap-4">
                {page.brandHub.facts.map((item, index) => {
                  const Icon = brandFactIcons[index] ?? Building2;
                  const value = brandFactValues[index] ?? "";

                  return (
                    <div
                      key={item.label}
                      className="rounded-[1.5rem] border border-[#D6E8FF] bg-white/90 p-4 shadow-[0_18px_48px_rgba(7,27,58,0.06)]"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#0B1F4D,#1D4ED8)] text-white">
                          <Icon className="h-4.5 w-4.5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#1D4ED8]">
                            {item.label}
                          </p>
                          {index === 2 ? (
                            <a
                              href={`tel:${siteConfig.contactPhone.replace(/\s+/g, "")}`}
                              className="mt-2 block text-base font-semibold text-[#0B1F4D] transition hover:text-[#1D4ED8]"
                            >
                              {value}
                            </a>
                          ) : index === 3 ? (
                            <a
                              href={siteConfig.siteUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="mt-2 block break-all text-base font-semibold text-[#0B1F4D] transition hover:text-[#1D4ED8]"
                            >
                              {value}
                            </a>
                          ) : (
                            <p className="mt-2 text-base font-semibold text-[#0B1F4D]">
                              {value}
                            </p>
                          )}
                          <p className="mt-2 text-sm leading-7 text-[#475569]">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="container-wide">
          <div className="grid items-center gap-8 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="grid gap-4 sm:grid-cols-[1.08fr_0.92fr]">
              <ImageFrame
                asset={localizedAboutVisuals[0]}
                aspectClassName="aspect-[4/5]"
                priority
              />
              <div className="grid gap-4">
                <ImageFrame asset={localizedAboutVisuals[1]} aspectClassName="aspect-[4/3]" />
                <ImageFrame asset={localizedAboutVisuals[2]} aspectClassName="aspect-[4/3]" />
              </div>
            </div>

            <div>
              <SectionHeader
                eyebrow={page.about.eyebrow}
                title={page.about.title}
                description={page.about.description}
              />
              <p className="mt-6 max-w-2xl text-base leading-8 text-[#475569]">
                {page.about.body}
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {page.about.badges.map((item) => (
                  <div
                    key={item}
                    className="inline-flex items-center gap-3 rounded-full border border-[#D6E8FF] bg-white px-4 py-3 text-sm font-semibold text-[#0B1F4D] shadow-[0_14px_40px_rgba(7,27,58,0.06)]"
                  >
                    <BadgeCheck className="h-4 w-4 text-[#1D4ED8]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="container-wide">
          <SectionHeader
            eyebrow={page.services.eyebrow}
            title={page.services.title}
            description={page.services.description}
            align="center"
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {serviceCards.map((service, index) => {
              const Icon = service.icon;

              return (
                <PremiumCard key={service.title} className="p-5 sm:p-6" delay={index * 0.05}>
                  <div className="relative overflow-hidden rounded-[1.7rem] border border-[#D6E8FF] bg-white shadow-[0_18px_40px_rgba(7,27,58,0.06)]">
                    <div className="absolute left-4 top-4 z-[1] inline-flex items-center gap-2 rounded-full bg-white/92 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#1D4ED8] shadow-[0_10px_24px_rgba(7,27,58,0.08)]">
                      <Icon className="h-3.5 w-3.5" />
                      {page.services.eyebrow}
                    </div>
                    <Image
                      src={service.image.src}
                      alt={service.image.alt}
                      width={900}
                      height={600}
                      className="aspect-[16/10] w-full object-cover"
                    />
                  </div>

                  <h2 className="mt-5 font-display text-[1.65rem] font-semibold tracking-[-0.04em] text-[#0B1F4D]">
                    {service.title}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-[#475569]">{service.description}</p>

                  <Link
                    href={service.href}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#1D4ED8] transition hover:gap-3 hover:text-[#0B1F4D]"
                  >
                    {messages.buttons.learnMore}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </PremiumCard>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-wide">
          <div className="section-frame-soft px-4 py-8 sm:px-8 lg:px-10 lg:py-12">
            <SectionHeader
              eyebrow={page.journey.eyebrow}
              title={page.journey.title}
              description={page.journey.description}
              align="center"
            />

            <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {journeySteps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <PremiumCard key={step.title} className="p-5" delay={index * 0.04}>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#0B1F4D,#1D4ED8,#38BDF8)] text-white shadow-[0_18px_50px_rgba(29,78,216,0.18)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-[#1D4ED8]">
                      {messages.components.premiumSteps.stepLabel} {index + 1}
                    </p>
                    <h2 className="mt-2 text-lg font-semibold text-[#0B1F4D]">{step.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-[#475569]">
                      {step.description}
                    </p>
                  </PremiumCard>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="container-wide">
          <div className="grid gap-6 lg:grid-cols-[0.96fr_1.04fr]">
            <div className="section-frame-accent p-6 sm:p-8">
              <SectionHeader
                eyebrow={page.regions.eyebrow}
                title={page.regions.title}
                description={page.regions.description}
              />

              <div className="mt-8 overflow-hidden rounded-[2rem] border border-[#D6E8FF] bg-white/80 p-3 sm:p-4 shadow-[0_24px_80px_rgba(56,189,248,0.14)]">
                <div className="relative min-h-[18rem] overflow-hidden rounded-[1.7rem] sm:min-h-[22rem]">
                  <Image
                    src={image("regions", "global-healthcare-bridge", page.regions.imageAlt).src}
                    alt={page.regions.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 36vw, 100vw"
                    className="object-cover opacity-30"
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.76),rgba(239,246,255,0.78),rgba(219,234,254,0.72))]" />
                  <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#9CC8FF] bg-[radial-gradient(circle,rgba(255,255,255,0.96),rgba(224,242,254,0.74),rgba(191,219,254,0.32))] sm:h-72 sm:w-72" />
                  <div className="absolute left-1/2 top-1/2 hidden h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#BFD7FF] sm:block" />
                  <div className="absolute left-[10%] top-[18%] hidden rounded-full bg-white px-3 py-2 text-xs font-semibold text-[#0B1F4D] shadow-[0_14px_40px_rgba(7,27,58,0.08)] sm:block sm:text-sm">
                    {page.regions.mapLabels[0]}
                  </div>
                  <div className="absolute right-[10%] top-[22%] hidden rounded-full bg-white px-3 py-2 text-xs font-semibold text-[#0B1F4D] shadow-[0_14px_40px_rgba(7,27,58,0.08)] sm:block sm:text-sm">
                    {page.regions.mapLabels[1]}
                  </div>
                  <div className="absolute left-[16%] bottom-[18%] hidden rounded-full bg-white px-3 py-2 text-xs font-semibold text-[#0B1F4D] shadow-[0_14px_40px_rgba(7,27,58,0.08)] sm:block sm:text-sm">
                    {page.regions.mapLabels[2]}
                  </div>
                  <div className="absolute right-[14%] bottom-[14%] hidden rounded-full bg-white px-3 py-2 text-xs font-semibold text-[#0B1F4D] shadow-[0_14px_40px_rgba(7,27,58,0.08)] sm:block sm:text-sm">
                    {page.regions.mapLabels[3]}
                  </div>
                </div>
                <div className="mt-3 grid gap-2 sm:hidden">
                  {page.regions.mapLabels.map((label) => (
                    <div
                      key={label}
                      className="rounded-full border border-[#D6E8FF] bg-white px-3 py-2 text-center text-xs font-semibold text-[#0B1F4D] shadow-[0_10px_24px_rgba(7,27,58,0.06)]"
                    >
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {page.regions.items.map((region, index) => (
                <PremiumCard key={region.title} className="p-5" delay={index * 0.04}>
                  <p className="text-lg font-semibold text-[#0B1F4D]">{region.title}</p>
                  <p className="mt-3 text-sm leading-7 text-[#475569]">
                    {region.description}
                  </p>
                </PremiumCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="container-wide">
          <SectionHeader
            eyebrow={page.scenarios.eyebrow}
            title={page.scenarios.title}
            description={page.scenarios.description}
            align="center"
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {scenarioCards.map((item, index) => {
              const Icon = item.icon;

              return (
                <PremiumCard key={item.title} className="p-6 sm:p-7" delay={index * 0.04}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#0B1F4D,#1D4ED8,#38BDF8)] text-white shadow-[0_18px_50px_rgba(29,78,216,0.18)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="mt-5 text-xl font-semibold tracking-[-0.03em] text-[#0B1F4D]">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-[#475569]">
                    {item.description}
                  </p>
                </PremiumCard>
              );
            })}
          </div>
        </div>
      </section>

      <FAQAccordion
        eyebrow={page.brandFaq.eyebrow}
        title={page.brandFaq.title}
        description={page.brandFaq.description}
        items={page.brandFaq.items}
      />

      <section className="section-shell pt-0">
        <div className="container-wide">
          <SectionHeader
            eyebrow={page.ctaBlocks.eyebrow}
            title={page.ctaBlocks.title}
            description={page.ctaBlocks.description}
            align="center"
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <PremiumCard className="p-5 sm:p-6">
              <div className="grid gap-6 lg:grid-cols-[1.04fr_0.96fr]">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#0B1F4D,#1D4ED8)] text-white">
                    <PatientCtaIcon className="h-5 w-5" />
                  </div>
                  <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.04em] text-[#0B1F4D]">
                    {page.ctaBlocks.patient.title}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-[#475569]">
                    {page.ctaBlocks.patient.description}
                  </p>
                  <div className="mt-6 grid gap-3">
                    {patientHighlights.map((item) => (
                      <div
                        key={item.title}
                        className="rounded-[1.4rem] border border-[#D6E8FF] bg-white/86 px-4 py-3 text-sm font-medium text-[#0B1F4D]"
                      >
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#1D4ED8]" />
                          <span>{item.title}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <CTAButton
                    href={ctaBlockConfigs.patient.href}
                    label={page.ctaBlocks.patient.button}
                    variant="hero"
                    className="mt-7 w-full justify-center sm:w-auto"
                    icon="arrow-right"
                  />
                </div>
                <div className="grid gap-4">
                  <ImageFrame
                    asset={{
                      ...ctaBlockConfigs.patient.image,
                      alt: page.internationalPatients.featureImageAlts[1],
                    }}
                    aspectClassName="aspect-[4/3]"
                    sizes="(min-width: 1280px) 20vw, 100vw"
                  />
                  <ImageFrame
                    asset={{
                      ...ctaBlockConfigs.patient.inset,
                      alt: page.internationalPatients.featureImageAlts[2],
                    }}
                    aspectClassName="aspect-[4/3]"
                    sizes="(min-width: 1280px) 20vw, 100vw"
                  />
                </div>
              </div>
            </PremiumCard>

            <PremiumCard className="p-5 sm:p-6">
              <div className="grid gap-6 lg:grid-cols-[1.04fr_0.96fr]">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#0B1F4D,#1D4ED8)] text-white">
                    <HospitalCtaIcon className="h-5 w-5" />
                  </div>
                  <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.04em] text-[#0B1F4D]">
                    {page.ctaBlocks.hospital.title}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-[#475569]">
                    {page.ctaBlocks.hospital.description}
                  </p>
                  <div className="mt-6 grid gap-3">
                    {hospitalHighlights.map((item) => (
                      <div
                        key={item.title}
                        className="rounded-[1.4rem] border border-[#D6E8FF] bg-white/86 px-4 py-3 text-sm font-medium text-[#0B1F4D]"
                      >
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#1D4ED8]" />
                          <span>{item.title}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <CTAButton
                    href={ctaBlockConfigs.hospital.href}
                    label={page.ctaBlocks.hospital.button}
                    variant="hero"
                    className="mt-7 w-full justify-center sm:w-auto"
                    icon="arrow-right"
                  />
                </div>
                <div className="grid gap-4">
                  <ImageFrame
                    asset={{
                      ...ctaBlockConfigs.hospital.image,
                      alt: page.partnerships.imageAlt,
                    }}
                    aspectClassName="aspect-[4/3]"
                    sizes="(min-width: 1280px) 20vw, 100vw"
                  />
                  <ImageFrame
                    asset={{
                      ...ctaBlockConfigs.hospital.inset,
                      alt: page.about.imageAlts[3],
                    }}
                    aspectClassName="aspect-[4/3]"
                    sizes="(min-width: 1280px) 20vw, 100vw"
                  />
                </div>
              </div>
            </PremiumCard>
          </div>
        </div>
      </section>

      <HomeContactSection
        honeypotField={honeypotField}
        submittedType={submittedType}
        hasError={hasError}
      />
    </>
  );
}
