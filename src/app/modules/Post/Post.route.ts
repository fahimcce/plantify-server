import express from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/User.constant";
import validateRequest from "../../middlewares/validateRequest";
import { postValidation } from "./Post.validation";
import { postController } from "./Post.controller";

const router = express.Router();

router.post(
  "/",
  validateRequest(postValidation.createPostValidationSchema),
  postController.createPost
);

router.get("/", postController.getAllPosts);

router.get("/:id", postController.getPostById);

router.put(
  "/:id",
  auth(USER_ROLE.admin), // Or the appropriate role that can update a post
  validateRequest(postValidation.updatePostValidationSchema),
  postController.updatePost
);

router.delete(
  "/:id",
  auth(USER_ROLE.admin), // Or the appropriate role that can delete a post
  postController.deletePost
);

export const postRoutes = router;
