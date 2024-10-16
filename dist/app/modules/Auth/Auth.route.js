"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const validateRequest_1 = __importStar(require("../../middlewares/validateRequest"));
const Auth_validation_1 = require("./Auth.validation");
const Auth_controller_1 = require("./Auth.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const User_constant_1 = require("../User/User.constant");
const router = (0, express_1.Router)();
router.post("/register", (0, validateRequest_1.default)(Auth_validation_1.authValidation.registerUserValidationSchema), Auth_controller_1.authController.registerUser);
router.post("/login", (0, validateRequest_1.default)(Auth_validation_1.authValidation.loginValidation), Auth_controller_1.authController.loginUser);
router.post("/refresh-token", (0, validateRequest_1.validateRequestCookies)(Auth_validation_1.authValidation.refreshTokenValidation), Auth_controller_1.authController.refreshToken);
// update user
router.put("/update-user/:id", (0, auth_1.default)(User_constant_1.USER_ROLE.admin, User_constant_1.USER_ROLE.user), (0, validateRequest_1.default)(Auth_validation_1.authValidation.updateUserValidationSchema), Auth_controller_1.authController.updateUser);
router.post("/change-password", (0, auth_1.default)(User_constant_1.USER_ROLE.admin, User_constant_1.USER_ROLE.user), (0, validateRequest_1.default)(Auth_validation_1.authValidation.changePasswordValidationSchema), Auth_controller_1.authController.changePassword);
exports.authRouter = router;
