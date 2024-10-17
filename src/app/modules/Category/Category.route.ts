import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLE } from "../User/User.constant";
import { categoryValidation } from "./Category.validation";
import { categoryController } from "./Category.Controller";

const router = Router();

router.post(
  "/",
  auth(USER_ROLE.admin),
  validateRequest(categoryValidation.categoryValidationSchema),
  categoryController.createCatergory
);
router.get("/", categoryController.getAllCategory);

export const categoryRouter = router;
