// /modules/Post/Post.validation.ts

import { z } from "zod";

const createPostValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
    tags: z.array(z.string()).optional(),
    isPremium: z.boolean().optional(),
    image: z.string().url(),
  }),
});

const updatePostValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    tags: z.array(z.string()).optional(),
    isPremium: z.boolean().optional(),
    image: z.string().url().optional(),
  }),
});

export const postValidation = {
  createPostValidationSchema,
  updatePostValidationSchema,
};
