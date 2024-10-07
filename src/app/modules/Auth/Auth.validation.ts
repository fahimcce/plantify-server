// /modules/Auth/Auth.validation.ts

import { z } from "zod";

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email format"),
    password: z.string(),
  }),
});

export const authValidation = {
  loginValidationSchema,
};
