import httpStatus from "http-status";
import config from "../../config";
import { TUser } from "../User/User.interface";
import { User } from "../User/User.model";
import AppError from "../../errors/AppError";
import { TLoginRequest, tokenPayload } from "./Auth.interface";
import { createToken } from "./Auth.utils";

const signUpIntoDb = async (payload: TUser) => {
  const existingUser = await User.findOne({ email: payload.email });
  if (existingUser) {
    throw new AppError(
      httpStatus.ALREADY_REPORTED,
      "User already exists. Please login."
    );
  }
  return await User.create(payload);
};

const loginDb = async (payload: TLoginRequest) => {
  const existingUser = await User.findOne({ email: payload.email });
  if (!existingUser) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `User not found with this email: ${payload.email}`
    );
  }

  const passwordMatched = await User.isPasswordMatched(
    payload.password,
    existingUser.password
  );
  if (!passwordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, "Password does not match.");
  }

  const tokenPayload: tokenPayload = {
    name: existingUser.name,
    email: existingUser.email,
    role: existingUser.role,
  };

  const token = createToken(
    tokenPayload,
    config.Access_Token_Secret as string,
    config.JWT_ACCESS_EXPIRE_IN as string
  );

  return { user: existingUser, token };
};

// Fix the function parameter to accept an object with email property
const getUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};

export const authServices = {
  signUpIntoDb,
  loginDb,
  getUserByEmail,
};
