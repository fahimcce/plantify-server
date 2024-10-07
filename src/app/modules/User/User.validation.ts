// /modules/User/User.validation.ts

import { z } from "zod";

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    password: z.string(),
    phone: z.string().optional(),
    address: z.string().min(1, "Address is required"),
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email("Invalid email format").optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
  }),
});

export const userValidation = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
