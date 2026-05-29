import type { MetadataRoute } from "next";
import { BlogStatus } from "@prisma/client";

import { doctorSpecialtyPages } from "@/lib/doctor-specialty-pages";
import { getBlogTaxonomy, getPublishedBlogSitemapEntries } from "@/lib/data/blog";
import { env } from "@/lib/env";
import { featuredHospitals } from "@/lib/hospital-pages";
import { defaultLocale, locales, localizePath } from "@/lib/i18n/config";
import { absoluteUrl } from "@/lib/metadata";
import { patientSupportPages } from "@/lib/patient-support-pages";
import { prisma } from "@/lib/prisma";
import { publicRoutes } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const staticExtraRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/llms.txt"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ];
  const blogTaxonomySets = await Promise.all(locales.map((locale) => getBlogTaxonomy(locale)));
  const blogCategorySlugs = Array.from(
    new Set(blogTaxonomySets.flatMap((taxonomy) => taxonomy.categories.map((category) => category.slug))),
  );
  const hospitalPaths = featuredHospitals.map((hospital) => `/hospitals/${hospital.slug}`);
  const doctorPaths = doctorSpecialtyPages.map((page) => `/doctors/${page.slug}`);
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
    if (r === "/hospitals" || r === "/doctors" || r === "/patient-support") return 0.88;
    if (r === "/treatments") return 0.89;
    if (r === "/company-profile" || r === "/press") return 0.86;
    if (hospitalPaths.includes(r) || doctorPaths.includes(r) || patientSupportPaths.includes(r))
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

  const staticRoutes: MetadataRoute.Sitemap = publicRoutes.flatMap((route) =>
    locales.map((locale) => ({
      url: absoluteUrl(localizePath(route, locale)),
      lastModified,
      changeFrequency: getChangeFrequency(route),
      // Use the same priority logic for all locales.
      priority: getPriority(route),
    })),
  );
  const structuredDetailRoutes: MetadataRoute.Sitemap = [
    ...hospitalPaths,
    ...doctorPaths,
    ...patientSupportPaths,
    ...blogCategoryPaths,
  ].flatMap((route) =>
    locales.map((locale) => ({
      url: absoluteUrl(localizePath(route, locale)),
      lastModified,
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
