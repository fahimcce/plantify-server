import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./Auth.service";
import httpStatus from "http-status";

const signUp = catchAsync(async (req: Request, res: Response) => {
  const result = await authServices.signUpIntoDb(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await authServices.loginDb(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    data: result?.user,
    token: result?.token,
  });
});

// Fix the function signature here
const getOneUser = catchAsync(async (req: Request, res: Response) => {
  const email = req.query.email as string; // Ensure the email is a string
  const result = await authServices.getUserByEmail(email);

  // Check if user exists
  if (!result) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "User not found.",
      data: null,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrieved successfully",
    data: result,
  });
});

export const authController = {
  signUp,
  login,
  getOneUser,
};
