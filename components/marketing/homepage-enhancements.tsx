"use client";

import { TrustStatisticsBar } from "@/components/sections/trust-statistics-bar";
import { HospitalPartnersSection } from "@/components/sections/hospital-partners-section";
import { PatientSuccessStories } from "@/components/sections/patient-success-stories";
import { TeamSection } from "@/components/sections/team-section";
import { AccreditationsSection } from "@/components/sections/accreditations-section";
import { WhyIndiaComparison } from "@/components/sections/why-india-comparison";
import { ExitIntentPopup } from "@/components/common/exit-intent-popup";

type TrustStat = {
  value: string;
  label: string;
  description: string;
};

type HospitalPartner = {
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
};

type SuccessStory = {
  id: string;
  patientName: string;
  patientCountry: string;
  patientAge: number | null;
  treatmentType: string;
  hospitalName: string;
  testimonial: string;
  outcome: string;
  coverImage: string | null;
  videoUrl: string | null;
  rating: number;
  isFeatured: boolean;
  slug: string;
  tags: string[];
};

type TeamMember = {
  id: string;
  name: string;
  role: string;
  title: string | null;
  shortBio: string | null;
  photo: string | null;
  languages: string[];
  specializations: string[];
  yearsExperience: number | null;
};

type Accreditation = {
  id: string;
  name: string;
  type: string;
  issuer: string;
  description: string | null;
  logo: string | null;
};

type HomepageEnhancementsProps = {
  trustStats: TrustStat[];
  hospitalPartners: HospitalPartner[];
  successStories: SuccessStory[];
  teamMembers: TeamMember[];
  accreditations: Accreditation[];
};

export function HomepageEnhancements({
  trustStats,
  hospitalPartners,
  successStories,
  teamMembers,
  accreditations,
}: HomepageEnhancementsProps) {
  return (
    <>
      {/* Trust Statistics Bar - appears right after hero */}
      <TrustStatisticsBar stats={trustStats} />

      {/* Hospital Partners Section */}
      <HospitalPartnersSection partners={hospitalPartners} />

      {/* Patient Success Stories */}
      <PatientSuccessStories stories={successStories} />

      {/* Why India Comparison */}
      <WhyIndiaComparison />

      {/* Team Section */}
      <TeamSection members={teamMembers} />

      {/* Accreditations & Compliance */}
      <AccreditationsSection accreditations={accreditations} />

      {/* Exit Intent Popup */}
      <ExitIntentPopup />
    </>
  );
}