"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Activity,
  Ambulance,
  ArrowRight,
  ArrowUpRight,
  Baby,
  BadgeCheck,
  Bone,
  Brain,
  BriefcaseMedical,
  Building2,
  CheckCircle2,
  ClipboardList,
  FileSearch,
  Globe2,
  GraduationCap,
  Handshake,
  HeartPulse,
  Hospital,
  Languages,
  MapPin,
  Microscope,
  Plane,
  ShieldCheck,
  Stethoscope,
  UserRound,
  Users,
} from "lucide-react";

import { AnimatedCounter } from "@/components/shared/animated-counter";
import { CTAButton } from "@/components/marketing/cta-button";
import { HomeContactSection } from "@/components/marketing/home-contact-section";
import { PremiumCard } from "@/components/marketing/premium-card";
import { SectionHeader } from "@/components/marketing/section-header";
import { getPremiumImage } from "@/lib/images";
import { easeOutExpo } from "@/lib/motion";
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
  consultation: image(
    "home-hero",
    "doctor-patient-consultation",
    "Doctor consulting an international patient in a premium hospital setting.",
  ),
  hospital: image(
    "home-hero",
    "premium-hospital-campus",
    "Modern hospital exterior representing international healthcare access.",
  ),
  travel: image(
    "home-hero",
    "airport-patient-assistance",
    "Medical coordinator assisting an international patient with arrival support.",
  ),
};

const aboutImages = [
  image("about", "hospital-executive-meeting", "Healthcare leaders discussing collaboration in a premium meeting room."),
  image("about", "patient-family-guidance", "Patient family receiving treatment guidance from a medical coordinator."),
  image("about", "hospital-corridor", "Bright private hospital corridor with premium clinical design."),
  image("about", "doctor-roundtable", "Doctors in an international healthcare strategy meeting."),
];

const serviceCards = [
  {
    icon: Plane,
    title: "Medical Tourism Facilitation",
    description:
      "Complete support for international patients seeking treatment abroad, including hospital coordination, appointment assistance, medical opinion support, travel guidance, and treatment planning.",
    href: "/medical-tourism",
    image: image("services", "medical-tourism-facilitation", "International medical travel planning consultation."),
  },
  {
    icon: Hospital,
    title: "Hospital Collaboration",
    description:
      "Partnership support between hospitals for patient referrals, clinical cooperation, training programs, research, and healthcare exchange.",
    href: "/hospital-partnerships",
    image: image("services", "hospital-collaboration", "Hospital collaboration discussion between executives and clinicians."),
  },
  {
    icon: UserRound,
    title: "International Patient Assistance",
    description:
      "Personalized support for patients from first inquiry to hospital appointment, treatment planning, travel coordination, interpretation, and post-treatment follow-up.",
    href: "/international-patients",
    image: image("services", "international-patient-assistance", "Patient coordinator supporting an international family."),
  },
  {
    icon: GraduationCap,
    title: "Student Mobility & Clinical Exposure",
    description:
      "Supporting medical students and institutions through clinical exposure, hospital visits, internships, observerships, and academic-healthcare collaboration.",
    href: "/student-mobility",
    image: image("services", "student-mobility-clinical-exposure", "Medical students in structured clinical exposure and hospital observation."),
  },
  {
    icon: Handshake,
    title: "Healthcare Partnership Development",
    description:
      "Helping hospitals, universities, and healthcare companies build international collaborations, MoUs, joint programs, and strategic medical partnerships.",
    href: "/hospital-partnerships",
    image: image("services", "healthcare-partnership-development", "Healthcare partnership leaders discussing cross-border growth."),
  },
  {
    icon: Globe2,
    title: "Medical Travel Coordination",
    description:
      "Support for airport pickup, accommodation guidance, interpreter arrangement, hospital appointment scheduling, and local patient assistance.",
    href: "/contact",
    image: image("services", "medical-travel-coordination", "Arrival, stay, and logistics support for international patients."),
  },
];

const journeySteps = [
  { icon: UserRound, title: "Patient Inquiry", description: "Initial contact and treatment requirement sharing." },
  { icon: FileSearch, title: "Medical Report Review", description: "Case materials assessed for practical next steps." },
  { icon: Stethoscope, title: "Hospital & Doctor Matching", description: "Specialty, doctor, and hospital options aligned to the case." },
  { icon: ClipboardList, title: "Treatment Plan & Cost Estimate", description: "Indicative planning and coordination preparation." },
  { icon: Plane, title: "Visa & Travel Guidance", description: "Travel readiness, documentation, and itinerary support." },
  { icon: MapPin, title: "Arrival & Hospital Assistance", description: "Airport guidance and in-country patient support." },
  { icon: Hospital, title: "Treatment Coordination", description: "Practical hospital-side communication and follow-through." },
  { icon: CheckCircle2, title: "Follow-Up Support", description: "Post-treatment communication and coordination continuity." },
];

const partnershipCards = [
  {
    icon: Users,
    title: "International Patient Referrals",
    description: "Support structured cross-border referral pathways and patient access programs.",
    image: image("partnerships", "international-patient-referrals", "Hospital teams reviewing international patient referrals."),
  },
  {
    icon: Building2,
    title: "Medical Tourism Desk Support",
    description: "Shape patient-facing medical tourism workflows with stronger coordination and responsiveness.",
    image: image("partnerships", "medical-tourism-desk-support", "Hospital international desk and medical tourism operations."),
  },
  {
    icon: Handshake,
    title: "Doctor & Faculty Exchange",
    description: "Encourage collaboration through specialist dialogue, visiting faculty, and professional exchange.",
    image: image("partnerships", "doctor-faculty-exchange", "Doctors and faculty members in international collaboration."),
  },
  {
    icon: GraduationCap,
    title: "Clinical Training Programs",
    description: "Develop observerships, hospital exposure, and structured clinical training relationships.",
    image: image("partnerships", "clinical-training-programs", "Clinical training group inside a modern hospital environment."),
  },
  {
    icon: Microscope,
    title: "Research & Conferences",
    description: "Coordinate academic exchange, research collaboration, and conference participation support.",
    image: image("partnerships", "research-and-conferences", "Healthcare conference and research collaboration setting."),
  },
  {
    icon: BadgeCheck,
    title: "Hospital Branding Abroad",
    description: "Support visibility, partner positioning, and international reputation building in new markets.",
    image: image("partnerships", "hospital-branding-abroad", "Hospital brand presentation for international healthcare audiences."),
  },
];

const patientSupportCards = [
  {
    icon: ShieldCheck,
    title: "Treatment Guidance",
    description: "Structured support from inquiry stage to decision clarity.",
    image: image("patients", "treatment-guidance", "Doctor and patient reviewing treatment options."),
  },
  {
    icon: Hospital,
    title: "Hospital Appointment",
    description: "Appointment planning and scheduling support with partner institutions.",
    image: image("patients", "hospital-appointment", "Patient registration and hospital appointment coordination."),
  },
  {
    icon: Stethoscope,
    title: "Doctor Selection",
    description: "Specialist matching based on the patient journey and treatment need.",
    image: image("patients", "doctor-selection", "Healthcare specialist consultation planning."),
  },
  {
    icon: Plane,
    title: "Travel & Stay Support",
    description: "Guidance for medical travel, airport reception, and accommodation planning.",
    image: image("patients", "travel-and-stay-support", "International patient arrival and accommodation support."),
  },
  {
    icon: Languages,
    title: "Language Assistance",
    description: "Interpretation and cross-cultural communication support where required.",
    image: image("patients", "language-assistance", "Interpreter support during medical consultation."),
  },
  {
    icon: CheckCircle2,
    title: "Follow-up Coordination",
    description: "Post-treatment communication continuity and practical case follow-through.",
    image: image("patients", "follow-up-coordination", "Follow-up check-in between coordinator and patient family."),
  },
];

const collaborationAreas = [
  {
    icon: HeartPulse,
    title: "Cardiology",
    description: "Coordinated access to advanced heart care and consultation pathways.",
    image: image("specialties", "cardiology", "Cardiology consultation and heart care environment."),
  },
  {
    icon: Activity,
    title: "Oncology",
    description: "Specialist coordination for cancer diagnosis, treatment planning, and review support.",
    image: image("specialties", "oncology", "Oncology care and multidisciplinary case review."),
  },
  {
    icon: Bone,
    title: "Orthopedics",
    description: "Support for bone, joint, mobility, and rehabilitation-oriented care journeys.",
    image: image("specialties", "orthopedics", "Orthopedic consultation and mobility-focused treatment."),
  },
  {
    icon: Brain,
    title: "Neurosurgery",
    description: "Facilitation for neurological assessment and neurosurgical referral planning.",
    image: image("specialties", "neurosurgery", "Neurosurgery planning and advanced clinical review."),
  },
  {
    icon: Stethoscope,
    title: "Dentistry",
    description: "Dental treatment coordination for restorative, surgical, and specialist care.",
    image: image("specialties", "dentistry", "Premium dental consultation and treatment planning."),
  },
  {
    icon: Users,
    title: "Fertility & IVF",
    description: "Patient-centered coordination for family-building support and IVF pathways.",
    image: image("specialties", "fertility-ivf", "Fertility clinic discussion and IVF coordination."),
  },
  {
    icon: BriefcaseMedical,
    title: "General Surgery",
    description: "Surgical coordination support across routine and advanced care requirements.",
    image: image("specialties", "general-surgery", "General surgery planning in a premium hospital environment."),
  },
  {
    icon: Microscope,
    title: "Diagnostics",
    description: "Second opinions, investigations, and structured diagnostic review assistance.",
    image: image("specialties", "diagnostics", "Diagnostic imaging and laboratory collaboration."),
  },
  {
    icon: Users,
    title: "Rehabilitation",
    description: "Recovery-focused planning for therapy, mobility, and functional improvement support.",
    image: image("specialties", "rehabilitation", "Rehabilitation care and recovery planning."),
  },
  {
    icon: Baby,
    title: "Pediatrics",
    description: "Warm patient coordination for children and family-centered treatment journeys.",
    image: image("specialties", "pediatrics", "Pediatric care and family support environment."),
  },
  {
    icon: HeartPulse,
    title: "Gynecology",
    description: "Women’s health coordination with privacy, clarity, and trusted communication.",
    image: image("specialties", "gynecology", "Gynecology consultation and care coordination."),
  },
  {
    icon: Ambulance,
    title: "Emergency Care",
    description: "Urgent case facilitation and emergency referral support where appropriate.",
    image: image("specialties", "emergency-care", "Emergency care and coordinated medical response."),
  },
];

const whyChooseItems = [
  "India–Uzbekistan healthcare connection",
  "Hospital partnership experience",
  "Multilingual coordination",
  "Patient-first support",
  "Transparent communication",
  "Institutional collaboration approach",
  "Medical tourism growth strategy",
  "End-to-end assistance",
];

const regions = [
  { title: "Uzbekistan", description: "Local operating presence for healthcare partnerships and patient coordination." },
  { title: "India", description: "A major destination for treatment access, specialist consultation, and hospital collaboration." },
  { title: "Central Asia", description: "Regional healthcare facilitation support for patients, institutions, and hospitals." },
  { title: "South Asia", description: "Cross-border healthcare growth opportunities and academic collaboration routes." },
  { title: "Middle East", description: "Partnership-oriented healthcare outreach and international patient facilitation." },
  { title: "International Patients", description: "Patient and family support pathways for cross-border care planning." },
];

const testimonials = [
  {
    name: "A. Karimova",
    role: "Hospital Partner",
    quote:
      "The communication approach feels structured and internationally ready. It supports partnership discussions without losing the healthcare seriousness we need.",
    image: image("testimonials", "hospital-partner", "Healthcare partner testimonial."),
  },
  {
    name: "R. Sharma",
    role: "International Patient",
    quote:
      "The experience feels guided from inquiry to hospital coordination. The information flow is calm, clear, and reassuring for families.",
    image: image("testimonials", "international-patient", "International patient testimonial."),
  },
  {
    name: "M. Yuldashev",
    role: "Medical Student",
    quote:
      "The institutional approach gives more confidence when discussing observerships and mobility opportunities linked to clinical exposure.",
    image: image("testimonials", "medical-student", "Medical student testimonial."),
  },
  {
    name: "S. Ahmed",
    role: "Healthcare Coordinator",
    quote:
      "The brand presentation now reflects the kind of premium trust international healthcare relationships require from the first interaction.",
    image: image("testimonials", "healthcare-coordinator", "Healthcare coordinator testimonial."),
  },
];

const galleryImages = [
  { category: "gallery", slug: "hospital-lobby", title: "Hospitals", aspect: "aspect-[4/5]" },
  { category: "gallery", slug: "doctor-rounds", title: "Doctors", aspect: "aspect-[4/3]" },
  { category: "gallery", slug: "patient-support-desk", title: "Patient Support", aspect: "aspect-[4/5]" },
  { category: "gallery", slug: "medical-airport-arrival", title: "Medical Travel", aspect: "aspect-[16/10]" },
  { category: "gallery", slug: "executive-partnership-meeting", title: "Partnerships", aspect: "aspect-[4/3]" },
  { category: "gallery", slug: "student-hospital-visit", title: "Student Mobility", aspect: "aspect-[4/5]" },
  { category: "gallery", slug: "operating-theatre-prep", title: "Clinical Support", aspect: "aspect-[4/3]" },
  { category: "gallery", slug: "family-consultation", title: "Patient Care", aspect: "aspect-[4/5]" },
  { category: "gallery", slug: "laboratory-diagnostics", title: "Diagnostics", aspect: "aspect-[16/10]" },
  { category: "gallery", slug: "rehabilitation-session", title: "Rehabilitation", aspect: "aspect-[4/5]" },
  { category: "gallery", slug: "hospital-corridor-premium", title: "Infrastructure", aspect: "aspect-[4/3]" },
  { category: "gallery", slug: "uzbekistan-healthcare-bridge", title: "Uzbekistan", aspect: "aspect-[4/5]" },
  { category: "gallery", slug: "india-specialist-access", title: "India Collaboration", aspect: "aspect-[4/3]" },
  { category: "gallery", slug: "airport-wheelchair-assist", title: "Travel Support", aspect: "aspect-[4/5]" },
  { category: "gallery", slug: "clinical-observership", title: "Clinical Exposure", aspect: "aspect-[16/10]" },
  { category: "gallery", slug: "conference-networking", title: "Healthcare Delegation", aspect: "aspect-[4/3]" },
].map((item) => ({
  ...item,
  image: image(item.category, item.slug, `${item.title} healthcare image.`),
}));

const heroInfoCards = [
  "Hospital Partnerships",
  "International Patients",
  "Medical Tourism",
  "Student Mobility",
];

const stats = [
  { value: 2, suffix: "+", label: "Countries Connected", description: "Uzbekistan and India remain the core bridge for healthcare collaboration." },
  { value: 10, suffix: "+", label: "Healthcare Collaboration Areas", description: "From medical travel to institutional partnerships and clinical exchange." },
  { value: 1000, suffix: "+", label: "Student & Patient Network Reach", description: "A broad multi-stakeholder ecosystem across patient, hospital, and education touchpoints." },
];

function ImageFrame({
  asset,
  className,
  aspectClassName = "aspect-[4/3]",
  priority = false,
}: {
  asset: VisualAsset;
  className?: string;
  aspectClassName?: string;
  priority?: boolean;
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
          sizes="(min-width: 1280px) 28vw, (min-width: 768px) 40vw, 100vw"
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
  return (
    <>
      <section className="relative overflow-hidden px-4 pb-8 pt-6 sm:px-6 lg:px-8">
        <div className="container-wide">
          <div className="relative overflow-hidden rounded-[2.8rem] border border-[#D6E8FF] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,251,255,0.94))] px-6 py-10 shadow-[0_38px_120px_rgba(7,27,58,0.08)] sm:px-8 lg:px-12 lg:py-14">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_26%),radial-gradient(circle_at_top_right,rgba(29,78,216,0.12),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(224,247,250,0.7),transparent_24%)]" />
            <div className="pointer-events-none absolute -left-12 top-16 h-48 w-48 rounded-full bg-[#E0F7FA]/60 blur-3xl" />
            <div className="pointer-events-none absolute right-10 top-14 h-56 w-56 rounded-full bg-[#DBEAFE]/80 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 left-1/3 h-44 w-44 rounded-full bg-[#E0F2FE]/80 blur-3xl" />
            <div className="relative grid items-center gap-10 lg:grid-cols-[0.96fr_1.04fr]">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: easeOutExpo }}
              >
                <div className="flex flex-wrap gap-3">
                  {[
                    "Medical Tourism",
                    "International Patient Support",
                    "Hospital Collaboration",
                  ].map((item) => (
                    <span
                      key={item}
                      className="glass-badge"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <h1 className="mt-7 max-w-3xl text-balance font-display text-4xl font-semibold leading-[1.12] tracking-[-0.03em] text-[#071B3A] sm:text-5xl sm:leading-[1.08] lg:text-[4.9rem] lg:leading-[1.03]">
                  Connecting Patients, Hospitals & Global Healthcare Opportunities
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-[1.08rem]">
                  MedPobeda Group facilitates international medical tourism, hospital partnerships, patient coordination, and healthcare collaboration between Uzbekistan, India, and global medical institutions.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <CTAButton
                    href="/medical-tourism"
                    label="Start Medical Tourism Inquiry"
                    variant="hero"
                    size="2xl"
                    icon={ArrowRight}
                  />
                  <CTAButton
                    href="/hospital-partnerships"
                    label="Partner With Us"
                    variant="surface"
                    size="2xl"
                    icon={ArrowUpRight}
                    className="border-[#BFD7FF] bg-white/88 text-[#071B3A]"
                  />
                </div>
                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                  {[
                    { value: "Patient-first", label: "Human support across travel, treatment, and follow-up." },
                    { value: "Institutional", label: "Built for hospitals, universities, and healthcare groups." },
                    { value: "Cross-border", label: "Focused on trusted coordination between nations." },
                  ].map((item) => (
                    <div
                      key={item.value}
                      className="rounded-[1.6rem] border border-[#D6E8FF] bg-white/82 p-4 shadow-[0_16px_48px_rgba(7,27,58,0.06)] backdrop-blur-xl"
                    >
                      <p className="font-display text-xl font-semibold text-[#071B3A]">{item.value}</p>
                      <p className="mt-2 text-sm leading-7 text-slate-600">{item.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 36 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.08, ease: easeOutExpo }}
                className="relative"
              >
                <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
                  <ImageFrame asset={heroImages.consultation} aspectClassName="aspect-[4/5]" priority />
                  <div className="grid gap-4">
                    <ImageFrame asset={heroImages.hospital} aspectClassName="aspect-[4/3]" priority />
                    <ImageFrame asset={heroImages.travel} aspectClassName="aspect-[4/3]" priority />
                  </div>
                </div>
                <div className="pointer-events-none absolute -left-4 top-8 hidden w-48 rounded-[1.6rem] border border-[#D6E8FF] bg-white/88 p-4 shadow-[0_22px_60px_rgba(7,27,58,0.12)] backdrop-blur-xl lg:block">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">
                    Care Corridor
                  </p>
                  <p className="mt-2 font-display text-2xl font-semibold text-[#071B3A]">
                    India ↔ Uzbekistan
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    Premium healthcare facilitation between treatment, travel, and institutional collaboration.
                  </p>
                </div>
                <div className="pointer-events-none absolute -bottom-6 right-10 hidden rounded-[1.8rem] border border-[#D6E8FF] bg-white/88 p-4 shadow-[0_24px_70px_rgba(29,78,216,0.14)] backdrop-blur-xl lg:block">
                  <div className="grid gap-2 sm:grid-cols-2">
                    {heroInfoCards.map((item) => (
                      <div
                        key={item}
                        className="rounded-[1.3rem] border border-[#E8F2FF] bg-[linear-gradient(180deg,rgba(248,251,255,0.96),rgba(255,255,255,0.94))] px-4 py-3 text-sm font-semibold text-[#071B3A]"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell-compact">
        <div className="container-wide">
          <div className="grid gap-5 xl:grid-cols-[1.2fr_1.8fr]">
            <PremiumCard hover={false} className="p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-700">
                Trust Statistics
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.05em] text-[#071B3A] sm:text-4xl">
                Measured around collaboration, facilitation, and healthcare access
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                MedPobeda Group is positioned as a premium healthcare bridge with patient-facing care support and institution-facing collaboration capacity.
              </p>
            </PremiumCard>
            <div className="grid gap-5 md:grid-cols-3">
              {stats.map((item, index) => (
                <PremiumCard key={item.label} className="p-6" delay={index * 0.06}>
                  <p className="font-display text-4xl font-semibold tracking-[-0.05em] text-[#071B3A]">
                    <AnimatedCounter value={item.value} suffix={item.suffix} />
                  </p>
                  <p className="mt-3 text-lg font-semibold text-[#071B3A]">{item.label}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                </PremiumCard>
              ))}
            </div>
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <PremiumCard className="p-6" delay={0.18}>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#071B3A,#1D4ED8)] text-white">
                  <Handshake className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-[#071B3A]">Trusted Hospital Partnership Support</p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    Structured collaboration support for international patient access, healthcare visibility, and institutional exchange.
                  </p>
                </div>
              </div>
            </PremiumCard>
            <PremiumCard className="p-6" delay={0.24}>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#10B981,#38BDF8)] text-white">
                  <Globe2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-[#071B3A]">India ↔ Uzbekistan Healthcare Bridge</p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    A corridor designed around collaboration, patient guidance, and responsible international healthcare facilitation.
                  </p>
                </div>
              </div>
            </PremiumCard>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-wide">
          <div className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="grid gap-4 sm:grid-cols-2">
              {aboutImages.map((asset, index) => (
                <ImageFrame
                  key={asset.src}
                  asset={asset}
                  aspectClassName={index === 1 ? "aspect-[4/5]" : "aspect-[4/3]"}
                  className={index === 2 ? "sm:-mt-10" : undefined}
                />
              ))}
            </div>
            <div>
              <SectionHeader
                eyebrow="About MedPobeda Group"
                title="Building a Trusted Healthcare Bridge Between Nations"
                description="MedPobeda Group works with hospitals, universities, healthcare institutions, and international patients to create a reliable platform for medical tourism, institutional partnerships, clinical cooperation, and patient support services."
              />
              <p className="mt-6 text-base leading-8 text-slate-600">
                The platform is designed for healthcare decision-makers who need clarity, hospitality, and operational trust at the same time. It connects patient care support with hospital growth, academic exchange, and cross-border institutional relationships.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  "Hospital Collaboration",
                  "Medical Tourism",
                  "International Patient Care",
                  "Student Mobility",
                  "Healthcare Consulting",
                ].map((item) => (
                  <div
                    key={item}
                    className="inline-flex items-center gap-3 rounded-full border border-[#D6E8FF] bg-white px-4 py-3 text-sm font-semibold text-[#071B3A] shadow-[0_14px_40px_rgba(7,27,58,0.06)]"
                  >
                    <BadgeCheck className="h-4 w-4 text-emerald-500" />
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
            eyebrow="Core Services"
            title="Premium service lanes built for healthcare coordination, collaboration, and growth"
            description="Every service card is positioned around facilitation, communication, and practical cross-border support rather than exaggerated claims."
            align="center"
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {serviceCards.map((service, index) => {
              const Icon = service.icon;

              return (
                <PremiumCard key={service.title} className="p-5 sm:p-6" delay={index * 0.05}>
                  <div className="rounded-[1.7rem] border border-[#D6E8FF] bg-white p-3 shadow-[0_18px_40px_rgba(7,27,58,0.06)]">
                    <div className="relative overflow-hidden rounded-[1.35rem]">
                      <div className="absolute left-4 top-4 z-[1] inline-flex items-center gap-2 rounded-full bg-white/88 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700 shadow-[0_10px_24px_rgba(7,27,58,0.08)]">
                        <Icon className="h-3.5 w-3.5" />
                        Service
                      </div>
                      <Image
                        src={service.image.src}
                        alt={service.image.alt}
                        width={900}
                        height={600}
                        className="aspect-[16/10] w-full object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-semibold tracking-[-0.04em] text-[#071B3A]">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{service.description}</p>
                  <Link
                    href={service.href}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 transition hover:gap-3 hover:text-[#071B3A]"
                  >
                    Learn More
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
          <div className="section-frame-soft px-6 py-8 sm:px-8 lg:px-10 lg:py-12">
            <SectionHeader
              eyebrow="Medical Tourism Journey"
              title="A clear treatment facilitation pathway from first inquiry to follow-up"
              description="The journey is designed to reduce uncertainty and create more alignment between patients, coordinators, and healthcare institutions."
              align="center"
            />
            <div className="relative mt-12 hidden lg:block">
              <div className="absolute left-0 right-0 top-10 h-px bg-[linear-gradient(90deg,rgba(191,219,254,0.5),rgba(29,78,216,0.55),rgba(191,219,254,0.5))]" />
              <div className="grid gap-4 xl:grid-cols-8">
                {journeySteps.map((step, index) => {
                  const Icon = step.icon;

                  return (
                    <PremiumCard key={step.title} className="p-4" delay={index * 0.04}>
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(7,27,58,0.96),rgba(29,78,216,0.9),rgba(56,189,248,0.82))] text-white shadow-[0_18px_50px_rgba(29,78,216,0.18)]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">
                        Step {index + 1}
                      </p>
                      <h3 className="mt-2 text-lg font-semibold text-[#071B3A]">{step.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">{step.description}</p>
                    </PremiumCard>
                  );
                })}
              </div>
            </div>
            <div className="mt-10 grid gap-4 lg:hidden">
              {journeySteps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <PremiumCard key={step.title} className="p-5" delay={index * 0.04}>
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#071B3A,#1D4ED8)] text-white">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">
                          Step {index + 1}
                        </p>
                        <h3 className="mt-2 text-lg font-semibold text-[#071B3A]">{step.title}</h3>
                        <p className="mt-2 text-sm leading-7 text-slate-600">{step.description}</p>
                      </div>
                    </div>
                  </PremiumCard>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="partner-hospital-network" className="section-shell pt-0">
        <div className="container-wide">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <PremiumCard hover={false} className="p-6 sm:p-8">
              <SectionHeader
                eyebrow="Hospital Partnership"
                title="Partner With MedPobeda Group to Expand International Patient Access"
                description="Hospitals can collaborate with MedPobeda Group for international patient referrals, medical tourism programs, training collaborations, academic exchange, conferences, and cross-border healthcare growth."
              />
              <div className="mt-8">
                <ImageFrame
                  asset={image(
                    "partnerships",
                    "hospital-partner-growth",
                    "International hospital partnership growth and patient access planning.",
                  )}
                  aspectClassName="aspect-[16/11]"
                />
              </div>
              <CTAButton
                href="/hospital-partnerships"
                label="Become a Partner Hospital"
                icon={ArrowRight}
                className="mt-8 w-full justify-center sm:w-auto"
              />
            </PremiumCard>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {partnershipCards.map((item, index) => {
                const Icon = item.icon;

                return (
                  <PremiumCard key={item.title} className="p-5" delay={index * 0.05}>
                    <div className="relative overflow-hidden rounded-[1.5rem] border border-[#D6E8FF]">
                      <Image
                        src={item.image.src}
                        alt={item.image.alt}
                        width={640}
                        height={480}
                        className="aspect-[4/3] w-full object-cover"
                      />
                    </div>
                    <div className="mt-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(29,78,216,0.12),rgba(56,189,248,0.18))] text-blue-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-[#071B3A]">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                  </PremiumCard>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-wide">
          <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
            <div>
              <SectionHeader
                eyebrow="International Patients"
                title="Personalized Support for International Patients"
                description="The patient-facing experience is designed to feel safe, warm, and professionally managed from the first message through hospital coordination."
              />
              <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {patientSupportCards.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <PremiumCard key={item.title} className="p-4" delay={index * 0.05}>
                      <div className="relative overflow-hidden rounded-[1.35rem] border border-[#D6E8FF]">
                        <Image
                          src={item.image.src}
                          alt={item.image.alt}
                          width={640}
                          height={480}
                          className="aspect-[4/3] w-full object-cover"
                        />
                      </div>
                      <div className="mt-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(16,185,129,0.12),rgba(56,189,248,0.14))] text-[#10B981]">
                        <Icon className="h-4 w-4" />
                      </div>
                      <h3 className="mt-3 text-base font-semibold text-[#071B3A]">{item.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
                    </PremiumCard>
                  );
                })}
              </div>
            </div>
            <PremiumCard hover={false} className="p-5 sm:p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <ImageFrame
                  asset={image(
                    "patients",
                    "caring-consultation",
                    "Doctor and patient speaking in a reassuring healthcare consultation setting.",
                  )}
                  aspectClassName="aspect-[4/5]"
                />
                <div className="grid gap-4">
                  <ImageFrame
                    asset={image(
                      "patients",
                      "family-health-support",
                      "Family support and international patient reassurance scene.",
                    )}
                    aspectClassName="aspect-[4/3]"
                  />
                  <ImageFrame
                    asset={image(
                      "patients",
                      "medical-coordinator-desk",
                      "International healthcare coordinator at a premium support desk.",
                    )}
                    aspectClassName="aspect-[4/3]"
                  />
                </div>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-[1.6rem] border border-[#D6E8FF] bg-white p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">
                    Patient Experience
                  </p>
                  <p className="mt-3 font-display text-3xl font-semibold text-[#071B3A]">Warm, guided, and practical</p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Designed for patient families who need confidence before making international care decisions.
                  </p>
                </div>
                <div className="rounded-[1.6rem] border border-[#D6E8FF] bg-white p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">
                    Support Lens
                  </p>
                  <p className="mt-3 font-display text-3xl font-semibold text-[#071B3A]">Human-first coordination</p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Clear communication, hospital guidance, and follow-up continuity for every stage of the journey.
                  </p>
                </div>
              </div>
            </PremiumCard>
          </div>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="container-wide">
          <SectionHeader
            eyebrow="Featured Collaboration Areas"
            title="Healthcare specialties commonly aligned with international coordination needs"
            description="Each specialty lane reflects practical treatment facilitation, hospital access support, and clinical collaboration opportunities."
            align="center"
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {collaborationAreas.map((area, index) => {
              const Icon = area.icon;

              return (
                <PremiumCard key={area.title} className="p-4" delay={index * 0.03}>
                  <div className="flex items-start gap-4">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[1.4rem] border border-[#D6E8FF]">
                      <Image
                        src={area.image.src}
                        alt={area.image.alt}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(29,78,216,0.12),rgba(56,189,248,0.16))] text-blue-700">
                        <Icon className="h-4 w-4" />
                      </div>
                      <h3 className="mt-3 text-lg font-semibold text-[#071B3A]">{area.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600">{area.description}</p>
                    </div>
                  </div>
                </PremiumCard>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-wide">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <PremiumCard hover={false} className="p-6 sm:p-8">
              <SectionHeader
                eyebrow="Why Choose MedPobeda Group"
                title="A premium international healthcare collaboration approach built on trust and clarity"
                description="The value proposition is not only about access. It is about making healthcare relationships easier to navigate across patients, hospitals, and institutional partners."
              />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {whyChooseItems.map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.6rem] border border-[#D6E8FF] bg-[linear-gradient(180deg,rgba(248,251,255,0.98),rgba(255,255,255,0.96))] px-4 py-4 shadow-[0_14px_40px_rgba(7,27,58,0.05)]"
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-500" />
                      <span className="text-sm font-medium leading-7 text-[#071B3A]">{item}</span>
                    </div>
                  </div>
                ))}
              </div>
            </PremiumCard>
            <PremiumCard hover={false} className="p-5 sm:p-6">
              <ImageFrame
                asset={image(
                  "trust",
                  "healthcare-bridge-leadership",
                  "Healthcare leadership and partnership confidence setting.",
                )}
                aspectClassName="aspect-[16/11]"
              />
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-[1.6rem] border border-[#D6E8FF] bg-white p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">
                    Transparent Process
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Clear communication around treatment planning, hospital matching, and cross-border collaboration steps.
                  </p>
                </div>
                <div className="rounded-[1.6rem] border border-[#D6E8FF] bg-white p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">
                    Luxury Healthcare Feel
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    White-space, premium surfaces, careful imagery, and hospitality-driven interface design throughout the journey.
                  </p>
                </div>
              </div>
            </PremiumCard>
          </div>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="container-wide">
          <div className="section-frame-accent px-6 py-8 sm:px-8 lg:px-10 lg:py-12">
            <SectionHeader
              eyebrow="Countries & Regions"
              title="Connecting Healthcare Between Uzbekistan, India & Beyond"
              description="MedPobeda Group is positioned as a healthcare bridge that can support patient facilitation, institutional exchange, and hospital collaboration across multiple geographies."
              align="center"
            />
            <div className="mt-12 grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
              <PremiumCard hover={false} className="min-h-[28rem] p-6 sm:p-8">
                <div className="relative h-full overflow-hidden rounded-[2rem] border border-[#D6E8FF] bg-[linear-gradient(160deg,rgba(255,255,255,0.98),rgba(235,245,255,0.94))]">
                  <div className="absolute inset-0 opacity-30">
                    <Image
                      src={image("regions", "global-healthcare-bridge", "India Uzbekistan healthcare collaboration network.").src}
                      alt="India Uzbekistan healthcare collaboration network."
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#9CC8FF] bg-[radial-gradient(circle,rgba(224,247,250,0.9),rgba(219,234,254,0.7),rgba(255,255,255,0.28))]" />
                  <div className="absolute left-1/2 top-1/2 h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#BFD7FF]" />
                  <div className="absolute left-[18%] top-[22%] rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#071B3A] shadow-[0_14px_40px_rgba(7,27,58,0.08)]">
                    Uzbekistan
                  </div>
                  <div className="absolute right-[15%] top-[30%] rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#071B3A] shadow-[0_14px_40px_rgba(7,27,58,0.08)]">
                    India
                  </div>
                  <div className="absolute left-[22%] bottom-[24%] rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#071B3A] shadow-[0_14px_40px_rgba(7,27,58,0.08)]">
                    Central Asia
                  </div>
                  <div className="absolute right-[18%] bottom-[18%] rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#071B3A] shadow-[0_14px_40px_rgba(7,27,58,0.08)]">
                    Global Partners
                  </div>
                </div>
              </PremiumCard>
              <div className="grid gap-4 sm:grid-cols-2">
                {regions.map((region, index) => (
                  <PremiumCard key={region.title} className="p-5" delay={index * 0.04}>
                    <p className="text-lg font-semibold text-[#071B3A]">{region.title}</p>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{region.description}</p>
                  </PremiumCard>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="container-wide">
          <SectionHeader
            eyebrow="Gallery"
            title="A premium visual gallery for hospitals, patient support, travel, partnerships, and mobility"
            description="The homepage uses an image-rich editorial system so nearly every major narrative point is supported by visual context."
            align="center"
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {galleryImages.map((item, index) => (
              <motion.div
                key={item.image.src}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.55, delay: index * 0.03, ease: easeOutExpo }}
                className="group overflow-hidden rounded-[2rem] border border-[#D6E8FF] bg-white shadow-[0_20px_60px_rgba(7,27,58,0.06)]"
              >
                <div className={cn("relative overflow-hidden", item.aspect)}>
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="(min-width: 1280px) 22vw, (min-width: 640px) 45vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(7,27,58,0.16)_50%,rgba(7,27,58,0.6)_100%)]" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <div className="rounded-[1.3rem] border border-white/50 bg-white/84 px-4 py-3 backdrop-blur-xl">
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">
                        {item.title}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-wide">
          <SectionHeader
            eyebrow="Testimonials & Trust"
            title="Representative stakeholder perspectives ready for real case stories and endorsements"
            description="Representative stakeholder perspectives show how the platform communicates trust across patient, hospital, and mobility relationships."
            align="center"
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
            {testimonials.map((item, index) => (
              <PremiumCard key={item.name} className="p-5 sm:p-6" delay={index * 0.05}>
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-[1.4rem] border border-[#D6E8FF]">
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-[#071B3A]">{item.name}</p>
                    <p className="mt-1 text-sm text-blue-700">{item.role}</p>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-8 text-slate-600">“{item.quote}”</p>
              </PremiumCard>
            ))}
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
