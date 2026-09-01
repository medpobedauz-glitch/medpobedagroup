"use client";

import { TrustStatisticsBar } from "@/components/sections/trust-statistics-bar";
import { HospitalPartnersSection } from "@/components/sections/hospital-partners-section";
import { PatientSuccessStories } from "@/components/sections/patient-success-stories";
import { TeamSection } from "@/components/sections/team-section";
import { AccreditationsSection } from "@/components/sections/accreditations-section";
import { WhyIndiaComparison } from "@/components/sections/why-india-comparison";
import { ExitIntentPopup } from "@/components/common/exit-intent-popup";
import type { PatientVideo } from "@/lib/data/patient-videos";

type TrustStat = {
  value: string;
  label: string;
  description: string;
};

type HospitalPartner = {
  id: string;
  name: string;
  slug: string;
  logo: string | null;
  featuredImage: string;
  country: string;
  city: string;
  state: string;
  shortDescription: string;
  specialties: string[];
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
  featuredPatientVideo: PatientVideo;
  teamMembers: TeamMember[];
  accreditations: Accreditation[];
};

export function HomepageEnhancements({
  trustStats,
  hospitalPartners,
  successStories,
  featuredPatientVideo,
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
      <PatientSuccessStories
        stories={successStories}
        featuredVideo={featuredPatientVideo}
      />

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
