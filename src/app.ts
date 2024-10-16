import express, { Application, Request, Response } from "express";
import cors from "cors";

import cookieParser from "cookie-parser";
import router from "./app/routes";
import globalErrorhandler from "./app/middlewares/globalErroHandler";
import notFound from "./app/middlewares/notFound";

const app: Application = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

// application route
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Bookify Welcoming you.Enter this Arena,Find Your best Room",
  });
});

// global error
app.use(globalErrorhandler);
app.use(notFound);

export default app;
