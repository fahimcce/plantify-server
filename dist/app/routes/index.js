"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Auth_route_1 = require("../modules/Auth/Auth.route");
const User_route_1 = require("../modules/User/User.route");
const Post_route_1 = require("../modules/Post/Post.route");
const Category_route_1 = require("../modules/Category/Category.route");
const Payment_route_1 = require("../modules/PaymentStoring/Payment.route");
const router = express_1.default.Router();
const moudleRoute = [
    {
        path: "/auth",
        route: Auth_route_1.authRouter,
    },
    {
        path: "/user",
        route: User_route_1.userRoute,
    },
    {
        path: "/post",
        route: Post_route_1.postRouter,
    },
    {
        path: "/category",
        route: Category_route_1.categoryRouter,
    },
    {
        path: "/payment",
        route: Payment_route_1.paymentRoute,
    },
];
moudleRoute.forEach((route) => router.use(route.path, route.route));
exports.default = router;
