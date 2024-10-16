import express from "express";
import { authRoutes } from "../modules/Auth/Auth.route";
import { userRoutes } from "../modules/User/User.route";
import { postRoutes } from "../modules/Post/Post.route";

const router = express.Router();

const moudleRoute = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/posts",
    route: postRoutes,
  },
];

moudleRoute.forEach((route) => router.use(route.path, route.route));

export default router;
