import { prisma } from "@/lib/prisma";

export type HospitalPartnerProfile = {
  id: string;
  name: string;
  slug: string;
  shortName: string | null;
  logo: string | null;
  coverImage: string | null;
  country: string;
  city: string | null;
  website: string | null;
  description: string | null;
  specialties: string[];
  bedCount: number | null;
  establishedYear: number | null;
  accreditations: string[];
  patientRating: number | null;
  internationalDesk: boolean;
  partnerSince: Date | null;
};

export async function getHospitalPartnerBySlug(slug: string): Promise<HospitalPartnerProfile | null> {
  return prisma.hospitalPartner.findUnique({
    where: { slug },
    select: {
      id: true,
      name: true,
      slug: true,
      shortName: true,
      logo: true,
      coverImage: true,
      country: true,
      city: true,
      website: true,
      description: true,
      specialties: true,
      bedCount: true,
      establishedYear: true,
      accreditations: true,
      patientRating: true,
      internationalDesk: true,
      partnerSince: true,
    },
  });
}

export async function getAllHospitalPartnerSlugs(): Promise<string[]> {
  const partners = await prisma.hospitalPartner.findMany({
    where: { isPublished: true },
    select: { slug: true },
  });
  return partners.map((p) => p.slug);
}