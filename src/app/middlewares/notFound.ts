import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const notFound = (req: Request, res: Response, next: NextFunction): void => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API Not Found",
    data: null,
  });
};

export default notFound;
