"use client";

import { useEffect, useState } from "react";
import { BlogStatus } from "@prisma/client";

import { saveBlogPostAction } from "@/lib/actions/blog";
import { slugify } from "@/lib/utils";
import { SubmitButton } from "@/components/forms/submit-button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type BlogEditorProps = {
  initialPost?: {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    category: string | null;
    tags: string[];
    featured: boolean;
    focusKeyword: string | null;
    seoTitle: string | null;
    seoDescription: string | null;
    authorName: string | null;
    authorRole: string | null;
    authorBio: string | null;
    status: BlogStatus;
    coverImage: string | null;
  } | null;
};

const editorSnippets = [
  { label: "Heading", value: "<h2>Section heading</h2>\n<p>Paragraph text.</p>" },
  { label: "Subheading", value: "<h3>Supporting subheading</h3>\n<p>Paragraph text.</p>" },
  { label: "Bullet List", value: "<ul>\n  <li>Point one</li>\n  <li>Point two</li>\n</ul>" },
  { label: "Quote", value: "<blockquote>Trusted healthcare insight quote.</blockquote>" },
  { label: "CTA", value: "<p><strong>MedPobeda Group</strong> can support this coordination workflow through direct stakeholder engagement.</p>" },
] as const;

export function BlogEditor({ initialPost }: BlogEditorProps) {
  const [title, setTitle] = useState(initialPost?.title ?? "");
  const [slug, setSlug] = useState(initialPost?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(initialPost?.slug));
  const [content, setContent] = useState(initialPost?.content ?? "<p>Write the article body here.</p>");

  useEffect(() => {
    if (slugTouched) {
      return;
    }

    setSlug(slugify(title));
  }, [slugTouched, title]);

  function insertSnippet(snippet: string) {
    setContent((current) => `${current.trim()}\n\n${snippet}`);
  }

  return (
    <Card className="border-white/10 p-6">
      <h2 className="font-display text-2xl font-semibold text-white">
        {initialPost ? "Edit Blog Entry" : "Create Blog Entry"}
      </h2>
      <form
        action={saveBlogPostAction}
        encType="multipart/form-data"
        className="mt-5 grid gap-5"
      >
        {initialPost ? <input type="hidden" name="id" value={initialPost.id} /> : null}
        <div className="grid gap-4 lg:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-white/90">
            Title
            <Input
              name="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Healthcare article title"
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-white/90">
            Slug
            <Input
              name="slug"
              value={slug}
              onChange={(event) => {
                setSlugTouched(true);
                setSlug(event.target.value);
              }}
              placeholder="healthcare-article-slug"
              required
            />
          </label>
        </div>
        <label className="grid gap-2 text-sm font-medium text-white/90">
          Excerpt
          <Textarea
            name="excerpt"
            defaultValue={initialPost?.excerpt ?? ""}
            placeholder="Short article summary"
            className="min-h-[96px]"
          />
        </label>
        <div className="grid gap-4 lg:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-white/90">
            Category
            <Input
              name="category"
              defaultValue={initialPost?.category ?? ""}
              placeholder="Medical Tourism, Partnerships, International Patients"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-white/90">
            Tags
            <Input
              name="tags"
              defaultValue={initialPost?.tags?.join(", ") ?? ""}
              placeholder="medical tourism, hospital partnerships, patient coordination"
            />
          </label>
        </div>
        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-4">
            <div className="flex flex-wrap gap-3">
              {editorSnippets.map((snippet) => (
                <button
                  key={snippet.label}
                  type="button"
                  onClick={() => insertSnippet(snippet.value)}
                  className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200 transition hover:bg-white/8"
                >
                  {snippet.label}
                </button>
              ))}
            </div>
            <label className="grid gap-2 text-sm font-medium text-white/90">
              Rich Content
              <Textarea
                name="content"
                value={content}
                onChange={(event) => setContent(event.target.value)}
                placeholder="Use HTML blocks for structured content."
                className="min-h-[320px] font-mono text-sm"
                required
              />
            </label>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/28 p-4">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100/70">
              Live Preview
            </p>
            <div
              className="prose prose-invert mt-4 max-w-none text-sm leading-7 text-slate-200"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-white/90">
            SEO Title
            <Input
              name="seoTitle"
              defaultValue={initialPost?.seoTitle ?? ""}
              placeholder="SEO title"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-white/90">
            Focus Keyword
            <Input
              name="focusKeyword"
              defaultValue={initialPost?.focusKeyword ?? ""}
              placeholder="e.g. medical tourism coordination"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-white/90 lg:col-span-2">
            SEO Description
            <Input
              name="seoDescription"
              defaultValue={initialPost?.seoDescription ?? ""}
              placeholder="SEO description"
            />
          </label>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-white/90">
            Author Name
            <Input
              name="authorName"
              defaultValue={initialPost?.authorName ?? ""}
              placeholder="Author name"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-white/90">
            Author Role
            <Input
              name="authorRole"
              defaultValue={initialPost?.authorRole ?? ""}
              placeholder="Author role or editorial context"
            />
          </label>
        </div>
        <label className="grid gap-2 text-sm font-medium text-white/90">
          Author Bio
          <Textarea
            name="authorBio"
            defaultValue={initialPost?.authorBio ?? ""}
            placeholder="Short author biography"
            className="min-h-[110px]"
          />
        </label>
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
          <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm font-medium text-white/90">
            <input
              type="checkbox"
              name="featured"
              value="true"
              defaultChecked={initialPost?.featured ?? false}
              className="h-4 w-4 rounded border-white/10"
            />
            Mark as featured article
          </label>
          <select
            name="status"
            defaultValue={initialPost?.status ?? BlogStatus.DRAFT}
            className="flex h-12 w-full rounded-2xl border border-white/10 bg-white/90 px-4 py-3 text-sm text-slate-950"
          >
            {Object.values(BlogStatus).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <Input type="file" name="coverImage" accept="image/png,image/jpeg,image/webp" />
        </div>
        <SubmitButton type="submit" variant="hero" pendingLabel="Saving post...">
          {initialPost ? "Update Blog Post" : "Save Blog Post"}
        </SubmitButton>
      </form>
    </Card>
  );
}
