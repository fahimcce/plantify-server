import express, { Application, Request, Response } from "express";
import cors from "cors";

import cookieParser from "cookie-parser";
// import globalErrorhandler from "./app/middileWare/globalErrorHandler";
// import notFound from "./app/middileWare/notFound";
// import router from "./app/routes";

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
// app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Bookify Welcoming you.Enter this Arena,Find Your best Room",
  });
});

// global error
// app.use(globalErrorhandler);
// app.use(notFound);

export default app;
