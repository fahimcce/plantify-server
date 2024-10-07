import { Model, Types } from "mongoose";

export type TPost = {
  title: string;
  content: string;
  author: Types.ObjectId;
  tags: string[];
  upvotes: number;
  downvotes: number;
  isPremium: boolean;
  image: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface PostModel extends Model<TPost> {
  calculateUpvotes(): number;
}
