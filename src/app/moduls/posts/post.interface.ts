import mongoose, { Schema } from "mongoose";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type TPost = {
  title: string;
  post: any;
  userId: Schema.Types.ObjectId;
  activity?: {
    userId?: mongoose.Schema.Types.ObjectId;
    comment?: string[];
    votes?: boolean;
  }[];
  category: mongoose.Schema.Types.ObjectId;
  premium?: boolean;
  isDeleted?: boolean;
};
