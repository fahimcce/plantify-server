import httpStatus from "http-status";
import { TPost } from "./Post.interface";
import { Post } from "./Post.model";
import AppError from "../../errors/AppError";

const createPostInDb = async (payload: TPost) => {
  const post = await Post.create(payload);
  return post;
};

const getAllPostsFromDb = async () => {
  return await Post.find().populate("author"); // You may customize this to filter or sort as needed
};

const getPostByIdFromDb = async (id: string) => {
  const post = await Post.findById(id).populate("author");
  if (!post) {
    throw new AppError(httpStatus.NOT_FOUND, "Post not found.");
  }
  return post;
};

const updatePostInDb = async (id: string, payload: Partial<TPost>) => {
  const post = await Post.findByIdAndUpdate(id, payload, { new: true });
  if (!post) {
    throw new AppError(httpStatus.NOT_FOUND, "Post not found.");
  }
  return post;
};

const deletePostInDb = async (id: string) => {
  const post = await Post.findByIdAndDelete(id);
  if (!post) {
    throw new AppError(httpStatus.NOT_FOUND, "Post not found.");
  }
  return post;
};

export const postServices = {
  createPostInDb,
  getAllPostsFromDb,
  getPostByIdFromDb,
  updatePostInDb,
  deletePostInDb,
};
