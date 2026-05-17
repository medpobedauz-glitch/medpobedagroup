import { NextResponse } from "next/server";

import { getPublishedBlogPosts } from "@/lib/data/blog";

export const dynamic = "force-dynamic";

export async function GET() {
  const posts = await getPublishedBlogPosts();

  return NextResponse.json({
    items: posts.map((post) => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      coverImage: post.coverImage,
      seoTitle: post.seoTitle,
      seoDescription: post.seoDescription,
      publishedAt: post.publishedAt,
      updatedAt: post.updatedAt,
      url: `/blog/${post.slug}`,
    })),
  });
}
