import "server-only";

import type { LanguageCode } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export async function findCountryByNameOrCode(query?: string | null) {
  if (!query) {
    return null;
  }

  const normalized = query.trim();
  if (!normalized) {
    return null;
  }

  return prisma.country.findFirst({
    where: {
      isActive: true,
      OR: [
        { code: normalized.toUpperCase() },
        { name: { equals: normalized, mode: "insensitive" } },
        { localName: { equals: normalized, mode: "insensitive" } },
      ],
    },
    include: {
      offices: {
        orderBy: [{ isPrimary: "desc" }, { city: "asc" }],
      },
      coordinators: {
        where: { isActive: true },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
              isActive: true,
            },
          },
          office: true,
        },
        orderBy: [{ officeId: "asc" }, { name: "asc" }],
      },
      _count: {
        select: {
          hospitals: true,
          patientCases: true,
          coordinators: true,
          offices: true,
        },
      },
    },
  });
}

export async function findPreferredCoordinator(
  countryId: string,
  language?: LanguageCode | null,
) {
  const languageMatch = language
    ? await prisma.regionalCoordinator.findFirst({
        where: {
          countryId,
          isActive: true,
          languages: { has: language },
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
              isActive: true,
            },
          },
          office: true,
          country: true,
        },
        orderBy: [{ officeId: "asc" }, { updatedAt: "desc" }],
      })
    : null;

  if (languageMatch) {
    return languageMatch;
  }

  return prisma.regionalCoordinator.findFirst({
    where: {
      countryId,
      isActive: true,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          isActive: true,
        },
      },
      office: true,
      country: true,
    },
    orderBy: [{ officeId: "asc" }, { updatedAt: "desc" }],
  });
}

export async function getInternationalOperationsSnapshot() {
  return prisma.country.findMany({
    where: {
      isActive: true,
    },
    include: {
      offices: {
        orderBy: [{ isPrimary: "desc" }, { city: "asc" }],
      },
      coordinators: {
        where: { isActive: true },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
              lastSeenAt: true,
            },
          },
          office: true,
        },
        orderBy: [{ name: "asc" }],
      },
      _count: {
        select: {
          hospitals: true,
          patientCases: true,
          coordinators: true,
          offices: true,
        },
      },
    },
    orderBy: [{ region: "asc" }, { name: "asc" }],
  });
}
