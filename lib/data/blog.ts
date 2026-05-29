import { BlogStatus } from "@prisma/client";

import {
  blogCategories,
  getAllEnglishBlogPosts,
  getBlogCategories as getCatalogCategories,
  getBlogPost as getCatalogBlogPost,
  getBlogPostsForLocale,
  type BlogPost as CatalogBlogPost,
} from "@/data/blog-posts";
import { env } from "@/lib/env";
import { defaultLocale, type AppLocale } from "@/lib/i18n/config";
import { prisma } from "@/lib/prisma";

export type PublicBlogPost = {
  id: string;
  slug: string;
  locale: AppLocale;
  title: string;
  excerpt: string | null;
  content: string;
  category: string | null;
  tags: string[];
  featured: boolean;
  status: BlogStatus;
  publishedAt: Date | null;
  updatedAt: Date;
  createdAt: Date;
  seoTitle: string | null;
  seoDescription: string | null;
  authorName: string | null;
  authorRole: string | null;
  authorBio: string | null;
  focusKeyword: string | null;
  coverImage: string | null;
  featuredImageAlt: string;
  readingTime: number;
  sections: CatalogBlogPost["sections"];
  faqs: CatalogBlogPost["faqs"];
  relatedPosts: string[];
  translationStatus: CatalogBlogPost["translationStatus"];
  translationNote?: string;
  keywords: string[];
};

type BlogListFilters = {
  locale?: AppLocale;
  q?: string;
  category?: string;
  tag?: string;
};

function normalizeCatalogPost(post: CatalogBlogPost): PublicBlogPost {
  const categoryName =
    blogCategories.find((category) => category.slug === post.category)?.names[post.locale] ??
    post.category;

  return {
    id: post.id,
    slug: post.slug,
    locale: post.locale,
    title: post.title,
    excerpt: post.excerpt,
    content: post.contentText,
    category: categoryName,
    tags: post.tags,
    featured: post.featured,
    status: BlogStatus.PUBLISHED,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    createdAt: post.publishedAt,
    seoTitle: post.metaTitle,
    seoDescription: post.metaDescription,
    authorName: post.author,
    authorRole: null,
    authorBio: null,
    focusKeyword: post.keywords[0] ?? null,
    coverImage: post.featuredImage,
    featuredImageAlt: post.featuredImageAlt,
    readingTime: post.readingTime,
    sections: post.sections,
    faqs: post.faqs,
    relatedPosts: post.relatedPosts,
    translationStatus: post.translationStatus,
    translationNote: post.translationNote,
    keywords: post.keywords,
  };
}

async function getDatabasePublishedPosts(): Promise<PublicBlogPost[]> {
  if (!env.DATABASE_URL) {
    return [];
  }

  try {
    const posts = await prisma.blogPost.findMany({
      where: { status: BlogStatus.PUBLISHED },
      orderBy: [{ publishedAt: "desc" }, { updatedAt: "desc" }],
    });

    return posts.map((post) => ({
      id: post.id,
      slug: post.slug,
      locale: defaultLocale,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      tags: post.tags,
      featured: post.featured,
      status: post.status,
      publishedAt: post.publishedAt,
      updatedAt: post.updatedAt,
      createdAt: post.createdAt,
      seoTitle: post.seoTitle,
      seoDescription: post.seoDescription,
      authorName: post.authorName,
      authorRole: post.authorRole,
      authorBio: post.authorBio,
      focusKeyword: post.focusKeyword,
      coverImage: post.coverImage,
      featuredImageAlt: post.title,
      readingTime: Math.max(5, Math.ceil(post.content.split(/\s+/).filter(Boolean).length / 190)),
      sections: [],
      faqs: [],
      relatedPosts: [],
      translationStatus: "published",
      keywords: Array.from(
        new Set(
          [...(post.tags ?? []), post.focusKeyword].filter(
            (value): value is string => Boolean(value),
          ),
        ),
      ),
    }));
  } catch {
    return [];
  }
}

function mergePosts(primary: PublicBlogPost[], secondary: PublicBlogPost[]) {
  const merged = new Map<string, PublicBlogPost>();

  for (const post of secondary) {
    merged.set(post.slug, post);
  }

  for (const post of primary) {
    merged.set(post.slug, post);
  }

  return Array.from(merged.values());
}

function searchMatches(post: PublicBlogPost, query: string) {
  const haystack = [
    post.title,
    post.excerpt ?? "",
    post.category ?? "",
    post.tags.join(" "),
    post.content,
    post.keywords.join(" "),
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(query.toLowerCase());
}

export async function getPublishedBlogPosts(
  filters: BlogListFilters = {},
): Promise<PublicBlogPost[]> {
  const locale = filters.locale ?? defaultLocale;
  const catalogPosts = getBlogPostsForLocale(locale).map(normalizeCatalogPost);
  const databasePosts = locale === defaultLocale ? await getDatabasePublishedPosts() : [];

  return mergePosts(catalogPosts, databasePosts)
    .filter((post) =>
      filters.category
        ? blogCategories
            .find((category) => category.slug === filters.category)
            ?.names[locale]
            ? post.category ===
              blogCategories.find((category) => category.slug === filters.category)?.names[locale]
            : post.category?.toLowerCase() === filters.category.toLowerCase()
        : true,
    )
    .filter((post) =>
      filters.tag
        ? post.tags.some((tag) => tag.toLowerCase() === filters.tag?.toLowerCase())
        : true,
    )
    .filter((post) => (filters.q ? searchMatches(post, filters.q) : true))
    .sort((left, right) => {
      if (left.featured !== right.featured) {
        return Number(right.featured) - Number(left.featured);
      }

      return (right.publishedAt ?? right.updatedAt).getTime() - (left.publishedAt ?? left.updatedAt).getTime();
    });
}

export async function getBlogPostBySlug(
  slug: string,
  locale: AppLocale = defaultLocale,
): Promise<PublicBlogPost | null> {
  const catalogPost = getCatalogBlogPost(slug, locale);
  if (catalogPost) {
    return normalizeCatalogPost(catalogPost);
  }

  if (!env.DATABASE_URL || locale !== defaultLocale) {
    return null;
  }

  try {
    const post = await prisma.blogPost.findFirst({
      where: {
        slug,
        status: BlogStatus.PUBLISHED,
      },
    });

    if (!post) {
      return null;
    }

    return {
      id: post.id,
      slug: post.slug,
      locale: defaultLocale,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      tags: post.tags,
      featured: post.featured,
      status: post.status,
      publishedAt: post.publishedAt,
      updatedAt: post.updatedAt,
      createdAt: post.createdAt,
      seoTitle: post.seoTitle,
      seoDescription: post.seoDescription,
      authorName: post.authorName,
      authorRole: post.authorRole,
      authorBio: post.authorBio,
      focusKeyword: post.focusKeyword,
      coverImage: post.coverImage,
      featuredImageAlt: post.title,
      readingTime: Math.max(5, Math.ceil(post.content.split(/\s+/).filter(Boolean).length / 190)),
      sections: [],
      faqs: [],
      relatedPosts: [],
      translationStatus: "published",
      keywords: Array.from(
        new Set(
          [...(post.tags ?? []), post.focusKeyword].filter(
            (value): value is string => Boolean(value),
          ),
        ),
      ),
    };
  } catch {
    return null;
  }
}

export async function getBlogTaxonomy(locale: AppLocale = defaultLocale) {
  const posts = await getPublishedBlogPosts({ locale });
  const categoryCounts = new Map<string, number>();
  const tagCounts = new Map<string, number>();
  const localizedCategories = getCatalogCategories(locale);

  for (const post of posts) {
    if (post.category) {
      categoryCounts.set(post.category, (categoryCounts.get(post.category) ?? 0) + 1);
    }

    for (const tag of post.tags) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    }
  }

  return {
    categories: localizedCategories.map((category) => ({
      slug: category.slug,
      name: category.name,
      description: category.description,
      icon: category.icon,
      count: categoryCounts.get(category.name) ?? 0,
      metaTitle: category.metaTitle,
      metaDescription: category.metaDescription,
    })),
    tags: Array.from(tagCounts.entries())
      .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
      .map(([name, count]) => ({ name, count })),
  };
}

export async function getRelatedBlogPosts({
  slug,
  category,
  tags = [],
  locale = defaultLocale,
  limit = 3,
}: {
  slug: string;
  category?: string | null;
  tags?: string[];
  locale?: AppLocale;
  limit?: number;
}) {
  const currentPost = await getBlogPostBySlug(slug, locale);
  const posts = await getPublishedBlogPosts({ locale });

  if (currentPost?.relatedPosts.length) {
    const relatedLookup = new Map(
      posts
        .filter((post) => currentPost.relatedPosts.includes(post.slug) && post.slug !== slug)
        .map((post) => [post.slug, post]),
    );

    const ordered = currentPost.relatedPosts
      .map((relatedSlug) => relatedLookup.get(relatedSlug))
      .filter(Boolean) as PublicBlogPost[];

    if (ordered.length >= limit) {
      return ordered.slice(0, limit);
    }

    const fallback = posts
      .filter((post) => post.slug !== slug && !currentPost.relatedPosts.includes(post.slug))
      .filter((post) =>
        category && post.category
          ? post.category.toLowerCase() === category.toLowerCase()
          : post.tags.some((tag) => tags.includes(tag)),
      )
      .slice(0, limit - ordered.length);

    return [...ordered, ...fallback];
  }

  return posts
    .filter((post) => post.slug !== slug)
    .map((post) => {
      let score = 0;

      if (category && post.category && post.category.toLowerCase() === category.toLowerCase()) {
        score += 3;
      }

      score += post.tags.filter((tag) => tags.includes(tag)).length;

      return { post, score };
    })
    .filter((item) => item.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, limit)
    .map((item) => item.post);
}

export async function getAdminBlogPosts() {
  if (!env.DATABASE_URL) {
    return [];
  }

  try {
    return prisma.blogPost.findMany({
      orderBy: [{ publishedAt: "desc" }, { updatedAt: "desc" }],
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  } catch {
    return [];
  }
}

export function getPublishedBlogSlugs() {
  return Array.from(new Set(getAllEnglishBlogPosts().map((post) => post.slug)));
}

export function getPublishedBlogSitemapEntries() {
  return getAllEnglishBlogPosts().map((post) => ({
    slug: post.slug,
    updatedAt: post.updatedAt,
    publishedAt: post.publishedAt,
  }));
}
