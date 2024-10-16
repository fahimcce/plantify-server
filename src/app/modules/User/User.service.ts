import httpStatus from "http-status";
import { User } from "./User.model";
import AppError from "../../errors/AppError";

const getAllUsersFromDb = async (query: Record<string, unknown>) => {
  return await User.find({ isDeleted: false }); // You can use QueryBuilder if needed
};

const deleteUserDb = async (id: string) => {
  const user = await User.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found.");
  }
  return user;
};

const getUserByEmailDb = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found.");
  }
  return user;
};

export const userServices = {
  getAllUsersFromDb,
  deleteUserDb,
  getUserByEmailDb,
};
