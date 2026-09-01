import type { MetadataRoute } from "next";
import { BlogStatus } from "@prisma/client";

import { doctorSpecialtyPages } from "@/lib/doctor-specialty-pages";
import { getBlogTaxonomy, getPublishedBlogSitemapEntries } from "@/lib/data/blog";
import { env } from "@/lib/env";
import { hospitals } from "@/lib/data/hospitals";
import { treatments } from "@/lib/data/treatments";
import { doctors, specialties } from "@/lib/data/doctors";
import { diseases } from "@/lib/data/diseases";
import {
  defaultLocale,
  locales,
  localizePath,
  nonLocalizedPublicRoutes,
} from "@/lib/i18n/config";
import { absoluteUrl } from "@/lib/metadata";
import { patientSupportPages } from "@/lib/patient-support-pages";
import { prisma } from "@/lib/prisma";
import { publicRoutes } from "@/lib/site";
import { uzMedicalSeoPages } from "@/lib/uz-medical-seo-pages";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const uzGuideLastModified = new Date("2026-07-26T00:00:00.000Z");
  const staticExtraRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/llms.txt"),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    ...uzMedicalSeoPages.map((page) => ({
      url: absoluteUrl(`/uz/${page.slug}`),
      lastModified: uzGuideLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.82,
    })),
  ];
  const blogTaxonomySets = await Promise.all(locales.map((locale) => getBlogTaxonomy(locale)));
  const blogCategorySlugs = Array.from(
    new Set(blogTaxonomySets.flatMap((taxonomy) => taxonomy.categories.map((category) => category.slug))),
  );
  const hospitalPaths = hospitals.map((hospital) => `/hospitals/${hospital.slug}`);
  const treatmentDirectoryPaths = treatments.map((treatment) => `/treatments/${treatment.slug}`);
  const diseasePaths = diseases.map((disease) => `/diseases/${disease.slug}`);
  const hospitalGroupPaths = ["apollo", "kims", "fortis", "max", "medanta"].map(
    (slug) => `/hospital-groups/${slug}`,
  );
  const doctorPaths = [
    ...doctors.map((doctor) => `/doctors/${doctor.slug}`),
    ...doctorSpecialtyPages.map((page) => `/doctors/${page.slug}`),
  ];
  const specialtyPaths = specialties.map((specialty) => `/specialties/${specialty.slug}`);
  const patientSupportPaths = patientSupportPages.map((page) => `/patient-support/${page.slug}`);
  const blogCategoryPaths = blogCategorySlugs.map((slug) => `/blog/category/${slug}`);
  const getChangeFrequency = (
    route: string,
  ): NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]> =>
    route === "/" ? "weekly" : route === "/blog" ? "weekly" : "monthly";
  // Compute sitemap priority. Using explicit casts to `any` avoids TypeScript's narrow
  // union type inference from `publicRoutes` which would otherwise reject the
  // additional custom routes.
  const getPriority = (route: string) => {
    const r = route;
    if (r === "/") return 1;
    if (r === "/international-patient-care" || r === "/hospital-partnerships") return 0.9;
    if (
      r === "/hospitals" ||
      r === "/doctors" ||
      r === "/diseases" ||
      r === "/patient-support" ||
      r === "/cost-calculator"
    )
      return 0.88;
    if (r === "/treatments") return 0.89;
    if (r === "/company-profile" || r === "/press") return 0.86;
    if (
      hospitalPaths.includes(r) ||
      diseasePaths.includes(r) ||
      doctorPaths.includes(r) ||
      patientSupportPaths.includes(r)
    )
      return 0.83;
    if (r.startsWith("/blog/category/")) return 0.72;
    const highPriority = [
      "/medical-tourism-uzbekistan",
      "/treatment-in-india-from-uzbekistan",
      "/medical-tourism-tashkent",
      "/treatment-in-india-from-kazakhstan",
      "/treatment-in-india-from-kyrgyzstan",
      "/treatment-in-india-from-tajikistan",
      "/treatment-in-india",
      "/kims-hospitals-india",
      "/medical-visa-support",
      "/second-medical-opinion",
      "/oncology-referrals",
      "/cardiology-referrals",
      "/organ-transplant-coordination",
      "/air-ambulance-coordination",
      "/oncology-treatment-india",
      "/cardiology-treatment-india",
      "/organ-transplant-india",
      "/neurosurgery-treatment-india",
      "/orthopedic-treatment-india",
      "/second-medical-opinion-india",
    ];
    if (highPriority.includes(r)) return 0.88;
    return 0.8;
  };

  const staticRoutes: MetadataRoute.Sitemap = publicRoutes.flatMap((route) => {
    if (
      nonLocalizedPublicRoutes.includes(
        route as (typeof nonLocalizedPublicRoutes)[number],
      )
    ) {
      return [{
        url: absoluteUrl(route),
        changeFrequency: getChangeFrequency(route),
        priority: getPriority(route),
      }];
    }

    return locales.map((locale) => ({
        url: absoluteUrl(localizePath(route, locale)),
        changeFrequency: getChangeFrequency(route),
        // Use the same priority logic for all locales.
        priority: getPriority(route),
      }));
  });
  const structuredDetailRoutes: MetadataRoute.Sitemap = [
    ...hospitalPaths,
    ...hospitalGroupPaths,
    ...treatmentDirectoryPaths,
    ...diseasePaths,
    ...doctorPaths,
    ...specialtyPaths,
    ...patientSupportPaths,
    ...blogCategoryPaths,
  ].flatMap((route) =>
    locales.map((locale) => ({
      url: absoluteUrl(localizePath(route, locale)),
      changeFrequency: "monthly" as const,
      priority:
        locale === defaultLocale
          ? getPriority(route)
          : route.startsWith("/blog/category/")
            ? 0.68
            : 0.79,
    })),
  );

  const filePosts = getPublishedBlogSitemapEntries();
  const databasePosts =
    !env.DATABASE_URL
      ? []
      : await prisma.blogPost
          .findMany({
            where: { status: BlogStatus.PUBLISHED },
            select: {
              slug: true,
              updatedAt: true,
              publishedAt: true,
            },
            orderBy: [{ publishedAt: "desc" }, { updatedAt: "desc" }],
          })
          .catch(() => []);

  const blogPosts = Array.from(
    new Map(
      [...databasePosts, ...filePosts].map((post) => [
        post.slug,
        {
          slug: post.slug,
          updatedAt: post.updatedAt,
          publishedAt: post.publishedAt,
        },
      ]),
    ).values(),
  );

  return [
    ...staticRoutes,
    ...staticExtraRoutes,
    ...structuredDetailRoutes,
    ...blogPosts.flatMap((post) =>
      locales.map((locale) => ({
        url: absoluteUrl(localizePath(`/blog/${post.slug}`, locale)),
        lastModified: post.updatedAt,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
    ),
  ];
}
