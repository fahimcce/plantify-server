import express from "express";
import { authValidation } from "./Auth.validation";
import validateRequest from "../../middlewares/validateRequest";
import { userValidation } from "../User/User.validation";
import { authController } from "./Auth.controller";

const router = express.Router();

router.post(
  "/signup",
  validateRequest(userValidation.createUserValidationSchema),
  authController.signUp
);

router.post(
  "/login",
  validateRequest(authValidation.loginValidationSchema),
  authController.login
);

router.get("/users", authController.getOneUser);

export const authRoutes = router;
