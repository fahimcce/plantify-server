import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userService } from "./user.service";

// confirm payment
const confirmPayment = catchAsync(async (req, res) => {
  const reslut = await userService.confiremPayment(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "You payment has successfully received",
    data: reslut,
  });
});

const getAlluser = catchAsync(async (req, res) => {
  const result = await userService.getAllUserDb(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All user retrived",
    data: result,
  });
});
const getUserByEmail = catchAsync(async (req, res) => {
  const result = await userService.getUsebyEmailDb(req.params.email);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Retrived",
    data: result,
  });
});
const getUserById = catchAsync(async (req, res) => {
  const result = await userService.getUsebyIdDb(req?.params?.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Retrived",
    data: result,
  });
});
const followUnfollow = catchAsync(async (req, res) => {
  const reslut = await userService.addFollowerAndFolloing(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: reslut.message,
    data: null,
  });
});
const deleteUser = catchAsync(async (req, res) => {
  const reslut = await userService.deleteUserDb(req.params?.userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Deleted Successfully",
    data: reslut,
  });
});
const makeAdminUser = catchAsync(async (req, res) => {
  const reslut = await userService.makeAdminUser(req.params?.userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Updated Successfully",
    data: reslut,
  });
});

export const userController = { getAlluser, getUserByEmail, getUserById, followUnfollow, confirmPayment, deleteUser, makeAdminUser };
