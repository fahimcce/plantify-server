import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLE } from "./User.constant";
import { userController } from "./User.controller";

const router = express.Router();

router.get("/", auth(USER_ROLE.admin), userController.getAllUsers);
router.delete("/:id", auth(USER_ROLE.admin), userController.deleteUser);
router.get("/email", auth(USER_ROLE.admin), userController.getUserByEmail);

export const userRoutes = router;
