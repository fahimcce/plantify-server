import { Router } from "express";
import { authValidation } from "./auth.validation";
import { authController } from "./auth.controler";
import validateRequest, { validateRequestCookies } from "../../middleWare/validateRequest";
import authGaurd from "../../middleWare/authGaurd";
import { USER_ROLE } from "../User/user.constant";

const router = Router();
router.post(
  "/register",
  // upload.single("file"),
  // (req, res, next) => {
  //   req.body = JSON.parse(req.body.data);
  //   next();
  // },
  validateRequest(authValidation.registerUserValidationSchema),
  authController.registerUser
);

router.post("/login", validateRequest(authValidation.loginValidation), authController.loginUser);

router.post("/refresh-token", validateRequestCookies(authValidation.refreshTokenValidation), authController.refreshToken);

// update user
router.put(
  "/update-user/:id",
  // upload.single("file"),
  // (req, res, next) => {
  //   req.body = JSON.parse(req.body.data);
  //   next();
  // },
  authGaurd(USER_ROLE.ADMIN, USER_ROLE.USER),
  validateRequest(authValidation.updateUserValidationSchema),
  authController.updateUser
);

router.post(
  "/change-password",
  authGaurd(USER_ROLE.USER, USER_ROLE.ADMIN),
  validateRequest(authValidation.changePasswordValidationSchema),
  authController.changePassword
);

export const authRouter = router;
