import { Router } from "express";
import { userController } from "./User.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./User.constant";
import validateRequest from "../../middlewares/validateRequest";
import { userValidation } from "./User.validation";

const router = Router();
router.get("/", userController.getAlluser);
router.post("/confirm-payment", userController.confirmPayment);
router.get(
  "/:email",
  auth(USER_ROLE.user, USER_ROLE.admin),
  userController.getUserByEmail
);
router.get("/id/:id", userController.getUserById);
router.put(
  "/follow-unfollow",
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(userValidation.followUnfollowValidationSchema),
  userController.followUnfollow
);
router.delete(
  "/delete/:userId",
  auth(USER_ROLE.admin),
  userController.deleteUser
);
router.patch(
  "/user-admin/:userId",
  auth(USER_ROLE.admin),
  userController.makeAdminUser
);
export const userRoute = router;
