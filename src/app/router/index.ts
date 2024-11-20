import express from "express";
import { userRoute } from "../moduls/User/user.route";
import { authRouter } from "../moduls/Auth/auth.route";
import { postRouter } from "../moduls/posts/post.route";
import { categoryRouter } from "../moduls/category/category.route";
import { paymentRoute } from "../moduls/paymentHistory/payment.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/auth",
    route: authRouter,
  },
  {
    path: "/post",
    route: postRouter,
  },
  {
    path: "/category",
    route: categoryRouter,
  },
  {
    path: "/payment",
    route: paymentRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
