"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const User_constant_1 = require("../User/User.constant");
const Category_validation_1 = require("./Category.validation");
const Category_Controller_1 = require("./Category.Controller");
const router = (0, express_1.Router)();
router.post("/", (0, auth_1.default)(User_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(Category_validation_1.categoryValidation.categoryValidationSchema), Category_Controller_1.categoryController.createCatergory);
router.get("/", Category_Controller_1.categoryController.getAllCategory);
exports.categoryRouter = router;
