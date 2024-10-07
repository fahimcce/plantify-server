import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

import { ZodError } from "zod";
import { TErrorSources } from "../interface/error";
import handleZodError from "../errors/handleZodError";
import handleValidationError from "../errors/handleValidationError";
import handleCastError from "../errors/handleCastError";
import handleDuplicateError from "../errors/handleDuplicateError";
import AppError from "../errors/AppError";
import config from "../config";

const globalErrorhandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err.statusCode ? err.statusCode : 500;
  let message = "Something went wrong";
  let errorMessages: TErrorSources = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  if (err instanceof ZodError) {
    const simpliFiedzodError = handleZodError(err);
    statusCode = simpliFiedzodError.statusCode;
    message = simpliFiedzodError.message;
    errorMessages = simpliFiedzodError?.errorSource;
  } else if (err?.name === "ValidationError") {
    const simpliFiedError = handleValidationError(err);
    statusCode = simpliFiedError.statusCode;
    message = simpliFiedError.message;
    errorMessages = simpliFiedError.errorSource;
  } else if (err?.name === "CastError") {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorSource;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.erroSource;
  } else if (err instanceof Error) {
    message = err.message;
    errorMessages = [
      {
        path: "",
        message: err.message,
      },
    ];
  }

  if (err instanceof AppError) {
    return res.status(statusCode).json({
      success: false,
      statusCode: statusCode,
      message,
      data: [],
      // stack: config.NODE_ENV === "development" && err?.stack,
    });
  }
  return res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    err,
    stack: config.NODE_ENV === "development" && err?.stack,
  });
};

export default globalErrorhandler;
