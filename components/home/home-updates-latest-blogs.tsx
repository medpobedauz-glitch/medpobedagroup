import { getPublishedBlogPosts } from "@/lib/data/blog";
import {
  fallbackHomepageBlogs,
  homepageEvents,
  type HomepageEditorialBlog,
} from "@/lib/home-updates";
import { HomeUpdatesLatestBlogsView } from "@/components/home/home-updates-latest-blogs-view";

function toHomepageBlogs(
  posts: Awaited<ReturnType<typeof getPublishedBlogPosts>>,
): HomepageEditorialBlog[] {
  return posts.slice(0, 4).map((post, index) => ({
    id: post.id,
    title: post.title,
    excerpt:
      post.seoDescription ||
      post.excerpt ||
      "Read the latest healthcare update from MedPobeda Group.",
    publishedAt: (post.publishedAt ?? post.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    href: `/blog/${post.slug}`,
    image:
      post.coverImage ||
      fallbackHomepageBlogs[index % fallbackHomepageBlogs.length]!.image,
    category: post.category || "Healthcare Insights",
  }));
}

export async function HomeUpdatesLatestBlogs() {
  const posts = await getPublishedBlogPosts();
  const latestBlogs = toHomepageBlogs(posts);

  return (
    <HomeUpdatesLatestBlogsView
      events={homepageEvents}
      blogs={latestBlogs.length ? latestBlogs : fallbackHomepageBlogs}
    />
  );
}
