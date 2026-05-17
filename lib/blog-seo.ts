import type { BlogPost } from "@prisma/client";

export function calculateBlogSeoScore(
  post: Pick<
    BlogPost,
    | "title"
    | "slug"
    | "excerpt"
    | "content"
    | "coverImage"
    | "category"
    | "tags"
    | "seoTitle"
    | "seoDescription"
    | "authorName"
    | "focusKeyword"
  >,
) {
  let score = 0;

  if (post.title.length >= 30) score += 10;
  if (post.slug.length >= 8) score += 8;
  if ((post.excerpt?.length ?? 0) >= 80) score += 10;
  if (post.content.length >= 600) score += 18;
  if (post.coverImage) score += 10;
  if (post.category) score += 8;
  if (post.tags.length >= 2) score += 8;
  if ((post.seoTitle?.length ?? 0) >= 30) score += 10;
  if ((post.seoDescription?.length ?? 0) >= 120) score += 10;
  if (post.authorName) score += 4;
  if (post.focusKeyword) score += 4;

  return Math.min(score, 100);
}
