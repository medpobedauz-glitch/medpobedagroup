import type { MetadataRoute } from "next";
import { BlogStatus } from "@prisma/client";

import { env } from "@/lib/env";
import { defaultLocale, locales, localizePath } from "@/lib/i18n/config";
import { absoluteUrl } from "@/lib/metadata";
import { prisma } from "@/lib/prisma";
import { publicRoutes } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const getChangeFrequency = (
    route: string,
  ): NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]> =>
    route === "/" ? "weekly" : "monthly";
  const getPriority = (route: string) =>
    route === "/"
      ? 1
      : route === "/medical-tourism" || route === "/hospital-partnerships"
        ? 0.9
        : 0.8;

  const staticRoutes: MetadataRoute.Sitemap = publicRoutes.flatMap((route) =>
    locales.map((locale) => ({
      url: absoluteUrl(localizePath(route, locale)),
      lastModified,
      changeFrequency: getChangeFrequency(route),
      priority:
        locale === defaultLocale
          ? getPriority(route)
          : route === "/"
            ? 0.9
            : route === "/medical-tourism" || route === "/hospital-partnerships"
              ? 0.85
              : 0.75,
    })),
  );

  if (!env.DATABASE_URL) {
    return staticRoutes;
  }

  try {
    const posts = await prisma.blogPost.findMany({
      where: { status: BlogStatus.PUBLISHED },
      select: {
        slug: true,
        updatedAt: true,
        publishedAt: true,
      },
      orderBy: [{ publishedAt: "desc" }, { updatedAt: "desc" }],
    });

    return [
      ...staticRoutes,
      ...posts.flatMap((post) =>
        locales.map((locale) => ({
          url: absoluteUrl(localizePath(`/blog/${post.slug}`, locale)),
          lastModified: post.updatedAt,
          changeFrequency: "monthly" as const,
          priority: locale === defaultLocale ? 0.75 : 0.7,
        })),
      ),
    ];
  } catch {
    return staticRoutes;
  }
}
