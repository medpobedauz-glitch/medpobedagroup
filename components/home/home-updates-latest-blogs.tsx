import { getPublishedBlogPosts } from "@/lib/data/blog";
import { getMessages } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/i18n/request";
import {
  fallbackHomepageBlogs,
  homepageEvents,
  type HomepageEditorialBlog,
} from "@/lib/home-updates";
import { HomeUpdatesLatestBlogsView } from "@/components/home/home-updates-latest-blogs-view";

function toHomepageBlogs(
  posts: Awaited<ReturnType<typeof getPublishedBlogPosts>>,
): HomepageEditorialBlog[] {
  const messages = getMessages(getRequestLocale());
  return posts.slice(0, 4).map((post, index) => ({
    id: post.id,
    title: post.title,
    excerpt:
      post.seoDescription ||
      post.excerpt ||
      messages.chrome.blogCard.fallbackExcerpt,
    publishedAt: (post.publishedAt ?? post.createdAt).toLocaleDateString(messages.chrome.blogCard.dateLocale, {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    href: `/blog/${post.slug}`,
    image:
      post.coverImage ||
      fallbackHomepageBlogs[index % fallbackHomepageBlogs.length]!.image,
    category: post.category || messages.routes.blog.title,
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
