import { BlogStatus } from "@prisma/client";
import { z } from "zod";

export const blogPostSchema = z.object({
  id: z.string().cuid().optional(),
  title: z.string().min(4, "Title is required."),
  slug: z
    .string()
    .min(3, "Slug is required.")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens only."),
  excerpt: z.string().optional(),
  content: z.string().min(50, "Content is required."),
  category: z.string().optional(),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  focusKeyword: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  authorName: z.string().optional(),
  authorRole: z.string().optional(),
  authorBio: z.string().optional(),
  status: z.nativeEnum(BlogStatus),
});
