import { UserRole } from "@prisma/client";
import { z } from "zod";

export const adminLoginSchema = z.object({
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(8, "Password is required."),
});

export const adminUserSchema = z.object({
  name: z.string().min(2, "Name is required."),
  email: z.string().email("Valid email is required."),
  password: z.string().min(12, "Password must be at least 12 characters."),
  role: z.nativeEnum(UserRole),
});

export const adminUserUpdateSchema = z.object({
  userId: z.string().cuid(),
  role: z.nativeEnum(UserRole).optional(),
  isActive: z.boolean().optional(),
});
