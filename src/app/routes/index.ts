import express from "express";
import { authRouter } from "../modules/Auth/Auth.route";
import { userRoute } from "../modules/User/User.route";
import { postRouter } from "../modules/Post/Post.route";
import { categoryRouter } from "../modules/Category/Category.route";

const router = express.Router();

const moudleRoute = [
  {
    path: "/auth",
    route: authRouter,
  },
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/post",
    route: postRouter,
  },
  {
    path: "/category",
    route: categoryRouter,
  },
];

moudleRoute.forEach((route) => router.use(route.path, route.route));

export default router;
