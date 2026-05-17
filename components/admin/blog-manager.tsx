import { BlogStatus } from "@prisma/client";
import Link from "next/link";

import {
  deleteBlogPostAction,
  updateBlogStatusAction,
} from "@/lib/actions/blog";
import { calculateBlogSeoScore } from "@/lib/blog-seo";
import { BlogEditor } from "@/components/admin/blog-editor";
import { SubmitButton } from "@/components/forms/submit-button";
import { Card } from "@/components/ui/card";

type BlogManagerProps = {
  posts: Awaited<ReturnType<typeof import("@/lib/data/blog").getAdminBlogPosts>>;
  selectedPostId?: string;
};

const statuses = Object.values(BlogStatus);

export function BlogManager({ posts, selectedPostId }: BlogManagerProps) {
  const selectedPost = posts.find((post) => post.id === selectedPostId) ?? null;

  return (
    <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
      <BlogEditor key={selectedPost?.id ?? "new"} initialPost={selectedPost} />
      <div className="grid gap-5">
        {posts.map((post) => {
          const seoScore = calculateBlogSeoScore(post);

          return (
          <Card key={post.id} className="border-white/10 p-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">
                  {post.status}
                </span>
                {post.featured ? (
                  <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-100">
                    Featured
                  </span>
                ) : null}
                {post.category ? (
                  <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">
                    {post.category}
                  </span>
                ) : null}
                <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">
                  {post.slug}
                </span>
              </div>
              <div>
                <h3 className="font-display text-2xl font-semibold text-white">
                  {post.title}
                </h3>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">
                  SEO score {seoScore}/100
                  {post.focusKeyword ? ` • Focus keyword: ${post.focusKeyword}` : ""}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {post.seoDescription || post.excerpt || "No description provided yet."}
                </p>
                {post.tags.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-slate-950/28 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
              <div className="grid gap-3">
                <form action={updateBlogStatusAction} className="flex gap-3">
                  <input type="hidden" name="id" value={post.id} />
                  <select
                    name="status"
                    defaultValue={post.status}
                    className="flex h-12 rounded-2xl border border-white/10 bg-white/90 px-4 py-3 text-sm text-slate-950"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  <SubmitButton
                    type="submit"
                    variant="secondary"
                    pendingLabel="Updating..."
                  >
                    Update
                  </SubmitButton>
                </form>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/admin/blog?edit=${post.id}`}
                    className="inline-flex h-12 items-center justify-center rounded-full border border-white/10 px-5 text-sm font-semibold text-white transition hover:bg-white/8"
                  >
                    Edit
                  </Link>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex h-12 items-center justify-center rounded-full border border-white/10 px-5 text-sm font-semibold text-white transition hover:bg-white/8"
                  >
                    View Post
                  </Link>
                  <form action={deleteBlogPostAction}>
                    <input type="hidden" name="id" value={post.id} />
                    <SubmitButton
                      type="submit"
                      variant="outline"
                      pendingLabel="Deleting..."
                    >
                      Delete
                    </SubmitButton>
                  </form>
                </div>
              </div>
            </div>
          </Card>
          );
        })}
      </div>
    </div>
  );
}
