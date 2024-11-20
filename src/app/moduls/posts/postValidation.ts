import { z } from "zod";

export const postValidationSchema = z.object({
  title: z.string().min(1, "Title is required"), // Ensure the title is a non-empty string
  post: z.any(), // Since post is of type `any`, we can use `z.any()` or refine it based on specific needs
  userId: z.string({ required_error: "User id required" }), // Ensure the userId is a non-empty string
  activity: z
    .array(
      z.object({
        userId: z.string().min(1, "User ID is required for activity").optional(), // Each activity should have a userId
        votes: z.boolean().optional(), // Validate that votes should be boolean (true/false)
        comment: z.array(z.string().min(1, "Comment is required")).optional(),
      })
    )
    .optional(), // Optional field for activity array
  category: z.string({ required_error: "Post category is required" }),
  premium: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
});

export const postUpdateValidationSchema = z.object({
  title: z.string().min(1, "Title is required").optional(), // Ensure the title is a non-empty string
  post: z.any().optional(), // Since post is of type `any`, we can use `z.any()` or refine it based on specific needs
  userId: z.string({ required_error: "User id required" }).optional(), // Ensure the userId is a non-empty string
  // Optional field for activity array
  category: z.string({ required_error: "Post category is required" }).optional(),
  premium: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
});
export type TPost = z.infer<typeof postUpdateValidationSchema>; // This infers the type from the schema
