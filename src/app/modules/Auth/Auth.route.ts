import { Router } from "express";
import validateRequest, {
  validateRequestCookies,
} from "../../middlewares/validateRequest";
import { authValidation } from "./Auth.validation";
import { authController } from "./Auth.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/User.constant";

const router = Router();
router.post(
  "/register",
  validateRequest(authValidation.registerUserValidationSchema),
  authController.registerUser
);
router.post(
  "/login",
  validateRequest(authValidation.loginValidation),
  authController.loginUser
);

router.post(
  "/refresh-token",
  validateRequestCookies(authValidation.refreshTokenValidation),
  authController.refreshToken
);

// update user
router.put(
  "/update-user/:id",
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(authValidation.updateUserValidationSchema),
  authController.updateUser
);

router.post(
  "/change-password",
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(authValidation.changePasswordValidationSchema),
  authController.changePassword
);

export const authRouter = router;
