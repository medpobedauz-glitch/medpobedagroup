import { requireAdminUser } from "@/lib/auth/session";
import { getAdminBlogPosts } from "@/lib/data/blog";
import { AdminShell } from "@/components/admin/admin-shell";
import { BlogManager } from "@/components/admin/blog-manager";

export const dynamic = "force-dynamic";

type AdminBlogPageProps = {
  searchParams?: {
    edit?: string;
  };
};

export default async function AdminBlogPage({ searchParams }: AdminBlogPageProps) {
  const user = await requireAdminUser();
  const posts = await getAdminBlogPosts();

  return (
    <AdminShell
      currentPath="/admin/blog"
      title="Blog Publishing"
      description="Create, draft, publish, and manage SEO-ready blog content for MedPobeda’s healthcare collaboration and medical tourism visibility strategy."
      user={user}
    >
      <BlogManager posts={posts} selectedPostId={searchParams?.edit} />
    </AdminShell>
  );
}
