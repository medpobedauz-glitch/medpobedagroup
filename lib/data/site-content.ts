import { prisma } from "@/lib/prisma";

// ─── Trust Statistics ──────────────────────────────────────────────

export interface TrustStat {
  value: string;
  label: string;
  description: string;
}

export async function getTrustStats(): Promise<TrustStat[]> {
  const [
    patientCount,
    hospitalCount,
    countryCount,
  ] = await Promise.all([
    prisma.patientInquiry.count({ where: { status: { not: "SPAM" } } }),
    prisma.hospitalPartner.count({ where: { isPublished: true } }),
    prisma.countryPage.count({ where: { isPublished: true } }),
  ]);

  return [
    {
      value: `${Math.max(patientCount, 1000)}+`,
      label: "Patients Assisted",
      description: "Patients from Central Asia successfully coordinated for treatment in India.",
    },
    {
      value: `${Math.max(hospitalCount, 20)}+`,
      label: "Partner Hospitals",
      description: "JCI & NABH accredited hospitals across India with international patient desks.",
    },
    {
      value: `${Math.max(countryCount, 6)}`,
      label: "Countries Served",
      description: "Dedicated coordination offices across Uzbekistan, Kazakhstan, Kyrgyzstan, Tajikistan, Turkmenistan, and Russia.",
    },
    {
      value: "24/7",
      label: "Patient Support",
      description: "Round-the-clock multilingual support via WhatsApp, Telegram, and phone.",
    },
  ];
}

// ─── Hospital Partners ─────────────────────────────────────────────

export interface HospitalPartnerData {
  id: string;
  name: string;
  slug: string;
  shortName: string | null;
  logo: string | null;
  coverImage: string | null;
  country: string;
  city: string | null;
  specialties: string[];
  bedCount: number | null;
  establishedYear: number | null;
  accreditations: string[];
  patientRating: number | null;
}

export async function getFeaturedHospitalPartners(): Promise<HospitalPartnerData[]> {
  return prisma.hospitalPartner.findMany({
    where: {
      isPublished: true,
      isFeatured: true,
    },
    orderBy: { sortOrder: "asc" },
    take: 12,
    select: {
      id: true,
      name: true,
      slug: true,
      shortName: true,
      logo: true,
      coverImage: true,
      country: true,
      city: true,
      specialties: true,
      bedCount: true,
      establishedYear: true,
      accreditations: true,
      patientRating: true,
    },
  });
}

export async function getAllHospitalPartners(): Promise<HospitalPartnerData[]> {
  return prisma.hospitalPartner.findMany({
    where: { isPublished: true },
    orderBy: { sortOrder: "asc" },
    select: {
      id: true,
      name: true,
      slug: true,
      shortName: true,
      logo: true,
      coverImage: true,
      country: true,
      city: true,
      specialties: true,
      bedCount: true,
      establishedYear: true,
      accreditations: true,
      patientRating: true,
    },
  });
}

// ─── Success Stories ───────────────────────────────────────────────

export interface SuccessStoryData {
  id: string;
  patientName: string;
  patientCountry: string;
  patientAge: number | null;
  treatmentType: string;
  hospitalName: string;
  testimonial: string;
  outcome: string;
  journeySummary: string | null;
  coverImage: string | null;
  videoUrl: string | null;
  rating: number;
  isFeatured: boolean;
  slug: string;
  tags: string[];
}

export async function getFeaturedSuccessStories(): Promise<SuccessStoryData[]> {
  return prisma.successStory.findMany({
    where: {
      isPublished: true,
      isFeatured: true,
    },
    orderBy: { createdAt: "desc" },
    take: 6,
    select: {
      id: true,
      patientName: true,
      patientCountry: true,
      patientAge: true,
      treatmentType: true,
      hospitalName: true,
      testimonial: true,
      outcome: true,
      journeySummary: true,
      coverImage: true,
      videoUrl: true,
      rating: true,
      isFeatured: true,
      slug: true,
      tags: true,
    },
  });
}

export async function getAllSuccessStories(): Promise<SuccessStoryData[]> {
  return prisma.successStory.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      patientName: true,
      patientCountry: true,
      patientAge: true,
      treatmentType: true,
      hospitalName: true,
      testimonial: true,
      outcome: true,
      journeySummary: true,
      coverImage: true,
      videoUrl: true,
      rating: true,
      isFeatured: true,
      slug: true,
      tags: true,
    },
  });
}

// ─── Team Members ──────────────────────────────────────────────────

export interface TeamMemberData {
  id: string;
  name: string;
  role: string;
  title: string | null;
  bio: string | null;
  shortBio: string | null;
  photo: string | null;
  languages: string[];
  specializations: string[];
  yearsExperience: number | null;
}

export async function getTeamMembers(): Promise<TeamMemberData[]> {
  return prisma.teamMember.findMany({
    where: { isPublished: true },
    orderBy: { sortOrder: "asc" },
    select: {
      id: true,
      name: true,
      role: true,
      title: true,
      bio: true,
      shortBio: true,
      photo: true,
      languages: true,
      specializations: true,
      yearsExperience: true,
    },
  });
}

// ─── Accreditations ────────────────────────────────────────────────

export interface AccreditationData {
  id: string;
  name: string;
  type: string;
  issuer: string;
  description: string | null;
  logo: string | null;
}

export async function getAccreditations(): Promise<AccreditationData[]> {
  return prisma.accreditation.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
    select: {
      id: true,
      name: true,
      type: true,
      issuer: true,
      description: true,
      logo: true,
    },
  });
}

// ─── Cost Guides ───────────────────────────────────────────────────

export interface CostGuideData {
  id: string;
  treatmentName: string;
  slug: string;
  category: string;
  description: string | null;
  costMinINR: number;
  costMaxINR: number;
  costMinUSD: number | null;
  costMaxUSD: number | null;
  costMinUZS: number | null;
  costMaxUZS: number | null;
  durationDays: string | null;
  includes: string[];
  country: string;
}

export async function getCostGuides(): Promise<CostGuideData[]> {
  return prisma.costGuide.findMany({
    where: { isPublished: true },
    orderBy: { sortOrder: "asc" },
    select: {
      id: true,
      treatmentName: true,
      slug: true,
      category: true,
      description: true,
      costMinINR: true,
      costMaxINR: true,
      costMinUSD: true,
      costMaxUSD: true,
      costMinUZS: true,
      costMaxUZS: true,
      durationDays: true,
      includes: true,
      country: true,
    },
  });
}

export async function getCostGuideBySlug(slug: string): Promise<CostGuideData | null> {
  return prisma.costGuide.findUnique({
    where: { slug },
    select: {
      id: true,
      treatmentName: true,
      slug: true,
      category: true,
      description: true,
      costMinINR: true,
      costMaxINR: true,
      costMinUSD: true,
      costMaxUSD: true,
      costMinUZS: true,
      costMaxUZS: true,
      durationDays: true,
      includes: true,
      country: true,
    },
  });
}

// ─── FAQs ──────────────────────────────────────────────────────────

export interface FAQData {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export async function getFAQs(locale: string = "en"): Promise<FAQData[]> {
  return prisma.fAQ.findMany({
    where: { isPublished: true, locale },
    orderBy: { sortOrder: "asc" },
    select: {
      id: true,
      question: true,
      answer: true,
      category: true,
    },
  });
}

export async function getFAQsByCategory(category: string, locale: string = "en"): Promise<FAQData[]> {
  return prisma.fAQ.findMany({
    where: { isPublished: true, locale, category },
    orderBy: { sortOrder: "asc" },
    select: {
      id: true,
      question: true,
      answer: true,
      category: true,
    },
  });
}

// ─── Doctors ───────────────────────────────────────────────────────

export interface DoctorData {
  id: string;
  name: string;
  slug: string;
  specialization: string;
  subSpecializations: string[];
  qualifications: string[];
  experience: number | null;
  hospitalName: string | null;
  photo: string | null;
  bio: string | null;
  languages: string[];
  consultationFee: number | null;
  isFeatured: boolean;
}

export async function getFeaturedDoctors(): Promise<DoctorData[]> {
  return prisma.doctor.findMany({
    where: { isPublished: true, isFeatured: true },
    orderBy: { sortOrder: "asc" },
    take: 12,
    select: {
      id: true,
      name: true,
      slug: true,
      specialization: true,
      subSpecializations: true,
      qualifications: true,
      experience: true,
      hospitalName: true,
      photo: true,
      bio: true,
      languages: true,
      consultationFee: true,
      isFeatured: true,
    },
  });
}

export async function getAllDoctors(): Promise<DoctorData[]> {
  return prisma.doctor.findMany({
    where: { isPublished: true },
    orderBy: { sortOrder: "asc" },
    select: {
      id: true,
      name: true,
      slug: true,
      specialization: true,
      subSpecializations: true,
      qualifications: true,
      experience: true,
      hospitalName: true,
      photo: true,
      bio: true,
      languages: true,
      consultationFee: true,
      isFeatured: true,
    },
  });
}

// ─── Country Pages ─────────────────────────────────────────────────

export interface CountryPageData {
  id: string;
  countryCode: string;
  countryName: string;
  slug: string;
  heroTitle: string;
  heroDescription: string | null;
  heroImage: string | null;
  content: string | null;
  popularTreatments: string[];
  partnerHospitals: string[];
  visaInfo: string | null;
  travelInfo: string | null;
  localPhone: string | null;
  localEmail: string | null;
  timezone: string | null;
  languages: string[];
  currency: string | null;
}

export async function getPublishedCountryPages(): Promise<CountryPageData[]> {
  return prisma.countryPage.findMany({
    where: { isPublished: true },
    orderBy: { countryName: "asc" },
    select: {
      id: true,
      countryCode: true,
      countryName: true,
      slug: true,
      heroTitle: true,
      heroDescription: true,
      heroImage: true,
      content: true,
      popularTreatments: true,
      partnerHospitals: true,
      visaInfo: true,
      travelInfo: true,
      localPhone: true,
      localEmail: true,
      timezone: true,
      languages: true,
      currency: true,
    },
  });
}

export async function getCountryPageBySlug(slug: string): Promise<CountryPageData | null> {
  return prisma.countryPage.findUnique({
    where: { slug },
    select: {
      id: true,
      countryCode: true,
      countryName: true,
      slug: true,
      heroTitle: true,
      heroDescription: true,
      heroImage: true,
      content: true,
      popularTreatments: true,
      partnerHospitals: true,
      visaInfo: true,
      travelInfo: true,
      localPhone: true,
      localEmail: true,
      timezone: true,
      languages: true,
      currency: true,
    },
  });
}