import { z } from "zod";
import mongoose from "mongoose";

export const userSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  role: z.enum(["admin", "user"]).optional(),
  email: z.string().email("Invalid email address"),
  follower: z.array(z.instanceof(mongoose.Types.ObjectId)).optional(),
  following: z.array(z.instanceof(mongoose.Types.ObjectId)).optional(),
  upVotesItem: z.array(z.instanceof(mongoose.Types.ObjectId)).optional(),
  downVotesItem: z.array(z.instanceof(mongoose.Types.ObjectId)).optional(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phoneNumber: z.string().optional(),
  profilePhoto: z.string().url("Invalid URL").optional(),
});

export type TUser = z.infer<typeof userSchema>;

const followUnfollowValidationSchema = z.object({
  body: z.object({
    userId: z.string({ required_error: "user id required" }),
    email: z.string({ required_error: "email id required" }),
  }),
});

export const userValidation = {
  followUnfollowValidationSchema,
};
