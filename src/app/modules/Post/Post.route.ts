import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/User.constant";
import { postController } from "./Post.controller";
import validateRequest from "../../middlewares/validateRequest";
import { postUpdateValidationSchema } from "./Post.validation";

const router = Router();
router.post(
  "/",
  auth(USER_ROLE.user, USER_ROLE.admin),
  postController.makePost
);
router.get("/", postController.getPosts);
router.get("/total-post", postController.postCount);
router.get("/:id", postController.getPostByid);
router.get("/postby-user/:id", postController.getPostByUserId);
router.get("/voteSummery/:id", postController.postVoteSummery);
router.put(
  "/handle-voting/:postId",
  auth(USER_ROLE.admin, USER_ROLE.user),
  postController.handleVoting
);
router.put(
  "/handle-comment/:postId",
  auth(USER_ROLE.admin, USER_ROLE.user),
  postController.addComments
);
router.put(
  "/update-post/:postId",
  auth(USER_ROLE.user, USER_ROLE.admin),
  validateRequest(postUpdateValidationSchema),
  postController.updatePost
);
router.delete(
  "/delete/:postId",
  auth(USER_ROLE.user, USER_ROLE.admin),
  postController.deletePostId
);
export const postRouter = router;
