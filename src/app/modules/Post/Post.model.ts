import { model, Schema } from "mongoose";
import { TPost, PostModel } from "./Post.interface";

const PostSchema = new Schema<TPost, PostModel>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    tags: [{ type: String }],
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    isPremium: { type: Boolean, default: false },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

// Method to calculate total upvotes
PostSchema.methods.calculateUpvotes = function () {
  return this.upvotes - this.downvotes;
};

export const Post = model<TPost, PostModel>("Post", PostSchema);
