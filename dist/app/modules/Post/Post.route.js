"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const User_constant_1 = require("../User/User.constant");
const Post_controller_1 = require("./Post.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const Post_validation_1 = require("./Post.validation");
const router = (0, express_1.Router)();
router.post("/", (0, auth_1.default)(User_constant_1.USER_ROLE.user, User_constant_1.USER_ROLE.admin), Post_controller_1.postController.makePost);
router.get("/", Post_controller_1.postController.getPosts);
router.get("/total-post", Post_controller_1.postController.postCount);
router.get("/:id", Post_controller_1.postController.getPostByid);
router.get("/postby-user/:id", Post_controller_1.postController.getPostByUserId);
router.get("/voteSummery/:id", Post_controller_1.postController.postVoteSummery);
router.put("/handle-voting/:postId", (0, auth_1.default)(User_constant_1.USER_ROLE.admin, User_constant_1.USER_ROLE.user), Post_controller_1.postController.handleVoting);
router.put("/handle-comment/:postId", (0, auth_1.default)(User_constant_1.USER_ROLE.admin, User_constant_1.USER_ROLE.user), Post_controller_1.postController.addComments);
router.put("/update-post/:postId", (0, auth_1.default)(User_constant_1.USER_ROLE.user, User_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(Post_validation_1.postUpdateValidationSchema), Post_controller_1.postController.updatePost);
router.delete("/delete/:postId", (0, auth_1.default)(User_constant_1.USER_ROLE.user, User_constant_1.USER_ROLE.admin), Post_controller_1.postController.deletePostId);
exports.postRouter = router;
