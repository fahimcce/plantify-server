import { ErrorRequestHandler } from "express";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { TErrorSource } from "../interface/error";
import { ZodError } from "zod";
import handleZodError from "../errors/handleZodError";
import config from "../config";
import handleValidationError from "../errors/handleValidationError";
import handleCastError from "../errors/handleCastError";
import handleDuplicateError from "../errors/handleDuplicateError";
import AppError from "../errors/AppError";
import { TImageFiles } from "../interface/imageInterFace";

const globalErrorhandler: ErrorRequestHandler = async (err, req, res, next) => {
  let statusCode = err.statusCode ? err.statusCode : 500;
  let message = "Something went wrong";
  let errorSource: TErrorSource = [
    {
      path: "",
      message: message,
    },
  ];
  //   zod error
  if (err instanceof ZodError) {
    const simpliFiedzodError = handleZodError(err);
    statusCode = simpliFiedzodError.statusCode;
    message = simpliFiedzodError.message;
    errorSource = simpliFiedzodError?.errorSource;
  } else if (err?.name === "ValidationError") {
    const simpliFiedError = handleValidationError(err);
    statusCode = simpliFiedError.statusCode;
    message = simpliFiedError.message;
    errorSource = simpliFiedError.errorSource;
  } else if (err?.name === "CastError") {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSource = simplifiedError.errorSource;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSource = simplifiedError.errorSource;
  } else if (err instanceof Error) {
    message = err.message;
    errorSource = [
      {
        path: "",
        message: err.message,
      },
    ];
    // if (req.files && Object.keys(req.files).length > 0) {
    //   await deleteImageFromCloudinary(req.files as TImageFiles);
    // }
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err.message;
    errorSource = [
      {
        path: "",
        message: err?.message,
      },
    ];
  }
  //  return
  res.status(statusCode).json({
    success: false,
    message,
    errorSource,
    err,
    stack: config.NODE_ENV === "development" && err?.stack,
  });
};

export default globalErrorhandler;
