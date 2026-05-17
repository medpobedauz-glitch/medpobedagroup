import "server-only";

import { BlogStatus, PartnershipStatus } from "@prisma/client";
import { unstable_noStore as noStore } from "next/cache";

import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { searchQuerySchema } from "@/lib/validators/settings";

type SearchScope = "all" | "leads" | "hospitals" | "partnerships" | "blog";

export type SearchResultItem = {
  id: string;
  type: "lead" | "hospital" | "partnership" | "blog";
  title: string;
  subtitle: string;
  summary: string;
  href: string;
  adminHref?: string;
  badge: string;
  score: number;
  createdAt?: Date | null;
};

function getSearchScore(query: string, values: Array<string | null | undefined>) {
  const normalizedQuery = query.toLowerCase().trim();
  const tokens = normalizedQuery.split(/\s+/).filter(Boolean);
  const haystack = values
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (!haystack) {
    return 0;
  }

  let score = 0;

  if (haystack === normalizedQuery) score += 120;
  if (haystack.startsWith(normalizedQuery)) score += 85;
  if (haystack.includes(normalizedQuery)) score += 60;

  score += tokens.reduce((total, token) => {
    if (haystack.startsWith(token)) return total + 15;
    if (haystack.includes(token)) return total + 10;
    return total;
  }, 0);

  return score;
}

function paginateResults<T>(items: T[], page: number, pageSize: number) {
  const total = items.length;
  const pageCount = Math.max(Math.ceil(total / pageSize), 1);
  const start = (page - 1) * pageSize;

  return {
    items: items.slice(start, start + pageSize),
    total,
    page,
    pageSize,
    pageCount,
  };
}

export async function searchPlatformData(input: {
  query?: string;
  scope?: SearchScope;
  page?: number;
  pageSize?: number;
}) {
  noStore();

  const parsed = searchQuerySchema.safeParse({
    query: input.query ?? "",
    scope: input.scope ?? "all",
    page: input.page ?? 1,
    pageSize: input.pageSize ?? 20,
  });

  if (!parsed.success || !env.DATABASE_URL) {
    return {
      items: [] as SearchResultItem[],
      total: 0,
      page: 1,
      pageSize: input.pageSize ?? 20,
      pageCount: 1,
      counts: {
        leads: 0,
        hospitals: 0,
        partnerships: 0,
        blog: 0,
      },
    };
  }

  const { query, scope, page, pageSize } = parsed.data;
  const search = query.trim();

  const includeLeads = scope === "all" || scope === "leads";
  const includeHospitals = scope === "all" || scope === "hospitals";
  const includePartnerships = scope === "all" || scope === "partnerships";
  const includeBlog = scope === "all" || scope === "blog";

  const leadWhere = {
    OR: [
      { name: { contains: search, mode: "insensitive" as const } },
      { organization: { contains: search, mode: "insensitive" as const } },
      { email: { contains: search, mode: "insensitive" as const } },
      { message: { contains: search, mode: "insensitive" as const } },
      { country: { contains: search, mode: "insensitive" as const } },
      { tags: { has: search.toLowerCase() } },
    ],
  };

  const [contacts, partnerships, students, tourism, hospitals, partnershipPipelines, posts] =
    await Promise.all([
      includeLeads
        ? prisma.contactSubmission.findMany({
            where: leadWhere,
            take: 12,
            orderBy: { updatedAt: "desc" },
          })
        : Promise.resolve([]),
      includeLeads
        ? prisma.partnershipLead.findMany({
            where: leadWhere,
            take: 12,
            orderBy: { updatedAt: "desc" },
          })
        : Promise.resolve([]),
      includeLeads
        ? prisma.studentMobilityInquiry.findMany({
            where: leadWhere,
            take: 12,
            orderBy: { updatedAt: "desc" },
          })
        : Promise.resolve([]),
      includeLeads
        ? prisma.medicalTourismInquiry.findMany({
            where: {
              OR: [
                ...leadWhere.OR,
                { treatmentType: { contains: search, mode: "insensitive" } },
                { preferredHospital: { contains: search, mode: "insensitive" } },
              ],
            },
            take: 12,
            orderBy: { updatedAt: "desc" },
          })
        : Promise.resolve([]),
      includeHospitals
        ? prisma.hospital.findMany({
            where: {
              OR: [
                { name: { contains: search, mode: "insensitive" } },
                { country: { contains: search, mode: "insensitive" } },
                { city: { contains: search, mode: "insensitive" } },
                { description: { contains: search, mode: "insensitive" } },
              ],
            },
            take: 12,
            orderBy: { updatedAt: "desc" },
          })
        : Promise.resolve([]),
      includePartnerships
        ? prisma.partnership.findMany({
            where: {
              OR: [
                { country: { contains: search, mode: "insensitive" } },
                { summary: { contains: search, mode: "insensitive" } },
                { nextStep: { contains: search, mode: "insensitive" } },
                {
                  hospital: {
                    name: { contains: search, mode: "insensitive" },
                  },
                },
              ],
            },
            include: {
              hospital: {
                select: { name: true },
              },
            },
            take: 12,
            orderBy: { updatedAt: "desc" },
          })
        : Promise.resolve([]),
      includeBlog
        ? prisma.blogPost.findMany({
            where: {
              status: BlogStatus.PUBLISHED,
              OR: [
                { title: { contains: search, mode: "insensitive" } },
                { excerpt: { contains: search, mode: "insensitive" } },
                { content: { contains: search, mode: "insensitive" } },
                { category: { contains: search, mode: "insensitive" } },
                { tags: { has: search.toLowerCase() } },
                { focusKeyword: { contains: search, mode: "insensitive" } },
              ],
            },
            take: 12,
            orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
          })
        : Promise.resolve([]),
    ]);

  const results: SearchResultItem[] = [
    ...contacts.map((item) => ({
      id: item.id,
      type: "lead" as const,
      title: item.name,
      subtitle: item.organization || item.email,
      summary: item.message,
      href: `/admin/leads?search=${encodeURIComponent(item.email)}`,
      badge: "General Lead",
      createdAt: item.createdAt,
      score: getSearchScore(search, [
        item.name,
        item.organization,
        item.email,
        item.country,
        item.message,
        item.tags.join(" "),
      ]),
    })),
    ...partnerships.map((item) => ({
      id: item.id,
      type: "lead" as const,
      title: item.name,
      subtitle: item.organization || item.email,
      summary: item.collaborationInterest || item.message,
      href: `/admin/leads?search=${encodeURIComponent(item.email)}`,
      badge: "Partnership Lead",
      createdAt: item.createdAt,
      score: getSearchScore(search, [
        item.name,
        item.organization,
        item.email,
        item.country,
        item.message,
        item.collaborationInterest,
        item.tags.join(" "),
      ]),
    })),
    ...students.map((item) => ({
      id: item.id,
      type: "lead" as const,
      title: item.name,
      subtitle: item.organization || item.email,
      summary: item.programInterest || item.message,
      href: `/admin/student-mobility?search=${encodeURIComponent(item.email)}`,
      badge: "Student Mobility",
      createdAt: item.createdAt,
      score: getSearchScore(search, [
        item.name,
        item.organization,
        item.email,
        item.country,
        item.message,
        item.programInterest,
        item.tags.join(" "),
      ]),
    })),
    ...tourism.map((item) => ({
      id: item.id,
      type: "lead" as const,
      title: item.name,
      subtitle: item.treatmentType,
      summary: item.message,
      href: `/admin/medical-tourism?search=${encodeURIComponent(item.email)}`,
      badge: "Medical Tourism",
      createdAt: item.createdAt,
      score: getSearchScore(search, [
        item.name,
        item.organization,
        item.email,
        item.country,
        item.message,
        item.treatmentType,
        item.preferredHospital,
        item.tags.join(" "),
      ]),
    })),
    ...hospitals.map((item) => ({
      id: item.id,
      type: "hospital" as const,
      title: item.name,
      subtitle: [item.city, item.country].filter(Boolean).join(", ") || item.country,
      summary:
        item.description ||
        `${item.hospitalType || "Healthcare institution"} in ${item.country}`,
      href: `/admin/hospitals`,
      badge: "Hospital",
      createdAt: item.createdAt,
      score: getSearchScore(search, [
        item.name,
        item.country,
        item.city,
        item.description,
      ]),
    })),
    ...partnershipPipelines.map((item) => ({
      id: item.id,
      type: "partnership" as const,
      title: item.hospital.name,
      subtitle: item.collaborationStatus,
      summary: item.summary || item.nextStep || item.country,
      href: `/admin/partnerships`,
      badge:
        item.collaborationStatus === PartnershipStatus.ACTIVE ? "Active Partnership" : "Partnership Pipeline",
      createdAt: item.createdAt,
      score: getSearchScore(search, [
        item.hospital.name,
        item.country,
        item.summary,
        item.nextStep,
        item.collaborationStatus,
      ]),
    })),
    ...posts.map((item) => ({
      id: item.id,
      type: "blog" as const,
      title: item.title,
      subtitle: item.category || "Healthcare Insight",
      summary: item.seoDescription || item.excerpt || item.focusKeyword || "Blog article",
      href: `/blog/${item.slug}`,
      adminHref: `/admin/blog?edit=${item.id}`,
      badge: item.featured ? "Featured Article" : "Blog Article",
      createdAt: item.publishedAt ?? item.createdAt,
      score: getSearchScore(search, [
        item.title,
        item.excerpt,
        item.category,
        item.tags.join(" "),
        item.focusKeyword,
      ]),
    })),
  ]
    .filter((item) => item.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      return (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0);
    });

  return {
    ...paginateResults(results, page, pageSize),
    counts: {
      leads: results.filter((item) => item.type === "lead").length,
      hospitals: results.filter((item) => item.type === "hospital").length,
      partnerships: results.filter((item) => item.type === "partnership").length,
      blog: results.filter((item) => item.type === "blog").length,
    },
  };
}
