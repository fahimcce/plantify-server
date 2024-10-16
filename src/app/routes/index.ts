import express from "express";
import { authRouter } from "../modules/Auth/Auth.route";
import { userRoute } from "../modules/User/User.route";

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

  // {
  //   path: "/posts",
  //   route: postRoutes,
  // },
];

moudleRoute.forEach((route) => router.use(route.path, route.route));

export default router;
